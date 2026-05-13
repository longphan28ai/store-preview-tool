"use client";

import { useState } from "react";
import { MOCK_APPS, MOCK_COUNTRIES, type MockApp } from "./mockData";

type AuditFactor = {
  key: string;
  label: string;
  score: number; // 0-100
  note: string;
};

type AuditAction = {
  priority: "high" | "med" | "low";
  text: string;
};

type CountryAudit = {
  overall: number; // 0-100
  factors: AuditFactor[];
  actions: AuditAction[];
  status: "ready" | "running" | "stale";
};

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
  audit: CountryAudit;
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

// Fake AI audit output per country — feels like real Claude/GPT analysis
function buildAudit(code: string, app: MockApp, titleLen: number, ssCount: number): CountryAudit {
  // Mock per-country audit results
  const auditMap: Record<string, { overall: number; metadata: number; visuals: number; quality: number; loc: number; comp: number; actions: AuditAction[]; notes: Record<string, string> }> = {
    US: {
      overall: 78, metadata: 82, visuals: 75, quality: 88, loc: 90, comp: 65,
      notes: {
        metadata: `Title uses ${titleLen}/30 chars. Primary keyword "${app.category.toLowerCase()}" present in short desc.`,
        visuals: `${ssCount}/8 screenshots used. Screenshot #1 has clear hook. Icon contrast OK at 48px.`,
        quality: `${app.rating}★ above 4.3 threshold. Updated ${app.updated} — within 30 days.`,
        loc: "Native English — no translation issues detected.",
        comp: "Ranks #14 for primary keyword. Top 3 competitors use video — yours doesn't.",
      },
      actions: [
        { priority: "high", text: "Add promo video — top 3 competitors all have one (~+18% CVR avg)." },
        { priority: "med", text: `Title only ${titleLen}/30 chars — add "AI Assistant" or "GPT" to fill keyword space.` },
        { priority: "low", text: "Consider A/B testing icon — current is similar to 2 competitors." },
      ],
    },
    GB: {
      overall: 74, metadata: 80, visuals: 75, quality: 85, loc: 70, comp: 60,
      notes: {
        metadata: "Same metadata as US — no UK localization.",
        visuals: "Screenshots identical to US version.",
        quality: "Rating slightly below US (4.5 vs 4.6).",
        loc: "Uses US English ('color', 'optimize'). UK users may prefer 'colour', 'optimise'.",
        comp: "Less competition than US — opportunity for higher rank.",
      },
      actions: [
        { priority: "med", text: "Switch to British English spellings (colour, organise, favourite)." },
        { priority: "med", text: "Update price unit if shown — use £ not $." },
        { priority: "low", text: "Add 'Best of UK' badge in screenshot if applicable." },
      ],
    },
    JP: {
      overall: 58, metadata: 55, visuals: 50, quality: 72, loc: 60, comp: 55,
      notes: {
        metadata: "Title translated but short desc keyword density only 0.5% (target 2%).",
        visuals: "Screenshots NOT localized — captions still in English. Japanese users prefer dense info screenshots.",
        quality: `${app.rating - 0.2}★ — below Japan market average of 4.6 for this category.`,
        loc: "Google Translate flavor detected in long desc — needs native rewrite.",
        comp: "Top JP competitors use 8 screenshots with vertical text overlays. You have 8 but no text.",
      },
      actions: [
        { priority: "high", text: "Localize screenshot text to Japanese — Japan ASO conversion drops 40% with EN captions." },
        { priority: "high", text: "Rewrite long description with native speaker — current reads as machine translation." },
        { priority: "med", text: "Add カタカナ keywords (AIアシスタント, チャットボット) to short desc." },
      ],
    },
    KR: {
      overall: 71, metadata: 75, visuals: 65, quality: 80, loc: 75, comp: 60,
      notes: {
        metadata: "Korean title good — uses 어시스턴트. Short desc could include 챗봇 keyword.",
        visuals: "Korean text in icon could improve — KR users respond to icons with characters.",
        quality: `${app.rating + 0.1}★ healthy. Recent reviews positive.`,
        loc: "Decent localization but tone is too formal. KR mobile users prefer casual register.",
        comp: "Top competitor 'AskUp' dominates — focus on differentiation.",
      },
      actions: [
        { priority: "med", text: "Soften long desc tone — drop formal 입니다 endings for casual 해요." },
        { priority: "med", text: 'Add keyword "챗봇" (chatbot) to short description.' },
        { priority: "low", text: "Test icon variant with Korean character (AI/챗)." },
      ],
    },
    DE: {
      overall: 52, metadata: 60, visuals: 55, quality: 70, loc: 35, comp: 50,
      notes: {
        metadata: "Title 'KI Assistent' truncated at 28 chars — full name doesn't display.",
        visuals: "Screenshots in English only — German users have lowest tolerance for non-localized content (Sensor Tower data).",
        quality: `${app.rating - 0.3}★ — significantly below DE market norm of 4.5+.`,
        loc: "Major issue: long desc reads as Google Translate. Idioms like 'state of the art' translated literally.",
        comp: "DE market favors privacy-focused apps — emphasize GDPR compliance.",
      },
      actions: [
        { priority: "high", text: "Full German rewrite — hire native copywriter, not MT. Loc score is critical." },
        { priority: "high", text: "Add 'DSGVO-konform' (GDPR-compliant) to short desc — top conversion driver in DE." },
        { priority: "med", text: "Localize screenshot captions to German." },
      ],
    },
    FR: {
      overall: 68, metadata: 70, visuals: 65, quality: 75, loc: 70, comp: 60,
      notes: {
        metadata: "'Assistant IA' good. Short desc uses correct French — IA not AI.",
        visuals: "Screenshots mixed EN/FR — inconsistent.",
        quality: `${app.rating}★ matches market average.`,
        loc: "Mostly native but some Anglicisms remain in long desc.",
        comp: "Less crowded than US — room to rank top 10.",
      },
      actions: [
        { priority: "med", text: "Unify screenshot language — all FR or remove EN ones." },
        { priority: "med", text: 'Replace "selfie" with "égoportrait" in metadata for Quebec spillover.' },
        { priority: "low", text: "Add CNIL data privacy note in description." },
      ],
    },
    BR: {
      overall: 81, metadata: 85, visuals: 80, quality: 82, loc: 85, comp: 75,
      notes: {
        metadata: "'Assistente IA' good. Keyword density healthy at 2.1%.",
        visuals: "Screenshots localized. Vibrant colors match BR preference.",
        quality: `${app.rating + 0.2}★ above average — BR users rate generously.`,
        loc: "Native Portuguese (PT-BR), not PT-PT. Good cultural fit.",
        comp: "Low competition. Top spots achievable.",
      },
      actions: [
        { priority: "low", text: "Consider adding PIX payment mention if monetized." },
        { priority: "low", text: "Translate developer name field to PT for full localization." },
        { priority: "low", text: "Push install ads — high ROI market for this category." },
      ],
    },
    ID: {
      overall: 65, metadata: 68, visuals: 60, quality: 72, loc: 62, comp: 60,
      notes: {
        metadata: "Title in English only — ID users search Bahasa keywords more.",
        visuals: "Screenshots EN — should be Bahasa Indonesia.",
        quality: `${app.rating + 0.1}★ good. Reviews mention 'lemot' (slow) — optimize app size.`,
        loc: "Short desc translated but title untranslated — inconsistent.",
        comp: "App size 78MB is high for ID market where many users have limited data.",
      },
      actions: [
        { priority: "high", text: "Reduce app size below 50MB — ID users have data/storage constraints." },
        { priority: "med", text: "Translate title to include 'AI Chatbot' Bahasa equivalent." },
        { priority: "med", text: "Localize screenshots to Bahasa Indonesia." },
      ],
    },
    VN: {
      overall: 73, metadata: 76, visuals: 70, quality: 78, loc: 72, comp: 70,
      notes: {
        metadata: "'Trợ lý AI' clear. Short desc concise.",
        visuals: "Screenshots in Vietnamese ✓. Could add more lifestyle context.",
        quality: `${app.rating + 0.05}★ healthy.`,
        loc: "Native Vietnamese but slightly literal. Tone could be more friendly.",
        comp: "Growing AI category in VN — first-mover advantage available.",
      },
      actions: [
        { priority: "med", text: 'Add keyword "ChatGPT" to short desc — top searched AI term in VN.' },
        { priority: "med", text: "Test casual tone (mày/tao avoided, but warmer 'bạn' phrasing)." },
        { priority: "low", text: "Add lifestyle screenshots — Vietnamese users respond to context shots." },
      ],
    },
  };

  const data = auditMap[code] ?? auditMap.US;
  return {
    overall: data.overall,
    status: "ready",
    factors: [
      { key: "metadata", label: "Metadata", score: data.metadata, note: data.notes.metadata },
      { key: "visuals", label: "Visuals", score: data.visuals, note: data.notes.visuals },
      { key: "quality", label: "Quality", score: data.quality, note: data.notes.quality },
      { key: "loc", label: "Localization", score: data.loc, note: data.notes.loc },
      { key: "comp", label: "Competitive", score: data.comp, note: data.notes.comp },
    ],
    actions: data.actions,
  };
}

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
    const title = app.name + seed.titleSuffix;
    return {
      code: country.code,
      name: country.name,
      flag: country.flag,
      title,
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
      audit: buildAudit(country.code, app, title.length, seed.ssCount),
    };
  });
}

export default function ListingsView() {
  const [selectedAppCode, setSelectedAppCode] = useState(MOCK_APPS[0].productCode);
  const [selectedCountries, setSelectedCountries] = useState<string[]>(["US", "GB", "JP", "DE", "VN"]);
  const [diffOn, setDiffOn] = useState(true);
  const [auditOn, setAuditOn] = useState(true);
  const [showAppPicker, setShowAppPicker] = useState(false);

  const app = MOCK_APPS.find((a) => a.productCode === selectedAppCode)!;
  const listings = buildListings(app, selectedCountries);
  const avgScore = listings.length > 0
    ? Math.round(listings.reduce((s, l) => s + l.audit.overall, 0) / listings.length)
    : 0;
  const worst = [...listings].sort((a, b) => a.audit.overall - b.audit.overall)[0];

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
          <label className="flex items-center gap-2 px-3 h-9 rounded-md bg-slate-900/60 border border-slate-800 text-xs text-slate-300 cursor-pointer">
            <input
              type="checkbox"
              checked={auditOn}
              onChange={(e) => setAuditOn(e.target.checked)}
              className="w-3.5 h-3.5 accent-emerald-500"
            />
            <svg className="w-3.5 h-3.5 text-emerald-400" viewBox="0 0 20 20" fill="currentColor"><path fillRule="evenodd" d="M5 2a1 1 0 011 1v1h1a1 1 0 010 2H6v1a1 1 0 01-2 0V6H3a1 1 0 010-2h1V3a1 1 0 011-1zm0 10a1 1 0 011 1v1h1a1 1 0 110 2H6v1a1 1 0 11-2 0v-1H3a1 1 0 110-2h1v-1a1 1 0 011-1zM12 2a1 1 0 01.967.744L14.146 7.2 17.5 9.134a1 1 0 010 1.732l-3.354 1.935-1.18 4.455a1 1 0 01-1.933 0L9.854 12.8 6.5 10.866a1 1 0 010-1.732l3.354-1.935 1.18-4.455A1 1 0 0112 2z" clipRule="evenodd"/></svg>
            AI Audit
          </label>
          <button className="h-9 px-3 text-sm font-medium text-slate-300 bg-slate-900/60 border border-slate-800 hover:border-slate-700 rounded-md flex items-center gap-1.5">
            <svg className="w-4 h-4" viewBox="0 0 20 20" fill="currentColor"><path d="M3 17a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM6.293 6.707a1 1 0 010-1.414l3-3a1 1 0 011.414 0l3 3a1 1 0 01-1.414 1.414L11 5.414V13a1 1 0 11-2 0V5.414L7.707 6.707a1 1 0 01-1.414 0z"/></svg>
            Export
          </button>
        </div>
      </div>

      {/* AI Audit summary bar */}
      {auditOn && listings.length > 0 && (
        <div className="rounded-xl border border-emerald-500/20 bg-gradient-to-r from-emerald-500/[0.06] to-transparent p-4 mb-5">
          <div className="flex items-center gap-5">
            <div className="flex items-center gap-3">
              <ScoreRing score={avgScore} size={56} />
              <div>
                <div className="flex items-center gap-1.5">
                  <svg className="w-3.5 h-3.5 text-emerald-400" viewBox="0 0 20 20" fill="currentColor"><path fillRule="evenodd" d="M5 2a1 1 0 011 1v1h1a1 1 0 010 2H6v1a1 1 0 01-2 0V6H3a1 1 0 010-2h1V3a1 1 0 011-1zm0 10a1 1 0 011 1v1h1a1 1 0 110 2H6v1a1 1 0 11-2 0v-1H3a1 1 0 110-2h1v-1a1 1 0 011-1zM12 2a1 1 0 01.967.744L14.146 7.2 17.5 9.134a1 1 0 010 1.732l-3.354 1.935-1.18 4.455a1 1 0 01-1.933 0L9.854 12.8 6.5 10.866a1 1 0 010-1.732l3.354-1.935 1.18-4.455A1 1 0 0112 2z" clipRule="evenodd"/></svg>
                  <span className="text-[11px] uppercase tracking-wider text-emerald-300 font-medium">
                    AI ASO Audit · Average across {listings.length} markets
                  </span>
                </div>
                <div className="text-xs text-slate-400 mt-0.5">
                  Powered by Claude · Analyzes title, visuals, localization, quality signals, competitive position
                </div>
              </div>
            </div>
            <div className="flex-1 grid grid-cols-5 gap-2">
              {["metadata", "visuals", "quality", "loc", "comp"].map((key) => {
                const avg = Math.round(
                  listings.reduce((s, l) => s + (l.audit.factors.find((f) => f.key === key)?.score ?? 0), 0) / listings.length
                );
                const label = listings[0].audit.factors.find((f) => f.key === key)?.label ?? key;
                return <FactorBar key={key} label={label} score={avg} />;
              })}
            </div>
            {worst && (
              <div className="text-right border-l border-slate-800 pl-4">
                <div className="text-[10px] uppercase tracking-wider text-slate-500">Weakest market</div>
                <div className="flex items-center gap-1.5 mt-0.5 justify-end">
                  <span className="text-base">{worst.flag}</span>
                  <span className={`text-lg font-semibold tabular-nums ${scoreToText(worst.audit.overall)}`}>{worst.audit.overall}</span>
                </div>
                <div className="text-[10px] text-slate-500">{worst.name}</div>
              </div>
            )}
            <button className="h-9 px-3 text-sm font-medium text-slate-950 bg-gradient-to-br from-emerald-400 to-teal-500 hover:from-emerald-300 hover:to-teal-400 rounded-md flex items-center gap-1.5 shadow-lg shadow-emerald-500/20">
              <svg className="w-4 h-4" viewBox="0 0 20 20" fill="currentColor"><path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm.75-13a.75.75 0 00-1.5 0v5c0 .414.336.75.75.75h4a.75.75 0 000-1.5h-3.25V5z" clipRule="evenodd"/></svg>
              Re-run
            </button>
          </div>
        </div>
      )}

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
          <ListingRow key={l.code} listing={l} prev={listings[0]} diffOn={diffOn && idx > 0} auditOn={auditOn} />
        ))}
      </div>
    </div>
  );
}

function ListingRow({ listing, prev, diffOn, auditOn }: { listing: CountryListing; prev: CountryListing; diffOn: boolean; auditOn: boolean }) {
  const [showDetails, setShowDetails] = useState(false);
  const [showAudit, setShowAudit] = useState(false);
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
          {auditOn && (
            <button
              onClick={() => setShowAudit((v) => !v)}
              className={`group flex items-center gap-2 pl-3 border-l border-slate-800 hover:border-slate-700 transition-colors`}
              title="AI ASO Audit"
            >
              <ScoreBadge score={listing.audit.overall} />
              <div className="text-left">
                <div className="text-[10px] uppercase tracking-wider text-slate-500 group-hover:text-slate-300">AI Audit</div>
                <div className={`text-[10px] font-medium ${scoreToText(listing.audit.overall)} flex items-center gap-0.5`}>
                  {scoreToLabel(listing.audit.overall)}
                  <svg className={`w-3 h-3 transition-transform ${showAudit ? "rotate-180" : ""}`} viewBox="0 0 20 20" fill="currentColor"><path fillRule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clipRule="evenodd"/></svg>
                </div>
              </div>
            </button>
          )}
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

      {/* AI Audit panel (collapsed by default) */}
      {auditOn && showAudit && (
        <div className="border-t border-emerald-500/15 px-4 py-4 bg-gradient-to-b from-emerald-500/[0.04] to-transparent">
          <div className="grid grid-cols-1 lg:grid-cols-[260px_1fr] gap-5">
            {/* Left: score breakdown */}
            <div>
              <div className="flex items-center gap-3 mb-3">
                <ScoreRing score={listing.audit.overall} size={64} />
                <div>
                  <div className="text-[10px] uppercase tracking-wider text-emerald-300/80 font-medium flex items-center gap-1">
                    <svg className="w-3 h-3" viewBox="0 0 20 20" fill="currentColor"><path fillRule="evenodd" d="M5 2a1 1 0 011 1v1h1a1 1 0 010 2H6v1a1 1 0 01-2 0V6H3a1 1 0 010-2h1V3a1 1 0 011-1zm0 10a1 1 0 011 1v1h1a1 1 0 110 2H6v1a1 1 0 11-2 0v-1H3a1 1 0 110-2h1v-1a1 1 0 011-1zM12 2a1 1 0 01.967.744L14.146 7.2 17.5 9.134a1 1 0 010 1.732l-3.354 1.935-1.18 4.455a1 1 0 01-1.933 0L9.854 12.8 6.5 10.866a1 1 0 010-1.732l3.354-1.935 1.18-4.455A1 1 0 0112 2z" clipRule="evenodd"/></svg>
                    ASO Score
                  </div>
                  <div className={`text-2xl font-semibold tabular-nums ${scoreToText(listing.audit.overall)}`}>
                    {listing.audit.overall}<span className="text-base text-slate-500">/100</span>
                  </div>
                  <div className="text-[10px] text-slate-500">{scoreToLabel(listing.audit.overall)}</div>
                </div>
              </div>
              <div className="space-y-2">
                {listing.audit.factors.map((f) => (
                  <FactorRow key={f.key} factor={f} />
                ))}
              </div>
            </div>

            {/* Right: actions */}
            <div>
              <div className="text-[11px] uppercase tracking-wider text-slate-400 font-medium mb-2 flex items-center gap-1.5">
                <svg className="w-3.5 h-3.5 text-amber-400" viewBox="0 0 20 20" fill="currentColor"><path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd"/></svg>
                Top recommendations from AI
              </div>
              <div className="space-y-2">
                {listing.audit.actions.map((a, i) => (
                  <ActionItem key={i} action={a} index={i + 1} />
                ))}
              </div>
              <div className="mt-3 pt-3 border-t border-slate-800/60 flex items-center justify-between">
                <div className="text-[10px] text-slate-500">
                  Last analyzed: 2 minutes ago · model: claude-sonnet-4.5
                </div>
                <button className="text-[11px] text-emerald-300 hover:text-emerald-200 flex items-center gap-1">
                  Full audit report
                  <svg className="w-3 h-3" viewBox="0 0 20 20" fill="currentColor"><path d="M11 3a1 1 0 100 2h2.586l-6.293 6.293a1 1 0 101.414 1.414L15 6.414V9a1 1 0 102 0V4a1 1 0 00-1-1h-5z"/></svg>
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

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

// ─── ASO Audit helpers ────────────────────────────────────────────────

function scoreToText(score: number): string {
  if (score >= 80) return "text-emerald-300";
  if (score >= 65) return "text-amber-300";
  if (score >= 50) return "text-orange-300";
  return "text-rose-300";
}

function scoreToRing(score: number): string {
  if (score >= 80) return "stroke-emerald-400";
  if (score >= 65) return "stroke-amber-400";
  if (score >= 50) return "stroke-orange-400";
  return "stroke-rose-400";
}

function scoreToBar(score: number): string {
  if (score >= 80) return "bg-emerald-400";
  if (score >= 65) return "bg-amber-400";
  if (score >= 50) return "bg-orange-400";
  return "bg-rose-400";
}

function scoreToLabel(score: number): string {
  if (score >= 80) return "Strong";
  if (score >= 65) return "Decent";
  if (score >= 50) return "Needs work";
  return "Critical";
}

function ScoreRing({ score, size = 56 }: { score: number; size?: number }) {
  const r = (size - 6) / 2;
  const c = 2 * Math.PI * r;
  const offset = c * (1 - score / 100);
  return (
    <div className="relative inline-flex items-center justify-center" style={{ width: size, height: size }}>
      <svg width={size} height={size} viewBox={`0 0 ${size} ${size}`} className="-rotate-90">
        <circle cx={size / 2} cy={size / 2} r={r} className="stroke-slate-800" strokeWidth="4" fill="none" />
        <circle
          cx={size / 2}
          cy={size / 2}
          r={r}
          className={scoreToRing(score)}
          strokeWidth="4"
          fill="none"
          strokeDasharray={c}
          strokeDashoffset={offset}
          strokeLinecap="round"
        />
      </svg>
      <div className={`absolute text-base font-semibold tabular-nums ${scoreToText(score)}`} style={{ fontSize: size * 0.28 }}>
        {score}
      </div>
    </div>
  );
}

function ScoreBadge({ score }: { score: number }) {
  return (
    <div className={`relative w-10 h-10 rounded-lg flex items-center justify-center font-semibold tabular-nums text-sm ring-1 ring-inset ${
      score >= 80 ? "bg-emerald-500/10 text-emerald-300 ring-emerald-500/30"
      : score >= 65 ? "bg-amber-500/10 text-amber-300 ring-amber-500/30"
      : score >= 50 ? "bg-orange-500/10 text-orange-300 ring-orange-500/30"
      : "bg-rose-500/10 text-rose-300 ring-rose-500/30"
    }`}>
      {score}
    </div>
  );
}

function FactorBar({ label, score }: { label: string; score: number }) {
  return (
    <div>
      <div className="flex items-center justify-between mb-1">
        <span className="text-[10px] uppercase tracking-wider text-slate-500 font-medium">{label}</span>
        <span className={`text-[11px] font-semibold tabular-nums ${scoreToText(score)}`}>{score}</span>
      </div>
      <div className="h-1.5 rounded-full bg-slate-800 overflow-hidden">
        <div className={`h-full ${scoreToBar(score)} rounded-full transition-all`} style={{ width: `${score}%` }} />
      </div>
    </div>
  );
}

function FactorRow({ factor }: { factor: AuditFactor }) {
  return (
    <div className="group">
      <div className="flex items-center justify-between mb-1">
        <span className="text-xs text-slate-300 font-medium">{factor.label}</span>
        <span className={`text-xs font-semibold tabular-nums ${scoreToText(factor.score)}`}>{factor.score}/100</span>
      </div>
      <div className="h-1.5 rounded-full bg-slate-800 overflow-hidden">
        <div className={`h-full ${scoreToBar(factor.score)} rounded-full`} style={{ width: `${factor.score}%` }} />
      </div>
      <div className="text-[11px] text-slate-500 mt-1 leading-relaxed">{factor.note}</div>
    </div>
  );
}

function ActionItem({ action, index }: { action: AuditAction; index: number }) {
  const priorityStyle = {
    high: { bg: "bg-rose-500/10", ring: "ring-rose-500/30", text: "text-rose-300", label: "HIGH" },
    med: { bg: "bg-amber-500/10", ring: "ring-amber-500/30", text: "text-amber-300", label: "MED" },
    low: { bg: "bg-slate-700/40", ring: "ring-slate-700", text: "text-slate-400", label: "LOW" },
  }[action.priority];

  return (
    <div className="flex items-start gap-2.5 p-2.5 rounded-md bg-slate-900/60 ring-1 ring-inset ring-slate-800 hover:ring-slate-700 transition-colors">
      <div className="flex flex-col items-center gap-1 shrink-0 pt-0.5">
        <span className="text-[10px] font-mono text-slate-500">#{index}</span>
        <span className={`text-[9px] font-semibold tracking-wider px-1.5 py-0.5 rounded ring-1 ring-inset ${priorityStyle.bg} ${priorityStyle.ring} ${priorityStyle.text}`}>
          {priorityStyle.label}
        </span>
      </div>
      <div className="flex-1 text-xs text-slate-200 leading-relaxed pt-0.5">{action.text}</div>
      <button className="shrink-0 h-6 px-2 text-[10px] text-slate-400 hover:text-emerald-300 hover:bg-slate-800 rounded">
        Apply
      </button>
    </div>
  );
}
