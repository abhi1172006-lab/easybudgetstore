import React, { useEffect, useState } from 'react';
import { api } from '../../services/api';
import { fileToDataUrl } from '../../lib/image';
import { useEnquiry } from '../../context/EnquiryContext';
import EmptyState from '../../components/EmptyState';

export default function AdminMediaPage() {
  const [media, setMedia] = useState([]);
  const [error, setError] = useState('');
  const { showToast } = useEnquiry();

  const load = async () => {
    try {
      const res = await api.getMedia();
      setMedia(res.media || []);
    } catch (err) {
      setError(err.message);
    }
  };

  useEffect(() => { load(); }, []);

  const onUpload = async (e) => {
    const file = e.target.files?.[0];
    if (!file) return;
    try {
      const url = await fileToDataUrl(file);
      await api.addMedia({ url, name: file.name });
      showToast('Image added to media library.');
      load();
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between gap-4">
        <div>
          <h2 className="text-2xl font-extrabold tracking-widest uppercase font-editorial">Media library</h2>
          <p className="text-sm text-brand-muted mt-1">Upload images for products, categories and banners.</p>
        </div>
        <label className="px-4 py-2 bg-brand-dark text-white text-xs font-bold uppercase tracking-wider rounded cursor-pointer">
          Upload image
          <input type="file" accept="image/*" className="hidden" onChange={onUpload} />
        </label>
      </div>
      {error && <p className="text-sm text-red-600">{error}</p>}
      {media.length === 0 ? (
        <EmptyState title="No media yet" message="Upload product or banner images to reuse them across the site." />
      ) : (
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {media.map((m) => (
            <div key={m.id} className="border border-brand-border rounded-lg overflow-hidden bg-white">
              <img src={m.url} alt={m.name} className="aspect-square w-full object-cover" />
              <p className="p-2 text-[11px] truncate text-brand-muted">{m.name}</p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
