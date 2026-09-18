import type { MetadataRoute } from "next";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "AVA — App for Victim Assistance",
    short_name: "AVA",
    description:
      "A victim-centred information and support platform for accessing verified help, rights and justice information.",
    start_url: "/",
    display: "standalone",
    background_color: "#F7F9FA",
theme_color: "#4C5B68",
    orientation: "portrait",
    icons: [
      {
        src: "/icon-192.png",
        sizes: "192x192",
        type: "image/png",
      },
      {
        src: "/icon-512.png",
        sizes: "512x512",
        type: "image/png",
      },
    ],
  };
}