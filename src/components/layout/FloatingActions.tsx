'use client';
import { Suspense, useState, useRef, useEffect, type FormEvent } from 'react';
import { Orbit, ArrowUpRight, Send } from 'lucide-react';
import { Sheet, SheetContent, SheetTitle, SheetTrigger } from '@/components/ui/sheet';
import { generalAssistant } from '@/ai/flows/general-assistant-flow';
import { usePathname, useSearchParams } from 'next/navigation';
import s from './UniverseAssistant.module.css';
type Message = { role: 'user' | 'assistant'; content: string };
function AssistantDock() {
  const pathname = usePathname();
  const params = useSearchParams();
  const [open, setOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([{ role: 'assistant', content: 'Hola, soy el asistente de Naxde. Cuéntame qué quieres crear o mejorar en tu negocio y exploramos por dónde empezar.' }]);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);
  const bottom = useRef<HTMLDivElement>(null);
  const conversation = useRef<HTMLDivElement>(null);
  useEffect(() => { if (conversation.current) conversation.current.scrollTop = conversation.current.scrollHeight; }, [messages, loading]);
  async function send(event?: FormEvent, suggestion?: string) {
    event?.preventDefault();
    const text = (suggestion || input).trim();
    if (!text || loading) return;
    setInput(''); setLoading(true); setMessages(prev => [...prev, { role: 'user', content: text }]);
    try { const result = await generalAssistant({ message: text }); setMessages(prev => [...prev, { role: 'assistant', content: result.response }]); }
    catch { setMessages(prev => [...prev, { role: 'assistant', content: 'No pude completar la respuesta. Puedes intentar de nuevo o hablar con nuestro equipo por WhatsApp.' }]); }
    finally { setLoading(false); }
  }
  if (params?.get('mode') === 'mockup' || pathname?.startsWith('/preview/') || pathname?.startsWith('/demo/') || pathname?.startsWith('/admin') || pathname === '/asistente') return null;
  const tagua = pathname?.includes('/tarjetas-neocard/bonilla-vergara');
  const whatsapp = tagua ? 'https://wa.me/573102423116' : 'https://wa.me/573194254196';
  return <div className={s.dock}>
    {!tagua && <Sheet open={open} onOpenChange={setOpen}><SheetTrigger asChild><button className={s.launch} aria-label="Abrir asistente Naxde"><Orbit size={21} /><span>Naxde AI</span></button></SheetTrigger><SheetContent side="right" className={s.panel} aria-describedby="naxde-assistant-description"><div className={s.heading}><div className={s.mark}><Orbit size={28} /></div><div><SheetTitle className={s.title}>Naxde AI</SheetTitle><p id="naxde-assistant-description">TU GUÍA DE PROYECTOS</p></div></div><div ref={conversation} className={s.conversation} role="log" aria-live="polite" aria-relevant="additions text">{messages.map((message, i) => <article key={i} className={message.role === 'user' ? s.user : s.assistant}><span>{message.role === 'user' ? 'TÚ' : 'NAXDE AI'}</span><p>{message.content}</p></article>)}{loading && <p className={s.loading} role="status">Preparando una respuesta…</p>}<div ref={bottom} /></div>{messages.length === 1 && <div className={s.suggestions}>{['Quiero una página web', 'Automatizar mi negocio', 'Conocer NeoCard'].map(text => <button key={text} onClick={() => send(undefined, text)}>{text}<ArrowUpRight size={14} /></button>)}</div>}<div className={s.composer}><form onSubmit={send}><label htmlFor="naxde-assistant-input" className="sr-only">Tu mensaje</label><input id="naxde-assistant-input" value={input} onChange={event => setInput(event.target.value)} placeholder="Cuéntanos tu idea…" maxLength={3000} autoComplete="off" /><button type="submit" aria-label="Enviar mensaje" disabled={loading || !input.trim()}><Send size={18} /></button></form><div><span>Asistente con IA · Naxde</span><a href={whatsapp} target="_blank" rel="noopener noreferrer">Hablar con el equipo ↗</a></div></div></SheetContent></Sheet>}
    <a href={whatsapp} target="_blank" rel="noopener noreferrer" className={s.whatsapp} aria-label="Contactar por WhatsApp"><img src="/brands/whatsapp.svg" alt="" width="20" height="20" /><span>WhatsApp</span></a>
  </div>;
}
export function FloatingActions() { return <Suspense fallback={null}><AssistantDock /></Suspense>; }
