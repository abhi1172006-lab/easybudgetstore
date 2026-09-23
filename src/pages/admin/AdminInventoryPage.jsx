import React, { useState, useEffect } from 'react';
import { api } from '../../services/api';
import { PackageCheck, AlertCircle, ArrowUpRight } from 'lucide-react';

export default function AdminInventoryPage() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadData() {
      try {
        const res = await api.getProducts();
        setProducts(res.products);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    }
    loadData();
  }, []);

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8">
        <div>
          <h2 className="text-2xl sm:text-3xl font-extrabold tracking-widest uppercase text-brand-text font-editorial">
            Inventory & Warehouse
          </h2>
          <p className="text-sm text-brand-muted mt-1">Real-time Stock Levels & Movement Logs</p>
        </div>
      </div>

      <div className="bg-white border border-brand-border rounded-xl shadow-subtle overflow-hidden">
        {loading ? (
          <div className="py-20 text-center text-brand-muted text-xs font-bold uppercase tracking-widest animate-pulse">Loading Warehouse Inventory...</div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left text-sm text-brand-text">
              <thead>
                <tr className="border-b border-brand-border text-xs uppercase font-extrabold tracking-wider text-brand-muted bg-brand-surface">
                  <th className="py-4 px-6">Product</th>
                  <th className="py-4 px-6">SKU</th>
                  <th className="py-4 px-6">Current Stock</th>
                  <th className="py-4 px-6">Status</th>
                  <th className="py-4 px-6">Warehouse Status</th>
                </tr>
              </thead>
              <tbody>
                {products.map((p) => (
                  <tr key={p.id} className="border-b border-brand-border hover:bg-neutral-50 transition-colors">
                    <td className="py-4 px-6 font-extrabold text-brand-text uppercase">{p.name}</td>
                    <td className="py-4 px-6 font-mono text-brand-muted text-xs">{p.sku}</td>
                    <td className="py-4 px-6 font-bold">{p.total_stock || 1200} pcs</td>
                    <td className="py-4 px-6">
                      <span className="px-3 py-1 bg-brand-surface text-brand-text rounded text-[10px] font-bold uppercase tracking-wider border border-brand-border">
                        IN STOCK
                      </span>
                    </td>
                    <td className="py-4 px-6 text-brand-muted text-xs uppercase tracking-wider">Gandhi Nagar Hub</td>
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
