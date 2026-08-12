"use client";

import { AnimatePresence, motion } from "framer-motion";
import { Menu, X } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";

const navigation = [
  { label: "Trabalhos", href: "/#trabalhos" },
  { label: "Serviços", href: "/#servicos" },
  { label: "Sobre", href: "/#sobre" },
  { label: "Contato", href: "/contato" },
];

export function Header() {
  const [hasScrolled, setHasScrolled] = useState(false);
  const [menuIsOpen, setMenuIsOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => setHasScrolled(window.scrollY > 24);
    handleScroll();
    window.addEventListener("scroll", handleScroll, { passive: true });

    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = menuIsOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [menuIsOpen]);

  const headerSurface =
    hasScrolled || menuIsOpen
      ? "border-b border-white/10 bg-ink/85 backdrop-blur-xl"
      : "bg-transparent";

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 transition-all duration-500 ${headerSurface}`}
    >
      <div className="mx-auto flex h-20 max-w-[1600px] items-center justify-between px-5 md:px-10">
        <Link
          href="/"
          aria-label="AA Design & Mídia — início"
          className="flex items-center gap-3"
        >
          <Image
            src="/logos/aa-mark.svg"
            alt=""
            width={48}
            height={30}
            priority
          />
          <span className="hidden text-xs font-semibold uppercase tracking-[0.22em] sm:block">
            Design & Mídia
          </span>
        </Link>

        <nav
          className="hidden items-center gap-8 lg:flex"
          aria-label="Navegação principal"
        >
          {navigation.map((item) => (
            <Link
              className="text-sm text-white/70 transition-colors hover:text-white"
              key={item.href}
              href={item.href}
            >
              {item.label}
            </Link>
          ))}
          <Link
            className="rounded-full bg-white px-5 py-3 text-xs font-semibold uppercase tracking-wider text-black transition-colors hover:bg-electric hover:text-white"
            href="/contato"
          >
            Solicitar orçamento
          </Link>
        </nav>

        <button
          type="button"
          className="grid size-11 place-items-center rounded-full border border-white/15 lg:hidden"
          onClick={() => setMenuIsOpen((current) => !current)}
          aria-expanded={menuIsOpen}
          aria-controls="mobile-navigation"
          aria-label={menuIsOpen ? "Fechar menu" : "Abrir menu"}
        >
          {menuIsOpen ? <X aria-hidden="true" /> : <Menu aria-hidden="true" />}
        </button>
      </div>

      <AnimatePresence>
        {menuIsOpen ? (
          <motion.nav
            id="mobile-navigation"
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "calc(100svh - 5rem)", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            className="overflow-hidden bg-ink lg:hidden"
            aria-label="Navegação mobile"
          >
            <div className="flex flex-col px-5 pb-8 pt-3">
              {navigation.map((item, index) => (
                <motion.div
                  key={item.href}
                  initial={{ x: -16, opacity: 0 }}
                  animate={{ x: 0, opacity: 1 }}
                  transition={{ delay: index * 0.05 }}
                >
                  <Link
                    onClick={() => setMenuIsOpen(false)}
                    className="block border-b border-white/10 py-4 font-display text-2xl"
                    href={item.href}
                  >
                    {item.label}
                  </Link>
                </motion.div>
              ))}
            </div>
          </motion.nav>
        ) : null}
      </AnimatePresence>
    </header>
  );
}
