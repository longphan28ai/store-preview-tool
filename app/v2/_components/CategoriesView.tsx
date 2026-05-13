"use client";

import { useState } from "react";

const CATEGORIES = [
  { name: "AI Photo & Video", slug: "ai-photo", color: "from-pink-500 to-rose-500", description: "Photo editors, video makers, AI generators" },
  { name: "Language Learning", slug: "language", color: "from-amber-400 to-orange-500", description: "English, Spanish, French, Chinese tutors" },
  { name: "AI Chatbot", slug: "chatbot", color: "from-violet-500 to-fuchsia-500", description: "GPT, conversational AI assistants" },
  { name: "AI Music", slug: "music", color: "from-purple-500 to-pink-500", description: "Music generation & song makers" },
  { name: "Utility", slug: "utility", color: "from-cyan-400 to-blue-500", description: "Tools, productivity, utilities" },
  { name: "Education", slug: "education", color: "from-emerald-400 to-teal-500", description: "Empty — drag apps here", empty: true },
];

type AperoApp = {
  productCode: string;
  name: string;
  packageId: string;
  storeLink: string;
  category: string;
  iconBg: string;
  icon: string;
  note: string;
};

type CompetitorApp = {
  id: string;
  name: string;
  developer: string;
  storeLink: string;
  category: string;
  iconBg: string;
  icon: string;
  note: string;
};

const APERO_APPS: AperoApp[] = [
  { productCode: "APB508", name: "AI Chat - Ask your AI Chatbot", packageId: "com.syct.chatbot.assistant", storeLink: "https://play.google.com/store/apps/details?id=com.syct.chatbot.assistant", category: "AI Chatbot", iconBg: "from-violet-500 to-fuchsia-500", icon: "AI", note: "Flagship chatbot. Focus on GPT-4 features for Q2." },
  { productCode: "APB666", name: "Picshiner - AI Photo Enhancer", packageId: "com.adoreapps.photo.editor", storeLink: "https://play.google.com/store/apps/details?id=com.adoreapps.photo.editor", category: "AI Photo & Video", iconBg: "from-emerald-400 to-teal-500", icon: "PS", note: "Best CVR app. Test new screenshots in DE." },
  { productCode: "APB842", name: "LinguaPal - AI English Tutor", packageId: "learn.english.grammer.skills", storeLink: "https://play.google.com/store/apps/details?id=learn.english.grammer.skills", category: "Language Learning", iconBg: "from-amber-400 to-orange-500", icon: "LP", note: "Target VN, ID markets. Add native Vietnamese tutor scenes." },
  { productCode: "APB518", name: "Face Swap, AI Avatar Magic", packageId: "com.faceswap.ai.art.avatar", storeLink: "https://play.google.com/store/apps/details?id=com.faceswap.ai.art.avatar", category: "AI Photo & Video", iconBg: "from-pink-500 to-rose-500", icon: "FS", note: "Viral potential. Push ASO in BR + ID." },
  { productCode: "APB942", name: "LinguaSpeak: AI Learn English", packageId: "practice.ai_tutor.learn.study.ai", storeLink: "https://play.google.com/store/apps/details?id=practice.ai_tutor.learn.study.ai", category: "Language Learning", iconBg: "from-blue-500 to-indigo-500", icon: "LS", note: "Speech-focused. New screenshots needed for JP." },
  { productCode: "APB891", name: "AI Photo Video Slideshow Maker", packageId: "com.ai.photo.video.maker", storeLink: "https://play.google.com/store/apps/details?id=com.ai.photo.video.maker", category: "AI Photo & Video", iconBg: "from-cyan-400 to-blue-500", icon: "SM", note: "Holiday season campaign upcoming." },
  { productCode: "AIP801", name: "SongGenie: AI Music Generator", packageId: "aimusic.aisonggenerator.songmaker", storeLink: "https://play.google.com/store/apps/details?id=aimusic.aisonggenerator.songmaker", category: "AI Music", iconBg: "from-purple-500 to-pink-500", icon: "SG", note: "New product. Need fuller localization." },
  { productCode: "APB864", name: "AI Chatbot Assistant - GPT AI", packageId: "com.brct.aichatbot.assistant", storeLink: "https://play.google.com/store/apps/details?id=com.brct.aichatbot.assistant", category: "AI Chatbot", iconBg: "from-teal-400 to-cyan-500", icon: "CB", note: "Test GPT-5 hook in title for US." },
];

const COMPETITOR_APPS: CompetitorApp[] = [
  { id: "c1", name: "ChatGPT", developer: "OpenAI", storeLink: "https://play.google.com/store/apps/details?id=com.openai.chatgpt", category: "AI Chatbot", iconBg: "from-emerald-500 to-teal-600", icon: "GP", note: "Market leader. Watch screenshot updates monthly." },
  { id: "c2", name: "Genie - AI Chatbot", developer: "AppNation", storeLink: "https://play.google.com/store/apps/details?id=chat.gpt.genie.chatbot.ai", category: "AI Chatbot", iconBg: "from-blue-500 to-violet-500", icon: "GN", note: "Top US ASO. Uses video preview." },
  { id: "c3", name: "Photoroom", developer: "Photoroom", storeLink: "https://play.google.com/store/apps/details?id=com.photoroom.app", category: "AI Photo & Video", iconBg: "from-pink-500 to-purple-500", icon: "PR", note: "Pro features paywall — different strategy from us." },
  { id: "c4", name: "Lensa AI", developer: "Prisma Labs", storeLink: "https://play.google.com/store/apps/details?id=com.lensa.app", category: "AI Photo & Video", iconBg: "from-violet-500 to-fuchsia-500", icon: "LN", note: "Strong icon design. Reference for our Picshiner redesign." },
  { id: "c5", name: "Duolingo", developer: "Duolingo", storeLink: "https://play.google.com/store/apps/details?id=com.duolingo", category: "Language Learning", iconBg: "from-emerald-400 to-green-500", icon: "DL", note: "Gamification king. Different audience but study UX." },
  { id: "c6", name: "Babbel", developer: "Babbel GmbH", storeLink: "https://play.google.com/store/apps/details?id=com.babbel.mobile.android.en", category: "Language Learning", iconBg: "from-orange-500 to-red-500", icon: "BB", note: "Premium positioning. Compete with our LinguaPal Pro." },
  { id: "c7", name: "Suno AI", developer: "Suno Inc", storeLink: "https://play.google.com/store/apps/details?id=com.suno.app", category: "AI Music", iconBg: "from-amber-400 to-pink-500", icon: "SU", note: "Closest competitor to SongGenie. Track their pricing." },
];

const ROLE_TONE: Record<string, string> = {
  Admin: "bg-amber-400/10 text-amber-300 ring-amber-400/20",
  Editor: "bg-emerald-500/10 text-emerald-300 ring-emerald-500/20",
  Viewer: "bg-slate-700/40 text-slate-300 ring-slate-700",
};

const CATEGORY_COLOR: Record<string, string> = {
  "AI Chatbot": "from-violet-500 to-fuchsia-500",
  "AI Photo & Video": "from-pink-500 to-rose-500",
  "Language Learning": "from-amber-400 to-orange-500",
  "AI Music": "from-purple-500 to-pink-500",
  "Utility": "from-cyan-400 to-blue-500",
  "Education": "from-emerald-400 to-teal-500",
};

const CATEGORY_TEXT: Record<string, string> = {
  "AI Chatbot": "text-fuchsia-300 bg-fuchsia-500/10 ring-fuchsia-500/20",
  "AI Photo & Video": "text-pink-300 bg-pink-500/10 ring-pink-500/20",
  "Language Learning": "text-amber-300 bg-amber-400/10 ring-amber-400/20",
  "AI Music": "text-purple-300 bg-purple-500/10 ring-purple-500/20",
  "Utility": "text-cyan-300 bg-cyan-500/10 ring-cyan-500/20",
  "Education": "text-emerald-300 bg-emerald-500/10 ring-emerald-500/20",
};

export default function CategoriesView() {
  const [tab, setTab] = useState<"apero" | "competitor">("apero");

  return (
    <div className="px-6 py-6 max-w-[1600px] mx-auto">
      {/* Header */}
      <div className="flex items-start justify-between mb-6">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <h1 className="text-2xl font-semibold tracking-tight text-slate-100">Categories & Apps</h1>
            <span className="text-xs px-2 py-0.5 rounded-full bg-slate-800 text-slate-400 tabular-nums">
              {CATEGORIES.length} categories
            </span>
          </div>
          <p className="text-sm text-slate-400">Organize apps and track competitors · Editor & Admin only</p>
        </div>
        <button className="h-9 px-3 text-sm font-medium text-slate-950 bg-gradient-to-br from-emerald-400 to-teal-500 hover:from-emerald-300 hover:to-teal-400 rounded-md flex items-center gap-1.5 shadow-lg shadow-emerald-500/20">
          <svg className="w-4 h-4" viewBox="0 0 20 20" fill="currentColor"><path d="M10 3a1 1 0 011 1v5h5a1 1 0 110 2h-5v5a1 1 0 11-2 0v-5H4a1 1 0 110-2h5V4a1 1 0 011-1z"/></svg>
          New Category
        </button>
      </div>

      {/* Categories grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-6 gap-3 mb-8">
        {CATEGORIES.map((c) => {
          const aperoCount = APERO_APPS.filter((a) => a.category === c.name).length;
          const compCount = COMPETITOR_APPS.filter((a) => a.category === c.name).length;
          return (
            <div
              key={c.slug}
              id={c.slug}
              className={`group rounded-xl border bg-slate-900/40 p-3 transition-colors ${
                c.empty ? "border-dashed border-slate-700 hover:border-emerald-500/40" : "border-slate-800 hover:border-emerald-500/30"
              }`}
            >
              <div className="flex items-center gap-2">
                <div className={`w-8 h-8 rounded-lg bg-gradient-to-br ${c.color} flex items-center justify-center text-white font-bold text-[11px] ${c.empty ? "opacity-40" : ""}`}>
                  {c.name.split(" ").map((w) => w[0]).join("").slice(0, 2)}
                </div>
                <div className="flex-1 min-w-0">
                  <div className="text-xs font-semibold text-slate-100 truncate">{c.name}</div>
                  <div className="text-[10px] text-slate-500 tabular-nums">
                    {aperoCount} Apero · {compCount} comp.
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Tabs */}
      <div className="border-b border-slate-800 mb-5 flex items-center gap-1">
        <TabButton
          active={tab === "apero"}
          onClick={() => setTab("apero")}
          icon={
            <span className="w-5 h-5 rounded bg-gradient-to-br from-emerald-400 to-teal-500 flex items-center justify-center text-[10px] font-bold text-slate-950">
              A
            </span>
          }
          label="Ứng dụng của Apero"
          count={APERO_APPS.length}
        />
        <TabButton
          active={tab === "competitor"}
          onClick={() => setTab("competitor")}
          icon={
            <span className="w-5 h-5 rounded bg-slate-800 ring-1 ring-inset ring-slate-700 flex items-center justify-center text-[10px] font-bold text-slate-300">
              C
            </span>
          }
          label="Ứng dụng của đối thủ"
          count={COMPETITOR_APPS.length}
        />
      </div>

      {tab === "apero" ? <AperoSection /> : <CompetitorSection />}
    </div>
  );
}

function TabButton({ active, onClick, icon, label, count }: { active: boolean; onClick: () => void; icon: React.ReactNode; label: string; count: number }) {
  return (
    <button
      onClick={onClick}
      className={`relative flex items-center gap-2 px-4 py-2.5 text-sm transition-colors ${
        active ? "text-emerald-300" : "text-slate-400 hover:text-slate-200"
      }`}
    >
      {icon}
      <span className="font-medium">{label}</span>
      <span className={`text-[10px] tabular-nums px-1.5 py-0.5 rounded ${
        active ? "bg-emerald-500/10 text-emerald-300 ring-1 ring-inset ring-emerald-500/20" : "bg-slate-800 text-slate-400"
      }`}>
        {count}
      </span>
      {active && <span className="absolute bottom-[-1px] left-0 right-0 h-[2px] bg-gradient-to-r from-emerald-400 to-teal-500 rounded-t" />}
    </button>
  );
}

function AperoSection() {
  return (
    <div>
      <div className="flex items-center justify-between mb-3">
        <div>
          <div className="text-sm text-slate-400">
            Internal apps managed by Apero UA team. Each app is preview-able across countries.
          </div>
        </div>
        <div className="flex items-center gap-2">
          <div className="relative">
            <svg className="absolute left-2.5 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-slate-500" viewBox="0 0 20 20" fill="currentColor"><path fillRule="evenodd" d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z" clipRule="evenodd"/></svg>
            <input className="h-9 pl-8 pr-3 w-56 rounded-md bg-slate-900/60 border border-slate-800 text-sm text-slate-200 placeholder-slate-500 focus:outline-none focus:border-emerald-500/40" placeholder="Search Apero apps…" />
          </div>
          <button className="h-9 px-3 text-sm font-medium text-slate-950 bg-gradient-to-br from-emerald-400 to-teal-500 hover:from-emerald-300 hover:to-teal-400 rounded-md flex items-center gap-1.5 shadow-lg shadow-emerald-500/20">
            <svg className="w-4 h-4" viewBox="0 0 20 20" fill="currentColor"><path d="M10 3a1 1 0 011 1v5h5a1 1 0 110 2h-5v5a1 1 0 11-2 0v-5H4a1 1 0 110-2h5V4a1 1 0 011-1z"/></svg>
            Add Apero App
          </button>
        </div>
      </div>

      <div className="rounded-xl border border-slate-800 bg-slate-900/40 overflow-hidden">
        <div className="grid grid-cols-[1fr_120px_160px_240px_1fr_80px] px-4 py-2.5 border-b border-slate-800 text-[10px] uppercase tracking-wider text-slate-500 font-medium bg-slate-950/40">
          <div>App Name</div>
          <div>Product Code</div>
          <div>Category</div>
          <div>Store Link</div>
          <div>Note</div>
          <div></div>
        </div>
        {APERO_APPS.map((a) => (
          <div key={a.productCode} className="grid grid-cols-[1fr_120px_160px_240px_1fr_80px] px-4 py-3 border-b border-slate-800/60 last:border-0 items-start hover:bg-slate-900/60 group">
            <div className="flex items-center gap-3 min-w-0">
              <div className={`w-9 h-9 rounded-lg bg-gradient-to-br ${a.iconBg} flex items-center justify-center text-xs font-bold text-white shrink-0`}>
                {a.icon}
              </div>
              <div className="min-w-0">
                <div className="text-sm font-medium text-slate-100 truncate">{a.name}</div>
                <div className="text-[11px] text-slate-500 truncate font-mono">{a.packageId}</div>
              </div>
            </div>
            <div className="pt-1.5">
              <span className="text-xs font-mono px-2 py-1 rounded bg-slate-800 text-slate-300">{a.productCode}</span>
            </div>
            <div className="pt-1.5">
              <span className={`text-[11px] font-medium px-2 py-0.5 rounded ring-1 ring-inset ${CATEGORY_TEXT[a.category] ?? "text-slate-300 bg-slate-800 ring-slate-700"}`}>
                {a.category}
              </span>
            </div>
            <div className="pt-1.5 min-w-0">
              <a
                href={a.storeLink}
                target="_blank"
                rel="noopener noreferrer"
                className="text-xs text-emerald-300 hover:text-emerald-200 inline-flex items-center gap-1 max-w-full"
              >
                <svg className="w-3 h-3 shrink-0" viewBox="0 0 20 20" fill="currentColor"><path d="M11 3a1 1 0 100 2h2.586l-6.293 6.293a1 1 0 101.414 1.414L15 6.414V9a1 1 0 102 0V4a1 1 0 00-1-1h-5z"/><path d="M5 5a2 2 0 00-2 2v8a2 2 0 002 2h8a2 2 0 002-2v-3a1 1 0 10-2 0v3H5V7h3a1 1 0 000-2H5z"/></svg>
                <span className="truncate">play.google.com</span>
              </a>
            </div>
            <div className="pt-1.5 text-xs text-slate-300 leading-relaxed pr-3">{a.note}</div>
            <div className="flex justify-end gap-1 pt-0.5 opacity-0 group-hover:opacity-100 transition-opacity">
              <button className="h-7 w-7 grid place-items-center text-slate-400 hover:text-emerald-300 hover:bg-slate-800 rounded" title="Edit">
                <svg className="w-3.5 h-3.5" viewBox="0 0 20 20" fill="currentColor"><path d="M17.414 2.586a2 2 0 00-2.828 0L7 10.172V13h2.828l7.586-7.586a2 2 0 000-2.828zM2 6a2 2 0 012-2h3a1 1 0 010 2H4v10h10v-3a1 1 0 112 0v3a2 2 0 01-2 2H4a2 2 0 01-2-2V6z"/></svg>
              </button>
              <button className="h-7 w-7 grid place-items-center text-slate-400 hover:text-rose-300 hover:bg-slate-800 rounded" title="Delete">
                <svg className="w-3.5 h-3.5" viewBox="0 0 20 20" fill="currentColor"><path fillRule="evenodd" d="M9 2a1 1 0 00-.894.553L7.382 4H4a1 1 0 000 2v10a2 2 0 002 2h8a2 2 0 002-2V6a1 1 0 100-2h-3.382l-.724-1.447A1 1 0 0011 2H9zM7 8a1 1 0 012 0v6a1 1 0 11-2 0V8zm5-1a1 1 0 00-1 1v6a1 1 0 102 0V8a1 1 0 00-1-1z" clipRule="evenodd"/></svg>
              </button>
            </div>
          </div>
        ))}
      </div>

      <p className="mt-3 text-xs text-slate-500">
        <span className="text-amber-300">Admin only:</span> Add/edit/delete. Editors can view and use these for preview but cannot modify.
      </p>
    </div>
  );
}

function CompetitorSection() {
  return (
    <div>
      <div className="flex items-center justify-between mb-3">
        <div>
          <div className="text-sm text-slate-400">
            Competitor apps tracked for ASO benchmarking. Linked to AI Audit for competitive scoring.
          </div>
        </div>
        <div className="flex items-center gap-2">
          <div className="relative">
            <svg className="absolute left-2.5 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-slate-500" viewBox="0 0 20 20" fill="currentColor"><path fillRule="evenodd" d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z" clipRule="evenodd"/></svg>
            <input className="h-9 pl-8 pr-3 w-56 rounded-md bg-slate-900/60 border border-slate-800 text-sm text-slate-200 placeholder-slate-500 focus:outline-none focus:border-emerald-500/40" placeholder="Search competitors…" />
          </div>
          <button className="h-9 px-3 text-sm font-medium text-slate-950 bg-gradient-to-br from-emerald-400 to-teal-500 hover:from-emerald-300 hover:to-teal-400 rounded-md flex items-center gap-1.5 shadow-lg shadow-emerald-500/20">
            <svg className="w-4 h-4" viewBox="0 0 20 20" fill="currentColor"><path d="M10 3a1 1 0 011 1v5h5a1 1 0 110 2h-5v5a1 1 0 11-2 0v-5H4a1 1 0 110-2h5V4a1 1 0 011-1z"/></svg>
            Add Competitor
          </button>
        </div>
      </div>

      <div className="rounded-xl border border-slate-800 bg-slate-900/40 overflow-hidden">
        <div className="grid grid-cols-[1fr_160px_240px_1fr_80px] px-4 py-2.5 border-b border-slate-800 text-[10px] uppercase tracking-wider text-slate-500 font-medium bg-slate-950/40">
          <div>App Name</div>
          <div>Category</div>
          <div>Store Link</div>
          <div>Note</div>
          <div></div>
        </div>
        {COMPETITOR_APPS.map((a) => (
          <div key={a.id} className="grid grid-cols-[1fr_160px_240px_1fr_80px] px-4 py-3 border-b border-slate-800/60 last:border-0 items-start hover:bg-slate-900/60 group">
            <div className="flex items-center gap-3 min-w-0">
              <div className={`w-9 h-9 rounded-lg bg-gradient-to-br ${a.iconBg} flex items-center justify-center text-xs font-bold text-white shrink-0`}>
                {a.icon}
              </div>
              <div className="min-w-0">
                <div className="text-sm font-medium text-slate-100 truncate">{a.name}</div>
                <div className="text-[11px] text-slate-500 truncate">by {a.developer}</div>
              </div>
            </div>
            <div className="pt-1.5">
              <span className={`text-[11px] font-medium px-2 py-0.5 rounded ring-1 ring-inset ${CATEGORY_TEXT[a.category] ?? "text-slate-300 bg-slate-800 ring-slate-700"}`}>
                {a.category}
              </span>
            </div>
            <div className="pt-1.5 min-w-0">
              <a
                href={a.storeLink}
                target="_blank"
                rel="noopener noreferrer"
                className="text-xs text-emerald-300 hover:text-emerald-200 inline-flex items-center gap-1 max-w-full"
              >
                <svg className="w-3 h-3 shrink-0" viewBox="0 0 20 20" fill="currentColor"><path d="M11 3a1 1 0 100 2h2.586l-6.293 6.293a1 1 0 101.414 1.414L15 6.414V9a1 1 0 102 0V4a1 1 0 00-1-1h-5z"/><path d="M5 5a2 2 0 00-2 2v8a2 2 0 002 2h8a2 2 0 002-2v-3a1 1 0 10-2 0v3H5V7h3a1 1 0 000-2H5z"/></svg>
                <span className="truncate">play.google.com</span>
              </a>
            </div>
            <div className="pt-1.5 text-xs text-slate-300 leading-relaxed pr-3">{a.note}</div>
            <div className="flex justify-end gap-1 pt-0.5 opacity-0 group-hover:opacity-100 transition-opacity">
              <button className="h-7 w-7 grid place-items-center text-slate-400 hover:text-emerald-300 hover:bg-slate-800 rounded" title="Edit">
                <svg className="w-3.5 h-3.5" viewBox="0 0 20 20" fill="currentColor"><path d="M17.414 2.586a2 2 0 00-2.828 0L7 10.172V13h2.828l7.586-7.586a2 2 0 000-2.828zM2 6a2 2 0 012-2h3a1 1 0 010 2H4v10h10v-3a1 1 0 112 0v3a2 2 0 01-2 2H4a2 2 0 01-2-2V6z"/></svg>
              </button>
              <button className="h-7 w-7 grid place-items-center text-slate-400 hover:text-rose-300 hover:bg-slate-800 rounded" title="Delete">
                <svg className="w-3.5 h-3.5" viewBox="0 0 20 20" fill="currentColor"><path fillRule="evenodd" d="M9 2a1 1 0 00-.894.553L7.382 4H4a1 1 0 000 2v10a2 2 0 002 2h8a2 2 0 002-2V6a1 1 0 100-2h-3.382l-.724-1.447A1 1 0 0011 2H9zM7 8a1 1 0 012 0v6a1 1 0 11-2 0V8zm5-1a1 1 0 00-1 1v6a1 1 0 102 0V8a1 1 0 00-1-1z" clipRule="evenodd"/></svg>
              </button>
            </div>
          </div>
        ))}
      </div>

      <p className="mt-3 text-xs text-slate-500">
        Competitor data is read-only — used by AI Audit for benchmarking your apps against the market.
      </p>
    </div>
  );
}
