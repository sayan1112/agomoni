import React from 'react';
import { X, Heart } from 'lucide-react';

export default function BuyChaiModal({ isOpen, onClose }) {
  if (!isOpen) return null;

  return (
    <>
      {/* Backdrop matching DevelopersModal & PlaylistsModal */}
      <div
        className="fixed inset-0 z-40 bg-black/60 backdrop-blur-sm transition-opacity"
        onClick={onClose}
        aria-hidden="true"
      />

      {/* Centered Modal Container matching DevelopersModal */}
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 pointer-events-none">
        <div className="pointer-events-auto w-full max-w-md flex flex-col rounded-3xl border border-white/20 bg-[#14151c]/95 backdrop-blur-2xl backdrop-saturate-150 shadow-[0_24px_70px_rgba(0,0,0,0.85)] animate-scale-in overflow-hidden">
          
          {/* Header */}
          <div className="flex items-center justify-between border-b border-white/10 px-5 sm:px-6 pb-3 pt-5">
            <div className="flex items-center gap-2.5">
              <span className="text-[#f1d449] text-base">☕</span>
              <h2 className="font-tagline text-xs sm:text-sm font-semibold uppercase tracking-[0.2em] text-white/80">
                Buy us a chai
              </h2>
            </div>
            <button
              type="button"
              onClick={onClose}
              aria-label="Close"
              className="grid h-8 w-8 place-items-center rounded-full text-white/70 transition hover:bg-white/15 hover:text-white active:scale-95 cursor-pointer"
            >
              <X size={16} />
            </button>
          </div>

          {/* Subtitle */}
          <p className="px-5 sm:px-6 pt-2.5 text-xs text-white/50">
            আগমনী (Agomoni) is completely ad-free. Support the developer with a warm cup of chai!
          </p>

          {/* Card Body */}
          <div className="flex flex-col items-center px-6 pt-4 pb-6 text-center">
            
            {/* PhonePe QR Code Card Container with glowing festive border */}
            <div className="relative overflow-hidden rounded-2xl border border-white/20 bg-[#181922] p-3 shadow-[0_8px_30px_rgba(0,0,0,0.6)] group transition hover:border-[#f1d449]/40">
              <img
                src="/images/sayan-phonepe-card.png"
                alt="PhonePe QR Code - Sayan Dutta"
                className="h-64 sm:h-72 w-auto object-contain rounded-xl"
              />
            </div>

            {/* Bottom Note */}
            <div className="mt-5 w-full border-t border-white/10 pt-3 flex items-center justify-center gap-1.5 text-[11px] text-[#f1d449]/80 font-medium">
              <Heart size={12} className="text-red-400 fill-red-400" />
              <span>Thank you for supporting আগমনী</span>
            </div>

          </div>
        </div>
      </div>
    </>
  );
}
