'use client';

import React, { useState, useEffect, useRef } from 'react';
import { Header } from '@/components/layout/Header';
import { Hero } from '@/components/sections/Hero';
import { FeaturedServices } from '@/components/sections/FeaturedServices';
import { NFCSection } from '@/components/sections/NFCSection';
import { Footer } from '@/components/layout/Footer';
import { BottomNav } from '@/components/layout/BottomNav';
import { Briefcase, MessageSquare, Star, ArrowRight, Zap, Target, ShieldCheck } from 'lucide-react';
import Link from 'next/link';
import { Button } from '@/components/ui/button';

const AsteroidImpactEffect = () => {
  const [impacted, setImpacted] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setImpacted(true);
        } else {
          setImpacted(false);
        }
      },
      { threshold: 0.1 }
    );

    if (containerRef.current) {
      observer.observe(containerRef.current);
    }

    return () => observer.disconnect();
  }, []);

  const particles = Array.from({ length: 45 }).map((_, i) => ({
    id: i,
    x: (Math.random() - 0.5) * 1000,
    y: (Math.random() - 0.5) * 800,
    size: Math.random() * 8 + 2,
    delay: Math.random() * 0.5,
    // Tonos de gris para simular fragmentos de roca espacial
    color: Math.random() > 0.6 ? 'bg-zinc-400' : Math.random() > 0.3 ? 'bg-zinc-500' : 'bg-zinc-600',
  }));

  return (
    <div ref={containerRef} className="h-1 relative overflow-visible z-50 pointer-events-none">
      {impacted && (
        <div className="absolute left-1/2 top-0">
          {particles.map((p) => (
            <div
              key={p.id}
              className={`absolute rounded-full animate-burst ${p.color}`}
              style={{
                width: p.size,
                height: p.size,
                '--tw-translate-x': `${p.x}px`,
                '--tw-translate-y': `${p.y}px`,
                animationDelay: `${p.delay}s`,
                opacity: 0.8,
                boxShadow: '0 0 4px rgba(0,0,0,0.5)',
              } as any}
            />
          ))}
        </div>
      )}
    </div>
  );
};

export default function Home() {
  return (
    <main className="min-h-screen bg-background text-white selection:bg-primary/30">
      <Header />
      
      <Hero />
      
      {/* Seccion de Metricas */}
      <section className="py-12 border-y border-white/5 bg-white/[0.02] relative overflow-hidden">
        <div className="absolute inset-0 bg-primary/5 blur-[100px] -z-10" />
        <div className="max-w-7xl mx-auto px-6 grid grid-cols-2 md:grid-cols-4 gap-8">
          {[
            { val: "250+", label: "Plataformas" },
            { val: "10K+", label: "Tarjetas NFC" },
            { val: "99%", label: "Seguridad" },
            { val: "LATAM", label: "Alcance Regional" }
          ].map((item, idx) => (
            <div key={idx} className="text-center space-y-1">
              <div className="text-3xl md:text-4xl font-headline font-bold text-white">{item.val}</div>
              <div className="text-xs uppercase tracking-widest text-white/40 font-bold">{item.label}</div>
            </div>
          ))}
        </div>
      </section>

      {/* Efecto de Impacto entre secciones (Color Gris) */}
      <AsteroidImpactEffect />

      <FeaturedServices />
      
      <NFCSection />

      {/* Seccion de Confianza */}
      <section className="py-24 px-6 relative">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16 space-y-4">
            <h2 className="text-primary font-bold uppercase tracking-[0.2em] text-sm">Nuestra Garantía</h2>
            <h3 className="text-4xl md:text-5xl font-headline font-bold">POR QUÉ ELIGEN <span className="text-primary">NAXDE</span></h3>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              { 
                title: "Alta Conversión", 
                desc: "No solo creamos código, diseñamos interfaces orientadas a vender y retener usuarios.",
                icon: Target
              },
              { 
                title: "Escalabilidad Cloud", 
                desc: "Arquitecturas en la nube preparadas para soportar miles de usuarios concurrentes.",
                icon: Zap
              },
              { 
                title: "Seguridad Militar", 
                desc: "Implementamos los estándares más altos de encriptación y protección de datos.",
                icon: ShieldCheck
              }
            ].map((item, idx) => (
              <div key={idx} className="glass-card p-10 rounded-[2.5rem] border border-white/5 space-y-6">
                <div className="w-14 h-14 rounded-2xl bg-primary/10 flex items-center justify-center">
                  <item.icon className="w-7 h-7 text-primary" />
                </div>
                <h4 className="text-2xl font-headline font-bold">{item.title}</h4>
                <p className="text-white/50 leading-relaxed">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Final */}
      <section className="py-24 px-6">
        <div className="max-w-5xl mx-auto glass-card rounded-[3rem] p-12 md:p-20 text-center space-y-8 relative overflow-hidden">
          <div className="absolute top-0 right-0 w-64 h-64 bg-primary/20 rounded-full blur-[100px]" />
          <div className="absolute bottom-0 left-0 w-64 h-64 bg-secondary/20 rounded-full blur-[100px]" />
          
          <h3 className="text-4xl md:text-6xl font-headline font-bold text-white">¿LISTO PARA EL <span className="text-primary italic">SIGUIENTE</span> NIVEL?</h3>
          <p className="text-lg md:text-xl text-white/60 max-w-2xl mx-auto leading-relaxed">
            Hablemos de tu proyecto. Nuestro equipo técnico y creativo está listo para construir tu ventaja competitiva en el mercado digital.
          </p>
          
          <div className="flex flex-col sm:flex-row justify-center gap-6 pt-4 relative z-10">
            <Link href="/contacto">
              <Button size="lg" className="h-16 px-10 bg-primary hover:bg-primary/90 text-white rounded-full neon-accent text-xl font-bold">
                Empezar Proyecto
                <ArrowRight className="w-6 h-6 ml-2" />
              </Button>
            </Link>
            <Link href="/servicios">
              <Button size="lg" variant="outline" className="h-16 px-10 border-white/20 hover:bg-white/10 text-white rounded-full text-xl font-bold">
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
