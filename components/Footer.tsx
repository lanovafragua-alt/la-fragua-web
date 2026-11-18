"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { contact, contactLinks, routes } from "@/lib/site";
import { AdvertisingPreferencesButton } from "@/components/AdvertisingConsent";

export function Footer() {
  const pathname = usePathname();
  if (pathname === "/curso" || pathname === "/curso/") return null;

  return (
    <footer className="site-footer border-t border-white/10 bg-graphite-950">
      <div className="mx-auto grid max-w-7xl gap-8 px-4 py-10 text-bone sm:px-6 lg:grid-cols-[1fr_auto] lg:px-8">
        <div>
          <div className="flex items-center gap-3">
            <span className="grid size-11 place-items-center">
              <Image
                src="/brand/la-fragua-logo-orange.png"
                alt=""
                width={88}
                height={88}
                className="size-11 object-contain"
              />
            </span>
            <span className="text-sm font-semibold uppercase tracking-[0.24em]">
              La Fragua
            </span>
          </div>
          <p className="mt-4 max-w-xl text-sm leading-7 text-bone/58">
            Objetos impresos en 3D, luz, gaming y encargos personalizados con
            alma de taller.
          </p>
        </div>

        <div className="grid gap-4 text-sm text-bone/62 sm:text-right">
          <div className="flex flex-wrap gap-3 sm:justify-end">
            {routes.map((route) => (
              <Link
                key={route.href}
                href={route.href}
                className="transition hover:text-bone"
              >
                {route.label}
              </Link>
            ))}
          </div>

          <div className="flex flex-wrap gap-3 sm:justify-end">
            {contactLinks.slice(0, 4).map((link) => (
              <a
                key={link.label}
                href={link.href}
                target="_blank"
                rel="noreferrer"
                className="transition hover:text-bone"
              >
                {link.label}
              </a>
            ))}
          </div>

          <div className="grid gap-2">
            <a
              className="transition hover:text-bone"
              href={`mailto:${contact.email}`}
            >
              {contact.email}
            </a>
            <a className="transition hover:text-bone" href={contact.phoneHref}>
              {contact.phone}
            </a>
          </div>
          <div className="sm:justify-self-end">
            <AdvertisingPreferencesButton />
          </div>
        </div>
      </div>
    </footer>
  );
}
