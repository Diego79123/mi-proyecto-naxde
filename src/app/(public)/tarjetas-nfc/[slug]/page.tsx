
"use client"

import React, { use } from 'react';
import { useCollection, useFirestore, useMemoFirebase } from '@/firebase';
import { collection, query, where, limit } from 'firebase/firestore';
import { Smartphone, Mail, Phone, Linkedin, MessageCircle, UserPlus, Globe, Share2, Zap } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Avatar, AvatarImage, AvatarFallback } from '@/components/ui/avatar';
import { cn } from '@/lib/utils';
import Link from 'next/link';

interface DigitalCardPageProps {
  params: Promise<{ slug: string }>;
}

export default function DigitalCardPage({ params }: DigitalCardPageProps) {
  const { slug } = use(params);
  const db = useFirestore();

  const memberQuery = useMemoFirebase(() => {
    return query(
      collection(db, 'team_members'),
      where('slug', '==', slug),
      where('isActive', '==', true),
      limit(1)
    );
  }, [db, slug]);

  const { data: members, isLoading } = useCollection(memberQuery);
  const member = members?.[0];

  if (isLoading) {
    return (
      <div className="min-h-screen bg-[#00001D] flex items-center justify-center">
        <div className="w-12 h-12 border-4 border-primary border-t-transparent rounded-full animate-spin" />
      </div>
    );
  }

  if (!member) {
    return (
      <div className="min-h-screen bg-[#00001D] flex flex-col items-center justify-center p-6 text-center space-y-6">
        <Zap className="w-16 h-16 text-primary animate-pulse" />
        <h1 className="text-3xl font-headline font-bold text-white">TARJETA NO ENCONTRADA</h1>
        <p className="text-white/50">El perfil solicitado no existe o no se encuentra activo.</p>
        <Link href="/">
          <Button className="bg-primary text-white rounded-full px-8">Volver al Inicio</Button>
        </Link>
      </div>
    );
  }

  const handleSaveContact = () => {
    // Basic VCF logic simulation
    const vcard = `BEGIN:VCARD
VERSION:3.0
FN:${member.name}
ORG:Naxde Digital Hub
TITLE:${member.role}
TEL;TYPE=CELL:${member.phone || member.whatsapp}
EMAIL:${member.email}
URL:${window.location.href}
END:VCARD`;
    
    const blob = new Blob([vcard], { type: 'text/vcard' });
    const url = window.URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.setAttribute('download', `${member.slug}.vcf`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <main className="min-h-screen bg-[#00001D] text-white flex flex-col items-center pb-20 overflow-x-hidden">
      {/* Background decoration */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none -z-10">
        <div className="absolute top-[-10%] left-[-20%] w-[100%] h-[50%] bg-primary/20 blur-[150px] rounded-full" />
        <div className="absolute bottom-[-10%] right-[-20%] w-[100%] h-[50%] bg-secondary/20 blur-[150px] rounded-full" />
      </div>

      {/* Profile Header */}
      <section className="w-full max-w-md pt-16 px-6 flex flex-col items-center text-center space-y-6">
        <div className="relative group">
          <div className="absolute -inset-1 bg-gradient-to-br from-primary to-secondary rounded-full blur opacity-75 group-hover:opacity-100 transition duration-1000 group-hover:duration-200 animate-tilt"></div>
          <Avatar className="w-40 h-40 border-4 border-[#00001D] relative">
            <AvatarImage src={member.profileImageUrl} alt={member.name} className="object-cover" />
            <AvatarFallback className="bg-white/5 text-4xl font-headline">{member.name[0]}</AvatarFallback>
          </Avatar>
        </div>
        
        <div className="space-y-2">
          <h1 className="text-3xl font-headline font-bold tracking-tighter uppercase">{member.name}</h1>
          <div className="inline-block px-3 py-1 rounded-full bg-primary/10 border border-primary/20">
            <span className="text-xs font-bold text-primary tracking-widest uppercase">{member.role}</span>
          </div>
          <p className="text-white/60 text-sm leading-relaxed max-w-xs mx-auto pt-4">
            {member.bio}
          </p>
        </div>
      </section>

      {/* Action Buttons */}
      <section className="w-full max-w-md px-6 pt-10 grid grid-cols-1 gap-4">
        <Button 
          onClick={handleSaveContact}
          className="h-16 bg-primary hover:bg-primary/90 text-white rounded-2xl neon-accent text-lg font-bold flex items-center justify-center gap-3 transition-all"
        >
          <UserPlus className="w-6 h-6" />
          GUARDAR CONTACTO
        </Button>
        
        <div className="grid grid-cols-2 gap-4">
          {member.whatsapp && (
            <Link href={`https://wa.me/${member.whatsapp}`} target="_blank" className="w-full">
              <Button variant="outline" className="w-full h-20 border-white/10 bg-white/5 hover:bg-white/10 text-white rounded-2xl flex flex-col gap-1 items-center justify-center group">
                <MessageCircle className="w-6 h-6 text-primary group-hover:scale-110 transition-transform" />
                <span className="text-[10px] font-bold uppercase tracking-widest opacity-60">WhatsApp</span>
              </Button>
            </Link>
          )}
          {member.email && (
            <Link href={`mailto:${member.email}`} className="w-full">
              <Button variant="outline" className="w-full h-20 border-white/10 bg-white/5 hover:bg-white/10 text-white rounded-2xl flex flex-col gap-1 items-center justify-center group">
                <Mail className="w-6 h-6 text-primary group-hover:scale-110 transition-transform" />
                <span className="text-[10px] font-bold uppercase tracking-widest opacity-60">Correo</span>
              </Button>
            </Link>
          )}
        </div>

        {member.linkedinUrl && (
          <Link href={member.linkedinUrl} target="_blank">
            <Button variant="outline" className="w-full h-16 border-white/10 bg-white/5 hover:bg-white/10 text-white rounded-2xl flex items-center justify-center gap-3 group">
              <Linkedin className="w-5 h-5 text-primary group-hover:scale-110 transition-transform" />
              <span className="font-bold text-sm tracking-widest">LINKEDIN PROFILE</span>
            </Button>
          </Link>
        )}

        <div className="pt-6 space-y-4">
          <div className="text-center">
            <span className="text-[10px] font-bold text-white/30 uppercase tracking-[0.3em]">Enlaces de Interés</span>
          </div>
          <Link href="/" className="block">
            <Button variant="outline" className="w-full h-14 border-white/5 bg-white/[0.02] hover:bg-white/5 text-white rounded-xl flex items-center justify-between px-6 group">
              <span className="text-sm font-medium">Sitio Web Oficial</span>
              <Globe className="w-4 h-4 text-primary group-hover:translate-x-1 transition-transform" />
            </Button>
          </Link>
          <Link href="/tarjetas-nfc" className="block">
            <Button variant="outline" className="w-full h-14 border-white/5 bg-white/[0.02] hover:bg-white/5 text-white rounded-xl flex items-center justify-between px-6 group">
              <span className="text-sm font-medium">Pedir mi Tarjeta NFC</span>
              <Smartphone className="w-4 h-4 text-primary group-hover:translate-x-1 transition-transform" />
            </Button>
          </Link>
        </div>
      </section>

      {/* Footer Branding */}
      <footer className="mt-20 flex flex-col items-center space-y-4 opacity-40 hover:opacity-100 transition-opacity">
        <Link href="/" className="flex items-center gap-2">
          <div className="w-6 h-6 rounded bg-primary flex items-center justify-center">
            <span className="font-headline font-bold text-[10px] text-white">N</span>
          </div>
          <span className="font-headline font-bold text-sm tracking-tighter text-white uppercase">
            NAXDE DIGITAL HUB
          </span>
        </Link>
        <p className="text-[8px] font-bold uppercase tracking-[0.5em] text-white/50">Colombia & Latam</p>
      </footer>
    </main>
  );
}
