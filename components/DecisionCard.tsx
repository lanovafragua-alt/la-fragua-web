"use client";

import Image from "next/image";
import { useRouter } from "next/navigation";
import { ArrowRight } from "lucide-react";
import { useState } from "react";
import { trackEvent } from "@/lib/analytics";

type DecisionCardProps = {
  title: string;
  eyebrow: string;
  subtitle: string;
  description: string;
  href: string;
  cta: string;
  imageSrc: string;
  imageAlt: string;
  tone: "ember" | "graphite";
};

const toneClasses = {
  ember: {
    glow: "from-ember-500/50 via-ember-300/10",
    badge: "border-ember-500/25 bg-ember-500/10 text-ember-500",
    button: "bg-ember-500 text-white",
  },
  graphite: {
    glow: "from-zinc-900/60 via-zinc-500/10",
    badge: "border-zinc-900/15 bg-zinc-900/5 text-zinc-800",
    button: "bg-zinc-950 text-white",
  },
};

export function DecisionCard({
  title,
  eyebrow,
  subtitle,
  description,
  href,
  cta,
  imageSrc,
  imageAlt,
  tone,
}: DecisionCardProps) {
  const [isFlipped, setIsFlipped] = useState(false);
  const router = useRouter();
  const styles = toneClasses[tone];

  const openProduct = () => {
    trackEvent("product_selected", {
      product: title,
      destination: href,
    });
    router.push(href);
  };

  const advanceCard = () => {
    if (isFlipped) {
      openProduct();
      return;
    }

    setIsFlipped(true);
  };

  return (
    <article
      className="decision-card-shell group h-[min(64svh,560px)] min-h-[390px] cursor-pointer rounded-lg outline-none [perspective:1400px] sm:h-[560px]"
      tabIndex={0}
      role="link"
      onClick={advanceCard}
      onKeyDown={(event) => {
        if (event.key === "Enter" || event.key === " ") {
          event.preventDefault();
          advanceCard();
        }
      }}
      onPointerEnter={(event) => {
        if (event.pointerType === "mouse") {
          setIsFlipped(true);
        }
      }}
      onPointerLeave={(event) => {
        if (event.pointerType === "mouse") {
          setIsFlipped(false);
        }
      }}
      aria-label={`${title}: toca para ver mas. Si ya esta girada, entra al producto.`}
    >
      <div
        className="decision-card-inner relative h-full w-full transition-transform duration-500 [transform-style:preserve-3d]"
        data-flipped={isFlipped ? "true" : "false"}
      >
        <div className="absolute inset-0 overflow-hidden rounded-lg border border-white/12 bg-zinc-950 shadow-[0_28px_80px_rgba(0,0,0,0.32)] [backface-visibility:hidden]">
          <Image
            src={imageSrc}
            alt={imageAlt}
            fill
            sizes="(max-width: 768px) 92vw, 44vw"
            priority={title === "Ascuas"}
            className="object-cover"
          />
          <div
            className={`absolute inset-0 bg-gradient-to-t ${styles.glow} to-transparent`}
          />
          <div className="absolute inset-x-0 bottom-0 p-5 text-white sm:p-6">
            <p className="text-xs font-semibold uppercase tracking-[0.24em] text-white/72">
              {eyebrow}
            </p>
            <h2 className="mt-3 text-4xl font-semibold leading-none sm:text-5xl">
              {title}
            </h2>
            <p className="mt-3 text-base leading-6 text-white/78">{subtitle}</p>
          </div>
        </div>

        <div className="absolute inset-0 flex flex-col justify-between rounded-lg border border-zinc-950/10 bg-[#f8f4ec] p-5 text-zinc-950 shadow-[0_28px_80px_rgba(0,0,0,0.18)] [backface-visibility:hidden] [transform:rotateY(180deg)] sm:p-6">
          <div>
            <span
              className={`inline-flex rounded-full border px-3 py-1 text-xs font-semibold uppercase tracking-[0.18em] ${styles.badge}`}
            >
              {eyebrow}
            </span>
            <h3 className="mt-6 text-4xl font-semibold leading-none sm:text-5xl">
              {title}
            </h3>
            <p className="mt-5 text-lg leading-8 text-zinc-700">
              {description}
            </p>
          </div>

          <span
            className={`mt-8 inline-flex items-center justify-center gap-2 rounded-full px-5 py-4 text-sm font-semibold transition group-hover:brightness-110 ${styles.button}`}
          >
            {cta}
            <ArrowRight className="size-4" aria-hidden="true" />
          </span>
        </div>
      </div>
    </article>
  );
}
