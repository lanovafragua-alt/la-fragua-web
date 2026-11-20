import { AscuasImmersiveExperience } from "@/components/AscuasImmersiveExperience";
import { pageMetadata } from "@/lib/seo";

export const metadata = pageMetadata({
  title: "Experimento Ascuas 3D",
  description:
    "Una demostración inmersiva de la lámpara Ascuas como objeto tridimensional de La Fragua.",
  path: "/experimento-ascuas",
  noIndex: true,
});

export default function ExperimentoAscuasPage() {
  return <AscuasImmersiveExperience />;
}
