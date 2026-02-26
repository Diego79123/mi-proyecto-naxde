"use client"

import React, { useState } from 'react';
import { useCollection, useFirestore, useMemoFirebase } from '@/firebase';
import { collection, doc, serverTimestamp } from 'firebase/firestore';
import { Card, CardHeader, CardTitle, CardContent, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Plus, Trash2, Edit2, Smartphone, ExternalLink, User, Linkedin, Mail, Phone, MessageCircle } from 'lucide-react';
import { addDocumentNonBlocking, updateDocumentNonBlocking, deleteDocumentNonBlocking } from '@/firebase/non-blocking-updates';
import { useToast } from '@/hooks/use-toast';
import { Badge } from '@/components/ui/badge';

export default function AdminDigitalCards() {
  const db = useFirestore();
  const { toast } = useToast();
  const [isEditing, setIsEditing] = useState(false);
  const [selectedMember, setSelectedMember] = useState<any>(null);

  const teamRef = useMemoFirebase(() => collection(db, 'team_members'), [db]);
  const { data: members, isLoading } = useCollection(teamRef);

  const handleSave = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const data = {
      name: formData.get('name'),
      slug: (formData.get('slug') as string).toLowerCase().replace(/ /g, '-').replace(/[^\w-]/g, ''),
      role: formData.get('role'),
      bio: formData.get('bio'),
      profileImageUrl: formData.get('profileImageUrl'),
      linkedinUrl: formData.get('linkedinUrl'),
      email: formData.get('email'),
      whatsapp: formData.get('whatsapp'),
      phone: formData.get('phone'),
      isActive: true,
      updatedAt: serverTimestamp(),
    };

    if (selectedMember) {
      updateDocumentNonBlocking(doc(db, 'team_members', selectedMember.id), data);
      toast({ title: "Tarjeta Digital actualizada" });
    } else {
      addDocumentNonBlocking(teamRef, { 
        ...data, 
        createdAt: serverTimestamp(), 
        order: members?.length || 0 
      });
      toast({ title: "Tarjeta Digital creada exitosamente" });
    }
    setIsEditing(false);
    setSelectedMember(null);
  };

  const handleDelete = (id: string) => {
    if (confirm('¿Estás seguro de eliminar esta tarjeta digital? Esto desactivará el link del usuario.')) {
      deleteDocumentNonBlocking(doc(db, 'team_members', id));
      toast({ title: "Tarjeta Digital eliminada", variant: "destructive" });
    }
  };

  return (
    <div className="p-8 space-y-8">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <h1 className="text-3xl font-headline font-bold text-white flex items-center gap-3">
            <Smartphone className="w-8 h-8 text-primary" />
            Ecosistema de Tarjetas Digitales
          </h1>
          <p className="text-white/50">Gestiona los perfiles independientes vinculados a tecnología NFC.</p>
        </div>
        <Button onClick={() => setIsEditing(true)} className="bg-primary hover:bg-primary/90 text-white">
          <Plus className="w-4 h-4 mr-2" />
          Crear Nueva Tarjeta
        </Button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Editor Form */}
        {isEditing && (
          <Card className="lg:col-span-5 bg-white/5 border-white/10 h-fit sticky top-8 animate-in slide-in-from-left duration-300">
            <CardHeader>
              <CardTitle className="text-white">{selectedMember ? 'Editar Tarjeta' : 'Configurar Perfil'}</CardTitle>
              <CardDescription className="text-white/40">Toda la información aquí será pública en el link del usuario.</CardDescription>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSave} className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <label className="text-xs font-bold text-white/40 uppercase">Nombre Completo</label>
                    <Input name="name" defaultValue={selectedMember?.name} required className="bg-white/5 border-white/10" placeholder="Ej: Oscar Rivera" />
                  </div>
                  <div className="space-y-2">
                    <label className="text-xs font-bold text-white/40 uppercase">Slug Único (URL)</label>
                    <Input name="slug" defaultValue={selectedMember?.slug} required className="bg-white/5 border-white/10" placeholder="oscar-rivera" />
                  </div>
                </div>

                <div className="space-y-2">
                  <label className="text-xs font-bold text-white/40 uppercase">Cargo / Rol</label>
                  <Input name="role" defaultValue={selectedMember?.role} required className="bg-white/5 border-white/10" placeholder="CEO & Founder" />
                </div>

                <div className="space-y-2">
                  <label className="text-xs font-bold text-white/40 uppercase">Biografía Corta</label>
                  <Textarea name="bio" defaultValue={selectedMember?.bio} className="bg-white/5 border-white/10 min-h-[80px]" placeholder="Breve descripción profesional..." />
                </div>

                <div className="space-y-2">
                  <label className="text-xs font-bold text-white/40 uppercase">URL Imagen de Perfil</label>
                  <Input name="profileImageUrl" defaultValue={selectedMember?.profileImageUrl} required className="bg-white/5 border-white/10" placeholder="https://..." />
                </div>

                <div className="grid grid-cols-2 gap-4 pt-2">
                  <div className="space-y-2">
                    <label className="text-xs font-bold text-white/40 uppercase">WhatsApp</label>
                    <Input name="whatsapp" defaultValue={selectedMember?.whatsapp} className="bg-white/5 border-white/10" placeholder="573..." />
                  </div>
                  <div className="space-y-2">
                    <label className="text-xs font-bold text-white/40 uppercase">Teléfono</label>
                    <Input name="phone" defaultValue={selectedMember?.phone} className="bg-white/5 border-white/10" placeholder="+57..." />
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <label className="text-xs font-bold text-white/40 uppercase">Email</label>
                    <Input name="email" type="email" defaultValue={selectedMember?.email} className="bg-white/5 border-white/10" />
                  </div>
                  <div className="space-y-2">
                    <label className="text-xs font-bold text-white/40 uppercase">LinkedIn URL</label>
                    <Input name="linkedinUrl" defaultValue={selectedMember?.linkedinUrl} className="bg-white/5 border-white/10" placeholder="https://linkedin.com/in/..." />
                  </div>
                </div>

                <div className="flex gap-2 pt-6">
                  <Button type="submit" className="flex-1 bg-primary text-white">Guardar Perfil</Button>
                  <Button type="button" variant="outline" onClick={() => { setIsEditing(false); setSelectedMember(null); }} className="border-white/10">Cerrar</Button>
                </div>
              </form>
            </CardContent>
          </Card>
        )}

        {/* Members List */}
        <div className={cn(isEditing ? "lg:col-span-7" : "lg:col-span-12", "space-y-4")}>
          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
            {isLoading ? (
              <p className="text-white/50 col-span-full">Cargando ecosistema...</p>
            ) : members?.map((member) => (
              <Card key={member.id} className="bg-white/5 border-white/10 group hover:border-primary/50 transition-all overflow-hidden">
                <div className="h-24 bg-gradient-to-r from-primary/20 to-secondary/20 relative">
                   <div className="absolute -bottom-10 left-6">
                      <div className="w-20 h-20 rounded-2xl border-4 border-[#00001D] bg-white/10 overflow-hidden">
                        <img src={member.profileImageUrl} alt={member.name} className="w-full h-full object-cover" />
                      </div>
                   </div>
                </div>
                <CardContent className="pt-12 space-y-4">
                  <div>
                    <h3 className="font-bold text-white text-lg">{member.name}</h3>
                    <p className="text-primary text-xs font-bold tracking-widest uppercase">{member.role}</p>
                  </div>
                  
                  <div className="flex items-center gap-2 text-white/40 text-xs">
                    <ExternalLink className="w-3 h-3" />
                    <span className="truncate">/tarjetas-nfc/{member.slug}</span>
                  </div>

                  <div className="flex gap-2 pt-2 border-t border-white/5 mt-4">
                    <Button 
                      size="sm" 
                      variant="outline" 
                      className="flex-1 border-white/10 h-9"
                      onClick={() => { setSelectedMember(member); setIsEditing(true); }}
                    >
                      <Edit2 className="w-3.5 h-3.5 mr-2" /> Editar
                    </Button>
                    <Button 
                      size="sm" 
                      variant="ghost" 
                      className="h-9 text-white/40 hover:text-destructive"
                      onClick={() => handleDelete(member.id)}
                    >
                      <Trash2 className="w-4 h-4" />
                    </Button>
                    <Link href={`/tarjetas-nfc/${member.slug}`} target="_blank">
                      <Button size="icon" variant="outline" className="h-9 w-9 border-white/10 text-primary">
                        <ExternalLink className="w-4 h-4" />
                      </Button>
                    </Link>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
