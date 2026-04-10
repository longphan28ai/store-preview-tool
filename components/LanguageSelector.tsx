"use client";

import { useState, useRef, useEffect } from "react";
import { LANGUAGES } from "@/data/languages";
import { IconLanguage } from "./Icons";

interface Props {
  selected: string | null;
  onChange: (lang: string | null) => void;
}

export default function LanguageSelector({ selected, onChange }: Props) {
  const [open, setOpen] = useState(false);
  const [search, setSearch] = useState("");
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function handleClick(e: MouseEvent) {
      if (ref.current && !ref.current.contains(e.target as Node)) {
        setOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClick);
    return () => document.removeEventListener("mousedown", handleClick);
  }, []);

  const filtered = LANGUAGES.filter(
    (l) =>
      l.name.toLowerCase().includes(search.toLowerCase()) ||
      l.code.toLowerCase().includes(search.toLowerCase())
  );

  const selectedLabel = selected
    ? LANGUAGES.find((l) => l.code === selected)?.name || selected
    : null;

  return (
    <div ref={ref} className="relative w-full">
      <label className="block text-sm font-medium text-gray-700 mb-1 flex items-center gap-1.5">
        <IconLanguage className="w-4 h-4 text-emerald-600" />
        Language
      </label>
      <button
        onClick={() => setOpen(!open)}
        className="w-full px-4 py-3 text-left bg-white border border-gray-300 rounded-lg shadow-sm hover:border-emerald-400 focus:outline-none focus:ring-2 focus:ring-emerald-500 transition-all"
      >
        {selected ? (
          <span>
            <span className="font-semibold text-emerald-600">{selected.toUpperCase()}</span>
            {" "}&mdash; {selectedLabel}
          </span>
        ) : (
          <span className="text-gray-400">Auto (country default)</span>
        )}
        <span className="float-right text-gray-400">&#x25BE;</span>
      </button>

      {selected && (
        <div className="flex items-center gap-1 mt-2">
          <span className="inline-flex items-center gap-1 px-2 py-0.5 bg-teal-100 text-teal-700 rounded-full text-xs">
            {selected.toUpperCase()} &mdash; {selectedLabel}
          </span>
          <button
            onClick={() => onChange(null)}
            className="px-2 py-0.5 text-xs text-red-500 hover:text-red-700"
          >
            Reset to Auto
          </button>
        </div>
      )}

      {open && (
        <div className="absolute z-50 w-full mt-1 bg-white border border-gray-200 rounded-lg shadow-xl max-h-[400px] overflow-hidden">
          {/* Search */}
          <div className="p-2 border-b">
            <input
              type="text"
              placeholder="Search language..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full px-3 py-2 border border-gray-200 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500"
              autoFocus
            />
          </div>

          {/* Options */}
          <div className="overflow-y-auto max-h-60">
            {/* Auto option */}
            <button
              onClick={() => {
                onChange(null);
                setOpen(false);
                setSearch("");
              }}
              className={`w-full px-4 py-2 text-left text-sm flex items-center gap-2 hover:bg-emerald-50 transition-colors border-b border-gray-100 ${
                selected === null ? "bg-emerald-50" : ""
              }`}
            >
              <span
                className={`w-4 h-4 rounded border flex items-center justify-center text-xs ${
                  selected === null
                    ? "bg-emerald-600 border-emerald-600 text-white"
                    : "border-gray-300"
                }`}
              >
                {selected === null ? "\u2713" : ""}
              </span>
              <span className="font-medium">Auto</span>
              <span className="text-gray-400 text-xs">(country default)</span>
            </button>

            {filtered.map((lang) => (
              <button
                key={lang.code}
                onClick={() => {
                  onChange(lang.code);
                  setOpen(false);
                  setSearch("");
                }}
                className={`w-full px-4 py-2 text-left text-sm flex items-center gap-2 hover:bg-emerald-50 transition-colors ${
                  selected === lang.code ? "bg-emerald-50" : ""
                }`}
              >
                <span
                  className={`w-4 h-4 rounded border flex items-center justify-center text-xs ${
                    selected === lang.code
                      ? "bg-emerald-600 border-emerald-600 text-white"
                      : "border-gray-300"
                  }`}
                >
                  {selected === lang.code ? "\u2713" : ""}
                </span>
                <span>{lang.name}</span>
                <span className="text-gray-400 ml-auto font-mono text-xs">
                  {lang.code}
                </span>
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
