"use client"

import React, { useEffect, useState, useRef } from 'react';
import { Header } from '@/components/layout/Header';
import { Footer } from '@/components/layout/Footer';
import { BottomNav } from '@/components/layout/BottomNav';
import { 
  Globe, 
  Code, 
  Zap, 
  Rocket, 
  Check, 
  ArrowRight, 
  Sparkles, 
  MousePointer2, 
  Layers, 
  Cpu, 
  Smartphone, 
  ShieldCheck,
  BarChart,
  Laptop
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from '@/components/ui/card';
import Link from 'next/link';
import { cn } from '@/lib/utils';

const webBenefits = [
  {
    title: "Inmersión WebGL",
    desc: "Experiencias 3D que rompen la pantalla y cautivan a tus clientes desde el primer segundo.",
    icon: Layers,
  },
  {
    title: "Optimización Core Web",
    desc: "Velocidad de carga instantánea que mejora tu posicionamiento SEO y retención.",
    icon: Zap,
  },
  {
    title: "Diseño Adaptativo",
    desc: "Visualización perfecta en smartphones, tablets y desktops con estética premium.",
    icon: Smartphone,
  },
  {
    title: "Arquitectura Cloud",
    desc: "Infraestructura escalable lista para soportar altos volúmenes de tráfico sin caídas.",
    icon: Cpu,
  },
  {
    title: "Seguridad Bancaria",
    desc: "Protocolos de cifrado y protección contra ataques para la tranquilidad de tu negocio.",
    icon: ShieldCheck,
  },
  {
    title: "Conversión Táctica",
    desc: "Interfaces diseñadas psicológicamente para guiar al usuario hacia la compra o registro.",
    icon: BarChart,
  }
];

const webPlans = [
  {
    name: "Landing Singular",
    desc: "Para lanzamientos de productos o campañas de alta conversión.",
    features: [
      "Diseño de una sola página",
      "Foco total en conversión (CTA)",
      "Animaciones premium sutiles",
      "Integración con WhatsApp/Email",
      "Hosting Cloud 1 año"
    ],
    price: "Desde $1.2M",
    cta: "Iniciar Campaña",
    highlight: false
  },
  {
    name: "Corporate Hub",
    desc: "La identidad digital definitiva para empresas líderes.",
    features: [
      "Hasta 10 secciones internas",
      "Gestor de contenidos (CMS)",
      "SEO avanzado optimizado",
      "Blog de noticias/táctico",
      "Integración con CRM base"
    ],
    price: "Desde $3.5M",
    cta: "Elegir Corporativo",
    highlight: true
  },
  {
    name: "Elite E-commerce",
    desc: "Plataformas de venta robustas con escala internacional.",
    features: [
      "Catálogo de productos ilimitado",
      "Pasarelas de pago (Stripe/PayU)",
      "Panel de administración pro",
      "Gestión de envíos e inventario",
      "Automatización de correos"
    ],
    price: "Desde $6.8M",
    cta: "Solicitar E-commerce",
    highlight: false
  }
];

export default function SitiosWebLanding() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [scrollProgress, setScrollProgress] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      if (!containerRef.current) return;
      const rect = containerRef.current.getBoundingClientRect();
      const windowHeight = window.innerHeight;
      const totalHeight = rect.height;
      const progress = Math.max(0, Math.min(1, -rect.top / (totalHeight - windowHeight)));
      setScrollProgress(progress);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <main ref={containerRef} className="min-h-screen bg-[#00001D] text-white font-body selection:bg-primary/30 overflow-x-hidden">
      <Header />

      {/* SECTION 1: HERO MONUMENTAL */}
      <section className="relative pt-32 md:pt-48 pb-24 md:pb-40 px-6">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-full bg-[radial-gradient(circle,rgba(82,0,248,0.15)_0%,transparent_70%)] pointer-events-none" />
        
        <div className="max-w-7xl mx-auto relative z-10 text-center space-y-12">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-blue-500/10 border border-blue-500/20 backdrop-blur-md animate-in fade-in slide-in-from-bottom-4 duration-700">
            <Sparkles className="w-4 h-4 text-blue-400 animate-pulse" />
            <span className="text-[10px] font-black uppercase tracking-[0.3em] text-blue-400">Ingeniería Web de Vanguardia</span>
          </div>
          
          <h1 className="text-5xl md:text-8xl lg:text-[11rem] font-headline font-black tracking-tighter leading-[0.85] uppercase animate-in fade-in slide-in-from-bottom-8 duration-1000 delay-200">
            SITIOS QUE <br /> <span className="text-primary italic">DESAFÍAN</span> <br /> LA REALIDAD.
          </h1>
          
          <p className="text-xl md:text-2xl text-white/40 max-w-2xl mx-auto font-medium animate-in fade-in duration-1000 delay-500 italic">
            No creamos páginas, construimos portales interactivos que elevan tu marca a una dimensión inigualable.
          </p>

          <div className="pt-12 relative max-w-5xl mx-auto">
            {/* Laptop Mockup 3D */}
            <div className="relative aspect-video w-full rounded-[3rem] overflow-hidden bg-black border-[12px] border-[#222] shadow-[0_0_100px_rgba(0,0,0,0.8)] transition-transform duration-1000">
              <iframe 
                src="/preview/web-design?mode=mockup" 
                className="w-full h-full border-none no-scrollbar opacity-80"
                title="Naxde Web Preview"
              />
              <div className="absolute inset-0 pointer-events-none bg-gradient-to-t from-black/40 via-transparent to-transparent" />
            </div>
            
            {/* Elementos Flotantes */}
            <div className="absolute -top-10 -right-10 w-40 h-40 bg-primary/20 blur-[80px] rounded-full animate-pulse" />
            <div className="absolute -bottom-10 -left-10 w-40 h-40 bg-secondary/20 blur-[80px] rounded-full animate-pulse delay-700" />
          </div>
        </div>
      </section>

      {/* SECTION 2: BENEFICIOS DE ALTA GAMA */}
      <section className="py-24 md:py-40 bg-white/[0.02] border-y border-white/5 relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-6 relative z-10">
          <div className="flex flex-col md:flex-row justify-between items-end gap-8 mb-20">
            <div className="space-y-6 max-w-2xl">
              <h2 className="text-4xl md:text-7xl font-headline font-black text-white leading-none tracking-tighter uppercase">
                PODER <br />
                <span className="text-primary italic">TECNOLÓGICO</span>.
              </h2>
              <p className="text-lg md:text-xl text-white/40 leading-relaxed font-medium">
                Cada línea de código está optimizada para la conversión masiva y la estabilidad absoluta.
              </p>
            </div>
            <div className="flex items-center gap-4 text-primary font-bold text-xs uppercase tracking-[0.4em]">
              <div className="w-12 h-px bg-primary/30" />
              Web 3.0 Ready
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {webBenefits.map((benefit, idx) => (
              <div key={idx} className="group p-10 rounded-[3rem] bg-white/[0.02] border border-white/5 hover:border-primary/30 transition-all duration-500">
                <div className="w-16 h-16 rounded-2xl bg-white/5 flex items-center justify-center mb-8 group-hover:bg-primary/10 group-hover:scale-110 transition-all border border-white/5">
                  <benefit.icon className="w-8 h-8 text-primary" />
                </div>
                <h3 className="text-2xl font-headline font-black text-white mb-4 uppercase tracking-tight">{benefit.title}</h3>
                <p className="text-white/50 leading-relaxed font-medium">{benefit.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* SECTION 3: PLANES DE DESARROLLO */}
      <section className="py-24 md:py-40 px-6 relative">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-secondary/5 rounded-full blur-[150px] -z-10" />
        
        <div className="max-w-7xl mx-auto text-center space-y-24">
          <div className="space-y-6">
            <h2 className="text-5xl md:text-8xl font-headline font-black text-white leading-none tracking-tighter uppercase">
              MATRIZ DE <span className="text-primary italic">INGENIERÍA</span>
            </h2>
            <p className="text-lg md:text-xl text-white/40 max-w-xl mx-auto font-medium">
              Estructuras digitales diseñadas para el crecimiento exponencial de tu marca.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-left">
            {webPlans.map((plan, idx) => (
              <Card key={idx} className={cn(
                "relative p-8 md:p-12 rounded-[3.5rem] bg-white/[0.02] border border-white/5 transition-all duration-500 flex flex-col group",
                plan.highlight && "border-primary/30 bg-primary/[0.02] shadow-glow-accent"
              )}>
                {plan.highlight && (
                  <Badge className="absolute top-8 right-8 bg-primary text-white text-[10px] font-black uppercase tracking-widest px-4 py-1.5 rounded-full">
                    MÁS SOLICITADO
                  </Badge>
                )}
                
                <CardHeader className="p-0 mb-10">
                  <CardTitle className="text-3xl font-headline font-black text-white uppercase tracking-tight mb-2">
                    {plan.name}
                  </CardTitle>
                  <CardDescription className="text-white/40 font-medium text-sm">
                    {plan.desc}
                  </CardDescription>
                </CardHeader>

                <CardContent className="p-0 flex-1">
                  <ul className="space-y-5 mb-12">
                    {plan.features.map((f, i) => (
                      <li key={i} className="flex items-center gap-4 group/item">
                        <div className="w-6 h-6 rounded-full bg-white/5 flex items-center justify-center shrink-0 border border-white/5 group-hover/item:bg-primary/20 transition-colors">
                          <Check className="w-3 h-3 text-primary" />
                        </div>
                        <span className="text-white/60 text-sm font-medium group-hover/item:text-white transition-colors">{f}</span>
                      </li>
                    ))}
                  </ul>
                </CardContent>

                <CardFooter className="p-0 pt-8 border-t border-white/5">
                  <div className="w-full space-y-6">
                    <div className="flex items-baseline gap-2">
                      <span className="text-4xl font-headline font-black text-white">{plan.price}</span>
                      <span className="text-white/30 text-xs font-bold uppercase tracking-widest">/ COP</span>
                    </div>
                    <Link href="/contacto" className="block w-full">
                      <Button className={cn(
                        "w-full h-16 rounded-2xl font-black uppercase tracking-widest text-xs transition-all hover:scale-[1.02] group/btn",
                        plan.highlight ? "bg-primary hover:bg-primary/90 text-white shadow-glow-accent" : "bg-white/5 hover:bg-white/10 text-white border border-white/10"
                      )}>
                        {plan.cta}
                        <ArrowRight className="w-4 h-4 ml-2 group-hover/btn:translate-x-1 transition-transform" />
                      </Button>
                    </Link>
                  </div>
                </CardFooter>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* SECTION FINAL: CONVERSIÓN */}
      <section className="py-24 md:py-40 px-6 relative overflow-hidden text-center bg-[#F0F4FF]">
        <div className="absolute inset-0 z-0 opacity-[0.05] pointer-events-none bg-[url('https://grainy-gradients.vercel.app/noise.svg')]" />
        
        <div className="max-w-5xl mx-auto space-y-12 relative z-10">
          <div className="space-y-6">
            <h2 className="text-5xl md:text-8xl font-headline font-black text-black leading-[0.9] tracking-tighter uppercase">
              TU VISIÓN <br /> <span className="text-primary italic">ONLINE</span> <br /> SIN LÍMITES.
            </h2>
            <p className="text-xl md:text-2xl text-black/40 font-medium max-w-2xl mx-auto">
              Únete a las empresas que están definiendo el futuro digital en Latinoamérica con Naxde Studio.
            </p>
          </div>

          <div className="flex flex-col sm:flex-row justify-center gap-6 pt-4">
            <Link href="/contacto">
              <Button size="lg" className="h-20 px-12 md:px-16 bg-primary hover:bg-primary/90 text-white rounded-full neon-accent text-xl md:text-2xl font-black transition-all hover:scale-105 active:scale-95 shadow-glow-accent group">
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
