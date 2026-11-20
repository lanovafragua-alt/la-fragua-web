import type { MetadataRoute } from "next";
import { catalogProducts } from "@/lib/site";
import { pageUrl } from "@/lib/seo";

export const dynamic = "force-static";

export default function sitemap(): MetadataRoute.Sitemap {
  // The store aliases share the home canonical; the 3D demo is not indexable.
  const paths = ["/", ...catalogProducts.map((product) => product.href), "/curso"];
  return [...new Set(paths)].map((path) => ({ url: pageUrl(path) }));
}
