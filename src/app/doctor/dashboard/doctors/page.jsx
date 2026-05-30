"use client";

import { useState } from "react";
import Link from "next/link";
import {
  Search,
  MapPin,
  Star,
  Briefcase,
  Calendar,
  Eye,
  User,
  Stethoscope,
  Brain,
  Heart,
  Bone,
  Baby,
  Clock,
  Filter,
  X,
  Video,
  ChevronLeft,
  Award,
  Users,
  TrendingUp,
} from "lucide-react";

const doctorsList = [
  {
    id: 1,
    name: "Dr. Shruthika Reddy",
    specialist: "Cardiologist",
    experience: "12+ years",
    location: "Hyderabad",
    rating: 4.9,
    patients: "2,500+",
    image: "https://images.unsplash.com/photo-1559839734-2b71ea197ec2?w=400&h=400&fit=crop",
    availability: "Mon, Wed, Fri",
    fee: "₹800",
    available: "Today",
    achievements: "Best Cardiologist",
    nextAvailable: "Today, 10:30 AM",
  },
  {
    id: 2,
    name: "Dr. Rajesh Kumar",
    specialist: "Neurologist",
    experience: "15+ years",
    location: "Hyderabad",
    rating: 4.8,
    patients: "3,200+",
    image: "https://images.unsplash.com/photo-1612349317150-e413f6a5b16d?w=400&h=400&fit=crop",
    availability: "Tue, Thu, Sat",
    fee: "₹900",
    available: "Tomorrow",
    achievements: "Neurology Expert",
    nextAvailable: "Tomorrow, 2:00 PM",
  },
  {
    id: 3,
    name: "Dr. Priya Sharma",
    specialist: "Dermatologist",
    experience: "8+ years",
    location: "Mumbai",
    rating: 4.7,
    patients: "1,800+",
    image: "https://images.unsplash.com/photo-1594824476967-48c8b964273f?w=400&h=400&fit=crop",
    availability: "Mon, Tue, Thu",
    fee: "₹700",
    available: "Today",
    achievements: "Skin Specialist",
    nextAvailable: "Today, 3:00 PM",
  },
  {
    id: 4,
    name: "Dr. Suresh Babu",
    specialist: "Orthopedic",
    experience: "18+ years",
    location: "Chennai",
    rating: 4.9,
    patients: "4,100+",
    image: "https://images.unsplash.com/photo-1622253692010-333f2da6031d?w=400&h=400&fit=crop",
    availability: "Mon, Wed, Fri",
    fee: "₹850",
    available: "Today",
    achievements: "Joint Expert",
    nextAvailable: "Today, 11:00 AM",
  },
  {
    id: 5,
    name: "Dr. Anjali Mehta",
    specialist: "Pediatrician",
    experience: "10+ years",
    location: "Bangalore",
    rating: 4.8,
    patients: "3,500+",
    image: "https://images.unsplash.com/photo-1527613426441-4da17471b66d?w=400&h=400&fit=crop",
    availability: "Tue, Thu, Sat",
    fee: "₹650",
    available: "Tomorrow",
    achievements: "Child Expert",
    nextAvailable: "Tomorrow, 10:00 AM",
  },
  {
    id: 6,
    name: "Dr. Vikram Singh",
    specialist: "Gastroenterologist",
    experience: "14+ years",
    location: "Delhi",
    rating: 4.7,
    patients: "2,900+",
    image: "https://images.unsplash.com/photo-1537368910025-700350fe46c7?w=400&h=400&fit=crop",
    availability: "Mon, Wed, Fri",
    fee: "₹950",
    available: "Today",
    achievements: "Digestive Expert",
    nextAvailable: "Today, 4:00 PM",
  },
  {
    id: 7,
    name: "Dr. Kavita Nair",
    specialist: "Gynecologist",
    experience: "11+ years",
    location: "Hyderabad",
    rating: 4.9,
    patients: "3,800+",
    image: "https://images.unsplash.com/photo-1559839734-2b71ea197ec2?w=400&h=400&fit=crop",
    availability: "Mon, Tue, Thu, Fri",
    fee: "₹750",
    available: "Today",
    achievements: "Women's Health",
    nextAvailable: "Today, 1:00 PM",
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

export default function DoctorsPage() {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedSpecialty, setSelectedSpecialty] = useState("All Doctors");
  const [selectedLocation, setSelectedLocation] = useState("All Locations");
  const [showFilters, setShowFilters] = useState(false);

  const getSpecialistIcon = (specialist) => {
    switch(specialist) {
      case "Cardiologist": return <Heart className="w-4 h-4" />;
      case "Neurologist": return <Brain className="w-4 h-4" />;
      case "Orthopedic": return <Bone className="w-4 h-4" />;
      case "Pediatrician": return <Baby className="w-4 h-4" />;
      default: return <Stethoscope className="w-4 h-4" />;
    }
  };

  const filteredDoctors = doctorsList.filter((doctor) => {
    const matchesSearch = doctor.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          doctor.specialist.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesSpecialty = selectedSpecialty === "All Doctors" || doctor.specialist === selectedSpecialty;
    const matchesLocation = selectedLocation === "All Locations" || doctor.location === selectedLocation;
    return matchesSearch && matchesSpecialty && matchesLocation;
  });

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-teal-50/30">
      <div className="relative z-10 pt-2 px-6 lg:px-8">
        
        {/* Header */}
        <div className="mb-5">
          <div className="flex items-center gap-2 mb-0.5">
            <Heart className="w-4 h-4 text-[#00A99D]" />
            <h1 className="text-lg font-bold bg-gradient-to-r from-[#013A63] to-[#00A99D] bg-clip-text text-transparent">
              Our Expert Doctors
            </h1>
          </div>
          <p className="text-slate-500 text-sm ml-6">Choose from our team of experienced specialists</p>
        </div>

        {/* Search and Filter Row - Kam Height */}
        <div className="flex flex-col sm:flex-row gap-3 mb-5">
          <div className="flex-1 relative">
            <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
            <input
              type="text"
              placeholder="Search by name or specialty..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-2 rounded-full border border-slate-200 focus:outline-none focus:border-[#00A99D] focus:ring-1 focus:ring-[#00A99D] text-sm bg-white"
            />
          </div>
          
          <button
            onClick={() => setShowFilters(!showFilters)}
            className="flex items-center gap-2 px-4 py-2 rounded-full border border-slate-200 bg-white hover:bg-slate-50 transition text-sm font-medium text-slate-600"
          >
            <Filter className="w-4 h-4" />
            Filters
            {(selectedSpecialty !== "All Doctors" || selectedLocation !== "All Locations") && (
              <span className="w-2 h-2 bg-[#00A99D] rounded-full"></span>
            )}
          </button>
        </div>

        {/* Filter Panel */}
        {showFilters && (
          <div className="bg-white rounded-xl p-4 mb-5 border border-slate-200 shadow-sm">
            <div className="flex items-center justify-between mb-3">
              <h3 className="font-semibold text-slate-700 text-sm">Filter by Location</h3>
              <button onClick={() => setShowFilters(false)} className="text-slate-400 hover:text-slate-600">
                <X className="w-4 h-4" />
              </button>
            </div>
            <div className="flex flex-wrap gap-2">
              {locations.map((loc) => (
                <button
                  key={loc}
                  onClick={() => setSelectedLocation(loc)}
                  className={`px-3 py-1.5 rounded-full text-xs font-medium transition-all ${
                    selectedLocation === loc
                      ? "bg-[#00A99D] text-white"
                      : "bg-slate-100 text-slate-600 hover:bg-slate-200"
                  }`}
                >
                  {loc}
                </button>
              ))}
            </div>
          </div>
        )}

        {/* Specialty Chips */}
        <div className="flex flex-wrap gap-2 mb-6">
          {specialties.map((spec) => (
            <button
              key={spec}
              onClick={() => setSelectedSpecialty(spec)}
              className={`px-3 py-1.5 rounded-full text-xs font-medium transition-all ${
                selectedSpecialty === spec
                  ? "bg-[#00A99D] text-white shadow-sm"
                  : "bg-white text-slate-600 hover:bg-[#00A99D]/10 border border-slate-200"
              }`}
            >
              {spec === "All Doctors" ? "👨‍⚕️ " : "🩺 "}{spec}
            </button>
          ))}
        </div>

        {/* Doctors Grid */}
        {filteredDoctors.length === 0 ? (
          <div className="text-center py-12">
            <div className="bg-white rounded-xl p-8 max-w-md mx-auto">
              <Search className="w-12 h-12 text-slate-300 mx-auto mb-3" />
              <h3 className="text-lg font-semibold text-slate-700">No doctors found</h3>
              <p className="text-slate-500 text-sm">Try adjusting your filters</p>
            </div>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
            {filteredDoctors.map((doctor) => (
              <div
                key={doctor.id}
                className="group bg-white rounded-xl overflow-hidden shadow-sm hover:shadow-md transition-all hover:-translate-y-1 border border-slate-100"
              >
                {/* Doctor Image */}
                <div className="relative h-40 overflow-hidden">
                  <img
                    src={doctor.image}
                    alt={doctor.name}
                    className="w-full h-full object-cover object-top group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/30 via-transparent to-transparent"></div>
                  
                  <div className="absolute top-2 right-2 bg-white/90 backdrop-blur-sm px-1.5 py-0.5 rounded-full flex items-center gap-0.5 shadow-sm">
                    <Star className="w-3 h-3 fill-yellow-500 text-yellow-500" />
                    <span className="text-xs font-semibold text-slate-700">{doctor.rating}</span>
                  </div>

                  <div className={`absolute bottom-2 left-2 px-2 py-0.5 rounded-full text-xs font-semibold shadow-sm ${
                    doctor.available === "Today" ? "bg-green-500 text-white" : "bg-amber-500 text-white"
                  }`}>
                    {doctor.available}
                  </div>
                </div>

                {/* Doctor Details */}
                <div className="p-3">
                  <div className="flex items-center justify-between mb-0.5">
                    <h3 className="text-sm font-bold text-[#013A63] line-clamp-1">
                      {doctor.name}
                    </h3>
                    <span className="text-sm font-semibold text-[#00A99D]">{doctor.fee}</span>
                  </div>
                  
                  <div className="flex items-center gap-1 text-xs text-slate-500 mb-2">
                    {getSpecialistIcon(doctor.specialist)}
                    <span>{doctor.specialist}</span>
                  </div>

                  <div className="space-y-1 mb-2">
                    <div className="flex items-center gap-1.5 text-xs text-slate-500">
                      <Briefcase className="w-3 h-3 text-[#00A99D]" />
                      <span>{doctor.experience}</span>
                    </div>
                    <div className="flex items-center gap-1.5 text-xs text-slate-500">
                      <MapPin className="w-3 h-3 text-[#00A99D]" />
                      <span>{doctor.location}</span>
                    </div>
                    <div className="flex items-center gap-1.5 text-xs text-slate-500">
                      <Clock className="w-3 h-3 text-[#00A99D]" />
                      <span>{doctor.availability}</span>
                    </div>
                  </div>

                  {/* Compact Extra Features */}
                  <div className="flex flex-wrap gap-1.5 mb-2">
                    <span className="inline-flex items-center gap-1 text-[10px] px-1.5 py-0.5 rounded-full bg-green-50 text-green-600">
                      <TrendingUp className="w-2.5 h-2.5" />
                      {doctor.nextAvailable}
                    </span>
                    <span className="inline-flex items-center gap-1 text-[10px] px-1.5 py-0.5 rounded-full bg-blue-50 text-blue-600">
                      <Users className="w-2.5 h-2.5" />
                      {doctor.patients}
                    </span>
                    <span className="inline-flex items-center gap-1 text-[10px] px-1.5 py-0.5 rounded-full bg-purple-50 text-purple-600">
                      <Award className="w-2.5 h-2.5" />
                      {doctor.achievements}
                    </span>
                  </div>

                  {/* Buttons */}
                  <div className="flex gap-2">
                    <button className="flex-1 h-8 rounded-lg bg-[#00A99D] text-white text-xs font-semibold hover:bg-[#009488] transition flex items-center justify-center gap-1">
                      <Calendar className="w-3 h-3" />
                      Book Now
                    </button>
                    <button className="flex-1 h-8 rounded-lg border border-slate-200 text-slate-600 text-xs font-semibold hover:bg-[#00A99D]/10 hover:border-[#00A99D] transition flex items-center justify-center gap-1">
                      <Video className="w-3 h-3" />
                      Video
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Back to Dashboard */}
        <div className="mt-6 text-center">
          <Link 
            href="/user/dashboard" 
            className="inline-flex items-center gap-1 text-sm text-[#00A99D] font-medium hover:gap-2 transition-all"
          >
            <ChevronLeft className="w-4 h-4" />
            Back to Dashboard
          </Link>
        </div>
      </div>
    </div>
  );
}