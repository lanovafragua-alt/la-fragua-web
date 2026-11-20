import { Storefront } from "@/components/Storefront";
import { StructuredData } from "@/components/StructuredData";
import { catalogMetadata, catalogStructuredData } from "@/lib/seo";

export const metadata = catalogMetadata;

export default function Home() {
  return <><StructuredData data={catalogStructuredData()} /><Storefront /></>;
}
