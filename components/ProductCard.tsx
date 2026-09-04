import Link from "next/link";
import { ArrowRight, BadgeCheck, Truck } from "lucide-react";
import { ProductVisual } from "@/components/ProductVisual";
import type { CatalogProduct, ProductTone } from "@/lib/site";

type ProductCardProps = {
  product: CatalogProduct;
  featured?: boolean;
  priority?: boolean;
};

const toneClasses: Record<ProductTone, string> = {
  ember: "text-ember-200 bg-ember-500/12 border-ember-300/20",
  graphite: "text-zinc-200 bg-white/8 border-white/12",
  electric: "text-sky-100 bg-sky-400/12 border-sky-200/18",
  copper: "text-orange-100 bg-orange-300/12 border-orange-200/18",
  ruby: "text-red-100 bg-red-400/12 border-red-200/18",
  bone: "text-bone bg-bone/10 border-bone/18",
  ink: "text-indigo-100 bg-indigo-300/12 border-indigo-200/18",
};

export function ProductCard({
  product,
  featured = false,
  priority = false,
}: ProductCardProps) {
  return (
    <Link
      href={product.href}
      className={`catalog-card group block overflow-hidden rounded-lg border border-white/10 bg-white/[0.045] shadow-[0_20px_70px_rgba(0,0,0,0.22)] outline-none transition focus-visible:ring-4 focus-visible:ring-ember-500/30 ${
        featured ? "lg:grid lg:grid-cols-[1.05fr_0.95fr]" : ""
      }`}
      data-analytics-event="catalog_product_selected"
      data-analytics-placement="catalog_card"
    >
      <ProductVisual
        product={product}
        priority={priority}
        className={featured ? "min-h-[360px] lg:min-h-full" : "aspect-[4/5]"}
      />

      <div className="flex min-h-full flex-col justify-between p-5 sm:p-6">
        <div>
          <div className="flex flex-wrap items-center gap-2">
            <span
              className={`inline-flex rounded-full border px-3 py-1 text-xs font-semibold uppercase tracking-[0.18em] ${toneClasses[product.tone]}`}
            >
              {product.eyebrow}
            </span>
            {product.badge ? (
              <span className="inline-flex items-center gap-1.5 rounded-full border border-gold-300/20 bg-gold-300/10 px-3 py-1 text-xs font-semibold uppercase tracking-[0.16em] text-gold-100">
                <BadgeCheck className="size-3.5" aria-hidden="true" />
                {product.badge}
              </span>
            ) : null}
          </div>

          <p className="mt-5 text-xs font-semibold uppercase tracking-[0.22em] text-bone/44">
            {product.category}
          </p>
          <h3 className="mt-3 text-3xl font-semibold leading-tight text-bone sm:text-4xl">
            {product.name}
          </h3>
          <p className="mt-3 text-base leading-7 text-bone/68">
            {product.summary}
          </p>

          <div className="mt-5 flex flex-wrap items-end gap-x-3 gap-y-1">
            <span className="text-3xl font-semibold text-bone">
              {product.price}
            </span>
            {product.compareAtPrice ? (
              <span className="pb-1 text-base font-medium text-bone/42 line-through">
                {product.compareAtPrice}
              </span>
            ) : null}
          </div>

          <p className="mt-3 flex items-start gap-2 text-sm leading-6 text-bone/58">
            <Truck
              className="mt-0.5 size-4 shrink-0 text-ember-200"
              aria-hidden="true"
            />
            {product.shipping}
          </p>
        </div>

        <span className="mt-7 inline-flex items-center justify-center gap-2 rounded-full bg-ember-500 px-5 py-4 text-sm font-semibold text-white transition group-hover:bg-ember-300">
          Ver producto
          <ArrowRight className="size-4" aria-hidden="true" />
        </span>
      </div>
    </Link>
  );
}
