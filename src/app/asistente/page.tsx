'use client';

import { useState, useRef, useEffect, Suspense } from 'react';
import dynamic from 'next/dynamic';
import { 
  Send, 
  Image as ImageIcon, 
  Sparkles, 
  User, 
  Bot, 
  Plus, 
  Trash2, 
  Share2, 
  Download, 
  Mic, 
  MicOff, 
  Paperclip, 
  X, 
  Edit3, 
  CheckCircle2, 
  Circle,
  MessageSquare,
  LayoutDashboard,
  MoreVertical,
  Zap
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import Markdown from 'react-markdown';
import { cn } from '@/lib/utils';
import { generateChatResponseAction, generateImageAction } from './actions';
import Link from 'next/link';

// Importación dinámica del editor para evitar errores de pre-renderizado (Konva necesita el cliente)
const ImageEditor = dynamic(() => import('@/components/asistente/ImageEditor').then(mod => mod.ImageEditor), {
  ssr: false,
});

const STORAGE_KEY = 'social_ai_sessions_v4';

function AsistenteContent() {
  const [sessions, setSessions] = useState<any[]>([]);
  const [currentSessionId, setCurrentSessionId] = useState<string | null>(null);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const [isRecording, setIsRecording] = useState(false);
  const [attachments, setAttachments] = useState<any[]>([]);
  const [editingImageIndex, setEditingImageIndex] = useState<number | null>(null);
  const scrollRef = useRef<HTMLDivElement>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const recognitionRef = useRef<any>(null);

  useEffect(() => {
    const saved = localStorage.getItem(STORAGE_KEY);
    if (saved) {
      try {
        const parsed = JSON.parse(saved);
        if (Array.isArray(parsed)) {
          setSessions(parsed);
          if (parsed.length > 0) setCurrentSessionId(parsed[0].id);
        }
      } catch (e) { console.error(e); }
    }
  }, []);

  useEffect(() => {
    if (sessions.length > 0) {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(sessions));
    }
  }, [sessions]);

  useEffect(() => {
    if (scrollRef.current) scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
  }, [currentSessionId, sessions]);

  const currentSession = sessions.find(s => s.id === currentSessionId);
  const messages = currentSession?.messages || [];

  const createNewSession = () => {
    const newSession = {
      id: Date.now().toString(),
      title: 'Nueva conversación',
      messages: [],
      updatedAt: Date.now(),
    };
    setSessions(prev => [newSession, ...prev]);
    setCurrentSessionId(newSession.id);
  };

  const deleteSession = (id: string, e: React.MouseEvent) => {
    e.stopPropagation();
    setSessions(prev => prev.filter(s => s.id !== id));
    if (currentSessionId === id) setCurrentSessionId(null);
  };

  const processFiles = (files: FileList | File[]) => {
    Array.from(files).forEach(file => {
      if (!file.type.startsWith('image/')) return;
      const reader = new FileReader();
      reader.onloadend = () => {
        const result = reader.result as string;
        if (!result) return;
        setAttachments(prev => [...prev, {
          mimeType: file.type,
          data: result.split(',')[1],
          url: URL.createObjectURL(file),
          isReference: false
        }]);
      };
      reader.readAsDataURL(file);
    });
  };

  const toggleReference = (index: number) => {
    setAttachments(prev => prev.map((att, i) => 
      i === index ? { ...att, isReference: !att.isReference } : att
    ));
  };

  const handleSend = async () => {
    if ((!input.trim() && attachments.length === 0) || isLoading) return;

    let sessionId = currentSessionId;
    if (!sessionId) {
      const newSession = { id: Date.now().toString(), title: input.slice(0, 30) || 'Nueva conversación', messages: [], updatedAt: Date.now() };
      setSessions(prev => [newSession, ...prev]);
      setCurrentSessionId(newSession.id);
      sessionId = newSession.id;
    }

    const userMsg = { 
      id: Date.now().toString(), 
      role: 'user', 
      content: input, 
      attachments: [...attachments], 
      timestamp: Date.now() 
    };

    setSessions(prev => prev.map(s => s.id === sessionId ? { 
      ...s, 
      messages: [...s.messages, userMsg], 
      updatedAt: Date.now(),
      title: s.messages.length === 0 ? (input.slice(0, 30) || 'Imagen adjunta') : s.title
    } : s));

    const currentInput = input;
    const currentAtts = [...attachments];
    setInput('');
    setAttachments([]);
    setIsLoading(true);

    try {
      const session = sessions.find(s => s.id === sessionId);
      const history = (session?.messages || []).map(m => ({ 
        role: m.role === 'user' ? 'user' : 'model', 
        parts: [
          { text: m.content },
          ...(m.attachments || []).map(att => ({
            inlineData: { mimeType: att.mimeType, data: att.data }
          }))
        ] 
      }));

      const response = await generateChatResponseAction(currentInput, history, currentAtts);
      
      const imageMatch = response.match(/\[GENERATE_IMAGE:\s*(.*?)\]/);
      let generatedImageUrl = null;

      if (imageMatch) {
        const imagePrompt = imageMatch[1];
        const referenceImage = currentAtts.find(a => a.isReference);
        generatedImageUrl = await generateImageAction(imagePrompt, referenceImage ? { data: referenceImage.data, mimeType: referenceImage.mimeType } : undefined);
      }

      const assistantMsg = {
        id: (Date.now() + 1).toString(),
        role: 'assistant',
        content: response.replace(/\[GENERATE_IMAGE:.*?\]/g, '').trim(),
        imageUrl: generatedImageUrl || undefined,
        timestamp: Date.now(),
      };

      setSessions(prev => prev.map(s => s.id === sessionId ? { ...s, messages: [...s.messages, assistantMsg], updatedAt: Date.now() } : s));
    } catch (error) {
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  };

  const toggleRecording = () => {
    if (isRecording) {
      recognitionRef.current?.stop();
      setIsRecording(false);
    } else {
      const SpeechRecognition = (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition;
      if (!SpeechRecognition) return alert("Tu navegador no soporta el reconocimiento de voz.");

      const recognition = new SpeechRecognition();
      recognition.lang = 'es-ES';
      recognition.onresult = (event: any) => {
        const transcript = event.results[0][0].transcript;
        setInput(prev => prev + (prev ? ' ' : '') + transcript);
      };
      recognition.onend = () => setIsRecording(false);
      recognitionRef.current = recognition;
      recognition.start();
      setIsRecording(true);
    }
  };

  return (
    <div className="flex h-screen bg-zinc-50 overflow-hidden text-zinc-900 font-sans">
      <input type="file" ref={fileInputRef} onChange={(e) => e.target.files && processFiles(e.target.files)} className="hidden" accept="image/*" multiple />

      {/* Sidebar */}
      <AnimatePresence mode="wait">
        {isSidebarOpen && (
          <motion.aside
            initial={{ width: 0, opacity: 0 }}
            animate={{ width: 280, opacity: 1 }}
            exit={{ width: 0, opacity: 0 }}
            className="bg-white border-r border-zinc-200 flex flex-col h-full z-20"
          >
            <div className="p-4 border-b border-zinc-100 flex items-center justify-between">
              <div className="flex items-center gap-2 font-bold text-xl text-indigo-600">
                <Zap className="w-6 h-6 fill-indigo-600" />
                <span>SocialAI</span>
              </div>
              <button onClick={() => setIsSidebarOpen(false)} className="p-1.5 hover:bg-zinc-100 rounded-lg text-zinc-500 md:hidden">
                <MoreVertical className="w-5 h-5" />
              </button>
            </div>

            <div className="p-4 flex-1 overflow-y-auto space-y-4 no-scrollbar">
              <button onClick={createNewSession} className="w-full flex items-center gap-2 px-4 py-2.5 bg-indigo-600 text-white rounded-xl font-medium hover:bg-indigo-700 transition-colors shadow-sm">
                <Plus className="w-5 h-5" />
                <span>Nuevo Chat</span>
              </button>

              <div className="space-y-1">
                <p className="px-2 text-xs font-semibold text-zinc-400 uppercase tracking-wider mb-2">Historial</p>
                <div className="space-y-1">
                  {sessions.length === 0 && (
                    <p className="px-3 py-2 text-xs text-zinc-400 italic">No hay conversaciones aún</p>
                  )}
                  {sessions.map((session) => (
                    <button 
                      key={session.id}
                      onClick={() => setCurrentSessionId(session.id)}
                      className={cn(
                        "w-full flex items-center gap-3 px-3 py-2 text-sm rounded-lg transition-colors text-left group",
                        currentSessionId === session.id ? "bg-indigo-50 text-indigo-700" : "text-zinc-600 hover:bg-zinc-100"
                      )}
                    >
                      <MessageSquare className="w-4 h-4 shrink-0" />
                      <span className="truncate flex-1">{session.title}</span>
                      <Trash2 className="w-3.5 h-3.5 opacity-0 group-hover:opacity-100 text-zinc-400 hover:text-red-500 transition-opacity" onClick={(e) => deleteSession(session.id, e)} />
                    </button>
                  ))}
                </div>
              </div>
            </div>

            <div className="p-4 border-t border-zinc-100">
              <div className="flex items-center gap-3 p-2 rounded-xl hover:bg-zinc-50 cursor-pointer transition-colors">
                <div className="w-8 h-8 rounded-full bg-indigo-100 flex items-center justify-center text-indigo-600 font-bold text-xs">
                  JD
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium text-zinc-900 truncate">John Doe</p>
                  <p className="text-xs text-zinc-500 truncate">Pro Plan</p>
                </div>
              </div>
              <Link href="/" className="mt-2 block">
                <div className="flex items-center gap-3 p-2 rounded-xl hover:bg-zinc-50 transition-colors text-zinc-400 text-xs">
                  <LayoutDashboard className="w-3 h-3" />
                  <span>Volver al Sitio Principal</span>
                </div>
              </Link>
            </div>
          </motion.aside>
        )}
      </AnimatePresence>

      {/* Main Content */}
      <main className="flex-1 flex flex-col relative min-w-0">
        <header className="h-16 border-b border-zinc-200 bg-white/80 backdrop-blur-md flex items-center justify-between px-4 md:px-8 sticky top-0 z-10">
          <div className="flex items-center gap-4">
            {!isSidebarOpen && (
              <button onClick={() => setIsSidebarOpen(true)} className="p-2 hover:bg-zinc-100 rounded-lg text-zinc-500">
                <LayoutDashboard className="w-5 h-5" />
              </button>
            )}
            <h1 className="font-semibold text-zinc-900 truncate">
              {currentSession ? currentSession.title : "Asistente de Estrategia"}
            </h1>
          </div>
          <div className="flex items-center gap-2">
            <button className="p-2 hover:bg-zinc-100 rounded-lg text-zinc-500"><Share2 className="w-5 h-5" /></button>
            <button className="p-2 hover:bg-zinc-100 rounded-lg text-zinc-500"><Download className="w-5 h-5" /></button>
          </div>
        </header>

        <div ref={scrollRef} className="flex-1 overflow-y-auto p-4 md:p-8 space-y-6 scroll-smooth no-scrollbar">
          {messages.length === 0 && (
            <div className="h-full flex flex-col items-center justify-center text-center max-w-2xl mx-auto space-y-6">
              <div className="w-16 h-16 bg-indigo-100 rounded-2xl flex items-center justify-center text-indigo-600 mb-2">
                <Sparkles className="w-8 h-8" />
              </div>
              <h2 className="text-3xl font-bold text-zinc-900">¿Qué vamos a crear hoy?</h2>
              <p className="text-zinc-500 text-lg">
                Soy tu experto en redes sociales. Puedo ayudarte a diseñar una estrategia completa, redactar copys persuasivos o incluso generar imágenes para tus posts.
              </p>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 w-full mt-8">
                {[
                  "Crea una estrategia para Instagram de una cafetería",
                  "Diseña un logo minimalista para una startup tech",
                  "Escribe 5 captions para LinkedIn sobre IA",
                  "Plan de contenido semanal para una marca de ropa"
                ].map((s, i) => (
                  <button key={i} onClick={() => setInput(s)} className="p-4 text-left border border-zinc-200 rounded-xl hover:border-indigo-300 hover:bg-indigo-50/50 transition-all text-sm text-zinc-600">{s}</button>
                ))}
              </div>
            </div>
          )}

          {messages.map((m: any) => (
            <div key={m.id} className={cn("flex gap-4 max-w-4xl mx-auto", m.role === 'user' ? "flex-row-reverse" : "flex-row")}>
              <div className={cn("w-8 h-8 rounded-lg flex items-center justify-center shrink-0 mt-1", m.role === 'user' ? "bg-indigo-600 text-white" : "bg-white border border-zinc-200 text-indigo-600")}>
                {m.role === 'user' ? <User className="w-5 h-5" /> : <Bot className="w-5 h-5" />}
              </div>
              
              <div className={cn("flex flex-col gap-2 max-w-[85%]", m.role === 'user' ? "items-end" : "items-start")}>
                <div className={cn("p-4 rounded-2xl shadow-sm", m.role === 'user' ? "bg-indigo-600 text-white rounded-tr-none" : "bg-white border border-zinc-200 text-zinc-800 rounded-tl-none")}>
                  {m.attachments?.length > 0 && (
                    <div className="flex flex-wrap gap-2 mb-3">
                      {m.attachments.map((att: any, i: number) => (
                        <div key={i} className="relative w-20 h-20 rounded-lg overflow-hidden border border-white/20">
                          <img src={`data:${att.mimeType};base64,${att.data}`} alt="Adjunto" className="w-full h-full object-cover" />
                        </div>
                      ))}
                    </div>
                  )}
                  <div className="markdown-body prose prose-sm max-w-none">
                    <Markdown>{m.content}</Markdown>
                  </div>
                  {m.imageUrl && (
                    <div className="mt-4 rounded-xl overflow-hidden border border-zinc-100 bg-zinc-50">
                      <img src={m.imageUrl} alt="Generada por IA" className="w-full h-auto object-cover" />
                      <div className="p-3 flex justify-between items-center border-t border-zinc-100">
                        <span className="text-xs text-zinc-500 font-medium">Imagen generada por IA</span>
                        <a href={m.imageUrl} download="ai-image.png" className="p-1.5 hover:bg-zinc-200 rounded-lg text-zinc-600 transition-colors"><Download className="w-4 h-4" /></a>
                      </div>
                    </div>
                  )}
                </div>
                <span className="text-[10px] text-zinc-400 px-1">{new Date(m.timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</span>
              </div>
            </div>
          ))}

          {isLoading && (
            <div className="flex gap-4 max-w-4xl mx-auto">
              <div className="w-8 h-8 rounded-lg bg-white border border-zinc-200 text-indigo-600 flex items-center justify-center shrink-0"><Bot className="w-5 h-5" /></div>
              <div className="bg-white border border-zinc-200 p-4 rounded-2xl rounded-tl-none shadow-sm flex gap-1">
                {[0, 150, 300].map(d => <span key={d} className="w-1.5 h-1.5 bg-indigo-400 rounded-full animate-bounce" style={{ animationDelay: `${d}ms` }} />)}
              </div>
            </div>
          )}
        </div>

        {/* Input Area */}
        <div className="p-4 md:p-8 bg-gradient-to-t from-zinc-50 via-zinc-50 to-transparent">
          <div className="max-w-4xl mx-auto space-y-4">
            
            {attachments.length > 0 && (
              <div className="flex flex-wrap gap-3 px-2">
                {attachments.some(a => a.isReference) && (
                  <div className="w-full flex items-center gap-2 mb-1 text-[10px] text-emerald-600 font-semibold uppercase tracking-wider animate-pulse">
                    <Zap className="w-3 h-3" />
                    <span>Modo Preservación de Logo Activo</span>
                  </div>
                )}
                {attachments.map((att, i) => (
                  <div key={i} className="relative group">
                    <div className={cn("w-20 h-20 rounded-xl overflow-hidden border-2 shadow-sm relative transition-all", att.isReference ? "border-emerald-500 ring-2 ring-emerald-500/20" : "border-zinc-200")}>
                      <img src={att.url} alt="Preview" className="w-full h-full object-cover" />
                      <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-2">
                        <button onClick={() => setEditingImageIndex(i)} className="p-1.5 bg-white/20 hover:bg-white/40 rounded-lg text-white"><Edit3 className="w-4 h-4" /></button>
                        <button onClick={() => toggleReference(i)} className={cn("p-1.5 rounded-lg", att.isReference ? "bg-emerald-500 text-white" : "bg-white/20 hover:bg-white/40 text-white")}>
                          {att.isReference ? <CheckCircle2 className="w-4 h-4" /> : <Circle className="w-4 h-4" />}
                        </button>
                      </div>
                      {att.isReference && (
                        <div className="absolute top-1 left-1 bg-emerald-500 text-white text-[8px] font-bold px-1.5 py-0.5 rounded uppercase tracking-wider shadow-sm">
                          Logo
                        </div>
                      )}
                    </div>
                    <button onClick={() => setAttachments(prev => prev.filter((_, idx) => idx !== i))} className="absolute -top-2 -right-2 w-6 h-6 bg-white border border-zinc-200 rounded-full flex items-center justify-center text-zinc-400 hover:text-red-500 shadow-sm transition-colors z-10"><X className="w-4 h-4" /></button>
                  </div>
                ))}
              </div>
            )}

            <div className="relative group">
              <textarea
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={(e) => e.key === 'Enter' && !e.shiftKey && (e.preventDefault(), handleSend())}
                placeholder="Describe tu empresa, sube una imagen o usa tu voz..."
                className="w-full bg-white border border-zinc-200 rounded-2xl px-4 py-4 pr-32 shadow-lg focus:ring-2 focus:ring-indigo-500 outline-none resize-none min-h-[60px] max-h-[200px] transition-all"
                rows={1}
              />
              <div className="absolute right-2 bottom-2 flex items-center gap-1">
                <button onClick={() => setInput(prev => prev + " Genera una imagen para este post: ")} className="p-2 text-zinc-400 hover:text-indigo-600 hover:bg-indigo-50 rounded-xl transition-all" title="Generar imagen"><ImageIcon className="w-5 h-5" /></button>
                <button onClick={() => fileInputRef.current?.click()} className="p-2 text-zinc-400 hover:text-indigo-600 hover:bg-indigo-50 rounded-xl transition-all" title="Adjuntar imagen"><Paperclip className="w-5 h-5" /></button>
                <button onClick={toggleRecording} className={cn("p-2 rounded-xl transition-all", isRecording ? "bg-red-50 text-red-600 animate-pulse" : "text-zinc-400 hover:text-indigo-600 hover:bg-indigo-50")}>{isRecording ? <MicOff className="w-5 h-5" /> : <Mic className="w-5 h-5" />}</button>
                <button onClick={handleSend} disabled={isLoading} className={cn("p-2 rounded-xl transition-all", (input.trim() || attachments.length > 0) ? "bg-indigo-600 text-white shadow-md hover:bg-indigo-700" : "bg-zinc-100 text-zinc-400")}><Send className="w-5 h-5" /></button>
              </div>
            </div>
            <p className="text-[10px] text-zinc-400 text-center mt-2">
              SocialAI puede cometer errores. Considera verificar la información importante.
            </p>
          </div>
        </div>
      </main>

      {editingImageIndex !== null && (
        <ImageEditor 
          imageUrl={attachments[editingImageIndex].url}
          onSave={(url) => {
            setAttachments(prev => prev.map((att, i) => i === editingImageIndex ? { ...att, url, data: url.split(',')[1] } : att));
            setEditingImageIndex(null);
          }}
          onClose={() => setEditingImageIndex(null)}
        />
      )}
    </div>
  );
}

export default function AsistentePage() {
  return (
    <Suspense fallback={
      <div className="flex h-screen items-center justify-center bg-zinc-50">
        <div className="flex flex-col items-center gap-4">
          <Zap className="w-12 h-12 text-indigo-600 animate-pulse" />
          <p className="text-zinc-400 text-sm font-medium animate-pulse">Cargando Inteligencia Artificial...</p>
        </div>
      </div>
    }>
      <AsistenteContent />
    </Suspense>
  );
}
