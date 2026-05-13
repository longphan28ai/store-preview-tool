import { MOCK_APPS } from "../_components/mockData";

const COUNTRY = { code: "US", name: "United States", flag: "🇺🇸" };
const SELECTED = MOCK_APPS.slice(0, 3);

// Mock diff data — same field across 3 apps, with diff highlights
const TITLES = [
  { text: ["AI Chat", "- Ask your AI", "Chatbot"], diff: [false, false, true] },
  { text: ["AI Chatbot Assistant", "- GPT", "AI"], diff: [false, true, true] },
  { text: ["Picshiner", "- AI Photo", "Enhancer"], diff: [true, true, true] },
];
const DESCRIPTIONS = [
  "Powerful AI chatbot powered by GPT-4. Ask anything, anytime. Get instant answers, translations, coding help.",
  "AI Assistant for everyday tasks. Chat with our advanced AI bot for writing, learning, and productivity tools.",
  "Transform your photos with cutting-edge AI. Enhance quality, fix blur, restore old photos, and unleash creativity.",
];

export default function ComparePage() {
  return (
    <div className="px-6 py-6 max-w-[1600px] mx-auto">
      <div className="flex items-start justify-between mb-6">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <h1 className="text-2xl font-semibold tracking-tight text-slate-100">Compare</h1>
            <span className="text-xs px-2 py-0.5 rounded-full bg-emerald-500/10 text-emerald-300 ring-1 ring-inset ring-emerald-500/20">
              {SELECTED.length} apps
            </span>
          </div>
          <p className="text-sm text-slate-400">
            Side-by-side preview with diff highlight · {COUNTRY.flag} {COUNTRY.name}
          </p>
        </div>
        <div className="flex items-center gap-2">
          <button className="h-9 px-3 text-sm text-slate-300 bg-slate-900 hover:bg-slate-800 border border-slate-800 rounded-md flex items-center gap-1.5">
            <svg className="w-4 h-4" viewBox="0 0 20 20" fill="currentColor"><path d="M3 6a3 3 0 013-3h10a1 1 0 01.8 1.6L14.25 8l2.55 3.4A1 1 0 0116 13H6a1 1 0 00-1 1v3a1 1 0 11-2 0V6z"/></svg>
            Diff: <span className="text-emerald-300 ml-1">ON</span>
          </button>
          <button className="h-9 px-3 text-sm text-slate-300 bg-slate-900 hover:bg-slate-800 border border-slate-800 rounded-md">
            Export
          </button>
          <button className="h-9 px-3 text-sm font-medium text-slate-950 bg-gradient-to-br from-emerald-400 to-teal-500 rounded-md flex items-center gap-1.5 shadow-lg shadow-emerald-500/20">
            <svg className="w-4 h-4" viewBox="0 0 20 20" fill="currentColor"><path d="M10 3a1 1 0 011 1v5h5a1 1 0 110 2h-5v5a1 1 0 11-2 0v-5H4a1 1 0 110-2h5V4a1 1 0 011-1z"/></svg>
            Add app
          </button>
        </div>
      </div>

      {/* Country & language picker */}
      <div className="rounded-xl border border-slate-800 bg-slate-900/40 p-3 flex items-center gap-3 mb-5">
        <div className="text-xs text-slate-500 uppercase tracking-wider">Comparing in</div>
        <button className="h-8 px-2.5 text-xs text-slate-200 bg-slate-900 border border-slate-800 rounded-md flex items-center gap-1.5">
          <span>{COUNTRY.flag}</span>
          <span>{COUNTRY.name}</span>
          <svg className="w-3 h-3 text-slate-500" viewBox="0 0 20 20" fill="currentColor"><path fillRule="evenodd" d="M5.23 7.21a.75.75 0 011.06.02L10 11.06l3.71-3.83a.75.75 0 111.08 1.04l-4.25 4.4a.75.75 0 01-1.08 0l-4.25-4.4a.75.75 0 01.02-1.06z" clipRule="evenodd"/></svg>
        </button>
        <button className="h-8 px-2.5 text-xs text-slate-200 bg-slate-900 border border-slate-800 rounded-md flex items-center gap-1.5">
          <span>English</span>
          <svg className="w-3 h-3 text-slate-500" viewBox="0 0 20 20" fill="currentColor"><path fillRule="evenodd" d="M5.23 7.21a.75.75 0 011.06.02L10 11.06l3.71-3.83a.75.75 0 111.08 1.04l-4.25 4.4a.75.75 0 01-1.08 0l-4.25-4.4a.75.75 0 01.02-1.06z" clipRule="evenodd"/></svg>
        </button>
        <div className="flex-1" />
        <div className="flex items-center gap-3 text-xs text-slate-400">
          <span className="flex items-center gap-1.5"><span className="w-2 h-2 rounded-sm bg-emerald-400/60"/> same</span>
          <span className="flex items-center gap-1.5"><span className="w-2 h-2 rounded-sm bg-amber-400/60"/> different</span>
        </div>
      </div>

      {/* Compare grid: 1 row = 1 field, columns = apps */}
      <div className="rounded-xl border border-slate-800 bg-slate-900/40 overflow-hidden">
        {/* App header row */}
        <div className="grid grid-cols-[180px_repeat(3,1fr)] border-b border-slate-800">
          <div className="px-4 py-3 text-[11px] uppercase tracking-wider text-slate-500 font-medium bg-slate-950/40">Field</div>
          {SELECTED.map((app) => (
            <div key={app.productCode} className="px-4 py-3 border-l border-slate-800 flex items-center gap-2.5">
              <div className={`w-9 h-9 rounded-lg bg-gradient-to-br ${app.iconBg} flex items-center justify-center text-white font-bold text-xs shrink-0`}>
                {app.icon}
              </div>
              <div className="min-w-0">
                <div className="text-sm font-semibold text-slate-100 truncate">{app.name}</div>
                <div className="text-[10px] text-slate-500 font-mono truncate">{app.packageId}</div>
              </div>
              <button className="text-slate-500 hover:text-rose-400" title="Remove">
                <svg className="w-3.5 h-3.5" viewBox="0 0 20 20" fill="currentColor"><path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd"/></svg>
              </button>
            </div>
          ))}
        </div>

        {/* Title row */}
        <CompareRow label="Title">
          {SELECTED.map((app, i) => (
            <div key={app.productCode} className="px-4 py-4 border-l border-slate-800">
              <div className="text-sm font-semibold leading-snug">
                {TITLES[i].text.map((t, j) => (
                  <span key={j} className={TITLES[i].diff[j] ? "bg-amber-400/15 text-amber-200 px-0.5 rounded" : "text-slate-100"}>
                    {t}
                    {j < TITLES[i].text.length - 1 ? " " : ""}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </CompareRow>

        {/* Icon row */}
        <CompareRow label="Icon">
          {SELECTED.map((app) => (
            <div key={app.productCode} className="px-4 py-4 border-l border-slate-800 flex items-center gap-3">
              <div className={`w-16 h-16 rounded-2xl bg-gradient-to-br ${app.iconBg} flex items-center justify-center text-white font-bold text-lg shadow-lg`}>
                {app.icon}
              </div>
              <div className="text-[11px] text-slate-400">
                <div>1024×1024</div>
                <div className="text-slate-500">PNG</div>
              </div>
            </div>
          ))}
        </CompareRow>

        {/* Metrics row */}
        <CompareRow label="Metrics">
          {SELECTED.map((app) => (
            <div key={app.productCode} className="px-4 py-4 border-l border-slate-800 grid grid-cols-2 gap-2">
              <Metric label="Rating" value={`${app.rating.toFixed(1)} ★`} />
              <Metric label="Reviews" value={`${(app.reviews / 1000).toFixed(0)}K`} />
              <Metric label="Installs" value={app.installs} />
              <Metric label="CVR" value={`${app.cvr}%`} highlight />
            </div>
          ))}
        </CompareRow>

        {/* Short description row */}
        <CompareRow label="Description">
          {SELECTED.map((app, i) => (
            <div key={app.productCode} className="px-4 py-4 border-l border-slate-800 text-xs leading-relaxed text-slate-300">
              {DESCRIPTIONS[i]}
            </div>
          ))}
        </CompareRow>

        {/* Screenshot row */}
        <CompareRow label="Screenshots">
          {SELECTED.map((app, idx) => (
            <div key={app.productCode} className="px-4 py-4 border-l border-slate-800">
              <div className="flex gap-2">
                {[0, 1, 2, 3].map((i) => {
                  const isDiff = (idx + i) % 3 === 0;
                  return (
                    <div
                      key={i}
                      className={`relative w-16 h-28 rounded-md bg-gradient-to-br ${app.iconBg} opacity-70 ${
                        isDiff ? "ring-2 ring-amber-400/60" : ""
                      }`}
                    >
                      {isDiff && (
                        <span className="absolute -top-1.5 -right-1.5 w-4 h-4 rounded-full bg-amber-400 text-amber-950 text-[8px] font-bold grid place-items-center">
                          !
                        </span>
                      )}
                    </div>
                  );
                })}
                <button className="w-16 h-28 rounded-md border border-dashed border-slate-700 text-slate-500 hover:text-slate-300 hover:border-slate-500 flex items-center justify-center text-[10px]">
                  +4 more
                </button>
              </div>
            </div>
          ))}
        </CompareRow>

        {/* Last updated */}
        <CompareRow label="Last updated" last>
          {SELECTED.map((app) => (
            <div key={app.productCode} className="px-4 py-4 border-l border-slate-800 text-xs text-slate-300">
              {app.updated}
              <span className="ml-2 text-[10px] text-slate-500">v2.{Math.floor(Math.random() * 30)}.{Math.floor(Math.random() * 10)}</span>
            </div>
          ))}
        </CompareRow>
      </div>
    </div>
  );
}

function CompareRow({ label, children, last }: { label: string; children: React.ReactNode; last?: boolean }) {
  return (
    <div className={`grid grid-cols-[180px_repeat(3,1fr)] ${last ? "" : "border-b border-slate-800"}`}>
      <div className="px-4 py-4 text-[11px] uppercase tracking-wider text-slate-500 font-medium bg-slate-950/40">{label}</div>
      {children}
    </div>
  );
}

function Metric({ label, value, highlight }: { label: string; value: string; highlight?: boolean }) {
  return (
    <div className={`rounded-md px-2 py-1.5 ring-1 ring-inset ${highlight ? "bg-emerald-500/10 ring-emerald-500/20" : "bg-slate-950/60 ring-slate-800"}`}>
      <div className="text-[9px] uppercase tracking-wider text-slate-500">{label}</div>
      <div className={`text-sm font-semibold tabular-nums ${highlight ? "text-emerald-300" : "text-slate-200"}`}>{value}</div>
    </div>
  );
}
