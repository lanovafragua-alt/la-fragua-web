import type { Metadata } from "next";
import Image from "next/image";
import { Hero } from "@/components/Hero";
import { ProductGallery } from "@/components/ProductGallery";
import { ProductSpotlight } from "@/components/ProductSpotlight";
import { ascuasLampDetails, ascuasLampGallery } from "@/lib/site";

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

      <section className="forge-section bg-forge-950">
        <div className="relative mx-auto grid max-w-7xl gap-12 px-5 py-20 sm:px-8 lg:grid-cols-[0.92fr_1.08fr] lg:items-center lg:py-24">
          <div className="relative mx-auto w-full max-w-md overflow-hidden rounded-lg border border-ember-300/20 bg-[radial-gradient(circle_at_50%_42%,rgba(240,93,35,0.18),transparent_58%),#050505] p-5">
            <Image
              src="/images/ascuas-character.png"
              alt="Caricatura de Ascuas, la guía de La Fragua"
              width={941}
              height={1672}
              className="ascuas-float mx-auto max-h-[560px] w-full object-contain"
            />
          </div>
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.28em] text-ember-200">
              Guía de la web
            </p>
            <h2 className="mt-5 text-4xl font-semibold leading-tight text-bone sm:text-5xl">
              Ascuas no es una mascota decorativa. Es la chispa que te acompaña.
            </h2>
            <p className="mt-6 text-lg leading-8 text-bone/66">
              La hemos colocado como guía suave dentro de la web: aparece en una
              esquina, respira con una animación mínima y sirve como recordatorio
              de que La Fragua piensa las ideas contigo, paso a paso.
            </p>
          </div>
        </div>
      </section>

      <section className="forge-section surface-noise">
        <div className="relative mx-auto grid max-w-7xl gap-14 px-5 py-20 sm:px-8 lg:py-24">
          <ProductSpotlight
            eyebrow="Producto Ascuas"
            title="La lámpara nace como una brasa con cuerpo."
            description="La primera línea física de Ascuas convierte el personaje y su energía en un objeto de luz: una llama translúcida, cálida y fabricada capa a capa."
            imageSrc="/images/ascuas-lamp-hero.png"
            imageAlt="Lámpara Ascuas encendida"
            href="/experimento-ascuas"
            ctaLabel="Entrar en la experiencia 3D"
            reverse
            details={ascuasLampDetails}
          />
          <ProductGallery items={ascuasLampGallery} />
        </div>
      </section>
    </>
  );
}
