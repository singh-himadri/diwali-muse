import React, { useState, useEffect } from 'react';
import StarryCanvas from './components/StarryCanvas';
import DiyaScene from './components/DiyaScene';
import RangoliCanvas from './components/RangoliCanvas';
import LanternScene from './components/LanternScene';
import FireworksCanvas from './components/FireworksCanvas';
import EnvelopeLetter from './components/EnvelopeLetter';
import CustomizerModal from './components/CustomizerModal';
import MusicController from './components/MusicController';
import { parseWishFromUrl } from './data/defaultWish';
import { Sparkles, Heart, Wand2, RefreshCw, ChevronRight } from 'lucide-react';
import { sound } from './audio/soundEngine';

// Story Progression Phases
const PHASES = {
  UNLIT: 'unlit',         // 1. Unlit Diya in midnight darkness
  LIT: 'lit',             // 2. Diya ignited with warm glow
  RANGOLI: 'rangoli',     // 3. Blooming golden rangoli under Diya
  LANTERN: 'lantern',     // 4. Release Sky Lantern of wishes
  CELEBRATION: 'celebrate'// 5. Grand fireworks & 3D Royal Gift Envelope
};

export default function App() {
  const [phase, setPhase] = useState(PHASES.UNLIT);
  const [wish, setWish] = useState(parseWishFromUrl());
  const [showCustomizer, setShowCustomizer] = useState(false);
  const [sparklerActive, setSparklerActive] = useState(false);
  const [autoBarrage, setAutoBarrage] = useState(false);

  // Load URL parameters on mount
  useEffect(() => {
    const parsed = parseWishFromUrl();
    setWish(parsed);
    if (parsed.to) {
      document.title = `${parsed.from || 'Someone'} sent you a Diwali gift ✨`;
    }
  }, []);

  // When reaching celebration phase, automatically start ambient music & fireworks barrage
  useEffect(() => {
    if (phase === PHASES.CELEBRATION) {
      setAutoBarrage(true);
      sound.ensureContext();
      sound.startAmbientMusic();
    }
  }, [phase]);

  const handleIgnite = () => {
    setPhase(PHASES.LIT);
  };

  const handleDrawRangoli = () => {
    setPhase(PHASES.RANGOLI);
  };

  const handleGoToLantern = () => {
    setPhase(PHASES.LANTERN);
  };

  const handleReleaseLantern = () => {
    setPhase(PHASES.CELEBRATION);
  };

  const handleReset = () => {
    setPhase(PHASES.UNLIT);
    setSparklerActive(false);
    setAutoBarrage(false);
  };

  const triggerFirework = () => {
    const x = window.innerWidth * (0.2 + Math.random() * 0.6);
    const y = window.innerHeight * (0.15 + Math.random() * 0.3);
    sound.playFireworkBurst('peony');
  };

  return (
    <main className="relative w-full h-[100dvh] min-h-[100dvh] overflow-hidden bg-[#05060b] text-[#f7e7ce] flex flex-col justify-between font-sans select-none">
      {/* 1. Dynamic Celestial Background Canvas */}
      <StarryCanvas isLit={phase !== PHASES.UNLIT} />

      {/* 2. Interactive 60fps Fireworks & Sparkler Layer (Z-35, visible on mobile & desktop) */}
      <FireworksCanvas
        active={phase === PHASES.CELEBRATION}
        autoBarrage={autoBarrage}
        sparklerActive={sparklerActive}
      />

      {/* 3. Top Navigation & Music Controls */}
      <header className="relative z-40 w-full px-3 pt-3 sm:px-8 sm:pt-5 flex items-center justify-between shrink-0">
        {/* Brand / Title Indicator */}
        <div className="flex items-center gap-1.5 sm:gap-2.5 bg-stone-950/60 backdrop-blur-md px-3 py-1.5 rounded-full border border-amber-500/25 shadow-sm">
          <div className="w-2 h-2 sm:w-2.5 sm:h-2.5 rounded-full bg-amber-400 animate-pulse shadow-[0_0_8px_#f59e0b]" />
          <span className="text-[11px] sm:text-sm font-cinzel font-bold text-amber-200 tracking-wider uppercase truncate max-w-[190px] sm:max-w-none">
            Deepavali ✨ For {wish.to}
          </span>
        </div>

        {/* Music & Sound Controls */}
        <MusicController />
      </header>

      {/* 4. Main Stage Area: Responsive container with min-h-0 and auto overflow so nothing ever gets cut off */}
      <div className="relative z-30 flex-1 w-full flex flex-col items-center justify-center px-2 sm:px-4 min-h-0 overflow-y-auto my-auto py-1">
        {/* Step 1 & 2: Diya Scene */}
        {(phase === PHASES.UNLIT || phase === PHASES.LIT || phase === PHASES.RANGOLI) && (
          <div className="relative flex flex-col items-center justify-center max-w-full">
            {/* Rangoli sits underneath the Diya */}
            <div className="absolute inset-0 flex items-center justify-center -z-10 pointer-events-auto">
              <RangoliCanvas
                isDrawn={phase === PHASES.RANGOLI}
                active={phase === PHASES.RANGOLI}
                onDraw={() => {}}
              />
            </div>

            {/* Handcrafted Brass Diya Vessel & Natural Flame */}
            <DiyaScene
              isLit={phase !== PHASES.UNLIT}
              onIgnite={handleIgnite}
              step={phase}
            />

            {/* Prompt for Step 2 -> 3: Draw Rangoli */}
            {phase === PHASES.LIT && (
              <div className="mt-5 sm:mt-8 flex flex-col items-center animate-fade-in">
                <button
                  onClick={handleDrawRangoli}
                  className="group flex items-center gap-2 px-5 py-2.5 sm:px-7 sm:py-3 rounded-full bg-gradient-to-r from-amber-500 via-orange-500 to-amber-600 text-stone-950 font-cinzel font-bold text-xs sm:text-sm tracking-wider shadow-[0_0_20px_rgba(245,158,11,0.65)] hover:scale-105 active:scale-95 transition-all"
                >
                  <Sparkles className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-stone-950" />
                  <span>Blossom Sacred Rangoli</span>
                  <ChevronRight className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-stone-950 group-hover:translate-x-1 transition-transform" />
                </button>
                <span className="text-[10px] sm:text-xs text-amber-200/60 mt-1 font-sans">
                  (Tap to unfurl golden geometric light around the Diya)
                </span>
              </div>
            )}

            {/* Prompt for Step 3 -> 4: Release Sky Lantern */}
            {phase === PHASES.RANGOLI && (
              <div className="mt-5 sm:mt-8 flex flex-col items-center animate-fade-in">
                <button
                  onClick={handleGoToLantern}
                  className="group flex items-center gap-2 px-5 py-2.5 sm:px-7 sm:py-3 rounded-full bg-gradient-to-r from-amber-500 via-orange-500 to-amber-600 text-stone-950 font-cinzel font-bold text-xs sm:text-sm tracking-wider shadow-[0_0_20px_rgba(245,158,11,0.65)] hover:scale-105 active:scale-95 transition-all"
                >
                  <Heart className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-stone-950 fill-stone-950" />
                  <span>Release Our Sky Lantern</span>
                  <ChevronRight className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-stone-950 group-hover:translate-x-1 transition-transform" />
                </button>
                <span className="text-[10px] sm:text-xs text-amber-200/60 mt-1 font-sans">
                  (Tap or swipe the rangoli to scatter fresh flower petals 🌸)
                </span>
              </div>
            )}
          </div>
        )}

        {/* Step 4: Sky Lantern Scene */}
        {phase === PHASES.LANTERN && (
          <LanternScene
            lanternWish={wish.lanternWish}
            onRelease={handleReleaseLantern}
            isReleased={false}
          />
        )}

        {/* Step 5: Grand Celebration & 3D Royal Gift Envelope */}
        {phase === PHASES.CELEBRATION && (
          <EnvelopeLetter
            wish={wish}
            onOpenCustomizer={() => setShowCustomizer(true)}
            onToggleSparkler={() => setSparklerActive(!sparklerActive)}
            sparklerActive={sparklerActive}
            onTriggerFirework={triggerFirework}
          />
        )}
      </div>

      {/* 5. Bottom Interactive Story Stepper & Reset Controls */}
      <footer className="relative z-40 w-full px-3 pb-3 sm:px-8 sm:pb-5 flex items-center justify-between shrink-0 gap-2">
        {/* Story Stepper Dots */}
        <div className="flex items-center gap-1 bg-stone-950/60 backdrop-blur-md px-2.5 py-1 sm:px-3.5 sm:py-1.5 rounded-full border border-amber-500/25 shadow-sm">
          {[
            { id: PHASES.UNLIT, label: '1. Diya' },
            { id: PHASES.RANGOLI, label: '2. Rangoli' },
            { id: PHASES.LANTERN, label: '3. Lantern' },
            { id: PHASES.CELEBRATION, label: '4. Envelope' }
          ].map((s) => {
            const isActive =
              (s.id === PHASES.UNLIT && (phase === PHASES.UNLIT || phase === PHASES.LIT)) ||
              (s.id === PHASES.RANGOLI && phase === PHASES.RANGOLI) ||
              (s.id === PHASES.LANTERN && phase === PHASES.LANTERN) ||
              (s.id === PHASES.CELEBRATION && phase === PHASES.CELEBRATION);

            return (
              <button
                key={s.id}
                onClick={() => {
                  sound.ensureContext();
                  setPhase(s.id === PHASES.UNLIT ? PHASES.LIT : s.id);
                }}
                className={`text-[9.5px] sm:text-[11px] font-cinzel font-semibold px-2 py-0.5 sm:px-2.5 sm:py-1 rounded-full transition-all ${
                  isActive
                    ? 'bg-amber-500/35 text-amber-200 border border-amber-400/60 shadow-[0_0_8px_rgba(245,158,11,0.4)]'
                    : 'text-stone-400 hover:text-amber-200'
                }`}
              >
                {s.label}
              </button>
            );
          })}
        </div>

        {/* Quick Restart */}
        <div className="flex items-center gap-2">
          {phase === PHASES.CELEBRATION && (
            <span className="text-[10px] sm:text-[11px] text-amber-300/70 font-sans hidden md:inline">
              ✨ Tap anywhere to burst fireworks!
            </span>
          )}
          <button
            onClick={handleReset}
            className="p-1.5 sm:p-2 rounded-full bg-stone-950/60 border border-amber-500/30 text-amber-300/80 hover:text-amber-100 hover:border-amber-400/70 backdrop-blur-md transition-all shadow-sm"
            title="Relive Experience from the Beginning"
          >
            <RefreshCw className="w-3.5 h-3.5" />
          </button>
        </div>
      </footer>

      {/* 6. Personalization & Share Modal */}
      {showCustomizer && (
        <CustomizerModal
          wish={wish}
          onSave={(newWish) => setWish(newWish)}
          onClose={() => setShowCustomizer(false)}
        />
      )}
    </main>
  );
}
