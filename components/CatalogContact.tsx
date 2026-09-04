import {
  AtSign,
  ExternalLink,
  Mail,
  Phone,
  ShoppingBag,
  Truck,
} from "lucide-react";
import { contactLinks, shopPromises } from "@/lib/site";

type CatalogContactProps = {
  variant?: "dark" | "light";
};

const icons = {
  instagram: AtSign,
  tiktok: AtSign,
  etsy: ShoppingBag,
  facebook: AtSign,
  email: Mail,
  phone: Phone,
} as const;

export function CatalogContact({ variant = "dark" }: CatalogContactProps) {
  const isLight = variant === "light";

  return (
    <section
      id="contacto"
      className={
        isLight
          ? "rounded-lg border border-zinc-950/10 bg-white/82 p-5 text-zinc-950 shadow-[0_18px_60px_rgba(24,20,12,0.07)] backdrop-blur sm:p-6"
          : "rounded-lg border border-white/10 bg-white/[0.045] p-5 text-bone shadow-[0_20px_70px_rgba(0,0,0,0.22)] sm:p-6"
      }
    >
      <div className="grid gap-7 lg:grid-cols-[0.95fr_1.05fr] lg:items-start">
        <div>
          <p
            className={`text-xs font-semibold uppercase tracking-[0.24em] ${
              isLight ? "text-ember-500" : "text-ember-200"
            }`}
          >
            Contacto y tienda
          </p>
          <h2
            className={`mt-3 text-3xl font-semibold leading-tight sm:text-4xl ${
              isLight ? "text-zinc-950" : "text-bone"
            }`}
          >
            Compra directa, Etsy o encargo personalizado.
          </h2>
          <div className="mt-5 grid gap-3">
            {shopPromises.map((promise) => (
              <p
                key={promise}
                className={`flex items-start gap-3 text-sm leading-6 ${
                  isLight ? "text-zinc-600" : "text-bone/62"
                }`}
              >
                <Truck
                  className={`mt-0.5 size-4 shrink-0 ${
                    isLight ? "text-ember-500" : "text-ember-200"
                  }`}
                  aria-hidden="true"
                />
                {promise}
              </p>
            ))}
          </div>
        </div>

        <div className="grid gap-3 sm:grid-cols-2">
          {contactLinks.map((link) => {
            const Icon = icons[link.kind];
            const isExternal = link.href.startsWith("http");

            return (
              <a
                key={link.label}
                href={link.href}
                target={isExternal ? "_blank" : undefined}
                rel={isExternal ? "noreferrer" : undefined}
                className={`group rounded-md border p-4 text-left transition hover:-translate-y-1 ${
                  isLight
                    ? "border-zinc-950/10 bg-[#fffaf1] hover:border-ember-500/30 hover:shadow-[0_14px_34px_rgba(24,20,12,0.1)]"
                    : "border-white/10 bg-white/[0.045] hover:border-ember-300/24 hover:bg-white/[0.07]"
                }`}
              >
                <span
                  className={`inline-flex size-9 items-center justify-center rounded-full transition ${
                    isLight
                      ? "bg-zinc-950 text-white group-hover:bg-ember-500"
                      : "bg-ember-500/16 text-ember-200 group-hover:bg-ember-500 group-hover:text-white"
                  }`}
                >
                  <Icon className="size-4" aria-hidden="true" />
                </span>
                <span
                  className={`mt-4 block text-sm font-semibold ${
                    isLight ? "text-zinc-950" : "text-bone"
                  }`}
                >
                  {link.label}
                </span>
                <span
                  className={`mt-1 block break-words text-sm leading-6 ${
                    isLight ? "text-zinc-600" : "text-bone/58"
                  }`}
                >
                  {link.value}
                </span>
                {isExternal ? (
                  <ExternalLink
                    className={`mt-3 size-4 ${
                      isLight ? "text-zinc-400" : "text-bone/34"
                    }`}
                    aria-hidden="true"
                  />
                ) : null}
              </a>
            );
          })}
        </div>
      </div>
    </section>
  );
}
