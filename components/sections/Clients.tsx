import { clients } from "@/data/clients";
import { Reveal } from "@/components/ui/Reveal";

export function Clients() {
  const marqueeClients = [...clients, ...clients];

  return (
    <section className="overflow-hidden py-24" aria-labelledby="clients-title">
      <Reveal className="px-5 md:px-10">
        <h2
          id="clients-title"
          className="mx-auto max-w-[1600px] font-display text-4xl tracking-tight md:text-6xl"
        >
          Marcas que já passaram
          <br />
          pelas nossas lentes
        </h2>
      </Reveal>
      <div className="marquee mt-16 flex w-max gap-4" aria-hidden="true">
        {marqueeClients.map((client, index) => (
          <div
            key={`${client.id}-${index}`}
            className="grid h-28 w-64 place-items-center border border-white/10 text-[10px] tracking-[0.18em] text-white/35 transition-colors hover:border-electric hover:text-white"
          >
            {client.name}
          </div>
        ))}
      </div>
    </section>
  );
}
