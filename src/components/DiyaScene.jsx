import React, { useState, useEffect } from 'react';
import { Sparkles } from 'lucide-react';
import { sound } from '../audio/soundEngine';

export default function DiyaScene({ isLit, onIgnite, step }) {
  const [isPressing, setIsPressing] = useState(false);
  const [sparkles, setSparkles] = useState([]);
  const [shockwave, setShockwave] = useState(false);

  // Micro sparks rising from the lit flame
  useEffect(() => {
    if (!isLit) return;
    const interval = setInterval(() => {
      setSparkles((prev) => [
        ...prev.slice(-10),
        {
          id: Math.random(),
          x: (Math.random() - 0.5) * 24,
          y: -Math.random() * 38 - 18,
          scale: Math.random() * 0.7 + 0.3,
          alpha: Math.random() * 0.7 + 0.3
        }
      ]);
    }, 220);
    return () => clearInterval(interval);
  }, [isLit]);

  const handleTouch = () => {
    if (!isLit) {
      setShockwave(true);
      setTimeout(() => setShockwave(false), 1400);
      sound.playFlameIgnite();
      onIgnite();
    }
  };

  return (
    <div className="relative flex flex-col items-center justify-center select-none py-6">
      {/* 1. Golden Radial Floor Lighting (Polished Dark Marble Ground) */}
      <div
        className={`absolute -bottom-10 w-96 h-40 rounded-full pointer-events-none transition-all duration-1000 ${
          isLit
            ? 'opacity-90 scale-110 bg-[radial-gradient(ellipse_at_center,_rgba(255,160,20,0.6)_0%,_rgba(245,100,0,0.3)_45%,_transparent_75%)]'
            : 'opacity-15 scale-75 bg-[radial-gradient(ellipse_at_center,_rgba(255,200,100,0.25)_0%,_transparent_65%)]'
        }`}
      />

      {/* 2. Ignition Golden Shockwave Ripple */}
      {shockwave && (
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-32 h-32 rounded-full border-2 border-amber-300 animate-ripple pointer-events-none z-0" />
      )}

      {/* 3. Scattered Festive Marigold & Rose Flower Petals Around Base */}
      <div className="absolute -bottom-4 inset-x-0 h-16 pointer-events-none z-10 flex items-center justify-center gap-14">
        {[
          { x: -75, y: 12, rot: 25, color: '#f59e0b', size: 14 },
          { x: -50, y: 22, rot: -40, color: '#ef4444', size: 12 },
          { x: -28, y: 16, rot: 15, color: '#fbbf24', size: 10 },
          { x: 32, y: 18, rot: -20, color: '#f59e0b', size: 13 },
          { x: 55, y: 24, rot: 55, color: '#ef4444', size: 11 },
          { x: 78, y: 14, rot: -35, color: '#fbbf24', size: 12 }
        ].map((petal, i) => (
          <div
            key={i}
            className="absolute rounded-full shadow-sm"
            style={{
              transform: `translate(${petal.x}px, ${petal.y}px) rotate(${petal.rot}deg)`,
              width: `${petal.size}px`,
              height: `${petal.size * 0.65}px`,
              backgroundColor: petal.color,
              opacity: isLit ? 0.9 : 0.4,
              transition: 'opacity 1s ease'
            }}
          />
        ))}
      </div>

      {/* 4. Main Diya & Flame Structure */}
      <div
        onClick={handleTouch}
        onMouseDown={() => setIsPressing(true)}
        onMouseUp={() => setIsPressing(false)}
        onTouchStart={() => setIsPressing(true)}
        onTouchEnd={() => {
          setIsPressing(false);
          handleTouch();
        }}
        className={`relative z-20 cursor-pointer transition-transform duration-300 ${
          isPressing ? 'scale-95' : 'hover:scale-105'
        }`}
      >
        {/* Flame Container */}
        <div className="relative w-36 h-40 flex items-end justify-center">
          {/* Flame (When Lit) */}
          {isLit ? (
            <div className="relative flex flex-col items-center justify-end -mb-4">
              {/* Outer Golden Aura */}
              <div className="absolute -top-20 w-44 h-56 rounded-full bg-amber-500/25 blur-3xl animate-aura-breath pointer-events-none" />

              {/* Secondary Warm Core Glow */}
              <div className="absolute -top-12 w-28 h-36 rounded-full bg-orange-500/40 blur-xl pointer-events-none" />

              {/* Dancing Micro Sparks */}
              {sparkles.map((sp) => (
                <div
                  key={sp.id}
                  className="absolute w-1.5 h-1.5 rounded-full bg-amber-100 pointer-events-none"
                  style={{
                    transform: `translate(${sp.x}px, ${sp.y}px) scale(${sp.scale})`,
                    boxShadow: '0 0 8px #ffb703',
                    animation: 'gentleFloat 1.2s forwards ease-out',
                    opacity: sp.alpha
                  }}
                />
              ))}

              {/* Natural Fluid Flame SVG */}
              <div className="relative animate-flame-dance z-20">
                <svg
                  width="60"
                  height="92"
                  viewBox="0 0 60 92"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                  className="gold-glow drop-shadow-[0_0_16px_rgba(255,165,0,0.95)]"
                >
                  <defs>
                    <linearGradient id="flameGradOuter" x1="30" y1="0" x2="30" y2="92" gradientUnits="userSpaceOnUse">
                      <stop offset="0%" stopColor="#fffdf0" />
                      <stop offset="20%" stopColor="#fde047" />
                      <stop offset="50%" stopColor="#f59e0b" />
                      <stop offset="80%" stopColor="#ea580c" />
                      <stop offset="100%" stopColor="#991b1b" />
                    </linearGradient>

                    <linearGradient id="flameGradInner" x1="30" y1="20" x2="30" y2="90" gradientUnits="userSpaceOnUse">
                      <stop offset="0%" stopColor="#ffffff" />
                      <stop offset="45%" stopColor="#fef08a" />
                      <stop offset="85%" stopColor="#f97316" />
                      <stop offset="100%" stopColor="#38bdf8" />
                    </linearGradient>

                    <radialGradient id="combustionBase" cx="30" cy="84" r="14" gradientUnits="userSpaceOnUse">
                      <stop offset="0%" stopColor="#38bdf8" stopOpacity="0.95" />
                      <stop offset="60%" stopColor="#0284c7" stopOpacity="0.5" />
                      <stop offset="100%" stopColor="#0369a1" stopOpacity="0" />
                    </radialGradient>
                  </defs>

                  {/* Outer Teardrop Flame */}
                  <path
                    d="M30 0C30 0 11 28 11 60C11 76.5 19.5 90 30 90C40.5 90 49 76.5 49 60C49 28 30 0 30 0Z"
                    fill="url(#flameGradOuter)"
                  />

                  {/* Inner Golden-White Hot Flame */}
                  <path
                    d="M30 18C30 18 18 38 18 62C18 73.5 23.4 83 30 83C36.6 83 42 73.5 42 62C42 38 30 18 30 18Z"
                    fill="url(#flameGradInner)"
                    opacity="0.95"
                  />

                  {/* Bottom Cyan Combustion Hearth */}
                  <ellipse cx="30" cy="82" rx="12" ry="7" fill="url(#combustionBase)" />
                </svg>
              </div>
            </div>
          ) : (
            /* Unlit Wick with pulsing invitation halo */
            <div className="relative flex flex-col items-center justify-end -mb-1">
              <div className="relative">
                {/* Pulsing Guide Ring */}
                <div className="absolute -inset-5 rounded-full border border-amber-400/50 animate-pulse" />
                <div className="absolute -inset-9 rounded-full border border-amber-300/20 animate-ping opacity-35" />

                {/* Floating Gentle Spark Indicator */}
                <div className="absolute -top-12 left-1/2 -translate-x-1/2 flex items-center justify-center text-amber-300 animate-bounce">
                  <Sparkles className="w-6 h-6 filter drop-shadow-[0_0_10px_rgba(255,215,0,0.9)]" />
                </div>
              </div>

              {/* Cotton Wick (Unlit) */}
              <div className="w-1.5 h-6 bg-gradient-to-t from-stone-900 via-amber-950 to-stone-400 rounded-t-sm shadow-sm" />
            </div>
          )}
        </div>

        {/* Polished Brass & Clay Diya Vessel */}
        <div className="relative -mt-2.5">
          <svg
            width="180"
            height="80"
            viewBox="0 0 180 80"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            className="filter drop-shadow-[0_16px_22px_rgba(0,0,0,0.85)]"
          >
            <defs>
              <linearGradient id="brassGrad" x1="0" y1="0" x2="180" y2="80" gradientUnits="userSpaceOnUse">
                <stop offset="0%" stopColor="#b45309" />
                <stop offset="20%" stopColor="#f59e0b" />
                <stop offset="45%" stopColor="#fef08a" />
                <stop offset="70%" stopColor="#d97706" />
                <stop offset="100%" stopColor="#78350f" />
              </linearGradient>

              <linearGradient id="rimGrad" x1="0" y1="20" x2="180" y2="20" gradientUnits="userSpaceOnUse">
                <stop offset="0%" stopColor="#92400e" />
                <stop offset="25%" stopColor="#fde68a" />
                <stop offset="50%" stopColor="#fffbeb" />
                <stop offset="75%" stopColor="#f59e0b" />
                <stop offset="100%" stopColor="#78350f" />
              </linearGradient>

              <linearGradient id="oilPoolGrad" x1="30" y1="20" x2="150" y2="30" gradientUnits="userSpaceOnUse">
                <stop offset="0%" stopColor="#451a03" />
                <stop offset="50%" stopColor="#92400e" />
                <stop offset="100%" stopColor="#290e02" />
              </linearGradient>
            </defs>

            {/* Vessel Pedestal Base */}
            <path d="M62 68C62 68 72 78 90 78C108 78 118 68 118 68H62Z" fill="#451a03" />
            <ellipse cx="90" cy="76" rx="30" ry="4" fill="#1c0701" />

            {/* Main Curved Brass Body */}
            <path
              d="M10 26C10 56 44 74 90 74C136 74 170 56 170 26C154 30 122 34 90 34C58 34 26 30 10 26Z"
              fill="url(#brassGrad)"
            />

            {/* Top Rim */}
            <ellipse cx="90" cy="26" rx="76" ry="14" fill="url(#rimGrad)" />

            {/* Inner Sacred Ghee / Oil Pool */}
            <ellipse cx="90" cy="27" rx="66" ry="10" fill="url(#oilPoolGrad)" />

            {/* Royal Filigree Carvings */}
            <path
              d="M34 43C46 51 62 56 90 56C118 56 134 51 146 43"
              stroke="#fef08a"
              strokeWidth="1.8"
              strokeDasharray="4 3"
              opacity="0.85"
            />
            <circle cx="90" cy="58" r="2.8" fill="#fef08a" />
            <circle cx="68" cy="53" r="2.2" fill="#fef08a" />
            <circle cx="112" cy="53" r="2.2" fill="#fef08a" />
            <circle cx="48" cy="47" r="1.8" fill="#fef08a" />
            <circle cx="132" cy="47" r="1.8" fill="#fef08a" />
          </svg>
        </div>
      </div>

      {/* Step Callout */}
      {!isLit && (
        <div className="mt-7 flex flex-col items-center text-center animate-fade-in pointer-events-none">
          <p className="text-amber-200 text-sm sm:text-base font-cinzel tracking-wider uppercase font-bold flex items-center gap-1.5">
            <Sparkles className="w-4 h-4 text-amber-400" />
            <span>Tap to light the Diya for you</span>
            <Sparkles className="w-4 h-4 text-amber-400" />
          </p>
          <span className="text-xs text-amber-300/60 font-sans mt-0.5">
            (Best experienced with sound on 🔔)
          </span>
        </div>
      )}
    </div>
  );
}
