import type { Metadata } from "next";
import { Hero } from "@/components/Hero";

export const metadata: Metadata = {
  title: "Contacto",
  description:
    "Contacto con La Fragua para proyectos, prototipos, productos y experiencias físicas-digitales.",
};

export default function ContactoPage() {
  return (
    <>
      <Hero
        imageSrc="/images/hero-forge-lab.png"
        eyebrow="Contacto"
        title="Trae la chispa. La bajamos a materia."
        description="Cuéntanos qué quieres construir, qué problema necesitas resolver o qué experiencia imaginas. Empezamos por encontrar la primera forma útil."
        primaryCta={{ label: "Enviar email", href: "mailto:hola@lafragua.studio" }}
        secondaryCta={{ label: "Entrar al laboratorio", href: "/laboratorio" }}
      />

      <section className="forge-section">
        <div className="relative mx-auto grid max-w-7xl gap-12 px-5 py-20 sm:px-8 lg:grid-cols-[0.78fr_1.22fr] lg:py-24">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.28em] text-gold-100">
              Primer contacto
            </p>
            <h2 className="mt-5 text-4xl font-semibold leading-tight text-bone sm:text-5xl">
              Un buen encargo empieza con una conversación concreta.
            </h2>
            <p className="mt-6 text-lg leading-8 text-bone/64">
              Si ya tienes bocetos, referencias, medidas o una idea rara todavía
              sin ordenar, todo sirve. La primera respuesta puede ser un mapa,
              una propuesta de prototipo o una lista de pruebas.
            </p>
          </div>

          <form
            action="mailto:hola@lafragua.studio"
            method="post"
            encType="text/plain"
            className="grid gap-5 rounded-lg border border-white/10 bg-white/[0.035] p-6"
          >
            <label className="grid gap-2 text-sm font-medium text-bone/78">
              Nombre
              <input
                name="nombre"
                className="rounded-md border border-white/12 bg-black/24 px-4 py-3 text-bone outline-none transition placeholder:text-bone/35 focus:border-ember-300/70"
                placeholder="Tu nombre"
              />
            </label>
            <label className="grid gap-2 text-sm font-medium text-bone/78">
              Email
              <input
                name="email"
                type="email"
                className="rounded-md border border-white/12 bg-black/24 px-4 py-3 text-bone outline-none transition placeholder:text-bone/35 focus:border-ember-300/70"
                placeholder="tu@email.com"
              />
            </label>
            <label className="grid gap-2 text-sm font-medium text-bone/78">
              Idea o proyecto
              <textarea
                name="mensaje"
                rows={7}
                className="resize-y rounded-md border border-white/12 bg-black/24 px-4 py-3 text-bone outline-none transition placeholder:text-bone/35 focus:border-ember-300/70"
                placeholder="Qué quieres crear, prototipar o activar..."
              />
            </label>
            <button
              type="submit"
              className="rounded-full bg-ember-500 px-5 py-3 text-sm font-semibold text-forge-950 transition hover:bg-ember-300"
            >
              Abrir conversación
            </button>
          </form>
        </div>
      </section>
    </>
  );
}
