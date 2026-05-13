import { MOCK_APPS, MOCK_COUNTRIES } from "./_components/mockData";
import FilterBar from "./_components/FilterBar";
import AppCard from "./_components/AppCard";

export default function V2Home() {
  const totalInstalls = "42M+";
  return (
    <div className="px-6 py-6 max-w-[1600px] mx-auto">
      {/* Page header */}
      <div className="flex items-start justify-between mb-6">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <h1 className="text-2xl font-semibold tracking-tight text-slate-100">Apps</h1>
            <span className="text-xs px-2 py-0.5 rounded-full bg-slate-800 text-slate-400 tabular-nums">
              {MOCK_APPS.length} apps
            </span>
          </div>
          <p className="text-sm text-slate-400">
            Browse and preview store listings across countries · Last sync 2 minutes ago
          </p>
        </div>
        <div className="flex items-center gap-2">
          <button className="h-9 px-3 text-sm text-slate-300 bg-slate-900 hover:bg-slate-800 border border-slate-800 rounded-md transition-colors flex items-center gap-1.5">
            <svg className="w-4 h-4" viewBox="0 0 20 20" fill="currentColor"><path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm.75-13a.75.75 0 00-1.5 0v5c0 .414.336.75.75.75h4a.75.75 0 000-1.5h-3.25V5z" clipRule="evenodd"/></svg>
            Refresh
          </button>
          <button className="h-9 px-3 text-sm font-medium text-slate-950 bg-gradient-to-br from-emerald-400 to-teal-500 hover:from-emerald-300 hover:to-teal-400 rounded-md transition-colors flex items-center gap-1.5 shadow-lg shadow-emerald-500/20">
            <svg className="w-4 h-4" viewBox="0 0 20 20" fill="currentColor"><path d="M10 3a1 1 0 011 1v5h5a1 1 0 110 2h-5v5a1 1 0 11-2 0v-5H4a1 1 0 110-2h5V4a1 1 0 011-1z"/></svg>
            Add App
          </button>
        </div>
      </div>

      {/* Stats row */}
      <div className="grid grid-cols-4 gap-3 mb-6">
        <StatCard label="Total Apps" value={String(MOCK_APPS.length)} trend="+3 this month" tone="emerald" />
        <StatCard label="Total Installs" value={totalInstalls} trend="+12.4% MoM" tone="teal" />
        <StatCard label="Avg Rating" value="4.5" trend="↑ from 4.42" tone="cyan" />
        <StatCard label="Countries Covered" value={String(MOCK_COUNTRIES.length)} trend="9 active markets" tone="slate" />
      </div>

      {/* Filter bar */}
      <FilterBar />

      {/* Grid of app cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4 mt-5">
        {MOCK_APPS.map((app) => (
          <AppCard key={app.productCode} app={app} />
        ))}
      </div>
    </div>
  );
}

function StatCard({
  label,
  value,
  trend,
  tone,
}: {
  label: string;
  value: string;
  trend: string;
  tone: "emerald" | "teal" | "cyan" | "slate";
}) {
  const toneRing = {
    emerald: "ring-emerald-500/20 from-emerald-500/10",
    teal: "ring-teal-500/20 from-teal-500/10",
    cyan: "ring-cyan-500/20 from-cyan-500/10",
    slate: "ring-slate-700 from-slate-800/20",
  }[tone];
  const toneText = {
    emerald: "text-emerald-300",
    teal: "text-teal-300",
    cyan: "text-cyan-300",
    slate: "text-slate-400",
  }[tone];
  return (
    <div className={`relative rounded-lg bg-gradient-to-br ${toneRing} to-transparent ring-1 ring-inset bg-slate-900/40 px-4 py-3.5`}>
      <div className="text-[11px] uppercase tracking-wider text-slate-500 font-medium">{label}</div>
      <div className="mt-1 text-2xl font-semibold tabular-nums text-slate-100">{value}</div>
      <div className={`mt-1 text-[11px] ${toneText} flex items-center gap-1`}>
        <span className="w-1 h-1 rounded-full bg-current" />
        {trend}
      </div>
    </div>
  );
}
