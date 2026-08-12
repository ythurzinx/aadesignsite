"use client";

import { AnimatePresence, motion } from "framer-motion";
import { useState } from "react";

import { ProjectCard } from "@/components/ui/ProjectCard";
import { Reveal } from "@/components/ui/Reveal";
import { projectCategories, projects } from "@/data/projects";

export function Portfolio() {
  const [activeCategory, setActiveCategory] =
    useState<(typeof projectCategories)[number]>("Todos");

  const visibleProjects =
    activeCategory === "Todos"
      ? projects
      : projects.filter((project) => project.category === activeCategory);

  return (
    <section id="trabalhos" className="px-5 py-28 md:px-10 md:py-40">
      <div className="mx-auto max-w-[1600px]">
        <Reveal>
          <p className="eyebrow">Portfólio / 01</p>
          <div className="mt-5 flex flex-col justify-between gap-5 md:flex-row md:items-end">
            <div>
              <h2 className="section-title">
                Trabalhos
                <br />
                selecionados
              </h2>
              <p className="mt-5 text-white/50">
                Algumas histórias que passaram pelas nossas lentes.
              </p>
            </div>
            <span className="text-xs text-white/35">
              CONTEÚDO DEMONSTRATIVO
            </span>
          </div>
        </Reveal>

        <div
          className="scrollbar-none mt-12 flex gap-2 overflow-x-auto pb-3"
          role="group"
          aria-label="Filtrar projetos por categoria"
        >
          {projectCategories.map((category) => {
            const isActive = activeCategory === category;

            return (
              <button
                type="button"
                onClick={() => setActiveCategory(category)}
                aria-pressed={isActive}
                className={`shrink-0 rounded-full border px-4 py-2 text-xs transition-colors ${
                  isActive
                    ? "border-electric bg-electric text-white"
                    : "border-white/15 text-white/55 hover:border-white/40"
                }`}
                key={category}
              >
                {category}
              </button>
            );
          })}
        </div>

        <motion.div
          layout
          className="mt-10 grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-12"
        >
          <AnimatePresence mode="popLayout">
            {visibleProjects.map((project) => (
              <ProjectCard key={project.slug} project={project} />
            ))}
          </AnimatePresence>
        </motion.div>
      </div>
    </section>
  );
}
