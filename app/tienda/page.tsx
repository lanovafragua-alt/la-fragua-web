import { Storefront } from "@/components/Storefront";
import { catalogMetadata } from "@/lib/seo";

export const metadata = catalogMetadata;

export default function TiendaPage() {
  return <Storefront />;
}
