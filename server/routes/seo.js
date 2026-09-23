import express from 'express';
import db from '../db.js';

const router = express.Router();

// GET /sitemap.xml
router.get('/sitemap.xml', (req, res) => {
  try {
    const store = db.getStore();
    const baseUrl = 'https://easybudgetstore.com';

    let xml = `<?xml version="1.0" encoding="UTF-8"?>\n`;
    xml += `<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n`;

    // Static core pages
    const staticPages = ['', '/men', '/women', '/kids', '/winter', '/about', '/contact'];
    staticPages.forEach(p => {
      xml += `  <url>\n    <loc>${baseUrl}${p}</loc>\n    <changefreq>daily</changefreq>\n    <priority>${p === '' ? '1.0' : '0.8'}</priority>\n  </url>\n`;
    });

    // Dynamic products
    store.products.forEach(p => {
      xml += `  <url>\n    <loc>${baseUrl}/product/${p.slug}</loc>\n    <lastmod>${new Date(p.created_at).toISOString().split('T')[0]}</lastmod>\n    <changefreq>weekly</changefreq>\n    <priority>0.9</priority>\n  </url>\n`;
    });

    xml += `</urlset>`;

    res.header('Content-Type', 'application/xml');
    return res.send(xml);
  } catch (err) {
    return res.status(500).send('Error generating sitemap.');
  }
});

// GET /robots.txt
router.get('/robots.txt', (req, res) => {
  const robots = `User-agent: *
Disallow: /admin/
Disallow: /api/
Allow: /

Sitemap: https://easybudgetstore.com/sitemap.xml
`;
  res.header('Content-Type', 'text/plain');
  return res.send(robots);
});

export default router;
