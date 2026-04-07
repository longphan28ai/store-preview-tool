"use client";

type ViewMode = "grid" | "table" | "detail";

interface Props {
  view: ViewMode;
  onChange: (view: ViewMode) => void;
}

export default function ViewToggle({ view, onChange }: Props) {
  const views: { key: ViewMode; label: string; icon: string }[] = [
    { key: "grid", label: "Grid", icon: "▦" },
    { key: "table", label: "Table", icon: "☰" },
    { key: "detail", label: "Detail", icon: "🖼" },
  ];

  return (
    <div className="inline-flex rounded-lg bg-gray-100 p-1">
      {views.map((v) => (
        <button
          key={v.key}
          onClick={() => onChange(v.key)}
          className={`px-4 py-2 rounded-md text-sm font-medium transition-all ${
            view === v.key
              ? "bg-white text-blue-600 shadow-sm"
              : "text-gray-500 hover:text-gray-700"
          }`}
        >
          {v.icon} {v.label}
        </button>
      ))}
    </div>
  );
}
