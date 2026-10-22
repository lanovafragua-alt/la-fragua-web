"use client";

import { useSyncExternalStore } from "react";

export type AdvertisingConsent = "granted" | "denied";

const storageKey = "lafragua_advertising_consent_v1";
const changeEvent = "lafragua:advertising-consent";
export const advertisingPreferencesEvent = "lafragua:open-advertising-preferences";
let memoryConsent: AdvertisingConsent | null = null;

function getSnapshot(): AdvertisingConsent | null {
  if (memoryConsent !== null) return memoryConsent;
  try {
    const saved = window.localStorage.getItem(storageKey);
    return saved === "granted" || saved === "denied" ? saved : memoryConsent;
  } catch {
    return memoryConsent;
  }
}

function getServerSnapshot() {
  return "pending" as const;
}

function subscribe(onChange: () => void) {
  const onStorage = (event: StorageEvent) => {
    if (event.key === storageKey || event.key === null) {
      memoryConsent = null;
      onChange();
    }
  };

  window.addEventListener(changeEvent, onChange);
  window.addEventListener("storage", onStorage);
  return () => {
    window.removeEventListener(changeEvent, onChange);
    window.removeEventListener("storage", onStorage);
  };
}

export function useAdvertisingConsent() {
  return useSyncExternalStore<AdvertisingConsent | null | "pending">(
    subscribe,
    getSnapshot,
    getServerSnapshot,
  );
}

export function saveAdvertisingConsent(consent: AdvertisingConsent) {
  memoryConsent = consent;
  try {
    window.localStorage.setItem(storageKey, consent);
  } catch {
    // Keep the choice for this page when browser storage is unavailable.
  }
  window.dispatchEvent(new Event(changeEvent));
}
