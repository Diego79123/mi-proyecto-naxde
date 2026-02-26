"use client"

import React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import Image from 'next/image';
import { 
  LayoutDashboard, 
  Zap, 
  Briefcase, 
  Package, 
  MessageSquare, 
  HelpCircle, 
  Settings, 
  LogOut,
  Menu,
  X,
  Smartphone
} from 'lucide-react';
import { cn } from '@/lib/utils';

const sidebarItems = [
  { name: "Dashboard", icon: LayoutDashboard, href: "/admin" },
  { name: "Tarjetas Digitales", icon: Smartphone, href: "/admin/tarjetas-digitales" },
  { name: "Servicios", icon: Zap, href: "/admin/services" },
  { name: "Proyectos", icon: Briefcase, href: "/admin/projects" },
  { name: "Productos", icon: Package, href: "/admin/products" },
  { name: "Testimonios", icon: MessageSquare, href: "/admin/testimonials" },
  { name: "FAQ", icon: HelpCircle, href: "/admin/faqs" },
  { name: "Planes", icon: Package, href: "/admin/plans" },
  { name: "Ajustes", icon: Settings, href: "/admin/settings" }
];

const LOGO_URL = "https://firebasestorage.googleapis.com/v0/b/studio-4920931495-1d74b.firebasestorage.app/o/Logos%2FLogo%20naxde.png?alt=media&token=1df1f19b-978a-4f23-8f2f-d0d9efb42764";

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const [isOpen, setIsOpen] = React.useState(true);

  return (
    <div className="min-h-screen bg-background flex text-white">
      {/* Sidebar */}
      <aside className={cn(
        "fixed md:relative z-50 h-full bg-black/40 border-r border-white/10 backdrop-blur-xl transition-all duration-300 overflow-hidden",
        isOpen ? "w-64" : "w-0 md:w-20"
      )}>
        <div className="p-6 h-full flex flex-col">
          <div className="flex items-center gap-3 mb-10 overflow-hidden">
            <Image 
              src={LOGO_URL} 
              alt="Naxde Logo" 
              width={100} 
              height={30} 
              className={cn("h-8 w-auto object-contain transition-opacity", !isOpen && "md:hidden")}
            />
            {isOpen && <span className="font-headline font-bold text-xs text-primary uppercase tracking-widest">Admin</span>}
            {!isOpen && (
              <div className="w-8 h-8 rounded-lg bg-primary shrink-0 flex items-center justify-center">
                <span className="font-headline font-bold text-white text-xs">N</span>
              </div>
            )}
          </div>

          <nav className="flex-1 space-y-1">
            {sidebarItems.map((item, idx) => {
              const isActive = pathname === item.href;
              return (
                <Link 
                  key={idx} 
                  href={item.href}
                  className={cn(
                    "flex items-center gap-3 px-4 py-3 rounded-xl transition-all group",
                    isActive ? "bg-primary text-white" : "text-white/50 hover:bg-white/5 hover:text-white"
                  )}
                >
                  <item.icon className={cn("w-5 h-5 shrink-0", isActive ? "text-white" : "text-primary")} />
                  <span className={cn("text-sm font-medium transition-opacity", !isOpen && "md:opacity-0")}>{item.name}</span>
                </Link>
              );
            })}
          </nav>

          <div className="pt-6 border-t border-white/5">
            <button className="flex items-center gap-3 px-4 py-3 rounded-xl w-full text-white/50 hover:bg-destructive/10 hover:text-destructive transition-all">
              <LogOut className="w-5 h-5 shrink-0" />
              <span className={cn("text-sm font-medium", !isOpen && "md:opacity-0")}>Salir</span>
            </button>
          </div>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 min-w-0 bg-[#00001D]">
        <header className="h-16 border-b border-white/5 flex items-center justify-between px-8 bg-white/[0.02]">
          <button 
            onClick={() => setIsOpen(!isOpen)}
            className="p-2 rounded-lg hover:bg-white/5 text-white/50 hover:text-white transition-colors"
          >
            {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
          
          <div className="flex items-center gap-4">
            <div className="text-right hidden sm:block">
              <div className="text-sm font-bold">Admin Naxde</div>
              <div className="text-[10px] text-primary uppercase font-bold tracking-widest">Super Usuario</div>
            </div>
            <div className="w-10 h-10 rounded-full bg-gradient-to-br from-primary to-secondary p-0.5">
              <div className="w-full h-full rounded-full bg-background flex items-center justify-center">
                <span className="font-bold text-xs">AD</span>
              </div>
            </div>
          </div>
        </header>

        <div className="max-h-[calc(100vh-64px)] overflow-y-auto no-scrollbar">
          {children}
        </div>
      </main>
    </div>
  );
}
