"use client";

import { useState, useRef, useEffect } from "react";
import { APPS, AppEntry } from "@/data/apps";
import { IconApp } from "./Icons";

interface Props {
  selected: AppEntry | null;
  onSelect: (app: AppEntry) => void;
}

export default function AppSelector({ selected, onSelect }: Props) {
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

  const filtered = APPS.filter(
    (app) =>
      app.name.toLowerCase().includes(search.toLowerCase()) ||
      app.productCode.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div ref={ref} className="relative w-full">
      <label className="block text-sm font-medium text-gray-700 mb-1 flex items-center gap-1.5">
        <IconApp className="w-4 h-4 text-emerald-600" />
        Select App
      </label>
      <button
        onClick={() => setOpen(!open)}
        className="w-full px-4 py-3 text-left bg-white border border-gray-300 rounded-lg shadow-sm hover:border-emerald-400 focus:outline-none focus:ring-2 focus:ring-emerald-500 transition-all"
      >
        {selected ? (
          <span>
            <span className="font-semibold text-emerald-600">
              {selected.productCode}
            </span>{" "}
            &mdash; {selected.name}
          </span>
        ) : (
          <span className="text-gray-400">Choose an app...</span>
        )}
        <span className="float-right text-gray-400">&#x25BE;</span>
      </button>

      {open && (
        <div className="absolute z-50 w-full mt-1 bg-white border border-gray-200 rounded-lg shadow-xl max-h-80 overflow-hidden">
          <div className="p-2 border-b">
            <input
              type="text"
              placeholder="Search by name or code..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full px-3 py-2 border border-gray-200 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500"
              autoFocus
            />
          </div>
          <div className="overflow-y-auto max-h-60">
            {filtered.map((app) => (
              <button
                key={app.productCode + app.packageId}
                onClick={() => {
                  onSelect(app);
                  setOpen(false);
                  setSearch("");
                }}
                className={`w-full px-4 py-2.5 text-left text-sm hover:bg-emerald-50 transition-colors ${
                  selected?.packageId === app.packageId
                    ? "bg-emerald-50 text-emerald-700"
                    : ""
                }`}
              >
                <span className="font-mono text-xs bg-gray-100 px-1.5 py-0.5 rounded mr-2">
                  {app.productCode}
                </span>
                {app.name}
              </button>
            ))}
            {filtered.length === 0 && (
              <div className="px-4 py-3 text-sm text-gray-400 text-center">
                No apps found
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
