"use client";

import Image from "next/image";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { useState } from "react";

type GalleryItem = {
  src: string;
  alt: string;
  label: string;
};

type AscuasProductGalleryProps = {
  items: readonly GalleryItem[];
};

export function AscuasProductGallery({ items }: AscuasProductGalleryProps) {
  const [activeIndex, setActiveIndex] = useState(0);
  const active = items[activeIndex];

  const goToPrevious = () => {
    setActiveIndex((index) => (index === 0 ? items.length - 1 : index - 1));
  };

  const goToNext = () => {
    setActiveIndex((index) => (index === items.length - 1 ? 0 : index + 1));
  };

  return (
    <div className="grid gap-3 lg:grid-cols-[86px_1fr]">
      <div className="order-2 flex gap-2 overflow-x-auto pb-1 lg:order-1 lg:max-h-[720px] lg:flex-col lg:overflow-y-auto lg:overflow-x-hidden lg:pr-1">
        {items.map((item, index) => {
          const isActive = index === activeIndex;

          return (
            <button
              key={item.src}
              type="button"
              onClick={() => setActiveIndex(index)}
              className={`relative h-20 w-16 shrink-0 overflow-hidden rounded-md border bg-white transition lg:h-24 lg:w-20 ${
                isActive
                  ? "border-ember-500 ring-2 ring-ember-500/24"
                  : "border-zinc-950/10 hover:border-zinc-950/30"
              }`}
              aria-label={`Ver foto ${index + 1}: ${item.label}`}
              aria-current={isActive}
            >
              <Image
                src={item.src}
                alt=""
                fill
                sizes="90px"
                className="object-cover"
              />
            </button>
          );
        })}
      </div>

      <div className="order-1 lg:order-2">
        <div className="relative overflow-hidden rounded-lg border border-zinc-950/10 bg-white shadow-[0_24px_80px_rgba(24,20,12,0.12)]">
          <Image
            key={active.src}
            src={active.src}
            alt={active.alt}
            width={1440}
            height={2550}
            priority
            className="aspect-[4/5] w-full object-cover"
          />

          <div className="absolute left-3 top-3 rounded-full bg-white/86 px-3 py-1 text-xs font-semibold text-zinc-800 shadow-sm backdrop-blur">
            {activeIndex + 1} / {items.length}
          </div>

          <div className="absolute inset-x-3 top-1/2 flex -translate-y-1/2 justify-between">
            <button
              type="button"
              onClick={goToPrevious}
              className="grid size-10 place-items-center rounded-full bg-white/86 text-zinc-950 shadow-sm backdrop-blur transition hover:bg-white"
              aria-label="Foto anterior"
            >
              <ChevronLeft className="size-5" aria-hidden="true" />
            </button>
            <button
              type="button"
              onClick={goToNext}
              className="grid size-10 place-items-center rounded-full bg-white/86 text-zinc-950 shadow-sm backdrop-blur transition hover:bg-white"
              aria-label="Foto siguiente"
            >
              <ChevronRight className="size-5" aria-hidden="true" />
            </button>
          </div>
        </div>

        <p className="mt-3 text-center text-xs font-medium uppercase tracking-[0.2em] text-zinc-500">
          {active.label}
        </p>
      </div>
    </div>
  );
}
