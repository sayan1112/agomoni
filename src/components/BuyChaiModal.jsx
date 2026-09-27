import React, { useState } from 'react';
import { X, Copy, Check, Heart } from 'lucide-react';

export default function BuyChaiModal({ isOpen, onClose }) {
  const [copied, setCopied] = useState(false);
  const upiId = '9163082075@ybl';
  const phoneNumber = '+91 9163082075';

  const copyUpi = () => {
    navigator.clipboard?.writeText(upiId);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

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
                className="h-56 sm:h-64 w-auto object-contain rounded-xl"
              />
            </div>

            {/* Recipient Details */}
            <div className="mt-3.5 flex items-center gap-2">
              <span className="inline-block h-2 w-2 rounded-full bg-emerald-400 animate-pulse" />
              <span className="text-xs font-semibold text-white/90 font-tagline">
                Receiving on PhonePe: <strong className="text-emerald-400 font-bold">{phoneNumber}</strong>
              </span>
            </div>

            <p className="mt-1 text-[11px] text-white/45">
              Scan with PhonePe, Google Pay, Paytm, or any UPI app
            </p>

            {/* Copy UPI Button */}
            <div className="mt-4 flex justify-center w-full">
              <button
                type="button"
                onClick={copyUpi}
                className="group inline-flex items-center gap-2.5 rounded-full border border-white/20 bg-white/10 hover:bg-white/20 py-2 px-5 text-xs text-white font-medium transition hover:scale-105 active:scale-95 shadow-sm cursor-pointer"
              >
                <span className="font-mono text-xs text-white/90 select-all font-semibold tracking-wide">
                  {upiId}
                </span>
                <span
                  className={`inline-flex shrink-0 items-center gap-1 rounded-full px-2.5 py-0.5 text-[10px] font-bold uppercase tracking-wider transition ${
                    copied
                      ? 'bg-emerald-500/25 text-emerald-400 border border-emerald-500/30'
                      : 'bg-[#f1d449]/20 text-[#f1d449] border border-[#f1d449]/30'
                  }`}
                >
                  {copied ? <Check size={11} /> : <Copy size={11} />}
                  {copied ? 'Copied' : 'Copy UPI'}
                </span>
              </button>
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
