
"use client"

import React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Home, Zap, Smartphone, Briefcase, Mail } from 'lucide-react';
import { cn } from '@/lib/utils';

const navItems = [
  { name: "Inicio", icon: Home, href: "/" },
  { name: "Servicios", icon: Zap, href: "/servicios" },
  { name: "Neocard", icon: Smartphone, href: "/tarjetas-neocard", highlight: true },
  { name: "Proyectos", icon: Briefcase, href: "/proyectos" },
  { name: "Contacto", icon: Mail, href: "/contacto" }
];

export const BottomNav = () => {
  const pathname = usePathname();

  return (
    <nav className="md:hidden fixed bottom-0 left-0 right-0 z-[130] px-0">
      <div className="relative w-full h-24 flex items-end">
        
        {/* Cuerpo Principal del Menú con Notch Trapezoidal */}
        <div 
          className="absolute inset-x-0 bottom-0 h-16 bg-[#0A0520] border-t border-white/5 shadow-[0_-10px_40px_rgba(0,0,0,0.5)]"
          style={{
            clipPath: 'polygon(0 0, 38% 0, 42% 40%, 58% 40%, 62% 0, 100% 0, 100% 100%, 0 100%)'
          }}
        />

        <div className="relative w-full h-16 flex items-center justify-around px-4 z-10">
          {navItems.map((item, idx) => {
            const isActive = pathname === item.href;
            
            if (item.highlight) {
              return (
                <div key={idx} className="relative -top-6">
                  <Link href={item.href}>
                    <div className={cn(
                      "w-16 h-16 rounded-full flex items-center justify-center transition-all duration-500",
                      "bg-gradient-to-br from-[#5200F8] to-[#F80037] shadow-[0_0_25px_rgba(248,0,55,0.5)]",
                      "border-4 border-[#00001D] hover:scale-110 active:scale-95"
                    )}>
                      <item.icon className="w-8 h-8 text-white" />
                    </div>
                  </Link>
                  <span className="absolute -bottom-5 left-1/2 -translate-x-1/2 text-[10px] font-black text-primary uppercase tracking-widest whitespace-nowrap">
                    {item.name}
                  </span>
                </div>
              );
            }

            return (
              <Link 
                key={idx} 
                href={item.href}
                className={cn(
                  "flex flex-col items-center justify-center flex-1 gap-1 transition-all h-full mt-2",
                  isActive ? "text-primary" : "text-white/40 hover:text-white"
                )}
              >
                <item.icon className={cn(
                  "w-5 h-5 transition-transform duration-300",
                  isActive && "scale-110"
                )} />
                <span className="text-[8px] font-bold uppercase tracking-widest">{item.name}</span>
              </Link>
            );
          })}
        </div>
      </div>
    </nav>
  );
};
