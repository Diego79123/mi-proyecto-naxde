
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

  // Escena 2: Laptop Reveal
  const laptopOpacity = scrollProgress < 0.2 ? 0 : Math.min(1, (scrollProgress - 0.2) * 4) * (1 - Math.max(0, (scrollProgress - 0.95) * 10));
  const laptopBlur = Math.max(0, (0.5 - scrollProgress) * 40);
  const laptopScale = scrollProgress < 0.6 
    ? 0.8 + (scrollProgress * 0.3)
    : 1.1 - ((scrollProgress - 0.6) * 0.1);

  // Escena Final: Botón CTA
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

            {/* Escena 2: Laptop Mockup Inmersiva */}
            <div 
              className="absolute inset-0 flex items-center justify-center transition-all duration-500 ease-out z-20"
              style={{ 
                opacity: laptopOpacity,
                transform: `scale(${laptopScale})`,
                filter: `blur(${laptopBlur}px)`,
                pointerEvents: laptopOpacity < 0.1 ? 'none' : 'auto'
              }}
            >
              <div className="relative w-[340px] h-[220px] md:w-[750px] md:h-[480px] group">
                {/* Laptop Body/Screen */}
                <div className="relative w-full h-full bg-[#1a1a1a] rounded-2xl border-[8px] border-[#333] shadow-[0_0_100px_rgba(0,0,0,0.8)] overflow-hidden">
                  <div className="absolute inset-0 rounded-lg overflow-hidden bg-[#00001D]">
                    <iframe 
                      src="/preview/web-design" 
                      className="w-full h-full border-none no-scrollbar"
                      title="Naxde Web Design Preview"
                    />
                  </div>
                  {/* Camera hole */}
                  <div className="absolute top-2 left-1/2 -translate-x-1/2 w-1.5 h-1.5 rounded-full bg-white/10 z-50" />
                </div>
                
                {/* Laptop Base (Hinge effect) */}
                <div className="absolute -bottom-4 left-1/2 -translate-x-1/2 w-[110%] h-4 bg-gradient-to-b from-[#222] to-black rounded-b-xl border-t border-white/10" />
                
                {/* Screen Glow */}
                <div className="absolute -inset-10 bg-blue-500/10 blur-[80px] rounded-full -z-10 animate-pulse" />
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
