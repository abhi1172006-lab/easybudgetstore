import React from 'react';
import { CheckCircle2, AlertCircle } from 'lucide-react';
import { useEnquiry } from '../context/EnquiryContext';

export default function Toast() {
  const { toast } = useEnquiry();

  if (!toast.visible) return null;

  return (
    <div className="fixed top-24 right-6 z-50 transition-all transform animate-bounce-subtle">
      <div className="bg-brand-dark text-white text-xs font-semibold px-4 py-3 rounded-lg shadow-elevated border border-neutral-700 flex items-center gap-2.5">
        {toast.type === 'error' ? (
          <AlertCircle className="w-4 h-4 text-red-400" />
        ) : (
          <CheckCircle2 className="w-4 h-4 text-emerald-400" />
        )}
        <span>{toast.message}</span>
      </div>
    </div>
  );
}
