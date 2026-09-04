import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import {
  ArrowRight,
  Flame,
  Hammer,
  PackageCheck,
  ShoppingBag,
  Sparkles,
} from "lucide-react";
import { CatalogContact } from "@/components/CatalogContact";
import { DecisionCard } from "@/components/DecisionCard";
import { ProductCard } from "@/components/ProductCard";
import {
  catalogProducts,
  contact,
  customProjectHref,
  homeChoices,
  shopPromises,
} from "@/lib/site";

export const metadata: Metadata = {
  title: "La Fragua",
  description:
    "Catálogo de La Fragua: Ascuas, Chispa, piezas gaming, lámparas personalizadas y decoración impresa en 3D.",
};

export default function Home() {
  return (
    <div className="relative isolate overflow-hidden bg-[#090807] text-bone">
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_52%_10%,rgba(240,93,35,0.18),transparent_28rem),radial-gradient(circle_at_12%_82%,rgba(214,166,74,0.1),transparent_24rem)]" />
      <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.028)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.018)_1px,transparent_1px)] bg-[size:42px_42px] opacity-70" />

      <section className="relative mx-auto flex min-h-[calc(100svh-73px)] max-w-7xl flex-col gap-7 px-4 py-7 sm:px-6 lg:px-8 lg:py-10">
        <div className="grid gap-5 lg:grid-cols-[1fr_320px] lg:items-end">
          <div className="max-w-3xl">
            <p className="text-xs font-semibold uppercase tracking-[0.26em] text-ember-200">
              La Fragua
            </p>
            <h1 className="mt-4 text-5xl font-semibold leading-[0.95] text-bone sm:text-7xl">
              Objetos con fuego propio.
            </h1>
            <p className="mt-5 max-w-2xl text-base leading-7 text-bone/68 sm:text-xl sm:leading-8">
              Lámparas, piezas gaming, decoración y encargos impresos en 3D,
              listos para comprar o pedir a medida.
            </p>

            <div className="mt-7 flex flex-wrap gap-3">
              <a
                href="#productos"
                className="inline-flex items-center gap-2 rounded-full bg-ember-500 px-5 py-4 text-sm font-semibold text-white transition hover:bg-ember-300"
              >
                Ver productos
                <ArrowRight className="size-4" aria-hidden="true" />
              </a>
              <a
                href={contact.etsy}
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-2 rounded-full border border-gold-300/30 px-5 py-4 text-sm font-semibold text-gold-100 transition hover:border-gold-200/60 hover:bg-gold-300/10"
              >
                Tienda Etsy
                <ShoppingBag className="size-4" aria-hidden="true" />
              </a>
            </div>
          </div>

          <div className="relative overflow-hidden rounded-lg border border-ember-300/18 bg-white/[0.045] p-4 shadow-[0_22px_70px_rgba(0,0,0,0.28)] sm:p-5">
            <div className="flex items-center gap-4">
              <div className="ember-breath grid size-20 shrink-0 place-items-center overflow-hidden rounded-full bg-black sm:size-24">
                <Image
                  src="/images/ascuas-guide.png"
                  alt="Ascuas, guía de La Fragua"
                  width={180}
                  height={180}
                  className="h-full w-full scale-125 object-contain"
                />
              </div>
              <div>
                <p className="text-xs font-semibold uppercase tracking-[0.22em] text-ember-200">
                  Ascuas te guía
                </p>
                <p className="mt-2 text-sm leading-6 text-bone/66">
                  Si vienes desde redes, aquí decides rápido: producto, encargo
                  o tienda.
                </p>
              </div>
            </div>
          </div>
        </div>

        <div className="grid gap-4 lg:grid-cols-2">
          {homeChoices.map((choice) => (
            <DecisionCard key={choice.title} {...choice} />
          ))}
        </div>
      </section>

      <section
        id="productos"
        className="relative mx-auto max-w-7xl scroll-mt-24 px-4 py-14 sm:px-6 lg:px-8 lg:py-20"
      >
        <div className="grid gap-6 lg:grid-cols-[0.8fr_1.2fr] lg:items-end">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.24em] text-ember-200">
              Catálogo
            </p>
            <h2 className="mt-3 text-4xl font-semibold leading-tight text-bone sm:text-5xl">
              Productos de La Fragua.
            </h2>
          </div>
          <div className="grid gap-3 sm:grid-cols-3">
            {shopPromises.map((promise) => (
              <p
                key={promise}
                className="flex items-start gap-2 rounded-md border border-white/10 bg-white/[0.04] px-4 py-3 text-sm leading-6 text-bone/62"
              >
                <PackageCheck
                  className="mt-0.5 size-4 shrink-0 text-ember-200"
                  aria-hidden="true"
                />
                {promise}
              </p>
            ))}
          </div>
        </div>

        <div className="mt-8 grid gap-5 md:grid-cols-2 xl:grid-cols-3">
          {catalogProducts.map((product, index) => (
            <ProductCard
              key={product.slug}
              product={product}
              priority={index < 2}
            />
          ))}
        </div>
      </section>

      <section className="relative mx-auto grid max-w-7xl gap-5 px-4 py-8 sm:px-6 md:grid-cols-2 lg:px-8">
        <article className="rounded-lg border border-white/10 bg-white/[0.045] p-5 shadow-[0_20px_70px_rgba(0,0,0,0.22)] sm:p-6">
          <div className="mb-5 inline-flex size-11 items-center justify-center rounded-full bg-ember-500/12 text-ember-200">
            <Hammer className="size-5" aria-hidden="true" />
          </div>
          <p className="text-xs font-semibold uppercase tracking-[0.24em] text-gold-100">
            Elabora tu proyecto
          </p>
          <h2 className="mt-3 text-3xl font-semibold leading-tight text-bone">
            Trae la idea. La bajamos a objeto.
          </h2>
          <p className="mt-4 text-sm leading-7 text-bone/62">
            Prototipos, carcasas, soportes, iluminación, piezas a medida o
            pequeños sistemas físicos-digitales.
          </p>
          <a
            href={customProjectHref}
            className="mt-6 inline-flex items-center gap-2 rounded-full border border-gold-300/30 px-4 py-3 text-sm font-semibold text-gold-100 transition hover:border-gold-200/60 hover:bg-gold-300/10"
          >
            Contar una idea
            <ArrowRight className="size-4" aria-hidden="true" />
          </a>
        </article>

        <article className="rounded-lg border border-white/10 bg-white/[0.045] p-5 shadow-[0_20px_70px_rgba(0,0,0,0.22)] sm:p-6">
          <div className="mb-5 inline-flex size-11 items-center justify-center rounded-full bg-gold-300/12 text-gold-100">
            <Flame className="size-5" aria-hidden="true" />
          </div>
          <p className="text-xs font-semibold uppercase tracking-[0.24em] text-ember-200">
            Decoración con intención
          </p>
          <h2 className="mt-3 text-3xl font-semibold leading-tight text-bone">
            Luz, forma y presencia para que un rincón cambie.
          </h2>
          <p className="mt-4 text-sm leading-7 text-bone/62">
            Piezas pequeñas, reconocibles y con carácter: para escritorios,
            habitaciones, setups, regalos y pared.
          </p>
          <Link
            href="/tienda"
            className="mt-6 inline-flex items-center gap-2 rounded-full border border-ember-300/30 px-4 py-3 text-sm font-semibold text-ember-200 transition hover:border-ember-200/60 hover:bg-ember-500/10"
          >
            Ver la tienda
            <ArrowRight className="size-4" aria-hidden="true" />
          </Link>
        </article>
      </section>

      <section className="relative mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8 lg:py-16">
        <CatalogContact />
      </section>

      <div className="relative mx-auto flex max-w-7xl flex-wrap gap-2 px-4 pb-10 text-xs font-semibold uppercase tracking-[0.18em] text-bone/42 sm:px-6 lg:px-8">
        <span className="inline-flex items-center gap-2 rounded-full border border-white/8 px-3 py-2">
          <Sparkles className="size-3.5 text-ember-200" aria-hidden="true" />
          3D
        </span>
        <span className="rounded-full border border-white/8 px-3 py-2">
          luz
        </span>
        <span className="rounded-full border border-white/8 px-3 py-2">
          gaming
        </span>
        <span className="rounded-full border border-white/8 px-3 py-2">
          decoración
        </span>
        <span className="rounded-full border border-white/8 px-3 py-2">
          piezas a medida
        </span>
      </div>
    </div>
  );
}
