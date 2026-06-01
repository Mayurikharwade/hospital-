"use client";
import React, { useState } from "react";
import Link from "next/link";
import { Heart, Brain, Bone, Microscope, Activity, Sparkles, ArrowRight, Star, Clock, Users, Award } from "lucide-react";

const centres = [
  { 
    icon: Heart, 
    title: "Cardiac Sciences", 
    desc: "Advanced heart care, bypass surgeries, and interventional cardiology with world-class facilities.", 
    img: "https://images.unsplash.com/photo-1628177142898-93e46e462850?auto=format&fit=crop&w=600&q=80", 
    patients: "5000+", 
    rating: "4.9",
    ratingCount: "1,200+",
    timing: "24/7 Emergency",
    badge: "Top Rated"
  },
  { 
    icon: Brain, 
    title: "Neuro Sciences", 
    desc: "Comprehensive care for brain tumors, spine injuries, and neurological disorders.", 
    img: "https://images.unsplash.com/photo-1559757175-5700dde675bc?auto=format&fit=crop&w=600&q=80", 
    patients: "3000+", 
    rating: "4.8",
    ratingCount: "850+",
    timing: "Mon-Sat 9AM-6PM",
    badge: "Expert Care"
  },
  { 
    icon: Bone, 
    title: "Orthopaedics", 
    desc: "State-of-the-art joint replacement, sports injury rehab, and trauma care services.", 
    img: "https://images.unsplash.com/photo-1583324113626-70df0f4deaab?auto=format&fit=crop&w=600&q=80", 
    patients: "8000+", 
    rating: "4.9",
    ratingCount: "2,000+",
    timing: "Mon-Sat 9AM-5PM",
    badge: "Most Popular"
  },
  { 
    icon: Microscope, 
    title: "Oncology", 
    desc: "Personalized cancer treatment plans, chemotherapy, and advanced radiation therapy.", 
    img: "https://images.unsplash.com/photo-1579684385127-1ef15d508118?auto=format&fit=crop&w=600&q=80", 
    patients: "4000+", 
    rating: "4.8",
    ratingCount: "600+",
    timing: "Mon-Sat 10AM-4PM",
    badge: "Advanced Care"
  },
  { 
    icon: Activity, 
    title: "Gastroenterology", 
    desc: "Expertise in digestive tract health, endoscopy, and hepatology services.", 
    img: "https://images.unsplash.com/photo-1537368910025-702850d5367b?auto=format&fit=crop&w=600&q=80", 
    patients: "6000+", 
    rating: "4.7",
    ratingCount: "950+",
    timing: "Mon-Sat 9AM-5PM",
    badge: "Trusted Care"
  },
  { 
    icon: Sparkles, 
    title: "Transplants", 
    desc: "Leading multi-organ transplant programs with high success rates and donor care.", 
    img: "https://images.unsplash.com/photo-1516549655169-df83a0774514?auto=format&fit=crop&w=600&q=80", 
    patients: "2000+", 
    rating: "4.9",
    ratingCount: "400+",
    timing: "By Appointment",
    badge: "Lifesaving"
  },
];

export default function CentresOfExcellence() {
  const [hoveredIdx, setHoveredIdx] = useState(null);

  return (
    <section className="py-16 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
      {/* Header */}
      <div className="text-center mb-12">
        <div className="inline-flex items-center gap-2 bg-[#00A99D]/10 px-4 py-1.5 rounded-full mb-4">
          <Award className="w-4 h-4 text-[#00A99D]" />
          <span className="text-[#00A99D] text-xs font-semibold uppercase tracking-wide">Clinical Excellence</span>
        </div>
        <h2 className="text-3xl md:text-4xl font-bold text-[#013A63] mb-3">Centres of Excellence</h2>
        <p className="text-slate-500 text-sm max-w-2xl mx-auto">World-class medical expertise with compassionate care and cutting-edge technology</p>
      </div>
      
      {/* Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {centres.map((centre, idx) => (
          <div 
            key={idx} 
            className="group relative rounded-xl overflow-hidden shadow-md hover:shadow-xl transition-all duration-300 cursor-pointer h-96"
            onMouseEnter={() => setHoveredIdx(idx)}
            onMouseLeave={() => setHoveredIdx(null)}
          >
            {/* Image */}
            <img src={centre.img} alt={centre.title} className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105" />
            
            {/* Dark Gradient Overlay */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/50 to-transparent"></div>
            
            {/* Badge */}
            <div className="absolute top-3 right-3 bg-[#00A99D] text-white text-[10px] font-semibold px-2 py-0.5 rounded-full">
              {centre.badge}
            </div>
            
            {/* Content */}
            <div className="absolute bottom-0 left-0 w-full p-5">
              <div className="flex items-center gap-2 mb-2">
                <centre.icon className="w-5 h-5 text-[#00A99D]" />
                <h3 className="font-bold text-white text-lg">{centre.title}</h3>
              </div>
              
              {/* Stats Row */}
              <div className="flex items-center gap-3 mb-2">
                <div className="flex items-center gap-1">
                  <Users className="w-3 h-3 text-[#00A99D]" />
                  <span className="text-white/80 text-xs">{centre.patients} patients</span>
                </div>
                <div className="flex items-center gap-1">
                  <Star className="w-3 h-3 fill-yellow-400 text-yellow-400" />
                  <span className="text-white/80 text-xs">{centre.rating} ({centre.ratingCount})</span>
                </div>
                <div className="flex items-center gap-1">
                  <Clock className="w-3 h-3 text-[#00A99D]" />
                  <span className="text-white/80 text-xs">{centre.timing}</span>
                </div>
              </div>
              
              {/* Description */}
              <p className="text-slate-200 text-sm leading-relaxed mt-2 line-clamp-2">
                {centre.desc}
              </p>
              
              {/* Explore Department Link - Redirect to Login */}
              <Link 
                href="/login" 
                className="inline-flex items-center gap-1 text-[#00A99D] text-sm font-medium mt-3 group-hover:gap-2 transition-all"
              >
                Explore Department <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}