import React, { useState, useEffect } from 'react';
import { api } from '../../services/api';
import { MessageSquare, Phone, Building, MapPin, ExternalLink } from 'lucide-react';

export default function AdminQuotesPage() {
  const [quotes, setQuotes] = useState([]);
  const [loading, setLoading] = useState(true);

  const loadQuotes = async () => {
    try {
      const res = await api.getBulkQuotes();
      setQuotes(res.quotes);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadQuotes();
  }, []);

  const handleStatusChange = async (id, newStatus) => {
    try {
      await api.updateQuoteStatus(id, newStatus);
      loadQuotes();
    } catch (err) {
      alert(err.message || 'Failed to update quote status.');
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8">
        <div>
          <h2 className="text-2xl sm:text-3xl font-extrabold tracking-widest uppercase text-brand-text font-editorial">
            Bulk Enquiry CRM
          </h2>
          <p className="text-sm text-brand-muted mt-1">Manage Wholesale Leads & Direct Quotes</p>
        </div>
      </div>

      <div className="bg-white border border-brand-border rounded-xl shadow-subtle overflow-hidden">
        {loading ? (
          <div className="py-20 text-center text-brand-muted text-xs font-bold uppercase tracking-widest animate-pulse">Loading Leads...</div>
        ) : quotes.length === 0 ? (
          <div className="py-20 text-center text-brand-muted text-xs font-bold uppercase tracking-widest">No bulk enquiries yet.</div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left text-sm text-brand-text">
              <thead>
                <tr className="border-b border-brand-border text-xs uppercase font-extrabold tracking-wider text-brand-muted bg-brand-surface">
                  <th className="py-4 px-6">Lead ID</th>
                  <th className="py-4 px-6">Buyer & Business</th>
                  <th className="py-4 px-6">Product & Qty</th>
                  <th className="py-4 px-6">City</th>
                  <th className="py-4 px-6">CRM Status</th>
                  <th className="py-4 px-6">Actions</th>
                </tr>
              </thead>
              <tbody>
                {quotes.map((q) => (
                  <tr key={q.id} className="border-b border-brand-border hover:bg-neutral-50 transition-colors">
                    <td className="py-4 px-6 font-bold text-brand-text font-mono text-xs">LEAD #{q.id}</td>
                    <td className="py-4 px-6">
                      <div className="font-extrabold text-brand-text uppercase">{q.customer_name}</div>
                      <div className="text-[11px] text-brand-muted uppercase tracking-wider">{q.business_name} &bull; {q.phone}</div>
                    </td>
                    <td className="py-4 px-6">
                      <div className="font-bold uppercase">{q.product_name || 'General Wholesale'}</div>
                      <div className="text-[11px] text-brand-dark font-black uppercase tracking-wider mt-0.5">{q.quantity} pcs</div>
                    </td>
                    <td className="py-4 px-6 font-bold text-brand-muted text-xs uppercase">{q.city}</td>
                    <td className="py-4 px-6">
                      <select
                        value={q.status}
                        onChange={(e) => handleStatusChange(q.id, e.target.value)}
                        className="bg-white border border-brand-border text-brand-text text-xs font-bold rounded px-3 py-1.5 focus:outline-none focus:border-brand-dark"
                      >
                        <option value="NEW">NEW</option>
                        <option value="CONTACTED">CONTACTED</option>
                        <option value="QUOTED">QUOTED</option>
                        <option value="CONVERTED">CONVERTED</option>
                        <option value="CLOSED">CLOSED</option>
                      </select>
                    </td>
                    <td className="py-4 px-6">
                      <a
                        href={`https://wa.me/${q.phone.replace(/[^0-9]/g,'')}?text=Hi%20${encodeURIComponent(q.customer_name)}%2C%20regarding%20your%20wholesale%20enquiry%20of%20${q.quantity}%20pcs.`}
                        target="_blank"
                        rel="noreferrer"
                        className="px-4 py-2 bg-emerald-600 text-white rounded text-xs font-bold uppercase tracking-wider hover:bg-emerald-700 inline-flex items-center gap-2 transition-colors"
                      >
                        <span>WhatsApp</span>
                        <ExternalLink className="w-3.5 h-3.5" />
                      </a>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
}
