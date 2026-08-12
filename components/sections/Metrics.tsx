import { Reveal } from "@/components/ui/Reveal";

// TODO: substitua estes valores somente quando houver métricas reais aprovadas.
const metrics = [
  { value: "XX+", label: "Projetos" },
  { value: "XX", label: "Clientes" },
  { value: "XX", label: "Vídeos produzidos" },
];

export function Metrics() {
  return (
    <section className="px-5 py-24 md:px-10" aria-label="Métricas da produtora">
      <div className="mx-auto grid max-w-[1600px] gap-10 border-y border-white/10 py-16 md:grid-cols-3">
        {metrics.map((metric, index) => (
          <Reveal key={metric.label} delay={index * 0.06}>
            <p className="font-display text-6xl text-electric">
              {metric.value}
            </p>
            <p className="mt-2 text-sm text-white/50">
              {metric.label} · dado a preencher
            </p>
          </Reveal>
        ))}
      </div>
    </section>
  );
}
