
'use client';

import React from 'react';
import { MessageCircle, Sparkles } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useToast } from '@/hooks/use-toast';

/**
 * Componente de acciones flotantes que incluye WhatsApp y Asistente IA.
 */
export const FloatingActions = () => {
  const { toast } = useToast();

  const handleAIClick = () => {
    toast({
      title: "Asistente IA Naxde",
      description: "Nuestro asistente inteligente estará disponible muy pronto para potenciar tu negocio.",
    });
  };

  return (
    <div className="fixed bottom-24 right-6 md:bottom-10 md:right-10 z-[100] flex flex-col gap-4">
      {/* Botón de WhatsApp */}
      <a 
        href="https://wa.me/57315001001" 
        target="_blank" 
        rel="noopener noreferrer"
        className="group relative"
      >
        <div className="absolute -inset-2 bg-green-500/20 rounded-full blur-xl opacity-0 group-hover:opacity-100 transition-opacity" />
        <Button 
          size="icon" 
          className="w-14 h-14 rounded-full bg-[#25D366] hover:bg-[#25D366]/90 text-white shadow-lg border-none relative z-10 transition-transform active:scale-90"
        >
          <MessageCircle className="w-7 h-7" />
        </Button>
      </a>

      {/* Botón de Asistente IA (Prototipo) */}
      <div className="group relative">
        <div className="absolute -inset-2 bg-primary/20 rounded-full blur-xl opacity-0 group-hover:opacity-100 transition-opacity" />
        <Button 
          onClick={handleAIClick}
          size="icon" 
          className="w-14 h-14 rounded-full bg-white/10 backdrop-blur-xl border border-white/20 text-primary hover:bg-white/20 shadow-lg relative z-10 overflow-hidden transition-transform active:scale-90"
        >
          <Sparkles className="w-7 h-7" />
          <div className="absolute inset-0 bg-gradient-to-tr from-primary/10 to-transparent pointer-events-none" />
        </Button>
      </div>
    </div>
  );
};
