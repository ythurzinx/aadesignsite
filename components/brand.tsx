import Image from "next/image";

export function Brand({ logoUrl, compact = false }: { logoUrl?: string | null; compact?: boolean }) {
  if (logoUrl) {
    return (
      <span className="relative block h-9 w-36">
        <Image src={logoUrl} alt="AA Design & Media" fill sizes="144px" className="object-contain object-left" priority />
      </span>
    );
  }

  return (
    <span className="inline-flex items-center gap-3" aria-label="AA Design & Media">
      <span className="relative grid h-9 w-9 place-items-center overflow-hidden rounded-[0.65rem] bg-[#0b66ff] text-[0.72rem] font-black tracking-[-0.12em] text-white">
        AA
        <span className="absolute -bottom-2 -right-2 h-5 w-5 rotate-45 border border-white/35" />
      </span>
      {!compact && (
        <span className="text-[0.72rem] font-black leading-[0.95] tracking-[0.16em] text-white">
          DESIGN<br />&amp; MEDIA
        </span>
      )}
    </span>
  );
}
