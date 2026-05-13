const CATEGORIES = [
  { name: "AI Photo & Video", slug: "ai-photo", count: 9, color: "from-pink-500 to-rose-500", description: "Photo editors, video makers, AI generators" },
  { name: "Language Learning", slug: "language", count: 8, color: "from-amber-400 to-orange-500", description: "English, Spanish, French, Chinese tutors" },
  { name: "AI Chatbot", slug: "chatbot", count: 3, color: "from-violet-500 to-fuchsia-500", description: "GPT, conversational AI assistants" },
  { name: "AI Music", slug: "music", count: 1, color: "from-purple-500 to-pink-500", description: "Music generation & song makers" },
  { name: "Utility", slug: "utility", count: 14, color: "from-cyan-400 to-blue-500", description: "Tools, productivity, utilities" },
  { name: "Education", slug: "education", count: 0, color: "from-emerald-400 to-teal-500", description: "Empty — drag apps here", empty: true },
];

const SUGGESTIONS = [
  { name: "Health & Fitness", reason: "Based on industry segmentation" },
  { name: "Wellness & Meditation", reason: "Trending in target markets" },
  { name: "AI Avatar & Face", reason: "Subcategory of AI Photo" },
];

export default function CategoriesPage() {
  return (
    <div className="px-6 py-6 max-w-[1600px] mx-auto">
      <div className="flex items-start justify-between mb-6">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <h1 className="text-2xl font-semibold tracking-tight text-slate-100">Categories</h1>
            <span className="text-xs px-2 py-0.5 rounded-full bg-slate-800 text-slate-400 tabular-nums">
              {CATEGORIES.length}
            </span>
          </div>
          <p className="text-sm text-slate-400">Organize apps into custom categories · Editor & Admin only</p>
        </div>
        <button className="h-9 px-3 text-sm font-medium text-slate-950 bg-gradient-to-br from-emerald-400 to-teal-500 hover:from-emerald-300 hover:to-teal-400 rounded-md flex items-center gap-1.5 shadow-lg shadow-emerald-500/20">
          <svg className="w-4 h-4" viewBox="0 0 20 20" fill="currentColor"><path d="M10 3a1 1 0 011 1v5h5a1 1 0 110 2h-5v5a1 1 0 11-2 0v-5H4a1 1 0 110-2h5V4a1 1 0 011-1z"/></svg>
          New Category
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-[1fr_320px] gap-5">
        {/* Categories grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
          {CATEGORIES.map((c) => (
            <div
              key={c.slug}
              className={`group relative rounded-xl border bg-slate-900/40 p-4 transition-colors ${
                c.empty ? "border-dashed border-slate-700 hover:border-emerald-500/40" : "border-slate-800 hover:border-emerald-500/30"
              }`}
            >
              <div className="flex items-start gap-3">
                <div className={`w-11 h-11 rounded-xl bg-gradient-to-br ${c.color} shrink-0 flex items-center justify-center text-white font-bold text-sm ${c.empty ? "opacity-40" : ""}`}>
                  {c.name.split(" ").map((w) => w[0]).join("").slice(0, 2)}
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2">
                    <h3 className="text-sm font-semibold text-slate-100">{c.name}</h3>
                    <span className="text-[10px] px-1.5 py-0.5 rounded bg-slate-800 text-slate-400 tabular-nums">{c.count} apps</span>
                  </div>
                  <p className="mt-0.5 text-xs text-slate-500 leading-relaxed">{c.description}</p>
                </div>
                <div className="flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                  <button className="h-7 w-7 grid place-items-center text-slate-400 hover:text-emerald-300 hover:bg-slate-800 rounded" title="Edit">
                    <svg className="w-3.5 h-3.5" viewBox="0 0 20 20" fill="currentColor"><path d="M17.414 2.586a2 2 0 00-2.828 0L7 10.172V13h2.828l7.586-7.586a2 2 0 000-2.828zM2 6a2 2 0 012-2h3a1 1 0 010 2H4v10h10v-3a1 1 0 112 0v3a2 2 0 01-2 2H4a2 2 0 01-2-2V6z"/></svg>
                  </button>
                  <button className="h-7 w-7 grid place-items-center text-slate-400 hover:text-rose-300 hover:bg-slate-800 rounded" title="Delete">
                    <svg className="w-3.5 h-3.5" viewBox="0 0 20 20" fill="currentColor"><path fillRule="evenodd" d="M9 2a1 1 0 00-.894.553L7.382 4H4a1 1 0 000 2v10a2 2 0 002 2h8a2 2 0 002-2V6a1 1 0 100-2h-3.382l-.724-1.447A1 1 0 0011 2H9zM7 8a1 1 0 012 0v6a1 1 0 11-2 0V8zm5-1a1 1 0 00-1 1v6a1 1 0 102 0V8a1 1 0 00-1-1z" clipRule="evenodd"/></svg>
                  </button>
                </div>
              </div>

              {!c.empty && (
                <div className="mt-3 pt-3 border-t border-slate-800/80 flex items-center justify-between">
                  <div className="flex -space-x-1.5">
                    {Array.from({ length: Math.min(c.count, 5) }).map((_, i) => (
                      <div key={i} className={`w-6 h-6 rounded-md bg-gradient-to-br ${c.color} ring-2 ring-slate-900 opacity-${90 - i * 10}`} />
                    ))}
                    {c.count > 5 && <span className="ml-2 text-[10px] text-slate-500 tabular-nums">+{c.count - 5}</span>}
                  </div>
                  <button className="text-[11px] text-emerald-300 hover:text-emerald-200">View apps →</button>
                </div>
              )}

              {c.empty && (
                <div className="mt-3 text-[11px] text-slate-500 italic">Drop apps or click to add</div>
              )}
            </div>
          ))}
        </div>

        {/* Suggestions panel */}
        <div className="space-y-4">
          <div className="rounded-xl border border-emerald-500/20 bg-emerald-500/5 p-4">
            <div className="flex items-center gap-2 mb-3">
              <svg className="w-4 h-4 text-emerald-400" viewBox="0 0 20 20" fill="currentColor"><path fillRule="evenodd" d="M5 2a1 1 0 011 1v1h1a1 1 0 010 2H6v1a1 1 0 01-2 0V6H3a1 1 0 010-2h1V3a1 1 0 011-1zm0 10a1 1 0 011 1v1h1a1 1 0 110 2H6v1a1 1 0 11-2 0v-1H3a1 1 0 110-2h1v-1a1 1 0 011-1zM12 2a1 1 0 01.967.744L14.146 7.2 17.5 9.134a1 1 0 010 1.732l-3.354 1.935-1.18 4.455a1 1 0 01-1.933 0L9.854 12.8 6.5 10.866a1 1 0 010-1.732l3.354-1.935 1.18-4.455A1 1 0 0112 2z" clipRule="evenodd"/></svg>
              <h3 className="text-sm font-semibold text-emerald-300">AI Suggestions</h3>
            </div>
            <p className="text-xs text-slate-400 mb-3 leading-relaxed">
              Categories you might want to add, based on your app portfolio and Google Play genres:
            </p>
            <div className="space-y-2">
              {SUGGESTIONS.map((s) => (
                <div key={s.name} className="flex items-start gap-2 p-2.5 rounded-md bg-slate-900/60 ring-1 ring-inset ring-slate-800">
                  <div className="flex-1">
                    <div className="text-xs font-medium text-slate-200">{s.name}</div>
                    <div className="text-[10px] text-slate-500 mt-0.5">{s.reason}</div>
                  </div>
                  <button className="h-6 px-2 text-[11px] text-emerald-300 bg-emerald-500/10 hover:bg-emerald-500/20 rounded ring-1 ring-inset ring-emerald-500/20">
                    Add
                  </button>
                </div>
              ))}
            </div>
          </div>

          <div className="rounded-xl border border-slate-800 bg-slate-900/40 p-4">
            <h3 className="text-sm font-semibold text-slate-100 mb-2">Quick stats</h3>
            <div className="space-y-2 text-xs">
              <StatRow label="Total apps categorized" value="35 / 35" />
              <StatRow label="Uncategorized" value="0" />
              <StatRow label="Apps with multiple categories" value="4" />
              <StatRow label="Most populated" value="Utility (14)" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function StatRow({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex items-center justify-between py-1.5 border-b border-slate-800/60 last:border-0">
      <span className="text-slate-400">{label}</span>
      <span className="text-slate-200 font-medium tabular-nums">{value}</span>
    </div>
  );
}
