"use client";

import { usePathname } from "next/navigation";

import {
  Menu,
  Bell,
  Search,
} from "lucide-react";

export default function Header({
  onToggleSidebar,
}) {

  const pathname = usePathname();

  return (

    <header className="h-16 border-b border-slate-200 bg-white flex items-center justify-between px-6 sticky top-0 z-20">

      <div className="flex items-center gap-4">

        <button
          onClick={onToggleSidebar}
          className="w-10 h-10 rounded-xl flex items-center justify-center hover:bg-slate-100 transition"
        >

          <Menu className="w-5 h-5 text-slate-700" />

        </button>

        <div>

          <h1 className="text-xl font-bold text-[#013A63] capitalize">

            {pathname
              .split("/")
              .pop()
              ?.replace("-", " ") ||
              "Dashboard"}

          </h1>

          <p className="text-sm text-slate-500">

            Welcome back 👋

          </p>

        </div>

      </div>

      <div className="flex items-center gap-3">

        <div className="hidden md:flex items-center gap-2 bg-slate-100 rounded-xl px-4 h-11 w-[260px]">

          <Search className="w-4 h-4 text-slate-400" />

          <input
            type="text"
            placeholder="Search..."
            className="bg-transparent outline-none text-sm flex-1"
          />

        </div>

        <button className="w-11 h-11 rounded-xl bg-slate-100 flex items-center justify-center hover:bg-slate-200 transition">

          <Bell className="w-5 h-5 text-slate-700" />

        </button>

        <div className="w-11 h-11 rounded-full bg-gradient-to-br from-[#00A99D] to-[#013A63] flex items-center justify-center text-white font-semibold">

          A

        </div>

      </div>

    </header>

  );

}