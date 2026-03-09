'use client';

import React, { useState, useRef, useEffect, Suspense } from 'react';
import { MessageCircle, Sparkles, Send, Bot, User, X } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from '@/components/ui/sheet';
import { ScrollArea } from '@/components/ui/scroll-area';
import { generalAssistant } from '@/ai/flows/general-assistant-flow';
import { cn } from '@/lib/utils';
import { useSearchParams, usePathname } from 'next/navigation';

interface Message {
  role: 'user' | 'assistant';
  content: string;
}

const CANDY_AVATAR_URL = "https://firebasestorage.googleapis.com/v0/b/studio-4920931495-1d74b.firebasestorage.app/o/Elementos%20graficos%2FUsuarios%2FUsuarios.webp?alt=media&token=9038b70a-676e-46ff-8808-b9271f69aa32";

const FloatingActionsContent = () => {
  const searchParams = useSearchParams();
  const pathname = usePathname();
  
  // 1. Estado para asegurar que el componente solo se renderice en el cliente
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const isMockup = searchParams?.get('mode') === 'mockup';
  const isTaguaPage = pathname?.includes('/tarjetas-neocard/bonilla-vergara');
  
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    { role: 'assistant', content: '¡Hola! Soy Candy, tu asistente inteligente de Naxde. ¿Cómo puedo ayudarte a transformar tu negocio hoy?' }
  ]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  }, [messages]);

  const handleSendMessage = async (e?: React.FormEvent) => {
    e?.preventDefault();
    if (!input.trim() || isLoading) return;

    const userMessage = input.trim();
    setInput('');
    setMessages(prev => [...prev, { role: 'user', content: userMessage }]);
    setIsLoading(true);

    try {
      const result = await generalAssistant({ message: userMessage });
      setMessages(prev => [...prev, { role: 'assistant', content: result.response }]);
    } catch (error) {
      setMessages(prev => [...prev, { role: 'assistant', content: 'Lo siento, he tenido un problema técnico. ¿Podrías intentar de nuevo o contactarnos por WhatsApp?' }]);
    } finally {
      setIsLoading(false);
    }
  };

  // 2. Si no ha montado o estamos en modo mockup, no renderizamos nada
  if (!mounted || isMockup) return null;

  return (
    <div className="fixed bottom-24 right-6 md:bottom-10 md:right-10 z-[100] flex flex-col gap-4">
      {/* Botón de Asistente IA - Solo si NO es la página de Taller de Tagua */}
      {!isTaguaPage && (
        <Sheet open={isOpen} onOpenChange={setIsOpen}>
          <SheetTrigger asChild>
            <div className="group relative cursor-pointer">
              <div className="absolute -inset-2 bg-primary/20 rounded-full blur-xl opacity-0 group-hover:opacity-100 transition-opacity" />
              <Button 
                size="icon" 
                className="w-14 h-14 rounded-full bg-white/10 backdrop-blur-xl border border-white/20 text-primary hover:bg-white/20 shadow-lg relative z-10 overflow-hidden transition-transform active:scale-90"
              >
                <Sparkles className="w-7 h-7" />
                <div className="absolute inset-0 bg-gradient-to-tr from-primary/10 to-transparent pointer-events-none" />
              </Button>
            </div>
          </SheetTrigger>
          <SheetContent side="right" className="w-full sm:max-w-[440px] bg-[#00001D]/95 border-l border-white/10 backdrop-blur-2xl p-0 flex flex-col">
            <SheetHeader className="p-6 border-b border-white/5 bg-white/[0.02]">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center overflow-hidden border border-white/10">
                  <img 
                    src={CANDY_AVATAR_URL} 
                    alt="Candy Assistant" 
                    className="w-full h-full object-contain" 
                  />
                </div>
                <div>
                  <SheetTitle className="text-white font-headline text-left">Candy Assistant</SheetTitle>
                  <p className="text-[10px] text-primary font-bold uppercase tracking-widest text-left">Naxde Guía Inteligente</p>
                </div>
              </div>
            </SheetHeader>
            
            <ScrollArea className="flex-1 p-6">
              <div className="space-y-6">
                {messages.map((msg, idx) => (
                  <div key={idx} className={cn(
                    "flex gap-3 max-w-[90%]",
                    msg.role === 'user' ? "ml-auto flex-row-reverse" : "mr-auto"
                  )}>
                    <div className={cn(
                      "w-8 h-8 rounded-lg flex items-center justify-center shrink-0 overflow-hidden",
                      msg.role === 'user' ? "bg-primary/20" : "bg-transparent border border-white/10"
                    )}>
                      {msg.role === 'user' ? (
                        <User className="w-4 h-4 text-primary" />
                      ) : (
                        <img 
                          src={CANDY_AVATAR_URL} 
                          alt="Candy" 
                          className="w-full h-full object-contain" 
                        />
                      )}
                    </div>
                    <div className={cn(
                      "p-4 rounded-2xl text-sm leading-relaxed",
                      msg.role === 'user' 
                        ? "bg-primary text-white shadow-[0_4px_15px_rgba(248,0,55,0.2)]" 
                        : "bg-white/5 text-white/80 border border-white/5"
                    )}>
                      {msg.content}
                    </div>
                  </div>
                ))}
                {isLoading && (
                  <div className="flex gap-3 mr-auto">
                    <div className="w-8 h-8 rounded-lg bg-transparent border border-white/10 flex items-center justify-center shrink-0 overflow-hidden">
                      <img 
                        src={CANDY_AVATAR_URL} 
                        alt="Candy" 
                        className="w-full h-full object-contain animate-pulse" 
                      />
                    </div>
                    <div className="bg-white/5 p-4 rounded-2xl flex gap-1.5 items-center border border-white/5">
                      <div className="w-1.5 h-1.5 bg-primary rounded-full animate-bounce [animation-delay:-0.3s]" />
                      <div className="w-1.5 h-1.5 bg-primary rounded-full animate-bounce [animation-delay:-0.15s]" />
                      <div className="w-1.5 h-1.5 bg-primary rounded-full animate-bounce" />
                    </div>
                  </div>
                )}
                <div ref={scrollRef} />
              </div>
            </ScrollArea>

            <div className="p-6 border-t border-white/5 bg-white/[0.01]">
              <form onSubmit={handleSendMessage} className="flex gap-2">
                <Input 
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  placeholder="Escribe tu duda aquí..." 
                  className="bg-white/5 border-white/10 text-white rounded-xl focus:ring-primary h-14"
                />
                <Button 
                  disabled={isLoading || !input.trim()}
                  type="submit" 
                  size="icon" 
                  className="bg-primary hover:bg-primary/90 text-white shrink-0 rounded-xl h-14 w-14 neon-accent shadow-[0_0_15px_rgba(248,0,55,0.4)]"
                >
                  <Send className="w-5 h-5" />
                </Button>
              </form>
              <p className="text-[10px] text-white/20 mt-4 text-center uppercase tracking-widest font-bold">
                Potenciado por Naxde Engine
              </p>
            </div>
          </SheetContent>
        </Sheet>
      )}

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
          className="w-14 h-14 rounded-full bg-[#25D366] hover:bg-[#25D366]/90 text-white shadow-lg border-none relative z-10 transition-transform active:scale-90 animate-bounce"
        >
          <MessageCircle className="w-7 h-7" />
        </Button>
      </a>
    </div>
  );
};

export const FloatingActions = () => {
  return (
    <Suspense fallback={null}>
      <FloatingActionsContent />
    </Suspense>
  );
};