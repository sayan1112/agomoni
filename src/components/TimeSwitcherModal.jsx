import React, { useEffect } from 'react';
import { useTime, TIME_PERIODS } from '../context/TimeContext';
import { X, Check } from 'lucide-react';

export default function TimeSwitcherModal({ isOpen, onClose }) {
  const { mode, setMode, localTime, kolkataTime, simulatedDate, setSimulatedDate } = useTime();

  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [onClose]);

  if (!isOpen) return null;

  return (
    <>
      <div className="fixed inset-0 z-40" onClick={onClose} aria-hidden="true" />
      <div className="absolute left-3 sm:left-5 top-16 z-50 w-80 sm:w-96 overflow-hidden rounded-2xl border border-white/15 bg-black/60 backdrop-blur-2xl backdrop-saturate-150 shadow-[0_12px_40px_rgba(0,0,0,0.6)] animate-scale-in">
        <div className="flex items-start justify-between gap-2 px-5 pb-3 pt-4">
          <div>
            <h3 className="font-tagline text-xs font-semibold uppercase tracking-[0.2em] text-white/60">
              Time
            </h3>
            <p className="mt-1 text-sm leading-relaxed text-white/70">
              Choose which time you’d like to see.
            </p>
          </div>
          <button
            type="button"
            onClick={onClose}
            aria-label="Close"
            className="grid h-7 w-7 shrink-0 place-items-center rounded-full text-white/60 transition hover:bg-white/15 hover:text-white active:scale-95"
          >
            <X size={15} />
          </button>
        </div>

        <div className="px-3 pb-3" role="menu">
          <div className="overflow-hidden rounded-xl border border-white/10 bg-white/5 divide-y divide-white/5">
            {/* Local time option */}
            <button
              type="button"
              onClick={() => {
                setMode('local');
                onClose();
              }}
              className={`flex w-full items-center justify-between gap-3 px-4 py-2.5 text-left text-sm font-medium transition ${
                mode === 'local' ? 'bg-[#f1d449]/15 text-[#f1d449]' : 'text-white/80 hover:bg-white/10 hover:text-white'
              }`}
            >
              <span>Use my local time</span>
              <span className="flex items-center gap-1.5 text-xs font-normal tabular-nums text-white/50">
                {localTime.hour}:{localTime.minute} {localTime.dayPeriod}
                {mode === 'local' && <Check size={14} className="text-[#f1d449]" />}
              </span>
            </button>

            {/* Kolkata time option */}
            <button
              type="button"
              onClick={() => {
                setMode('kolkata');
                onClose();
              }}
              className={`flex w-full items-center justify-between gap-3 px-4 py-2.5 text-left text-sm font-medium transition ${
                mode === 'kolkata' ? 'bg-[#f1d449]/15 text-[#f1d449]' : 'text-white/80 hover:bg-white/10 hover:text-white'
              }`}
            >
              <span>Kolkata (IST)</span>
              <span className="flex items-center gap-1.5 text-xs font-normal tabular-nums text-white/50">
                {kolkataTime.hour}:{kolkataTime.minute} {kolkataTime.dayPeriod}
                {mode === 'kolkata' && <Check size={14} className="text-[#f1d449]" />}
              </span>
            </button>

            {/* Period presets */}
            {TIME_PERIODS.map((p) => {
              const isActive = mode === p.key;
              return (
                <button
                  key={p.key}
                  type="button"
                  onClick={() => {
                    setMode(p.key);
                    onClose();
                  }}
                  className={`flex w-full items-center justify-between gap-3 px-4 py-2.5 text-left text-sm font-medium transition ${
                    isActive ? 'bg-[#f1d449]/15 text-[#f1d449]' : 'text-white/80 hover:bg-white/10 hover:text-white'
                  }`}
                >
                  <span>{p.label}</span>
                  <span className="flex items-center gap-1.5 text-xs font-normal tabular-nums text-white/50">
                    {p.previewTime}
                    {isActive && <Check size={14} className="text-[#f1d449]" />}
                  </span>
                </button>
              );
            })}
          </div>

          {/* Festival Day / Pujo Week Live Simulation */}
          <div className="mt-3 pt-3 border-t border-white/10">
            <div className="flex items-center justify-between px-1 mb-2">
              <span className="font-tagline text-[10px] font-bold uppercase tracking-[0.16em] text-[#f1d449]">
                Pujo Week Greetings Preview
              </span>
              {simulatedDate && (
                <button
                  type="button"
                  onClick={() => setSimulatedDate(null)}
                  className="text-[10px] text-white/50 hover:text-white underline cursor-pointer"
                >
                  Reset to Live
                </button>
              )}
            </div>

            <div className="grid grid-cols-2 gap-1.5 text-xs">
              <button
                type="button"
                onClick={() => {
                  setSimulatedDate(null);
                  onClose();
                }}
                className={`px-2.5 py-1.5 rounded-lg border text-left transition cursor-pointer ${
                  !simulatedDate
                    ? 'border-[#f1d449]/50 bg-[#f1d449]/15 text-[#f1d449] font-medium'
                    : 'border-white/10 bg-white/5 text-white/70 hover:bg-white/10'
                }`}
              >
                <div className="text-[11px] font-semibold">Live Real Date</div>
                <div className="text-[9px] opacity-70">পুজো আসছে</div>
              </button>

              <button
                type="button"
                onClick={() => {
                  setSimulatedDate(new Date('2026-10-10T04:30:00+05:30'));
                  onClose();
                }}
                className="px-2.5 py-1.5 rounded-lg border border-white/10 bg-white/5 hover:bg-[#f1d449]/15 hover:border-[#f1d449]/40 text-left transition cursor-pointer text-white/80"
              >
                <div className="text-[11px] font-semibold text-[#f1d449]">Mahalaya</div>
                <div className="text-[9px] opacity-70">শুভ মহালয়া</div>
              </button>

              <button
                type="button"
                onClick={() => {
                  setSimulatedDate(new Date('2026-10-16T10:00:00+05:30'));
                  onClose();
                }}
                className="px-2.5 py-1.5 rounded-lg border border-white/10 bg-white/5 hover:bg-[#f1d449]/15 hover:border-[#f1d449]/40 text-left transition cursor-pointer text-white/80"
              >
                <div className="text-[11px] font-semibold text-[#f1d449]">Maha Sasthi</div>
                <div className="text-[9px] opacity-70">শুভ মহা ষষ্ঠী</div>
              </button>

              <button
                type="button"
                onClick={() => {
                  setSimulatedDate(new Date('2026-10-17T10:00:00+05:30'));
                  onClose();
                }}
                className="px-2.5 py-1.5 rounded-lg border border-white/10 bg-white/5 hover:bg-[#f1d449]/15 hover:border-[#f1d449]/40 text-left transition cursor-pointer text-white/80"
              >
                <div className="text-[11px] font-semibold text-[#f1d449]">Maha Saptami</div>
                <div className="text-[9px] opacity-70">শুভ মহা সপ্তমী</div>
              </button>

              <button
                type="button"
                onClick={() => {
                  setSimulatedDate(new Date('2026-10-18T10:00:00+05:30'));
                  onClose();
                }}
                className="px-2.5 py-1.5 rounded-lg border border-white/10 bg-white/5 hover:bg-[#f1d449]/15 hover:border-[#f1d449]/40 text-left transition cursor-pointer text-white/80"
              >
                <div className="text-[11px] font-semibold text-[#f1d449]">Maha Ashtami</div>
                <div className="text-[9px] opacity-70">শুভ মহা অষ্টমী</div>
              </button>

              <button
                type="button"
                onClick={() => {
                  setSimulatedDate(new Date('2026-10-19T10:00:00+05:30'));
                  onClose();
                }}
                className="px-2.5 py-1.5 rounded-lg border border-white/10 bg-white/5 hover:bg-[#f1d449]/15 hover:border-[#f1d449]/40 text-left transition cursor-pointer text-white/80"
              >
                <div className="text-[11px] font-semibold text-[#f1d449]">Maha Navami</div>
                <div className="text-[9px] opacity-70">শুভ মহা নবমী</div>
              </button>

              <button
                type="button"
                onClick={() => {
                  setSimulatedDate(new Date('2026-10-20T10:00:00+05:30'));
                  onClose();
                }}
                className="col-span-2 px-2.5 py-1.5 rounded-lg border border-white/10 bg-white/5 hover:bg-[#f1d449]/15 hover:border-[#f1d449]/40 text-left transition cursor-pointer text-white/80 flex items-center justify-between"
              >
                <div>
                  <div className="text-[11px] font-semibold text-[#f1d449]">Vijaya Dashami</div>
                  <div className="text-[9px] opacity-70">শুভ বিজয়া দশমী</div>
                </div>
                <span className="text-[10px] px-2 py-0.5 rounded-full bg-[#f1d449]/20 text-[#f1d449] font-medium">
                  দশমী
                </span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
