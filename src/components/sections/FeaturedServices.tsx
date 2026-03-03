
"use client"

import React, { useEffect, useRef, useState } from 'react';
import Link from 'next/link';
import { Smartphone, Globe, Zap, Cpu, ArrowRight, CheckCircle2, Leaf, BarChart3, Settings2 } from 'lucide-react';
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

const benefits = [
  { 
    id: 1,
    title: "Networking Pro", 
    desc: "Conecta instantáneamente con un toque NFC.", 
    icon: Zap, 
    side: 'left',
    top: '15%',
    start: 0.60,
    end: 0.75
  },
  { 
    id: 2,
    title: "Eco-Friendly", 
    desc: "Elimina el desperdicio de tarjetas de papel.", 
    icon: Leaf, 
    side: 'right',
    top: '25%',
    start: 0.68,
    end: 0.83
  },
  { 
    id: 3,
    title: "Control Total", 
    desc: "Actualiza tu perfil en tiempo real 24/7.", 
    icon: Settings2, 
    side: 'left',
    top: '55%',
    start: 0.76,
    end: 0.91
  },
  { 
    id: 4,
    title: "Métricas", 
    desc: "Mide el impacto de tu red de contactos.", 
    icon: BarChart3, 
    side: 'right',
    top: '65%',
    start: 0.84,
    end: 0.99
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
      
      const progress = Math.max(0, Math.min(1, -rect.top / (totalHeight - windowHeight)));
      setScrollProgress(progress);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();

    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Animación de las escenas
  // 0.0 - 0.35: Texto monumental
  // 0.30 - 0.65: Transición a Celular
  // 0.60 - 1.0: Beneficios orbitando
  
  const textOpacity = Math.max(0, 1 - scrollProgress * 3); 
  const textBlur = Math.min(20, scrollProgress * 50);
  const textScale = 1.1 - scrollProgress * 0.2;

  const mockupOpacity = scrollProgress < 0.2 ? 0 : Math.min(1, (scrollProgress - 0.2) * 4) * (1 - Math.max(0, (scrollProgress - 0.95) * 10));
  const mockupBlur = Math.max(0, (0.5 - scrollProgress) * 40);
  // El celular se achica un poco cuando aparecen los beneficios para dar aire
  const mockupScale = scrollProgress < 0.6 
    ? 0.85 + (scrollProgress * 0.25)
    : 1.0 - ((scrollProgress - 0.6) * 0.15);

  return (
    <section 
      ref={containerRef}
      id="featured-services"
      className="relative h-[400vh] bg-[#00001D] text-white"
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
          
          <div className="relative w-full h-full flex items-center justify-center">
            
            {/* Escena 1: Texto Monumental */}
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
                Prototipo en Tiempo Real
              </span>
              
              <h2 className="font-black leading-[0.85] tracking-tighter uppercase select-none text-6xl sm:text-8xl md:text-[10rem] lg:text-[12rem]">
                <div>EXPERIENCIA</div>
                <div className="text-transparent" style={{ WebkitTextStroke: '1.5px white' }}>INTERACTIVA</div>
                <div>PROTOTIPO</div>
              </h2>

              <div className="max-w-2xl mx-auto">
                <p className="text-xl md:text-2xl font-medium leading-tight text-white/60 italic">
                  Interactúa con nuestra tecnología Neocard. Un prototipo funcional del ecosistema que construimos para líderes y empresas.
                </p>
              </div>
            </div>

            {/* Escena 2: Mockup Interactivo Centrado */}
            <div 
              className="absolute inset-0 flex items-center justify-center transition-all duration-500 ease-out z-20"
              style={{ 
                opacity: mockupOpacity,
                transform: `scale(${mockupScale})`,
                filter: `blur(${mockupBlur}px)`,
                pointerEvents: mockupOpacity < 0.1 ? 'none' : 'auto'
              }}
            >
              <div className="relative w-[280px] h-[580px] md:w-[340px] md:h-[680px] bg-black rounded-[3.5rem] border-[12px] border-white/10 shadow-[0_0_120px_rgba(0,0,0,0.9)] overflow-hidden group">
                
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

            {/* Escena 3: Tarjetas de Beneficios */}
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
                    
                    {/* Indicador de "Señalamiento" al celular */}
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

          </div>
        </div>
      </div>

      {/* Services Bottom Grid - Transición suave al final */}
      <div className={cn(
        "relative z-40 max-w-7xl mx-auto px-6 pb-24 transition-all duration-1000",
        scrollProgress < 0.92 ? "opacity-0 translate-y-20" : "opacity-100 translate-y-0"
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
