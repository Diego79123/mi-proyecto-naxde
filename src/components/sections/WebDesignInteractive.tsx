
"use client"

import React, { useEffect, useRef, useState } from 'react';
import Link from 'next/link';
import { Globe, Code, Zap, Layout, ArrowRight, MousePointer2, Rocket, Layers, BarChart } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';

const benefits = [
  { 
    id: 1,
    title: "Conversión Pro", 
    desc: "Diseños enfocados en guiar al usuario al cierre.", 
    icon: Rocket, 
    side: 'left',
    top: '15%',
    start: 0.60,
    end: 0.75
  },
  { 
    id: 2,
    title: "Gráficos 3D", 
    desc: "Experiencias inmersivas con tecnología WebGL.", 
    icon: Layers, 
    side: 'right',
    top: '25%',
    start: 0.68,
    end: 0.83
  },
  { 
    id: 3,
    title: "Clean Code", 
    desc: "Estructura impecable para SEO y velocidad.", 
    icon: Code, 
    side: 'left',
    top: '55%',
    start: 0.76,
    end: 0.91
  },
  { 
    id: 4,
    title: "Analytics", 
    desc: "Mide cada clic y comportamiento de usuario.", 
    icon: BarChart, 
    side: 'right',
    top: '65%',
    start: 0.84,
    end: 0.99
  }
];

export const WebDesignInteractive = () => {
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

  // Escena 2: Laptop Reveal & Animation
  const laptopOpacity = scrollProgress < 0.1 ? 0 : Math.min(1, (scrollProgress - 0.1) * 5) * (1 - Math.max(0, (scrollProgress - 0.95) * 10));
  const laptopScale = scrollProgress < 0.5 
    ? 0.7 + (scrollProgress * 0.4)
    : 0.9 - ((scrollProgress - 0.5) * 0.1);

  // Mecánica de apertura (entre 0.25 y 0.55 del scroll)
  const openProgress = Math.max(0, Math.min(1, (scrollProgress - 0.25) / 0.3));
  const lidRotation = -90 + (openProgress * 90); // Inicia plana (-90deg) y se abre a 0deg
  const lidLift = openProgress * 20; // Se desprende 20px hacia arriba

  // Escena Final: Botón CTA Web
  const ctaOpacity = Math.max(0, (scrollProgress - 0.94) * 15);
  const ctaY = (1 - ctaOpacity) * 40;

  return (
    <section 
      ref={containerRef}
      className="relative h-[400vh] bg-[#050515] text-white"
    >
      <div className="sticky top-0 h-screen overflow-hidden">
        
        {/* Background Effects */}
        <div className="absolute inset-0 z-0 pointer-events-none opacity-30">
          <div className="absolute top-[-10%] left-[20%] w-[80%] h-[70%] bg-blue-600/10 blur-[150px] rounded-full" />
          <div className="absolute bottom-[20%] right-[-5%] w-[60%] h-[50%] bg-cyan-500/5 blur-[120px] rounded-full" />
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
              <span className="inline-block px-4 py-1.5 rounded-full border border-blue-500/30 text-[10px] font-black uppercase tracking-[0.3em] text-blue-400 bg-blue-500/5 backdrop-blur-sm">
                Desarrollo Premium
              </span>
              
              <h2 className="font-black leading-[0.85] tracking-tighter uppercase select-none text-6xl sm:text-8xl md:text-[9rem] lg:text-[11rem]">
                <div>DISEÑO WEB</div>
                <div className="text-transparent" style={{ WebkitTextStroke: '1.5px white' }}>SORPRENDENTE</div>
                <div>FUTURISTA</div>
              </h2>

              <div className="max-w-2xl mx-auto">
                <p className="text-xl md:text-2xl font-medium leading-tight text-white/60 italic">
                  No creamos páginas, construimos portales interactivos que elevan tu marca a una dimensión inigualable.
                </p>
              </div>
            </div>

            {/* Escena 2: Laptop Mockup 3D con Animación de Apertura */}
            <div 
              className="absolute inset-0 flex items-center justify-center transition-all duration-500 ease-out z-20"
              style={{ 
                opacity: laptopOpacity,
                transform: `scale(${laptopScale})`,
                pointerEvents: laptopOpacity < 0.1 ? 'none' : 'auto',
                perspective: '2000px'
              }}
            >
              <div 
                className="relative w-[340px] h-[220px] md:w-[750px] md:h-[480px] transition-transform duration-700 ease-out"
                style={{ 
                  transformStyle: 'preserve-3d',
                  transform: `rotateX(15deg) rotateY(0deg)`
                }}
              >
                {/* Laptop Base (Keyboard Part) */}
                <div className="absolute bottom-0 left-0 w-full h-[15px] md:h-[25px] bg-[#1a1a1a] rounded-b-2xl border-t border-white/10 shadow-[0_20px_50px_rgba(0,0,0,0.5)] z-10" />
                <div className="absolute bottom-0 left-0 w-full h-[15px] md:h-[25px] bg-[#222] transform rotateX(90deg) translateZ(-10px) origin-bottom rounded-xl" />

                {/* Laptop Lid (Screen Part) */}
                <div 
                  className="absolute bottom-[15px] md:bottom-[25px] left-0 w-full h-full origin-bottom transition-all duration-300 ease-out"
                  style={{ 
                    transform: `rotateX(${lidRotation}deg) translateY(-${lidLift}px)`,
                    transformStyle: 'preserve-3d'
                  }}
                >
                  <div className="relative w-full h-full bg-[#111] rounded-2xl border-[6px] md:border-[10px] border-[#333] shadow-[0_0_80px_rgba(0,0,0,0.6)] overflow-hidden">
                    {/* Screen Content */}
                    <div className="absolute inset-0 rounded-lg overflow-hidden bg-[#00001D]">
                      <iframe 
                        src="/preview/web-design" 
                        className="w-full h-full border-none no-scrollbar"
                        title="Naxde Web Design Preview"
                        style={{ opacity: openProgress > 0.2 ? 1 : 0, transition: 'opacity 0.5s' }}
                      />
                    </div>
                    {/* Camera */}
                    <div className="absolute top-2 left-1/2 -translate-x-1/2 w-1.5 h-1.5 rounded-full bg-white/10 z-50" />
                    
                    {/* Glow when opening */}
                    <div 
                      className="absolute inset-0 pointer-events-none z-40 bg-blue-500/5 transition-opacity duration-1000"
                      style={{ opacity: openProgress }}
                    />
                  </div>
                </div>
                
                {/* Floor Shadow */}
                <div 
                  className="absolute -bottom-10 left-1/2 -translate-x-1/2 w-[120%] h-20 bg-black/40 blur-[40px] rounded-full -z-10 transition-all duration-1000"
                  style={{ opacity: laptopOpacity, transform: `scaleX(${0.5 + openProgress * 0.5})` }}
                />
              </div>
            </div>

            {/* Escena 3: Tarjetas de Beneficios Web */}
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
                      <div className="w-10 h-10 rounded-xl bg-blue-500/10 flex items-center justify-center">
                        <benefit.icon className="w-5 h-5 text-blue-400" />
                      </div>
                      <h4 className="font-bold text-sm md:text-base uppercase tracking-widest">{benefit.title}</h4>
                    </div>
                    <p className="text-white/50 text-xs md:text-sm leading-relaxed">{benefit.desc}</p>
                    
                    <div 
                      className={cn(
                        "absolute top-1/2 -translate-y-1/2 w-12 md:w-24 h-px bg-gradient-to-r from-blue-500/50 to-transparent",
                        benefit.side === 'left' ? "left-full ml-4" : "right-full mr-4 rotate-180"
                      )}
                    >
                      <div className="absolute right-0 top-1/2 -translate-y-1/2 w-1.5 h-1.5 rounded-full bg-blue-400 shadow-[0_0_10px_#40C4FF] animate-pulse" />
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Escena Final: Botón CTA Web */}
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
                  className="h-16 md:h-20 px-12 md:px-16 bg-white text-black hover:bg-white/90 rounded-full text-xl md:text-2xl font-black transition-all hover:scale-105 active:scale-95 group shadow-[0_0_40px_rgba(255,255,255,0.2)]"
                >
                  <Globe className="w-6 h-6 md:w-8 md:h-8 mr-3 text-blue-600 group-hover:rotate-12 transition-transform" />
                  Cotizar Proyecto
                  <ArrowRight className="w-6 h-6 md:w-8 md:h-8 ml-3 animate-pulse" />
                </Button>
              </Link>
              <p className="text-[10px] font-black uppercase tracking-[0.4em] text-white/30">
                Diseño que trasciende límites
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
