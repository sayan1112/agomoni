import React, { useState } from 'react';
import { TimeProvider } from './context/TimeContext';
import { PlayerProvider } from './context/PlayerContext';
import BackgroundLayer from './components/BackgroundLayer';
import Header from './components/Header';
import CenterTitle from './components/CenterTitle';
import MusicPlayer from './components/MusicPlayer';
import PlaylistsModal from './components/PlaylistsModal';
import DevelopersModal from './components/DevelopersModal';
import BuyChaiModal from './components/BuyChaiModal';
import PujoListModal from './components/PujoListModal';
import InstallAppModal from './components/InstallAppModal';

function AppContent() {
  const [playlistsOpen, setPlaylistsOpen] = useState(false);
  const [developersOpen, setDevelopersOpen] = useState(false);
  const [buyChaiOpen, setBuyChaiOpen] = useState(false);
  const [pujoListOpen, setPujoListOpen] = useState(false);
  const [installOpen, setInstallOpen] = useState(false);

  return (
    <main className="relative flex min-h-dvh flex-1 flex-col items-center justify-between overflow-hidden">
      {/* Background artwork layer */}
      <BackgroundLayer />

      {/* Top Navbar Header */}
      <Header
        onOpenDevelopers={() => setDevelopersOpen(true)}
        onOpenBuyChai={() => setBuyChaiOpen(true)}
        onOpenInstall={() => setInstallOpen(true)}
      />

      {/* Central Bengali Typography 'পুজো আসছে' */}
      <CenterTitle onOpenPujoList={() => setPujoListOpen(true)} />

      {/* Bottom Music Player & Radio Controller */}
      <MusicPlayer onOpenPlaylist={() => setPlaylistsOpen(true)} />

      {/* Modals & Drawers */}
      <PlaylistsModal
        isOpen={playlistsOpen}
        onClose={() => setPlaylistsOpen(false)}
      />

      <DevelopersModal
        isOpen={developersOpen}
        onClose={() => setDevelopersOpen(false)}
      />

      <BuyChaiModal
        isOpen={buyChaiOpen}
        onClose={() => setBuyChaiOpen(false)}
      />

      <PujoListModal
        isOpen={pujoListOpen}
        onClose={() => setPujoListOpen(false)}
      />

      <InstallAppModal
        isOpen={installOpen}
        onClose={() => setInstallOpen(false)}
      />
    </main>
  );
}

export default function App() {
  return (
    <TimeProvider>
      <PlayerProvider>
        <AppContent />
      </PlayerProvider>
    </TimeProvider>
  );
}
