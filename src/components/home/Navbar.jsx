"use client";

import Link from "next/link";

export default function Navbar() {
  return (
    <header className="sticky top-0 z-50 bg-white border-b border-slate-200">
      <div className="max-w-7xl mx-auto h-16 flex items-center justify-between px-6">

        <h1 className="text-2xl font-bold text-[#013A63]">
          eAshaop
        </h1>

        <nav className="hidden md:flex items-center gap-8 text-sm font-medium text-slate-600">
          <a href="#">Home</a>
          <a href="#">Doctors</a>
          <a href="#">Services</a>
          <a href="#">About</a>
        </nav>

        <Link
          href="/login"
          className="h-11 px-6 rounded-xl bg-[#00A99D] text-white flex items-center justify-center text-sm font-semibold hover:bg-[#009488] transition"
        >
          Login
        </Link>

      </div>
    </header>
  );
}