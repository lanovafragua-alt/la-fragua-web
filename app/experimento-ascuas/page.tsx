import type { Metadata } from "next";
import { AscuasImmersiveExperience } from "@/components/AscuasImmersiveExperience";

export const metadata: Metadata = {
  title: "Ascuas 3D | Experimento",
  description:
    "Una demostración inmersiva de la lámpara Ascuas como objeto tridimensional de La Fragua.",
};

export default function ExperimentoAscuasPage() {
  return <AscuasImmersiveExperience />;
}
