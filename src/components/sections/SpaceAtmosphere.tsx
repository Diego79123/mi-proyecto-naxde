'use client';

import { useEffect, useRef } from 'react';

/** A single canvas extends the original star field without hundreds of DOM nodes. */
export function SpaceAtmosphere({ paused }: { paused: boolean }) {
  const canvas = useRef<HTMLCanvasElement>(null);
  useEffect(() => {
    const element = canvas.current;
    const ctx = element?.getContext('2d');
    if (!element || !ctx) return;
    let width = 1, height = 1, frame = 0, time = 0, lastTime = 0;
    let pointerX = 0, pointerY = 0, cameraX = 0, cameraY = 0;
    const stars = Array.from({ length: 150 }, (_, i) => ({
      x: ((i * 7919 + 1777) % 10007) / 10007,
      y: ((i * 3571 + 431) % 9973) / 9973,
      depth: .2 + (i % 7) / 8,
      size: .4 + (i % 4) * .35,
    }));
    const draw = (now: number) => {
      if (!paused && !document.hidden) time += Math.min(40, now - (lastTime || now));
      lastTime = now;
      cameraX += (pointerX - cameraX) * .035;
      cameraY += (pointerY - cameraY) * .035;
      ctx.clearRect(0, 0, width, height);
      const count = width < 760 ? 80 : stars.length;
      stars.slice(0, count).forEach((star, i) => {
        const shift = paused ? 0 : window.scrollY * star.depth * .045;
        const x = ((star.x * width + cameraX * star.depth + time * .0008 * star.depth) % width + width) % width;
        const y = ((star.y * height - shift + cameraY * star.depth) % height + height) % height;
        ctx.globalAlpha = .2 + star.depth * .5 + (paused ? 0 : Math.sin(time * .0006 + i) * .12);
        ctx.fillStyle = i % 9 === 0 ? '#c1a6ff' : '#ece7ff';
        ctx.beginPath(); ctx.arc(x, y, star.size, 0, Math.PI * 2); ctx.fill();
      });
      // A sparse, slow shooting star. No flashes or rapid repeated effects.
      if (!paused) {
        const cycle = (time % 13000) / 13000;
        if (cycle < .16) {
          const travel = cycle / .16;
          const x = width * (.85 - travel * .65), y = height * (.05 + travel * .5);
          const tail = ctx.createLinearGradient(x, y, x + 130, y - 80);
          tail.addColorStop(0, '#eee5ff'); tail.addColorStop(1, '#a08aff00');
          ctx.globalAlpha = Math.sin(travel * Math.PI) * .65;
          ctx.strokeStyle = tail; ctx.lineWidth = 1.2; ctx.beginPath(); ctx.moveTo(x, y); ctx.lineTo(x + 130, y - 80); ctx.stroke();
        }
      }
      ctx.globalAlpha = 1;
      if (!paused && !document.hidden) frame = requestAnimationFrame(draw);
    };
    const resize = () => {
      width = window.innerWidth; height = window.innerHeight;
      const dpr = Math.min(window.devicePixelRatio || 1, 1.5);
      element.width = width * dpr; element.height = height * dpr;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      if (paused) draw(performance.now());
    };
    const move = (e: PointerEvent) => {
      if (paused || e.pointerType !== 'mouse') return;
      pointerX = (e.clientX / width - .5) * 22;
      pointerY = (e.clientY / height - .5) * 22;
    };
    const visibility = () => { cancelAnimationFrame(frame); lastTime = 0; if (!document.hidden) draw(performance.now()); };
    resize(); draw(performance.now());
    window.addEventListener('resize', resize);
    window.addEventListener('pointermove', move, { passive: true });
    document.addEventListener('visibilitychange', visibility);
    return () => { cancelAnimationFrame(frame); window.removeEventListener('resize', resize); window.removeEventListener('pointermove', move); document.removeEventListener('visibilitychange', visibility); };
  }, [paused]);
  return <canvas ref={canvas} aria-hidden="true" style={{ position: 'fixed', inset: 0, width: '100%', height: '100%', pointerEvents: 'none', zIndex: 0 }} />;
}
