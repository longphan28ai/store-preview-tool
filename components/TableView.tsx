"use client";

import { useState } from "react";
import { StoreData } from "@/lib/types";

interface Props {
  data: StoreData[];
}

export default function TableView({ data }: Props) {
  const [expandedDesc, setExpandedDesc] = useState<string | null>(null);
  const [selectedScreenshot, setSelectedScreenshot] = useState<string | null>(null);

  if (data.length === 0) return null;

  return (
    <>
      <div className="overflow-x-auto rounded-xl border border-gray-200 shadow-sm">
        <table className="min-w-full text-xs">
          <thead>
            <tr className="bg-gray-50">
              <th className="sticky left-0 bg-gray-50 z-10 px-4 py-3 text-left font-semibold text-gray-600 border-r min-w-[140px]">
                Field
              </th>
              {data.map((item) => (
                <th
                  key={item.country}
                  className="px-4 py-3 text-center font-semibold text-gray-600 min-w-[220px] border-r last:border-r-0"
                >
                  <span className="text-lg mr-1">{item.flag}</span>
                  {item.countryName}
                  <br />
                  <span className="font-mono text-gray-400 text-[10px]">
                    {item.country.toUpperCase()}
                  </span>
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {/* Icon */}
            <tr className="border-t">
              <td className="sticky left-0 bg-white z-10 px-4 py-2 font-medium text-gray-600 border-r">
                Icon
              </td>
              {data.map((item) => (
                <td key={item.country} className="px-4 py-2 text-center border-r last:border-r-0">
                  {item.icon && (
                    <img src={item.icon} alt="" className="w-12 h-12 rounded-xl mx-auto shadow-sm" />
                  )}
                </td>
              ))}
            </tr>

            {/* Title */}
            <tr className="border-t bg-yellow-50/30">
              <td className="sticky left-0 bg-yellow-50/30 z-10 px-4 py-2 font-medium text-gray-600 border-r">
                Title
              </td>
              {data.map((item) => (
                <td key={item.country} className="px-4 py-2 font-medium text-gray-800 border-r last:border-r-0">
                  {item.title}
                </td>
              ))}
            </tr>

            {/* Rating */}
            <tr className="border-t">
              <td className="sticky left-0 bg-white z-10 px-4 py-2 font-medium text-gray-600 border-r">
                Rating
              </td>
              {data.map((item) => (
                <td key={item.country} className="px-4 py-2 text-center border-r last:border-r-0">
                  <span className="text-yellow-500">★</span> {item.score.toFixed(1)}
                  <span className="text-gray-400 ml-1">
                    ({item.ratings.toLocaleString()})
                  </span>
                </td>
              ))}
            </tr>

            {/* Installs */}
            <tr className="border-t">
              <td className="sticky left-0 bg-white z-10 px-4 py-2 font-medium text-gray-600 border-r">
                Installs
              </td>
              {data.map((item) => (
                <td key={item.country} className="px-4 py-2 text-center border-r last:border-r-0">
                  {item.installs}
                </td>
              ))}
            </tr>

            {/* Price */}
            <tr className="border-t">
              <td className="sticky left-0 bg-white z-10 px-4 py-2 font-medium text-gray-600 border-r">
                Price
              </td>
              {data.map((item) => (
                <td key={item.country} className="px-4 py-2 text-center border-r last:border-r-0">
                  <span className={item.free ? "text-green-600" : "text-orange-600"}>
                    {item.free ? "Free" : item.priceText}
                  </span>
                </td>
              ))}
            </tr>

            {/* Short Description */}
            <tr className="border-t bg-yellow-50/30">
              <td className="sticky left-0 bg-yellow-50/30 z-10 px-4 py-2 font-medium text-gray-600 border-r">
                Short Desc
              </td>
              {data.map((item) => (
                <td key={item.country} className="px-4 py-2 text-gray-700 border-r last:border-r-0 max-w-[250px]">
                  {item.summary}
                </td>
              ))}
            </tr>

            {/* Description */}
            <tr className="border-t">
              <td className="sticky left-0 bg-white z-10 px-4 py-2 font-medium text-gray-600 border-r">
                Description
              </td>
              {data.map((item) => (
                <td key={item.country} className="px-4 py-2 text-gray-600 border-r last:border-r-0 max-w-[250px]">
                  <div className={expandedDesc === item.country ? "" : "line-clamp-4"}>
                    {item.description}
                  </div>
                  <button
                    onClick={() =>
                      setExpandedDesc(expandedDesc === item.country ? null : item.country)
                    }
                    className="text-blue-600 hover:underline mt-1"
                  >
                    {expandedDesc === item.country ? "Less" : "More"}
                  </button>
                </td>
              ))}
            </tr>

            {/* Screenshots */}
            <tr className="border-t">
              <td className="sticky left-0 bg-white z-10 px-4 py-2 font-medium text-gray-600 border-r">
                Screenshots
              </td>
              {data.map((item) => (
                <td key={item.country} className="px-4 py-2 border-r last:border-r-0">
                  <div className="flex gap-1 overflow-x-auto pb-1">
                    {item.screenshots.slice(0, 4).map((url, i) => (
                      <img
                        key={i}
                        src={url}
                        alt=""
                        className="h-24 rounded cursor-pointer hover:opacity-80"
                        onClick={() => setSelectedScreenshot(url)}
                      />
                    ))}
                    {item.screenshots.length > 4 && (
                      <span className="text-gray-400 self-center ml-1">
                        +{item.screenshots.length - 4}
                      </span>
                    )}
                  </div>
                </td>
              ))}
            </tr>

            {/* Genre */}
            <tr className="border-t">
              <td className="sticky left-0 bg-white z-10 px-4 py-2 font-medium text-gray-600 border-r">
                Genre
              </td>
              {data.map((item) => (
                <td key={item.country} className="px-4 py-2 text-center border-r last:border-r-0">
                  {item.genre}
                </td>
              ))}
            </tr>

            {/* IAP / Ads */}
            <tr className="border-t">
              <td className="sticky left-0 bg-white z-10 px-4 py-2 font-medium text-gray-600 border-r">
                IAP / Ads
              </td>
              {data.map((item) => (
                <td key={item.country} className="px-4 py-2 text-center border-r last:border-r-0">
                  IAP: {item.offersIAP ? "✅" : "❌"} | Ads: {item.adSupported ? "✅" : "❌"}
                </td>
              ))}
            </tr>

            {/* Version */}
            <tr className="border-t">
              <td className="sticky left-0 bg-white z-10 px-4 py-2 font-medium text-gray-600 border-r">
                Version
              </td>
              {data.map((item) => (
                <td key={item.country} className="px-4 py-2 text-center border-r last:border-r-0">
                  {item.version || "N/A"}
                </td>
              ))}
            </tr>

            {/* Content Rating */}
            <tr className="border-t">
              <td className="sticky left-0 bg-white z-10 px-4 py-2 font-medium text-gray-600 border-r">
                Content Rating
              </td>
              {data.map((item) => (
                <td key={item.country} className="px-4 py-2 text-center border-r last:border-r-0">
                  {item.contentRating || "N/A"}
                </td>
              ))}
            </tr>
          </tbody>
        </table>
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
