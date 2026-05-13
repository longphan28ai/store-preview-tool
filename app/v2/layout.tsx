import type { Metadata } from "next";
import V2Shell from "./_components/V2Shell";

export const metadata: Metadata = {
  title: "Store Preview v2 — Apero UA",
};

export default function V2Layout({ children }: { children: React.ReactNode }) {
  return <V2Shell>{children}</V2Shell>;
}
