"use client";

import React from "react";
import { Shield, Search, ArrowRight } from "lucide-react";

export default function DoctorsHero() {
  return (
    <div className="relative w-full overflow-hidden bg-slate-900 shadow-xl" style={{ height: "450px" }}>
      
      {/* Background Image with Dark Gradient Overlay */}
      <div className="absolute inset-0 z-0">
        <div 
          className="absolute inset-0 bg-cover bg-center"
          style={{ backgroundImage: `url('https://images.unsplash.com/photo-1605684954998-685c79d6a018?q=80&w=1600&auto=format&fit=crop')` }}
        ></div>
        <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-black/30 to-transparent z-10"></div>
      </div>

      {/* Hero Content */}
      <div className="relative z-20 max-w-7xl mx-auto px-6 md:px-10 h-full flex items-center">
        <div className="w-full">
          {/* Top tag */}
          <div className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-md border border-white/20 text-white px-4 py-1.5 rounded-full text-xs font-medium mb-5">
            <Shield className="w-3.5 h-3.5 text-[#00A99D]" />
            Verified Professionals
          </div>
          
          {/* Title */}
          <h1 className="text-4xl lg:text-5xl font-bold text-white mb-4 tracking-tight leading-tight">
            Your Healing Starts Here,
            <br />
            <span className="text-[#00A99D]">Expert Medical Care</span>
          </h1>
          
          <p className="text-slate-100 text-sm lg:text-base mb-6 leading-relaxed max-w-xl">
            Match with leading specialists committed to compassionate, personalized medical care. Book appointments or consult online effortlessly.
          </p>
          
          {/* Buttons */}
          <div className="flex flex-wrap gap-3">
            <button className="h-11 px-6 rounded-lg bg-[#00A99D] text-white text-sm font-semibold hover:bg-[#009488] transition-all flex items-center gap-2 shadow-lg shadow-[#00A99D]/30">
              <Search className="w-4 h-4" />
              Find My Doctor
            </button>
            <button className="h-11 px-6 rounded-lg bg-white/10 backdrop-blur border border-white/20 text-white text-sm font-semibold hover:bg-white/20 transition-all flex items-center gap-2">
              Check Specializations
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}