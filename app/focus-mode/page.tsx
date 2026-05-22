import type { Metadata } from "next";
import { Hero } from "@/components/Hero";
import { ProcessTimeline } from "@/components/ProcessTimeline";
import { ProductSpotlight } from "@/components/ProductSpotlight";
import { chispaDetails } from "@/lib/site";

export const metadata: Metadata = {
  title: "Proyecto Chispa",
  description:
    "Proyecto Chispa reúne objeto físico, NFC e interfaz para diseñar mejores estados de atención.",
};

const focusSteps = ["preparar", "encender", "entrar", "sostener", "cerrar"];

export default function FocusModePage() {
  return (
    <>
      <Hero
        imageSrc="/images/hero-forge-lab.png"
        eyebrow="Proyecto Chispa"
        title="Focus Mode hecho objeto."
        description="Chispa es el dispositivo que convierte la entrada al foco en un gesto físico: presencia en mesa, NFC, señal clara y una experiencia digital asociada."
        primaryCta={{ label: "Diseñar un ritual", href: "/contacto" }}
        secondaryCta={{ label: "Explorar productos", href: "/productos" }}
      />

      <section className="forge-section">
        <div className="relative mx-auto max-w-7xl px-5 py-20 sm:px-8 lg:py-24">
          <ProductSpotlight
            eyebrow="Dispositivo"
            title="Un interruptor simbólico para entrar en modo foco."
            description="Proyecto Chispa no quiere ser otro gadget más: es una pieza física que te recuerda cuándo empieza una sesión importante y puede abrir una capa digital mediante NFC."
            imageSrc="/images/proyecto-chispa-device.png"
            imageAlt="Dispositivo Proyecto Chispa con NFC y cable USB-C"
            href="/contacto"
            ctaLabel="Hablar de Chispa"
            details={chispaDetails}
          />

          <div className="mb-12 mt-20 max-w-3xl">
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
