
"use client"

import React from 'react';
import { Header } from '@/components/layout/Header';
import { Footer } from '@/components/layout/Footer';
import { BottomNav } from '@/components/layout/BottomNav';
import { FAQSection } from '@/components/sections/FAQSection';
import { SuccessStoriesSection } from '@/components/sections/SuccessStoriesSection';
import { TestimonialsSection } from '@/components/sections/TestimonialsSection';
import { Smartphone, Globe, Zap, Cpu, Code, Database, ShieldCheck, ShoppingBag, Palette, ArrowRight, Sparkles } from 'lucide-react';
import { Button } from '@/components/ui/button';
import Link from 'next/link';

const allServices = [
  { id: 1, title: "Software a Medida", desc: "Arquitecturas escalables sobre plataformas cloud de última generación.", icon: Code },
  { id: 2, title: "Web Inmersiva", desc: "Sitios de alta conversión con animaciones premium y experiencias 3D.", icon: Globe },
  { id: 3, title: "Tecnología NFC", desc: "Identidad digital inteligente y control de acceso en un solo toque.", icon: Zap },
  { id: 4, title: "IA para Negocios", desc: "Automatización con LLMs y agentes inteligentes para optimizar procesos.", icon: Cpu },
  { id: 5, title: "Apps Nativas", desc: "Desarrollo móvil iOS/Android con rendimiento extremo y UX vanguardista.", icon: Smartphone },
  { id: 6, title: "Ecosistemas CRM", desc: "Gestión avanzada de leads y clientes con integración total.", icon: Database },
  { id: 7, title: "Seguridad Cloud", desc: "Protección de datos bajo protocolos de seguridad de nivel empresarial.", icon: ShieldCheck },
  { id: 8, title: "Branding Digital", desc: "Sistemas de diseño coherentes que reflejan el ADN de tu marca.", icon: Palette },
  { id: 9, title: "Ecommerce Pro", desc: "Plataformas de venta robustas con pasarelas internacionales.", icon: ShoppingBag }
];

export default function ServiciosPage() {
  return (
    <main className="min-h-screen bg-[#00001D] text-white selection:bg-primary/30">
      <Header />
      
      {/* Hero Section */}
      <section className="pt-40 pb-20 px-6 md:px-12 lg:px-16 relative overflow-hidden">
        <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-primary/10 rounded-full blur-[120px] -z-10" />
        <div className="max-w-7xl mx-auto text-center space-y-8">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/5 border border-white/10 backdrop-blur-md">
            <Sparkles className="w-4 h-4 text-primary animate-pulse" />
            <span className="text-[10px] font-bold uppercase tracking-[0.3em] text-white/60">Soluciones de Vanguardia</span>
          </div>
          <h1 className="text-5xl md:text-8xl font-headline font-black tracking-tighter leading-[0.9] uppercase">
            INGENIERÍA <span className="text-primary italic">SIN LÍMITES</span>.
          </h1>
          <p className="text-xl text-white/50 max-w-3xl mx-auto leading-relaxed font-medium">
            Desde el código base hasta la interfaz inmersiva, construimos el software que definirá el éxito de tu empresa en la próxima década.
          </p>
        </div>
      </section>

      {/* Services Grid */}
      <section className="py-24 px-6 md:px-12 lg:px-16 relative">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-full bg-[radial-gradient(circle,rgba(82,0,248,0.05)_0%,transparent_70%)] pointer-events-none" />
        
        <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {allServices.map((service) => (
            <div 
              key={service.id} 
              className="group relative p-10 rounded-[2.5rem] bg-white/[0.02] border border-white/5 hover:border-secondary/50 transition-all duration-500 flex flex-col justify-between overflow-hidden shadow-2xl"
            >
              {/* Hover Glow Effects - Morados y Azules */}
              <div className="absolute inset-0 bg-gradient-to-br from-secondary/20 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
              <div className="absolute -right-20 -top-20 w-64 h-64 bg-blue-600/15 blur-[80px] rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none" />

              <div className="relative z-10">
                <div className="w-16 h-16 rounded-2xl bg-white/5 flex items-center justify-center mb-10 group-hover:bg-secondary group-hover:text-white transition-all duration-500 group-hover:scale-110 group-hover:shadow-[0_0_20px_rgba(82,0,248,0.5)] border border-white/5 group-hover:border-secondary">
                  <service.icon className="w-8 h-8 text-secondary group-hover:text-white transition-colors" />
                </div>
                <h3 className="text-2xl font-headline font-bold mb-4 uppercase tracking-tight group-hover:text-secondary transition-colors">{service.title}</h3>
                <p className="text-white/50 leading-relaxed font-medium mb-8 group-hover:text-white/70 transition-colors">{service.desc}</p>
              </div>
              
              <div className="relative z-10 pt-4 border-t border-white/5 mt-auto flex items-center justify-between">
                <span className="text-[10px] font-bold text-white/20 uppercase tracking-widest group-hover:text-secondary/40 transition-colors">Naxde Module</span>
                <ArrowRight className="w-5 h-5 text-secondary opacity-0 group-hover:opacity-100 group-hover:translate-x-2 transition-all" />
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* FAQ Section */}
      <FAQSection />

      {/* Success Stories Section */}
      <SuccessStoriesSection />

      {/* Testimonials Section */}
      <TestimonialsSection />

      {/* Final CTA Section */}
      <section className="py-24 md:py-40 px-6 md:px-12 lg:px-16 relative overflow-hidden">
        <div className="max-w-5xl mx-auto text-center space-y-12">
          <div className="space-y-6">
            <h2 className="text-4xl md:text-7xl lg:text-8xl font-headline font-black text-white leading-[0.9] uppercase tracking-tighter">
              ¿LISTO PARA <br /> <span className="text-primary italic">TRANSFORMAR</span> <br /> TU NEGOCIO?
            </h2>
            <p className="text-xl text-white/50 max-w-2xl mx-auto font-medium leading-relaxed italic">
              "No seguimos el ritmo de la industria, definimos su próxima frecuencia. Tu visión merece una ingeniería que no conozca límites."
            </p>
          </div>

          <div className="flex flex-col sm:flex-row justify-center items-center gap-6 pt-4">
            <Link href="/contacto">
              <Button size="lg" className="h-16 md:h-24 px-12 md:px-16 bg-primary hover:bg-primary/90 text-white rounded-full neon-accent text-xl md:text-2xl font-black transition-all hover:scale-105 active:scale-95 group shadow-glow-accent">
                INICIAR PROYECTO
                <Zap className="w-6 h-6 md:w-8 md:h-8 ml-4 group-hover:rotate-12 transition-transform" />
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
