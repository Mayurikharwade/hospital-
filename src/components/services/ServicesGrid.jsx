"use client";

import { HeartPulse, Brain, Bone, Baby, Sparkles, Heart, Stethoscope, Ambulance, Users, Clock } from "lucide-react";

const servicesList = [
  { id: 1, title: "Cardiology", desc: "Expert heart care with advanced technology.", image: "https://images.unsplash.com/photo-1628177142898-93e46e462850?auto=format&fit=crop&w=600&q=80", icon: HeartPulse, features: ["ECG/Echo", "Stress Test"], patients: "10k+", exp: "15+ yrs" },
  { id: 2, title: "Neurology", desc: "Advanced brain and spine care.", image: "https://images.unsplash.com/photo-1559757175-5700dde675bc?auto=format&fit=crop&w=600&q=80", icon: Brain, features: ["Stroke Care", "Epilepsy"], patients: "8.5k+", exp: "12+ yrs" },
  { id: 3, title: "Orthopedics", desc: "Specialized bone and joint care.", image: "https://images.unsplash.com/photo-1583324113626-70df0f4deaab?auto=format&fit=crop&w=600&q=80", icon: Bone, features: ["Joint Repair", "Sports Med"], patients: "12k+", exp: "18+ yrs" },
  { id: 4, title: "Pediatrics", desc: "Complete child healthcare.", image: "https://images.unsplash.com/photo-1527613426441-4da17471b66d?auto=format&fit=crop&w=600&q=80", icon: Baby, features: ["Newborns", "Vaccines"], patients: "15k+", exp: "10+ yrs" },
  { id: 5, title: "Dermatology", desc: "Advanced skin and hair care.", image: "https://images.unsplash.com/photo-1612349317150-e413f6a5b16d?auto=format&fit=crop&w=600&q=80", icon: Sparkles, features: ["Laser", "Acne Care"], patients: "7.2k+", exp: "8+ yrs" },
  { id: 6, title: "Gynecology", desc: "Complete women's health services.", image: "https://images.unsplash.com/photo-1579684385127-1ef15d508118?auto=format&fit=crop&w=600&q=80", icon: Heart, features: ["Pregnancy", "Fertility"], patients: "9k+", exp: "11+ yrs" },
  { id: 7, title: "General Medicine", desc: "Primary healthcare for all.", image: "https://images.unsplash.com/photo-1537368910025-702850d5367b?auto=format&fit=crop&w=600&q=80", icon: Stethoscope, features: ["Checkups", "Fevers"], patients: "20k+", exp: "14+ yrs" },
  { id: 8, title: "Emergency Care", desc: "24/7 emergency services.", image: "https://images.unsplash.com/photo-1587556610433-8a3f9e9be1b3?auto=format&fit=crop&w=600&q=80", icon: Ambulance, features: ["24/7 Care", "ICU Support"], patients: "5k+", exp: "20+ yrs" },
];

export default function ServicesGrid() {
  return (
    <div className="py-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
      {/* Header - Heading size kam kiya */}
      <div className="text-center mb-16">
        <div className="inline-flex items-center gap-2 bg-[#00A99D]/10 px-4 py-1.5 rounded-full mb-4 border border-[#00A99D]/20">
          <span className="text-[#00A99D] text-xs font-bold uppercase tracking-wider">Our Specialties</span>
        </div>
        <h2 className="text-2xl md:text-3xl font-bold text-[#013A63]">Medical Specializations</h2>
        <p className="text-slate-500 text-sm max-w-2xl mx-auto mt-2">Consult with experienced specialists across multiple departments</p>
      </div>
      
      {/* Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {servicesList.map((service) => (
          <div key={service.id} className="group bg-white rounded-3xl overflow-hidden shadow-md hover:shadow-2xl transition-all duration-500 border border-slate-100 flex flex-col hover:-translate-y-2">
            
            <div className="relative h-64 overflow-hidden">
              <img src={service.image} alt={service.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" />
              <div className="absolute inset-0 bg-gradient-to-t from-[#013A63]/80 via-transparent to-transparent"></div>
              <div className="absolute bottom-5 left-5">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 rounded-2xl bg-[#00A99D] flex items-center justify-center shadow-lg">
                    <service.icon className="w-6 h-6 text-white" />
                  </div>
                  <h3 className="font-extrabold text-white text-2xl">{service.title}</h3>
                </div>
              </div>
            </div>
            
            <div className="p-8 flex flex-col flex-grow">
              <p className="text-slate-600 text-base mb-6 leading-relaxed">{service.desc}</p>
              
              <div className="flex flex-wrap gap-2 mb-6">
                {service.features.map((f, i) => (
                  <span key={i} className="text-xs px-3 py-1.5 bg-[#013A63]/5 text-[#013A63] font-semibold rounded-lg border border-[#013A63]/10">{f}</span>
                ))}
              </div>
              
              <div className="flex items-center justify-between pt-6 mt-auto border-t border-slate-100">
                <div className="flex items-center gap-4 text-sm">
                  <span className="flex items-center gap-2 text-slate-600 font-medium"><Users className="w-4 h-4 text-[#00A99D]" /> {service.patients}</span>
                  <span className="flex items-center gap-2 text-slate-600 font-medium"><Clock className="w-4 h-4 text-[#00A99D]" /> {service.exp}</span>
                </div>
                <button className="text-[#00A99D] font-bold text-sm hover:translate-x-1 transition-transform">Book Now →</button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}