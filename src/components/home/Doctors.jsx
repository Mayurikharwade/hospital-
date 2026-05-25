"use client";

import { useState } from "react";
import { Search, MapPin, Star, Briefcase, Calendar, Phone } from "lucide-react";

const doctorsList = [
  {
    id: 1,
    name: "Dr. Shruthika Reddy",
    specialist: "Cardiologist",
    experience: "12+ years",
    location: "Hyderabad",
    rating: 4.9,
    patients: "2,500+",
    image: "https://randomuser.me/api/portraits/women/68.jpg",
    education: "MBBS, MD (Cardiology)",
  },
  {
    id: 2,
    name: "Dr. Rajesh Kumar",
    specialist: "Neurologist",
    experience: "15+ years",
    location: "Hyderabad",
    rating: 4.8,
    patients: "3,200+",
    image: "https://randomuser.me/api/portraits/men/32.jpg",
    education: "MBBS, DM (Neurology)",
  },
  {
    id: 3,
    name: "Dr. Priya Sharma",
    specialist: "Dermatologist",
    experience: "8+ years",
    location: "Mumbai",
    rating: 4.7,
    patients: "1,800+",
    image: "https://randomuser.me/api/portraits/women/45.jpg",
    education: "MBBS, DDVL",
  },
  {
    id: 4,
    name: "Dr. Suresh Babu",
    specialist: "Orthopedic",
    experience: "18+ years",
    location: "Chennai",
    rating: 4.9,
    patients: "4,100+",
    image: "https://randomuser.me/api/portraits/men/45.jpg",
    education: "MBBS, MS (Ortho)",
  },
  {
    id: 5,
    name: "Dr. Anjali Mehta",
    specialist: "Pediatrician",
    experience: "10+ years",
    location: "Bangalore",
    rating: 4.8,
    patients: "3,500+",
    image: "https://randomuser.me/api/portraits/women/52.jpg",
    education: "MBBS, MD (Pediatrics)",
  },
  {
    id: 6,
    name: "Dr. Vikram Singh",
    specialist: "Gastroenterologist",
    experience: "14+ years",
    location: "Delhi",
    rating: 4.7,
    patients: "2,900+",
    image: "https://randomuser.me/api/portraits/men/67.jpg",
    education: "MBBS, DM (Gastro)",
  },
  {
    id: 7,
    name: "Dr. Kavita Nair",
    specialist: "Gynecologist",
    experience: "11+ years",
    location: "Hyderabad",
    rating: 4.9,
    patients: "3,800+",
    image: "https://randomuser.me/api/portraits/women/28.jpg",
    education: "MBBS, MD (OBG)",
  },
];

const specialties = [
  "All Doctors",
  "Cardiologist",
  "Neurologist",
  "Dermatologist",
  "Orthopedic",
  "Pediatrician",
  "Gastroenterologist",
  "Gynecologist",
];

const locations = ["All Locations", "Hyderabad", "Mumbai", "Chennai", "Bangalore", "Delhi"];

export default function Doctors() {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedSpecialty, setSelectedSpecialty] = useState("All Doctors");
  const [selectedLocation, setSelectedLocation] = useState("All Locations");

  const filteredDoctors = doctorsList.filter((doctor) => {
    const matchesSearch = doctor.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          doctor.specialist.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesSpecialty = selectedSpecialty === "All Doctors" || doctor.specialist === selectedSpecialty;
    const matchesLocation = selectedLocation === "All Locations" || doctor.location === selectedLocation;
    return matchesSearch && matchesSpecialty && matchesLocation;
  });

  return (
    <section className="py-20 bg-[#f8fafc]">
      <div className="max-w-7xl mx-auto px-6">

        {/* Header */}
        <div className="text-center mb-10">
          <span className="text-[#00A99D] font-semibold text-sm uppercase tracking-wide">Our Team</span>
          <h2 className="text-4xl font-bold text-[#013A63] mt-2 mb-4">
            Meet Our Expert Doctors
          </h2>
          <p className="text-slate-600 max-w-2xl mx-auto">
            Consult with experienced specialists across multiple departments
          </p>
        </div>

        {/* Search & Filters */}
        <div className="bg-white rounded-2xl p-6 shadow-sm border border-slate-200 mb-10">
          <div className="grid md:grid-cols-3 gap-4">
            {/* Search Input */}
            <div className="relative">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
              <input
                type="text"
                placeholder="Search doctors by name or specialty..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-12 pr-4 py-3 rounded-xl border border-slate-200 focus:outline-none focus:border-[#00A99D] focus:ring-2 focus:ring-[#00A99D]/20"
              />
            </div>

            {/* Location Filter */}
            <div className="relative">
              <MapPin className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
              <select
                value={selectedLocation}
                onChange={(e) => setSelectedLocation(e.target.value)}
                className="w-full pl-12 pr-4 py-3 rounded-xl border border-slate-200 focus:outline-none focus:border-[#00A99D] focus:ring-2 focus:ring-[#00A99D]/20 appearance-none bg-white"
              >
                {locations.map((loc) => (
                  <option key={loc} value={loc}>{loc}</option>
                ))}
              </select>
            </div>

            {/* Category/Specialty Filter */}
            <div className="relative">
              <Briefcase className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
              <select
                value={selectedSpecialty}
                onChange={(e) => setSelectedSpecialty(e.target.value)}
                className="w-full pl-12 pr-4 py-3 rounded-xl border border-slate-200 focus:outline-none focus:border-[#00A99D] focus:ring-2 focus:ring-[#00A99D]/20 appearance-none bg-white"
              >
                {specialties.map((spec) => (
                  <option key={spec} value={spec}>{spec}</option>
                ))}
              </select>
            </div>
          </div>
        </div>

        {/* Specialty Chips */}
        <div className="flex flex-wrap gap-2 justify-center mb-10">
          {specialties.map((spec) => (
            <button
              key={spec}
              onClick={() => setSelectedSpecialty(spec)}
              className={`px-4 py-2 rounded-full text-sm font-medium transition-all ${
                selectedSpecialty === spec
                  ? "bg-[#00A99D] text-white shadow-md"
                  : "bg-white text-slate-600 hover:bg-[#00A99D]/10 border border-slate-200"
              }`}
            >
              {spec === "All Doctors" ? "👨‍⚕️ " : "🩺 "}{spec}
            </button>
          ))}
        </div>

        {/* Doctors Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredDoctors.map((doctor) => (
            <div
              key={doctor.id}
              className="bg-white rounded-2xl overflow-hidden border border-slate-200 shadow-sm hover:shadow-xl transition-all hover:-translate-y-1 group"
            >
              {/* Doctor Image */}
              <div className="h-64 relative overflow-hidden bg-gradient-to-br from-[#013A63] to-[#00A99D]">
                <img
                  src={doctor.image}
                  alt={doctor.name}
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                />
                {/* Overlay Gradient */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent"></div>
                
                {/* Rating Badge */}
                <div className="absolute top-4 right-4 bg-white/90 backdrop-blur px-2 py-1 rounded-full flex items-center gap-1 shadow-md">
                  <Star className="w-3 h-3 fill-yellow-500 text-yellow-500" />
                  <span className="text-xs font-semibold text-slate-700">{doctor.rating}</span>
                </div>

                {/* Specialist Badge */}
                <div className="absolute bottom-4 left-4 bg-[#00A99D] text-white px-3 py-1 rounded-full text-xs font-semibold">
                  {doctor.specialist}
                </div>
              </div>

              {/* Doctor Details */}
              <div className="p-5">
                <h3 className="text-xl font-bold text-[#013A63] mb-1">
                  {doctor.name}
                </h3>
                <p className="text-[#00A99D] font-medium text-sm mb-3">
                  {doctor.education}
                </p>

                <div className="space-y-2 mb-4">
                  <div className="flex items-center gap-2 text-sm text-slate-500">
                    <Briefcase className="w-4 h-4 text-[#00A99D]" />
                    <span>{doctor.experience} experience</span>
                  </div>
                  <div className="flex items-center gap-2 text-sm text-slate-500">
                    <MapPin className="w-4 h-4 text-[#00A99D]" />
                    <span>{doctor.location}</span>
                  </div>
                  <div className="flex items-center gap-2 text-sm text-slate-500">
                    <Calendar className="w-4 h-4 text-[#00A99D]" />
                    <span>{doctor.patients} patients treated</span>
                  </div>
                </div>

                <div className="flex gap-3">
                  <button className="flex-1 h-11 rounded-xl bg-[#00A99D] text-white font-semibold hover:bg-[#009488] transition-all">
                    Book Now
                  </button>
                  <button className="w-11 h-11 rounded-xl border border-slate-200 text-slate-500 hover:bg-[#00A99D]/10 hover:border-[#00A99D] transition-all flex items-center justify-center">
                    <Phone className="w-5 h-5" />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

        {filteredDoctors.length === 0 && (
          <div className="text-center py-12">
            <p className="text-slate-500">No doctors found matching your criteria.</p>
          </div>
        )}

      </div>
    </section>
  );
}