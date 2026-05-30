"use client";

import React, { useState } from 'react';
import { X, Star, Briefcase, MapPin, Activity, Clock, Calendar, User } from 'lucide-react';

export default function DoctorModal({ isOpen, doctorData, onClose, onBook }) {
  const [imageError, setImageError] = useState(false);

  if (!isOpen || !doctorData) return null;

  return (
    <div 
      className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 flex items-center justify-center p-4 animate-in fade-in duration-200" 
      onClick={onClose}
    >
      <div 
        className="bg-white rounded-2xl max-w-md w-full max-h-[90vh] overflow-y-auto animate-in zoom-in-95 duration-300 shadow-2xl" 
        onClick={(e) => e.stopPropagation()}
      >
        
        {/* Header Banner */}
        <div className="relative h-44 bg-gradient-to-r from-[#013A63] to-[#00A99D] rounded-t-2xl">
          <div className="absolute -bottom-12 left-6">
            <div className="w-24 h-24 rounded-full border-4 border-white bg-white overflow-hidden shadow-xl relative z-10">
              {!imageError ? (
                <img 
                  src={doctorData.image} 
                  alt={doctorData.name} 
                  className="w-full h-full object-cover object-top"
                  onError={() => setImageError(true)}
                />
              ) : (
                <div className="w-full h-full flex items-center justify-center bg-slate-100">
                  <User className="w-10 h-10 text-slate-400" />
                </div>
              )}
            </div>
          </div>
          <button 
            onClick={onClose} 
            className="absolute top-4 right-4 bg-white/20 backdrop-blur-md rounded-full p-2 text-white hover:bg-white/30 transition-all"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content */}
        <div className="pt-16 px-6 pb-6">
          <h3 className="text-2xl font-bold text-[#013A63]">{doctorData.name}</h3>
          
          <div className="flex items-center gap-2 mt-1">
            <span className="text-[#00A99D] font-medium text-sm">{doctorData.specialist}</span>
            <span className="text-slate-300">•</span>
            <div className="flex items-center gap-1">
              <Star className="w-3.5 h-3.5 fill-yellow-500 text-yellow-500" />
              <span className="text-sm font-semibold text-slate-700">{doctorData.rating}</span>
            </div>
          </div>
          
          <p className="text-slate-500 text-sm mt-1 mb-5">{doctorData.education}</p>
          
          <div className="space-y-3 bg-slate-50 rounded-xl p-4 border border-slate-100">
            <div className="flex items-center gap-3 text-sm text-slate-600"><Briefcase className="w-4 h-4 text-[#00A99D]" /> {doctorData.experience} of experience</div>
            <div className="flex items-center gap-3 text-sm text-slate-600"><MapPin className="w-4 h-4 text-[#00A99D]" /> {doctorData.location}</div>
            <div className="flex items-center gap-3 text-sm text-slate-600"><Activity className="w-4 h-4 text-[#00A99D]" /> {doctorData.patients} happy patients</div>
            <div className="flex items-center gap-3 text-sm text-slate-600"><Clock className="w-4 h-4 text-[#00A99D]" /> Available: {doctorData.availability}</div>
            <div className="flex items-center gap-3 text-sm text-slate-600"><Calendar className="w-4 h-4 text-[#00A99D]" /> Consultation: {doctorData.fees}</div>
          </div>
          
          <div className="mt-5 bg-white border border-slate-100 p-4 rounded-xl shadow-sm">
            <p className="text-xs text-slate-400 font-bold uppercase tracking-wide mb-2">About the Doctor</p>
            <p className="text-sm text-slate-600 leading-relaxed">{doctorData.bio}</p>
          </div>
          
          <div className="flex gap-3 mt-6">
            <button 
              onClick={() => { onBook(doctorData); onClose(); }} 
              className="flex-1 h-12 rounded-xl bg-gradient-to-r from-[#00A99D] to-[#009488] text-white font-semibold flex items-center justify-center gap-2 hover:shadow-lg transition-all"
            >
              <Calendar className="w-4 h-4" /> Book Appointment
            </button>
            <button 
              onClick={onClose} 
              className="flex-1 h-12 rounded-xl border-2 border-slate-200 text-slate-600 font-semibold hover:bg-slate-50 transition-all"
            >
              Close
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}