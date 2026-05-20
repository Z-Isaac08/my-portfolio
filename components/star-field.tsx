'use client';

import { useTheme } from 'next-themes';
import { useEffect, useRef } from 'react';

interface Star {
  x: number;
  y: number;
  baseX: number;
  baseY: number;
  size: number;
  opacity: number;
  twinkleSpeed: number;
  phase: number;
}

export function StarField() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const { resolvedTheme } = useTheme();
  const mouseRef = useRef({ x: 0, y: 0 });
  const starsRef = useRef<Star[]>([]);
  const animationRef = useRef<number>(0);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const resizeCanvas = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
      initStars();
    };

    const initStars = () => {
      const stars: Star[] = [];
      // Lower density to ensure excellent performance with Plexus effect (O(N^2) line rendering)
      const density = window.innerWidth < 768 ? 15000 : 12000;
      const numStars = Math.min(Math.floor((canvas.width * canvas.height) / density), 130);

      for (let i = 0; i < numStars; i++) {
        const x = Math.random() * canvas.width;
        const y = Math.random() * canvas.height;
        stars.push({
          x,
          y,
          baseX: x,
          baseY: y,
          size: Math.random() * 1.8 + 0.6,
          opacity: Math.random() * 0.4 + 0.2,
          twinkleSpeed: Math.random() * 0.02 + 0.005,
          phase: Math.random() * Math.PI * 2,
        });
      }
      starsRef.current = stars;
    };

    const handleMouseMove = (e: MouseEvent) => {
      mouseRef.current = { x: e.clientX, y: e.clientY };
    };

    const animate = () => {
      if (!ctx || !canvas) return;

      ctx.clearRect(0, 0, canvas.width, canvas.height);

      const isDark = resolvedTheme === 'dark';
      const starColor = isDark ? '255, 255, 255' : '15, 23, 42';
      const lineColor = isDark ? '99, 102, 241' : '79, 70, 229'; // Indigo color for tech theme
      const time = Date.now() * 0.0003;

      const stars = starsRef.current;
      const numStars = stars.length;

      // 1. Update and draw stars
      stars.forEach((star, index) => {
        // Calculate distance from mouse
        const dx = mouseRef.current.x - star.baseX;
        const dy = mouseRef.current.y - star.baseY;
        const distance = Math.sqrt(dx * dx + dy * dy);
        const maxDistance = 150;

        // Subtle floating animation
        const floatX = Math.sin(time + index * 0.1) * 4;
        const floatY = Math.cos(time * 0.7 + index * 0.15) * 4;

        // Repel stars slightly away from mouse
        if (distance < maxDistance) {
          const force = (maxDistance - distance) / maxDistance;
          const angle = Math.atan2(dy, dx);
          star.x = star.baseX - Math.cos(angle) * force * 25 + floatX;
          star.y = star.baseY - Math.sin(angle) * force * 25 + floatY;
        } else {
          // Smooth return to base
          star.x += (star.baseX + floatX - star.x) * 0.05;
          star.y += (star.baseY + floatY - star.y) * 0.05;
        }

        // Breathing/Twinkling effect
        const currentOpacity = star.opacity + Math.sin(time * 10 + star.phase) * 0.15;
        const clampedOpacity = Math.max(0.1, Math.min(0.7, currentOpacity));

        // Draw star
        ctx.beginPath();
        ctx.arc(star.x, star.y, star.size, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(${starColor}, ${clampedOpacity})`;
        ctx.fill();

        // Optional: Soft glow for larger stars in dark mode
        if (isDark && star.size > 1.4) {
          ctx.beginPath();
          ctx.arc(star.x, star.y, star.size * 2, 0, Math.PI * 2);
          ctx.fillStyle = `rgba(99, 102, 241, ${clampedOpacity * 0.15})`;
          ctx.fill();
        }
      });

      // 2. Draw Plexus / Constellation lines between nearby stars
      const connectionDist = 110;
      for (let i = 0; i < numStars; i++) {
        for (let j = i + 1; j < numStars; j++) {
          const s1 = stars[i];
          const s2 = stars[j];

          const dx = s1.x - s2.x;
          const dy = s1.y - s2.y;
          const dist = Math.sqrt(dx * dx + dy * dy);

          if (dist < connectionDist) {
            // Opacity is higher when stars are closer
            const lineOpacity = (1 - dist / connectionDist) * (isDark ? 0.15 : 0.08);

            ctx.beginPath();
            ctx.moveTo(s1.x, s1.y);
            ctx.lineTo(s2.x, s2.y);
            ctx.lineWidth = 0.6;
            ctx.strokeStyle = `rgba(${lineColor}, ${lineOpacity})`;
            ctx.stroke();
          }
        }
      }

      animationRef.current = requestAnimationFrame(animate);
    };

    resizeCanvas();
    window.addEventListener('resize', resizeCanvas);
    window.addEventListener('mousemove', handleMouseMove);
    animate();

    return () => {
      window.removeEventListener('resize', resizeCanvas);
      window.removeEventListener('mousemove', handleMouseMove);
      cancelAnimationFrame(animationRef.current);
    };
  }, [resolvedTheme]);

  return (
    <canvas
      ref={canvasRef}
      className="absolute inset-0 pointer-events-none"
      style={{ zIndex: 1 }}
    />
  );
}
