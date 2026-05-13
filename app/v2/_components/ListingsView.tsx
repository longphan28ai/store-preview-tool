"use client";

import { useState } from "react";
import { MOCK_APPS, MOCK_COUNTRIES, type MockApp } from "./mockData";

type CountryListing = {
  code: string;
  name: string;
  flag: string;
  title: string;
  rating: number;
  reviews: number;
  installs: string;
  shortDesc: string;
  screenshots: { tone: string; label: string }[];
  // Hidden by default behind Details toggle
  price: string;
  iap: string;
  ads: string;
  version: string;
  age: string;
  genre: string;
  updated: string;
};

// Tones used to render fake screenshot tiles (no real images in mockup)
const SS_TONES = [
  "from-violet-500 via-fuchsia-500 to-pink-500",
  "from-emerald-400 via-teal-500 to-cyan-500",
  "from-amber-400 via-orange-500 to-rose-500",
  "from-blue-500 via-indigo-500 to-violet-500",
  "from-rose-500 via-pink-500 to-fuchsia-500",
  "from-cyan-400 via-sky-500 to-blue-500",
];

function buildListings(app: MockApp, codes: string[]): CountryListing[] {
  // Deterministic variation per country so mockup feels real but diff is visible
  const seedMap: Record<string, { titleSuffix: string; rating: number; reviewsMul: number; ssCount: number; short: string }> = {
    US: { titleSuffix: "", rating: app.rating, reviewsMul: 1, ssCount: 7, short: "AI assistant for chat, photos, and trendy videos." },
    GB: { titleSuffix: "", rating: app.rating - 0.1, reviewsMul: 0.7, ssCount: 8, short: "AI assistant for chat, photos, and trendy videos." },
    JP: { titleSuffix: " - AIアシスタント", rating: app.rating - 0.2, reviewsMul: 0.4, ssCount: 8, short: "AIチャット、写真生成、動画作成のすべてを1つに。" },
    KR: { titleSuffix: " - AI 어시스턴트", rating: app.rating + 0.1, reviewsMul: 0.3, ssCount: 8, short: "AI 챗봇과 사진 편집을 한 곳에서." },
    DE: { titleSuffix: " - KI Assistent", rating: app.rating - 0.3, reviewsMul: 0.5, ssCount: 8, short: "KI-Assistent für Chat, Fotos und Videos." },
    FR: { titleSuffix: " - Assistant IA", rating: app.rating, reviewsMul: 0.6, ssCount: 7, short: "Assistant IA tout-en-un pour chat, photos, vidéos." },
    BR: { titleSuffix: " - Assistente IA", rating: app.rating + 0.2, reviewsMul: 0.55, ssCount: 7, short: "Assistente IA para conversar, criar fotos e vídeos." },
    ID: { titleSuffix: "", rating: app.rating + 0.1, reviewsMul: 0.65, ssCount: 7, short: "Asisten AI untuk chat, foto, dan video tren." },
    VN: { titleSuffix: " - Trợ lý AI", rating: app.rating + 0.05, reviewsMul: 0.8, ssCount: 7, short: "Trợ lý AI cho trò chuyện, ảnh và video xu hướng." },
  };

  return codes.map((code) => {
    const country = MOCK_COUNTRIES.find((c) => c.code === code)!;
    const seed = seedMap[code] ?? seedMap.US;
    const reviews = Math.round(app.reviews * seed.reviewsMul);
    const screenshots = Array.from({ length: seed.ssCount }).map((_, i) => ({
      tone: SS_TONES[(i + code.charCodeAt(0)) % SS_TONES.length],
      label: ["Hero", "Feature", "Try Now", "Results", "Premium", "Compare", "Reviews", "CTA"][i] ?? "Screen",
    }));
    return {
      code: country.code,
      name: country.name,
      flag: country.flag,
      title: app.name + seed.titleSuffix,
      rating: Math.round(seed.rating * 10) / 10,
      reviews,
      installs: app.installs,
      shortDesc: seed.short,
      screenshots,
      price: "Free",
      iap: "Yes",
      ads: "Yes",
      version: "2.0.4",
      age: code === "GB" ? "PEGI 3" : code === "DE" ? "USK 0" : "Everyone",
      genre: app.category,
      updated: app.updated,
    };
  });
}

export default function ListingsView() {
  const [selectedAppCode, setSelectedAppCode] = useState(MOCK_APPS[0].productCode);
  const [selectedCountries, setSelectedCountries] = useState<string[]>(["US", "GB", "JP", "DE", "VN"]);
  const [diffOn, setDiffOn] = useState(true);
  const [showAppPicker, setShowAppPicker] = useState(false);

  const app = MOCK_APPS.find((a) => a.productCode === selectedAppCode)!;
  const listings = buildListings(app, selectedCountries);

  function toggleCountry(code: string) {
    setSelectedCountries((prev) =>
      prev.includes(code) ? prev.filter((c) => c !== code) : [...prev, code]
    );
  }

  return (
    <div className="px-6 py-6 max-w-[1600px] mx-auto">
      {/* Page header */}
      <div className="flex items-start justify-between mb-5">
        <div>
          <h1 className="text-2xl font-semibold tracking-tight text-slate-100">Store Listings</h1>
          <p className="text-sm text-slate-400 mt-0.5">Compare one app across markets · Visual-first view</p>
        </div>
        <div className="flex items-center gap-2">
          <label className="flex items-center gap-2 px-3 h-9 rounded-md bg-slate-900/60 border border-slate-800 text-xs text-slate-300 cursor-pointer">
            <input
              type="checkbox"
              checked={diffOn}
              onChange={(e) => setDiffOn(e.target.checked)}
              className="w-3.5 h-3.5 accent-emerald-500"
            />
            Highlight diffs
          </label>
          <button className="h-9 px-3 text-sm font-medium text-slate-300 bg-slate-900/60 border border-slate-800 hover:border-slate-700 rounded-md flex items-center gap-1.5">
            <svg className="w-4 h-4" viewBox="0 0 20 20" fill="currentColor"><path d="M3 17a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM6.293 6.707a1 1 0 010-1.414l3-3a1 1 0 011.414 0l3 3a1 1 0 01-1.414 1.414L11 5.414V13a1 1 0 11-2 0V5.414L7.707 6.707a1 1 0 01-1.414 0z"/></svg>
            Export
          </button>
        </div>
      </div>

      {/* Selector card */}
      <div className="rounded-xl border border-slate-800 bg-slate-900/40 p-4 mb-5">
        <div className="flex flex-col lg:flex-row gap-4">
          {/* App picker */}
          <div className="lg:w-[420px] shrink-0">
            <div className="text-[11px] uppercase tracking-wider text-slate-500 font-medium mb-1.5">App</div>
            <button
              onClick={() => setShowAppPicker((v) => !v)}
              className="w-full h-12 px-3 rounded-lg bg-slate-950/60 border border-slate-800 hover:border-emerald-500/40 transition-colors flex items-center gap-3 text-left"
            >
              <div className={`w-9 h-9 rounded-md bg-gradient-to-br ${app.iconBg} flex items-center justify-center text-xs font-bold text-white shrink-0`}>
                {app.icon}
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2">
                  <span className="text-[10px] font-mono px-1.5 py-0.5 rounded bg-slate-800 text-slate-400">{app.productCode}</span>
                  <span className="text-sm font-medium text-slate-100 truncate">{app.name}</span>
                </div>
                <div className="text-xs text-slate-500 truncate">{app.packageId}</div>
              </div>
              <svg className={`w-4 h-4 text-slate-500 transition-transform ${showAppPicker ? "rotate-180" : ""}`} viewBox="0 0 20 20" fill="currentColor"><path fillRule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clipRule="evenodd"/></svg>
            </button>
            {showAppPicker && (
              <div className="mt-2 max-h-72 overflow-y-auto rounded-lg border border-slate-800 bg-slate-950/95 backdrop-blur p-1">
                {MOCK_APPS.map((a) => (
                  <button
                    key={a.productCode}
                    onClick={() => { setSelectedAppCode(a.productCode); setShowAppPicker(false); }}
                    className={`w-full px-2 py-2 rounded flex items-center gap-2.5 text-left hover:bg-slate-800/60 ${
                      a.productCode === selectedAppCode ? "bg-emerald-500/10" : ""
                    }`}
                  >
                    <div className={`w-7 h-7 rounded bg-gradient-to-br ${a.iconBg} flex items-center justify-center text-[10px] font-bold text-white shrink-0`}>
                      {a.icon}
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="text-xs text-slate-100 truncate font-medium">{a.name}</div>
                      <div className="text-[10px] text-slate-500 truncate">{a.productCode} · {a.category}</div>
                    </div>
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Country chips */}
          <div className="flex-1 min-w-0">
            <div className="flex items-center justify-between mb-1.5">
              <div className="text-[11px] uppercase tracking-wider text-slate-500 font-medium">
                Countries · {selectedCountries.length} selected
              </div>
              <div className="flex items-center gap-2">
                <button
                  onClick={() => setSelectedCountries(MOCK_COUNTRIES.map((c) => c.code))}
                  className="text-[11px] text-emerald-300 hover:text-emerald-200"
                >
                  All
                </button>
                <span className="text-slate-700">·</span>
                <button
                  onClick={() => setSelectedCountries([])}
                  className="text-[11px] text-slate-400 hover:text-slate-200"
                >
                  Clear
                </button>
              </div>
            </div>
            <div className="flex flex-wrap gap-1.5">
              {MOCK_COUNTRIES.map((c) => {
                const on = selectedCountries.includes(c.code);
                return (
                  <button
                    key={c.code}
                    onClick={() => toggleCountry(c.code)}
                    className={`h-9 px-2.5 rounded-md text-sm flex items-center gap-2 border transition-colors ${
                      on
                        ? "bg-emerald-500/10 border-emerald-500/40 text-emerald-200"
                        : "bg-slate-950/40 border-slate-800 text-slate-400 hover:border-slate-700 hover:text-slate-200"
                    }`}
                  >
                    <span className="text-base leading-none">{c.flag}</span>
                    <span className="font-mono text-[11px]">{c.code}</span>
                    {on && <svg className="w-3 h-3 text-emerald-400" viewBox="0 0 20 20" fill="currentColor"><path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd"/></svg>}
                  </button>
                );
              })}
            </div>
          </div>
        </div>
      </div>

      {/* Empty state */}
      {selectedCountries.length === 0 && (
        <div className="rounded-xl border border-dashed border-slate-700 bg-slate-900/30 p-10 text-center">
          <div className="text-3xl mb-2">🌍</div>
          <div className="text-sm text-slate-300 mb-1">Pick at least one country</div>
          <div className="text-xs text-slate-500">Click a flag chip above to load its store listing</div>
        </div>
      )}

      {/* Country rows */}
      <div className="space-y-3">
        {listings.map((l, idx) => (
          <ListingRow key={l.code} listing={l} prev={listings[0]} diffOn={diffOn && idx > 0} />
        ))}
      </div>
    </div>
  );
}

function ListingRow({ listing, prev, diffOn }: { listing: CountryListing; prev: CountryListing; diffOn: boolean }) {
  const [showDetails, setShowDetails] = useState(false);
  const titleDifferent = diffOn && listing.title !== prev.title;
  const shortDifferent = diffOn && listing.shortDesc !== prev.shortDesc;
  const ssCountDifferent = diffOn && listing.screenshots.length !== prev.screenshots.length;

  return (
    <div className="rounded-xl border border-slate-800 bg-slate-900/40 hover:border-slate-700 transition-colors overflow-hidden">
      {/* Row header: flag + title + rating + installs */}
      <div className="grid grid-cols-1 lg:grid-cols-[180px_1fr_auto] gap-4 px-4 py-3.5 items-center border-b border-slate-800/60">
        <div className="flex items-center gap-2.5">
          <span className="text-2xl leading-none">{listing.flag}</span>
          <div>
            <div className="text-sm font-medium text-slate-100">{listing.name}</div>
            <div className="text-[10px] font-mono text-slate-500">{listing.code}</div>
          </div>
        </div>
        <div className="min-w-0">
          <div className={`text-sm font-semibold truncate ${titleDifferent ? "bg-amber-400/15 text-amber-100 px-1.5 -mx-1.5 rounded" : "text-slate-100"}`}>
            {listing.title}
          </div>
          <div className={`text-xs truncate mt-0.5 ${shortDifferent ? "text-amber-200/80" : "text-slate-400"}`}>
            {listing.shortDesc}
          </div>
        </div>
        <div className="flex items-center gap-4">
          <div className="text-right">
            <div className="flex items-center gap-1 justify-end">
              <svg className="w-4 h-4 text-amber-400" viewBox="0 0 20 20" fill="currentColor"><path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"/></svg>
              <span className="text-sm font-semibold text-slate-100 tabular-nums">{listing.rating.toFixed(1)}</span>
            </div>
            <div className="text-[10px] text-slate-500 tabular-nums">{listing.reviews.toLocaleString()} reviews</div>
          </div>
          <div className="text-right">
            <div className="text-sm font-semibold text-slate-100 tabular-nums">{listing.installs}</div>
            <div className="text-[10px] text-slate-500">installs</div>
          </div>
        </div>
      </div>

      {/* Screenshot strip - HERO */}
      <div className="px-4 py-4">
        <div className="flex items-center justify-between mb-2">
          <div className={`text-[11px] uppercase tracking-wider font-medium ${ssCountDifferent ? "text-amber-300" : "text-slate-500"}`}>
            {listing.screenshots.length} screenshots
            {ssCountDifferent && <span className="ml-1.5 text-amber-300">· differs from {prev.code}</span>}
          </div>
          <button
            onClick={() => setShowDetails((v) => !v)}
            className="text-[11px] text-slate-400 hover:text-emerald-300 flex items-center gap-1"
          >
            {showDetails ? "Hide" : "Show"} details
            <svg className={`w-3 h-3 transition-transform ${showDetails ? "rotate-180" : ""}`} viewBox="0 0 20 20" fill="currentColor"><path fillRule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clipRule="evenodd"/></svg>
          </button>
        </div>
        <div className="flex gap-2 overflow-x-auto pb-1 -mx-1 px-1 snap-x">
          {listing.screenshots.map((s, i) => (
            <div
              key={i}
              className={`shrink-0 w-[140px] h-[260px] rounded-lg bg-gradient-to-br ${s.tone} relative ring-1 ring-white/5 snap-start overflow-hidden`}
            >
              <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent" />
              <div className="absolute top-2 left-2 text-[10px] font-semibold text-white/90 px-1.5 py-0.5 rounded bg-black/30 backdrop-blur">
                {i + 1}
              </div>
              <div className="absolute bottom-2 left-2 right-2 text-[11px] font-medium text-white drop-shadow">
                {s.label}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Details (collapsed by default) */}
      {showDetails && (
        <div className="border-t border-slate-800/60 px-4 py-3 bg-slate-950/40 grid grid-cols-2 lg:grid-cols-6 gap-3 text-xs">
          <DetailItem label="Price" value={listing.price} />
          <DetailItem label="IAP" value={listing.iap} />
          <DetailItem label="Ads" value={listing.ads} />
          <DetailItem label="Version" value={listing.version} />
          <DetailItem label="Age rating" value={listing.age} />
          <DetailItem label="Updated" value={listing.updated} />
        </div>
      )}

      {/* Footer actions */}
      <div className="border-t border-slate-800/60 px-4 py-2.5 flex items-center justify-between bg-slate-950/20">
        <div className="text-[10px] text-slate-500">
          Genre · <span className="text-slate-400">{listing.genre}</span>
        </div>
        <div className="flex items-center gap-2">
          <button className="h-7 px-2.5 text-[11px] text-slate-300 hover:text-slate-100 hover:bg-slate-800 rounded">
            Copy link
          </button>
          <button className="h-7 px-2.5 text-[11px] font-medium text-emerald-300 bg-emerald-500/10 hover:bg-emerald-500/20 ring-1 ring-inset ring-emerald-500/20 rounded flex items-center gap-1">
            Open in Play Store
            <svg className="w-3 h-3" viewBox="0 0 20 20" fill="currentColor"><path d="M11 3a1 1 0 100 2h2.586l-6.293 6.293a1 1 0 101.414 1.414L15 6.414V9a1 1 0 102 0V4a1 1 0 00-1-1h-5z"/><path d="M5 5a2 2 0 00-2 2v8a2 2 0 002 2h8a2 2 0 002-2v-3a1 1 0 10-2 0v3H5V7h3a1 1 0 000-2H5z"/></svg>
          </button>
        </div>
      </div>
    </div>
  );
}

function DetailItem({ label, value }: { label: string; value: string }) {
  return (
    <div>
      <div className="text-[10px] uppercase tracking-wider text-slate-500">{label}</div>
      <div className="text-slate-200 font-medium">{value}</div>
    </div>
  );
}
