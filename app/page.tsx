"use client";

import { useState } from "react";
import { AppEntry } from "@/data/apps";
import { StoreData, FetchResponse } from "@/lib/types";
import Logo from "@/components/Logo";
import { IconApp, IconSearch } from "@/components/Icons";
import AppSelector from "@/components/AppSelector";
import CompetitorInput from "@/components/CompetitorInput";
import CountrySelector from "@/components/CountrySelector";
import LanguageSelector from "@/components/LanguageSelector";
import ViewToggle from "@/components/ViewToggle";
import GridView from "@/components/GridView";
import TableView from "@/components/TableView";
import DetailView from "@/components/DetailView";

type InputMode = "internal" | "competitor";

interface CompetitorApp {
  packageId: string;
  name: string;
}

export default function Home() {
  const [inputMode, setInputMode] = useState<InputMode>("internal");
  const [selectedApp, setSelectedApp] = useState<AppEntry | null>(null);
  const [competitorApp, setCompetitorApp] = useState<CompetitorApp | null>(null);
  const [selectedCountries, setSelectedCountries] = useState<string[]>([]);
  const [results, setResults] = useState<StoreData[]>([]);
  const [errors, setErrors] = useState<{ country: string; message: string }[]>([]);
  const [view, setView] = useState<"grid" | "table" | "detail">("grid");
  const [selectedLang, setSelectedLang] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [progress, setProgress] = useState({ done: 0, total: 0 });

  const activePackageId =
    inputMode === "internal" ? selectedApp?.packageId : competitorApp?.packageId;
  const activeAppName =
    inputMode === "internal"
      ? selectedApp
        ? `${selectedApp.productCode} — ${selectedApp.name}`
        : null
      : competitorApp?.name || null;

  const fetchData = async () => {
    if (!activePackageId || selectedCountries.length === 0) return;

    setLoading(true);
    setResults([]);
    setErrors([]);

    const total = selectedCountries.length;
    setProgress({ done: 0, total });

    // Batch countries in groups of 10
    const batches: string[][] = [];
    for (let i = 0; i < selectedCountries.length; i += 10) {
      batches.push(selectedCountries.slice(i, i + 10));
    }

    const allResults: StoreData[] = [];
    const allErrors: { country: string; message: string }[] = [];

    for (let bIdx = 0; bIdx < batches.length; bIdx++) {
      const batch = batches[bIdx];
      try {
        const res = await fetch("/api/store-data", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            appId: activePackageId,
            countries: batch,
            isCompetitor: inputMode === "competitor",
            ...(selectedLang && { lang: selectedLang }),
          }),
        });

        const data: FetchResponse = await res.json();
        allResults.push(...(data.results || []));
        allErrors.push(...(data.errors || []));
        setResults([...allResults]);
        setErrors([...allErrors]);
        setProgress({ done: allResults.length + allErrors.length, total });
      } catch {
        batch.forEach((c) =>
          allErrors.push({ country: c, message: "Network error" })
        );
        setErrors([...allErrors]);
      }

      // Gap between batches
      if (bIdx < batches.length - 1) {
        await new Promise((r) => setTimeout(r, 2000));
      }
    }

    setLoading(false);
  };

  return (
    <div className="min-h-screen bg-slate-50">
      {/* Header */}
      <header className="bg-white border-b border-gray-200 shadow-sm sticky top-0 z-40">
        <div className="max-w-7xl mx-auto px-4 py-4">
          <div className="flex items-center gap-3 mb-4">
            <Logo size={40} />
            <div>
              <h1 className="text-xl font-bold text-slate-900">
                Store Preview Tool
              </h1>
              <p className="text-xs text-slate-500">
                View Google Play listings across markets &mdash; Apero UA
              </p>
            </div>
          </div>

          {/* Mode toggle */}
          <div className="flex gap-2 mb-3">
            <button
              onClick={() => setInputMode("internal")}
              className={`px-3 py-1.5 rounded-full text-xs font-medium transition-all flex items-center gap-1.5 ${
                inputMode === "internal"
                  ? "bg-emerald-100 text-emerald-700 ring-1 ring-emerald-300"
                  : "bg-gray-100 text-gray-500 hover:bg-gray-200"
              }`}
            >
              <IconApp className="w-3.5 h-3.5" /> Our Apps
            </button>
            <button
              onClick={() => setInputMode("competitor")}
              className={`px-3 py-1.5 rounded-full text-xs font-medium transition-all flex items-center gap-1.5 ${
                inputMode === "competitor"
                  ? "bg-teal-100 text-teal-700 ring-1 ring-teal-300"
                  : "bg-gray-100 text-gray-500 hover:bg-gray-200"
              }`}
            >
              <IconSearch className="w-3.5 h-3.5" /> Competitor
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-[1fr_1fr_auto_auto] gap-3 items-end">
            {inputMode === "internal" ? (
              <AppSelector selected={selectedApp} onSelect={setSelectedApp} />
            ) : (
              <CompetitorInput onSelect={setCompetitorApp} />
            )}
            <CountrySelector
              selected={selectedCountries}
              onChange={setSelectedCountries}
            />
            <LanguageSelector
              selected={selectedLang}
              onChange={setSelectedLang}
            />
            <button
              onClick={fetchData}
              disabled={!activePackageId || selectedCountries.length === 0 || loading}
              className="px-6 py-3 bg-emerald-600 text-white rounded-lg font-medium hover:bg-emerald-700 disabled:bg-gray-300 disabled:cursor-not-allowed transition-colors shadow-sm"
            >
              {loading ? (
                <span className="flex items-center gap-2">
                  <svg className="animate-spin h-4 w-4" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
                  </svg>
                  {progress.done}/{progress.total}
                </span>
              ) : (
                `Fetch ${selectedCountries.length > 0 ? selectedCountries.length : ""} ${selectedCountries.length === 1 ? "country" : "countries"}`
              )}
            </button>
          </div>

          {/* Show active competitor app */}
          {inputMode === "competitor" && competitorApp && (
            <div className="mt-2 flex items-center gap-2 text-xs">
              <span className="bg-teal-50 text-teal-600 px-2 py-1 rounded-md border border-teal-200">
                {competitorApp.packageId}
              </span>
              <button
                onClick={() => setCompetitorApp(null)}
                className="text-gray-400 hover:text-red-500"
              >
                &times; Clear
              </button>
            </div>
          )}
        </div>
      </header>

      {/* Results */}
      <main className="max-w-7xl mx-auto px-4 py-6">
        {/* Status bar */}
        {(results.length > 0 || errors.length > 0) && (
          <div className="flex items-center justify-between mb-4">
            <div className="text-sm text-gray-500">
              Showing{" "}
              <span className="font-semibold text-slate-800">
                {results.length}
              </span>{" "}
              store listings
              {activeAppName && (
                <span className="ml-2 text-gray-400">
                  for {activeAppName}
                </span>
              )}
              {errors.length > 0 && (
                <span className="ml-2 text-red-500">
                  ({errors.length} failed)
                </span>
              )}
            </div>
            <ViewToggle view={view} onChange={setView} />
          </div>
        )}

        {/* Loading skeleton */}
        {loading && results.length === 0 && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
            {Array.from({ length: Math.min(selectedCountries.length, 8) }).map(
              (_, i) => (
                <div
                  key={i}
                  className="bg-white rounded-xl border border-gray-200 p-4 animate-pulse"
                >
                  <div className="h-4 bg-gray-200 rounded w-1/2 mb-4" />
                  <div className="flex gap-3 mb-3">
                    <div className="w-16 h-16 bg-gray-200 rounded-xl" />
                    <div className="flex-1">
                      <div className="h-3 bg-gray-200 rounded w-3/4 mb-2" />
                      <div className="h-3 bg-gray-200 rounded w-1/2" />
                    </div>
                  </div>
                  <div className="h-20 bg-gray-200 rounded mb-3" />
                  <div className="h-24 bg-gray-200 rounded" />
                </div>
              )
            )}
          </div>
        )}

        {/* Error list */}
        {errors.length > 0 && (
          <div className="mb-4 p-3 bg-red-50 border border-red-200 rounded-lg">
            <div className="text-sm font-medium text-red-700 mb-1">
              Failed to fetch:
            </div>
            <div className="flex flex-wrap gap-1">
              {errors.map((err) => (
                <span
                  key={err.country}
                  className="text-xs bg-red-100 text-red-600 px-2 py-0.5 rounded"
                  title={err.message}
                >
                  {err.country.toUpperCase()}
                </span>
              ))}
            </div>
          </div>
        )}

        {/* Results view */}
        {view === "grid" && <GridView data={results} />}
        {view === "table" && <TableView data={results} />}
        {view === "detail" && <DetailView data={results} />}

        {/* Empty state */}
        {!loading && results.length === 0 && errors.length === 0 && (
          <div className="text-center py-20">
            <div className="mb-4 flex justify-center">
              <Logo size={64} />
            </div>
            <h2 className="text-xl font-semibold text-slate-700 mb-2">
              Store Preview Tool
            </h2>
            <p className="text-slate-400 max-w-md mx-auto">
              Select an app or paste a competitor link, choose countries, then
              click Fetch to view store listings across markets.
            </p>
          </div>
        )}
      </main>
    </div>
  );
}
