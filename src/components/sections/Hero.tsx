
"use client"

import React, { useEffect, useState, useCallback } from 'react';
import Link from 'next/link';
import { Smartphone, ArrowRight, Zap, Cpu, MousePointer2, Instagram, BarChart3, Search, Play } from 'lucide-react';
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
    badge: "TECNOLOGÍA NFC",
    title: "TU IDENTIDAD DIGITAL EN UN SOLO TOQUE.",
    description: "La evolución del networking ya está aquí. Tarjetas inteligentes vinculadas a tu ecosistema digital profesional.",
    ctaPrimary: "Pedir mi Tarjeta",
    ctaSecondary: "Saber más",
    image: "nfc-demo",
    icon: Smartphone,
    accent: "from-[#F80037]/40", // Rojo acento
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
    accent: "from-cyan-500/40",
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
            boxShadow: '0 0 4px rgba(82, 0, 248, 0.4)' // Sutil resplandor morado
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

      {/* Decorative Brand Labels */}
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
                      <Button size="lg" className="h-16 px-12 bg-primary hover:bg-primary/90 text-white rounded-full neon-accent text-xl font-bold transition-all hover:scale-105">
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

                {/* Visual Side (Mockups with Floating Animation) */}
                <div className={cn(
                  "relative transition-all duration-1200 delay-500",
                  selectedIndex === idx ? "opacity-100 scale-100 rotate-0" : "opacity-0 scale-90 rotate-3"
                )}>
                  {slide.isFirst ? (
                    <div className="relative mx-auto lg:ml-auto max-w-[420px]">
                      {/* Floating UI Elements matching the Reference Image */}
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
                            data-ai-hint="futuristic interface"
                           />
                         </div>
                         <div className="p-5 space-y-3">
                           <div className="h-2 w-20 bg-primary/40 rounded-full" />
                           <div className="text-sm font-bold text-white uppercase tracking-widest">Interface Design</div>
                           <p className="text-[11px] text-white/40 leading-relaxed font-medium">Sistemas de diseño escalables con estética futurista premium.</p>
                           <div className="flex justify-between items-center pt-2">
                              <div className="flex -space-x-2">
                                {[1,2,3].map(i => <div key={i} className="w-6 h-6 rounded-full border border-white/20 bg-white/10" />)}
                              </div>
                              <Button size="sm" variant="ghost" className="text-primary text-[10px] p-0 h-auto font-bold uppercase tracking-[0.2em]">Explore</Button>
                           </div>
                         </div>
                      </div>

                      <div className="absolute -bottom-8 left-12 z-40 glass-panel p-4 rounded-full border border-primary/20 float-anim flex items-center gap-4 w-72 shadow-glow-accent bg-[#00001D]/90">
                         <div className="w-10 h-10 rounded-full bg-primary flex items-center justify-center">
                           <Play className="w-4 h-4 text-white fill-white" />
                         </div>
                         <div className="flex-1 space-y-2">
                           <div className="h-1.5 w-full bg-white/10 rounded-full overflow-hidden">
                              <div className="h-full w-2/3 bg-primary" />
                           </div>
                           <div className="flex justify-between text-[8px] font-bold text-white/30 uppercase tracking-widest">
                              <span>02:45</span>
                              <span>Play Reel</span>
                           </div>
                         </div>
                      </div>

                      {/* Central Mobile Frame */}
                      <div className="relative glass-card p-2.5 rounded-[4rem] border border-white/10 overflow-hidden shadow-[0_0_50px_rgba(82,0,248,0.2)] bg-[#00001D]/90 backdrop-blur-3xl scale-110">
                        <div className="absolute top-5 left-1/2 -translate-x-1/2 w-28 h-7 bg-black rounded-full z-40 flex items-center justify-center">
                          <div className="w-2 h-2 rounded-full bg-white/5" />
                        </div>
                        <div className="relative aspect-[9/19] w-full rounded-[3.5rem] overflow-hidden border border-white/5 bg-gradient-to-b from-[#5200F8]/10 via-transparent to-transparent">
                           <div className="absolute inset-0 bg-primary/5 flex flex-col items-center justify-center gap-4">
                              <Zap className="w-16 h-16 text-primary/20 animate-pulse" />
                              <div className="space-y-2 text-center">
                                <div className="h-1 w-20 bg-primary/20 rounded-full mx-auto" />
                                <div className="h-1 w-12 bg-primary/10 rounded-full mx-auto" />
                              </div>
                           </div>
                        </div>
                      </div>
                    </div>
                  ) : (
                    <div className="relative glass-card p-6 rounded-[3.5rem] border border-white/10 overflow-hidden shadow-2xl max-w-md ml-auto">
                      <div className="absolute inset-0 bg-gradient-to-t from-[#00001D] via-transparent to-transparent z-10" />
                      <img 
                        src={PlaceHolderImages.find(i => i.id === slide.image)?.imageUrl} 
                        alt={slide.title} 
                        className="w-full aspect-[4/5] rounded-[2.5rem] object-cover grayscale-[0.2] transition-all duration-700"
                        data-ai-hint={slide.image.replace('-', ' ')}
                      />
                      <div className="absolute bottom-10 left-10 z-20 space-y-2">
                        <div className="px-3 py-1 rounded-full bg-primary/20 border border-primary/30 backdrop-blur-xl inline-block">
                           <span className="text-[10px] font-bold text-primary tracking-widest uppercase">Premium Tech</span>
                        </div>
                        <h4 className="text-2xl font-bold text-white uppercase tracking-tighter">Naxde Solutions</h4>
                      </div>
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
            aria-label={`Go to slide ${i + 1}`}
          >
            <div className={cn(
              "h-1.5 rounded-full transition-all duration-700",
              selectedIndex === i ? "w-10 bg-primary shadow-[0_0_15px_rgba(248,0,55,0.8)]" : "w-1.5 bg-white/20 group-hover:bg-white/40"
            )} />
            <span className={cn(
              "absolute -top-6 text-[10px] font-bold text-white transition-opacity duration-300",
              selectedIndex === i ? "opacity-100" : "opacity-0"
            )}>0{i + 1}</span>
          </button>
        ))}
      </div>

      {/* Decorative Branding / Scroll */}
      <div className="absolute bottom-16 right-16 hidden lg:flex flex-col items-center gap-6 opacity-30 hover:opacity-100 transition-all duration-500">
        <div className="w-[1px] h-20 bg-gradient-to-b from-primary to-transparent" />
        <span className="text-[9px] font-bold uppercase tracking-[0.6em] vertical-text text-white">Discover</span>
      </div>
    </section>
  );
};
