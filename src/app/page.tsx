
'use client';

import React from 'react';
import { Header } from '@/components/layout/Header';
import { Hero } from '@/components/sections/Hero';
import { FeaturedServices } from '@/components/sections/FeaturedServices';
import { WebDesignInteractive } from '@/components/sections/WebDesignInteractive';
import { AppDesignInteractive } from '@/components/sections/AppDesignInteractive';
import { ExtendedServices } from '@/components/sections/ExtendedServices';
import { ConfidenceSection } from '@/components/sections/ConfidenceSection';
import { TechStackCarousel } from '@/components/sections/TechStackCarousel';
import { ShowreelSection } from '@/components/sections/ShowreelSection';
import { ConnectingIdealsSection } from '@/components/sections/ConnectingIdealsSection';
import { InnovativeApproachSection } from '@/components/sections/InnovativeApproachSection';
import { Footer } from '@/components/layout/Footer';
import { BottomNav } from '@/components/layout/BottomNav';
import { ArrowRight } from 'lucide-react';
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

      {/* Ecosistema Completo de Servicios */}
      <ExtendedServices />
      
      {/* Sección ADN con animación técnica e interactiva */}
      <ConfidenceSection />

      {/* Carrusel de Logos Tecnológicos */}
      <TechStackCarousel />

      <ShowreelSection />

      <ConnectingIdealsSection />

      <InnovativeApproachSection />

      {/* CTA Final */}
      <section className="py-24 md:py-32 px-6">
        <div className="max-w-6xl mx-auto glass-card rounded-[3rem] md:rounded-[4rem] p-12 md:p-28 text-center space-y-10 md:space-y-12 relative overflow-hidden group">
          <div className="absolute top-0 right-0 w-[300px] md:w-[500px] h-[300px] md:h-[500px] bg-primary/20 rounded-full blur-[80px] md:blur-[120px] -z-10 transition-transform duration-[2s]" />
          
          <div className="space-y-6 relative z-10">
            <h3 className="text-4xl sm:text-6xl md:text-[7rem] font-headline font-black text-white leading-[1] md:leading-[0.9] tracking-tighter">
              ¿LISTO PARA EL <br />
              <span className="text-primary italic">SIGUIENTE</span> NIVEL?
            </h3>
            <p className="text-lg md:text-2xl text-white/60 max-w-2xl mx-auto leading-relaxed font-medium italic">
              El futuro no se espera, se construye. Hablemos de tu próximo gran proyecto digital.
            </p>
          </div>
          
          <div className="flex flex-col sm:flex-row justify-center gap-6 md:gap-8 pt-4 md:pt-8 relative z-10">
            <Link href="/contacto" className="w-full sm:w-auto">
              <Button size="lg" className="h-16 md:h-20 px-10 md:px-12 bg-primary hover:bg-primary/90 text-white rounded-full neon-accent text-xl md:text-2xl font-black w-full transition-all hover:scale-105">
                Empezar Proyecto
                <ArrowRight className="w-6 h-6 md:w-8 md:h-8 ml-3" />
              </Button>
            </Link>
            <Link href="/servicios" className="w-full sm:w-auto">
              <Button size="lg" variant="outline" className="h-16 md:h-20 px-10 md:px-12 border-white/20 hover:bg-white/10 text-white rounded-full text-xl md:text-2xl font-black w-full backdrop-blur-md transition-all">
                Explorar Soluciones
              </Button>
            </Link>
          </div>
        </div>
      </section>

      <Footer />
      <BottomNav />
    </main>
  );
}
