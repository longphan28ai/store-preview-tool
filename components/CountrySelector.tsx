"use client";

import { useState, useRef, useEffect } from "react";
import { COUNTRIES } from "@/data/countries";
import { COUNTRY_GROUPS } from "@/data/country-groups";
import { IconGlobe } from "./Icons";

interface Props {
  selected: string[];
  onChange: (countries: string[]) => void;
}

export default function CountrySelector({ selected, onChange }: Props) {
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

  const toggleCountry = (code: string) => {
    if (selected.includes(code)) {
      onChange(selected.filter((c) => c !== code));
    } else {
      onChange([...selected, code]);
    }
  };

  const toggleGroup = (codes: string[]) => {
    const allSelected = codes.every((c) => selected.includes(c));
    if (allSelected) {
      onChange(selected.filter((c) => !codes.includes(c)));
    } else {
      const newSelection = [...new Set([...selected, ...codes])];
      onChange(newSelection);
    }
  };

  const filtered = COUNTRIES.filter(
    (c) =>
      c.name.toLowerCase().includes(search.toLowerCase()) ||
      c.code.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div ref={ref} className="relative w-full">
      <label className="block text-sm font-medium text-gray-700 mb-1 flex items-center gap-1.5">
        <IconGlobe className="w-4 h-4 text-emerald-600" />
        Select Countries
      </label>
      <button
        onClick={() => setOpen(!open)}
        className="w-full px-4 py-3 text-left bg-white border border-gray-300 rounded-lg shadow-sm hover:border-emerald-400 focus:outline-none focus:ring-2 focus:ring-emerald-500 transition-all"
      >
        {selected.length > 0 ? (
          <span>
            <span className="font-semibold text-emerald-600">
              {selected.length}
            </span>{" "}
            countries selected
          </span>
        ) : (
          <span className="text-gray-400">Choose countries...</span>
        )}
        <span className="float-right text-gray-400">&#x25BE;</span>
      </button>

      {/* Selected chips */}
      {selected.length > 0 && (
        <div className="flex flex-wrap gap-1 mt-2">
          {selected.map((code) => {
            const country = COUNTRIES.find((c) => c.code === code);
            return (
              <span
                key={code}
                className="inline-flex items-center gap-1 px-2 py-0.5 bg-emerald-100 text-emerald-700 rounded-full text-xs cursor-pointer hover:bg-emerald-200"
                onClick={() => toggleCountry(code)}
              >
                {country?.flag} {code.toUpperCase()} &times;
              </span>
            );
          })}
          <button
            onClick={() => onChange([])}
            className="px-2 py-0.5 text-xs text-red-500 hover:text-red-700"
          >
            Clear all
          </button>
        </div>
      )}

      {open && (
        <div className="absolute z-50 w-full mt-1 bg-white border border-gray-200 rounded-lg shadow-xl max-h-[500px] overflow-hidden">
          {/* Preset groups */}
          <div className="p-3 border-b bg-gray-50">
            <div className="text-xs font-medium text-gray-500 mb-2">
              Quick Select
            </div>
            <div className="flex flex-wrap gap-1.5">
              {Object.entries(COUNTRY_GROUPS).map(([key, group]) => {
                const allSelected = group.codes.every((c) =>
                  selected.includes(c)
                );
                return (
                  <button
                    key={key}
                    onClick={() => toggleGroup(group.codes)}
                    className={`px-3 py-1.5 rounded-full text-xs font-medium transition-all ${
                      allSelected
                        ? "bg-emerald-600 text-white"
                        : "bg-white border border-gray-300 text-gray-600 hover:border-emerald-400"
                    }`}
                  >
                    {group.label}
                  </button>
                );
              })}
            </div>
          </div>

          {/* Search */}
          <div className="p-2 border-b">
            <input
              type="text"
              placeholder="Search country..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full px-3 py-2 border border-gray-200 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500"
              autoFocus
            />
          </div>

          {/* Country list */}
          <div className="overflow-y-auto max-h-60">
            {filtered.map((country) => (
              <button
                key={country.code}
                onClick={() => toggleCountry(country.code)}
                className={`w-full px-4 py-2 text-left text-sm flex items-center gap-2 hover:bg-emerald-50 transition-colors ${
                  selected.includes(country.code) ? "bg-emerald-50" : ""
                }`}
              >
                <span
                  className={`w-4 h-4 rounded border flex items-center justify-center text-xs ${
                    selected.includes(country.code)
                      ? "bg-emerald-600 border-emerald-600 text-white"
                      : "border-gray-300"
                  }`}
                >
                  {selected.includes(country.code) ? "\u2713" : ""}
                </span>
                <span>{country.flag}</span>
                <span>{country.name}</span>
                <span className="text-gray-400 ml-auto font-mono text-xs">
                  {country.code.toUpperCase()}
                </span>
              </button>
            ))}
          </div>

          {/* Footer */}
          <div className="p-2 border-t bg-gray-50 flex justify-between">
            <button
              onClick={() =>
                onChange(COUNTRIES.map((c) => c.code))
              }
              className="text-xs text-emerald-600 hover:underline"
            >
              Select All
            </button>
            <button
              onClick={() => onChange([])}
              className="text-xs text-red-500 hover:underline"
            >
              Clear All
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
