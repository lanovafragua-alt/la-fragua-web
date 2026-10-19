import type { Metadata } from "next";
import { Storefront } from "@/components/Storefront";

export const metadata: Metadata = {
  title: "Tienda",
  description:
    "Tienda de La Fragua: lámparas, accesorios gaming, decoración impresa en 3D y encargos personalizados.",
};

export default function TiendaPage() {
  return <Storefront />;
}
