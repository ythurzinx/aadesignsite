"use client";

import { motion, useReducedMotion } from "framer-motion";
import { ArrowUpRight } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

import type { Project } from "@/data/projects";

const columnClasses: Record<Project["orientation"], string> = {
  wide: "lg:col-span-8",
  vertical: "lg:col-span-4",
  square: "lg:col-span-6",
};

interface ProjectCardProps {
  project: Project;
}

export function ProjectCard({ project }: ProjectCardProps) {
  const shouldReduceMotion = useReducedMotion();
  const isVertical = project.orientation === "vertical";
  const actionClasses = [
    "grid size-11 translate-y-2 place-items-center rounded-full",
    "bg-white text-black opacity-0 transition-all",
    "group-hover:translate-y-0 group-hover:opacity-100",
    "group-focus-visible:translate-y-0 group-focus-visible:opacity-100",
  ].join(" ");

  return (
    <motion.article
      layout
      initial={shouldReduceMotion ? false : { opacity: 0, scale: 0.98 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.98 }}
      transition={{ duration: shouldReduceMotion ? 0 : 0.35 }}
      className={columnClasses[project.orientation]}
    >
      <Link
        href={`/projetos/${project.slug}`}
        className={`group relative block overflow-hidden bg-white/5 ${
          isVertical ? "aspect-[3/4]" : "aspect-[16/10]"
        }`}
        aria-label={`Ver projeto ${project.title}`}
      >
        <Image
          src={project.thumbnail}
          alt={`Capa de ${project.title}`}
          fill
          sizes="(max-width: 768px) 100vw, (max-width: 1280px) 50vw, 66vw"
          className="object-cover transition-transform duration-700 group-hover:scale-[1.025]"
        />
        <div
          className={
            "absolute inset-0 bg-gradient-to-t from-black/90 via-black/0 " +
            "to-transparent opacity-80 transition-opacity group-hover:opacity-100"
          }
        />
        <div className="absolute inset-x-0 bottom-0 flex items-end justify-between p-6 md:p-8">
          <div>
            <p className="text-[10px] uppercase tracking-[0.22em] text-white/50">
              {project.client} · {project.year}
            </p>
            <h3 className="mt-2 font-display text-2xl md:text-3xl">
              {project.title}
            </h3>
            <p className="mt-1 text-xs text-white/55">{project.category}</p>
          </div>
          <span className={actionClasses}>
            <ArrowUpRight size={18} aria-hidden="true" />
          </span>
        </div>
      </Link>
    </motion.article>
  );
}
