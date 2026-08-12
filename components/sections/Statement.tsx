import { Reveal } from "@/components/ui/Reveal";

export function Statement() {
  return (
    <section className="px-5 py-28 md:px-10 md:py-52">
      <Reveal className="mx-auto max-w-[1400px]">
        <p className="max-w-6xl font-display text-[clamp(2.7rem,7vw,7rem)] leading-[0.96] tracking-[-0.045em]">
          Não produzimos apenas conteúdo.{" "}
          <span className="text-white/25">Criamos percepção.</span>
        </p>
      </Reveal>
    </section>
  );
}
