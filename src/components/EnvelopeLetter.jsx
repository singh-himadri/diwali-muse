import React, { useState } from 'react';
import confetti from 'canvas-confetti';
import {
  Sparkles,
  Flame,
  X,
  Share2,
  Edit3,
  Wand2,
  RotateCcw,
  Heart,
  ChevronDown,
  Eye
} from 'lucide-react';
import { sound } from '../audio/soundEngine';

export default function EnvelopeLetter({
  wish,
  onOpenCustomizer,
  onToggleSparkler,
  sparklerActive,
  onTriggerFirework
}) {
  // Envelope states: 'sealed' -> 'unsealing' -> 'opened'
  const [envelopeState, setEnvelopeState] = useState('sealed');
  const [activeReasonIndex, setActiveReasonIndex] = useState(null);
  const [litReasons, setLitReasons] = useState([0]); // first one lit
  const [isLetterExpanded, setIsLetterExpanded] = useState(false);

  const handleOpenEnvelope = () => {
    if (envelopeState !== 'sealed') return;

    sound.playFlameIgnite();
    sound.playFireworkBurst('willow');

    // Golden & rose confetti
    confetti({
      particleCount: 90,
      spread: 75,
      origin: { y: 0.62 },
      colors: ['#ffd700', '#f59e0b', '#fb7185', '#ef4444', '#ffffff'],
      disableForReducedMotion: true
    });

    setEnvelopeState('unsealing');

    // Step 1: Flap opens, Step 2: Letter slides up and displays
    setTimeout(() => {
      setEnvelopeState('opened');
      setIsLetterExpanded(true);
    }, 900);
  };

  const handleFoldBack = () => {
    setIsLetterExpanded(false);
    setTimeout(() => {
      setEnvelopeState('sealed');
      setActiveReasonIndex(null);
    }, 400);
  };

  const handleLightReason = (index) => {
    sound.playChime(520 + index * 60, 1.8);
    if (!litReasons.includes(index)) {
      setLitReasons([...litReasons, index]);
    }
    setActiveReasonIndex(activeReasonIndex === index ? null : index);
  };

  return (
    <div className="relative z-40 w-full max-w-2xl px-4 mx-auto my-auto select-none flex flex-col items-center justify-center">
      {/* 3D Envelope View (When not in full expanded letter view) */}
      {!isLetterExpanded ? (
        <div className="relative perspective-1000 flex flex-col items-center">
          {/* Main 3D Envelope Container */}
          <div
            onClick={handleOpenEnvelope}
            className={`relative w-80 h-56 sm:w-96 sm:h-64 cursor-pointer transition-all duration-700 transform-style-3d ${
              envelopeState === 'sealed'
                ? 'hover:scale-[1.03] hover:-translate-y-1'
                : ''
            }`}
          >
            {/* Ambient Envelope Glow */}
            <div className="absolute -inset-4 bg-gradient-to-r from-amber-600/20 via-rose-600/25 to-amber-600/20 rounded-3xl blur-2xl -z-10 animate-aura-breath" />

            {/* Back panel of envelope */}
            <div className="absolute inset-0 rounded-2xl bg-gradient-to-b from-[#220a0d] to-[#130406] border border-amber-500/40 shadow-2xl overflow-hidden">
              {/* Gold foil decorative filigree pattern inside lining */}
              <div className="absolute inset-0 opacity-15 bg-[radial-gradient(circle_at_50%_50%,_#f59e0b_10%,_transparent_60%)]" />
            </div>

            {/* The Letter preview sliding out */}
            <div
              className={`absolute inset-x-4 top-2 h-48 rounded-xl parchment-paper p-4 text-stone-900 transition-all duration-1000 ease-out shadow-lg z-10 ${
                envelopeState === 'opened'
                  ? '-translate-y-36 opacity-100 scale-105'
                  : envelopeState === 'unsealing'
                  ? '-translate-y-20 opacity-90'
                  : 'translate-y-2 opacity-0'
              }`}
            >
              <div className="text-center border-b border-amber-900/20 pb-1">
                <span className="text-[10px] font-cinzel tracking-widest text-amber-800 uppercase font-bold">
                  Shubh Deepavali ✨
                </span>
                <p className="text-sm font-handwriting text-rose-900 font-bold">
                  For {wish.to}
                </p>
              </div>
              <p className="text-[11px] font-serif-festive text-stone-700 italic mt-2 line-clamp-3 leading-relaxed">
                "{wish.letter.slice(0, 110)}..."
              </p>
            </div>

            {/* Front Pocket (Left & Right & Bottom Fold) */}
            <div className="absolute inset-0 rounded-2xl z-20 pointer-events-none overflow-hidden">
              {/* Bottom pocket shape */}
              <div
                className="absolute inset-x-0 bottom-0 h-40 bg-gradient-to-t from-[#20080b] via-[#2a0c10] to-[#341015] border-t border-amber-500/30"
                style={{
                  clipPath: 'polygon(0% 100%, 100% 100%, 100% 25%, 50% 85%, 0% 25%)'
                }}
              />
              {/* Left triangle flap */}
              <div
                className="absolute inset-y-0 left-0 w-44 bg-gradient-to-r from-[#1a0608] to-[#260a0e] opacity-90"
                style={{
                  clipPath: 'polygon(0% 0%, 100% 50%, 0% 100%)'
                }}
              />
              {/* Right triangle flap */}
              <div
                className="absolute inset-y-0 right-0 w-44 bg-gradient-to-l from-[#1a0608] to-[#260a0e] opacity-90"
                style={{
                  clipPath: 'polygon(100% 0%, 0% 50%, 100% 100%)'
                }}
              />

              {/* Gold borders on envelope front folds */}
              <svg className="absolute inset-0 w-full h-full" fill="none">
                <path
                  d="M0,0 L190,130 L384,0"
                  stroke="rgba(245, 158, 11, 0.4)"
                  strokeWidth="1.2"
                />
                <path
                  d="M0,256 L190,130 L384,256"
                  stroke="rgba(245, 158, 11, 0.3)"
                  strokeWidth="1.2"
                />
              </svg>

              {/* Recipient & Sender gold calligraphy on front pocket */}
              <div className="absolute bottom-4 inset-x-0 text-center">
                <span className="text-[11px] font-cinzel text-amber-300/80 tracking-widest uppercase block">
                  A Gift For
                </span>
                <span className="text-xl sm:text-2xl font-decorative text-gold-gradient font-bold drop-shadow">
                  {wish.to}
                </span>
                <span className="text-[10px] font-sans text-amber-200/60 block mt-0.5">
                  With love from {wish.from}
                </span>
              </div>
            </div>

            {/* Top Triangular Flap with 3D Flip */}
            <div
              className={`absolute top-0 inset-x-0 h-32 origin-top transition-transform duration-700 ease-in-out z-30 transform-style-3d ${
                envelopeState !== 'sealed'
                  ? '-rotate-x-180 pointer-events-none'
                  : 'rotate-x-0'
              }`}
              style={{
                clipPath: 'polygon(0% 0%, 100% 0%, 50% 100%)'
              }}
            >
              {/* Exterior flap surface */}
              <div className="w-full h-full bg-gradient-to-b from-[#381116] via-[#2a0c10] to-[#1c0709] border-b border-amber-500/50 shadow-md flex items-center justify-center">
                {/* Subtle gold line on flap edge */}
                <div className="absolute inset-0 border-t-2 border-amber-400/40" />
              </div>
            </div>

            {/* Realistic 3D Crimson & Gold Wax Seal (Centred at flap point) */}
            <div
              className={`absolute top-[4.5rem] sm:top-24 left-1/2 -translate-x-1/2 z-40 transition-all duration-500 ${
                envelopeState !== 'sealed'
                  ? 'opacity-0 scale-125 pointer-events-none'
                  : 'opacity-100 scale-100 hover:scale-110'
              }`}
            >
              <div className="relative w-14 h-14 sm:w-16 sm:h-16 rounded-full bg-gradient-to-tr from-red-950 via-red-600 to-amber-600 border-2 border-amber-300/90 shadow-[0_4px_18px_rgba(0,0,0,0.8),_inset_0_2px_4px_rgba(255,255,255,0.45)] flex flex-col items-center justify-center">
                {/* Outer seal decorative scalloped edge */}
                <div className="absolute -inset-1 rounded-full border border-red-700/50 -z-10 animate-pulse" />
                <Flame className="w-6 h-6 sm:w-7 sm:h-7 text-amber-100 fill-amber-300 drop-shadow-[0_0_6px_rgba(255,255,255,0.8)]" />
                <span className="text-[8px] sm:text-[9px] font-cinzel font-black text-amber-100 uppercase tracking-tighter -mt-0.5">
                  UNSEAL
                </span>
              </div>
            </div>
          </div>

          {/* Interactive Hint */}
          <div className="mt-6 flex flex-col items-center text-center">
            <span className="text-xs sm:text-sm text-amber-300/90 font-cinzel tracking-wider uppercase flex items-center gap-1.5 animate-pulse">
              <Sparkles className="w-4 h-4 text-amber-400" />
              <span>Tap the wax seal to open your letter</span>
              <Sparkles className="w-4 h-4 text-amber-400" />
            </span>
            <span className="text-[11px] text-amber-100/50 font-sans mt-0.5">
              (An intimate handwritten wish awaits inside)
            </span>
          </div>
        </div>
      ) : (
        /* Unfolded Luxury Stationery Letter (Expanded View) */
        <div className="relative w-full max-h-[88vh] overflow-y-auto parchment-paper rounded-3xl p-6 sm:p-10 text-stone-900 border-2 border-amber-500/50 shadow-[0_25px_80px_rgba(0,0,0,0.9),_0_0_50px_rgba(245,158,11,0.35)] animate-fade-in">
          {/* Top Controls: Close / Fold back into envelope */}
          <div className="flex items-center justify-between pb-4 border-b border-amber-900/15 mb-6">
            <button
              onClick={handleFoldBack}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-cinzel font-semibold text-amber-900 bg-amber-200/50 hover:bg-amber-200/80 transition-colors"
            >
              <RotateCcw className="w-3.5 h-3.5" />
              <span>Fold Back In Envelope</span>
            </button>

            <span className="text-xs font-cinzel tracking-widest text-amber-900/70 uppercase font-bold">
              Festive Epistle ✨
            </span>

            <button
              onClick={handleFoldBack}
              className="p-1.5 rounded-full text-stone-500 hover:text-stone-900 hover:bg-amber-100 transition-colors"
              title="Close"
            >
              <X className="w-4 h-4" />
            </button>
          </div>

          {/* Ornate Letterhead */}
          <div className="text-center mb-6">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-100/80 border border-amber-400/40 text-amber-900 text-[11px] font-cinzel font-bold tracking-widest uppercase mb-2">
              <Sparkles className="w-3.5 h-3.5 text-amber-600" />
              <span>Shubh Deepavali</span>
              <Sparkles className="w-3.5 h-3.5 text-amber-600" />
            </div>

            <h1 className="text-3xl sm:text-4xl font-decorative text-amber-950 font-bold tracking-tight">
              Happy Diwali, {wish.to}!
            </h1>

            <p className="text-xl sm:text-2xl font-handwriting text-rose-800 font-semibold mt-1">
              "The sweetest light in my world is you"
            </p>
          </div>

          {/* Letter Body with Deckled aesthetic & drop cap */}
          <div className="my-6 p-5 sm:p-7 rounded-2xl bg-[#fffefc]/80 border border-amber-900/10 shadow-inner">
            <p className="text-stone-800 font-serif-festive text-base sm:text-lg leading-relaxed whitespace-pre-line text-left">
              {wish.letter}
            </p>
          </div>

          {/* Interactive "5 Diyas of Light" Garland */}
          <div className="my-8 pt-4 border-t border-amber-900/15">
            <div className="text-center mb-4">
              <h3 className="text-lg sm:text-xl font-cinzel font-bold text-amber-950 flex items-center justify-center gap-2">
                <span>🪔</span>
                <span>5 Diyas I Light For You</span>
                <span>🪔</span>
              </h3>
              <p className="text-xs text-stone-600 font-sans mt-0.5">
                (Tap each Diya to unlock a secret reason you mean everything to me)
              </p>
            </div>

            {/* 5 Diya Buttons Grid */}
            <div className="grid grid-cols-5 gap-2 sm:gap-3 my-4">
              {wish.reasons.map((reason, idx) => {
                const isLit = litReasons.includes(idx);
                const isSelected = activeReasonIndex === idx;

                return (
                  <button
                    key={idx}
                    onClick={() => handleLightReason(idx)}
                    className={`flex flex-col items-center justify-between p-2 sm:p-3 rounded-2xl border transition-all duration-300 ${
                      isSelected
                        ? 'bg-amber-100 border-amber-600 shadow-[0_0_15px_rgba(245,158,11,0.5)] scale-105'
                        : isLit
                        ? 'bg-amber-50/80 border-amber-400/50 hover:bg-amber-100/60'
                        : 'bg-stone-100/60 border-stone-300 opacity-60 hover:opacity-100'
                    }`}
                  >
                    {/* Diya Flame */}
                    <div className="h-5 flex items-end justify-center mb-1">
                      {isLit ? (
                        <div className="w-3.5 h-5 rounded-full bg-gradient-to-t from-orange-600 via-amber-400 to-yellow-100 animate-flame-dance shadow-[0_0_10px_#f59e0b]" />
                      ) : (
                        <div className="w-1 h-3 bg-stone-400 rounded-t-sm" />
                      )}
                    </div>

                    <span className="text-xl sm:text-2xl my-0.5">{reason.icon || '🪔'}</span>
                    <span className="text-[10px] sm:text-xs font-cinzel font-bold text-stone-800 line-clamp-1 mt-0.5">
                      {reason.title}
                    </span>
                  </button>
                );
              })}
            </div>

            {/* Revealed Secret Reason Card */}
            {activeReasonIndex !== null && (
              <div className="p-4 sm:p-5 rounded-2xl bg-gradient-to-br from-amber-100 via-rose-50 to-amber-100 border border-amber-400/50 shadow-sm text-center animate-fade-in mt-3">
                <span className="text-xs uppercase tracking-widest font-cinzel text-amber-900 font-bold block mb-1">
                  ✨ {wish.reasons[activeReasonIndex].title} ✨
                </span>
                <p className="text-sm sm:text-base font-serif-festive italic text-stone-800 leading-relaxed">
                  "{wish.reasons[activeReasonIndex].detail}"
                </p>
              </div>
            )}
          </div>

          {/* Photo Frame (if photoUrl provided) */}
          {wish.photoUrl && (
            <div className="my-6 flex flex-col items-center">
              <div className="p-3 bg-white rounded-2xl shadow-md border border-stone-200 max-w-xs rotate-1 hover:rotate-0 transition-transform">
                <img
                  src={wish.photoUrl}
                  alt="Our Memory"
                  className="w-full h-52 object-cover rounded-xl"
                />
                <p className="text-center font-handwriting text-stone-800 font-bold text-xl mt-2">
                  Forever illuminated together ✨
                </p>
              </div>
            </div>
          )}

          {/* Signature */}
          <div className="text-right pt-4 border-t border-amber-900/15 mt-6">
            <p className="text-xs font-cinzel text-amber-900/80 tracking-widest uppercase">
              Yours always,
            </p>
            <p className="text-2xl sm:text-3xl font-handwriting text-amber-950 font-bold mt-1">
              {wish.from} ❤️
            </p>
          </div>

          {/* Bottom Interactive Toolbar */}
          <div className="mt-8 pt-5 border-t border-amber-900/15 flex flex-wrap items-center justify-between gap-3">
            <div className="flex items-center gap-2">
              {/* Phuljhadi / Sparkler Button */}
              <button
                onClick={onToggleSparkler}
                className={`flex items-center gap-1.5 px-3.5 py-2 rounded-full text-xs font-cinzel font-bold transition-all shadow-sm ${
                  sparklerActive
                    ? 'bg-amber-500 text-stone-950 shadow-[0_0_12px_#f59e0b]'
                    : 'bg-stone-900 text-amber-200 hover:bg-stone-800'
                }`}
                title="Move your finger/mouse to burn a sparkler!"
              >
                <Wand2 className="w-3.5 h-3.5" />
                <span>{sparklerActive ? 'Sparkler Burning ✨' : 'Light Phuljhadi 🎆'}</span>
              </button>

              {/* Heart Fireworks Launch Button */}
              <button
                onClick={onTriggerFirework}
                className="flex items-center gap-1.5 px-3.5 py-2 rounded-full text-xs font-cinzel font-bold bg-amber-100 hover:bg-amber-200 text-amber-950 border border-amber-400/50 transition-colors shadow-sm"
              >
                <Sparkles className="w-3.5 h-3.5 text-amber-700" />
                <span>Burst Heart Rocket 🚀</span>
              </button>
            </div>

            {/* Customizer / Share link */}
            <button
              onClick={onOpenCustomizer}
              className="flex items-center gap-1.5 px-4 py-2 rounded-full text-xs font-cinzel font-bold bg-gradient-to-r from-amber-600 to-orange-600 text-white hover:brightness-110 shadow-md transition-all ml-auto"
            >
              <Edit3 className="w-3.5 h-3.5" />
              <span>Personalize & Share Link</span>
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

