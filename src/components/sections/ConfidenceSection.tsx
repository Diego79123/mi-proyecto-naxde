
"use client"

import React, { useEffect, useRef, useState } from 'react';
import Link from 'next/link';
import { cn } from '@/lib/utils';

const DNAHelix = ({ isHovered }: { isHovered: boolean }) => {
  const [time, setTime] = useState(0);

  useEffect(() => {
    let frame: number;
    const animate = (t: number) => {
      // Animación pausada y elegante, acelera en hover
      setTime(t / (isHovered ? 1000 : 3000));
      frame = requestAnimationFrame(animate);
    };
    frame = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(frame);
  }, [isHovered]);

  const rungs = 24;

  return (
    <div className="absolute inset-0 z-0 pointer-events-none flex items-center justify-center overflow-hidden opacity-[0.08]">
      <div className={cn(
        "relative w-full h-full flex items-center justify-center transform -rotate-[25deg] transition-all duration-1000",
        isHovered ? "scale-110" : "scale-100"
      )}>
        <svg viewBox="0 0 100 120" className="h-[150%] w-auto overflow-visible">
          {/* Hebra 1: Línea continua sinusoide */}
          <path 
            d={`M ${Array.from({ length: 121 }).map((_, i) => {
              const y = i;
              const phase = (i / 30) * Math.PI * 2 + time;
              const x = 50 + Math.sin(phase) * 20;
              return `${x},${y}`;
            }).join(' L ')}`}
            fill="none"
            stroke="black"
            strokeWidth="0.8"
            strokeLinecap="round"
          />

          {/* Peldaños y Nodos: Estructura molecular solicitada */}
          {Array.from({ length: rungs }).map((_, i) => {
            const y = 5 + (i / (rungs - 1)) * 110;
            const phase = (y / 30) * Math.PI * 2 + time;
            const xRight = 50 + Math.sin(phase) * 20;
            const xLeft = 50 + Math.sin(phase + Math.PI) * 20;

            return (
              <g key={i}>
                {/* Peldaño Horizontal */}
                <line 
                  x1={xLeft} 
                  y1={y} 
                  x2={xRight} 
                  y2={y} 
                  stroke="black" 
                  strokeWidth="0.6" 
                />
                {/* Nodo en el extremo de la hebra secundaria */}
                <circle 
                  cx={xLeft} 
                  cy={y} 
                  r="1.8" 
                  fill="black" 
                />
              </g>
            );
          })}
        </svg>
      </div>
    </div>
  );
};

export const ConfidenceSection = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const [scrollProgress, setScrollProgress] = useState(0);
  const [isHovered, setIsHovered] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (!sectionRef.current) return;
      const rect = sectionRef.current.getBoundingClientRect();
      const windowHeight = window.innerHeight;
      
      // Progresión de entrada: desde que el tope entra al viewport hasta que el scroll avanza
      const progress = Math.max(0, Math.min(1, (windowHeight - rect.top) / (windowHeight * 0.8)));
      setScrollProgress(progress);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <section 
      ref={sectionRef}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      className="relative min-h-screen bg-[#F0F4FF] overflow-hidden"
    >
      {/* 
        CAPA DE TRANSICIÓN: "THE SINGULARITY GATE"
        Crea un efecto de apertura circular masiva que revela el nuevo espacio limpio.
      */}
      <div 
        className="absolute inset-0 z-[60] pointer-events-none"
        style={{ 
          background: `radial-gradient(circle at center, transparent ${scrollProgress * 150}%, #00001D ${scrollProgress * 150}%)`,
          opacity: scrollProgress > 0.98 ? 0 : 1,
          transition: 'opacity(0.4s ease-out)'
        }}
      />

      {/* Efectos de HUD técnico durante la transición de apertura */}
      <div 
        className="absolute inset-0 z-[61] pointer-events-none flex items-center justify-center"
        style={{ 
          opacity: scrollProgress > 0.05 && scrollProgress < 0.9 ? (1 - scrollProgress) : 0,
          transform: `scale(${0.8 + scrollProgress * 0.4})`,
          transition: 'opacity 0.5s'
        }}
      >
        <div className="w-[70vw] h-[70vw] rounded-full border border-[#5200F8]/20 animate-spin-slow" />
        <div className="absolute w-[65vw] h-[65vw] rounded-full border border-[#F80037]/10 animate-spin-slow [animation-direction:reverse]" />
        
        {/* Línea de escaneo láser de entrada */}
        <div 
          className="absolute w-full h-[2px] bg-primary/40 shadow-[0_0_20px_#F80037]" 
          style={{ 
            top: `${scrollProgress * 100}%`,
            transition: 'top 0.1s linear'
          }}
        />
      </div>

      {/* Contenedor de Contenido con Revelación Elegante */}
      <div 
        className="relative z-10 w-full min-h-screen flex flex-col justify-center py-24 md:py-40"
        style={{ 
          opacity: Math.min(1, scrollProgress * 1.5),
          transform: `translateY(${(1 - scrollProgress) * 40}px)`,
          transition: 'transform 1s cubic-bezier(0.16, 1, 0.3, 1), opacity 0.6s'
        }}
      >
        <DNAHelix isHovered={isHovered} />

        <div className="max-w-7xl mx-auto px-6 relative z-10 w-full text-black">
          <div className="mb-20 overflow-hidden">
             <h2 
               className="text-[12vw] md:text-[10vw] font-black leading-none tracking-tighter uppercase"
               style={{ 
                 transform: `translateY(${(1 - scrollProgress) * 100}%)`,
                 transition: 'transform 1.2s cubic-bezier(0.16, 1, 0.3, 1)'
               }}
             >
               ADN <span className="text-transparent" style={{ WebkitTextStroke: '1.5px black' }}>NAXDE</span>
             </h2>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24 items-center">
            <div 
              className="relative group"
              style={{ 
                opacity: Math.min(1, scrollProgress * 2),
                transform: `translateX(${(1 - scrollProgress) * -80}px)`,
                transition: 'transform 1.4s cubic-bezier(0.16, 1, 0.3, 1), opacity 1s'
              }}
            >
              <div className="relative aspect-[4/3] md:aspect-video rounded-[2.5rem] overflow-hidden border border-black/5 shadow-[0_40px_100px_rgba(0,0,0,0.1)] group-hover:scale-[1.02] transition-transform duration-700">
                <img 
                  src="https://images.unsplash.com/photo-1550684848-fac1c5b4e853?q=80&w=1000" 
                  alt="Naxde Innovation Vortex" 
                  className="w-full h-full object-cover brightness-90 contrast-110"
                  data-ai-hint="abstract blue vortex"
                />
                <div className="absolute inset-0 bg-[#5200F8]/30 mix-blend-multiply opacity-60" />
                <div className="absolute inset-0 bg-gradient-to-tr from-[#5200F8]/40 to-transparent" />
              </div>
            </div>

            <div 
              className="space-y-10"
              style={{ 
                opacity: Math.min(1, scrollProgress * 2),
                transform: `translateX(${(1 - scrollProgress) * 80}px)`,
                transition: 'transform 1.4s cubic-bezier(0.16, 1, 0.3, 1), opacity 1s'
              }}
            >
              <div className="space-y-8">
                <p className="text-xl md:text-3xl font-medium leading-[1.4] text-black/80 tracking-tight text-justify">
                  Naxde es un ecosistema de producción digital de vanguardia que da vida a tus ideas mediante diseños visualmente cautivadores y experiencias inmersivas. Con nuestro talentoso equipo, trascendemos los límites resolviendo problemas complejos y ofreciendo soluciones a medida que superan las expectativas y cautivan al público regional.
                </p>
              </div>

              <div className="pt-4">
                <Link href="/sobre-nosotros">
                  <button className="h-14 px-8 bg-white border border-black/5 rounded-full flex items-center gap-4 hover:bg-black hover:text-white transition-all duration-500 shadow-[0_10px_30px_rgba(0,0,0,0.05)] group">
                    <div className="w-2.5 h-2.5 rounded-full bg-black group-hover:bg-[#5200F8] transition-colors" />
                    <span className="text-[10px] font-black uppercase tracking-[0.3em]">Sobre Nosotros</span>
                  </button>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
