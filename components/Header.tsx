"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { routes } from "@/lib/site";

export function Header() {
  const pathname = usePathname();

  if (pathname === "/experimento-ascuas" || pathname === "/experimento-ascuas/") {
    return null;
  }

  const normalizedPathname =
    pathname.length > 1 ? pathname.replace(/\/$/, "") : pathname;
  const isLightPage =
    normalizedPathname === "/ascuas" ||
    normalizedPathname.startsWith("/productos/");
  const buyHref = normalizedPathname === "/ascuas" ? "#pedido" : "/tienda";
  const buyLabel = normalizedPathname === "/ascuas" ? "Comprar" : "Tienda";

  return (
    <header
      className={`sticky top-0 z-50 border-b backdrop-blur-xl ${
        isLightPage
          ? "border-zinc-950/10 bg-[#fffaf1]/88 text-zinc-950"
          : "border-white/10 bg-forge-950/86 text-bone"
      }`}
    >
      <div className="mx-auto flex max-w-7xl items-center justify-between gap-3 px-4 py-3 sm:px-6 lg:px-8">
        <Link
          href="/"
          className="group flex min-w-0 items-center gap-3 transition"
          aria-label="La Fragua, inicio"
        >
          <span className="grid size-11 shrink-0 place-items-center">
            <Image
              src={
                isLightPage
                  ? "/brand/la-fragua-logo-black.png"
                  : "/brand/la-fragua-logo-orange.png"
              }
              alt=""
              width={88}
              height={88}
              priority
              className="size-11 object-contain"
            />
          </span>
          <span className="min-w-0 leading-none">
            <span className="block truncate text-sm font-semibold uppercase tracking-[0.24em]">
              La Fragua
            </span>
            <span
              className={`mt-1 hidden text-xs sm:block ${
                isLightPage ? "text-zinc-600" : "text-bone/56"
              }`}
            >
              diseño · fabricación · tienda
            </span>
          </span>
        </Link>

        <nav className="hidden items-center gap-1 md:flex" aria-label="Principal">
          {routes.map((route) => {
            const isActive =
              route.href === "/"
                ? normalizedPathname === "/"
                : normalizedPathname.startsWith(route.href);

            return (
              <Link
                key={route.href}
                href={route.href}
                className={`rounded-full px-4 py-2 text-sm transition ${
                  isLightPage
                    ? isActive
                      ? "bg-zinc-950/[0.07] text-zinc-950"
                      : "text-zinc-600 hover:bg-zinc-950/[0.06] hover:text-zinc-950"
                    : isActive
                      ? "bg-white/[0.08] text-bone"
                      : "text-bone/68 hover:bg-white/[0.06] hover:text-bone"
                }`}
              >
                {route.label}
              </Link>
            );
          })}
        </nav>

        <Link
          href={buyHref}
          className={`shrink-0 rounded-full px-4 py-2 text-sm font-semibold transition ${
            isLightPage
              ? "bg-zinc-950 text-white hover:bg-ember-500"
              : "bg-ember-500 text-white hover:bg-ember-300"
          }`}
        >
          {buyLabel}
        </Link>
      </div>
    </header>
  );
}
