"use client";

import React from 'react';
import Image from 'next/image';
import { CheckCircle2 } from 'lucide-react';

export default function WhyChooseDoctors() {
  const points = [
    'Verified and qualified professionals',
    'Patient-first approach',
    'Available online and offline',
    'Support for all major health concerns',
  ];

  return (
    <section className="bg-white py-16 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
        
        {/* Left Side: Image */}
        <div className="relative flex justify-center lg:justify-start order-2 lg:order-1">
          <div className="absolute inset-0 bg-gradient-to-tr from-[#00A99D]/20 to-transparent blur-3xl rounded-full transform -translate-x-5 translate-y-10"></div>
          <Image
            src="https://images.unsplash.com/photo-1576091160550-2173dba999ef?q=80&w=800&auto=format&fit=crop"
            alt="Why Choose Us"
            width={800}
            height={600}
            className="relative w-full max-w-lg rounded-3xl object-cover shadow-2xl border-4 border-white"
            unoptimized
          />
        </div>

        {/* Right Side: Content */}
        <div className="order-1 lg:order-2">
          <h2 className="text-3xl md:text-4xl font-bold text-[#013A63] mb-6">
            Why Choose our Doctors
          </h2>
          <p className="text-slate-500 text-lg mb-8 leading-relaxed">
            Our team of doctors is committed to delivering trusted, accessible, and high-quality care — designed around your needs.
          </p>
          <ul className="space-y-4">
            {points.map((point, index) => (
              <li key={index} className="flex items-center gap-4 bg-slate-50 p-4 rounded-xl border border-slate-100 hover:border-[#00A99D]/30 hover:shadow-md transition-all duration-300">
                <CheckCircle2 className="w-6 h-6 text-[#00A99D] flex-shrink-0" />
                <span className="text-slate-700 font-semibold">{point}</span>
              </li>
            ))}
          </ul>
        </div>
        
      </div>
    </section>
  );
}