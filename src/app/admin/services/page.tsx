"use client"

import React, { useState } from 'react';
import { useCollection, useFirestore, useMemoFirebase } from '@/firebase';
import { collection, doc, serverTimestamp, deleteDoc } from 'firebase/firestore';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Plus, Trash2, Edit2, Zap, LayoutGrid, List } from 'lucide-react';
import { addDocumentNonBlocking, updateDocumentNonBlocking, deleteDocumentNonBlocking } from '@/firebase/non-blocking-updates';
import { useToast } from '@/hooks/use-toast';

export default function AdminServices() {
  const db = useFirestore();
  const { toast } = useToast();
  const [isEditing, setIsEditing] = useState(false);
  const [selectedService, setSelectedService] = useState<any>(null);

  const servicesRef = useMemoFirebase(() => collection(db, 'services'), [db]);
  const { data: services, isLoading } = useCollection(servicesRef);

  const handleSave = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const data = {
      title: formData.get('title'),
      shortDescription: formData.get('shortDescription'),
      longDescription: formData.get('longDescription'),
      isActive: true,
      updatedAt: serverTimestamp(),
    };

    if (selectedService) {
      updateDocumentNonBlocking(doc(db, 'services', selectedService.id), data);
      toast({ title: "Servicio actualizado" });
    } else {
      addDocumentNonBlocking(servicesRef, { ...data, createdAt: serverTimestamp(), slug: (data.title as string).toLowerCase().replace(/ /g, '-'), order: services?.length || 0 });
      toast({ title: "Servicio creado" });
    }
    setIsEditing(false);
    setSelectedService(null);
  };

  const handleDelete = (id: string) => {
    if (confirm('¿Estás seguro de eliminar este servicio?')) {
      deleteDocumentNonBlocking(doc(db, 'services', id));
      toast({ title: "Servicio eliminado", variant: "destructive" });
    }
  };

  return (
    <div className="p-8 space-y-8">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-headline font-bold text-white">Gestión de Servicios</h1>
          <p className="text-white/50">Administra el catálogo de soluciones digitales de Naxde.</p>
        </div>
        <Button onClick={() => setIsEditing(true)} className="bg-primary hover:bg-primary/90">
          <Plus className="w-4 h-4 mr-2" />
          Nuevo Servicio
        </Button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {isEditing && (
          <Card className="lg:col-span-1 bg-white/5 border-white/10 h-fit sticky top-8">
            <CardHeader>
              <CardTitle className="text-white">{selectedService ? 'Editar Servicio' : 'Nuevo Servicio'}</CardTitle>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSave} className="space-y-4">
                <div className="space-y-2">
                  <label className="text-xs font-bold text-white/40 uppercase">Título</label>
                  <Input name="title" defaultValue={selectedService?.title} required className="bg-white/5 border-white/10" />
                </div>
                <div className="space-y-2">
                  <label className="text-xs font-bold text-white/40 uppercase">Descripción Corta</label>
                  <Input name="shortDescription" defaultValue={selectedService?.shortDescription} required className="bg-white/5 border-white/10" />
                </div>
                <div className="space-y-2">
                  <label className="text-xs font-bold text-white/40 uppercase">Descripción Detallada</label>
                  <Textarea name="longDescription" defaultValue={selectedService?.longDescription} className="bg-white/5 border-white/10 min-h-[150px]" />
                </div>
                <div className="flex gap-2 pt-4">
                  <Button type="submit" className="flex-1 bg-primary text-white">Guardar</Button>
                  <Button type="button" variant="outline" onClick={() => { setIsEditing(false); setSelectedService(null); }} className="border-white/10">Cancelar</Button>
                </div>
              </form>
            </CardContent>
          </Card>
        )}

        <div className={isEditing ? "lg:col-span-2 space-y-4" : "lg:col-span-3 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"}>
          {isLoading ? (
            <p className="text-white/50">Cargando servicios...</p>
          ) : services?.map((service) => (
            <Card key={service.id} className="bg-white/5 border-white/10 group hover:border-primary/50 transition-all">
              <CardHeader className="flex flex-row items-center justify-between pb-2">
                <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center">
                  <Zap className="w-5 h-5 text-primary" />
                </div>
                <div className="flex gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                  <Button size="icon" variant="ghost" className="h-8 w-8 text-white/50 hover:text-white" onClick={() => { setSelectedService(service); setIsEditing(true); }}>
                    <Edit2 className="w-4 h-4" />
                  </Button>
                  <Button size="icon" variant="ghost" className="h-8 w-8 text-white/50 hover:text-destructive" onClick={() => handleDelete(service.id)}>
                    <Trash2 className="w-4 h-4" />
                  </Button>
                </div>
              </CardHeader>
              <CardContent className="space-y-2">
                <h3 className="font-bold text-white text-xl">{service.title}</h3>
                <p className="text-white/40 text-sm line-clamp-2">{service.shortDescription}</p>
                <div className="pt-4 flex items-center justify-between">
                  <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full uppercase tracking-widest ${service.isActive ? 'bg-green-500/10 text-green-500' : 'bg-red-500/10 text-red-500'}`}>
                    {service.isActive ? 'Activo' : 'Inactivo'}
                  </span>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
}