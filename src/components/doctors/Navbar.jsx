"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import Image from "next/image";
import { useState } from "react";
import { Menu, X } from "lucide-react";

export default function Navbar() {
  const pathname = usePathname();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const navLinks = [
    { name: "Home", href: "/" },
    { name: "Doctors", href: "/doctors" },
    { name: "Services", href: "/services" },
    { name: "About", href: "/about" },
  ];

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const closeMenu = () => {
    setIsMenuOpen(false);
  };

  return (
    <header className="sticky top-0 z-50 bg-white/98 backdrop-blur-md border-b border-slate-100 shadow-md">
      <div className="max-w-7xl mx-auto h-16 flex items-center justify-between px-4 sm:px-6">

        {/* Logo */}
        <Link href="/" className="flex items-center" onClick={closeMenu}>
          <Image 
            src="/eAshalogo.png" 
            alt="eAshaop Logo" 
            width={48} 
            height={48}
            className="object-contain w-12 h-12 md:w-14 md:h-14 hover:scale-105 transition-transform duration-300"
            priority
          />
        </Link>

        {/* Desktop Navigation Links */}
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

        {/* Login Button & Mobile Menu Button */}
        <div className="flex items-center gap-2">
          <Link
            href="/login"
            className="h-9 md:h-10 px-4 md:px-6 rounded-lg md:rounded-xl bg-gradient-to-r from-[#00A99D] to-[#009488] text-white text-xs md:text-sm font-semibold hover:from-[#009488] hover:to-[#008070] transition-all duration-300 flex items-center justify-center shadow-md hover:shadow-lg"
            onClick={closeMenu}
          >
            Login
          </Link>
          
          {/* Mobile Menu Button */}
          <button 
            onClick={toggleMenu}
            className="md:hidden p-2 rounded-lg hover:bg-slate-100 transition"
          >
            {isMenuOpen ? (
              <X className="w-5 h-5 text-slate-600" />
            ) : (
              <Menu className="w-5 h-5 text-slate-600" />
            )}
          </button>
        </div>

      </div>

      {/* Mobile Menu Dropdown */}
      {isMenuOpen && (
        <div className="md:hidden bg-white border-t border-slate-100 shadow-lg animate-in slide-in-from-top-2 duration-200">
          <div className="flex flex-col py-3">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                onClick={closeMenu}
                className={`px-6 py-3 text-sm font-medium transition-all duration-200 ${
                  pathname === link.href
                    ? "text-[#00A99D] bg-[#00A99D]/10 font-semibold border-l-4 border-[#00A99D]"
                    : "text-slate-600 hover:text-[#00A99D] hover:bg-slate-50"
                }`}
              >
                {link.name}
              </Link>
            ))}
          </div>
        </div>
      )}
    </header>
  );
}