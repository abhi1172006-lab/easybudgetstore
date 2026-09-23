import React, { useEffect, useState } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { api } from '../../services/api';
import { fileToDataUrl } from '../../lib/image';
import { useEnquiry } from '../../context/EnquiryContext';
import { getProduct } from '../../lib/cms';
import { ArrowLeft, Save, Plus, Trash2, Image as ImageIcon } from 'lucide-react';

const EMPTY = {
  name: '',
  sku: '',
  slug: '',
  categorySlug: 'hoodies',
  subcategory: '',
  description: '',
  wholesalePrice: 400,
  moq: 10,
  sizes: ['S', 'M', 'L', 'XL', 'XXL'],
  colors: [
    { id: 'c1', name: 'Black', code: '#000000', visible: true },
    { id: 'c2', name: 'White', code: '#ffffff', visible: true },
  ],
  stockMatrix: {},
  tags: '',
  featured: false,
  isBestseller: false,
  visibility: 'visible',
  images: [],
};

export default function AdminProductsNewPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { showToast } = useEnquiry();
  const [form, setForm] = useState(EMPTY);
  const [categories, setCategories] = useState([]);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState('');
  const [activeTab, setActiveTab] = useState('basic');

  useEffect(() => {
    api.getCategories().then((r) => {
      setCategories(r.categories);
      if (!id && r.categories[0]) setForm((f) => ({ ...f, categorySlug: r.categories[0].slug }));
    });
    if (id) {
      const p = getProduct(id);
      if (p) {
        // Ensure colors are objects (from the new schema)
        const colors = Array.isArray(p.colors)
          ? p.colors.map((c, i) =>
              typeof c === 'string'
                ? { id: `c${i + 1}`, name: c, code: '#999999', visible: true }
                : c
            )
          : EMPTY.colors;

        setForm({
          ...EMPTY,
          ...p,
          colors,
          sizes: p.sizes || EMPTY.sizes,
          stockMatrix: p.stockMatrix || {},
          tags: (p.tags || []).join(', '),
          images: p.images || [],
        });
      }
    }
  }, [id]);

  const set = (k, v) => setForm((f) => ({ ...f, [k]: v }));

  const addImages = async (files) => {
    try {
      const urls = [];
      for (const file of files) urls.push(await fileToDataUrl(file));
      setForm((f) => ({ ...f, images: [...f.images, ...urls] }));
      await Promise.all(urls.map((url, i) => api.addMedia({ url, name: files[i]?.name })));
    } catch (err) {
      setError(err.message);
    }
  };

  const removeImage = (idx) => {
    const imgs = [...form.images];
    imgs.splice(idx, 1);
    set('images', imgs);
  };

  // --- Color helpers ---
  const addColor = () => {
    const newId = `c${Date.now()}`;
    setForm((f) => ({
      ...f,
      colors: [...f.colors, { id: newId, name: 'New Color', code: '#cccccc', visible: true }],
    }));
  };

  const updateColor = (idx, field, value) => {
    const colors = [...form.colors];
    colors[idx] = { ...colors[idx], [field]: value };
    setForm((f) => ({ ...f, colors }));
  };

  const removeColor = (idx) => {
    const colors = [...form.colors];
    colors.splice(idx, 1);
    setForm((f) => ({ ...f, colors }));
  };

  // --- Size helpers ---
  const setSizesFromString = (str) => {
    set('sizes', str.split(',').map((s) => s.trim()).filter(Boolean));
  };

  // --- Matrix helpers ---
  const updateMatrix = (colorId, size, value) => {
    setForm((f) => ({
      ...f,
      stockMatrix: {
        ...f.stockMatrix,
        [`${colorId}_${size}`]: Math.max(0, parseInt(value || 0, 10)),
      },
    }));
  };

  const totalStock = Object.values(form.stockMatrix || {}).reduce((a, b) => a + Number(b || 0), 0);

  // --- Save ---
  const save = async (e) => {
    if (e) e.preventDefault();
    setError('');
    if (!form.name.trim()) {
      setError('Product name is required.');
      setActiveTab('basic');
      return;
    }
    setSaving(true);
    try {
      const payload = {
        ...form,
        tags: String(form.tags).split(',').map((s) => s.trim()).filter(Boolean),
        wholesalePrice: Number(form.wholesalePrice),
        moq: Number(form.moq),
        stockQuantity: totalStock,
        stockStatus: totalStock > 0 ? 'In stock' : 'Out of stock',
      };
      if (id) await api.updateProduct(id, payload);
      else await api.createProduct(payload);
      showToast('Product saved. Storefront updated instantly.');
      navigate('/admin/inventory');
    } catch (err) {
      setError(err.message);
    } finally {
      setSaving(false);
    }
  };

  const tabs = [
    { id: 'basic', label: 'Basic Info' },
    { id: 'images', label: `Images (${form.images.length})` },
    { id: 'variants', label: 'Variants & Stock' },
    { id: 'settings', label: 'Settings' },
  ];

  return (
    <div className="max-w-5xl mx-auto pb-24">
      {/* Page Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8">
        <div>
          <Link
            to="/admin/inventory"
            className="inline-flex items-center text-xs font-bold uppercase tracking-widest text-brand-muted hover:text-brand-text mb-1"
          >
            <ArrowLeft className="w-3.5 h-3.5 mr-1" /> Back to Inventory
          </Link>
          <h1 className="text-3xl font-extrabold uppercase tracking-widest text-brand-text font-editorial">
            {id ? 'Edit Product' : 'New Product'}
          </h1>
          {id && <p className="text-xs uppercase tracking-widest text-brand-muted mt-0.5">ID: {id}</p>}
        </div>
        <button
          onClick={save}
          disabled={saving}
          className="inline-flex items-center gap-2 px-6 py-3 bg-brand-dark text-white text-xs font-bold tracking-widest uppercase rounded shadow hover:bg-black disabled:opacity-50 transition-all"
        >
          <Save className="w-4 h-4" />
          {saving ? 'Saving...' : 'Save Product'}
        </button>
      </div>

      {/* Error Banner */}
      {error && (
        <div className="p-4 mb-6 bg-red-50 border border-red-200 text-red-700 text-sm font-bold rounded-lg uppercase tracking-wide">
          ⚠ {error}
        </div>
      )}

      {/* Tabbed Card */}
      <div className="bg-white border border-brand-border rounded-xl shadow-sm overflow-hidden">
        {/* Tab Nav */}
        <div className="flex border-b border-brand-border overflow-x-auto bg-brand-surface">
          {tabs.map((t) => (
            <button
              key={t.id}
              type="button"
              onClick={() => setActiveTab(t.id)}
              className={`px-6 py-4 text-xs font-bold tracking-widest uppercase transition-all whitespace-nowrap border-b-2 ${
                activeTab === t.id
                  ? 'border-brand-dark text-brand-text bg-white'
                  : 'border-transparent text-brand-muted hover:text-brand-text hover:bg-neutral-50'
              }`}
            >
              {t.label}
            </button>
          ))}
        </div>

        <div className="p-6 sm:p-8">
          {/* ── BASIC INFO ── */}
          {activeTab === 'basic' && (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div className="space-y-5">
                <div>
                  <label className="block text-xs font-bold uppercase tracking-widest text-brand-text mb-1.5">
                    Product Name *
                  </label>
                  <input
                    type="text"
                    value={form.name}
                    onChange={(e) => set('name', e.target.value)}
                    placeholder="e.g. Premium Winter Hoodie"
                    className="w-full p-3 border border-brand-border rounded-lg focus:ring-1 focus:ring-brand-dark outline-none text-sm"
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold uppercase tracking-widest text-brand-text mb-1.5">
                    Description
                  </label>
                  <textarea
                    value={form.description}
                    onChange={(e) => set('description', e.target.value)}
                    placeholder="Full product description for the product page..."
                    rows={6}
                    className="w-full p-3 border border-brand-border rounded-lg focus:ring-1 focus:ring-brand-dark outline-none text-sm resize-none"
                  />
                </div>
              </div>

              <div className="space-y-5">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-bold uppercase tracking-widest text-brand-text mb-1.5">
                      Wholesale Price (₹)
                    </label>
                    <input
                      type="number"
                      value={form.wholesalePrice}
                      onChange={(e) => set('wholesalePrice', e.target.value)}
                      className="w-full p-3 border border-brand-border rounded-lg focus:ring-1 focus:ring-brand-dark outline-none text-sm"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-bold uppercase tracking-widest text-brand-text mb-1.5">
                      MOQ (pieces)
                    </label>
                    <input
                      type="number"
                      value={form.moq}
                      onChange={(e) => set('moq', e.target.value)}
                      className="w-full p-3 border border-brand-border rounded-lg focus:ring-1 focus:ring-brand-dark outline-none text-sm"
                    />
                  </div>
                </div>
                <div>
                  <label className="block text-xs font-bold uppercase tracking-widest text-brand-text mb-1.5">
                    Category
                  </label>
                  <select
                    value={form.categorySlug}
                    onChange={(e) => set('categorySlug', e.target.value)}
                    className="w-full p-3 border border-brand-border rounded-lg focus:ring-1 focus:ring-brand-dark outline-none text-sm bg-white"
                  >
                    {categories.map((c) => (
                      <option key={c.id} value={c.slug}>{c.name}</option>
                    ))}
                  </select>
                </div>
                <div>
                  <label className="block text-xs font-bold uppercase tracking-widest text-brand-text mb-1.5">
                    SKU
                  </label>
                  <input
                    type="text"
                    value={form.sku}
                    onChange={(e) => set('sku', e.target.value)}
                    placeholder="Auto-generated if empty"
                    className="w-full p-3 border border-brand-border rounded-lg focus:ring-1 focus:ring-brand-dark outline-none text-sm"
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold uppercase tracking-widest text-brand-text mb-1.5">
                    Search Tags
                  </label>
                  <input
                    type="text"
                    value={form.tags}
                    onChange={(e) => set('tags', e.target.value)}
                    placeholder="hoodie, winter, bulk, black..."
                    className="w-full p-3 border border-brand-border rounded-lg focus:ring-1 focus:ring-brand-dark outline-none text-sm"
                  />
                </div>
              </div>
            </div>
          )}

          {/* ── IMAGES ── */}
          {activeTab === 'images' && (
            <div>
              <label className="flex flex-col items-center justify-center w-full h-36 border-2 border-brand-border border-dashed rounded-xl cursor-pointer bg-brand-surface hover:bg-neutral-100 transition-colors mb-6">
                <ImageIcon className="w-8 h-8 text-brand-muted mb-2" />
                <p className="text-xs font-bold uppercase tracking-widest text-brand-muted">Click to upload images</p>
                <input type="file" className="hidden" multiple accept="image/*" onChange={(e) => addImages([...e.target.files])} />
              </label>

              {form.images.length > 0 ? (
                <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-6 gap-4">
                  {form.images.map((url, i) => (
                    <div key={i} className="relative group aspect-[3/4] rounded-lg border border-brand-border overflow-hidden">
                      <img src={url} alt="" className="w-full h-full object-cover" />
                      {i === 0 && (
                        <div className="absolute bottom-1 left-1 bg-brand-dark text-white text-[9px] font-bold uppercase tracking-wider px-1.5 py-0.5 rounded">Primary</div>
                      )}
                      <button
                        type="button"
                        onClick={() => removeImage(i)}
                        className="absolute top-1 right-1 p-1 bg-red-600 text-white rounded opacity-0 group-hover:opacity-100 transition-opacity"
                      >
                        <Trash2 className="w-3 h-3" />
                      </button>
                    </div>
                  ))}
                </div>
              ) : (
                <p className="text-center text-brand-muted text-sm py-8 uppercase tracking-widest font-bold">No images yet — upload above</p>
              )}
            </div>
          )}

          {/* ── VARIANTS & STOCK ── */}
          {activeTab === 'variants' && (
            <div className="space-y-10">
              {/* 1. Sizes */}
              <section>
                <h3 className="text-xs font-bold uppercase tracking-widest text-brand-text border-b border-brand-border pb-2 mb-4">
                  1 — Define Sizes
                </h3>
                <input
                  type="text"
                  value={(form.sizes || []).join(', ')}
                  onChange={(e) => setSizesFromString(e.target.value)}
                  placeholder="S, M, L, XL, XXL"
                  className="w-full max-w-lg p-3 border border-brand-border rounded-lg focus:ring-1 focus:ring-brand-dark outline-none text-sm"
                />
                <p className="text-[10px] uppercase tracking-widest text-brand-muted mt-2 font-bold">
                  Enter sizes separated by commas
                </p>
              </section>

              {/* 2. Colors */}
              <section>
                <div className="flex items-center justify-between border-b border-brand-border pb-2 mb-4">
                  <h3 className="text-xs font-bold uppercase tracking-widest text-brand-text">2 — Define Colours</h3>
                  <button
                    type="button"
                    onClick={addColor}
                    className="inline-flex items-center gap-1 text-xs font-bold uppercase tracking-widest text-brand-dark hover:text-black"
                  >
                    <Plus className="w-4 h-4" /> Add Colour
                  </button>
                </div>

                <div className="space-y-3 max-w-xl">
                  {form.colors.map((c, idx) => (
                    <div key={c.id} className="flex items-center gap-3 p-3 border border-brand-border rounded-lg bg-brand-surface">
                      <input
                        type="color"
                        value={c.code}
                        onChange={(e) => updateColor(idx, 'code', e.target.value)}
                        className="w-10 h-10 rounded cursor-pointer border-none p-0 bg-transparent"
                        style={{ cursor: 'pointer' }}
                      />
                      <input
                        type="text"
                        value={c.name}
                        onChange={(e) => updateColor(idx, 'name', e.target.value)}
                        className="flex-1 p-2.5 bg-white border border-brand-border rounded-lg text-sm outline-none focus:ring-1 focus:ring-brand-dark"
                        placeholder="Color Name"
                      />
                      <label className="flex items-center gap-1 text-xs text-brand-muted font-bold">
                        <input
                          type="checkbox"
                          checked={c.visible !== false}
                          onChange={(e) => updateColor(idx, 'visible', e.target.checked)}
                          className="rounded"
                        />
                        Show
                      </label>
                      <button
                        type="button"
                        onClick={() => removeColor(idx)}
                        className="p-2 text-red-500 hover:bg-red-50 rounded-lg transition-colors"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  ))}
                  {form.colors.length === 0 && (
                    <p className="text-sm text-brand-muted uppercase font-bold tracking-widest py-4 text-center">
                      No colours — add one above
                    </p>
                  )}
                </div>
              </section>

              {/* 3. Stock Matrix */}
              {form.colors.length > 0 && form.sizes.length > 0 && (
                <section>
                  <div className="flex items-center justify-between border-b border-brand-border pb-2 mb-4">
                    <h3 className="text-xs font-bold uppercase tracking-widest text-brand-text">3 — Stock Matrix</h3>
                    <span className="text-xs font-bold text-brand-muted uppercase tracking-wider">
                      Total: <span className="text-brand-text">{totalStock}</span> units
                    </span>
                  </div>

                  <div className="overflow-x-auto rounded-xl border border-brand-border">
                    <table className="w-full text-sm">
                      <thead>
                        <tr className="bg-brand-surface border-b border-brand-border">
                          <th className="text-left p-4 text-xs font-bold uppercase tracking-widest text-brand-muted border-r border-brand-border w-44">
                            Colour ↓ / Size →
                          </th>
                          {form.sizes.map((s) => (
                            <th key={s} className="p-3 text-xs font-bold uppercase tracking-widest text-brand-text text-center min-w-[80px]">
                              {s}
                            </th>
                          ))}
                          <th className="p-4 text-xs font-bold uppercase tracking-widest text-brand-text text-center border-l border-brand-border bg-white">
                            Row Total
                          </th>
                        </tr>
                      </thead>
                      <tbody>
                        {form.colors.map((c) => {
                          const rowTotal = form.sizes.reduce(
                            (sum, s) => sum + Number(form.stockMatrix[`${c.id}_${s}`] || 0),
                            0
                          );
                          return (
                            <tr key={c.id} className="border-b border-brand-border last:border-0 hover:bg-neutral-50 transition-colors">
                              <td className="p-4 border-r border-brand-border">
                                <div className="flex items-center gap-2.5 font-bold text-brand-text">
                                  <span
                                    className="w-4 h-4 rounded-full border border-black/10 shrink-0"
                                    style={{ backgroundColor: c.code }}
                                  />
                                  {c.name}
                                </div>
                              </td>
                              {form.sizes.map((s) => (
                                <td key={s} className="p-2 text-center">
                                  <input
                                    type="number"
                                    min="0"
                                    value={form.stockMatrix[`${c.id}_${s}`] ?? ''}
                                    onChange={(e) => updateMatrix(c.id, s, e.target.value)}
                                    placeholder="0"
                                    className="w-full p-2 text-center border border-brand-border rounded-lg outline-none focus:border-brand-dark focus:ring-1 focus:ring-brand-dark text-sm font-bold"
                                  />
                                </td>
                              ))}
                              <td className="p-4 text-center border-l border-brand-border font-extrabold text-brand-text bg-white">
                                {rowTotal}
                              </td>
                            </tr>
                          );
                        })}
                      </tbody>
                      <tfoot>
                        <tr className="bg-brand-dark text-white">
                          <td className="p-4 border-r border-white/20 text-xs font-bold uppercase tracking-widest">
                            Grand Total
                          </td>
                          <td colSpan={form.sizes.length} className="p-4 text-xs text-white/60 uppercase tracking-widest font-bold text-center">
                            {form.sizes.map((s) => {
                              const colTotal = form.colors.reduce(
                                (sum, c) => sum + Number(form.stockMatrix[`${c.id}_${s}`] || 0),
                                0
                              );
                              return (
                                <span key={s} className="mx-2">
                                  {s}: {colTotal}
                                </span>
                              );
                            })}
                          </td>
                          <td className="p-4 text-center border-l border-white/20 text-xl font-black">
                            {totalStock}
                          </td>
                        </tr>
                      </tfoot>
                    </table>
                  </div>
                </section>
              )}
            </div>
          )}

          {/* ── SETTINGS ── */}
          {activeTab === 'settings' && (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-3xl">
              <div className="space-y-5">
                <div>
                  <label className="block text-xs font-bold uppercase tracking-widest text-brand-text mb-1.5">
                    Visibility
                  </label>
                  <select
                    value={form.visibility}
                    onChange={(e) => set('visibility', e.target.value)}
                    className="w-full p-3 border border-brand-border rounded-lg outline-none bg-white text-sm"
                  >
                    <option value="visible">Visible — Live in store</option>
                    <option value="hidden">Hidden — Direct link only</option>
                    <option value="archived">Archived — Removed from store</option>
                  </select>
                </div>
                <div>
                  <label className="block text-xs font-bold uppercase tracking-widest text-brand-text mb-2">
                    Promotional Badges
                  </label>
                  <div className="space-y-3 p-4 bg-brand-surface border border-brand-border rounded-lg">
                    {[
                      { key: 'featured', label: 'Featured Product' },
                      { key: 'isBestseller', label: 'Bestseller' },
                    ].map(({ key, label }) => (
                      <label key={key} className="flex items-center gap-3 cursor-pointer">
                        <input
                          type="checkbox"
                          checked={!!form[key]}
                          onChange={(e) => set(key, e.target.checked)}
                          className="w-4 h-4 rounded accent-brand-dark"
                        />
                        <span className="text-sm font-semibold text-brand-text">{label}</span>
                      </label>
                    ))}
                  </div>
                </div>
              </div>

              <div className="space-y-5">
                <div>
                  <label className="block text-xs font-bold uppercase tracking-widest text-brand-text mb-1.5">
                    SEO Title
                  </label>
                  <input
                    type="text"
                    value={form.seoTitle || ''}
                    onChange={(e) => set('seoTitle', e.target.value)}
                    placeholder="Defaults to product name"
                    className="w-full p-3 border border-brand-border rounded-lg outline-none text-sm"
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold uppercase tracking-widest text-brand-text mb-1.5">
                    SEO Description
                  </label>
                  <textarea
                    value={form.seoDescription || ''}
                    onChange={(e) => set('seoDescription', e.target.value)}
                    rows={3}
                    placeholder="Meta description for search engines..."
                    className="w-full p-3 border border-brand-border rounded-lg outline-none text-sm resize-none"
                  />
                </div>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Sticky Save */}
      <div className="fixed bottom-0 left-0 right-0 p-4 bg-white border-t border-brand-border shadow-elevated z-20 flex justify-end">
        <button
          onClick={save}
          disabled={saving}
          className="px-8 py-3.5 bg-brand-dark text-white text-xs font-bold tracking-widest uppercase rounded shadow hover:bg-black disabled:opacity-50 transition-all inline-flex items-center gap-2"
        >
          <Save className="w-4 h-4" />
          {saving ? 'Saving...' : 'Save Product'}
        </button>
      </div>
    </div>
  );
}
