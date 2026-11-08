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
  Heart
} from 'lucide-react';
import { sound } from '../audio/soundEngine';

export default function EnvelopeLetter({
  wish,
  onOpenCustomizer,
  onToggleSparkler,
  sparklerActive,
  onTriggerFirework
}) {
  const [envelopeState, setEnvelopeState] = useState('sealed');
  const [activeReasonIndex, setActiveReasonIndex] = useState(null);
  const [litReasons, setLitReasons] = useState([0]); // first one lit
  const [isLetterExpanded, setIsLetterExpanded] = useState(false);

  const handleOpenEnvelope = () => {
    if (envelopeState !== 'sealed') return;

    sound.playFlameIgnite();
    sound.playFireworkBurst('peony');

    // Golden & rose confetti
    confetti({
      particleCount: 85,
      spread: 70,
      origin: { y: 0.6 },
      colors: ['#ffd700', '#f59e0b', '#fb7185', '#ef4444', '#ffffff'],
      disableForReducedMotion: true
    });

    setEnvelopeState('unsealing');

    setTimeout(() => {
      setEnvelopeState('opened');
      setIsLetterExpanded(true);
    }, 850);
  };

  const handleFoldBack = () => {
    setIsLetterExpanded(false);
    setTimeout(() => {
      setEnvelopeState('sealed');
      setActiveReasonIndex(null);
    }, 350);
  };

  const handleLightReason = (index) => {
    sound.playChime(520 + index * 55, 1.6);
    if (!litReasons.includes(index)) {
      setLitReasons([...litReasons, index]);
    }
    setActiveReasonIndex(activeReasonIndex === index ? null : index);
  };

  return (
    <div className="relative z-40 w-full max-w-xl px-2 sm:px-4 mx-auto my-auto select-none flex flex-col items-center justify-center">
      {/* 3D Envelope View */}
      {!isLetterExpanded ? (
        <div className="relative perspective-1000 flex flex-col items-center w-full max-w-sm sm:max-w-md">
          {/* Main 3D Envelope Container */}
          <div
            onClick={handleOpenEnvelope}
            className={`relative w-full max-w-[340px] sm:max-w-[390px] aspect-[1.5/1] cursor-pointer transition-all duration-700 transform-style-3d ${envelopeState === 'sealed'
                ? 'hover:scale-[1.02] active:scale-95'
                : ''
              }`}
          >
            {/* Ambient Envelope Glow */}
            <div className="absolute -inset-3 bg-gradient-to-r from-amber-600/20 via-rose-600/25 to-amber-600/20 rounded-3xl blur-xl -z-10 animate-aura-breath" />

            {/* Back panel of envelope */}
            <div className="absolute inset-0 rounded-2xl bg-gradient-to-b from-[#220a0d] to-[#130406] border border-amber-500/40 shadow-2xl overflow-hidden">
              <div className="absolute inset-0 opacity-15 bg-[radial-gradient(circle_at_50%_50%,_#f59e0b_10%,_transparent_60%)]" />
            </div>

            {/* Letter peek sliding out */}
            <div
              className={`absolute inset-x-3 sm:inset-x-5 top-2 h-36 sm:h-44 rounded-xl parchment-paper p-3 sm:p-4 text-stone-900 transition-all duration-700 ease-out shadow-md z-10 ${envelopeState === 'opened'
                  ? '-translate-y-24 sm:-translate-y-28 opacity-100 scale-105'
                  : envelopeState === 'unsealing'
                    ? '-translate-y-16 opacity-90'
                    : 'translate-y-1 opacity-0'
                }`}
            >
              <div className="text-center border-b border-amber-900/20 pb-1">
                <span className="text-[9px] sm:text-[10px] font-cinzel tracking-widest text-amber-800 uppercase font-bold">
                  Shubh Deepavali ✨
                </span>
                <p className="text-xs sm:text-sm font-handwriting text-rose-900 font-bold truncate">
                  For {wish.to}
                </p>
              </div>
              <p className="text-[10px] sm:text-[11px] font-serif-festive text-stone-700 italic mt-1.5 line-clamp-3 leading-relaxed">
                "{wish.letter.slice(0, 100)}..."
              </p>
            </div>

            {/* Front Pocket Shape */}
            <div className="absolute inset-0 rounded-2xl z-20 pointer-events-none overflow-hidden">
              {/* Bottom pocket */}
              <div
                className="absolute inset-x-0 bottom-0 h-3/5 bg-gradient-to-t from-[#1d0709] via-[#280b0f] to-[#310f13] border-t border-amber-500/30"
                style={{
                  clipPath: 'polygon(0% 100%, 100% 100%, 100% 15%, 50% 85%, 0% 15%)'
                }}
              />
              {/* Left triangle */}
              <div
                className="absolute inset-y-0 left-0 w-1/2 bg-gradient-to-r from-[#170507] to-[#24090c] opacity-90"
                style={{
                  clipPath: 'polygon(0% 0%, 100% 50%, 0% 100%)'
                }}
              />
              {/* Right triangle */}
              <div
                className="absolute inset-y-0 right-0 w-1/2 bg-gradient-to-l from-[#170507] to-[#24090c] opacity-90"
                style={{
                  clipPath: 'polygon(100% 0%, 0% 50%, 100% 100%)'
                }}
              />

              {/* Scalable Gold Diagonal Seam Lines */}
              <svg
                viewBox="0 0 100 100"
                preserveAspectRatio="none"
                className="absolute inset-0 w-full h-full"
                fill="none"
              >
                <path
                  d="M0,0 L50,50 L100,0"
                  stroke="rgba(245, 158, 11, 0.4)"
                  strokeWidth="0.8"
                  vectorEffect="non-scaling-stroke"
                />
                <path
                  d="M0,100 L50,50 L100,100"
                  stroke="rgba(245, 158, 11, 0.3)"
                  strokeWidth="0.8"
                  vectorEffect="non-scaling-stroke"
                />
              </svg>

              {/* Recipient & Sender on front of envelope */}
              <div className="absolute bottom-2 sm:bottom-3 inset-x-0 text-center px-2">
                <span className="text-[9px] sm:text-[10px] font-cinzel text-amber-300/80 tracking-widest uppercase block">
                  A Gift For
                </span>
                <span className="text-lg sm:text-2xl font-decorative text-gold-gradient font-bold drop-shadow truncate block">
                  {wish.to}
                </span>
                <span className="text-[9px] sm:text-[10px] font-sans text-amber-200/60 block truncate">
                  With love from {wish.from}
                </span>
              </div>
            </div>

            {/* Top Triangular Flap */}
            <div
              className={`absolute top-0 inset-x-0 h-1/2 origin-top transition-transform duration-700 ease-in-out z-30 transform-style-3d ${envelopeState !== 'sealed'
                  ? '-rotate-x-180 pointer-events-none'
                  : 'rotate-x-0'
                }`}
              style={{
                clipPath: 'polygon(0% 0%, 100% 0%, 50% 100%)'
              }}
            >
              <div className="w-full h-full bg-gradient-to-b from-[#341014] via-[#26090d] to-[#1a0608] border-b border-amber-500/50 shadow-md flex items-center justify-center">
                <div className="absolute inset-0 border-t border-amber-400/40" />
              </div>
            </div>

            {/* Realistic 3D Wax Seal */}
            <div
              className={`absolute top-[42%] left-1/2 -translate-x-1/2 -translate-y-1/2 z-40 transition-all duration-500 ${envelopeState !== 'sealed'
                  ? 'opacity-0 scale-125 pointer-events-none'
                  : 'opacity-100 scale-100 hover:scale-110 active:scale-95'
                }`}
            >
              <div className="relative w-12 h-12 sm:w-14 sm:h-14 rounded-full bg-gradient-to-tr from-red-950 via-red-600 to-amber-600 border-2 border-amber-300/90 shadow-[0_4px_16px_rgba(0,0,0,0.8),_inset_0_2px_4px_rgba(255,255,255,0.4)] flex flex-col items-center justify-center">
                <div className="absolute -inset-1 rounded-full border border-red-700/50 -z-10 animate-pulse" />
                <Flame className="w-5 h-5 sm:w-6 sm:h-6 text-amber-100 fill-amber-300 drop-shadow-[0_0_6px_rgba(255,255,255,0.8)]" />
                <span className="text-[7.5px] sm:text-[8.5px] font-cinzel font-black text-amber-100 uppercase tracking-tighter -mt-0.5">
                  UNSEAL
                </span>
              </div>
            </div>
          </div>

          {/* Interactive Hint */}
          <div className="mt-5 flex flex-col items-center text-center px-2">
            <span className="text-xs sm:text-sm text-amber-300 font-cinzel tracking-wider uppercase flex items-center gap-1.5 animate-pulse">
              <Sparkles className="w-3.5 h-3.5 text-amber-400" />
              <span>Tap wax seal to open your letter</span>
              <Sparkles className="w-3.5 h-3.5 text-amber-400" />
            </span>
            <span className="text-[10px] sm:text-[11px] text-amber-100/50 font-sans mt-0.5">
              (A personal handwritten festival card inside)
            </span>
          </div>
        </div>
      ) : (
        /* Unfolded Luxury Stationery Letter (Expanded Responsive View) */
        <div className="relative w-full max-h-[78dvh] sm:max-h-[82dvh] overflow-y-auto parchment-paper rounded-2xl sm:rounded-3xl p-4 sm:p-8 text-stone-900 border border-amber-500/50 shadow-2xl animate-fade-in">
          {/* Top Controls: Fold Back & Close */}
          <div className="flex items-center justify-between pb-3 border-b border-amber-900/15 mb-4 sm:mb-6">
            <button
              onClick={handleFoldBack}
              className="flex items-center gap-1 px-2.5 py-1 sm:px-3 sm:py-1.5 rounded-full text-[10px] sm:text-xs font-cinzel font-semibold text-amber-900 bg-amber-200/50 hover:bg-amber-200/80 transition-colors"
            >
              <RotateCcw className="w-3 h-3" />
              <span>Fold Back</span>
            </button>

            <span className="text-[10px] sm:text-xs font-cinzel tracking-widest text-amber-900/70 uppercase font-bold">
              Diwali Epistle ✨
            </span>

            <button
              onClick={handleFoldBack}
              className="p-1 sm:p-1.5 rounded-full text-stone-500 hover:text-stone-900 hover:bg-amber-100 transition-colors"
              title="Close"
            >
              <X className="w-4 h-4" />
            </button>
          </div>

          {/* Letterhead */}
          <div className="text-center mb-4 sm:mb-6">
            <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-amber-100/80 border border-amber-400/40 text-amber-900 text-[10px] sm:text-[11px] font-cinzel font-bold tracking-widest uppercase mb-1.5">
              <Sparkles className="w-3 h-3 text-amber-600" />
              <span>Shubh Deepavali</span>
              <Sparkles className="w-3 h-3 text-amber-600" />
            </div>

            <h1 className="text-2xl sm:text-3xl md:text-4xl font-decorative text-amber-950 font-bold tracking-tight">
              Happy Diwali, {wish.to}!
            </h1>

            <p className="text-lg sm:text-2xl font-handwriting text-rose-800 font-semibold mt-0.5">
              "The sweetest light in my world is you"
            </p>
          </div>

          {/* Letter Body */}
          <div className="my-4 sm:my-6 p-4 sm:p-6 rounded-xl sm:rounded-2xl bg-[#fffefc]/80 border border-amber-900/10 shadow-inner">
            <p className="text-stone-800 font-serif-festive text-sm sm:text-base md:text-lg leading-relaxed whitespace-pre-line text-left">
              {wish.letter}
            </p>
          </div>

          {/* Interactive "5 Diyas of Light" */}
          <div className="my-6 pt-4 border-t border-amber-900/15">
            <div className="text-center mb-3">
              <h3 className="text-base sm:text-lg font-cinzel font-bold text-amber-950 flex items-center justify-center gap-1.5">
                <span>🪔</span>
                <span>5 Diyas I Light For You</span>
                <span>🪔</span>
              </h3>
              <p className="text-[10px] sm:text-xs text-stone-600 font-sans mt-0.5">
                (Tap each Diya to unlock a secret reason you mean everything to me)
              </p>
            </div>

            {/* Responsive 5 Diya Buttons Grid */}
            <div className="grid grid-cols-5 gap-1 sm:gap-2.5 my-3">
              {wish.reasons.map((reason, idx) => {
                const isLit = litReasons.includes(idx);
                const isSelected = activeReasonIndex === idx;

                return (
                  <button
                    key={idx}
                    onClick={() => handleLightReason(idx)}
                    className={`flex flex-col items-center justify-between p-1.5 sm:p-2.5 rounded-xl border transition-all duration-300 ${isSelected
                        ? 'bg-amber-100 border-amber-600 shadow-[0_0_12px_rgba(245,158,11,0.5)] scale-105'
                        : isLit
                          ? 'bg-amber-50/80 border-amber-400/50 hover:bg-amber-100/60'
                          : 'bg-stone-100/60 border-stone-300 opacity-60 hover:opacity-100'
                      }`}
                  >
                    {/* Flame */}
                    <div className="h-4 sm:h-5 flex items-end justify-center mb-0.5">
                      {isLit ? (
                        <div className="w-2.5 sm:w-3.5 h-3.5 sm:h-5 rounded-full bg-gradient-to-t from-orange-600 via-amber-400 to-yellow-100 animate-flame-dance shadow-[0_0_8px_#f59e0b]" />
                      ) : (
                        <div className="w-1 h-2.5 bg-stone-400 rounded-t-sm" />
                      )}
                    </div>

                    <span className="text-base sm:text-xl my-0.5">{reason.icon || '🪔'}</span>
                    <span className="text-[8px] sm:text-[10px] font-cinzel font-bold text-stone-800 line-clamp-1 mt-0.5 text-center leading-tight">
                      {reason.title}
                    </span>
                  </button>
                );
              })}
            </div>

            {/* Revealed Reason */}
            {activeReasonIndex !== null && (
              <div className="p-3 sm:p-4 rounded-xl bg-gradient-to-br from-amber-100 via-rose-50 to-amber-100 border border-amber-400/50 shadow-sm text-center animate-fade-in mt-2.5">
                <span className="text-[10px] sm:text-xs uppercase tracking-widest font-cinzel text-amber-900 font-bold block mb-1">
                  ✨ {wish.reasons[activeReasonIndex].title} ✨
                </span>
                <p className="text-xs sm:text-sm md:text-base font-serif-festive italic text-stone-800 leading-relaxed">
                  "{wish.reasons[activeReasonIndex].detail}"
                </p>
              </div>
            )}
          </div>

          {/* Photo Frame if provided */}
          {wish.photoUrl && (
            <div className="my-5 flex flex-col items-center">
              <div className="p-2 sm:p-3 bg-white rounded-xl shadow-md border border-stone-200 max-w-xs rotate-1">
                <img
                  src={wish.photoUrl}
                  alt="Our Memory"
                  className="w-full h-44 sm:h-52 object-cover rounded-lg"
                />
                <p className="text-center font-handwriting text-stone-800 font-bold text-lg sm:text-xl mt-1.5">
                  Forever illuminated together ✨
                </p>
              </div>
            </div>
          )}

          {/* Signature */}
          <div className="text-right pt-3 sm:pt-4 border-t border-amber-900/15 mt-4 sm:mt-6">
            <p className="text-[10px] sm:text-xs font-cinzel text-amber-900/80 tracking-widest uppercase">
              Yours always,
            </p>
            <p className="text-xl sm:text-2xl font-handwriting text-amber-950 font-bold mt-0.5">
              {wish.from} ❤️
            </p>
          </div>

          {/* Responsive Action Toolbar */}
          <div className="mt-6 pt-4 border-t border-amber-900/15 flex flex-wrap items-center justify-center sm:justify-between gap-2">
            <div className="flex items-center gap-1.5 sm:gap-2">
              <button
                onClick={onToggleSparkler}
                className={`flex items-center gap-1 px-3 py-1.5 sm:px-3.5 sm:py-2 rounded-full text-[10px] sm:text-xs font-cinzel font-bold transition-all shadow-sm ${sparklerActive
                    ? 'bg-amber-500 text-stone-950 shadow-[0_0_12px_#f59e0b]'
                    : 'bg-stone-900 text-amber-200 hover:bg-stone-800'
                  }`}
                title="Hold and move your finger to burn a sparkler!"
              >
                <Wand2 className="w-3 h-3" />
                <span>{sparklerActive ? 'Sparkler ON ✨' : 'Light Phuljhadi 🎆'}</span>
              </button>

              <button
                onClick={onTriggerFirework}
                className="flex items-center gap-1 px-3 py-1.5 sm:px-3.5 sm:py-2 rounded-full text-[10px] sm:text-xs font-cinzel font-bold bg-amber-100 hover:bg-amber-200 text-amber-950 border border-amber-400/50 transition-colors shadow-sm"
              >
                <Sparkles className="w-3 h-3 text-amber-700" />
                <span>Burst Rocket 🚀</span>
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
