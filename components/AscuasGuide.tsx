import Image from "next/image";
import Link from "next/link";

export function AscuasGuide() {
  return (
    <div className="pointer-events-none fixed bottom-3 right-3 z-40 sm:bottom-4 sm:right-4">
      <Link
        href="/ascuas"
        className="ascuas-float pointer-events-auto flex items-end gap-3 rounded-full border border-ember-300/25 bg-forge-950/78 px-3 py-2 shadow-[0_18px_60px_rgba(0,0,0,0.42)] backdrop-blur-xl transition hover:border-ember-200/55 hover:bg-forge-900/88"
        aria-label="Ascuas te guía por La Fragua"
      >
        <span className="hidden max-w-[190px] text-right text-xs leading-5 text-bone/72 lg:block">
          Ascuas te acompaña por la fragua.
        </span>
        <span className="ember-breath relative grid size-16 place-items-center overflow-hidden rounded-full bg-black sm:size-20">
          <Image
            src="/images/ascuas-guide.png"
            alt="Ascuas, guía de La Fragua"
            width={160}
            height={160}
            className="h-full w-full scale-125 object-contain object-center"
          />
        </span>
      </Link>
    </div>
  );
}
