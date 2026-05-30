"use client";

import { Calendar, Phone, Clock, Users, Star, Award, Shield, Video } from "lucide-react";
import Link from "next/link";

export default function HealthCheckup() {
  const serviceHighlights = [
    { icon: Clock, title: "Quick Booking", desc: "Book appointment in 2 minutes", color: "text-blue-600", bg: "bg-blue-50" },
    { icon: Users, title: "Expert Team", desc: "250+ experienced doctors", color: "text-green-600", bg: "bg-green-50" },
    { icon: Award, title: "Quality Care", desc: "98% patient satisfaction", color: "text-amber-600", bg: "bg-amber-50" },
    { icon: Shield, title: "Safe & Secure", desc: "100% verified professionals", color: "text-purple-600", bg: "bg-purple-50" },
    { icon: Video, title: "Video Consult", desc: "Connect from anywhere", color: "text-teal-600", bg: "bg-teal-50" },
    { icon: Star, title: "Top Rated", desc: "4.9★ patient rating", color: "text-rose-600", bg: "bg-rose-50" },
  ];

  return (
    <div className="py-8">
      <div className="text-center mb-6">
        <div className="inline-flex items-center gap-2 bg-[#00A99D]/10 px-4 py-1.5 rounded-full mb-3">
          <span className="text-[#00A99D] text-xs font-semibold">Why Choose Us</span>
        </div>
        <h3 className="text-xl font-bold text-[#013A63]">Why Patients Trust eAshaop</h3>
        <p className="text-slate-500 text-sm">We provide quality healthcare with compassion and expertise</p>
      </div>
      
      <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
        {serviceHighlights.map((item, idx) => (
          <div key={idx} className={`${item.bg} rounded-xl p-4 text-center border border-slate-100 hover:shadow-md transition`}>
            <item.icon className={`w-6 h-6 ${item.color} mx-auto mb-2`} />
            <h4 className="font-semibold text-slate-700 text-sm">{item.title}</h4>
            <p className="text-xs text-slate-500 mt-1">{item.desc}</p>
          </div>
        ))}
      </div>
      
      <div className="mt-6 text-center">
        <Link href="/doctors" className="inline-flex items-center gap-2 px-5 py-2 bg-[#00A99D] text-white rounded-lg text-sm font-semibold hover:bg-[#009488] transition">
          <Calendar className="w-4 h-4" /> Book Your Appointment
        </Link>
      </div>
    </div>
  );
}