import express from 'express';
import db from '../db.js';
import { authenticateToken, requireRole } from '../middleware/auth.js';

const router = express.Router();

// Require SUPER_ADMIN or ADMIN role for all admin routes
router.use(authenticateToken, requireRole('SUPER_ADMIN', 'ADMIN', 'MANAGER'));

// GET /api/admin/dashboard (KPI Metrics & Summary)
router.get('/dashboard', (req, res) => {
  try {
    const store = db.getStore();

    const totalSales = store.orders.reduce((sum, o) => sum + (o.total_amount || 0), 0);
    const totalOrders = store.orders.length;
    const totalCustomers = store.users.filter(u => u.role !== 'SUPER_ADMIN').length;
    const totalProducts = store.products.length;
    const lowStockCount = store.product_variants.filter(v => v.stock < 50).length;
    const pendingQuotes = store.bulk_quotes.filter(q => q.status === 'NEW').length;

    const recentOrders = store.orders.slice(-5).reverse();
    const recentQuotes = store.bulk_quotes.slice(-5).reverse();
    const auditLogs = store.audit_logs.slice(-10).reverse();

    return res.json({
      metrics: {
        total_sales: totalSales,
        total_orders: totalOrders,
        total_customers: totalCustomers,
        total_products: totalProducts,
        low_stock_alerts: lowStockCount,
        pending_bulk_quotes: pendingQuotes
      },
      recent_orders: recentOrders,
      recent_quotes: recentQuotes,
      audit_logs: auditLogs,
      settings: store.site_settings
    });
  } catch (err) {
    console.error('Admin Dashboard Error:', err);
    return res.status(500).json({ error: 'Failed to fetch admin metrics.' });
  }
});

// POST /api/admin/products (Create Product)
router.post('/products', (req, res) => {
  try {
    const { name, category, subcategory, description, retail_mrp, price_slab_a, price_slab_b, price_slab_c, moq, image_url, is_featured, is_bestseller } = req.body;

    if (!name || !category || !price_slab_a || !image_url) {
      return res.status(400).json({ error: 'Please enter Product Name, Category, Price, and Image URL.' });
    }

    const store = db.getStore();
    const id = `ebs-prod-${Date.now()}`;
    const slug = name.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)+/g, '');
    const sku = `SKU-${category.slice(0,3).toUpperCase()}-${Date.now().toString().slice(-4)}`;

    const newProduct = {
      id,
      sku,
      name,
      slug,
      category,
      subcategory: subcategory || category,
      description: description || name,
      short_description: name,
      retail_mrp: parseFloat(retail_mrp) || parseFloat(price_slab_a) * 2,
      price_slab_a: parseFloat(price_slab_a),
      price_slab_b: parseFloat(price_slab_b) || parseFloat(price_slab_a) * 0.9,
      price_slab_c: parseFloat(price_slab_c) || parseFloat(price_slab_a) * 0.82,
      moq: parseInt(moq, 10) || 10,
      gst_percentage: 5,
      hsn_code: '6109',
      gender: category,
      fabric: 'High Grade Cotton Blend',
      fit: 'Regular Custom Fit',
      is_featured: is_featured ? 1 : 0,
      is_new_arrival: 1,
      is_bestseller: is_bestseller ? 1 : 0,
      status: 'ACTIVE',
      image_url,
      created_at: new Date().toISOString()
    };

    store.products.push(newProduct);

    // Create default size variants
    ['M', 'L', 'XL', 'XXL'].forEach(size => {
      store.product_variants.push({
        id: store.product_variants.length + 1,
        product_id: id,
        sku: `${sku}-${size}-BLK`,
        size,
        color: 'Black',
        stock: 100
      });
    });

    db.saveStore();

    db.prepare('INSERT INTO audit_logs (user_email, action, entity, entity_id, details) VALUES (?, ?, ?, ?, ?)').run(
      req.user.email, 'CREATE_PRODUCT', 'PRODUCT', id, `Added new product '${name}' with MOQ ${newProduct.moq}`
    );

    return res.status(201).json({ message: 'Product created successfully!', product: newProduct });
  } catch (err) {
    return res.status(500).json({ error: 'Failed to create product.' });
  }
});

// PATCH /api/admin/orders/:id (Update Order Status)
router.patch('/orders/:id', (req, res) => {
  try {
    const { id } = req.params;
    const { order_status } = req.body;

    db.prepare('UPDATE orders SET order_status = ? WHERE id = ?').run(order_status, id);

    db.prepare('INSERT INTO audit_logs (user_email, action, entity, entity_id, details) VALUES (?, ?, ?, ?, ?)').run(
      req.user.email, 'UPDATE_ORDER_STATUS', 'ORDER', id, `Updated status of order ${id} to ${order_status}`
    );

    return res.json({ message: `Order status updated to '${order_status}'.` });
  } catch (err) {
    return res.status(500).json({ error: 'Failed to update order status.' });
  }
});

// PATCH /api/admin/quotes/:id (Update Quote CRM Status)
router.patch('/quotes/:id', (req, res) => {
  try {
    const { id } = req.params;
    const { status } = req.body;

    db.prepare('UPDATE bulk_quotes SET status = ? WHERE id = ?').run(status, id);

    db.prepare('INSERT INTO audit_logs (user_email, action, entity, entity_id, details) VALUES (?, ?, ?, ?, ?)').run(
      req.user.email, 'UPDATE_QUOTE_STATUS', 'BULK_QUOTE', id, `Updated CRM status of quote ${id} to ${status}`
    );

    return res.json({ message: `Bulk quote status updated to '${status}'.` });
  } catch (err) {
    return res.status(500).json({ error: 'Failed to update quote status.' });
  }
});

// POST /api/admin/settings (Update Global Site Settings & Maintenance Mode)
router.post('/settings', (req, res) => {
  try {
    const { maintenance_mode, phone, announcement_strip } = req.body;
    const store = db.getStore();

    if (maintenance_mode !== undefined) store.site_settings.maintenance_mode = String(maintenance_mode);
    if (phone) store.site_settings.phone = phone;
    if (announcement_strip) store.site_settings.announcement_strip = announcement_strip;

    db.saveStore();

    db.prepare('INSERT INTO audit_logs (user_email, action, entity, entity_id, details) VALUES (?, ?, ?, ?, ?)').run(
      req.user.email, 'UPDATE_SITE_SETTINGS', 'SETTINGS', 'GLOBAL', 'Updated global site settings & maintenance mode'
    );

    return res.json({ message: 'Site settings updated successfully!', settings: store.site_settings });
  } catch (err) {
    return res.status(500).json({ error: 'Failed to update settings.' });
  }
});

export default router;
