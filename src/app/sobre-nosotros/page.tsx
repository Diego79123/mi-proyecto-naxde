
"use client"

import React, { useState, useEffect } from 'react';
import { Header } from '@/components/layout/Header';
import { Footer } from '@/components/layout/Footer';
import { BottomNav } from '@/components/layout/BottomNav';
import { 
  Target, 
  Eye, 
  Users, 
  ShieldCheck, 
  Globe, 
  Rocket, 
  Zap, 
  Mail, 
  MessageCircle, 
  Linkedin, 
  ArrowRight,
  Plus,
  Star,
  Heart,
  Trophy,
  Cpu
} from 'lucide-react';
import { PlaceHolderImages } from '@/lib/placeholder-images';
import { useCollection, useFirestore, useMemoFirebase } from '@/firebase';
import { collection, query, where } from 'firebase/firestore';
import { 
  Carousel, 
  CarouselContent, 
  CarouselItem, 
  type CarouselApi
} from "@/components/ui/carousel";
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import Link from 'next/link';

export default function SobreNosotrosPage() {
  const db = useFirestore();
  const [api, setApi] = useState<CarouselApi>();
  const [current, setCurrent] = useState(0);

  const teamRef = useMemoFirebase(() => {
    return query(collection(db, 'team_members'), where('isActive', '==', true));
  }, [db]);

  const { data: team, isLoading } = useCollection(teamRef);

  useEffect(() => {
    if (!api) return;
    setCurrent(api.selectedScrollSnap());
    api.on("select", () => {
      setCurrent(api.selectedScrollSnap());
    });
  }, [api]);

  const mockTeam = [
    {
      id: 'oscar-rivera',
      name: 'Oscar Rivera',
      role: 'CEO & Founder',
      slug: 'oscar-rivera',
      profileImageUrl: 'https://firebasestorage.googleapis.com/v0/b/studio-4920931495-1d74b.firebasestorage.app/o/Tarjetas%20digitales%2FNaxde%2FPerfil%20oscar.jpeg?alt=media&token=1b57f085-d1fd-4435-8693-1be5d9bdd2b1',
      bio: 'Liderando la transformación digital en Latinoamérica a través de tecnología NFC e Inteligencia Artificial.'
    },
    {
      id: 'elena-petrova',
      name: 'Elena Petrova',
      role: 'CTO & Software Architect',
      slug: 'elena-petrova',
      profileImageUrl: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?q=80&w=1000',
      bio: 'Experta en arquitecturas cloud escalables y seguridad de datos de alto nivel.'
    },
    {
      id: 'marcos-silva',
      name: 'Marcos Silva',
      role: 'Head of AI Applied',
      slug: 'marcos-silva',
      profileImageUrl: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=1000',
      bio: 'Desarrollando modelos predictivos y agentes inteligentes para optimizar negocios.'
    },
    {
      id: 'sofia-chen',
      name: 'Sofia Chen',
      role: 'Product Design Lead',
      slug: 'sofia-chen',
      profileImageUrl: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?q=80&w=1000',
      bio: 'Creadora de interfaces inmersivas que definen la próxima era del diseño digital.'
    }
  ];

  const displayTeam = (team && team.length > 0) ? team : mockTeam;

  return (
    <main className="min-h-screen bg-[#00001D] text-white font-body selection:bg-primary/30">
      <Header />

      {/* Hero Section */}
      <section className="pt-40 pb-20 px-6 md:px-12 lg:px-16 text-center">
        <div className="max-w-4xl mx-auto space-y-8">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/5 border border-white/10 backdrop-blur-md">
            <Rocket className="w-4 h-4 text-primary animate-pulse" />
            <span className="text-[10px] font-bold uppercase tracking-[0.3em] text-white/60">Hub de Innovación</span>
          </div>
          <h1 className="text-5xl md:text-8xl font-headline font-bold tracking-tighter leading-none uppercase">
            SOMOS <span className="text-primary italic">NAXDE</span>.
          </h1>
          <p className="text-xl text-white/50 leading-relaxed font-medium">
            Un equipo de ingenieros, diseñadores y estrategas digitales unidos por una misión: construir el futuro de los negocios en Latinoamérica.
          </p>
        </div>
      </section>

      {/* Team Collaboration Image */}
      <section className="px-6 md:px-12 lg:px-16 mb-24">
        <div className="max-w-7xl mx-auto h-[500px] rounded-[3rem] overflow-hidden relative">
          <div className="absolute inset-0 bg-primary/20 blur-[150px] -z-10" />
          <img 
            src={PlaceHolderImages.find(i => i.id === 'team-collab')?.imageUrl} 
            alt="Naxde Team Collaboration" 
            className="w-full h-full object-cover grayscale hover:grayscale-0 transition-all duration-1000 border border-white/10"
            data-ai-hint="tech team collaboration"
          />
        </div>
      </section>

      {/* Mission & Vision */}
      <section className="py-24 bg-white/[0.02] border-y border-white/5 px-6 md:px-12 lg:px-16">
        <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-16">
          <div className="space-y-8">
            <div className="w-16 h-16 rounded-2xl bg-primary/10 flex items-center justify-center">
              <Rocket className="w-8 h-8 text-primary" />
            </div>
            <h2 className="text-4xl font-headline font-bold">Nuestra Misión</h2>
            <p className="text-white/60 text-lg leading-relaxed">
              Democratizar el acceso a tecnologías de alta gama para empresas en Colombia y la región, impulsando su competitividad mediante plataformas de clase mundial.
            </p>
          </div>
          <div className="space-y-8">
            <div className="w-16 h-16 rounded-2xl bg-primary/10 flex items-center justify-center">
              <Eye className="w-8 h-8 text-primary" />
            </div>
            <h2 className="text-4xl font-headline font-bold">Nuestra Visión</h2>
            <p className="text-white/60 text-lg leading-relaxed">
              Ser el socio tecnológico #1 en Latinoamérica para 2030, reconocidos por nuestra capacidad de innovación en software e IA aplicada.
            </p>
          </div>
        </div>
      </section>

      {/* Values */}
      <section className="py-24 px-6 md:px-12 lg:px-16">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-3xl font-headline font-bold text-center mb-16 uppercase tracking-[0.3em] text-primary">Nuestros Valores</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-6">
            {[
              { 
                title: "Propósito Superior", 
                desc: "Impulsar el futuro de nuestra región", 
                icon: Heart 
              },
              { title: "Innovación Radical", desc: "No seguimos tendencias, las creamos.", icon: Zap },
              { title: "Calidad Premium", desc: "Cada pixel y cada línea de código cuenta.", icon: ShieldCheck },
              { title: "Transparencia", desc: "Comunicación clara y honesta en cada paso.", icon: Users },
              { title: "Impacto Social", desc: "Tecnología que mejora vidas y negocios.", icon: Globe }
            ].map((v, i) => (
              <div key={i} className="glass-card p-8 rounded-[2.5rem] border border-white/5 text-center space-y-4 flex flex-col h-full hover:border-primary/30 transition-all group">
                <div className="w-12 h-12 rounded-xl bg-white/5 flex items-center justify-center mx-auto group-hover:bg-primary/10 transition-colors">
                  <v.icon className="w-6 h-6 text-primary" />
                </div>
                <h3 className="text-lg font-bold text-white group-hover:text-primary transition-colors">{v.title}</h3>
                <p className="text-white/40 text-xs leading-relaxed flex-1">{v.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Interactive Team Showcase */}
      <section className="py-24 md:py-40 bg-black overflow-hidden px-6 md:px-12 lg:px-16">
        <div className="max-w-screen-2xl mx-auto">
          <div className="mb-16 space-y-4">
            <h2 className="text-primary font-bold uppercase tracking-[0.4em] text-xs">Equipo Táctico</h2>
            <h3 className="text-4xl md:text-6xl font-headline font-black text-white uppercase leading-none">Las Mentes que <span className="text-primary italic">Desafían</span> lo Imposible</h3>
          </div>

          <Carousel 
            setApi={setApi}
            opts={{ align: "center", loop: true }} 
            className="w-full"
          >
            <CarouselContent className="-ml-0">
              {displayTeam.map((member, idx) => {
                const isActive = current === idx;
                const isPrev = current === (idx + 1) % displayTeam.length;
                const isNext = current === (idx - 1 + displayTeam.length) % displayTeam.length;

                return (
                  <CarouselItem key={idx} className="pl-0 basis-full md:basis-[70%] lg:basis-[60%]">
                    <div className={cn(
                      "relative h-[450px] md:h-[650px] transition-all duration-700 ease-out overflow-hidden group",
                      !isActive && "opacity-40 grayscale scale-[0.9] blur-[2px]"
                    )}>
                      {/* Image Layer */}
                      <img 
                        src={member.profileImageUrl} 
                        alt={member.name}
                        className="w-full h-full object-cover"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent opacity-80" />

                      {/* Anterior/Próximo Labels */}
                      {!isActive && (
                        <div className="absolute inset-0 flex items-center justify-center">
                          <span className="text-white text-[10px] md:text-xs font-black uppercase tracking-[0.5em] opacity-60">
                            {isPrev ? "PRÓXIMO" : "ANTERIOR"}
                          </span>
                        </div>
                      )}

                      {/* Info Overlay (Active Only) */}
                      {isActive && (
                        <div className="absolute inset-x-0 bottom-0 p-10 md:p-16 flex flex-col md:flex-row justify-between items-end gap-8 animate-in fade-in slide-in-from-bottom-10 duration-1000">
                          <div className="space-y-2">
                            <h4 className="text-3xl md:text-5xl font-headline font-black text-white leading-none uppercase tracking-tighter">
                              {member.name}
                            </h4>
                            <p className="text-primary font-bold text-xs md:text-sm uppercase tracking-[0.3em]">
                              {member.role}
                            </p>
                          </div>
                          
                          <div className="flex flex-col items-end gap-4">
                            <Link href={`/tarjetas-neocard/${member.slug}`}>
                              <button className="flex items-center gap-4 text-white hover:text-primary transition-colors group/link">
                                <span className="text-[10px] font-black uppercase tracking-[0.3em]">Ver Perfil Inteligente</span>
                                <Plus className="w-5 h-5 group-hover/link:rotate-90 transition-transform" />
                              </button>
                            </Link>
                          </div>
                        </div>
                      )}
                    </div>
                  </CarouselItem>
                );
              })}
            </CarouselContent>
          </Carousel>

          {/* Custom Controls */}
          <div className="flex justify-center gap-12 mt-12 px-6">
            <button 
              onClick={() => api?.scrollPrev()} 
              className="group flex items-center gap-4 text-white/30 hover:text-white transition-all"
            >
              <div className="w-1 h-1 rounded-full bg-current" />
              <span className="text-[10px] font-black uppercase tracking-[0.4em]">Anterior</span>
            </button>
            <div className="flex gap-2 items-center">
              {displayTeam.map((_, i) => (
                <div 
                  key={i} 
                  className={cn(
                    "h-1 transition-all duration-500 rounded-full",
                    current === i ? "w-8 bg-primary" : "w-2 bg-white/10"
                  )} 
                />
              ))}
            </div>
            <button 
              onClick={() => api?.scrollNext()} 
              className="group flex items-center gap-4 text-white/30 hover:text-white transition-all"
            >
              <span className="text-[10px] font-black uppercase tracking-[0.4em]">Siguiente</span>
              <div className="w-1 h-1 rounded-full bg-current" />
            </button>
          </div>
        </div>
      </section>

      {/* Final CTA Section */}
      <section className="py-24 md:py-40 px-6 md:px-12 lg:px-16 relative overflow-hidden bg-[#00001D]">
        {/* Glow Decorativo */}
        <div className="absolute inset-0 z-0 opacity-20 pointer-events-none">
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-full bg-[radial-gradient(circle,rgba(248,0,55,0.2)_0%,transparent_70%)]" />
        </div>
        
        <div className="max-w-5xl mx-auto text-center relative z-10 space-y-12">
          <div className="space-y-6">
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-primary/10 border border-primary/20 backdrop-blur-md mb-2">
              <Star className="w-4 h-4 text-primary" />
              <span className="text-[10px] font-black uppercase tracking-[0.3em] text-primary">Impulsa tu Visión</span>
            </div>
            <h2 className="text-4xl md:text-7xl lg:text-8xl font-headline font-black text-white leading-[0.9] uppercase tracking-tighter">
              ¿LISTO PARA <span className="text-primary italic">LIDERAR</span> <br /> EL FUTURO?
            </h2>
            <p className="text-xl text-white/50 max-w-2xl mx-auto font-medium leading-relaxed italic">
              "No seguimos tendencias, las construimos. Hagamos realidad esa plataforma que transformará tu industria por completo."
            </p>
          </div>

          <div className="flex flex-col sm:flex-row justify-center items-center gap-6 pt-4">
            <Link href="/contacto">
              <Button size="lg" className="h-16 md:h-24 px-12 md:px-16 bg-primary hover:bg-primary/90 text-white rounded-full neon-accent text-xl md:text-2xl font-black transition-all hover:scale-105 active:scale-95 group shadow-glow-accent">
                INICIAR PROYECTO
                <Zap className="w-6 h-6 md:w-8 md:h-8 ml-4 group-hover:rotate-12 transition-transform" />
              </Button>
            </Link>
            <Link href="/servicios">
              <Button size="lg" variant="outline" className="h-16 md:h-24 px-12 md:px-16 border-white/10 hover:bg-white/5 text-white rounded-full text-lg md:text-xl font-bold backdrop-blur-md transition-all">
                EXPLORAR SOLUCIONES
              </Button>
            </Link>
          </div>

          <div className="pt-12">
            <p className="text-[10px] font-black uppercase tracking-[0.5em] text-white/20">
              NAXDE STUDIO • BOGOTÁ • LATAM
            </p>
          </div>
        </div>
      </section>

      <Footer />
      <BottomNav />
    </main>
  );
}
