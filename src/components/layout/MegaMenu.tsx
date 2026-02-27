
"use client"

import React from 'react';
import Link from 'next/link';
import { X, Smartphone, Code, Globe, Zap, Users, HelpCircle, Briefcase, Mail, ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';

const categories = [
  {
    title: "Servicios",
    icon: Code,
    links: [
      { name: "Desarrollo de Software", href: "/servicios", desc: "Apps móviles y plataformas web" },
      { name: "Páginas Web Interactivas", href: "/servicios", desc: "Experiencias de alto impacto" },
      { name: "Automatización CRM", href: "/servicios", desc: "Flujos de negocio eficientes" }
    ]
  },
  {
    title: "Productos Estrella",
    icon: Smartphone,
    links: [
      { name: "Neocard (Tarjetas NFC)", href: "/tarjetas-neocard", desc: "Tu info con un solo toque" },
      { name: "Sistemas de Fidelización", href: "/productos", desc: "Puntos, QR y Dashboards" },
      { name: "Plataformas SaaS", href: "/productos", desc: "Modelos de suscripción escalables" }
    ]
  },
  {
    title: "Recursos y Empresa",
    icon: Briefcase,
    links: [
      { name: "Portafolio de Proyectos", href: "/proyectos", desc: "Casos de éxito reales" },
      { name: "Sobre Nosotros", href: "/sobre-nosotros", desc: "Nuestra visión en LATAM" },
      { name: "FAQ / Ayuda", href: "/faq", desc: "Resolvemos tus dudas" }
    ]
  }
];

export const MegaMenu = ({ isOpen, onClose }: { isOpen: boolean, onClose: () => void }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[100] bg-background/95 backdrop-blur-2xl animate-in fade-in zoom-in duration-300">
      <div className="absolute top-6 right-6">
        <Button variant="ghost" size="icon" onClick={onClose} className="text-white hover:bg-white/10 rounded-full h-12 w-12">
          <X className="w-8 h-8" />
        </Button>
      </div>

      <div className="h-full flex flex-col items-center justify-center px-6 py-20 overflow-y-auto no-scrollbar">
        <div className="max-w-6xl w-full grid grid-cols-1 md:grid-cols-3 gap-12">
          {categories.map((cat, idx) => (
            <div key={idx} className="space-y-6">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center">
                  <cat.icon className="w-5 h-5 text-primary" />
                </div>
                <h3 className="font-headline font-bold text-xl text-white">{cat.title}</h3>
              </div>
              <ul className="space-y-4">
                {cat.links.map((link, lIdx) => (
                  <li key={lIdx}>
                    <Link 
                      href={link.href} 
                      onClick={onClose}
                      className="group block p-4 rounded-xl border border-transparent hover:border-white/10 hover:bg-white/5 transition-all"
                    >
                      <div className="font-bold text-white group-hover:text-primary transition-colors flex items-center gap-2">
                        {link.name}
                        <ArrowRight className="w-4 h-4 opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all" />
                      </div>
                      <div className="text-sm text-white/50 mt-1">{link.desc}</div>
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="mt-20 w-full max-w-6xl border-t border-white/10 pt-10 flex flex-col md:flex-row items-center justify-between gap-8">
          <div className="text-center md:text-left">
            <h4 className="font-headline font-bold text-2xl text-white">¿Listo para transformar tu negocio?</h4>
            <p className="text-white/60 mt-2">Naxde construye el futuro digital de Latinoamérica hoy.</p>
          </div>
          <div className="flex flex-wrap justify-center gap-4">
            <Link href="/contacto" onClick={onClose}>
              <Button size="lg" className="bg-primary hover:bg-primary/90 text-white px-8 rounded-full neon-accent">
                Cotizar Proyecto
              </Button>
            </Link>
            <Link href="https://wa.me/57315001001" target="_blank">
              <Button size="lg" variant="outline" className="border-white/20 hover:bg-white/10 text-white rounded-full">
                WhatsApp Directo
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};
