import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Mail, Phone, MapPin, Instagram, Linkedin, Twitter, ArrowUpRight } from 'lucide-react';

const LOGO_URL = "https://firebasestorage.googleapis.com/v0/b/studio-4920931495-1d74b.firebasestorage.app/o/Logos%2FLogo%20naxde.png?alt=media&token=1df1f19b-978a-4f23-8f2f-d0d9efb42764";

export const Footer = () => {
  return (
    <footer className="bg-background pt-20 pb-24 md:pb-10 border-t border-white/10">
      <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 md:grid-cols-4 gap-12">
        <div className="md:col-span-1 space-y-6">
          <Link href="/" className="flex items-center gap-2">
            <Image 
              src={LOGO_URL} 
              alt="Naxde Logo" 
              width={120} 
              height={36} 
              className="h-8 w-auto object-contain"
            />
          </Link>
          <p className="text-white/50 text-sm leading-relaxed">
            Construimos plataformas digitales que transforman negocios en Colombia y Latinoamérica. Futurismo, conversión y seguridad.
          </p>
          <div className="flex items-center gap-4">
            <Link href="#" className="w-10 h-10 rounded-full glass-panel flex items-center justify-center hover:bg-primary/20 transition-colors">
              <Instagram className="w-5 h-5" />
            </Link>
            <Link href="#" className="w-10 h-10 rounded-full glass-panel flex items-center justify-center hover:bg-primary/20 transition-colors">
              <Linkedin className="w-5 h-5" />
            </Link>
            <Link href="#" className="w-10 h-10 rounded-full glass-panel flex items-center justify-center hover:bg-primary/20 transition-colors">
              <Twitter className="w-5 h-5" />
            </Link>
          </div>
        </div>

        <div className="space-y-6">
          <h4 className="font-headline font-bold text-white uppercase tracking-widest text-sm">Empresa</h4>
          <ul className="space-y-3">
            <li><Link href="/servicios" className="text-white/50 hover:text-white transition-colors text-sm">Servicios</Link></li>
            <li><Link href="/tarjetas-nfc" className="text-white/50 hover:text-white transition-colors text-sm">Tarjetas NFC</Link></li>
            <li><Link href="/proyectos" className="text-white/50 hover:text-white transition-colors text-sm">Proyectos</Link></li>
            <li><Link href="/sobre-nosotros" className="text-white/50 hover:text-white transition-colors text-sm">Sobre Nosotros</Link></li>
          </ul>
        </div>

        <div className="space-y-6">
          <h4 className="font-headline font-bold text-white uppercase tracking-widest text-sm">Contacto</h4>
          <ul className="space-y-4">
            <li className="flex items-start gap-3">
              <MapPin className="w-5 h-5 text-primary shrink-0" />
              <Link href="https://maps.app.goo.gl/cy8VBTKF9QKhdb27A" target="_blank" className="text-white/50 hover:text-white transition-colors text-sm">
                Calle 154 # 103B - 76<br />Bogotá, Colombia
              </Link>
            </li>
            <li className="flex items-center gap-3">
              <Phone className="w-5 h-5 text-primary shrink-0" />
              <Link href="https://wa.me/57315001001" className="text-white/50 hover:text-white transition-colors text-sm">+57 315 001 001</Link>
            </li>
            <li className="flex items-center gap-3">
              <Mail className="w-5 h-5 text-primary shrink-0" />
              <Link href="mailto:desarrollonaxde@gmail.com" className="text-white/50 hover:text-white transition-colors text-sm">desarrollonaxde@gmail.com</Link>
            </li>
          </ul>
        </div>

        <div className="space-y-6">
          <h4 className="font-headline font-bold text-white uppercase tracking-widest text-sm">News / Tech</h4>
          <p className="text-white/50 text-sm">Recibe las últimas tendencias en tecnología y automatización.</p>
          <div className="flex gap-2">
            <input 
              type="email" 
              placeholder="Tu correo" 
              className="bg-white/5 border border-white/10 rounded-lg px-4 py-2 text-sm w-full focus:outline-none focus:border-primary/50"
            />
            <button className="bg-primary p-2 rounded-lg hover:bg-primary/90 transition-colors">
              <ArrowUpRight className="w-5 h-5" />
            </button>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-6 mt-20 pt-8 border-t border-white/5 flex flex-col md:flex-row justify-between items-center gap-4">
        <p className="text-white/30 text-xs">
          © {new Date().getFullYear()} Naxde Digital Hub. Todos los derechos reservados.
        </p>
        <div className="flex gap-6">
          <Link href="/legal/privacidad" className="text-white/30 hover:text-white text-xs transition-colors">Privacidad</Link>
          <Link href="/legal/terminos" className="text-white/30 hover:text-white text-xs transition-colors">Términos</Link>
        </div>
      </div>
    </footer>
  );
};
