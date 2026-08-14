import type { MetadataRoute } from "next";

import { projects } from "@/data/projects";

const baseUrl = "https://aadesignmidia.com.br";

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    { url: baseUrl, priority: 1 },
    { url: `${baseUrl}/contato`, priority: 0.8 },
    ...projects.map((project) => ({
      url: `${baseUrl}/projetos/${project.slug}`,
      priority: 0.7,
    })),
  ];
}
