
"use client"

import React, { useState } from 'react';
import { Header } from '@/components/layout/Header';
import { Footer } from '@/components/layout/Footer';
import { BottomNav } from '@/components/layout/BottomNav';
import { useCollection, useFirestore, useMemoFirebase } from '@/firebase';
import { collection, query, where } from 'firebase/firestore';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Smartphone, Globe, Layout, ExternalLink, Zap, ArrowRight, Code, Sparkles, CarFront } from 'lucide-react';
import { cn } from '@/lib/utils';
import Link from 'next/link';

const categories = [
  { id: 'all', label: 'Todos', icon: Layout },
  { id: 'Neocard', label: 'Neocard', icon: Smartphone },
  { id: 'Aplicaciones', label: 'Aplicaciones', icon: Code },
  { id: 'Páginas Web', label: 'Páginas Web', icon: Globe },
];

export default function ProyectosPage() {
  const db = useFirestore();
  const [activeCategory, setActiveCategory] = useState('all');

  const projectsQuery = useMemoFirebase(() => {
    const baseRef = collection(db, 'projects');
    if (activeCategory === 'all') return query(baseRef);
    return query(baseRef, where('category', '==', activeCategory));
  }, [db, activeCategory]);

  const { data: projects, isLoading } = useCollection(projectsQuery);

  const mockProjects = [
    {
      id: 'autospec-pro',
      title: 'AutoSpec Pro',
      category: 'Aplicaciones',
      shortDescription: 'Aplicativo de ficha técnica automotriz escaneable vía NFC/QR. Diseño inmersivo para concesionarios de alta gama.',
      imageUrl: 'https://images.unsplash.com/photo-1503376780353-7e6692767b70?q=80&w=1000',
      technologies: ['NFC', 'Next.js', 'Framer Motion'],
      customHref: '/demo/auto-spec'
    },
    {
      id: 'oscar-card-project',
      title: 'Vortex Oscar Rivera',
      category: 'Neocard',
      shortDescription: 'Perfil inmersivo con temática de nebulosa espacial y tecnología NFC.',
      imageUrl: 'https://firebasestorage.googleapis.com/v0/b/studio-4920931495-1d74b.firebasestorage.app/o/Tarjetas%20digitales%2FNaxde%2FPerfil%20oscar.jpeg?alt=media&token=1b57f085-d1fd-4435-8693-1be5d9bdd2b1',
      technologies: ['NFC', 'React', 'GLSL'],
      customHref: '/tarjetas-neocard/oscar-rivera'
    },
    {
      id: 'naxde-hub',
      title: 'Naxde Digital Hub',
      category: 'Páginas Web',
      shortDescription: 'Plataforma corporativa de alta conversión con estética futurista.',
      imageUrl: 'https://images.unsplash.com/photo-1512364615838-8088a04a778b?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1080',
      technologies: ['Next.js', 'Tailwind', 'GenAI']
    }
  ];

  const displayProjects = (projects && projects.length > 0) ? projects : mockProjects;

  return (
    <main className="min-h-screen bg-[#00001D] text-white font-body selection:bg-primary/30">
      <Header />

      <section className="pt-40 pb-20 px-6 relative overflow-hidden text-center">
        <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-primary/10 rounded-full blur-[120px] -z-10" />
        <div className="max-w-7xl mx-auto space-y-8">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/5 border border-white/10 backdrop-blur-md">
            <Zap className="w-4 h-4 text-primary animate-pulse" />
            <span className="text-[10px] font-bold uppercase tracking-[0.3em] text-white/60">Portfolio Naxde</span>
          </div>
          <h1 className="text-5xl md:text-8xl font-headline font-black tracking-tighter leading-[0.9] uppercase">
            NUESTRO <span className="text-primary italic">LEGADO</span> <br /> DIGITAL.
          </h1>
          <p className="text-xl text-white/50 max-w-3xl mx-auto leading-relaxed font-medium">
            Explora las soluciones de ingeniería que hemos construido para transformar industrias enteras en Latinoamérica.
          </p>
        </div>
      </section>

      <section className="pb-12 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-wrap justify-center gap-4 bg-white/[0.02] p-2 rounded-full border border-white/5 w-fit mx-auto backdrop-blur-xl">
            {categories.map((cat) => (
              <button
                key={cat.id}
                onClick={() => setActiveCategory(cat.id)}
                className={cn(
                  "h-12 px-8 rounded-full font-black text-[10px] uppercase tracking-widest transition-all gap-3 flex items-center",
                  activeCategory === cat.id ? "bg-primary text-white neon-accent shadow-glow-accent" : "text-white/40 hover:text-white hover:bg-white/5"
                )}
              >
                <cat.icon className="w-4 h-4" />
                {cat.label}
              </button>
            ))}
          </div>
        </div>
      </section>

      <section className="py-12 px-6 min-h-[600px]">
        <div className="max-w-7xl mx-auto">
          {isLoading ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {[1, 2, 3].map((i) => (
                <div key={i} className="aspect-[4/3] rounded-[3rem] bg-white/5 animate-pulse" />
              ))}
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {displayProjects.map((project) => (
                <div key={project.id} className="group glass-card rounded-[3rem] border border-white/5 overflow-hidden hover:border-primary/30 transition-all duration-500 shadow-2xl">
                  <div className="relative aspect-[4/3] overflow-hidden">
                    <img 
                      src={project.imageUrl} 
                      alt={project.title}
                      className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-110"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-[#00001D] via-transparent to-transparent opacity-80" />
                    <div className="absolute top-6 right-6">
                      <Badge className="bg-primary/20 backdrop-blur-md border border-primary/30 text-primary uppercase text-[10px] font-black px-4 py-1.5 tracking-widest">
                        {project.category}
                      </Badge>
                    </div>
                  </div>
                  
                  <div className="p-8 space-y-6">
                    <h3 className="text-3xl font-headline font-black text-white group-hover:text-primary transition-colors uppercase tracking-tighter">{project.title}</h3>
                    <p className="text-white/50 text-sm leading-relaxed line-clamp-3 font-medium">
                      {project.shortDescription}
                    </p>
                    
                    <div className="flex flex-wrap gap-2">
                      {project.technologies?.map((tech, idx) => (
                        <span key={idx} className="text-[9px] font-black uppercase tracking-widest text-white/30 px-3 py-1.5 rounded-lg bg-white/5 border border-white/5">
                          {tech}
                        </span>
                      ))}
                    </div>

                    <div className="pt-6 flex items-center justify-between border-t border-white/5">
                      <Link href={project.customHref || `/proyectos/${project.slug || project.id}`}>
                        <Button variant="link" className="text-primary p-0 font-black uppercase tracking-[0.2em] text-[10px] gap-3 group/btn">
                          VER PROYECTO
                          <ArrowRight className="w-4 h-4 group-hover/btn:translate-x-2 transition-transform" />
                        </Button>
                      </Link>
                      <Button variant="ghost" size="icon" className="h-12 w-12 rounded-2xl border border-white/5 hover:bg-primary hover:text-white transition-all">
                        <ExternalLink className="w-5 h-5" />
                      </Button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </section>

      <Footer />
      <BottomNav />
    </main>
  );
}
