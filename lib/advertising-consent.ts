"use client";

import { useSyncExternalStore } from "react";

export type AdvertisingConsent = "granted" | "denied";

export const advertisingPreferencesEvent = "lafragua:open-advertising-preferences";

function createConsentStore(storageKey: string, changeEvent: string) {
  let memoryConsent: AdvertisingConsent | null = null;

  function getSnapshot(): AdvertisingConsent | null {
    if (memoryConsent !== null) return memoryConsent;
    try {
      const saved = window.localStorage.getItem(storageKey);
      return saved === "granted" || saved === "denied" ? saved : null;
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

  function useConsent() {
    return useSyncExternalStore<AdvertisingConsent | null | "pending">(
      subscribe,
      getSnapshot,
      getServerSnapshot,
    );
  }

  function saveConsent(consent: AdvertisingConsent) {
    memoryConsent = consent;
    try {
      window.localStorage.setItem(storageKey, consent);
    } catch {
      // Keep the choice for this page when browser storage is unavailable.
    }
    window.dispatchEvent(new Event(changeEvent));
  }

  return { useConsent, saveConsent };
}

const advertisingStore = createConsentStore(
  "lafragua_advertising_consent_v1",
  "lafragua:advertising-consent",
);
const analyticsStore = createConsentStore(
  "lafragua_analytics_consent_v1",
  "lafragua:analytics-consent",
);

export const useAdvertisingConsent = advertisingStore.useConsent;
export const saveAdvertisingConsent = advertisingStore.saveConsent;
export const useAnalyticsConsent = analyticsStore.useConsent;
export const saveAnalyticsConsent = analyticsStore.saveConsent;
