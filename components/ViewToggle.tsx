"use client";

import { IconGrid, IconTable, IconDetail } from "./Icons";

type ViewMode = "grid" | "table" | "detail";

interface Props {
  view: ViewMode;
  onChange: (view: ViewMode) => void;
}

export default function ViewToggle({ view, onChange }: Props) {
  const views: { key: ViewMode; label: string; Icon: typeof IconGrid }[] = [
    { key: "grid", label: "Grid", Icon: IconGrid },
    { key: "table", label: "Table", Icon: IconTable },
    { key: "detail", label: "Detail", Icon: IconDetail },
  ];

  return (
    <div className="inline-flex rounded-lg bg-gray-100 p-1">
      {views.map((v) => (
        <button
          key={v.key}
          onClick={() => onChange(v.key)}
          className={`px-4 py-2 rounded-md text-sm font-medium transition-all flex items-center gap-1.5 ${
            view === v.key
              ? "bg-white text-emerald-600 shadow-sm"
              : "text-gray-500 hover:text-gray-700"
          }`}
        >
          <v.Icon className="w-3.5 h-3.5" /> {v.label}
        </button>
      ))}
    </div>
  );
}
