import React, { useState, useEffect } from 'react';
import { api } from '../../services/api';
import { Package, Truck, CheckCircle2, Clock, MapPin, Phone, Building } from 'lucide-react';

export default function AdminOrdersPage() {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);

  const loadOrders = async () => {
    try {
      const res = await api.getOrders();
      setOrders(res.orders);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadOrders();
  }, []);

  const handleStatusChange = async (id, newStatus) => {
    try {
      await api.updateOrderStatus(id, newStatus);
      loadOrders();
    } catch (err) {
      alert(err.message || 'Failed to update order status.');
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8">
        <div>
          <h2 className="text-2xl sm:text-3xl font-extrabold tracking-widest uppercase text-brand-text font-editorial">
            Order Consignments
          </h2>
          <p className="text-sm text-brand-muted mt-1">Fulfillment & Status Manager</p>
        </div>
      </div>

      <div className="bg-white border border-brand-border rounded-xl shadow-subtle overflow-hidden">
        {loading ? (
          <div className="py-20 text-center text-brand-muted text-xs font-bold uppercase tracking-widest animate-pulse">Loading Orders...</div>
        ) : orders.length === 0 ? (
          <div className="py-20 text-center text-brand-muted text-xs font-bold uppercase tracking-widest">No order consignments found.</div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left text-sm text-brand-text">
              <thead>
                <tr className="border-b border-brand-border text-xs uppercase font-extrabold tracking-wider text-brand-muted bg-brand-surface">
                  <th className="py-4 px-6">Order ID</th>
                  <th className="py-4 px-6">Customer / Business</th>
                  <th className="py-4 px-6">Quantity</th>
                  <th className="py-4 px-6">Total Amount</th>
                  <th className="py-4 px-6">Current Status</th>
                  <th className="py-4 px-6">Action</th>
                </tr>
              </thead>
              <tbody>
                {orders.map((o) => (
                  <tr key={o.id} className="border-b border-brand-border hover:bg-neutral-50 transition-colors">
                    <td className="py-4 px-6 font-bold text-brand-text font-mono text-xs">{o.id}</td>
                    <td className="py-4 px-6">
                      <div className="font-extrabold text-brand-text uppercase">{o.customer_name}</div>
                      <div className="text-[11px] text-brand-muted flex items-center gap-1 mt-0.5 uppercase tracking-wider">
                        <Building className="w-3 h-3" /> <span>{o.business_name || 'Retailer'}</span> &bull; <MapPin className="w-3 h-3" /> <span>{o.city}, {o.state}</span>
                      </div>
                    </td>
                    <td className="py-4 px-6 font-bold">{o.total_items} pcs</td>
                    <td className="py-4 px-6 font-extrabold font-editorial">₹{o.total_amount.toLocaleString()}</td>
                    <td className="py-4 px-6">
                      <span className="px-3 py-1 bg-brand-surface border border-brand-border text-brand-text rounded text-[10px] font-bold uppercase tracking-wider">
                        {o.order_status}
                      </span>
                    </td>
                    <td className="py-4 px-6">
                      <select
                        value={o.order_status}
                        onChange={(e) => handleStatusChange(o.id, e.target.value)}
                        className="bg-white border border-brand-border text-brand-text text-xs font-bold rounded px-3 py-1.5 focus:outline-none focus:border-brand-dark"
                      >
                        <option value="CONFIRMED">CONFIRMED</option>
                        <option value="PACKED">PACKED</option>
                        <option value="SHIPPED">SHIPPED</option>
                        <option value="DELIVERED">DELIVERED</option>
                        <option value="CANCELLED">CANCELLED</option>
                      </select>
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
