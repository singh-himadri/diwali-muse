import React, { useState } from 'react';
import confetti from 'canvas-confetti';
import {
  Sparkles,
  Heart,
  Flame,
  X,
  Share2,
  Edit3,
  Volume2,
  VolumeX,
  Wand2,
  Maximize2
} from 'lucide-react';
import { sound } from '../audio/soundEngine';

export default function LoveLetterModal({
  wish,
  onOpenCustomizer,
  onToggleSparkler,
  sparklerActive,
  onTriggerFirework
}) {
  const [isOpen, setIsOpen] = useState(false);
  const [activeReasonIndex, setActiveReasonIndex] = useState(null);
  const [litReasons, setLitReasons] = useState([0]); // first one lit by default

  const handleOpenEnvelope = () => {
    sound.playChime(660, 2.0);
    sound.playFireworkBurst('willow');

    // Golden & crimson festive confetti burst
    confetti({
      particleCount: 85,
      spread: 70,
      origin: { y: 0.65 },
      colors: ['#ffd700', '#ff9e00', '#ef4444', '#f59e0b', '#ffffff'],
      disableForReducedMotion: true
    });

    setIsOpen(true);
  };

  const handleLightReason = (index) => {
    sound.playFlameIgnite();
    if (!litReasons.includes(index)) {
      setLitReasons([...litReasons, index]);
    }
    setActiveReasonIndex(activeReasonIndex === index ? null : index);
  };

  return (
    <div className="relative z-40 max-w-2xl w-full px-4 mx-auto my-auto select-none">
      {!isOpen ? (
        /* Royal Silk Festive Gift Envelope */
        <div
          onClick={handleOpenEnvelope}
          className="group relative cursor-pointer mx-auto max-w-md w-full bg-gradient-to-br from-[#1c0d0d] via-[#2d0f12] to-[#140608] border-2 border-amber-500/50 rounded-2xl p-7 md:p-9 shadow-[0_20px_50px_rgba(0,0,0,0.8),_0_0_35px_rgba(245,158,11,0.35)] transition-all duration-500 hover:scale-[1.03] hover:border-amber-400 hover:shadow-[0_25px_60px_rgba(0,0,0,0.9),_0_0_50px_rgba(245,158,11,0.55)] text-center overflow-hidden"
        >
          {/* Ornate Gold Filigree Corners */}
          <div className="absolute top-2 left-2 w-8 h-8 border-t-2 border-l-2 border-amber-400/70" />
          <div className="absolute top-2 right-2 w-8 h-8 border-t-2 border-r-2 border-amber-400/70" />
          <div className="absolute bottom-2 left-2 w-8 h-8 border-b-2 border-l-2 border-amber-400/70" />
          <div className="absolute bottom-2 right-2 w-8 h-8 border-b-2 border-r-2 border-amber-400/70" />

          {/* Golden Paisley / Mandala ambient watermark */}
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_40%,_rgba(245,158,11,0.15)_0%,_transparent_75%)] pointer-events-none" />

          {/* Top Label */}
          <div className="flex items-center justify-center gap-2 text-amber-300/80 text-xs font-cinzel font-semibold tracking-widest uppercase mb-3">
            <Sparkles className="w-3.5 h-3.5 text-amber-400" />
            <span>A Special Diwali Offering</span>
            <Sparkles className="w-3.5 h-3.5 text-amber-400" />
          </div>

          {/* Personalized Recipient Header */}
          <h2 className="text-2xl md:text-3xl font-decorative text-gold-gradient font-bold drop-shadow-md mb-2">
            For {wish.to || 'My Love'}
          </h2>

          <p className="text-xs md:text-sm text-amber-100/70 font-sans tracking-wide mb-6">
            From <span className="text-amber-300 font-medium">{wish.from || 'Himadri'}</span> with love
          </p>

          {/* Golden Wax Seal */}
          <div className="relative inline-flex items-center justify-center my-3">
            {/* Pulsing seal aura */}
            <div className="absolute -inset-3 rounded-full bg-red-600/30 blur-md group-hover:scale-125 transition-transform duration-500 animate-pulse" />

            <div className="relative w-20 h-20 rounded-full bg-gradient-to-tr from-red-900 via-red-600 to-amber-600 border-2 border-amber-300/80 shadow-[0_4px_20px_rgba(0,0,0,0.6),_inset_0_2px_4px_rgba(255,255,255,0.4)] flex flex-col items-center justify-center transition-transform group-hover:rotate-6">
              <Flame className="w-8 h-8 text-amber-200 fill-amber-300 drop-shadow-[0_0_8px_rgba(255,255,255,0.8)]" />
              <span className="text-[9px] font-cinzel font-bold text-amber-100 uppercase tracking-tighter mt-0.5">
                OPEN
              </span>
            </div>
          </div>

          <p className="mt-5 text-xs text-amber-300/75 font-sans tracking-widest uppercase animate-pulse">
            ✨ Tap the seal to open your card ✨
          </p>
        </div>
      ) : (
        /* Unfolded Royal Parchment Love Letter */
        <div className="relative bg-[#0f0b09]/95 backdrop-blur-xl border border-amber-500/40 rounded-3xl p-6 md:p-10 shadow-[0_25px_70px_rgba(0,0,0,0.9),_0_0_50px_rgba(245,158,11,0.3)] max-h-[85vh] overflow-y-auto animate-fade-in text-stone-100">
          {/* Close / Minimize button */}
          <button
            onClick={() => setIsOpen(false)}
            className="absolute top-4 right-4 p-2 rounded-full text-amber-400/70 hover:text-amber-200 hover:bg-amber-950/40 transition-colors"
            title="Fold Card"
          >
            <X className="w-5 h-5" />
          </button>

          {/* Ornate Header */}
          <div className="text-center pb-6 border-b border-amber-500/20">
            <div className="flex items-center justify-center gap-2 text-amber-400/80 text-xs font-cinzel tracking-widest uppercase mb-1">
              <Sparkles className="w-4 h-4 text-amber-400" />
              <span>Shubh Deepavali</span>
              <Sparkles className="w-4 h-4 text-amber-400" />
            </div>

            <h1 className="text-3xl md:text-4xl font-decorative text-gold-gradient font-black tracking-tight mt-1 mb-2">
              Happy Diwali, {wish.to}!
            </h1>

            <p className="text-sm font-handwriting text-rose-300 text-xl md:text-2xl mt-1">
              "You are the light that turns my whole world into a festival"
            </p>
          </div>

          {/* Main Love Letter Body */}
          <div className="my-6 space-y-4 text-amber-100/90 font-serif-festive text-base md:text-lg leading-relaxed whitespace-pre-line text-left bg-amber-950/20 p-5 rounded-2xl border border-amber-500/15">
            {wish.letter}
          </div>

          {/* Interactive "5 Diyas of Love" */}
          <div className="my-8">
            <div className="text-center mb-4">
              <h3 className="text-lg md:text-xl font-cinzel font-bold text-amber-300">
                🪔 5 Diyas I Light For You 🪔
              </h3>
              <p className="text-xs text-amber-200/60 font-sans mt-0.5">
                (Tap each Diya to unlock a secret reason you mean everything to me)
              </p>
            </div>

            {/* Diyas row */}
            <div className="grid grid-cols-5 gap-2 md:gap-4 my-4">
              {wish.reasons.map((reason, idx) => {
                const isLit = litReasons.includes(idx);
                const isSelected = activeReasonIndex === idx;

                return (
                  <button
                    key={idx}
                    onClick={() => handleLightReason(idx)}
                    className={`flex flex-col items-center justify-center p-2.5 rounded-xl border transition-all duration-300 ${
                      isSelected
                        ? 'bg-amber-900/60 border-amber-400 shadow-[0_0_15px_rgba(245,158,11,0.6)] scale-105'
                        : isLit
                        ? 'bg-amber-950/30 border-amber-500/30 hover:border-amber-400/60'
                        : 'bg-stone-900/40 border-stone-800 opacity-60 hover:opacity-100'
                    }`}
                  >
                    {/* Diya Flame */}
                    <div className="relative mb-1">
                      {isLit ? (
                        <div className="w-3.5 h-5 rounded-full bg-gradient-to-t from-orange-600 via-amber-400 to-yellow-100 animate-flame-wiggle shadow-[0_0_10px_#f59e0b]" />
                      ) : (
                        <div className="w-1.5 h-3 bg-stone-600 rounded-t-sm" />
                      )}
                    </div>

                    {/* Vessel */}
                    <span className="text-xl md:text-2xl">{reason.icon || '🪔'}</span>
                    <span className="text-[10px] md:text-xs font-cinzel font-semibold text-amber-200 mt-1 line-clamp-1">
                      {reason.title}
                    </span>
                  </button>
                );
              })}
            </div>

            {/* Expanded Reason Card */}
            {activeReasonIndex !== null && (
              <div className="p-4 rounded-xl bg-gradient-to-r from-amber-950/60 via-red-950/40 to-amber-950/60 border border-amber-400/40 text-center animate-fade-in shadow-inner">
                <span className="text-xs uppercase tracking-widest font-cinzel text-amber-400 font-bold">
                  {wish.reasons[activeReasonIndex].title}
                </span>
                <p className="text-sm md:text-base font-serif-festive italic text-amber-100 mt-1.5 leading-relaxed">
                  "{wish.reasons[activeReasonIndex].detail}"
                </p>
              </div>
            )}
          </div>

          {/* Photo Memory Frame (Optional Custom Photo or Romantic Artwork) */}
          {wish.photoUrl ? (
            <div className="my-6 flex flex-col items-center">
              <div className="relative p-2 bg-gradient-to-br from-amber-200 via-amber-400 to-amber-600 rounded-2xl shadow-xl max-w-sm">
                <img
                  src={wish.photoUrl}
                  alt="Our Diwali Memory"
                  className="w-full h-56 object-cover rounded-xl"
                />
                <p className="text-center text-xs font-handwriting text-stone-900 font-bold text-lg mt-2 pb-1">
                  Our Forever Glow ✨
                </p>
              </div>
            </div>
          ) : null}

          {/* Calligraphy Sign-off */}
          <div className="text-right pt-4 border-t border-amber-500/20">
            <p className="text-xs font-cinzel text-amber-300/70 tracking-widest uppercase">
              Forever yours,
            </p>
            <p className="text-2xl md:text-3xl font-handwriting text-gold-gradient font-bold mt-1">
              {wish.from || 'Himadri'} ❤️
            </p>
          </div>

          {/* Interactive Floating Action Bar */}
          <div className="mt-8 pt-4 border-t border-amber-500/20 flex flex-wrap items-center justify-between gap-3">
            <div className="flex items-center gap-2">
              {/* Sparkler Toggle */}
              <button
                onClick={onToggleSparkler}
                className={`flex items-center gap-2 px-3.5 py-2 rounded-full text-xs font-cinzel font-bold transition-all ${
                  sparklerActive
                    ? 'bg-amber-400 text-stone-950 shadow-[0_0_15px_#f59e0b]'
                    : 'bg-amber-950/50 text-amber-300 border border-amber-500/40 hover:bg-amber-900/60'
                }`}
                title="Hold or drag mouse/finger to burn a sparkler!"
              >
                <Wand2 className="w-3.5 h-3.5" />
                <span>{sparklerActive ? 'Sparkler ON ✨' : 'Light Phuljhadi 🎆'}</span>
              </button>

              {/* Firework Trigger */}
              <button
                onClick={onTriggerFirework}
                className="flex items-center gap-1.5 px-3.5 py-2 rounded-full text-xs font-cinzel font-bold bg-amber-950/50 text-amber-300 border border-amber-500/40 hover:bg-amber-900/60 transition-all"
                title="Launch a celebration firework"
              >
                <Sparkles className="w-3.5 h-3.5" />
                <span>Burst Rocket 🚀</span>
              </button>
            </div>

            {/* Customizer / Share Button */}
            <button
              onClick={onOpenCustomizer}
              className="flex items-center gap-1.5 px-4 py-2 rounded-full text-xs font-cinzel font-bold bg-gradient-to-r from-amber-500 to-orange-500 text-stone-950 hover:brightness-110 shadow-md transition-all ml-auto"
            >
              <Edit3 className="w-3.5 h-3.5" />
              <span>Customize & Share Link</span>
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

