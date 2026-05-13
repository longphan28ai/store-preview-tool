"use client";

import { usePathname } from "next/navigation";
import Sidebar from "./Sidebar";
import Topbar from "./Topbar";

export default function V2Shell({ children }: { children: React.ReactNode }) {
  const path = usePathname();
  const isAuth = path?.startsWith("/v2/login");

  if (isAuth) {
    return <div className="dark min-h-screen bg-slate-950 text-slate-100 font-sans">{children}</div>;
  }

  return (
    <div className="dark min-h-screen bg-slate-950 text-slate-100 font-sans">
      <div className="flex min-h-screen">
        <Sidebar />
        <div className="flex-1 flex flex-col min-w-0">
          <Topbar />
          <main className="flex-1 overflow-x-hidden">{children}</main>
        </div>
      </div>
    </div>
  );
}
