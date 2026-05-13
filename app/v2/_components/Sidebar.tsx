"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import Logo from "../../../components/Logo";

const NAV = [
  { href: "/v2", label: "Apps", icon: IconApps },
  { href: "/v2/compare", label: "Compare", icon: IconCompare },
  { href: "/v2/categories", label: "Categories", icon: IconCategories },
  { href: "/v2/users", label: "Users", icon: IconUsers, admin: true },
  { href: "/v2/settings", label: "Settings", icon: IconSettings },
];

const CATEGORIES = [
  { slug: "ai-photo", name: "AI Photo & Video", count: 9 },
  { slug: "language", name: "Language Learning", count: 8 },
  { slug: "chatbot", name: "AI Chatbot", count: 3 },
  { slug: "music", name: "AI Music", count: 1 },
  { slug: "utility", name: "Utility", count: 14 },
];

export default function Sidebar() {
  const path = usePathname();
  return (
    <aside className="w-64 shrink-0 border-r border-slate-800/80 bg-slate-950/95 backdrop-blur flex flex-col">
      <div className="h-14 px-4 flex items-center gap-2.5 border-b border-slate-800/80">
        <Logo size={28} />
        <div className="leading-tight">
          <div className="text-sm font-semibold tracking-tight text-slate-100">Store Preview</div>
          <div className="text-[10px] uppercase tracking-widest text-emerald-400/80">Apero UA · v2</div>
        </div>
      </div>

      <nav className="flex-1 overflow-y-auto p-3 space-y-6">
        <div>
          <div className="px-2 mb-2 text-[10px] font-medium uppercase tracking-widest text-slate-500">
            Workspace
          </div>
          <div className="space-y-0.5">
            {NAV.map((item) => {
              const active = path === item.href || (item.href !== "/v2" && path?.startsWith(item.href));
              const Icon = item.icon;
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className={`group flex items-center gap-2.5 px-2.5 py-2 rounded-md text-sm transition-colors ${
                    active
                      ? "bg-emerald-500/10 text-emerald-300 ring-1 ring-inset ring-emerald-500/20"
                      : "text-slate-400 hover:text-slate-100 hover:bg-slate-800/60"
                  }`}
                >
                  <Icon className={`w-4 h-4 ${active ? "text-emerald-400" : "text-slate-500 group-hover:text-slate-300"}`} />
                  <span className="flex-1">{item.label}</span>
                  {item.admin && (
                    <span className="text-[9px] font-medium uppercase tracking-wider px-1.5 py-0.5 rounded bg-amber-400/10 text-amber-300 ring-1 ring-inset ring-amber-400/20">
                      Admin
                    </span>
                  )}
                </Link>
              );
            })}
          </div>
        </div>

        <div>
          <div className="px-2 mb-2 flex items-center justify-between">
            <div className="text-[10px] font-medium uppercase tracking-widest text-slate-500">
              Categories
            </div>
            <button className="text-slate-500 hover:text-emerald-300 transition-colors" title="New category">
              <svg className="w-3.5 h-3.5" viewBox="0 0 20 20" fill="currentColor"><path d="M10 3a1 1 0 011 1v5h5a1 1 0 110 2h-5v5a1 1 0 11-2 0v-5H4a1 1 0 110-2h5V4a1 1 0 011-1z"/></svg>
            </button>
          </div>
          <div className="space-y-0.5">
            {CATEGORIES.map((c) => (
              <Link
                key={c.slug}
                href={`/v2?category=${c.slug}`}
                className="flex items-center gap-2 px-2.5 py-1.5 rounded-md text-sm text-slate-400 hover:text-slate-100 hover:bg-slate-800/60 transition-colors"
              >
                <span className="w-1.5 h-1.5 rounded-full bg-slate-600 group-hover:bg-emerald-400" />
                <span className="flex-1 truncate">{c.name}</span>
                <span className="text-[10px] tabular-nums text-slate-500">{c.count}</span>
              </Link>
            ))}
          </div>
        </div>
      </nav>

      <div className="border-t border-slate-800/80 p-3">
        <div className="flex items-center gap-2.5 px-1">
          <div className="w-8 h-8 rounded-full bg-gradient-to-br from-emerald-400 to-teal-500 flex items-center justify-center text-xs font-semibold text-slate-950">
            LP
          </div>
          <div className="flex-1 min-w-0">
            <div className="text-xs font-medium text-slate-200 truncate">long.phan</div>
            <div className="text-[10px] text-emerald-400/90">Admin · @apero.vn</div>
          </div>
          <button className="text-slate-500 hover:text-slate-200" title="Sign out">
            <svg className="w-4 h-4" viewBox="0 0 20 20" fill="currentColor"><path fillRule="evenodd" d="M3 4a1 1 0 011-1h6a1 1 0 110 2H5v10h5a1 1 0 110 2H4a1 1 0 01-1-1V4zm10.293 2.293a1 1 0 011.414 0L17.414 9a1 1 0 010 1.414l-2.707 2.707a1 1 0 01-1.414-1.414L14.586 11H8a1 1 0 110-2h6.586l-1.293-1.293a1 1 0 010-1.414z" clipRule="evenodd"/></svg>
          </button>
        </div>
      </div>
    </aside>
  );
}

function IconApps({ className = "w-4 h-4" }: { className?: string }) {
  return <svg className={className} viewBox="0 0 20 20" fill="currentColor"><path d="M5 3a2 2 0 00-2 2v2a2 2 0 002 2h2a2 2 0 002-2V5a2 2 0 00-2-2H5zM5 11a2 2 0 00-2 2v2a2 2 0 002 2h2a2 2 0 002-2v-2a2 2 0 00-2-2H5zM11 5a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V5zM11 13a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z"/></svg>;
}
function IconCompare({ className = "w-4 h-4" }: { className?: string }) {
  return <svg className={className} viewBox="0 0 20 20" fill="currentColor"><path fillRule="evenodd" d="M3 4a1 1 0 011-1h5v14H4a1 1 0 01-1-1V4zm8-1h5a1 1 0 011 1v12a1 1 0 01-1 1h-5V3z" clipRule="evenodd"/></svg>;
}
function IconCategories({ className = "w-4 h-4" }: { className?: string }) {
  return <svg className={className} viewBox="0 0 20 20" fill="currentColor"><path d="M2 6a2 2 0 012-2h5l2 2h5a2 2 0 012 2v6a2 2 0 01-2 2H4a2 2 0 01-2-2V6z"/></svg>;
}
function IconUsers({ className = "w-4 h-4" }: { className?: string }) {
  return <svg className={className} viewBox="0 0 20 20" fill="currentColor"><path d="M9 6a3 3 0 11-6 0 3 3 0 016 0zM17 6a3 3 0 11-6 0 3 3 0 016 0zM12.93 17c.046-.327.07-.66.07-1a6.97 6.97 0 00-1.5-4.33A5 5 0 0119 16v1h-6.07zM6 11a5 5 0 015 5v1H1v-1a5 5 0 015-5z"/></svg>;
}
function IconSettings({ className = "w-4 h-4" }: { className?: string }) {
  return <svg className={className} viewBox="0 0 20 20" fill="currentColor"><path fillRule="evenodd" d="M11.49 3.17c-.38-1.56-2.6-1.56-2.98 0a1.532 1.532 0 01-2.286.948c-1.372-.836-2.942.734-2.106 2.106.54.886.061 2.042-.947 2.287-1.561.379-1.561 2.6 0 2.978a1.532 1.532 0 01.947 2.287c-.836 1.372.734 2.942 2.106 2.106a1.532 1.532 0 012.287.947c.379 1.561 2.6 1.561 2.978 0a1.533 1.533 0 012.287-.947c1.372.836 2.942-.734 2.106-2.106a1.533 1.533 0 01.947-2.287c1.561-.379 1.561-2.6 0-2.978a1.532 1.532 0 01-.947-2.287c.836-1.372-.734-2.942-2.106-2.106a1.532 1.532 0 01-2.287-.947zM10 13a3 3 0 100-6 3 3 0 000 6z" clipRule="evenodd"/></svg>;
}
