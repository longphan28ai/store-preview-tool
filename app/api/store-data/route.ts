import { NextRequest, NextResponse } from "next/server";
import { getCached, setCache, cacheKey } from "@/lib/cache";
import { fetchStoreData } from "@/lib/scraper";
import { APPS } from "@/data/apps";
import { StoreData } from "@/lib/types";

export const maxDuration = 60;

function sleep(ms: number) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { appId, countries, isCompetitor } = body as {
      appId: string;
      countries: string[];
      isCompetitor?: boolean;
    };

    if (!appId || !countries || !Array.isArray(countries)) {
      return NextResponse.json(
        { error: "Missing appId or countries" },
        { status: 400 }
      );
    }

    // Validate app exists in registry (skip for competitor apps)
    if (!isCompetitor) {
      const app = APPS.find((a) => a.packageId === appId);
      if (!app) {
        return NextResponse.json(
          { error: "App not found in registry" },
          { status: 404 }
        );
      }
    }

    // Cap at 20 countries per request
    const limitedCountries = countries.slice(0, 20);

    const results: StoreData[] = [];
    const errors: { country: string; message: string }[] = [];

    for (const country of limitedCountries) {
      // Check cache first
      const key = cacheKey(appId, country);
      const cached = getCached(key);
      if (cached) {
        results.push(cached);
        continue;
      }

      // Fetch from Google Play
      try {
        const data = await fetchStoreData(appId, country);
        setCache(key, data);
        results.push(data);
      } catch (error: unknown) {
        const message =
          error instanceof Error ? error.message : "Unknown error";
        errors.push({ country, message });
      }

      // Delay between real fetches
      await sleep(500);
    }

    return NextResponse.json({ results, errors });
  } catch (error: unknown) {
    const message = error instanceof Error ? error.message : "Server error";
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
