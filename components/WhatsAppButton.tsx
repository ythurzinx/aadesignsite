import { MessageCircle } from "lucide-react";

import { contact, whatsappUrl } from "@/data/contact";

export function WhatsAppButton() {
  return (
    <a
      href={whatsappUrl}
      target={contact.whatsapp ? "_blank" : undefined}
      rel={contact.whatsapp ? "noreferrer" : undefined}
      className="fixed bottom-5 right-5 z-40 grid size-12 place-items-center rounded-full border border-white/20 bg-ink/90 shadow-2xl backdrop-blur transition-colors hover:border-electric hover:text-electric"
      aria-label={
        contact.whatsapp
          ? "Conversar pelo WhatsApp"
          : "Ir para contato; WhatsApp ainda não configurado"
      }
    >
      <MessageCircle size={19} aria-hidden="true" />
    </a>
  );
}
