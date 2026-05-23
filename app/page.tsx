import { FeatureCard } from "@/components/FeatureCard";
import { AscuasHeroBackdrop } from "@/components/AscuasHeroBackdrop";
import { Hero } from "@/components/Hero";
import { ProcessTimeline } from "@/components/ProcessTimeline";
import { ProductSpotlight } from "@/components/ProductSpotlight";
import { ascuasLampDetails, chispaDetails, featureCards } from "@/lib/site";

export default function Home() {
  return (
    <>
      <Hero
        variant="home"
        backdrop={<AscuasHeroBackdrop />}
        eyebrow="Marca-laboratorio"
        title="Donde las ideas toman forma."
        subtitle="La chispa es la idea. La forma es el trabajo."
        description="Diseñamos y fabricamos objetos, sistemas y experiencias que conectan materia, interfaz e imaginación."
        primaryCta={{ label: "Entrar al laboratorio", href: "/laboratorio" }}
        secondaryCta={{ label: "Conocer a Ascuas", href: "/ascuas" }}
      />

      <section className="forge-section surface-noise">
        <div className="relative mx-auto grid max-w-7xl gap-12 px-5 py-20 sm:px-8 lg:grid-cols-[0.9fr_1.1fr] lg:py-24">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.28em] text-ember-200">
              Concepto
            </p>
            <h2 className="mt-5 max-w-xl text-4xl font-semibold leading-tight text-bone sm:text-5xl">
              Del primer destello a una pieza que se puede tocar, usar y activar.
            </h2>
          </div>
          <div className="grid gap-6 text-lg leading-9 text-bone/68">
            <p>
              La Fragua transforma ideas en objetos, sistemas y experiencias
              reales. No se queda en la impresión 3D ni en la pantalla: mezcla
              diseño, fabricación, IA, NFC, electrónica, luz y web apps para que
              cada proyecto encuentre su forma más honesta.
            </p>
            <p>
              Aquí una idea puede empezar como frase, boceto o necesidad difusa
              y acabar como prototipo, herramienta, producto, ritual o interfaz
              física-digital.
            </p>
          </div>
        </div>
      </section>

      <section className="forge-section bg-forge-950">
        <div className="relative mx-auto max-w-7xl px-5 py-20 sm:px-8 lg:py-24">
          <div className="max-w-2xl">
            <p className="text-xs font-semibold uppercase tracking-[0.28em] text-gold-100">
              Tres entradas
            </p>
            <h2 className="mt-5 text-4xl font-semibold leading-tight text-bone sm:text-5xl">
              Una misma fragua, tres maneras de entrar.
            </h2>
          </div>
          <div className="mt-12 grid gap-5 md:grid-cols-3">
            {featureCards.map((card) => (
              <FeatureCard key={card.title} {...card} />
            ))}
          </div>
        </div>
      </section>

      <section className="forge-section surface-noise">
        <div className="relative mx-auto grid max-w-7xl gap-16 px-5 py-20 sm:px-8 lg:py-24">
          <ProductSpotlight
            eyebrow="Primer producto"
            title="Ascuas empieza también como lámpara."
            description="Una pieza translúcida, cálida y fabricada capa a capa: luz de escritorio, objeto de presencia y primer producto físico de La Fragua."
            imageSrc="/images/ascuas-lamp-hero.png"
            imageAlt="Lámpara Ascuas encendida sobre una mesa"
            href="/productos"
            ctaLabel="Ver la lámpara"
            details={ascuasLampDetails.slice(0, 3)}
          />
          <ProductSpotlight
            eyebrow="Proyecto Chispa"
            title="Focus Mode tendrá un objeto propio."
            description="Chispa es el dispositivo que convierte el foco en un gesto físico: un soporte sobrio, conectado y preparado para abrir una experiencia digital mediante NFC."
            imageSrc="/images/proyecto-chispa-device.png"
            imageAlt="Dispositivo Proyecto Chispa para Focus Mode"
            href="/focus-mode"
            ctaLabel="Entrar en Proyecto Chispa"
            reverse
            details={chispaDetails}
          />
        </div>
      </section>

      <section className="forge-section surface-noise">
        <div className="relative mx-auto max-w-7xl px-5 py-20 sm:px-8 lg:py-24">
          <div className="mb-12 max-w-3xl">
            <p className="text-xs font-semibold uppercase tracking-[0.28em] text-ember-200">
              Proceso
            </p>
            <h2 className="mt-5 text-4xl font-semibold leading-tight text-bone sm:text-5xl">
              La forma aparece trabajando la idea, no adorándola.
            </h2>
          </div>
          <ProcessTimeline />
        </div>
      </section>

      <section className="bg-graphite-950">
        <div className="mx-auto max-w-7xl px-5 py-20 text-center sm:px-8 lg:py-24">
          <p className="text-xs font-semibold uppercase tracking-[0.32em] text-gold-100/80">
            La Fragua
          </p>
          <h2 className="mt-6 text-4xl font-semibold text-bone sm:text-6xl">
            Construyendo capa a capa.
          </h2>
        </div>
      </section>
    </>
  );
}
