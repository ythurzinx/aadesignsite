"use client";

import { FormEvent, useMemo, useState } from "react";
import { ArrowUpRight, Check, Instagram, Loader2, Mail, MessageCircle, Send } from "lucide-react";
import type { SiteSettings } from "@/lib/types";

const projectTypes = [
  "Produção audiovisual",
  "Vídeo institucional",
  "Social Content / Reels",
  "Fotografia",
  "Drone / FPV",
  "Cobertura de evento",
  "Documentário",
  "Pós-produção",
  "Outro"
];

function whatsappUrl(number: string | null, projectType = "") {
  if (!number) return "#contato";
  const clean = number.replace(/\D/g, "");
  const message = `Olá! Gostaria de solicitar um orçamento com a AA Design & Media${projectType ? ` para ${projectType}` : ""}.`;
  return `https://wa.me/${clean}?text=${encodeURIComponent(message)}`;
}

export function Contact({ settings }: { settings: SiteSettings }) {
  const [status, setStatus] = useState<"idle" | "sending" | "success" | "error">("idle");
  const [error, setError] = useState("");
  const [projectType, setProjectType] = useState("");
  const whatsHref = useMemo(() => whatsappUrl(settings.whatsapp, projectType), [settings.whatsapp, projectType]);

  async function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setStatus("sending");
    setError("");
    const form = event.currentTarget;
    const payload = Object.fromEntries(new FormData(form).entries());

    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload)
      });
      const data = (await response.json()) as { error?: string };
      if (!response.ok) throw new Error(data.error || "Não foi possível enviar agora.");
      setStatus("success");
      form.reset();
      setProjectType("");
    } catch (cause) {
      setStatus("error");
      setError(cause instanceof Error ? cause.message : "Não foi possível enviar agora.");
    }
  }

  return (
    <>
      <section className="grain relative overflow-hidden bg-[#07152f] py-24 sm:py-32">
        <div className="absolute -right-28 top-1/2 h-[32rem] w-[32rem] -translate-y-1/2 rounded-full border border-[#35a8ff]/20 shadow-[0_0_160px_rgba(11,102,255,.22)]" />
        <div className="shell relative z-10 text-center">
          <p className="text-[0.65rem] font-bold uppercase tracking-[0.22em] text-[#62b8ff]">Pronto para tirar a ideia do papel?</p>
          <h2 className="display mx-auto mt-7 max-w-6xl text-[clamp(3.5rem,9.5vw,9rem)] font-black uppercase leading-[0.8]">Seu próximo projeto merece ser extraordinário.</h2>
          <div className="mt-10 flex flex-wrap justify-center gap-3">
            <a href={whatsHref} target={settings.whatsapp ? "_blank" : undefined} rel="noreferrer" className="button-primary"><MessageCircle className="h-4 w-4" /> Falar no WhatsApp</a>
            <a href="#formulario" className="button-ghost">Preencher briefing <ArrowUpRight className="h-4 w-4" /></a>
            {settings.instagram && <a href={settings.instagram} target="_blank" rel="noreferrer" className="button-ghost"><Instagram className="h-4 w-4" /> Instagram</a>}
          </div>
        </div>
      </section>

      <section id="contato" className="section-pad bg-[#f4f5f7] text-[#07152f]">
        <div className="shell grid gap-12 lg:grid-cols-[.65fr_1.35fr] lg:gap-20">
          <div>
            <span className="eyebrow text-[#0b66ff]">Contato e orçamento</span>
            <h2 className="display mt-7 text-[clamp(3.5rem,7vw,6.2rem)] font-black uppercase leading-[0.82]">Conte o que você quer criar.</h2>
            <p className="mt-7 max-w-md text-base leading-7 text-[#5f6c7e]">Quanto mais contexto você enviar, mais precisa será nossa primeira conversa.</p>
            <div className="mt-10 space-y-4 text-sm">
              {settings.email && <a href={`mailto:${settings.email}`} className="flex items-center gap-3 font-bold"><span className="grid h-10 w-10 place-items-center rounded-full bg-white"><Mail className="h-4 w-4 text-[#0b66ff]" /></span>{settings.email}</a>}
              {settings.whatsapp && <a href={whatsHref} target="_blank" rel="noreferrer" className="flex items-center gap-3 font-bold"><span className="grid h-10 w-10 place-items-center rounded-full bg-white"><MessageCircle className="h-4 w-4 text-[#0b66ff]" /></span>WhatsApp da AA</a>}
            </div>
          </div>

          <form id="formulario" onSubmit={submit} className="rounded-[1.5rem] bg-white p-5 shadow-[0_30px_90px_-45px_rgba(7,21,47,.25)] sm:p-8" noValidate>
            <div className="grid gap-5 sm:grid-cols-2">
              <label className="text-xs font-bold uppercase tracking-[0.1em]">Nome *<input name="name" className="field mt-2 normal-case tracking-normal" required minLength={2} maxLength={100} autoComplete="name" /></label>
              <label className="text-xs font-bold uppercase tracking-[0.1em]">Empresa<input name="company" className="field mt-2 normal-case tracking-normal" maxLength={120} autoComplete="organization" /></label>
              <label className="text-xs font-bold uppercase tracking-[0.1em]">Telefone *<input name="phone" className="field mt-2 normal-case tracking-normal" required maxLength={30} autoComplete="tel" inputMode="tel" /></label>
              <label className="text-xs font-bold uppercase tracking-[0.1em]">E-mail *<input name="email" type="email" className="field mt-2 normal-case tracking-normal" required maxLength={160} autoComplete="email" /></label>
              <label className="text-xs font-bold uppercase tracking-[0.1em]">Tipo de projeto *<select name="projectType" className="field mt-2 normal-case tracking-normal" required value={projectType} onChange={(event) => setProjectType(event.target.value)}><option value="">Selecione</option>{projectTypes.map((item) => <option key={item}>{item}</option>)}</select></label>
              <label className="text-xs font-bold uppercase tracking-[0.1em]">Data prevista<input name="expectedDate" type="date" className="field mt-2 normal-case tracking-normal" /></label>
              <label className="text-xs font-bold uppercase tracking-[0.1em]">Cidade *<input name="city" className="field mt-2 normal-case tracking-normal" required maxLength={120} autoComplete="address-level2" /></label>
              <label className="text-xs font-bold uppercase tracking-[0.1em]">Orçamento estimado *<select name="budget" className="field mt-2 normal-case tracking-normal" required><option value="">Selecione</option><option>Até R$ 2.000</option><option>R$ 2.000 a R$ 5.000</option><option>R$ 5.000 a R$ 10.000</option><option>Acima de R$ 10.000</option><option>A definir</option></select></label>
              <label className="text-xs font-bold uppercase tracking-[0.1em] sm:col-span-2">Descrição do projeto *<textarea name="description" className="field mt-2 min-h-36 resize-y normal-case tracking-normal" required minLength={20} maxLength={3000} placeholder="Objetivo, quantidade de entregas, local, referências e prazo…" /></label>
              <label className="text-xs font-bold uppercase tracking-[0.1em] sm:col-span-2">Referência ou link<input name="referenceUrl" type="url" className="field mt-2 normal-case tracking-normal" maxLength={500} placeholder="https://" /></label>
              <label className="sr-only" aria-hidden="true">Não preencha este campo<input name="website" tabIndex={-1} autoComplete="off" /></label>
            </div>
            <label className="mt-6 flex items-start gap-3 text-sm leading-5 text-[#5f6c7e]"><input name="consent" type="checkbox" value="true" className="mt-1 h-4 w-4 accent-[#0b66ff]" required />Autorizo o contato da AA Design & Media sobre esta solicitação. *</label>
            <div className="mt-7 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
              <button disabled={status === "sending"} className="button-light disabled:cursor-not-allowed disabled:opacity-60" type="submit">{status === "sending" ? <Loader2 className="h-4 w-4 animate-spin" /> : status === "success" ? <Check className="h-4 w-4" /> : <Send className="h-4 w-4" />}{status === "sending" ? "Enviando" : status === "success" ? "Enviado" : "Enviar briefing"}</button>
              <p aria-live="polite" className={`text-sm ${status === "error" ? "text-red-600" : "text-emerald-700"}`}>{status === "success" ? "Recebemos seu briefing. Vamos retornar pelo contato informado." : error}</p>
            </div>
          </form>
        </div>
      </section>

      {settings.whatsapp && (
        <a href={whatsHref} target="_blank" rel="noreferrer" className="fixed bottom-5 right-5 z-40 grid h-14 w-14 place-items-center rounded-full bg-[#0b66ff] text-white shadow-[0_14px_40px_rgba(11,102,255,.4)] transition-transform hover:scale-105" aria-label="Falar com a AA pelo WhatsApp"><MessageCircle className="h-6 w-6" /></a>
      )}
    </>
  );
}
