
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

      {/* Decorative Orbital Figure - Continuous Rotation */}
      <div 
        className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-[150vw] h-[150vw] border-[1px] border-white/5 rounded-full pointer-events-none will-change-transform flex items-center justify-center"
        style={{ 
          transform: `translate(-50%, -50%) rotate(${scrollProgress * 360}deg)`,
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

          {/* Right Column: Visual Composition */}
          <div className="relative h-[500px] md:h-[750px] w-full flex items-center justify-center">
            {/* Phone Mockup Background */}
            <div className="relative w-[280px] h-[580px] md:w-[320px] md:h-[650px] bg-gradient-to-b from-[#1A1A3A] to-[#0A0520] rounded-[3.5rem] border border-white/10 shadow-2xl overflow-hidden flex flex-col items-center pt-6">
              {/* Notch */}
              <div className="w-24 h-6 bg-black rounded-full mb-8" />
              <div className="w-full flex-1 flex items-center justify-center opacity-20">
                <Zap className="w-24 h-24 text-primary" />
              </div>
            </div>

            {/* Metrics Card (Floating Top-Left) */}
            <div className="absolute top-10 left-0 md:-left-8 z-20 w-56 md:w-64 glass-panel p-6 rounded-[2rem] border-white/10 shadow-2xl animate-float">
              <div className="space-y-4">
                <div className="space-y-1">
                  <div className="text-3xl md:text-4xl font-black text-white">98.4%</div>
                  <div className="text-[10px] font-black text-[#5200F8] uppercase">+12% Performance</div>
                </div>
                {/* Micro Bar Chart */}
                <div className="flex items-end gap-1.5 h-12 pt-2">
                  {[40, 65, 85, 50, 100, 60, 80].map((h, i) => (
                    <div 
                      key={i} 
                      className="flex-1 bg-gradient-to-t from-[#5200F8] to-[#F80037] rounded-sm transition-all duration-1000" 
                      style={{ height: `${h}%` }}
                    />
                  ))}
                </div>
              </div>
            </div>

            {/* Interface Design Card (Floating Middle-Right) */}
            <div className="absolute bottom-20 -right-4 md:-right-12 z-20 w-64 md:w-80 glass-panel p-4 md:p-5 rounded-[2.5rem] border-white/10 shadow-2xl animate-float" style={{ animationDelay: '1s' }}>
              <div className="space-y-5">
                <div className="aspect-[4/3] rounded-[1.8rem] overflow-hidden bg-white/5 border border-white/10">
                  <img 
                    src="https://images.unsplash.com/photo-1506744038136-46273834b3fb?q=80&w=800" 
                    alt="Interface Preview" 
                    className="w-full h-full object-cover"
                    data-ai-hint="scenic landscape"
                  />
                </div>
                <div className="space-y-2 px-2 pb-2">
                  <div className="w-12 h-1 bg-primary rounded-full mb-3" />
                  <h4 className="text-sm font-black text-white uppercase tracking-wider">Interface Design</h4>
                  <p className="text-[10px] font-medium text-white/40 leading-relaxed">Sistemas de diseño escalables con estética futurista premium.</p>
                </div>
              </div>
            </div>

            {/* Rocky Surface (Bottom Background) */}
            <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[140%] h-40 z-10 pointer-events-none">
              <div 
                className="w-full h-full grayscale brightness-[0.4] contrast-[1.2]"
                style={{ 
                  backgroundImage: 'url("https://images.unsplash.com/photo-1516331138075-f3adc1e149cd?q=80&w=1200")',
                  backgroundSize: 'cover',
                  backgroundPosition: 'top center',
                  maskImage: 'linear-gradient(to top, black 20%, transparent)',
                  WebkitMaskImage: 'linear-gradient(to top, black 20%, transparent)'
                }}
              />
            </div>
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
        @keyframes float {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(-20px); }
        }
        .animate-float {
          animation: float 6s infinite ease-in-out;
        }
      `}</style>
    </section>
  );
};
