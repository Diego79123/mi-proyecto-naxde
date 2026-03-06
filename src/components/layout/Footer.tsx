
"use client"

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { 
  Instagram, 
  Facebook, 
  Linkedin, 
  Twitter, 
  Send, 
  ArrowUp,
  Globe,
  ShieldCheck,
  Heart
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';

const LOGO_URL = "https://firebasestorage.googleapis.com/v0/b/studio-4920931495-1d74b.firebasestorage.app/o/Logos%2FLogo%20naxde.png?alt=media&token=1df1f19b-978a-4f23-8f2f-d0d9efb42764";

export const Footer = () => {
  const [showScrollTop, setShowScrollTop] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 400) {
        setShowScrollTop(true);
      } else {
        setShowScrollTop(false);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const footerLinks = [
    {
      title: "ECOSISTEMA",
      links: [
        { name: "Plataforma ERP", href: "/servicios" },
        { name: "Naxde Studio", href: "/servicios" },
        { name: "Punto de Venta", href: "/servicios" },
        { name: "CRM & Leads", href: "/servicios" },
        { name: "E-commerce", href: "/servicios" }
      ]
    },
    {
      title: "EMPRESA",
      links: [
        { name: "Sobre Nosotros", href: "/sobre-nosotros" },
        { name: "Casos de Éxito", href: "/proyectos" },
        { name: "Blog Táctico", href: "/proyectos" },
        { name: "Carreras", href: "/contacto" },
        { name: "Ventas", href: "/contacto" }
      ]
    },
    {
      title: "RECURSOS",
      links: [
        { name: "Documentación", href: "/servicios" },
        { name: "Academia Naxde", href: "/servicios" },
        { name: "Centro de Ayuda", href: "/contacto" },
        { name: "API Status", href: "/servicios" },
        { name: "Comunidad", href: "/sobre-nosotros" }
      ]
    },
    {
      title: "LEGAL",
      links: [
        { name: "Privacidad", href: "/sobre-nosotros" },
        { name: "Términos", href: "/sobre-nosotros" },
        { name: "Seguridad", href: "/sobre-nosotros" },
        { name: "Cookies", href: "/sobre-nosotros" }
      ]
    }
  ];

  return (
    <footer className="bg-[#00001D] text-white pt-24 pb-32 md:pb-40 px-6 md:px-12 lg:px-16 border-t border-white/5">
      <div className="max-w-7xl mx-auto">
        {/* Top Section */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start mb-24">
          {/* Brand Info */}
          <div className="lg:col-span-5 space-y-8">
            <Link href="/" className="inline-block">
              <div className="relative h-10 w-32">
                <Image src={LOGO_URL} alt="Naxde Logo" fill className="object-contain" />
              </div>
            </Link>
            <p className="text-white/50 text-lg leading-relaxed max-w-sm font-medium">
              Gestionamos el futuro de las empresas mediante inteligencia artificial generativa y un ecosistema táctico sin fricciones.
            </p>
            <div className="flex items-center gap-3">
              {[
                { icon: Instagram, href: "#" },
                { icon: Twitter, href: "#" },
                { icon: Facebook, href: "#" },
                { icon: Linkedin, href: "#" }
              ].map((social, idx) => (
                <Link 
                  key={idx} 
                  href={social.href}
                  className="w-10 h-10 rounded-xl bg-white/[0.03] border border-white/5 flex items-center justify-center text-white/40 hover:text-primary hover:bg-white/[0.08] transition-all group"
                >
                  <social.icon className="w-5 h-5 group-hover:scale-110 transition-transform" />
                </Link>
              ))}
            </div>
          </div>

          {/* Subscription Box */}
          <div className="lg:col-span-7">
            <div className="p-8 md:p-12 rounded-[2.5rem] bg-white/[0.02] border border-white/5 relative overflow-hidden group">
              <div className="absolute top-0 right-0 p-8 text-white/[0.03] pointer-events-none">
                <Send className="w-24 h-24 rotate-[-15deg]" />
              </div>
              
              <div className="relative z-10 space-y-8">
                <div>
                  <h3 className="text-2xl md:text-3xl font-headline font-bold text-white mb-2">Únete al pulso tecnológico</h3>
                  <p className="text-white/40 text-sm">Recibe actualizaciones sobre nuevos módulos, IA insights y ofertas exclusivas.</p>
                </div>

                <div className="flex flex-col sm:flex-row gap-4">
                  <input 
                    type="email" 
                    placeholder="tu@empresa.com" 
                    className="flex-1 h-14 bg-black/40 rounded-2xl px-6 text-sm border border-white/5 focus:outline-none focus:border-primary/30 transition-all"
                  />
                  <Button className="h-14 px-10 bg-[#8B5CF6] hover:bg-[#7C3AED] text-white rounded-2xl font-black uppercase tracking-widest text-xs shadow-[0_0_20px_rgba(139,92,246,0.3)] transition-all">
                    SUSCRIBIRME <Send className="w-4 h-4 ml-2" />
                  </Button>
                </div>
                
                <p className="text-[10px] font-bold text-white/20 uppercase tracking-[0.2em]">
                  RESPETAMOS TU PRIVACIDAD. SIN SPAM, SOLO TECNOLOGÍA PURA.
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Middle Section: Links */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-12 mb-24 border-t border-white/5 pt-20">
          {footerLinks.map((col, idx) => (
            <div key={idx} className="space-y-8">
              <h4 className="text-[10px] font-black uppercase tracking-[0.3em] text-[#8B5CF6]">{col.title}</h4>
              <ul className="space-y-4">
                {col.links.map((link, lIdx) => (
                  <li key={lIdx}>
                    <Link href={link.href} className="text-sm font-medium text-white/40 hover:text-white transition-colors">
                      {link.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Bottom Bar */}
        <div className="pt-12 border-t border-white/5 flex flex-col lg:flex-row justify-between items-center gap-8">
          <div className="flex flex-col md:flex-row items-center gap-6">
            <p className="text-[10px] font-bold uppercase tracking-widest text-white/20">
              © {new Date().getFullYear()} NAXDE TECHNOLOGIES INC.
            </p>
            <div className="flex items-center gap-4">
              <div className="flex items-center gap-2 px-3 py-1 rounded-full bg-white/[0.03] border border-white/5">
                <Globe className="w-3 h-3 text-white/40" />
                <span className="text-[9px] font-bold text-white/40 uppercase tracking-widest">DE LATAM PARA EL MUNDO</span>
              </div>
              <div className="flex items-center gap-2 px-3 py-1 rounded-full bg-white/[0.03] border border-white/5">
                <ShieldCheck className="w-3 h-3 text-white/40" />
                <span className="text-[9px] font-bold text-white/40 uppercase tracking-widest">CLOUD SECURITY PROTOCOL V2.0</span>
              </div>
            </div>
          </div>

          <div className="flex items-center gap-2 text-[10px] font-bold uppercase tracking-widest text-white/20">
            DESARROLLADO CON EL <Heart className="w-3 h-3 text-primary fill-primary animate-heartbeat" /> POR NAXDE STUDIO
          </div>
        </div>
      </div>

      {/* Scroll to Top - Conditional Visibility based on scroll position */}
      <div className={cn(
        "fixed bottom-32 left-6 md:left-12 lg:left-16 z-[150] flex flex-col items-center gap-6 group transition-all duration-700 ease-in-out",
        showScrollTop ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10 pointer-events-none"
      )}>
        <button 
          onClick={scrollToTop}
          className="w-14 h-14 rounded-full bg-white/[0.05] border border-white/10 text-white flex items-center justify-center hover:bg-white/[0.1] transition-all backdrop-blur-xl"
        >
          <ArrowUp className="w-6 h-6 group-hover:-translate-y-1 transition-transform" />
        </button>
        <span className="[writing-mode:vertical-lr] text-[10px] font-black uppercase tracking-[0.5em] text-white/30 group-hover:text-white transition-colors select-none">
          VOLVER AL INICIO
        </span>
      </div>
    </footer>
  );
};
