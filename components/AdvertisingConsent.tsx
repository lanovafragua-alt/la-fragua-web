"use client";

import { SlidersHorizontal } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import {
  advertisingPreferencesEvent,
  saveAdvertisingConsent,
  useAdvertisingConsent,
  type AdvertisingConsent,
} from "@/lib/advertising-consent";

export function AdvertisingPreferencesButton() {
  return (
    <button
      id="advertising-preferences"
      type="button"
      onClick={() => window.dispatchEvent(new Event(advertisingPreferencesEvent))}
      className="inline-flex cursor-pointer items-center gap-2 text-left text-sm text-zinc-500 transition hover:text-ember-500"
    >
      <SlidersHorizontal className="size-4" aria-hidden="true" />
      Preferencias de publicidad
    </button>
  );
}

export function AdvertisingConsentBanner() {
  const consent = useAdvertisingConsent();
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

  const choose = (choice: AdvertisingConsent) => {
    saveAdvertisingConsent(choice);
    setIsEditing(false);
    if (isEditing) document.getElementById("advertising-preferences")?.focus();
  };

  if (consent === "pending" || (consent !== null && !isEditing)) return null;

  return (
    <section
      role="region"
      aria-labelledby="advertising-consent-title"
      className="fixed inset-x-3 bottom-3 z-[60] mx-auto max-w-4xl rounded-lg border border-zinc-200 bg-white p-4 text-zinc-950 shadow-[0_8px_40px_rgba(0,0,0,0.16)] sm:p-5"
    >
      <div className="grid gap-4 md:grid-cols-[1fr_auto] md:items-center">
        <div>
          <h2 id="advertising-consent-title" className="text-sm font-semibold">
            Publicidad de Meta
          </h2>
          <p className="mt-2 text-xs leading-5 text-zinc-600 sm:text-sm sm:leading-6">
            Con tu permiso, usamos cookies publicitarias de Meta para medir las
            visitas desde nuestros anuncios de Instagram y Facebook. Puedes
            seguir comprando sin aceptar.{" "}
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
        <div className="grid grid-cols-2 gap-3">
          <button
            ref={rejectRef}
            type="button"
            onClick={() => choose("denied")}
            className="min-h-11 cursor-pointer rounded-md border border-zinc-950 bg-white px-4 py-2.5 text-sm font-semibold text-zinc-950 transition hover:bg-zinc-100 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-zinc-950"
          >
            Rechazar
          </button>
          <button
            type="button"
            onClick={() => choose("granted")}
            className="min-h-11 cursor-pointer rounded-md border border-zinc-950 bg-white px-4 py-2.5 text-sm font-semibold text-zinc-950 transition hover:bg-zinc-100 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-zinc-950"
          >
            Aceptar
          </button>
        </div>
      </div>
    </section>
  );
}
