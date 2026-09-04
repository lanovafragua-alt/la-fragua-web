import type { Metadata } from "next";
import Image from "next/image";
import {
  ArrowDown,
  ArrowUp,
  BadgePercent,
  ExternalLink,
  Flame,
  Mail,
  PackageCheck,
  Phone,
  ShieldCheck,
  Sparkles,
  Truck,
} from "lucide-react";
import { AscuasProductGallery } from "@/components/AscuasProductGallery";
import { AscuasProductModel } from "@/components/AscuasProductModel";
import { ProductAnalytics } from "@/components/ProductAnalytics";
import { PurchaseLeadForm } from "@/components/PurchaseLeadForm";
import {
  ascuasProcessBlocks,
  ascuasProduct,
  ascuasProductDetails,
  ascuasProductGallery,
} from "@/lib/site";

const ascuasContactLinks = [
  {
    label: "Instagram",
    href: "https://www.instagram.com/ascuas.lafragua/",
    value: "@ascuas.lafragua",
    icon: ExternalLink,
  },
  {
    label: "TikTok",
    href: "https://www.tiktok.com/@ascuas.la.fragua",
    value: "@ascuas.la.fragua",
    icon: ExternalLink,
  },
  {
    label: "Etsy",
    href: "https://www.etsy.com/shop/LaFraguaDeAscuas",
    value: "LaFraguaDeAscuas",
    icon: ExternalLink,
  },
  {
    label: "Facebook",
    href: "https://www.facebook.com/profile.php?id=61590603422100",
    value: "Ascuas La Fragua",
    icon: ExternalLink,
  },
  {
    label: "Correo",
    href: "mailto:lanovafragua@gmail.com",
    value: "lanovafragua@gmail.com",
    icon: Mail,
  },
  {
    label: "Teléfono",
    href: "tel:+34638897236",
    value: "638 89 72 36",
    icon: Phone,
  },
] as const;

export const metadata: Metadata = {
  title: "Lámpara Ascuas",
  description:
    "Compra la Lámpara Ascuas de La Fragua: oferta de lanzamiento 39,90€, envío incluido por Nacex y seguimiento 24/48h.",
};

export default function AscuasPage() {
  return (
    <div
      id="top"
      className="product-spark-field relative isolate overflow-hidden text-zinc-950"
    >
      <ProductAnalytics product={ascuasProduct.name} />
      <section className="relative mx-auto grid max-w-7xl gap-7 px-4 pb-10 pt-5 sm:px-6 lg:grid-cols-[minmax(0,1.06fr)_minmax(360px,0.7fr)] lg:gap-10 lg:px-8 lg:pb-16 lg:pt-8">
        <div>
          <AscuasProductGallery items={ascuasProductGallery} />
        </div>

        <aside className="lg:sticky lg:top-24 lg:self-start">
          <div className="rounded-lg border border-zinc-950/10 bg-white/88 p-5 shadow-[0_20px_70px_rgba(24,20,12,0.08)] backdrop-blur sm:p-6">
            <div className="flex flex-wrap gap-2">
              <span className="inline-flex items-center gap-2 rounded-full border border-ember-500/20 bg-ember-500/10 px-3 py-1 text-xs font-semibold uppercase tracking-[0.18em] text-ember-500">
                <Flame className="size-3.5" aria-hidden="true" />
                Producto 01
              </span>
              <span className="inline-flex items-center gap-2 rounded-full border border-zinc-950/10 bg-zinc-950/[0.04] px-3 py-1 text-xs font-semibold uppercase tracking-[0.18em] text-zinc-600">
                <PackageCheck className="size-3.5" aria-hidden="true" />
                Pedido online
              </span>
            </div>

            <h1 className="mt-5 text-5xl font-semibold leading-[0.95] text-zinc-950 sm:text-6xl">
              {ascuasProduct.name}
            </h1>
            <p className="mt-4 text-xl leading-8 text-zinc-700">
              {ascuasProduct.subtitle}
            </p>

            <div className="mt-6 overflow-hidden rounded-lg border border-ember-500/18 bg-[#fff4df]">
              <div className="flex items-center gap-2 border-b border-ember-500/12 bg-ember-500/10 px-4 py-3 text-xs font-semibold uppercase tracking-[0.2em] text-ember-500">
                <BadgePercent className="size-4" aria-hidden="true" />
                {ascuasProduct.offerLabel}
              </div>
              <div className="p-4">
                <div className="flex flex-wrap items-end gap-x-4 gap-y-1">
                  <p className="text-5xl font-semibold tracking-tight text-zinc-950">
                    {ascuasProduct.launchPrice}
                  </p>
                  <p className="pb-1 text-lg font-medium text-zinc-500 line-through">
                    {ascuasProduct.officialPrice}
                  </p>
                </div>
                <p className="mt-3 text-sm font-semibold text-zinc-800">
                  {ascuasProduct.offerNote}
                </p>
                <p className="mt-2 text-sm leading-6 text-zinc-600">
                  Después de las 3 primeras unidades, el precio oficial será de{" "}
                  {ascuasProduct.officialPrice}.
                </p>
              </div>
            </div>

            <div className="mt-4 flex items-start gap-3 rounded-md border border-zinc-950/10 bg-zinc-950/[0.035] p-4">
              <Truck className="mt-0.5 size-5 shrink-0 text-ember-500" />
              <p className="text-sm leading-6 text-zinc-700">
                {ascuasProduct.shipping}
              </p>
            </div>

            <p className="mt-6 text-base leading-8 text-zinc-700">
              {ascuasProduct.shortDescription}
            </p>

            <div className="mt-5 flex items-center gap-3 rounded-md border border-ember-500/14 bg-ember-500/[0.06] p-3">
              <span className="grid size-14 shrink-0 place-items-center overflow-hidden rounded-full bg-black">
                <Image
                  src="/images/ascuas-guide.png"
                  alt="Ascuas, guía de La Fragua"
                  width={112}
                  height={112}
                  className="h-full w-full scale-125 object-contain"
                />
              </span>
              <p className="text-sm leading-6 text-zinc-700">
                Ascuas te enseña la pieza final antes de pasar al pedido.
              </p>
            </div>

            <a
              href="#pedido"
              data-analytics-event="purchase_intent"
              data-analytics-placement="product_summary"
              className="mt-7 inline-flex w-full items-center justify-center gap-2 rounded-full bg-ember-500 px-5 py-4 text-sm font-semibold text-white shadow-[0_16px_40px_rgba(240,93,35,0.24)] transition hover:bg-ember-300"
            >
              Comprar ahora
              <ArrowDown className="size-4" aria-hidden="true" />
            </a>

            <div className="mt-5 grid gap-3">
              {ascuasProductDetails.map((detail) => (
                <div
                  key={detail}
                  className="flex items-start gap-3 text-sm leading-6 text-zinc-700"
                >
                  <span className="mt-2 h-1.5 w-5 shrink-0 rounded-full bg-ember-500" />
                  {detail}
                </div>
              ))}
            </div>

            <div className="mt-6 flex items-start gap-3 rounded-md border border-zinc-950/10 bg-zinc-950/[0.035] p-4">
              <ShieldCheck className="mt-0.5 size-5 shrink-0 text-zinc-700" />
              <p className="text-sm leading-6 text-zinc-600">
                Primero dejas los datos de envío. Después continúas a Stripe.
              </p>
            </div>
          </div>
        </aside>
      </section>

      <section className="relative mx-auto grid max-w-7xl gap-8 px-4 py-10 sm:px-6 lg:grid-cols-[0.82fr_1.18fr] lg:px-8 lg:py-14">
        <div>
          <p className="text-xs font-semibold uppercase tracking-[0.24em] text-ember-500">
            Descripción
          </p>
          <h2 className="mt-3 text-4xl font-semibold leading-tight text-zinc-950">
            Una pieza de luz que no parece otra lámpara.
          </h2>
        </div>
        <p className="text-lg leading-9 text-zinc-700">
          {ascuasProduct.description}
        </p>
      </section>

      <section className="relative mx-auto max-w-7xl px-4 py-6 sm:px-6 lg:px-8">
        <PurchaseLeadForm
          productName={ascuasProduct.name}
          stripeUrl={ascuasProduct.stripeUrl}
        />
      </section>

      <section className="relative mx-auto max-w-7xl px-4 py-14 sm:px-6 lg:px-8 lg:py-20">
        <div className="max-w-2xl">
          <p className="text-xs font-semibold uppercase tracking-[0.24em] text-ember-500">
            Después de decidir
          </p>
          <h2 className="mt-3 text-4xl font-semibold leading-tight text-zinc-950 sm:text-5xl">
            El proceso también forma parte de Ascuas.
          </h2>
        </div>

        <div className="mt-8 grid gap-5 md:grid-cols-2 lg:grid-cols-3">
          {ascuasProcessBlocks.map((block) => {
            const isWideImage = block.imageSrc.includes("ascuas-modelo-3d");

            return (
              <article
                key={block.title}
                className="process-card overflow-hidden rounded-lg border border-zinc-950/10 bg-white shadow-[0_18px_60px_rgba(24,20,12,0.08)]"
              >
                <Image
                  src={block.imageSrc}
                  alt={block.imageAlt}
                  width={isWideImage ? 1600 : 1440}
                  height={isWideImage ? 900 : 2550}
                  className={`${isWideImage ? "aspect-video" : "aspect-[4/5]"} w-full object-cover`}
                />
                <div className="p-5">
                  <div className="mb-4 inline-flex rounded-full bg-ember-500/10 px-3 py-1 text-xs font-semibold uppercase tracking-[0.18em] text-ember-500">
                    <Sparkles className="mr-2 size-3.5" aria-hidden="true" />
                    {block.title}
                  </div>
                  <p className="text-base leading-7 text-zinc-700">
                    {block.text}
                  </p>
                </div>
              </article>
            );
          })}
        </div>
      </section>

      <section className="relative mx-auto max-w-6xl px-4 pb-20 sm:px-6 lg:px-8">
        <div className="text-center">
          <a
            href="#top"
            className="inline-flex items-center justify-center gap-2 rounded-full bg-zinc-950 px-5 py-4 text-sm font-semibold text-white shadow-[0_16px_44px_rgba(24,20,12,0.16)] transition hover:bg-ember-500"
          >
            Volver arriba
            <ArrowUp className="size-4" aria-hidden="true" />
          </a>
        </div>

        <div id="modelo-3d" className="mt-8 scroll-mt-24">
          <div className="mb-5 text-center">
            <p className="text-xs font-semibold uppercase tracking-[0.24em] text-ember-500">
              Objeto 3D
            </p>
            <h2 className="mt-3 text-3xl font-semibold leading-tight text-zinc-950 sm:text-4xl">
              Ascuas dentro de la propia página.
            </h2>
          </div>
          <AscuasProductModel />
        </div>

        <div className="mt-12 rounded-lg border border-zinc-950/10 bg-white/80 p-5 shadow-[0_18px_60px_rgba(24,20,12,0.07)] backdrop-blur sm:p-6">
          <p className="text-center text-xs font-semibold uppercase tracking-[0.24em] text-ember-500">
            Enlaces de Ascuas
          </p>
          <div className="mt-5 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
            {ascuasContactLinks.map((link) => {
              const Icon = link.icon;

              return (
                <a
                  key={link.label}
                  href={link.href}
                  target={link.href.startsWith("http") ? "_blank" : undefined}
                  rel={link.href.startsWith("http") ? "noreferrer" : undefined}
                  className="group rounded-md border border-zinc-950/10 bg-[#fffaf1] p-4 text-left transition hover:-translate-y-1 hover:border-ember-500/30 hover:shadow-[0_14px_34px_rgba(24,20,12,0.1)]"
                >
                  <span className="inline-flex size-9 items-center justify-center rounded-full bg-zinc-950 text-white transition group-hover:bg-ember-500">
                    <Icon className="size-4" aria-hidden="true" />
                  </span>
                  <span className="mt-4 block text-sm font-semibold text-zinc-950">
                    {link.label}
                  </span>
                  <span className="mt-1 block break-words text-sm leading-6 text-zinc-600">
                    {link.value}
                  </span>
                </a>
              );
            })}
          </div>
        </div>
      </section>
    </div>
  );
}
