import type { Metadata } from "next";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { AscuasGuide } from "@/components/AscuasGuide";
import "./globals.css";

export const metadata: Metadata = {
  title: {
    default: "La Fragua | Donde las ideas toman forma",
    template: "%s | La Fragua",
  },
  description:
    "Marca-laboratorio de diseño, tecnología y fabricación: 3D, IA, NFC, web apps, electrónica, luz y experiencias interactivas.",
  metadataBase: new URL("https://lafragua.studio"),
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="es">
      <body>
        <Header />
        <main>{children}</main>
        <AscuasGuide />
        <Footer />
      </body>
    </html>
  );
}
