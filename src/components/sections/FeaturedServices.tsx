
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
      const progress = Math.max(0, Math.min(1, (windowHeight - rect.top) / (windowHeight + rect.height)));
      setScrollProgress(progress);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();

    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <section 
      ref={sectionRef}
      id="featured-services"
      className="py-24 md:py-40 bg-[#00001D] text-white relative overflow-hidden min-h-screen flex flex-col justify-center"
    >
      {/* Space Nebula Background Continuity */}
      <div className="absolute inset-0 z-0 pointer-events-none opacity-40">
        <div className="absolute top-[20%] right-[-10%] w-[70%] h-[60%] bg-purple-600/10 blur-[150px] rounded-full animate-pulse duration-[8s]" />
        <div className="absolute bottom-[10%] left-[-5%] w-[60%] h-[50%] bg-[#F80037]/5 blur-[120px] rounded-full animate-pulse duration-[10s] delay-700" />
      </div>

      {/* Decorative Orbital Figure - Static & Floating */}
      <div 
        className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-[150vw] h-[150vw] border-[1px] border-white/5 rounded-full pointer-events-none will-change-transform flex items-center justify-center animate-float-slow"
        style={{ 
          opacity: Math.sin(scrollProgress * Math.PI)
        }}
      >
        <div className="w-[85%] h-[85%] border-[30px] md:border-[80px] border-white/5 rounded-full" />
      </div>
      
      <div className="max-w-7xl mx-auto px-6 relative z-10 w-full">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24 items-center mb-24 md:mb-32">
          
          {/* Left Column: Text Content */}
          <div className="space-y-12">
            <div className="space-y-6">
              <span className="inline-block px-4 py-1.5 rounded-full border border-white/10 text-[10px] font-black uppercase tracking-[0.3em] text-primary bg-white/5 backdrop-blur-sm">
                Ecosistema Naxde
              </span>
              
              <h2 className="text-5xl sm:text-6xl md:text-7xl lg:text-[6rem] font-black leading-[0.9] tracking-tighter uppercase select-none">
                <div>MÁS ALLÁ</div>
                <div className="text-transparent" style={{ WebkitTextStroke: '1.5px white' }}>DE LAS VISIONES</div>
                <div>AL ALCANCE</div>
              </h2>
            </div>
            
            <div className="max-w-xl">
              <p className="text-xl md:text-2xl font-medium leading-tight text-white/60 italic">
                Combinamos ingeniería de alto nivel con diseño vanguardista para crear productos que dominan el mercado digital.
              </p>
            </div>
          </div>

          {/* Right Column: Visual Composition - Real Interactive Prototype */}
          <div className="relative h-[600px] md:h-[850px] w-full flex items-center justify-center">
            {/* Phone Mockup Frame - Completely Static as requested */}
            <div className="relative w-[280px] h-[580px] md:w-[340px] md:h-[680px] bg-black rounded-[3.5rem] border-[10px] border-white/10 shadow-[0_0_100px_rgba(0,0,0,0.8)] overflow-hidden z-20 group">
              
              {/* Notch / Speaker */}
              <div className="absolute top-0 left-1/2 -translate-x-1/2 w-32 h-7 bg-black rounded-b-3xl z-50 flex items-center justify-center gap-2">
                <div className="w-10 h-1 bg-white/5 rounded-full" />
                <div className="w-2 h-2 bg-white/5 rounded-full" />
              </div>

              {/* Screen Content - Interactive Iframe */}
              <div className="absolute inset-0 rounded-[2.8rem] overflow-hidden bg-[#00001D]">
                <iframe 
                  src="/tarjetas-neocard/oscar-rivera" 
                  className="w-full h-full border-none select-none no-scrollbar"
                  title="Oscar Rivera Neocard Prototype"
                  style={{ 
                    scrollbarWidth: 'none',
                    msOverflowStyle: 'none'
                  }}
                />
              </div>

              {/* Reflection Shine */}
              <div className="absolute inset-0 pointer-events-none bg-gradient-to-tr from-white/[0.03] via-transparent to-transparent z-40" />
              
              {/* Device Buttons Decor */}
              <div className="absolute -left-[10px] top-32 w-[3px] h-16 bg-white/10 rounded-r-full" />
              <div className="absolute -right-[10px] top-24 w-[3px] h-24 bg-white/10 rounded-l-full" />
            </div>

            {/* Background Glow for the Phone */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[450px] h-[450px] bg-primary/20 rounded-full blur-[120px] -z-10 animate-pulse" />
          </div>
        </div>

        {/* Services Bottom Grid */}
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
                  Explorar
                  <ArrowRight className="w-4 h-4 text-primary" />
                </Link>
              </div>
            </div>
          ))}
        </div>
      </div>

      <style jsx global>{`
        @keyframes float-slow {
          0%, 100% { transform: translate(-50%, -50%) translateY(0); }
          50% { transform: translate(-50%, -50%) translateY(-30px); }
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
