"use client";

import { Mail, Phone, MapPin, ChevronRight } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

export default function Footer() {
  return (
    <footer className="relative bg-gradient-to-r from-[#013A63] to-[#00A99D] text-white overflow-hidden mt-10">
      
      {/* Subtle Background Glow/Decoration */}
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none">
        <div className="absolute -top-[20%] -right-[10%] w-[50%] h-[150%] bg-white/10 blur-3xl transform rotate-12 rounded-full"></div>
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-6 pt-16 pb-6">
        
        {/* --- MAIN FOOTER CONTENT --- */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 lg:gap-8 mb-12">
          
          {/* Logo & About */}
          <div>
            <div className="flex items-center gap-3 mb-6">
              <div className="w-12 h-12 bg-white rounded-xl flex items-center justify-center shadow-lg p-1.5 overflow-hidden">
                <Image 
                  src="/eAshalogo.png" 
                  alt="eAshaop Logo" 
                  width={40}
                  height={40}
                  className="w-full h-full object-contain"
                />
              </div>
              <h2 className="text-3xl font-bold text-white tracking-wide">eAshaop</h2>
            </div>
            <p className="text-white/80 text-sm leading-relaxed mb-6">
              Your trusted healthcare partner. We provide quality medical care with compassion, modern technology, and unmatched expertise.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-lg font-semibold mb-6 text-white flex items-center gap-2">
              <span className="w-1 h-5 bg-white rounded-full"></span> Quick Links
            </h3>
            <ul className="space-y-3 text-white/80 text-sm">
              {[
                { name: 'Home', href: '/' },
                { name: 'Doctors', href: '/doctors' },
                { name: 'Services', href: '/services' },
                { name: 'About Us', href: '/about' },
                { name: 'Contact', href: '/about#contact' }
              ].map((item) => (
                <li key={item.name}>
                  <Link href={item.href} className="group flex items-center hover:text-[#4ce0d7] transition-colors duration-300">
                    <ChevronRight className="w-4 h-4 opacity-0 -ml-4 group-hover:opacity-100 group-hover:ml-0 transition-all duration-300 text-[#4ce0d7]" />
                    <span className="group-hover:translate-x-1 transition-transform duration-300">{item.name}</span>
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Our Services */}
          <div>
            <h3 className="text-lg font-semibold mb-6 text-white flex items-center gap-2">
              <span className="w-1 h-5 bg-white rounded-full"></span> Our Services
            </h3>
            <ul className="space-y-3 text-white/80 text-sm">
              {[
                { name: 'Emergency Care', href: '/services#emergency' },
                { name: 'OPD Services', href: '/services#opd' },
                { name: 'Pharmacy', href: '/services#pharmacy' },
                { name: 'Lab Tests', href: '/services#lab-tests' },
                { name: 'Health Checkup', href: '/services#health-checkup' }
              ].map((item) => (
                <li key={item.name}>
                  <Link href={item.href} className="group flex items-center hover:text-[#4ce0d7] transition-colors duration-300">
                    <ChevronRight className="w-4 h-4 opacity-0 -ml-4 group-hover:opacity-100 group-hover:ml-0 transition-all duration-300 text-[#4ce0d7]" />
                    <span className="group-hover:translate-x-1 transition-transform duration-300">{item.name}</span>
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h3 className="text-lg font-semibold mb-6 text-white flex items-center gap-2">
              <span className="w-1 h-5 bg-white rounded-full"></span> Get in Touch
            </h3>
            <ul className="space-y-4 text-white/80 text-sm">
              <li className="flex items-start gap-3 group">
                <div className="p-2 bg-white rounded-lg shadow-sm group-hover:scale-110 transition-transform">
                  <MapPin className="w-4 h-4 text-[#00A99D]" />
                </div>
                <span className="mt-1">Hyderabad, Telangana, India</span>
              </li>
              <li className="flex items-center gap-3 group">
                <div className="p-2 bg-white rounded-lg shadow-sm group-hover:scale-110 transition-transform">
                  <Phone className="w-4 h-4 text-[#00A99D]" />
                </div>
                <span>+91 98765 43210</span>
              </li>
              <li className="flex items-center gap-3 group">
                <div className="p-2 bg-white rounded-lg shadow-sm group-hover:scale-110 transition-transform">
                  <Mail className="w-4 h-4 text-[#00A99D]" />
                </div>
                <span>support@eashaop.com</span>
              </li>
            </ul>
          </div>

        </div>
      </div>

      {/* --- BOTTOM BAR --- */}
      <div className="border-t border-white/20 bg-black/10">
        <div className="max-w-7xl mx-auto px-6 py-3 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-white/70 text-sm font-medium">
            © 2026 eAshaop Healthcare. All rights reserved.
          </p>
          <div className="flex flex-wrap gap-2 md:gap-4 text-white/80 text-sm font-medium">
            <Link href="/privacy" className="px-4 py-2 rounded-full hover:bg-[#00A99D] hover:text-white transition-all">Privacy Policy</Link>
            <Link href="/terms" className="px-4 py-2 rounded-full hover:bg-[#00A99D] hover:text-white transition-all">Terms of Service</Link>
            <Link href="/sitemap" className="px-4 py-2 rounded-full hover:bg-[#00A99D] hover:text-white transition-all">Sitemap</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}