"use client";

import { Mail, Phone } from "lucide-react";
import { useState } from "react";
import { getSupabaseBrowserClient } from "@/lib/supabase/client";
import type { Lead } from "@/lib/types";

const statuses = ["novo", "em_contato", "convertido", "arquivado"] as const;

export function LeadsTable({ initialLeads }: { initialLeads: Lead[] }) {
  const [leads, setLeads] = useState(initialLeads);
  async function updateStatus(id: string, status: Lead["status"]) {
    const { error } = await getSupabaseBrowserClient()!.from("leads").update({ status }).eq("id", id);
    if (!error) setLeads((items) => items.map((item) => item.id === id ? { ...item, status } : item));
  }
  return (
    <div><p className="text-xs font-black uppercase tracking-[0.16em] text-[#0b66ff]">Leads</p><h1 className="display mt-3 text-5xl font-black uppercase">Contatos</h1><p className="mt-3 text-sm text-[#657286]">Briefings enviados pelo formulário do site.</p><div className="mt-8 space-y-4">{leads.map((lead) => <article key={lead.id} className="rounded-2xl bg-white p-5 sm:p-7"><div className="flex flex-col justify-between gap-5 md:flex-row"><div><div className="flex flex-wrap items-center gap-3"><h2 className="text-lg font-bold">{lead.name}</h2><span className="rounded-full bg-[#0b66ff]/10 px-3 py-1 text-[0.58rem] font-black uppercase tracking-[0.12em] text-[#0b66ff]">{lead.project_type}</span></div><p className="mt-2 text-sm text-[#657286]">{lead.company || "Sem empresa"} · {lead.city} · {new Date(lead.created_at).toLocaleString("pt-BR")}</p></div><select className="field max-w-48" value={lead.status} onChange={(event) => updateStatus(lead.id, event.target.value as Lead["status"])}>{statuses.map((status) => <option key={status} value={status}>{status.replace("_", " ")}</option>)}</select></div><div className="mt-6 grid gap-5 border-t border-[#07152f]/8 pt-5 lg:grid-cols-[1fr_auto]"><div><p className="whitespace-pre-line text-sm leading-6 text-[#445165]">{lead.description}</p><p className="mt-4 text-xs text-[#7c8798]">Orçamento: {lead.budget}{lead.expected_date ? ` · Data: ${lead.expected_date}` : ""}{lead.reference_url ? ` · Referência: ${lead.reference_url}` : ""}</p></div><div className="flex gap-2"><a href={`mailto:${lead.email}`} className="grid h-11 w-11 place-items-center rounded-full bg-[#eef1f5]" aria-label="Enviar e-mail"><Mail className="h-4 w-4" /></a><a href={`tel:${lead.phone}`} className="grid h-11 w-11 place-items-center rounded-full bg-[#07152f] text-white" aria-label="Ligar"><Phone className="h-4 w-4" /></a></div></div></article>)}{leads.length === 0 && <div className="rounded-2xl bg-white p-12 text-center text-sm text-[#748196]">Nenhum contato recebido.</div>}</div></div>
  );
}
