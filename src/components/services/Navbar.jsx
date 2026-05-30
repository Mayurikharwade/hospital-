"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import Image from "next/image";

export default function Navbar() {
  const pathname = usePathname();

  const navLinks = [
    { name: "Home", href: "/" },
    { name: "Doctors", href: "/doctors" },
    { name: "Services", href: "/services" },
    { name: "About", href: "/about" },
  ];

  return (
    <header className="sticky top-0 z-50 bg-white/98 backdrop-blur-md border-b border-slate-100 shadow-md">
      <div className="max-w-7xl mx-auto h-16 flex items-center justify-between px-4 sm:px-6">

        {/* Logo Only - No Box, Larger Size */}
        <Link href="/" className="flex items-center">
          <Image 
            src="/eAshalogo.png" 
            alt="eAshaop Logo" 
            width={48} 
            height={48}
            className="object-contain w-12 h-12 md:w-14 md:h-14 hover:scale-105 transition-transform duration-300"
            priority
          />
        </Link>

        {/* Navigation Links - Desktop */}
        <nav className="hidden md:flex items-center gap-1 lg:gap-2">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className={`px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200 ${
                pathname === link.href
                  ? "text-[#00A99D] bg-[#00A99D]/10 font-semibold"
                  : "text-slate-600 hover:text-[#00A99D] hover:bg-slate-50"
              }`}
            >
              {link.name}
            </Link>
          ))}
        </nav>

        {/* Login Button & Mobile Menu */}
        <div className="flex items-center gap-2">
          <Link
            href="/login"
            className="h-9 md:h-10 px-4 md:px-6 rounded-lg md:rounded-xl bg-gradient-to-r from-[#00A99D] to-[#009488] text-white text-xs md:text-sm font-semibold hover:from-[#009488] hover:to-[#008070] transition-all duration-300 flex items-center justify-center shadow-md hover:shadow-lg"
          >
            Login
          </Link>
          
          {/* Mobile Menu Button */}
          <button className="md:hidden p-2 rounded-lg hover:bg-slate-100 transition">
            <svg className="w-5 h-5 text-slate-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
            </svg>
          </button>
        </div>

      </div>
    </header>
  );
}