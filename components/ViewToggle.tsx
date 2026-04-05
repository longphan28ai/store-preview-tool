"use client";

interface Props {
  view: "grid" | "table";
  onChange: (view: "grid" | "table") => void;
}

export default function ViewToggle({ view, onChange }: Props) {
  return (
    <div className="inline-flex rounded-lg bg-gray-100 p-1">
      <button
        onClick={() => onChange("grid")}
        className={`px-4 py-2 rounded-md text-sm font-medium transition-all ${
          view === "grid"
            ? "bg-white text-blue-600 shadow-sm"
            : "text-gray-500 hover:text-gray-700"
        }`}
      >
        ▦ Grid
      </button>
      <button
        onClick={() => onChange("table")}
        className={`px-4 py-2 rounded-md text-sm font-medium transition-all ${
          view === "table"
            ? "bg-white text-blue-600 shadow-sm"
            : "text-gray-500 hover:text-gray-700"
        }`}
      >
        ☰ Table
      </button>
    </div>
  );
}
