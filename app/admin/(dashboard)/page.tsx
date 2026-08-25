import { Eye, FolderKanban, Inbox, Sparkles } from "lucide-react";
import { createSupabaseServerClient } from "@/lib/supabase/server";

export default async function DashboardPage() {
  const supabase = await createSupabaseServerClient();
  const [projects, published, leads, newLeads] = await Promise.all([
    supabase!.from("projects").select("id", { count: "exact", head: true }),
    supabase!.from("projects").select("id", { count: "exact", head: true }).eq("published", true),
    supabase!.from("leads").select("id", { count: "exact", head: true }),
    supabase!.from("leads").select("id", { count: "exact", head: true }).eq("status", "novo")
  ]);
  const cards = [
    ["Projetos", projects.count ?? 0, FolderKanban, "/admin/projetos"],
    ["Publicados", published.count ?? 0, Eye, "/admin/projetos"],
    ["Contatos", leads.count ?? 0, Inbox, "/admin/contatos"],
    ["Novos contatos", newLeads.count ?? 0, Sparkles, "/admin/contatos"]
  ] as const;

  return (
    <div>
      <p className="text-xs font-black uppercase tracking-[0.16em] text-[#0b66ff]">AA Admin</p>
      <h1 className="display mt-3 text-5xl font-black uppercase">Visão geral</h1>
      <p className="mt-3 text-sm text-[#657286]">Acompanhe o conteúdo publicado e as novas solicitações.</p>
      <div className="mt-10 grid gap-4 sm:grid-cols-2 xl:grid-cols-4">{cards.map(([label, value, Icon, href]) => <a key={label} href={href} className="rounded-2xl border border-[#07152f]/8 bg-white p-6 shadow-sm transition hover:-translate-y-1 hover:shadow-lg"><div className="flex items-center justify-between"><Icon className="h-5 w-5 text-[#0b66ff]" /><span className="text-[0.58rem] font-bold uppercase tracking-[0.15em] text-[#8390a3]">Abrir</span></div><p className="display mt-8 text-5xl font-black">{value}</p><p className="mt-2 text-sm font-bold">{label}</p></a>)}</div>
      <div className="mt-8 rounded-2xl bg-[#07152f] p-7 text-white"><p className="text-xs font-bold uppercase tracking-[0.14em] text-[#62b8ff]">Configuração inicial</p><h2 className="display mt-3 text-3xl font-black uppercase">Suba o showreel e as imagens</h2><p className="mt-3 max-w-2xl text-sm leading-6 text-white/52">A identidade oficial já está incorporada. Em Conteúdo, envie vídeos, capas e fotos para substituir cada placeholder sem mexer no layout.</p><a href="/admin/conteudo" className="button-primary mt-6">Configurar conteúdo</a></div>
    </div>
  );
}
