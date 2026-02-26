"use client"

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { Menu, X, Smartphone, ArrowRight, MessageCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { MegaMenu } from './MegaMenu';
import { cn } from '@/lib/utils';

export const Header = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMegaMenuOpen, setIsMegaMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <>
      <header 
        className={cn(
          "fixed top-0 left-0 right-0 z-50 transition-all duration-300 px-4 py-3 sm:px-6 lg:px-8",
          isScrolled ? "bg-background/80 backdrop-blur-xl border-b border-white/10" : "bg-transparent"
        )}
      >
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <Link href="/" className="flex items-center gap-2">
            <div className="w-10 h-10 rounded-xl bg-primary flex items-center justify-center neon-accent">
              <span className="font-headline font-bold text-xl text-white">N</span>
            </div>
            <span className="font-headline font-bold text-2xl tracking-tighter text-white hidden sm:block">
              NAXDE
            </span>
          </Link>

          <nav className="hidden md:flex items-center gap-8">
            <Link href="/servicios" className="text-sm font-medium text-white/70 hover:text-primary transition-colors">Servicios</Link>
            <Link href="/proyectos" className="text-sm font-medium text-white/70 hover:text-primary transition-colors">Proyectos</Link>
            <Link href="/tarjetas-nfc" className="text-sm font-medium text-white/70 hover:text-primary transition-colors flex items-center gap-1.5">
              Tarjetas NFC <span className="px-1.5 py-0.5 rounded-full bg-primary/20 text-[10px] text-primary font-bold">TOP</span>
            </Link>
          </nav>

          <div className="flex items-center gap-3">
            <Button 
              variant="ghost" 
              size="icon" 
              className="text-white hover:bg-white/10"
              onClick={() => setIsMegaMenuOpen(true)}
            >
              <Menu className="w-6 h-6" />
            </Button>
            
            <Link href="https://wa.me/57315001001" target="_blank" className="hidden sm:block">
              <Button className="bg-primary hover:bg-primary/90 text-white rounded-full neon-accent group">
                <MessageCircle className="w-4 h-4 mr-2" />
                WhatsApp
              </Button>
            </Link>
          </div>
        </div>
      </header>

      <MegaMenu isOpen={isMegaMenuOpen} onClose={() => setIsMegaMenuOpen(false)} />
    </>
  );
};