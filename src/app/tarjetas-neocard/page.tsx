
"use client"

import React from 'react';
import { Header } from '@/components/layout/Header';
import { Footer } from '@/components/layout/Footer';
import { BottomNav } from '@/components/layout/BottomNav';
import { useCollection, useFirestore, useMemoFirebase } from '@/firebase';
import { collection, query, where } from 'firebase/firestore';
import { 
  Smartphone, 
  Zap, 
  ArrowRight,
  Linkedin,
  Mail,
  MessageCircle
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import Link from 'next/link';

export default function NeocardPortfolio() {
  const db = useFirestore();

  const membersRef = useMemoFirebase(() => {
    return query(collection(db, 'team_members'), where('isActive', '==', true));
  }, [db]);

  const { data: members, isLoading } = useCollection(membersRef);

  // Perfil de referencia siempre visible de Oscar Rivera
  const mockMembers = [
    {
      id: 'oscar-rivera',
      name: 'Oscar Rivera',
      role: 'Project Manager',
      slug: 'oscar-rivera',
      profileImageUrl: 'https://firebasestorage.googleapis.com/v0/b/studio-4920931495-1d74b.firebasestorage.app/o/Tarjetas%20digitales%2FNaxde%2FPerfil%20oscar.jpeg?alt=media&token=1b57f085-d1fd-4435-8693-1be5d9bdd2b1',
      bio: 'Project Manager experto en ecosistemas Neocard, diseño web de alta conversión, aplicaciones escalables y soluciones de Inteligencia Artificial.',
      linkedinUrl: '#',
      email: 'naxdeadmon@gmail.com',
      whatsapp: '573194254196'
    }
  ];

  const displayMembers = (members && members.length > 0) ? members : mockMembers;

  return (
    <main className="min-h-screen bg-[#00001D] text-white font-body selection:bg-primary/30">
      <Header />

      <section className="pt-40 pb-20 px-6 relative overflow-hidden">
        {/* Glow de fondo */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-primary/10 rounded-full blur-[150px] -z-10" />
        
        <div className="max-w-7xl mx-auto text-center space-y-8">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/5 border border-white/10 backdrop-blur-md">
            <Smartphone className="w-4 h-4 text-primary" />
            <span className="text-[10px] font-bold uppercase tracking-[0.3em] text-white/60">Showcase de Identidades</span>
          </div>
          <h1 className="text-5xl md:text-8xl font-headline font-bold tracking-tighter leading-none uppercase">
            NEO<span className="text-primary italic">CARD</span>.
          </h1>
          <p className="text-xl text-white/50 max-w-3xl mx-auto leading-relaxed">
            Perfiles inteligentes diseñados para el networking del futuro. Explora las identidades digitales de nuestro ecosistema.
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
                  className="group relative h-[550px] rounded-[2.5rem] overflow-hidden border border-white/5 hover:border-primary/30 transition-all duration-700"
                >
                  {/* Background Image with Overlay */}
                  <div className="absolute inset-0 z-0">
                    <img 
                      src={member.profileImageUrl} 
                      alt={member.name}
                      className="w-full h-full object-cover grayscale opacity-40 group-hover:grayscale-0 group-hover:opacity-60 transition-all duration-700"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-[#00001D] via-[#00001D]/60 to-transparent" />
                  </div>

                  {/* Content */}
                  <div className="absolute inset-0 z-10 p-10 flex flex-col justify-end space-y-6">
                    <div>
                      <h2 className="text-3xl font-headline font-bold text-white group-hover:text-primary transition-colors duration-300">
                        {member.name}
                      </h2>
                      <p className="text-primary text-sm font-bold uppercase tracking-[0.3em] mt-2">
                        {member.role}
                      </p>
                    </div>

                    <p className="text-white/50 text-sm leading-relaxed line-clamp-2">
                      {member.bio}
                    </p>

                    <div className="flex gap-4 pt-2">
                      {member.linkedinUrl && (
                        <div className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center border border-white/10">
                          <Linkedin className="w-4 h-4 text-white/60" />
                        </div>
                      )}
                      {member.whatsapp && (
                        <div className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center border border-white/10">
                          <MessageCircle className="w-4 h-4 text-white/60" />
                        </div>
                      )}
                      {member.email && (
                        <div className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center border border-white/10">
                          <Mail className="w-4 h-4 text-white/60" />
                        </div>
                      )}
                    </div>

                    <div className="pt-6 border-t border-white/10">
                      <Link href={`/tarjetas-neocard/${member.slug}`}>
                        <Button className="w-full h-14 bg-white/5 hover:bg-primary text-white border border-white/10 hover:border-primary rounded-2xl font-bold gap-3 transition-all duration-300">
                          Ver Perfil Inteligente
                          <ArrowRight className="w-4 h-4" />
                        </Button>
                      </Link>
                    </div>
                  </div>

                  {/* Badge */}
                  <div className="absolute top-6 left-6 z-20">
                    <div className="px-3 py-1 rounded-full bg-primary/20 backdrop-blur-md border border-primary/30 flex items-center gap-2">
                      <Zap className="w-3 h-3 text-primary" />
                      <span className="text-[10px] font-bold text-primary uppercase tracking-widest">NFC Active</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </section>

      <section className="py-24 px-6">
        <div className="max-w-4xl mx-auto glass-card rounded-[3rem] p-12 text-center space-y-8">
          <h3 className="text-3xl font-headline font-bold">¿QUIERES TU PROPIA NEOCARD?</h3>
          <p className="text-white/60">Únete a los líderes que ya están transformando su networking con la tecnología de Naxde.</p>
          <Link href="/contacto">
            <Button size="lg" className="h-16 px-12 bg-primary hover:bg-primary/90 text-white rounded-full neon-accent text-xl font-bold">
              Pedir Ahora
              <ArrowRight className="w-5 h-5 ml-2" />
            </Button>
          </Link>
        </div>
      </section>

      <Footer />
      <BottomNav />
    </main>
  );
}
