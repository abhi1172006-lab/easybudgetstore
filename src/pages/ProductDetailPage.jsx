import React, { useState, useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { ArrowLeft, MessageCircle, ShieldCheck, Truck, Layers, Share2, Link2, Facebook } from 'lucide-react';
import { api } from '../services/api';
import { useCms } from '../context/CmsContext';
import { useEnquiry } from '../context/EnquiryContext';
import ProductCard from '../components/ProductCard';
import EnquiryForm from '../components/EnquiryForm';
import { SafeImage } from '../components/SafeImage';
import Seo from '../components/Seo';

export default function ProductDetailPage() {
  const { id } = useParams();
  const { site } = useCms();
  const navigate = useNavigate();
  const { openEnquiry, showToast } = useEnquiry();

  const [product, setProduct] = useState(null);
  const [relatedProducts, setRelatedProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  const [activeImageIndex, setActiveImageIndex] = useState(0);
  const [selectedSize, setSelectedSize] = useState('');
  const [selectedColor, setSelectedColor] = useState('');

  useEffect(() => {
    async function loadData() {
      try {
        setLoading(true);
        const res = await api.getProductByIdentifier(id);
        setProduct(res.product);
        
        const validColors = res.product.colors?.filter(c => c.visible !== false) || [];
        if (validColors.length > 0) setSelectedColor(validColors[0].id);
        if (res.product.sizes?.length > 0) setSelectedSize(res.product.sizes[0]);
        
        const relatedRes = await api.getProducts({ category: res.product.categorySlug || res.product.categoryName });
        setRelatedProducts(relatedRes.products.filter((p) => p.id !== res.product.id).slice(0, 4));
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    }
    loadData();
  }, [id]);

  if (loading) {
    return <div className="text-center py-32 text-brand-muted font-bold text-xs uppercase tracking-widest animate-pulse">Loading Product Data...</div>;
  }

  if (!product) {
    return (
      <div className="py-24 text-center bg-white">
        <h2 className="text-2xl font-bold uppercase tracking-wider text-brand-text mb-4 font-editorial">
          Product Not Found
        </h2>
        <p className="text-sm text-brand-muted mb-8">
          The requested wholesale style is not currently in the catalog.
        </p>
        <Link to="/" className="px-6 py-3 bg-brand-dark text-white text-xs font-bold tracking-wider uppercase rounded">
          Return to Home
        </Link>
      </div>
    );
  }

  // Stock Matrix Lookups
  const stockMatrix = product.stockMatrix || {};
  const currentComboKey = `${selectedColor}_${selectedSize}`;
  const currentStock = stockMatrix[currentComboKey] || 0;
  const isOutOfStock = currentStock === 0;
  
  const handleWhatsAppInquiry = () => {
    const colorName = product.colors?.find(c => c.id === selectedColor)?.name || '';
    const msg = `Hi EasyBudgetStore, I am interested in wholesale sourcing for: ${product.name} (SKU: ${product.sku}). I'm looking at ${colorName} - Size ${selectedSize}. Please share a catalogue and rates.`;
    window.open(site.getWhatsAppLink(msg), '_blank');
  };
  
  const handleCopyLink = () => {
    navigator.clipboard.writeText(window.location.href);
    showToast?.('Link copied to clipboard');
  };

  const images = product.images || (product.image_url ? [product.image_url] : ['https://via.placeholder.com/600x800?text=No+Image']);
  const activeColors = product.colors?.filter(c => c.visible !== false) || [];

  return (
    <div className="bg-white py-8 sm:py-14">
      <Seo title={`${product.seoTitle || product.name} | EasyBudgetStore`} description={product.seoDescription || product.description} />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="mb-8 flex items-center justify-between">
          <button onClick={() => navigate(-1)} className="inline-flex items-center text-xs font-semibold tracking-wider uppercase text-brand-muted hover:text-brand-text transition-colors">
            <ArrowLeft className="w-3.5 h-3.5 mr-1.5" />
            <span>Back to Collection</span>
          </button>
          
          <div className="flex items-center gap-2">
            <button onClick={handleCopyLink} className="p-2 border border-brand-border rounded text-brand-muted hover:text-brand-text hover:bg-brand-surface transition-colors" title="Copy Link">
              <Link2 className="w-4 h-4" />
            </button>
            <a href={`https://wa.me/?text=Check out this wholesale style from EasyBudgetStore: ${window.location.href}`} target="_blank" rel="noreferrer" className="p-2 border border-brand-border rounded text-emerald-600 hover:bg-emerald-50 transition-colors" title="Share on WhatsApp">
              <Share2 className="w-4 h-4" />
            </a>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14">
          
          <div className="lg:col-span-7 flex flex-col-reverse sm:flex-row gap-4">
            {images.length > 1 && (
              <div className="flex sm:flex-col gap-3 overflow-x-auto sm:overflow-visible">
                {images.map((img, idx) => (
                  <button key={idx} onClick={() => setActiveImageIndex(idx)} className={`w-16 h-20 sm:w-20 sm:h-24 rounded border overflow-hidden flex-shrink-0 transition-all ${activeImageIndex === idx ? 'border-brand-dark ring-1 ring-brand-dark' : 'border-brand-border hover:border-neutral-400 opacity-70 hover:opacity-100'}`}>
                    <SafeImage src={img} alt="" className="w-full h-full object-cover object-center" />
                  </button>
                ))}
              </div>
            )}
            <div className="flex-1 bg-brand-surface rounded-xl overflow-hidden border border-brand-border shadow-elevated relative">
              <SafeImage src={images[activeImageIndex]} alt={product.name} className="w-full h-auto aspect-[3/4] object-cover object-center" />
              <div className="absolute top-4 left-4 bg-white/95 backdrop-blur-sm border border-brand-border text-brand-dark text-[10px] font-bold tracking-widest uppercase px-3 py-1 rounded">
                WHOLESALE ONLY • GANDHI NAGAR
              </div>
              {isOutOfStock && (
                 <div className="absolute top-4 right-4 bg-red-600 text-white text-[10px] font-bold tracking-widest uppercase px-3 py-1 rounded">
                   OUT OF STOCK
                 </div>
              )}
            </div>
          </div>

          <div className="lg:col-span-5 flex flex-col justify-between">
            <div>
              <div className="flex items-center gap-2 text-xs font-semibold tracking-wider uppercase text-brand-muted mb-2">
                <span>{product.categoryName || product.category}</span>
                {product.subcategory && <><span>/</span><span>{product.subcategory}</span></>}
              </div>

              <h1 className="text-2xl sm:text-3xl font-extrabold tracking-[0.08em] uppercase text-brand-text font-editorial mb-4">
                {product.name}
              </h1>

              <div className="p-4 bg-brand-surface border border-brand-border rounded-xl mb-6">
                <div className="flex items-center justify-between mb-3">
                  <span className="text-[10px] font-bold tracking-ultra uppercase text-amber-700">WHOLESALE TIERED SLAB PRICING</span>
                  <span className="text-[10px] font-bold uppercase tracking-wider text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded border border-emerald-200">Direct Factory Rates</span>
                </div>

                <div className="grid grid-cols-3 gap-2 text-center mb-3">
                  <div className="p-2.5 bg-white border border-brand-border rounded-lg shadow-sm">
                    <span className="text-[10px] font-semibold text-brand-muted uppercase block">10–49 Pcs</span>
                    <span className="text-base font-extrabold text-brand-text font-editorial block mt-0.5">₹{product.price_slab_a || product.wholesalePrice}</span>
                    <span className="text-[9px] text-amber-700 font-bold block">Standard MOQ</span>
                  </div>
                  <div className="p-2.5 bg-white border border-amber-300 rounded-lg shadow-sm ring-1 ring-amber-400/30">
                    <span className="text-[10px] font-semibold text-brand-muted uppercase block">50–99 Pcs</span>
                    <span className="text-base font-extrabold text-brand-text font-editorial block mt-0.5">₹{product.price_slab_b || product.wholesalePrice - 10}</span>
                    <span className="text-[9px] text-emerald-700 font-bold block">Save ₹10/pc</span>
                  </div>
                  <div className="p-2.5 bg-amber-600 text-white rounded-lg shadow-sm">
                    <span className="text-[10px] font-semibold uppercase block opacity-90">100+ Pcs</span>
                    <span className="text-base font-black font-editorial block mt-0.5">₹{product.price_slab_c || product.wholesalePrice - 25}</span>
                    <span className="text-[9px] font-bold block opacity-90">Best Bulk Rate</span>
                  </div>
                </div>

                <p className="text-[11px] text-brand-muted flex flex-wrap gap-2">
                  <span>MOQ: <strong>{product.moq} pieces</strong>.</span>
                  <span>SKU: {product.sku}.</span>
                  {isOutOfStock ? (
                    <span className="text-red-600 font-bold">This variant is out of stock.</span>
                  ) : (
                    <span className="text-emerald-600 font-bold">In stock ({currentStock} available).</span>
                  )}
                </p>
              </div>

              <div className="mb-6">
                <h3 className="text-xs font-bold tracking-wider uppercase text-brand-text mb-2 font-editorial">Product Overview</h3>
                <p className="text-xs sm:text-sm text-brand-muted leading-relaxed">{product.description}</p>
              </div>

              {activeColors.length > 0 && (
                <div className="mb-6">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-xs font-bold tracking-wider uppercase text-brand-text font-editorial">Colour Variants</span>
                    <span className="text-[11px] text-brand-muted">Seasonal Assortment</span>
                  </div>
                  <div className="flex flex-wrap gap-3">
                    {activeColors.map((c) => (
                      <button
                        key={c.id}
                        onClick={() => setSelectedColor(c.id)}
                        className={`group relative w-10 h-10 rounded-full border-2 transition-all flex items-center justify-center ${
                          selectedColor === c.id ? 'border-brand-dark shadow-md scale-110' : 'border-transparent hover:border-neutral-300'
                        }`}
                        title={c.name}
                      >
                        <span className="w-8 h-8 rounded-full border border-black/10" style={{ backgroundColor: c.code }}></span>
                      </button>
                    ))}
                  </div>
                  <p className="text-[10px] uppercase font-bold text-brand-muted mt-2 tracking-wider">
                    Selected: {activeColors.find(c => c.id === selectedColor)?.name || 'None'}
                  </p>
                </div>
              )}

              {product.sizes && product.sizes.length > 0 && (
                <div className="mb-6">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-xs font-bold tracking-wider uppercase text-brand-text font-editorial">Available Sizing</span>
                    <span className="text-[11px] text-brand-muted">Standard Retail Sets</span>
                  </div>
                  <div className="flex flex-wrap gap-2">
                    {product.sizes.map((s) => {
                      const stockForCombo = stockMatrix[`${selectedColor}_${s}`] || 0;
                      const sizeOutOfStock = stockForCombo === 0;
                      
                      return (
                        <button
                          key={s}
                          disabled={sizeOutOfStock}
                          onClick={() => setSelectedSize(s)}
                          className={`min-w-[48px] px-3.5 py-1.5 text-xs font-semibold tracking-wider rounded border transition-colors ${
                            selectedSize === s
                              ? 'bg-brand-dark text-white border-brand-dark shadow-sm'
                              : sizeOutOfStock 
                                ? 'bg-brand-surface border-brand-border/50 text-neutral-400 cursor-not-allowed opacity-50' 
                                : 'bg-white border-brand-border text-brand-text hover:border-neutral-400'
                          }`}
                          title={sizeOutOfStock ? 'Out of stock in selected color' : `${stockForCombo} available`}
                        >
                          {s}
                        </button>
                      );
                    })}
                  </div>
                </div>
              )}

              <div className="space-y-3 pt-2">
                <button
                  disabled={isOutOfStock}
                  onClick={() => openEnquiry(product)}
                  className={`w-full py-3.5 rounded text-xs font-bold tracking-[0.2em] uppercase transition-all shadow-sm flex items-center justify-center gap-2 ${
                    isOutOfStock ? 'bg-brand-surface text-brand-muted cursor-not-allowed border border-brand-border' : 'bg-brand-dark hover:bg-black text-white'
                  }`}
                >
                  <span>{isOutOfStock ? 'OUT OF STOCK' : 'GET WHOLESALE PRICE'}</span>
                </button>

                <button
                  onClick={handleWhatsAppInquiry}
                  className="w-full py-3.5 border border-brand-border hover:border-brand-dark text-brand-text rounded text-xs font-bold tracking-[0.16em] uppercase transition-colors flex items-center justify-center gap-2 hover:bg-brand-surface"
                >
                  <MessageCircle className="w-4 h-4 text-emerald-600" />
                  <span>ENQUIRE ON WHATSAPP</span>
                </button>
              </div>
            </div>

            <div className="mt-8 pt-6 border-t border-brand-border space-y-2 text-xs text-brand-muted">
              <div className="flex items-center gap-2">
                <ShieldCheck className="w-4 h-4 text-brand-dark flex-shrink-0" />
                <span>Gandhi Nagar Delhi wholesale hub sourcing</span>
              </div>
              <div className="flex items-center gap-2">
                <Layers className="w-4 h-4 text-brand-dark flex-shrink-0" />
                <span>Assorted sizes & colors packaged for retail racks</span>
              </div>
            </div>
          </div>
        </div>

        <div className="mt-20 pt-16 border-t border-brand-border">
          <div className="max-w-3xl mx-auto">
            <EnquiryForm prefilledProduct={product} />
          </div>
        </div>

        {relatedProducts.length > 0 && (
          <div className="mt-20 pt-16 border-t border-brand-border">
            <div className="mb-10">
              <span className="text-xs font-bold tracking-ultra uppercase text-brand-muted block mb-1 font-editorial">SIMILAR WHOLESALE STYLES</span>
              <h2 className="text-xl sm:text-2xl font-extrabold tracking-[0.1em] uppercase text-brand-text font-editorial">MORE FROM {product.categoryName || product.category}</h2>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {relatedProducts.map((p) => (
                <ProductCard key={p.id} product={p} />
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
