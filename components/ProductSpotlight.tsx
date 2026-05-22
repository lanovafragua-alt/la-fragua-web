import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";

type ProductSpotlightProps = {
  eyebrow: string;
  title: string;
  description: string;
  imageSrc: string;
  imageAlt: string;
  href?: string;
  ctaLabel?: string;
  reverse?: boolean;
  details?: readonly string[];
};

export function ProductSpotlight({
  eyebrow,
  title,
  description,
  imageSrc,
  imageAlt,
  href,
  ctaLabel = "Explorar",
  reverse = false,
  details = [],
}: ProductSpotlightProps) {
  return (
    <div
      className={`grid gap-8 lg:grid-cols-[1.05fr_0.95fr] lg:items-center ${
        reverse ? "lg:[&>*:first-child]:order-2" : ""
      }`}
    >
      <div className="relative overflow-hidden rounded-lg border border-white/10 bg-black/24 shadow-[0_28px_90px_rgba(0,0,0,0.3)]">
        <Image
          src={imageSrc}
          alt={imageAlt}
          width={1122}
          height={1402}
          className="aspect-[4/5] h-full w-full object-cover"
        />
        <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-forge-950/34 via-transparent to-transparent" />
      </div>

      <div>
        <p className="text-xs font-semibold uppercase tracking-[0.28em] text-ember-200">
          {eyebrow}
        </p>
        <h2 className="mt-5 text-4xl font-semibold leading-tight text-bone sm:text-5xl">
          {title}
        </h2>
        <p className="mt-6 text-lg leading-8 text-bone/66">{description}</p>

        {details.length > 0 ? (
          <div className="mt-7 grid gap-3">
            {details.map((detail) => (
              <div key={detail} className="flex items-start gap-3 text-sm leading-6 text-bone/64">
                <span className="mt-2 h-1.5 w-6 shrink-0 rounded-full bg-gold-200/80" />
                {detail}
              </div>
            ))}
          </div>
        ) : null}

        {href ? (
          <Link
            href={href}
            className="mt-8 inline-flex items-center gap-2 rounded-full border border-gold-300/30 px-5 py-3 text-sm font-semibold text-gold-100 transition hover:border-gold-200/60 hover:bg-gold-300/10"
          >
            {ctaLabel}
            <ArrowRight className="size-4" aria-hidden="true" />
          </Link>
        ) : null}
      </div>
    </div>
  );
}
