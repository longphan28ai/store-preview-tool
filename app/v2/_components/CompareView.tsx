"use client";

import { useState, useEffect } from "react";
import {
  MOCK_APPS,
  MOCK_COUNTRIES,
  MOCK_LANGUAGES,
  buildPlayStoreUrl,
  type MockApp,
  type MockCountry,
} from "./mockData";

type StoreMode = "main" | "custom";
type LangStrategy = "auto" | "force";

// Tones used to render fake screenshot tiles
const SS_TONES = [
  "from-violet-500 via-fuchsia-500 to-pink-500",
  "from-emerald-400 via-teal-500 to-cyan-500",
  "from-amber-400 via-orange-500 to-rose-500",
  "from-blue-500 via-indigo-500 to-violet-500",
  "from-rose-500 via-pink-500 to-fuchsia-500",
  "from-cyan-400 via-sky-500 to-blue-500",
];

type Listing = {
  title: string;
  shortDesc: string;
  longDesc: string;
  rating: number;
  reviews: number;
  installs: string;
  size: string;
  updated: string;
  screenshots: { tone: string; label: string }[];
  category: string;
  price: string;
  iap: string;
  ads: string;
  version: string;
  age: string;
  asoScore: number;
};

function buildListingFor(app: MockApp, country: MockCountry, hl: string): Listing {
  // Deterministic mock content per (app, country, hl)
  const seedMap: Record<string, { titleSuffix: string; short: string; long: string; ssCount: number; rDelta: number; reviewMul: number; score: number }> = {
    US: { titleSuffix: "", short: `${app.category} for everyone`, long: `${app.name} is the most powerful tool in its category. Trusted by millions of users worldwide for ${app.category.toLowerCase()} needs.`, ssCount: 7, rDelta: 0, reviewMul: 1, score: 78 },
    GB: { titleSuffix: "", short: `${app.category} for everyone`, long: `${app.name} delivers premium ${app.category.toLowerCase()} features. Loved by UK creators.`, ssCount: 8, rDelta: -0.1, reviewMul: 0.7, score: 74 },
    JP: { titleSuffix: " - AIアシスタント", short: `すべての${app.category}機能を1つに`, long: `${app.name}は最高の${app.category.toLowerCase()}体験を提供します。`, ssCount: 8, rDelta: -0.2, reviewMul: 0.4, score: 58 },
    KR: { titleSuffix: " - AI 어시스턴트", short: `최고의 ${app.category} 도구`, long: `${app.name}은 최고의 ${app.category.toLowerCase()} 경험을 제공합니다.`, ssCount: 8, rDelta: 0.1, reviewMul: 0.3, score: 71 },
    DE: { titleSuffix: " - KI Assistent", short: `${app.category} für alle`, long: `${app.name} bietet die besten ${app.category.toLowerCase()} Funktionen.`, ssCount: 8, rDelta: -0.3, reviewMul: 0.5, score: 52 },
    FR: { titleSuffix: " - Assistant IA", short: `${app.category} pour tous`, long: `${app.name} offre les meilleures fonctionnalités ${app.category.toLowerCase()}.`, ssCount: 7, rDelta: 0, reviewMul: 0.6, score: 68 },
    BR: { titleSuffix: " - Assistente IA", short: `${app.category} para todos`, long: `${app.name} oferece os melhores recursos.`, ssCount: 7, rDelta: 0.2, reviewMul: 0.55, score: 81 },
    ID: { titleSuffix: "", short: `${app.category} terbaik`, long: `${app.name} adalah alat terbaik untuk ${app.category.toLowerCase()}.`, ssCount: 7, rDelta: 0.1, reviewMul: 0.65, score: 65 },
    VN: { titleSuffix: " - Trợ lý AI", short: `${app.category} tốt nhất`, long: `${app.name} là công cụ tốt nhất cho ${app.category.toLowerCase()}.`, ssCount: 7, rDelta: 0.05, reviewMul: 0.8, score: 73 },
  };
  const seed = seedMap[country.code] ?? seedMap.US;

  // If hl is forced and doesn't match country's default, downgrade some fields
  // to simulate "fallback to English" — useful for option B detection
  const forcedFallback = hl && hl !== country.defaultLangCode;
  const finalTitle = forcedFallback ? app.name : app.name + seed.titleSuffix;
  const finalShort = forcedFallback ? `${app.category} for everyone` : seed.short;
  const finalLong = forcedFallback
    ? `${app.name} is the most powerful tool in its category. Trusted by millions of users worldwide for ${app.category.toLowerCase()} needs.`
    : seed.long;

  return {
    title: finalTitle,
    shortDesc: finalShort,
    longDesc: finalLong,
    rating: Math.max(1, Math.min(5, Math.round((app.rating + seed.rDelta) * 10) / 10)),
    reviews: Math.round(app.reviews * seed.reviewMul),
    installs: app.installs,
    size: app.size,
    updated: app.updated,
    screenshots: Array.from({ length: seed.ssCount }).map((_, i) => ({
      tone: SS_TONES[(i + country.code.charCodeAt(0)) % SS_TONES.length],
      label: ["Hero", "Feature", "Try Now", "Results", "Premium", "Compare", "Reviews", "CTA"][i] ?? "Screen",
    })),
    category: app.category,
    price: "Free",
    iap: "Yes",
    ads: "Yes",
    version: "2.0.4",
    age: country.code === "GB" ? "PEGI 3" : country.code === "DE" ? "USK 0" : "Everyone",
    asoScore: forcedFallback ? Math.max(30, seed.score - 25) : seed.score,
  };
}

function scoreColor(score: number): { ring: string; text: string; bar: string } {
  if (score >= 80) return { ring: "stroke-emerald-400", text: "text-emerald-300", bar: "bg-emerald-400" };
  if (score >= 65) return { ring: "stroke-amber-400", text: "text-amber-300", bar: "bg-amber-400" };
  if (score >= 50) return { ring: "stroke-orange-400", text: "text-orange-300", bar: "bg-orange-400" };
  return { ring: "stroke-rose-400", text: "text-rose-300", bar: "bg-rose-400" };
}

// Word-level diff: returns text segments with "same" or "diff" classification
function diffWords(a: string, b: string, side: "a" | "b"): { text: string; diff: boolean }[] {
  const wordsA = a.split(/(\s+)/);
  const wordsB = b.split(/(\s+)/);
  const setOther = new Set((side === "a" ? wordsB : wordsA).map((w) => w.toLowerCase().trim()).filter(Boolean));
  return (side === "a" ? wordsA : wordsB).map((w) => ({
    text: w,
    diff: w.trim().length > 0 && !setOther.has(w.toLowerCase().trim()),
  }));
}

function HighlightMatch({ text, query }: { text: string; query: string }) {
  if (!query) return <>{text}</>;
  const q = query.trim().toLowerCase();
  if (!q) return <>{text}</>;
  const lower = text.toLowerCase();
  const idx = lower.indexOf(q);
  if (idx < 0) return <>{text}</>;
  return (
    <>
      {text.slice(0, idx)}
      <mark className="bg-emerald-400/30 text-emerald-100 rounded px-0.5">{text.slice(idx, idx + q.length)}</mark>
      {text.slice(idx + q.length)}
    </>
  );
}

export default function CompareView() {
  const [appACode, setAppACode] = useState("APB508");
  const [appBCode, setAppBCode] = useState("APB864");
  const [country, setCountry] = useState("US");
  const [diffOn, setDiffOn] = useState(true);
  const [storeMode, setStoreMode] = useState<StoreMode>("custom");
  const [langStrategy, setLangStrategy] = useState<LangStrategy>("auto");
  const [forcedLang, setForcedLang] = useState("en");

  const [pickerOpen, setPickerOpen] = useState<"a" | "b" | null>(null);
  const [pickerQuery, setPickerQuery] = useState("");
  const [countryQuery, setCountryQuery] = useState("");

  const appA = MOCK_APPS.find((a) => a.productCode === appACode)!;
  const appB = MOCK_APPS.find((a) => a.productCode === appBCode)!;
  const countryObj = MOCK_COUNTRIES.find((c) => c.code === country)!;

  // Resolve hl
  const activeHl = storeMode === "main"
    ? ""
    : langStrategy === "auto"
    ? countryObj.defaultLangCode
    : forcedLang;
  const activeGl = storeMode === "main" ? "" : countryObj.glCode;

  const listingA = buildListingFor(appA, countryObj, activeHl);
  const listingB = buildListingFor(appB, countryObj, activeHl);

  // Close picker on ESC
  useEffect(() => {
    if (!pickerOpen) return;
    function onKey(e: KeyboardEvent) {
      if (e.key === "Escape") { setPickerOpen(null); setPickerQuery(""); }
    }
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [pickerOpen]);

  const pq = pickerQuery.trim().toLowerCase();
  const visibleApps = pq
    ? MOCK_APPS.filter((a) =>
        a.name.toLowerCase().includes(pq) ||
        a.productCode.toLowerCase().includes(pq) ||
        a.packageId.toLowerCase().includes(pq) ||
        a.category.toLowerCase().includes(pq)
      )
    : MOCK_APPS;

  const cq = countryQuery.trim().toLowerCase();
  const visibleCountries = cq
    ? MOCK_COUNTRIES.filter((c) => c.code.toLowerCase().includes(cq) || c.name.toLowerCase().includes(cq))
    : MOCK_COUNTRIES;

  function selectApp(code: string) {
    if (pickerOpen === "a") setAppACode(code);
    else if (pickerOpen === "b") setAppBCode(code);
    setPickerOpen(null);
    setPickerQuery("");
  }

  function swap() {
    setAppACode(appBCode);
    setAppBCode(appACode);
  }

  return (
    <div className="px-6 py-6 max-w-[1600px] mx-auto">
      {/* Header */}
      <div className="flex items-start justify-between mb-5">
        <div>
          <div className="flex items-center gap-2 mb-0.5">
            <h1 className="text-2xl font-semibold tracking-tight text-slate-100">Compare</h1>
            <span className="text-xs px-2 py-0.5 rounded-full bg-slate-800 text-slate-400 tabular-nums">2 apps</span>
          </div>
          <p className="text-sm text-slate-400">
            Side-by-side preview of two apps in the same market · {countryObj.flag} {countryObj.name}
            {storeMode === "custom" && (
              <> · <span className="font-mono text-emerald-300">hl={activeHl}</span> <span className="font-mono text-teal-300">gl={activeGl}</span></>
            )}
          </p>
        </div>
        <div className="flex items-center gap-2">
          <div className="h-9 inline-flex rounded-md border border-slate-800 bg-slate-900/60 p-0.5">
            <button
              onClick={() => setStoreMode("main")}
              className={`px-3 h-8 rounded text-xs font-medium transition-colors flex items-center gap-1.5 ${
                storeMode === "main" ? "bg-slate-800 text-slate-100" : "text-slate-400 hover:text-slate-200"
              }`}
            >
              Main Store
            </button>
            <button
              onClick={() => setStoreMode("custom")}
              className={`px-3 h-8 rounded text-xs font-medium transition-colors flex items-center gap-1.5 ${
                storeMode === "custom" ? "bg-gradient-to-br from-emerald-400 to-teal-500 text-slate-950" : "text-slate-400 hover:text-slate-200"
              }`}
            >
              Custom Store
            </button>
          </div>
          <label className="flex items-center gap-2 px-3 h-9 rounded-md bg-slate-900/60 border border-slate-800 text-xs text-slate-300 cursor-pointer">
            <input type="checkbox" checked={diffOn} onChange={(e) => setDiffOn(e.target.checked)} className="w-3.5 h-3.5 accent-emerald-500" />
            Highlight diffs
          </label>
          <button className="h-9 px-3 text-sm text-slate-300 bg-slate-900/60 border border-slate-800 hover:border-slate-700 rounded-md flex items-center gap-1.5">
            <svg className="w-4 h-4" viewBox="0 0 20 20" fill="currentColor"><path d="M3 17a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM6.293 6.707a1 1 0 010-1.414l3-3a1 1 0 011.414 0l3 3a1 1 0 01-1.414 1.414L11 5.414V13a1 1 0 11-2 0V5.414L7.707 6.707a1 1 0 01-1.414 0z"/></svg>
            Export
          </button>
        </div>
      </div>

      {/* Selector card */}
      <div className="rounded-xl border border-slate-800 bg-slate-900/40 p-4 mb-3 relative">
        <div className="grid grid-cols-1 lg:grid-cols-[1fr_40px_1fr] gap-3 items-end">
          {/* App A */}
          <AppPickerSlot
            label="App A"
            badge="A"
            app={appA}
            isOpen={pickerOpen === "a"}
            onToggle={() => { setPickerOpen(pickerOpen === "a" ? null : "a"); setPickerQuery(""); }}
          />
          {/* Swap button */}
          <div className="flex items-center justify-center pb-1">
            <button
              onClick={swap}
              className="w-9 h-9 rounded-full bg-slate-950/60 border border-slate-800 hover:border-emerald-500/40 text-slate-400 hover:text-emerald-300 flex items-center justify-center transition-colors"
              title="Swap A ↔ B"
            >
              <svg className="w-4 h-4" viewBox="0 0 20 20" fill="currentColor"><path fillRule="evenodd" d="M7.707 3.293a1 1 0 010 1.414L5.414 7H17a1 1 0 110 2H5.414l2.293 2.293a1 1 0 11-1.414 1.414l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 0zm4.586 5a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 11-1.414-1.414L14.586 14H3a1 1 0 110-2h11.586l-2.293-2.293a1 1 0 010-1.414z" clipRule="evenodd"/></svg>
            </button>
          </div>
          {/* App B */}
          <AppPickerSlot
            label="App B"
            badge="B"
            app={appB}
            isOpen={pickerOpen === "b"}
            onToggle={() => { setPickerOpen(pickerOpen === "b" ? null : "b"); setPickerQuery(""); }}
          />
        </div>

        {/* App picker dropdown (shared) */}
        {pickerOpen && (
          <div className="absolute z-30 left-4 right-4 mt-2 rounded-lg border border-slate-800 bg-slate-950/98 backdrop-blur shadow-2xl shadow-emerald-500/5 overflow-hidden">
            <div className="p-2 border-b border-slate-800/80">
              <div className="relative">
                <svg className="absolute left-2.5 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-slate-500" viewBox="0 0 20 20" fill="currentColor"><path fillRule="evenodd" d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z" clipRule="evenodd"/></svg>
                <input
                  autoFocus
                  value={pickerQuery}
                  onChange={(e) => setPickerQuery(e.target.value)}
                  placeholder={`Pick app for slot ${pickerOpen.toUpperCase()} — search name, code, package, category…`}
                  className="w-full h-9 pl-8 pr-3 rounded-md bg-slate-900/80 border border-slate-800 text-xs text-slate-100 placeholder-slate-500 focus:outline-none focus:border-emerald-500/40"
                />
              </div>
              <div className="text-[10px] text-slate-500 mt-1.5 px-0.5 flex items-center justify-between">
                <span>{visibleApps.length} results</span>
                <span><kbd className="px-1 py-0.5 rounded bg-slate-800 text-slate-400 font-mono">ESC</kbd> close</span>
              </div>
            </div>
            <div className="max-h-80 overflow-y-auto p-1">
              {visibleApps.map((a) => {
                const currentInOtherSlot = pickerOpen === "a" ? a.productCode === appBCode : a.productCode === appACode;
                const currentInThisSlot = pickerOpen === "a" ? a.productCode === appACode : a.productCode === appBCode;
                return (
                  <button
                    key={a.productCode}
                    onClick={() => selectApp(a.productCode)}
                    disabled={currentInOtherSlot}
                    className={`w-full px-2 py-2 rounded flex items-center gap-2.5 text-left transition-colors ${
                      currentInOtherSlot
                        ? "opacity-40 cursor-not-allowed"
                        : currentInThisSlot
                        ? "bg-emerald-500/10 ring-1 ring-inset ring-emerald-500/20"
                        : "hover:bg-slate-800/60"
                    }`}
                  >
                    <div className={`w-8 h-8 rounded bg-gradient-to-br ${a.iconBg} flex items-center justify-center text-[10px] font-bold text-white shrink-0`}>
                      {a.icon}
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-1.5">
                        <span className="text-[10px] font-mono px-1.5 py-0.5 rounded bg-slate-800 text-slate-400 shrink-0">
                          <HighlightMatch text={a.productCode} query={pickerQuery} />
                        </span>
                        <span className="text-xs text-slate-100 truncate font-medium">
                          <HighlightMatch text={a.name} query={pickerQuery} />
                        </span>
                      </div>
                      <div className="text-[10px] text-slate-500 truncate mt-0.5">
                        <HighlightMatch text={a.packageId} query={pickerQuery} /> · <HighlightMatch text={a.category} query={pickerQuery} />
                      </div>
                    </div>
                    {currentInOtherSlot && (
                      <span className="text-[10px] font-medium text-slate-500 px-1.5 py-0.5 rounded bg-slate-800">
                        in {pickerOpen === "a" ? "B" : "A"}
                      </span>
                    )}
                    {currentInThisSlot && (
                      <svg className="w-4 h-4 text-emerald-400 shrink-0" viewBox="0 0 20 20" fill="currentColor"><path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd"/></svg>
                    )}
                  </button>
                );
              })}
            </div>
          </div>
        )}
      </div>

      {/* Country picker (single-select) */}
      <div className="rounded-xl border border-slate-800 bg-slate-900/40 p-4 mb-3">
        <div className="flex items-center justify-between mb-2">
          <div className="text-[11px] uppercase tracking-wider text-slate-500 font-medium">
            Country · <span className="text-emerald-300">{countryObj.name}</span>
          </div>
        </div>
        <div className="relative mb-2">
          <svg className="absolute left-2.5 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-slate-500" viewBox="0 0 20 20" fill="currentColor"><path fillRule="evenodd" d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z" clipRule="evenodd"/></svg>
          <input
            value={countryQuery}
            onChange={(e) => setCountryQuery(e.target.value)}
            placeholder="Search by country name or code…"
            className="w-full h-8 pl-8 pr-8 rounded-md bg-slate-950/60 border border-slate-800 text-xs text-slate-200 placeholder-slate-500 focus:outline-none focus:border-emerald-500/40"
          />
          {countryQuery && (
            <button
              onClick={() => setCountryQuery("")}
              className="absolute right-2 top-1/2 -translate-y-1/2 text-slate-500 hover:text-slate-200"
            >
              <svg className="w-3.5 h-3.5" viewBox="0 0 20 20" fill="currentColor"><path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd"/></svg>
            </button>
          )}
        </div>
        <div className="flex flex-wrap gap-1.5">
          {visibleCountries.map((c) => {
            const on = c.code === country;
            return (
              <button
                key={c.code}
                onClick={() => setCountry(c.code)}
                title={c.name}
                className={`h-8 px-2 rounded-md text-sm flex items-center gap-1.5 border transition-colors ${
                  on
                    ? "bg-emerald-500/10 border-emerald-500/40 text-emerald-200"
                    : "bg-slate-950/40 border-slate-800 text-slate-400 hover:border-slate-700 hover:text-slate-200"
                }`}
              >
                <span className="text-base leading-none">{c.flag}</span>
                <span className="font-mono text-[11px]">{c.code}</span>
                <span className={`text-[9px] font-semibold px-1 py-px rounded leading-none ${
                  c.tier === 1 ? "bg-emerald-500/15 text-emerald-300"
                  : c.tier === 2 ? "bg-amber-500/15 text-amber-300"
                  : "bg-slate-700/40 text-slate-400"
                }`}>
                  T{c.tier}
                </span>
                {on && <svg className="w-3 h-3 text-emerald-400 -ml-0.5" viewBox="0 0 20 20" fill="currentColor"><path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd"/></svg>}
              </button>
            );
          })}
        </div>
      </div>

      {/* Language strategy (custom mode only) */}
      {storeMode === "custom" && (
        <div className="rounded-xl border border-slate-800 bg-slate-900/30 px-4 py-3 mb-5 flex flex-wrap items-center gap-3">
          <div className="flex items-center gap-2 shrink-0">
            <svg className="w-4 h-4 text-emerald-400" viewBox="0 0 20 20" fill="currentColor"><path fillRule="evenodd" d="M7 2a1 1 0 011 1v1h3a1 1 0 110 2H9.578a18.87 18.87 0 01-1.724 4.78c.29.354.596.696.914 1.026a1 1 0 11-1.44 1.389c-.188-.196-.373-.396-.554-.6a19.098 19.098 0 01-3.107 3.567 1 1 0 01-1.334-1.49 17.087 17.087 0 003.13-3.733 18.992 18.992 0 01-1.487-2.494 1 1 0 111.79-.89c.234.47.489.928.764 1.372.417-.934.752-1.913.997-2.927H3a1 1 0 110-2h3V3a1 1 0 011-1z" clipRule="evenodd"/></svg>
            <span className="text-[11px] uppercase tracking-wider text-slate-400 font-medium">Language</span>
          </div>
          <div className="inline-flex rounded-md border border-slate-800 bg-slate-950/60 p-0.5">
            <button
              onClick={() => setLangStrategy("auto")}
              className={`px-2.5 h-7 rounded text-[11px] font-medium transition-colors ${
                langStrategy === "auto" ? "bg-slate-800 text-emerald-300" : "text-slate-400 hover:text-slate-200"
              }`}
            >
              Auto ({countryObj.defaultLangCode} · {countryObj.defaultLangName})
            </button>
            <button
              onClick={() => setLangStrategy("force")}
              className={`px-2.5 h-7 rounded text-[11px] font-medium transition-colors ${
                langStrategy === "force" ? "bg-slate-800 text-emerald-300" : "text-slate-400 hover:text-slate-200"
              }`}
            >
              Force
            </button>
          </div>
          {langStrategy === "force" && (
            <select
              value={forcedLang}
              onChange={(e) => setForcedLang(e.target.value)}
              className="h-7 px-2 rounded-md bg-slate-950/60 border border-slate-800 text-xs text-slate-200 focus:outline-none focus:border-emerald-500/40"
            >
              {MOCK_LANGUAGES.map((l) => (
                <option key={l.code} value={l.code}>{l.code} · {l.name} ({l.nativeName})</option>
              ))}
            </select>
          )}
          <div className="ml-auto text-[11px] text-slate-500">
            {langStrategy === "auto"
              ? `Native render for ${countryObj.name}`
              : forcedLang !== countryObj.defaultLangCode
              ? `Force ${forcedLang} on ${countryObj.code} — listing may fall back to English if not localized`
              : `Force matches country default`}
          </div>
        </div>
      )}

      {/* Comparison cards */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-3">
        <ComparePane app={appA} listing={listingA} other={listingB} side="a" diffOn={diffOn} storeMode={storeMode} hl={activeHl} gl={activeGl} />
        <ComparePane app={appB} listing={listingB} other={listingA} side="b" diffOn={diffOn} storeMode={storeMode} hl={activeHl} gl={activeGl} />
      </div>
    </div>
  );
}

function AppPickerSlot({ label, badge, app, isOpen, onToggle }: {
  label: string;
  badge: "A" | "B";
  app: MockApp;
  isOpen: boolean;
  onToggle: () => void;
}) {
  const badgeTone = badge === "A"
    ? "bg-emerald-500/15 text-emerald-300 ring-emerald-500/30"
    : "bg-violet-500/15 text-violet-300 ring-violet-500/30";
  return (
    <div>
      <div className="flex items-center gap-1.5 mb-1.5">
        <span className={`text-[10px] font-semibold tracking-wider px-1.5 py-0.5 rounded ring-1 ring-inset ${badgeTone}`}>
          {badge}
        </span>
        <span className="text-[11px] uppercase tracking-wider text-slate-500 font-medium">{label}</span>
      </div>
      <button
        onClick={onToggle}
        className={`w-full h-12 px-3 rounded-lg bg-slate-950/60 border transition-colors flex items-center gap-3 text-left ${
          isOpen ? "border-emerald-500/40" : "border-slate-800 hover:border-emerald-500/40"
        }`}
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
        <svg className={`w-4 h-4 text-slate-500 transition-transform ${isOpen ? "rotate-180" : ""}`} viewBox="0 0 20 20" fill="currentColor"><path fillRule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clipRule="evenodd"/></svg>
      </button>
    </div>
  );
}

function ComparePane({ app, listing, other, side, diffOn, storeMode, hl, gl }: {
  app: MockApp;
  listing: Listing;
  other: Listing;
  side: "a" | "b";
  diffOn: boolean;
  storeMode: StoreMode;
  hl: string;
  gl: string;
}) {
  const [showDetails, setShowDetails] = useState(false);
  const [showLong, setShowLong] = useState(false);

  const sideBadge = side === "a"
    ? { tone: "bg-emerald-500/15 text-emerald-300 ring-emerald-500/30", label: "A" }
    : { tone: "bg-violet-500/15 text-violet-300 ring-violet-500/30", label: "B" };

  const titleDiff = diffOn ? diffWords(listing.title, other.title, side) : [{ text: listing.title, diff: false }];
  const shortDiff = diffOn && listing.shortDesc !== other.shortDesc;
  const installsDiff = diffOn && listing.installs !== other.installs;
  const ratingDiff = diffOn && listing.rating !== other.rating;
  const score = listing.asoScore;
  const col = scoreColor(score);

  const url = buildPlayStoreUrl(app.packageId, hl, gl);

  return (
    <div className="rounded-xl border border-slate-800 bg-slate-900/40 overflow-hidden">
      {/* Pane header */}
      <div className="px-4 py-3 border-b border-slate-800/60 flex items-center gap-3">
        <span className={`text-[10px] font-semibold tracking-wider px-1.5 py-0.5 rounded ring-1 ring-inset ${sideBadge.tone}`}>
          {sideBadge.label}
        </span>
        <div className={`w-10 h-10 rounded-lg bg-gradient-to-br ${app.iconBg} flex items-center justify-center text-sm font-bold text-white shrink-0`}>
          {app.icon}
        </div>
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-1.5">
            <span className="text-[10px] font-mono px-1.5 py-0.5 rounded bg-slate-800 text-slate-400 shrink-0">{app.productCode}</span>
            <span className="text-sm font-semibold text-slate-100 truncate">{app.name}</span>
          </div>
          <div className="text-[11px] text-slate-500 truncate">{app.packageId} · {app.category}</div>
        </div>
        <div className="text-right shrink-0">
          <div className={`text-lg font-semibold tabular-nums ${col.text}`}>{score}<span className="text-xs text-slate-500">/100</span></div>
          <div className="text-[10px] text-slate-500">AI Audit</div>
        </div>
      </div>

      {/* Title */}
      <div className="px-4 py-3 border-b border-slate-800/60">
        <div className="text-[10px] uppercase tracking-wider text-slate-500 font-medium mb-1">Title</div>
        <div className="text-base font-semibold text-slate-100 leading-snug">
          {titleDiff.map((seg, i) => (
            <span key={i} className={seg.diff ? "bg-amber-400/15 text-amber-100 px-0.5 rounded" : ""}>
              {seg.text}
            </span>
          ))}
        </div>
      </div>

      {/* Short description */}
      <div className="px-4 py-3 border-b border-slate-800/60">
        <div className="text-[10px] uppercase tracking-wider text-slate-500 font-medium mb-1">Short description</div>
        <div className={`text-sm leading-relaxed ${shortDiff ? "bg-amber-400/10 text-amber-100 px-2 py-1 -mx-1 rounded" : "text-slate-200"}`}>
          {listing.shortDesc}
        </div>
      </div>

      {/* Metrics */}
      <div className="px-4 py-3 border-b border-slate-800/60 grid grid-cols-3 gap-2">
        <Metric label="Rating" value={`${listing.rating.toFixed(1)} ★`} diff={ratingDiff} />
        <Metric label="Reviews" value={listing.reviews.toLocaleString()} />
        <Metric label="Installs" value={listing.installs} diff={installsDiff} />
      </div>

      {/* Screenshots */}
      <div className="px-4 py-3 border-b border-slate-800/60">
        <div className="flex items-center justify-between mb-2">
          <div className="text-[10px] uppercase tracking-wider text-slate-500 font-medium">
            {listing.screenshots.length} screenshots
            {diffOn && listing.screenshots.length !== other.screenshots.length && (
              <span className="ml-1.5 text-amber-300">· differs ({other.screenshots.length} on {side === "a" ? "B" : "A"})</span>
            )}
          </div>
        </div>
        <div className="flex gap-2 overflow-x-auto pb-1 -mx-1 px-1 snap-x">
          {listing.screenshots.map((s, i) => (
            <div
              key={i}
              className={`shrink-0 w-[120px] h-[220px] rounded-lg bg-gradient-to-br ${s.tone} relative ring-1 ring-white/5 snap-start overflow-hidden`}
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

      {/* Long description (collapsible) */}
      <div className="px-4 py-3 border-b border-slate-800/60">
        <button
          onClick={() => setShowLong((v) => !v)}
          className="flex items-center justify-between w-full text-left"
        >
          <span className="text-[10px] uppercase tracking-wider text-slate-500 font-medium">Long description</span>
          <span className="text-[11px] text-slate-400 hover:text-emerald-300 flex items-center gap-1">
            {showLong ? "Hide" : "Show"}
            <svg className={`w-3 h-3 transition-transform ${showLong ? "rotate-180" : ""}`} viewBox="0 0 20 20" fill="currentColor"><path fillRule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clipRule="evenodd"/></svg>
          </span>
        </button>
        {showLong && (
          <div className="mt-2 text-sm text-slate-300 leading-relaxed whitespace-pre-line">
            {listing.longDesc}
          </div>
        )}
      </div>

      {/* Details (collapsible) */}
      <div className="px-4 py-3 border-b border-slate-800/60">
        <button
          onClick={() => setShowDetails((v) => !v)}
          className="flex items-center justify-between w-full text-left"
        >
          <span className="text-[10px] uppercase tracking-wider text-slate-500 font-medium">Details</span>
          <span className="text-[11px] text-slate-400 hover:text-emerald-300 flex items-center gap-1">
            {showDetails ? "Hide" : "Show"}
            <svg className={`w-3 h-3 transition-transform ${showDetails ? "rotate-180" : ""}`} viewBox="0 0 20 20" fill="currentColor"><path fillRule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clipRule="evenodd"/></svg>
          </span>
        </button>
        {showDetails && (
          <div className="mt-2 grid grid-cols-3 gap-2 text-xs">
            <Detail label="Price" value={listing.price} />
            <Detail label="IAP" value={listing.iap} />
            <Detail label="Ads" value={listing.ads} />
            <Detail label="Version" value={listing.version} />
            <Detail label="Age" value={listing.age} />
            <Detail label="Updated" value={listing.updated} />
          </div>
        )}
      </div>

      {/* Footer */}
      <div className="px-4 py-2.5 bg-slate-950/20 flex items-center justify-between">
        <div className="flex items-center gap-1.5">
          {storeMode === "main" ? (
            <span className="text-[10px] px-1.5 py-0.5 rounded bg-slate-800 text-slate-400 font-mono">main · no locale</span>
          ) : (
            <>
              {hl && <span className="text-[10px] px-1.5 py-0.5 rounded bg-emerald-500/10 text-emerald-300 ring-1 ring-inset ring-emerald-500/20 font-mono">hl={hl}</span>}
              {gl && <span className="text-[10px] px-1.5 py-0.5 rounded bg-teal-500/10 text-teal-300 ring-1 ring-inset ring-teal-500/20 font-mono">gl={gl}</span>}
            </>
          )}
        </div>
        <a
          href={url}
          target="_blank"
          rel="noopener noreferrer"
          className="h-7 px-2.5 text-[11px] font-medium text-emerald-300 bg-emerald-500/10 hover:bg-emerald-500/20 ring-1 ring-inset ring-emerald-500/20 rounded flex items-center gap-1"
        >
          Open in Play Store
          <svg className="w-3 h-3" viewBox="0 0 20 20" fill="currentColor"><path d="M11 3a1 1 0 100 2h2.586l-6.293 6.293a1 1 0 101.414 1.414L15 6.414V9a1 1 0 102 0V4a1 1 0 00-1-1h-5z"/><path d="M5 5a2 2 0 00-2 2v8a2 2 0 002 2h8a2 2 0 002-2v-3a1 1 0 10-2 0v3H5V7h3a1 1 0 000-2H5z"/></svg>
        </a>
      </div>
    </div>
  );
}

function Metric({ label, value, diff = false }: { label: string; value: string; diff?: boolean }) {
  return (
    <div className={`rounded-md p-2 ${diff ? "bg-amber-400/10 ring-1 ring-inset ring-amber-400/20" : "bg-slate-950/40 ring-1 ring-inset ring-slate-800"}`}>
      <div className="text-[10px] uppercase tracking-wider text-slate-500">{label}</div>
      <div className={`text-sm font-semibold tabular-nums ${diff ? "text-amber-200" : "text-slate-100"}`}>{value}</div>
    </div>
  );
}

function Detail({ label, value }: { label: string; value: string }) {
  return (
    <div>
      <div className="text-[10px] uppercase tracking-wider text-slate-500">{label}</div>
      <div className="text-slate-200 font-medium">{value}</div>
    </div>
  );
}
