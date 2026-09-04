import type { Metadata } from "next";
import { ArrowRight, ShoppingBag } from "lucide-react";
import { CatalogContact } from "@/components/CatalogContact";
import { ProductCard } from "@/components/ProductCard";
import { catalogProducts, contact, shopPromises } from "@/lib/site";

export const metadata: Metadata = {
  title: "Tienda",
  description:
    "Tienda de La Fragua: lámparas, accesorios gaming, decoración impresa en 3D y encargos personalizados.",
};

export default function TiendaPage() {
  return (
    <div className="relative isolate overflow-hidden bg-[#090807] text-bone">
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_72%_10%,rgba(214,166,74,0.14),transparent_28rem),radial-gradient(circle_at_12%_72%,rgba(240,93,35,0.13),transparent_25rem)]" />
      <div className="pointer-events-none absolute inset-0 surface-noise opacity-60" />

      <section className="relative mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8 lg:py-16">
        <div className="grid gap-7 lg:grid-cols-[0.78fr_1.22fr] lg:items-end">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.24em] text-ember-200">
              Tienda La Fragua
            </p>
            <h1 className="mt-4 text-5xl font-semibold leading-none sm:text-7xl">
              Todo lo que sale del taller.
            </h1>
            <p className="mt-5 max-w-2xl text-base leading-7 text-bone/68 sm:text-xl sm:leading-8">
              Compra directa, Etsy o correo para piezas personalizadas. Todos
              los precios incluyen envío por Nacex.
            </p>
            <a
              href={contact.etsy}
              target="_blank"
              rel="noreferrer"
              className="mt-7 inline-flex items-center gap-2 rounded-full bg-ember-500 px-5 py-4 text-sm font-semibold text-white transition hover:bg-ember-300"
            >
              Abrir Etsy
              <ShoppingBag className="size-4" aria-hidden="true" />
            </a>
          </div>

          <div className="grid gap-3 sm:grid-cols-3">
            {shopPromises.map((promise) => (
              <p
                key={promise}
                className="rounded-md border border-white/10 bg-white/[0.04] px-4 py-3 text-sm leading-6 text-bone/62"
              >
                {promise}
              </p>
            ))}
          </div>
        </div>
      </section>

      <section className="relative mx-auto max-w-7xl px-4 pb-14 sm:px-6 lg:px-8">
        <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-3">
          {catalogProducts.map((product, index) => (
            <ProductCard
              key={product.slug}
              product={product}
              priority={index < 2}
            />
          ))}
        </div>
      </section>

      <section className="relative mx-auto max-w-7xl px-4 pb-16 sm:px-6 lg:px-8">
        <div className="rounded-lg border border-white/10 bg-white/[0.045] p-5 shadow-[0_20px_70px_rgba(0,0,0,0.22)] sm:p-6">
          <div className="grid gap-5 lg:grid-cols-[1fr_auto] lg:items-center">
            <div>
              <p className="text-xs font-semibold uppercase tracking-[0.24em] text-gold-100">
                Encargos y variantes
              </p>
              <h2 className="mt-3 text-3xl font-semibold leading-tight text-bone">
                Si necesitas otro color, diseño o una pieza a medida, escríbeme.
              </h2>
              <p className="mt-3 text-sm leading-7 text-bone/62">
                Puedes comprar por Etsy o contactar directamente para ajustar
                una idea antes de fabricarla.
              </p>
            </div>
            <a
              href="#contacto"
              className="inline-flex items-center justify-center gap-2 rounded-full border border-gold-300/30 px-5 py-4 text-sm font-semibold text-gold-100 transition hover:border-gold-200/60 hover:bg-gold-300/10"
            >
              Contacto
              <ArrowRight className="size-4" aria-hidden="true" />
            </a>
          </div>
        </div>
      </section>

      <section className="relative mx-auto max-w-7xl px-4 pb-16 sm:px-6 lg:px-8">
        <CatalogContact />
      </section>
    </div>
  );
}
