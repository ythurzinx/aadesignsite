// Substitua os placeholders pelos nomes e arquivos de logos de clientes reais.
export const clients=[1,2,3,4,5,6].map((id)=>({id,name:`LOGO ${String(id).padStart(2,"0")} — PLACEHOLDER`,logo:null as string|null}));
