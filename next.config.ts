import type { NextConfig } from "next";

// Exportación estática (carpeta out/) para servirla en Cloudflare Workers sin servidor.
// Las imágenes se sirven tal cual: la optimización de next/image necesita servidor.
const nextConfig: NextConfig = {
  reactStrictMode: true,
  output: "export",
  images: { unoptimized: true },
};

export default nextConfig;
