"use client";

import React from "react";
import { Shield, Video, Calendar, Clock, MessageCircle, Award, Users, TrendingUp } from "lucide-react";

export default function WhyChooseUs() {
  const features = [
    { icon: Shield, title: "Verified Doctors", desc: "100% verified professionals" },
    { icon: Video, title: "Video Consult", desc: "Connect from anywhere" },
    { icon: Calendar, title: "Easy Booking", desc: "Book in 2 minutes" },
    { icon: Clock, title: "24/7 Support", desc: "Emergency care anytime" },
    { icon: MessageCircle, title: "Chat Support", desc: "Get instant replies" },
    { icon: Award, title: "Top Rated", desc: "4.9★ patient rating" },
    { icon: Users, title: "Expert Team", desc: "250+ specialists" },
    { icon: TrendingUp, title: "98% Success", desc: "High satisfaction" },
  ];

  return (
    <section className="py-12 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
      {/* Header */}
      <div className="text-center mb-10">
        <div className="inline-flex items-center gap-2 bg-[#00A99D]/10 px-4 py-1.5 rounded-full mb-4">
          <span className="text-[#00A99D] text-xs font-semibold uppercase tracking-wide">Why Choose Us</span>
        </div>
        <h2 className="text-3xl md:text-4xl font-bold text-[#013A63] mb-3">Why Patients Trust eAshaop</h2>
        <p className="text-slate-500 text-sm max-w-2xl mx-auto">Quality healthcare with compassion and cutting-edge technology</p>
      </div>
      
      {/* 8 Cards Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
        {features.map((feature, idx) => (
          <div 
            key={idx} 
            className="group bg-white rounded-xl p-4 text-center shadow-sm hover:shadow-lg transition-all duration-300 border border-slate-100 hover:border-[#00A99D]/30 hover:-translate-y-1 cursor-pointer"
          >
            {/* Icon Container */}
            <div className="w-12 h-12 mx-auto rounded-xl bg-[#00A99D]/10 flex items-center justify-center mb-3 group-hover:bg-[#00A99D] transition-colors duration-300">
              <feature.icon className="w-5 h-5 text-[#00A99D] group-hover:text-white transition-colors duration-300" />
            </div>
            
            <h3 className="font-bold text-[#013A63] text-base mb-1">{feature.title}</h3>
            <p className="text-xs text-slate-500">{feature.desc}</p>
          </div>
        ))}
      </div>
    </section>
  );
}