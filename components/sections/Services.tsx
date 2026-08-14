import { Reveal } from "@/components/ui/Reveal";
import { SectionTitle } from "@/components/ui/SectionTitle";
import { services } from "@/data/services";

export function Services() {
  return (
    <section
      id="servicos"
      className="border-y border-white/10 px-5 py-28 md:px-10 md:py-40"
    >
      <div className="mx-auto max-w-[1600px]">
        <SectionTitle eyebrow="Expertise / 02" title="O que fazemos" />
        <div className="mt-16">
          {services.map((service, index) => {
            const Icon = service.icon;

            return (
              <Reveal key={service.title} delay={index * 0.04}>
                <article className="group grid gap-4 border-t border-white/10 py-7 transition-colors hover:border-electric md:grid-cols-[80px_1fr_1fr] md:items-center">
                  <span className="font-display text-sm text-white/30">
                    {String(index + 1).padStart(2, "0")}
                  </span>
                  <h3 className="font-display text-2xl transition-transform group-hover:translate-x-2 md:text-4xl">
                    {service.title}
                  </h3>
                  <div className="flex items-center justify-between gap-4">
                    <p className="max-w-md text-sm leading-relaxed text-white/50">
                      {service.description}
                    </p>
                    <Icon
                      className="shrink-0 text-electric opacity-50"
                      size={22}
                      aria-hidden="true"
                    />
                  </div>
                </article>
              </Reveal>
            );
          })}
        </div>
      </div>
    </section>
  );
}
