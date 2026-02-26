
"use client"

import React, { useEffect, useState, useCallback } from 'react';
import Link from 'next/link';
import { Smartphone, ArrowRight, Zap, Cpu, MousePointer2, Instagram, BarChart3, Search, Play, LayoutGrid } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { PlaceHolderImages } from '@/lib/placeholder-images';
import useEmblaCarousel from 'embla-carousel-react';
import { cn } from '@/lib/utils';

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
    accent: "from-[#5200F8]/60", // Morado intenso
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
    accent: "from-cyan-500/60", // Teal / Cian
    isSecond: true,
  },
  {
    id: 3,
    badge: "IA & AUTOMATIZACIÓN",
    title: "INTELIGENCIA QUE ESCALA TU NEGOCIO.",
    description: "Integramos modelos de IA generativa para optimizar procesos y crear ventajas competitivas reales.",
    ctaPrimary: "Consultoría IA",
    ctaSecondary: "Explorar IA",
    image: "team-collab",
    icon: Cpu,
    accent: "from-[#F80037]/40", // Rojo acento
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
    <div className="stars-container absolute inset-0 overflow-hidden pointer-events-none">
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
            boxShadow: '0 0 4px rgba(82, 0, 248, 0.4)'
          }}
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
          }}
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
    }, 9000);

    return () => {
      emblaApi.off('select', onSelect);
      clearInterval(autoplay);
    };
  }, [emblaApi, onSelect]);

  return (
    <section className="relative min-h-screen flex flex-col bg-[#00001D] overflow-hidden">
      <StarField />
      
      {/* Ambient Background Light - Sincronizado con el slide */}
      <div className={cn(
        "absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[1100px] h-[1100px] rounded-full blur-[180px] pointer-events-none transition-all duration-1500 opacity-40 bg-gradient-to-br",
        slides[selectedIndex].accent,
        "to-transparent"
      )} />

      <div className="absolute top-10 left-12 z-50">
        <span className="text-white/40 text-[10px] font-bold tracking-[0.6em] uppercase">NAXDE HUB</span>
      </div>
      <div className="absolute top-10 right-12 z-50 flex items-center gap-3">
        <div className="w-2 h-2 rounded-full bg-primary animate-pulse shadow-[0_0_10px_#F80037]" />
        <span className="text-white/60 text-[9px] font-medium tracking-[0.2em] uppercase">Status: Live</span>
      </div>

      <div className="flex-1 overflow-hidden" ref={emblaRef}>
        <div className="flex h-full">
          {slides.map((slide, idx) => (
            <div key={slide.id} className="flex-[0_0_100%] min-w-0 min-h-screen flex items-center relative px-8">
              <div className="max-w-7xl mx-auto w-full grid grid-cols-1 lg:grid-cols-2 gap-16 items-center relative z-10">
                
                {/* Text Content */}
                <div className={cn(
                  "space-y-10 text-center lg:text-left transition-all duration-1000 delay-300",
                  selectedIndex === idx ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
                )}>
                  <div className="space-y-6">
                    <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/5 border border-white/10 backdrop-blur-md">
                      <span className="text-[10px] font-bold uppercase tracking-[0.3em] text-primary">
                        {slide.badge}
                      </span>
                    </div>
                    <h1 className="text-5xl md:text-6xl lg:text-8xl font-headline font-bold leading-[1] text-white tracking-tighter">
                      {slide.title}
                    </h1>
                    <p className="text-lg md:text-2xl text-white/50 max-w-xl mx-auto lg:mx-0 leading-relaxed font-medium">
                      {slide.description}
                    </p>
                  </div>

                  <div className="flex flex-wrap justify-center lg:justify-start gap-6 pt-4">
                    <Link href="/contacto">
                      <Button size="lg" className={cn(
                        "h-16 px-12 text-white rounded-full text-xl font-bold transition-all hover:scale-105",
                        slide.id === 2 ? "bg-cyan-500 hover:bg-cyan-600 shadow-[0_0_20px_rgba(6,182,212,0.5)]" : "bg-primary hover:bg-primary/90 neon-accent"
                      )}>
                        {slide.ctaPrimary}
                        <ArrowRight className="w-5 h-5 ml-2" />
                      </Button>
                    </Link>
                    <Link href="/servicios">
                      <Button size="lg" variant="outline" className="h-16 px-12 border-white/10 bg-white/5 hover:bg-white/10 text-white rounded-full text-xl font-bold">
                        {slide.ctaSecondary}
                      </Button>
                    </Link>
                  </div>
                </div>

                {/* Visual Side */}
                <div className={cn(
                  "relative transition-all duration-1200 delay-500 flex justify-center lg:justify-end",
                  selectedIndex === idx ? "opacity-100 scale-100 rotate-0" : "opacity-0 scale-90 rotate-3"
                )}>
                  {slide.isFirst && (
                    <div className="relative w-full max-w-[420px]">
                      <div className="absolute -top-12 -left-12 z-30 glass-panel p-6 rounded-3xl border border-primary/30 float-anim-reverse w-48 shadow-glow-complement bg-[#5200F8]/10">
                        <div className="text-[11px] text-white/40 font-bold uppercase mb-2">Metrics</div>
                        <div className="text-3xl font-bold text-white mb-1">98.4%</div>
                        <div className="text-[10px] text-primary font-bold tracking-widest">+12% Performance</div>
                        <div className="flex gap-1.5 mt-3 h-10 items-end">
                           {[40, 75, 55, 95, 65, 85].map((h, i) => (
                             <div key={i} className="flex-1 bg-gradient-to-t from-primary/60 to-primary rounded-t-sm" style={{ height: `${h}%` }} />
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
                           <div className="h-2 w-20 bg-primary/40 rounded-full" />
                           <div className="text-sm font-bold text-white uppercase tracking-widest">Interface Design</div>
                           <p className="text-[11px] text-white/40 leading-relaxed font-medium">Sistemas de diseño escalables con estética futurista premium.</p>
                         </div>
                      </div>

                      <div className="relative glass-card p-2.5 rounded-[4rem] border border-white/10 overflow-hidden shadow-[0_0_50px_rgba(82,0,248,0.2)] bg-[#00001D]/90 backdrop-blur-3xl scale-110">
                        <div className="absolute top-5 left-1/2 -translate-x-1/2 w-28 h-7 bg-black rounded-full z-40" />
                        <div className="relative aspect-[9/19] w-full rounded-[3.5rem] overflow-hidden border border-white/5 bg-gradient-to-b from-[#5200F8]/10 via-transparent to-transparent">
                           <div className="absolute inset-0 flex flex-col items-center justify-center gap-4">
                              <Zap className="w-16 h-16 text-primary/20 animate-pulse" />
                           </div>
                        </div>
                      </div>
                    </div>
                  )}

                  {slide.isSecond && (
                    <div className="relative w-full max-w-[420px]">
                      {/* Elementos flotantes estilo Slide 2 (Teal) */}
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

                      {/* Smartphone Frame (Teal) */}
                      <div className="relative glass-card p-2 rounded-[3.5rem] border border-cyan-500/20 overflow-hidden shadow-[0_0_60px_rgba(6,182,212,0.15)] bg-cyan-950/20 backdrop-blur-3xl">
                        <div className="absolute top-4 left-1/2 -translate-x-1/2 w-24 h-6 bg-black rounded-full z-40" />
                        <div className="relative aspect-[9/19] w-72 rounded-[3rem] overflow-hidden border border-white/5 bg-gradient-to-b from-cyan-900/20 to-transparent flex flex-col">
                           <div className="flex-1 flex items-center justify-center">
                              <LayoutGrid className="w-12 h-12 text-cyan-500/20" />
                           </div>
                           {/* Bottom Navigation Mock */}
                           <div className="h-14 border-t border-white/5 bg-white/5 backdrop-blur-md flex items-center justify-around px-4">
                              {[1,2,3,4].map(i => <div key={i} className="w-2 h-2 rounded-full bg-cyan-500/20" />)}
                           </div>
                        </div>
                      </div>
                    </div>
                  )}

                  {!slide.isFirst && !slide.isSecond && (
                    <div className="relative glass-card p-6 rounded-[3.5rem] border border-white/10 overflow-hidden shadow-2xl max-w-md ml-auto">
                      <div className="absolute inset-0 bg-gradient-to-t from-[#00001D] via-transparent to-transparent z-10" />
                      <img 
                        src={PlaceHolderImages.find(i => i.id === slide.image)?.imageUrl} 
                        alt={slide.title} 
                        className="w-full aspect-[4/5] rounded-[2.5rem] object-cover grayscale-[0.2]"
                      />
                    </div>
                  )}
                </div>

              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Modern Slider Controls */}
      <div className="absolute bottom-12 left-1/2 -translate-x-1/2 z-30 flex items-center gap-6">
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
    </section>
  );
};
