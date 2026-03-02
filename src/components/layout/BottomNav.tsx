
"use client"

import React, { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Home, Zap, Plus, Briefcase, Mail } from 'lucide-react';
import { cn } from '@/lib/utils';
import { MegaMenu } from './MegaMenu';

const navItems = [
  { name: "Inicio", icon: Home, href: "/" },
  { name: "Servicios", icon: Zap, href: "/servicios" },
  { name: "Proyectos", icon: Briefcase, href: "/proyectos" },
  { name: "Contacto", icon: Mail, href: "/contacto" }
];

export const BottomNav = () => {
  const pathname = usePathname();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <>
      <nav className="fixed bottom-6 left-6 right-6 z-[130] flex justify-center pointer-events-none">
        <div className="relative w-full max-w-4xl h-20 flex items-center bg-[#050515]/95 border border-white/10 rounded-[3rem] shadow-[0_20px_50px_rgba(0,0,0,0.5)] backdrop-blur-[45px] px-4 pointer-events-auto">
          
          {/* Muesca Visual para el botón central (Sutil) */}
          <div 
            className="absolute left-1/2 -translate-x-1/2 -top-4 w-32 h-8 bg-[#050515] -z-10"
            style={{ clipPath: 'polygon(10% 100%, 90% 100%, 100% 0, 0 0)' }}
          />

          <div className="relative w-full h-full flex items-center justify-between z-10">
            {/* Items Izquierda */}
            <div className="flex-1 flex justify-around">
              {navItems.slice(0, 2).map((item, idx) => {
                const isActive = pathname === item.href;
                return (
                  <Link 
                    key={idx} 
                    href={item.href}
                    className={cn(
                      "flex flex-col items-center justify-center gap-1 transition-all group h-full",
                      isActive ? "text-primary" : "text-white/40 hover:text-white"
                    )}
                  >
                    <item.icon className={cn(
                      "w-5 h-5 transition-transform duration-300 group-hover:scale-110",
                      isActive && "scale-110"
                    )} />
                    <span className="text-[8px] font-bold uppercase tracking-[0.2em]">{item.name}</span>
                  </Link>
                );
              })}
            </div>

            {/* Botón Central "+" Elevado */}
            <div className="relative -top-8 mx-4">
              <button 
                onClick={() => setIsMenuOpen(true)}
                className={cn(
                  "w-16 h-16 rounded-full flex items-center justify-center transition-all duration-500",
                  "bg-gradient-to-br from-[#5200F8] to-[#F80037] shadow-[0_0_30px_rgba(82,0,248,0.6)]",
                  "border-4 border-[#050515] hover:scale-110 active:scale-90 relative z-20 group"
                )}
              >
                <Plus className="w-8 h-8 text-white transition-transform duration-500 group-hover:rotate-90" />
                <div className="absolute inset-0 rounded-full bg-white/20 opacity-0 group-hover:opacity-100 blur-md transition-opacity" />
              </button>
              <span className="absolute -bottom-6 left-1/2 -translate-x-1/2 text-[9px] font-black text-primary uppercase tracking-[0.3em] whitespace-nowrap">
                MENU
              </span>
            </div>

            {/* Items Derecha */}
            <div className="flex-1 flex justify-around">
              {navItems.slice(2).map((item, idx) => {
                const isActive = pathname === item.href;
                return (
                  <Link 
                    key={idx} 
                    href={item.href}
                    className={cn(
                      "flex flex-col items-center justify-center gap-1 transition-all group h-full",
                      isActive ? "text-primary" : "text-white/40 hover:text-white"
                    )}
                  >
                    <item.icon className={cn(
                      "w-5 h-5 transition-transform duration-300 group-hover:scale-110",
                      isActive && "scale-110"
                    )} />
                    <span className="text-[8px] font-bold uppercase tracking-[0.2em]">{item.name}</span>
                  </Link>
                );
              })}
            </div>
          </div>
        </div>
      </nav>

      {/* Mega Menú Pop-up */}
      <MegaMenu isOpen={isMenuOpen} onClose={() => setIsMenuOpen(false)} />
    </>
  );
};
