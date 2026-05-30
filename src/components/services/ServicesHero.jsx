"use client";

import { Star, Shield, Phone, Calendar } from "lucide-react";

export default function ServicesHero() {
  return (
    <div className="bg-gradient-to-r from-[#013A63] to-[#00A99D] py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <div className="inline-flex items-center gap-2 bg-white/20 backdrop-blur-sm rounded-full px-4 py-1.5 mb-4">
          <Shield className="w-4 h-4 text-white" />
          <span className="text-xs font-medium text-white">Our Services</span>
        </div>
        <h1 className="text-3xl md:text-4xl font-bold text-white mb-3">
          Comprehensive <span className="text-[#00A99D]">Healthcare</span> Services
        </h1>
        <p className="text-white/80 text-sm max-w-2xl mx-auto mb-6">
          We provide complete healthcare solutions with advanced technology and compassionate care
        </p>
        
        <div className="flex flex-wrap gap-3 justify-center mb-8">
          <button className="px-5 py-2 bg-white text-[#00A99D] rounded-lg text-sm font-semibold hover:shadow-lg transition flex items-center gap-2">
            <Calendar className="w-4 h-4" /> Book Appointment
          </button>
          <button className="px-5 py-2 bg-white/20 backdrop-blur border border-white/30 text-white rounded-lg text-sm font-semibold hover:bg-white/30 transition flex items-center gap-2">
            <Phone className="w-4 h-4" /> Call Specialist
          </button>
        </div>
        
        <div className="flex flex-wrap justify-center gap-6 pt-4 border-t border-white/20">
          <div><p className="text-2xl font-bold text-white">120+</p><p className="text-xs text-white/70">Expert Doctors</p></div>
          <div><p className="text-2xl font-bold text-white">24/7</p><p className="text-xs text-white/70">Emergency Care</p></div>
          <div><p className="text-2xl font-bold text-white">18+</p><p className="text-xs text-white/70">Years Exp.</p></div>
          <div className="flex items-center gap-1"><Star className="w-4 h-4 fill-yellow-400 text-yellow-400" /><span className="text-white font-semibold">4.8</span><span className="text-xs text-white/70">(1,400+ reviews)</span></div>
        </div>
      </div>
    </div>
  );
}