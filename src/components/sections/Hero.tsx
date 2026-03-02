"use client"

import React, { useEffect, useState, useRef, useCallback } from 'react';
import { Button } from '@/components/ui/button';
import { Mouse } from 'lucide-react';
import Image from 'next/image';

const StarField = () => {
  const [stars, setStars] = useState<{ id: number; top: string; left: string; size: string; duration: string }[]>([]);
  const [shootingStars, setShootingStars] = useState<{ id: number; top: string; left: string; duration: string; delay: string }[]>([]);

  useEffect(() => {
    const starCount = 180;
    const newStars = Array.from({ length: starCount }).map((_, i) => ({
      id: i,
      top: `${Math.random() * 100}%`,
      left: `${Math.random() * 100}%`,
      size: `${Math.random() * 2.5 + 0.5}px`,
      duration: `${Math.random() * 4 + 2}s`
    }));
    setStars(newStars);

    const shootingCount = 4;
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
          className="star absolute bg-white rounded-full opacity-60 animate-pulse"
          style={{
            top: star.top,
            left: star.left,
            width: star.size,
            height: star.size,
            animationDuration: star.duration,
            boxShadow: '0 0 6px rgba(255, 255, 255, 0.6)'
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
            width: '220px',
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
      this.vx -= Math.cos(angle) * force * 15;
      this.vy -= Math.sin(angle) * force * 15;
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
  const mouse = useRef({ x: -9999, y: -9999, radius: 100 });
  const animationFrameId = useRef<number>(0);

  const init = useCallback(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d', { willReadFrequently: true });
    if (!ctx) return;

    particles.current = [];
    
    const width = canvas.offsetWidth;
    const height = canvas.offsetHeight;
    if (width === 0 || height === 0) return;
    
    canvas.width = width;
    canvas.height = height;

    const fontSize = Math.min(width / (text.length * 0.55), 320); 
    ctx.font = `900 ${fontSize}px sans-serif`;
    
    const gradient = ctx.createLinearGradient(0, 0, width, 0);
    gradient.addColorStop(0, '#5200F8');
    gradient.addColorStop(1, '#F80037');
    
    ctx.fillStyle = gradient;
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';
    ctx.fillText(text, width / 2, height / 2);

    const pixels = ctx.getImageData(0, 0, width, height).data;
    ctx.clearRect(0, 0, width, height);

    const gap = 1;

    for (let y = 0; y < height; y += gap) {
      for (let x = 0; x < width; x += gap) {
        const index = (y * width + x) * 4;
        const alpha = pixels[index + 3];
        if (alpha > 100) {
          const r = pixels[index];
          const g = pixels[index + 1];
          const b = pixels[index + 2];
          
          particles.current.push(
            new Particle({
              x: x, 
              y: y, 
              originX: x,
              originY: y,
              color: `rgb(${r}, ${g}, ${b})`,
              size: 1.2,
              friction: 0.9,
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
      className="w-full h-full cursor-default"
    />
  );
};

export const Hero = () => {
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const words = ["CREA", "CONECTA", "AVANZA"];
  const [currentWordIndex, setCurrentWordIndex] = useState(0);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      const { clientX, clientY } = e;
      const x = (clientX / window.innerWidth - 0.5) * 20;
      const y = (clientY / window.innerHeight - 0.5) * 20;
      setMousePos({ x, y });
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentWordIndex((prev) => (prev + 1) % words.length);
    }, 4000);
    return () => clearInterval(interval);
  }, []);

  const scrollToNextSection = () => {
    if (typeof window !== 'undefined') {
      const metricsSection = document.querySelector('section.py-12');
      metricsSection?.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section className="relative h-screen w-full flex flex-col bg-[#00001D] overflow-hidden select-none">
      <div className="absolute inset-0 z-0 pointer-events-none">
        <div 
          className="absolute inset-0 transition-transform duration-[2000ms] ease-out scale-110"
          style={{ transform: `translate(${mousePos.x * 0.5}px, ${mousePos.y * 0.5}px)` }}
        >
          <div className="absolute top-[-10%] right-[-10%] w-[80%] h-[70%] bg-purple-600/20 blur-[150px] rounded-full animate-pulse duration-[8s]" />
          <div className="absolute bottom-[-15%] left-[-5%] w-[70%] h-[60%] bg-[#F80037]/10 blur-[120px] rounded-full animate-pulse duration-[10s] delay-700" />
          <div className="absolute top-[20%] left-[20%] w-[50%] h-[50%] bg-blue-600/10 blur-[140px] rounded-full animate-pulse duration-[12s] delay-1000" />
          <div className="absolute top-[40%] right-[10%] w-[120%] h-[70%] bg-purple-900/10 blur-[150px] rounded-full opacity-60" />
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(82,0,248,0.05)_0%,transparent_70%)]" />
        </div>
      </div>

      <StarField />

      <div className="absolute inset-0 flex items-center justify-center z-[20] pointer-events-none">
        <div className="relative w-[280px] h-[280px] md:w-[480px] md:h-[480px] float-anim">
          <Image 
            src="https://firebasestorage.googleapis.com/v0/b/studio-4920931495-1d74b.firebasestorage.app/o/Elementos%20graficos%2FAstronauta%20candy.png?alt=media&token=2b444080-0b94-4549-a656-6e67dc038512"
            alt="Astronauta Candy"
            fill
            className="object-contain"
            priority
          />
        </div>
      </div>

      <div className="flex-1 relative flex flex-col items-center justify-center gap-[10px]">
        <div 
          key={currentWordIndex} 
          className="w-full h-[40vh] md:h-[50vh] flex items-center justify-center z-10 text-center px-6 animate-slide-word"
        >
          <ParticleText text={words[currentWordIndex]} />
        </div>
        
        <div className="max-w-4xl z-10 px-8">
          <p className="text-sm md:text-lg text-white/60 font-bold tracking-[0.3em] uppercase leading-relaxed text-center">
            Construimos plataformas digitales que transforman negocios.
          </p>
        </div>
      </div>

      <div className="relative z-50 pb-[134px] flex flex-col items-center px-8 text-center">
        <div 
          className="flex flex-col items-center gap-3 cursor-pointer group" 
          onClick={scrollToNextSection}
        >
          <Mouse className="w-10 h-10 text-white/30 group-hover:text-primary transition-all duration-300 group-hover:drop-shadow-[0_0_10px_#F80037]" />
          <span className="text-[10px] font-bold text-white/40 uppercase tracking-[0.3em] group-hover:text-white transition-colors">
            descubre
          </span>
        </div>
      </div>

      <style jsx global>{`
        @keyframes slide-word {
          0% { transform: translateX(50px); opacity: 0; filter: blur(10px); }
          100% { transform: translateX(0); opacity: 1; filter: blur(0); }
        }
        .animate-slide-word {
          animation: slide-word 1.2s cubic-bezier(0.22, 1, 0.36, 1) forwards;
        }
      `}</style>
    </section>
  );
};
