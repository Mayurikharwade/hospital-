"use client";

import React from 'react';
import Link from 'next/link';
import { Search, UserCheck, CalendarDays, ArrowRight, Sparkles, Shield, Clock, Video } from "lucide-react";

export default function DoctorsCTA() {
  const steps = [
    {
      title: 'Find Your Doctor',
      icon: Search,
      description: 'Explore verified professionals across various specialties to find the perfect fit.',
      color: 'blue',
      bgColor: 'bg-blue-50',
      iconColor: 'text-blue-600',
      number: '01',
      link: '/doctors',
    },
    {
      title: 'Check Profile & Reviews',
      icon: UserCheck,
      description: 'Check experience, patient reviews, consultation modes, and availability.',
      color: 'green',
      bgColor: 'bg-green-50',
      iconColor: 'text-green-600',
      number: '02',
      link: '/doctors',
    },
    {
      title: 'Book Appointment',
      icon: CalendarDays,
      description: 'Choose your preferred time and consultation method and confirm instantly.',
      color: 'purple',
      bgColor: 'bg-purple-50',
      iconColor: 'text-purple-600',
      number: '03',
      link: '/doctors',
    },
  ];

  const features = [
    { icon: Shield, text: "100% Verified Doctors", color: "text-emerald-600", link: "/doctors" },
    { icon: Video, text: "Online Consultation", color: "text-blue-600", link: "/doctors" },
    { icon: Clock, text: "24/7 Emergency Support", color: "text-amber-600", link: "/doctors" },
    { icon: Sparkles, text: "Secure & Confidential", color: "text-purple-600", link: "/doctors" },
  ];

  return (
    <section className="bg-gradient-to-b from-white to-slate-50 py-16 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        
        {/* Modern Heading */}
        <div className="text-center mb-10">
          <div className="inline-flex items-center gap-2 bg-[#00A99D]/10 px-4 py-1.5 rounded-full mb-4">
            <Sparkles className="w-4 h-4 text-[#00A99D]" />
            <span className="text-[#00A99D] text-sm font-semibold">Easy Process</span>
          </div>
          <h2 className="text-3xl md:text-4xl font-bold text-[#013A63] mb-3">
            Book Your Appointment in <span className="text-[#00A99D]">3 Simple Steps</span>
          </h2>
          <p className="text-slate-500 max-w-2xl mx-auto text-base">
            Skip the long wait times. Seamlessly find, research, and book your ideal medical professional in just a few clicks.
          </p>
        </div>

        {/* Steps Grid - Using Link from Next.js */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
          {steps.map((step, index) => (
            <Link 
              key={index} 
              href={step.link}
              className="group relative bg-white rounded-2xl p-6 shadow-sm hover:shadow-xl transition-all duration-300 hover:-translate-y-1 border border-slate-100 cursor-pointer block"
            >
              <div className="absolute top-4 right-4 text-5xl font-bold text-slate-100 group-hover:text-[#00A99D]/10 transition-colors duration-300">
                {step.number}
              </div>
              <div className={`w-14 h-14 rounded-2xl ${step.bgColor} flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300`}>
                <step.icon className={`w-7 h-7 ${step.iconColor}`} />
              </div>
              <h3 className="text-lg font-bold text-[#013A63] mb-2">{step.title}</h3>
              <p className="text-slate-500 text-sm leading-relaxed">{step.description}</p>
              <div className="mt-4 flex items-center gap-1 text-[#00A99D] text-sm font-medium group-hover:gap-2 transition-all">
                Learn more <ArrowRight className="w-4 h-4" />
              </div>
            </Link>
          ))}
        </div>

        {/* Trust Badges - Clickable Links */}
        <div className="flex flex-wrap justify-center gap-6 pt-6 border-t border-slate-200">
          {features.map((feature, idx) => (
            <Link 
              key={idx} 
              href={feature.link}
              className="flex items-center gap-2 hover:scale-105 transition-transform duration-200 cursor-pointer"
            >
              <feature.icon className={`w-4 h-4 ${feature.color}`} />
              <span className="text-xs text-slate-600 hover:text-[#00A99D] transition">{feature.text}</span>
            </Link>
          ))}
        </div>

        {/* Final CTA Button */}
        <div className="text-center mt-8">
          <Link 
            href="/doctors"
            className="inline-block px-8 py-3 bg-gradient-to-r from-[#00A99D] to-[#009488] text-white rounded-xl font-semibold hover:shadow-lg hover:scale-105 transition-all duration-300 cursor-pointer"
          >
            Get Started Now → 
          </Link>
        </div>
      </div>
    </section>
  );
}