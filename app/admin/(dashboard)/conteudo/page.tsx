import { ContentManager, type ContentGroup, type EditableRow } from "@/components/admin/content-manager";
import { fallbackData } from "@/lib/fallback-data";
import { createSupabaseServerClient } from "@/lib/supabase/server";
import type { SiteSettings } from "@/lib/types";

export default async function ContentPage() {
  const supabase = await createSupabaseServerClient();
  const [settingsResult, services, clients, equipment, testimonials, behind] = await Promise.all([
    supabase!.from("site_settings").select("*").eq("id", "main").maybeSingle(),
    supabase!.from("services").select("*").order("position"),
    supabase!.from("client_logos").select("*").order("position"),
    supabase!.from("equipment").select("*").order("position"),
    supabase!.from("testimonials").select("*").order("position"),
    supabase!.from("behind_scenes").select("*").order("position")
  ]);
  const groups: ContentGroup[] = [
    { key: "services", title: "Serviços", table: "services", items: (services.data ?? []) as EditableRow[], fields: [{ name: "title", label: "Título" }, { name: "icon", label: "Ícone (Lucide)" }, { name: "description", label: "Descrição", type: "textarea" }, { name: "visible", label: "Visível", type: "checkbox" }] },
    { key: "clients", title: "Clientes", table: "client_logos", items: (clients.data ?? []) as EditableRow[], fields: [{ name: "name", label: "Nome" }, { name: "logo_url", label: "URL do logotipo", type: "url" }, { name: "logo_url", label: "Enviar logotipo", type: "file", accept: "image/*" }, { name: "visible", label: "Visível", type: "checkbox" }] },
    { key: "equipment", title: "Equipamentos", table: "equipment", items: (equipment.data ?? []) as EditableRow[], fields: [{ name: "title", label: "Nome" }, { name: "image_url", label: "URL da foto", type: "url" }, { name: "image_url", label: "Enviar foto", type: "file", accept: "image/*" }, { name: "description", label: "Descrição", type: "textarea" }, { name: "visible", label: "Visível", type: "checkbox" }] },
    { key: "testimonials", title: "Depoimentos", table: "testimonials", items: (testimonials.data ?? []) as EditableRow[], fields: [{ name: "author_name", label: "Nome" }, { name: "author_role", label: "Cargo" }, { name: "author_company", label: "Empresa" }, { name: "portrait_url", label: "Retrato", type: "url" }, { name: "quote", label: "Depoimento real", type: "textarea" }, { name: "visible", label: "Visível", type: "checkbox" }] },
    { key: "behind", title: "Bastidores", table: "behind_scenes", items: (behind.data ?? []) as EditableRow[], fields: [{ name: "title", label: "Título" }, { name: "equipment", label: "Equipamento" }, { name: "media_type", label: "Tipo", type: "select", options: ["image", "video"] }, { name: "orientation", label: "Orientação", type: "select", options: ["vertical", "horizontal", "square"] }, { name: "media_url", label: "URL da mídia", type: "url" }, { name: "media_url", label: "Enviar mídia", type: "file" }, { name: "poster_url", label: "Capa do vídeo", type: "url" }, { name: "visible", label: "Visível", type: "checkbox" }] }
  ];
  return <ContentManager settings={(settingsResult.data as SiteSettings | null) ?? fallbackData.settings} groups={groups} />;
}
