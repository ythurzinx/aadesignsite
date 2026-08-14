import { ArrowUpRight } from "lucide-react";
import Link from "next/link";
import type { ReactNode } from "react";

interface ButtonProps {
  href: string;
  children: ReactNode;
  variant?: "primary" | "outline";
  showArrow?: boolean;
}

export function Button({
  href,
  children,
  variant = "primary",
  showArrow = true,
}: ButtonProps) {
  const styles =
    variant === "primary"
      ? "bg-electric text-white hover:bg-white hover:text-black"
      : "border border-white/25 bg-black/10 text-white hover:border-white/60";

  return (
    <Link
      href={href}
      className={`group inline-flex items-center gap-3 rounded-full px-6 py-3.5 text-sm font-medium backdrop-blur transition-colors ${styles}`}
    >
      {children}
      {showArrow ? (
        <ArrowUpRight
          size={16}
          aria-hidden="true"
          className="transition-transform duration-300 group-hover:rotate-45"
        />
      ) : null}
    </Link>
  );
}
