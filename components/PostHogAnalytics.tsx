"use client";

import { useEffect } from "react";
import { usePathname } from "next/navigation";
import posthog from "posthog-js";

let isPostHogReady = false;

function startPostHog() {
  const projectToken = process.env.NEXT_PUBLIC_POSTHOG_PROJECT_TOKEN;

  if (!projectToken || isPostHogReady) {
    return Boolean(projectToken);
  }

  posthog.init(projectToken, {
    api_host:
      process.env.NEXT_PUBLIC_POSTHOG_HOST ?? "https://us.i.posthog.com",
    defaults: "2026-01-30",
    autocapture: false,
    capture_pageview: false,
    capture_pageleave: true,
    cookieless_mode: "always",
    person_profiles: "identified_only",
    disable_session_recording: true,
    loaded: () => {
      window.dispatchEvent(new Event("lafragua:posthog-ready"));
    },
  });

  isPostHogReady = true;
  return true;
}

export function PostHogAnalytics() {
  const pathname = usePathname();

  useEffect(() => {
    if (!startPostHog()) return;

    posthog.capture("$pageview", {
      $current_url: window.location.href,
      path: pathname,
      source: "lafragua-next-app",
    });

    posthog.capture("lafragua_page_viewed", {
      path: pathname,
      source: "lafragua-next-app",
    });
  }, [pathname]);

  useEffect(() => {
    if (!startPostHog()) return;

    const storageKey = "lafragua_posthog_installation_test";
    if (window.sessionStorage.getItem(storageKey)) return;

    window.sessionStorage.setItem(storageKey, "sent");
    posthog.capture("lafragua_posthog_installation_test", {
      source: "lafragua-next-app",
    });
  }, []);

  return null;
}
