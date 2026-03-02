'use client';

import React from 'react';
import { Header } from '@/components/layout/Header';
import { Hero } from '@/components/sections/Hero';
import { FeaturedServices } from '@/components/sections/FeaturedServices';
import { NFCSection } from '@/components/sections/NFCSection';
import { Footer } from '@/components/layout/Footer';
import { BottomNav } from '@/components/layout/BottomNav';
import { ArrowRight, Zap, Target, ShieldCheck, Star } from 'lucide-react';
import Link from 'next/link';
import { Button } from '@/components/ui/button';

export default function Home() {
  return (
    <main className="min-h-screen bg-background text-white selection:bg-primary/30 relative">
      <Header />
      
      <Hero />
      
      {/* Sección de Métricas */}
      <section id="metrics" className="py-16 md:py-24 border-y border-white/5 bg-white/[0.01] relative overflow-hidden">
        <div className="absolute inset-0 bg-primary/5 blur-[120px] -z-10" />
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 md:gap-12">
            {[
              { val: "250+", label: "Plataformas", sub: "Desplegadas" },
              { val: "10K+", label: "Neocards", sub: "Networking" },
              { val: "99%", label: "Seguridad", sub: "Certificada" },
              { val: "LATAM", label: "Alcance", sub: "Presencia" }
            ].map((item, idx) => (
              <div key={idx} className="text-center space-y-2 md:space-y-3 group">
                <div className="text-4xl md:text-7xl font-headline font-black text-white group-hover:text-primary transition-colors duration-500">{item.val}</div>
                <div className="space-y-1">
                  <div className="text-[10px] md:text-xs uppercase tracking-[0.2em] md:tracking-[0.3em] text-primary font-bold">{item.label}</div>
                  <div className="text-[8px] md:text-[10px] uppercase text-white/30 font-medium">{item.sub}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <FeaturedServices />
      
      <NFCSection />

      {/* Sección de Trayectoria */}
      <section className="py-24 md:py-32 px-6 relative overflow-hidden">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col gap-2 mb-16 md:mb-24">
            <h2 className="text-[15vw] md:text-[12vw] font-black leading-[0.8] tracking-tighter text-outline opacity-20 absolute -top-5 md:-top-10 left-0 pointer-events-none uppercase">NAXDE HUB</h2>
            <div className="relative z-10 space-y-4">
              <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-primary/10 border border-primary/20 backdrop-blur-md">
                <Star className="w-3 h-3 md:w-4 md:h-4 text-primary fill-primary" />
                <span className="text-[8px] md:text-[10px] font-bold uppercase tracking-[0.3em] text-primary">Trayectoria</span>
              </span>
              <h3 className="text-4xl sm:text-6xl md:text-8xl font-headline font-black leading-none tracking-tighter">
                LIDERANDO LA <br />
                <span className="text-primary italic">REVOLUCIÓN</span> DIGITAL.
              </h3>
            </div>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-12">
            {[
              { 
                title: "Alta Conversión", 
                desc: "No solo creamos código, diseñamos interfaces orientadas a vender mediante psicología del diseño.",
                icon: Target,
                tag: "01"
              },
              { 
                title: "Escalabilidad Cloud", 
                desc: "Arquitecturas en la nube preparadas para soportar miles de usuarios concurrentes.",
                icon: Zap,
                tag: "02"
              },
              { 
                title: "Seguridad Militar", 
                desc: "Implementamos los estándares más altos de encriptación para blindar tu ventaja.",
                icon: ShieldCheck,
                tag: "03"
              }
            ].map((item, idx) => (
              <div key={idx} className="glass-card p-10 md:p-12 rounded-[2.5rem] md:rounded-[3rem] border border-white/5 space-y-6 md:space-y-8 group hover:border-primary/30 transition-all duration-700">
                <div className="flex justify-between items-start">
                  <div className="w-14 h-14 md:w-16 md:h-16 rounded-[1.2rem] md:rounded-[1.5rem] bg-primary/10 flex items-center justify-center group-hover:scale-110 transition-transform duration-500">
                    <item.icon className="w-7 h-7 md:w-8 md:h-8 text-primary" />
                  </div>
                  <span className="text-3xl md:text-4xl font-black text-white/5">{item.tag}</span>
                </div>
                <div className="space-y-3 md:space-y-4">
                  <h4 className="text-2xl md:text-3xl font-headline font-bold group-hover:text-primary transition-colors">{item.title}</h4>
                  <p className="text-sm md:text-lg text-white/50 leading-relaxed font-medium">{item.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

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
