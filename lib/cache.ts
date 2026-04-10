import { StoreData } from "./types";

const cache = new Map<string, { data: StoreData; expiresAt: number }>();

const DEFAULT_TTL = 30 * 60 * 1000; // 30 minutes

export function getCached(key: string): StoreData | null {
  const entry = cache.get(key);
  if (!entry) return null;
  if (Date.now() > entry.expiresAt) {
    cache.delete(key);
    return null;
  }
  return entry.data;
}

export function setCache(key: string, data: StoreData, ttlMs = DEFAULT_TTL) {
  cache.set(key, { data, expiresAt: Date.now() + ttlMs });
}

export function cacheKey(appId: string, country: string, lang?: string): string {
  return lang ? `${appId}:${country}:${lang}` : `${appId}:${country}`;
}
