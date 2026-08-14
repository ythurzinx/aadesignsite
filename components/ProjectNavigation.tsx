import { ArrowLeft, ArrowRight } from "lucide-react";
import Link from "next/link";

import type { Project } from "@/data/projects";

interface ProjectNavigationProps {
  previous: Project;
  next: Project;
}

export function ProjectNavigation({ previous, next }: ProjectNavigationProps) {
  return (
    <nav
      className="grid border-y border-white/10 md:grid-cols-2"
      aria-label="Navegação entre projetos"
    >
      <Link
        href={`/projetos/${previous.slug}`}
        className="group border-b border-white/10 p-8 md:border-b-0 md:border-r md:p-14"
      >
        <span className="flex items-center gap-2 text-xs text-white/40">
          <ArrowLeft size={14} aria-hidden="true" />
          PROJETO ANTERIOR
        </span>
        <strong className="mt-3 block font-display text-2xl transition-colors group-hover:text-electric">
          {previous.title}
        </strong>
      </Link>
      <Link
        href={`/projetos/${next.slug}`}
        className="group p-8 text-right md:p-14"
      >
        <span className="flex items-center justify-end gap-2 text-xs text-white/40">
          PRÓXIMO PROJETO
          <ArrowRight size={14} aria-hidden="true" />
        </span>
        <strong className="mt-3 block font-display text-2xl transition-colors group-hover:text-electric">
          {next.title}
        </strong>
      </Link>
    </nav>
  );
}
