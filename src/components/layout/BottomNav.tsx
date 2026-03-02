
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
    <nav className="md:hidden fixed bottom-0 left-0 right-0 z-[130] px-4 pb-6">
      <div className="relative max-w-md mx-auto h-20 flex items-end">
        
        {/* Cuerpo Principal del Menú con Notch */}
        <div 
          className="absolute inset-x-0 bottom-0 h-16 bg-[#0A0520]/90 backdrop-blur-3xl border-t border-white/5 transition-all duration-500"
          style={{
            clipPath: 'polygon(0 0, 35% 0, 38% 30%, 62% 30%, 65% 0, 100% 0, 100% 100%, 0 100%)',
            borderRadius: '24px 24px 0 0'
          }}
        />

        <div className="relative w-full h-16 flex items-center justify-around px-2 z-10">
          {navItems.map((item, idx) => {
            const isActive = pathname === item.href;
            
            if (item.highlight) {
              return (
                <div key={idx} className="relative -top-6">
                  <Link href={item.href}>
                    <div className={cn(
                      "w-16 h-16 rounded-full flex items-center justify-center transition-all duration-500",
                      "bg-gradient-to-br from-primary via-primary to-secondary shadow-[0_0_20px_rgba(248,0,55,0.4)]",
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
                  "flex flex-col items-center justify-center flex-1 gap-1 transition-all h-full",
                  isActive ? "text-primary" : "text-white/40 hover:text-white"
                )}
              >
                <div className="relative p-1">
                  <item.icon className={cn(
                    "w-6 h-6 transition-transform duration-300",
                    isActive && "scale-110"
                  )} />
                  {isActive && (
                    <div className="absolute -bottom-1 left-1/2 -translate-x-1/2 w-1 h-1 rounded-full bg-primary shadow-[0_0_8px_var(--brand-accent)]" />
                  )}
                </div>
                <span className="text-[9px] font-bold uppercase tracking-widest">{item.name}</span>
              </Link>
            );
          })}
        </div>
      </div>
    </nav>
  );
};
