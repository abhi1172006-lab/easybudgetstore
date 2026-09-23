import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { api } from '../../services/api';
import { useEnquiry } from '../../context/EnquiryContext';
import EmptyState from '../../components/EmptyState';

export default function AdminProductsPage() {
  const [products, setProducts] = useState([]);
  const [q, setQ] = useState('');
  const [loading, setLoading] = useState(true);
  const { showToast } = useEnquiry();

  const load = async () => {
    setLoading(true);
    try {
      const res = await api.getAdminProducts({ search: q || undefined });
      setProducts(res.products);
    } catch (err) {
      showToast(err.message, 'error');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => { load(); }, []);

  const act = async (fn, ok) => {
    try {
      await fn();
      showToast(ok);
      load();
    } catch (err) {
      showToast(err.message, 'error');
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-2xl font-extrabold tracking-widest uppercase font-editorial">Products</h2>
          <p className="text-sm text-brand-muted mt-1">Create, edit, duplicate, archive and restore catalogue items.</p>
        </div>
        <Link to="/admin/products/new" className="px-4 py-2.5 bg-brand-dark text-white text-xs font-bold uppercase tracking-wider rounded text-center">
          Add product
        </Link>
      </div>

      <form onSubmit={(e) => { e.preventDefault(); load(); }} className="flex gap-2">
        <input value={q} onChange={(e) => setQ(e.target.value)} placeholder="Search name, SKU, tags" className="flex-1 border border-brand-border rounded px-3 py-2 text-sm" />
        <button type="submit" className="px-4 py-2 border border-brand-border rounded text-xs font-bold uppercase">Search</button>
      </form>

      {loading ? <p className="text-xs uppercase tracking-widest text-brand-muted">Loading…</p> : products.length === 0 ? (
        <EmptyState title="No products" message="Add your first wholesale style." actionTo="/admin/products/new" actionLabel="Add product" />
      ) : (
        <div className="space-y-3 lg:hidden">
          {products.map((p) => (
            <div key={p.id} className="bg-white border border-brand-border rounded-lg p-4">
              <p className="text-[10px] uppercase text-brand-muted">{p.sku} · {p.categoryName}</p>
              <h3 className="font-bold">{p.name}</h3>
              <p className="text-sm mt-1">₹{p.wholesalePrice} · MOQ {p.moq} · {p.visibility}</p>
              <div className="flex flex-wrap gap-2 mt-3">
                <Link to={`/admin/products/${p.id}`} className="text-xs underline">Edit</Link>
                <button type="button" className="text-xs" onClick={() => act(() => api.duplicateProduct(p.id), 'Duplicated')}>Duplicate</button>
                {p.status === 'ARCHIVED' ? (
                  <button type="button" className="text-xs" onClick={() => act(() => api.restoreProduct(p.id), 'Restored')}>Restore</button>
                ) : (
                  <button type="button" className="text-xs" onClick={() => act(() => api.archiveProduct(p.id), 'Archived')}>Archive</button>
                )}
                <button type="button" className="text-xs text-red-600" onClick={() => { if (confirm('Delete this product?')) act(() => api.deleteProduct(p.id), 'Deleted'); }}>Delete</button>
              </div>
            </div>
          ))}
        </div>
      )}

      {!loading && products.length > 0 && (
        <div className="hidden lg:block bg-white border border-brand-border rounded-xl overflow-x-auto">
          <table className="w-full text-left text-sm">
            <thead className="text-[10px] uppercase tracking-widest text-brand-muted bg-brand-surface">
              <tr>
                <th className="p-4">Product</th>
                <th className="p-4">SKU</th>
                <th className="p-4">Price</th>
                <th className="p-4">Stock</th>
                <th className="p-4">Status</th>
                <th className="p-4">Actions</th>
              </tr>
            </thead>
            <tbody>
              {products.map((p) => (
                <tr key={p.id} className="border-t border-brand-border">
                  <td className="p-4">
                    <div className="flex items-center gap-3">
                      <img src={p.image_url} alt="" className="w-12 h-14 object-cover rounded border" />
                      <div>
                        <p className="font-bold">{p.name}</p>
                        <p className="text-xs text-brand-muted">{p.categoryName}</p>
                      </div>
                    </div>
                  </td>
                  <td className="p-4 font-mono text-xs">{p.sku}</td>
                  <td className="p-4">₹{p.wholesalePrice}</td>
                  <td className="p-4">{p.stockQuantity}</td>
                  <td className="p-4 uppercase text-[10px]">{p.visibility}</td>
                  <td className="p-4 space-x-2 whitespace-nowrap">
                    <Link to={`/admin/products/${p.id}`} className="text-xs font-bold uppercase">Edit</Link>
                    <button type="button" className="text-xs" onClick={() => act(() => api.duplicateProduct(p.id), 'Duplicated')}>Copy</button>
                    {p.status === 'ARCHIVED'
                      ? <button type="button" className="text-xs" onClick={() => act(() => api.restoreProduct(p.id), 'Restored')}>Restore</button>
                      : <button type="button" className="text-xs" onClick={() => act(() => api.archiveProduct(p.id), 'Archived')}>Archive</button>}
                    <button type="button" className="text-xs text-red-600" onClick={() => { if (confirm('Delete this product?')) act(() => api.deleteProduct(p.id), 'Deleted'); }}>Delete</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
