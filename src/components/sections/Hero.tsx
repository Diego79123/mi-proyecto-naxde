"use client"

import React, { useEffect, useState, useCallback } from 'react';
import Link from 'next/link';
import { Smartphone, ArrowRight, Zap, Cpu, MousePointer2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { PlaceHolderImages } from '@/lib/placeholder-images';
import useEmblaCarousel from 'embla-carousel-react';
import { cn } from '@/lib/utils';

const slides = [
  {
    id: 1,
    badge: "Transformación Digital",
    title: "PLATAFORMAS DIGITALES QUE TRANSFORMAN.",
    description: "Construimos el futuro de los negocios con software premium y escalabilidad sin límites para toda Latinoamérica.",
    ctaPrimary: "Empezar Proyecto",
    ctaSecondary: "Ver Proyectos",
    image: "hero-tech",
    icon: Zap,
    accent: "from-primary/40",
    floatingElements: [
      { id: 'f1', type: 'app', icon: Smartphone, top: '20%', left: '10%' },
      { id: 'f2', type: 'code', icon: Cpu, bottom: '20%', right: '10%' }
    ]
  },
  {
    id: 2,
    badge: "Tecnología NFC",
    title: "TU IDENTIDAD DIGITAL EN UN SOLO TOQUE.",
    description: "La evolución del networking ya está aquí. Tarjetas inteligentes vinculadas a tu ecosistema digital profesional.",
    ctaPrimary: "Pedir mi Tarjeta",
    ctaSecondary: "Saber más",
    image: "nfc-demo",
    icon: Smartphone,
    accent: "from-secondary/40",
    floatingElements: [
      { id: 'f3', type: 'card', icon: Smartphone, top: '15%', right: '15%' },
      { id: 'f4', type: 'contact', icon: MousePointer2, bottom: '25%', left: '15%' }
    ]
  },
  {
    id: 3,
    badge: "IA & Automatización",
    title: "INTELIGENCIA QUE ESCALA TU NEGOCIO.",
    description: "Integramos modelos de IA generativa para optimizar procesos y crear ventajas competitivas reales.",
    ctaPrimary: "Consultoría IA",
    ctaSecondary: "Explorar IA",
    image: "team-collab",
    icon: Cpu,
    accent: "from-cyan-500/40",
    floatingElements: [
      { id: 'f5', type: 'ai', icon: Cpu, top: '30%', right: '20%' },
      { id: 'f6', type: 'nodes', icon: Zap, bottom: '15%', left: '20%' }
    ]
  }
];

const StarField = () => {
  const [stars, setStars] = useState<{ id: number; top: string; left: string; size: string; duration: string }[]>([]);
  const [shootingStars, setShootingStars] = useState<{ id: number; top: string; left: string; duration: string; delay: string }[]>([]);

  useEffect(() => {
    const starCount = 100;
    const newStars = Array.from({ length: starCount }).map((_, i) => ({
      id: i,
      top: `${Math.random() * 100}%`,
      left: `${Math.random() * 100}%`,
      size: `${Math.random() * 2 + 1}px`,
      duration: `${Math.random() * 3 + 2}s`
    }));
    setStars(newStars);

    const shootingCount = 4;
    const newShootingStars = Array.from({ length: shootingCount }).map((_, i) => ({
      id: i,
      top: `${Math.random() * 50}%`,
      left: `${Math.random() * 100 + 50}%`,
      duration: `${Math.random() * 2 + 3}s`,
      delay: `${Math.random() * 10}s`
    }));
    setShootingStars(newShootingStars);
  }, []);

  return (
    <div className="stars-container">
      {stars.map((star) => (
        <div
          key={star.id}
          className="star"
          style={{
            top: star.top,
            left: star.left,
            width: star.size,
            height: star.size,
            '--duration': star.duration
          } as React.CSSProperties}
        />
      ))}
      {shootingStars.map((ss) => (
        <div
          key={ss.id}
          className="shooting-star"
          style={{
            top: ss.top,
            left: ss.left,
            '--duration': ss.duration,
            animationDelay: ss.delay
          } as React.CSSProperties}
        />
      ))}
    </div>
  );
};

export const Hero = () => {
  const [emblaRef, emblaApi] = useEmblaCarousel({ loop: true, duration: 40 });
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
      
      {/* Background Glows that follow current accent */}
      <div className={cn(
        "absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] rounded-full blur-[150px] pointer-events-none transition-all duration-1000 opacity-20 bg-gradient-to-br",
        slides[selectedIndex].accent,
        "to-transparent"
      )} />

      <div className="flex-1 overflow-hidden" ref={emblaRef}>
        <div className="flex h-full">
          {slides.map((slide, idx) => (
            <div key={slide.id} className="flex-[0_0_100%] min-w-0 min-h-screen flex items-center relative px-6">
              <div className="max-w-7xl mx-auto w-full grid grid-cols-1 lg:grid-cols-2 gap-12 items-center relative z-10">
                
                {/* Text Content */}
                <div className={cn(
                  "space-y-8 text-center lg:text-left transition-all duration-700 delay-300",
                  selectedIndex === idx ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
                )}>
                  <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full glass-panel border border-white/10">
                    <slide.icon className="w-4 h-4 text-primary animate-pulse" />
                    <span className="text-xs font-bold uppercase tracking-wider text-white/80">{slide.badge}</span>
                  </div>
                  
                  <h1 className="text-5xl md:text-7xl lg:text-8xl font-headline font-bold leading-[0.95] text-white tracking-tighter">
                    {slide.title.split(' ').map((word, i) => (
                      <React.Fragment key={i}>
                        {word === 'DIGITALES' || word === 'INTELIGENCIA' || word === 'CONTACTO' ? (
                          <span className="text-primary italic">{word} </span>
                        ) : (
                          word + ' '
                        )}
                      </React.Fragment>
                    ))}
                  </h1>
                  
                  <p className="text-lg md:text-xl text-white/60 max-w-xl mx-auto lg:mx-0 leading-relaxed">
                    {slide.description}
                  </p>

                  <div className="flex flex-wrap justify-center lg:justify-start gap-4">
                    <Link href="/contacto">
                      <Button size="lg" className="h-16 px-10 bg-primary hover:bg-primary/90 text-white rounded-full neon-accent text-lg font-bold">
                        {slide.ctaPrimary}
                        <ArrowRight className="w-5 h-5 ml-2" />
                      </Button>
                    </Link>
                    <Link href="/proyectos">
                      <Button size="lg" variant="outline" className="h-16 px-10 border-white/20 hover:bg-white/10 text-white rounded-full text-lg font-bold">
                        {slide.ctaSecondary}
                      </Button>
                    </Link>
                  </div>
                </div>

                {/* Interactive/Visual Side */}
                <div className={cn(
                  "relative group transition-all duration-1000 delay-500",
                  selectedIndex === idx ? "opacity-100 scale-100" : "opacity-0 scale-90"
                )}>
                  {/* Floating Decorators */}
                  {slide.floatingElements.map((el, eIdx) => (
                    <div
                      key={el.id}
                      className={cn(
                        "absolute z-20 glass-panel p-4 rounded-2xl border border-white/10",
                        eIdx % 2 === 0 ? "float-anim" : "float-anim-reverse"
                      )}
                      style={{ top: el.top, left: el.left, bottom: el.bottom, right: el.right }}
                    >
                      <el.icon className="w-6 h-6 text-primary" />
                    </div>
                  ))}

                  <div className="relative glass-card p-4 rounded-[3rem] border border-white/10 overflow-hidden shadow-2xl">
                    <div className="absolute inset-0 bg-gradient-to-t from-[#00001D] via-transparent to-transparent z-10" />
                    <img 
                      src={PlaceHolderImages.find(i => i.id === slide.image)?.imageUrl} 
                      alt={slide.title} 
                      className="w-full aspect-[4/5] lg:aspect-auto h-auto rounded-[2rem] object-cover grayscale-[0.5] group-hover:grayscale-0 transition-all duration-700"
                      data-ai-hint={slide.image.replace('-', ' ')}
                    />
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Slider Controls */}
      <div className="absolute bottom-10 left-1/2 -translate-x-1/2 z-30 flex items-center gap-4">
        {slides.map((_, i) => (
          <button
            key={i}
            onClick={() => emblaApi?.scrollTo(i)}
            className={cn(
              "h-2 rounded-full transition-all duration-500",
              selectedIndex === i ? "w-12 bg-primary neon-accent" : "w-2 bg-white/20 hover:bg-white/40"
            )}
            aria-label={`Ir a slide ${i + 1}`}
          />
        ))}
      </div>

      {/* Mouse Indicator */}
      <div className="absolute bottom-8 right-12 hidden lg:flex flex-col items-center gap-4 opacity-40">
        <div className="w-6 h-10 rounded-full border-2 border-white flex justify-center pt-2">
          <div className="w-1 h-2 bg-primary rounded-full animate-bounce" />
        </div>
        <span className="text-[10px] font-bold uppercase tracking-[0.3em]">Scroll</span>
      </div>
    </section>
  );
};