
"use client"

import React, { useEffect, useState, useCallback } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Smartphone, ArrowRight, Zap, Cpu, LayoutGrid, Search } from 'lucide-react';
import { Button } from '@/components/ui/button';
import useEmblaCarousel from 'embla-carousel-react';
import { cn } from '@/lib/utils';

const HERO_BG_IMAGE = "https://firebasestorage.googleapis.com/v0/b/studio-4920931495-1d74b.firebasestorage.app/o/Elementos%20graficos%2FFondo%20hero.png?alt=media&token=894d096d-5c36-48b8-aa50-cce731f640c4";
const HERO_BG_ASTEROID = "https://firebasestorage.googleapis.com/v0/b/studio-4920931495-1d74b.firebasestorage.app/o/Elementos%20graficos%2FFondo%20hero%20asteroide.png?alt=media&token=63e277da-ee55-444e-8df7-0988e5783ed7";
const HERO_BG_ASTEROID_3 = "https://firebasestorage.googleapis.com/v0/b/studio-4920931495-1d74b.firebasestorage.app/o/Elementos%20graficos%2FFondo%20hero%20asteroide3.png?alt=media&token=27bfd71e-552c-4631-962d-06c60990aecb";

const slides = [
  {
    id: 1,
    badge: "CONSTRUIMOS EL FUTURO",
    title: "PLATAFORMAS QUE TRANSFORMAN NEGOCIOS",
    description: "Software premium con escalabilidad sin límites para toda Latinoamérica. Diseñamos experiencias que cautivan y convierten.",
    ctaPrimary: "Empezar Ahora",
    ctaSecondary: "Ver Proyectos",
    image: "hero-tech",
    icon: Zap,
    accent: "from-[#5200F8]/60", 
    isFirst: true,
  },
  {
    id: 2,
    badge: "CREA HERMOSAS APLICACIONES",
    title: "INTERFAZ DIGITAL DE ALTO IMPACTO",
    description: "Diseñamos experiencias que cautivan y convierten, utilizando los estándares más modernos de diseño de materiales y animaciones inmersivas.",
    ctaPrimary: "Descargar",
    ctaSecondary: "Más información",
    image: "nfc-demo",
    icon: LayoutGrid,
    accent: "from-cyan-500/60",
    isSecond: true,
  },
  {
    id: 3,
    badge: "CREA HERMOSAS APLICACIONES",
    title: "CONTROL DESLIZANTE DE INTERFAZ DE USUARIO",
    description: "Creamos componentes de software con estética futurista y rendimiento extremo. La arquitectura de materiales del mañana, disponible hoy.",
    ctaPrimary: "Descargar",
    ctaSecondary: "Más información",
    image: "project-saas",
    icon: Cpu,
    accent: "from-green-500/60",
    isThird: true,
  }
];

const StarField = () => {
  const [stars, setStars] = useState<{ id: number; top: string; left: string; size: string; duration: string }[]>([]);
  const [shootingStars, setShootingStars] = useState<{ id: number; top: string; left: string; duration: string; delay: string }[]>([]);

  useEffect(() => {
    const starCount = 140;
    const newStars = Array.from({ length: starCount }).map((_, i) => ({
      id: i,
      top: `${Math.random() * 100}%`,
      left: `${Math.random() * 100}%`,
      size: `${Math.random() * 2 + 0.5}px`,
      duration: `${Math.random() * 3 + 2}s`
    }));
    setStars(newStars);

    const shootingCount = 6;
    const newShootingStars = Array.from({ length: shootingCount }).map((_, i) => ({
      id: i,
      top: `${Math.random() * 40}%`,
      left: `${Math.random() * 100 + 40}%`,
      duration: `${Math.random() * 2 + 2}s`,
      delay: `${Math.random() * 10}s`
    }));
    setShootingStars(newShootingStars);
  }, []);

  return (
    <div className="stars-container absolute inset-0 overflow-hidden pointer-events-none z-[5]">
      {stars.map((star) => (
        <div
          key={star.id}
          className="star absolute bg-white rounded-full opacity-40 animate-pulse"
          style={{
            top: star.top,
            left: star.left,
            width: star.size,
            height: star.size,
            animationDuration: star.duration,
            boxShadow: '0 0 4px rgba(255, 255, 255, 0.4)'
          } as any}
        />
      ))}
      {shootingStars.map((ss) => (
        <div
          key={ss.id}
          className="shooting-star absolute h-[1px] bg-gradient-to-r from-white to-transparent opacity-0"
          style={{
            top: ss.top,
            left: ss.left,
            width: '180px',
            animation: `shooting ${ss.duration} linear infinite`,
            animationDelay: ss.delay
          } as any}
        />
      ))}
    </div>
  );
};

export const Hero = () => {
  const [emblaRef, emblaApi] = useEmblaCarousel({ loop: true, duration: 50 });
  const [selectedIndex, setSelectedIndex] = useState(0);

  const onSelect = useCallback(() => {
    if (!emblaApi) return;
    setSelectedIndex(emblaApi.selectedScrollSnap());
  }, [emblaApi]);

  useEffect(() => {
    if (!emblaApi) return;
    onSelect();
    emblaApi.on('select', onSelect);

    const autoplay = setInterval(() => {
      emblaApi.scrollNext();
    }, 10000); 

    return () => {
      emblaApi.off('select', onSelect);
      clearInterval(autoplay);
    };
  }, [emblaApi, onSelect]);

  const scrollToNextSection = () => {
    if (typeof window !== 'undefined') {
      window.scrollTo({
        top: window.innerHeight,
        behavior: 'smooth'
      });
    }
  };

  return (
    <section className="relative min-h-screen flex flex-col bg-[#00001D] overflow-hidden">
      {/* Capa de Imagen de Fondo 1 (Nebulosa) */}
      <div className={cn(
        "absolute inset-0 transition-all duration-[3000ms] ease-out z-0",
        selectedIndex === 0 ? "opacity-100 scale-100" : "opacity-0 scale-95"
      )}>
        <Image 
          src={HERO_BG_IMAGE} 
          alt="Space Nebula Background" 
          fill 
          className="object-cover"
          priority
          quality={100}
        />
        <div className="absolute inset-0 bg-[#00001D]/30 backdrop-blur-[1px]" />
      </div>

      {/* Capa de Imagen de Fondo 2 (Asteroide) - Con Filtro Azul */}
      <div className={cn(
        "absolute inset-0 transition-all duration-[3000ms] ease-out z-0",
        selectedIndex === 1 ? "opacity-100 scale-100" : "opacity-0 scale-95"
      )}>
        <Image 
          src={HERO_BG_ASTEROID} 
          alt="Asteroid Background" 
          fill 
          className="object-cover"
          style={{ filter: 'hue-rotate(190deg) saturate(1.2) brightness(0.9)' }}
          quality={100}
        />
        <div className="absolute inset-0 bg-[#00001D]/40 backdrop-blur-[1px]" />
        <div className="absolute inset-0 bg-blue-500/10 mix-blend-overlay pointer-events-none" />
      </div>

      {/* Capa de Imagen de Fondo 3 (Asteroide 3) */}
      <div className={cn(
        "absolute inset-0 transition-all duration-[3000ms] ease-out z-0",
        selectedIndex === 2 ? "opacity-100 scale-100" : "opacity-0 scale-95"
      )}>
        <Image 
          src={HERO_BG_ASTEROID_3} 
          alt="Deep Space Asteroid Background" 
          fill 
          className="object-cover"
          quality={100}
        />
        <div className="absolute inset-0 bg-[#00001D]/20 backdrop-blur-[1px]" />
      </div>

      <StarField />
      
      <div className={cn(
        "absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[1100px] h-[1100px] rounded-full blur-[200px] pointer-events-none transition-all duration-[1500ms] opacity-30 bg-gradient-to-br",
        slides[selectedIndex].accent,
        "to-transparent z-[6]"
      )} />
      
      <div className="flex-1 overflow-hidden z-10" ref={emblaRef}>
        <div className="flex h-full">
          {slides.map((slide, idx) => (
            <div key={slide.id} className="flex-[0_0_100%] min-w-0 min-h-screen flex items-center relative px-8">
              <div className="max-w-7xl mx-auto w-full grid grid-cols-1 lg:grid-cols-2 gap-16 items-center relative z-10">
                
                <div className={cn(
                  "space-y-8 text-center lg:text-left transition-all duration-1000 delay-300",
                  selectedIndex === idx ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
                )}>
                  <div className="space-y-6">
                    <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/5 border border-white/10 backdrop-blur-md">
                      <span className={cn(
                        "text-[10px] font-bold uppercase tracking-[0.3em]",
                        slide.id === 1 ? "text-[#5200F8]" : slide.id === 2 ? "text-cyan-500" : "text-green-500"
                      )}>
                        {slide.badge}
                      </span>
                    </div>
                    <h1 className="text-4xl md:text-5xl lg:text-6xl font-headline font-bold leading-[1.1] text-white tracking-tight uppercase">
                      {slide.title}
                    </h1>
                    <p className="text-base md:text-lg text-white/50 max-w-xl mx-auto lg:mx-0 leading-relaxed font-medium">
                      {slide.description}
                    </p>
                  </div>

                  <div className="flex flex-wrap justify-center lg:justify-start gap-6 pt-4">
                    <Link href="/contacto">
                      <Button size="lg" className={cn(
                        "h-14 px-10 text-white rounded-full text-lg font-bold transition-all hover:scale-105",
                        slide.id === 1 ? "bg-[#5200F8] hover:bg-[#5200F8]/90 neon-complement" : 
                        slide.id === 2 ? "bg-cyan-500 hover:bg-cyan-600 shadow-[0_0_20px_rgba(6,182,212,0.5)]" : 
                        "bg-green-500 hover:bg-green-600 shadow-[0_0_20px_rgba(34,197,94,0.5)]"
                      )}>
                        {slide.ctaPrimary}
                        <ArrowRight className="w-5 h-5 ml-2" />
                      </Button>
                    </Link>
                    <Link href="/servicios">
                      <Button size="lg" variant="outline" className="h-14 px-10 border-white/10 bg-white/5 hover:bg-white/10 text-white rounded-full text-lg font-bold">
                        {slide.ctaSecondary}
                      </Button>
                    </Link>
                  </div>
                </div>

                <div className={cn(
                  "relative transition-all duration-[1200ms] delay-500 flex justify-center lg:justify-end",
                  selectedIndex === idx ? "opacity-100 scale-100 rotate-0" : "opacity-0 scale-90 rotate-3"
                )}>
                  {slide.isFirst && (
                    <div className="relative w-full max-w-[420px]">
                      <div className="absolute -top-12 -left-12 z-30 glass-panel p-6 rounded-3xl border border-[#5200F8]/30 float-anim-reverse w-48 shadow-glow-complement bg-[#5200F8]/10">
                        <div className="text-[11px] text-white/40 font-bold uppercase mb-2">Metrics</div>
                        <div className="text-3xl font-bold text-white mb-1">98.4%</div>
                        <div className="text-[10px] text-[#5200F8] font-bold tracking-widest">+12% Performance</div>
                        <div className="flex gap-1.5 mt-3 h-10 items-end">
                           {[40, 75, 55, 95, 65, 85].map((h, i) => (
                             <div key={i} className="flex-1 bg-gradient-to-t from-[#5200F8]/60 to-[#5200F8] rounded-t-sm" style={{ height: `${h}%` }} />
                           ))}
                        </div>
                      </div>

                      <div className="absolute top-24 -right-24 z-30 glass-panel overflow-hidden rounded-[2.5rem] border border-white/10 float-anim w-72 shadow-2xl bg-black/60">
                         <div className="p-3">
                           <img 
                            src="https://picsum.photos/seed/naxde-vibe/600/400" 
                            alt="UX Design Preview" 
                            className="w-full h-36 object-cover rounded-[1.8rem]" 
                           />
                         </div>
                         <div className="p-5 space-y-3">
                           <div className="h-2 w-20 bg-[#5200F8]/40 rounded-full" />
                           <div className="text-sm font-bold text-white uppercase tracking-widest">Interface Design</div>
                           <p className="text-[11px] text-white/40 leading-relaxed font-medium">Sistemas de diseño escalables con estética futurista premium.</p>
                         </div>
                      </div>

                      <div className="relative glass-card p-2.5 rounded-[4rem] border border-white/10 overflow-hidden shadow-[0_0_50px_rgba(82,0,248,0.2)] bg-[#00001D]/90 backdrop-blur-3xl scale-110">
                        <div className="absolute top-5 left-1/2 -translate-x-1/2 w-28 h-7 bg-black rounded-full z-40" />
                        <div className="relative aspect-[9/19] w-72 rounded-[3.5rem] overflow-hidden border border-white/5 bg-gradient-to-b from-[#5200F8]/20 to-transparent">
                           <div className="absolute inset-0 flex flex-col items-center justify-center gap-4">
                              <Zap className="w-16 h-16 text-[#5200F8]/20 animate-pulse" />
                           </div>
                        </div>
                      </div>
                    </div>
                  )}

                  {slide.isSecond && (
                    <div className="relative w-full max-w-[420px]">
                      <div className="absolute top-20 -left-16 z-30 glass-panel p-5 rounded-2xl border border-cyan-500/30 float-anim w-44 bg-cyan-950/40 backdrop-blur-xl">
                        <div className="text-[10px] text-cyan-500 font-bold uppercase tracking-widest mb-3">Conversión</div>
                        <div className="flex items-end gap-1.5 h-16">
                           {[30, 60, 45, 80, 50].map((h, i) => (
                             <div key={i} className="flex-1 bg-cyan-500 rounded-t-sm" style={{ height: `${h}%` }} />
                           ))}
                        </div>
                        <div className="mt-3 text-xl font-bold text-white">654</div>
                        <div className="text-[9px] text-cyan-400 font-bold">+22% del objetivo</div>
                      </div>

                      <div className="absolute top-44 -right-16 z-30 glass-panel p-5 rounded-2xl border border-white/10 float-anim-reverse w-56 bg-black/60 backdrop-blur-xl">
                        <div className="h-1.5 w-12 bg-cyan-500/40 rounded-full mb-3" />
                        <div className="text-sm font-bold text-white uppercase tracking-widest mb-2">Titular</div>
                        <p className="text-[10px] text-white/50 leading-relaxed mb-4">Diseñamos experiencias que cautivan y convierten usuarios.</p>
                        <Button size="sm" variant="ghost" className="h-6 text-[9px] font-bold text-cyan-500 uppercase tracking-widest p-0">Acción</Button>
                      </div>

                      <div className="absolute top-0 right-10 z-30 glass-panel px-4 py-2 rounded-full border border-cyan-500/20 float-anim bg-cyan-950/30 flex items-center gap-3">
                         <div className="text-[10px] text-white/80 font-medium">Texto de entrada</div>
                         <Search className="w-3 h-3 text-cyan-500" />
                      </div>

                      <div className="relative glass-card p-2 rounded-[3.5rem] border border-cyan-500/20 overflow-hidden shadow-[0_0_60px_rgba(6,182,212,0.15)] bg-cyan-950/20 backdrop-blur-3xl">
                        <div className="absolute top-4 left-1/2 -translate-x-1/2 w-24 h-6 bg-black rounded-full z-40" />
                        <div className="relative aspect-[9/19] w-72 rounded-[3rem] overflow-hidden border border-white/5 bg-gradient-to-b from-cyan-900/20 to-transparent flex flex-col">
                           <div className="flex-1 flex items-center justify-center">
                              <LayoutGrid className="w-12 h-12 text-cyan-500/20" />
                           </div>
                        </div>
                      </div>
                    </div>
                  )}

                  {slide.isThird && (
                    <div className="relative w-full max-w-[420px]">
                      <div className="absolute top-10 -left-20 z-30 glass-panel p-2 rounded-2xl border border-green-500/20 float-anim bg-green-950/30 flex items-center gap-3">
                         <div className="w-8 h-8 rounded-lg bg-green-500 flex items-center justify-center">
                           <Search className="w-4 h-4 text-white" />
                         </div>
                         <div className="w-32 h-1.5 bg-white/20 rounded-full" />
                      </div>

                      <div className="absolute top-40 -right-20 z-30 glass-panel overflow-hidden rounded-[2rem] border border-green-500/20 float-anim-reverse w-72 bg-black/60 backdrop-blur-xl">
                        <div className="p-4 space-y-4">
                           {[1, 2, 3].map((i) => (
                             <div key={i} className="flex gap-3 group/item transition-colors">
                               <div className="w-12 h-12 rounded-lg bg-green-500/20 flex items-center justify-center shrink-0 overflow-hidden">
                                  <img src={`https://picsum.photos/seed/green-${i}/100/100`} alt="Preview" className="w-full h-full object-cover" />
                               </div>
                               <div className="space-y-1.5">
                                 <div className="h-1.5 w-24 bg-green-500/40 rounded-full" />
                                 <div className="text-[10px] text-white/60 leading-tight">Artículo de tres líneas con descripción dinámica.</div>
                               </div>
                             </div>
                           ))}
                        </div>
                      </div>

                      <div className="relative glass-card p-2.5 rounded-[4rem] border border-green-500/20 overflow-hidden shadow-[0_0_60px_rgba(34,197,94,0.15)] bg-green-950/20 backdrop-blur-3xl scale-110">
                        <div className="absolute top-5 left-1/2 -translate-x-1/2 w-28 h-7 bg-black rounded-full z-40" />
                        <div className="relative aspect-[9/19] w-72 rounded-[3.5rem] overflow-hidden border border-white/5 bg-gradient-to-b from-green-900/40 to-transparent">
                           <div className="absolute inset-x-0 bottom-0 p-6 space-y-4">
                              <div className="h-2 w-3/4 bg-green-500/40 rounded-full" />
                              <div className="h-2 w-1/2 bg-green-500/20 rounded-full" />
                           </div>
                        </div>
                      </div>
                    </div>
                  )}
                </div>

              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="absolute bottom-28 left-1/2 -translate-x-1/2 z-30 flex items-center gap-6">
        {slides.map((_, i) => (
          <button
            key={i}
            onClick={() => emblaApi?.scrollTo(i)}
            className="group relative h-10 w-10 flex items-center justify-center"
          >
            <div className={cn(
              "h-1.5 rounded-full transition-all duration-700",
              selectedIndex === i ? "w-10 bg-primary shadow-[0_0_15px_rgba(248,0,55,0.8)]" : "w-1.5 bg-white/20 group-hover:bg-white/40"
            )} />
          </button>
        ))}
      </div>

      {/* Scroll Indicator */}
      <div className="absolute bottom-10 left-1/2 -translate-x-1/2 z-40 flex flex-col items-center gap-3 cursor-pointer group" onClick={scrollToNextSection}>
        <div className="w-6 h-10 border-2 border-white/10 rounded-full flex justify-center p-1.5 group-hover:border-primary/50 transition-all duration-300">
          <div className="w-1.5 h-2 bg-primary rounded-full animate-bounce shadow-[0_0_8px_var(--brand-accent)]" />
        </div>
        <span className="text-[10px] font-bold uppercase tracking-[0.4em] text-white/40 group-hover:text-primary transition-all duration-300">Desliza</span>
      </div>
    </section>
  );
};
