"use client";

import { Star, Clock, ChevronRight, Heart, Users, Briefcase, Trophy, ChevronLeft, ChevronRight as ChevronRightIcon, Crown } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";

export default function AboutTeam() {
  const [currentIndex, setCurrentIndex] = useState(0);
  
  const leaders = [
    { 
      name: "Dr. Shruthika Reddy", 
      position: "CHIEF MEDICAL OFFICER", 
      shortPos: "CMO",
      expertise: "Cardiology & Heart Care",
      rating: "4.9",
      experience: "15+ years",
      contribution: "Led 10,000+ surgeries",
      quote: "Every heartbeat matters",
      image: "https://images.unsplash.com/photo-1559839734-2b71ea197ec2?w=400&h=400&fit=crop"
    },
    { 
      name: "Dr. Rajesh Kumar", 
      position: "HEAD OF RESEARCH", 
      shortPos: "HOR",
      expertise: "Neurology & Brain Sciences",
      rating: "4.8",
      experience: "18+ years",
      contribution: "Published 50+ papers",
      quote: "Innovation saves lives",
      image: "https://images.unsplash.com/photo-1612349317150-e413f6a5b16d?w=400&h=400&fit=crop"
    },
    { 
      name: "Ms. Priya Mehta", 
      position: "DIRECTOR OF OPERATIONS", 
      shortPos: "DOO",
      expertise: "Healthcare Management",
      rating: "4.8",
      experience: "12+ years",
      contribution: "Expanded to 15+ cities",
      quote: "Excellence in execution",
      image: "https://images.unsplash.com/photo-1594824476967-48c8b964273f?w=400&h=400&fit=crop"
    }
  ];

  const moreExperts = [
    { name: "Dr. Anil Mehta", role: "Senior Cardiologist", experience: "12+ years", rating: "4.8", image: "https://images.unsplash.com/photo-1622253692010-333f2da6031d?w=300&h=300&fit=crop" },
    { name: "Dr. Sneha Rao", role: "Pediatrician", experience: "8+ years", rating: "4.7", image: "https://images.unsplash.com/photo-1594824476967-48c8b964273f?w=300&h=300&fit=crop" },
    { name: "Dr. Vikram Singh", role: "Orthopedic Surgeon", experience: "15+ years", rating: "4.9", image: "https://images.unsplash.com/photo-1612349317150-e413f6a5b16d?w=300&h=300&fit=crop" },
  ];

  const nextSlide = () => {
    setCurrentIndex((prev) => (prev + 1) % moreExperts.length);
  };

  const prevSlide = () => {
    setCurrentIndex((prev) => (prev - 1 + moreExperts.length) % moreExperts.length);
  };

  const getVisibleCards = () => {
    const cards = [];
    for (let i = 0; i < 3; i++) {
      const index = (currentIndex + i) % moreExperts.length;
      cards.push(moreExperts[index]);
    }
    return cards;
  };

  return (
    <section className="py-12 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* HEADER */}
        <div className="text-center mb-12">
          <div className="inline-flex items-center gap-2 bg-teal-50 px-4 py-1.5 rounded-full mb-4">
            <Heart className="w-4 h-4 text-teal-600" />
            <span className="text-teal-600 text-xs font-semibold tracking-wide">THE HEART OF EASHAOP</span>
          </div>
          <h2 className="text-3xl md:text-4xl font-bold text-slate-800">
            Meet the <span className="text-teal-600">Visionaries</span> Behind Our Success
          </h2>
          <div className="flex justify-center gap-2 mt-4">
            <div className="w-16 h-0.5 rounded-full bg-teal-500"></div>
            <div className="w-3 h-0.5 rounded-full bg-teal-300"></div>
          </div>
        </div>

        {/* LEADERSHIP CARDS */}
        <div className="grid md:grid-cols-3 gap-6 mb-10">
          {leaders.map((leader, idx) => (
            <div key={idx} className="bg-white rounded-xl overflow-hidden shadow-md hover:shadow-xl transition-all duration-300 border border-slate-100">
              <div className="h-56 overflow-hidden">
                <Image 
                  src={leader.image} 
                  alt={leader.name} 
                  width={400}
                  height={400}
                  className="w-full h-full object-cover"
                  unoptimized
                />
              </div>
              <div className="p-5">
                <div className="flex items-center justify-between mb-3">
                  <span className="bg-teal-100 text-teal-700 text-xs font-bold px-3 py-1 rounded-full">{leader.shortPos}</span>
                  <div className="flex items-center gap-1">
                    <Star className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
                    <span className="text-sm font-bold text-slate-700">{leader.rating}</span>
                  </div>
                </div>
                <h3 className="font-bold text-slate-800 text-lg mb-1">{leader.name}</h3>
                <p className="text-teal-600 text-xs font-semibold uppercase mb-2">{leader.position}</p>
                <p className="text-amber-600 text-xs italic mb-3">&quot;{leader.quote}&quot;</p>
                <div className="space-y-2 mb-5">
                  <div className="flex items-center gap-2"><Briefcase className="w-4 h-4 text-teal-500"/><span className="text-sm text-slate-600">{leader.expertise}</span></div>
                  <div className="flex items-center gap-2"><Clock className="w-4 h-4 text-teal-500"/><span className="text-sm text-slate-600">{leader.experience}</span></div>
                  <div className="flex items-center gap-2"><Trophy className="w-4 h-4 text-teal-500"/><span className="text-sm text-slate-600">{leader.contribution}</span></div>
                </div>
                <Link href="/login" className="flex items-center justify-center gap-1 w-full py-2.5 bg-teal-600 text-white rounded-lg text-sm font-semibold hover:bg-teal-700 transition">
                  View Profile <ChevronRight className="w-4 h-4" />
                </Link>
              </div>
            </div>
          ))}
        </div>

        {/* MEET MORE EXPERTS */}
        <div>
          <div className="text-center mb-10">
            <div className="inline-flex items-center gap-2 bg-teal-50 px-4 py-1.5 rounded-full mb-3">
              <Users className="w-4 h-4 text-teal-600" />
              <span className="text-teal-600 text-xs font-semibold tracking-wide">MEET MORE EXPERTS</span>
            </div>
            <h3 className="text-2xl font-bold text-slate-800">Our Specialist Doctors</h3>
            <p className="text-slate-500 text-sm mt-1">World-class medical professionals across various specialties</p>
          </div>
          
          <div className="relative">
            {/* Previous Button */}
            <button 
              onClick={prevSlide}
              className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-4 z-10 w-10 h-10 rounded-full bg-white shadow-lg border border-slate-200 flex items-center justify-center hover:bg-teal-500 hover:text-white hover:border-teal-500 transition-all duration-300 group"
            >
              <ChevronLeft className="w-5 h-5 text-slate-600 group-hover:text-white transition-colors" />
            </button>
            
            <div className="grid md:grid-cols-3 gap-6 px-6">
              {getVisibleCards().map((doctor, idx) => (
                <div key={idx} className="bg-white rounded-xl overflow-hidden shadow-md hover:shadow-xl transition-all duration-300 border border-slate-100">
                  <div className="h-48 overflow-hidden">
                    <Image 
                      src={doctor.image} 
                      alt={doctor.name} 
                      width={300}
                      height={300}
                      className="w-full h-full object-cover"
                      unoptimized
                    />
                  </div>
                  <div className="p-4">
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-teal-600 text-xs font-bold">{doctor.role}</span>
                      <div className="flex items-center gap-1">
                        <Star className="w-3 h-3 fill-amber-400 text-amber-400" />
                        <span className="text-xs font-bold text-slate-700">{doctor.rating}</span>
                      </div>
                    </div>
                    <h4 className="font-bold text-slate-800 text-base mb-2">{doctor.name}</h4>
                    <div className="flex items-center gap-2 mb-3">
                      <Clock className="w-4 h-4 text-teal-500" />
                      <span className="text-sm text-slate-500">{doctor.experience}</span>
                    </div>
                    <Link href="/login" className="inline-flex items-center gap-1 text-teal-600 text-sm font-medium hover:gap-2 transition-all">
                      View Profile <ChevronRight className="w-4 h-4" />
                    </Link>
                  </div>
                </div>
              ))}
            </div>
            
            {/* Next Button */}
            <button 
              onClick={nextSlide}
              className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-4 z-10 w-10 h-10 rounded-full bg-white shadow-lg border border-slate-200 flex items-center justify-center hover:bg-teal-500 hover:text-white hover:border-teal-500 transition-all duration-300 group"
            >
              <ChevronRightIcon className="w-5 h-5 text-slate-600 group-hover:text-white transition-colors" />
            </button>
          </div>
          
          {/* DOTS COMPLETELY REMOVED */}
          
        </div>
      </div>
    </section>
  );
}