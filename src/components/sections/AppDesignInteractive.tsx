
"use client"

import React, { useEffect, useRef, useState } from 'react';
import Link from 'next/link';
import { Smartphone, Cpu, ShieldCheck, Database, ArrowRight, Cloud, Layers, Zap, Tablet } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';

const benefits = [
  { 
    id: 1,
    title: "Escala Cloud", 
    desc: "Infraestructura lista para millones de usuarios.", 
    icon: Cloud, 
    side: 'left',
    top: '15%',
    start: 0.60,
    end: 0.75
  },
  { 
    id: 2,
    title: "Native Flow", 
    desc: "Fluidez extrema y animaciones de alta gama.", 
    icon: Zap, 
    side: 'right',
    top: '25%',
    start: 0.68,
    end: 0.83
  },
  { 
    id: 3,
    title: "Data Secure", 
    desc: "Protección de datos bajo estándares militares.", 
    icon: ShieldCheck, 
    side: 'left',
    top: '55%',
    start: 0.76,
    end: 0.91
  },
  { 
    id: 4,
    title: "Arquitectura", 
    desc: "Código limpio y mantenible a largo plazo.", 
    icon: Database, 
    side: 'right',
    top: '65%',
    start: 0.84,
    end: 0.99
  }
];

export const AppDesignInteractive = () => {
  const containerRef = useRef<HTMLElement>(null);
  const [scrollProgress, setScrollProgress] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      if (!containerRef.current) return;
      const rect = containerRef.current.getBoundingClientRect();
      const windowHeight = window.innerHeight;
      const totalHeight = rect.height;
      
      const progress = Math.max(0, Math.min(1, -rect.top / (totalHeight - windowHeight)));
      setScrollProgress(progress);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();

    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Escena 1: Texto Monumental
  const textOpacity = Math.max(0, 1 - scrollProgress * 3); 
  const textBlur = Math.min(25, scrollProgress * 60);
  const textScale = 1.1 - scrollProgress * 0.2;

  // Escena 2: Tablet Reveal
  const tabletOpacity = scrollProgress < 0.1 ? 0 : Math.min(1, (scrollProgress - 0.1) * 5) * (1 - Math.max(0, (scrollProgress - 0.95) * 10));
  const tabletScale = scrollProgress < 0.5 
    ? 0.7 + (scrollProgress * 0.4)
    : 0.9 - ((scrollProgress - 0.5) * 0.1);

  // Escena Final: Botón CTA App
  const ctaOpacity = Math.max(0, (scrollProgress - 0.94) * 15);
  const ctaY = (1 - ctaOpacity) * 40;

  return (
    <section 
      ref={containerRef}
      className="relative h-[400vh] bg-[#00001D] text-white"
    >
      <div className="sticky top-0 h-screen overflow-hidden">
        
        {/* Background Effects */}
        <div className="absolute inset-0 z-0 pointer-events-none opacity-30">
          <div className="absolute top-[10%] right-[10%] w-[70%] h-[60%] bg-primary/10 blur-[150px] rounded-full" />
          <div className="absolute bottom-[10%] left-[10%] w-[60%] h-[50%] bg-secondary/10 blur-[120px] rounded-full" />
        </div>

        <div className="max-w-7xl mx-auto px-6 relative z-10 w-full h-full flex items-center justify-center">
          
          <div className="relative w-full h-full flex items-center justify-center">
            
            {/* Escena 1: Texto Masivo */}
            <div 
              className="absolute inset-0 flex flex-col items-center justify-center text-center space-y-8 transition-all duration-500 ease-out"
              style={{ 
                opacity: textOpacity,
                transform: `scale(${textScale})`,
                filter: `blur(${textBlur}px)`,
                pointerEvents: textOpacity < 0.1 ? 'none' : 'auto'
              }}
            >
              <span className="inline-block px-4 py-1.5 rounded-full border border-primary/30 text-[10px] font-black uppercase tracking-[0.3em] text-primary bg-primary/5 backdrop-blur-sm">
                Software a Medida
              </span>
              
              <h2 className="font-black leading-[0.85] tracking-tighter uppercase select-none text-6xl sm:text-8xl md:text-[9rem] lg:text-[11rem]">
                <div>APLICACIONES</div>
                <div className="text-transparent" style={{ WebkitTextStroke: '1.5px white' }}>ESCALABLES</div>
                <div>SIN LÍMITES</div>
              </h2>

              <div className="max-w-2xl mx-auto">
                <p className="text-xl md:text-2xl font-medium leading-tight text-white/60 italic">
                  Construimos el motor digital que impulsa tu negocio hacia la eficiencia absoluta y el crecimiento global.
                </p>
              </div>
            </div>

            {/* Escena 2: Tablet Mockup */}
            <div 
              className="absolute inset-0 flex items-center justify-center transition-all duration-500 ease-out z-20"
              style={{ 
                opacity: tabletOpacity,
                transform: `scale(${tabletScale})`,
                pointerEvents: tabletOpacity < 0.1 ? 'none' : 'auto'
              }}
            >
              <div className="relative w-[320px] h-[450px] md:w-[500px] md:h-[700px] bg-black rounded-[3rem] border-[10px] border-[#222] shadow-[0_0_100px_rgba(0,0,0,0.8)] overflow-hidden">
                {/* Screen Content */}
                <div className="absolute inset-0 rounded-[2.2rem] overflow-hidden bg-[#050515]">
                  <iframe 
                    src="/preview/app-design?mode=mockup" 
                    className="w-full h-full border-none no-scrollbar"
                    title="Naxde App Design Preview"
                  />
                </div>
                {/* Top Sensor */}
                <div className="absolute top-4 left-1/2 -translate-x-1/2 w-16 h-1 rounded-full bg-white/5 z-50" />
              </div>
              
              {/* Background Glow */}
              <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-secondary/10 rounded-full blur-[140px] -z-10" />
            </div>

            {/* Escena 3: Tarjetas de Beneficios App */}
            <div className="absolute inset-0 w-full h-full pointer-events-none">
              {benefits.map((benefit) => {
                const cardProgress = Math.max(0, Math.min(1, (scrollProgress - benefit.start) / (benefit.end - benefit.start)));
                const cardOpacity = cardProgress;
                const cardX = benefit.side === 'left' ? (1 - cardProgress) * -100 : (1 - cardProgress) * 100;
                
                return (
                  <div 
                    key={benefit.id}
                    className={cn(
                      "absolute w-[220px] md:w-[280px] p-6 glass-card rounded-3xl border border-white/10 transition-all duration-500 ease-out",
                      benefit.side === 'left' ? "left-0 md:left-[5%]" : "right-0 md:right-[5%]"
                    )}
                    style={{ 
                      top: benefit.top,
                      opacity: cardOpacity,
                      transform: `translateX(${cardX}px)`,
                      pointerEvents: cardOpacity > 0.5 ? 'auto' : 'none',
                      zIndex: 30
                    }}
                  >
                    <div className="flex items-center gap-4 mb-3">
                      <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center">
                        <benefit.icon className="w-5 h-5 text-primary" />
                      </div>
                      <h4 className="font-bold text-sm md:text-base uppercase tracking-widest">{benefit.title}</h4>
                    </div>
                    <p className="text-white/50 text-xs md:text-sm leading-relaxed">{benefit.desc}</p>
                    
                    <div 
                      className={cn(
                        "absolute top-1/2 -translate-y-1/2 w-12 md:w-24 h-px bg-gradient-to-r from-primary/50 to-transparent",
                        benefit.side === 'left' ? "left-full ml-4" : "right-full mr-4 rotate-180"
                      )}
                    >
                      <div className="absolute right-0 top-1/2 -translate-y-1/2 w-1.5 h-1.5 rounded-full bg-primary shadow-glow-accent animate-pulse" />
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Escena Final: Botón CTA App */}
            <div 
              className="absolute bottom-[100px] left-1/2 -translate-x-1/2 z-50 transition-all duration-700 ease-out flex flex-col items-center gap-4"
              style={{ 
                opacity: ctaOpacity,
                transform: `translate(-50%, ${ctaY}px)`,
                pointerEvents: ctaOpacity > 0.5 ? 'auto' : 'none'
              }}
            >
              <Link href="/contacto">
                <Button 
                  size="lg" 
                  className="h-16 md:h-20 px-12 md:px-16 bg-primary hover:bg-primary/90 text-white rounded-full text-xl md:text-2xl font-black transition-all hover:scale-105 active:scale-95 group neon-accent shadow-glow-accent"
                >
                  <Tablet className="w-6 h-6 md:w-8 md:h-8 mr-3 text-white group-hover:rotate-12 transition-transform" />
                  Cotizar App
                  <ArrowRight className="w-6 h-6 md:w-8 md:h-8 ml-3 animate-pulse" />
                </Button>
              </Link>
              <p className="text-[10px] font-black uppercase tracking-[0.4em] text-white/30">
                Tu visión en las mejores manos
              </p>
            </div>

          </div>
        </div>
      </div>

      <style jsx global>{`
        .no-scrollbar::-webkit-scrollbar {
          display: none;
        }
      `}</style>
    </section>
  );
};
