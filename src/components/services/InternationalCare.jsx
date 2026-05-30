"use client";

import { useRef } from "react";
import { Ambulance, Stethoscope, Pill, Microscope, Activity, HeartPulse, ArrowRight, ChevronLeft, ChevronRight } from "lucide-react";
import Link from "next/link";

export default function InternationalCare() {
  const scrollRef = useRef(null);

  const services = [
    { 
      title: "Emergency Care", 
      desc: "24/7 rapid response team with advanced life support systems for critical conditions.", 
      icon: Ambulance, 
      img: "https://images.unsplash.com/photo-1587556610433-8a3f9e9be1b3?auto=format&fit=crop&w=600&q=80",
      link: "/services/emergency",
      badge: "24/7 Available",
      badgeColor: "bg-red-100 text-red-700"
    },
    { 
      title: "OPD Services", 
      desc: "Expert consultations across 20+ specialties with prioritized patient scheduling.", 
      icon: Stethoscope, 
      img: "https://images.unsplash.com/photo-1516549655169-df83a0774514?auto=format&fit=crop&w=600&q=80",
      link: "/services/opd",
      badge: "Top Rated",
      badgeColor: "bg-blue-100 text-blue-700"
    },
    { 
      title: "Pharmacy", 
      desc: "Access to authentic medications and supplements with 24/7 doorstep delivery.", 
      icon: Pill, 
      img: "https://images.unsplash.com/photo-1587854692152-cbe660dbde88?auto=format&fit=crop&w=600&q=80",
      link: "/services/pharmacy",
      badge: "Free Delivery",
      badgeColor: "bg-green-100 text-green-700"
    },
    { 
      title: "Lab Tests", 
      desc: "High-precision diagnostic testing with digital reports and home sample collection.", 
      icon: Microscope, 
      img: "https://images.unsplash.com/photo-1579154204601-01588f351e67?auto=format&fit=crop&w=600&q=80",
      link: "/services/lab-tests",
      badge: "Fast Reports",
      badgeColor: "bg-purple-100 text-purple-700"
    },
    { 
      title: "Health Checkup", 
      desc: "Comprehensive preventive packages designed to ensure your long-term vitality.", 
      icon: Activity, 
      img: "https://images.unsplash.com/photo-1579684385127-1ef15d508118?auto=format&fit=crop&w=600&q=80",
      link: "/services/health-checkup",
      badge: "Most Popular",
      badgeColor: "bg-amber-100 text-amber-700"
    },
    { 
      title: "Cardiac Care", 
      desc: "Advanced heart screenings, stress tests, and specialized cardiac surgical support.", 
      icon: HeartPulse, 
      img: "https://images.unsplash.com/photo-1628177142898-93e46e462850?auto=format&fit=crop&w=600&q=80",
      link: "/services/cardiology",
      badge: "Expert Care",
      badgeColor: "bg-rose-100 text-rose-700"
    },
  ];

  const scroll = (direction) => {
    if (scrollRef.current) {
      const scrollAmount = direction === 'left' ? -400 : 400;
      scrollRef.current.scrollBy({ left: scrollAmount, behavior: 'smooth' });
    }
  };

  return (
    <section className="py-16 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
      
      {/* Section Title - Bigger Heading */}
      <div className="text-center mb-12">
        <div className="inline-flex items-center gap-2 bg-[#00A99D]/10 px-5 py-2 rounded-full mb-4">
          <span className="text-[#00A99D] text-sm font-semibold uppercase tracking-wide">Our Services</span>
        </div>
        <h2 className="text-3xl md:text-4xl font-bold text-[#013A63] mb-3">Comprehensive Healthcare</h2>
        <p className="text-slate-500 text-base max-w-2xl mx-auto">We provide complete healthcare solutions with compassion and cutting-edge technology</p>
      </div>

      {/* Slider Container */}
      <div className="relative">
        {/* Left Arrow */}
        <button 
          onClick={() => scroll('left')}
          className="absolute left-0 top-1/2 -translate-y-1/2 z-10 w-10 h-10 rounded-full bg-white shadow-md border border-slate-200 flex items-center justify-center hover:bg-slate-50 transition"
        >
          <ChevronLeft className="w-5 h-5 text-slate-600" />
        </button>

        {/* Scrollable Cards */}
        <div 
          ref={scrollRef}
          className="flex gap-6 overflow-x-auto scroll-smooth hide-scrollbar px-10"
          style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
        >
          {services.map((item, idx) => (
            <Link href={item.link} key={idx} className="flex-shrink-0 w-80 group relative h-72 rounded-xl overflow-hidden shadow-md hover:shadow-xl transition-all duration-300">
              <img src={item.img} alt={item.title} className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105" />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/50 to-transparent"></div>
              
              {/* Badge */}
              <div className={`absolute top-3 right-3 ${item.badgeColor} text-xs font-semibold px-2.5 py-1 rounded-full`}>
                {item.badge}
              </div>
              
              <div className="absolute bottom-0 left-0 p-5 w-full">
                <div className="w-12 h-12 bg-[#00A99D] rounded-xl flex items-center justify-center mb-3 shadow-lg">
                  <item.icon className="w-6 h-6 text-white" />
                </div>
                <h3 className="text-lg font-bold text-white mb-2">{item.title}</h3>
                <p className="text-slate-200 text-sm leading-relaxed opacity-0 group-hover:opacity-100 transition-opacity duration-300 line-clamp-2">
                  {item.desc}
                </p>
                <div className="mt-3 flex items-center gap-1 text-[#00A99D] text-sm font-medium opacity-0 group-hover:opacity-100 transition-all">
                  Learn More <ArrowRight className="w-4 h-4" />
                </div>
              </div>
            </Link>
          ))}
        </div>

        {/* Right Arrow */}
        <button 
          onClick={() => scroll('right')}
          className="absolute right-0 top-1/2 -translate-y-1/2 z-10 w-10 h-10 rounded-full bg-white shadow-md border border-slate-200 flex items-center justify-center hover:bg-slate-50 transition"
        >
          <ChevronRight className="w-5 h-5 text-slate-600" />
        </button>
      </div>

      <style jsx>{`
        .hide-scrollbar::-webkit-scrollbar {
          display: none;
        }
      `}</style>
    </section>
  );
}