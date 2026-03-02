
"use client"

import React, { useEffect, useState, useRef, useCallback } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Button } from '@/components/ui/button';

const HERO_BG_IMAGE = "https://firebasestorage.googleapis.com/v0/b/studio-4920931495-1d74b.firebasestorage.app/o/Elementos%20graficos%2FFondo%20hero.png?alt=media&token=894d096d-5c36-48b8-aa50-cce731f640c4";

const StarField = () => {
  const [stars, setStars] = useState<{ id: number; top: string; left: string; size: string; duration: string }[]>([]);
  const [shootingStars, setShootingStars] = useState<{ id: number; top: string; left: string; duration: string; delay: string }[]>([]);

  useEffect(() => {
    const starCount = 140;
    const newStars = Array.from({ length: starCount }).map((_, i) => ({
      id: i,
      top: `${Math.random() * 100}%`,
      left: `${Math.random() * 100}%`,
      size: `${Math.random() * 2 + 0.5}px`,
      duration: `${Math.random() * 3 + 2}s`
    }));
    setStars(newStars);

    const shootingCount = 6;
    const newShootingStars = Array.from({ length: shootingCount }).map((_, i) => ({
      id: i,
      top: `${Math.random() * 40}%`,
      left: `${Math.random() * 100 + 40}%`,
      duration: `${Math.random() * 2 + 2}s`,
      delay: `${Math.random() * 10}s`
    }));
    setShootingStars(newShootingStars);
  }, []);

  return (
    <div className="stars-container absolute inset-0 overflow-hidden pointer-events-none z-[5]">
      {stars.map((star) => (
        <div
          key={star.id}
          className="star absolute bg-white rounded-full opacity-40 animate-pulse"
          style={{
            top: star.top,
            left: star.left,
            width: star.size,
            height: star.size,
            animationDuration: star.duration,
            boxShadow: '0 0 4px rgba(255, 255, 255, 0.4)'
          } as any}
        />
      ))}
      {shootingStars.map((ss) => (
        <div
          key={ss.id}
          className="shooting-star absolute h-[1px] bg-gradient-to-r from-white to-transparent opacity-0"
          style={{
            top: ss.top,
            left: ss.left,
            width: '180px',
            animation: `shooting ${ss.duration} linear infinite`,
            animationDelay: ss.delay
          } as any}
        />
      ))}
    </div>
  );
};

interface ParticleProps {
  x: number;
  y: number;
  originX: number;
  originY: number;
  color: string;
  size: number;
  friction: number;
  ease: number;
}

class Particle {
  x: number;
  y: number;
  originX: number;
  originY: number;
  color: string;
  size: number;
  vx: number;
  vy: number;
  friction: number;
  ease: number;

  constructor({ x, y, originX, originY, color, size, friction, ease }: ParticleProps) {
    this.x = x;
    this.y = y;
    this.originX = originX;
    this.originY = originY;
    this.color = color;
    this.size = size;
    this.vx = 0;
    this.vy = 0;
    this.friction = friction;
    this.ease = ease;
  }

  draw(ctx: CanvasRenderingContext2D) {
    ctx.fillStyle = this.color;
    ctx.fillRect(this.x, this.y, this.size, this.size);
  }

  update(mouse: { x: number; y: number; radius: number }) {
    const dx = mouse.x - this.x;
    const dy = mouse.y - this.y;
    const distance = Math.sqrt(dx * dx + dy * dy);
    const force = (mouse.radius - distance) / mouse.radius;

    if (distance < mouse.radius) {
      const angle = Math.atan2(dy, dx);
      this.vx -= Math.cos(angle) * force * 10;
      this.vy -= Math.sin(angle) * force * 10;
    }

    this.vx *= this.friction;
    this.vy *= this.friction;

    this.x += this.vx + (this.originX - this.x) * this.ease;
    this.y += this.vy + (this.originY - this.y) * this.ease;
  }
}

const ParticleText = ({ text }: { text: string }) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const particles = useRef<Particle[]>([]);
  const mouse = useRef({ x: 0, y: 0, radius: 100 });
  const animationFrameId = useRef<number>(0);

  const init = useCallback(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d', { willReadFrequently: true });
    if (!ctx) return;

    // Reset particles
    particles.current = [];
    
    // Set canvas dimensions
    const width = canvas.offsetWidth;
    const height = canvas.offsetHeight;
    canvas.width = width;
    canvas.height = height;

    // Draw text to read pixel data
    const fontSize = Math.min(width / 10, 120);
    ctx.font = `900 ${fontSize}px var(--font-poppins)`;
    ctx.fillStyle = '#F84F39';
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';
    ctx.fillText(text, width / 2, height / 2);

    const pixels = ctx.getImageData(0, 0, width, height).data;
    ctx.clearRect(0, 0, width, height);

    const gap = 4; // Particle spacing

    for (let y = 0; y < height; y += gap) {
      for (let x = 0; x < width; x += gap) {
        const index = (y * width + x) * 4;
        const alpha = pixels[index + 3];
        if (alpha > 128) {
          particles.current.push(
            new Particle({
              x: Math.random() * width,
              y: Math.random() * height,
              originX: x,
              originY: y,
              color: '#F84F39',
              size: 2,
              friction: 0.95,
              ease: 0.1
            })
          );
        }
      }
    }
  }, [text]);

  const animate = useCallback(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    ctx.clearRect(0, 0, canvas.width, canvas.height);
    
    particles.current.forEach((particle) => {
      particle.update(mouse.current);
      particle.draw(ctx);
    });

    animationFrameId.current = requestAnimationFrame(animate);
  }, []);

  useEffect(() => {
    init();
    animate();

    const handleResize = () => {
      init();
    };

    window.addEventListener('resize', handleResize);
    return () => {
      window.removeEventListener('resize', handleResize);
      cancelAnimationFrame(animationFrameId.current);
    };
  }, [init, animate]);

  const handleMouseMove = (e: React.MouseEvent<HTMLCanvasElement>) => {
    const rect = canvasRef.current?.getBoundingClientRect();
    if (rect) {
      mouse.current.x = e.clientX - rect.left;
      mouse.current.y = e.clientY - rect.top;
    }
  };

  const handleMouseLeave = () => {
    mouse.current.x = -9999;
    mouse.current.y = -9999;
  };

  return (
    <canvas
      ref={canvasRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      className="w-full h-full max-w-5xl cursor-default"
    />
  );
};

export const Hero = () => {
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      const { clientX, clientY } = e;
      const x = (clientX / window.innerWidth - 0.5) * 10;
      const y = (clientY / window.innerHeight - 0.5) * 10;
      setMousePos({ x, y });
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  const scrollToNextSection = () => {
    if (typeof window !== 'undefined') {
      const metricsSection = document.querySelector('section.py-12');
      metricsSection?.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section className="relative h-screen w-full flex flex-col bg-[#00001D] overflow-hidden select-none">
      {/* 1. Fondo Base (Nebulosa) - z-0 */}
      <div className="absolute inset-0 z-0">
        <div 
          className="absolute inset-0 transition-transform duration-[1500ms] ease-out scale-110"
          style={{ transform: `translate(${mousePos.x * 0.2}px, ${mousePos.y * 0.2}px)` }}
        >
          <Image 
            src={HERO_BG_IMAGE} 
            alt="Space Nebula Background" 
            fill 
            className="object-cover"
            priority
            quality={100}
          />
        </div>
        <div className="absolute inset-0 bg-[#00001D]/40 backdrop-blur-[2px]" />
      </div>

      <StarField />

      {/* 2. Top Header Minimalista - z-50 */}
      <div className="relative z-50 pt-12 flex flex-col items-center gap-4">
        <span className="text-white text-xl font-bold tracking-[0.3em] uppercase">naxde.</span>
        <span className="text-white/40 text-[10px] font-bold tracking-[0.5em] mt-2">01 / 01</span>
      </div>

      {/* 3. Contenedor Central (Texto Monumental con Partículas) - z-10 */}
      <div className="flex-1 relative flex items-center justify-center">
        <div className="absolute inset-0 flex items-center justify-center z-10 text-center px-6">
          <ParticleText text="DESARROLLAMOS" />
        </div>
      </div>

      {/* 4. Footer del Hero (Tagline + Botón) - z-50 */}
      <div className="relative z-50 pb-16 flex flex-col items-center space-y-10 px-8 text-center">
        <div className="max-w-md">
          <p className="text-[10px] md:text-xs text-white/60 font-bold tracking-[0.3em] uppercase leading-relaxed">
            Construimos plataformas digitales que transforman negocios.<br />
            Hay movimiento en el futuro.
          </p>
        </div>

        <div className="flex flex-col items-center gap-6">
          <Button 
            onClick={scrollToNextSection}
            variant="outline" 
            className="h-14 px-12 border-white/20 bg-white/5 hover:bg-white/10 text-white rounded-none text-sm font-bold uppercase tracking-[0.2em] transition-all"
          >
            Explorar más
          </Button>

          {/* Scroll Indicator */}
          <div className="flex flex-col items-center gap-3 cursor-pointer group" onClick={scrollToNextSection}>
            <div className="w-[1px] h-12 bg-gradient-to-b from-white/0 via-white/40 to-white/0 relative overflow-hidden">
              <div className="absolute top-0 left-0 w-full h-1/2 bg-primary animate-scroll-line" />
            </div>
          </div>
        </div>
      </div>

      <style jsx global>{`
        @keyframes scroll-line {
          0% { transform: translateY(-100%); }
          100% { transform: translateY(200%); }
        }
        .animate-scroll-line {
          animation: scroll-line 2s infinite ease-in-out;
        }
      `}</style>
    </section>
  );
};
