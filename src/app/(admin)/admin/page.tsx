"use client"

import React from 'react';
import { LayoutDashboard, Package, Briefcase, Zap, MessageSquare, HelpCircle, Settings, Plus, Sparkles } from 'lucide-react';
import Link from 'next/link';
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';

const stats = [
  { label: "Leads Nuevos", val: "12", color: "text-primary" },
  { label: "Proyectos Activos", val: "8", color: "text-blue-500" },
  { label: "Servicios", val: "10", color: "text-yellow-500" },
  { label: "Tarjetas NFC", val: "450", color: "text-cyan-500" }
];

export default function AdminDashboard() {
  return (
    <div className="p-8 space-y-8">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <h1 className="text-3xl font-headline font-bold text-white">Dashboard Administrativo</h1>
          <p className="text-white/50">Bienvenido al centro de control de Naxde Hub.</p>
        </div>
        <div className="flex gap-2">
          <Link href="/admin/services">
            <Button className="bg-primary hover:bg-primary/90 text-white rounded-lg">
              <Plus className="w-4 h-4 mr-2" />
              Nuevo Servicio
            </Button>
          </Link>
          <Button variant="outline" className="border-white/10 hover:bg-white/5 text-white">
            <Sparkles className="w-4 h-4 mr-2 text-primary" />
            AI Content
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        {stats.map((stat, idx) => (
          <Card key={idx} className="bg-white/5 border-white/10">
            <CardHeader className="pb-2">
              <CardDescription className="text-white/40 uppercase tracking-widest text-[10px] font-bold">{stat.label}</CardDescription>
              <CardTitle className={`text-4xl font-headline font-bold ${stat.color}`}>{stat.val}</CardTitle>
            </CardHeader>
          </Card>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <Card className="bg-white/5 border-white/10">
          <CardHeader>
            <CardTitle className="text-white">Gestión de Contenido</CardTitle>
            <CardDescription className="text-white/40">Actualiza los módulos públicos del sitio.</CardDescription>
          </CardHeader>
          <CardContent className="grid grid-cols-2 gap-4">
            {[
              { name: "Servicios", icon: Zap, href: "/admin/services" },
              { name: "Proyectos", icon: Briefcase, href: "/admin/projects" },
              { name: "Productos", icon: Package, href: "/admin/products" },
              { name: "Testimonios", icon: Star, href: "/admin/testimonials" },
              { name: "FAQ", icon: HelpCircle, href: "/admin/faqs" },
              { name: "Planes", icon: Package, href: "/admin/plans" }
            ].map((item, idx) => (
              <Link key={idx} href={item.href}>
                <div className="p-4 rounded-xl glass-panel hover:bg-white/10 transition-all group flex flex-col items-center gap-3 text-center border-white/5">
                  <item.icon className="w-6 h-6 text-primary group-hover:scale-110 transition-transform" />
                  <span className="text-sm font-bold text-white">{item.name}</span>
                </div>
              </Link>
            ))}
          </CardContent>
        </Card>

        <Card className="bg-white/5 border-white/10">
          <CardHeader>
            <CardTitle className="text-white">Acciones Rápidas</CardTitle>
            <CardDescription className="text-white/40">Configuración global y seguridad.</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <Button variant="outline" className="w-full justify-start border-white/10 hover:bg-white/5 text-white h-12 rounded-xl">
              <Settings className="w-4 h-4 mr-3 text-white/40" />
              Configuración General del Sitio
            </Button>
            <Button variant="outline" className="w-full justify-start border-white/10 hover:bg-white/5 text-white h-12 rounded-xl">
              <ShieldCheck className="w-4 h-4 mr-3 text-white/40" />
              Reglas de Seguridad Firestore
            </Button>
            <Button variant="outline" className="w-full justify-start border-white/10 hover:bg-white/5 text-white h-12 rounded-xl">
              <Users className="w-4 h-4 mr-3 text-white/40" />
              Gestionar Usuarios y Roles
            </Button>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}

// Minimal missing icons
import { Star, ShieldCheck, Users } from 'lucide-react';