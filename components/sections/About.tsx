import Image from "next/image";

import { Reveal } from "@/components/ui/Reveal";
import { SectionTitle } from "@/components/ui/SectionTitle";

export function About() {
  return (
    <section id="sobre" className="px-5 py-28 md:px-10 md:py-40">
      <div className="mx-auto grid max-w-[1600px] gap-12 lg:grid-cols-2 lg:items-center">
        <div>
          <SectionTitle eyebrow="Manifesto / 03" title="Somos a AA." />
          <Reveal delay={0.08}>
            <p className="mt-8 max-w-xl font-display text-2xl leading-snug text-white/80 md:text-3xl">
              Criatividade na ideia. Precisão na execução. Cinema na entrega.
            </p>
            <p className="mt-6 max-w-lg leading-relaxed text-white/50">
              Transformamos ideias, marcas e experiências em imagens capazes de
              gerar percepção e conexão.
            </p>
          </Reveal>
        </div>
        <Reveal delay={0.1}>
          <div className="relative aspect-[4/3] overflow-hidden">
            <Image
              src="/images/team-placeholder.svg"
              alt="Espaço reservado para foto da equipe AA"
              fill
              sizes="(max-width: 1024px) 100vw, 50vw"
              className="object-cover"
            />
          </div>
        </Reveal>
      </div>
    </section>
  );
}
