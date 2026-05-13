"use client";

export default function Topbar() {
  return (
    <header className="h-14 shrink-0 border-b border-slate-800/80 bg-slate-950/80 backdrop-blur flex items-center gap-3 px-5 sticky top-0 z-30">
      <div className="flex-1 max-w-xl relative">
        <svg className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-slate-500" viewBox="0 0 20 20" fill="currentColor">
          <path fillRule="evenodd" d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z" clipRule="evenodd"/>
        </svg>
        <input
          type="text"
          placeholder="Search apps, package, country…"
          className="w-full h-9 pl-9 pr-16 rounded-md bg-slate-900/80 border border-slate-800 text-sm text-slate-200 placeholder-slate-500 focus:outline-none focus:border-emerald-500/40 focus:ring-2 focus:ring-emerald-500/10 transition-colors"
        />
        <kbd className="absolute right-2 top-1/2 -translate-y-1/2 px-1.5 py-0.5 text-[10px] text-slate-500 bg-slate-800/80 rounded border border-slate-700">⌘K</kbd>
      </div>

      <div className="flex items-center gap-1.5">
        <button className="flex items-center gap-1.5 h-8 px-2.5 text-xs text-slate-400 hover:text-slate-100 hover:bg-slate-800/60 rounded-md transition-colors">
          <svg className="w-3.5 h-3.5" viewBox="0 0 20 20" fill="currentColor"><path d="M10 2a6 6 0 00-6 6c0 1.886-.454 3.665-1.257 5.234a.75.75 0 00.515 1.076 32.91 32.91 0 003.256.508 3.5 3.5 0 006.972 0 32.903 32.903 0 003.256-.508.75.75 0 00.515-1.076A11.448 11.448 0 0116 8a6 6 0 00-6-6zM8.05 14.943a33.54 33.54 0 003.9 0 2 2 0 01-3.9 0z"/></svg>
          <span>3</span>
        </button>
        <button className="h-8 w-8 grid place-items-center text-slate-400 hover:text-slate-100 hover:bg-slate-800/60 rounded-md transition-colors" title="Theme">
          <svg className="w-4 h-4" viewBox="0 0 20 20" fill="currentColor"><path fillRule="evenodd" d="M7.455 2.004a.75.75 0 01.26.77 7 7 0 009.958 7.967.75.75 0 011.067.853A8.5 8.5 0 116.647 1.921a.75.75 0 01.808.083z" clipRule="evenodd"/></svg>
        </button>
        <div className="h-6 w-px bg-slate-800 mx-1" />
        <button className="flex items-center gap-2 h-8 pl-1 pr-2.5 rounded-md hover:bg-slate-800/60 transition-colors">
          <div className="w-6 h-6 rounded-full bg-gradient-to-br from-emerald-400 to-teal-500 flex items-center justify-center text-[10px] font-semibold text-slate-950">
            LP
          </div>
          <span className="text-xs text-slate-200">long.phan</span>
          <span className="text-[9px] uppercase tracking-wider px-1.5 py-0.5 rounded bg-amber-400/10 text-amber-300 ring-1 ring-inset ring-amber-400/20">
            Admin
          </span>
        </button>
      </div>
    </header>
  );
}
