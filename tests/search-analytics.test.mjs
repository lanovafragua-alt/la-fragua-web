import assert from "node:assert/strict";
import fs from "node:fs";
import path from "node:path";
import test from "node:test";
import vm from "node:vm";
import ts from "typescript";

function load(file, imports = {}, globals = {}) {
  const source = fs.readFileSync(path.resolve(file), "utf8");
  const { outputText } = ts.transpileModule(source, {
    compilerOptions: { module: ts.ModuleKind.CommonJS, jsx: ts.JsxEmit.ReactJSX },
  });
  const fixture = { exports: {} };
  vm.runInNewContext(`(function(require, module, exports) { ${outputText}\n})`, {
    URL, URLSearchParams, Event, ...globals,
  })((name) => {
    assert.ok(name in imports, `Unexpected import: ${name}`);
    return imports[name];
  }, fixture, fixture.exports);
  return fixture.exports;
}

test("analytics URLs exclude form fields, fragments and unknown parameters", () => {
  const { analyticsUrl } = load("lib/google-analytics.ts");
  assert.equal(analyticsUrl("https://lafragua.online/ascuas/?email=private@example.com&utm_source=instagram#pedido", true), "https://lafragua.online/ascuas/?utm_source=instagram");
  assert.equal(analyticsUrl("https://example.com/?utm_source=instagram"), "https://example.com/");
  assert.equal(analyticsUrl("https://lafragua.online/?utm_source=private@example.com", true), "https://lafragua.online/");
  assert.equal(analyticsUrl("javascript:alert(1)"), "");
});

test("analytics and advertising permissions are independent and survive blocked storage", () => {
  const window = new EventTarget();
  const saved = new Map([["lafragua_advertising_consent_v1", "granted"]]);
  window.localStorage = { getItem: (key) => saved.get(key) ?? null, setItem: (key, value) => saved.set(key, value) };
  const consent = load("lib/advertising-consent.ts", {
    react: { useSyncExternalStore: (_subscribe, getSnapshot) => getSnapshot() },
  }, { window });
  assert.equal(consent.useAdvertisingConsent(), "granted");
  assert.equal(consent.useAnalyticsConsent(), null);
  consent.saveAnalyticsConsent("denied");
  assert.equal(consent.useAdvertisingConsent(), "granted");
  assert.equal(consent.useAnalyticsConsent(), "denied");
  window.localStorage.setItem = () => { throw new Error("Storage blocked"); };
  consent.saveAnalyticsConsent("granted");
  assert.equal(consent.useAnalyticsConsent(), "granted");
});

test("GA4 loads only with analytics permission and sends one view per route", () => {
  const refs = [];
  let cursor = 0;
  let effects = [];
  let consent = null;
  let pathname = "/";
  const window = { location: { href: "https://lafragua.online/?utm_source=instagram&email=private@example.com" } };
  const document = { title: "La Fragua", referrer: "https://instagram.com/?private=value" };
  const { analyticsUrl } = load("lib/google-analytics.ts");
  const { GoogleAnalytics } = load("components/GoogleAnalytics.tsx", {
    react: {
      useEffect: (effect) => effects.push(effect),
      useRef: (value) => refs[cursor++] ??= { current: value },
    },
    "react/jsx-runtime": { jsx: (type, props) => ({ type, props }) },
    "next/script": { default: "script" },
    "next/navigation": { usePathname: () => pathname },
    "@/lib/advertising-consent": { useAnalyticsConsent: () => consent },
    "@/lib/google": { googleAnalyticsId: "G-TEST" },
    "@/lib/google-analytics": { analyticsUrl },
  }, { window, document });
  const render = () => {
    cursor = 0;
    effects = [];
    const result = GoogleAnalytics();
    effects.forEach((effect) => effect());
    return result;
  };
  const calls = () => (window.dataLayer ?? []).map((args) => Array.from(args));
  const views = () => calls().filter(([type, name]) => type === "event" && name === "page_view");

  assert.equal(render(), null);
  assert.equal(window.dataLayer, undefined);
  consent = "denied";
  assert.equal(render(), null);
  consent = "granted";
  assert.match(render().props.src, /gtag\/js\?id=G-TEST$/);
  render(); // React Strict Mode must not double-count the view.
  assert.equal(views().length, 1);
  assert.equal(views()[0][2].page_location, "https://lafragua.online/?utm_source=instagram");
  assert.equal(views()[0][2].page_referrer, "https://instagram.com/");
  assert.equal(calls().find(([type]) => type === "config")[2].send_page_view, false);
  assert.equal(calls().find(([type, mode]) => type === "consent" && mode === "default")[2].ad_storage, "denied");

  pathname = "/ascuas/";
  window.location.href = "https://lafragua.online/ascuas/#pedido";
  render();
  assert.equal(views().length, 2);
  assert.equal(views()[1][2].page_referrer, "https://lafragua.online/?utm_source=instagram");
  consent = "denied";
  assert.equal(render(), null);
  assert.equal(window["ga-disable-G-TEST"], true);
  pathname = "/curso/";
  render();
  assert.equal(views().length, 2);
  consent = "granted";
  render();
  assert.equal(views().length, 3);
  assert.equal(calls().filter(([type]) => type === "config").length, 1);
});

test("product metadata uses canonical URLs and real prices without invented reviews", () => {
  const product = { name: "Ascuas", slug: "ascuas", href: "/ascuas", price: "39,90 €", summary: "Lámpara", category: "Luz", imageSrc: "/lamp.jpg" };
  const seo = load("lib/seo.ts", {
    "@/lib/site": { siteUrl: "https://lafragua.online", catalogProducts: [product], contact: {} },
  });
  assert.equal(seo.productMetadata(product).alternates.canonical, "https://lafragua.online/ascuas/");
  assert.equal(seo.productMetadata(product).title.absolute, "Lámpara de mesa Ascuas impresa en 3D | La Fragua");
  const schema = seo.productStructuredData(product)["@graph"][0];
  assert.equal(schema.offers.price, "39.90");
  assert.equal(schema.offers.priceCurrency, "EUR");
  assert.equal(schema.aggregateRating, undefined);
  assert.equal(schema.offers.availability, undefined);
  assert.equal(seo.productStructuredData({ ...product, price: "Consultar" })["@graph"][0].offers, undefined);
  assert.equal(seo.organizationStructuredData()["@graph"][0].address, undefined);
  assert.equal(seo.pageMetadata({ title: "Prueba", path: "/experimento-ascuas", noIndex: true }).robots.index, false);
});
