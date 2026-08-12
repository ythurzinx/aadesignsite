import Image from "next/image";
import Link from "next/link";

import { contact, instagramUrl, whatsappUrl } from "@/data/contact";

const footerLinks = [
  { label: "Trabalhos", href: "/#trabalhos" },
  { label: "Serviços", href: "/#servicos" },
  { label: "Sobre", href: "/#sobre" },
  { label: "Contato", href: "/contato" },
];

export function Footer() {
  return (
    <footer className="border-t border-white/10 px-5 py-12 md:px-10">
      <div className="mx-auto grid max-w-[1600px] gap-10 md:grid-cols-3">
        <div>
          <Image src="/logos/aa-mark.svg" alt="" width={56} height={36} />
          <p className="mt-4 text-sm text-white/50">AA Design & Mídia</p>
        </div>
        <nav className="grid grid-cols-2 gap-3 text-sm" aria-label="Rodapé">
          {footerLinks.map((item) => (
            <Link key={item.href} href={item.href}>
              {item.label}
            </Link>
          ))}
        </nav>
        <div className="flex flex-col gap-3 text-sm text-white/60">
          <a href={instagramUrl}>
            {contact.instagram
              ? `@${contact.instagram}`
              : "Instagram — configurar"}
          </a>
          <a href={whatsappUrl}>
            WhatsApp — {contact.whatsapp ? "conversar" : "configurar"}
          </a>
          <a href={contact.email ? `mailto:${contact.email}` : "/contato"}>
            {contact.email || "E-mail — configurar"}
          </a>
        </div>
      </div>
      <div className="mx-auto mt-12 flex max-w-[1600px] flex-col justify-between gap-2 border-t border-white/10 pt-6 text-xs text-white/40 sm:flex-row">
        <span>© {new Date().getFullYear()} AA Design & Mídia.</span>
        <span>Imagem. Ritmo. Percepção.</span>
      </div>
    </footer>
  );
}
