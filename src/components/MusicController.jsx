import React, { useState } from 'react';
import { Volume2, VolumeX, Music, Sparkles } from 'lucide-react';
import { sound } from '../audio/soundEngine';

export default function MusicController() {
  const [isPlaying, setIsPlaying] = useState(false);
  const [isMuted, setIsMuted] = useState(false);

  const toggleMusic = () => {
    sound.ensureContext();
    const playing = sound.toggleMusic();
    setIsPlaying(playing);
  };

  const toggleMute = () => {
    const nextMute = !isMuted;
    setIsMuted(nextMute);
    sound.setMuted(nextMute);
  };

  return (
    <div className="fixed top-4 right-4 z-50 flex items-center gap-2 select-none">
      {/* Ambient Festive Music Player Toggle */}
      <button
        onClick={toggleMusic}
        className={`flex items-center gap-2 px-3 py-1.5 rounded-full border transition-all duration-300 backdrop-blur-md ${
          isPlaying
            ? 'bg-amber-500/25 border-amber-400 text-amber-200 shadow-[0_0_12px_rgba(245,158,11,0.5)]'
            : 'bg-stone-900/50 border-amber-500/30 text-amber-300/70 hover:text-amber-100 hover:border-amber-400/60'
        }`}
        title={isPlaying ? 'Pause Festive Ambient Music' : 'Play Festive Ambient Music'}
      >
        <Music className={`w-3.5 h-3.5 ${isPlaying ? 'animate-bounce text-amber-400' : ''}`} />
        <span className="text-[11px] font-cinzel font-semibold hidden sm:inline">
          {isPlaying ? 'Melody Playing' : 'Festive Music'}
        </span>
        {isPlaying && (
          <div className="flex items-center gap-0.5 ml-0.5">
            <span className="w-0.5 h-2.5 bg-amber-400 rounded-full animate-pulse" />
            <span className="w-0.5 h-3.5 bg-amber-300 rounded-full animate-pulse delay-75" />
            <span className="w-0.5 h-1.5 bg-amber-400 rounded-full animate-pulse delay-150" />
          </div>
        )}
      </button>

      {/* Master Mute / Sound Effects Button */}
      <button
        onClick={toggleMute}
        className="p-2 rounded-full bg-stone-900/50 border border-amber-500/30 text-amber-300/70 hover:text-amber-100 hover:border-amber-400/60 backdrop-blur-md transition-all"
        title={isMuted ? 'Unmute Sound' : 'Mute Sound'}
      >
        {isMuted ? <VolumeX className="w-4 h-4 text-rose-400" /> : <Volume2 className="w-4 h-4" />}
      </button>
    </div>
  );
}

