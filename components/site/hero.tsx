"use client";

import Image from "next/image";
import { motion, useReducedMotion } from "framer-motion";
import { ArrowDown, ArrowUpRight, Play, Sparkles } from "lucide-react";
import type { SiteSettings } from "@/lib/types";

export function Hero({ settings }: { settings: SiteSettings }) {
  const reduceMotion = useReducedMotion();
  const showreelHref = settings.showreel_url || settings.hero_video_url || "#portfolio";
  const headline = settings.hero_title.match(/[^.]+\.?/g)?.map((line) => line.trim()).filter(Boolean) ?? [settings.hero_title];

  return (
    <section id="inicio" className="grain relative min-h-[100svh] overflow-hidden bg-[#02050b]">
      <div className="absolute inset-0">
        {settings.hero_video_url ? (
          <video autoPlay={!reduceMotion} muted loop playsInline preload="metadata" poster={settings.hero_poster_url ?? undefined} className="h-full w-full object-cover">
            <source src={settings.hero_video_url} />
          </video>
        ) : (
          <div className="h-full w-full bg-[radial-gradient(circle_at_78%_38%,rgba(21,93,215,.32),transparent_30%),linear-gradient(120deg,#02050b_5%,#071225_58%,#03060d_100%)]">
            <div className="hero-grid absolute inset-0" />
            <motion.div initial={{ opacity: 0, scale: 0.88, rotate: -3 }} animate={{ opacity: 0.2, scale: 1, rotate: 0 }} transition={{ duration: 1.4, ease: [0.22, 1, 0.36, 1] }} className="absolute -right-[9vw] top-[17%] h-[58vh] w-[70vw] max-w-[62rem]">
              <Image src="/brand/aa-mark.png" alt="" fill sizes="70vw" className="object-contain object-right" priority />
            </motion.div>
            <div className="absolute right-[6%] top-[22%] h-[46%] w-px bg-gradient-to-b from-transparent via-[#549cff]/45 to-transparent" />
          </div>
        )}
        <div className="absolute inset-0 bg-[linear-gradient(90deg,rgba(2,5,11,.97)_0%,rgba(2,5,11,.72)_48%,rgba(2,5,11,.24)_100%)]" />
        <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(2,5,11,.58)_0%,transparent_38%,rgba(2,5,11,.94)_100%)]" />
      </div>

      <div className="shell relative z-10 flex min-h-[100svh] flex-col justify-end pb-16 pt-36 sm:pb-20">
        <div className="max-w-[86rem]">
          <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.08 }} className="mb-7 flex items-center gap-3 text-[0.62rem] font-extrabold uppercase tracking-[0.24em] text-[#83b7ff]">
            <span className="grid h-8 w-8 place-items-center rounded-full border border-[#4596ff]/35 bg-[#155dd7]/10"><Sparkles className="h-3.5 w-3.5" /></span>
            Produtora audiovisual · São Paulo
          </motion.div>
          <motion.h1 initial={{ opacity: 0, y: 35 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.9, delay: 0.1, ease: [0.22, 1, 0.36, 1] }} className="display max-w-[82rem] text-[clamp(3.2rem,9.4vw,8.8rem)] font-extrabold uppercase leading-[0.84] text-white">
            {headline.map((line, index) => (
              <span key={`${line}-${index}`} className={`block ${index % 2 ? "text-outline ml-[clamp(0rem,6vw,7rem)]" : ""}`}>{line}</span>
            ))}
          </motion.h1>
          <div className="mt-8 grid gap-7 border-t border-white/14 pt-7 md:grid-cols-[.9fr_1.1fr] md:items-end">
            <motion.div initial={{ opacity: 0, y: 15 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.35 }}>
              <p className="max-w-lg text-sm leading-7 text-white/62 sm:text-base">{settings.hero_description}</p>
            </motion.div>
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.5 }} className="flex flex-wrap gap-3 md:justify-end">
              <a href={showreelHref} className="button-ghost"><Play className="h-4 w-4 fill-current" /> Assistir showreel</a>
              <a href="#contato" className="button-primary">Solicitar orçamento <ArrowUpRight className="h-4 w-4" /></a>
            </motion.div>
          </div>
        </div>
        <div className="mt-9 flex items-center justify-between border-t border-white/8 pt-4 text-[0.56rem] font-bold uppercase tracking-[0.19em] text-white/32">
          <span>{settings.hero_support}</span>
          <span className="hidden sm:block">Filme · Fotografia · Drone &amp; FPV</span>
        </div>
        <a href="#portfolio" className="absolute bottom-4 right-4 hidden items-center gap-3 text-[0.58rem] font-bold uppercase tracking-[0.18em] text-white/42 xl:flex" aria-label="Continuar rolando">
          Continue <span className="grid h-9 w-9 place-items-center rounded-full border border-white/15"><ArrowDown className="h-4 w-4" /></span>
        </a>
      </div>
    </section>
  );
}
