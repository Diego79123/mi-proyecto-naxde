
"use client"

import React from 'react';
import { Header } from '@/components/layout/Header';
import { Footer } from '@/components/layout/Footer';
import { BottomNav } from '@/components/layout/BottomNav';
import { useCollection, useFirestore, useMemoFirebase } from '@/firebase';
import { collection, query, where } from 'firebase/firestore';
import { Smartphone, Zap, ArrowRight, Linkedin, Mail, MessageCircle, Sparkles } from 'lucide-react';
import { Button } from '@/components/ui/button';
import Link from 'next/link';

export default function NeocardPortfolio() {
  const db = useFirestore();

  const membersRef = useMemoFirebase(() => {
    return query(collection(db, 'team_members'), where('isActive', '==', true));
  }, [db]);

  const { data: members, isLoading } = useCollection(membersRef);

  const mockMembers = [
    {
      id: 'oscar-rivera',
      name: 'Oscar Rivera',
      role: 'Project Manager',
      slug: 'oscar-rivera',
      profileImageUrl: 'https://firebasestorage.googleapis.com/v0/b/studio-4920931495-1d74b.firebasestorage.app/o/Tarjetas%20digitales%2FNaxde%2FPerfil%20oscar.jpeg?alt=media&token=1b57f085-d1fd-4435-8693-1be5d9bdd2b1',
      bio: 'Project Manager experto en ecosistemas Neocard, diseño web de alta conversión y soluciones de IA.',
      linkedinUrl: '#',
      email: 'naxdeadmon@gmail.com',
      whatsapp: '573194254196'
    }
  ];

  const displayMembers = (members && members.length > 0) ? members : mockMembers;

  return (
    <main className="min-h-screen bg-[#00001D] text-white font-body selection:bg-primary/30">
      <Header />

      <section className="pt-40 pb-20 px-6 relative overflow-hidden text-center">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-primary/5 rounded-full blur-[150px] -z-10" />
        <div className="max-w-7xl mx-auto space-y-8">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/5 border border-white/10 backdrop-blur-md">
            <Smartphone className="w-4 h-4 text-primary" />
            <span className="text-[10px] font-bold uppercase tracking-[0.3em] text-white/60">Ecosistema Inteligente</span>
          </div>
          <h1 className="text-5xl md:text-8xl font-headline font-black tracking-tighter leading-[0.9] uppercase">
            NEO<span className="text-primary italic">CARD</span> HUB.
          </h1>
          <p className="text-xl text-white/50 max-w-3xl mx-auto leading-relaxed font-medium">
            Perfiles inteligentes diseñados para el networking del futuro. Explora las identidades digitales que están transformando Latinoamérica.
          </p>
        </div>
      </section>

      <section className="py-24 px-6">
        <div className="max-w-7xl mx-auto">
          {isLoading ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {[1, 2, 3].map((i) => (
                <div key={i} className="aspect-[3/4] rounded-[2.5rem] bg-white/5 animate-pulse" />
              ))}
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
              {displayMembers.map((member) => (
                <div 
                  key={member.id} 
                  className="group relative h-[600px] rounded-[3rem] overflow-hidden border border-white/5 hover:border-primary/30 transition-all duration-700 shadow-2xl"
                >
                  <div className="absolute inset-0 z-0">
                    <img 
                      src={member.profileImageUrl} 
                      alt={member.name}
                      className="w-full h-full object-cover grayscale opacity-40 group-hover:grayscale-0 group-hover:opacity-60 group-hover:scale-105 transition-all duration-1000"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-[#00001D] via-[#00001D]/40 to-transparent" />
                  </div>

                  <div className="absolute inset-0 z-10 p-10 flex flex-col justify-end space-y-6">
                    <div className="space-y-2">
                      <h2 className="text-4xl font-headline font-black text-white group-hover:text-primary transition-colors duration-300 uppercase tracking-tighter">
                        {member.name}
                      </h2>
                      <div className="flex items-center gap-3">
                        <div className="w-2 h-2 rounded-full bg-primary animate-pulse" />
                        <p className="text-primary text-xs font-black uppercase tracking-[0.4em]">
                          {member.role}
                        </p>
                      </div>
                    </div>

                    <p className="text-white/50 text-sm leading-relaxed line-clamp-3 font-medium">
                      {member.bio}
                    </p>

                    <div className="flex gap-4 pt-2">
                      {[Linkedin, Mail, MessageCircle].map((Icon, idx) => (
                        <div key={idx} className="w-12 h-12 rounded-2xl bg-white/5 flex items-center justify-center border border-white/5 hover:bg-primary/10 hover:border-primary/30 transition-all cursor-pointer">
                          <Icon className="w-5 h-5 text-white/40" />
                        </div>
                      ))}
                    </div>

                    <div className="pt-6 border-t border-white/10">
                      <Link href={`/tarjetas-neocard/${member.slug}`}>
                        <Button className="w-full h-16 bg-white/5 hover:bg-primary text-white border border-white/10 hover:border-primary rounded-2xl font-black uppercase tracking-widest text-xs gap-3 transition-all duration-300 group/btn">
                          VER PERFIL INTELIGENTE
                          <ArrowRight className="w-5 h-5 group-hover/btn:translate-x-2 transition-transform" />
                        </Button>
                      </Link>
                    </div>
                  </div>

                  <div className="absolute top-8 left-8 z-20">
                    <div className="px-4 py-2 rounded-full bg-primary/20 backdrop-blur-md border border-primary/30 flex items-center gap-2">
                      <Zap className="w-4 h-4 text-primary" />
                      <span className="text-[10px] font-black text-primary uppercase tracking-[0.3em]">NFC ACTIVE</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </section>

      <section className="py-24 md:py-40 px-6 relative">
        <div className="max-w-5xl mx-auto text-center space-y-12">
          <div className="space-y-6">
            <h2 className="text-4xl md:text-7xl font-headline font-black uppercase tracking-tighter leading-[0.9]">
              CONSIGUE TU <br /> <span className="text-primary italic">LOOK</span> DIGITAL.
            </h2>
            <p className="text-lg text-white/40 max-w-xl mx-auto font-medium">
              Únete a la nueva élite de networking. Elige el plan que elevará tu identidad al siguiente nivel.
            </p>
          </div>
          <Link href="/contacto">
            <Button size="lg" className="h-20 px-12 bg-primary hover:bg-primary/90 text-white rounded-full neon-accent text-2xl font-black transition-all hover:scale-105 shadow-glow-accent">
              PEDIR AHORA
            </Button>
          </Link>
        </div>
      </section>

      <Footer />
      <BottomNav />
    </main>
  );
}
