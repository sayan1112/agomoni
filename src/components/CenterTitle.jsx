import React from 'react';
import { usePlayer } from '../context/PlayerContext';
import { useTime } from '../context/TimeContext';
import { getPujoStatus } from '../utils/pujoCalendar';
import { Sparkles, Radio } from 'lucide-react';

export default function CenterTitle({ onOpenPujoList }) {
  const { isMahalayaActive, playlistKey, isPlaying, triggerMahalayaMode } = usePlayer();
  const { currentTime } = useTime();

  const { targetYear, daysLeft, isPujoActive, isMahalayaDay, bengaliTithiName, bengaliGreeting } = getPujoStatus(currentTime);

  const isPlayingMahalaya = playlistKey === 'ogMahalaya' && isPlaying;

  return (
    <div className="mt-[10vh] sm:mt-[12vh] flex flex-col items-center px-4 text-center select-none z-10">
      {/* Central Bengali Typography - Dynamically changes during Pujo Week */}
      <h1 className="font-bengali bengali-title flex flex-col items-center justify-center font-normal leading-[1.08] sm:leading-none sm:block tracking-tight text-[clamp(2.35rem,8.5vw,3.6rem)] sm:text-[5.25rem] md:text-[7rem] lg:text-[8.25rem]">
        <span className="block">{bengaliGreeting?.line1 || 'পুজো'}</span>
        <span className="block sm:mt-[16px]">{bengaliGreeting?.line2 || 'আসছে'}</span>
      </h1>

      {/* Creative Festive Countdown / Active Pujo / Mahalaya Special Pill */}
      <div className="mt-4 sm:mt-6 pointer-events-auto flex flex-col items-center gap-2.5">
        {isMahalayaActive || isPlayingMahalaya || isMahalayaDay ? (
          /* Mahalaya Active Festive Card */
          <div
            onClick={triggerMahalayaMode}
            className="group cursor-pointer inline-flex items-center gap-2.5 rounded-full px-5 py-2.5 border border-[#f1d449]/30 bg-white/7 backdrop-blur-2xl backdrop-saturate-150 shadow-[0_4px_20px_rgba(0,0,0,0.15)] transition hover:bg-white/12 hover:scale-105 active:scale-95 animate-scale-in"
          >
            <span className="flex h-2.5 w-2.5 relative">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#f1d449] opacity-75" />
              <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-[#f1d449]" />
            </span>
            <span className="text-sm sm:text-base font-semibold text-[#f1d449] font-tagline tracking-wide">
              আজ শুভ মহালয়া • ভোর ৪টের মহিষাসুরমর্দিনী
            </span>
            <Radio size={16} className="text-[#f1d449] animate-pulse" />
          </div>
        ) : isPujoActive ? (
          /* Active Pujo Celebration Pill */
          <div className="group relative inline-flex items-center gap-2.5 sm:gap-3 rounded-full px-5 sm:px-6 py-2 sm:py-2.5 border border-[#f1d449]/35 bg-white/10 backdrop-blur-2xl backdrop-saturate-150 shadow-[0_4px_25px_rgba(241,212,73,0.2)] animate-scale-in">
            <span className="text-[#f1d449] text-base">🪔</span>
            <span className="font-tagline text-xs sm:text-sm font-bold text-[#f1d449]">
              আজ {bengaliTithiName}! শুভ দুর্গাপূজা {targetYear}!
            </span>
            <Sparkles size={14} className="text-[#f1d449]" />
          </div>
        ) : (
          /* Creative Days Left Countdown Badge (High Transparency Glass) */
          <div className="group relative inline-flex items-center gap-2 sm:gap-3 rounded-full px-4 sm:px-6 py-2 sm:py-2.5 border border-white/15 bg-white/7 backdrop-blur-2xl backdrop-saturate-150 shadow-[0_4px_20px_rgba(0,0,0,0.12)] transition hover:bg-white/12 hover:border-white/25">
            {/* Sparkling Festive Diya / Sparkle */}
            <span className="text-[#f1d449] text-sm sm:text-base">🪔</span>

            {/* Bengali text with creative golden number pill */}
            <span className="font-tagline text-xs sm:text-sm font-medium text-white/90">
              আর মাত্র
            </span>

            {/* Translucent Golden Number Pill */}
            <span className="inline-flex items-center justify-center rounded-lg bg-[#f1d449]/12 border border-[#f1d449]/30 px-2.5 py-0.5 font-tagline font-bold text-sm sm:text-lg text-[#f1d449] tabular-nums">
              {daysLeft}
            </span>

            <span className="font-tagline text-xs sm:text-sm font-medium text-white/90">
              দিন বাকি
            </span>

            {/* Subtle Divider */}
            <span className="hidden sm:inline text-white/30">•</span>

            {/* English seasonal tagline */}
            <span className="hidden sm:inline font-tagline text-[11px] font-semibold uppercase tracking-[0.14em] text-white/60">
              Until Durga Pujo {targetYear}
            </span>

            {/* Subtle Sparkle on right */}
            <Sparkles size={13} className="text-[#f1d449]/70 group-hover:text-[#f1d449] transition-colors" />
          </div>
        )}

        {/* Interactive List of Durga Pujos Pill */}
        <button
          type="button"
          onClick={onOpenPujoList}
          className="group cursor-pointer inline-flex items-center gap-2 rounded-full px-4 sm:px-5 py-1.5 sm:py-2 border border-white/15 bg-white/7 backdrop-blur-2xl backdrop-saturate-150 shadow-[0_4px_20px_rgba(0,0,0,0.12)] transition hover:bg-white/15 hover:border-[#f1d449]/40 hover:scale-105 active:scale-95"
          title="Explore All Durga Pujos in North & South Kolkata"
        >
          <span className="text-[#f1d449] text-xs sm:text-sm group-hover:rotate-12 transition-transform">🛕</span>
          <span className="font-tagline text-xs sm:text-sm font-semibold tracking-wide text-white/90 group-hover:text-white transition-colors">
            List of All Durga Pujos
          </span>
          <span className="text-[10px] px-2 py-0.5 rounded-full bg-[#f1d449]/20 text-[#f1d449] font-medium border border-[#f1d449]/30">
            North & South
          </span>
          <span className="text-white/40 group-hover:text-[#f1d449] group-hover:translate-x-0.5 transition-all text-xs font-bold">
            →
          </span>
        </button>
      </div>
    </div>
  );
}
