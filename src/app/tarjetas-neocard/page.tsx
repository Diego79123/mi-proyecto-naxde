
"use client"

import React, { useEffect, useState, useRef } from 'react';
import { Header } from '@/components/layout/Header';
import { Footer } from '@/components/layout/Footer';
import { BottomNav } from '@/components/layout/BottomNav';
import {
  Smartphone,
  Zap,
  ArrowRight,
  Check,
  ShieldCheck,
  BarChart3,
  Settings2,
  Globe,
  Cpu,
  Users,
  Rocket,
  Leaf,
  Layers,
  Sparkles,
  MousePointer2,
  Mail,
  MessageCircle,
  Database,
  Linkedin,
  ExternalLink
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from '@/components/ui/card';
import Link from 'next/link';
import { cn } from '@/lib/utils';
import { useCollection, useFirestore, useMemoFirebase } from '@/firebase';
import { collection, query, where } from 'firebase/firestore';

const floatingBenefits = [
  {
    id: 1,
    title: "Networking Pro",
    desc: "Conecta instantáneamente con un solo toque NFC.",
    icon: Zap,
    pos: "top-[10%] left-[-15%] md:left-[-25%]",
    line: "right-0 top-1/2 w-20 md:w-40 h-px bg-gradient-to-r from-primary to-transparent"
  },
  {
    id: 2,
    title: "Eco-Friendly",
    desc: "Reduce el uso de tarjetas físicas y el CO2.",
    icon: Leaf,
    pos: "top-[25%] right-[-15%] md:right-[-25%]",
    line: "left-0 top-1/2 w-20 md:w-40 h-px bg-gradient-to-l from-primary to-transparent"
  },
  {
    id: 3,
    title: "Control Total",
    desc: "Actualiza tu perfil en tiempo real 24/7.",
    icon: Settings2,
    pos: "bottom-[25%] left-[-15%] md:left-[-25%]",
    line: "right-0 top-1/2 w-20 md:w-40 h-px bg-gradient-to-r from-primary to-transparent"
  },
  {
    id: 4,
    title: "Métricas",
    desc: "Analiza interacciones en tiempo real.",
    icon: BarChart3,
    pos: "bottom-[10%] right-[-15%] md:right-[-25%]",
    line: "left-0 top-1/2 w-20 md:w-40 h-px bg-gradient-to-l from-primary to-transparent"
  }
];

const ecosystemBenefits = [
  {
    title: "Perfil Pro en Segundos",
    desc: "Comparte tu identidad profesional con un solo toque o escaneo de código QR.",
    icon: Zap,
  },
  {
    title: "Enlaces Centralizados",
    desc: "Reúne tus redes, portafolios y archivos en un solo ecosistema inteligente.",
    icon: Layers,
  },
  {
    title: "Integración CRM",
    desc: "Captura prospectos y sincroniza automáticamente con tus herramientas de ventas.",
    icon: Database,
  },
  {
    title: "Actualización Instantánea",
    desc: "Cambia tu cargo o contacto y se verá reflejado en todas tus tarjetas activas.",
    icon: Cpu,
  },
  {
    title: "Diseño Personalizable",
    desc: "Refleja la exclusividad de tu marca con perfiles premium hechos a medida.",
    icon: Sparkles,
  },
  {
    title: "Escalabilidad Corporativa",
    desc: "Ideal para equipos comerciales que buscan estandarizar su impacto en el mercado.",
    icon: Users,
  }
];

const plans = [
  {
    name: "NeoCard Starter",
    desc: "Ideal para profesionales independientes.",
    features: [
      "Tarjeta digital personalizada",
      "Compartir por QR y NFC",
      "Enlaces a redes sociales",
      "Guardar contacto automático",
      "Soporte estándar"
    ],
    price: "Solicitar",
    cta: "Empezar Ahora",
    highlight: false
  },
  {
    name: "NeoCard Pro",
    desc: "Para profesionales y equipos comerciales.",
    features: [
      "Todo lo del plan Starter",
      "Formularios de captación de leads",
      "Integración con CRM base",
      "Analítica avanzada de clics",
      "Diseño premium itálico"
    ],
    price: "Solicitar",
    cta: "Elegir Pro",
    highlight: true
  },
  {
    name: "NeoCard Enterprise",
    desc: "Solución para empresas y organizaciones.",
    features: [
      "Gestión de múltiples usuarios",
      "Panel administrativo central",
      "Automatización de contactos",
      "Integración con sistemas ERP",
      "Soporte prioritario 24/7"
    ],
    price: "Cotizar",
    cta: "Solicitar Demo",
    highlight: false
  }
];

export default function NeocardLanding() {
  const [isVisible, setIsVisible] = useState(false);
  const db = useFirestore();

  const membersRef = useMemoFirebase(() => {
    return query(collection(db, 'team_members'), where('isActive', '==', true));
  }, [db]);

  const { data: members, isLoading: isMembersLoading } = useCollection(membersRef);

  const mockMembers = [
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
    },
    {
      id: 'bonilla-vergara',
      name: 'Bonilla & Vergara',
      role: 'Taller de Tagua',
      slug: 'bonilla-vergara',
      profileImageUrl: 'https://images.unsplash.com/photo-1513519245088-0e12902e5a38?q=80&w=1000',
      bio: 'Arte y tradición transformados en piezas únicas de tagua. Identidad artesanal con visión digital.',
      linkedinUrl: '#',
      email: 'contacto@tallertagua.com',
      whatsapp: '573000000000'
    },
    {
      id: 'marcos-silva',
      name: 'Marcos Silva',
      role: 'Head of AI Applied',
      slug: 'marcos-silva',
      profileImageUrl: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=1000',
      bio: 'Optimizando negocios mediante modelos predictivos y agentes inteligentes.',
      linkedinUrl: '#',
      email: 'marcos@naxde.com',
      whatsapp: '573000000000'
    }
  ];

  const displayMembers = (members && members.length > 0) ? members : mockMembers;

  useEffect(() => {
    setIsVisible(true);
  }, []);

  return (
    <main className="min-h-screen bg-[#00001D] text-white font-body selection:bg-primary/30 overflow-x-hidden">
      <Header />

      <section className="relative pt-32 md:pt-48 pb-24 md:pb-40 px-6 md:px-12 lg:px-16">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-full bg-[radial-gradient(circle,rgba(82,0,248,0.15)_0%,transparent_70%)] pointer-events-none" />

        <div className="max-w-7xl mx-auto relative z-10">
          <div className="text-center space-y-8 mb-20 md:mb-32">
            <div className={cn(
              "inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-primary/10 border border-primary/20 backdrop-blur-md transition-all duration-1000",
              isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
            )}>
              <Sparkles className="w-4 h-4 text-primary animate-pulse" />
              <span className="text-[10px] font-black uppercase tracking-[0.3em] text-primary">Tecnología de Contacto Pro</span>
            </div>

            <h1 className={cn(
              "text-5xl md:text-8xl lg:text-[10rem] font-headline font-black tracking-tighter leading-[0.85] uppercase transition-all duration-1000 delay-300",
              isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
            )}>
              EL FUTURO <br /> ES <span className="text-primary italic">NEOCARD</span>.
            </h1>

            <p className={cn(
              "text-xl md:text-2xl text-white/40 max-w-2xl mx-auto font-medium transition-all duration-1000 delay-500",
              isVisible ? "opacity-100" : "opacity-0"
            )}>
              La tarjeta digital inteligente que transforma cada encuentro en una oportunidad de negocio inmersiva.
            </p>
          </div>

          <div className="relative max-w-md mx-auto h-[600px] md:h-[750px] flex items-center justify-center">
            {floatingBenefits.map((b, idx) => (
              <div
                key={b.id}
                className={cn(
                  "absolute z-30 w-40 md:w-56 p-4 rounded-2xl glass-card border-white/10 hidden sm:block transition-all duration-1000",
                  b.pos,
                  isVisible ? "opacity-100 translate-x-0" : "opacity-0 translate-x-10"
                )}
                style={{ transitionDelay: `${700 + idx * 200}ms` }}
              >
                <div className="flex items-center gap-3 mb-2">
                  <div className="w-8 h-8 rounded-lg bg-primary/20 flex items-center justify-center">
                    <b.icon className="w-4 h-4 text-primary" />
                  </div>
                  <h4 className="text-[10px] font-black uppercase tracking-widest">{b.title}</h4>
                </div>
                <p className="text-[9px] text-white/40 font-medium leading-relaxed">{b.desc}</p>
                <div className={cn("absolute pointer-events-none", b.line)} />
              </div>
            ))}

            <div className={cn(
              "relative w-[280px] h-[580px] md:w-[320px] md:h-[660px] bg-black rounded-[3.5rem] border-[10px] border-white/5 shadow-[0_0_100px_rgba(0,0,0,0.8)] overflow-hidden transition-all duration-1000 delay-700",
              isVisible ? "scale-100 opacity-100" : "scale-90 opacity-0"
            )}>
              <div className="absolute top-0 left-1/2 -translate-x-1/2 w-32 h-7 bg-black rounded-b-2xl z-50 flex items-center justify-center gap-2">
                <div className="w-8 h-1 bg-white/5 rounded-full" />
                <div className="w-2 h-2 bg-white/10 rounded-full" />
              </div>

              <div className="absolute inset-0 rounded-[2.8rem] overflow-hidden bg-[#00001D]">
                <iframe
                  src="/tarjetas-neocard/oscar-rivera?mode=mockup"
                  className="w-full h-full border-none no-scrollbar pointer-events-auto"
                  title="NeoCard Preview"
                />
              </div>

              <div className="absolute inset-0 pointer-events-none z-40 bg-gradient-to-tr from-white/[0.03] via-transparent to-white/[0.05]" />
            </div>

            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-primary/20 rounded-full blur-[140px] -z-10 animate-pulse" />
          </div>
        </div>
      </section>

      <section className="py-24 md:py-40 px-6 md:px-12 lg:px-16 bg-white/[0.02] border-y border-white/5 relative overflow-hidden">
        <div className="max-w-7xl mx-auto relative z-10">
          <div className="flex flex-col md:flex-row justify-between items-end gap-8 mb-20">
            <div className="space-y-6 max-w-2xl">
              <h2 className="text-4xl md:text-7xl font-headline font-black text-white leading-none tracking-tighter uppercase">
                NETWORKING <br />
                <span className="text-primary italic">PROFESIONAL</span>.
              </h2>
              <p className="text-lg md:text-xl text-white/40 leading-relaxed font-medium">
                NeoCard no es solo una tarjeta digital; es un ecosistema diseñado para maximizar tu impacto profesional y empresarial.
              </p>
            </div>
            <div className="flex items-center gap-4 text-primary font-bold text-xs uppercase tracking-[0.4em]">
              <div className="w-12 h-px bg-primary/30" />
              Impacto Premium
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {ecosystemBenefits.map((benefit, idx) => (
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

      <section className="py-24 md:py-40 px-6 md:px-12 lg:px-16 relative overflow-hidden bg-[#00001D]">
        <div className="absolute inset-0 bg-[radial-gradient(circle,rgba(82,0,248,0.05)_0%,transparent_70%)] pointer-events-none" />

        <div className="max-w-7xl mx-auto relative z-10">
          <div className="text-center space-y-6 mb-20">
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-primary/10 border border-primary/20 backdrop-blur-md">
              <Zap className="w-4 h-4 text-primary animate-pulse" />
              <span className="text-[10px] font-bold uppercase tracking-[0.3em] text-primary">Showcase Premium</span>
            </div>
            <h2 className="text-5xl md:text-7xl font-headline font-black text-white uppercase tracking-tighter leading-none">
              IDENTIDADES <br />
              <span className="text-primary italic">CONSTRUIDAS</span>.
            </h2>
            <p className="text-white/40 font-medium text-lg max-w-2xl mx-auto">
              Explora los perfiles inteligentes que hemos diseñado para líderes y organizaciones que ya habitan el futuro.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
            {isMembersLoading ? (
              [1, 2, 3].map((i) => (
                <div key={i} className="aspect-[3/4] rounded-[2.5rem] bg-white/5 animate-pulse" />
              ))
            ) : (
              displayMembers.map((member) => (
                <div
                  key={member.id}
                  className="group relative h-[550px] rounded-[2.5rem] overflow-hidden border border-white/5 hover:border-primary/30 transition-all duration-700 shadow-2xl"
                >
                  <div className="absolute inset-0 z-0">
                    <img
                      src={member.profileImageUrl}
                      alt={member.name}
                      className="w-full h-full object-cover grayscale opacity-40 group-hover:grayscale-0 group-hover:opacity-60 transition-all duration-700"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-[#00001D] via-[#00001D]/60 to-transparent" />
                  </div>

                  <div className="absolute inset-0 z-10 p-10 flex flex-col justify-end space-y-6">
                    <div>
                      <h2 className="text-3xl font-headline font-bold text-white group-hover:text-primary transition-colors duration-300">
                        {member.name}
                      </h2>
                      <p className="text-primary text-xs font-bold uppercase tracking-[0.3em] mt-2">
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

                  <div className="absolute top-6 left-6 z-20">
                    <div className="px-3 py-1 rounded-full bg-primary/20 backdrop-blur-md border border-primary/30 flex items-center gap-2">
                      <Zap className="w-3 h-3 text-primary" />
                      <span className="text-[10px] font-bold text-primary uppercase tracking-widest">NEOCARD ACTIVE</span>
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>

          <div className="mt-12 flex justify-center pb-10">
            <Link href="/proyectos">
              <Button className="h-14 px-10 bg-secondary hover:bg-secondary/90 text-white rounded-2xl font-bold gap-3 transition-all group shadow-glow-complement border-none">
                Ver más proyectos
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </Button>
            </Link>
          </div>
        </div>
      </section>

      <section id="planes" className="py-24 md:py-40 px-6 md:px-12 lg:px-16 relative">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-secondary/5 rounded-full blur-[150px] -z-10" />

        <div className="max-w-7xl mx-auto text-center space-y-24">
          <div className="space-y-6">
            <h2 className="text-5xl md:text-8xl font-headline font-black text-white leading-none tracking-tighter uppercase">
              PLANES <span className="text-primary italic">NEOCARD</span>
            </h2>
            <p className="text-lg md:text-xl text-white/40 max-w-xl mx-auto font-medium">
              Elige el nivel de impacto que tu carrera o empresa necesita para liderar el networking moderno.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-left">
            {plans.map((plan, idx) => (
              <Card key={idx} className={cn(
                "relative p-8 md:p-12 rounded-[3.5rem] bg-white/[0.02] border border-white/5 transition-all duration-500 flex flex-col group",
                plan.highlight && "border-primary/30 bg-primary/[0.02] shadow-glow-accent"
              )}>
                {plan.highlight && (
                  <Badge className="absolute top-8 right-8 bg-primary text-white text-[10px] font-black uppercase tracking-widest px-4 py-1.5 rounded-full">
                    RECOMENDADO
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
                      <span className="text-white/30 text-xs font-bold uppercase tracking-widest">/ Consultar</span>
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

      <section className="py-24 md:py-40 px-6 md:px-12 lg:px-16 relative overflow-hidden text-center bg-[#F0F4FF]">
        <div className="absolute inset-0 z-0 opacity-[0.05] pointer-events-none bg-[url('https://grainy-gradients.vercel.app/noise.svg')]" />

        <div className="max-w-5xl mx-auto space-y-12 relative z-10">
          <div className="space-y-6">
            <h2 className="text-5xl md:text-8xl font-headline font-black text-black leading-[0.9] tracking-tighter uppercase">
              ACTIVA TU <br /> <span className="text-primary italic">IDENTIDAD</span> <br /> DIGITAL.
            </h2>
            <p className="text-xl md:text-2xl text-black/40 font-medium max-w-2xl mx-auto">
              Únete a la élite de profesionales que están transformando su networking con la ingeniería de Naxde Studio.
            </p>
          </div>

          <div className="flex flex-col sm:flex-row justify-center gap-6 pt-4">
            <Link href="/contacto">
              <Button size="lg" className="h-20 px-12 md:px-16 bg-primary hover:bg-primary/90 text-white rounded-full neon-accent text-xl md:text-2xl font-black transition-all hover:scale-105 active:scale-95 shadow-glow-accent group">
                PEDIR MI NEOCARD
                <Zap className="w-6 h-6 md:w-8 md:h-8 ml-4 group-hover:rotate-12 transition-transform" />
              </Button>
            </Link>
          </div>
        </div>
      </section>

      <Footer />
      <BottomNav />

      <style jsx global>{`
        .no-scrollbar::-webkit-scrollbar {
          display: none;
        }
      `}</style>
    </main>
  );
}
