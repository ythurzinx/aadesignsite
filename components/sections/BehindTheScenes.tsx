import Image from "next/image";

import { projects } from "@/data/projects";
import { SectionTitle } from "@/components/ui/SectionTitle";

export function BehindTheScenes() {
  return (
    <section className="px-5 pb-32 md:px-10" aria-labelledby="bts-title">
      <div className="mx-auto max-w-[1600px]">
        <div id="bts-title">
          <SectionTitle
            eyebrow="Processo / 04"
            title={
              <>
                Por trás
                <br />
                das câmeras
              </>
            }
          />
        </div>
        <div className="scrollbar-none mt-12 flex snap-x gap-4 overflow-x-auto pb-5">
          {projects.map((project, index) => (
            <figure
              className="relative aspect-[4/5] min-w-[78vw] snap-start overflow-hidden bg-white/5 md:min-w-[38vw] lg:min-w-[26vw]"
              key={project.slug}
            >
              <Image
                src={project.gallery[0]}
                alt={`Bastidores provisórios do projeto ${project.title}`}
                fill
                sizes="(max-width: 768px) 78vw, (max-width: 1024px) 38vw, 26vw"
                className="object-cover opacity-70 transition-transform duration-700 hover:scale-[1.02]"
              />
              <figcaption className="absolute bottom-5 left-5 text-[10px] tracking-[0.2em] text-white/60">
                BASTIDORES — PLACEHOLDER {String(index + 1).padStart(2, "0")}
              </figcaption>
            </figure>
          ))}
        </div>
      </div>
    </section>
  );
}
