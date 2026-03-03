
"use client"

import React, { useEffect, useRef, useState } from 'react';
import Link from 'next/link';
import { Smartphone, Globe, Zap, Cpu, ArrowRight } from 'lucide-react';
import { cn } from '@/lib/utils';

const services = [
  {
    title: "Móvil & Web",
    desc: "Plataformas nativas y progresivas con foco en UI/UX futurista y escalabilidad cloud.",
    icon: Smartphone,
  },
  {
    title: "Interactivas",
    desc: "Desarrollo web de alta conversión con animaciones premium y experiencias inmersivas.",
    icon: Globe,
  },
  {
    title: "Ecosistema NFC",
    desc: "Identidad digital inteligente en un solo toque, sin aplicaciones adicionales.",
    icon: Zap,
  },
  {
    title: "IA Aplicada",
    desc: "Integración de modelos LLM para automatizar procesos y transformar la atención.",
    icon: Cpu,
  }
];

export const FeaturedServices = () => {
  const containerRef = useRef<HTMLElement>(null);
  const [scrollProgress, setScrollProgress] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      if (!containerRef.current) return;
      const rect = containerRef.current.getBoundingClientRect();
      const windowHeight = window.innerHeight;
      const totalHeight = rect.height;
      
      // Calculate progress from 0 to 1 as we scroll through the 250vh section
      const progress = Math.max(0, Math.min(1, -rect.top / (totalHeight - windowHeight)));
      setScrollProgress(progress);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();

    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Animación de las escenas:
  // 0.0 - 0.4: Escena 1 (Texto centrado)
  // 0.4 - 0.6: Transición
  // 0.6 - 1.0: Escena 2 (Celular centrado)
  
  const textOpacity = Math.max(0, 1 - scrollProgress * 2.5); // Desaparece al 40% del scroll
  const mockupOpacity = Math.max(0, (scrollProgress - 0.4) * 2.5); // Aparece después del 40% del scroll
  
  const textScale = 1.1 - scrollProgress * 0.1;
  const mockupScale = 0.9 + (scrollProgress * 0.1);

  return (
    <section 
      ref={containerRef}
      id="featured-services"
      className="relative h-[250vh] bg-[#00001D] text-white"
    >
      <div className="sticky top-0 h-screen overflow-hidden">
        
        {/* Background Nebula */}
        <div className="absolute inset-0 z-0 pointer-events-none opacity-40">
          <div className="absolute top-[20%] right-[-10%] w-[70%] h-[60%] bg-purple-600/10 blur-[150px] rounded-full" />
          <div className="absolute bottom-[10%] left-[-5%] w-[60%] h-[50%] bg-[#F80037]/5 blur-[120px] rounded-full" />
        </div>

        {/* Decorative Orbital Figure */}
        <div 
          className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-[150vw] h-[150vw] border-[1px] border-white/5 rounded-full pointer-events-none flex items-center justify-center opacity-20"
        >
          <div className="w-[85%] h-[85%] border-[30px] md:border-[80px] border-white/5 rounded-full animate-float-slow" />
        </div>
        
        <div className="max-w-7xl mx-auto px-6 relative z-10 w-full h-full flex items-center justify-center">
          
          <div className="relative w-full h-full max-w-5xl flex items-center justify-center">
            
            {/* Escena 1: Texto Monumental Centrado */}
            <div 
              className="absolute inset-0 flex flex-col items-center justify-center text-center space-y-8 transition-all duration-500 ease-out"
              style={{ 
                opacity: textOpacity,
                transform: `scale(${textScale})`,
                pointerEvents: textOpacity < 0.1 ? 'none' : 'auto'
              }}
            >
              <span className="inline-block px-4 py-1.5 rounded-full border border-primary/30 text-[10px] font-black uppercase tracking-[0.3em] text-primary bg-primary/5 backdrop-blur-sm">
                Prototipo en Tiempo Real
              </span>
              
              <h2 className="font-black leading-[0.85] tracking-tighter uppercase select-none text-6xl sm:text-8xl md:text-[10rem] lg:text-[12rem]">
                <div>EXPERIENCIA</div>
                <div className="text-transparent" style={{ WebkitTextStroke: '1.5px white' }}>INTERACTIVA</div>
                <div>PROTOTIPO</div>
              </h2>

              <div className="max-w-2xl mx-auto">
                <p className="text-xl md:text-2xl font-medium leading-tight text-white/60 italic">
                  Interactúa con nuestra tecnología Neocard. Este es un prototipo funcional del ecosistema que construimos para líderes y empresas de alto nivel.
                </p>
              </div>
            </div>

            {/* Escena 2: Mockup Interactivo Centrado */}
            <div 
              className="absolute inset-0 flex items-center justify-center transition-all duration-500 ease-out"
              style={{ 
                opacity: mockupOpacity,
                transform: `scale(${mockupScale}) translateY(${(1 - scrollProgress) * 40}px)`,
                pointerEvents: mockupOpacity < 0.1 ? 'none' : 'auto'
              }}
            >
              <div className="relative w-[280px] h-[580px] md:w-[360px] md:h-[720px] bg-black rounded-[3.5rem] border-[12px] border-white/10 shadow-[0_0_120px_rgba(0,0,0,0.9)] overflow-hidden z-20 group">
                
                {/* Dynamic Island */}
                <div className="absolute top-0 left-1/2 -translate-x-1/2 w-36 h-8 bg-black rounded-b-[2rem] z-50 flex items-center justify-center gap-3">
                  <div className="w-12 h-1.5 bg-white/5 rounded-full" />
                  <div className="w-2.5 h-2.5 bg-white/10 rounded-full" />
                </div>

                {/* Iframe Content */}
                <div className="absolute inset-0 rounded-[2.8rem] overflow-hidden bg-[#00001D]">
                  <iframe 
                    src="/tarjetas-neocard/oscar-rivera?mode=mockup" 
                    className="border-none select-none no-scrollbar origin-top-left"
                    title="Oscar Rivera Neocard Prototype"
                    style={{ 
                      width: '111.11%',
                      height: '111.11%',
                      transform: 'scale(0.9)',
                      scrollbarWidth: 'none',
                      msOverflowStyle: 'none'
                    }}
                  />
                </div>

                <div className="absolute inset-0 pointer-events-none z-40 bg-gradient-to-tr from-white/[0.02] via-transparent to-white/[0.05]" />
                
                {/* Device Hardware Buttons */}
                <div className="absolute -left-[12px] top-32 w-[4px] h-16 bg-white/20 rounded-r-lg shadow-lg" />
                <div className="absolute -right-[12px] top-24 w-[4px] h-24 bg-white/20 rounded-l-lg shadow-lg" />
                <div className="absolute -right-[12px] top-52 w-[4px] h-12 bg-white/20 rounded-l-lg shadow-lg" />
              </div>

              {/* Background Glow */}
              <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-primary/20 rounded-full blur-[140px] -z-10 animate-pulse" />
            </div>

          </div>
        </div>
      </div>

      {/* Services Bottom Grid - Aparece solo al final del recorrido */}
      <div className={cn(
        "relative z-30 max-w-7xl mx-auto px-6 pb-24 transition-all duration-1000",
        scrollProgress < 0.9 ? "opacity-0 translate-y-20" : "opacity-100 translate-y-0"
      )}>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-12 md:gap-16 border-t border-white/10 pt-16">
          {services.map((service, idx) => (
            <div key={idx} className="group space-y-6">
              <div className="w-14 h-14 rounded-full border border-white/10 bg-white/5 flex items-center justify-center group-hover:bg-primary group-hover:text-white transition-all duration-500 group-hover:scale-110 group-hover:border-primary group-hover:shadow-[0_0_20px_rgba(248,0,55,0.3)]">
                <service.icon className="w-6 h-6" />
              </div>
              
              <div className="space-y-3">
                <h4 className="text-2xl font-black uppercase tracking-tight leading-none group-hover:text-primary transition-colors">{service.title}</h4>
                <p className="text-white/40 text-sm font-medium leading-relaxed group-hover:text-white/60 transition-colors">{service.desc}</p>
              </div>

              <div className="pt-4">
                <Link href="/servicios" className="inline-flex items-center gap-3 text-white/60 font-black text-xs uppercase tracking-[0.2em] hover:text-primary hover:gap-5 transition-all group/link">
                  Ver Detalles
                  <ArrowRight className="w-4 h-4 text-primary" />
                </Link>
              </div>
            </div>
          ))}
        </div>
      </div>

      <style jsx global>{`
        @keyframes float-slow {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(-30px); }
        }
        .animate-float-slow {
          animation: float-slow 10s infinite ease-in-out;
        }
        .no-scrollbar::-webkit-scrollbar {
          display: none;
        }
      `}</style>
    </section>
  );
};
