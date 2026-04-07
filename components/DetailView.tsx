"use client";

import { useState } from "react";
import { StoreData } from "@/lib/types";

interface Props {
  data: StoreData[];
}

export default function DetailView({ data }: Props) {
  const [selectedImage, setSelectedImage] = useState<string | null>(null);

  if (data.length === 0) return null;

  return (
    <>
      <div className="space-y-8">
        {data.map((item) => (
          <div
            key={item.country}
            className="bg-white rounded-xl border border-gray-200 shadow-sm overflow-hidden"
          >
            {/* Country header */}
            <div className="bg-gradient-to-r from-purple-50 to-indigo-50 px-6 py-4 border-b flex items-center gap-3">
              <span className="text-2xl">{item.flag}</span>
              <div>
                <h3 className="font-semibold text-gray-900">
                  {item.countryName}
                </h3>
                <span className="text-xs font-mono text-gray-400">
                  {item.country.toUpperCase()}
                </span>
              </div>
              <div className="ml-auto flex items-center gap-4 text-sm text-gray-500">
                <span>
                  <span className="text-yellow-500">★</span> {item.score.toFixed(1)}
                </span>
                <span>{item.installs} installs</span>
                <span>{item.screenshots.length} screenshots</span>
              </div>
            </div>

            {/* App title & short description */}
            <div className="px-6 py-3 border-b bg-gray-50">
              <div className="flex items-center gap-3">
                {item.icon && (
                  <img
                    src={item.icon}
                    alt={item.title}
                    className="w-10 h-10 rounded-lg shadow-sm"
                  />
                )}
                <div>
                  <h4 className="font-medium text-sm text-gray-900">
                    {item.title}
                  </h4>
                  {item.summary && (
                    <p className="text-xs text-gray-500 mt-0.5">{item.summary}</p>
                  )}
                </div>
              </div>
            </div>

            {/* Screenshots grid - full size */}
            {item.screenshots.length > 0 ? (
              <div className="p-6">
                <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-3">
                  {item.screenshots.map((url, i) => (
                    <div
                      key={i}
                      className="relative group cursor-pointer"
                      onClick={() => setSelectedImage(url)}
                    >
                      <img
                        src={url}
                        alt={`${item.countryName} - Screenshot ${i + 1}`}
                        className="w-full rounded-lg shadow-sm border border-gray-100 hover:shadow-md hover:border-blue-300 transition-all"
                      />
                      <div className="absolute top-1.5 left-1.5 bg-black/60 text-white text-[10px] font-mono px-1.5 py-0.5 rounded opacity-0 group-hover:opacity-100 transition-opacity">
                        SS{i + 1}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            ) : (
              <div className="p-6 text-center text-sm text-gray-400">
                No screenshots available for this market
              </div>
            )}
          </div>
        ))}
      </div>

      {/* Lightbox modal */}
      {selectedImage && (
        <div
          className="fixed inset-0 bg-black/80 z-50 flex items-center justify-center p-4"
          onClick={() => setSelectedImage(null)}
        >
          <img
            src={selectedImage}
            alt="Screenshot"
            className="max-h-[90vh] max-w-[90vw] rounded-lg shadow-2xl"
          />
          <button
            onClick={() => setSelectedImage(null)}
            className="absolute top-4 right-4 text-white/70 hover:text-white text-3xl"
          >
            &times;
          </button>
        </div>
      )}
    </>
  );
}
