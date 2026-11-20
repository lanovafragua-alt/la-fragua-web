"use client";

import Script from "next/script";
import { usePathname } from "next/navigation";
import { useEffect, useRef } from "react";
import { useAnalyticsConsent } from "@/lib/advertising-consent";
import { googleAnalyticsId } from "@/lib/google";
import { analyticsUrl } from "@/lib/google-analytics";

declare global {
  interface Window {
    dataLayer?: unknown[];
    gtag?: (...args: unknown[]) => void;
  }
}

export function GoogleAnalytics() {
  const pathname = usePathname();
  const consent = useAnalyticsConsent();
  const initialized = useRef(false);
  const lastPage = useRef<string | null>(null);
  const previousUrl = useRef<string | null>(null);

  useEffect(() => {
    if (!googleAnalyticsId) return;
    const disabledKey = `ga-disable-${googleAnalyticsId}`;
    const flags = window as unknown as Record<string, unknown>;
    flags[disabledKey] = consent !== "granted";

    if (consent !== "granted") {
      if (initialized.current) window.gtag?.("consent", "update", { analytics_storage: "denied" });
      lastPage.current = null;
      return;
    }

    window.dataLayer ??= [];
    window.gtag ??= function () { window.dataLayer!.push(arguments); };
    const location = analyticsUrl(window.location.href, true);
    const referrer = previousUrl.current ?? analyticsUrl(document.referrer);

    if (!initialized.current) {
      initialized.current = true;
      window.gtag("consent", "default", {
        analytics_storage: "denied",
        ad_storage: "denied",
        ad_user_data: "denied",
        ad_personalization: "denied",
      });
      window.gtag("js", new Date());
      window.gtag("config", googleAnalyticsId, {
        send_page_view: false,
        allow_google_signals: false,
        allow_ad_personalization_signals: false,
        page_location: location,
        page_referrer: referrer,
      });
    }

    window.gtag("consent", "update", { analytics_storage: "granted" });
    // Enhanced measurement is off in GA4; React owns the initial and SPA views.
    if (lastPage.current === pathname) return;
    lastPage.current = pathname;
    window.gtag("event", "page_view", {
      send_to: googleAnalyticsId,
      page_title: document.title,
      page_location: location,
      page_referrer: referrer,
    });
    previousUrl.current = location;
  }, [consent, pathname]);

  if (!googleAnalyticsId || consent !== "granted") return null;

  return (
    <Script
      id="google-analytics"
      src={`https://www.googletagmanager.com/gtag/js?id=${googleAnalyticsId}`}
      strategy="afterInteractive"
    />
  );
}
