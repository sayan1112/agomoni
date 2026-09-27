import React, { useState } from 'react';
import { usePlayer } from '../context/PlayerContext';
import { X, Play, Music } from 'lucide-react';

export default function PlaylistsModal({ isOpen, onClose }) {
  const {
    playlists,
    playlistKey,
    trackIndex,
    isPlaying,
    selectPlaylist,
    selectTrack,
  } = usePlayer();

  const [activeTab, setActiveTab] = useState(playlistKey || 'durgaPuja');

  if (!isOpen || !playlists) return null;

  const playlistKeys = Object.keys(playlists);
  const currentTabPlaylist = playlists[activeTab];

  return (
    <>
      {/* Backdrop */}
      <div
        className="fixed inset-0 z-40 bg-black/50 backdrop-blur-sm transition-opacity"
        onClick={onClose}
        aria-hidden="true"
      />

      {/* Centered Modal Container */}
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 pointer-events-none">
        <div className="pointer-events-auto w-full max-w-lg max-h-[78vh] flex flex-col rounded-3xl border border-white/15 bg-[#14151c]/92 backdrop-blur-2xl backdrop-saturate-150 shadow-[0_20px_60px_rgba(0,0,0,0.7)] animate-scale-in overflow-hidden">
          {/* Header */}
          <div className="flex items-center justify-between border-b border-white/10 px-5 pb-3 pt-5">
          <h2 className="font-tagline text-xs font-semibold uppercase tracking-[0.2em] text-white/70">
            Playlists
          </h2>
          <button
            type="button"
            onClick={onClose}
            aria-label="Close"
            className="grid h-8 w-8 place-items-center rounded-full text-white/70 transition hover:bg-white/15 hover:text-white active:scale-95"
          >
            <X size={16} />
          </button>
        </div>

        {/* Playlist Selector Tabs */}
        <div className="flex gap-1.5 px-4 pt-3">
          {playlistKeys.map((key) => {
            const pl = playlists[key];
            const isTabActive = activeTab === key;
            return (
              <button
                key={key}
                type="button"
                onClick={() => setActiveTab(key)}
                className={`flex-1 rounded-full px-3 py-1.5 text-[11px] font-semibold uppercase tracking-[0.08em] transition ${
                  isTabActive
                    ? 'bg-white/20 text-white shadow-sm'
                    : 'text-white/50 hover:text-white/80 hover:bg-white/5'
                }`}
              >
                {pl.label}
              </button>
            );
          })}
        </div>

        {/* Playlist Description */}
        <p className="px-5 pt-2 text-[11px] text-white/45">
          {currentTabPlaylist?.description}
        </p>

        {/* Tracks List */}
        <div className="mt-3 flex-1 space-y-1 overflow-y-auto px-3 pb-5 playlist-scroll max-h-[50vh]">
          {currentTabPlaylist?.tracks?.map((item, index) => {
            const isCurrentlyPlayingThisTrack =
              playlistKey === activeTab && trackIndex === index;

            const cover =
              item.cover ||
              currentTabPlaylist.thumbnail ||
              (item.videoId ? `https://img.youtube.com/vi/${item.videoId}/hqdefault.jpg` : null);

            return (
              <button
                key={item.id || index}
                type="button"
                onClick={() => {
                  if (activeTab !== playlistKey) {
                    selectPlaylist(activeTab);
                  }
                  selectTrack(index);
                }}
                className={`group flex w-full items-center gap-3 rounded-2xl px-3 py-2 text-left transition ${
                  isCurrentlyPlayingThisTrack
                    ? 'bg-white/15 text-white ring-1 ring-white/20'
                    : 'text-white/80 hover:bg-white/8 hover:text-white'
                }`}
              >
                {/* Track Thumbnail or Number */}
                <div className="relative h-10 w-10 shrink-0 overflow-hidden rounded-lg bg-black/40">
                  {cover ? (
                    <img
                      src={cover}
                      alt={item.title}
                      className="h-full w-full object-cover"
                      onError={(e) => {
                        e.target.style.display = 'none';
                      }}
                    />
                  ) : (
                    <div className="h-full w-full grid place-items-center text-white/40">
                      <Music size={16} />
                    </div>
                  )}

                  {isCurrentlyPlayingThisTrack && (
                    <div className="absolute inset-0 grid place-items-center bg-black/45 text-[#f1d449]">
                      <Play size={14} fill="currentColor" />
                    </div>
                  )}
                </div>

                {/* Track details */}
                <div className="min-w-0 flex-1">
                  <p
                    className={`truncate text-xs font-medium ${
                      isCurrentlyPlayingThisTrack ? 'text-[#f1d449]' : 'text-white'
                    }`}
                  >
                    {item.title}
                  </p>
                  <p className="truncate text-[10px] text-white/50">
                    {item.subtitle || 'Durga Puja Special'}
                  </p>
                </div>

                {/* Duration */}
                <div className="shrink-0 text-right text-[10px] tabular-nums text-white/40">
                  {item.durationLabel || (item.duration ? `${Math.floor(item.duration/60)}:${(item.duration%60).toString().padStart(2, '0')}` : '')}
                </div>
              </button>
            );
          })}
        </div>
      </div>
    </div>
  </>
);
}
