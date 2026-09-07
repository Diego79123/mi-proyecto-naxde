'use client';
import Link from 'next/link';
import { ArrowUpRight } from 'lucide-react';
import { Sheet, SheetContent, SheetTrigger, SheetTitle } from '@/components/ui/sheet';
type Project = { title?: string; category?: string; shortDescription?: string; description?: string; imageUrl?: string; technologies?: string[]; customHref?: string };
export function ProjectAction({ project }: { project: Project }) {
  const action = <>Ver proyecto <ArrowUpRight size={18} /></>;
  const style = 'inline-flex items-center gap-4 text-sm text-[#e1c9f5] hover:text-primary py-3';
  const href = project.customHref;
  const validHref = href && ((href.startsWith('/') && !href.startsWith('//')) || /^https:\/\//i.test(href));
  if (validHref) return <Link href={href} className={style}>{action}</Link>;
  return <Sheet><SheetTrigger asChild><button className={style}>{action}</button></SheetTrigger><SheetContent className="!bg-[#0b0717] !text-white !border-white/15 !w-full !max-w-2xl overflow-y-auto !p-8 md:!p-12" aria-describedby="project-description"><p className="text-xs tracking-widest text-[#b99ad4] mt-8 mb-5">{project.category}</p><SheetTitle className="text-4xl tracking-tight text-white mb-8">{project.title}</SheetTitle>{project.imageUrl && <img src={project.imageUrl} alt={project.title || 'Proyecto Naxde'} className="rounded-2xl w-full mb-8" />}<p id="project-description" className="text-base leading-relaxed text-[#bcaacc] whitespace-pre-wrap">{project.description || project.shortDescription}</p><div className="flex flex-wrap gap-3 my-8">{project.technologies?.map(tech => <span key={tech} className="rounded-full border border-white/15 px-4 py-2 text-xs text-[#cfb5e5]">{tech}</span>)}</div><Link href="/contacto" className={style}>Crear mi próximo proyecto <ArrowUpRight size={18} /></Link></SheetContent></Sheet>;
}
