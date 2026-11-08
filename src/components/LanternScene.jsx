import React, { useState } from 'react';
import { Send, Sparkles } from 'lucide-react';
import { sound } from '../audio/soundEngine';

export default function LanternScene({ onRelease, isReleased, lanternWish = '' }) {
  const [ascending, setAscending] = useState(false);
  const customWish = lanternWish || "To a lifetime of laughter, holding hands, and celebrating every Diwali together ✨";

  const handleRelease = () => {
    if (ascending || isReleased) return;
    setAscending(true);
    sound.playLanternAscent();
    setTimeout(() => {
      onRelease?.();
    }, 2800);
  };

  return (
    <div className="relative flex flex-col items-center justify-center select-none z-30 max-w-full px-4 py-2">
      {/* Background lanterns rising peacefully */}
      {isReleased && (
        <div className="fixed inset-0 pointer-events-none overflow-hidden z-10">
          {[...Array(16)].map((_, i) => (
            <div
              key={i}
              className="absolute w-3.5 h-5 rounded-t-full bg-gradient-to-t from-orange-500 via-amber-300 to-yellow-100 shadow-[0_0_15px_#f59e0b]"
              style={{
                left: `${(i * 6.5 + 4) % 94}%`,
                bottom: '-30px',
                opacity: 0.35 + (i % 5) * 0.12,
                transform: `scale(${0.35 + (i % 4) * 0.16})`,
                animation: `gentleFloat ${5 + (i % 4)}s ease-in-out infinite, riseUpSky ${14 + (i % 6) * 3}s linear infinite`,
                animationDelay: `${i * 1.1}s`
              }}
            />
          ))}
        </div>
      )}

      {/* Main Sky Lantern */}
      <div
        onClick={handleRelease}
        className={`relative flex flex-col items-center cursor-pointer transition-all duration-[3000ms] cubic-bezier(0.25, 1, 0.5, 1) ${
          ascending
            ? '-translate-y-[120vh] scale-50 opacity-0'
            : isReleased
            ? 'hidden'
            : 'translate-y-0 scale-100 hover:scale-[1.03] active:scale-95'
        }`}
      >
        {/* Sky Lantern Container with Curved Authentic Silhouette */}
        <div className="relative w-[280px] h-[360px] sm:w-[320px] sm:h-[410px] flex items-center justify-center filter drop-shadow-[0_0_40px_rgba(245,158,11,0.7)]">
          {/* Ambient Warm Golden Halo */}
          <div className="absolute inset-0 bg-gradient-to-t from-orange-500/35 via-amber-400/25 to-yellow-200/10 rounded-full blur-3xl -z-10 animate-aura-breath" />

          {/* Authentic Curved Sky Lantern SVG Frame */}
          <svg
            viewBox="0 0 320 410"
            className="w-full h-full absolute inset-0 pointer-events-none"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <defs>
              {/* Outer paper warm gradient */}
              <radialGradient id="lanternGlow" cx="160" cy="270" r="190" gradientUnits="userSpaceOnUse">
                <stop offset="0%" stopColor="#ffffff" stopOpacity="0.95" />
                <stop offset="25%" stopColor="#fef08a" stopOpacity="0.9" />
                <stop offset="55%" stopColor="#f59e0b" stopOpacity="0.88" />
                <stop offset="80%" stopColor="#ea580c" stopOpacity="0.9" />
                <stop offset="100%" stopColor="#991b1b" stopOpacity="0.95" />
              </radialGradient>

              {/* Top rim bamboo gradient */}
              <linearGradient id="bambooGrad" x1="0" y1="0" x2="320" y2="0" gradientUnits="userSpaceOnUse">
                <stop offset="0%" stopColor="#451a03" />
                <stop offset="30%" stopColor="#b45309" />
                <stop offset="50%" stopColor="#fde68a" />
                <stop offset="70%" stopColor="#b45309" />
                <stop offset="100%" stopColor="#451a03" />
              </linearGradient>

              {/* Translucent rice paper texture pattern */}
              <pattern id="paperTexture" width="20" height="20" patternUnits="userSpaceOnUse">
                <path d="M 0 10 L 20 10 M 10 0 L 10 20" stroke="rgba(255,255,255,0.03)" strokeWidth="0.5" />
              </pattern>
            </defs>

            {/* 1. Main Curved Lantern Body Shape */}
            <path
              d="M 70 330 C 40 260 25 150 65 60 C 95 15 225 15 255 60 C 295 150 280 260 250 330 Z"
              fill="url(#lanternGlow)"
              stroke="#f59e0b"
              strokeWidth="1.5"
              strokeOpacity="0.6"
            />
            <path
              d="M 70 330 C 40 260 25 150 65 60 C 95 15 225 15 255 60 C 295 150 280 260 250 330 Z"
              fill="url(#paperTexture)"
            />

            {/* 2. Delicate 3D Longitudinal Curved Bamboo Ribs */}
            {/* Center spine */}
            <path
              d="M 160 25 L 160 335"
              stroke="rgba(254, 240, 138, 0.45)"
              strokeWidth="1.2"
              strokeDasharray="4 2"
            />
            {/* Left curved rib */}
            <path
              d="M 160 25 C 105 110 95 240 115 332"
              stroke="rgba(254, 240, 138, 0.35)"
              strokeWidth="1.2"
              fill="none"
            />
            {/* Right curved rib */}
            <path
              d="M 160 25 C 215 110 225 240 205 332"
              stroke="rgba(254, 240, 138, 0.35)"
              strokeWidth="1.2"
              fill="none"
            />

            {/* 3. Subtle Horizontal Rice-Paper Ring Hoops */}
            <path
              d="M 52 140 C 95 158 225 158 268 140"
              stroke="rgba(255, 237, 213, 0.25)"
              strokeWidth="1"
              fill="none"
            />
            <path
              d="M 46 220 C 95 240 225 240 274 220"
              stroke="rgba(255, 237, 213, 0.22)"
              strokeWidth="1"
              fill="none"
            />

            {/* 4. Top Crown Dome Finial */}
            <ellipse cx="160" cy="27" rx="35" ry="7" fill="url(#bambooGrad)" stroke="#78350f" strokeWidth="1" />
            <circle cx="160" cy="20" r="4.5" fill="#fde68a" stroke="#b45309" strokeWidth="1" />

            {/* 5. Bottom Circular Bamboo Opening Rim */}
            <ellipse cx="160" cy="330" rx="90" ry="14" fill="none" stroke="url(#bambooGrad)" strokeWidth="3" />
            <ellipse cx="160" cy="330" rx="87" ry="11" fill="rgba(26, 8, 3, 0.6)" stroke="#78350f" strokeWidth="1" />

            {/* Cross-brace wires supporting fuel pad */}
            <line x1="85" y1="330" x2="235" y2="330" stroke="#ffd700" strokeWidth="1" opacity="0.7" />
            <line x1="160" y1="320" x2="160" y2="340" stroke="#ffd700" strokeWidth="1" opacity="0.7" />

            {/* Square Wax Fuel Pad */}
            <rect x="152" y="325" width="16" height="6" rx="1.5" fill="#fef3c7" stroke="#b45309" strokeWidth="1" />

            {/* 6. Realistic Flickering Candle Flame at Base */}
            <g className="animate-flame-dance origin-bottom" style={{ transformOrigin: '160px 325px' }}>
              {/* Outer flame */}
              <path
                d="M 160 285 C 160 285 151 305 151 318 C 151 325 155 328 160 328 C 165 328 169 325 169 318 C 169 305 160 285 160 285 Z"
                fill="#fb923c"
                filter="drop-shadow(0 0 8px #f59e0b)"
              />
              {/* Inner white flame */}
              <path
                d="M 160 295 C 160 295 155 310 155 320 C 155 324 157 326 160 326 C 163 326 165 324 165 320 C 165 310 160 295 160 295 Z"
                fill="#ffffff"
              />
            </g>

            {/* 7. Hanging Silk Tassels & Streamers Swaying Gently */}
            <g className="animate-gentle-float">
              {/* Center tassel */}
              <line x1="160" y1="344" x2="160" y2="378" stroke="#fbbf24" strokeWidth="2" strokeLinecap="round" />
              <circle cx="160" cy="348" r="3" fill="#dc2626" />
              <polygon points="157,378 163,378 160,392" fill="#f59e0b" />

              {/* Left streamer */}
              <line x1="110" y1="338" x2="105" y2="368" stroke="#f59e0b" strokeWidth="1.5" strokeLinecap="round" />
              <circle cx="110" cy="342" r="2.5" fill="#dc2626" />

              {/* Right streamer */}
              <line x1="210" y1="338" x2="215" y2="368" stroke="#f59e0b" strokeWidth="1.5" strokeLinecap="round" />
              <circle cx="210" cy="342" r="2.5" fill="#dc2626" />
            </g>
          </svg>

          {/* Inscribed Personal Wish Content (Layered inside the illuminated chamber) */}
          <div className="relative z-10 w-[78%] h-[68%] -mt-6 flex flex-col items-center justify-center text-center px-3 pointer-events-none">
            {/* Elegant Header */}
            <div className="flex items-center gap-1.5 text-amber-950 text-[10px] sm:text-[11px] font-cinzel font-bold tracking-widest uppercase mb-2">
              <Sparkles className="w-3 h-3 text-amber-900" />
              <span>A Wish To The Stars</span>
              <Sparkles className="w-3 h-3 text-amber-900" />
            </div>

            {/* Hand-inscribed Wish in Calligraphy */}
            <div className="my-auto">
              <p className="text-amber-950 font-serif-festive italic text-xs sm:text-sm md:text-base font-semibold leading-relaxed drop-shadow-sm line-clamp-5">
                "{customWish}"
              </p>
            </div>

            {/* Sacred Lotus / Diya glyph watermark */}
            <div className="text-amber-900/60 text-xs font-cinzel tracking-widest mt-1">
              — ✨ 🪔 ✨ —
            </div>
          </div>
        </div>

        {/* Release Button & Interactive Cue */}
        {!ascending && !isReleased && (
          <div className="mt-5 sm:mt-7 flex flex-col items-center gap-2">
            <button
              onClick={(e) => {
                e.stopPropagation();
                handleRelease();
              }}
              className="group flex items-center gap-2 px-6 py-2.5 sm:px-7 sm:py-3 rounded-full bg-gradient-to-r from-amber-500 via-orange-500 to-amber-600 text-stone-950 font-cinzel font-bold text-xs sm:text-sm tracking-wider shadow-[0_0_25px_rgba(245,158,11,0.7)] hover:shadow-[0_0_35px_rgba(245,158,11,0.95)] active:scale-95 transition-all duration-300"
            >
              <span>Release Our Wish</span>
              <Send className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-stone-950 transition-transform group-hover:translate-x-1 group-hover:-translate-y-0.5" />
            </button>

            <span className="text-[10px] sm:text-xs text-amber-200/75 font-sans tracking-wide">
              (Touch the lantern to let our prayer float to the stars 🌟)
            </span>
          </div>
        )}
      </div>

      <style>{`
        @keyframes riseUpSky {
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
