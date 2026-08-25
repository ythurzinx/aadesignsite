import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { ArrowLeft, ArrowUpRight } from "lucide-react";
import { notFound } from "next/navigation";
import { Brand } from "@/components/brand";
import { getAllProjectSlugs, getProject } from "@/lib/queries";

export const revalidate = 900;

export async function generateStaticParams() {
  const slugs = await getAllProjectSlugs();
  return slugs.map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const project = await getProject(slug);
  if (!project) return {};
  return {
    title: `${project.title} — ${project.client}`,
    description: project.description,
    alternates: { canonical: `/projetos/${project.slug}` },
    openGraph: { title: `${project.title} | AA Design & Media`, description: project.description, type: "article", images: project.cover_url ? [{ url: project.cover_url }] : ["/opengraph-image"] }
  };
}

export default async function ProjectPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const project = await getProject(slug);
  if (!project) notFound();
  const media = project.project_media ?? [];

  return (
    <main className="min-h-screen bg-[#03060d]">
      <header className="border-b border-white/10 py-5"><div className="shell flex items-center justify-between"><Link href="/"><Brand /></Link><Link href="/#portfolio" className="button-ghost"><ArrowLeft className="h-4 w-4" /> Voltar ao portfólio</Link></div></header>
      <article className="shell py-14 sm:py-20">
        <p className="text-[0.65rem] font-bold uppercase tracking-[0.18em] text-[#62b8ff]">{project.category} · {project.year}</p>
        <div className="mt-6 grid gap-8 lg:grid-cols-[1.2fr_.8fr] lg:items-end">
          <h1 className="display text-[clamp(4rem,10vw,9rem)] font-black uppercase leading-[0.78]">{project.title}</h1>
          <div><p className="text-sm font-bold uppercase tracking-[0.13em] text-white/75">{project.client}</p><p className="mt-5 max-w-xl text-base leading-7 text-white/52">{project.full_description || project.description}</p></div>
        </div>
        <div className="mt-12 overflow-hidden rounded-2xl border border-white/10 bg-[#071126]" style={{ aspectRatio: project.orientation === "vertical" ? "4/5" : "16/9" }}>
          {project.video_url ? <video controls playsInline preload="metadata" poster={project.cover_url ?? undefined} className="h-full w-full object-contain"><source src={project.video_url} /></video> : project.cover_url ? <div className="relative h-full"><Image src={project.cover_url} alt={project.title} fill sizes="100vw" className="object-contain" /></div> : <div className="media-placeholder flex h-full items-center justify-center text-center"><div><p className="text-[0.62rem] font-bold uppercase tracking-[0.2em] text-[#62b8ff]">Mídia pronta para upload</p><p className="display mt-3 text-5xl font-black uppercase">{project.client}</p></div></div>}
        </div>
        <div className="mt-12 grid gap-8 border-t border-white/12 pt-8 md:grid-cols-3"><div><p className="text-xs text-white/35">Formato</p><p className="mt-2 text-sm">{project.format}</p></div><div><p className="text-xs text-white/35">Serviços</p><p className="mt-2 text-sm">{project.services.join(", ")}</p></div>{project.credits && <div><p className="text-xs text-white/35">Ficha técnica</p><p className="mt-2 whitespace-pre-line text-sm">{project.credits}</p></div>}</div>
        {media.length > 0 && <div className="mt-16 grid gap-4 md:grid-cols-2">{media.map((item) => <div key={item.id} className="relative overflow-hidden rounded-xl border border-white/10 bg-[#071126]" style={{ aspectRatio: item.orientation === "vertical" ? "4/5" : item.orientation === "square" ? "1" : "16/9" }}>{item.kind === "image" ? <Image src={item.url} alt={item.alt} fill sizes="50vw" className="object-cover" /> : <video controls playsInline preload="metadata" poster={item.poster_url ?? undefined} className="h-full w-full object-cover"><source src={item.url} /></video>}</div>)}</div>}
        <div className="mt-20 rounded-2xl bg-[#0b66ff] p-8 sm:p-12"><p className="display text-[clamp(2.5rem,6vw,5rem)] font-black uppercase leading-[0.85]">Quer criar algo com essa energia?</p><Link href="/#contato" className="mt-8 inline-flex rounded-full bg-white px-6 py-4 text-xs font-black uppercase tracking-[0.12em] text-[#07152f]">Solicitar orçamento <ArrowUpRight className="ml-2 h-4 w-4" /></Link></div>
      </article>
    </main>
  );
}
