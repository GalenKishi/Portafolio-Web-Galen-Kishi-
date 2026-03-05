import type { Metadata } from "next";
import { Geist, Geist_Mono, Jersey_10, Pixelify_Sans } from "next/font/google";
import CodeRain from "./components/CodeRain";
import HoverNumberRain from "./components/HoverNumberRain";
import InitialLoader from "./components/InitialLoader";
import Navbar from "./components/Navbar";
import PageTransition from "./components/PageTransition";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const pixelifySans = Pixelify_Sans({
  variable: "--font-pixel",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});

const jersey10 = Jersey_10({
  variable: "--font-jersey",
  subsets: ["latin"],
  weight: "400",
});

export const metadata: Metadata = {
  metadataBase: new URL("https://tu-dominio.com"),
  title: {
    default: "Portafolio | Desarrollador Web y Programador de Videojuegos",
    template: "%s | Portafolio",
  },
  description:
    "Portafolio profesional con proyectos reales, tecnologías y experiencia en desarrollo web full stack y programación de videojuegos.",
  openGraph: {
    title: "Portafolio Profesional",
    description:
      "Proyectos reales, stack tecnológico y forma de contacto para oportunidades laborales y colaboraciones.",
    type: "website",
    locale: "es_ES",
    url: "https://tu-dominio.com",
    siteName: "Portafolio Profesional",
  },
  twitter: {
    card: "summary_large_image",
    title: "Portafolio Profesional",
    description:
      "Desarrollador web full stack y programador de videojuegos. Revisa proyectos y ponte en contacto.",
  },
};


export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="es" suppressHydrationWarning>
      <body suppressHydrationWarning className={`${geistSans.variable} ${geistMono.variable} ${pixelifySans.variable} ${jersey10.variable} antialiased bg-slate-950 text-white relative overflow-x-hidden`}>
        <CodeRain />
        <HoverNumberRain />
        <InitialLoader />
        <div className="relative z-10">
          <a href="#main-content" className="skip-link">Saltar al contenido principal</a>
          <Navbar />
          <PageTransition>{children}</PageTransition>
        </div>
      </body>
    </html>
  );
}
