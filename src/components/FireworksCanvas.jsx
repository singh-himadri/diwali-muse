import React, { useEffect, useRef } from 'react';
import { sound } from '../audio/soundEngine';

export default function FireworksCanvas({ active = false, autoBarrage = false, sparklerActive = false }) {
  const canvasRef = useRef(null);
  const particlesRef = useRef([]);
  const rocketsRef = useRef([]);
  const mousePosRef = useRef({ x: -100, y: -100, isDown: false });

  // Launch a rocket towards (targetX, targetY)
  const launchRocket = (targetX, targetY, isHeart = false) => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const startX = targetX + (Math.random() - 0.5) * Math.min(canvas.width * 0.4, 80);
    const startY = canvas.height;
    const dx = targetX - startX;
    const dy = targetY - startY;
    const distance = Math.hypot(dx, dy);
    const speed = Math.max(10, Math.min(canvas.height * 0.02, 16)) + Math.random() * 3;

    sound.playFireworkLaunch();

    rocketsRef.current.push({
      x: startX,
      y: startY,
      vx: (dx / distance) * speed,
      vy: (dy / distance) * speed,
      targetY,
      isHeart,
      color: isHeart
        ? '#ff3366'
        : ['#ffd700', '#ff6b6b', '#38bdf8', '#f43f5e', '#a855f7', '#fbbf24'][Math.floor(Math.random() * 6)],
      trail: []
    });
  };

  // Explode rocket at (x, y)
  const explodeRocket = (x, y, isHeart, baseColor) => {
    sound.playFireworkBurst(isHeart ? 'peony' : Math.random() > 0.5 ? 'willow' : 'peony');

    const canvas = canvasRef.current;
    const isMobile = canvas ? canvas.width < 640 : false;

    if (isHeart) {
      // Parametric Heart Burst
      const count = isMobile ? 55 : 80;
      for (let i = 0; i < count; i++) {
        const t = (i / count) * Math.PI * 2;
        // Heart curve formula
        const hx = 16 * Math.pow(Math.sin(t), 3);
        const hy = -(13 * Math.cos(t) - 5 * Math.cos(2 * t) - 2 * Math.cos(3 * t) - Math.cos(4 * t));
        const scale = isMobile ? 0.22 : 0.28;
        const speed = scale + Math.random() * 0.06;

        particlesRef.current.push({
          x,
          y,
          vx: hx * speed,
          vy: hy * speed,
          color: Math.random() > 0.35 ? '#ff2a6d' : '#ffd700',
          alpha: 1,
          decay: 0.013 + Math.random() * 0.007,
          gravity: 0.045,
          sparkle: true,
          size: isMobile ? Math.random() * 2.8 + 2 : Math.random() * 3.2 + 2
        });
      }
    } else {
      // Peony or Willow Golden Brocade
      const isWillow = Math.random() > 0.45;
      const count = isMobile ? (isWillow ? 60 : 50) : (isWillow ? 95 : 75);
      const palette = [
        baseColor,
        '#ffd700',
        '#fbbf24',
        '#ffffff',
        '#f43f5e',
        '#38bdf8',
        '#c084fc'
      ];
      const fireworkColor = palette[Math.floor(Math.random() * palette.length)];

      for (let i = 0; i < count; i++) {
        const angle = Math.random() * Math.PI * 2;
        const maxSpeed = isMobile ? (isWillow ? 4.5 : 6) : (isWillow ? 6.5 : 8.5);
        const speed = Math.random() * maxSpeed + 1.2;

        particlesRef.current.push({
          x,
          y,
          vx: Math.cos(angle) * speed,
          vy: Math.sin(angle) * speed,
          color: fireworkColor,
          alpha: 1,
          decay: isWillow ? 0.011 + Math.random() * 0.006 : 0.017 + Math.random() * 0.009,
          gravity: isWillow ? 0.065 : 0.085,
          friction: 0.965,
          sparkle: Math.random() > 0.4,
          size: isMobile ? Math.random() * 2.6 + 1.6 : Math.random() * 3.4 + 1.8
        });
      }
    }
  };

  // Sparkler (Phuljhadi) crackle at (x, y)
  const addSparklerSparks = (x, y) => {
    const sparkCount = 9;
    for (let i = 0; i < sparkCount; i++) {
      const angle = Math.random() * Math.PI * 2;
      const speed = Math.random() * 5.5 + 2;
      particlesRef.current.push({
        x,
        y,
        vx: Math.cos(angle) * speed,
        vy: Math.sin(angle) * speed,
        color: Math.random() > 0.35 ? '#fffbeb' : '#f59e0b',
        alpha: 1,
        decay: 0.045 + Math.random() * 0.035,
        gravity: 0.12,
        friction: 0.92,
        sparkle: true,
        size: Math.random() * 2.5 + 1.5
      });
    }
    sound.playSparklerCrackle();
  };

  // Initial grand celebration barrage & recurring auto-barrage
  useEffect(() => {
    if (!autoBarrage) return;

    // Launch 3 initial celebratory rockets right away!
    const canvas = canvasRef.current;
    if (canvas) {
      setTimeout(() => launchRocket(canvas.width * 0.3, canvas.height * 0.28, true), 100);
      setTimeout(() => launchRocket(canvas.width * 0.7, canvas.height * 0.22, false), 500);
      setTimeout(() => launchRocket(canvas.width * 0.5, canvas.height * 0.18, true), 1000);
    }

    const interval = setInterval(() => {
      const c = canvasRef.current;
      if (!c) return;
      const tx = Math.random() * (c.width * 0.84) + c.width * 0.08;
      const ty = Math.random() * (c.height * 0.38) + c.height * 0.12;
      const isHeart = Math.random() > 0.55;
      launchRocket(tx, ty, isHeart);
    }, 2200);

    return () => clearInterval(interval);
  }, [autoBarrage]);

  // Global screen click/tap listener to guarantee fireworks trigger on mobile
  useEffect(() => {
    if (!active && !sparklerActive) return;

    const handleGlobalPointer = (e) => {
      // Don't launch rocket if user is tapping a button, input, or interactive link
      const target = e.target;
      if (
        target &&
        (target.closest('button') ||
          target.closest('input') ||
          target.closest('textarea') ||
          target.closest('a'))
      ) {
        return;
      }

      const clientX = e.clientX || (e.touches && e.touches[0]?.clientX);
      const clientY = e.clientY || (e.touches && e.touches[0]?.clientY);
      if (!clientX || !clientY) return;

      mousePosRef.current = { x: clientX, y: clientY, isDown: true };

      if (!sparklerActive) {
        const isHeart = Math.random() > 0.45;
        launchRocket(clientX, clientY, isHeart);
      }
    };

    const handlePointerMove = (e) => {
      const clientX = e.clientX || (e.touches && e.touches[0]?.clientX);
      const clientY = e.clientY || (e.touches && e.touches[0]?.clientY);
      if (clientX && clientY) {
        mousePosRef.current.x = clientX;
        mousePosRef.current.y = clientY;
      }
    };

    window.addEventListener('pointerdown', handleGlobalPointer);
    window.addEventListener('pointermove', handlePointerMove);
    window.addEventListener('touchstart', handleGlobalPointer, { passive: true });
    window.addEventListener('touchmove', handlePointerMove, { passive: true });

    return () => {
      window.removeEventListener('pointerdown', handleGlobalPointer);
      window.removeEventListener('pointermove', handlePointerMove);
      window.removeEventListener('touchstart', handleGlobalPointer);
      window.removeEventListener('touchmove', handlePointerMove);
    };
  }, [active, sparklerActive]);

  // Main Canvas Render Loop
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    let animationId;

    const updateSize = () => {
      if (!canvas) return;
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    updateSize();

    window.addEventListener('resize', updateSize);

    const render = () => {
      // Clear with soft alpha trail
      ctx.globalCompositeOperation = 'destination-out';
      ctx.fillStyle = 'rgba(0, 0, 0, 0.22)';
      ctx.fillRect(0, 0, canvas.width, canvas.height);
      ctx.globalCompositeOperation = 'lighter';

      // 1. Update & Render Rockets
      for (let i = rocketsRef.current.length - 1; i >= 0; i--) {
        const r = rocketsRef.current[i];
        r.trail.push({ x: r.x, y: r.y });
        if (r.trail.length > 8) r.trail.shift();

        r.x += r.vx;
        r.y += r.vy;

        // Draw glowing rocket tail
        ctx.beginPath();
        for (let j = 0; j < r.trail.length; j++) {
          const pt = r.trail[j];
          if (j === 0) ctx.moveTo(pt.x, pt.y);
          else ctx.lineTo(pt.x, pt.y);
        }
        ctx.strokeStyle = '#ffd700';
        ctx.lineWidth = 3;
        ctx.stroke();

        // Rocket head spark
        ctx.beginPath();
        ctx.arc(r.x, r.y, 3.5, 0, Math.PI * 2);
        ctx.fillStyle = '#ffffff';
        ctx.shadowColor = '#f59e0b';
        ctx.shadowBlur = 12;
        ctx.fill();

        // Check if apex reached
        if (r.y <= r.targetY || r.vy >= 0) {
          explodeRocket(r.x, r.y, r.isHeart, r.color);
          rocketsRef.current.splice(i, 1);
        }
      }

      // 2. Update & Render Exploded Particles
      for (let i = particlesRef.current.length - 1; i >= 0; i--) {
        const p = particlesRef.current[i];
        p.vx *= p.friction || 0.98;
        p.vy *= p.friction || 0.98;
        p.vy += p.gravity || 0.06;
        p.x += p.vx;
        p.y += p.vy;
        p.alpha -= p.decay;

        if (p.alpha <= 0) {
          particlesRef.current.splice(i, 1);
          continue;
        }

        ctx.save();
        ctx.globalAlpha = p.alpha;
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
        ctx.fillStyle = p.sparkle && Math.random() > 0.4 ? '#ffffff' : p.color;
        ctx.shadowColor = p.color;
        ctx.shadowBlur = 10;
        ctx.fill();
        ctx.restore();
      }

      // 3. Render Sparkler stick and crackles if active
      if (sparklerActive && mousePosRef.current.x > 0) {
        const mx = mousePosRef.current.x;
        const my = mousePosRef.current.y;

        ctx.save();
        // Sparkler metal stick
        ctx.beginPath();
        ctx.moveTo(mx + 20, my + 50);
        ctx.lineTo(mx, my);
        ctx.strokeStyle = '#94a3b8';
        ctx.lineWidth = 3;
        ctx.lineCap = 'round';
        ctx.stroke();

        // Glowing burning tip
        ctx.beginPath();
        ctx.arc(mx, my, 4.5, 0, Math.PI * 2);
        ctx.fillStyle = '#ffffff';
        ctx.shadowColor = '#f59e0b';
        ctx.shadowBlur = 16;
        ctx.fill();

        addSparklerSparks(mx, my);
        ctx.restore();
      }

      animationId = requestAnimationFrame(render);
    };

    render();

    return () => {
      window.removeEventListener('resize', updateSize);
      cancelAnimationFrame(animationId);
    };
  }, [sparklerActive]);

  return (
    <canvas
      ref={canvasRef}
      className={`fixed inset-0 w-full h-full z-35 pointer-events-none ${
        sparklerActive ? 'cursor-crosshair' : ''
      }`}
    />
  );
}
