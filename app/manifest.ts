import type { MetadataRoute } from "next";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "AA Design & Media",
    short_name: "AA Media",
    description: "Produção audiovisual em São Paulo",
    start_url: "/",
    display: "standalone",
    background_color: "#03060d",
    theme_color: "#155dd7",
    icons: [
      { src: "/icon.png", sizes: "512x512", type: "image/png" },
      { src: "/apple-icon.png", sizes: "180x180", type: "image/png" }
    ]
  };
}
