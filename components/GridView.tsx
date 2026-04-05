"use client";

import { StoreData } from "@/lib/types";
import StoreCard from "./StoreCard";

interface Props {
  data: StoreData[];
}

export default function GridView({ data }: Props) {
  if (data.length === 0) return null;

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
      {data.map((item) => (
        <StoreCard key={item.country} data={item} />
      ))}
    </div>
  );
}
