
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
  const sectionRef = useRef<HTMLElement>(null);
  const [scrollProgress, setScrollProgress] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      if (!sectionRef.current) return;
      
      const rect = sectionRef.current.getBoundingClientRect();
      const windowHeight = window.innerHeight;
      
      // Calculamos cuánto de la sección ha cruzado el viewport
      // 0: Justo entrando por abajo | 1: Completamente en el centro/saliendo
      const start = windowHeight;
      const end = -rect.height;
      const current = rect.top;
      
      const progress = Math.max(0, Math.min(1, (start - current) / (windowHeight + rect.height * 0.5)));
      setScrollProgress(progress);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll(); // Inicializar

    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Funciones auxiliares para calcular transformaciones basadas en el progreso
  const getTransform = (startProgress: number, speed: number = 100) => {
    const p = Math.max(0, scrollProgress - startProgress) / (1 - startProgress);
    const eased = p * p * (3 - 2 * p); 
    
    return {
      translateY: (1 - eased) * speed,
      opacity: eased,
      scale: 0.95 + (eased * 0.05),
      blur: (1 - eased) * 10
    };
  };

  return (
    <section 
      ref={sectionRef}
      className="py-24 md:py-40 bg-white text-black relative overflow-hidden min-h-screen flex flex-col justify-center"
    >
      {/* Decorative Figure - Rotación cinemática monumental que envuelve toda la pantalla */}
      <div 
        className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-[150vw] h-[150vw] border-[1px] border-[#5200F8]/10 rounded-full pointer-events-none will-change-transform flex items-center justify-center"
        style={{ 
          transform: `translate(-50%, -50%) scale(${0.7 + scrollProgress * 0.3}) rotate(${scrollProgress * 360}deg)`,
          opacity: Math.sin(scrollProgress * Math.PI), // Efecto de campana: aparece al inicio y desaparece al final
          filter: `blur(${(1 - Math.sin(scrollProgress * Math.PI)) * 20}px)`
        }}
      >
        {/* Aro secundario interno para mayor complejidad */}
        <div 
          className="w-[85%] h-[85%] border-[30px] md:border-[80px] border-[#5200F8]/5 rounded-full"
          style={{ transform: `rotate(${scrollProgress * -180}deg)` }}
        />
        
        {/* Destellos en el perímetro del círculo */}
        <div className="absolute inset-0 flex items-center justify-center">
           <div className="w-4 h-4 bg-[#5200F8] rounded-full blur-md animate-pulse absolute top-0" />
           <div className="w-4 h-4 bg-[#F80037] rounded-full blur-md animate-pulse absolute bottom-0" />
        </div>
      </div>
      
      <div className="max-w-7xl mx-auto px-6 relative z-10 w-full">
        <div className="flex flex-col gap-12 mb-24 md:mb-32">
          <div className="space-y-6">
            <span 
              className="inline-block px-4 py-1.5 rounded-full border border-black/10 text-[10px] font-black uppercase tracking-[0.3em] text-[#5200F8] transition-all duration-500 will-change-transform"
              style={{ 
                transform: `translateY(${(1 - scrollProgress) * 30}px)`,
                opacity: scrollProgress 
              }}
            >
              Ecosistema Naxde
            </span>
            
            <h2 className="text-[12vw] md:text-[9vw] font-black leading-[0.85] tracking-tighter uppercase select-none">
              {/* Línea 1: Ensamblaje desde la izquierda */}
              <div 
                className="transition-all duration-700 ease-out will-change-transform"
                style={{ 
                  transform: `translateX(${(1 - scrollProgress) * -120}px)`,
                  opacity: scrollProgress,
                  filter: `blur(${(1 - scrollProgress) * 8}px)`
                }}
              >
                MÁS ALLÁ
              </div>
              {/* Línea 2: Ensamblaje desde la derecha con estilo Outline */}
              <div 
                className="text-transparent transition-all duration-1000 delay-100 ease-out will-change-transform"
                style={{ 
                  WebkitTextStroke: '1.5px black',
                  transform: `translateX(${(1 - scrollProgress) * 120}px)`,
                  opacity: scrollProgress,
                  filter: `blur(${(1 - scrollProgress) * 10}px)`
                }}
              >
                DE LAS VISIONES
              </div>
              {/* Línea 3: Ensamblaje desde abajo */}
              <div 
                className="transition-all duration-700 delay-200 ease-out will-change-transform"
                style={{ 
                  transform: `translateY(${(1 - scrollProgress) * 100}px)`,
                  opacity: scrollProgress,
                  filter: `blur(${(1 - scrollProgress) * 6}px)`
                }}
              >
                AL ALCANCE
              </div>
            </h2>
          </div>
          
          <div 
            className="max-w-3xl transition-all duration-1000 ease-out will-change-transform"
            style={{ 
              transform: `translateY(${(1 - scrollProgress) * 40}px)`,
              opacity: scrollProgress 
            }}
          >
            <p className="text-xl md:text-3xl font-medium leading-tight text-black/70 italic">
              Combinamos ingeniería de alto nivel con diseño vanguardista para crear productos que dominan el mercado digital.
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-12 md:gap-16 border-t border-black/5 pt-16">
          {services.map((service, idx) => {
            const cardStyle = getTransform(0.1 + (idx * 0.05), 80);
            return (
              <div 
                key={idx} 
                className="group space-y-6 transition-all duration-500 ease-out will-change-transform"
                style={{ 
                  transform: `translateY(${cardStyle.translateY}px) scale(${cardStyle.scale})`,
                  opacity: cardStyle.opacity,
                  filter: `blur(${cardStyle.blur}px)`
                }}
              >
                <div className="w-14 h-14 rounded-full border border-black/10 flex items-center justify-center group-hover:bg-black group-hover:text-white transition-all duration-500 group-hover:scale-110">
                  <service.icon className="w-6 h-6" />
                </div>
                
                <div className="space-y-3">
                  <h4 className="text-2xl font-black uppercase tracking-tight leading-none group-hover:text-[#5200F8] transition-colors">{service.title}</h4>
                  <p className="text-black/50 text-sm font-medium leading-relaxed">{service.desc}</p>
                </div>

                <div className="pt-4">
                  <Link href="/servicios" className="inline-flex items-center gap-3 text-black font-black text-xs uppercase tracking-[0.2em] hover:gap-5 transition-all group/link">
                    Explorar
                    <ArrowRight className="w-4 h-4 text-[#5200F8]" />
                  </Link>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
