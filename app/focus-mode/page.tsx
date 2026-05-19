import type { Metadata } from "next";
import { Hero } from "@/components/Hero";
import { ProcessTimeline } from "@/components/ProcessTimeline";

export const metadata: Metadata = {
  title: "Focus Mode",
  description:
    "Focus Mode reúne objetos, interfaces y rituales para diseñar mejores estados de atención.",
};

const focusSteps = ["preparar", "encender", "entrar", "sostener", "cerrar"];

export default function FocusModePage() {
  return (
    <>
      <Hero
        imageSrc="/images/hero-forge-lab.png"
        eyebrow="Focus Mode"
        title="Objetos y rituales para volver al centro."
        description="Una línea de experiencias físicas-digitales para proteger la atención: piezas, luces, interfaces y señales que ayudan a entrar en trabajo profundo."
        primaryCta={{ label: "Diseñar un ritual", href: "/contacto" }}
        secondaryCta={{ label: "Explorar productos", href: "/productos" }}
      />

      <section className="forge-section">
        <div className="relative mx-auto max-w-7xl px-5 py-20 sm:px-8 lg:py-24">
          <div className="mb-12 max-w-3xl">
            <p className="text-xs font-semibold uppercase tracking-[0.28em] text-gold-100">
              Sistema
            </p>
            <h2 className="mt-5 text-4xl font-semibold leading-tight text-bone sm:text-5xl">
              La atención también se diseña.
            </h2>
            <p className="mt-6 text-lg leading-8 text-bone/66">
              Focus Mode combina presencia física, señales ambientales y
              pequeñas interfaces para que empezar, sostener y cerrar una sesión
              de trabajo tenga forma propia.
            </p>
          </div>
          <ProcessTimeline steps={focusSteps} />
        </div>
      </section>
    </>
  );
}
