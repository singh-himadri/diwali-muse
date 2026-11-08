import React, { useState } from 'react';
import { Send, Sparkles, Heart } from 'lucide-react';
import { sound } from '../audio/soundEngine';

export default function LanternScene({ onRelease, isReleased, lanternWish = '' }) {
  const [ascending, setAscending] = useState(false);
  const customWish = lanternWish || "To endless laughter, holding hands, and a lifetime of Diwalis together ✨";

  const handleRelease = () => {
    if (ascending || isReleased) return;
    setAscending(true);
    sound.playLanternAscent();
    setTimeout(() => {
      onRelease?.();
    }, 2800);
  };

  return (
    <div className="relative flex flex-col items-center justify-center select-none z-30">
      {/* Background lanterns rising peacefully */}
      {isReleased && (
        <div className="fixed inset-0 pointer-events-none overflow-hidden z-10">
          {[...Array(16)].map((_, i) => (
            <div
              key={i}
              className="absolute w-3.5 h-4.5 rounded-t-sm bg-gradient-to-t from-orange-500 via-amber-300 to-yellow-100 shadow-[0_0_12px_#f59e0b]"
              style={{
                left: `${(i * 6.5 + 3) % 94}%`,
                bottom: '-25px',
                opacity: 0.35 + (i % 5) * 0.12,
                transform: `scale(${0.4 + (i % 4) * 0.18})`,
                animation: `gentleFloat ${5 + (i % 4)}s ease-in-out infinite, riseUpAnimation ${13 + (i % 6) * 3}s linear infinite`,
                animationDelay: `${i * 1.1}s`
              }}
            />
          ))}
        </div>
      )}

      {/* Main Lantern with 3D aesthetic */}
      <div
        onClick={handleRelease}
        className={`relative flex flex-col items-center cursor-pointer transition-all duration-[3000ms] cubic-bezier(0.25, 1, 0.5, 1) ${
          ascending
            ? '-translate-y-[120vh] scale-50 opacity-0'
            : isReleased
            ? 'hidden'
            : 'translate-y-0 scale-100 hover:scale-105'
        }`}
      >
        {/* Sky Lantern Body */}
        <div className="relative w-52 h-72 sm:w-60 sm:h-80 flex flex-col items-center justify-between filter drop-shadow-[0_0_45px_rgba(245,158,11,0.7)]">
          {/* Top Wooden Frame Ring */}
          <div className="w-24 h-2.5 bg-[#3d1808] rounded-full border border-amber-500/50 z-20 shadow-md" />

          {/* Luminous Rice Paper Lantern Body */}
          <div className="absolute inset-0 rounded-[32px_32px_20px_20px] bg-gradient-to-b from-amber-200/95 via-orange-400/90 to-red-600/90 border border-amber-300/70 shadow-[inset_0_0_35px_rgba(255,255,255,0.75),_0_0_50px_rgba(245,158,11,0.85)] overflow-hidden flex flex-col items-center justify-between p-5 text-center">
            {/* Candlelight Radial Gradient Core */}
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_75%,_rgba(255,255,230,0.95)_0%,_rgba(251,146,60,0.75)_50%,_rgba(220,38,38,0.55)_90%)] animate-aura-breath" />

            {/* Horizontal Paper Ribs (authenticity details) */}
            <div className="absolute inset-x-0 top-16 h-px bg-amber-900/20" />
            <div className="absolute inset-x-0 top-32 h-px bg-amber-900/20" />
            <div className="absolute inset-x-0 top-48 h-px bg-amber-900/20" />

            {/* Top Label */}
            <div className="relative z-10 flex items-center gap-1.5 text-amber-950 text-xs font-cinzel font-bold tracking-widest uppercase mt-1">
              <Sparkles className="w-3.5 h-3.5 text-amber-900" />
              <span>A WISH TO THE STARS</span>
              <Sparkles className="w-3.5 h-3.5 text-amber-900" />
            </div>

            {/* Inscribed Personal Wish */}
            <div className="relative z-10 my-auto px-2 max-w-[92%]">
              <p className="text-amber-950 font-serif-festive italic text-sm sm:text-base font-semibold leading-relaxed drop-shadow-sm">
                "{customWish}"
              </p>
            </div>

            {/* Bottom Candle Hearth & Flame */}
            <div className="relative z-10 flex flex-col items-center -mb-2">
              <div className="w-3.5 h-6 rounded-full bg-yellow-100 animate-flame-dance shadow-[0_0_15px_#ffffff]" />
              <div className="w-12 h-2 bg-stone-900 rounded-full mt-1 border border-amber-600/60" />
            </div>
          </div>

          {/* Bottom Bamboo Ring & Golden Tassel */}
          <div className="w-36 h-3 bg-[#3d1808] rounded-full border border-amber-500/60 z-20 shadow-md" />
          <div className="w-1 h-6 bg-amber-400/80 -mt-0.5 rounded-b-sm shadow-sm" />
        </div>

        {/* Release Button & Hint */}
        {!ascending && !isReleased && (
          <div className="mt-8 flex flex-col items-center gap-2.5">
            <button
              onClick={(e) => {
                e.stopPropagation();
                handleRelease();
              }}
              className="group flex items-center gap-2 px-7 py-3 rounded-full bg-gradient-to-r from-amber-500 via-orange-500 to-amber-600 text-stone-950 font-cinzel font-bold text-xs sm:text-sm tracking-wider shadow-[0_0_25px_rgba(245,158,11,0.7)] hover:shadow-[0_0_35px_rgba(245,158,11,0.95)] hover:scale-105 active:scale-95 transition-all duration-300"
            >
              <span>Release Our Wish</span>
              <Send className="w-4 h-4 text-stone-950 transition-transform group-hover:translate-x-1 group-hover:-translate-y-0.5" />
            </button>

            <span className="text-xs text-amber-200/70 font-sans tracking-wide">
              (Touch the lantern to release our prayer into the night sky 🌟)
            </span>
          </div>
        )}
      </div>

      <style>{`
        @keyframes riseUpAnimation {
          0% {
            transform: translateY(0) translateX(0) scale(0.5);
            opacity: 0;
          }
          10% {
            opacity: 0.85;
          }
          90% {
            opacity: 0.85;
          }
          100% {
            transform: translateY(-115vh) translateX(35px) scale(0.25);
            opacity: 0;
          }
        }
      `}</style>
    </div>
  );
}
