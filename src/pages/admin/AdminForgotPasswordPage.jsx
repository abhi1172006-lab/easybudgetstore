import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { Mail, CheckCircle, ArrowLeft } from 'lucide-react';
import siteConfig from '../../config/siteConfig';

export default function AdminForgotPasswordPage() {
  const [email, setEmail] = useState('');
  const [submitted, setSubmitted] = useState(false);
  const [submitting, setSubmitting] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!email) return;
    
    setSubmitting(true);
    // Simulate API request to send reset email
    setTimeout(() => {
      setSubmitting(false);
      setSubmitted(true);
    }, 800);
  };

  return (
    <div className="min-h-screen bg-brand-surface flex items-center justify-center p-4 sm:p-8 font-sans selection:bg-brand-accent selection:text-white">
      <div className="max-w-md w-full bg-white border border-brand-border rounded-2xl shadow-elevated p-8 sm:p-12 text-center">
        
        <div className="mb-8">
          <Link to="/" className="inline-block">
            <span className="font-extrabold text-2xl tracking-[0.2em] uppercase text-brand-text font-editorial">
              {siteConfig.wordmark}
            </span>
          </Link>
        </div>

        {submitted ? (
          <div>
            <div className="w-16 h-16 bg-emerald-50 border border-emerald-100 rounded-full flex items-center justify-center mx-auto mb-6">
              <CheckCircle className="w-8 h-8 text-emerald-600" />
            </div>
            <h1 className="text-xl font-bold text-brand-text uppercase tracking-widest font-editorial mb-2">Check Your Email</h1>
            <p className="text-sm text-brand-muted mb-8">
              If an admin account exists for <b>{email}</b>, we've sent instructions to reset your password.
            </p>
            <Link
              to="/admin/login"
              className="w-full block py-3.5 bg-brand-dark hover:bg-black text-white font-bold text-xs uppercase tracking-widest rounded transition-all shadow-sm"
            >
              Return to Login
            </Link>
          </div>
        ) : (
          <div>
            <h1 className="text-xl font-bold text-brand-text uppercase tracking-widest font-editorial mb-2">Reset Password</h1>
            <p className="text-sm text-brand-muted mb-8">
              Enter your admin email address and we'll send you a link to reset your password securely.
            </p>

            <form onSubmit={handleSubmit} className="space-y-5 text-left">
              <div>
                <label className="block text-[11px] font-bold uppercase tracking-wider text-brand-text mb-2">Email Address</label>
                <div className="relative">
                  <Mail className="w-5 h-5 text-brand-muted absolute left-4 top-1/2 -translate-y-1/2" />
                  <input
                    type="email"
                    required
                    autoComplete="off"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full bg-white border border-brand-border rounded px-12 py-3 text-sm text-brand-text focus:outline-none focus:border-brand-dark transition-colors"
                    placeholder="Enter your registered Gmail"
                  />
                </div>
              </div>

              <button
                type="submit"
                disabled={submitting}
                className="w-full py-3.5 bg-brand-dark hover:bg-black text-white font-bold text-xs uppercase tracking-widest rounded transition-all shadow-sm disabled:opacity-50"
              >
                {submitting ? 'Sending Link...' : 'Send Reset Link'}
              </button>
            </form>

            <div className="mt-6 text-center">
              <Link to="/admin/login" className="inline-flex items-center text-[11px] font-bold uppercase tracking-wider text-brand-muted hover:text-brand-dark transition-colors">
                <ArrowLeft className="w-3 h-3 mr-1" />
                Back to Login
              </Link>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
