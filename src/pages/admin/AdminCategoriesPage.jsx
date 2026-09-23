import React, { useEffect, useState } from 'react';
import { api } from '../../services/api';
import { fileToDataUrl } from '../../lib/image';
import { useEnquiry } from '../../context/EnquiryContext';
import EmptyState from '../../components/EmptyState';

export default function AdminCategoriesPage() {
  const [categories, setCategories] = useState([]);
  const [form, setForm] = useState({ name: '', description: '', image: '', visible: true });
  const [editing, setEditing] = useState(null);
  const { showToast } = useEnquiry();

  const load = async () => {
    const res = await api.getCategories();
    setCategories(res.categories);
  };
  useEffect(() => { load(); }, []);

  const save = async (e) => {
    e.preventDefault();
    try {
      if (editing) await api.updateCategory(editing, form);
      else await api.createCategory(form);
      showToast('Category saved. Storefront navigation updates automatically.');
      setForm({ name: '', description: '', image: '', visible: true });
      setEditing(null);
      load();
    } catch (err) {
      showToast(err.message, 'error');
    }
  };

  const onImage = async (file) => {
    if (!file) return;
    const url = await fileToDataUrl(file);
    setForm((f) => ({ ...f, image: url }));
  };

  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-extrabold uppercase tracking-widest font-editorial">Categories</h2>
      <form onSubmit={save} className="bg-white border border-brand-border rounded-xl p-5 grid sm:grid-cols-2 gap-3">
        <input required className="border border-brand-border rounded px-3 py-2 text-sm" placeholder="Category name" value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} />
        <input className="border border-brand-border rounded px-3 py-2 text-sm" placeholder="Description" value={form.description} onChange={(e) => setForm({ ...form, description: e.target.value })} />
        <input type="file" accept="image/*" onChange={(e) => onImage(e.target.files?.[0])} />
        <label className="text-xs flex items-center gap-2"><input type="checkbox" checked={form.visible} onChange={(e) => setForm({ ...form, visible: e.target.checked })} /> Visible on storefront</label>
        <button className="sm:col-span-2 px-4 py-2 bg-brand-dark text-white text-xs font-bold uppercase rounded">{editing ? 'Update category' : 'Add category'}</button>
      </form>
      {categories.length === 0 ? <EmptyState title="No categories" message="Add Winter T-Shirts, Hoodies and jackets from here." /> : (
        <div className="space-y-3">
          {categories.map((c) => (
            <div key={c.id} className="bg-white border border-brand-border rounded-lg p-4 flex flex-col sm:flex-row sm:items-center gap-4">
              {c.image && <img src={c.image} alt="" className="w-16 h-20 object-cover rounded" />}
              <div className="flex-1">
                <h3 className="font-bold">{c.name}</h3>
                <p className="text-xs text-brand-muted">{c.slug} · {c.visible === false ? 'Hidden' : 'Visible'}</p>
              </div>
              <div className="flex gap-2">
                <button type="button" className="text-xs uppercase font-bold" onClick={() => { setEditing(c.id); setForm({ name: c.name, description: c.description, image: c.image, visible: c.visible !== false }); }}>Edit</button>
                <button type="button" className="text-xs uppercase text-red-600" onClick={async () => { if (confirm('Delete category?')) { await api.deleteCategory(c.id); load(); } }}>Delete</button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
