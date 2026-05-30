"use client";

import React, { useState, useEffect, useRef } from "react";
import { 
  Search, MapPin, Briefcase, ChevronDown, 
  Heart, Brain, Sparkles, Bone, Baby, Activity, HeartPulse, Stethoscope 
} from "lucide-react";

// --- CUSTOM DROPDOWN COMPONENT (For perfect CSS matching your 2nd image) ---
const CustomDropdown = ({ options, value, onChange, icon: Icon, placeholder }) => {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef(null);

  // Bahar click karne par dropdown band karne ke liye
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <div className="relative group w-full" ref={dropdownRef}>
      {/* Dropdown Trigger Box (Rounded Full) */}
      <div 
        onClick={() => setIsOpen(!isOpen)}
        className={`w-full flex items-center pl-12 pr-5 py-3.5 bg-white border ${isOpen ? 'border-[#00A99D] ring-2 ring-[#00A99D]/20' : 'border-slate-200'} rounded-full text-sm text-slate-600 shadow-sm cursor-pointer hover:border-[#00A99D]/50 transition-all`}
      >
        <Icon className={`absolute left-5 w-5 h-5 transition-colors ${isOpen ? 'text-[#00A99D]' : 'text-slate-400 group-hover:text-[#00A99D]'}`} />
        <span className="truncate flex-1 text-left select-none">{value || placeholder}</span>
        <ChevronDown className={`w-4 h-4 text-slate-400 transition-transform duration-300 ${isOpen ? 'rotate-180 text-[#00A99D]' : ''}`} />
      </div>

      {/* Dropdown Menu (With Teal CSS exactly like your screenshot) */}
      {isOpen && (
        <div className="absolute z-50 w-full mt-2 bg-white border border-slate-100 rounded-2xl shadow-xl py-2 overflow-hidden animate-in fade-in slide-in-from-top-2">
          <div className="max-h-60 overflow-y-auto">
            {options.map((option) => (
              <div
                key={option}
                onClick={() => {
                  onChange(option);
                  setIsOpen(false);
                }}
                className={`px-5 py-3 text-sm cursor-pointer transition-colors ${
                  value === option 
                    ? 'bg-[#00A99D]/10 text-[#00A99D] font-semibold' // Teal active state
                    : 'text-slate-600 hover:bg-slate-50' // Soft gray hover
                }`}
              >
                {option}
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};


export default function DoctorsFilters({ 
  searchTerm, 
  setSearchTerm, 
  selectedLocation, 
  setSelectedLocation, 
  selectedSpecialty, 
  setSelectedSpecialty, 
  locations = ["All Locations", "Hyderabad", "Mumbai", "Chennai", "Bangalore", "Delhi", "Kolkata", "Pune"], 
  specialties = ["All Specialties", "Cardiologist", "Neurologist", "Dermatologist", "Orthopedic", "Pediatrician", "Gastroenterologist", "Gynecologist"] 
}) {

  const getSpecialistIcon = (spec) => {
    switch(spec) {
      case "All Specialties": return <Stethoscope className="w-4 h-4" />;
      case "Cardiologist": return <Heart className="w-4 h-4" />;
      case "Neurologist": return <Brain className="w-4 h-4" />;
      case "Dermatologist": return <Sparkles className="w-4 h-4" />;
      case "Orthopedic": return <Bone className="w-4 h-4" />;
      case "Pediatrician": return <Baby className="w-4 h-4" />;
      case "Gastroenterologist": return <Activity className="w-4 h-4" />;
      case "Gynecologist": return <HeartPulse className="w-4 h-4" />;
      default: return <Stethoscope className="w-4 h-4" />;
    }
  };

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 mt-16 mb-8">
      
      {/* Heading Section */}
      <div className="text-center mb-10">
        <div className="inline-flex items-center gap-2 bg-[#00A99D]/10 border border-[#00A99D]/20 px-4 py-1.5 rounded-full mb-4">
          <Heart className="w-4 h-4 text-[#00A99D]" />
          <span className="text-[#00A99D] font-semibold text-sm uppercase tracking-wider">Our Team</span>
        </div>
        <h2 className="text-3xl md:text-5xl font-bold text-[#013A63] mt-2 mb-4">
          Our Esteemed Specialists
        </h2>
        <p className="text-slate-500 max-w-2xl mx-auto text-base">
          Browse profiles and book a consultation with our experienced medical professionals.
        </p>
      </div>

      {/* Inputs & Filters Grid 
          Changed grid logic to reduce search width (1.5fr) and balance dropdowns (1fr) 
      */}
      <div className="grid grid-cols-1 lg:grid-cols-[1.5fr_1fr_1fr] gap-4 mb-8 max-w-5xl mx-auto">
        
        {/* Search Input (Rounded Full to match dropdowns) */}
        <div className="relative group w-full">
          <Search className="absolute left-5 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400 group-focus-within:text-[#00A99D] transition-colors" />
          <input 
            type="text" 
            placeholder="Search doctors by name or specialty..." 
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-12 pr-5 py-3.5 bg-white border border-slate-200 rounded-full text-sm shadow-sm focus:outline-none focus:ring-2 focus:ring-[#00A99D]/20 focus:border-[#00A99D] transition-all"
          />
        </div>

        {/* Location Custom Dropdown */}
        <CustomDropdown 
          icon={MapPin} 
          options={locations} 
          value={selectedLocation} 
          onChange={setSelectedLocation} 
          placeholder="All Locations"
        />

        {/* Specialty Custom Dropdown */}
        <CustomDropdown 
          icon={Briefcase} 
          options={specialties} 
          value={selectedSpecialty} 
          onChange={setSelectedSpecialty} 
          placeholder="All Specialties"
        />
      </div>

      {/* Specialty Pills (Buttons) */}
      <div className="flex flex-wrap items-center justify-center gap-3">
        {specialties.map((spec) => (
          <button
            key={spec}
            onClick={() => setSelectedSpecialty(spec)}
            className={`px-5 py-2.5 rounded-full text-sm font-medium flex items-center gap-2 transition-all duration-300 ${
              selectedSpecialty === spec
                ? "bg-[#00A99D] text-white shadow-lg shadow-[#00A99D]/30 scale-105" 
                : "bg-white text-slate-600 border border-slate-200 hover:border-[#00A99D]/40 hover:bg-[#00A99D]/5"
            }`}
          >
            {getSpecialistIcon(spec)}
            {spec}
          </button>
        ))}
      </div>
    </div>
  );
}