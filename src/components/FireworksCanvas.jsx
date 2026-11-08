import React, { useEffect, useRef, useState } from 'react';
import { sound } from '../audio/soundEngine';

export default function FireworksCanvas({ active = false, autoBarrage = false, sparklerActive = false }) {
  const canvasRef = useRef(null);
  const particlesRef = useRef([]);
  const rocketsRef = useRef([]);
  const sparklerTrailRef = useRef([]);
  const mousePosRef = useRef({ x: -100, y: -100, isDown: false });

  // Launch a rocket towards (targetX, targetY)
  const launchRocket = (targetX, targetY, isHeart = false) => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const startX = targetX + (Math.random() - 0.5) * 100;
    const startY = canvas.height;
    const dx = targetX - startX;
    const dy = targetY - startY;
    const distance = Math.hypot(dx, dy);
    const speed = 12 + Math.random() * 4;

    sound.playFireworkLaunch();

    rocketsRef.current.push({
      x: startX,
      y: startY,
      vx: (dx / distance) * speed,
      vy: (dy / distance) * speed,
      targetY,
      isHeart,
      color: isHeart ? '#ff4081' : ['#ffd700', '#ff6b6b', '#48cae4', '#e056fd', '#00f2fe'][Math.floor(Math.random() * 5)],
      trail: []
    });
  };

  // Explode rocket at (x, y)
  const explodeRocket = (x, y, isHeart, baseColor) => {
    sound.playFireworkBurst(isHeart ? 'peony' : Math.random() > 0.5 ? 'willow' : 'peony');

    if (isHeart) {
      // Parametric Heart Burst
      const count = 75;
      for (let i = 0; i < count; i++) {
        const t = (i / count) * Math.PI * 2;
        // Heart curve
        const hx = 16 * Math.pow(Math.sin(t), 3);
        const hy = -(13 * Math.cos(t) - 5 * Math.cos(2 * t) - 2 * Math.cos(3 * t) - Math.cos(4 * t));
        const speed = 0.28 + Math.random() * 0.08;

        particlesRef.current.push({
          x,
          y,
          vx: hx * speed,
          vy: hy * speed,
          color: Math.random() > 0.3 ? '#ff3366' : '#ffd700',
          alpha: 1,
          decay: 0.012 + Math.random() * 0.006,
          gravity: 0.04,
          sparkle: true,
          size: Math.random() * 2.5 + 1.5
        });
      }
    } else {
      // Peony or Willow Golden Brocade
      const isWillow = Math.random() > 0.4;
      const count = isWillow ? 90 : 70;
      const colors = [
        baseColor,
        '#ffd700',
        '#ff9e00',
        '#ffffff',
        '#ff4081',
        '#00f0ff'
      ];
      const fireworkColor = colors[Math.floor(Math.random() * colors.length)];

      for (let i = 0; i < count; i++) {
        const angle = Math.random() * Math.PI * 2;
        const speed = Math.random() * (isWillow ? 6 : 7.5) + 1.5;

        particlesRef.current.push({
          x,
          y,
          vx: Math.cos(angle) * speed,
          vy: Math.sin(angle) * speed,
          color: fireworkColor,
          alpha: 1,
          decay: isWillow ? 0.009 + Math.random() * 0.005 : 0.016 + Math.random() * 0.008,
          gravity: isWillow ? 0.06 : 0.08,
          friction: 0.965,
          sparkle: Math.random() > 0.5,
          size: isWillow ? Math.random() * 2 + 1 : Math.random() * 2.8 + 1.2
        });
      }
    }
  };

  // Sparkler (Phuljhadi) crackle at (x, y)
  const addSparklerSparks = (x, y) => {
    const sparkCount = 8;
    for (let i = 0; i < sparkCount; i++) {
      const angle = Math.random() * Math.PI * 2;
      const speed = Math.random() * 5 + 2;
      particlesRef.current.push({
        x,
        y,
        vx: Math.cos(angle) * speed,
        vy: Math.sin(angle) * speed,
        color: Math.random() > 0.3 ? '#fff4cc' : '#ffb703',
        alpha: 1,
        decay: 0.04 + Math.random() * 0.03,
        gravity: 0.12,
        friction: 0.92,
        sparkle: true,
        size: Math.random() * 2 + 1
      });
    }
    sound.playSparklerCrackle();
  };

  // Auto-barrage loop
  useEffect(() => {
    if (!autoBarrage) return;
    const interval = setInterval(() => {
      const canvas = canvasRef.current;
      if (!canvas) return;
      const tx = Math.random() * (canvas.width * 0.8) + canvas.width * 0.1;
      const ty = Math.random() * (canvas.height * 0.45) + canvas.height * 0.1;
      const isHeart = Math.random() > 0.65;
      launchRocket(tx, ty, isHeart);
    }, 1800);

    return () => clearInterval(interval);
  }, [autoBarrage]);

  // Main Canvas Render Loop
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    let animationId;

    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    const handleResize = () => {
      if (!canvas) return;
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    window.addEventListener('resize', handleResize);

    const render = () => {
      // Soft semi-transparent clear for motion blur trail
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

        // Draw rocket tail
        ctx.beginPath();
        for (let j = 0; j < r.trail.length; j++) {
          const pt = r.trail[j];
          if (j === 0) ctx.moveTo(pt.x, pt.y);
          else ctx.lineTo(pt.x, pt.y);
        }
        ctx.strokeStyle = '#ffd700';
        ctx.lineWidth = 2.5;
        ctx.stroke();

        // Spark at rocket head
        ctx.beginPath();
        ctx.arc(r.x, r.y, 3, 0, Math.PI * 2);
        ctx.fillStyle = '#ffffff';
        ctx.shadowColor = '#ffb703';
        ctx.shadowBlur = 10;
        ctx.fill();

        // Check if reached destination or zenith
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
        p.vy += p.gravity || 0.05;
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
        ctx.shadowBlur = 8;
        ctx.fill();
        ctx.restore();
      }

      // 3. Render Sparkler stick and crackles if active
      if (sparklerActive && mousePosRef.current.x > 0) {
        const mx = mousePosRef.current.x;
        const my = mousePosRef.current.y;

        // Sparkler metal rod
        ctx.save();
        ctx.beginPath();
        ctx.moveTo(mx + 25, my + 60);
        ctx.lineTo(mx, my);
        ctx.strokeStyle = '#8d99ae';
        ctx.lineWidth = 3;
        ctx.lineCap = 'round';
        ctx.stroke();

        // Glowing burning tip
        ctx.beginPath();
        ctx.arc(mx, my, 4, 0, Math.PI * 2);
        ctx.fillStyle = '#ffffff';
        ctx.shadowColor = '#ffd000';
        ctx.shadowBlur = 15;
        ctx.fill();

        // Continuously produce sparks
        addSparklerSparks(mx, my);
        ctx.restore();
      }

      animationId = requestAnimationFrame(render);
    };

    render();

    return () => {
      window.removeEventListener('resize', handleResize);
      cancelAnimationFrame(animationId);
    };
  }, [sparklerActive]);

  // Click anywhere to launch a firework rocket!
  const handlePointerDown = (e) => {
    const x = e.clientX || (e.touches && e.touches[0]?.clientX);
    const y = e.clientY || (e.touches && e.touches[0]?.clientY);
    if (!x || !y) return;

    mousePosRef.current = { x, y, isDown: true };

    if (!sparklerActive && active) {
      const isHeart = Math.random() > 0.5;
      launchRocket(x, y, isHeart);
    }
  };

  const handlePointerMove = (e) => {
    const x = e.clientX || (e.touches && e.touches[0]?.clientX);
    const y = e.clientY || (e.touches && e.touches[0]?.clientY);
    if (x && y) {
      mousePosRef.current.x = x;
      mousePosRef.current.y = y;
    }
  };

  const handlePointerUp = () => {
    mousePosRef.current.isDown = false;
  };

  return (
    <canvas
      ref={canvasRef}
      onPointerDown={handlePointerDown}
      onPointerMove={handlePointerMove}
      onPointerUp={handlePointerUp}
      onTouchStart={handlePointerDown}
      onTouchMove={handlePointerMove}
      onTouchEnd={handlePointerUp}
      className={`fixed inset-0 w-full h-full z-20 ${
        active || sparklerActive ? 'cursor-crosshair pointer-events-auto' : 'pointer-events-none'
      }`}
    />
  );
}

