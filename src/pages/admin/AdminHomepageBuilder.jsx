import React, { useEffect, useState } from 'react';
import { api } from '../../services/api';
import { fileToDataUrl } from '../../lib/image';
import { useEnquiry } from '../../context/EnquiryContext';

export default function AdminHomepageBuilder() {
  const [hp, setHp] = useState(null);
  const [error, setError] = useState('');
  const { showToast } = useEnquiry();

  useEffect(() => {
    api.getHomepage().then((r) => setHp(JSON.parse(JSON.stringify(r.homepage))));
  }, []);

  if (!hp) return <p className="text-xs uppercase tracking-widest text-brand-muted">Loading homepage…</p>;

  const setHero = (k, v) => setHp((h) => ({ ...h, hero: { ...h.hero, [k]: v } }));
  const setSec = (sec, k, v) => setHp((h) => ({ ...h, [sec]: { ...h[sec], [k]: v } }));

  const save = async () => {
    try {
      await api.saveHomepage(hp);
      showToast('Homepage saved. Refresh the storefront to confirm.');
    } catch (err) {
      setError(err.message);
    }
  };

  const upload = async (cb, file) => {
    if (!file) return;
    cb(await fileToDataUrl(file));
  };

  const inp = 'w-full border border-brand-border rounded px-3 py-2 text-sm mt-1';

  return (
    <div className="space-y-6 pb-16">
      <div className="flex justify-between gap-3">
        <h2 className="text-2xl font-extrabold uppercase tracking-widest font-editorial">Homepage</h2>
        <button onClick={save} className="px-4 py-2 bg-brand-dark text-white text-xs font-bold uppercase rounded">Save homepage</button>
      </div>
      {error && <p className="text-red-600 text-sm">{error}</p>}

      <section className="bg-white border rounded-xl p-5 space-y-3">
        <label className="text-xs flex items-center gap-2"><input type="checkbox" checked={hp.hero.enabled} onChange={(e) => setHero('enabled', e.target.checked)} /> Hero enabled</label>
        <input className={inp} value={hp.hero.eyebrow} onChange={(e) => setHero('eyebrow', e.target.value)} />
        <input className={inp} value={hp.hero.heading} onChange={(e) => setHero('heading', e.target.value)} />
        <textarea className={inp} rows={3} value={hp.hero.subtitle} onChange={(e) => setHero('subtitle', e.target.value)} />
        <input className={inp} value={hp.hero.primaryCta} onChange={(e) => setHero('primaryCta', e.target.value)} />
        <input className={inp} value={hp.hero.primaryCtaUrl} onChange={(e) => setHero('primaryCtaUrl', e.target.value)} />
        <input className={inp} value={hp.hero.secondaryCta} onChange={(e) => setHero('secondaryCta', e.target.value)} />
        <input type="file" accept="image/*" onChange={(e) => upload((url) => setHero('image', url), e.target.files?.[0])} />
      </section>

      <section className="bg-white border rounded-xl p-5 space-y-3">
        <h3 className="text-xs font-bold uppercase">Categories section</h3>
        <input className={inp} value={hp.categoriesSection.title} onChange={(e) => setSec('categoriesSection', 'title', e.target.value)} />
        <input className={inp} value={hp.categoriesSection.subtitle} onChange={(e) => setSec('categoriesSection', 'subtitle', e.target.value)} />
      </section>

      <section className="bg-white border rounded-xl p-5 space-y-3">
        <h3 className="text-xs font-bold uppercase">Featured section</h3>
        <input className={inp} value={hp.featuredSection.title} onChange={(e) => setSec('featuredSection', 'title', e.target.value)} />
        <input className={inp} value={hp.featuredSection.subtitle} onChange={(e) => setSec('featuredSection', 'subtitle', e.target.value)} />
      </section>

      <section className="bg-white border rounded-xl p-5 space-y-3">
        <h3 className="text-xs font-bold uppercase">About</h3>
        <input className={inp} value={hp.about.heading} onChange={(e) => setSec('about', 'heading', e.target.value)} />
        <textarea className={inp} rows={4} value={hp.about.description} onChange={(e) => setSec('about', 'description', e.target.value)} />
      </section>

      <section className="bg-white border rounded-xl p-5 space-y-3">
        <h3 className="text-xs font-bold uppercase">Why choose us</h3>
        <input className={inp} value={hp.whyChooseUs.heading} onChange={(e) => setSec('whyChooseUs', 'heading', e.target.value)} />
        <textarea className={inp} rows={3} value={hp.whyChooseUs.description} onChange={(e) => setSec('whyChooseUs', 'description', e.target.value)} />
        {(hp.whyChooseUs.items || []).map((item, i) => (
          <div key={item.id} className="grid sm:grid-cols-2 gap-2">
            <input className={inp} value={item.heading} onChange={(e) => {
              const items = [...hp.whyChooseUs.items];
              items[i] = { ...item, heading: e.target.value };
              setSec('whyChooseUs', 'items', items);
            }} />
            <input className={inp} value={item.description} onChange={(e) => {
              const items = [...hp.whyChooseUs.items];
              items[i] = { ...item, description: e.target.value };
              setSec('whyChooseUs', 'items', items);
            }} />
          </div>
        ))}
      </section>

      <section className="bg-white border rounded-xl p-5 space-y-3">
        <h3 className="text-xs font-bold uppercase">Banner</h3>
        {(hp.banners || []).map((b, i) => (
          <div key={b.id} className="space-y-2">
            <input className={inp} value={b.title} onChange={(e) => {
              const banners = [...hp.banners];
              banners[i] = { ...b, title: e.target.value };
              setHp({ ...hp, banners });
            }} />
            <input className={inp} value={b.text} onChange={(e) => {
              const banners = [...hp.banners];
              banners[i] = { ...b, text: e.target.value };
              setHp({ ...hp, banners });
            }} />
            <input className={inp} value={b.cta} onChange={(e) => {
              const banners = [...hp.banners];
              banners[i] = { ...b, cta: e.target.value };
              setHp({ ...hp, banners });
            }} />
            <input className={inp} value={b.link} onChange={(e) => {
              const banners = [...hp.banners];
              banners[i] = { ...b, link: e.target.value };
              setHp({ ...hp, banners });
            }} />
          </div>
        ))}
      </section>
    </div>
  );
}
