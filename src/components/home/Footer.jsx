"use client";

import { Heart, Mail, Phone, MapPin } from "lucide-react";

export default function Footer() {
  return (
    <footer className="bg-[#013A63] text-white">
      <div className="max-w-7xl mx-auto px-6 py-14">
        <div className="grid md:grid-cols-4 gap-10">

          {/* Logo & About */}
          <div>
            <div className="flex items-center gap-2 mb-4">
              <div className="w-10 h-10 bg-[#00A99D] rounded-xl flex items-center justify-center">
                <Heart className="w-5 h-5" />
              </div>
              <h2 className="text-2xl font-bold">eAshaop</h2>
            </div>
            <p className="text-white/70 text-sm leading-relaxed">
              Your trusted healthcare partner. We provide quality medical care with compassion and expertise.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Quick Links</h3>
            <ul className="space-y-2 text-white/70 text-sm">
              <li><a href="#" className="hover:text-[#00A99D] transition">Home</a></li>
              <li><a href="#" className="hover:text-[#00A99D] transition">Doctors</a></li>
              <li><a href="#" className="hover:text-[#00A99D] transition">Services</a></li>
              <li><a href="#" className="hover:text-[#00A99D] transition">About Us</a></li>
              <li><a href="#" className="hover:text-[#00A99D] transition">Contact</a></li>
            </ul>
          </div>

          {/* Services */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Our Services</h3>
            <ul className="space-y-2 text-white/70 text-sm">
              <li><a href="#" className="hover:text-[#00A99D] transition">Emergency Care</a></li>
              <li><a href="#" className="hover:text-[#00A99D] transition">OPD Services</a></li>
              <li><a href="#" className="hover:text-[#00A99D] transition">Pharmacy</a></li>
              <li><a href="#" className="hover:text-[#00A99D] transition">Lab Tests</a></li>
              <li><a href="#" className="hover:text-[#00A99D] transition">Health Checkup</a></li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Get in Touch</h3>
            <ul className="space-y-3 text-white/70 text-sm">
              <li className="flex items-start gap-3">
                <MapPin className="w-4 h-4 mt-0.5 text-[#00A99D]" />
                <span>Hyderabad, Telangana, India</span>
              </li>
              <li className="flex items-center gap-3">
                <Phone className="w-4 h-4 text-[#00A99D]" />
                <span>+91 98765 43210</span>
              </li>
              <li className="flex items-center gap-3">
                <Mail className="w-4 h-4 text-[#00A99D]" />
                <span>support@eashaop.com</span>
              </li>
            </ul>
          </div>

        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-white/10">
        <div className="max-w-7xl mx-auto px-6 py-6 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-white/60 text-sm">
            © 2026 eAshaop Healthcare. All rights reserved.
          </p>
          <div className="flex gap-6 text-white/60 text-sm">
            <a href="#" className="hover:text-[#00A99D] transition">Privacy Policy</a>
            <a href="#" className="hover:text-[#00A99D] transition">Terms of Service</a>
            <a href="#" className="hover:text-[#00A99D] transition">Sitemap</a>
          </div>
        </div>
      </div>
    </footer>
  );
}