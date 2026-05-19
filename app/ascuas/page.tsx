import type { Metadata } from "next";
import { Hero } from "@/components/Hero";

export const metadata: Metadata = {
  title: "Ascuas",
  description:
    "Ascuas es el espacio de La Fragua para pensar con IA, explorar ideas y convertir chispas en proyectos reales.",
};

const principles = [
  "Ordenar ideas sin apagar su rareza.",
  "Convertir preguntas en mapas, prototipos y decisiones.",
  "Usar IA como conversación de taller, no como atajo vacío.",
  "Bajar lo abstracto a piezas, flujos, textos, interfaces o sistemas.",
];

export default function AscuasPage() {
  return (
    <>
      <Hero
        imageSrc="/images/hero-forge-lab.png"
        eyebrow="Ascuas"
        title="La inteligencia que mantiene viva la chispa."
        description="Ascuas es el frente de pensamiento, IA y exploración de La Fragua: un lugar para acompañar ideas mientras todavía están calientes."
        primaryCta={{ label: "Encender una idea", href: "/contacto" }}
        secondaryCta={{ label: "Volver al laboratorio", href: "/laboratorio" }}
      />

      <section className="forge-section surface-noise">
        <div className="relative mx-auto grid max-w-7xl gap-12 px-5 py-20 sm:px-8 lg:grid-cols-[0.85fr_1.15fr] lg:py-24">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.28em] text-ember-200">
              Qué es
            </p>
            <h2 className="mt-5 text-4xl font-semibold leading-tight text-bone sm:text-5xl">
              Un espacio para pensar con temperatura.
            </h2>
          </div>
          <div className="grid gap-4">
            {principles.map((item) => (
              <div
                key={item}
                className="rounded-lg border border-white/10 bg-white/[0.035] p-5 text-lg leading-8 text-bone/70"
              >
                {item}
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
