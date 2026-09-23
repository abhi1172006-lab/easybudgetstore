import express from 'express';
import db from '../db.js';

const router = express.Router();

// Helper to compute dynamic B2B unit price based on quantity
export function calculateB2BUnitPrice(product, qty) {
  const quantity = parseInt(qty, 10) || product.moq;
  if (quantity >= 100) return product.price_slab_c;
  if (quantity >= 50) return product.price_slab_b;
  return product.price_slab_a;
}

// GET /api/products (List products with filtering & search)
router.get('/', (req, res) => {
  try {
    const { category, gender, search, featured, new_arrivals, bestseller, sort } = req.query;

    let query = 'SELECT * FROM products WHERE status = "ACTIVE"';
    const params = [];

    if (category && category !== 'all') {
      query += ' AND LOWER(category) = LOWER(?)';
      params.push(category);
    }

    if (gender) {
      query += ' AND LOWER(gender) = LOWER(?)';
      params.push(gender);
    }

    if (featured === 'true') {
      query += ' AND is_featured = 1';
    }

    if (new_arrivals === 'true') {
      query += ' AND is_new_arrival = 1';
    }

    if (bestseller === 'true') {
      query += ' AND is_bestseller = 1';
    }

    if (search) {
      query += ' AND (LOWER(name) LIKE ? OR LOWER(description) LIKE ? OR LOWER(sku) LIKE ? OR LOWER(category) LIKE ?)';
      const term = `%${search.toLowerCase().trim()}%`;
      params.push(term, term, term, term);
    }

    if (sort === 'price_asc') {
      query += ' ORDER BY price_slab_a ASC';
    } else if (sort === 'price_desc') {
      query += ' ORDER BY price_slab_a DESC';
    } else {
      query += ' ORDER BY created_at DESC';
    }

    const products = db.prepare(query).all(...params);

    // Attach total stock & variant counts
    const productsWithStock = products.map(p => {
      const stockRes = db.prepare('SELECT SUM(stock) as total_stock FROM product_variants WHERE product_id = ?').get(p.id);
      return {
        ...p,
        total_stock: stockRes.total_stock || 100,
        price_display: `₹${p.price_slab_a} - ₹${p.price_slab_c} / pc`,
        price_slabs: [
          { min_qty: p.moq, max_qty: 49, unit_price: p.price_slab_a, label: '10–49 pcs' },
          { min_qty: 50, max_qty: 99, unit_price: p.price_slab_b, label: '50–99 pcs' },
          { min_qty: 100, max_qty: null, unit_price: p.price_slab_c, label: '100+ pcs' }
        ]
      };
    });

    return res.json({ products: productsWithStock });
  } catch (err) {
    console.error('Error fetching products:', err);
    return res.status(500).json({ error: 'Failed to fetch catalog.' });
  }
});

// GET /api/products/:slugOrId (Product Details)
router.get('/:identifier', (req, res) => {
  try {
    const { identifier } = req.params;
    const { qty } = req.query;

    const product = db.prepare('SELECT * FROM products WHERE id = ? OR slug = ?').get(identifier, identifier);
    if (!product) {
      return res.status(404).json({ error: 'Product not found.' });
    }

    const variants = db.prepare('SELECT * FROM product_variants WHERE product_id = ?').all(product.id);
    const requestedQty = parseInt(qty, 10) || product.moq;
    const calculatedUnitPrice = calculateB2BUnitPrice(product, requestedQty);

    return res.json({
      product: {
        ...product,
        variants,
        current_calculated_price: calculatedUnitPrice,
        total_cost_for_qty: calculatedUnitPrice * requestedQty,
        price_slabs: [
          { min_qty: product.moq, max_qty: 49, unit_price: product.price_slab_a, label: '10–49 pcs' },
          { min_qty: 50, max_qty: 99, unit_price: product.price_slab_b, label: '50–99 pcs' },
          { min_qty: 100, max_qty: null, unit_price: product.price_slab_c, label: '100+ pcs' }
        ]
      }
    });
  } catch (err) {
    return res.status(500).json({ error: 'Failed to fetch product details.' });
  }
});

export default router;
