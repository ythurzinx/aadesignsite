import { Reveal } from "@/components/ui/Reveal";
import { VideoPlayer } from "@/components/ui/VideoPlayer";

export function Showreel() {
  return (
    <section
      className="px-5 pb-28 md:px-10 md:pb-40"
      aria-labelledby="showreel-title"
    >
      <div className="mx-auto max-w-[1600px]">
        <Reveal>
          <div className="mb-7 flex items-end justify-between">
            <h2
              id="showreel-title"
              className="font-display text-[clamp(3rem,9vw,9rem)] leading-none tracking-[-0.06em]"
            >
              SHOWREEL
            </h2>
            <span className="mb-3 hidden text-xs text-white/40 md:block">
              FILME / RITMO / EMOÇÃO
            </span>
          </div>
          <VideoPlayer
            src="/videos/showreel.mp4"
            poster="/images/showreel-cover.svg"
            label="Reproduzir showreel"
            placeholderLabel="SUBSTITUA PELO SHOWREEL REAL"
          />
        </Reveal>
      </div>
    </section>
  );
}
