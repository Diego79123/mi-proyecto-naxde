
"use client"

import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { ArrowRight, Zap } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';

const HERO_BG_IMAGE = "https://firebasestorage.googleapis.com/v0/b/studio-4920931495-1d74b.firebasestorage.app/o/Elementos%20graficos%2FHero%20fondo%20asteroide1.webp?alt=media&token=bd74abc5-f125-49d8-9cd6-59a98ea3dad5";
const ASTEROIDE_1 = "https://firebasestorage.googleapis.com/v0/b/studio-4920931495-1d74b.firebasestorage.app/o/Elementos%20graficos%2FAsteroide1.webp?alt=media&token=64700fa9-ed0f-4d51-ad26-687cfa5f70e9";

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
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      const { clientX, clientY } = e;
      const x = (clientX / window.innerWidth - 0.5) * 15;
      const y = (clientY / window.innerHeight - 0.5) * 15;
      setMousePos({ x, y });
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  const scrollToNextSection = () => {
    if (typeof window !== 'undefined') {
      const nextSection = document.getElementById('featured-services');
      if (nextSection) {
        nextSection.scrollIntoView({ behavior: 'smooth' });
      } else {
        window.scrollTo({
          top: window.innerHeight,
          behavior: 'smooth'
        });
      }
    }
  };

  return (
    <section className="relative h-screen w-full flex flex-col bg-[#00001D] overflow-hidden select-none">
      {/* 1. Fondo Base (Nebulosa) - z-0 */}
      <div className="absolute inset-0 z-0">
        <div 
          className="absolute inset-0 transition-transform duration-[1500ms] ease-out scale-110"
          style={{ transform: `translate(${mousePos.x * 0.2}px, ${mousePos.y * 0.2}px)` }}
        >
          <Image 
            src={HERO_BG_IMAGE} 
            alt="Space Nebula Background" 
            fill 
            className="object-cover"
            priority
            quality={100}
          />
        </div>
        <div className="absolute inset-0 bg-[#00001D]/40 backdrop-blur-[2px]" />
      </div>

      <StarField />

      {/* 2. Top Header Minimalista - z-50 */}
      <div className="relative z-50 pt-12 flex flex-col items-center gap-4">
        <span className="text-white text-xl font-bold tracking-[0.3em] uppercase">naxde.</span>
        <span className="text-white/40 text-[10px] font-bold tracking-[0.5em] mt-2">01 / 01</span>
      </div>

      {/* 3. Contenedor Central (Texto + Asteroide Parallax) - z-10 a z-40 */}
      <div className="flex-1 relative flex items-center justify-center">
        
        {/* Texto Monumental (Detrás del Asteroide) - z-10 */}
        <div className="absolute inset-0 flex items-center justify-center z-10 pointer-events-none">
          <h1 className="text-[15vw] md:text-[18vw] font-black text-[#F84F39] leading-none tracking-tighter uppercase opacity-90 select-none">
            PLATAFORMAS
          </h1>
        </div>

        {/* Asteroide Flotante (Delante del Texto) - z-30 */}
        <div 
          className="relative z-30 w-full max-w-[600px] aspect-square transition-transform duration-[1200ms] ease-out pointer-events-none"
          style={{ transform: `translate(${mousePos.x * -1.2}px, ${mousePos.y * -1.2}px) scale(1.1)` }}
        >
          <Image 
            src={ASTEROIDE_1} 
            alt="Floating Asteroide Front" 
            fill 
            className="object-contain"
            priority
          />
        </div>
      </div>

      {/* 4. Footer del Hero (Tagline + Botón) - z-50 */}
      <div className="relative z-50 pb-16 flex flex-col items-center space-y-10 px-8 text-center">
        <div className="max-w-md">
          <p className="text-[10px] md:text-xs text-white/60 font-bold tracking-[0.3em] uppercase leading-relaxed">
            Construimos plataformas digitales que transforman negocios.<br />
            Hay movimiento en el futuro.
          </p>
        </div>

        <div className="flex flex-col items-center gap-6">
          <Button 
            onClick={scrollToNextSection}
            variant="outline" 
            className="h-14 px-12 border-white/20 bg-white/5 hover:bg-white/10 text-white rounded-none text-sm font-bold uppercase tracking-[0.2em] transition-all"
          >
            Explorar más
          </Button>

          {/* Scroll Indicator */}
          <div className="flex flex-col items-center gap-3 cursor-pointer group" onClick={scrollToNextSection}>
            <div className="w-[1px] h-12 bg-gradient-to-b from-white/0 via-white/40 to-white/0 relative overflow-hidden">
              <div className="absolute top-0 left-0 w-full h-1/2 bg-primary animate-scroll-line" />
            </div>
          </div>
        </div>
      </div>

      <style jsx global>{`
        @keyframes scroll-line {
          0% { transform: translateY(-100%); }
          100% { transform: translateY(200%); }
        }
        .animate-scroll-line {
          animation: scroll-line 2s infinite ease-in-out;
        }
      `}</style>
    </section>
  );
};

/**
 * DATOS DE SLIDES ANTERIORES (Guardados para uso futuro)
 * 
 * const previousSlides = [
 *   {
 *     id: 1,
 *     badge: "CONSTRUIMOS EL FUTURO",
 *     title: "PLATAFORMAS QUE TRANSFORMAN NEGOCIOS",
 *     description: "Software premium con escalabilidad sin límites para toda Latinoamérica. Diseñamos experiencias que cautivan y convierten.",
 *     ctaPrimary: "Empezar Ahora",
 *     ctaSecondary: "Ver Proyectos",
 *     image: "hero-tech",
 *     icon: Zap,
 *     accent: "from-[#5200F8]/60", 
 *     parallaxImg: ASTEROIDE_1
 *   },
 *   {
 *     id: 2,
 *     badge: "CREA HERMOSAS APLICACIONES",
 *     title: "INTERFAZ DIGITAL DE ALTO IMPACTO",
 *     description: "Diseñamos experiencias que cautivan y convierten, utilizando los estándares más modernos de diseño de materiales y animaciones inmersivas.",
 *     ctaPrimary: "Descargar",
 *     ctaSecondary: "Más información",
 *     image: "nfc-demo",
 *     icon: LayoutGrid,
 *     accent: "from-cyan-500/60",
 *     parallaxImg: ASTEROIDE_2
 *   },
 *   {
 *     id: 3,
 *     badge: "CREA HERMOSAS APLICACIONES",
 *     title: "CONTROL DESLIZANTE DE INTERFAZ DE USUARIO",
 *     description: "Creamos componentes de software con estética futurista y rendimiento extremo. La arquitectura de materiales del mañana, disponible hoy.",
 *     ctaPrimary: "Descargar",
 *     ctaSecondary: "Más información",
 *     image: "project-saas",
 *     icon: Cpu,
 *     accent: "from-green-500/60",
 *     parallaxImg: ASTEROIDE_1
 *   }
 * ];
 */
