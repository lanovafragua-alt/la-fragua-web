"use client";

import { ArrowRight, PackageCheck, Search, ShoppingBag, Truck, X } from "lucide-react";
import { useState } from "react";
import { StorefrontProductCard } from "@/components/StorefrontProductCard";
import { catalogProducts, contact, customProjectHref } from "@/lib/site";

const categories = [
  { id: "all", label: "Todos", slugs: [] },
  {
    id: "lighting", label: "Lámparas",
    slugs: ["ascuas", "lampara-personalizada-foto", "lampara-perrito"],
  },
  {
    id: "gaming", label: "Gaming",
    slugs: ["carcasas-nintendo-3ds-xl", "soporte-r4-gigante"],
  },
  {
    id: "desk", label: "Escritorio",
    slugs: ["chispa", "soporte-auriculares-modular"],
  },
  {
    id: "decoration", label: "Decoración",
    slugs: ["cartel-wanted-luffy-gear-5"],
  },
];

function searchable(value: string) {
  return value.normalize("NFD").replace(/[\u0300-\u036f]/g, "").toLowerCase();
}

export function Storefront() {
  const [category, setCategory] = useState("all");
  const [query, setQuery] = useState("");
  const selectedCategory = categories.find((item) => item.id === category)!;
  const products = catalogProducts.filter((product) => {
    const matchesCategory = category === "all" || selectedCategory.slugs.includes(product.slug);
    const matchesQuery = searchable(`${product.name} ${product.category} ${product.summary}`)
      .includes(searchable(query.trim()));
    return matchesCategory && matchesQuery;
  });

  return (
    <div className="storefront-page bg-white text-zinc-950">
      <section id="productos" className="mx-auto max-w-7xl scroll-mt-24 px-4 pb-12 pt-6 sm:px-6 lg:px-8 lg:pt-9">
        <div className="flex flex-wrap items-end justify-between gap-4">
          <div>
            <h1 className="text-3xl font-semibold leading-tight sm:text-4xl">
              La tienda de La Fragua.
            </h1>
            <p className="mt-2 text-sm text-zinc-600 sm:text-base">
              Objetos con fuego propio.
            </p>
          </div>
          <a href={contact.etsy} target="_blank" rel="noreferrer" className="hidden items-center gap-2 text-sm font-medium text-zinc-600 transition hover:text-zinc-950 sm:inline-flex">
            También en Etsy
            <ShoppingBag className="size-4" aria-hidden="true" />
          </a>
        </div>

        <div className="mt-6 flex flex-col-reverse gap-4 border-b border-zinc-200 pb-4 lg:flex-row lg:items-center lg:justify-between">
          <div role="group" aria-label="Categorías de productos" className="no-scrollbar flex gap-1 overflow-x-auto py-1">
            {categories.map((item) => (
              <button
                key={item.id}
                type="button"
                aria-pressed={category === item.id}
                onClick={() => setCategory(item.id)}
                className={`shrink-0 cursor-pointer rounded-md px-3 py-2 text-sm font-medium transition focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ember-500 ${category === item.id ? "bg-zinc-950 text-white" : "text-zinc-600 hover:bg-zinc-100 hover:text-zinc-950"}`}
              >
                {item.label}
              </button>
            ))}
          </div>
          <div className="relative w-full lg:w-72">
            <Search className="pointer-events-none absolute left-3 top-3 size-4 text-zinc-400" aria-hidden="true" />
            <input
              type="search"
              aria-label="Buscar productos"
              value={query}
              onChange={(event) => setQuery(event.target.value)}
              placeholder="Buscar en La Fragua"
              className="h-10 w-full rounded-md border border-zinc-200 bg-zinc-50 pl-9 pr-10 text-sm outline-none transition placeholder:text-zinc-500 focus:border-zinc-500 focus:bg-white focus:ring-2 focus:ring-zinc-200 [&::-webkit-search-cancel-button]:appearance-none"
            />
            {query && (
              <button type="button" onClick={() => setQuery("")} aria-label="Borrar búsqueda" title="Borrar búsqueda" className="absolute right-1 top-1 grid size-8 cursor-pointer place-items-center rounded text-zinc-500 hover:bg-zinc-200">
                <X className="size-4" aria-hidden="true" />
              </button>
            )}
          </div>
        </div>

        <div className="flex flex-wrap items-center justify-between gap-2 py-4 text-xs text-zinc-500">
          <p role="status" aria-live="polite">
            {products.length} {products.length === 1 ? "producto" : "productos"}
          </p>
          <p className="flex items-center gap-1.5">
            <Truck className="size-3.5" aria-hidden="true" />Nacex con seguimiento
          </p>
        </div>

        {products.length ? (
          <div className="grid grid-cols-2 items-stretch gap-x-3 gap-y-8 sm:gap-x-5 sm:gap-y-10 md:grid-cols-3 xl:grid-cols-4">
            {products.map((product, index) => (
              <StorefrontProductCard key={product.slug} product={product} priority={index < 4} />
            ))}
          </div>
        ) : (
          <div className="py-20 text-center">
            <Search className="mx-auto size-6 text-zinc-400" aria-hidden="true" />
            <h2 className="mt-4 text-xl font-semibold">No encontramos ese producto.</h2>
            <button
              type="button"
              onClick={() => { setCategory("all"); setQuery(""); }}
              className="mt-5 cursor-pointer rounded-md bg-zinc-950 px-4 py-3 text-sm font-medium text-white"
            >
              Ver todos los productos
            </button>
          </div>
        )}
      </section>

      <section className="border-y border-zinc-200 bg-zinc-50">
        <div className="mx-auto flex max-w-7xl flex-col items-start justify-between gap-5 px-4 py-9 sm:px-6 md:flex-row md:items-center lg:px-8">
          <div>
            <h2 className="text-2xl font-semibold">¿Tienes una idea propia?</h2>
            <p className="mt-2 max-w-xl text-sm leading-6 text-zinc-600">
              Una lámpara personalizada, una pieza a medida o ese proyecto que tienes en mente.
            </p>
          </div>
          <a href={customProjectHref} className="inline-flex shrink-0 items-center gap-2 rounded-md bg-zinc-950 px-4 py-3 text-sm font-semibold text-white transition hover:bg-ember-500">
            Pedir una pieza a medida<ArrowRight className="size-4" aria-hidden="true" />
          </a>
        </div>
      </section>

      <div className="mx-auto flex max-w-7xl flex-wrap gap-x-8 gap-y-3 px-4 py-6 text-xs leading-5 text-zinc-600 sm:px-6 lg:px-8">
        <span className="flex items-center gap-2"><PackageCheck className="size-4 shrink-0" aria-hidden="true" />Diseño y fabricación en La Fragua</span>
        <span className="flex items-center gap-2"><Truck className="size-4 shrink-0" aria-hidden="true" />Condiciones de envío en cada producto</span>
        <a href={contact.etsy} target="_blank" rel="noreferrer" className="flex items-center gap-2 underline underline-offset-4 hover:text-zinc-950"><ShoppingBag className="size-4 shrink-0" aria-hidden="true" />Comprar en Etsy</a>
      </div>
    </div>
  );
}
