"use client";

import { motion, useReducedMotion } from "framer-motion";
import { ArrowDown } from "lucide-react";
import { useState } from "react";

import { Button } from "@/components/ui/Button";

export function Hero() {
  const shouldReduceMotion = useReducedMotion();
  const [videoFailed, setVideoFailed] = useState(false);

  return (
    <section className="relative flex min-h-[100svh] items-end overflow-hidden bg-[#080a0e] px-5 pb-14 pt-28 md:px-10 md:pb-20">
      <div className="absolute inset-0 bg-[url('/images/showreel-cover.svg')] bg-cover bg-center" />
      {!videoFailed ? (
        <video
          className="absolute inset-0 size-full object-cover"
          autoPlay={!shouldReduceMotion}
          muted
          loop
          playsInline
          preload="metadata"
          poster="/images/showreel-cover.svg"
          onError={() => setVideoFailed(true)}
          aria-hidden="true"
        >
          <source src="/videos/showreel.mp4" type="video/mp4" />
        </video>
      ) : null}
      <div className="absolute inset-0 bg-gradient-to-b from-black/25 via-black/30 to-black/90" />
      <div className="noise absolute inset-0 opacity-30" />

      <motion.div
        initial={shouldReduceMotion ? false : { opacity: 0, y: 35 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: shouldReduceMotion ? 0 : 0.9, delay: 0.2 }}
        className="relative z-10 mx-auto w-full max-w-[1600px]"
      >
        <p className="mb-5 text-xs font-semibold tracking-[0.34em] text-white/65">
          AA DESIGN & MÍDIA
        </p>
        <h1 className="max-w-5xl font-display text-[clamp(3.5rem,9vw,9rem)] font-medium leading-[0.84] tracking-[-0.06em]">
          Histórias em
          <br />
          <span className="text-outline">movimento.</span>
        </h1>
        <div className="mt-8 flex flex-col items-start justify-between gap-8 md:flex-row md:items-end">
          <p className="max-w-md text-base leading-relaxed text-white/65 md:text-lg">
            Produção audiovisual para marcas que querem ser lembradas.
          </p>
          <div className="flex flex-wrap gap-3">
            <Button href="#trabalhos" showArrow={false}>
              Ver nosso trabalho
              <ArrowDown size={16} aria-hidden="true" />
            </Button>
            <Button href="/contato" variant="outline">
              Falar com a gente
            </Button>
          </div>
        </div>
      </motion.div>

      <div className="absolute right-5 top-1/2 hidden origin-center -rotate-90 items-center gap-3 text-[10px] tracking-[0.3em] text-white/45 lg:flex">
        SCROLL
        <span className="h-px w-12 bg-white/35" />
      </div>
    </section>
  );
}
