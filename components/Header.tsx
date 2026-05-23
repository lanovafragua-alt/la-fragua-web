"use client";

import Link from "next/link";
import { Flame } from "lucide-react";
import { usePathname } from "next/navigation";
import { routes } from "@/lib/site";

export function Header() {
  const pathname = usePathname();

  if (pathname === "/experimento-ascuas" || pathname === "/experimento-ascuas/") {
    return null;
  }

  return (
    <header className="sticky top-0 z-50 border-b border-white/10 bg-forge-950/82 backdrop-blur-xl">
      <div className="mx-auto flex max-w-7xl items-center justify-between gap-5 px-5 py-4 sm:px-8">
        <Link
          href="/"
          className="group flex items-center gap-3 text-bone transition hover:text-ember-200"
          aria-label="La Fragua, inicio"
        >
          <span className="grid size-10 place-items-center rounded-full border border-ember-300/25 bg-ember-500/10 text-ember-200 shadow-[0_0_28px_rgba(240,93,35,0.22)]">
            <Flame className="size-5" aria-hidden="true" />
          </span>
          <span className="leading-none">
            <span className="block text-sm font-semibold uppercase tracking-[0.28em]">
              La Fragua
            </span>
            <span className="mt-1 block text-xs text-bone/56">
              diseño · tecnología · fabricación
            </span>
          </span>
        </Link>

        <nav className="hidden items-center gap-1 md:flex" aria-label="Principal">
          {routes.slice(1).map((route) => (
            <Link
              key={route.href}
              href={route.href}
              className="rounded-full px-4 py-2 text-sm text-bone/68 transition hover:bg-white/[0.06] hover:text-bone"
            >
              {route.label}
            </Link>
          ))}
        </nav>

        <Link
          href="/contacto"
          className="hidden rounded-full border border-gold-300/30 px-4 py-2 text-sm font-medium text-gold-100 transition hover:border-gold-200/60 hover:bg-gold-300/10 lg:inline-flex"
        >
          Abrir proyecto
        </Link>
      </div>

      <nav
        className="no-scrollbar flex gap-2 overflow-x-auto border-t border-white/8 px-5 py-3 md:hidden"
        aria-label="Principal móvil"
      >
        {routes.map((route) => (
          <Link
            key={route.href}
            href={route.href}
            className="shrink-0 rounded-full bg-white/[0.04] px-3 py-2 text-xs text-bone/72"
          >
            {route.label}
          </Link>
        ))}
      </nav>
    </header>
  );
}
