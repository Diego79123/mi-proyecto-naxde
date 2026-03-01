'use client';

import React, { useState, useRef, useEffect } from 'react';
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

interface Message {
  role: 'user' | 'assistant';
  content: string;
}

export const FloatingActions = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    { role: 'assistant', content: '¡Hola! Soy el asistente inteligente de Naxde. ¿Cómo puedo ayudarte a transformar tu negocio hoy?' }
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

  return (
    <div className="fixed bottom-24 right-6 md:bottom-10 md:right-10 z-[100] flex flex-col gap-4">
      {/* Botón de Asistente IA (Tipo Sidebar) */}
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
              <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center">
                <Sparkles className="w-6 h-6 text-primary" />
              </div>
              <div>
                <SheetTitle className="text-white font-headline text-left">Asistente Naxde</SheetTitle>
                <p className="text-[10px] text-primary font-bold uppercase tracking-widest text-left">Inteligencia Artificial</p>
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
                    "w-8 h-8 rounded-lg flex items-center justify-center shrink-0",
                    msg.role === 'user' ? "bg-primary/20" : "bg-white/10"
                  )}>
                    {msg.role === 'user' ? <User className="w-4 h-4 text-primary" /> : <Bot className="w-4 h-4 text-white/60" />}
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
                  <div className="w-8 h-8 rounded-lg bg-white/10 flex items-center justify-center shrink-0">
                    <Bot className="w-4 h-4 text-white/60 animate-pulse" />
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
    </div>
  );
};
