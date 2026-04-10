"use client";

import { useState } from "react";
import { IconSearch } from "./Icons";

interface CompetitorApp {
  packageId: string;
  name: string;
}

interface Props {
  onSelect: (app: CompetitorApp) => void;
}

function extractPackageId(input: string): string | null {
  // Handle full Play Store URL
  const urlMatch = input.match(/[?&]id=([a-zA-Z0-9._]+)/);
  if (urlMatch) return urlMatch[1];

  // Handle package ID directly (e.g., com.example.app)
  const pkgMatch = input.match(/^[a-zA-Z][a-zA-Z0-9._]*\.[a-zA-Z0-9._]+$/);
  if (pkgMatch) return pkgMatch[0];

  return null;
}

export default function CompetitorInput({ onSelect }: Props) {
  const [url, setUrl] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = () => {
    setError("");
    const packageId = extractPackageId(url.trim());
    if (!packageId) {
      setError("Invalid URL or package ID. Paste a Play Store link or package ID (e.g., com.example.app)");
      return;
    }
    onSelect({ packageId, name: packageId });
    setUrl("");
  };

  return (
    <div className="w-full">
      <label className="block text-sm font-medium text-gray-700 mb-1 flex items-center gap-1.5">
        <IconSearch className="w-4 h-4 text-emerald-600" />
        Competitor Lookup
      </label>
      <div className="flex gap-2">
        <input
          type="text"
          value={url}
          onChange={(e) => {
            setUrl(e.target.value);
            setError("");
          }}
          onKeyDown={(e) => {
            if (e.key === "Enter") handleSubmit();
          }}
          placeholder="Paste Play Store link or package ID..."
          className="flex-1 px-4 py-3 bg-white border border-gray-300 rounded-lg shadow-sm hover:border-teal-400 focus:outline-none focus:ring-2 focus:ring-teal-500 transition-all text-sm"
        />
        <button
          onClick={handleSubmit}
          disabled={!url.trim()}
          className="px-4 py-3 bg-teal-500 text-white rounded-lg font-medium hover:bg-teal-600 disabled:bg-gray-300 disabled:cursor-not-allowed transition-colors shadow-sm text-sm whitespace-nowrap"
        >
          Use
        </button>
      </div>
      {error && (
        <p className="text-xs text-red-500 mt-1">{error}</p>
      )}
    </div>
  );
}
