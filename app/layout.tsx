import type { Metadata, Viewport } from "next";
import "@/app/globals.css";

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://aadesignmedia.com.br";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: { default: "AA Design & Media | Produtora Audiovisual em São Paulo", template: "%s | AA Design & Media" },
  description: "Produção audiovisual, vídeos institucionais, fotografia, social content, drone e FPV em São Paulo.",
  keywords: ["produtora audiovisual São Paulo", "vídeo institucional", "fotografia profissional", "drone FPV", "social content"],
  authors: [{ name: "AA Design & Media" }],
  creator: "AA Design & Media",
  alternates: { canonical: "/" },
  openGraph: {
    type: "website",
    locale: "pt_BR",
    siteName: "AA Design & Media",
    title: "AA Design & Media | Criamos experiências. Contamos histórias.",
    description: "Do seu ideal ao resultado extraordinário.",
    url: siteUrl,
    images: [{ url: "/opengraph-image", width: 1200, height: 630, alt: "AA Design & Media" }]
  },
  twitter: { card: "summary_large_image", title: "AA Design & Media", description: "Produção audiovisual em São Paulo.", images: ["/opengraph-image"] },
  category: "Produção audiovisual"
};

export const viewport: Viewport = { width: "device-width", initialScale: 1, themeColor: "#03060d" };

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return <html lang="pt-BR"><body>{children}</body></html>;
}
