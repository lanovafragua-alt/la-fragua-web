import type { Metadata } from "next";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { AscuasGuide } from "@/components/AscuasGuide";
import { PostHogAnalytics } from "@/components/PostHogAnalytics";
import { siteUrl } from "@/lib/site";
import "./globals.css";

export const metadata: Metadata = {
  title: {
    default: "La Fragua | Objetos que toman forma",
    template: "%s | La Fragua",
  },
  description:
    "La Fragua crea lámparas, accesorios gaming, decoración impresa en 3D y encargos personalizados.",
  metadataBase: new URL(siteUrl),
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="es">
      <body>
        <PostHogAnalytics />
        <Header />
        <main>{children}</main>
        <AscuasGuide />
        <Footer />
      </body>
    </html>
  );
}
