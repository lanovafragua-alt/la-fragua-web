import type { Metadata } from "next";
import { Storefront } from "@/components/Storefront";

export const metadata: Metadata = {
  title: "La Fragua | Tienda",
  description:
    "Compra lámparas, accesorios gaming y decoración de La Fragua. Diseño propio, fabricación en 3D y encargos personalizados.",
};

export default function Home() {
  return <Storefront />;
}
