import { fallbackData } from "@/lib/fallback-data";
import { getMediaPath, MEDIA_BUCKET } from "@/lib/media";
import { createSupabaseAdminClient } from "@/lib/supabase/admin";
import { createSupabaseServerClient } from "@/lib/supabase/server";
import type { BehindScene, ClientLogo, Equipment, Project, Service, SiteData, SiteSettings, Testimonial } from "@/lib/types";

function ordered<T extends { position: number }>(items: T[]) {
  return [...items].sort((a, b) => a.position - b.position);
}

async function resolvePublicMedia(data: SiteData): Promise<SiteData> {
  const admin = createSupabaseAdminClient();
  const values = [
    data.settings.logo_url,
    data.settings.hero_video_url,
    data.settings.hero_poster_url,
    data.settings.showreel_url,
    data.settings.about_image_url,
    data.settings.team_image_url,
    data.settings.cta_background_url,
    ...data.projects.flatMap((project) => [
      project.cover_url,
      project.video_url,
      ...(project.project_media ?? []).flatMap((item) => [item.url, item.poster_url])
    ]),
    ...data.equipment.map((item) => item.image_url),
    ...data.clients.map((item) => item.logo_url),
    ...data.testimonials.map((item) => item.portrait_url),
    ...data.behindScenes.flatMap((item) => [item.media_url, item.poster_url])
  ];
  const paths = [...new Set(values.map(getMediaPath).filter((path): path is string => Boolean(path)))];
  const signed = new Map<string, string>();

  if (admin && paths.length) {
    const { data: signedUrls } = await admin.storage.from(MEDIA_BUCKET).createSignedUrls(paths, 3600);
    signedUrls?.forEach((item, index) => {
      if (item.signedUrl) signed.set(paths[index], item.signedUrl);
    });
  }

  const resolve = (value: string | null) => {
    const path = getMediaPath(value);
    return path ? signed.get(path) ?? null : value;
  };

  return {
    ...data,
    settings: {
      ...data.settings,
      logo_url: resolve(data.settings.logo_url),
      hero_video_url: resolve(data.settings.hero_video_url),
      hero_poster_url: resolve(data.settings.hero_poster_url),
      showreel_url: resolve(data.settings.showreel_url),
      about_image_url: resolve(data.settings.about_image_url),
      team_image_url: resolve(data.settings.team_image_url),
      cta_background_url: resolve(data.settings.cta_background_url)
    },
    projects: data.projects.map((project) => ({
      ...project,
      cover_url: resolve(project.cover_url),
      video_url: resolve(project.video_url),
      project_media: (project.project_media ?? []).flatMap((item) => {
        const url = resolve(item.url);
        return url ? [{ ...item, url, poster_url: resolve(item.poster_url) }] : [];
      })
    })),
    equipment: data.equipment.map((item) => ({ ...item, image_url: resolve(item.image_url) })),
    clients: data.clients.map((item) => ({ ...item, logo_url: resolve(item.logo_url) })),
    testimonials: data.testimonials.map((item) => ({ ...item, portrait_url: resolve(item.portrait_url) })),
    behindScenes: data.behindScenes.map((item) => ({
      ...item,
      media_url: resolve(item.media_url),
      poster_url: resolve(item.poster_url)
    }))
  };
}

export async function getPublicSiteData(): Promise<SiteData> {
  const supabase = await createSupabaseServerClient();
  if (!supabase) return fallbackData;

  const [projects, services, equipment, clients, testimonials, behind, settings] = await Promise.all([
    supabase.from("projects").select("*, project_media(*)").eq("published", true).order("position"),
    supabase.from("services").select("*").eq("visible", true).order("position"),
    supabase.from("equipment").select("*").eq("visible", true).order("position"),
    supabase.from("client_logos").select("*").eq("visible", true).order("position"),
    supabase.from("testimonials").select("*").eq("visible", true).order("position"),
    supabase.from("behind_scenes").select("*").eq("visible", true).order("position"),
    supabase.from("site_settings").select("*").eq("id", "main").maybeSingle()
  ]);

  const failed = [projects, services, equipment, clients, testimonials, behind, settings].some(
    (result) => result.error
  );
  if (failed) return fallbackData;

  return resolvePublicMedia({
    projects: ordered((projects.data ?? []) as Project[]).map((project) => ({
      ...project,
      project_media: ordered(project.project_media ?? [])
    })),
    services: ordered((services.data ?? []) as Service[]),
    equipment: ordered((equipment.data ?? []) as Equipment[]),
    clients: ordered((clients.data ?? []) as ClientLogo[]),
    testimonials: ordered((testimonials.data ?? []) as Testimonial[]),
    behindScenes: ordered((behind.data ?? []) as BehindScene[]),
    settings: (settings.data as SiteSettings | null) ?? fallbackData.settings
  });
}

export async function getProject(slug: string) {
  const data = await getPublicSiteData();
  return data.projects.find((project) => project.slug === slug) ?? null;
}

export async function getAllProjectSlugs() {
  const data = await getPublicSiteData();
  return data.projects.map((project) => project.slug);
}
