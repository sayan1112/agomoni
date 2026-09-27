import React, { createContext, useContext, useState, useEffect, useRef } from 'react';
import { getPujoStatus } from '../utils/pujoCalendar';

const PlayerContext = createContext(null);

export function PlayerProvider({ children }) {
  const [playlists, setPlaylists] = useState(null);
  const [currentPlaylistKey, setCurrentPlaylistKey] = useState('durgaPuja');
  const [currentTrackIndex, setCurrentTrackIndex] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [shuffle, setShuffle] = useState(false);
  const [repeat, setRepeat] = useState(false);
  const [dhakPlaying, setDhakPlaying] = useState(false);
  const [isPlayerReady, setIsPlayerReady] = useState(false);
  const [isMahalayaActive, setIsMahalayaActive] = useState(false);

  const ytPlayerRef = useRef(null);
  const dhakAudioRef = useRef(null);
  const timeUpdateIntervalRef = useRef(null);

  // Load playlists data
  useEffect(() => {
    fetch('/playlists.json')
      .then((res) => res.json())
      .then((data) => {
        setPlaylists(data);
      })
      .catch((err) => console.error("Error loading playlists:", err));
  }, []);

  // Initialize Dhak audio
  useEffect(() => {
    const audio = new Audio('/audio/dhak.mp3');
    audio.loop = true;
    audio.preload = 'auto';
    dhakAudioRef.current = audio;

    return () => {
      audio.pause();
    };
  }, []);

  const toggleDhak = () => {
    if (!dhakAudioRef.current) return;
    if (dhakPlaying) {
      dhakAudioRef.current.pause();
      setDhakPlaying(false);
    } else {
      dhakAudioRef.current.play().then(() => {
        setDhakPlaying(true);
      }).catch((e) => {
        console.warn("Audio play prevented:", e);
      });
    }
  };

  const currentPlaylist = playlists ? playlists[currentPlaylistKey] : null;
  const currentTrack = currentPlaylist && currentPlaylist.tracks ? currentPlaylist.tracks[currentTrackIndex] : null;

  // Initialize YouTube Iframe API
  useEffect(() => {
    if (!window.YT) {
      const tag = document.createElement('script');
      tag.src = 'https://www.youtube.com/iframe_api';
      const firstScriptTag = document.getElementsByTagName('script')[0];
      firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);

      window.onYouTubeIframeAPIReady = () => {
        createPlayer();
      };
    } else {
      createPlayer();
    }

    function createPlayer() {
      if (ytPlayerRef.current) return;
      ytPlayerRef.current = new window.YT.Player('yt-hidden-player', {
        height: '0',
        width: '0',
        playerVars: {
          autoplay: 0,
          controls: 0,
          disablekb: 1,
          fs: 0,
          rel: 0,
          modestbranding: 1,
          origin: window.location.origin
        },
        events: {
          onReady: () => {
            setIsPlayerReady(true);
          },
          onStateChange: (event) => {
            // 1 = PLAYING, 2 = PAUSED, 0 = ENDED
            if (event.data === window.YT.PlayerState.PLAYING) {
              setIsPlaying(true);
              startTimeUpdater();
            } else if (event.data === window.YT.PlayerState.PAUSED) {
              setIsPlaying(false);
              stopTimeUpdater();
            } else if (event.data === window.YT.PlayerState.ENDED) {
              stopTimeUpdater();
              handleTrackEnded();
            }
          },
          onError: (err) => {
            console.warn("YouTube player error:", err);
            // On error, auto skip to next track
            goNext();
          }
        }
      });
    }

    return () => {
      stopTimeUpdater();
    };
  }, [playlists, currentPlaylistKey, currentTrackIndex, shuffle, repeat]);

  // Mahalaya 4:00 AM (Bhor 4-te) auto-play logic
  useEffect(() => {
    if (!playlists || !isPlayerReady) return;

    const checkAndTriggerMahalaya = () => {
      const now = new Date();
      const formatter = new Intl.DateTimeFormat('en-US', {
        timeZone: 'Asia/Kolkata',
        hour12: false,
        hour: 'numeric',
        month: 'numeric',
        day: 'numeric'
      });
      const parts = formatter.formatToParts(now);
      const partMap = Object.fromEntries(parts.map(p => [p.type, parseInt(p.value, 10)]));
      
      const hour = partMap.hour;
      const status = getPujoStatus(now);

      // Is today Mahalaya of the current year and at or past 4:00 AM IST (bhor 4-te)
      const isActualMahalayaTime = (status.isMahalayaDay && hour >= 4);
      const isTestOverride = typeof window !== 'undefined' && (
        window.location.search.includes('mahalaya') ||
        window.location.hash.includes('mahalaya')
      );

      if (isActualMahalayaTime || isTestOverride) {
        setIsMahalayaActive(true);
        setCurrentPlaylistKey('ogMahalaya');
        setCurrentTrackIndex(0);
        
        const vidId = playlists.ogMahalaya?.youtubeVideoId || 'YQyo8QeoYhc';
        if (ytPlayerRef.current && ytPlayerRef.current.loadVideoById) {
          ytPlayerRef.current.loadVideoById({
            videoId: vidId,
            startSeconds: 0
          });
          setIsPlaying(true);
        }

        // Browser autoplay fallback for user gesture requirement
        const startOnUserClick = () => {
          if (ytPlayerRef.current && ytPlayerRef.current.playVideo) {
            ytPlayerRef.current.playVideo();
            setIsPlaying(true);
          }
        };
        window.addEventListener('click', startOnUserClick, { once: true });
        window.addEventListener('touchstart', startOnUserClick, { once: true });
      }
    };

    checkAndTriggerMahalaya();
  }, [playlists, isPlayerReady]);

  const startTimeUpdater = () => {
    stopTimeUpdater();
    timeUpdateIntervalRef.current = setInterval(() => {
      if (ytPlayerRef.current && ytPlayerRef.current.getCurrentTime) {
        const time = ytPlayerRef.current.getCurrentTime() || 0;
        const dur = ytPlayerRef.current.getDuration() || 0;
        setCurrentTime(time);
        if (dur > 0) setDuration(dur);
      }
    }, 250);
  };

  const stopTimeUpdater = () => {
    if (timeUpdateIntervalRef.current) {
      clearInterval(timeUpdateIntervalRef.current);
      timeUpdateIntervalRef.current = null;
    }
  };

  // Load and play track
  const loadTrack = (playlistKey, trackIdx, playImmediately = true) => {
    if (!playlists || !playlists[playlistKey]) return;
    const pl = playlists[playlistKey];
    const tr = pl.tracks[trackIdx];
    if (!tr) return;

    setCurrentPlaylistKey(playlistKey);
    setCurrentTrackIndex(trackIdx);
    setCurrentTime(0);
    setDuration(tr.duration || 0);

    const videoId = tr.videoId || pl.youtubeVideoId;
    if (ytPlayerRef.current && ytPlayerRef.current.loadVideoById) {
      const startSeconds = tr.start || 0;
      if (playImmediately) {
        ytPlayerRef.current.loadVideoById({
          videoId: videoId,
          startSeconds: startSeconds
        });
        setIsPlaying(true);
      } else {
        ytPlayerRef.current.cueVideoById({
          videoId: videoId,
          startSeconds: startSeconds
        });
      }
    }
  };

  const handleTrackEnded = () => {
    if (repeat) {
      if (ytPlayerRef.current && ytPlayerRef.current.seekTo) {
        ytPlayerRef.current.seekTo(0);
        ytPlayerRef.current.playVideo();
      }
    } else {
      goNext();
    }
  };

  const togglePlay = () => {
    if (!ytPlayerRef.current || !isPlayerReady) return;

    if (isPlaying) {
      ytPlayerRef.current.pauseVideo();
      setIsPlaying(false);
    } else {
      // If not yet started
      const videoId = currentTrack?.videoId || currentPlaylist?.youtubeVideoId;
      if (!videoId) return;

      if (currentTime === 0) {
        ytPlayerRef.current.loadVideoById({
          videoId: videoId,
          startSeconds: currentTrack?.start || 0
        });
      } else {
        ytPlayerRef.current.playVideo();
      }
      setIsPlaying(true);
    }
  };

  const goNext = () => {
    if (!currentPlaylist || !currentPlaylist.tracks) return;
    const total = currentPlaylist.tracks.length;
    if (total <= 1) return;

    let nextIdx;
    if (shuffle) {
      do {
        nextIdx = Math.floor(Math.random() * total);
      } while (nextIdx === currentTrackIndex && total > 1);
    } else {
      nextIdx = (currentTrackIndex + 1) % total;
    }
    loadTrack(currentPlaylistKey, nextIdx, true);
  };

  const goPrev = () => {
    if (!currentPlaylist || !currentPlaylist.tracks) return;
    const total = currentPlaylist.tracks.length;
    if (total <= 1) return;

    if (currentTime > 4) {
      seekTo(0);
      return;
    }

    let prevIdx;
    if (shuffle) {
      do {
        prevIdx = Math.floor(Math.random() * total);
      } while (prevIdx === currentTrackIndex && total > 1);
    } else {
      prevIdx = (currentTrackIndex - 1 + total) % total;
    }
    loadTrack(currentPlaylistKey, prevIdx, true);
  };

  const seekTo = (ratioOrSeconds) => {
    if (!ytPlayerRef.current || !ytPlayerRef.current.seekTo) return;
    let targetSec = 0;
    if (ratioOrSeconds <= 1 && duration > 0) {
      targetSec = ratioOrSeconds * duration;
    } else {
      targetSec = ratioOrSeconds;
    }
    setCurrentTime(targetSec);
    ytPlayerRef.current.seekTo(targetSec, true);
  };

  const selectPlaylist = (key) => {
    if (key === currentPlaylistKey) return;
    loadTrack(key, 0, isPlaying);
  };

  const selectTrack = (index) => {
    loadTrack(currentPlaylistKey, index, true);
  };

  return (
    <PlayerContext.Provider
      value={{
        playlists,
        playlist: currentPlaylist,
        playlistKey: currentPlaylistKey,
        track: currentTrack,
        trackIndex: currentTrackIndex,
        isPlaying,
        currentTime,
        duration: duration || currentTrack?.duration || 180,
        shuffle,
        repeat,
        dhakPlaying,
        isMahalayaActive,
        triggerMahalayaMode: () => {
          setIsMahalayaActive(true);
          setCurrentPlaylistKey('ogMahalaya');
          setCurrentTrackIndex(0);
          const vidId = playlists?.ogMahalaya?.youtubeVideoId || 'YQyo8QeoYhc';
          if (ytPlayerRef.current && ytPlayerRef.current.loadVideoById) {
            ytPlayerRef.current.loadVideoById({
              videoId: vidId,
              startSeconds: 0
            });
            setIsPlaying(true);
          }
        },
        togglePlay,
        goNext,
        goPrev,
        seekTo,
        toggleShuffle: () => setShuffle(!shuffle),
        toggleRepeat: () => setRepeat(!repeat),
        toggleDhak,
        selectPlaylist,
        selectTrack,
      }}
    >
      {children}
      {/* Hidden YouTube Iframe Player */}
      <div id="yt-hidden-player" style={{ position: 'absolute', bottom: -9999, left: -9999, opacity: 0, pointerEvents: 'none' }} />
    </PlayerContext.Provider>
  );
}

export function usePlayer() {
  const context = useContext(PlayerContext);
  if (!context) {
    throw new Error('usePlayer must be used within PlayerProvider');
  }
  return context;
}
