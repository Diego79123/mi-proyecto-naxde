"use client"

import React, { useEffect, useRef, useState } from 'react';
import Link from 'next/link';
import { cn } from '@/lib/utils';

const DNAHelix = () => {
  const [points, setPoints] = useState<{ x: number; y1: number; y2: number; phase: number }[]>([]);

  useEffect(() => {
    // Generar puntos para la estructura del ADN
    const newPoints = Array.from({ length: 24 }).map((_, i) => ({
      x: i * 4.2, 
      y1: 0,
      y2: 0,
      phase: i * 0.35,
    }));
    setPoints(newPoints);
  }, []);

  return (
    <div className="absolute inset-0 z-0 pointer-events-none flex items-center justify-center overflow-hidden opacity-40">
      <div className="relative w-full h-full flex items-center justify-center transform -rotate-[25deg] scale-150">
        <svg viewBox="0 0 100 40" className="w-[120%] h-auto overflow-visible">
          <defs>
            <linearGradient id="strand1" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="#F80037" />
              <stop offset="100%" stopColor="#5200F8" />
            </linearGradient>
            <linearGradient id="strand2" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="#5200F8" />
              <stop offset="100%" stopColor="#F80037" />
            </linearGradient>
            <filter id="glow">
              <feGaussianBlur stdDeviation="0.5" result="coloredBlur" />
              <feMerge>
                <feMergeNode in="coloredBlur" />
                <feMergeNode in="SourceGraphic" />
              </feMerge>
            </filter>
          </defs>

          {/* DNA Ladder Bars */}
          {points.map((p, i) => (
            <line 
              key={`line-${i}`}
              x1={p.x} 
              y1={20 + Math.sin(p.phase) * 10}
              x2={p.x} 
              y2={20 + Math.sin(p.phase + Math.PI) * 10}
              stroke="white"
              strokeWidth="0.15"
              className="animate-dna-pulse"
              style={{ 
                animationDelay: `${i * 0.1}s`,
                opacity: 0.3
              } as any}
            />
          ))}

          {/* Strand 1 (Spiral) */}
          <path 
            d={`M ${points.map(p => `${p.x},${20 + Math.sin(p.phase) * 10}`).join(' L ')}`}
            fill="none"
            stroke="url(#strand1)"
            strokeWidth="0.8"
            strokeLinecap="round"
            filter="url(#glow)"
            className="animate-dna-float"
          />

          {/* Strand 2 (Spiral Offset) */}
          <path 
            d={`M ${points.map(p => `${p.x},${20 + Math.sin(p.phase + Math.PI) * 10}`).join(' L ')}`}
            fill="none"
            stroke="url(#strand2)"
            strokeWidth="0.8"
            strokeLinecap="round"
            filter="url(#glow)"
            className="animate-dna-float"
            style={{ animationDelay: '0.5s' } as any}
          />

          {/* Decorative Particles / Nodes */}
          {points.map((p, i) => (
            <React.Fragment key={`nodes-${i}`}>
              <circle 
                cx={p.x} 
                cy={20 + Math.sin(p.phase) * 10} 
                r="0.4" 
                fill="#F80037"
                className="animate-pulse"
                style={{ animationDelay: `${i * 0.1}s` } as any}
              />
              <circle 
                cx={p.x} 
                cy={20 + Math.sin(p.phase + Math.PI) * 10} 
                r="0.4" 
                fill="#5200F8"
                className="animate-pulse"
                style={{ animationDelay: `${i * 0.1 + 0.5}s` } as any}
              />
            </React.Fragment>
          ))}
        </svg>
      </div>

      <style jsx global>{`
        @keyframes dna-float {
          0%, 100% { transform: translateY(0) scaleY(1); }
          50% { transform: translateY(-1px) scaleY(1.05); }
        }
        .animate-dna-float {
          animation: dna-float 4s infinite ease-in-out;
        }
        @keyframes dna-pulse {
          0%, 100% { opacity: 0.1; }
          50% { opacity: 0.5; }
        }
        .animate-dna-pulse {
          animation: dna-pulse 3s infinite ease-in-out;
        }
      `}</style>
    </div>
  );
};

export const ConfidenceSection = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const [scrollProgress, setScrollProgress] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      if (!sectionRef.current) return;
      const rect = sectionRef.current.getBoundingClientRect();
      const windowHeight = window.innerHeight;
      const progress = Math.max(0, Math.min(1, (windowHeight - rect.top) / (windowHeight + rect.height)));
      setScrollProgress(progress);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <section 
      ref={sectionRef}
      className="py-24 md:py-40 bg-[#F0F4FF] text-black relative overflow-hidden min-h-screen flex flex-col justify-center"
    >
      <DNAHelix />

      <div className="max-w-7xl mx-auto px-6 relative z-10 w-full">
        <div className="mb-20 overflow-hidden">
           <h2 
             className="text-[12vw] md:text-[10vw] font-black leading-none tracking-tighter uppercase transition-transform duration-1000"
             style={{ transform: `translateY(${(1 - scrollProgress) * 50}px)` }}
           >
             ADN <span className="text-transparent" style={{ WebkitTextStroke: '1.5px black' }}>NAXDE</span>
           </h2>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24 items-center">
          {/* Visual Block - Columna Izquierda */}
          <div 
            className="relative group transition-all duration-1000"
            style={{ 
              opacity: Math.min(1, scrollProgress * 2),
              transform: `translateX(${(1 - scrollProgress) * -100}px)`
            }}
          >
            <div className="absolute -inset-6 bg-[#5200F8]/5 blur-3xl rounded-[3rem] opacity-0 group-hover:opacity-100 transition-opacity duration-1000" />
            <div className="relative aspect-[4/3] md:aspect-video rounded-[2.5rem] overflow-hidden border border-black/5 shadow-[0_40px_100px_rgba(0,0,0,0.1)] group-hover:scale-[1.02] transition-transform duration-700">
              <img 
                src="https://images.unsplash.com/photo-1550684848-fac1c5b4e853?q=80&w=1000" 
                alt="Naxde Innovation Vortex" 
                className="w-full h-full object-cover brightness-90 contrast-110"
                data-ai-hint="abstract blue vortex"
              />
              <div className="absolute inset-0 bg-[#5200F8]/30 mix-blend-multiply opacity-60" />
              <div className="absolute inset-0 bg-gradient-to-tr from-[#5200F8]/40 to-transparent" />
              
              {/* Pulsing Core */}
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="w-24 h-24 md:w-40 md:h-40 rounded-full border-[1px] border-white/30 animate-ping duration-[3s]" />
                <div className="absolute w-16 h-16 md:w-24 md:h-24 rounded-full border-[1px] border-white/20 animate-ping duration-[2s]" />
              </div>
            </div>
          </div>

          {/* Text Content - Columna Derecha */}
          <div 
            className="space-y-10 transition-all duration-1000 delay-200"
            style={{ 
              opacity: Math.min(1, scrollProgress * 2),
              transform: `translateX(${(1 - scrollProgress) * 100}px)`
            }}
          >
            <div className="space-y-8">
              <p className="text-xl md:text-3xl font-medium leading-[1.4] text-black/80 tracking-tight">
                Naxde es un ecosistema de producción digital de vanguardia que da vida a tus ideas mediante diseños visualmente cautivadores y experiencias inmersivas. Con nuestro talentoso equipo, trascendemos los límites resolviendo problemas complejos y ofreciendo soluciones a medida que superan las expectativas y cautivan al público regional.
              </p>
            </div>

            <div className="pt-4">
              <Link href="/sobre-nosotros">
                <button className="h-14 px-8 bg-white border border-black/5 rounded-full flex items-center gap-4 hover:bg-black hover:text-white transition-all duration-500 shadow-[0_10px_30px_rgba(0,0,0,0.05)] hover:shadow-[0_20px_40px_rgba(82,0,248,0.2)] group">
                  <div className="w-2.5 h-2.5 rounded-full bg-black group-hover:bg-[#5200F8] transition-colors" />
                  <span className="text-[10px] font-black uppercase tracking-[0.3em]">Sobre Nosotros</span>
                </button>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
