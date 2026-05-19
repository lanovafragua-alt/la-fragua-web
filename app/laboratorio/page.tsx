import type { Metadata } from "next";
import { Hero } from "@/components/Hero";
import { FeatureCard } from "@/components/FeatureCard";

export const metadata: Metadata = {
  title: "Laboratorio",
  description:
    "El espacio de La Fragua para diseñar, prototipar y fabricar objetos, sistemas y experiencias interactivas.",
};

const capabilities = [
  {
    title: "Diseño 3D",
    eyebrow: "Modelado",
    description:
      "Piezas pensadas desde función, tacto, ensamblaje, acabado y fabricación real.",
    href: "/contacto",
    accent: "gold" as const,
  },
  {
    title: "Fabricación",
    eyebrow: "Prototipo",
    description:
      "Impresión, iteración, pruebas de uso y ajustes hasta que la pieza deja de ser promesa.",
    href: "/productos",
    accent: "ember" as const,
  },
  {
    title: "Sistemas interactivos",
    eyebrow: "Conexión",
    description:
      "NFC, electrónica, luz y web apps para objetos que responden, registran o abren experiencias.",
    href: "/focus-mode",
    accent: "oxide" as const,
  },
];

export default function LaboratorioPage() {
  return (
    <>
      <Hero
        imageSrc="/images/hero-forge-lab.png"
        eyebrow="Laboratorio"
        title="El taller donde lo digital aprende a tener peso."
        description="Diseñamos con cabeza de sistema y manos de taller: una pieza puede ser forma, interfaz, soporte, ritual y herramienta al mismo tiempo."
        primaryCta={{ label: "Plantear un prototipo", href: "/contacto" }}
        secondaryCta={{ label: "Ver productos", href: "/productos" }}
      />

      <section className="forge-section">
        <div className="relative mx-auto max-w-7xl px-5 py-20 sm:px-8 lg:py-24">
          <div className="grid gap-10 lg:grid-cols-[0.8fr_1.2fr]">
            <h2 className="text-4xl font-semibold leading-tight text-bone sm:text-5xl">
              No fabricamos ocurrencias. Las ponemos a prueba.
            </h2>
            <div className="grid gap-6 text-lg leading-9 text-bone/66">
              <p>
                El laboratorio existe para cruzar diseño 3D, fabricación,
                electrónica, IA, NFC, luz e interfaces web con un criterio
                común: que la idea mejore cuando entra en contacto con el mundo.
              </p>
              <p>
                Cada proyecto pasa por una conversación entre intención,
                material, uso y técnica. Lo que no funciona enseña. Lo que
                resiste, avanza.
              </p>
            </div>
          </div>

          <div className="mt-14 grid gap-5 md:grid-cols-3">
            {capabilities.map((item) => (
              <FeatureCard key={item.title} {...item} />
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
