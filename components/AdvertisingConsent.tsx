"use client";

import { SlidersHorizontal } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import {
  advertisingPreferencesEvent,
  saveAdvertisingConsent,
  saveAnalyticsConsent,
  useAdvertisingConsent,
  useAnalyticsConsent,
  type AdvertisingConsent,
} from "@/lib/advertising-consent";
import { googleAnalyticsId } from "@/lib/google";

export function AdvertisingPreferencesButton() {
  return (
    <button
      id="advertising-preferences"
      type="button"
      onClick={() => window.dispatchEvent(new Event(advertisingPreferencesEvent))}
      className="inline-flex cursor-pointer items-center gap-2 text-left text-sm text-zinc-500 transition hover:text-ember-500"
    >
      <SlidersHorizontal className="size-4" aria-hidden="true" />
      Preferencias de privacidad
    </button>
  );
}

export function AdvertisingConsentBanner() {
  const consent = useAdvertisingConsent();
  const analyticsConsent = useAnalyticsConsent();
  const [isEditing, setIsEditing] = useState(false);
  const rejectRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    let frame = 0;
    const openPreferences = () => {
      setIsEditing(true);
      frame = window.requestAnimationFrame(() => rejectRef.current?.focus());
    };
    window.addEventListener(advertisingPreferencesEvent, openPreferences);
    return () => {
      window.removeEventListener(advertisingPreferencesEvent, openPreferences);
      window.cancelAnimationFrame(frame);
    };
  }, []);

  const choose = (advertising: AdvertisingConsent, analytics: AdvertisingConsent) => {
    saveAdvertisingConsent(advertising);
    saveAnalyticsConsent(analytics);
    setIsEditing(false);
    if (isEditing) document.getElementById("advertising-preferences")?.focus();
  };

  if (consent === "pending" || analyticsConsent === "pending") return null;
  if (consent !== null && (!googleAnalyticsId || analyticsConsent !== null) && !isEditing) return null;

  return (
    <section
      role="region"
      aria-labelledby="advertising-consent-title"
      className="fixed inset-x-3 bottom-3 z-[60] mx-auto max-h-[calc(100dvh-1.5rem)] max-w-4xl overflow-y-auto rounded-lg border border-zinc-200 bg-white p-4 text-zinc-950 shadow-[0_8px_40px_rgba(0,0,0,0.16)] sm:p-5"
    >
      <form
        key={`${consent}-${analyticsConsent}`}
        onSubmit={(event) => {
          event.preventDefault();
          const data = new FormData(event.currentTarget);
          choose(data.has("advertising") ? "granted" : "denied", data.has("analytics") ? "granted" : "denied");
        }}
        className="grid gap-4"
      >
        <div>
          <h2 id="advertising-consent-title" className="text-sm font-semibold">
            Tu privacidad, a tu manera
          </h2>
          <p className="mt-2 text-xs leading-5 text-zinc-600 sm:text-sm sm:leading-6">
            Puedes permitir la medición de visitas y la publicidad por separado.
            Usamos cookies de Google Analytics para medir el uso de la web y de
            Meta para medir nuestros anuncios. Puedes seguir comprando sin
            aceptar y cambiar tu elección desde el pie.{" "}
            <a
              href="https://policies.google.com/technologies/partner-sites?hl=es"
              target="_blank"
              rel="noreferrer"
              className="underline underline-offset-2 hover:text-zinc-950"
            >
              Privacidad de Google
            </a>{" · "}
            <a
              href="https://www.facebook.com/privacy/policy/"
              target="_blank"
              rel="noreferrer"
              className="underline underline-offset-2 hover:text-zinc-950"
            >
              Privacidad de Meta
            </a>
          </p>
        </div>
        <div className="grid gap-3 sm:grid-cols-2">
          {googleAnalyticsId && (
            <label className="flex cursor-pointer items-start gap-3 text-xs leading-5 sm:text-sm">
              <input name="analytics" type="checkbox" defaultChecked={analyticsConsent === "granted"} className="mt-1 size-4 shrink-0 accent-zinc-950" />
              <span><strong className="block">Medición de visitas</strong><span className="text-zinc-600">Google Analytics: páginas vistas, visitantes y origen del tráfico.</span></span>
            </label>
          )}
          <label className="flex cursor-pointer items-start gap-3 text-xs leading-5 sm:text-sm">
            <input name="advertising" type="checkbox" defaultChecked={consent === "granted"} className="mt-1 size-4 shrink-0 accent-zinc-950" />
            <span><strong className="block">Publicidad</strong><span className="text-zinc-600">Meta: visitas desde anuncios de Instagram y Facebook.</span></span>
          </label>
        </div>
        <div className="grid gap-2 sm:grid-cols-3">
          <button
            ref={rejectRef}
            type="button"
            onClick={() => choose("denied", "denied")}
            className="min-h-11 cursor-pointer rounded-md border border-zinc-950 bg-white px-4 py-2.5 text-sm font-semibold text-zinc-950 transition hover:bg-zinc-100 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-zinc-950"
          >
            Rechazar todo
          </button>
          <button
            type="submit"
            className="min-h-11 cursor-pointer rounded-md border border-zinc-950 bg-white px-4 py-2.5 text-sm font-semibold text-zinc-950 transition hover:bg-zinc-100 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-zinc-950"
          >
            Guardar preferencias
          </button>
          <button
            type="button"
            onClick={() => choose("granted", "granted")}
            className="min-h-11 cursor-pointer rounded-md border border-zinc-950 bg-white px-4 py-2.5 text-sm font-semibold text-zinc-950 transition hover:bg-zinc-100 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-zinc-950"
          >
            Aceptar todo
          </button>
        </div>
      </form>
    </section>
  );
}
