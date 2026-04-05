import gplay from "google-play-scraper";
import { StoreData } from "./types";
import { COUNTRIES } from "@/data/countries";

function sleep(ms: number) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

export async function fetchStoreData(
  appId: string,
  countryCode: string
): Promise<StoreData> {
  const countryInfo = COUNTRIES.find(
    (c) => c.code.toLowerCase() === countryCode.toLowerCase()
  );

  const lang = countryInfo?.lang || "en";

  const result = await gplay.app({
    appId,
    country: countryCode.toUpperCase(),
    lang: lang || "en",
    throttle: 1,
  });

  return {
    country: countryCode.toLowerCase(),
    countryName: countryInfo?.name || countryCode,
    flag: countryInfo?.flag || "🏳️",
    title: result.title || "",
    summary: result.summary || "",
    description: result.description || "",
    icon: result.icon || "",
    headerImage: result.headerImage || "",
    screenshots: result.screenshots || [],
    video: result.video || null,
    score: result.score || 0,
    ratings: result.ratings || 0,
    reviews: result.reviews || 0,
    histogram: result.histogram || {},
    price: result.price || 0,
    free: result.free ?? true,
    priceText: result.priceText || "Free",
    currency: result.currency || "USD",
    installs: result.installs || "0",
    minInstalls: result.minInstalls || 0,
    developer: result.developer || "",
    genre: result.genre || "",
    contentRating: result.contentRating || "",
    version: result.version || "",
    updated: result.updated || 0,
    recentChanges: result.recentChanges || "",
    adSupported: result.adSupported ?? false,
    offersIAP: result.offersIAP ?? false,
    fetchedAt: new Date().toISOString(),
  };
}

export async function fetchMultipleCountries(
  appId: string,
  countries: string[]
): Promise<{ results: StoreData[]; errors: { country: string; message: string }[] }> {
  const results: StoreData[] = [];
  const errors: { country: string; message: string }[] = [];

  for (const country of countries) {
    try {
      const data = await fetchStoreData(appId, country);
      results.push(data);
    } catch (error: unknown) {
      const message = error instanceof Error ? error.message : "Unknown error";
      errors.push({ country, message });
    }
    // Delay between requests to avoid rate limiting
    if (countries.indexOf(country) < countries.length - 1) {
      await sleep(500);
    }
  }

  return { results, errors };
}
