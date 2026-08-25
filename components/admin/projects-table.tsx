"use client";

import { Eye, EyeOff, GripVertical, Pencil, Plus, Trash2 } from "lucide-react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { useState } from "react";
import { getSupabaseBrowserClient } from "@/lib/supabase/client";
import { removeManagedMedia } from "@/lib/media";
import type { Project } from "@/lib/types";

export function ProjectsTable({ initialProjects }: { initialProjects: Project[] }) {
  const router = useRouter();
  const [projects, setProjects] = useState(initialProjects);
  const [dragged, setDragged] = useState<number | null>(null);
  const [message, setMessage] = useState("");

  async function reorder(from: number, to: number) {
    if (from === to) return;
    const next = [...projects];
    const [item] = next.splice(from, 1);
    next.splice(to, 0, item);
    setProjects(next);
    const supabase = getSupabaseBrowserClient();
    if (!supabase) return;
    const results = await Promise.all(next.map((project, position) => supabase.from("projects").update({ position }).eq("id", project.id)));
    if (results.some((result) => result.error)) setMessage("Não foi possível salvar a nova ordem.");
    else setMessage("Ordem salva.");
  }

  async function remove(project: Project) {
    if (!window.confirm(`Excluir definitivamente o projeto “${project.title}”?`)) return;
    const supabase = getSupabaseBrowserClient()!;
    const mediaReferences = [
      project.cover_url,
      project.video_url,
      ...(project.project_media ?? []).flatMap((item) => [item.url, item.poster_url])
    ];
    const { error } = await supabase.from("projects").delete().eq("id", project.id);
    if (error) setMessage("Não foi possível excluir.");
    else {
      const storageError = await removeManagedMedia(supabase, mediaReferences);
      setProjects((items) => items.filter((item) => item.id !== project.id));
      setMessage(storageError ? "Projeto excluído; uma mídia privada precisa de limpeza manual." : "Projeto e mídias excluídos.");
    }
  }

  async function toggle(project: Project) {
    const { error } = await getSupabaseBrowserClient()!.from("projects").update({ published: !project.published }).eq("id", project.id);
    if (error) setMessage("Não foi possível alterar a publicação.");
    else setProjects((items) => items.map((item) => item.id === project.id ? { ...item, published: !item.published } : item));
  }

  return (
    <div>
      <div className="flex flex-col justify-between gap-5 sm:flex-row sm:items-end"><div><p className="text-xs font-black uppercase tracking-[0.16em] text-[#0b66ff]">Portfólio</p><h1 className="display mt-3 text-5xl font-black uppercase">Projetos</h1><p className="mt-3 text-sm text-[#657286]">Arraste para ordenar. Rascunhos não aparecem no site.</p></div><Link href="/admin/projetos/novo" className="button-light"><Plus className="h-4 w-4" /> Novo projeto</Link></div>
      {message && <p className="mt-5 rounded-lg bg-white p-3 text-sm text-[#526074]" aria-live="polite">{message}</p>}
      <div className="mt-8 overflow-hidden rounded-2xl border border-[#07152f]/8 bg-white">
        {projects.length === 0 ? <div className="p-12 text-center text-sm text-[#748196]">Nenhum projeto cadastrado.</div> : projects.map((project, index) => (
          <div key={project.id} draggable onDragStart={() => setDragged(index)} onDragOver={(event) => event.preventDefault()} onDrop={() => { if (dragged !== null) reorder(dragged, index); setDragged(null); }} className="grid gap-4 border-b border-[#07152f]/8 p-4 last:border-0 sm:grid-cols-[auto_1fr_auto] sm:items-center">
            <button className="hidden cursor-grab text-[#a1a9b5] sm:block" aria-label="Arrastar projeto"><GripVertical className="h-5 w-5" /></button>
            <div><div className="flex flex-wrap items-center gap-2"><h2 className="font-bold">{project.title}</h2>{project.featured && <span className="rounded-full bg-[#0b66ff]/10 px-2 py-1 text-[0.55rem] font-black uppercase tracking-[0.12em] text-[#0b66ff]">Destaque</span>}</div><p className="mt-1 text-xs text-[#758196]">{project.client} · {project.category} · {project.year}</p></div>
            <div className="flex items-center gap-2"><button onClick={() => toggle(project)} className={`grid h-10 w-10 place-items-center rounded-full ${project.published ? "bg-emerald-50 text-emerald-700" : "bg-[#eef1f5] text-[#7e899a]"}`} aria-label={project.published ? "Ocultar projeto" : "Publicar projeto"}>{project.published ? <Eye className="h-4 w-4" /> : <EyeOff className="h-4 w-4" />}</button><button onClick={() => router.push(`/admin/projetos/${project.id}`)} className="grid h-10 w-10 place-items-center rounded-full bg-[#07152f] text-white" aria-label="Editar projeto"><Pencil className="h-4 w-4" /></button><button onClick={() => remove(project)} className="grid h-10 w-10 place-items-center rounded-full bg-red-50 text-red-600" aria-label="Excluir projeto"><Trash2 className="h-4 w-4" /></button></div>
          </div>
        ))}
      </div>
    </div>
  );
}
