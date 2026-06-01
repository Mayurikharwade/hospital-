"use client";

import { useState, useEffect, useRef } from "react";
import Image from "next/image";
import { 
  Sparkles, Crown, Heart, Users, Globe, Award, 
  Stethoscope, Calendar, Star, Shield, Clock, ArrowRight,
  TrendingUp, CheckCircle, Zap, Rocket, Gem, ThumbsUp
} from "lucide-react";
import Link from "next/link";

export default function AboutStory() {
  const [counters, setCounters] = useState({ patients: 0, doctors: 0, cities: 0, awards: 0 });
  const [hoveredStat, setHoveredStat] = useState(null);
  const [hoveredBadge, setHoveredBadge] = useState(null);
  const statsRef = useRef(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) setIsVisible(true);
    }, { threshold: 0.3 });
    if (statsRef.current) observer.observe(statsRef.current);
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    if (isVisible) {
      const targets = { patients: 50000, doctors: 500, cities: 15, awards: 12 };
      const duration = 2000;
      const step = 20;
      const increments = { 
        patients: targets.patients / (duration / step), 
        doctors: targets.doctors / (duration / step), 
        cities: targets.cities / (duration / step), 
        awards: targets.awards / (duration / step) 
      };
      let current = { patients: 0, doctors: 0, cities: 0, awards: 0 };
      const timer = setInterval(() => {
        current.patients = Math.min(current.patients + increments.patients, targets.patients);
        current.doctors = Math.min(current.doctors + increments.doctors, targets.doctors);
        current.cities = Math.min(current.cities + increments.cities, targets.cities);
        current.awards = Math.min(current.awards + increments.awards, targets.awards);
        setCounters({ ...current });
        if (current.patients >= targets.patients && current.doctors >= targets.doctors && current.cities >= targets.cities && current.awards >= targets.awards) clearInterval(timer);
      }, step);
      return () => clearInterval(timer);
    }
  }, [isVisible]);

  const stats = [
    { value: Math.floor(counters.patients).toLocaleString(), label: "Happy Patients", icon: Users, suffix: "+", trend: "+150% this year", color: "from-blue-500 to-cyan-500" },
    { value: Math.floor(counters.doctors).toLocaleString(), label: "Expert Doctors", icon: Stethoscope, suffix: "+", trend: "+40% this year", color: "from-emerald-500 to-teal-500" },
    { value: Math.floor(counters.cities).toLocaleString(), label: "Cities Served", icon: Globe, suffix: "+", trend: "Pan India presence", color: "from-violet-500 to-purple-500" },
    { value: Math.floor(counters.awards).toLocaleString(), label: "Industry Awards", icon: Award, suffix: "+", trend: "Best Platform 2024", color: "from-amber-500 to-orange-500" },
  ];

  const trustBadges = [
    { icon: Shield, label: "100% Verified Doctors", desc: "Rigorous credential check" },
    { icon: Clock, label: "24/7 Support", desc: "Always here for you" },
    { icon: Star, label: "4.9★ Rating", desc: "From 10,000+ reviews" },
    { icon: Heart, label: "Free Consult", desc: "First visit free" },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-b from-white via-slate-50 to-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 md:py-10">
        
        {/* HEADER */}
        <div className="text-center mb-8">
          <div className="inline-flex items-center gap-2 bg-gradient-to-r from-teal-50 to-emerald-50 px-4 py-1.5 rounded-full mb-4 animate-pulse hover:animate-none transition-all duration-300">
            <Rocket className="w-3.5 h-3.5 text-teal-600" />
            <span className="text-teal-600 text-xs font-semibold tracking-wide">OUR STORY</span>
          </div>
          <h1 className="text-3xl md:text-4xl font-bold text-slate-800 mb-2">
            Premium Healthcare, <span className="bg-gradient-to-r from-teal-600 to-emerald-600 bg-clip-text text-transparent">Redefined</span>
          </h1>
          <p className="text-slate-400 text-sm mt-2">Experience healthcare excellence with cutting-edge technology</p>
        </div>

        {/* STATS WITH HOVER EFFECTS */}
        <div ref={statsRef} className="grid grid-cols-2 md:grid-cols-4 gap-3 mb-10">
          {stats.map((stat, idx) => (
            <div 
              key={idx} 
              className="group relative bg-white rounded-xl p-3 text-center shadow-sm hover:shadow-xl transition-all duration-500 hover:-translate-y-2 border border-slate-100 cursor-pointer"
              onMouseEnter={() => setHoveredStat(idx)}
              onMouseLeave={() => setHoveredStat(null)}
            >
              <div className={`absolute inset-0 bg-gradient-to-br ${stat.color} opacity-0 group-hover:opacity-5 rounded-xl transition-opacity duration-500`}></div>
              <div className="relative">
                <div className={`w-10 h-10 rounded-full bg-gradient-to-br ${stat.color} flex items-center justify-center mx-auto mb-2 transition-all duration-300 group-hover:scale-110 group-hover:rotate-6`}>
                  <stat.icon className="w-5 h-5 text-white" />
                </div>
                <p className="text-xl font-bold bg-gradient-to-r from-slate-800 to-slate-600 bg-clip-text text-transparent mb-0.5 group-hover:scale-105 transition-transform duration-300">
                  {stat.value}{stat.suffix}
                </p>
                <p className="text-xs text-slate-500 mt-0.5">{stat.label}</p>
                {hoveredStat === idx && (
                  <div className="absolute -top-8 left-1/2 -translate-x-1/2 bg-slate-800 text-white text-[10px] px-2 py-0.5 rounded-full whitespace-nowrap animate-fade-in">
                    {stat.trend}
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>

        {/* STORY SECTION */}
        <div className="grid lg:grid-cols-2 gap-10 items-center mb-12">
          <div className="group relative rounded-xl overflow-hidden shadow-md cursor-pointer">
            <Image 
              src="https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?w=800&h=500&fit=crop" 
              alt="Story" 
              width={800}
              height={500}
              className="w-full h-80 object-cover transition-transform duration-700 group-hover:scale-110"
              unoptimized
            />
            <div className="absolute inset-0 bg-gradient-to-t from-teal-600/40 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
            <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-500">
              <div className="w-12 h-12 rounded-full bg-white/30 backdrop-blur flex items-center justify-center animate-pulse">
                <Zap className="w-6 h-6 text-white" />
              </div>
            </div>
          </div>
          
          <div>
            <div className="inline-flex items-center gap-2 bg-gradient-to-r from-teal-50 to-emerald-50 px-3 py-1 rounded-full mb-3 group-hover:scale-105 transition-transform duration-300">
              <Gem className="w-3.5 h-3.5 text-teal-600" />
              <span className="text-teal-600 text-[10px] font-semibold tracking-wide">OUR PROMISE</span>
            </div>
            
            <h2 className="text-2xl md:text-3xl font-bold text-slate-800 mb-4">
              Your Health, <span className="bg-gradient-to-r from-teal-600 to-emerald-600 bg-clip-text text-transparent">Our Priority</span>
            </h2>
            
            <p className="text-slate-500 leading-relaxed mb-6">
              eShaop was founded with a simple belief: <span className="font-semibold text-teal-600">quality healthcare should be accessible to everyone.</span> 
              Today, we&apos;re proud to be India&apos;s fastest-growing healthcare platform, trusted by over 50,000 patients.
            </p>
            
            {/* Book Appointment Button - Redirect to Login */}
            <Link 
              href="/login" 
              className="group/btn inline-flex items-center gap-2 px-5 py-2.5 bg-gradient-to-r from-teal-600 to-emerald-600 text-white rounded-lg text-sm font-semibold hover:shadow-lg transition-all duration-300 hover:scale-105"
            >
              <Calendar className="w-4 h-4" /> 
              Book Appointment
              <ArrowRight className="w-3.5 h-3.5 group-hover/btn:translate-x-1 transition-transform duration-300" />
            </Link>
          </div>
        </div>

        {/* TRUST BADGES */}
        <div className="pt-6 border-t border-slate-100">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
            {trustBadges.map((badge, idx) => (
              <div 
                key={idx} 
                className="group relative flex items-center gap-2 p-2 rounded-lg hover:bg-teal-50 transition-all duration-300 cursor-pointer"
                onMouseEnter={() => setHoveredBadge(idx)}
                onMouseLeave={() => setHoveredBadge(null)}
              >
                <div className="w-8 h-8 rounded-full bg-teal-50 flex items-center justify-center group-hover:bg-teal-100 group-hover:scale-110 transition-all duration-300">
                  <badge.icon className="w-4 h-4 text-teal-600" />
                </div>
                <div>
                  <p className="text-xs font-medium text-slate-700 group-hover:text-teal-600 transition-colors duration-300">
                    {badge.label}
                  </p>
                  {hoveredBadge === idx && (
                    <p className="text-[10px] text-slate-400 animate-fade-in">
                      {badge.desc}
                    </p>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      <style jsx>{`
        @keyframes fade-in {
          from {
            opacity: 0;
            transform: translateY(-5px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        .animate-fade-in {
          animation: fade-in 0.2s ease-out forwards;
        }
      `}</style>
    </div>
  );
}