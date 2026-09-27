import React, { useRef } from 'react';
import { usePlayer } from '../context/PlayerContext';
import {
  Play,
  Pause,
  SkipBack,
  SkipForward,
  Shuffle,
  Repeat,
  List,
  ChevronDown,
  Music2
} from 'lucide-react';

function formatTime(seconds) {
  if (isNaN(seconds) || seconds < 0) return '0:00';
  const m = Math.floor(seconds / 60);
  const s = Math.floor(seconds % 60);
  return `${m}:${s < 10 ? '0' : ''}${s}`;
}

export default function MusicPlayer({ onOpenPlaylist }) {
  const {
    playlist,
    track,
    isPlaying,
    currentTime,
    duration,
    shuffle,
    repeat,
    dhakPlaying,
    togglePlay,
    goNext,
    goPrev,
    seekTo,
    toggleShuffle,
    toggleRepeat,
    toggleDhak,
  } = usePlayer();

  const desktopProgressRef = useRef(null);
  const mobileProgressRef = useRef(null);

  const progressPercent = duration > 0 ? Math.min(100, (currentTime / duration) * 100) : 0;

  const handleSeek = (e, ref) => {
    if (!ref.current || !duration) return;
    const rect = ref.current.getBoundingClientRect();
    const clickX = e.clientX - rect.left;
    const ratio = Math.max(0, Math.min(1, clickX / rect.width));
    seekTo(ratio * duration);
  };

  const coverUrl = track?.cover || playlist?.thumbnail || 'https://img.youtube.com/vi/SFJeglBF5cg/hqdefault.jpg';
  const trackTitle = track?.title || 'Dugga Elo';
  const trackSubtitle = track?.subtitle || 'Monali Thakur';

  return (
    <div className="mb-4 sm:mb-[4vh] flex w-full justify-center px-3 sm:px-6 z-20">
      <div className="w-full max-w-md sm:max-w-[31rem]">
        {/* Pills above player */}
        <div className="mb-2.5 flex items-center justify-center gap-2">
          {/* Playlist selector pill */}
          <button
            type="button"
            onClick={onOpenPlaylist}
            aria-label={`Current playlist: ${playlist?.label || 'Durga Puja'}. Click to change.`}
            className="inline-flex max-w-full items-center gap-1.5 rounded-full px-3 py-1.5 bg-white/7 backdrop-blur-2xl backdrop-saturate-150 border border-white/15 text-white/90 shadow-[0_4px_20px_rgba(0,0,0,0.35)] transition hover:bg-white/12 active:scale-95 text-[10px] sm:text-[11px] font-semibold uppercase tracking-[0.08em] cursor-pointer"
          >
            <List className="h-3 w-3 shrink-0" />
            <span className="truncate">{playlist?.pillLabel || 'PUJA RADIO'}</span>
            <ChevronDown className="h-3 w-3 shrink-0 opacity-70" />
          </button>

          {/* Dhak sound button */}
          <button
            type="button"
            onClick={toggleDhak}
            aria-label="Play Dhak Beat"
            aria-pressed={dhakPlaying}
            className={`inline-flex items-center gap-1.5 rounded-full px-3 py-1.5 backdrop-blur-2xl backdrop-saturate-150 border text-[10px] sm:text-[11px] font-semibold uppercase tracking-[0.08em] transition active:scale-95 cursor-pointer ${
              dhakPlaying
                ? 'bg-[#f1d449]/20 border-[#f1d449]/50 text-[#f1d449] shadow-[0_0_16px_rgba(241,212,73,0.35)] animate-pulse'
                : 'bg-white/7 border-white/15 text-white/90 hover:bg-white/12 shadow-[0_4px_20px_rgba(0,0,0,0.35)]'
            }`}
          >
            <Music2 className="h-3 w-3 shrink-0" />
            <span>DHAK</span>
          </button>
        </div>

        {/* Frosted Glass Player Card */}
        <div className="group relative overflow-hidden rounded-3xl bg-white/7 backdrop-blur-2xl backdrop-saturate-150 border border-white/15 shadow-[0_8px_40px_rgba(0,0,0,0.5)]">
          {/* Desktop Layout */}
          <div className="hidden sm:flex items-center gap-4 p-3 pr-4">
            {/* Artwork */}
            <div className="h-[69px] w-[69px] shrink-0 overflow-hidden rounded-xl shadow-lg ring-1 ring-white/20 bg-black/40">
              <img
                src={coverUrl}
                alt={`${trackTitle} artwork`}
                className="h-full w-full object-cover object-center"
                onError={(e) => {
                  e.target.src = 'https://img.youtube.com/vi/SFJeglBF5cg/mqdefault.jpg';
                }}
              />
            </div>

            {/* Track Info & Progress */}
            <div className="min-w-0 w-48 shrink-0">
              <p className="truncate text-[13px] font-semibold text-white drop-shadow-sm" title={trackTitle}>
                {trackTitle}
              </p>
              <p className="truncate text-[11px] text-white/70" title={trackSubtitle}>
                {trackSubtitle}
              </p>

              {/* Progress Slider */}
              <div className="mt-2">
                <div
                  ref={desktopProgressRef}
                  onClick={(e) => handleSeek(e, desktopProgressRef)}
                  role="slider"
                  aria-label="Seek track position"
                  aria-valuemin={0}
                  aria-valuemax={100}
                  aria-valuenow={Math.round(progressPercent)}
                  className="group/bar relative h-2 w-full cursor-pointer py-1"
                >
                  <div className="absolute inset-x-0 top-1/2 h-1 -translate-y-1/2 overflow-hidden rounded-sm bg-white/20">
                    <div
                      className="h-full rounded-sm bg-white/90 transition-all duration-100"
                      style={{ width: `${progressPercent}%` }}
                    />
                  </div>
                  <div
                    className="absolute top-1/2 h-2.5 w-2.5 -translate-x-1/2 -translate-y-1/2 rounded-full bg-white opacity-0 shadow transition-opacity group-hover/bar:opacity-100 pointer-events-none"
                    style={{ left: `${progressPercent}%` }}
                  />
                </div>
                <div className="mt-0.5 text-left text-[10px] tabular-nums text-white/60">
                  {formatTime(currentTime)} / {formatTime(duration)}
                </div>
              </div>
            </div>

            {/* Controls */}
            <div className="ml-auto flex items-center gap-1">
              {/* Shuffle */}
              <button
                type="button"
                onClick={toggleShuffle}
                aria-label="Toggle shuffle"
                className={`grid h-8 w-8 place-items-center rounded-xl transition hover:bg-white/15 active:scale-95 ${
                  shuffle ? 'text-[#f1d449]' : 'text-white/60 hover:text-white'
                }`}
                title={shuffle ? 'Shuffle on' : 'Shuffle off'}
              >
                <Shuffle size={14} />
              </button>

              {/* Prev */}
              <button
                type="button"
                onClick={goPrev}
                aria-label="Previous track"
                className="grid h-8 w-8 place-items-center rounded-xl text-white/80 transition hover:bg-white/15 hover:text-white active:scale-95"
                title="Previous track"
              >
                <SkipBack size={16} />
              </button>

              {/* Play / Pause */}
              <button
                type="button"
                onClick={togglePlay}
                aria-label={isPlaying ? 'Pause' : 'Play'}
                className="grid h-9 w-9 place-items-center rounded-full bg-white text-black transition hover:bg-white/90 active:scale-95 shadow-md"
                title={isPlaying ? 'Pause' : 'Play'}
              >
                {isPlaying ? <Pause size={17} fill="currentColor" /> : <Play size={17} fill="currentColor" className="ml-0.5" />}
              </button>

              {/* Next */}
              <button
                type="button"
                onClick={goNext}
                aria-label="Next track"
                className="grid h-8 w-8 place-items-center rounded-xl text-white/80 transition hover:bg-white/15 hover:text-white active:scale-95"
                title="Next track"
              >
                <SkipForward size={16} />
              </button>

              {/* Repeat */}
              <button
                type="button"
                onClick={toggleRepeat}
                aria-label="Toggle repeat"
                className={`grid h-8 w-8 place-items-center rounded-xl transition hover:bg-white/15 active:scale-95 ${
                  repeat ? 'text-[#f1d449]' : 'text-white/60 hover:text-white'
                }`}
                title={repeat ? 'Repeat track on' : 'Repeat track off'}
              >
                <Repeat size={14} />
              </button>
            </div>
          </div>

          {/* Mobile Layout */}
          <div className="flex sm:hidden flex-col p-3">
            <div className="flex items-center gap-3">
              <div className="h-14 w-14 shrink-0 overflow-hidden rounded-xl shadow-lg ring-1 ring-white/20 bg-black/40">
                <img
                  src={coverUrl}
                  alt={`${trackTitle} artwork`}
                  className="h-full w-full object-cover object-center"
                />
              </div>

              <div className="min-w-0 flex-1">
                <p className="truncate text-[13px] font-semibold text-white drop-shadow-sm">
                  {trackTitle}
                </p>
                <p className="truncate text-[11px] text-white/70">
                  {trackSubtitle}
                </p>
                <div className="mt-1.5">
                  <div
                    ref={mobileProgressRef}
                    onClick={(e) => handleSeek(e, mobileProgressRef)}
                    className="relative h-2 w-full cursor-pointer py-1"
                  >
                    <div className="absolute inset-x-0 top-1/2 h-1 -translate-y-1/2 overflow-hidden rounded-sm bg-white/20">
                      <div
                        className="h-full rounded-sm bg-white/90"
                        style={{ width: `${progressPercent}%` }}
                      />
                    </div>
                  </div>
                  <div className="text-left text-[10px] tabular-nums text-white/60">
                    {formatTime(currentTime)} / {formatTime(duration)}
                  </div>
                </div>
              </div>

              {/* Mobile Play / Controls */}
              <div className="flex items-center gap-1">
                <button
                  type="button"
                  onClick={goPrev}
                  className="grid h-8 w-8 place-items-center rounded-lg text-white/80"
                >
                  <SkipBack size={15} />
                </button>
                <button
                  type="button"
                  onClick={togglePlay}
                  className="grid h-9 w-9 place-items-center rounded-full bg-white text-black"
                >
                  {isPlaying ? <Pause size={16} fill="currentColor" /> : <Play size={16} fill="currentColor" className="ml-0.5" />}
                </button>
                <button
                  type="button"
                  onClick={goNext}
                  className="grid h-8 w-8 place-items-center rounded-lg text-white/80"
                >
                  <SkipForward size={15} />
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
