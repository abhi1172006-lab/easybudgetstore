import express from 'express';
import db from '../db.js';

const router = express.Router();

// POST /api/bulk-quotes (Submit Bulk Enquiry)
router.post('/', (req, res) => {
  try {
    const { customer_name, business_name, phone, email, product_id, product_name, quantity, required_date, city, notes } = req.body;

    if (!customer_name || !business_name || !phone || !email || !quantity || !city) {
      return res.status(400).json({ error: 'Please fill in Name, Business Name, Phone, Email, Quantity, and City.' });
    }

    const result = db.prepare(`
      INSERT INTO bulk_quotes (customer_name, business_name, phone, email, product_id, product_name, quantity, required_date, city, notes)
      VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
    `).run(
      customer_name, business_name, phone, email, product_id || null, product_name || 'General Bulk Inquiry', parseInt(quantity, 10), required_date || null, city, notes || null
    );

    db.prepare(`
      INSERT INTO audit_logs (user_email, action, entity, entity_id, details)
      VALUES (?, ?, ?, ?, ?)
    `).run(
      email,
      'SUBMIT_BULK_QUOTE',
      'BULK_QUOTE',
      String(result.lastInsertRowid),
      `Bulk enquiry for ${quantity} pcs from ${business_name} (${city})`
    );

    return res.status(201).json({
      message: 'Bulk enquiry received! Our wholesale manager will contact you on WhatsApp/Phone shortly.',
      quote_id: result.lastInsertRowid
    });
  } catch (err) {
    console.error('Bulk Quote error:', err);
    return res.status(500).json({ error: 'Failed to submit bulk quote.' });
  }
});

// GET /api/bulk-quotes (List for Admin CRM)
router.get('/', (req, res) => {
  try {
    const quotes = db.prepare('SELECT * FROM bulk_quotes').all();
    return res.json({ quotes });
  } catch (err) {
    return res.status(500).json({ error: 'Failed to fetch bulk quotes.' });
  }
});

export default router;
