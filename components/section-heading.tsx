import type { ReactNode } from "react";

export function SectionHeading({
  eyebrow,
  title,
  copy,
  light = false,
  aside
}: {
  eyebrow: string;
  title: string;
  copy?: string;
  light?: boolean;
  aside?: ReactNode;
}) {
  return (
    <div className="flex flex-col justify-between gap-8 lg:flex-row lg:items-end">
      <div className="max-w-3xl">
        <span className={`eyebrow ${light ? "text-white" : "text-[#0b66ff]"}`}>{eyebrow}</span>
        <h2 className={`display mt-7 text-[clamp(2.7rem,7vw,6.8rem)] font-black uppercase leading-[0.85] ${light ? "text-white" : "text-[#07152f]"}`}>
          {title}
        </h2>
        {copy && <p className={`mt-7 max-w-2xl text-base leading-7 ${light ? "text-white/58" : "text-[#526074]"}`}>{copy}</p>}
      </div>
      {aside}
    </div>
  );
}
