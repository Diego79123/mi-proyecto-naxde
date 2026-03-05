
"use client"

import React, { useEffect, useState, useRef } from 'react';
import Link from 'next/link';
import { ArrowRight, Sparkles, Zap } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';

export const DisruptiveVisionBanner = () => {
  const [isVisible, setIsVisible] = useState(false);
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        }
      },
      { threshold: 0.2 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => observer.disconnect();
  }, []);

  return (
    <section ref={sectionRef} className="pb-24 md:pb-40 bg-[#00001D] px-6 relative overflow-hidden">
      {/* Glows de fondo optimizados */}
      <div className="absolute top-1/2 left-1/4 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-primary/10 rounded-full blur-[150px] -z-10" />
      <div className="absolute top-1/2 right-1/4 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-secondary/10 rounded-full blur-[150px] -z-10" />

      <div className="max-w-7xl mx-auto relative z-10">
        <div className="p-12 md:p-24 rounded-[4rem] bg-gradient-to-br from-white/[0.03] to-transparent border border-white/5 relative overflow-hidden group backdrop-blur-sm">
          
          {/* Luz de fondo dinámica */}
          <div className="absolute top-0 right-0 w-[400px] md:w-[600px] h-[400px] md:h-[600px] bg-primary/15 rounded-full blur-[100px] md:blur-[140px] -z-10 transition-transform duration-[3s] -mr-20 -mt-20 group-hover:scale-125" />
          
          <div className="relative z-10 flex flex-col items-center text-center space-y-10">
            <div className={cn(
              "space-y-8 transition-all duration-1000 delay-300",
              isVisible ? "translate-y-0 opacity-100" : "translate-y-10 opacity-0"
            )}>
              <div className="space-y-6">
                <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-primary/10 border border-primary/20 backdrop-blur-md mb-2">
                  <Sparkles className="w-4 h-4 text-primary animate-pulse" />
                  <span className="text-[10px] font-black uppercase tracking-[0.3em] text-primary">Misión: Éxito Digital</span>
                </div>
                <h3 className="text-5xl md:text-7xl lg:text-8xl font-headline font-black text-white leading-[0.9] uppercase tracking-tighter">
                  ¿LISTO PARA <br />
                  <span className="text-transparent italic" style={{ WebkitTextStroke: '1.5px white' }}>ATERRIZAR</span> <br />
                  <span className="text-primary">TU PROYECTO?</span>
                </h3>
                <p className="text-lg md:text-2xl text-white/50 leading-relaxed max-w-3xl mx-auto font-medium">
                  Nuestra ingeniería y creatividad están a tu servicio para construir el próximo gran hito digital de tu industria. No seguimos el ritmo del mercado, definimos su próxima frecuencia.
                </p>
              </div>

              <div className="flex flex-col sm:flex-row justify-center gap-6 pt-4">
                <Link href="/contacto">
                  <Button size="lg" className="h-16 md:h-24 px-12 md:px-20 bg-primary hover:bg-primary/90 text-white rounded-full text-xl md:text-3xl font-black neon-accent shadow-glow-accent transition-all hover:scale-105 active:scale-95 group">
                    Iniciar Aterrizaje
                    <ArrowRight className="w-6 h-6 md:w-10 md:h-10 ml-4 group-hover:translate-x-2 transition-transform" />
                  </Button>
                </Link>
                <Link href="/servicios">
                  <Button size="lg" variant="outline" className="h-16 md:h-24 px-12 md:px-16 border-white/10 hover:bg-white/5 text-white rounded-full text-xl md:text-2xl font-bold backdrop-blur-md transition-all">
                    Conocer Más
                  </Button>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
