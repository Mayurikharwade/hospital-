"use client";

import { Calendar, Phone, ArrowRight, Sparkles, Heart, Users, Clock, Star, Shield, Crown, Quote, ThumbsUp, TrendingUp, ChevronLeft, ChevronRight } from "lucide-react";
import Link from "next/link";
import Image from "next/image";
import { useState, useEffect } from "react";

export default function AboutCTA() {
  const [activeIndex, setActiveIndex] = useState(0);
  const [email, setEmail] = useState("");

  const testimonials = [
    { 
      name: "Ramesh Gupta", 
      role: "Heart Patient", 
      text: "The best healthcare experience I've ever had. Dr. Shruthika Reddy saved my life!", 
      rating: 5, 
      image: "https://randomuser.me/api/portraits/men/32.jpg" 
    },
    { 
      name: "Priya Singh", 
      role: "Mother of 2", 
      text: "24/7 support and instant doctor consultation. Truly life-changing for my family.", 
      rating: 5, 
      image: "https://randomuser.me/api/portraits/women/44.jpg" 
    },
    { 
      name: "Amit Sharma", 
      role: "IT Professional", 
      text: "Seamless booking, great doctors, and affordable prices. Highly recommended!", 
      rating: 5, 
      image: "https://randomuser.me/api/portraits/men/56.jpg" 
    },
    { 
      name: "Sneha Reddy", 
      role: "New Mother", 
      text: "The pediatric care is outstanding. My baby is in safe hands at eAshaop.", 
      rating: 5, 
      image: "https://randomuser.me/api/portraits/women/68.jpg" 
    },
    { 
      name: "Vikram Singh", 
      role: "Senior Citizen", 
      text: "Easy to use app, caring doctors, and doorstep medicine delivery. Perfect!", 
      rating: 5, 
      image: "https://randomuser.me/api/portraits/men/75.jpg" 
    },
  ];

  const stats = [
    { value: "50,000+", label: "Happy Patients", icon: Users, trend: "+150%" },
    { value: "500+", label: "Expert Doctors", icon: Shield, trend: "+40%" },
    { value: "24/7", label: "Emergency Support", icon: Clock, trend: "Always" },
    { value: "98%", label: "Patient Satisfaction", icon: ThumbsUp, trend: "+12%" },
  ];

  // Auto-scroll for testimonials
  useEffect(() => {
    const interval = setInterval(() => {
      setActiveIndex((prev) => (prev + 1) % testimonials.length);
    }, 3000);
    return () => clearInterval(interval);
  }, [testimonials.length]);

  const nextSlide = () => {
    setActiveIndex((prev) => (prev + 1) % testimonials.length);
  };

  const prevSlide = () => {
    setActiveIndex((prev) => (prev - 1 + testimonials.length) % testimonials.length);
  };

  // Get visible testimonials (3 at a time)
  const getVisibleTestimonials = () => {
    const items = [];
    for (let i = 0; i < 3; i++) {
      const index = (activeIndex + i) % testimonials.length;
      items.push(testimonials[index]);
    }
    return items;
  };

  return (
    <section className="py-12 -mt-8 bg-gradient-to-b from-white via-slate-50 to-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* HEADER */}
        <div className="text-center mb-6">
          <div className="inline-flex items-center gap-2 bg-gradient-to-r from-teal-500 to-emerald-500 text-white px-5 py-2 rounded-full mb-5 shadow-md">
            <Crown className="w-4 h-4" />
            <span className="text-xs font-bold tracking-wider uppercase">WHY PATIENTS LOVE US</span>
          </div>
          <h2 className="text-3xl md:text-4xl font-bold text-slate-800 mb-3">
            Your Health, <span className="text-teal-600">Our Mission</span>
          </h2>
          <p className="text-slate-500 text-base max-w-2xl mx-auto">
            Thousands of patients have already experienced the eAshaop difference
          </p>
          <div className="flex justify-center gap-2 mt-4">
            <div className="w-16 h-0.5 rounded-full bg-teal-500"></div>
            <div className="w-3 h-0.5 rounded-full bg-teal-300"></div>
          </div>
        </div>

        {/* STATS SECTION */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-12">
          {stats.map((stat, idx) => (
            <div key={idx} className="bg-white rounded-xl p-5 text-center shadow-sm hover:shadow-md transition-all duration-300 border border-slate-100 group">
              <stat.icon className="w-8 h-8 text-teal-500 mx-auto mb-3 group-hover:scale-110 transition-transform" />
              <p className="text-2xl font-bold text-slate-800">{stat.value}</p>
              <p className="text-sm text-slate-500 mt-1">{stat.label}</p>
              <div className="inline-flex items-center gap-1 mt-2 px-2 py-0.5 rounded-full bg-emerald-50">
                <TrendingUp className="w-3 h-3 text-emerald-600" />
                <span className="text-[10px] font-medium text-emerald-600">{stat.trend}</span>
              </div>
            </div>
          ))}
        </div>

        {/* TESTIMONIALS */}
        <div className="mb-16">
          <div className="text-center mb-8">
            <div className="inline-flex items-center gap-2 bg-teal-50 px-5 py-1.5 rounded-full mb-3">
              <Quote className="w-4 h-4 text-teal-600" />
              <span className="text-teal-600 text-xs font-semibold tracking-wide">PATIENT STORIES</span>
            </div>
            <h3 className="text-2xl font-bold text-slate-800">What Our Patients Say</h3>
            <p className="text-slate-500 text-sm mt-1">Real experiences from real people</p>
          </div>
          
          <div className="relative">
            {/* Previous Button */}
            <button 
              onClick={prevSlide}
              className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-4 z-10 w-10 h-10 rounded-full bg-white shadow-lg border border-slate-200 flex items-center justify-center hover:bg-teal-500 hover:text-white hover:border-teal-500 transition-all duration-300 group"
            >
              <ChevronLeft className="w-5 h-5 text-slate-600 group-hover:text-white transition-colors" />
            </button>
            
            {/* Testimonials Grid - 3 cards side by side */}
            <div className="grid md:grid-cols-3 gap-6 px-7">
              {getVisibleTestimonials().map((testimonial, idx) => (
                <div 
                  key={idx} 
                  className="bg-white rounded-xl p-6 shadow-md hover:shadow-xl transition-all duration-300 border border-slate-100 animate-fade-in"
                >
                  <div className="flex items-center gap-3 mb-4">
                    <div className="w-12 h-12 rounded-full overflow-hidden border-2 border-teal-500">
                      <Image 
                        src={testimonial.image} 
                        alt={testimonial.name} 
                        width={48} 
                        height={48} 
                        className="w-full h-full object-cover"
                        unoptimized
                      />
                    </div>
                    <div>
                      <h4 className="font-bold text-slate-800 text-base">{testimonial.name}</h4>
                      <p className="text-teal-600 text-xs">{testimonial.role}</p>
                    </div>
                  </div>
                  <div className="flex gap-1 mb-3">
                    {[...Array(testimonial.rating)].map((_, i) => (
                      <Star key={i} className="w-4 h-4 fill-amber-400 text-amber-400" />
                    ))}
                  </div>
                  <p className="text-slate-600 text-sm italic leading-relaxed">&quot;{testimonial.text}&quot;</p>
                </div>
              ))}
            </div>
            
            {/* Next Button */}
            <button 
              onClick={nextSlide}
              className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-4 z-10 w-10 h-10 rounded-full bg-white shadow-lg border border-slate-200 flex items-center justify-center hover:bg-teal-500 hover:text-white hover:border-teal-500 transition-all duration-300 group"
            >
              <ChevronRight className="w-5 h-5 text-slate-600 group-hover:text-white transition-colors" />
            </button>
          </div>
          
          {/* Dots Indicator */}
          <div className="flex justify-center gap-2 mt-8">
            {testimonials.map((_, idx) => (
              <button
                key={idx}
                onClick={() => setActiveIndex(idx)}
                className={`h-2 rounded-full transition-all duration-300 ${
                  activeIndex === idx || (activeIndex + 1) % testimonials.length === idx || (activeIndex + 2) % testimonials.length === idx
                    ? 'w-5 bg-teal-600' 
                    : 'w-2 bg-slate-300'
                }`}
              />
            ))}
          </div>
        </div>

        {/* CTA BUTTONS */}
        <div className="flex flex-wrap gap-5 justify-center">
          <Link 
            href="/login" 
            className="inline-flex items-center gap-2 px-8 py-3 bg-gradient-to-r from-teal-600 to-teal-500 text-white rounded-lg text-base font-semibold hover:shadow-lg transition-all duration-300 hover:scale-105"
          >
            <Calendar className="w-5 h-5" /> Book Appointment
            <ArrowRight className="w-4 h-4" />
          </Link>
          <Link 
            href="/login" 
            className="inline-flex items-center gap-2 px-8 py-3 border-2 border-teal-600 text-teal-600 rounded-lg text-base font-semibold hover:bg-teal-600 hover:text-white transition-all duration-300"
          >
            <Phone className="w-5 h-5" /> Contact Us
          </Link>
        </div>
      </div>

      {/* Animation CSS */}
      <style jsx>{`
        @keyframes fade-in {
          from {
            opacity: 0;
            transform: translateX(20px);
          }
          to {
            opacity: 1;
            transform: translateX(0);
          }
        }
        .animate-fade-in {
          animation: fade-in 0.4s ease-out forwards;
        }
      `}</style>
    </section>
  );
}