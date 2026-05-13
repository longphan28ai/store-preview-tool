"use client";

import { useState } from "react";
import { MOCK_COUNTRIES } from "./mockData";

const CATEGORIES = ["All", "AI Photo & Video", "Language Learning", "AI Chatbot", "AI Music", "Utility"];
const LANGUAGES = ["Auto", "English", "Vietnamese", "Japanese", "Spanish", "French", "German"];
const VIEWS = [
  { id: "grid", label: "Grid" },
  { id: "table", label: "Table" },
  { id: "detail", label: "Detail" },
];

export default function FilterBar() {
  const [view, setView] = useState("grid");
  const [activeCat, setActiveCat] = useState("All");
  const [selectedCountries] = useState(["US", "JP", "VN", "DE", "BR"]);

  return (
    <div className="rounded-xl border border-slate-800 bg-slate-900/40 p-3 flex flex-wrap items-center gap-2">
      {/* Category pills */}
      <div className="flex items-center gap-1 overflow-x-auto pr-2 border-r border-slate-800">
        {CATEGORIES.map((c) => (
          <button
            key={c}
            onClick={() => setActiveCat(c)}
            className={`h-8 px-3 text-xs font-medium rounded-md whitespace-nowrap transition-colors ${
              activeCat === c
                ? "bg-emerald-500/15 text-emerald-300 ring-1 ring-inset ring-emerald-500/30"
                : "text-slate-400 hover:text-slate-100 hover:bg-slate-800/60"
            }`}
          >
            {c}
          </button>
        ))}
      </div>

      {/* Country selector */}
      <button className="h-8 px-2.5 text-xs text-slate-300 bg-slate-900 hover:bg-slate-800 border border-slate-800 rounded-md transition-colors flex items-center gap-1.5">
        <svg className="w-3.5 h-3.5 text-slate-500" viewBox="0 0 20 20" fill="currentColor"><path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM4.332 8.027a6.012 6.012 0 011.912-2.706C6.512 5.73 6.974 6 7.5 6A1.5 1.5 0 019 7.5V8a2 2 0 004 0 2 2 0 011.523-1.943A5.977 5.977 0 0116 10c0 .34-.028.675-.083 1H15a2 2 0 00-2 2v2.197A5.973 5.973 0 0110 16v-2a2 2 0 00-2-2 2 2 0 01-2-2 2 2 0 00-1.668-1.973z" clipRule="evenodd"/></svg>
        <div className="flex -space-x-1">
          {MOCK_COUNTRIES.filter((c) => selectedCountries.includes(c.code)).slice(0, 5).map((c) => (
            <span key={c.code} className="text-sm leading-none" title={c.name}>{c.flag}</span>
          ))}
        </div>
        <span>{selectedCountries.length} countries</span>
        <svg className="w-3 h-3 text-slate-500" viewBox="0 0 20 20" fill="currentColor"><path fillRule="evenodd" d="M5.23 7.21a.75.75 0 011.06.02L10 11.06l3.71-3.83a.75.75 0 111.08 1.04l-4.25 4.4a.75.75 0 01-1.08 0l-4.25-4.4a.75.75 0 01.02-1.06z" clipRule="evenodd"/></svg>
      </button>

      {/* Language */}
      <select className="h-8 px-2.5 text-xs text-slate-300 bg-slate-900 border border-slate-800 rounded-md hover:bg-slate-800 transition-colors focus:outline-none focus:border-emerald-500/40">
        {LANGUAGES.map((l) => (
          <option key={l}>{l === "Auto" ? "Auto (country default)" : l}</option>
        ))}
      </select>

      <div className="flex-1" />

      {/* View toggle */}
      <div className="flex items-center bg-slate-900 border border-slate-800 rounded-md p-0.5">
        {VIEWS.map((v) => (
          <button
            key={v.id}
            onClick={() => setView(v.id)}
            className={`h-7 px-2.5 text-xs font-medium rounded transition-colors ${
              view === v.id ? "bg-slate-800 text-emerald-300" : "text-slate-500 hover:text-slate-200"
            }`}
          >
            {v.label}
          </button>
        ))}
      </div>

      {/* Sort */}
      <select className="h-8 px-2.5 text-xs text-slate-300 bg-slate-900 border border-slate-800 rounded-md hover:bg-slate-800 transition-colors focus:outline-none focus:border-emerald-500/40">
        <option>Sort: Rating ↓</option>
        <option>Sort: Installs ↓</option>
        <option>Sort: Updated ↓</option>
        <option>Sort: CVR ↓</option>
      </select>
    </div>
  );
}
