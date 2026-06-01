"use client";

import { Heart, Calendar, Phone } from "lucide-react";
import Link from "next/link";

export default function AboutHero() {
  return (
    <div className="bg-gradient-to-r from-[#013A63] to-[#00A99D] py-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <div className="inline-flex items-center gap-2 bg-white/20 backdrop-blur-sm rounded-full px-4 py-1.5 mb-4">
          <Heart className="w-4 h-4 text-white" />
          <span className="text-xs font-medium text-white">About eAshaop</span>
        </div>
        <h1 className="text-3xl md:text-4xl font-bold text-white mb-3">
          Your Health, <span className="text-[#00A99D]">Our Mission</span>
        </h1>
        <p className="text-white/80 text-sm max-w-2xl mx-auto mb-6">
          We&apos;re a digital-first healthcare platform offering seamless doctor appointments, teleconsultations, and doorstep medicine delivery.
        </p>
        <div className="flex flex-wrap gap-3 justify-center">
          <Link href="/login" className="px-5 py-2 bg-white text-[#00A99D] rounded-lg text-sm font-semibold flex items-center gap-2 hover:shadow-lg transition">
            <Calendar className="w-4 h-4" /> Book Appointment
          </Link>
          <Link href="/login" className="px-5 py-2 bg-white/20 backdrop-blur border border-white/30 text-white rounded-lg text-sm font-semibold flex items-center gap-2 hover:bg-white/30 transition">
            <Phone className="w-4 h-4" /> Contact Us
          </Link>
        </div>
      </div>
    </div>
  );
}