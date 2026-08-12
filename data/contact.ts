export const contact={
  whatsapp:"", // TODO: informe DDI + DDD + número, somente dígitos.
  instagram:"", // TODO: informe o usuário sem @.
  email:"", // TODO: informe o e-mail real.
};
export const whatsappUrl=contact.whatsapp?`https://wa.me/${contact.whatsapp}`:"/contato";
export const instagramUrl=contact.instagram?`https://instagram.com/${contact.instagram}`:"/contato";
