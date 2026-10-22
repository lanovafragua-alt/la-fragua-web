"use client";

import Script from "next/script";
import { usePathname } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { useAdvertisingConsent } from "@/lib/advertising-consent";

const pixelId = "1836904827504099";

declare global {
  interface Window {
    fbq?: (...args: unknown[]) => void;
  }
}

const pixelCode = `
!function(f,b,e,v,n,t,s)
{if(f.fbq)return;n=f.fbq=function(){n.callMethod?
n.callMethod.apply(n,arguments):n.queue.push(arguments)};
if(!f._fbq)f._fbq=n;n.push=n;n.loaded=!0;n.version='2.0';
n.queue=[];n.disablePushState=true;t=b.createElement(e);t.async=!0;
t.src=v;s=b.getElementsByTagName(e)[0];
s.parentNode.insertBefore(t,s)}(window, document,'script',
'https://connect.facebook.net/en_US/fbevents.js');
fbq('set', 'autoConfig', false, '${pixelId}');
fbq('init', '${pixelId}');
`;

export function MetaPixel() {
  const pathname = usePathname();
  const consent = useAdvertisingConsent();
  const [isReady, setIsReady] = useState(false);
  const lastPageView = useRef<string | null>(null);

  useEffect(() => {
    if (consent !== "granted") {
      window.fbq?.("consent", "revoke");
      lastPageView.current = null;
      return;
    }

    if (!isReady || !window.fbq) return;
    window.fbq("consent", "grant");

    // Next.js navigation is tracked here; automatic history tracking is disabled.
    if (lastPageView.current === pathname) return;
    lastPageView.current = pathname;
    window.fbq("track", "PageView");
  }, [consent, isReady, pathname]);

  if (consent !== "granted") return null;

  return (
    <Script id="meta-pixel" strategy="afterInteractive" onReady={() => setIsReady(true)}>
      {pixelCode}
    </Script>
  );
}
