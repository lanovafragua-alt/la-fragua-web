import type { Metadata } from "next";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { AscuasGuide } from "@/components/AscuasGuide";
import { PostHogAnalytics } from "@/components/PostHogAnalytics";
import { MetaPixel } from "@/components/MetaPixel";
import { GoogleAnalytics } from "@/components/GoogleAnalytics";
import { AdvertisingConsentBanner } from "@/components/AdvertisingConsent";
import { StructuredData } from "@/components/StructuredData";
import { googleSiteVerification } from "@/lib/google";
import { organizationStructuredData, siteDescription } from "@/lib/seo";
import { siteUrl } from "@/lib/site";
import "./globals.css";

export const metadata: Metadata = {
  title: {
    default: "Lámparas y objetos impresos en 3D | La Fragua",
    template: "%s | La Fragua",
  },
  description: siteDescription,
  metadataBase: new URL(siteUrl),
  verification: { google: googleSiteVerification },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="es">
      <body>
        <StructuredData data={organizationStructuredData()} />
        <PostHogAnalytics />
        <GoogleAnalytics />
        <MetaPixel />
        <Header />
        <main>{children}</main>
        <AscuasGuide />
        <Footer />
        <AdvertisingConsentBanner />
      </body>
    </html>
  );
}
