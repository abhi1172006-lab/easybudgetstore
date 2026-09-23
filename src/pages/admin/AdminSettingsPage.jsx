import React, { useEffect, useState } from 'react';
import { api } from '../../services/api';
import { fileToDataUrl } from '../../lib/image';
import { useAuth } from '../../context/AuthContext';
import { useEnquiry } from '../../context/EnquiryContext';
import { Save, Globe, MessageCircle, Instagram, Facebook, Search, Package, User, AlertTriangle, Sliders, Monitor, Smartphone, RotateCcw } from 'lucide-react';

const TABS = [
  { id: 'general', label: 'General', icon: Globe },
  { id: 'logo-header', label: 'Logo & Header Size', icon: Sliders },
  { id: 'contact', label: 'Contact & Social', icon: MessageCircle },
  { id: 'seo', label: 'SEO', icon: Search },
  { id: 'inventory', label: 'Inventory', icon: Package },
  { id: 'account', label: 'Account', icon: User },
];

function Field({ label, hint, children }) {
  return (
    <div>
      <label className="block text-xs font-bold uppercase tracking-widest text-brand-text mb-1">{label}</label>
      {hint && <p className="text-[11px] text-brand-muted mb-1.5 uppercase tracking-wide">{hint}</p>}
      {children}
    </div>
  );
}

const inp =
  'w-full p-3 border border-brand-border rounded-lg text-sm outline-none focus:ring-1 focus:ring-brand-dark bg-white transition-all';

export default function AdminSettingsPage() {
  const [s, setS] = useState(null);
  const [saving, setSaving] = useState(false);
  const [activeTab, setActiveTab] = useState('general');
  const [previewDevice, setPreviewDevice] = useState('desktop');
  const { user } = useAuth();
  const { showToast } = useEnquiry();

  useEffect(() => {
    api.getSettings().then((r) => setS(r.settings));
  }, []);

  if (!s) return (
    <div className="flex items-center justify-center h-40 text-brand-muted text-xs uppercase tracking-widest font-bold animate-pulse">
      Loading settings...
    </div>
  );

  const set = (k, v) => setS((x) => ({ ...x, [k]: v }));

  const applyPreset = (logoD, headerD, logoM, headerM, navSize = 14) => {
    setS((prev) => ({
      ...prev,
      logoHeightDesktop: logoD,
      headerHeightDesktop: headerD,
      logoHeightMobile: logoM,
      headerHeightMobile: headerM,
      navFontSize: navSize,
    }));
    showToast?.(`Preset applied: Desktop ${logoD}px logo / Nav ${navSize}px`);
  };

  const save = async () => {
    setSaving(true);
    try {
      await api.updateSettings(s);
      showToast('Settings saved. Changes are live immediately.');
    } catch (err) {
      showToast(err.message, 'error');
    } finally {
      setSaving(false);
    }
  };


  return (
    <div className="max-w-4xl mx-auto pb-24">
      {/* Header */}
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-3xl font-extrabold uppercase tracking-widest text-brand-text font-editorial">Settings</h1>
          <p className="text-xs uppercase tracking-widest text-brand-muted mt-1">Configure your store — changes are live immediately</p>
        </div>
        <button
          onClick={save}
          disabled={saving}
          className="inline-flex items-center gap-2 px-6 py-3 bg-brand-dark text-white text-xs font-bold tracking-widest uppercase rounded shadow hover:bg-black disabled:opacity-50 transition-all"
        >
          <Save className="w-4 h-4" />
          {saving ? 'Saving...' : 'Save Settings'}
        </button>
      </div>

      <div className="bg-white border border-brand-border rounded-xl shadow-sm overflow-hidden">
        {/* Tab Nav */}
        <div className="flex border-b border-brand-border overflow-x-auto bg-brand-surface">
          {TABS.map((t) => {
            const Icon = t.icon;
            return (
              <button
                key={t.id}
                onClick={() => setActiveTab(t.id)}
                className={`flex items-center gap-2 px-5 py-4 text-xs font-bold tracking-widest uppercase transition-all whitespace-nowrap border-b-2 ${
                  activeTab === t.id
                    ? 'border-brand-dark text-brand-text bg-white'
                    : 'border-transparent text-brand-muted hover:text-brand-text hover:bg-neutral-50'
                }`}
              >
                <Icon className="w-3.5 h-3.5" />
                {t.label}
              </button>
            );
          })}
        </div>

        <div className="p-6 sm:p-8">
          {/* ── GENERAL ── */}
          {activeTab === 'general' && (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <Field label="Store Name">
                <input type="text" value={s.siteName || ''} onChange={(e) => set('siteName', e.target.value)} className={inp} />
              </Field>
              <Field label="Wordmark / Brand Name">
                <input type="text" value={s.wordmark || ''} onChange={(e) => set('wordmark', e.target.value)} className={inp} />
              </Field>
              <Field label="Tagline" hint="Shown under logo in some contexts">
                <input type="text" value={s.tagline || ''} onChange={(e) => set('tagline', e.target.value)} className={inp} />
              </Field>
              <Field label="Owner Name">
                <input type="text" value={s.ownerName || ''} onChange={(e) => set('ownerName', e.target.value)} className={inp} />
              </Field>
              <div className="md:col-span-2">
                <Field label="Footer Description Text">
                  <textarea
                    rows={3}
                    value={s.footerText || ''}
                    onChange={(e) => set('footerText', e.target.value)}
                    className={`${inp} resize-none`}
                  />
                </Field>
              </div>
              <div className="md:col-span-2">
                <Field label="Logo Image" hint="Upload a PNG or SVG — displayed in header and footer">
                  <div className="flex items-center gap-4">
                    {s.logoUrl && (
                      <div className="shrink-0 h-16 w-40 border border-brand-border rounded-lg bg-brand-surface flex items-center justify-center p-2">
                        <img src={s.logoUrl} alt="Logo" className="max-h-full max-w-full object-contain" />
                      </div>
                    )}
                    <label className="cursor-pointer flex-1 p-3 border-2 border-dashed border-brand-border rounded-lg text-center text-xs font-bold uppercase tracking-widest text-brand-muted hover:bg-brand-surface transition-colors">
                      Click to upload new logo
                      <input
                        type="file"
                        accept="image/*"
                        className="hidden"
                        onChange={async (e) => {
                          const f = e.target.files?.[0];
                          if (f) set('logoUrl', await fileToDataUrl(f));
                        }}
                      />
                    </label>
                  </div>
                  <div className="mt-3 flex flex-col sm:flex-row sm:items-center justify-between gap-2 p-3 bg-brand-surface rounded-lg border border-brand-border text-xs">
                    <div>
                      <span className="font-bold text-brand-text uppercase tracking-wider">Logo Display Size: </span>
                      <span className="text-brand-muted">Desktop: {s.logoHeightDesktop || 80}px • Mobile: {s.logoHeightMobile || 50}px</span>
                    </div>
                    <button
                      type="button"
                      onClick={() => setActiveTab('logo-header')}
                      className="px-3 py-1.5 bg-brand-dark text-white text-[11px] font-bold uppercase tracking-wider rounded hover:bg-black transition-colors inline-flex items-center gap-1.5 shrink-0 self-start sm:self-auto"
                    >
                      <Sliders className="w-3.5 h-3.5" />
                      Adjust Logo Size →
                    </button>
                  </div>
                </Field>
              </div>
              <div className="md:col-span-2">
                <Field label="Business Hours">
                  <input type="text" value={s.businessHours || ''} onChange={(e) => set('businessHours', e.target.value)} className={inp} />
                </Field>
              </div>
            </div>
          )}

          {/* ── LOGO & HEADER SIZING ── */}
          {activeTab === 'logo-header' && (
            <div className="space-y-8">
              {/* Presets Bar */}
              <div className="p-5 bg-brand-surface border border-brand-border rounded-xl">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-4">
                  <div>
                    <h3 className="text-xs font-bold uppercase tracking-widest text-brand-text flex items-center gap-2">
                      <Sliders className="w-4 h-4 text-brand-dark" /> Quick Size Presets
                    </h3>
                    <p className="text-xs text-brand-muted mt-0.5">Click a preset to instantly set logo & header dimensions, or use the sliders below</p>
                  </div>
                  <button
                    type="button"
                    onClick={() => applyPreset(80, 110, 50, 80)}
                    className="text-xs font-bold text-brand-muted hover:text-brand-text flex items-center gap-1 uppercase tracking-wider shrink-0"
                  >
                    <RotateCcw className="w-3.5 h-3.5" /> Reset to Recommended
                  </button>
                </div>
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                  {[
                    { label: 'Compact', logoD: 60, headerD: 90, logoM: 40, headerM: 70, navSize: 11 },
                    { label: 'Standard', logoD: 80, headerD: 110, logoM: 50, headerM: 80, navSize: 14 },
                    { label: 'Large & Bold', logoD: 100, headerD: 130, logoM: 60, headerM: 90, navSize: 17 },
                    { label: 'Extra Large', logoD: 120, headerD: 150, logoM: 70, headerM: 100, navSize: 20 },
                  ].map((p) => {
                    const isSelected =
                      (s.logoHeightDesktop || 80) === p.logoD &&
                      (s.logoHeightMobile || 50) === p.logoM &&
                      (s.navFontSize || 14) === p.navSize;
                    return (
                      <button
                        key={p.label}
                        type="button"
                        onClick={() => applyPreset(p.logoD, p.headerD, p.logoM, p.headerM, p.navSize)}
                        className={`p-3 rounded-lg border text-left transition-all ${
                          isSelected
                            ? 'border-brand-dark bg-white shadow-sm ring-1 ring-brand-dark'
                            : 'border-brand-border bg-white hover:border-neutral-400'
                        }`}
                      >
                        <p className="text-xs font-bold text-brand-text">{p.label}</p>
                        <p className="text-[10px] text-brand-muted mt-1 uppercase tracking-wider font-semibold">
                          Logo: {p.logoD}px • Nav: {p.navSize}px
                        </p>
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Sliders Grid */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                {/* Desktop Controls */}
                <div className="p-5 border border-brand-border rounded-xl bg-white space-y-6 shadow-sm">
                  <div className="flex items-center gap-2 border-b border-brand-border pb-3">
                    <Monitor className="w-4 h-4 text-brand-dark" />
                    <div>
                      <h3 className="text-xs font-bold uppercase tracking-widest text-brand-text">Desktop Sizing</h3>
                      <p className="text-[11px] text-brand-muted">For Laptops, Computers & Tablets</p>
                    </div>
                  </div>

                  {/* Desktop Logo Height */}
                  <div>
                    <div className="flex items-center justify-between mb-2">
                      <label className="text-xs font-bold uppercase tracking-wider text-brand-text">
                        Desktop Logo Height
                      </label>
                      <div className="flex items-center gap-1">
                        <input
                          type="number"
                          min="35"
                          max="160"
                          value={s.logoHeightDesktop ?? 80}
                          onChange={(e) => set('logoHeightDesktop', Math.max(30, parseInt(e.target.value, 10) || 30))}
                          className="w-16 p-1 text-center font-bold text-xs border border-brand-border rounded focus:ring-1 focus:ring-brand-dark"
                        />
                        <span className="text-xs font-bold text-brand-muted">px</span>
                      </div>
                    </div>
                    <input
                      type="range"
                      min="35"
                      max="160"
                      value={s.logoHeightDesktop ?? 80}
                      onChange={(e) => set('logoHeightDesktop', parseInt(e.target.value, 10))}
                      className="w-full accent-brand-dark cursor-pointer h-2 bg-neutral-200 rounded-lg"
                    />
                    <div className="flex justify-between text-[10px] text-brand-muted uppercase font-bold mt-1.5">
                      <span>35px (Small)</span>
                      <span>80px (Recommended)</span>
                      <span>160px (Big)</span>
                    </div>
                  </div>

                  {/* Desktop Header Height */}
                  <div>
                    <div className="flex items-center justify-between mb-2">
                      <label className="text-xs font-bold uppercase tracking-wider text-brand-text">
                        Desktop Header Bar Height
                      </label>
                      <div className="flex items-center gap-1">
                        <input
                          type="number"
                          min="60"
                          max="180"
                          value={s.headerHeightDesktop ?? 110}
                          onChange={(e) => set('headerHeightDesktop', Math.max(50, parseInt(e.target.value, 10) || 50))}
                          className="w-16 p-1 text-center font-bold text-xs border border-brand-border rounded focus:ring-1 focus:ring-brand-dark"
                        />
                        <span className="text-xs font-bold text-brand-muted">px</span>
                      </div>
                    </div>
                    <input
                      type="range"
                      min="60"
                      max="180"
                      value={s.headerHeightDesktop ?? 110}
                      onChange={(e) => set('headerHeightDesktop', parseInt(e.target.value, 10))}
                      className="w-full accent-brand-dark cursor-pointer h-2 bg-neutral-200 rounded-lg"
                    />
                    <div className="flex justify-between text-[10px] text-brand-muted uppercase font-bold mt-1.5">
                      <span>60px (Slim)</span>
                      <span>110px (Recommended)</span>
                      <span>180px (Tall)</span>
                    </div>
                  </div>
                </div>

                {/* Mobile Controls */}
                <div className="p-5 border border-brand-border rounded-xl bg-white space-y-6 shadow-sm">
                  <div className="flex items-center gap-2 border-b border-brand-border pb-3">
                    <Smartphone className="w-4 h-4 text-brand-dark" />
                    <div>
                      <h3 className="text-xs font-bold uppercase tracking-widest text-brand-text">Mobile Sizing</h3>
                      <p className="text-[11px] text-brand-muted">For Mobile Phones</p>
                    </div>
                  </div>

                  {/* Mobile Logo Height */}
                  <div>
                    <div className="flex items-center justify-between mb-2">
                      <label className="text-xs font-bold uppercase tracking-wider text-brand-text">
                        Mobile Logo Height
                      </label>
                      <div className="flex items-center gap-1">
                        <input
                          type="number"
                          min="25"
                          max="100"
                          value={s.logoHeightMobile ?? 50}
                          onChange={(e) => set('logoHeightMobile', Math.max(20, parseInt(e.target.value, 10) || 20))}
                          className="w-16 p-1 text-center font-bold text-xs border border-brand-border rounded focus:ring-1 focus:ring-brand-dark"
                        />
                        <span className="text-xs font-bold text-brand-muted">px</span>
                      </div>
                    </div>
                    <input
                      type="range"
                      min="25"
                      max="100"
                      value={s.logoHeightMobile ?? 50}
                      onChange={(e) => set('logoHeightMobile', parseInt(e.target.value, 10))}
                      className="w-full accent-brand-dark cursor-pointer h-2 bg-neutral-200 rounded-lg"
                    />
                    <div className="flex justify-between text-[10px] text-brand-muted uppercase font-bold mt-1.5">
                      <span>25px (Small)</span>
                      <span>50px (Recommended)</span>
                      <span>100px (Big)</span>
                    </div>
                  </div>

                  {/* Mobile Header Height */}
                  <div>
                    <div className="flex items-center justify-between mb-2">
                      <label className="text-xs font-bold uppercase tracking-wider text-brand-text">
                        Mobile Header Bar Height
                      </label>
                      <div className="flex items-center gap-1">
                        <input
                          type="number"
                          min="50"
                          max="130"
                          value={s.headerHeightMobile ?? 80}
                          onChange={(e) => set('headerHeightMobile', Math.max(45, parseInt(e.target.value, 10) || 45))}
                          className="w-16 p-1 text-center font-bold text-xs border border-brand-border rounded focus:ring-1 focus:ring-brand-dark"
                        />
                        <span className="text-xs font-bold text-brand-muted">px</span>
                      </div>
                    </div>
                    <input
                      type="range"
                      min="50"
                      max="130"
                      value={s.headerHeightMobile ?? 80}
                      onChange={(e) => set('headerHeightMobile', parseInt(e.target.value, 10))}
                      className="w-full accent-brand-dark cursor-pointer h-2 bg-neutral-200 rounded-lg"
                    />
                    <div className="flex justify-between text-[10px] text-brand-muted uppercase font-bold mt-1.5">
                      <span>50px (Slim)</span>
                      <span>80px (Recommended)</span>
                      <span>130px (Tall)</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Nav Text Size */}
              <div className="p-5 border border-brand-border rounded-xl bg-white shadow-sm space-y-4">
                <div className="flex items-center gap-2 border-b border-brand-border pb-3">
                  <svg xmlns="http://www.w3.org/2000/svg" className="w-4 h-4 text-brand-dark" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="4 7 4 4 20 4 20 7"/><line x1="9" y1="20" x2="15" y2="20"/><line x1="12" y1="4" x2="12" y2="20"/></svg>
                  <div>
                    <h3 className="text-xs font-bold uppercase tracking-widest text-brand-text">Navigation Text Size</h3>
                    <p className="text-[11px] text-brand-muted">Controls font size of Home, Shop All, Categories, Winter, Wholesale, About links in header</p>
                  </div>
                </div>
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <label className="text-xs font-bold uppercase tracking-wider text-brand-text">Nav Link Font Size</label>
                    <div className="flex items-center gap-1">
                      <input
                        type="number"
                        min="10"
                        max="24"
                        value={s.navFontSize ?? 14}
                        onChange={(e) => set('navFontSize', Math.max(10, Math.min(24, parseInt(e.target.value, 10) || 14)))}
                        className="w-16 p-1 text-center font-bold text-xs border border-brand-border rounded focus:ring-1 focus:ring-brand-dark"
                      />
                      <span className="text-xs font-bold text-brand-muted">px</span>
                    </div>
                  </div>
                  <input
                    type="range"
                    min="10"
                    max="24"
                    value={s.navFontSize ?? 14}
                    onChange={(e) => set('navFontSize', parseInt(e.target.value, 10))}
                    className="w-full accent-brand-dark cursor-pointer h-2 bg-neutral-200 rounded-lg"
                  />
                  <div className="flex justify-between text-[10px] text-brand-muted uppercase font-bold mt-1.5">
                    <span>10px (Small)</span>
                    <span>14px (Default)</span>
                    <span>24px (Large)</span>
                  </div>
                </div>
                {/* Live Text Preview */}
                <div className="p-4 bg-neutral-50 border border-brand-border rounded-lg">
                  <p className="text-[10px] text-brand-muted uppercase tracking-wider font-bold mb-3">Nav Links Preview (Live)</p>
                  <div className="flex items-center gap-5 flex-wrap">
                    {['Home', 'Shop All', 'Categories', 'Winter', 'Wholesale', 'About'].map((lbl, i) => (
                      <span
                        key={lbl}
                        style={{ fontSize: `${s.navFontSize || 14}px` }}
                        className={`font-extrabold uppercase tracking-[0.12em] transition-all duration-150 ${i === 0 ? 'text-black border-b-2 border-black pb-0.5' : 'text-neutral-500'}`}
                      >
                        {lbl}
                      </span>
                    ))}
                  </div>
                </div>
              </div>

              {/* Real-time Interactive Preview */}
              <div className="p-6 bg-brand-surface border border-brand-border rounded-xl">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-4">
                  <div>
                    <h3 className="text-xs font-bold uppercase tracking-widest text-brand-text">Live Header Sizing Preview</h3>
                    <p className="text-xs text-brand-muted mt-0.5">Adjust the sliders above and watch the logo & header update here instantly</p>
                  </div>
                  <div className="flex items-center bg-white border border-brand-border rounded-lg p-1 shrink-0">
                    <button
                      type="button"
                      onClick={() => setPreviewDevice('desktop')}
                      className={`flex items-center gap-1.5 px-3 py-1.5 text-xs font-bold uppercase tracking-wider rounded transition-colors ${
                        previewDevice === 'desktop' ? 'bg-brand-dark text-white' : 'text-brand-muted hover:text-brand-text'
                      }`}
                    >
                      <Monitor className="w-3.5 h-3.5" /> Desktop
                    </button>
                    <button
                      type="button"
                      onClick={() => setPreviewDevice('mobile')}
                      className={`flex items-center gap-1.5 px-3 py-1.5 text-xs font-bold uppercase tracking-wider rounded transition-colors ${
                        previewDevice === 'mobile' ? 'bg-brand-dark text-white' : 'text-brand-muted hover:text-brand-text'
                      }`}
                    >
                      <Smartphone className="w-3.5 h-3.5" /> Mobile
                    </button>
                  </div>
                </div>

                {/* Preview Frame */}
                <div className="border border-brand-border rounded-xl bg-neutral-100 p-3 sm:p-4 overflow-x-auto">
                  {previewDevice === 'desktop' ? (
                    <div
                      className="w-full min-w-[700px] bg-white border border-brand-border rounded-lg px-6 flex items-center justify-between transition-all duration-150 shadow-sm"
                      style={{ height: `${s.headerHeightDesktop || 110}px` }}
                    >
                      <div className="flex items-center shrink-0">
                        <img
                          src={s.logoUrl || '/logo.png'}
                          alt="Logo Preview"
                          style={{ height: `${s.logoHeightDesktop || 80}px` }}
                          className="w-auto object-contain object-left transition-all duration-150"
                        />
                      </div>
                      <div className="flex items-center gap-4 font-extrabold uppercase tracking-[0.12em]" style={{ fontSize: `${s.navFontSize || 14}px` }}>
                        <span className="text-black border-b-2 border-black pb-0.5">Home</span>
                        <span className="text-neutral-500">Shop All</span>
                        <span className="text-neutral-500">Categories ▾</span>
                        <span className="text-neutral-500">Winter</span>
                        <span className="text-neutral-500">Wholesale</span>
                        <span className="text-neutral-500">About</span>
                      </div>
                      <div className="flex items-center gap-2.5 shrink-0">
                        <span className="px-3 py-1.5 text-xs font-extrabold uppercase tracking-wider border-2 border-emerald-400/40 rounded-lg text-emerald-800 bg-emerald-50">WhatsApp</span>
                        <span className="px-4 py-1.5 bg-brand-dark text-white text-xs font-extrabold uppercase tracking-wider rounded-lg">Bulk Enquiry</span>
                      </div>
                    </div>
                  ) : (
                    <div className="max-w-[360px] mx-auto bg-white border border-brand-border rounded-lg shadow-sm overflow-hidden">
                      <div
                        className="w-full px-4 flex items-center justify-between transition-all duration-150"
                        style={{ height: `${s.headerHeightMobile || 80}px` }}
                      >
                        <div className="flex items-center shrink-0">
                          <img
                            src={s.logoUrl || '/logo.png'}
                            alt="Logo Preview"
                            style={{ height: `${s.logoHeightMobile || 50}px` }}
                            className="w-auto object-contain object-left transition-all duration-150"
                          />
                        </div>
                        <div className="flex items-center gap-2">
                          <span className="p-2 border border-brand-border rounded text-xs">🔍</span>
                          <span className="p-2 bg-brand-surface border border-brand-border rounded text-xs font-bold">☰</span>
                        </div>
                      </div>
                    </div>
                  )}
                </div>

                <div className="mt-4 p-3.5 bg-emerald-50 border border-emerald-200 rounded-lg text-xs text-emerald-900 flex items-start gap-2.5">
                  <span className="text-base leading-none">✨</span>
                  <div>
                    <p className="font-bold">Aspect Ratio is always preserved.</p>
                    <p className="text-emerald-800 text-[11px] mt-0.5">Your logo will never be stretched, squished, or distorted. When you click <strong>"Save Settings"</strong>, your new logo size and header height become live immediately on the website.</p>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* ── CONTACT & SOCIAL ── */}
          {activeTab === 'contact' && (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <Field label="Phone Number" hint="Displayed in footer and contact page">
                <input type="tel" value={s.phone || ''} onChange={(e) => set('phone', e.target.value)} className={inp} placeholder="+91 92899 81449" />
              </Field>
              <Field label="Email Address">
                <input type="email" value={s.email || ''} onChange={(e) => set('email', e.target.value)} className={inp} />
              </Field>
              <Field
                label="WhatsApp Number"
                hint="Country code + number, no spaces or dashes. e.g. 919289981449"
              >
                <input type="text" value={s.whatsappNumber || ''} onChange={(e) => set('whatsappNumber', e.target.value)} className={inp} placeholder="919289981449" />
              </Field>
              <Field label="WhatsApp Display Text" hint="Formatted number shown to visitors">
                <input type="text" value={s.whatsappDisplay || ''} onChange={(e) => set('whatsappDisplay', e.target.value)} className={inp} placeholder="+91 92899 81449" />
              </Field>
              <div className="md:col-span-2">
                <Field label="Store Address">
                  <textarea rows={2} value={s.address || ''} onChange={(e) => set('address', e.target.value)} className={`${inp} resize-none`} />
                </Field>
              </div>

              <div className="md:col-span-2 border-t border-brand-border pt-6">
                <h3 className="text-xs font-bold uppercase tracking-widest text-brand-text mb-4">Social Media Links</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <Field label="Instagram URL">
                    <div className="relative">
                      <Instagram className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-brand-muted" />
                      <input
                        type="url"
                        value={s.instagram || ''}
                        onChange={(e) => set('instagram', e.target.value)}
                        className={`${inp} pl-9`}
                        placeholder="https://instagram.com/yourstore"
                      />
                    </div>
                  </Field>
                  <Field label="Facebook URL">
                    <div className="relative">
                      <Facebook className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-brand-muted" />
                      <input
                        type="url"
                        value={s.facebook || ''}
                        onChange={(e) => set('facebook', e.target.value)}
                        className={`${inp} pl-9`}
                        placeholder="https://facebook.com/yourstore"
                      />
                    </div>
                  </Field>
                </div>
              </div>

              <div className="md:col-span-2">
                <Field label="Google Maps Embed URL" hint="Paste the embed URL from Google Maps (iframe src)">
                  <input
                    type="text"
                    value={s.googleMapsEmbedUrl || ''}
                    onChange={(e) => set('googleMapsEmbedUrl', e.target.value)}
                    className={inp}
                    placeholder="https://maps.google.com/maps?q=..."
                  />
                </Field>
              </div>
            </div>
          )}

          {/* ── SEO ── */}
          {activeTab === 'seo' && (
            <div className="space-y-6 max-w-2xl">
              <Field label="SEO Title" hint="Shown in browser tab and Google results">
                <input type="text" value={s.seoTitle || ''} onChange={(e) => set('seoTitle', e.target.value)} className={inp} />
                <div className={`text-[10px] mt-1 font-bold uppercase tracking-wider ${(s.seoTitle || '').length > 60 ? 'text-red-500' : 'text-brand-muted'}`}>
                  {(s.seoTitle || '').length}/60 characters {(s.seoTitle || '').length > 60 && '— too long!'}
                </div>
              </Field>
              <Field label="SEO Description" hint="Meta description shown in Google results">
                <textarea rows={3} value={s.seoDescription || ''} onChange={(e) => set('seoDescription', e.target.value)} className={`${inp} resize-none`} />
                <div className={`text-[10px] mt-1 font-bold uppercase tracking-wider ${(s.seoDescription || '').length > 160 ? 'text-red-500' : 'text-brand-muted'}`}>
                  {(s.seoDescription || '').length}/160 characters {(s.seoDescription || '').length > 160 && '— too long!'}
                </div>
              </Field>
              <Field label="SEO Keywords" hint="Comma-separated search keywords">
                <textarea rows={4} value={s.seoKeywords || ''} onChange={(e) => set('seoKeywords', e.target.value)} className={`${inp} resize-none`} />
              </Field>
              <div className="p-4 bg-amber-50 border border-amber-200 rounded-lg text-xs text-amber-800 font-bold uppercase tracking-wider">
                💡 SEO changes affect how your store appears in Google Search. Save and redeploy to Netlify for changes to take effect.
              </div>
            </div>
          )}

          {/* ── INVENTORY ── */}
          {activeTab === 'inventory' && (
            <div className="space-y-6 max-w-2xl">
              <div className="p-4 bg-brand-surface border border-brand-border rounded-xl">
                <h3 className="text-xs font-bold uppercase tracking-widest text-brand-text mb-4">Stock Alert Thresholds</h3>
                <div className="grid grid-cols-2 gap-4">
                  <Field label="Low Stock Warning Level" hint="Mark product as 'low stock' when total drops below this">
                    <input
                      type="number"
                      min="0"
                      value={s.lowStockThreshold || 20}
                      onChange={(e) => set('lowStockThreshold', parseInt(e.target.value, 10))}
                      className={inp}
                    />
                  </Field>
                  <Field label="Default MOQ" hint="Default minimum order quantity for new products">
                    <input
                      type="number"
                      min="1"
                      value={s.defaultMoq || 10}
                      onChange={(e) => set('defaultMoq', parseInt(e.target.value, 10))}
                      className={inp}
                    />
                  </Field>
                </div>
              </div>

              <div className="p-4 bg-brand-surface border border-brand-border rounded-xl">
                <h3 className="text-xs font-bold uppercase tracking-widest text-brand-text mb-2 flex items-center gap-2">
                  <AlertTriangle className="w-4 h-4 text-amber-500" />
                  Auto-Status Rules
                </h3>
                <p className="text-xs text-brand-muted mb-4">These rules automatically update product status when stock changes.</p>
                <div className="space-y-3">
                  <label className="flex items-center gap-3 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={s.autoOutOfStock !== false}
                      onChange={(e) => set('autoOutOfStock', e.target.checked)}
                      className="w-4 h-4 rounded accent-brand-dark"
                    />
                    <div>
                      <span className="text-sm font-bold text-brand-text">Auto mark Out of Stock</span>
                      <p className="text-xs text-brand-muted">When all variant combinations reach 0, mark as Out of Stock</p>
                    </div>
                  </label>
                </div>
              </div>
            </div>
          )}

          {/* ── ACCOUNT ── */}
          {activeTab === 'account' && (
            <div className="space-y-8 max-w-md">
              <div className="p-5 bg-brand-surface border border-brand-border rounded-xl">
                <h3 className="text-xs font-bold uppercase tracking-widest text-brand-text mb-4">Admin Account</h3>
                <div className="flex items-center gap-3 p-3 bg-white border border-brand-border rounded-lg">
                  <div className="w-10 h-10 rounded-full bg-brand-dark text-white flex items-center justify-center font-extrabold text-sm uppercase">
                    {user?.email?.[0]?.toUpperCase() || 'A'}
                  </div>
                  <div>
                    <p className="text-sm font-bold text-brand-text">{user?.full_name || 'Admin'}</p>
                    <p className="text-xs text-brand-muted">{user?.email}</p>
                  </div>
                </div>
              </div>

              <div className="p-5 border border-brand-border rounded-xl bg-white">
                <h3 className="text-xs font-bold uppercase tracking-widest text-brand-text mb-2">Email OTP security</h3>
                <p className="text-xs text-brand-muted leading-relaxed">This admin no longer uses a website password. Each sign-in requires a fresh 6-digit code sent to the authorised owner email. To change the owner email, update the secure authentication configuration—not this public settings form.</p>
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
          {saving ? 'Saving...' : 'Save Settings'}
        </button>
      </div>
    </div>
  );
}
