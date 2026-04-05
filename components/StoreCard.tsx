"use client";

import { useState } from "react";
import { StoreData } from "@/lib/types";

interface Props {
  data: StoreData;
}

export default function StoreCard({ data }: Props) {
  const [showFullDesc, setShowFullDesc] = useState(false);
  const [selectedScreenshot, setSelectedScreenshot] = useState<string | null>(null);

  const stars = "★".repeat(Math.round(data.score)) + "☆".repeat(5 - Math.round(data.score));

  return (
    <>
      <div className="bg-white rounded-xl border border-gray-200 shadow-sm hover:shadow-md transition-shadow overflow-hidden">
        {/* Header */}
        <div className="bg-gradient-to-r from-blue-50 to-indigo-50 px-4 py-2.5 border-b flex items-center gap-2">
          <span className="text-xl">{data.flag}</span>
          <span className="font-semibold text-sm text-gray-800">
            {data.countryName}
          </span>
          <span className="ml-auto text-xs font-mono text-gray-400 bg-white px-2 py-0.5 rounded">
            {data.country.toUpperCase()}
          </span>
        </div>

        {/* App info */}
        <div className="p-4">
          <div className="flex gap-3 mb-3">
            {data.icon && (
              <img
                src={data.icon}
                alt={data.title}
                className="w-16 h-16 rounded-xl shadow-sm flex-shrink-0"
              />
            )}
            <div className="min-w-0 flex-1">
              <h3 className="font-semibold text-sm text-gray-900 truncate">
                {data.title}
              </h3>
              <div className="flex items-center gap-1 mt-1">
                <span className="text-yellow-500 text-xs">{stars}</span>
                <span className="text-xs text-gray-500">
                  {data.score.toFixed(1)}
                </span>
              </div>
              <div className="text-xs text-gray-400 mt-0.5">
                {data.ratings.toLocaleString()} ratings · {data.installs} installs
              </div>
            </div>
          </div>

          {/* Summary */}
          {data.summary && (
            <div className="mb-3 p-2 bg-gray-50 rounded-lg">
              <div className="text-xs font-medium text-gray-500 mb-1">
                Short Description
              </div>
              <p className="text-xs text-gray-700">{data.summary}</p>
            </div>
          )}

          {/* Screenshots */}
          {data.screenshots.length > 0 && (
            <div className="mb-3">
              <div className="text-xs font-medium text-gray-500 mb-1.5">
                Screenshots ({data.screenshots.length})
              </div>
              <div className="flex gap-2 overflow-x-auto pb-2 scrollbar-thin">
                {data.screenshots.map((url, i) => (
                  <img
                    key={i}
                    src={url}
                    alt={`Screenshot ${i + 1}`}
                    className="h-36 rounded-lg shadow-sm flex-shrink-0 cursor-pointer hover:opacity-80 transition-opacity"
                    onClick={() => setSelectedScreenshot(url)}
                  />
                ))}
              </div>
            </div>
          )}

          {/* Description */}
          <div className="mb-3">
            <div className="text-xs font-medium text-gray-500 mb-1">
              Description
            </div>
            <p className={`text-xs text-gray-600 ${!showFullDesc ? "line-clamp-3" : ""}`}>
              {data.description}
            </p>
            {data.description.length > 150 && (
              <button
                onClick={() => setShowFullDesc(!showFullDesc)}
                className="text-xs text-blue-600 hover:underline mt-1"
              >
                {showFullDesc ? "Show less" : "Show more"}
              </button>
            )}
          </div>

          {/* Metadata */}
          <div className="grid grid-cols-2 gap-1.5 text-xs">
            <div className="flex justify-between bg-gray-50 px-2 py-1 rounded">
              <span className="text-gray-500">Price</span>
              <span className="font-medium">{data.free ? "Free" : data.priceText}</span>
            </div>
            <div className="flex justify-between bg-gray-50 px-2 py-1 rounded">
              <span className="text-gray-500">Genre</span>
              <span className="font-medium truncate ml-2">{data.genre}</span>
            </div>
            <div className="flex justify-between bg-gray-50 px-2 py-1 rounded">
              <span className="text-gray-500">IAP</span>
              <span className="font-medium">{data.offersIAP ? "Yes" : "No"}</span>
            </div>
            <div className="flex justify-between bg-gray-50 px-2 py-1 rounded">
              <span className="text-gray-500">Ads</span>
              <span className="font-medium">{data.adSupported ? "Yes" : "No"}</span>
            </div>
            <div className="flex justify-between bg-gray-50 px-2 py-1 rounded">
              <span className="text-gray-500">Version</span>
              <span className="font-medium">{data.version || "N/A"}</span>
            </div>
            <div className="flex justify-between bg-gray-50 px-2 py-1 rounded">
              <span className="text-gray-500">Rating</span>
              <span className="font-medium">{data.contentRating || "N/A"}</span>
            </div>
          </div>

          {/* Play Store link */}
          <a
            href={`https://play.google.com/store/apps/details?id=${encodeURIComponent(data.title)}&gl=${data.country}&hl=${COUNTRIES_LANG[data.country] || "en"}`}
            target="_blank"
            rel="noopener noreferrer"
            className="mt-3 block text-center text-xs bg-green-50 text-green-700 py-1.5 rounded-lg hover:bg-green-100 transition-colors"
          >
            Open in Play Store →
          </a>
        </div>
      </div>

      {/* Screenshot modal */}
      {selectedScreenshot && (
        <div
          className="fixed inset-0 bg-black/70 z-50 flex items-center justify-center p-4"
          onClick={() => setSelectedScreenshot(null)}
        >
          <img
            src={selectedScreenshot}
            alt="Screenshot"
            className="max-h-[90vh] max-w-[90vw] rounded-lg shadow-2xl"
          />
        </div>
      )}
    </>
  );
}

const COUNTRIES_LANG: Record<string, string> = {
  us: "en", gb: "en", ca: "en", au: "en", nz: "en", ph: "en",
  jp: "ja", kr: "ko", de: "de", at: "de", fr: "fr", es: "es",
  mx: "es", ar: "es", co: "es", pe: "es", br: "pt", it: "it",
  ru: "ru", tr: "tr", vn: "vi", id: "id", in: "hi", hk: "zh",
  tw: "zh", ae: "ar", sa: "ar", eg: "ar", kw: "ar", ma: "ar",
  za: "af", bd: "bn",
};
