"use client";

import { useState } from "react";
import Link from "next/link";
import {
  Heart,
  Baby,
  HeartPulse,
  Shield,
  ArrowRight,
  Star,
  Sparkles,
  Video,
  Pill,
  Activity,
} from "lucide-react";

const services = [
  {
    id: 1,
    title: "Pregnancy Care & Delivery",
    description: "Comprehensive maternity care from conception to postpartum with experienced gynecologists.",
    icon: Baby,
    image: "https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?w=400&h=300&fit=crop",
    features: ["24/7 Emergency", "NICU Facility", "Lamaze Classes", "High-Risk Pregnancy"],
    badge: "Most Loved",
    badgeColor: "bg-pink-100 text-pink-700",
  },
  {
    id: 2,
    title: "Gynaecology",
    description: "Expert care for women's health including PCOS, menopause, and reproductive health.",
    icon: HeartPulse,
    image: "https://images.unsplash.com/photo-1576091160550-2173dba999ef?w=400&h=300&fit=crop",
    features: ["PCOS Treatment", "Menopause Care", "Annual Checkups", "Fertility Services"],
    badge: "Top Rated",
    badgeColor: "bg-purple-100 text-purple-700",
  },
  {
    id: 3,
    title: "Surgeries",
    description: "Advanced minimally invasive surgeries with quick recovery and minimal scarring.",
    icon: Shield,
    image: "https://images.unsplash.com/photo-1516549655169-df83a0774514?w=400&h=300&fit=crop",
    features: ["Laparoscopic", "Robotic Surgery", "Laser Treatment", "Fast Recovery"],
    badge: "Advanced",
    badgeColor: "bg-blue-100 text-blue-700",
  },
];

const modernFeatures = [
  {
    id: 1,
    title: "AI Health Assistant",
    description: "24/7 virtual assistant for instant health queries",
    icon: Sparkles,
    color: "text-purple-500",
    bg: "bg-purple-50",
  },
  {
    id: 2,
    title: "Video Consult",
    description: "Connect with doctors from anywhere",
    icon: Video,
    color: "text-blue-500",
    bg: "bg-blue-50",
  },
  {
    id: 3,
    title: "E-Pharmacy",
    description: "Medicines delivered at your doorstep",
    icon: Pill,
    color: "text-green-500",
    bg: "bg-green-50",
  },
  {
    id: 4,
    title: "Health Tracker",
    description: "Track vitals & appointments in one place",
    icon: Activity,
    color: "text-orange-500",
    bg: "bg-orange-50",
  },
];

const reviews = [
  {
    id: 1,
    name: "Priya Patel",
    role: "Mother",
    rating: 5,
    review: "Best pediatric care in the city. My child loves visiting the hospital now!",
    image: "https://randomuser.me/api/portraits/women/1.jpg",
  },
  {
    id: 2,
    name: "Ramesh Sharma",
    role: "Heart Patient",
    rating: 5,
    review: "The care I received was exceptional. Dr. Shruthika gave me a new lease on life!",
    image: "https://randomuser.me/api/portraits/men/2.jpg",
  },
  {
    id: 3,
    name: "Sainischala S",
    role: "New Mother",
    rating: 5,
    review: "We Consulted Dr. Sradhanjali for entire 9 months of my pregnancy. Blessed with healthy baby girl!",
    image: "https://randomuser.me/api/portraits/women/3.jpg",
  },
  {
    id: 4,
    name: "Narvadeshwar Chaud",
    role: "Patient",
    rating: 5,
    review: "All are quiet good as far as my experience is concerned. She takes care of all aspects systematically.",
    image: "https://randomuser.me/api/portraits/men/4.jpg",
  },
];

export default function FeaturedServices() {
  return (
    <section className="py-16 bg-[#f8fafc]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header - OUR SERVICES */}
        <div className="text-center mb-12">
          <div className="inline-flex items-center gap-2 bg-[#00A99D]/10 px-4 py-1.5 rounded-full mb-4">
            <Heart className="w-4 h-4 text-[#00A99D]" />
            <span className="text-[#00A99D] font-semibold text-sm uppercase tracking-wide">
              OUR SERVICES
            </span>
          </div>
          <h2 className="text-3xl md:text-4xl font-bold text-[#013A63] mb-3">
            Dedicated and Personalized Care
          </h2>
          <p className="text-slate-500 max-w-2xl mx-auto">
            We provide comprehensive healthcare services with compassion and cutting-edge technology
          </p>
        </div>

        {/* Modern Features Row */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-12">
          {modernFeatures.map((feature) => (
            <div
              key={feature.id}
              className="group bg-white rounded-xl p-4 text-center shadow-sm border border-slate-100 hover:shadow-md transition-all duration-300 hover:-translate-y-1 cursor-pointer"
            >
              <div className={`w-12 h-12 rounded-full ${feature.bg} flex items-center justify-center mx-auto mb-3 group-hover:scale-110 transition`}>
                <feature.icon className={`w-6 h-6 ${feature.color}`} />
              </div>
              <h3 className="font-semibold text-slate-800 text-sm">{feature.title}</h3>
              <p className="text-xs text-slate-400 mt-1">{feature.description}</p>
            </div>
          ))}
        </div>

        {/* Services Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-16">
          {services.map((service) => (
            <div
              key={service.id}
              className="group bg-white rounded-2xl overflow-hidden shadow-md hover:shadow-xl transition-all duration-500 hover:-translate-y-1 border border-slate-100 relative"
            >
              <div className={`absolute top-4 right-4 z-10 ${service.badgeColor} text-xs font-semibold px-2.5 py-1 rounded-full shadow-sm`}>
                {service.badge}
              </div>
              
              <div className="flex flex-col md:flex-row">
                <div className="md:w-2/5 relative overflow-hidden">
                  <img
                    src={service.image}
                    alt={service.title}
                    className="w-full h-48 md:h-full object-cover group-hover:scale-110 transition-transform duration-700"
                  />
                </div>

                <div className="md:w-3/5 p-6">
                  <h3 className="text-xl font-bold text-[#013A63] mb-2 group-hover:text-[#00A99D] transition">
                    {service.title}
                  </h3>
                  <p className="text-slate-500 text-sm leading-relaxed mb-4">
                    {service.description}
                  </p>
                  
                  <div className="flex flex-wrap gap-2 mb-4">
                    {service.features.map((feature, idx) => (
                      <span
                        key={idx}
                        className="text-xs px-2 py-1 rounded-full bg-slate-100 text-slate-600 group-hover:bg-[#00A99D]/10 transition"
                      >
                        {feature}
                      </span>
                    ))}
                  </div>

                  <Link
                    href="#"
                    className="inline-flex items-center gap-2 text-[#00A99D] font-semibold text-sm group/link hover:gap-3 transition-all"
                  >
                    Learn More
                    <ArrowRight className="w-4 h-4 group-hover/link:translate-x-1 transition" />
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Reviews Section */}
        <div className="mb-16">
          {/* Reviews Header */}
          <div className="text-center mb-8">
            <div className="inline-flex items-center gap-2 bg-yellow-50 px-4 py-1.5 rounded-full mb-3">
              <Star className="w-4 h-4 text-yellow-500 fill-yellow-500" />
              <span className="text-yellow-700 font-semibold text-sm">Patient Stories</span>
            </div>
            <h3 className="text-2xl md:text-3xl font-bold text-[#013A63]">What Our Patients Say</h3>
          </div>

          {/* Reviews Grid - 4 cards in one row with profile images */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {reviews.map((review) => (
              <div
                key={review.id}
                className="bg-white rounded-xl p-5 shadow-sm border border-slate-100 hover:shadow-md transition-all duration-300 text-center"
              >
                {/* Profile Image */}
                <div className="w-16 h-16 rounded-full bg-gradient-to-br from-[#00A99D] to-[#013A63] flex items-center justify-center mx-auto mb-3 overflow-hidden">
                  <img 
                    src={review.image} 
                    alt={review.name} 
                    className="w-full h-full object-cover"
                  />
                </div>
                
                {/* Name */}
                <h4 className="font-bold text-[#013A63]">{review.name}</h4>
                
                {/* Role */}
                <p className="text-xs text-slate-400 mt-0.5 mb-2">{review.role}</p>
                
                {/* Stars */}
                <div className="flex justify-center gap-0.5 mb-3">
                  {[...Array(5)].map((_, i) => (
                    <Star
                      key={i}
                      className={`w-4 h-4 ${i < review.rating ? 'fill-yellow-500 text-yellow-500' : 'text-slate-200'}`}
                    />
                  ))}
                </div>
                
                {/* Review Text */}
                <p className="text-slate-600 text-sm leading-relaxed italic">
                  "{review.review}"
                </p>
              </div>
            ))}
          </div>
          
          {/* View All Reviews Button */}
          <div className="text-center mt-6">
            <button className="text-[#00A99D] font-semibold text-sm hover:underline inline-flex items-center gap-1">
              Read all reviews
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>

        {/* View All Services Button */}
        <div className="text-center">
          <button className="px-8 py-3 bg-gradient-to-r from-[#00A99D] to-[#009488] text-white rounded-xl font-semibold hover:shadow-lg transition-all hover:-translate-y-0.5">
            View All Services
          </button>
        </div>
      </div>
    </section>
  );
}