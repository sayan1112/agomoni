import React, { useState, useEffect } from 'react';
import { X, Smartphone, Download, Share, PlusSquare, Sparkles, CheckCircle2, ArrowRight } from 'lucide-react';

export default function InstallAppModal({ isOpen, onClose }) {
  const [deferredPrompt, setDeferredPrompt] = useState(null);
  const [isIOS, setIsIOS] = useState(false);
  const [isStandalone, setIsStandalone] = useState(false);

  useEffect(() => {
    // Detect iOS
    const userAgent = window.navigator.userAgent.toLowerCase();
    const isIosDevice = /iphone|ipad|ipod/.test(userAgent);
    setIsIOS(isIosDevice);

    // Detect if already installed / running in standalone mode
    const isApp = window.matchMedia('(display-mode: standalone)').matches || window.navigator.standalone === true;
    setIsStandalone(isApp);

    // Listen for Android / Chrome install prompt
    const handleBeforeInstall = (e) => {
      e.preventDefault();
      setDeferredPrompt(e);
    };

    window.addEventListener('beforeinstallprompt', handleBeforeInstall);
    return () => window.removeEventListener('beforeinstallprompt', handleBeforeInstall);
  }, []);

  const handleInstallClick = async () => {
    if (deferredPrompt) {
      deferredPrompt.prompt();
      const { outcome } = await deferredPrompt.userChoice;
      if (outcome === 'accepted') {
        setDeferredPrompt(null);
        onClose();
      }
    }
  };

  if (!isOpen) return null;

  return (
    <>
      {/* Backdrop */}
      <div
        className="fixed inset-0 z-40 bg-black/60 backdrop-blur-sm transition-opacity"
        onClick={onClose}
        aria-hidden="true"
      />

      {/* Centered Modal Container */}
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 pointer-events-none">
        <div className="pointer-events-auto w-full max-w-md flex flex-col rounded-3xl border border-white/20 bg-[#12141d]/95 backdrop-blur-2xl backdrop-saturate-150 shadow-[0_24px_70px_rgba(0,0,0,0.85)] animate-scale-in overflow-hidden">
          
          {/* Header */}
          <div className="flex items-center justify-between border-b border-white/10 px-5 sm:px-6 pb-3.5 pt-5">
            <div className="flex items-center gap-2.5">
              <div className="grid h-8 w-8 place-items-center rounded-xl bg-[#f1d449]/15 border border-[#f1d449]/30 text-[#f1d449]">
                <Smartphone size={16} />
              </div>
              <h2 className="font-tagline text-xs sm:text-sm font-semibold uppercase tracking-[0.16em] text-white">
                Install আগমনী (Agomoni)
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

          {/* App Preview & Value Props */}
          <div className="px-6 pt-5 pb-6 flex flex-col items-center text-center">
            
            {/* App Icon */}
            <div className="relative h-20 w-20 rounded-2xl overflow-hidden shadow-[0_8px_30px_rgba(0,0,0,0.6)] border border-white/20 bg-[#181922] p-1.5 flex items-center justify-center">
              <img
                src="/icons/icon-192.png"
                alt="আগমনী App Icon"
                className="h-full w-full object-contain rounded-xl"
              />
            </div>

            <h3 className="mt-3.5 text-base sm:text-lg font-bold text-white tracking-tight">
              আগমনী on Your Phone
            </h3>
            <p className="mt-1 text-xs text-white/60 leading-relaxed max-w-xs">
              Keep Kolkata's festival alive on your home screen every year with live countdowns, music radio & 120+ puja guides.
            </p>

            {/* Feature Highlights */}
            <div className="mt-4 w-full space-y-2 text-left bg-white/5 rounded-2xl border border-white/10 p-3.5 text-xs text-white/80">
              <div className="flex items-center gap-2.5">
                <CheckCircle2 size={14} className="text-[#f1d449] shrink-0" />
                <span>Works <strong>every year</strong> with auto-updating dates</span>
              </div>
              <div className="flex items-center gap-2.5">
                <CheckCircle2 size={14} className="text-[#f1d449] shrink-0" />
                <span>Full-screen standalone native app experience</span>
              </div>
              <div className="flex items-center gap-2.5">
                <CheckCircle2 size={14} className="text-[#f1d449] shrink-0" />
                <span>Auto-plays 4 AM Mahalaya & Puja Radio songs</span>
              </div>
            </div>

            {/* Install Flow */}
            <div className="mt-5 w-full">
              {isStandalone ? (
                <div className="rounded-xl bg-emerald-500/15 border border-emerald-500/30 p-3 text-xs text-emerald-400 font-medium">
                  ✓ আগমনী is already installed on your device!
                </div>
              ) : isIOS ? (
                /* iOS Safari instructions */
                <div className="rounded-2xl border border-[#f1d449]/30 bg-[#f1d449]/10 p-4 text-left space-y-2.5">
                  <p className="text-xs font-semibold text-[#f1d449] uppercase tracking-wider">
                    How to install on iPhone / iPad:
                  </p>
                  <ol className="text-xs text-white/85 space-y-2">
                    <li className="flex items-center gap-2">
                      <span className="grid h-5 w-5 place-items-center rounded-full bg-white/15 text-[10px] font-bold">1</span>
                      <span>Tap the <strong>Share</strong> button <Share size={13} className="inline mx-1 text-[#f1d449]" /> in Safari</span>
                    </li>
                    <li className="flex items-center gap-2">
                      <span className="grid h-5 w-5 place-items-center rounded-full bg-white/15 text-[10px] font-bold">2</span>
                      <span>Scroll down and select <strong>"Add to Home Screen"</strong> <PlusSquare size={13} className="inline mx-1 text-[#f1d449]" /></span>
                    </li>
                    <li className="flex items-center gap-2">
                      <span className="grid h-5 w-5 place-items-center rounded-full bg-white/15 text-[10px] font-bold">3</span>
                      <span>Tap <strong>Add</strong> in the top-right corner</span>
                    </li>
                  </ol>
                </div>
              ) : deferredPrompt ? (
                /* Android 1-click Install button */
                <button
                  type="button"
                  onClick={handleInstallClick}
                  className="w-full inline-flex items-center justify-center gap-2 rounded-2xl bg-[#f1d449] hover:bg-[#ffe156] text-black font-tagline font-bold py-3 px-5 text-sm shadow-[0_0_25px_rgba(241,212,73,0.35)] transition active:scale-[0.98] cursor-pointer"
                >
                  <Download size={16} />
                  <span>Install App to Home Screen</span>
                </button>
              ) : (
                /* General Chrome/Browser instructions */
                <div className="rounded-2xl border border-white/15 bg-white/5 p-3.5 text-xs text-white/70 space-y-1">
                  <p className="font-medium text-white/90">To add to your phone:</p>
                  <p>Open browser options (three dots or share icon) and tap <strong>"Add to Home screen"</strong> or <strong>"Install App"</strong>.</p>
                </div>
              )}
            </div>

            {/* Sub note */}
            <p className="mt-4 text-[11px] text-white/40">
              No app store download required • Always free & ad-free
            </p>

          </div>
        </div>
      </div>
    </>
  );
}
