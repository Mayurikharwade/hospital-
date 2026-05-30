"use client";
import { Apple } from "lucide-react";
import React from 'react';
import Link from 'next/link';
import { 
  HeartPulse, Shield, Clock, Video, Calendar, MessageCircle, 
  Stethoscope, Activity, Award, Users, Phone, ArrowRight, 
  Star, Sparkles, Microscope, Baby, TrendingUp, Smile, 
  ThumbsUp, Ambulance, CheckCircle, Brain, Bone, Eye, 
  Droplets, Syringe, Pill, Heart, Zap, Target, Globe,
  GraduationCap, MapPin, Briefcase
} from "lucide-react";

export default function DoctorsFeatures() {
  const services = [
    {
      title: "Pregnancy Care & Delivery",
      badge: "Most Loved",
      badgeColor: "bg-pink-100 text-pink-700",
      description: "Comprehensive maternity care from conception to postpartum with experienced gynecologists.",
      image: "https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?w=500&h=300&fit=crop",
      features: ["24/7 Emergency", "NICU Facility", "Lamaze Classes", "High-Risk Pregnancy"],
      icon: HeartPulse,
      link: "/doctors"
    },
    {
      title: "Gynecology",
      badge: "Top Rated",
      badgeColor: "bg-purple-100 text-purple-700",
      description: "Expert care for women's health including PCOS, menopause, and reproductive health.",
      image: "https://images.unsplash.com/photo-1576091160550-2173dba999ef?w=500&h=300&fit=crop",
      features: ["PCOS Treatment", "Menopause Care", "Annual Checkups", "Fertility Services"],
      icon: Heart,
      link: "/doctors"
    },
    {
      title: "Surgeries",
      badge: "Advanced",
      badgeColor: "bg-blue-100 text-blue-700",
      description: "Advanced minimally invasive surgeries with quick recovery and minimal scarring.",
      image: "https://images.unsplash.com/photo-1516549655169-df83a0774514?w=500&h=300&fit=crop",
      features: ["Laparoscopic", "Robotic Surgery", "Laser Treatment", "Fast Recovery"],
      icon: Activity,
      link: "/doctors"
    },
  ];

  const tips = [
    { icon: Droplets, title: "Stay Hydrated", desc: "Drink 8-10 glasses of water daily", color: "text-blue-500", bg: "bg-blue-50" },
    { icon: Activity, title: "Daily Exercise", desc: "30 minutes walk boosts heart health", color: "text-green-500", bg: "bg-green-50" },
    { icon: Pill, title: "Medication", desc: "Never skip prescribed medicines", color: "text-amber-500", bg: "bg-amber-50" },
    { icon: Apple, title: "Healthy Diet", desc: "Eat more fruits and vegetables", color: "text-red-500", bg: "bg-red-50" },
  ];

  const features = [
    { icon: Shield, title: "Verified Doctors", desc: "100% verified professionals" },
    { icon: Video, title: "Video Consult", desc: "Connect from anywhere" },
    { icon: Calendar, title: "Easy Booking", desc: "Book in 2 minutes" },
    { icon: Clock, title: "24/7 Support", desc: "Emergency care anytime" },
  ];

  return (
    <section className="py-16 bg-gradient-to-br from-slate-50 via-white to-teal-50/30">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Heading */}
        <div className="text-center mb-12">
          <div className="inline-flex items-center gap-2 bg-[#00A99D]/10 px-4 py-1.5 rounded-full mb-4">
            <HeartPulse className="w-4 h-4 text-[#00A99D]" />
            <span className="text-[#00A99D] font-semibold text-sm uppercase tracking-wide">Our Services</span>
          </div>
          <h2 className="text-3xl md:text-4xl font-bold text-[#013A63] mb-3">
            Comprehensive <span className="text-[#00A99D]">Healthcare</span>
          </h2>
          <p className="text-slate-500 max-w-2xl mx-auto">
            We provide complete healthcare solutions with compassion and cutting-edge technology
          </p>
        </div>

        {/* Services Cards */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-16">
          {services.map((service, idx) => (
            <div key={idx} className="group bg-white rounded-2xl overflow-hidden shadow-md hover:shadow-xl transition-all duration-300 hover:-translate-y-1 border border-slate-100">
              <div className="relative h-48 overflow-hidden">
                <img 
                  src={service.image} 
                  alt={service.title}
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" 
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent"></div>
                <div className={`absolute top-3 right-3 px-2 py-1 ${service.badgeColor} text-xs font-semibold rounded-full`}>
                  {service.badge}
                </div>
              </div>
              <div className="p-5">
                <div className="flex items-center gap-2 mb-2">
                  <service.icon className="w-5 h-5 text-[#00A99D]" />
                  <h3 className="font-bold text-[#013A63] text-lg">{service.title}</h3>
                </div>
                <p className="text-slate-500 text-sm mb-3">{service.description}</p>
                <div className="flex flex-wrap gap-2 mb-4">
                  {service.features.map((feature, i) => (
                    <span key={i} className="text-xs px-2 py-1 bg-slate-100 text-slate-600 rounded-full">{feature}</span>
                  ))}
                </div>
                <Link href={service.link} className="inline-flex items-center gap-1 text-[#00A99D] text-sm font-medium hover:gap-2 transition">
                  Learn More <ArrowRight className="w-4 h-4" />
                </Link>
              </div>
            </div>
          ))}
        </div>

        {/* Quick Medical Tips */}
        <div className="mb-16">
          <div className="text-center mb-8">
            <div className="inline-flex items-center gap-2 bg-[#00A99D]/10 px-4 py-1.5 rounded-full mb-4">
              <Zap className="w-4 h-4 text-[#00A99D]" />
              <span className="text-[#00A99D] font-semibold text-sm uppercase tracking-wide">Quick Tips</span>
            </div>
            <h3 className="text-2xl md:text-3xl font-bold text-[#013A63]">Quick Medical Tips</h3>
            <p className="text-slate-500 mt-2">Small changes, big impact on your health</p>
          </div>
          
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {tips.map((tip, idx) => (
              <div key={idx} className="bg-white rounded-xl p-4 text-center shadow-sm hover:shadow-md transition border border-slate-100">
                <div className={`w-12 h-12 rounded-full ${tip.bg} flex items-center justify-center mx-auto mb-3`}>
                  <tip.icon className={`w-6 h-6 ${tip.color}`} />
                </div>
                <h4 className="font-semibold text-slate-800 text-sm">{tip.title}</h4>
                <p className="text-xs text-slate-500 mt-1">{tip.desc}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Why Choose Us - Simple Grid */}
        <div>
          <div className="text-center mb-8">
            <div className="inline-flex items-center gap-2 bg-[#00A99D]/10 px-4 py-1.5 rounded-full mb-4">
              <Award className="w-4 h-4 text-[#00A99D]" />
              <span className="text-[#00A99D] font-semibold text-sm uppercase tracking-wide">Why Choose Us</span>
            </div>
            <h3 className="text-2xl md:text-3xl font-bold text-[#013A63]">What Makes Us Different</h3>
          </div>
          
          <div className="grid grid-cols-2 md:grid-cols-4 gap-5">
            {features.map((feature, idx) => (
              <div key={idx} className="text-center p-4 bg-white rounded-xl shadow-sm border border-slate-100 hover:shadow-md transition">
                <div className="w-14 h-14 rounded-full bg-[#00A99D]/10 flex items-center justify-center mx-auto mb-3">
                  <feature.icon className="w-7 h-7 text-[#00A99D]" />
                </div>
                <h4 className="font-semibold text-slate-800 text-sm">{feature.title}</h4>
                <p className="text-xs text-slate-400 mt-1">{feature.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

