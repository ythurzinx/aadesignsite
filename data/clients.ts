export interface Client {
  id: number;
  name: string;
  logo: string | null;
}

// Substitua os placeholders pelos nomes e arquivos de logos de clientes reais.
export const clients: Client[] = Array.from({ length: 6 }, (_, index) => ({
  id: index + 1,
  name: `LOGO ${String(index + 1).padStart(2, "0")} — PLACEHOLDER`,
  logo: null,
}));
