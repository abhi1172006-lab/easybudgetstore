import express from 'express';
import db from '../db.js';
import { calculateB2BUnitPrice } from './products.js';

const router = express.Router();

// POST /api/orders (Transactional Checkout)
router.post('/', (req, res) => {
  try {
    const {
      customer_name, business_name, phone, email, shipping_address,
      city, state, pincode, items, coupon_code, notes
    } = req.body;

    if (!customer_name || !phone || !shipping_address || !city || !state || !pincode || !items || !Array.isArray(items) || items.length === 0) {
      return res.status(400).json({ error: 'Please fill in all required shipping and order details.' });
    }

    const orderId = `ORD-EBS-${Date.now().toString().slice(-6)}`;
    let totalAmount = 0;
    let totalItems = 0;
    const verifiedItems = [];

    // Server-side validation of products, MOQs, and prices
    for (const item of items) {
      const product = db.prepare('SELECT * FROM products WHERE id = ?').get(item.product_id);
      if (!product) {
        return res.status(400).json({ error: `Product ID '${item.product_id}' not found.` });
      }

      if (item.quantity < product.moq) {
        return res.status(400).json({
          error: `Minimum Order Quantity (MOQ) for ${product.name} is ${product.moq} pcs. You requested ${item.quantity} pcs.`
        });
      }

      const unitPrice = calculateB2BUnitPrice(product, item.quantity);
      const subtotal = unitPrice * item.quantity;

      totalItems += item.quantity;
      totalAmount += subtotal;

      verifiedItems.push({
        product_id: product.id,
        product_name: product.name,
        size: item.size || 'L',
        color: item.color || 'Black',
        quantity: item.quantity,
        unit_price: unitPrice,
        subtotal
      });
    }

    let discountAmount = 0;
    if (coupon_code) {
      const store = db.getStore();
      const coupon = store.coupons.find(c => c.code.toUpperCase() === coupon_code.toUpperCase() && c.status === 'ACTIVE');
      if (coupon) {
        if (coupon.discount_type === 'PERCENTAGE') {
          discountAmount = (totalAmount * coupon.discount_value) / 100;
        } else {
          discountAmount = coupon.discount_value;
        }
      }
    }

    const finalAmount = Math.max(0, totalAmount - discountAmount);

    // Save order
    db.prepare(`
      INSERT INTO orders (
        id, user_id, customer_name, business_name, phone, email, shipping_address,
        city, state, pincode, total_items, total_amount, discount_amount, coupon_code,
        payment_status, order_status, payment_method, notes
      ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
    `).run(
      orderId,
      req.user?.id || null,
      customer_name,
      business_name || null,
      phone,
      email || null,
      shipping_address,
      city,
      state,
      pincode,
      totalItems,
      finalAmount,
      discountAmount,
      coupon_code || null,
      'PENDING_CONFIRMATION',
      'CONFIRMED',
      'WHATSAPP_B2B_INVOICE',
      notes || null
    );

    // Save order items
    for (const item of verifiedItems) {
      db.prepare(`
        INSERT INTO order_items (order_id, product_id, product_name, size, color, quantity, unit_price, subtotal)
        VALUES (?, ?, ?, ?, ?, ?, ?, ?)
      `).run(
        orderId, item.product_id, item.product_name, item.size, item.color, item.quantity, item.unit_price, item.subtotal
      );
    }

    // Log audit record
    db.prepare(`
      INSERT INTO audit_logs (user_email, action, entity, entity_id, details)
      VALUES (?, ?, ?, ?, ?)
    `).run(
      email || 'GUEST',
      'CREATE_ORDER',
      'ORDER',
      orderId,
      `Order placed: ${totalItems} pcs, Total ₹${finalAmount.toLocaleString()}`
    );

    return res.status(201).json({
      message: 'Wholesale order created successfully!',
      order: {
        order_id: orderId,
        total_items: totalItems,
        total_amount: finalAmount,
        discount_amount: discountAmount,
        items: verifiedItems
      }
    });
  } catch (err) {
    console.error('Order creation error:', err);
    return res.status(500).json({ error: 'Failed to process wholesale order.' });
  }
});

// GET /api/orders (Customer / Admin Order List)
router.get('/', (req, res) => {
  try {
    const orders = db.prepare('SELECT * FROM orders').all();
    return res.json({ orders });
  } catch (err) {
    return res.status(500).json({ error: 'Failed to fetch orders.' });
  }
});

export default router;
