"use client";

import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { ArrowUpRight, Menu, X } from "lucide-react";
import { Brand } from "@/components/brand";

const links = [
  ["inicio", "Início"],
  ["portfolio", "Portfólio"],
  ["servicos", "Serviços"],
  ["sobre", "Sobre"],
  ["bastidores", "Bastidores"],
  ["clientes", "Clientes"],
  ["contato", "Contato"]
] as const;

export function Header({ logoUrl }: { logoUrl?: string | null }) {
  const [scrolled, setScrolled] = useState(false);
  const [active, setActive] = useState("inicio");
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });

    const observer = new IntersectionObserver(
      (entries) => entries.forEach((entry) => entry.isIntersecting && setActive(entry.target.id)),
      { rootMargin: "-38% 0px -55%" }
    );
    links.forEach(([id]) => {
      const element = document.getElementById(id);
      if (element) observer.observe(element);
    });
    return () => {
      window.removeEventListener("scroll", onScroll);
      observer.disconnect();
    };
  }, []);

  return (
    <header className={`fixed inset-x-0 top-0 z-50 transition-all duration-500 ${scrolled ? "border-b border-white/10 bg-[#03060d]/88 py-3 backdrop-blur-xl" : "py-5"}`}>
      <div className="shell flex items-center justify-between gap-6">
        <a href="#inicio" aria-label="Voltar ao início"><Brand logoUrl={logoUrl} /></a>
        <nav className="hidden items-center gap-6 xl:flex" aria-label="Navegação principal">
          {links.map(([id, label]) => (
            <a key={id} href={`#${id}`} className={`relative py-2 text-[0.68rem] font-bold uppercase tracking-[0.14em] transition-colors ${active === id ? "text-white" : "text-white/48 hover:text-white"}`}>
              {label}
              {active === id && <motion.span layoutId="active-section" className="absolute inset-x-0 -bottom-0.5 h-px bg-[#35a8ff]" />}
            </a>
          ))}
        </nav>
        <div className="flex items-center gap-2">
          <a href="#contato" className="button-primary hidden sm:inline-flex">Solicitar orçamento <ArrowUpRight className="h-4 w-4" /></a>
          <button onClick={() => setOpen((value) => !value)} className="grid h-11 w-11 place-items-center rounded-full border border-white/15 bg-white/[0.04] xl:hidden" aria-expanded={open} aria-label={open ? "Fechar menu" : "Abrir menu"}>
            {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>
      </div>
      <AnimatePresence>
        {open && (
          <motion.div initial={{ opacity: 0, y: -12 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -12 }} className="mx-4 mt-3 rounded-2xl border border-white/10 bg-[#071126]/98 p-4 shadow-2xl xl:hidden">
            {links.map(([id, label], index) => (
              <motion.a key={id} href={`#${id}`} onClick={() => setOpen(false)} initial={{ opacity: 0, x: -10 }} animate={{ opacity: 1, x: 0, transition: { delay: index * 0.035 } }} className="flex items-center justify-between border-b border-white/8 py-3 text-sm font-bold uppercase tracking-[0.12em] text-white/80 last:border-0">
                {label}<span className="text-[#35a8ff]">0{index + 1}</span>
              </motion.a>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
