
'use client';

import React, { Suspense } from 'react';
import { Instagram, Facebook } from 'lucide-react';
import Link from 'next/link';
import { useSearchParams, usePathname } from 'next/navigation';
import { cn } from '@/lib/utils';

const SocialSidebarContent = () => {
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const isMockup = searchParams?.get('mode') === 'mockup';

  // Ocultar si es modo mockup o si estamos en una página de tarjeta individual
  const isNeocardPage = pathname?.startsWith('/tarjetas-neocard/') || pathname?.startsWith('/tarjetas-nfc/');

  if (isMockup || isNeocardPage) return null;

  return (
    <div className={cn(
      "fixed left-6 top-1/2 -translate-y-1/2 z-[100] hidden lg:flex flex-col gap-4 p-3",
      "bg-[#00001D] border border-white/20 opacity-100", // Fondo sólido azul oscuro oficial
      "shadow-[0_0_30px_rgba(0,0,0,0.8)] animate-in fade-in slide-in-from-left duration-1000 rounded-2xl"
    )}>
      <Link 
        href="https://instagram.com" 
        target="_blank" 
        className="w-10 h-10 rounded-xl flex items-center justify-center text-white/40 hover:text-primary hover:bg-primary/10 transition-all group"
        aria-label="Instagram"
      >
        <Instagram className="w-5 h-5 group-hover:scale-110 transition-transform" />
      </Link>
      
      <Link 
        href="https://facebook.com" 
        target="_blank" 
        className="w-10 h-10 rounded-xl flex items-center justify-center text-white/40 hover:text-primary hover:bg-primary/10 transition-all group"
        aria-label="Facebook"
      >
        <Facebook className="w-5 h-5 group-hover:scale-110 transition-transform" />
      </Link>

      <Link 
        href="https://tiktok.com" 
        target="_blank" 
        className="w-10 h-10 rounded-xl flex items-center justify-center text-white/40 hover:text-primary hover:bg-primary/10 transition-all group"
        aria-label="TikTok"
      >
        <svg 
          viewBox="0 0 24 24" 
          className="w-5 h-5 fill-current group-hover:scale-110 transition-transform"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path d="M12.525.02c1.31-.02 2.61-.01 3.91-.02.08 1.53.63 3.09 1.75 4.17 1.12 1.11 2.7 1.62 4.24 1.79v4.03c-1.44-.05-2.89-.35-4.2-.97-.57-.26-1.1-.59-1.59-1.01-.01 2.62.02 5.24-.02 7.86-.03 2.04-.56 4.11-1.89 5.67-1.42 1.68-3.6 2.44-5.74 2.45-2.4-.01-4.73-1.07-6.03-3.09-1.54-2.34-1.4-5.61.35-7.79 1.15-1.48 2.92-2.35 4.79-2.45v4.03c-.88.07-1.78.43-2.37 1.1-.85 1.01-.79 2.63.15 3.53.94.94 2.58.94 3.52.01.63-.64.91-1.55.89-2.43-.02-3.13-.01-6.27-.01-9.41z"/>
        </svg>
      </Link>
      
      <div className="w-full h-px bg-white/10 my-1" />
      
      <div className="flex flex-col items-center">
        <span className="[writing-mode:vertical-lr] text-[10px] font-black uppercase tracking-[0.4em] text-white/20 py-2">
          Social
        </span>
      </div>
    </div>
  );
};

export const SocialSidebar = () => {
  return (
    <Suspense fallback={null}>
      <SocialSidebarContent />
    </Suspense>
  );
};
