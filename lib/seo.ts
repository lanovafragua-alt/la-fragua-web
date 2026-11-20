import type { Metadata } from "next";
import { catalogProducts, contact, siteUrl, type CatalogProduct } from "@/lib/site";

export const siteDescription =
  "Lámparas de diseño, accesorios gaming, decoración y piezas personalizadas impresas en 3D. Descubre los productos y encargos de La Fragua.";
export const defaultSocialImage = "/images/catalog/ascuas/ascuas-6.jpg";

export function absoluteUrl(path: string) {
  return new URL(path, siteUrl).toString();
}

export function pageUrl(path: string) {
  return absoluteUrl(path === "/" ? "/" : `/${path.replace(/^\/+|\/+$/g, "")}/`);
}

type PageMetadataOptions = {
  title: string;
  description: string;
  path: string;
  image?: string;
  noIndex?: boolean;
};

export function pageMetadata({
  title,
  description,
  path,
  image = defaultSocialImage,
  noIndex = false,
}: PageMetadataOptions): Metadata {
  const fullTitle = `${title} | La Fragua`;
  return {
    title: { absolute: fullTitle },
    description,
    alternates: { canonical: pageUrl(path) },
    robots: {
      index: !noIndex,
      follow: true,
      googleBot: { index: !noIndex, follow: true, "max-image-preview": "large" },
    },
    openGraph: {
      type: "website",
      locale: "es_ES",
      siteName: "La Fragua",
      title: fullTitle,
      description,
      url: pageUrl(path),
      images: [{ url: absoluteUrl(image), alt: title }],
    },
    twitter: {
      card: "summary_large_image",
      title: fullTitle,
      description,
      images: [absoluteUrl(image)],
    },
  };
}

export const catalogMetadata = pageMetadata({
  title: "Lámparas y objetos impresos en 3D",
  description: siteDescription,
  path: "/",
});

const productSearchTitles: Record<string, string> = {
  ascuas: "Lámpara de mesa Ascuas impresa en 3D",
  chispa: "Chispa: dispositivo NFC para concentración",
  "carcasas-nintendo-3ds-xl": "Carcasas para Nintendo 3DS XL impresas en 3D",
  "soporte-r4-gigante": "Soporte R4 gigante para Nintendo 3DS XL",
  "soporte-auriculares-modular": "Soporte modular para auriculares impreso en 3D",
  "lampara-personalizada-foto": "Lámpara personalizada con foto: litofanía en 3D",
  "lampara-perrito": "Lámpara de perrito con luz USB",
  "cartel-wanted-luffy-gear-5": "Cartel Wanted Luffy Gear 5 retroiluminado",
};

export function productMetadata(product: CatalogProduct) {
  return pageMetadata({
    title: productSearchTitles[product.slug] ?? product.name,
    description: `${product.summary} Diseño y fabricación de La Fragua.`,
    path: product.href,
    image: product.imageSrc,
  });
}

export function organizationStructuredData() {
  return {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "Organization",
        "@id": `${siteUrl}/#organization`,
        name: "La Fragua",
        url: pageUrl("/"),
        description: siteDescription,
        logo: absoluteUrl("/brand/la-fragua-logo-black.png"),
        email: contact.email,
        telephone: "+34638897236",
        sameAs: [contact.instagram, contact.tiktok, contact.facebook, contact.etsy],
      },
      {
        "@type": "WebSite",
        "@id": `${siteUrl}/#website`,
        name: "La Fragua",
        url: pageUrl("/"),
        inLanguage: "es-ES",
        publisher: { "@id": `${siteUrl}/#organization` },
      },
    ],
  };
}

export function catalogStructuredData() {
  return {
    "@context": "https://schema.org",
    "@type": "ItemList",
    name: "Productos de La Fragua",
    url: pageUrl("/"),
    numberOfItems: catalogProducts.length,
    itemListElement: catalogProducts.map((product, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: product.name,
      url: pageUrl(product.href),
    })),
  };
}

export function productStructuredData(product: CatalogProduct) {
  const images = product.gallery?.map((item) => absoluteUrl(item.src)) ??
    (product.imageSrc ? [absoluteUrl(product.imageSrc)] : []);
  const priceMatch = product.price.match(/^(\d+)(?:,(\d{1,2}))?\s*€$/);
  const price = priceMatch
    ? Number(`${priceMatch[1]}.${priceMatch[2] ?? "00"}`).toFixed(2)
    : null;

  return {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "Product",
        "@id": `${pageUrl(product.href)}#product`,
        name: product.name,
        description: `${product.summary}${product.disclaimer ? ` ${product.disclaimer}` : ""}`,
        image: images,
        url: pageUrl(product.href),
        category: product.category,
        brand: { "@type": "Brand", name: "La Fragua" },
        ...(price ? {
          offers: {
            "@type": "Offer",
            url: pageUrl(product.href),
            priceCurrency: "EUR",
            price,
            seller: { "@id": `${siteUrl}/#organization` },
          },
        } : {}),
      },
      {
        "@type": "BreadcrumbList",
        itemListElement: [
          { "@type": "ListItem", position: 1, name: "La Fragua", item: pageUrl("/") },
          { "@type": "ListItem", position: 2, name: product.name, item: pageUrl(product.href) },
        ],
      },
    ],
  };
}
