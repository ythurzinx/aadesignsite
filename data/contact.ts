export const contact = {
  // TODO: informe DDI + DDD + número, somente dígitos.
  whatsapp: "",
  // TODO: informe o usuário sem @.
  instagram: "",
  // TODO: informe o e-mail real.
  email: "",
} as const;

export const whatsappUrl = contact.whatsapp
  ? `https://wa.me/${contact.whatsapp}`
  : "/contato";

export const instagramUrl = contact.instagram
  ? `https://instagram.com/${contact.instagram}`
  : "/contato";
