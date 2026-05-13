"use client";

import { MOCK_COUNTRIES, type MockApp } from "./mockData";

export default function AppCard({ app }: { app: MockApp }) {
  const positive = app.trend >= 0;
  return (
    <div className="group relative rounded-xl border border-slate-800 bg-slate-900/40 hover:border-emerald-500/30 hover:bg-slate-900/70 transition-colors overflow-hidden">
      <div className="absolute inset-0 pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity bg-gradient-to-br from-emerald-500/5 via-transparent to-teal-500/5" />

      <div className="relative p-4">
        {/* Header */}
        <div className="flex items-start gap-3">
          <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${app.iconBg} flex items-center justify-center text-white font-bold text-base shadow-lg shadow-black/30 shrink-0`}>
            {app.icon}
          </div>
          <div className="flex-1 min-w-0">
            <div className="flex items-center gap-1.5 mb-0.5">
              <span className="text-[10px] font-mono px-1.5 py-0.5 rounded bg-slate-800 text-slate-400">{app.productCode}</span>
              <span className="text-[10px] px-1.5 py-0.5 rounded bg-emerald-500/10 text-emerald-300 ring-1 ring-inset ring-emerald-500/20">{app.category}</span>
            </div>
            <h3 className="text-sm font-semibold text-slate-100 truncate" title={app.name}>{app.name}</h3>
            <div className="text-[11px] text-slate-500 font-mono truncate">{app.packageId}</div>
          </div>
          <button className="text-slate-500 hover:text-slate-200 p-1" title="More">
            <svg className="w-4 h-4" viewBox="0 0 20 20" fill="currentColor"><path d="M6 10a2 2 0 11-4 0 2 2 0 014 0zM12 10a2 2 0 11-4 0 2 2 0 014 0zM16 12a2 2 0 100-4 2 2 0 000 4z"/></svg>
          </button>
        </div>

        {/* Stats grid */}
        <div className="mt-4 grid grid-cols-4 gap-2">
          <Stat label="Rating" value={app.rating.toFixed(1)} suffix="★" tone="amber" />
          <Stat label="Installs" value={app.installs} tone="slate" />
          <Stat label="CVR" value={`${app.cvr}%`} tone="emerald" />
          <Stat
            label="Trend"
            value={`${positive ? "+" : ""}${app.trend.toFixed(1)}%`}
            tone={positive ? "emerald" : "rose"}
          />
        </div>

        {/* Country availability */}
        <div className="mt-4 flex items-center justify-between">
          <div className="flex items-center gap-1.5">
            <span className="text-[10px] uppercase tracking-wider text-slate-500">Live in</span>
            <div className="flex -space-x-1">
              {MOCK_COUNTRIES.slice(0, 6).map((c) => (
                <span key={c.code} className="text-sm leading-none" title={c.name}>{c.flag}</span>
              ))}
              <span className="ml-2 text-[10px] text-slate-400 tabular-nums">+{app.countries - 6}</span>
            </div>
          </div>
          <div className="text-[10px] text-slate-500">Updated {app.updated}</div>
        </div>

        {/* Actions */}
        <div className="mt-3 pt-3 border-t border-slate-800/80 flex items-center gap-2">
          <button className="flex-1 h-8 text-xs font-medium text-emerald-300 bg-emerald-500/10 hover:bg-emerald-500/20 rounded-md transition-colors ring-1 ring-inset ring-emerald-500/20">
            Preview
          </button>
          <button className="h-8 px-3 text-xs text-slate-300 bg-slate-800/60 hover:bg-slate-800 rounded-md transition-colors">
            Compare
          </button>
          <button className="h-8 w-8 grid place-items-center text-slate-400 hover:text-slate-100 hover:bg-slate-800 rounded-md transition-colors" title="Open in Play Store">
            <svg className="w-3.5 h-3.5" viewBox="0 0 20 20" fill="currentColor"><path d="M11 3a1 1 0 100 2h2.586l-6.293 6.293a1 1 0 101.414 1.414L15 6.414V9a1 1 0 102 0V4a1 1 0 00-1-1h-5z"/><path d="M5 5a2 2 0 00-2 2v8a2 2 0 002 2h8a2 2 0 002-2v-3a1 1 0 10-2 0v3H5V7h3a1 1 0 000-2H5z"/></svg>
          </button>
        </div>
      </div>
    </div>
  );
}

function Stat({
  label,
  value,
  suffix,
  tone,
}: {
  label: string;
  value: string;
  suffix?: string;
  tone: "emerald" | "amber" | "rose" | "slate";
}) {
  const color = {
    emerald: "text-emerald-300",
    amber: "text-amber-300",
    rose: "text-rose-300",
    slate: "text-slate-200",
  }[tone];
  return (
    <div className="rounded-md bg-slate-950/60 ring-1 ring-inset ring-slate-800 px-2 py-1.5">
      <div className="text-[9px] uppercase tracking-wider text-slate-500 font-medium">{label}</div>
      <div className={`mt-0.5 text-sm font-semibold tabular-nums ${color}`}>
        {value}
        {suffix && <span className="ml-0.5 text-[10px] text-slate-500">{suffix}</span>}
      </div>
    </div>
  );
}
