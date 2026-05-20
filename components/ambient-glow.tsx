'use client';

import { cn } from "@/lib/utils";
import { useEffect, useRef } from "react";

interface AmbientGlowProps {
  className?: string;
}

export function AmbientGlow({ className }: AmbientGlowProps) {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    let targetX = 0;
    let targetY = 0;
    let currentX = 0;
    let currentY = 0;
    let animationFrameId: number;

    const handleMouseMove = (e: MouseEvent) => {
      // Calculate normalized cursor offset from center, scaled to max 25px translation
      targetX = (e.clientX - window.innerWidth / 2) / 35;
      targetY = (e.clientY - window.innerHeight / 2) / 35;
    };

    // Smooth liquid-like lerp loop for the drifting parallax effect
    const updateMotion = () => {
      currentX += (targetX - currentX) * 0.05;
      currentY += (targetY - currentY) * 0.05;

      const orbs = container.querySelector('.orbs-layer') as HTMLDivElement;
      if (orbs) {
        orbs.style.transform = `translate(${currentX}px, ${currentY}px)`;
      }

      animationFrameId = requestAnimationFrame(updateMotion);
    };

    window.addEventListener("mousemove", handleMouseMove, { passive: true });
    updateMotion();

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  return (
    <div
      ref={containerRef}
      className={cn(
        "fixed inset-0 overflow-hidden pointer-events-none z-0",
        className
      )}
    >
      {/* Moving Aurora Orbs (Parent wrapper handles gentle mouse parallax) */}
      <div className="orbs-layer absolute inset-0 overflow-hidden filter blur-[100px] md:blur-[150px] opacity-[0.2] dark:opacity-[0.45] transition-opacity duration-1000">
        {/* Indigo / Blue Orb */}
        <div className="absolute -top-[10%] -left-[10%] w-[50vw] h-[50vw] min-w-[350px] min-h-[350px] rounded-full bg-indigo-500/12 dark:bg-indigo-500/20 animate-float-slow" />

        {/* Purple / Violet Orb */}
        <div className="absolute top-[40%] -right-[10%] w-[45vw] h-[45vw] min-w-[300px] min-h-[300px] rounded-full bg-violet-500/10 dark:bg-purple-600/15 animate-float-slower" />

        {/* Teal / Cyan Cyber Orb */}
        <div className="absolute -bottom-[10%] left-[10%] w-[55vw] h-[55vw] min-w-[400px] min-h-[400px] rounded-full bg-cyan-500/10 dark:bg-cyan-500/10 animate-float-medium" />
      </div>

      {/* Cyber Grid Base Layer (Always visible, very subtle) */}
      <div className="absolute inset-0 bg-grid opacity-[0.04] dark:opacity-[0.12] pointer-events-none" />

      {/* Radial overlay to soften grid edges */}
      <div className="absolute inset-0 bg-radial-[ellipse_at_center,transparent_40%,var(--background)_100%] pointer-events-none" />
    </div>
  );
}
