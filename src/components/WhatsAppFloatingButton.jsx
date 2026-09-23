import React, { useState } from 'react';
import { MessageCircle, X } from 'lucide-react';
import siteConfig from '../config/siteConfig';

export default function WhatsAppFloatingButton() {
  const [tooltipVisible, setTooltipVisible] = useState(true);

  return (
    <div className="fixed bottom-6 right-6 z-40 flex items-center group">
      {/* Tooltip Badge */}
      {tooltipVisible && (
        <div className="hidden sm:flex items-center bg-white border border-brand-border shadow-elevated rounded-full py-1.5 px-3.5 mr-3 animate-fade-in">
          <span className="text-xs font-semibold text-brand-text tracking-wide mr-2">
            Wholesale Query? Chat on WhatsApp
          </span>
          <button
            onClick={() => setTooltipVisible(false)}
            className="text-neutral-400 hover:text-brand-text"
            aria-label="Dismiss tooltip"
          >
            <X className="w-3 h-3" />
          </button>
        </div>
      )}

      {/* Floating Button */}
      <a
        href={siteConfig.getWhatsAppLink()}
        target="_blank"
        rel="noopener noreferrer"
        className="w-13 h-13 sm:w-14 sm:h-14 bg-[#25D366] hover:bg-[#1EBE5D] text-white rounded-full flex items-center justify-center shadow-elevated transition-transform duration-300 hover:scale-105 active:scale-95 focus:outline-none"
        aria-label="Chat with EasyBudgetStore on WhatsApp"
      >
        <MessageCircle className="w-7 h-7 fill-white stroke-[#25D366]" />
      </a>
    </div>
  );
}
