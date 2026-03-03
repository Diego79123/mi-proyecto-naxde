
"use client"

import React from 'react';
import { 
  Bot, 
  Cpu, 
  Star, 
  Palette, 
  Layers, 
  Eye, 
  Users,
  ArrowRight,
  Sparkles,
  Headset
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import Link from 'next/link';

const extraServices = [
  {
    title: "Asistentes IA Pro",
    desc: "Chatbots cognitivos entrenados con tus datos para atención 24/7.",
    icon: Bot,
    color: "from-blue-500/20 to-cyan-500/20"
  },
  {
    title: "Flujos Automáticos",
    desc: "Automatización de procesos (RPA) para eliminar tareas repetitivas.",
    icon: Cpu,
    color: "from-purple-500/20 to-pink-500/20"
  },
  {
    title: "Fidelización 3.0",
    desc: "Sistemas de puntos y recompensas mediante tecnología NFC/QR.",
    icon: Star,
    color: "from-yellow-500/20 to-amber-500/20"
  },
  {
    title: "Design Systems",
    desc: "Lenguajes visuales coherentes y escalables para productos digitales.",
    icon: Palette,
    color: "from-pink-500/20 to-rose-500/20"
  },
  {
    title: "Motores SaaS",
    desc: "Construimos plataformas de software escalables bajo suscripción.",
    icon: Layers,
    color: "from-violet-500/20 to-purple-500/20"
  },
  {
    title: "Realidad Aumentada",
    desc: "Experiencias inmersivas que rompen la barrera entre lo físico y digital.",
    icon: Eye,
    color: "from-sky-500/20 to-blue-500/20"
  },
  {
    title: "Central CRM",
    desc: "Gestión avanzada de leads y clientes con integración omnicanal.",
    icon: Users,
    color: "from-emerald-500/20 to-teal-500/20"
  }
];

export const ExtendedServices = () => {
  return (
    <section className="py-24 md:py-40 bg-[#00001D] relative overflow-hidden">
      {/* Background Glows */}
      <div className="absolute top-[20%] left-[-10%] w-[60%] h-[40%] bg-primary/5 blur-[150px] rounded-full pointer-events-none" />
      <div className="absolute bottom-[20%] right-[-10%] w-[60%] h-[40%] bg-secondary/5 blur-[150px] rounded-full pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6 relative z-10">
        <div className="flex flex-col md:flex-row justify-between items-end gap-8 mb-20">
          <div className="space-y-6 max-w-2xl">
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/5 border border-white/10 backdrop-blur-md">
              <Sparkles className="w-4 h-4 text-primary" />
              <span className="text-[10px] font-bold uppercase tracking-[0.3em] text-white/60">Ecosistema Naxde</span>
            </div>
            <h2 className="text-5xl md:text-7xl font-headline font-black text-white leading-none tracking-tighter uppercase">
              SOLUCIONES <br />
              <span className="text-primary italic">SIN LÍMITES</span>.
            </h2>
            <p className="text-lg md:text-xl text-white/40 leading-relaxed font-medium">
              Explora nuestra gama de servicios diseñados para liderar la transformación digital en Latinoamérica.
            </p>
          </div>
          
          <Link href="/servicios">
            <Button variant="outline" className="h-14 px-8 border-white/10 hover:bg-white/5 text-white rounded-full font-bold group">
              Ver Todos los Servicios
              <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
            </Button>
          </Link>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {extraServices.map((service, idx) => (
            <div 
              key={idx} 
              className="group relative p-8 rounded-[2.5rem] bg-white/[0.02] border border-white/5 hover:border-primary/30 transition-all duration-500 overflow-hidden"
            >
              {/* Gradient Hover Effect */}
              <div className={`absolute inset-0 bg-gradient-to-br ${service.color} opacity-0 group-hover:opacity-100 transition-opacity duration-500`} />
              
              <div className="relative z-10 space-y-6">
                <div className="w-14 h-14 rounded-2xl bg-white/5 flex items-center justify-center group-hover:bg-primary group-hover:text-white transition-all duration-500 group-hover:scale-110 shadow-lg">
                  <service.icon className="w-7 h-7" />
                </div>
                
                <div className="space-y-3">
                  <h3 className="text-xl font-headline font-bold text-white group-hover:text-primary transition-colors">{service.title}</h3>
                  <p className="text-sm text-white/40 leading-relaxed line-clamp-3 group-hover:text-white/60 transition-colors">
                    {service.desc}
                  </p>
                </div>

                <div className="pt-2">
                  <div className="w-8 h-px bg-white/10 group-hover:w-full group-hover:bg-primary transition-all duration-500" />
                </div>
              </div>
            </div>
          ))}

          {/* Tarjeta CTA: Asesoría Personalizada */}
          <Link 
            href="/contacto" 
            className="group relative p-8 rounded-[2.5rem] bg-gradient-to-br from-violet-600/10 to-blue-600/10 border border-violet-500/20 hover:border-violet-400 transition-all duration-500 overflow-hidden flex flex-col justify-between"
          >
            <div className="absolute inset-0 bg-gradient-to-br from-violet-600/20 to-blue-600/20 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
            
            <div className="relative z-10 space-y-6">
              <div className="w-14 h-14 rounded-2xl bg-white/10 flex items-center justify-center group-hover:scale-110 transition-transform duration-500 shadow-lg border border-white/5">
                <Headset className="w-7 h-7 text-white" />
              </div>
              
              <div className="space-y-3">
                <h3 className="text-xl font-headline font-bold text-white group-hover:text-transparent group-hover:bg-clip-text group-hover:bg-gradient-to-r group-hover:from-white group-hover:to-blue-400 transition-all">Asesoría Pro</h3>
                <p className="text-sm text-white/50 leading-relaxed group-hover:text-white/70 transition-colors">
                  ¿Tienes un proyecto en mente? Habla con nuestro equipo comercial para una solución a medida.
                </p>
              </div>

              <div className="pt-4 flex items-center gap-3 text-blue-400 font-bold text-[10px] uppercase tracking-[0.2em] group-hover:gap-5 transition-all">
                Consultar con Ventas
                <ArrowRight className="w-4 h-4" />
              </div>
            </div>

            {/* Glow decorativo interno */}
            <div className="absolute -bottom-10 -right-10 w-32 h-32 bg-blue-500/20 blur-[50px] rounded-full group-hover:bg-blue-500/40 transition-all duration-1000" />
          </Link>
        </div>
      </div>
    </section>
  );
};
