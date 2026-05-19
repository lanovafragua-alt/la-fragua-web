import Link from "next/link";
import { Flame } from "lucide-react";
import { routes } from "@/lib/site";

export function Footer() {
  return (
    <footer className="border-t border-white/10 bg-graphite-950">
      <div className="mx-auto grid max-w-7xl gap-10 px-5 py-12 sm:px-8 lg:grid-cols-[1.2fr_1fr]">
        <div>
          <div className="flex items-center gap-3 text-bone">
            <span className="grid size-10 place-items-center rounded-full border border-ember-300/25 bg-ember-500/10 text-ember-200">
              <Flame className="size-5" aria-hidden="true" />
            </span>
            <span className="text-sm font-semibold uppercase tracking-[0.28em]">
              La Fragua
            </span>
          </div>
          <p className="mt-5 max-w-xl text-sm leading-7 text-bone/60">
            Una marca-laboratorio para diseñar, fabricar y activar objetos,
            sistemas y experiencias con alma de taller y pulso tecnológico.
          </p>
        </div>

        <div className="grid gap-6 sm:grid-cols-2">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.24em] text-gold-100/80">
              Mapa
            </p>
            <div className="mt-4 grid gap-3">
              {routes.map((route) => (
                <Link
                  key={route.href}
                  href={route.href}
                  className="text-sm text-bone/58 transition hover:text-bone"
                >
                  {route.label}
                </Link>
              ))}
            </div>
          </div>
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.24em] text-gold-100/80">
              Contacto
            </p>
            <div className="mt-4 grid gap-3 text-sm text-bone/58">
              <a className="transition hover:text-bone" href="mailto:hola@lafragua.studio">
                hola@lafragua.studio
              </a>
              <span>Proyectos especiales, prototipos y piezas a medida.</span>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
