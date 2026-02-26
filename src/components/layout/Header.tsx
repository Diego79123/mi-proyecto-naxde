
"use client"

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { 
  ChevronDown, 
  ShoppingCart, 
  Menu,
  X
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import Image from 'next/image';

const LOGO_URL = "https://firebasestorage.googleapis.com/v0/b/studio-4920931495-1d74b.firebasestorage.app/o/Logos%2FLogo%20naxde.png?alt=media&token=1df1f19b-978a-4f23-8f2f-d0d9efb42764";

export const Header = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <header 
      className={cn(
        "fixed top-0 left-0 right-0 z-50 transition-all duration-500 px-6 h-20 flex items-center",
        isScrolled 
          ? "bg-background/80 backdrop-blur-2xl border-b border-white/5 shadow-2xl" 
          : "bg-transparent"
      )}
    >
      <div className="max-w-7xl mx-auto w-full grid grid-cols-3 items-center">
        
        {/* Left Navigation */}
        <nav className="hidden md:flex items-center gap-6">
          <Link href="/servicios" className="group flex items-center gap-1.5 text-sm font-medium text-white/70 hover:text-white transition-colors">
            Productos
            <ChevronDown className="w-3.5 h-3.5 text-white/30 group-hover:text-primary transition-colors" />
          </Link>
          <Link href="/tarjetas-nfc" className="group flex items-center gap-1.5 text-sm font-medium text-white/70 hover:text-white transition-colors">
            Características
            <ChevronDown className="w-3.5 h-3.5 text-white/30 group-hover:text-primary transition-colors" />
          </Link>
          <Link href="/proyectos" className="group flex items-center gap-1.5 text-sm font-medium text-white/70 hover:text-white transition-colors">
            Soluciones listas
            <ChevronDown className="w-3.5 h-3.5 text-white/30 group-hover:text-primary transition-colors" />
          </Link>
        </nav>

        {/* Center Logo */}
        <div className="flex justify-center order-first md:order-none">
          <Link href="/" className="relative h-10 w-[150px]">
            <Image 
              src={LOGO_URL} 
              alt="Naxde Logo" 
              fill
              className="object-contain"
              priority
            />
          </Link>
        </div>

        {/* Right Navigation & CTA */}
        <div className="flex items-center justify-end gap-6">
          <div className="hidden lg:flex items-center gap-6">
            <Link href="/admin" className="text-sm font-medium text-white/70 hover:text-white transition-colors">
              Iniciar sesión
            </Link>
            <div className="group flex items-center gap-1.5 text-sm font-medium text-white/70 hover:text-white transition-colors cursor-pointer">
              ¿Necesitas ayuda?
              <ChevronDown className="w-3.5 h-3.5 text-white/30 group-hover:text-primary transition-colors" />
            </div>
          </div>

          <div className="flex items-center gap-4">
            <Link href="/tarjetas-nfc">
              <Button 
                variant="outline" 
                className="hidden sm:flex h-10 px-6 border-primary/40 hover:bg-primary/10 text-primary rounded-full font-bold text-xs uppercase tracking-widest neon-accent transition-all"
              >
                Precios
              </Button>
            </Link>
            
            <div className="relative group cursor-pointer p-2">
              <ShoppingCart className="w-5 h-5 text-white/70 group-hover:text-white transition-colors" />
              <span className="absolute top-0 right-0 w-4 h-4 bg-primary text-white text-[9px] font-bold rounded-full flex items-center justify-center">0</span>
            </div>

            <button 
              className="md:hidden p-2 text-white/70 hover:text-white"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            >
              {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu Overlay */}
      {isMobileMenuOpen && (
        <div className="absolute top-20 left-0 right-0 bg-[#00001D] border-b border-white/10 p-6 flex flex-col gap-6 animate-in slide-in-from-top duration-300 md:hidden">
          <Link href="/servicios" onClick={() => setIsMobileMenuOpen(false)} className="text-lg font-bold">Productos</Link>
          <Link href="/tarjetas-nfc" onClick={() => setIsMobileMenuOpen(false)} className="text-lg font-bold">Características</Link>
          <Link href="/proyectos" onClick={() => setIsMobileMenuOpen(false)} className="text-lg font-bold">Soluciones listas</Link>
          <div className="h-px bg-white/5" />
          <Link href="/admin" onClick={() => setIsMobileMenuOpen(false)} className="text-sm font-medium text-white/60">Iniciar sesión</Link>
          <Link href="/contacto" onClick={() => setIsMobileMenuOpen(false)} className="text-sm font-medium text-white/60">Ayuda</Link>
          <Button className="w-full bg-primary text-white rounded-full font-bold">Ver Precios</Button>
        </div>
      )}
    </header>
  );
};
