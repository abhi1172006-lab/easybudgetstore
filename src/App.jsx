import React, { useEffect, useState } from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { api, initDb } from './services/api';

import { EnquiryProvider } from './context/EnquiryContext';
import { AuthProvider, useAuth } from './context/AuthContext';
import { CmsProvider } from './context/CmsContext';

import Header from './components/Header';
import Footer from './components/Footer';
import EnquiryModal from './components/EnquiryModal';
import SearchModal from './components/SearchModal';
import Toast from './components/Toast';
import WhatsAppFloatingButton from './components/WhatsAppFloatingButton';

import HomePage from './pages/HomePage';
import ShopPage from './pages/ShopPage';
import ProductDetailPage from './pages/ProductDetailPage';
import AboutPage from './pages/AboutPage';
import ContactPage from './pages/ContactPage';
import WholesalePage from './pages/WholesalePage';
import NotFoundPage from './pages/NotFoundPage';

import AdminLoginPage from './pages/admin/AdminLoginPage';
import AdminLayout from './pages/admin/AdminLayout';
import AdminDashboardPage from './pages/admin/AdminDashboardPage';
import AdminProductsPage from './pages/admin/AdminProductsPage';
import AdminProductsNewPage from './pages/admin/AdminProductsNewPage';
import AdminCategoriesPage from './pages/admin/AdminCategoriesPage';
import AdminHomepageBuilder from './pages/admin/AdminHomepageBuilder';
import AdminOrdersPage from './pages/admin/AdminOrdersPage';
import AdminQuotesPage from './pages/admin/AdminQuotesPage';
import AdminInventoryPage from './pages/admin/AdminInventoryPage';
import AdminCustomersPage from './pages/admin/AdminCustomersPage';
import AdminSettingsPage from './pages/admin/AdminSettingsPage';
import AdminMediaPage from './pages/admin/AdminMediaPage';

function ProtectedAdminRoute({ children }) {
  const { user, isAdmin, loading } = useAuth();
  if (loading) return <div className="p-10 text-center text-brand-muted text-xs uppercase tracking-wider">Verifying access…</div>;
  if (!user || !isAdmin) return <Navigate to="/admin/login" replace />;
  return children;
}

function StorefrontLayout({ children }) {
  return (
    <div className="min-h-screen flex flex-col bg-white font-sans selection:bg-brand-dark selection:text-white">
      <Header />
      <main className="flex-grow">{children}</main>
      <Footer />
      <EnquiryModal />
      <SearchModal />
      <Toast />
      <WhatsAppFloatingButton />
    </div>
  );
}

export default function App() {
  const [dbReady, setDbReady] = useState(false);

  useEffect(() => {
    initDb().then(() => setDbReady(true)).catch(() => setDbReady(true));
  }, []);

  if (!dbReady) {
    return <div className="min-h-screen grid place-items-center text-xs uppercase tracking-widest text-brand-muted">Loading EasyBudgetStore…</div>;
  }

  return (
    <CmsProvider>
      <AuthProvider>
        <EnquiryProvider>
          <BrowserRouter>
            <Routes>
              <Route path="/admin/login" element={<AdminLoginPage />} />
              <Route path="/admin/forgot-password" element={<Navigate to="/admin/login" replace />} />
              <Route path="/admin" element={<Navigate to="/admin/dashboard" replace />} />
              <Route
                path="/admin"
                element={
                  <ProtectedAdminRoute>
                    <AdminLayout />
                  </ProtectedAdminRoute>
                }
              >
                <Route path="dashboard" element={<AdminDashboardPage />} />
                <Route path="products" element={<AdminProductsPage />} />
                <Route path="products/new" element={<AdminProductsNewPage />} />
                <Route path="products/:id" element={<AdminProductsNewPage />} />
                <Route path="categories" element={<AdminCategoriesPage />} />
                <Route path="homepage" element={<AdminHomepageBuilder />} />
                <Route path="orders" element={<AdminOrdersPage />} />
                <Route path="quotes" element={<AdminQuotesPage />} />
                <Route path="inventory" element={<AdminInventoryPage />} />
                <Route path="customers" element={<AdminCustomersPage />} />
                <Route path="media" element={<AdminMediaPage />} />
                <Route path="settings" element={<AdminSettingsPage />} />
              </Route>

              <Route path="/" element={<StorefrontLayout><HomePage /></StorefrontLayout>} />
              <Route path="/shop" element={<StorefrontLayout><ShopPage /></StorefrontLayout>} />
              <Route path="/shop/:slug" element={<StorefrontLayout><ShopPage /></StorefrontLayout>} />
              <Route path="/men" element={<StorefrontLayout><ShopPage gender="Men" title="Men's Collection" /></StorefrontLayout>} />
              <Route path="/women" element={<StorefrontLayout><ShopPage gender="Women" title="Women's Collection" /></StorefrontLayout>} />
              <Route path="/kids" element={<StorefrontLayout><ShopPage gender="Kids" title="Kids' Collection" /></StorefrontLayout>} />
              <Route path="/winter" element={<StorefrontLayout><ShopPage featured title="The Winter Edit" /></StorefrontLayout>} />
              <Route path="/product/:id" element={<StorefrontLayout><ProductDetailPage /></StorefrontLayout>} />
              <Route path="/about" element={<StorefrontLayout><AboutPage /></StorefrontLayout>} />
              <Route path="/contact" element={<StorefrontLayout><ContactPage /></StorefrontLayout>} />
              <Route path="/wholesale" element={<StorefrontLayout><WholesalePage /></StorefrontLayout>} />
              <Route path="*" element={<StorefrontLayout><NotFoundPage /></StorefrontLayout>} />
            </Routes>
          </BrowserRouter>
        </EnquiryProvider>
      </AuthProvider>
    </CmsProvider>
  );
}
