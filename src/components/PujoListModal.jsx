import React, { useState } from 'react';
import pujoData from '../data/pujoList.json';
import { X, MapPin, Train, Search, Compass, ExternalLink } from 'lucide-react';

export default function PujoListModal({ isOpen, onClose }) {
  const [activeZone, setActiveZone] = useState('north'); // 'north' or 'south'
  const [searchQuery, setSearchQuery] = useState('');

  if (!isOpen) return null;

  const currentList = pujoData[activeZone] || [];
  const filteredList = currentList.filter((item) => {
    const q = searchQuery.toLowerCase().trim();
    return (
      item.name.toLowerCase().includes(q) ||
      item.bengaliName.toLowerCase().includes(q) ||
      item.zone.toLowerCase().includes(q) ||
      item.nearestMetro.toLowerCase().includes(q) ||
      item.highlight.toLowerCase().includes(q)
    );
  });

  return (
    <>
      {/* Backdrop */}
      <div
        className="fixed inset-0 z-40 bg-black/65 backdrop-blur-md transition-opacity"
        onClick={onClose}
        aria-hidden="true"
      />

      {/* Centered Modal Container */}
      <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 pointer-events-none">
        <div className="pointer-events-auto w-full max-w-2xl sm:max-w-3xl max-h-[88vh] flex flex-col rounded-3xl border border-white/20 bg-[#0f1118]/96 backdrop-blur-2xl backdrop-saturate-150 shadow-[0_24px_80px_rgba(0,0,0,0.85)] animate-scale-in overflow-hidden">
          
          {/* Header */}
          <div className="flex items-center justify-between border-b border-white/15 px-5 sm:px-7 pb-4 pt-5 bg-white/[0.02]">
            <div className="flex items-center gap-3">
              <div className="grid h-10 w-10 place-items-center rounded-2xl bg-[#f1d449]/15 border border-[#f1d449]/35 text-[#f1d449] shadow-sm">
                <Compass size={20} />
              </div>
              <div>
                <h2 className="font-tagline text-sm sm:text-base font-bold uppercase tracking-[0.14em] text-white">
                  List of All Durga Pujas
                </h2>
                <p className="text-xs sm:text-[13px] text-white/70 font-normal">
                  Kolkata Pujo Parikrama • Complete Club & Pandal Guide
                </p>
              </div>
            </div>

            <button
              type="button"
              onClick={onClose}
              aria-label="Close"
              className="grid h-9 w-9 place-items-center rounded-full bg-white/10 text-white/80 transition hover:bg-white/20 hover:text-white active:scale-95 cursor-pointer border border-white/10"
            >
              <X size={18} />
            </button>
          </div>

          {/* North vs South Tabs */}
          <div className="flex items-center gap-3 px-5 sm:px-7 pt-4 pb-2">
            {/* North Kolkata Tab */}
            <button
              type="button"
              onClick={() => setActiveZone('north')}
              className={`flex-1 flex items-center justify-center gap-2.5 rounded-2xl py-3 px-4 font-tagline text-xs sm:text-sm font-bold uppercase tracking-wider transition-all active:scale-[0.98] cursor-pointer ${
                activeZone === 'north'
                  ? 'bg-[#f1d449] text-black shadow-[0_0_25px_rgba(241,212,73,0.35)] border border-[#f1d449]'
                  : 'bg-white/8 text-white/80 hover:text-white hover:bg-white/14 border border-white/15 font-semibold'
              }`}
            >
              <span>North Kolkata (উত্তর)</span>
              <span className={`text-xs px-2.5 py-0.5 rounded-full font-extrabold ${
                activeZone === 'north' ? 'bg-black/20 text-black' : 'bg-white/15 text-white/90'
              }`}>
                {pujoData.north.length}
              </span>
            </button>

            {/* South Kolkata Tab */}
            <button
              type="button"
              onClick={() => setActiveZone('south')}
              className={`flex-1 flex items-center justify-center gap-2.5 rounded-2xl py-3 px-4 font-tagline text-xs sm:text-sm font-bold uppercase tracking-wider transition-all active:scale-[0.98] cursor-pointer ${
                activeZone === 'south'
                  ? 'bg-[#f1d449] text-black shadow-[0_0_25px_rgba(241,212,73,0.35)] border border-[#f1d449]'
                  : 'bg-white/8 text-white/80 hover:text-white hover:bg-white/14 border border-white/15 font-semibold'
              }`}
            >
              <span>South Kolkata (দক্ষিণ)</span>
              <span className={`text-xs px-2.5 py-0.5 rounded-full font-extrabold ${
                activeZone === 'south' ? 'bg-black/20 text-black' : 'bg-white/15 text-white/90'
              }`}>
                {pujoData.south.length}
              </span>
            </button>
          </div>

          {/* Search Bar */}
          <div className="px-5 sm:px-7 py-2.5">
            <div className="relative flex items-center">
              <Search size={16} className="absolute left-4 text-white/50" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder={`Search ${activeZone === 'north' ? 'North' : 'South'} Kolkata clubs, areas, metro stations...`}
                className="w-full rounded-2xl border border-white/20 bg-black/40 pl-11 pr-10 py-2.5 text-sm font-medium text-white placeholder-white/50 focus:border-[#f1d449] focus:bg-black/60 focus:outline-none transition shadow-inner"
              />
              {searchQuery && (
                <button
                  type="button"
                  onClick={() => setSearchQuery('')}
                  className="absolute right-3.5 text-white/50 hover:text-white p-1"
                >
                  <X size={15} />
                </button>
              )}
            </div>
          </div>

          {/* List of Clubs */}
          <div className="flex-1 space-y-3.5 overflow-y-auto px-5 sm:px-7 py-3 playlist-scroll">
            {filteredList.length === 0 ? (
              <div className="py-16 text-center text-sm font-medium text-white/50">
                No clubs found matching "<span className="text-[#f1d449]">{searchQuery}</span>"
              </div>
            ) : (
              filteredList.map((club, idx) => (
                <div
                  key={club.id || idx}
                  className="group rounded-2xl border border-white/15 bg-white/[0.06] hover:bg-white/[0.10] hover:border-[#f1d449]/40 p-4 sm:p-5 transition duration-150 shadow-sm"
                >
                  {/* Top Row: Name, Bengali Name, Est Year & Map Button */}
                  <div className="flex items-start justify-between gap-3">
                    <div className="space-y-1">
                      <div className="flex items-center gap-2.5 flex-wrap">
                        <h3 className="text-base sm:text-lg font-bold text-white group-hover:text-[#f1d449] transition-colors tracking-tight">
                          {club.name}
                        </h3>
                        {club.established && (
                          <span className="text-xs px-2.5 py-0.5 rounded-full bg-white/10 text-white/80 font-medium border border-white/15">
                            Est. {club.established}
                          </span>
                        )}
                      </div>
                      
                      {/* Bengali Script Name */}
                      <p className="font-bengaliSans text-sm sm:text-[15px] font-semibold text-[#f1d449] tracking-normal">
                        {club.bengaliName}
                      </p>
                    </div>

                    {/* Google Maps Link Button */}
                    <a
                      href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(club.name + ' Kolkata')}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="shrink-0 inline-flex items-center gap-1.5 rounded-full border border-white/20 bg-white/10 hover:bg-[#f1d449] hover:text-black hover:border-[#f1d449] px-3.5 py-1.5 text-xs font-semibold text-white transition-all shadow-sm active:scale-95"
                      title="View on Google Maps"
                    >
                      <MapPin size={13} />
                      <span className="hidden sm:inline">Map</span>
                      <ExternalLink size={11} />
                    </a>
                  </div>

                  {/* Highlights Description */}
                  <p className="mt-2.5 text-[13px] sm:text-sm leading-relaxed text-white/90 font-normal">
                    {club.highlight}
                  </p>

                  {/* Badges: Area Zone & Nearest Metro Station */}
                  <div className="mt-3.5 flex items-center gap-2.5 flex-wrap text-xs">
                    <span className="inline-flex items-center gap-1.5 rounded-xl bg-black/40 border border-white/15 px-3 py-1 text-white/90 font-medium">
                      <MapPin size={12} className="text-[#f1d449]" />
                      <span>{club.zone}</span>
                    </span>

                    <span className="inline-flex items-center gap-1.5 rounded-xl bg-black/40 border border-white/15 px-3 py-1 text-white/90 font-medium">
                      <Train size={12} className="text-emerald-400" />
                      <span>{club.nearestMetro}</span>
                    </span>
                  </div>
                </div>
              ))
            )}
          </div>

          {/* Footer Note */}
          <div className="border-t border-white/15 px-5 sm:px-7 py-3.5 flex items-center justify-between text-xs sm:text-[13px] text-white/60 bg-white/[0.02]">
            <span>Showing <strong className="text-white font-semibold">{filteredList.length}</strong> iconic {activeZone === 'north' ? 'North' : 'South'} Kolkata pandals</span>
            <span className="text-[#f1d449] font-bengaliSans font-bold text-sm tracking-wide">শুভ দুর্গোৎসব</span>
          </div>

        </div>
      </div>
    </>
  );
}
