'use client';

import { useTheme } from 'next-themes';
import { useEffect, useRef } from 'react';

/* ------------------------------ Config ------------------------------ */

const CONFIG = {
  maxStars: 150,
  densityDesktop: 9500, // px² per star
  densityMobile: 14000,
  connectionDist: 120,
  cursorRadius: 170, // cursor <-> star lines
  repelRadius: 140,
  repelStrength: 45,
  parallax: 14, // px of max shift at z = 1
  shootingMinDelay: 4, // seconds
  shootingMaxDelay: 10,
} as const;

const PALETTE = {
  dark: {
    star: '210, 222, 255',
    line: '110, 150, 255',
    cursor: '150, 185, 255',
    glow: '96, 140, 255',
    lineAlpha: 0.2,
    glowStars: true,
    shooting: true,
  },
  light: {
    star: '30, 41, 90',
    line: '37, 99, 235',
    cursor: '37, 99, 235',
    glow: '37, 99, 235',
    lineAlpha: 0.12,
    glowStars: false,
    shooting: false,
  },
} as const;

/* ------------------------------ Types ------------------------------- */

interface Star {
  baseX: number;
  baseY: number;
  x: number;
  y: number;
  ox: number; // repel offset
  oy: number;
  z: number; // depth 0.35 - 1
  size: number;
  opacity: number;
  twinkle: number;
  phase: number;
  driftX: number;
  driftY: number;
}

interface Shooter {
  x: number;
  y: number;
  vx: number;
  vy: number;
  life: number;
  maxLife: number;
  len: number;
}

/* ----------------------------- Component ---------------------------- */

export function StarField() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const { resolvedTheme } = useTheme();
  const isDarkRef = useRef(false);
  const redrawRef = useRef<(() => void) | null>(null);

  // Theme changes only update a ref: no reset, no re-init.
  useEffect(() => {
    isDarkRef.current = resolvedTheme === 'dark';
    redrawRef.current?.();
  }, [resolvedTheme]);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const parent = canvas.parentElement ?? canvas;
    const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    let width = 0;
    let height = 0;
    let dpr = 1;
    let raf = 0;
    let running = false;
    let visible = true;
    let last = 0;
    let clock = 0;
    let nextShooter = 2 + Math.random() * 3;
    let rect = canvas.getBoundingClientRect();

    let stars: Star[] = [];
    const shooters: Shooter[] = [];
    const mouse = { cx: 0, cy: 0, active: false };
    const parallax = { x: 0, y: 0 };

    // Spatial grid (linked cells)
    const CELL = CONFIG.connectionDist;
    let cols = 0;
    let rows = 0;
    let head = new Int32Array(0);
    let next = new Int32Array(0);

    // Line buckets, to batch strokes
    const BUCKETS = 4;
    const segs: number[][] = Array.from({ length: BUCKETS }, () => []);

    // Glow sprite
    let sprite: HTMLCanvasElement | null = null;
    let spriteKey = '';

    /* ------------------------------ Helpers ----------------------------- */

    const ensureSprite = (rgb: string) => {
      if (spriteKey === rgb && sprite) return;
      const s = document.createElement('canvas');
      s.width = s.height = 64;
      const c = s.getContext('2d');
      if (!c) return;
      const g = c.createRadialGradient(32, 32, 0, 32, 32, 32);
      g.addColorStop(0, `rgba(${rgb}, 0.5)`);
      g.addColorStop(0.4, `rgba(${rgb}, 0.12)`);
      g.addColorStop(1, `rgba(${rgb}, 0)`);
      c.fillStyle = g;
      c.fillRect(0, 0, 64, 64);
      sprite = s;
      spriteKey = rgb;
    };

    const createStar = (): Star => {
      const z = 0.35 + Math.random() * 0.65;
      const x = Math.random() * width;
      const y = Math.random() * height;
      return {
        baseX: x,
        baseY: y,
        x,
        y,
        ox: 0,
        oy: 0,
        z,
        size: (Math.random() * 1.3 + 0.5) * (0.6 + z * 0.7),
        opacity: Math.random() * 0.35 + 0.25,
        twinkle: Math.random() * 1.4 + 0.5,
        phase: Math.random() * Math.PI * 2,
        driftX: (Math.random() - 0.5) * 6 * z,
        driftY: (Math.random() - 0.5) * 4 * z,
      };
    };

    const spawnShooter = () => {
      const angle = ((20 + Math.random() * 25) * Math.PI) / 180;
      const speed = 500 + Math.random() * 400;
      shooters.push({
        x: Math.random() * width * 0.7,
        y: Math.random() * height * 0.4,
        vx: Math.cos(angle) * speed,
        vy: Math.sin(angle) * speed,
        life: 0,
        maxLife: 0.9 + Math.random() * 0.7,
        len: 80 + Math.random() * 80,
      });
    };

    /* ------------------------------- Render ----------------------------- */

    const render = (t: number, dt: number) => {
      const dark = isDarkRef.current;
      const pal = dark ? PALETTE.dark : PALETTE.light;
      if (pal.glowStars) ensureSprite(pal.glow);

      ctx.clearRect(0, 0, width, height);

      const mx = mouse.active ? mouse.cx - rect.left : -9999;
      const my = mouse.active ? mouse.cy - rect.top : -9999;

      // Parallax easing
      const pk = Math.min(1, dt * 3);
      const ptx = mouse.active ? (mx / width - 0.5) * -CONFIG.parallax : 0;
      const pty = mouse.active ? (my / height - 0.5) * -CONFIG.parallax : 0;
      parallax.x += (ptx - parallax.x) * pk;
      parallax.y += (pty - parallax.y) * pk;

      const ease = 1 - Math.exp(-dt * 9);
      const R = CONFIG.repelRadius;
      const M = 20;
      const n = stars.length;

      /* 1. Update + draw stars */
      for (let i = 0; i < n; i++) {
        const s = stars[i];

        // Slow drift with wrap-around
        s.baseX += s.driftX * dt;
        s.baseY += s.driftY * dt;
        if (s.baseX < -M) s.baseX = width + M;
        else if (s.baseX > width + M) s.baseX = -M;
        if (s.baseY < -M) s.baseY = height + M;
        else if (s.baseY > height + M) s.baseY = -M;

        const fx = Math.sin(t * 0.4 + i * 0.7) * 3;
        const fy = Math.cos(t * 0.3 + i * 1.1) * 3;

        // Smooth repulsion
        let tox = 0;
        let toy = 0;
        const dx = s.baseX + fx - mx;
        const dy = s.baseY + fy - my;
        const d2 = dx * dx + dy * dy;
        if (d2 < R * R && d2 > 0.01) {
          const d = Math.sqrt(d2);
          const f = 1 - d / R;
          const push = f * f * CONFIG.repelStrength;
          tox = (dx / d) * push;
          toy = (dy / d) * push;
        }
        s.ox += (tox - s.ox) * ease;
        s.oy += (toy - s.oy) * ease;

        s.x = s.baseX + fx + parallax.x * s.z + s.ox;
        s.y = s.baseY + fy + parallax.y * s.z + s.oy;

        const tw = s.opacity + Math.sin(t * s.twinkle + s.phase) * 0.18;
        const alpha = Math.max(0.08, Math.min(0.9, tw)) * (0.45 + 0.55 * s.z);

        if (pal.glowStars && sprite && s.size > 1.3) {
          const g = s.size * 5;
          ctx.globalAlpha = Math.min(1, alpha * 1.2);
          ctx.drawImage(sprite, s.x - g, s.y - g, g * 2, g * 2);
          ctx.globalAlpha = 1;
        }

        ctx.beginPath();
        ctx.arc(s.x, s.y, s.size, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(${pal.star}, ${alpha})`;
        ctx.fill();
      }

      /* 2. Constellation lines (spatial grid + batched strokes) */
      if (next.length < n) next = new Int32Array(n);
      head.fill(-1);
      for (let i = 0; i < n; i++) {
        const cx = Math.min(cols - 1, Math.max(0, (stars[i].x / CELL) | 0));
        const cy = Math.min(rows - 1, Math.max(0, (stars[i].y / CELL) | 0));
        const idx = cy * cols + cx;
        next[i] = head[idx];
        head[idx] = i;
      }

      for (let b = 0; b < BUCKETS; b++) segs[b].length = 0;
      const D = CONFIG.connectionDist;
      const D2 = D * D;

      for (let i = 0; i < n; i++) {
        const s1 = stars[i];
        const cx = Math.min(cols - 1, Math.max(0, (s1.x / CELL) | 0));
        const cy = Math.min(rows - 1, Math.max(0, (s1.y / CELL) | 0));
        for (let oy = -1; oy <= 1; oy++) {
          const ny = cy + oy;
          if (ny < 0 || ny >= rows) continue;
          for (let ox = -1; ox <= 1; ox++) {
            const nx = cx + ox;
            if (nx < 0 || nx >= cols) continue;
            for (let j = head[ny * cols + nx]; j !== -1; j = next[j]) {
              if (j <= i) continue;
              const s2 = stars[j];
              const dx = s1.x - s2.x;
              const dy = s1.y - s2.y;
              const d2 = dx * dx + dy * dy;
              if (d2 < D2) {
                const closeness = 1 - Math.sqrt(d2) / D;
                const b = Math.min(BUCKETS - 1, (closeness * BUCKETS) | 0);
                segs[b].push(s1.x, s1.y, s2.x, s2.y);
              }
            }
          }
        }
      }

      ctx.lineWidth = 0.6;
      for (let b = 0; b < BUCKETS; b++) {
        const arr = segs[b];
        if (!arr.length) continue;
        ctx.beginPath();
        for (let k = 0; k < arr.length; k += 4) {
          ctx.moveTo(arr[k], arr[k + 1]);
          ctx.lineTo(arr[k + 2], arr[k + 3]);
        }
        ctx.strokeStyle = `rgba(${pal.line}, ${((b + 0.5) / BUCKETS) * pal.lineAlpha * 1.6})`;
        ctx.stroke();
      }

      /* 3. Cursor: soft glow + lines to nearby stars */
      if (mouse.active) {
        const CR = CONFIG.cursorRadius;
        const halo = ctx.createRadialGradient(mx, my, 0, mx, my, CR * 0.8);
        halo.addColorStop(0, `rgba(${pal.cursor}, ${dark ? 0.08 : 0.05})`);
        halo.addColorStop(1, `rgba(${pal.cursor}, 0)`);
        ctx.fillStyle = halo;
        ctx.fillRect(mx - CR, my - CR, CR * 2, CR * 2);

        ctx.lineWidth = 0.8;
        for (let i = 0; i < n; i++) {
          const s = stars[i];
          const dx = s.x - mx;
          const dy = s.y - my;
          const d2 = dx * dx + dy * dy;
          if (d2 < CR * CR) {
            const a = (1 - Math.sqrt(d2) / CR) * (dark ? 0.4 : 0.28);
            ctx.beginPath();
            ctx.moveTo(mx, my);
            ctx.lineTo(s.x, s.y);
            ctx.strokeStyle = `rgba(${pal.cursor}, ${a})`;
            ctx.stroke();
          }
        }
      }

      /* 4. Shooting stars (dark mode only) */
      if (pal.shooting && !reduceMotion) {
        if (t > nextShooter && shooters.length < 2) {
          spawnShooter();
          nextShooter =
            t +
            CONFIG.shootingMinDelay +
            Math.random() * (CONFIG.shootingMaxDelay - CONFIG.shootingMinDelay);
        }
      }
      for (let i = shooters.length - 1; i >= 0; i--) {
        const sh = shooters[i];
        sh.life += dt;
        sh.x += sh.vx * dt;
        sh.y += sh.vy * dt;
        if (sh.life > sh.maxLife || !pal.shooting) {
          shooters.splice(i, 1);
          continue;
        }
        const p = sh.life / sh.maxLife;
        const a = Math.sin(p * Math.PI);
        const speed = Math.hypot(sh.vx, sh.vy);
        const tx = sh.x - (sh.vx / speed) * sh.len;
        const ty = sh.y - (sh.vy / speed) * sh.len;
        const grad = ctx.createLinearGradient(tx, ty, sh.x, sh.y);
        grad.addColorStop(0, `rgba(${pal.star}, 0)`);
        grad.addColorStop(1, `rgba(${pal.star}, ${a * 0.9})`);
        ctx.beginPath();
        ctx.moveTo(tx, ty);
        ctx.lineTo(sh.x, sh.y);
        ctx.strokeStyle = grad;
        ctx.lineWidth = 1.4;
        ctx.lineCap = 'round';
        ctx.stroke();
        ctx.lineCap = 'butt';
      }
    };

    /* ------------------------------- Loop ------------------------------- */

    const frame = (now: number) => {
      raf = requestAnimationFrame(frame);
      const dt = Math.min((now - last) / 1000, 0.05);
      last = now;
      clock += dt;
      render(clock, dt);
    };

    const sync = () => {
      const shouldRun = !reduceMotion && visible && !document.hidden;
      if (shouldRun && !running) {
        running = true;
        last = performance.now();
        raf = requestAnimationFrame(frame);
      } else if (!shouldRun && running) {
        running = false;
        cancelAnimationFrame(raf);
      }
    };

    /* ------------------------------ Resize ------------------------------ */

    const resize = () => {
      const w = parent.clientWidth;
      const h = parent.clientHeight;
      if (!w || !h) return;
      const nextDpr = Math.min(window.devicePixelRatio || 1, 2);
      if (w === width && h === height && nextDpr === dpr) return;

      // Keep the stars, just rescale their positions
      const sx = width ? w / width : 1;
      const sy = height ? h / height : 1;
      for (const s of stars) {
        s.baseX *= sx;
        s.baseY *= sy;
      }

      width = w;
      height = h;
      dpr = nextDpr;
      canvas.width = Math.round(w * dpr);
      canvas.height = Math.round(h * dpr);
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);

      const density = w < 768 ? CONFIG.densityMobile : CONFIG.densityDesktop;
      const target = Math.min(Math.floor((w * h) / density), CONFIG.maxStars);
      while (stars.length < target) stars.push(createStar());
      if (stars.length > target) stars = stars.slice(0, target);

      cols = Math.ceil(w / CELL) + 1;
      rows = Math.ceil(h / CELL) + 1;
      head = new Int32Array(cols * rows);
      next = new Int32Array(stars.length);
      rect = canvas.getBoundingClientRect();

      if (reduceMotion) render(clock, 0);
    };

    /* ------------------------------ Events ------------------------------ */

    const onPointerMove = (e: PointerEvent) => {
      mouse.cx = e.clientX;
      mouse.cy = e.clientY;
      mouse.active = true;
    };
    const onPointerOut = () => {
      mouse.active = false;
    };
    const onScrollOrResize = () => {
      rect = canvas.getBoundingClientRect();
    };
    const onVisibility = () => sync();

    const ro = new ResizeObserver(resize);
    ro.observe(parent);

    const io = new IntersectionObserver(
      ([entry]) => {
        visible = entry.isIntersecting;
        sync();
      },
      { threshold: 0 }
    );
    io.observe(canvas);

    window.addEventListener('pointermove', onPointerMove, { passive: true });
    window.addEventListener('pointerup', onPointerOut, { passive: true });
    window.addEventListener('pointercancel', onPointerOut, { passive: true });
    window.addEventListener('blur', onPointerOut);
    document.documentElement.addEventListener('mouseleave', onPointerOut);
    window.addEventListener('scroll', onScrollOrResize, { passive: true });
    window.addEventListener('resize', onScrollOrResize, { passive: true });
    document.addEventListener('visibilitychange', onVisibility);

    redrawRef.current = () => {
      if (reduceMotion) render(clock, 0);
    };

    resize();
    sync();

    return () => {
      running = false;
      cancelAnimationFrame(raf);
      ro.disconnect();
      io.disconnect();
      window.removeEventListener('pointermove', onPointerMove);
      window.removeEventListener('pointerup', onPointerOut);
      window.removeEventListener('pointercancel', onPointerOut);
      window.removeEventListener('blur', onPointerOut);
      document.documentElement.removeEventListener('mouseleave', onPointerOut);
      window.removeEventListener('scroll', onScrollOrResize);
      window.removeEventListener('resize', onScrollOrResize);
      document.removeEventListener('visibilitychange', onVisibility);
      redrawRef.current = null;
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      aria-hidden="true"
      className="pointer-events-none absolute inset-0 h-full w-full"
      style={{ zIndex: 1 }}
    />
  );
}
