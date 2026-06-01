"use client";

import { Users, Award, Clock, Star, Calendar, Heart } from "lucide-react";

export default function AboutStats() {
  const stats = [
    { value: "10,000+", label: "Appointments Booked", icon: Calendar, color: "bg-blue-50", text: "text-blue-600" },
    { value: "500+", label: "Verified Doctors", icon: Users, color: "bg-green-50", text: "text-green-600" },
    { value: "24/7", label: "Emergency Support", icon: Clock, color: "bg-orange-50", text: "text-orange-600" },
    { value: "98%", label: "Patient Satisfaction", icon: Star, color: "bg-amber-50", text: "text-amber-600" },
  ];

  return (
    <div className="max-w-7xl mx-auto px-4 -mt-8">
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {stats.map((stat, idx) => (
          <div key={idx} className="bg-white rounded-xl p-4 text-center shadow-md border border-slate-100">
            <div className={`${stat.color} w-10 h-10 rounded-full flex items-center justify-center mx-auto mb-2`}>
              <stat.icon className={`w-5 h-5 ${stat.text}`} />
            </div>
            <p className="text-xl font-bold text-[#013A63]">{stat.value}</p>
            <p className="text-xs text-slate-500">{stat.label}</p>
          </div>
        ))}
      </div>
    </div>
  );
}