import type { MetadataRoute } from "next";
import { getAllProjectSlugs } from "@/lib/queries";

export const revalidate = 900;

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const base = process.env.NEXT_PUBLIC_SITE_URL || "https://aadesignmedia.com.br";
  const slugs = await getAllProjectSlugs();
  return [
    { url: base, lastModified: new Date(), changeFrequency: "weekly", priority: 1 },
    ...slugs.map((slug) => ({ url: `${base}/projetos/${slug}`, lastModified: new Date(), changeFrequency: "monthly" as const, priority: 0.7 }))
  ];
}
