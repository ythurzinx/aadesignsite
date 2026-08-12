import type { MetadataRoute } from "next";import { projects } from "@/data/projects";
export default function sitemap():MetadataRoute.Sitemap{const base="https://aadesignmidia.com.br";return [{url:base,priority:1},{url:`${base}/contato`,priority:.8},...projects.map(p=>({url:`${base}/projetos/${p.slug}`,priority:.7}))]}
