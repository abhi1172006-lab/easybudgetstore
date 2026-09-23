import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import cookieParser from 'cookie-parser';
import rateLimit from 'express-rate-limit';
import { initDatabase } from './db.js';

import authRoutes from './routes/auth.js';
import productRoutes from './routes/products.js';
import orderRoutes from './routes/orders.js';
import quoteRoutes from './routes/quotes.js';
import adminRoutes from './routes/admin.js';
import seoRoutes from './routes/seo.js';

const app = express();
const PORT = process.env.PORT || 5000;

// Initialize Database & Seed Default Data
initDatabase();

// Security Middlewares
app.use(helmet({
  contentSecurityPolicy: false
}));

// CORS — allow all origins (required for Render + Netlify cross-origin)
app.use(cors({
  origin: '*',
  credentials: false
}));

app.use(cookieParser());
app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ extended: true }));

// Rate Limiting
const apiLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 300,
  message: { error: 'Too many requests from this IP, please try again later.' }
});

app.use('/api/', apiLimiter);

// Bind API Routes
app.use('/api/auth', authRoutes);
app.use('/api/products', productRoutes);
app.use('/api/orders', orderRoutes);
app.use('/api/bulk-quotes', quoteRoutes);
app.use('/api/admin', adminRoutes);
app.use('/', seoRoutes);

// Health Check
app.get('/api/health', (req, res) => {
  res.json({
    status: 'ONLINE',
    platform: 'EasyBudgetStore B2B Engine',
    timestamp: new Date().toISOString(),
    owner: 'Abhi Gupta (+91 9289981449)'
  });
});

// 404 Handler
app.use((req, res) => {
  res.status(404).json({ error: 'API Endpoint not found.' });
});

app.listen(PORT, '0.0.0.0', () => {
  console.log(`🚀 EasyBudgetStore B2B Backend running on port ${PORT}`);
});
