
"use client"

import React, { useEffect, useRef, useState } from 'react';
import { cn } from '@/lib/utils';

export const MeticulousWorkSection = () => {
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
      <div className="max-w-[1600px] mx-auto px-6 relative">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 md:gap-12 items-center">
          
          {/* Columna Izquierda: Imagen de Producto/Técnica */}
          <div className="relative group overflow-hidden rounded-[2.5rem] md:rounded-[4rem] aspect-[4/3] shadow-[0_40px_100px_rgba(0,0,0,0.1)] transition-transform duration-700 hover:scale-[1.01]">
            <img 
              src="https://images.unsplash.com/photo-1498050108023-c5249f4df085?q=80&w=1200" 
              alt="Naxde Digital Excellence" 
              className="w-full h-full object-cover grayscale-[0.2] group-hover:grayscale-0 transition-all duration-700"
              data-ai-hint="laptop keyboard"
            />
            <div className="absolute inset-0 bg-black/10 group-hover:bg-transparent transition-colors duration-700" />
          </div>

          {/* Columna Derecha: Imagen Orgánica/Artística + Texto Editorial */}
          <div className="relative flex flex-col gap-8">
            <div className="hidden lg:block self-end max-w-xs text-right space-y-4 pr-8">
              <p className="text-[10px] font-black uppercase tracking-[0.3em] text-black/40">Excelencia Naxde</p>
              <p className="text-sm font-bold leading-relaxed text-black/80 uppercase tracking-tighter">
                Uno de nuestros trabajos más apasionadamente elaborados con clientes y amigos, con visión de futuro a lo largo de los años.
              </p>
            </div>
            
            <div className="relative group overflow-hidden rounded-[2.5rem] md:rounded-[4rem] aspect-[4/3] shadow-[0_40px_100px_rgba(0,0,0,0.15)] transition-transform duration-700 hover:scale-[1.01]">
              <img 
                src="https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?q=80&w=1200" 
                alt="Organic Artistic Vision" 
                className="w-full h-full object-cover transition-all duration-700 group-hover:scale-110"
                data-ai-hint="abstract colorful organic"
              />
              <div className="absolute inset-0 bg-gradient-to-tr from-black/20 via-transparent to-transparent" />
            </div>
          </div>
        </div>

        {/* Texto Monumental Solapado */}
        <div 
          className="absolute inset-0 flex items-center justify-center pointer-events-none select-none z-20 overflow-hidden"
          style={{ 
            transform: `translateY(${(scrollProgress - 0.5) * 100}px)`,
            transition: 'transform 0.8s cubic-bezier(0.16, 1, 0.3, 1)'
          }}
        >
          <h2 className="text-[12vw] md:text-[15vw] font-black text-black leading-none tracking-[-0.06em] uppercase flex flex-col items-center">
            <span className="opacity-95">TRABAJO</span>
            <span className="text-transparent -mt-[4vw] ml-[15vw]" style={{ WebkitTextStroke: '2px black' }}>DETALLADO</span>
          </h2>
        </div>
      </div>
    </section>
  );
};
