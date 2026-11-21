import type { Metadata, Viewport } from "next";
import localFont from "next/font/local";
import "./globals.css";

// Display: Bodoni Moda (SIL OFL 1.1), Latin subset pinned at weight 500, optical size kept.
const display = localFont({
  src: [
    { path: "../public/fonts/bodoni-moda/BodoniModa-Latin.woff2", weight: "500", style: "normal" },
    { path: "../public/fonts/bodoni-moda/BodoniModa-Italic-Latin.woff2", weight: "500", style: "italic" },
  ],
  display: "swap",
  variable: "--font-display",
  fallback: ["Didot", "Georgia", "Times New Roman", "serif"],
  adjustFontFallback: "Times New Roman",
});

// Text and interface: Archivo (SIL OFL 1.1), Latin subset, weight 400–900 and width 100–125%.
const text = localFont({
  src: [{ path: "../public/fonts/archivo/Archivo-Latin.woff2", weight: "400 900", style: "normal" }],
  display: "swap",
  variable: "--font-text",
  fallback: ["Arial", "Helvetica", "sans-serif"],
  adjustFontFallback: "Arial",
  declarations: [{ prop: "font-stretch", value: "100% 125%" }],
});

const publicUrl = process.env.NEXT_PUBLIC_SITE_URL?.trim();
const canonical = publicUrl && /^https:\/\//.test(publicUrl) ? new URL(publicUrl) : undefined;

// Link preview for WhatsApp and social sharing: brand kit plus the approved photograph.
const socialImage = { url: "/brand/java-og.jpg", width: 1200, height: 630, alt: "JAVA, hornos profesionales para pizza. Ladrillo a ladrillo." };

export const metadata: Metadata = {
  metadataBase: canonical,
  title: "JAVA — Ladrillo a ladrillo | Hornos profesionales",
  description: "Hornos profesionales para pizza. Descubre las referencias JAVA y solicita un presupuesto para tu pizzería por WhatsApp. Tu proyecto. Tu horno. JAVA.",
  alternates: canonical ? { canonical: "/" } : undefined,
  robots: { index: Boolean(canonical), follow: Boolean(canonical) },
  openGraph: {
    type: "website",
    locale: "es_ES",
    siteName: "Hornos JAVA",
    title: "JAVA — Ladrillo a ladrillo",
    description: "Descubre los hornos JAVA y hablemos de tu próximo proyecto profesional.",
    ...(canonical ? { url: canonical.href, images: [socialImage] } : {}),
  },
  twitter: { card: "summary_large_image", title: "JAVA — Ladrillo a ladrillo", ...(canonical ? { images: [socialImage] } : {}) },
};

export const viewport: Viewport = { themeColor: "#102923" };

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return <html lang="es" className={`${display.variable} ${text.variable}`}><body>{children}</body></html>;
}
