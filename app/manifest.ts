import type { MetadataRoute } from "next";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "AA Design & Media",
    short_name: "AA Media",
    description: "Produção audiovisual em São Paulo",
    start_url: "/",
    display: "standalone",
    background_color: "#03060d",
    theme_color: "#0b66ff"
  };
}
