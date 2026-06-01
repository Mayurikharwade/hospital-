"use client";

import { ArrowRight, Phone, Sparkles, Crown, Star, Users, Globe, Trophy, Rocket, Clock, CheckCircle, Heart, Shield, Award, TrendingUp } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

export default function AboutMission() {
  const milestones = [
    { 
      year: "2021", 
      title: "The Beginning", 
      desc: "eAshaop was founded with a vision to transform healthcare",
      achievement: "First Step Towards Excellence",
      icon: Rocket,
      color: "from-blue-500 to-cyan-500",
      image: "https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?w=500&h=400&fit=crop" 
    },
    { 
      year: "2022", 
      title: "First Milestone", 
      desc: "10,000+ patients served across Hyderabad",
      achievement: "10,000+ Happy Patients",
      icon: Users,
      color: "from-emerald-500 to-teal-500",
      image: "https://images.unsplash.com/photo-1537368910025-702850d5367b?w=500&h=400&fit=crop" 
    },
    { 
      year: "2023", 
      title: "Nationwide Expansion", 
      desc: "Expanded to 10+ cities across India",
      achievement: "15+ Cities Connected",
      icon: Globe,
      color: "from-violet-500 to-purple-500",
      image: "https://images.unsplash.com/photo-1516549655169-df83a0774514?w=500&h=400&fit=crop" 
    },
    { 
      year: "2024", 
      title: "Award Winning", 
      desc: "Recognized as India&apos;s Best Healthcare Platform",
      achievement: "12 Industry Awards",
      icon: Trophy,
      color: "from-amber-500 to-orange-500",
      image: "https://images.unsplash.com/photo-1559839734-2b71ea197ec2?w=500&h=400&fit=crop" 
    }
  ];

  return (
     <section className="py-10 bg-gradient-to-b from-white via-slate-50 to-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* ========== PREMIUM HEADER ========== */}
        <div className="text-center mb-8">
          <div className="inline-flex items-center gap-2 bg-gradient-to-r from-teal-500 to-emerald-500 text-white px-5 py-2 rounded-full mb-5 shadow-md">
            <Crown className="w-4 h-4" />
            <span className="text-xs font-bold tracking-wider uppercase">Our Journey of Excellence</span>
          </div>
          <h2 className="text-3xl md:text-4xl font-bold text-slate-800 mb-3">
            Transforming <span className="text-teal-600">Healthcare</span>
          </h2>
          <p className="text-slate-500 text-sm max-w-2xl mx-auto">
            From a simple idea to India&apos;s most trusted healthcare platform
          </p>
          <div className="flex justify-center gap-2 mt-4">
            <div className="w-16 h-0.5 rounded-full bg-teal-500"></div>
            <div className="w-3 h-0.5 rounded-full bg-teal-300"></div>
          </div>
        </div>

        {/* ========== MILESTONES GRID ========== */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 mb-10">
          {milestones.map((item, idx) => (
            <div 
              key={idx} 
              className="group bg-white rounded-xl overflow-hidden shadow-md hover:shadow-xl transition-all duration-500 hover:-translate-y-2 border border-slate-100 cursor-pointer"
            >
              {/* Image Section */}
              <div className="relative h-48 overflow-hidden bg-slate-100">
                <Image 
                  src={item.image} 
                  alt={item.title} 
                  width={500}
                  height={400}
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                  unoptimized
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent"></div>
                
                {/* Year Badge */}
                <div className="absolute top-3 left-3">
                  <span className={`bg-gradient-to-r ${item.color} text-white text-xs font-bold px-3 py-1 rounded-full shadow-md`}>
                    {item.year}
                  </span>
                </div>
                
                {/* Icon on Image */}
                <div className="absolute bottom-3 right-3 w-8 h-8 rounded-full bg-white/20 backdrop-blur flex items-center justify-center">
                  <item.icon className="w-4 h-4 text-white" />
                </div>
              </div>
              
              {/* Card Body */}
              <div className="p-5">
                <h3 className="font-bold text-slate-800 text-lg mb-1 group-hover:text-teal-600 transition-colors">
                  {item.title}
                </h3>
                <p className="text-slate-500 text-sm leading-relaxed mb-3">
                  {item.desc}
                </p>
                
                {/* Achievement Badge */}
                <div className="inline-flex items-center gap-1.5 bg-teal-50 px-3 py-1 rounded-full mb-4">
                  <CheckCircle className="w-3.5 h-3.5 text-teal-600" />
                  <span className="text-xs font-medium text-teal-600">{item.achievement}</span>
                </div>
                
                {/* Learn More Button - Redirects to Login */}
                <Link 
                  href="/login" 
                  className="inline-flex items-center gap-1.5 text-teal-600 font-semibold text-sm hover:gap-2 transition-all duration-300 group/btn"
                >
                  Learn More 
                  <ArrowRight className="w-4 h-4 group-hover/btn:translate-x-1 transition-transform" />
                </Link>
              </div>
            </div>
          ))}
        </div>

        {/* ========== IMPACT STATS ========== */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mb-8">
          <div className="text-center p-3 bg-white rounded-xl shadow-sm border border-slate-100 hover:shadow-md transition">
            <Users className="w-6 h-6 text-teal-500 mx-auto mb-1" />
            <p className="text-xl font-bold text-slate-800">50,000+</p>
            <p className="text-[10px] text-slate-500">Happy Patients</p>
          </div>
          <div className="text-center p-3 bg-white rounded-xl shadow-sm border border-slate-100 hover:shadow-md transition">
            <Shield className="w-6 h-6 text-teal-500 mx-auto mb-1" />
            <p className="text-xl font-bold text-slate-800">500+</p>
            <p className="text-[10px] text-slate-500">Expert Doctors</p>
          </div>
          <div className="text-center p-3 bg-white rounded-xl shadow-sm border border-slate-100 hover:shadow-md transition">
            <Clock className="w-6 h-6 text-teal-500 mx-auto mb-1" />
            <p className="text-xl font-bold text-slate-800">24/7</p>
            <p className="text-[10px] text-slate-500">Emergency Care</p>
          </div>
          <div className="text-center p-3 bg-white rounded-xl shadow-sm border border-slate-100 hover:shadow-md transition">
            <Award className="w-6 h-6 text-teal-500 mx-auto mb-1" />
            <p className="text-xl font-bold text-slate-800">15+</p>
            <p className="text-[10px] text-slate-500">Cities Covered</p>
          </div>
        </div>

        {/* ========== CTA BUTTON REMOVED (as requested) ========== */}
        
      </div>
    </section>
  );
}