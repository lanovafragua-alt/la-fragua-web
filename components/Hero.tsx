import Image from "next/image";
import Link from "next/link";
import { ArrowRight, Sparkles } from "lucide-react";
import type { ReactNode } from "react";

type HeroCta = {
  label: string;
  href: string;
};

type HeroProps = {
  eyebrow?: string;
  title: string;
  subtitle?: string;
  description?: string;
  primaryCta?: HeroCta;
  secondaryCta?: HeroCta;
  imageSrc?: string;
  backdrop?: ReactNode;
  variant?: "home" | "page";
};

export function Hero({
  eyebrow,
  title,
  subtitle,
  description,
  primaryCta,
  secondaryCta,
  imageSrc,
  backdrop,
  variant = "page",
}: HeroProps) {
  const isHome = variant === "home";

  return (
    <section
      data-ascuas-interactive-hero={backdrop ? "" : undefined}
      className={`relative isolate overflow-hidden border-b border-white/10 bg-forge-950 ${
        backdrop ? "ascuas-hero-surface" : ""
      } ${
        isHome
          ? "min-h-[clamp(500px,calc(100svh-220px),760px)]"
          : "min-h-[420px]"
      }`}
    >
      {backdrop}
      {imageSrc ? (
        <Image
          src={imageSrc}
          alt=""
          fill
          priority={isHome}
          sizes="100vw"
          className="object-cover"
        />
      ) : null}

      <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(90deg,rgba(8,8,7,0.94)_0%,rgba(8,8,7,0.74)_42%,rgba(8,8,7,0.35)_100%)]" />
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_72%_70%,rgba(240,93,35,0.22),transparent_32%),radial-gradient(circle_at_82%_18%,rgba(214,166,74,0.16),transparent_28%)]" />
      <div className="pointer-events-none absolute inset-x-0 bottom-0 h-32 bg-gradient-to-t from-forge-950 to-transparent" />

      <div className="relative mx-auto flex max-w-7xl px-5 py-14 sm:px-8 sm:py-20 lg:min-h-[inherit] lg:items-center lg:py-24">
        <div className="max-w-3xl">
          {eyebrow ? (
            <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-ember-300/25 bg-black/24 px-4 py-2 text-xs font-semibold uppercase tracking-[0.24em] text-ember-100">
              <Sparkles className="size-4" aria-hidden="true" />
              {eyebrow}
            </div>
          ) : null}

          <h1 className="max-w-4xl text-5xl font-semibold leading-[0.96] text-bone sm:text-6xl lg:text-7xl">
            {title}
          </h1>

          {subtitle ? (
            <p className="mt-6 max-w-2xl text-xl leading-8 text-gold-100 sm:text-2xl">
              {subtitle}
            </p>
          ) : null}

          {description ? (
            <p className="mt-6 max-w-2xl text-base leading-8 text-bone/68 sm:text-lg">
              {description}
            </p>
          ) : null}

          {(primaryCta || secondaryCta) && (
            <div className="mt-9 flex flex-col gap-3 sm:flex-row">
              {primaryCta ? (
                <Link
                  href={primaryCta.href}
                  className="inline-flex items-center justify-center gap-2 rounded-full bg-ember-500 px-5 py-3 text-sm font-semibold text-forge-950 shadow-[0_14px_40px_rgba(240,93,35,0.26)] transition hover:bg-ember-300"
                >
                  {primaryCta.label}
                  <ArrowRight className="size-4" aria-hidden="true" />
                </Link>
              ) : null}

              {secondaryCta ? (
                <Link
                  href={secondaryCta.href}
                  className="inline-flex items-center justify-center gap-2 rounded-full border border-bone/18 bg-bone/[0.04] px-5 py-3 text-sm font-semibold text-bone transition hover:border-gold-200/50 hover:bg-gold-300/10"
                >
                  {secondaryCta.label}
                  <ArrowRight className="size-4" aria-hidden="true" />
                </Link>
              ) : null}
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
