import type { Metadata } from "next";
import { Hero } from "@/components/Hero";
import { ProductGallery } from "@/components/ProductGallery";
import { ProductSpotlight } from "@/components/ProductSpotlight";
import {
  ascuasLampDetails,
  ascuasLampGallery,
  chispaDetails,
  productLines,
} from "@/lib/site";

export const metadata: Metadata = {
  title: "Productos",
  description:
    "Productos, prototipos y piezas de La Fragua: objetos impresos, NFC, luz, electrónica y web apps conectadas.",
};

export default function ProductosPage() {
  return (
    <>
      <Hero
        imageSrc="/images/hero-forge-lab.png"
        eyebrow="Productos"
        title="Piezas con materia, intención y una segunda capa digital."
        description="Creamos productos propios y encargos a medida: desde objetos táctiles hasta sistemas que abren experiencias, registran acciones o iluminan momentos."
        primaryCta={{ label: "Encargar una pieza", href: "/contacto" }}
        secondaryCta={{ label: "Ver el proceso", href: "/" }}
      />

      <section className="forge-section surface-noise">
        <div className="relative mx-auto max-w-7xl px-5 py-20 sm:px-8 lg:py-24">
          <div className="grid gap-10 lg:grid-cols-[0.8fr_1.2fr]">
            <div>
              <p className="text-xs font-semibold uppercase tracking-[0.28em] text-ember-200">
                Líneas
              </p>
              <h2 className="mt-5 text-4xl font-semibold leading-tight text-bone sm:text-5xl">
                Lo físico no termina en la superficie.
              </h2>
            </div>
            <div className="grid gap-4">
              {productLines.map((line) => (
                <div
                  key={line}
                  className="flex items-start gap-4 rounded-lg border border-white/10 bg-white/[0.035] p-5"
                >
                  <span className="mt-2 h-2 w-8 shrink-0 rounded-full bg-ember-300 shadow-[0_0_18px_rgba(255,155,69,0.45)]" />
                  <p className="text-lg leading-8 text-bone/70">{line}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="forge-section bg-forge-950">
        <div className="relative mx-auto grid max-w-7xl gap-16 px-5 py-20 sm:px-8 lg:py-24">
          <ProductSpotlight
            eyebrow="Producto 01"
            title="Lámpara Ascuas."
            description="Una lámpara de presencia cálida, fabricada en material translúcido y pensada para mostrar su proceso: capas, núcleo, llama exterior, base y control de tono."
            imageSrc="/images/ascuas-lamp-hero.png"
            imageAlt="Lámpara Ascuas encendida sobre escritorio"
            href="/contacto"
            ctaLabel="Preguntar por Ascuas"
            details={ascuasLampDetails}
          />

          <ProductGallery items={ascuasLampGallery} />

          <ProductSpotlight
            eyebrow="Producto 02"
            title="Proyecto Chispa."
            description="El dispositivo de Focus Mode: una pieza física para iniciar un modo de atención, conectar con NFC y convertir el foco en una experiencia tangible."
            imageSrc="/images/proyecto-chispa-device.png"
            imageAlt="Dispositivo Proyecto Chispa"
            href="/focus-mode"
            ctaLabel="Ver Focus Mode"
            reverse
            details={chispaDetails}
          />
        </div>
      </section>
    </>
  );
}
