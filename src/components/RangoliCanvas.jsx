import React, { useEffect, useRef, useState } from 'react';
import { sound } from '../audio/soundEngine';

export default function RangoliCanvas({ isDrawn, onDraw, active }) {
  const canvasRef = useRef(null);
  const [progress, setProgress] = useState(isDrawn ? 1 : 0);
  const petalsRef = useRef([]);

  // Trigger smooth blooming animation
  useEffect(() => {
    if (active && !isDrawn) {
      sound.playRangoliGlissando();
      let p = 0;
      const interval = setInterval(() => {
        p += 0.02;
        if (p >= 1) {
          p = 1;
          clearInterval(interval);
          onDraw?.();
        }
        setProgress(p);
      }, 25);
      return () => clearInterval(interval);
    } else if (isDrawn) {
      setProgress(1);
    }
  }, [active, isDrawn]);

  // Click or touch anywhere on the rangoli to scatter flower petals
  const handleInteraction = (e) => {
    if (!isDrawn) return;
    const canvas = canvasRef.current;
    if (!canvas) return;
    const rect = canvas.getBoundingClientRect();
    const x = (e.clientX || (e.touches && e.touches[0]?.clientX)) - rect.left;
    const y = (e.clientY || (e.touches && e.touches[0]?.clientY)) - rect.top;

    sound.playChime(620 + Math.random() * 260, 1.4);

    for (let i = 0; i < 8; i++) {
      petalsRef.current.push({
        x: x + (Math.random() - 0.5) * 35,
        y: y + (Math.random() - 0.5) * 35,
        vx: (Math.random() - 0.5) * 2.5,
        vy: Math.random() * 2.2 + 1.2,
        rotation: Math.random() * Math.PI * 2,
        vRot: (Math.random() - 0.5) * 0.08,
        color: Math.random() > 0.45 ? '#f59e0b' : '#ef4444', // marigold orange or crimson rose
        size: Math.random() * 9 + 6,
        alpha: 1
      });
    }
  };

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    let animationId;

    const size = 500;
    canvas.width = size;
    canvas.height = size;
    const cx = size / 2;
    const cy = size / 2;

    const render = () => {
      ctx.clearRect(0, 0, size, size);

      if (progress > 0) {
        ctx.save();
        ctx.translate(cx, cy);

        // 1. Concentric gold energy rings
        const maxRadius = 210 * progress;
        ctx.lineWidth = 1.8;
        ctx.strokeStyle = 'rgba(253, 224, 71, 0.45)';
        ctx.shadowColor = '#facc15';
        ctx.shadowBlur = 12;

        ctx.beginPath();
        ctx.arc(0, 0, maxRadius, 0, Math.PI * 2);
        ctx.stroke();

        // Secondary ring with delicate dots
        if (progress > 0.25) {
          ctx.beginPath();
          ctx.arc(0, 0, maxRadius * 0.68, 0, Math.PI * 2);
          ctx.strokeStyle = 'rgba(249, 115, 22, 0.5)';
          ctx.lineWidth = 1.4;
          ctx.stroke();

          // Dots around ring
          const dotCount = 24;
          for (let d = 0; d < dotCount; d++) {
            const angle = (d * Math.PI * 2) / dotCount;
            const dx = Math.cos(angle) * maxRadius * 0.68;
            const dy = Math.sin(angle) * maxRadius * 0.68;
            ctx.beginPath();
            ctx.arc(dx, dy, 2, 0, Math.PI * 2);
            ctx.fillStyle = '#fde047';
            ctx.fill();
          }
        }

        // 2. 8-Fold Symmetrical Sacred Lotus Petals
        const petals = 8;
        const petalLen = 145 * progress;

        for (let i = 0; i < petals; i++) {
          const angle = (i * Math.PI * 2) / petals;
          ctx.save();
          ctx.rotate(angle);

          // Outer curved lotus petal
          ctx.beginPath();
          ctx.moveTo(0, 0);
          ctx.bezierCurveTo(28, petalLen * 0.4, 28, petalLen * 0.8, 0, petalLen);
          ctx.bezierCurveTo(-28, petalLen * 0.8, -28, petalLen * 0.4, 0, 0);

          const grad = ctx.createLinearGradient(0, 0, 0, petalLen);
          grad.addColorStop(0, 'rgba(185, 28, 28, 0.25)');
          grad.addColorStop(0.5, 'rgba(245, 158, 11, 0.45)');
          grad.addColorStop(1, 'rgba(254, 240, 138, 0.7)');
          ctx.fillStyle = grad;
          ctx.fill();

          ctx.strokeStyle = 'rgba(253, 224, 71, 0.75)';
          ctx.lineWidth = 1.6;
          ctx.stroke();

          // Inner gold leaf spine
          ctx.beginPath();
          ctx.moveTo(0, 25);
          ctx.lineTo(0, petalLen * 0.86);
          ctx.strokeStyle = 'rgba(255, 255, 255, 0.7)';
          ctx.lineWidth = 1.2;
          ctx.stroke();

          // Glowing Diya spark at petal tip
          if (progress > 0.65) {
            ctx.beginPath();
            ctx.arc(0, petalLen + 10, 4, 0, Math.PI * 2);
            ctx.fillStyle = '#fffbeb';
            ctx.shadowColor = '#f59e0b';
            ctx.shadowBlur = 14;
            ctx.fill();
          }

          ctx.restore();
        }

        // 3. Inner 8-pointed star / Mandala diamond layer
        if (progress > 0.35) {
          const starProgress = (progress - 0.35) / 0.65;
          const starPetals = 8;
          const starLen = 95 * starProgress;

          for (let i = 0; i < starPetals; i++) {
            const angle = (i * Math.PI * 2) / starPetals + Math.PI / 8;
            ctx.save();
            ctx.rotate(angle);

            ctx.beginPath();
            ctx.moveTo(0, 15);
            ctx.lineTo(18, starLen * 0.6);
            ctx.lineTo(0, starLen);
            ctx.lineTo(-18, starLen * 0.6);
            ctx.closePath();

            ctx.fillStyle = 'rgba(153, 27, 27, 0.35)';
            ctx.fill();
            ctx.strokeStyle = 'rgba(251, 191, 36, 0.75)';
            ctx.lineWidth = 1.4;
            ctx.stroke();

            ctx.restore();
          }
        }

        ctx.restore();
      }

      // 4. Render Interactive Floating Petals
      for (let i = petalsRef.current.length - 1; i >= 0; i--) {
        const p = petalsRef.current[i];
        p.x += p.vx;
        p.y += p.vy;
        p.rotation += p.vRot;
        p.alpha -= 0.01;

        if (p.alpha <= 0) {
          petalsRef.current.splice(i, 1);
          continue;
        }

        ctx.save();
        ctx.translate(p.x, p.y);
        ctx.rotate(p.rotation);
        ctx.globalAlpha = p.alpha;

        // Draw almond petal shape
        ctx.beginPath();
        ctx.ellipse(0, 0, p.size, p.size * 0.55, 0, 0, Math.PI * 2);
        ctx.fillStyle = p.color;
        ctx.shadowColor = p.color;
        ctx.shadowBlur = 6;
        ctx.fill();

        ctx.restore();
      }

      animationId = requestAnimationFrame(render);
    };

    render();

    return () => cancelAnimationFrame(animationId);
  }, [progress, isDrawn]);

  return (
    <div
      onClick={handleInteraction}
      onTouchStart={handleInteraction}
      className="relative flex items-center justify-center cursor-pointer select-none"
      title="Tap to scatter flower petals"
    >
      <canvas
        ref={canvasRef}
        className="w-[360px] h-[360px] sm:w-[480px] sm:h-[480px] pointer-events-auto filter drop-shadow-[0_0_30px_rgba(245,158,11,0.45)]"
      />
    </div>
  );
}
