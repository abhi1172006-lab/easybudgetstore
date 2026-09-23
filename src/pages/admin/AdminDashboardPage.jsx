import React, { useState, useEffect } from 'react';
import { api } from '../../services/api';
import { TrendingUp, ShoppingBag, Users, MessageSquare, ArrowUpRight, Plus, Eye } from 'lucide-react';
import { Link } from 'react-router-dom';

export default function AdminDashboardPage() {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    async function loadDashboard() {
      try {
        const res = await api.getAdminDashboard();
        setData(res);
      } catch (err) {
        setError(err.message || 'Failed to load dashboard metrics.');
      } finally {
        setLoading(false);
      }
    }
    loadDashboard();
  }, []);

  if (loading) {
    return <div className="text-center py-20 text-brand-muted font-bold text-xs uppercase tracking-widest animate-pulse">Loading B2B Metrics...</div>;
  }

  if (error) {
    return <div className="p-6 bg-red-50 border border-red-200 rounded-md text-red-600 text-xs font-bold">{error}</div>;
  }

  const { metrics, recent_orders, recent_quotes, audit_logs } = data;

  return (
    <div className="space-y-8 animate-fade-in pb-12">
      {/* Header Area */}
      <div>
        <h2 className="text-2xl sm:text-3xl font-extrabold tracking-widest uppercase text-brand-text font-editorial mb-1">
          Good Morning
        </h2>
        <p className="text-sm text-brand-muted">Here's what's happening with your store today.</p>
      </div>

      {/* Top Banner KPI Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
        <div className="p-6 bg-white border border-brand-border rounded-xl shadow-subtle relative overflow-hidden transition-all hover:border-brand-dark">
          <div className="flex items-center justify-between mb-4">
            <span className="text-[11px] font-bold uppercase tracking-wider text-brand-muted">Total Sales</span>
            <div className="p-2 bg-brand-surface rounded text-brand-dark"><TrendingUp className="w-5 h-5" /></div>
          </div>
          <span className="text-2xl sm:text-3xl font-black text-brand-text block font-editorial">₹{metrics.total_sales.toLocaleString()}</span>
        </div>

        <div className="p-6 bg-white border border-brand-border rounded-xl shadow-subtle relative overflow-hidden transition-all hover:border-brand-dark">
          <div className="flex items-center justify-between mb-4">
            <span className="text-[11px] font-bold uppercase tracking-wider text-brand-muted">Total Orders</span>
            <div className="p-2 bg-brand-surface rounded text-brand-dark"><ShoppingBag className="w-5 h-5" /></div>
          </div>
          <span className="text-2xl sm:text-3xl font-black text-brand-text block font-editorial">{metrics.total_orders}</span>
        </div>

        <div className="p-6 bg-white border border-brand-border rounded-xl shadow-subtle relative overflow-hidden transition-all hover:border-brand-dark">
          <div className="flex items-center justify-between mb-4">
            <span className="text-[11px] font-bold uppercase tracking-wider text-brand-muted">Customers</span>
            <div className="p-2 bg-brand-surface rounded text-brand-dark"><Users className="w-5 h-5" /></div>
          </div>
          <span className="text-2xl sm:text-3xl font-black text-brand-text block font-editorial">{metrics.total_customers}</span>
        </div>

        <div className="p-6 bg-white border border-brand-border rounded-xl shadow-subtle relative overflow-hidden transition-all hover:border-brand-dark">
          <div className="flex items-center justify-between mb-4">
            <span className="text-[11px] font-bold uppercase tracking-wider text-brand-muted">Active Products</span>
            <div className="p-2 bg-brand-surface rounded text-brand-dark"><ShoppingBag className="w-5 h-5" /></div>
          </div>
          <span className="text-2xl sm:text-3xl font-black text-brand-text block font-editorial">{metrics.total_products}</span>
        </div>
      </div>

      {/* Quick Actions */}
      <div className="bg-white border border-brand-border rounded-xl p-6 shadow-subtle">
        <h3 className="text-[11px] font-bold uppercase tracking-widest text-brand-muted mb-4">Quick Actions</h3>
        <div className="flex flex-wrap gap-3">
          <Link to="/admin/products/new" className="px-4 py-2 bg-brand-dark hover:bg-black text-white text-xs font-bold uppercase tracking-wider rounded flex items-center gap-2 transition-colors">
            <Plus className="w-3.5 h-3.5" /> Add Product
          </Link>
          <Link to="/admin/homepage" className="px-4 py-2 border border-brand-border hover:border-brand-dark text-brand-text bg-brand-surface text-xs font-bold uppercase tracking-wider rounded flex items-center gap-2 transition-colors">
            Homepage Editor
          </Link>
          <Link to="/admin/orders" className="px-4 py-2 border border-brand-border hover:border-brand-dark text-brand-text bg-brand-surface text-xs font-bold uppercase tracking-wider rounded flex items-center gap-2 transition-colors">
            View Orders
          </Link>
        </div>
      </div>

      {/* Grid Section: Orders & Quotes */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Recent Orders */}
        <div className="bg-white border border-brand-border rounded-xl shadow-subtle overflow-hidden">
          <div className="flex items-center justify-between p-6 border-b border-brand-border bg-brand-surface">
            <h3 className="text-xs font-extrabold text-brand-text uppercase tracking-widest font-editorial">Recent Orders</h3>
            <Link to="/admin/orders" className="text-[10px] text-brand-dark uppercase font-bold hover:underline flex items-center">
              View All <ArrowUpRight className="w-3 h-3 ml-0.5" />
            </Link>
          </div>

          <div className="divide-y divide-brand-border">
            {recent_orders.length === 0 ? (
              <p className="text-xs text-brand-muted p-6 text-center">No orders placed yet.</p>
            ) : (
              recent_orders.map(order => (
                <div key={order.id} className="p-4 sm:p-6 hover:bg-neutral-50 transition-colors flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                  <div>
                    <div className="flex items-center gap-2 mb-1">
                      <span className="text-[10px] font-bold text-brand-text uppercase px-2 py-0.5 bg-brand-surface border border-brand-border rounded">{order.id}</span>
                      <span className="text-[10px] text-brand-muted">{new Date(order.created_at).toLocaleDateString()}</span>
                    </div>
                    <h4 className="text-xs font-bold text-brand-text uppercase">{order.customer_name}</h4>
                    <span className="text-[10px] text-brand-muted">{order.city}, {order.state}</span>
                  </div>
                  <div className="flex sm:flex-col items-center sm:items-end justify-between sm:justify-center gap-2 w-full sm:w-auto border-t sm:border-t-0 border-brand-border pt-3 sm:pt-0">
                    <span className="text-sm font-black text-brand-text font-editorial">₹{order.total_amount.toLocaleString()}</span>
                    <span className="text-[9px] px-2 py-1 rounded bg-neutral-100 text-neutral-600 uppercase font-bold tracking-wider">{order.order_status}</span>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>

        {/* Bulk Quotes Lead CRM */}
        <div className="bg-white border border-brand-border rounded-xl shadow-subtle overflow-hidden">
          <div className="flex items-center justify-between p-6 border-b border-brand-border bg-brand-surface">
            <h3 className="text-xs font-extrabold text-brand-text uppercase tracking-widest font-editorial">Bulk Enquiries</h3>
            <span className="text-[10px] text-brand-muted uppercase font-bold tracking-wider">{metrics.pending_bulk_quotes} New</span>
          </div>

          <div className="divide-y divide-brand-border">
            {recent_quotes.length === 0 ? (
              <p className="text-xs text-brand-muted p-6 text-center">No bulk enquiries submitted yet.</p>
            ) : (
              recent_quotes.map(quote => (
                <div key={quote.id} className="p-4 sm:p-6 hover:bg-neutral-50 transition-colors flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                  <div>
                    <span className="text-[10px] font-bold text-brand-muted uppercase block mb-1">Lead &bull; {quote.city}</span>
                    <h4 className="text-xs font-bold text-brand-text uppercase">{quote.customer_name} ({quote.business_name})</h4>
                    <span className="text-[11px] text-brand-dark font-medium block mt-1">Interested in {quote.quantity} pcs</span>
                  </div>
                  <div className="flex sm:flex-col items-center sm:items-end justify-between sm:justify-center gap-2 w-full sm:w-auto border-t sm:border-t-0 border-brand-border pt-3 sm:pt-0">
                     <span className="text-[10px] text-brand-muted font-medium">{quote.phone}</span>
                     <a
                      href={`https://wa.me/${quote.phone.replace(/[^0-9]/g,'')}?text=Hi%20${encodeURIComponent(quote.customer_name)}%2C%20regarding%20your%20bulk%20enquiry%20of%20${quote.quantity}%20pcs.`}
                      target="_blank"
                      rel="noreferrer"
                      className="px-3 py-1.5 bg-[#25D366] text-white rounded text-[10px] font-bold uppercase tracking-wider hover:opacity-90 flex items-center gap-1 shadow-sm"
                     >
                      WhatsApp
                     </a>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
