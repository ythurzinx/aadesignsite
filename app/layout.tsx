import type { Metadata, Viewport } from "next";
import { Inter, Space_Grotesk } from "next/font/google";

import { Footer } from "@/components/Footer";
import { Header } from "@/components/Header";
import { WhatsAppButton } from "@/components/WhatsAppButton";

import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

const spaceGrotesk = Space_Grotesk({
  subsets: ["latin"],
  variable: "--font-space",
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL("https://aadesignmidia.com.br"),
  title: "AA Design & Mídia | Produção Audiovisual",
  description:
    "Produção audiovisual, fotografia e conteúdo para marcas, empresas e experiências.",
  alternates: { canonical: "/" },
  icons: { icon: "/favicon.svg" },
  openGraph: {
    title: "AA Design & Mídia | Produção Audiovisual",
    description:
      "Produção audiovisual, fotografia e conteúdo para marcas, empresas e experiências.",
    type: "website",
    locale: "pt_BR",
    images: ["/images/showreel-cover.svg"],
  },
  twitter: {
    card: "summary_large_image",
    title: "AA Design & Mídia | Produção Audiovisual",
    description:
      "Produção audiovisual, fotografia e conteúdo para marcas, empresas e experiências.",
    images: ["/images/showreel-cover.svg"],
  },
};

export const viewport: Viewport = {
  themeColor: "#050608",
  colorScheme: "dark",
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="pt-BR" className={`${inter.variable} ${spaceGrotesk.variable}`}>
      <body>
        <a href="#conteudo" className="skip-link">
          Pular para conteúdo
        </a>
        <Header />
        <div id="conteudo">{children}</div>
        <Footer />
        <WhatsAppButton />
      </body>
    </html>
  );
}
