"use client";

import React, { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { MapPin, Star, Briefcase, Calendar, Eye, Clock, Activity, User, Heart, Brain, Bone, Baby, Stethoscope } from "lucide-react";

export default function DoctorsGrid({ doctors, onViewDetails, onBookAppointment }) {
  const [imageErrors, setImageErrors] = useState({});

  const getSpecialistColor = (specialist) => {
    switch(specialist) {
      case "Cardiologist": return "from-rose-500 to-red-500";
      case "Neurologist": return "from-indigo-500 to-purple-500";
      case "Dermatologist": return "from-pink-500 to-rose-500";
      case "Orthopedic": return "from-emerald-500 to-teal-500";
      case "Pediatrician": return "from-sky-500 to-blue-500";
      case "Gastroenterologist": return "from-amber-500 to-orange-500";
      case "Gynecologist": return "from-fuchsia-500 to-pink-500";
      default: return "from-[#00A99D] to-teal-500";
    }
  };

  const getSpecialistIcon = (specialist) => {
    switch(specialist) {
      case "Cardiologist": return <Heart className="w-3.5 h-3.5" />;
      case "Neurologist": return <Brain className="w-3.5 h-3.5" />;
      case "Orthopedic": return <Bone className="w-3.5 h-3.5" />;
      case "Pediatrician": return <Baby className="w-3.5 h-3.5" />;
      default: return <Stethoscope className="w-3.5 h-3.5" />;
    }
  };

  if (!doctors || doctors.length === 0) {
    return (
      <div className="text-center py-16">
        <div className="bg-white rounded-2xl p-10 max-w-md mx-auto border border-slate-200 shadow-lg">
          <h3 className="text-xl font-semibold text-slate-700 mb-2">No doctors found</h3>
          <p className="text-slate-500 mb-4">No doctors match your current filters.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="mt-0 mb-16 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      
      {/* Doctors Grid */}
      <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {doctors.map((doctor) => (
          <div key={doctor.id} className="group flex flex-col bg-white rounded-2xl overflow-hidden shadow-md hover:shadow-xl transition-all duration-500 hover:-translate-y-1 border border-slate-100">
            
            {/* Image Section */}
            <div className="relative h-56 overflow-hidden flex-shrink-0">
              <div className={`absolute inset-0 bg-gradient-to-br ${getSpecialistColor(doctor.specialist)} opacity-0 group-hover:opacity-20 transition-opacity duration-500 z-10`}></div>
              {!imageErrors[doctor.id] ? (
                <Image
                  src={doctor.image}
                  alt={doctor.name}
                  width={400}
                  height={400}
                  className="w-full h-full object-cover object-top group-hover:scale-105 transition-transform duration-700"
                  unoptimized
                  onError={() => setImageErrors(prev => ({ ...prev, [doctor.id]: true }))}
                />
              ) : (
                <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-[#013A63]/10 to-[#00A99D]/10">
                  <User className="w-20 h-20 text-[#00A99D]/40" />
                </div>
              )}
              
              <div className="absolute top-3 right-3 bg-white/95 backdrop-blur-md px-2.5 py-1 rounded-full flex items-center gap-1 shadow-md z-20">
                <Star className="w-3.5 h-3.5 fill-yellow-500 text-yellow-500" />
                <span className="text-xs font-bold text-slate-700">{doctor.rating}</span>
              </div>

              <div className="absolute bottom-3 left-3 bg-white/95 backdrop-blur-md text-[#013A63] px-3 py-1 rounded-full text-xs font-semibold flex items-center gap-1.5 shadow-md z-20">
                {getSpecialistIcon(doctor.specialist)}
                <span>{doctor.specialist}</span>
              </div>
            </div>

            {/* Details Section */}
            <div className="p-5 flex flex-col flex-grow">
              <h3 className="text-lg font-bold text-[#013A63] mb-1 line-clamp-1">{doctor.name}</h3>
              <p className="text-[#00A99D] font-medium text-xs mb-4">{doctor.education?.split(",")[0] || 'MBBS'}</p>

              <div className="space-y-2.5 mb-6">
                <div className="flex items-center gap-2 text-xs text-slate-500">
                  <Briefcase className="w-4 h-4 text-[#00A99D]" />
                  <span>{doctor.experience} exp.</span>
                </div>
                <div className="flex items-center gap-2 text-xs text-slate-500">
                  <MapPin className="w-4 h-4 text-[#00A99D]" />
                  <span>{doctor.location}</span>
                </div>
                <div className="flex items-center gap-2 text-xs text-slate-500">
                  <Activity className="w-4 h-4 text-[#00A99D]" />
                  <span>{doctor.patients} patients</span>
                </div>
                <div className="flex items-center gap-2 text-xs text-slate-500">
                  <Clock className="w-4 h-4 text-[#00A99D]" />
                  <span>{doctor.availability}</span>
                </div>
              </div>

              {/* Action Buttons - Redirect to Login */}
              <div className="flex gap-2 mt-auto pt-2 border-t border-slate-50">
                <Link 
                  href="/login"
                  className="flex-1 h-10 rounded-xl bg-gradient-to-r from-[#00A99D] to-[#009488] text-white text-sm font-semibold hover:shadow-lg hover:shadow-[#00A99D]/30 transition-all flex items-center justify-center gap-1.5"
                >
                  <Calendar className="w-3.5 h-3.5" /> Book
                </Link>
                <Link 
                  href="/login"
                  className="flex-1 h-10 rounded-xl border-2 border-slate-200 text-slate-600 text-sm font-semibold hover:bg-[#00A99D]/10 hover:border-[#00A99D] hover:text-[#00A99D] transition-all flex items-center justify-center gap-1.5"
                >
                  <Eye className="w-3.5 h-3.5" /> Profile
                </Link>
              </div>
            </div>
            
          </div>
        ))}
      </div>
    </div>
  );
}