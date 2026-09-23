import React, { useState, useEffect } from 'react';
import { api } from '../../services/api';
import { Users, Building, MapPin, Search } from 'lucide-react';

export default function AdminCustomersPage() {
  const [customers, setCustomers] = useState([]);
  const [loading, setLoading] = useState(true);

  // In a real app we would have a distinct getCustomers API.
  // We'll aggregate from getOrders and getBulkQuotes.
  useEffect(() => {
    async function loadCustomers() {
      try {
        const [ordersRes, quotesRes] = await Promise.all([
          api.getOrders(),
          api.getBulkQuotes()
        ]);
        
        // Simple aggregation by phone number
        const customerMap = {};
        
        ordersRes.orders.forEach(o => {
          if (!customerMap[o.phone]) {
            customerMap[o.phone] = {
              name: o.customer_name,
              phone: o.phone,
              city: o.city,
              state: o.state,
              business_name: o.business_name,
              orders: 1,
              quotes: 0,
              total_spend: o.total_amount
            };
          } else {
            customerMap[o.phone].orders += 1;
            customerMap[o.phone].total_spend += o.total_amount;
          }
        });

        quotesRes.quotes.forEach(q => {
          if (!customerMap[q.phone]) {
            customerMap[q.phone] = {
              name: q.customer_name,
              phone: q.phone,
              city: q.city,
              state: 'Unknown',
              business_name: q.business_name,
              orders: 0,
              quotes: 1,
              total_spend: 0
            };
          } else {
            customerMap[q.phone].quotes += 1;
          }
        });

        setCustomers(Object.values(customerMap));
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    }
    loadCustomers();
  }, []);

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8">
        <div>
          <h2 className="text-2xl sm:text-3xl font-extrabold tracking-widest uppercase text-brand-text font-editorial">
            Customers CRM
          </h2>
          <p className="text-sm text-brand-muted mt-1">Retailers, Wholesalers & Leads</p>
        </div>
        <div className="relative">
          <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-brand-muted" />
          <input 
            type="text" 
            placeholder="Search clients..." 
            className="pl-9 pr-4 py-2 border border-brand-border rounded text-sm focus:outline-none focus:border-brand-dark"
          />
        </div>
      </div>

      <div className="bg-white border border-brand-border rounded-xl shadow-subtle overflow-hidden">
        {loading ? (
          <div className="py-20 text-center text-brand-muted text-xs font-bold uppercase tracking-widest animate-pulse">Loading Customers...</div>
        ) : customers.length === 0 ? (
          <div className="py-20 text-center text-brand-muted text-xs font-bold uppercase tracking-widest">No customers found.</div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left text-sm text-brand-text">
              <thead>
                <tr className="border-b border-brand-border text-xs uppercase font-extrabold tracking-wider text-brand-muted bg-brand-surface">
                  <th className="py-4 px-6">Client Name</th>
                  <th className="py-4 px-6">Business Details</th>
                  <th className="py-4 px-6">Contact Info</th>
                  <th className="py-4 px-6">Engagement</th>
                  <th className="py-4 px-6">Total Value</th>
                </tr>
              </thead>
              <tbody>
                {customers.map((c, i) => (
                  <tr key={i} className="border-b border-brand-border hover:bg-neutral-50 transition-colors">
                    <td className="py-4 px-6 font-extrabold text-brand-text uppercase">
                      <div className="flex items-center gap-2">
                        <Users className="w-4 h-4 text-brand-muted" />
                        <span>{c.name}</span>
                      </div>
                    </td>
                    <td className="py-4 px-6">
                      <div className="font-bold text-brand-text">{c.business_name || 'Independent Retailer'}</div>
                      <div className="text-[11px] text-brand-muted flex items-center gap-1 mt-0.5 uppercase tracking-wider">
                        <MapPin className="w-3 h-3" /> <span>{c.city}, {c.state}</span>
                      </div>
                    </td>
                    <td className="py-4 px-6 font-mono text-brand-muted text-xs">{c.phone}</td>
                    <td className="py-4 px-6 text-xs font-bold uppercase tracking-wider">
                      {c.orders > 0 && <span className="text-emerald-600 block">{c.orders} Orders</span>}
                      {c.quotes > 0 && <span className="text-amber-600 block">{c.quotes} Quotes</span>}
                    </td>
                    <td className="py-4 px-6 font-extrabold font-editorial">
                      {c.total_spend > 0 ? `₹${c.total_spend.toLocaleString()}` : '-'}
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
