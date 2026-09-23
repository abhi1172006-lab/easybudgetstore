import React, { useState } from 'react';
import { MessageCircle, CheckCircle, Send, ArrowRight } from 'lucide-react';
import siteConfig from '../config/siteConfig';
import { useEnquiry } from '../context/EnquiryContext';

export default function EnquiryForm({ prefilledProduct = null, onSuccess = null }) {
  const { showToast } = useEnquiry();

  const [formData, setFormData] = useState({
    name: '',
    businessName: '',
    mobileNumber: '',
    whatsappNumber: '',
    email: '',
    city: '',
    businessType: 'Retail Store',
    interestedCategory: prefilledProduct ? `${prefilledProduct.category}'s ${prefilledProduct.subcategory}` : "Men's Hoodies",
    estimatedRequirement: 'Medium',
    message: prefilledProduct ? `Enquiring for wholesale availability & pricing for ${prefilledProduct.name}.` : ''
  });

  const [submitted, setSubmitted] = useState(false);
  const [submitting, setSubmitting] = useState(false);

  const businessTypes = [
    'Retail Store',
    'Boutique',
    'Reseller',
    'Online Seller',
    'Wholesaler',
    'Other'
  ];

  const categories = [
    "Men's T-Shirts",
    "Men's Sweatshirts",
    "Men's Hoodies",
    "Men's Jackets",
    "Women's Jackets",
    "Kids' Jackets"
  ];

  const requirements = [
    { label: 'Small', note: 'Sample / Trial Batches' },
    { label: 'Medium', note: 'Regular Seasonal Stock' },
    { label: 'Bulk', note: 'Large-Volume Sourcing' }
  ];

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formData.name || !formData.businessName || !formData.mobileNumber) {
      alert("Please fill in all mandatory fields (*).");
      return;
    }

    setSubmitting(true);
    // Simulate fast reliable client submission
    setTimeout(() => {
      setSubmitting(false);
      setSubmitted(true);
      showToast("Wholesale enquiry received. Our Delhi sourcing team will contact you shortly.");
      if (onSuccess) onSuccess();
    }, 600);
  };

  const generateWhatsAppMessage = () => {
    let msg = `*Wholesale Enquiry - EasyBudgetStore*\n`;
    msg += `Name: ${formData.name || 'Not provided'}\n`;
    msg += `Business: ${formData.businessName || 'Not provided'}\n`;
    msg += `City: ${formData.city || 'Not provided'}\n`;
    msg += `Business Type: ${formData.businessType}\n`;
    msg += `Category: ${formData.interestedCategory}\n`;
    msg += `Requirement: ${formData.estimatedRequirement}\n`;
    if (formData.message) {
      msg += `Notes: ${formData.message}\n`;
    }
    return siteConfig.getWhatsAppLink(msg);
  };

  if (submitted) {
    return (
      <div className="bg-white p-8 sm:p-10 border border-brand-border rounded-lg text-center shadow-subtle">
        <div className="w-14 h-14 bg-emerald-50 rounded-full flex items-center justify-center mx-auto mb-4 border border-emerald-200">
          <CheckCircle className="w-7 h-7 text-emerald-600" />
        </div>
        <h3 className="text-xl font-bold tracking-[0.1em] uppercase text-brand-text mb-2 font-editorial">
          Enquiry Received
        </h3>
        <p className="text-sm text-brand-muted max-w-md mx-auto mb-6">
          Thank you for reaching out to EasyBudgetStore. Our team based in Gandhi Nagar, Delhi will review your requirements and share wholesale pricing shortly.
        </p>

        <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
          <a
            href={generateWhatsAppMessage()}
            target="_blank"
            rel="noopener noreferrer"
            className="w-full sm:w-auto px-6 py-3 bg-brand-dark hover:bg-black text-white text-xs font-semibold tracking-wider uppercase rounded inline-flex items-center justify-center gap-2"
          >
            <MessageCircle className="w-4 h-4 text-emerald-400" />
            <span>Forward directly to WhatsApp</span>
          </a>
          <button
            type="button"
            onClick={() => setSubmitted(false)}
            className="w-full sm:w-auto px-6 py-3 border border-brand-border text-xs font-semibold tracking-wider uppercase rounded hover:bg-brand-surface"
          >
            Submit Another Request
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-white border border-brand-border rounded-lg p-6 sm:p-10 shadow-elevated">
      <div className="mb-8">
        <span className="text-xs font-bold tracking-ultra uppercase text-brand-muted block mb-1 font-editorial">
          B2B PARTNERSHIP
        </span>
        <h3 className="text-xl sm:text-3xl font-extrabold tracking-[0.1em] uppercase text-brand-text font-editorial">
          LET'S BUILD YOUR NEXT COLLECTION.
        </h3>
        <p className="text-xs sm:text-sm text-brand-muted mt-2">
          Fill out the details below to request wholesale catalog pricing, sample terms, and order schedules.
        </p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-5">
        {/* Name & Business Name */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label className="block text-[11px] font-bold tracking-wider uppercase text-brand-text mb-1.5">
              Contact Name <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              name="name"
              required
              placeholder="e.g. Rajesh Sharma"
              value={formData.name}
              onChange={handleChange}
              className="w-full px-3.5 py-2.5 text-sm border border-brand-border rounded focus:border-brand-dark focus:ring-0 focus:outline-none transition-colors"
            />
          </div>

          <div>
            <label className="block text-[11px] font-bold tracking-wider uppercase text-brand-text mb-1.5">
              Business / Store Name <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              name="businessName"
              required
              placeholder="e.g. Trends Boutique / Delhi Wear"
              value={formData.businessName}
              onChange={handleChange}
              className="w-full px-3.5 py-2.5 text-sm border border-brand-border rounded focus:border-brand-dark focus:ring-0 focus:outline-none transition-colors"
            />
          </div>
        </div>

        {/* Mobile & WhatsApp Number */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label className="block text-[11px] font-bold tracking-wider uppercase text-brand-text mb-1.5">
              Mobile Number <span className="text-red-500">*</span>
            </label>
            <input
              type="tel"
              name="mobileNumber"
              required
              placeholder="e.g. 9876543210"
              value={formData.mobileNumber}
              onChange={handleChange}
              className="w-full px-3.5 py-2.5 text-sm border border-brand-border rounded focus:border-brand-dark focus:ring-0 focus:outline-none transition-colors"
            />
          </div>

          <div>
            <label className="block text-[11px] font-bold tracking-wider uppercase text-brand-text mb-1.5">
              WhatsApp Number (if different)
            </label>
            <input
              type="tel"
              name="whatsappNumber"
              placeholder="e.g. 9876543210"
              value={formData.whatsappNumber}
              onChange={handleChange}
              className="w-full px-3.5 py-2.5 text-sm border border-brand-border rounded focus:border-brand-dark focus:ring-0 focus:outline-none transition-colors"
            />
          </div>
        </div>

        {/* Email & City */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label className="block text-[11px] font-bold tracking-wider uppercase text-brand-text mb-1.5">
              Email Address
            </label>
            <input
              type="email"
              name="email"
              placeholder="retailer@example.com"
              value={formData.email}
              onChange={handleChange}
              className="w-full px-3.5 py-2.5 text-sm border border-brand-border rounded focus:border-brand-dark focus:ring-0 focus:outline-none transition-colors"
            />
          </div>

          <div>
            <label className="block text-[11px] font-bold tracking-wider uppercase text-brand-text mb-1.5">
              City / State
            </label>
            <input
              type="text"
              name="city"
              placeholder="e.g. Jaipur, Lucknow, Delhi NCR"
              value={formData.city}
              onChange={handleChange}
              className="w-full px-3.5 py-2.5 text-sm border border-brand-border rounded focus:border-brand-dark focus:ring-0 focus:outline-none transition-colors"
            />
          </div>
        </div>

        {/* Business Type & Interested Category */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label className="block text-[11px] font-bold tracking-wider uppercase text-brand-text mb-1.5">
              Business Type
            </label>
            <select
              name="businessType"
              value={formData.businessType}
              onChange={handleChange}
              className="w-full px-3.5 py-2.5 text-sm border border-brand-border rounded focus:border-brand-dark focus:ring-0 focus:outline-none bg-white transition-colors"
            >
              {businessTypes.map((type) => (
                <option key={type} value={type}>
                  {type}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label className="block text-[11px] font-bold tracking-wider uppercase text-brand-text mb-1.5">
              Interested Category
            </label>
            <select
              name="interestedCategory"
              value={formData.interestedCategory}
              onChange={handleChange}
              className="w-full px-3.5 py-2.5 text-sm border border-brand-border rounded focus:border-brand-dark focus:ring-0 focus:outline-none bg-white transition-colors"
            >
              {categories.map((cat) => (
                <option key={cat} value={cat}>
                  {cat}
                </option>
              ))}
            </select>
          </div>
        </div>

        {/* Estimated Requirement */}
        <div>
          <label className="block text-[11px] font-bold tracking-wider uppercase text-brand-text mb-2">
            Estimated Requirement
          </label>
          <div className="grid grid-cols-3 gap-3">
            {requirements.map((req) => (
              <label
                key={req.label}
                className={`border rounded p-3 text-center cursor-pointer transition-all ${
                  formData.estimatedRequirement === req.label
                    ? 'border-brand-dark bg-brand-surface text-brand-dark font-bold'
                    : 'border-brand-border hover:border-neutral-400 text-brand-muted'
                }`}
              >
                <input
                  type="radio"
                  name="estimatedRequirement"
                  value={req.label}
                  checked={formData.estimatedRequirement === req.label}
                  onChange={handleChange}
                  className="sr-only"
                />
                <span className="block text-xs font-semibold uppercase tracking-wider">
                  {req.label}
                </span>
                <span className="text-[10px] hidden sm:block mt-0.5 text-neutral-400">
                  {req.note}
                </span>
              </label>
            ))}
          </div>
        </div>

        {/* Message */}
        <div>
          <label className="block text-[11px] font-bold tracking-wider uppercase text-brand-text mb-1.5">
            Specific Requirements / Message
          </label>
          <textarea
            name="message"
            rows="3"
            placeholder="Tell us about the styles, sizes, or quantities you need for your store..."
            value={formData.message}
            onChange={handleChange}
            className="w-full px-3.5 py-2.5 text-sm border border-brand-border rounded focus:border-brand-dark focus:ring-0 focus:outline-none transition-colors"
          />
        </div>

        {/* CTA Button */}
        <div className="pt-2">
          <button
            type="submit"
            disabled={submitting}
            className="w-full py-3.5 bg-brand-dark hover:bg-black text-white rounded text-xs font-bold tracking-[0.2em] uppercase transition-colors shadow-sm flex items-center justify-center gap-2"
          >
            {submitting ? (
              <span>Processing Enquiry...</span>
            ) : (
              <>
                <span>SUBMIT ENQUIRY</span>
                <Send className="w-3.5 h-3.5" />
              </>
            )}
          </button>
        </div>

        {/* WhatsApp Alternative */}
        <div className="pt-4 border-t border-brand-border text-center">
          <p className="text-xs text-brand-muted mb-2 font-medium">Prefer WhatsApp?</p>
          <a
            href={generateWhatsAppMessage()}
            target="_blank"
            rel="noopener noreferrer"
            className="w-full py-3 border border-brand-border hover:border-brand-dark text-brand-text rounded text-xs font-semibold tracking-wider uppercase inline-flex items-center justify-center gap-2 hover:bg-brand-surface transition-colors"
          >
            <MessageCircle className="w-4 h-4 text-emerald-600" />
            <span>CHAT WITH US ON WHATSAPP</span>
          </a>
        </div>
      </form>
    </div>
  );
}
