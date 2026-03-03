
"use client"

import React, { useEffect, useState, useRef } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { ArrowRight, Sparkles, Zap } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';

const CANDY_URL = "https://firebasestorage.googleapis.com/v0/b/studio-4920931495-1d74b.firebasestorage.app/o/Elementos%20graficos%2FAstronauta%20candy.png?alt=media&token=2b444080-0b94-4549-a656-6e67dc038512";

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
      {/* Glows de fondo optimizados para el aterrizaje */}
      <div className="absolute top-1/2 left-1/4 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-primary/10 rounded-full blur-[150px] -z-10" />
      <div className="absolute top-1/2 right-1/4 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-secondary/10 rounded-full blur-[150px] -z-10" />

      <div className="max-w-7xl mx-auto relative z-10">
        <div className="p-12 md:p-24 rounded-[4rem] bg-gradient-to-br from-white/[0.03] to-transparent border border-white/5 relative overflow-hidden group backdrop-blur-sm">
          
          {/* Luz de fondo dinámica */}
          <div className="absolute top-0 right-0 w-[400px] md:w-[600px] h-[400px] md:h-[600px] bg-primary/15 rounded-full blur-[100px] md:blur-[140px] -z-10 transition-transform duration-[3s] -mr-20 -mt-20 group-hover:scale-125" />
          
          <div className="relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            
            {/* Candy volando hacia la escena */}
            <div className={cn(
              "lg:col-span-5 flex flex-col items-center lg:items-start transition-all duration-1000 ease-out",
              isVisible ? "translate-x-0 opacity-100 scale-100" : "-translate-x-20 opacity-0 scale-90"
            )}>
              <div className="relative w-[220px] h-[220px] md:w-[320px] md:h-[320px] animate-float">
                <Image 
                  src={CANDY_URL}
                  alt="Candy Astronauta"
                  fill
                  className="object-contain"
                />
                
                {/* Burbuja de Mensaje de Candy */}
                <div className={cn(
                  "absolute -top-12 -right-4 md:-right-12 max-w-[200px] md:max-w-[240px] p-5 rounded-3xl glass-card border-primary/20 shadow-glow-accent transition-all duration-700 delay-500",
                  isVisible ? "scale-100 opacity-100 translate-y-0" : "scale-50 opacity-0 translate-y-10"
                )}>
                  <p className="text-xs md:text-sm font-bold text-white leading-relaxed italic">
                    "¡Destino alcanzado! 🚀 Hemos recorrido el espacio de nuestras soluciones. Ahora, aterricemos tu visión y transformémosla en realidad."
                  </p>
                  {/* Triángulo de la burbuja */}
                  <div className="absolute bottom-[-8px] left-8 w-4 h-4 bg-[#050515] border-r border-b border-white/5 rotate-45" />
                </div>
              </div>
            </div>

            {/* Contenido del Banner */}
            <div className={cn(
              "lg:col-span-7 space-y-8 text-center lg:text-left transition-all duration-1000 delay-300",
              isVisible ? "translate-y-0 opacity-100" : "translate-y-10 opacity-0"
            )}>
              <div className="space-y-4">
                <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-primary/10 border border-primary/20 backdrop-blur-md mb-2">
                  <Sparkles className="w-4 h-4 text-primary animate-pulse" />
                  <span className="text-[10px] font-black uppercase tracking-[0.3em] text-primary">Misión: Éxito Digital</span>
                </div>
                <h3 className="text-4xl md:text-6xl lg:text-7xl font-headline font-black text-white leading-[0.9] uppercase tracking-tighter">
                  ¿LISTO PARA <br />
                  <span className="text-transparent italic" style={{ WebkitTextStroke: '1.5px white' }}>ATERRIZAR</span> <br />
                  <span className="text-primary">TU PROYECTO?</span>
                </h3>
                <p className="text-lg md:text-xl text-white/50 leading-relaxed max-w-xl mx-auto lg:mx-0 font-medium">
                  Nuestra ingeniería y creatividad están a tu servicio para construir el próximo gran hito digital de tu industria. El viaje apenas comienza.
                </p>
              </div>

              <div className="flex flex-col sm:flex-row justify-center lg:justify-start gap-6">
                <Link href="/contacto">
                  <Button size="lg" className="h-16 md:h-20 px-10 md:px-14 bg-primary hover:bg-primary/90 text-white rounded-full text-xl md:text-2xl font-black neon-accent shadow-glow-accent transition-all hover:scale-105 active:scale-95 group">
                    Iniciar Aterrizaje
                    <ArrowRight className="w-6 h-6 md:w-8 md:h-8 ml-3 group-hover:translate-x-1 transition-transform" />
                  </Button>
                </Link>
                <Link href="/servicios">
                  <Button size="lg" variant="outline" className="h-16 md:h-20 px-10 border-white/10 hover:bg-white/5 text-white rounded-full text-lg md:text-xl font-bold backdrop-blur-md">
                    Conocer Más
                  </Button>
                </Link>
              </div>
            </div>

          </div>
        </div>
      </div>

      <style jsx global>{`
        @keyframes floating {
          0%, 100% { transform: translateY(0) rotate(0deg); }
          50% { transform: translateY(-20px) rotate(2deg); }
        }
        .animate-float {
          animation: floating 5s infinite ease-in-out;
        }
      `}</style>
    </section>
  );
};
