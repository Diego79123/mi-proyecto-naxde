
"use client"

import React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import Image from 'next/image';
import { 
  LayoutDashboard, 
  Zap, 
  Briefcase, 
  Settings, 
  Menu,
  Smartphone,
  ArrowLeft,
  User,
  ShieldAlert
} from 'lucide-react';
import { cn } from '@/lib/utils';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';

const sidebarItems = [
  { name: "Dashboard", icon: LayoutDashboard, href: "/admin" },
  { name: "Tarjetas Digitales", icon: Smartphone, href: "/admin/tarjetas-digitales" },
  { name: "Servicios", icon: Zap, href: "/admin/services" },
  { name: "Proyectos", icon: Briefcase, href: "/admin/projects" },
  { name: "Ajustes", icon: Settings, href: "/admin/settings" }
];

const LOGO_URL = "https://firebasestorage.googleapis.com/v0/b/studio-4920931495-1d74b.firebasestorage.app/o/Logos%2FLogo%20naxde.png?alt=media&token=1df1f19b-978a-4f23-8f2f-d0d9efb42764";

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const [isOpen, setIsOpen] = React.useState(true);

  // Acceso público total - Sin verificaciones de seguridad.

  return (
    <div className="min-h-screen bg-[#00001D] flex text-white font-body">
      <aside className={cn("fixed md:relative z-50 h-full bg-black/40 border-r border-white/10 backdrop-blur-xl transition-all duration-300", isOpen ? "w-64" : "w-0 md:w-20")}>
        <div className="p-6 h-full flex flex-col">
          <div className="flex items-center gap-3 mb-10 overflow-hidden">
            <div className="relative h-8 w-24">
              <Image src={LOGO_URL} alt="Naxde Logo" fill className={cn("object-contain", !isOpen && "md:hidden")} />
            </div>
          </div>
          <nav className="flex-1 space-y-1">
            {sidebarItems.map((item, idx) => (
              <Link key={idx} href={item.href} className={cn("flex items-center gap-3 px-4 py-3 rounded-xl transition-all", pathname === item.href ? "bg-primary text-white" : "text-white/50 hover:bg-white/5")}>
                <item.icon className="w-5 h-5" />
                <span className={cn("text-sm font-medium", !isOpen && "md:opacity-0")}>{item.name}</span>
              </Link>
            ))}
          </nav>
          <Link href="/" className="flex items-center gap-3 px-4 py-3 rounded-xl w-full text-white/50 hover:bg-white/10 transition-all">
            <ArrowLeft className="w-5 h-5" />
            <span className={cn("text-sm font-medium", !isOpen && "md:opacity-0")}>Volver al Sitio</span>
          </Link>
        </div>
      </aside>
      <main className="flex-1 min-w-0 bg-[#00001D]">
        <header className="h-16 border-b border-white/5 flex items-center justify-between px-8 bg-white/[0.02]">
          <button onClick={() => setIsOpen(!isOpen)} className="p-2 rounded-lg hover:bg-white/5 text-white/50"><Menu /></button>
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-yellow-500/10 border border-yellow-500/20">
              <ShieldAlert className="w-3.5 h-3.5 text-yellow-500" />
              <span className="text-[10px] font-bold text-yellow-500 uppercase tracking-widest">Acceso Libre</span>
            </div>
            <Avatar className="h-10 w-10 border border-primary/30">
              <AvatarFallback className="bg-primary/20 text-primary">
                <User className="w-5 h-5" />
              </AvatarFallback>
            </Avatar>
          </div>
        </header>
        <div className="max-h-[calc(100vh-64px)] overflow-y-auto no-scrollbar">{children}</div>
      </main>
    </div>
  );
}
