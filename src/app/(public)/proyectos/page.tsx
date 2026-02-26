
"use client"

import React, { useState } from 'react';
import { Header } from '@/components/layout/Header';
import { Footer } from '@/components/layout/Footer';
import { BottomNav } from '@/components/layout/BottomNav';
import { useCollection, useFirestore, useMemoFirebase } from '@/firebase';
import { collection, query, where } from 'firebase/firestore';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { 
  Smartphone, 
  Globe, 
  Layout, 
  ExternalLink, 
  Zap, 
  ArrowRight,
  Code
} from 'lucide-react';
import { cn } from '@/lib/utils';
import Image from 'next/image';
import Link from 'next/link';

const categories = [
  { id: 'all', label: 'Todos', icon: Layout },
  { id: 'Tarjetas Digitales', label: 'Tarjetas NFC', icon: Smartphone },
  { id: 'Aplicaciones', label: 'Aplicaciones', icon: Code },
  { id: 'Páginas Web', label: 'Páginas Web', icon: Globe },
];

export default function ProyectosPage() {
  const db = useFirestore();
  const [activeCategory, setActiveCategory] = useState('all');

  const projectsQuery = useMemoFirebase(() => {
    const baseRef = collection(db, 'projects');
    if (activeCategory === 'all') {
      return query(baseRef, where('isActive', '==', true));
    }
    return query(baseRef, where('isActive', '==', true), where('category', '==', activeCategory));
  }, [db, activeCategory]);

  const { data: projects, isLoading } = useCollection(projectsQuery);

  // Datos de ejemplo para el prototipo si no hay en Firestore
  const mockProjects = [
    {
      id: '1',
      title: 'NFC Executive Card',
      category: 'Tarjetas Digitales',
      shortDescription: 'Sistema de networking inteligente para ejecutivos de alto nivel.',
      imageUrl: 'https://picsum.photos/seed/nfc1/800/600',
      technologies: ['NFC', 'React', 'Firebase']
    },
    {
      id: '2',
      title: 'SaaS Finance Dashboard',
      category: 'Aplicaciones',
      shortDescription: 'Plataforma de gestión financiera con análisis de datos en tiempo real.',
      imageUrl: 'https://picsum.photos/seed/app1/800/600',
      technologies: ['Next.js', 'Tailwind', 'GenAI']
    },
    {
      id: '3',
      title: 'E-commerce Futurista',
      category: 'Páginas Web',
      shortDescription: 'Experiencia de compra inmersiva con animaciones premium.',
      imageUrl: 'https://picsum.photos/seed/web1/800/600',
      technologies: ['Framer Motion', 'Three.js']
    }
  ];

  const displayProjects = projects && projects.length > 0 ? projects : (activeCategory === 'all' ? mockProjects : mockProjects.filter(p => p.category === activeCategory));

  return (
    <main className="min-h-screen bg-background text-white font-body selection:bg-primary/30">
      <Header />

      {/* Hero Section */}
      <section className="pt-40 pb-20 px-6 relative overflow-hidden">
        <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-primary/10 rounded-full blur-[120px] -z-10" />
        <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-secondary/10 rounded-full blur-[100px] -z-10" />
        
        <div className="max-w-7xl mx-auto text-center space-y-8">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/5 border border-white/10 backdrop-blur-md">
            <Zap className="w-4 h-4 text-primary animate-pulse" />
            <span className="text-[10px] font-bold uppercase tracking-[0.3em] text-white/60">Portfolio Naxde</span>
          </div>
          <h1 className="text-5xl md:text-8xl font-headline font-bold tracking-tighter leading-none">
            NUESTRO <span className="text-primary italic">LEGADO</span> DIGITAL.
          </h1>
          <p className="text-xl text-white/50 max-w-3xl mx-auto leading-relaxed">
            Explora las soluciones que hemos construido para transformar la presencia digital de empresas en toda Latinoamérica.
          </p>
        </div>
      </section>

      {/* Filters Section */}
      <section className="pb-12 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-wrap justify-center gap-4 bg-white/[0.02] p-2 rounded-[2rem] border border-white/5 w-fit mx-auto backdrop-blur-xl">
            {categories.map((cat) => (
              <Button
                key={cat.id}
                onClick={() => setActiveCategory(cat.id)}
                variant={activeCategory === cat.id ? 'default' : 'ghost'}
                className={cn(
                  "h-12 px-6 rounded-full font-bold transition-all gap-2",
                  activeCategory === cat.id ? "bg-primary text-white neon-accent" : "text-white/40 hover:text-white hover:bg-white/5"
                )}
              >
                <cat.icon className="w-4 h-4" />
                {cat.label}
              </Button>
            ))}
          </div>
        </div>
      </section>

      {/* Projects Grid */}
      <section className="py-12 px-6 min-h-[600px]">
        <div className="max-w-7xl mx-auto">
          {isLoading ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {[1, 2, 3].map((i) => (
                <div key={i} className="aspect-[4/3] rounded-[2.5rem] bg-white/5 animate-pulse" />
              ))}
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {displayProjects.map((project) => (
                <div 
                  key={project.id} 
                  className="group glass-card rounded-[2.5rem] border border-white/5 overflow-hidden hover:border-primary/30 transition-all duration-500"
                >
                  <div className="relative aspect-[4/3] overflow-hidden">
                    <img 
                      src={project.imageUrl} 
                      alt={project.title}
                      className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-background via-transparent to-transparent opacity-60" />
                    <div className="absolute top-6 right-6">
                      <Badge className="bg-primary/20 backdrop-blur-md border-primary/30 text-primary uppercase text-[10px] font-bold px-3 py-1">
                        {project.category}
                      </Badge>
                    </div>
                  </div>
                  
                  <div className="p-8 space-y-4">
                    <h3 className="text-2xl font-headline font-bold text-white group-hover:text-primary transition-colors">{project.title}</h3>
                    <p className="text-white/50 text-sm leading-relaxed line-clamp-3 font-medium">
                      {project.shortDescription}
                    </p>
                    
                    <div className="flex flex-wrap gap-2 pt-2">
                      {project.technologies?.map((tech, idx) => (
                        <span key={idx} className="text-[9px] font-bold uppercase tracking-widest text-white/30 px-2 py-1 rounded-md bg-white/5 border border-white/5">
                          {tech}
                        </span>
                      ))}
                    </div>

                    <div className="pt-6 flex items-center justify-between border-t border-white/5">
                      <Link href={`/proyectos/${project.slug || project.id}`}>
                        <Button variant="link" className="text-primary p-0 font-bold uppercase tracking-widest text-xs gap-2 group/btn">
                          Ver Detalles
                          <ArrowRight className="w-4 h-4 group-hover/btn:translate-x-1 transition-transform" />
                        </Button>
                      </Link>
                      <Button variant="ghost" size="icon" className="h-10 w-10 rounded-full border border-white/10 hover:bg-primary hover:text-white transition-all">
                        <ExternalLink className="w-4 h-4" />
                      </Button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}

          {displayProjects.length === 0 && !isLoading && (
            <div className="text-center py-24 space-y-6">
              <Smartphone className="w-16 h-16 text-white/10 mx-auto" />
              <h3 className="text-2xl font-headline font-bold text-white/40">No se encontraron proyectos en esta categoría.</h3>
              <Button onClick={() => setActiveCategory('all')} variant="outline" className="border-white/10 text-white/60">
                Ver todos los proyectos
              </Button>
            </div>
          )}
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24 px-6">
        <div className="max-w-5xl mx-auto glass-card rounded-[3rem] p-12 md:p-20 text-center space-y-8 relative overflow-hidden">
          <div className="absolute top-0 right-0 w-64 h-64 bg-primary/20 rounded-full blur-[100px]" />
          <div className="absolute bottom-0 left-0 w-64 h-64 bg-secondary/20 rounded-full blur-[100px]" />
          
          <h3 className="text-4xl md:text-6xl font-headline font-bold text-white">¿TU PROYECTO ES EL <span className="text-primary italic">PRÓXIMO</span>?</h3>
          <p className="text-lg md:text-xl text-white/60 max-w-2xl mx-auto leading-relaxed">
            Estamos listos para aplicar nuestra tecnología y diseño futurista en tu próximo gran desafío digital.
          </p>
          
          <div className="flex flex-col sm:flex-row justify-center gap-6 pt-4 relative z-10">
            <Link href="/contacto">
              <Button size="lg" className="h-16 px-10 bg-primary hover:bg-primary/90 text-white rounded-full neon-accent text-xl font-bold">
                Empezar Ahora
                <Zap className="w-6 h-6 ml-2" />
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
