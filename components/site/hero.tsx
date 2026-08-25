"use client";

import { motion, useReducedMotion } from "framer-motion";
import { ArrowDown, ArrowUpRight, Play } from "lucide-react";
import { Brand } from "@/components/brand";
import type { SiteSettings } from "@/lib/types";

export function Hero({ settings }: { settings: SiteSettings }) {
  const reduceMotion = useReducedMotion();
  const showreelHref = settings.showreel_url || settings.hero_video_url || "#portfolio";

  return (
    <section id="inicio" className="grain relative min-h-[100svh] overflow-hidden bg-[#03060d]">
      <div className="absolute inset-0">
        {settings.hero_video_url ? (
          <video autoPlay={!reduceMotion} muted loop playsInline preload="metadata" poster={settings.hero_poster_url ?? undefined} className="h-full w-full object-cover">
            <source src={settings.hero_video_url} />
          </video>
        ) : (
          <div className="media-placeholder h-full w-full">
            <div className="absolute left-[58%] top-[20%] h-[46vw] min-h-80 w-[46vw] min-w-80 rounded-full border border-[#35a8ff]/25 shadow-[0_0_180px_rgba(11,102,255,.28)]" />
            <div className="absolute right-[8%] top-[22%] h-[44%] w-[1px] bg-gradient-to-b from-transparent via-white/25 to-transparent" />
            <div className="absolute right-[12%] top-[16%] text-right text-[0.58rem] font-bold uppercase tracking-[0.28em] text-white/35">Showreel<br />a carregar pelo painel</div>
          </div>
        )}
        <div className="absolute inset-0 bg-[linear-gradient(90deg,rgba(3,6,13,.94)_0%,rgba(3,6,13,.66)_50%,rgba(3,6,13,.28)_100%)]" />
        <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(3,6,13,.54)_0%,transparent_40%,rgba(3,6,13,.9)_100%)]" />
      </div>

      <div className="shell relative z-10 flex min-h-[100svh] flex-col justify-end pb-20 pt-36 sm:pb-24">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.75 }} className="mb-9"><Brand logoUrl={settings.logo_url} compact /></motion.div>
        <div className="max-w-[77rem]">
          <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.15 }} className="mb-6 text-[0.67rem] font-bold uppercase tracking-[0.25em] text-[#7cc8ff]">Produtora audiovisual · São Paulo</motion.p>
          <motion.h1 initial={{ opacity: 0, y: 35 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.85, delay: 0.1 }} className="display text-[clamp(3.5rem,10.6vw,10.2rem)] font-black uppercase leading-[0.78] text-white">
            {settings.hero_title}
          </motion.h1>
          <div className="mt-8 grid max-w-5xl gap-6 border-t border-white/18 pt-7 md:grid-cols-[1.1fr_.9fr] md:items-end">
            <motion.div initial={{ opacity: 0, y: 15 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.35 }}>
              <p className="text-[0.72rem] font-black uppercase tracking-[0.14em] text-white">{settings.hero_support}</p>
              <p className="mt-3 max-w-xl text-sm leading-6 text-white/58 sm:text-base">{settings.hero_description}</p>
            </motion.div>
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.5 }} className="flex flex-wrap gap-3 md:justify-end">
              <a href={showreelHref} className="button-ghost"><Play className="h-4 w-4 fill-current" /> Assistir showreel</a>
              <a href="#portfolio" className="button-ghost">Conhecer projetos</a>
              <a href="#contato" className="button-primary">Solicitar orçamento <ArrowUpRight className="h-4 w-4" /></a>
            </motion.div>
          </div>
        </div>
        <a href="#portfolio" className="absolute bottom-5 right-4 hidden items-center gap-3 text-[0.62rem] font-bold uppercase tracking-[0.18em] text-white/42 sm:flex" aria-label="Continuar rolando">
          Continue <span className="grid h-9 w-9 place-items-center rounded-full border border-white/15"><ArrowDown className="h-4 w-4" /></span>
        </a>
      </div>
    </section>
  );
}
