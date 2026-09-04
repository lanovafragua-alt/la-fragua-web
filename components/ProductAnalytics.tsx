"use client";

import { useEffect } from "react";
import { trackEvent } from "@/lib/analytics";

type ProductAnalyticsProps = {
  product: string;
};

export function ProductAnalytics({ product }: ProductAnalyticsProps) {
  useEffect(() => {
    trackEvent("product_viewed", { product });

    const handleTrackedClick = (event: MouseEvent) => {
      if (!(event.target instanceof Element)) return;

      const target = event.target.closest<HTMLElement>("[data-analytics-event]");
      if (!target) return;

      const eventName = target.dataset.analyticsEvent;
      if (!eventName) return;

      trackEvent(eventName, {
        product,
        placement: target.dataset.analyticsPlacement,
      });
    };

    document.addEventListener("click", handleTrackedClick);
    return () => document.removeEventListener("click", handleTrackedClick);
  }, [product]);

  return null;
}
