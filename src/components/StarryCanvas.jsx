import React, { useEffect, useRef } from 'react';

export default function StarryCanvas({ isLit = false }) {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    let animationFrameId;

    let width = (canvas.width = window.innerWidth);
    let height = (canvas.height = window.innerHeight);

    const handleResize = () => {
      if (!canvas) return;
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
      initStars();
    };

    window.addEventListener('resize', handleResize);

    // Stars
    let stars = [];
    const starCount = Math.floor((width * height) / 4500);

    const initStars = () => {
      stars = [];
      for (let i = 0; i < starCount; i++) {
        stars.push({
          x: Math.random() * width,
          y: Math.random() * height,
          radius: Math.random() * 1.5 + 0.3,
          alpha: Math.random() * 0.8 + 0.2,
          speed: Math.random() * 0.02 + 0.005,
          color: Math.random() > 0.4 ? '#fffae8' : Math.random() > 0.5 ? '#ffe082' : '#c5cae9',
          twinklePhase: Math.random() * Math.PI * 2
        });
      }
    };
    initStars();

    // Warm Floating Embers / Fireflies
    const embers = [];
    const emberCount = 35;
    for (let i = 0; i < emberCount; i++) {
      embers.push({
        x: Math.random() * width,
        y: Math.random() * height,
        radius: Math.random() * 2.2 + 0.8,
        vx: (Math.random() - 0.5) * 0.4,
        vy: -Math.random() * 0.5 - 0.2, // float upward
        alpha: Math.random() * 0.7 + 0.3,
        pulseSpeed: Math.random() * 0.03 + 0.01,
        phase: Math.random() * Math.PI * 2
      });
    }

    let time = 0;
    const render = () => {
      time += 0.016;
      ctx.clearRect(0, 0, width, height);

      // Deep celestial radial background
      const grad = ctx.createRadialGradient(
        width / 2,
        height * 0.6,
        50,
        width / 2,
        height / 2,
        Math.max(width, height) * 0.85
      );

      if (isLit) {
        grad.addColorStop(0, '#1c130c'); // warm golden amber tone when lit
        grad.addColorStop(0.4, '#120c18');
        grad.addColorStop(1, '#05070d');
      } else {
        grad.addColorStop(0, '#0c0f1c');
        grad.addColorStop(0.6, '#080a14');
        grad.addColorStop(1, '#04050a');
      }

      ctx.fillStyle = grad;
      ctx.fillRect(0, 0, width, height);

      // Draw Stars
      for (let i = 0; i < stars.length; i++) {
        const star = stars[i];
        star.twinklePhase += star.speed;
        const currentAlpha = star.alpha * (0.6 + 0.4 * Math.sin(star.twinklePhase));

        ctx.beginPath();
        ctx.arc(star.x, star.y, star.radius, 0, Math.PI * 2);
        ctx.fillStyle = star.color;
        ctx.globalAlpha = Math.max(0.05, Math.min(1, currentAlpha));
        ctx.fill();
      }

      // Draw Floating Embers
      for (let i = 0; i < embers.length; i++) {
        const e = embers[i];
        e.y += e.vy;
        e.x += e.vx + Math.sin(time + e.phase) * 0.3;
        e.phase += e.pulseSpeed;

        if (e.y < -10) {
          e.y = height + 10;
          e.x = Math.random() * width;
        }

        const currentAlpha = e.alpha * (0.5 + 0.5 * Math.sin(e.phase));
        ctx.beginPath();
        ctx.arc(e.x, e.y, e.radius, 0, Math.PI * 2);

        // Radial glow on ember
        const glow = ctx.createRadialGradient(e.x, e.y, 0, e.x, e.y, e.radius * 3);
        glow.addColorStop(0, 'rgba(255, 200, 100, 0.9)');
        glow.addColorStop(0.4, 'rgba(255, 140, 0, 0.5)');
        glow.addColorStop(1, 'rgba(255, 100, 0, 0)');

        ctx.fillStyle = glow;
        ctx.globalAlpha = Math.max(0.05, Math.min(1, currentAlpha));
        ctx.fill();
      }

      ctx.globalAlpha = 1;
      animationFrameId = requestAnimationFrame(render);
    };

    render();

    return () => {
      window.removeEventListener('resize', handleResize);
      cancelAnimationFrame(animationFrameId);
    };
  }, [isLit]);

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 pointer-events-none -z-10 w-full h-full"
    />
  );
}

