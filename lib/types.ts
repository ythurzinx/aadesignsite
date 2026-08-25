export const PROJECT_CATEGORIES = [
  "Institucional",
  "Eventos",
  "Social Content",
  "Gastronomia",
  "Esportes e turfe",
  "Drone e FPV",
  "Fotografia",
  "Documentários",
  "Imóveis"
] as const;

export type ProjectCategory = (typeof PROJECT_CATEGORIES)[number];
export type MediaOrientation = "horizontal" | "vertical" | "square";

export interface ProjectMedia {
  id: string;
  project_id: string;
  kind: "image" | "video";
  url: string;
  poster_url: string | null;
  alt: string;
  orientation: MediaOrientation;
  position: number;
}

export interface Project {
  id: string;
  slug: string;
  title: string;
  client: string;
  category: ProjectCategory;
  year: number;
  format: string;
  description: string;
  full_description: string | null;
  services: string[];
  credits: string | null;
  cover_url: string | null;
  video_url: string | null;
  orientation: MediaOrientation;
  aspect_ratio: string;
  focal_x: number;
  focal_y: number;
  featured: boolean;
  published: boolean;
  position: number;
  created_at: string;
  updated_at: string;
  project_media?: ProjectMedia[];
}

export interface Service {
  id: string;
  title: string;
  description: string;
  icon: string;
  visible: boolean;
  position: number;
}

export interface Equipment {
  id: string;
  title: string;
  description: string;
  image_url: string | null;
  visible: boolean;
  position: number;
}

export interface ClientLogo {
  id: string;
  name: string;
  logo_url: string | null;
  visible: boolean;
  position: number;
}

export interface Testimonial {
  id: string;
  quote: string;
  author_name: string;
  author_role: string | null;
  author_company: string | null;
  portrait_url: string | null;
  visible: boolean;
  position: number;
}

export interface BehindScene {
  id: string;
  title: string;
  media_url: string | null;
  poster_url: string | null;
  media_type: "image" | "video";
  equipment: string | null;
  orientation: MediaOrientation;
  visible: boolean;
  position: number;
}

export interface SiteSettings {
  id: string;
  logo_url: string | null;
  hero_video_url: string | null;
  hero_poster_url: string | null;
  showreel_url: string | null;
  about_image_url: string | null;
  team_image_url: string | null;
  cta_background_url: string | null;
  whatsapp: string | null;
  instagram: string | null;
  email: string | null;
  address: string | null;
  hero_title: string;
  hero_support: string;
  hero_description: string;
  about_text: string;
  footer_text: string;
}

export interface SiteData {
  projects: Project[];
  services: Service[];
  equipment: Equipment[];
  clients: ClientLogo[];
  testimonials: Testimonial[];
  behindScenes: BehindScene[];
  settings: SiteSettings;
}

export interface Lead {
  id: string;
  name: string;
  company: string | null;
  phone: string;
  email: string;
  project_type: string;
  expected_date: string | null;
  city: string;
  budget: string;
  description: string;
  reference_url: string | null;
  consent: boolean;
  status: "novo" | "em_contato" | "convertido" | "arquivado";
  created_at: string;
}
