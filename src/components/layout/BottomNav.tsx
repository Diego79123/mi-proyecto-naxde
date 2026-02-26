"use client"

import React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Home, Zap, Smartphone, Briefcase, Mail } from 'lucide-react';
import { cn } from '@/lib/utils';

const navItems = [
  { name: "Inicio", icon: Home, href: "/" },
  { name: "Servicios", icon: Zap, href: "/servicios" },
  { name: "NFC", icon: Smartphone, href: "/tarjetas-nfc", highlight: true },
  { name: "Proyectos", icon: Briefcase, href: "/proyectos" },
  { name: "Contacto", icon: Mail, href: "/contacto" }
];

export const BottomNav = () => {
  const pathname = usePathname();

  return (
    <nav className="md:hidden fixed bottom-0 left-0 right-0 z-50 px-4 pb-4 pt-2">
      <div className="max-w-md mx-auto h-16 glass-panel rounded-2xl flex items-center justify-around px-2 relative overflow-hidden">
        {navItems.map((item, idx) => {
          const isActive = pathname === item.href;
          return (
            <Link 
              key={idx} 
              href={item.href}
              className={cn(
                "flex flex-col items-center justify-center flex-1 gap-1 transition-all",
                isActive ? "text-primary" : "text-white/60 hover:text-white"
              )}
            >
              <div className={cn(
                "p-2 rounded-xl transition-all relative",
                item.highlight && "bg-primary/10 neon-accent",
                isActive && !item.highlight && "bg-white/5"
              )}>
                <item.icon className={cn(
                  "w-6 h-6",
                  item.highlight && "text-primary"
                )} />
                {isActive && (
                  <div className="absolute -bottom-1 left-1/2 -translate-x-1/2 w-1 h-1 rounded-full bg-primary shadow-[0_0_8px_var(--brand-accent)]" />
                )}
              </div>
              <span className="text-[10px] font-bold uppercase tracking-widest">{item.name}</span>
            </Link>
          );
        })}
      </div>
    </nav>
  );
};