import { Button } from "@/components/ui/Button";
import { Reveal } from "@/components/ui/Reveal";

export function MainCTA() {
  return (
    <section className="relative overflow-hidden border-t border-white/10 px-5 py-32 md:px-10 md:py-48">
      <div className="absolute -right-40 top-0 size-[520px] rounded-full bg-electric/10 blur-[120px]" />
      <Reveal className="relative mx-auto max-w-[1600px]">
        <h2 className="max-w-6xl font-display text-[clamp(3rem,8vw,8rem)] leading-[0.9] tracking-[-0.055em]">
          Sua próxima ideia merece sair do papel.
        </h2>
        <div className="mt-10 flex flex-col items-start justify-between gap-8 md:flex-row md:items-center">
          <p className="text-white/50">
            Conte para a gente o que você quer criar.
          </p>
          <Button href="/contato">COMEÇAR UM PROJETO</Button>
        </div>
      </Reveal>
    </section>
  );
}
