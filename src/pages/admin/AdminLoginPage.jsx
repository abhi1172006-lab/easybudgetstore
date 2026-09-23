import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { AlertCircle, CheckCircle2, KeyRound, Mail, ShieldCheck } from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import { useCms } from '../../context/CmsContext';
import { OWNER_EMAIL } from '../../lib/ownerAuth';

export default function AdminLoginPage() {
  const [email, setEmail] = useState(OWNER_EMAIL);
  const [code, setCode] = useState('');
  const [codeSent, setCodeSent] = useState(false);
  const [error, setError] = useState('');
  const [submitting, setSubmitting] = useState(false);
  const { requestOtp, verifyOtp } = useAuth();
  const { site } = useCms();
  const navigate = useNavigate();

  const sendCode = async (event) => {
    event.preventDefault();
    setError('');
    setSubmitting(true);
    try {
      await requestOtp(email);
      setCodeSent(true);
    } catch (err) {
      setError(err.message || 'Unable to send the verification code.');
    } finally {
      setSubmitting(false);
    }
  };

  const confirmCode = async (event) => {
    event.preventDefault();
    setError('');
    setSubmitting(true);
    try {
      await verifyOtp(email, code);
      navigate('/admin/dashboard', { replace: true });
    } catch (err) {
      setError(err.message || 'The verification code is invalid or has expired.');
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-neutral-100 flex items-center justify-center p-4 sm:p-8 font-sans">
      <div className="max-w-4xl w-full bg-white border border-brand-border rounded-2xl shadow-2xl flex flex-col md:flex-row overflow-hidden">
        <div className="hidden md:flex md:w-5/12 bg-brand-dark flex-col justify-between p-10 text-white">
          <Link to="/" className="font-extrabold text-2xl tracking-[0.2em] uppercase text-white font-editorial">
            {site.wordmark || 'EASYBUDGETSTORE'}
          </Link>
          <div>
            <div className="w-12 h-12 rounded-xl bg-white/10 flex items-center justify-center mb-6 border border-white/10"><ShieldCheck className="w-6 h-6 text-emerald-400" /></div>
            <h1 className="text-2xl font-extrabold tracking-wider uppercase font-editorial leading-snug">Owner Control Center</h1>
            <p className="text-xs mt-3 text-neutral-300 leading-relaxed">Private access for EasyBudgetStore management. Passwords are not stored in this website.</p>
            <div className="mt-6 pt-6 border-t border-white/10 space-y-2 text-[11px] text-neutral-300">
              <p className="flex items-center gap-2"><CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />One-time email verification</p>
              <p className="flex items-center gap-2"><CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />Restricted to the owner account</p>
              <p className="flex items-center gap-2"><CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />No public admin registration</p>
            </div>
          </div>
          <p className="text-[10px] uppercase tracking-widest text-neutral-400">© {new Date().getFullYear()} {site.brandName || 'EasyBudgetStore'} • Delhi</p>
        </div>

        <div className="w-full md:w-7/12 p-8 sm:p-12 flex flex-col justify-center">
          <div className="md:hidden mb-6 text-center font-extrabold text-2xl tracking-[0.2em] uppercase text-brand-text font-editorial">{site.wordmark || 'EASYBUDGETSTORE'}</div>
          <div className="mb-6">
            <div className="inline-flex items-center gap-1.5 px-3 py-1 bg-neutral-100 border border-neutral-200 rounded-full text-[10px] font-extrabold uppercase tracking-widest text-neutral-700 mb-3"><KeyRound className="w-3 h-3 text-brand-dark" />Restricted owner access</div>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-brand-text uppercase tracking-wider font-editorial">{codeSent ? 'Enter your code' : 'Sign in to Admin'}</h2>
            <p className="text-xs text-brand-muted mt-2 leading-relaxed">{codeSent ? `A 6-digit verification code was sent to ${OWNER_EMAIL}.` : 'We will send a one-time verification code to the authorised owner email.'}</p>
          </div>
          {error && <div className="mb-5 p-4 bg-red-50 border border-red-200 rounded-lg text-red-700 text-xs font-semibold flex items-center gap-3"><AlertCircle className="w-5 h-5 shrink-0" />{error}</div>}

          {!codeSent ? (
            <form onSubmit={sendCode} className="space-y-5">
              <label className="block text-[11px] font-bold uppercase tracking-wider text-brand-text">Owner email
                <span className="relative mt-1.5 block"><Mail className="w-4 h-4 text-brand-muted absolute left-3.5 top-1/2 -translate-y-1/2" /><input type="email" value={email} onChange={(e) => setEmail(e.target.value)} required className="w-full bg-white border border-brand-border rounded-lg pl-10 pr-4 py-3 text-sm text-brand-text focus:outline-none focus:ring-1 focus:ring-brand-dark" /></span>
              </label>
              <button type="submit" disabled={submitting} className="w-full py-4 bg-brand-dark hover:bg-black text-white font-bold text-xs uppercase tracking-widest rounded-lg transition-all disabled:opacity-50">{submitting ? 'Sending code…' : 'Send secure email code →'}</button>
            </form>
          ) : (
            <form onSubmit={confirmCode} className="space-y-5">
              <label className="block text-[11px] font-bold uppercase tracking-wider text-brand-text">6-digit email code
                <input inputMode="numeric" autoComplete="one-time-code" maxLength={6} value={code} onChange={(e) => setCode(e.target.value.replace(/\D/g, ''))} required className="mt-1.5 w-full bg-white border border-brand-border rounded-lg px-4 py-3 text-center tracking-[0.55em] text-lg font-bold text-brand-text focus:outline-none focus:ring-1 focus:ring-brand-dark" placeholder="000000" />
              </label>
              <button type="submit" disabled={submitting} className="w-full py-4 bg-brand-dark hover:bg-black text-white font-bold text-xs uppercase tracking-widest rounded-lg transition-all disabled:opacity-50">{submitting ? 'Verifying…' : 'Verify & open admin →'}</button>
              <button type="button" onClick={() => { setCodeSent(false); setCode(''); setError(''); }} className="w-full text-[11px] font-bold uppercase tracking-wider text-brand-muted hover:text-brand-text">Use a different email</button>
            </form>
          )}
        </div>
      </div>
    </div>
  );
}
