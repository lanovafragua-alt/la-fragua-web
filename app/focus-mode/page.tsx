import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { ArrowLeft, ArrowRight, Mail, Radio, Zap } from "lucide-react";
import { CatalogContact } from "@/components/CatalogContact";
import { ProductAnalytics } from "@/components/ProductAnalytics";
import { chispaDetails, productBySlug } from "@/lib/site";

export const metadata: Metadata = {
  title: "Proyecto Chispa",
  description:
    "Proyecto Chispa es el dispositivo Focus Mode de La Fragua: objeto físico, NFC y ritual de concentración.",
};

export default function FocusModePage() {
  const product = productBySlug("chispa");

  return (
    <div className="relative isolate overflow-hidden bg-[#090807] text-bone">
      <section className="relative min-h-[calc(100svh-73px)] px-4 py-8 sm:px-6 lg:px-8 lg:py-12">
        <ProductAnalytics product="Proyecto Chispa" />
        <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_70%_18%,rgba(214,166,74,0.12),transparent_28rem),radial-gradient(circle_at_14%_84%,rgba(240,93,35,0.1),transparent_24rem)]" />
        <div className="pointer-events-none absolute inset-0 surface-noise opacity-55" />

        <div className="relative mx-auto grid max-w-7xl gap-8 lg:grid-cols-[0.92fr_1.08fr] lg:items-center">
          <div>
            <Link
              href="/tienda"
              className="inline-flex items-center gap-2 text-sm font-semibold text-bone/62 transition hover:text-bone"
            >
              <ArrowLeft className="size-4" aria-hidden="true" />
              Volver a tienda
            </Link>

            <p className="mt-8 text-xs font-semibold uppercase tracking-[0.24em] text-gold-100">
              Producto definitivo
            </p>
            <h1 className="mt-4 text-5xl font-semibold leading-[0.95] sm:text-7xl">
              Proyecto Chispa.
            </h1>
            <p className="mt-5 max-w-2xl text-xl leading-8 text-bone/72">
              Focus Mode convertido en un objeto de mesa.
            </p>
            <p className="mt-5 max-w-2xl text-base leading-8 text-bone/60">
              Chispa es el lado más técnico de La Fragua: un dispositivo físico
              con NFC para activar una experiencia digital y convertir el foco
              en un gesto claro.
            </p>

            <div className="mt-7 flex flex-wrap gap-3">
              {product ? (
                <a
                  href={product.purchaseHref}
                  className="inline-flex items-center gap-2 rounded-full bg-ember-500 px-5 py-4 text-sm font-semibold text-white transition hover:bg-ember-300"
                >
                  Consultar Chispa
                  <Mail className="size-4" aria-hidden="true" />
                </a>
              ) : null}
              <Link
                href="/tienda"
                className="inline-flex items-center gap-2 rounded-full border border-gold-300/30 px-5 py-4 text-sm font-semibold text-gold-100 transition hover:border-gold-200/60 hover:bg-gold-300/10"
              >
                Ver catálogo
                <ArrowRight className="size-4" aria-hidden="true" />
              </Link>
            </div>

            <div className="mt-7 grid gap-3">
              {chispaDetails.map((detail) => (
                <div
                  key={detail}
                  className="flex items-start gap-3 rounded-lg border border-white/10 bg-white/[0.04] p-4 text-sm leading-6 text-bone/68"
                >
                  <Radio className="mt-0.5 size-4 shrink-0 text-gold-100" />
                  {detail}
                </div>
              ))}
            </div>
          </div>

          <div className="relative overflow-hidden rounded-lg border border-white/10 bg-white/[0.04] shadow-[0_28px_90px_rgba(0,0,0,0.32)]">
            <Image
              src="/images/proyecto-chispa-device.png"
              alt="Dispositivo Proyecto Chispa"
              width={1536}
              height={1920}
              priority
              className="aspect-[4/5] w-full object-cover"
            />
            <div className="absolute left-5 top-5 inline-flex items-center gap-2 rounded-full bg-black/54 px-3 py-2 text-xs font-semibold uppercase tracking-[0.18em] text-gold-100 backdrop-blur">
              <Zap className="size-4" aria-hidden="true" />
              Focus Mode
            </div>
          </div>
        </div>
      </section>

      <section className="relative mx-auto max-w-7xl px-4 pb-16 sm:px-6 lg:px-8">
        <CatalogContact />
      </section>
    </div>
  );
}
