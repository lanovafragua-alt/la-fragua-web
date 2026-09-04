import Image from "next/image";
import { Camera, Sparkles } from "lucide-react";
import type { CatalogProduct, ProductTone } from "@/lib/site";

type ProductVisualProps = {
  product: Pick<
    CatalogProduct,
    "name" | "imageSrc" | "imageAlt" | "imageFit" | "tone" | "photoNeeds"
  >;
  priority?: boolean;
  showNeeds?: boolean;
  className?: string;
};

const toneClasses: Record<ProductTone, string> = {
  ember:
    "from-ember-500/38 via-gold-300/18 to-zinc-950 border-ember-300/24 text-ember-100",
  graphite:
    "from-zinc-500/28 via-zinc-900/44 to-black border-white/14 text-zinc-100",
  electric:
    "from-sky-500/28 via-yellow-300/12 to-zinc-950 border-sky-200/20 text-sky-50",
  copper:
    "from-orange-300/26 via-oxide-300/16 to-zinc-950 border-orange-200/20 text-orange-50",
  ruby:
    "from-red-600/32 via-ember-500/16 to-zinc-950 border-red-300/20 text-red-50",
  bone:
    "from-bone/34 via-gold-100/18 to-zinc-950 border-bone/24 text-bone",
  ink:
    "from-zinc-700/36 via-indigo-500/12 to-black border-indigo-200/18 text-indigo-50",
};

export function ProductVisual({
  product,
  priority = false,
  showNeeds = false,
  className = "",
}: ProductVisualProps) {
  if (product.imageSrc) {
    const imageFitClass =
      product.imageFit === "contain" ? "object-contain" : "object-cover";

    return (
      <div
        className={`relative overflow-hidden rounded-lg bg-zinc-950 ${className}`}
      >
        <Image
          src={product.imageSrc}
          alt={product.imageAlt}
          fill
          sizes="(max-width: 768px) 92vw, 42vw"
          priority={priority}
          className={imageFitClass}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/46 via-black/8 to-transparent" />
      </div>
    );
  }

  return (
    <div
      className={`relative overflow-hidden rounded-lg border bg-gradient-to-br ${toneClasses[product.tone]} ${className}`}
      aria-label={product.imageAlt}
    >
      <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.052)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.038)_1px,transparent_1px)] bg-[size:34px_34px] opacity-70" />
      <div className="absolute inset-x-0 top-0 h-24 bg-gradient-to-b from-white/12 to-transparent" />
      <div className="absolute inset-x-0 bottom-0 h-28 bg-gradient-to-t from-black/28 to-transparent" />

      <div className="relative flex h-full min-h-[240px] flex-col justify-between p-5 sm:p-6">
        <div className="inline-flex size-12 items-center justify-center rounded-full border border-white/18 bg-white/10 backdrop-blur">
          <Camera className="size-5" aria-hidden="true" />
        </div>

        <div>
          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-white/62">
            Fotos pendientes
          </p>
          <h3 className="mt-3 text-3xl font-semibold leading-none">
            {product.name}
          </h3>
          {showNeeds ? (
            <ul className="mt-5 grid gap-2 text-sm leading-6 text-white/68">
              {product.photoNeeds.slice(0, 4).map((need) => (
                <li key={need} className="flex items-start gap-2">
                  <Sparkles
                    className="mt-1 size-3.5 shrink-0 text-ember-200"
                    aria-hidden="true"
                  />
                  {need}
                </li>
              ))}
            </ul>
          ) : (
            <p className="mt-4 text-sm leading-6 text-white/66">
              Hueco preparado para colocar las fotos finales cuando me las
              pases.
            </p>
          )}
        </div>
      </div>
    </div>
  );
}
