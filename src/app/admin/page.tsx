
"use client"

import React from 'react';
import { Smartphone, Package, Briefcase, Zap, MessageSquare, HelpCircle, Settings, Plus, Sparkles, Star, ShieldCheck, Users } from 'lucide-react';
import Link from 'next/link';
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { useCollection, useFirestore, useMemoFirebase } from '@/firebase';
import { collection } from 'firebase/firestore';

export default function AdminDashboard() {
  const db = useFirestore();
  
  // Acceso público total.
  const leadsRef = useMemoFirebase(() => collection(db, 'leads'), [db]);
  const { data: leads } = useCollection(leadsRef);
  
  const membersRef = useMemoFirebase(() => collection(db, 'team_members'), [db]);
  const { data: members } = useCollection(membersRef);

  const stats = [
    { label: "Leads Nuevos", val: leads?.length || "0", color: "text-primary" },
    { label: "Tarjetas Digitales", val: members?.length || "0", color: "text-blue-500" },
    { label: "Servicios", val: "10", color: "text-yellow-500" },
    { label: "Consultas Mes", val: "450", color: "text-cyan-500" }
  ];

  return (
    <div className="p-8 space-y-8">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <h1 className="text-3xl font-headline font-bold text-white tracking-tight uppercase">Dashboard Naxde Hub</h1>
          <p className="text-white/50 font-medium">Gestión administrativa sin restricciones de acceso.</p>
        </div>
        <div className="flex gap-2">
          <Link href="/admin/tarjetas-digitales">
            <Button className="bg-primary hover:bg-primary/90 text-white rounded-lg px-6 h-11 font-bold">
              <Plus className="w-4 h-4 mr-2" />
              Nueva Tarjeta NFC
            </Button>
          </Link>
          <Button variant="outline" className="border-white/10 hover:bg-white/5 text-white h-11 px-6">
            <Sparkles className="w-4 h-4 mr-2 text-primary" />
            Asistente IA
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat, idx) => (
          <Card key={idx} className="bg-white/5 border-white/10 hover:border-white/20 transition-colors">
            <CardHeader className="pb-2">
              <CardDescription className="text-white/40 uppercase tracking-widest text-[10px] font-bold">{stat.label}</CardDescription>
              <CardTitle className={`text-4xl font-headline font-bold ${stat.color}`}>{stat.val}</CardTitle>
            </CardHeader>
          </Card>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <Card className="bg-white/5 border-white/10 overflow-hidden">
          <CardHeader className="bg-white/[0.02] border-b border-white/5">
            <CardTitle className="text-white text-lg">Módulos del Sitio</CardTitle>
            <CardDescription className="text-white/40">Contenido público y digital assets.</CardDescription>
          </CardHeader>
          <CardContent className="grid grid-cols-2 sm:grid-cols-3 gap-4 pt-6">
            {[
              { name: "Tarjetas NFC", icon: Smartphone, href: "/admin/tarjetas-digitales" },
              { name: "Servicios", icon: Zap, href: "/admin/services" },
              { name: "Proyectos", icon: Briefcase, href: "/admin/projects" },
              { name: "Productos", icon: Package, href: "/admin/products" },
              { name: "Testimonios", icon: Star, href: "/admin/testimonials" },
              { name: "FAQ", icon: HelpCircle, href: "/admin/faqs" }
            ].map((item, idx) => (
              <Link key={idx} href={item.href}>
                <div className="p-4 rounded-xl glass-panel hover:bg-white/10 transition-all group flex flex-col items-center gap-3 text-center border-white/5">
                  <item.icon className="w-6 h-6 text-primary group-hover:scale-110 transition-transform" />
                  <span className="text-sm font-bold text-white group-hover:text-primary transition-colors">{item.name}</span>
                </div>
              </Link>
            ))}
          </CardContent>
        </Card>

        <Card className="bg-white/5 border-white/10 overflow-hidden">
          <CardHeader className="bg-white/[0.02] border-b border-white/5">
            <CardTitle className="text-white text-lg">Centro de Operaciones</CardTitle>
            <CardDescription className="text-white/40">Infraestructura abierta.</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4 pt-6">
            <Link href="/admin/settings" className="block">
              <Button variant="outline" className="w-full justify-start border-white/10 hover:bg-white/5 text-white h-12 rounded-xl group px-6">
                <Settings className="w-4 h-4 mr-3 text-white/40 group-hover:text-primary transition-colors" />
                Configuración General
              </Button>
            </Link>
            <Button variant="outline" className="w-full justify-start border-white/10 hover:bg-white/5 text-white h-12 rounded-xl group px-6">
              <ShieldCheck className="w-4 h-4 mr-3 text-white/40 group-hover:text-primary transition-colors" />
              Estado del Sistema
            </Button>
            <Button variant="outline" className="w-full justify-start border-white/10 hover:bg-white/5 text-white h-12 rounded-xl group px-6">
              <Users className="w-4 h-4 mr-3 text-white/40 group-hover:text-primary transition-colors" />
              Staff Naxde
            </Button>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
