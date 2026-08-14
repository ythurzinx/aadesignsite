import { Reveal } from "@/components/ui/Reveal";

interface SectionTitleProps {
  eyebrow: string;
  title: React.ReactNode;
  description?: string;
}

export function SectionTitle({
  eyebrow,
  title,
  description,
}: SectionTitleProps) {
  return (
    <Reveal>
      <p className="eyebrow">{eyebrow}</p>
      <h2 className="section-title mt-5">{title}</h2>
      {description ? (
        <p className="mt-5 max-w-xl text-white/50">{description}</p>
      ) : null}
    </Reveal>
  );
}
