"use client";

import { ArrowUpRight } from "lucide-react";
import { useState } from "react";

type ContactFields = {
  name: string;
  company: string;
  whatsapp: string;
  email: string;
  type: string;
  message: string;
};

type ContactErrors = Partial<Record<keyof ContactFields, string>>;

const projectTypes = [
  "Vídeo",
  "Fotografia",
  "Social Media",
  "Drone / FPV",
  "Evento",
  "Outro",
];

const fieldStyles =
  "w-full border-b border-white/15 bg-transparent py-4 text-base outline-none transition-colors placeholder:text-white/25 focus:border-electric";

function validateContact(fields: ContactFields): ContactErrors {
  const errors: ContactErrors = {};

  if (!fields.name.trim()) errors.name = "Informe seu nome.";
  if (!/^\S+@\S+\.\S+$/.test(fields.email)) {
    errors.email = "Informe um e-mail válido.";
  }
  if (!fields.type) errors.type = "Selecione um tipo de projeto.";
  if (fields.message.trim().length < 10) {
    errors.message = "Conte um pouco mais sobre a ideia.";
  }

  return errors;
}

export function ContactForm() {
  const [errors, setErrors] = useState<ContactErrors>({});
  const [isValidated, setIsValidated] = useState(false);

  function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    const fields = Object.fromEntries(formData) as ContactFields;
    const validationErrors = validateContact(fields);

    setErrors(validationErrors);
    setIsValidated(Object.keys(validationErrors).length === 0);
  }

  return (
    <form
      noValidate
      onSubmit={handleSubmit}
      className="grid gap-x-8 md:grid-cols-2"
    >
      <label className="text-xs text-white/50">
        NOME *
        <input
          name="name"
          autoComplete="name"
          className={fieldStyles}
          placeholder="Como podemos chamar você?"
          aria-invalid={Boolean(errors.name)}
        />
        {errors.name ? <FieldError message={errors.name} /> : null}
      </label>
      <label className="text-xs text-white/50">
        EMPRESA
        <input
          name="company"
          autoComplete="organization"
          className={fieldStyles}
          placeholder="Nome da empresa"
        />
      </label>
      <label className="mt-7 text-xs text-white/50">
        WHATSAPP
        <input
          name="whatsapp"
          autoComplete="tel"
          className={fieldStyles}
          inputMode="tel"
          placeholder="Seu número com DDD"
        />
      </label>
      <label className="mt-7 text-xs text-white/50">
        E-MAIL *
        <input
          name="email"
          type="email"
          autoComplete="email"
          className={fieldStyles}
          placeholder="voce@empresa.com"
          aria-invalid={Boolean(errors.email)}
        />
        {errors.email ? <FieldError message={errors.email} /> : null}
      </label>
      <label className="mt-7 text-xs text-white/50 md:col-span-2">
        TIPO DE PROJETO *
        <select
          name="type"
          defaultValue=""
          className={`${fieldStyles} text-white`}
          aria-invalid={Boolean(errors.type)}
        >
          <option value="" disabled className="bg-ink">
            Selecione
          </option>
          {projectTypes.map((type) => (
            <option className="bg-ink" key={type} value={type}>
              {type}
            </option>
          ))}
        </select>
        {errors.type ? <FieldError message={errors.type} /> : null}
      </label>
      <label className="mt-7 text-xs text-white/50 md:col-span-2">
        MENSAGEM *
        <textarea
          name="message"
          rows={4}
          className={fieldStyles}
          placeholder="Objetivo, prazo e o que você imagina para o projeto."
          aria-invalid={Boolean(errors.message)}
        />
        {errors.message ? <FieldError message={errors.message} /> : null}
      </label>
      <div className="mt-9 md:col-span-2">
        {isValidated ? (
          <p role="status" className="mb-5 max-w-xl text-sm text-amber-300">
            Formulário validado. O envio ainda não está conectado a um backend —
            configure uma integração antes de publicar.
          </p>
        ) : null}
        <button
          type="submit"
          className="flex items-center gap-4 rounded-full bg-electric px-7 py-4 text-sm font-semibold transition-colors hover:bg-white hover:text-black"
        >
          VALIDAR PROPOSTA
          <ArrowUpRight size={18} aria-hidden="true" />
        </button>
      </div>
    </form>
  );
}

function FieldError({ message }: { message: string }) {
  return (
    <span className="mt-2 block text-xs text-red-400" role="alert">
      {message}
    </span>
  );
}
