const campaignParameters = [
  "utm_source", "utm_medium", "utm_campaign", "utm_content", "utm_term",
];

export function analyticsUrl(value: string, includeCampaign = false) {
  try {
    const url = new URL(value);
    if (url.protocol !== "https:" && url.protocol !== "http:") return "";
    const query = new URLSearchParams();
    if (includeCampaign) {
      for (const key of campaignParameters) {
        const item = url.searchParams.get(key);
        if (item && item.length <= 200 && !item.includes("@")) query.set(key, item);
      }
    }
    url.username = "";
    url.password = "";
    url.search = query.toString();
    url.hash = "";
    return url.toString();
  } catch {
    return "";
  }
}
