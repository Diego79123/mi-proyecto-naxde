'use client';

import React from 'react';
import { Header } from '@/components/layout/Header';
import { Hero } from '@/components/sections/Hero';
import { FeaturedServices } from '@/components/sections/FeaturedServices';
import { WebDesignInteractive } from '@/components/sections/WebDesignInteractive';
import { AppDesignInteractive } from '@/components/sections/AppDesignInteractive';
import { ExtendedServices } from '@/components/sections/ExtendedServices';
import { TechStackCarousel } from '@/components/sections/TechStackCarousel';
import { DisruptiveVisionBanner } from '@/components/sections/DisruptiveVisionBanner';
import { ConfidenceSection } from '@/components/sections/ConfidenceSection';
import { ShowreelSection } from '@/components/sections/ShowreelSection';
import { Footer } from '@/components/layout/Footer';
import { BottomNav } from '@/components/layout/BottomNav';
import { ArrowRight, Sparkles, Plus } from 'lucide-react';
import Link from 'next/link';
import { Button } from '@/components/ui/button';

export default function Home() {
  return (
    <main className="min-h-screen bg-background text-white selection:bg-primary/30 relative">
      <Header />
      
      <Hero />
      
      {/* Sección Prototipo Smartphone (Neocards) */}
      <FeaturedServices />

      {/* Sección Prototipo Laptop (Web Design) */}
      <WebDesignInteractive />

      {/* Sección Prototipo Tablet (App Design) */}
      <AppDesignInteractive />

      {/* Ecosistema Completo de Servicios (Grid) */}
      <ExtendedServices />

      {/* Carrusel de Logos Tecnológicos - Posicionado arriba del banner disruptivo */}
      <TechStackCarousel />

      {/* Banner de Visión Disruptiva (Extraído de ExtendedServices) */}
      <DisruptiveVisionBanner />
      
      {/* Sección ADN con animación técnica e interactiva */}
      <ConfidenceSection />

      <ShowreelSection />

      {/* CTA Final - Integrado al fondo gris de la sección para una estética más limpia */}
      <section className="py-12 md:py-24 px-6 bg-[#F0F4FF]">
        <div className="max-w-7xl mx-auto relative py-24 md:py-40 px-6 rounded-[3rem] overflow-hidden group/cta">
          
          {/* Background Layer - Texture subtle */}
          <div className="absolute inset-0 z-0">
            <div className="absolute inset-0 opacity-[0.05] pointer-events-none bg-[url('https://grainy-gradients.vercel.app/noise.svg')]" />
          </div>

          {/* Asteroides / Polígonos Decorativos - Ajustados para fondo claro */}
          <div className="absolute inset-0 z-5 pointer-events-none opacity-10">
            <div className="absolute top-[10%] left-[10%] w-20 h-20 bg-black/10 border border-black/5 rotate-12" style={{ clipPath: 'polygon(20% 0%, 80% 0%, 100% 20%, 100% 80%, 80% 100%, 20% 100%, 0% 80%, 0% 20%)' }} />
            <div className="absolute bottom-[20%] right-[10%] w-28 h-28 bg-black/10 border border-black/5 -rotate-12" style={{ clipPath: 'polygon(20% 0%, 80% 0%, 100% 20%, 100% 80%, 80% 100%, 20% 100%, 0% 80%, 0% 20%)' }} />
            <div className="absolute top-[60%] left-[5%] w-12 h-12 bg-black/10 border border-black/5 rotate-45" style={{ clipPath: 'polygon(20% 0%, 80% 0%, 100% 20%, 100% 80%, 80% 100%, 20% 100%, 0% 80%, 0% 20%)' }} />
          </div>

          {/* Interface Elements */}
          <div className="absolute top-12 left-12 z-20 flex items-center gap-2 opacity-40">
            <h3 className="text-sm font-black text-black tracking-tighter uppercase italic">NAXDE</h3>
            <Plus className="w-3 h-3 text-black" />
          </div>

          <div className="absolute bottom-12 right-12 z-20 flex gap-1 opacity-20">
            <div className="w-1 h-1 bg-black rounded-full" />
            <div className="w-1 h-1 bg-black rounded-full" />
            <div className="w-1 h-1 bg-black rounded-full" />
            <div className="w-1 h-1 bg-black rounded-full" />
          </div>
          
          <div className="max-w-5xl mx-auto text-center space-y-12 md:space-y-20 relative z-10">
            <div className="space-y-8">
              <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-black/5 border border-black/10 backdrop-blur-md mb-4">
                <Sparkles className="w-4 h-4 text-primary animate-pulse" />
                <span className="text-[10px] font-black uppercase tracking-[0.4em] text-black/60">Siguiente Frecuencia</span>
              </div>
              
              <h3 className="text-5xl sm:text-7xl md:text-[8rem] lg:text-[9rem] font-headline font-black text-black leading-[0.85] tracking-tighter uppercase">
                DE LA <span className="text-transparent italic" style={{ WebkitTextStroke: '1.5px black' }}>IMAGINACIÓN</span> <br />
                A LA <span className="text-primary">SINGULARIDAD.</span>
              </h3>
              
              <p className="text-xl md:text-3xl font-medium leading-tight text-black/40 max-w-3xl mx-auto italic">
                No seguimos el ritmo de la industria, definimos su próxima frecuencia. Tu visión merece una ingeniería que no conozca límites.
              </p>
            </div>
            
            <div className="flex flex-col sm:flex-row justify-center items-center gap-6 md:gap-10 pt-8">
              <Link href="/contacto" className="w-full sm:w-auto">
                <Button size="lg" className="h-20 md:h-24 px-12 md:px-20 bg-primary hover:bg-primary/90 text-white rounded-full neon-accent text-xl md:text-3xl font-black w-full transition-all hover:scale-105 active:scale-95 shadow-glow-accent group">
                  Iniciar Proyecto
                  <ArrowRight className="w-8 h-8 md:w-10 md:h-10 ml-4 group-hover:translate-x-2 transition-transform" />
                </Button>
              </Link>
              <Link href="/servicios" className="w-full sm:w-auto">
                <Button size="lg" variant="outline" className="h-20 md:h-24 px-12 md:px-16 border-black/10 hover:bg-black/5 text-black rounded-full text-xl md:text-2xl font-bold w-full backdrop-blur-md transition-all">
                  Explorar Soluciones
                </Button>
              </Link>
            </div>

            <div className="pt-12 md:pt-20">
              <p className="text-[10px] font-black uppercase tracking-[0.5em] text-black/20">
                NAXDE STUDIO • BOGOTÁ • LATAM
              </p>
            </div>
          </div>
        </div>
      </section>

      <Footer />
      <BottomNav />
    </main>
  );
}
