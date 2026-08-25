import { ArrowUp, Instagram, Mail } from "lucide-react";
import { Brand } from "@/components/brand";
import type { SiteSettings } from "@/lib/types";

export function Footer({ settings }: { settings: SiteSettings }) {
  return (
    <footer className="border-t border-white/10 bg-[#02050b] py-12 sm:py-16">
      <div className="shell grid gap-12 border-b border-white/8 pb-12 md:grid-cols-[1fr_auto] md:items-end">
        <div>
          <Brand logoUrl={settings.logo_url} />
          <p className="mt-6 max-w-md text-sm leading-6 text-white/42">{settings.footer_text}</p>
        </div>
        <div className="flex items-center gap-2">
          {settings.instagram && <a href={settings.instagram} target="_blank" rel="noreferrer" className="grid h-11 w-11 place-items-center rounded-full border border-white/12" aria-label="Instagram"><Instagram className="h-4 w-4" /></a>}
          {settings.email && <a href={`mailto:${settings.email}`} className="grid h-11 w-11 place-items-center rounded-full border border-white/12" aria-label="E-mail"><Mail className="h-4 w-4" /></a>}
          <a href="#inicio" className="grid h-11 w-11 place-items-center rounded-full bg-white text-[#07152f]" aria-label="Voltar ao topo"><ArrowUp className="h-4 w-4" /></a>
        </div>
      </div>
      <div className="shell mt-7 flex flex-col gap-3 text-[0.56rem] font-bold uppercase tracking-[0.17em] text-white/25 sm:flex-row sm:items-center sm:justify-between"><p>© {new Date().getFullYear()} AA Design & Media. Todos os direitos reservados.</p><p>São Paulo · Brasil</p></div>
    </footer>
  );
}
