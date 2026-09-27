import React, { useState } from 'react';
import { useTime } from '../context/TimeContext';
import TimeSwitcherModal from './TimeSwitcherModal';
import { Users, Coffee, Smartphone } from 'lucide-react';

export default function Header({ onOpenDevelopers, onOpenBuyChai, onOpenInstall }) {
  const { displayParts, timezoneLabel } = useTime();
  const [timeSwitcherOpen, setTimeSwitcherOpen] = useState(false);

  return (
    <nav className="fixed inset-x-0 top-0 z-30 flex items-center justify-between px-3 sm:px-5 pt-3 sm:pt-4">
      {/* Left: Live Time Pill */}
      <div className="relative flex items-center z-10">
        <button
          type="button"
          onClick={() => setTimeSwitcherOpen(!timeSwitcherOpen)}
          className="glass-pill px-2.5 sm:px-3.5 text-xs font-medium text-white/90 transition hover:bg-white/12 active:scale-95 cursor-pointer"
          title="Change time / preview lighting"
        >
          <span className="tabular-nums tracking-wide">{displayParts.hour}</span>
          <span className="animate-blink px-0.5 text-white/70">:</span>
          <span className="tabular-nums tracking-wide">{displayParts.minute}</span>
          <span className="ml-1 text-[10px] sm:text-[11px] text-white/70">{displayParts.dayPeriod}</span>
          <span className="ml-1 sm:ml-1.5 text-[9px] sm:text-[10px] font-semibold tracking-wider text-white/60">
            {timezoneLabel}
          </span>
        </button>

        <TimeSwitcherModal
          isOpen={timeSwitcherOpen}
          onClose={() => setTimeSwitcherOpen(false)}
        />
      </div>

      {/* Center: Brand Pill: আগমনী (Agomoni) — True absolute center on both mobile and desktop */}
      <div className="absolute left-1/2 -translate-x-1/2 top-3 sm:top-4 pointer-events-auto">
        <div className="glass-pill px-3.5 sm:px-4 py-1.5 text-xs font-medium text-white/90 tracking-wider flex items-center shadow-lg">
          <span className="text-[#f1d449] mr-1.5 text-sm select-none">🪔</span>
          <span className="font-bengaliSans font-bold text-white text-sm sm:text-[15px] tracking-wide whitespace-nowrap">
            আগমনী
          </span>
        </div>
      </div>

      {/* Right: Quick Links & Actions */}
      <div className="relative flex items-center justify-end gap-1.5 sm:gap-2 z-10">
        {/* Playlist streaming links (YouTube Music & Spotify) - hidden on mobile, visible on tablet/desktop */}
        <div className="glass-pill max-sm:!hidden">
          {/* YouTube Music Icon */}
          <a
            href="https://music.youtube.com/playlist?list=PLJAiFJ6bGyew&si=KNYY_Wx9KMaLK2D8"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Open Durga Puja playlist on YouTube Music"
            className="glass-icon-btn"
            title="YouTube Music"
          >
            <svg width="17" height="17" viewBox="0 0 24 24" fill="currentColor">
              <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 14.5c-2.49 0-4.5-2.01-4.5-4.5S9.51 7.5 12 7.5s4.5 2.01 4.5 4.5-2.01 4.5-4.5 4.5zm0-5.5c-.55 0-1 .45-1 1s.45 1 1 1 1-.45 1-1-.45-1-1-1zm0-7C7.58 4 4 7.58 4 12s3.58 8 8 8 8-3.58 8-8-3.58-8-8-8z"/>
            </svg>
          </a>

          {/* Spotify Icon */}
          <a
            href="https://open.spotify.com/playlist/1zVKSwcN1UDYBXsBWQlp16?si=-F4hxElZQqiGYqkdMnrgfg"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Open Durga Puja playlist on Spotify"
            className="glass-icon-btn"
            title="Spotify"
          >
            <svg width="17" height="17" viewBox="0 0 24 24" fill="currentColor">
              <path d="M12 2C6.4 2 2 6.4 2 12s4.4 10 10 10 10-4.4 10-10S17.6 2 12 2zm4.6 14.4c-.2.3-.5.4-.8.2-2.2-1.3-4.9-1.6-8.2-.9-.3.1-.7-.1-.8-.4-.1-.3.1-.7.4-.8 3.5-.8 6.5-.4 9 1.1.3.2.4.5.4.8zm1.2-2.7c-.2.4-.7.5-1.1.3-2.5-1.5-6.3-2-9.2-1.1-.4.1-.9-.1-1-.5-.1-.4.1-.9.5-1 3.4-1 7.6-.5 10.5 1.2.4.3.5.7.3 1.1zm.1-2.8C14.8 9.1 9.7 8.9 6.8 9.8c-.5.2-1-.1-1.2-.6-.2-.5.1-1 .6-1.2 3.4-1 9-0.8 12.6 1.4.5.3.6.9.3 1.4-.2.4-.8.6-1.2.5z"/>
            </svg>
          </a>
        </div>

        {/* Modal Buttons: Install, Developers, Buy Chai */}
        <div className="glass-pill">
          {/* Install / Add to Phone */}
          <button
            type="button"
            onClick={onOpenInstall}
            aria-label="Add app to phone"
            className="glass-icon-btn text-[#f1d449] hover:text-white"
            title="Install app on your phone"
          >
            <Smartphone size={16} />
          </button>

          {/* Developers */}
          <button
            type="button"
            onClick={onOpenDevelopers}
            aria-label="About the developers"
            className="glass-icon-btn"
            title="About the developer"
          >
            <Users size={16} />
          </button>

          {/* Buy Chai */}
          <button
            type="button"
            onClick={onOpenBuyChai}
            aria-label="Buy us a chai"
            className="glass-icon-btn"
            title="Buy us a chai"
          >
            <Coffee size={16} />
          </button>
        </div>
      </div>
    </nav>
  );
}
