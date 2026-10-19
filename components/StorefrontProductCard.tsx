"use client";

import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight, Flame, ImageIcon } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { trackEvent } from "@/lib/analytics";
import type { CatalogProduct } from "@/lib/site";

type StorefrontProductCardProps = {
  product: CatalogProduct;
  priority?: boolean;
};

export function StorefrontProductCard({ product, priority = false }: StorefrontProductCardProps) {
  const mediaRef = useRef<HTMLDivElement>(null);
  const [scrollFlipped, setScrollFlipped] = useState(false);
  const [hovered, setHovered] = useState(false);
  const isFlipped = scrollFlipped || hovered;

  useEffect(() => {
    const touch = window.matchMedia("(hover: none), (pointer: coarse)");
    const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)");
    let frame = 0;

    const update = () => {
      frame = 0;
      const isTouchDevice = touch.matches || navigator.maxTouchPoints > 0;
      if (!isTouchDevice || reducedMotion.matches || !mediaRef.current) {
        setScrollFlipped(false);
        return;
      }
      const rect = mediaRef.current.getBoundingClientRect();
      // Reveal the reverse as the photo passes the upper half of the screen.
      setScrollFlipped(window.scrollY > 24 && rect.top + rect.height / 2 < window.innerHeight * 0.45 && rect.bottom > 72);
    };
    const schedule = () => {
      if (!frame) frame = window.requestAnimationFrame(update);
    };
    window.addEventListener("scroll", schedule, { passive: true });
    window.addEventListener("resize", schedule);
    touch.addEventListener("change", schedule);
    reducedMotion.addEventListener("change", schedule);
    schedule();
    return () => {
      window.removeEventListener("scroll", schedule);
      window.removeEventListener("resize", schedule);
      touch.removeEventListener("change", schedule);
      reducedMotion.removeEventListener("change", schedule);
      window.cancelAnimationFrame(frame);
    };
  }, []);

  return (
    <article data-product-slug={product.slug} className="min-w-0">
      <Link
        href={product.href}
        aria-label={`Ver ${product.name}`}
        onClick={() => trackEvent("catalog_product_selected", { product: product.name, destination: product.href, placement: "storefront" })}
        onPointerEnter={(event) => {
          if (event.pointerType === "mouse" && !window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
            setHovered(true);
          }
        }}
        onPointerLeave={() => setHovered(false)}
        className="storefront-product-link group flex h-full flex-col rounded-md outline-none focus-visible:ring-2 focus-visible:ring-ember-500 focus-visible:ring-offset-4"
      >
        <div ref={mediaRef} className="storefront-product-media relative aspect-[4/5] w-full [perspective:1000px]">
          <div className="storefront-product-flip absolute inset-0" data-flipped={isFlipped}>
            <div aria-hidden={isFlipped} className="storefront-product-face absolute inset-0 overflow-hidden rounded-md bg-zinc-100">
              {product.imageSrc ? (
                <Image src={product.imageSrc} alt={product.imageAlt} fill sizes="(max-width: 767px) 46vw, (max-width: 1279px) 30vw, 23vw" priority={priority} className={product.imageFit === "contain" ? "object-contain" : "object-cover"} />
              ) : (
                <div className="grid h-full place-items-center text-zinc-400"><ImageIcon className="size-8" aria-hidden="true" /></div>
              )}
              {product.slug === "ascuas" && <span className="absolute left-2 top-2 rounded bg-white px-2 py-1 text-[10px] font-semibold text-zinc-800 sm:text-xs">Diseño propio</span>}
              {product.slug === "lampara-personalizada-foto" && <span className="absolute left-2 top-2 rounded bg-white px-2 py-1 text-[10px] font-semibold text-zinc-800 sm:text-xs">Tu foto, en luz</span>}
            </div>
            <div aria-hidden={!isFlipped} className="storefront-product-face storefront-product-back absolute inset-0 flex flex-col justify-between overflow-hidden rounded-md border border-zinc-200 bg-zinc-50 p-3 sm:p-5">
              <Flame className="size-5 shrink-0 text-ember-500 sm:size-6" aria-hidden="true" />
              <p className="my-2 line-clamp-5 text-xs leading-5 text-zinc-700 sm:text-sm sm:leading-6">{product.summary}</p>
              <span className="flex items-center gap-1 text-xs font-semibold text-zinc-950 sm:text-sm">Ver producto<ArrowUpRight className="size-4" aria-hidden="true" /></span>
            </div>
          </div>
        </div>
        <div className="flex grow flex-col pt-3">
          <p className="text-[10px] leading-4 text-zinc-500 sm:text-xs">{product.category}</p>
          <h2 className="mt-1 text-sm font-medium leading-5 text-zinc-950 sm:text-base sm:leading-6">{product.name}</h2>
          <div className="mt-auto pt-3">
            <p className="text-xl font-semibold leading-7 sm:text-2xl">{product.price}</p>
            <p className="mt-1 text-[11px] leading-4 text-zinc-500 sm:text-xs">{product.slug === "ascuas" ? "+ gastos de envío" : product.price === "Consultar" ? "Bajo pedido" : "Envío incluido"}</p>
            <span className="mt-3 flex min-h-10 items-center justify-between gap-2 rounded-md border border-zinc-200 px-3 py-2 text-xs font-semibold text-zinc-800 transition group-hover:border-zinc-950 group-hover:bg-zinc-950 group-hover:text-white sm:text-sm">
              Ver producto<ArrowUpRight className="size-4 shrink-0" aria-hidden="true" />
            </span>
          </div>
        </div>
      </Link>
    </article>
  );
}
