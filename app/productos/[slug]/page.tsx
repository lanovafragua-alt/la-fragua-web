import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import {
  ArrowLeft,
  ArrowRight,
  CheckCircle2,
  Mail,
  PackageCheck,
  ShoppingBag,
  Truck,
} from "lucide-react";
import { CatalogContact } from "@/components/CatalogContact";
import { ProductAnalytics } from "@/components/ProductAnalytics";
import { ProductVisual } from "@/components/ProductVisual";
import { catalogProducts, productBySlug } from "@/lib/site";

type ProductPageProps = {
  params: Promise<{ slug: string }>;
};

export const dynamicParams = false;

export function generateStaticParams() {
  return catalogProducts
    .filter((product) => product.href.startsWith("/productos/"))
    .map((product) => ({ slug: product.slug }));
}

export async function generateMetadata({
  params,
}: ProductPageProps): Promise<Metadata> {
  const { slug } = await params;
  const product = productBySlug(slug);

  if (!product) {
    return {};
  }

  return {
    title: product.name,
    description: product.summary,
  };
}

export default async function ProductPage({ params }: ProductPageProps) {
  const { slug } = await params;
  const product = productBySlug(slug);

  if (!product || !product.href.startsWith("/productos/")) {
    notFound();
  }

  const isMail = product.purchaseHref.startsWith("mailto:");
  const isExternal = product.purchaseHref.startsWith("http");
  const PurchaseIcon = isMail ? Mail : ShoppingBag;
  const galleryItems = product.gallery ?? [];

  return (
    <div className="product-spark-field relative isolate overflow-hidden text-zinc-950">
      <ProductAnalytics product={product.name} />
      <section className="relative mx-auto grid max-w-7xl gap-8 px-4 pb-10 pt-5 sm:px-6 lg:grid-cols-[minmax(0,1.02fr)_minmax(360px,0.72fr)] lg:gap-10 lg:px-8 lg:pb-16 lg:pt-8">
        <div>
          <Link
            href="/tienda"
            className="inline-flex items-center gap-2 text-sm font-semibold text-zinc-600 transition hover:text-zinc-950"
          >
            <ArrowLeft className="size-4" aria-hidden="true" />
            Volver a tienda
          </Link>

          <div className="mt-6">
            <ProductVisual
              product={product}
              showNeeds={!product.imageSrc}
              className="aspect-[4/5] min-h-[420px] sm:min-h-[560px]"
              priority
            />
          </div>
        </div>

        <aside className="lg:sticky lg:top-24 lg:self-start">
          <div className="rounded-lg border border-zinc-950/10 bg-white/88 p-5 shadow-[0_20px_70px_rgba(24,20,12,0.08)] backdrop-blur sm:p-6">
            <div className="flex flex-wrap gap-2">
              <span className="inline-flex items-center gap-2 rounded-full border border-ember-500/20 bg-ember-500/10 px-3 py-1 text-xs font-semibold uppercase tracking-[0.18em] text-ember-500">
                <PackageCheck className="size-3.5" aria-hidden="true" />
                {product.eyebrow}
              </span>
              <span className="inline-flex rounded-full border border-zinc-950/10 bg-zinc-950/[0.04] px-3 py-1 text-xs font-semibold uppercase tracking-[0.18em] text-zinc-600">
                {product.category}
              </span>
            </div>

            <h1 className="mt-5 text-5xl font-semibold leading-[0.95] text-zinc-950 sm:text-6xl">
              {product.name}
            </h1>
            <p className="mt-4 text-xl leading-8 text-zinc-700">
              {product.subtitle}
            </p>

            <div className="mt-6 rounded-lg border border-zinc-950/10 bg-[#fffaf1] p-4">
              <p className="text-xs font-semibold uppercase tracking-[0.2em] text-zinc-500">
                Precio
              </p>
              <div className="mt-2 flex flex-wrap items-end gap-x-4 gap-y-1">
                <p className="text-5xl font-semibold tracking-tight text-zinc-950">
                  {product.price}
                </p>
                {product.compareAtPrice ? (
                  <p className="pb-1 text-lg font-medium text-zinc-500 line-through">
                    {product.compareAtPrice}
                  </p>
                ) : null}
              </div>
              <p className="mt-3 text-sm leading-6 text-zinc-600">
                {product.shipping}
              </p>
            </div>

            <div className="mt-4 flex items-start gap-3 rounded-md border border-zinc-950/10 bg-zinc-950/[0.035] p-4">
              <Truck className="mt-0.5 size-5 shrink-0 text-ember-500" />
              <p className="text-sm leading-6 text-zinc-700">
                {product.prepTime}
              </p>
            </div>

            <p className="mt-6 text-base leading-8 text-zinc-700">
              {product.summary}
            </p>

            <a
              href={product.purchaseHref}
              target={isExternal ? "_blank" : undefined}
              rel={isExternal ? "noreferrer" : undefined}
              className="mt-7 inline-flex w-full items-center justify-center gap-2 rounded-full bg-ember-500 px-5 py-4 text-sm font-semibold text-white shadow-[0_16px_40px_rgba(240,93,35,0.24)] transition hover:bg-ember-300"
            >
              {product.purchaseLabel}
              <PurchaseIcon className="size-4" aria-hidden="true" />
            </a>

            <div className="mt-5 grid gap-3">
              {product.details.map((detail) => (
                <div
                  key={detail}
                  className="flex items-start gap-3 text-sm leading-6 text-zinc-700"
                >
                  <CheckCircle2
                    className="mt-0.5 size-4 shrink-0 text-ember-500"
                    aria-hidden="true"
                  />
                  {detail}
                </div>
              ))}
            </div>
          </div>
        </aside>
      </section>

      <section className="relative mx-auto grid max-w-7xl gap-5 px-4 py-8 sm:px-6 lg:grid-cols-2 lg:px-8 lg:py-12">
        {product.variants ? (
          <article className="rounded-lg border border-zinc-950/10 bg-white/82 p-5 shadow-[0_18px_60px_rgba(24,20,12,0.07)] backdrop-blur sm:p-6">
            <p className="text-xs font-semibold uppercase tracking-[0.24em] text-ember-500">
              Opciones
            </p>
            <h2 className="mt-3 text-3xl font-semibold leading-tight text-zinc-950">
              Versiones disponibles.
            </h2>
            <div className="mt-5 flex flex-wrap gap-2">
              {product.variants.map((variant) => (
                <span
                  key={variant}
                  className="rounded-full border border-zinc-950/10 bg-[#fffaf1] px-3 py-2 text-sm font-semibold text-zinc-700"
                >
                  {variant}
                </span>
              ))}
            </div>
          </article>
        ) : null}

        {galleryItems.length > 0 ? (
          <article className="rounded-lg border border-zinc-950/10 bg-white/82 p-5 shadow-[0_18px_60px_rgba(24,20,12,0.07)] backdrop-blur sm:p-6 lg:col-span-2">
            <p className="text-xs font-semibold uppercase tracking-[0.24em] text-ember-500">
              Galería
            </p>
            <h2 className="mt-3 text-3xl font-semibold leading-tight text-zinc-950">
              Fotos reales del producto.
            </h2>
            <div className="mt-5 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
              {galleryItems.map((item) => (
                <figure
                  key={item.src}
                  className="overflow-hidden rounded-md border border-zinc-950/10 bg-white"
                >
                  <Image
                    src={item.src}
                    alt={item.alt}
                    width={1129}
                    height={2000}
                    sizes="(max-width: 768px) 92vw, (max-width: 1280px) 45vw, 300px"
                    className={`aspect-[4/5] w-full bg-[#fffaf1] ${
                      item.fit === "contain" ? "object-contain" : "object-cover"
                    }`}
                  />
                  <figcaption className="px-3 py-2 text-xs font-semibold uppercase tracking-[0.18em] text-zinc-500">
                    {item.label}
                  </figcaption>
                </figure>
              ))}
            </div>
          </article>
        ) : (
          <article className="rounded-lg border border-zinc-950/10 bg-white/82 p-5 shadow-[0_18px_60px_rgba(24,20,12,0.07)] backdrop-blur sm:p-6">
            <p className="text-xs font-semibold uppercase tracking-[0.24em] text-ember-500">
              Fotos para añadir
            </p>
            <h2 className="mt-3 text-3xl font-semibold leading-tight text-zinc-950">
              Huecos preparados para las imágenes finales.
            </h2>
            <ul className="mt-5 grid gap-3">
              {product.photoNeeds.map((need) => (
                <li
                  key={need}
                  className="flex items-start gap-3 text-sm leading-6 text-zinc-700"
                >
                  <span className="mt-2 h-1.5 w-5 shrink-0 rounded-full bg-ember-500" />
                  {need}
                </li>
              ))}
            </ul>
          </article>
        )}
      </section>

      {product.disclaimer ? (
        <section className="relative mx-auto max-w-7xl px-4 py-4 sm:px-6 lg:px-8">
          <p className="rounded-lg border border-zinc-950/10 bg-white/72 p-4 text-sm leading-6 text-zinc-600 backdrop-blur">
            {product.disclaimer}
          </p>
        </section>
      ) : null}

      <section className="relative mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8 lg:py-16">
        <CatalogContact variant="light" />
      </section>

      <section className="relative mx-auto max-w-7xl px-4 pb-16 text-center sm:px-6 lg:px-8">
        <Link
          href="/tienda"
          className="inline-flex items-center justify-center gap-2 rounded-full bg-zinc-950 px-5 py-4 text-sm font-semibold text-white transition hover:bg-ember-500"
        >
          Ver todos los productos
          <ArrowRight className="size-4" aria-hidden="true" />
        </Link>
      </section>
    </div>
  );
}
