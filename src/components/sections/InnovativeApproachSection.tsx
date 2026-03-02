
"use client"

import React, { useEffect, useRef, useState } from 'react';

export const InnovativeApproachSection = () => {
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
      className="py-24 md:py-40 bg-[#F0F4FF] text-black relative overflow-hidden"
    >
      {/* Decorative Cyan Curve - Background line from reference */}
      <div className="absolute inset-0 z-0 pointer-events-none flex items-center justify-end overflow-visible">
        <svg 
          viewBox="0 0 1000 1000" 
          className="w-[100%] h-[100%] transition-transform duration-1000 ease-out opacity-40 translate-x-[20%]"
          style={{ transform: `scale(${1.2 + scrollProgress * 0.1}) rotate(${scrollProgress * 15}deg)` }}
        >
          <path 
            d="M 100,500 C 100,200 400,100 700,300 C 1000,500 900,800 600,900 C 300,1000 100,800 100,500" 
            fill="none" 
            stroke="#40C4FF" 
            strokeWidth="15" 
            strokeLinecap="round"
          />
        </svg>
      </div>

      <div className="max-w-[1600px] mx-auto px-6 md:px-12 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-32 items-center">
          
          {/* Visual Block - Left Side */}
          <div 
            className="relative group transition-all duration-1000"
            style={{ 
              opacity: Math.min(1, scrollProgress * 2),
              transform: `translateX(${(1 - scrollProgress) * -50}px)`
            }}
          >
            <div className="relative aspect-video md:aspect-[4/3] rounded-[2rem] md:rounded-[3rem] overflow-hidden shadow-[0_60px_120px_rgba(0,0,0,0.2)] bg-black border-[12px] border-black/5">
              <img 
                src="https://images.unsplash.com/photo-1451187580459-43490279c0fa?q=80&w=1200" 
                alt="Naxde Technological Vision" 
                className="w-full h-full object-cover grayscale-[0.3] group-hover:grayscale-0 transition-all duration-1000 group-hover:scale-105"
                data-ai-hint="space earth technology"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent" />
              
              {/* Central Glow */}
              <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-32 h-32 bg-primary/20 blur-[60px] rounded-full animate-pulse" />
            </div>
          </div>

          {/* Text Content - Right Side */}
          <div 
            className="max-w-xl space-y-10 transition-all duration-1000 delay-200"
            style={{ 
              opacity: Math.min(1, scrollProgress * 2),
              transform: `translateX(${(1 - scrollProgress) * 50}px)`
            }}
          >
            <div className="space-y-12">
              <p className="text-xl md:text-2xl font-medium leading-[1.6] text-black/80">
                En <span className="font-bold text-primary">Naxde</span>, no seguimos las tendencias sin más. Creemos en un enfoque diferente: uno centrado en ti, tu público y el arte de crear una experiencia memorable y personalizada.
              </p>
              
              <p className="text-xl md:text-2xl font-medium leading-[1.6] text-black/80">
                Nuestro compromiso va más allá de las tendencias pasajeras; se trata de crear plataformas digitales sólidas que transformen negocios y perduren en el tiempo con elegancia y eficiencia.
              </p>
            </div>

            <div className="pt-4 flex items-center gap-6">
              <div className="w-16 h-px bg-black/10" />
              <span className="text-[10px] font-black uppercase tracking-[0.4em] text-primary">Visión de Vanguardia</span>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
};
