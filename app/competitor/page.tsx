"use client";

import { useState } from "react";
import { StoreData, FetchResponse } from "@/lib/types";
import Logo from "@/components/Logo";
import { IconSearch } from "@/components/Icons";
import CountrySelector from "@/components/CountrySelector";
import LanguageSelector from "@/components/LanguageSelector";
import ViewToggle from "@/components/ViewToggle";
import GridView from "@/components/GridView";
import TableView from "@/components/TableView";
import DetailView from "@/components/DetailView";

function extractPackageId(input: string): string | null {
  const urlMatch = input.match(/[?&]id=([a-zA-Z0-9._]+)/);
  if (urlMatch) return urlMatch[1];
  const pkgMatch = input.match(/^[a-zA-Z][a-zA-Z0-9._]*\.[a-zA-Z0-9._]+$/);
  if (pkgMatch) return pkgMatch[0];
  return null;
}

export default function CompetitorPage() {
  const [url, setUrl] = useState("");
  const [inputError, setInputError] = useState("");
  const [activePackageId, setActivePackageId] = useState<string | null>(null);
  const [selectedCountries, setSelectedCountries] = useState<string[]>([]);
  const [results, setResults] = useState<StoreData[]>([]);
  const [errors, setErrors] = useState<{ country: string; message: string }[]>([]);
  const [selectedLang, setSelectedLang] = useState<string | null>(null);
  const [view, setView] = useState<"grid" | "table" | "detail">("grid");
  const [loading, setLoading] = useState(false);
  const [progress, setProgress] = useState({ done: 0, total: 0 });

  const handleUseApp = () => {
    setInputError("");
    const pkgId = extractPackageId(url.trim());
    if (!pkgId) {
      setInputError("Invalid link. Paste a Google Play URL or package ID (e.g. com.example.app)");
      return;
    }
    setActivePackageId(pkgId);
  };

  const fetchData = async () => {
    if (!activePackageId || selectedCountries.length === 0) return;

    setLoading(true);
    setResults([]);
    setErrors([]);

    const total = selectedCountries.length;
    setProgress({ done: 0, total });

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
            isCompetitor: true,
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
                Competitor Store Viewer
              </h1>
              <p className="text-xs text-slate-500">
                View any Google Play listing across markets &mdash; Apero UA
              </p>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-[1fr_1fr_auto_auto] gap-3 items-end">
            {/* URL input */}
            <div className="w-full">
              <label className="block text-sm font-medium text-gray-700 mb-1 flex items-center gap-1.5">
                <IconSearch className="w-4 h-4 text-emerald-600" />
                Google Play Link
              </label>
              <div className="flex gap-2">
                <input
                  type="text"
                  value={url}
                  onChange={(e) => {
                    setUrl(e.target.value);
                    setInputError("");
                  }}
                  onKeyDown={(e) => {
                    if (e.key === "Enter") handleUseApp();
                  }}
                  placeholder="Paste Play Store link or package ID..."
                  className="flex-1 px-4 py-3 bg-white border border-gray-300 rounded-lg shadow-sm hover:border-teal-400 focus:outline-none focus:ring-2 focus:ring-teal-500 transition-all text-sm"
                />
                <button
                  onClick={handleUseApp}
                  disabled={!url.trim()}
                  className="px-4 py-3 bg-teal-500 text-white rounded-lg font-medium hover:bg-teal-600 disabled:bg-gray-300 disabled:cursor-not-allowed transition-colors shadow-sm text-sm whitespace-nowrap"
                >
                  Use
                </button>
              </div>
              {inputError && (
                <p className="text-xs text-red-500 mt-1">{inputError}</p>
              )}
              {activePackageId && (
                <div className="mt-2 flex items-center gap-2 text-xs">
                  <span className="bg-teal-50 text-teal-600 px-2 py-1 rounded-md border border-teal-200">
                    {activePackageId}
                  </span>
                  <button
                    onClick={() => {
                      setActivePackageId(null);
                      setResults([]);
                      setErrors([]);
                    }}
                    className="text-gray-400 hover:text-red-500"
                  >
                    &times; Clear
                  </button>
                </div>
              )}
            </div>

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
        </div>
      </header>

      {/* Results */}
      <main className="max-w-7xl mx-auto px-4 py-6">
        {(results.length > 0 || errors.length > 0) && (
          <div className="flex items-center justify-between mb-4">
            <div className="text-sm text-gray-500">
              Showing{" "}
              <span className="font-semibold text-slate-800">
                {results.length}
              </span>{" "}
              store listings
              {activePackageId && (
                <span className="ml-2 text-gray-400">
                  for {activePackageId}
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

        {view === "grid" && <GridView data={results} />}
        {view === "table" && <TableView data={results} />}
        {view === "detail" && <DetailView data={results} />}

        {!loading && results.length === 0 && errors.length === 0 && (
          <div className="text-center py-20">
            <div className="mb-4 flex justify-center">
              <Logo size={64} />
            </div>
            <h2 className="text-xl font-semibold text-slate-700 mb-2">
              Competitor Store Viewer
            </h2>
            <p className="text-slate-400 max-w-md mx-auto">
              Paste a Google Play Store link above, choose countries, then click
              Fetch to view the app listing across markets.
            </p>
          </div>
        )}
      </main>
    </div>
  );
}
