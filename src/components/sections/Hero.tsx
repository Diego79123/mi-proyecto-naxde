
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
    badge: "CREA HERMOSAS APLICACIONES",
    title: "Control deslizante de interfaz de usuario de materiales",
    description: "Construimos el futuro de los negocios con software premium y escalabilidad sin límites para toda Latinoamérica.",
    ctaPrimary: "Descargar",
    ctaSecondary: "Más información",
    image: "hero-tech",
    icon: Zap,
    accent: "from-[#5200F8]/40",
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
    accent: "from-[#F80037]/40",
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
    const starCount = 120;
    const newStars = Array.from({ length: starCount }).map((_, i) => ({
      id: i,
      top: `${Math.random() * 100}%`,
      left: `${Math.random() * 100}%`,
      size: `${Math.random() * 2 + 0.5}px`,
      duration: `${Math.random() * 3 + 2}s`
    }));
    setStars(newStars);

    const shootingCount = 5;
    const newShootingStars = Array.from({ length: shootingCount }).map((_, i) => ({
      id: i,
      top: `${Math.random() * 40}%`,
      left: `${Math.random() * 100 + 40}%`,
      duration: `${Math.random() * 2 + 2}s`,
      delay: `${Math.random() * 12}s`
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
            animationDuration: star.duration
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
            width: '150px',
            animation: `shooting ${ss.duration} linear infinite`,
            animationDelay: ss.delay
          }}
        />
      ))}
    </div>
  );
};

export const Hero = () => {
  const [emblaRef, emblaApi] = useEmblaCarousel({ loop: true, duration: 45 });
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
    }, 8000);

    return () => {
      emblaApi.off('select', onSelect);
      clearInterval(autoplay);
    };
  }, [emblaApi, onSelect]);

  return (
    <section className="relative min-h-screen flex flex-col bg-[#00001D] overflow-hidden">
      <StarField />
      
      {/* Dynamic Ambient Backgrounds */}
      <div className={cn(
        "absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[1000px] h-[1000px] rounded-full blur-[180px] pointer-events-none transition-all duration-1500 opacity-30 bg-gradient-to-br",
        slides[selectedIndex].accent,
        "to-transparent"
      )} />

      {/* Decorative Branding */}
      <div className="absolute top-8 left-12 z-50">
        <span className="text-white text-xs font-bold tracking-[0.4em] uppercase opacity-80">MÚSICA</span>
      </div>
      <div className="absolute top-8 right-12 z-50">
        <span className="text-white/40 text-[10px] font-medium tracking-widest uppercase">Hecho con Naxde Studio</span>
      </div>
      <div className="absolute bottom-8 left-12 z-50">
        <Link href="https://instagram.com" target="_blank">
          <Instagram className="w-5 h-5 text-white/50 hover:text-white transition-colors" />
        </Link>
      </div>

      <div className="flex-1 overflow-hidden" ref={emblaRef}>
        <div className="flex h-full">
          {slides.map((slide, idx) => (
            <div key={slide.id} className="flex-[0_0_100%] min-w-0 min-h-screen flex items-center relative px-8">
              <div className="max-w-7xl mx-auto w-full grid grid-cols-1 lg:grid-cols-2 gap-16 items-center relative z-10">
                
                {/* Visual Side (Mockup) */}
                <div className={cn(
                  "relative order-2 lg:order-1 transition-all duration-1000 delay-300",
                  selectedIndex === idx ? "opacity-100 scale-100 translate-x-0" : "opacity-0 scale-95 -translate-x-10"
                )}>
                  {slide.isFirst ? (
                    <div className="relative mx-auto lg:mx-0 max-w-[400px]">
                      {/* Floating UI Elements based on reference image */}
                      <div className="absolute -top-10 -left-10 z-20 glass-panel p-5 rounded-2xl border border-white/10 float-anim-reverse w-40">
                        <div className="text-[10px] text-white/40 font-bold uppercase mb-1">Conversión</div>
                        <div className="text-2xl font-bold text-white mb-1">654</div>
                        <div className="text-[10px] text-primary font-bold">+22% del objetivo</div>
                        <div className="flex gap-1 mt-2 h-8 items-end">
                           {[40, 70, 50, 90, 60].map((h, i) => (
                             <div key={i} className="flex-1 bg-primary/40 rounded-t-[2px]" style={{ height: `${h}%` }} />
                           ))}
                        </div>
                      </div>

                      <div className="absolute top-20 -right-20 z-20 glass-panel overflow-hidden rounded-3xl border border-white/10 float-anim w-64">
                         <div className="p-2">
                           <img 
                            src="https://picsum.photos/seed/naxde-ui/600/400" 
                            alt="UI Content" 
                            className="w-full h-32 object-cover rounded-2xl" 
                            data-ai-hint="futuristic interface"
                           />
                         </div>
                         <div className="p-4 space-y-2">
                           <div className="text-xs font-bold text-white">Titular</div>
                           <div className="text-[10px] text-white/40">Cuerpo del contenido...</div>
                           <p className="text-[9px] text-white/30 leading-tight">Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor.</p>
                           <Button size="sm" variant="link" className="text-primary text-[10px] p-0 h-auto font-bold uppercase tracking-widest">Botón</Button>
                         </div>
                      </div>

                      <div className="absolute -bottom-5 left-10 z-30 glass-panel p-3 rounded-full border border-white/10 float-anim flex items-center gap-3 w-64 shadow-2xl">
                         <div className="w-8 h-8 rounded-full bg-white/5 flex items-center justify-center">
                           <Search className="w-4 h-4 text-white/40" />
                         </div>
                         <div className="flex-1 h-1 bg-white/10 rounded-full" />
                         <div className="w-8 h-8 rounded-full bg-primary flex items-center justify-center">
                           <Play className="w-3 h-3 text-white fill-white" />
                         </div>
                      </div>

                      {/* Main Phone Frame */}
                      <div className="relative glass-card p-2 rounded-[3.5rem] border border-white/10 overflow-hidden shadow-2xl bg-[#00001D]/80 backdrop-blur-xl">
                        <div className="absolute top-4 left-1/2 -translate-x-1/2 w-24 h-6 bg-black rounded-full z-40 flex items-center justify-center gap-1">
                          <div className="w-1.5 h-1.5 rounded-full bg-white/10" />
                        </div>
                        <div className="relative aspect-[9/19] w-full rounded-[3rem] overflow-hidden border border-white/5 bg-gradient-to-b from-white/[0.03] to-transparent">
                           <div className="absolute inset-0 bg-primary/5 flex items-center justify-center">
                              <Smartphone className="w-12 h-12 text-white/10" />
                           </div>
                        </div>
                      </div>
                    </div>
                  ) : (
                    <div className="relative glass-card p-4 rounded-[3rem] border border-white/10 overflow-hidden shadow-2xl">
                      <div className="absolute inset-0 bg-gradient-to-t from-[#00001D] via-transparent to-transparent z-10" />
                      <img 
                        src={PlaceHolderImages.find(i => i.id === slide.image)?.imageUrl} 
                        alt={slide.title} 
                        className="w-full aspect-[4/5] lg:aspect-auto h-auto rounded-[2rem] object-cover grayscale-[0.3] group-hover:grayscale-0 transition-all duration-700"
                        data-ai-hint={slide.image.replace('-', ' ')}
                      />
                    </div>
                  )}
                </div>

                {/* Text Content */}
                <div className={cn(
                  "space-y-8 text-center lg:text-left order-1 lg:order-2 transition-all duration-700 delay-500",
                  selectedIndex === idx ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
                )}>
                  <div className="space-y-4">
                    <span className="text-[11px] font-bold uppercase tracking-[0.3em] text-primary drop-shadow-[0_0_8px_rgba(248,0,55,0.4)]">
                      {slide.badge}
                    </span>
                    <h1 className="text-5xl md:text-6xl lg:text-7xl font-headline font-bold leading-[1.1] text-white tracking-tighter">
                      {slide.title}
                    </h1>
                    <p className="text-lg md:text-xl text-white/50 max-w-xl mx-auto lg:mx-0 leading-relaxed font-medium">
                      {slide.description}
                    </p>
                  </div>

                  <div className="flex flex-wrap justify-center lg:justify-start gap-6 pt-4">
                    <Link href="/contacto">
                      <Button size="lg" className="h-14 px-10 bg-primary hover:bg-primary/90 text-white rounded-full neon-accent text-lg font-bold">
                        {slide.ctaPrimary}
                      </Button>
                    </Link>
                    <Link href="/proyectos">
                      <Button size="lg" variant="outline" className="h-14 px-10 border-white/20 hover:bg-white/10 text-white rounded-full text-lg font-bold">
                        {slide.ctaSecondary}
                      </Button>
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Slider Controls */}
      <div className="absolute bottom-10 left-1/2 -translate-x-1/2 z-30 flex items-center gap-5">
        {slides.map((_, i) => (
          <button
            key={i}
            onClick={() => emblaApi?.scrollTo(i)}
            className={cn(
              "h-1.5 rounded-full transition-all duration-700",
              selectedIndex === i ? "w-16 bg-primary neon-accent shadow-[0_0_12px_rgba(248,0,55,0.6)]" : "w-3 bg-white/10 hover:bg-white/30"
            )}
            aria-label={`Ir a slide ${i + 1}`}
          />
        ))}
      </div>

      {/* Right Scroll Indicator */}
      <div className="absolute bottom-12 right-12 hidden lg:flex flex-col items-center gap-4 opacity-20 hover:opacity-100 transition-opacity">
        <div className="w-[1px] h-16 bg-gradient-to-b from-primary to-transparent" />
        <span className="text-[8px] font-bold uppercase tracking-[0.5em] vertical-text">Scroll</span>
      </div>
    </section>
  );
};
