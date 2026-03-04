
"use client"

import React, { useState } from 'react';
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
  ArrowRight 
} from 'lucide-react';
import { PlaceHolderImages } from '@/lib/placeholder-images';
import { useCollection, useFirestore, useMemoFirebase } from '@/firebase';
import { collection, query, where } from 'firebase/firestore';
import { 
  Carousel, 
  CarouselContent, 
  CarouselItem, 
  CarouselNext, 
  CarouselPrevious 
} from "@/components/ui/carousel";
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import Link from 'next/link';

export default function SobreNosotrosPage() {
  const db = useFirestore();
  const teamRef = useMemoFirebase(() => {
    return query(collection(db, 'team_members'), where('isActive', '==', true));
  }, [db]);

  const { data: team, isLoading } = useCollection(teamRef);

  // Perfil de referencia por si no hay datos en la base
  const mockTeam = [
    {
      id: 'oscar-rivera',
      name: 'Oscar Rivera',
      role: 'CEO & Founder Naxde',
      slug: 'oscar-rivera',
      profileImageUrl: 'https://firebasestorage.googleapis.com/v0/b/studio-4920931495-1d74b.firebasestorage.app/o/Tarjetas%20digitales%2FNaxde%2FPerfil%20oscar.jpeg?alt=media&token=1b57f085-d1fd-4435-8693-1be5d9bdd2b1',
      bio: 'Liderando la transformación digital en Latinoamérica a través de tecnología NFC e Inteligencia Artificial.',
      linkedinUrl: '#',
      email: 'naxdeadmon@gmail.com',
      whatsapp: '573184254198'
    }
  ];

  const displayTeam = (team && team.length > 0) ? team : mockTeam;

  return (
    <main className="min-h-screen bg-[#00001D] text-white font-body selection:bg-primary/30">
      <Header />

      <section className="pt-40 pb-20 px-6 text-center">
        <div className="max-w-4xl mx-auto space-y-8">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/5 border border-white/10 backdrop-blur-md">
            <Rocket className="w-4 h-4 text-primary animate-pulse" />
            <span className="text-[10px] font-bold uppercase tracking-[0.3em] text-white/60">Hub de Innovación</span>
          </div>
          <h1 className="text-5xl md:text-8xl font-headline font-bold tracking-tighter leading-none uppercase">
            SOMOS <span className="text-primary italic">NAXDE</span>.
          </h1>
          <p className="text-xl text-white/50 leading-relaxed font-medium">
            Un equipo de ingenieros, diseñadores y estrategas digitales unidos por una misión: construir el futuro de los negocios en Latinoamérica a través de tecnología disruptiva.
          </p>
        </div>
      </section>

      <section className="px-6 mb-24">
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

      <section className="py-24 bg-white/[0.02] border-y border-white/5 px-6">
        <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-16">
          <div className="space-y-8">
            <div className="w-16 h-16 rounded-2xl bg-primary/10 flex items-center justify-center">
              <Rocket className="w-8 h-8 text-primary" />
            </div>
            <h2 className="text-4xl font-headline font-bold">Nuestra Misión</h2>
            <p className="text-white/60 text-lg leading-relaxed">
              Democratizar el acceso a tecnologías de alta gama para empresas de todos los tamaños en Colombia y la región, impulsando su competitividad mediante plataformas digitales de clase mundial.
            </p>
          </div>
          <div className="space-y-8">
            <div className="w-16 h-16 rounded-2xl bg-primary/10 flex items-center justify-center">
              <Eye className="w-8 h-8 text-primary" />
            </div>
            <h2 className="text-4xl font-headline font-bold">Nuestra Visión</h2>
            <p className="text-white/60 text-lg leading-relaxed">
              Ser el socio tecnológico #1 en Latinoamérica para 2030, reconocidos por nuestra capacidad de innovación en software, NFC e Inteligencia Artificial aplicada.
            </p>
          </div>
        </div>
      </section>

      <section className="py-24 px-6">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-3xl font-headline font-bold text-center mb-16 uppercase tracking-[0.3em] text-primary">Nuestros Valores</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              { title: "Innovación Radical", desc: "No seguimos tendencias, las creamos.", icon: Zap },
              { title: "Calidad Premium", desc: "Cada pixel y cada línea de código cuenta.", icon: ShieldCheck },
              { title: "Transparencia", desc: "Comunicación clara y honesta en cada paso.", icon: Users },
              { title: "Impacto Social", desc: "Tecnología que mejora vidas y negocios.", icon: Globe }
            ].map((v, i) => (
              <div key={i} className="glass-card p-10 rounded-[2.5rem] border border-white/5 text-center space-y-4">
                <div className="w-12 h-12 rounded-xl bg-white/5 flex items-center justify-center mx-auto">
                  <v.icon className="w-6 h-6 text-primary" />
                </div>
                <h3 className="text-xl font-bold">{v.title}</h3>
                <p className="text-white/40 text-sm leading-relaxed">{v.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Team Showcase Section */}
      <section className="py-24 md:py-40 bg-[#00001D] relative overflow-hidden">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-full bg-primary/5 rounded-full blur-[180px] -z-10" />
        
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center space-y-6 mb-20">
            <h2 className="text-4xl md:text-7xl font-headline font-black text-white tracking-tighter uppercase leading-none">
              NUESTRO <span className="text-primary italic">EQUIPO</span>
            </h2>
            <p className="text-xl text-white/40 max-w-2xl mx-auto font-medium">
              Conoce a los arquitectos de la singularidad digital que hacen posible lo imposible.
            </p>
          </div>

          <div className="relative">
            {isLoading ? (
              <div className="flex gap-8 overflow-hidden">
                {[1, 2, 3, 4].map((i) => (
                  <div key={i} className="min-w-[300px] h-[500px] rounded-[3rem] bg-white/5 animate-pulse" />
                ))}
              </div>
            ) : (
              <Carousel 
                opts={{ align: "start", loop: true }} 
                className="w-full"
              >
                <CarouselContent className="-ml-4">
                  {displayTeam.map((member, idx) => (
                    <CarouselItem key={idx} className="pl-4 basis-full sm:basis-1/2 lg:basis-1/3 xl:basis-1/4">
                      <div className="group relative h-[550px] rounded-[3rem] overflow-hidden border border-white/5 bg-white/[0.02] transition-all duration-700 hover:border-primary/40 hover:bg-white/[0.05]">
                        
                        {/* Member Image Overlay */}
                        <div className="absolute inset-0 z-0">
                          <img 
                            src={member.profileImageUrl} 
                            alt={member.name}
                            className="w-full h-full object-cover grayscale opacity-40 group-hover:grayscale-0 group-hover:opacity-100 group-hover:scale-110 transition-all duration-1000"
                          />
                          <div className="absolute inset-0 bg-gradient-to-t from-[#00001D] via-transparent to-transparent opacity-80" />
                        </div>

                        {/* Content Overlay (Visible on Hover and Static) */}
                        <div className="absolute inset-0 z-10 p-10 flex flex-col justify-end">
                          <div className="space-y-4">
                            {/* Role (High contrast highlight) */}
                            <div className="transform translate-y-4 group-hover:translate-y-0 transition-transform duration-500">
                              <span className="text-[10px] font-black uppercase tracking-[0.4em] text-primary bg-primary/10 px-3 py-1 rounded-full border border-primary/20 backdrop-blur-md">
                                {member.role}
                              </span>
                            </div>

                            {/* Name */}
                            <h3 className="text-3xl font-headline font-bold text-white leading-none">
                              {member.name}
                            </h3>

                            {/* Bio & Social (Reveals on Hover) */}
                            <div className="opacity-0 group-hover:opacity-100 transition-all duration-500 max-h-0 group-hover:max-h-[250px] overflow-hidden">
                              <p className="text-sm text-white/60 leading-relaxed mb-6 font-medium">
                                {member.bio}
                              </p>
                              <div className="flex gap-4 mb-6">
                                {member.linkedinUrl && (
                                  <Link href={member.linkedinUrl} target="_blank" className="w-10 h-10 rounded-xl bg-white/5 flex items-center justify-center border border-white/10 hover:bg-primary hover:border-primary hover:shadow-glow-accent transition-all">
                                    <Linkedin className="w-4 h-4" />
                                  </Link>
                                )}
                                {member.whatsapp && (
                                  <Link href={`https://wa.me/${member.whatsapp}`} target="_blank" className="w-10 h-10 rounded-xl bg-white/5 flex items-center justify-center border border-white/10 hover:bg-primary hover:border-primary hover:shadow-glow-accent transition-all">
                                    <MessageCircle className="w-4 h-4" />
                                  </Link>
                                )}
                                {member.email && (
                                  <Link href={`mailto:${member.email}`} className="w-10 h-10 rounded-xl bg-white/5 flex items-center justify-center border border-white/10 hover:bg-primary hover:border-primary hover:shadow-glow-accent transition-all">
                                    <Mail className="w-4 h-4" />
                                  </Link>
                                )}
                              </div>
                              <div className="pt-4 border-t border-white/10">
                                <Link href={`/tarjetas-neocard/${member.slug}`}>
                                  <Button variant="link" className="text-primary p-0 font-black text-xs uppercase tracking-[0.2em] group/btn hover:no-underline">
                                    Ver Neocard <ArrowRight className="w-4 h-4 ml-2 group-hover/btn:translate-x-1 transition-transform" />
                                  </Button>
                                </Link>
                              </div>
                            </div>
                          </div>
                        </div>

                        {/* Decorator Dot */}
                        <div className="absolute top-8 right-8 z-20">
                          <div className="w-2 h-2 rounded-full bg-green-500 shadow-[0_0_10px_#22c55e] animate-pulse" />
                        </div>
                      </div>
                    </CarouselItem>
                  ))}
                </CarouselContent>
                <div className="flex justify-center gap-4 mt-12">
                  <CarouselPrevious className="static translate-y-0 h-14 w-14 rounded-2xl bg-white/5 border-white/10 hover:bg-primary hover:text-white transition-all" />
                  <CarouselNext className="static translate-y-0 h-14 w-14 rounded-2xl bg-white/5 border-white/10 hover:bg-primary hover:text-white transition-all" />
                </div>
              </Carousel>
            )}
          </div>
        </div>
      </section>

      <Footer />
      <BottomNav />
    </main>
  );
}
