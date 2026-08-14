export const projectCategories = [
  "Todos",
  "Filmes",
  "Marcas",
  "Social",
  "Eventos",
  "Gastronomia",
  "Esportes",
  "Drone / FPV",
  "Fotografia",
] as const;

export type ProjectCategory = Exclude<
  (typeof projectCategories)[number],
  "Todos"
>;

export interface Project {
  slug: string;
  title: string;
  client: string;
  category: ProjectCategory;
  year: string;
  thumbnail: string;
  cover: string;
  video?: string;
  description: string;
  gallery: string[];
  featured: boolean;
  orientation: "wide" | "vertical" | "square";
}

// Conteúdo demonstrativo claramente identificado. Substitua mídia e dados pelos projetos reais.
export const projects: Project[] = [
  {
    slug: "manifesto-em-movimento",
    title: "Manifesto em movimento",
    client: "CLIENTE — PLACEHOLDER",
    category: "Filmes",
    year: "20XX",
    thumbnail: "/images/project-01.svg",
    cover: "/images/project-01.svg",
    video: "/videos/showreel.mp4",
    description:
      "Um espaço editorial preparado para apresentar conceito, processo e impacto de um filme de marca.",
    gallery: ["/images/project-02.svg", "/images/project-03.svg"],
    featured: true,
    orientation: "wide",
  },
  {
    slug: "sabores-em-cena",
    title: "Sabores em cena",
    client: "CLIENTE — PLACEHOLDER",
    category: "Gastronomia",
    year: "20XX",
    thumbnail: "/images/project-02.svg",
    cover: "/images/project-02.svg",
    description:
      "Texturas, ritmo e luz desenhados para transformar cada detalhe em desejo.",
    gallery: ["/images/project-01.svg", "/images/project-04.svg"],
    featured: true,
    orientation: "vertical",
  },
  {
    slug: "altura-e-velocidade",
    title: "Altura & velocidade",
    client: "CLIENTE — PLACEHOLDER",
    category: "Drone / FPV",
    year: "20XX",
    thumbnail: "/images/project-03.svg",
    cover: "/images/project-03.svg",
    description:
      "Movimentos imersivos para revelar espaços sob uma nova perspectiva.",
    gallery: ["/images/project-04.svg", "/images/project-02.svg"],
    featured: true,
    orientation: "square",
  },
  {
    slug: "pulso-do-evento",
    title: "Pulso do evento",
    client: "CLIENTE — PLACEHOLDER",
    category: "Eventos",
    year: "20XX",
    thumbnail: "/images/project-04.svg",
    cover: "/images/project-04.svg",
    description:
      "Uma narrativa ágil para preservar a energia de experiências ao vivo.",
    gallery: ["/images/project-03.svg", "/images/project-01.svg"],
    featured: true,
    orientation: "wide",
  },
];
