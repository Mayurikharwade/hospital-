"use client";

import { useState, useEffect, useRef } from "react";
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
  Activity,
  X,
  Phone,
  Mail,
  Clock,
  ChevronDown
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
    image: "https://images.unsplash.com/photo-1559839734-2b71ea197ec2?w=500&h=500&fit=crop",
    education: "MBBS, MD (Cardiology)",
    bio: "Expert in interventional cardiology and preventive heart care. Specializes in complex angioplasties and heart failure management.",
    availability: "Mon, Wed, Fri",
    fees: "$80",
  },
  {
    id: 2,
    name: "Dr. Rajesh Kumar",
    specialist: "Neurologist",
    experience: "15+ years",
    location: "Hyderabad",
    rating: 4.8,
    patients: "3,200+",
    image: "https://images.unsplash.com/photo-1612349317150-e413f6a5b16d?w=500&h=500&fit=crop",
    education: "MBBS, DM (Neurology)",
    bio: "Stroke specialist and epilepsy expert. Advanced neuro-intervention and headache management.",
    availability: "Tue, Thu, Sat",
    fees: "$90",
  },
  {
    id: 3,
    name: "Dr. Priya Sharma",
    specialist: "Dermatologist",
    experience: "8+ years",
    location: "Mumbai",
    rating: 4.7,
    patients: "1,800+",
    image: "https://images.unsplash.com/photo-1594824476967-48c8b964273f?w=500&h=500&fit=crop",
    education: "MBBS, DDVL",
    bio: "Cosmetic dermatology & laser treatments. Specializes in acne, scar revision, and anti-aging therapies.",
    availability: "Mon, Tue, Thu",
    fees: "$70",
  },
  {
    id: 4,
    name: "Dr. Suresh Babu",
    specialist: "Orthopedic",
    experience: "18+ years",
    location: "Chennai",
    rating: 4.9,
    patients: "4,100+",
    image: "https://images.unsplash.com/photo-1622253692010-333f2da6031d?w=500&h=500&fit=crop",
    education: "MBBS, MS (Ortho)",
    bio: "Joint replacement & sports medicine expert. Knee and hip replacement specialist with robotic surgery expertise.",
    availability: "Mon, Wed, Fri",
    fees: "$85",
  },
  {
    id: 5,
    name: "Dr. Anjali Mehta",
    specialist: "Pediatrician",
    experience: "10+ years",
    location: "Bangalore",
    rating: 4.8,
    patients: "3,500+",
    image: "https://images.unsplash.com/photo-1527613426441-4da17471b66d?w=500&h=500&fit=crop",
    education: "MBBS, MD (Pediatrics)",
    bio: "Child wellness, vaccinations, and developmental pediatrics. Compassionate care for children of all ages.",
    availability: "Tue, Thu, Sat",
    fees: "$65",
  },
  {
    id: 6,
    name: "Dr. Vikram Singh",
    specialist: "Gastroenterologist",
    experience: "14+ years",
    location: "Delhi",
    rating: 4.7,
    patients: "2,900+",
    image: "https://i.pinimg.com/736x/01/bc/83/01bc83577f3555e523ac2df3770b67b6.jpg",
    education: "MBBS, DM (Gastro)",
    bio: "Advanced endoscopy, IBS, and liver disorder management. Expertise in therapeutic endoscopy.",
    availability: "Mon, Wed, Fri",
    fees: "$95",
  },
  {
    id: 7,
    name: "Dr. Kavita Nair",
    specialist: "Gynecologist",
    experience: "11+ years",
    location: "Hyderabad",
    rating: 4.9,
    patients: "3,800+",
    image: "https://images.unsplash.com/photo-1559839734-2b71ea197ec2?w=500&h=500&fit=crop",
    education: "MBBS, MD (OBG)",
    bio: "Women's health, obstetrics, and minimally invasive surgery. High-risk pregnancy care specialist.",
    availability: "Mon, Tue, Thu, Fri",
    fees: "$75",
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

// Custom Dropdown Component
const CustomDropdown = ({ options, value, onChange, icon: Icon, placeholder }) => {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef(null);

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
      <div 
        className="flex items-center w-full pl-4 pr-4 py-3 rounded-xl border border-slate-200 bg-white cursor-pointer hover:border-[#00A99D] transition-all focus-within:ring-2 focus-within:ring-[#00A99D]/20 shadow-sm"
        onClick={() => setIsOpen(!isOpen)}
      >
        <Icon className="w-4 h-4 text-slate-400 group-hover:text-[#00A99D] transition-colors" />
        <span className={`flex-1 ml-3 text-sm truncate ${value === placeholder ? 'text-slate-400' : 'text-slate-700'}`}>
          {value}
        </span>
        <ChevronDown className={`w-4 h-4 text-slate-400 transition-transform duration-300 ${isOpen ? 'rotate-180 text-[#00A99D]' : ''}`} />
      </div>

      {isOpen && (
        <div className="absolute z-50 w-full mt-2 bg-white border border-slate-100 rounded-xl shadow-xl py-2 animate-in fade-in slide-in-from-top-2">
          {options.map((option) => (
            <div
              key={option}
              className={`px-4 py-2.5 text-sm cursor-pointer transition-colors ${
                value === option 
                  ? 'bg-[#00A99D]/10 text-[#00A99D] font-medium border-l-2 border-[#00A99D]' 
                  : 'text-slate-600 hover:bg-slate-50 border-l-2 border-transparent'
              }`}
              onClick={() => {
                onChange(option);
                setIsOpen(false);
              }}
            >
              {option}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default function Doctors() {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedSpecialty, setSelectedSpecialty] = useState("All Doctors");
  const [selectedLocation, setSelectedLocation] = useState("All Locations");
  const [selectedDoctor, setSelectedDoctor] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [showAppointmentToast, setShowAppointmentToast] = useState(false);
  const [toastMessage, setToastMessage] = useState("");
  const [isLoading, setIsLoading] = useState(true);
  const [imageErrors, setImageErrors] = useState({});

  useEffect(() => {
    // Simulate loading
    const timer = setTimeout(() => setIsLoading(false), 800);
    return () => clearTimeout(timer);
  }, []);

  const filteredDoctors = doctorsList.filter((doctor) => {
    const matchesSearch = doctor.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          doctor.specialist.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesSpecialty = selectedSpecialty === "All Doctors" || doctor.specialist === selectedSpecialty;
    const matchesLocation = selectedLocation === "All Locations" || doctor.location === selectedLocation;
    return matchesSearch && matchesSpecialty && matchesLocation;
  });

  const handleViewDetails = (doctor) => {
    setSelectedDoctor(doctor);
    setShowModal(true);
  };

  const handleBookAppointment = (doctor) => {
    setToastMessage(`✓ Appointment request sent to ${doctor.name} (${doctor.specialist}). Our team will contact you within 24 hours.`);
    setShowAppointmentToast(true);
    setTimeout(() => setShowAppointmentToast(false), 3000);
  };

  const getSpecialistIcon = (specialist) => {
    switch(specialist) {
      case "Cardiologist": return <Heart className="w-4 h-4" />;
      case "Neurologist": return <Brain className="w-4 h-4" />;
      case "Orthopedic": return <Bone className="w-4 h-4" />;
      case "Pediatrician": return <Baby className="w-4 h-4" />;
      default: return <Stethoscope className="w-4 h-4" />;
    }
  };

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

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-[#f8fafc] via-white to-[#f0f9f6] flex items-center justify-center">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-[#00A99D] border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-slate-500">Loading expert doctors...</p>
        </div>
      </div>
    );
  }

  return (
    <section className="py-12 md:py-16 bg-gradient-to-br from-[#f8fafc] via-white to-[#f0f9f6] min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* Toast Notification */}
        {showAppointmentToast && (
          <div className="fixed top-24 left-1/2 -translate-x-1/2 z-50 animate-in fade-in slide-in-from-top-2 duration-300">
            <div className="bg-[#00A99D] text-white px-6 py-3 rounded-full shadow-lg flex items-center gap-2 text-sm font-medium">
              <Calendar className="w-4 h-4" />
              {toastMessage}
            </div>
          </div>
        )}

        {/* Header */}
        <div className="text-center mb-10">
          <div className="inline-flex items-center gap-2 bg-[#00A99D]/10 px-4 py-1.5 rounded-full mb-4">
            <Heart className="w-4 h-4 text-[#00A99D]" />
            <span className="text-[#00A99D] font-semibold text-sm uppercase tracking-wider">Our Team</span>
          </div>
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-[#013A63] mt-2 mb-4">
            Meet Our Expert Doctors
          </h2>
          <p className="text-slate-500 max-w-2xl mx-auto text-base">
            Consult with experienced specialists across multiple departments
          </p>
        </div>

        {/* Search & Filters - Modern Design with Custom Dropdowns */}
        <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-5 shadow-lg border border-slate-100 mb-8 z-30 relative">
          <div className="grid md:grid-cols-3 gap-4">
            <div className="relative group w-full">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400 group-focus-within:text-[#00A99D] transition-colors" />
              <input
                type="text"
                placeholder="Search doctors by name or specialty..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-3 rounded-xl border border-slate-200 focus:outline-none focus:border-[#00A99D] focus:ring-2 focus:ring-[#00A99D]/20 transition-all text-sm bg-white shadow-sm"
              />
            </div>
            
            <CustomDropdown 
              icon={MapPin} 
              options={locations} 
              value={selectedLocation} 
              onChange={setSelectedLocation} 
              placeholder="All Locations"
            />
            
            <CustomDropdown 
              icon={Briefcase} 
              options={specialties} 
              value={selectedSpecialty} 
              onChange={setSelectedSpecialty} 
              placeholder="All Doctors"
            />
          </div>
        </div>

        {/* Specialty Chips - Modern Scrollable */}
        <div className="flex flex-wrap gap-2 justify-center mb-10">
          {specialties.map((spec) => (
            <button
              key={spec}
              onClick={() => setSelectedSpecialty(spec)}
              className={`px-5 py-2 rounded-full text-sm font-medium transition-all duration-300 ${
                selectedSpecialty === spec
                  ? "bg-[#00A99D] text-white shadow-lg shadow-[#00A99D]/30 scale-105"
                  : "bg-white text-slate-600 hover:bg-[#00A99D]/10 border border-slate-200 hover:border-[#00A99D]/30"
              }`}
            >
              {spec === "All Doctors" ? "👨‍⚕️ " : "🩺 "}{spec}
            </button>
          ))}
        </div>

        {/* Doctors Grid - Original Cards with Perfect Size & Fonts */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {filteredDoctors.map((doctor) => (
            <div
              key={doctor.id}
              className="group bg-white rounded-2xl overflow-hidden shadow-md hover:shadow-2xl transition-all duration-500 hover:-translate-y-2 border border-slate-100"
            >
              {/* Doctor Image with Gradient Overlay */}
              <div className="relative h-56 overflow-hidden">
                <div className={`absolute inset-0 bg-gradient-to-br ${getSpecialistColor(doctor.specialist)} opacity-0 group-hover:opacity-20 transition-opacity duration-500 z-10`}></div>
                {!imageErrors[doctor.id] ? (
                  <img
                    src={doctor.image}
                    alt={doctor.name}
                    className="w-full h-full object-cover object-top group-hover:scale-110 transition-transform duration-700"
                    onError={() => setImageErrors(prev => ({ ...prev, [doctor.id]: true }))}
                  />
                ) : (
                  <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-[#013A63]/10 to-[#00A99D]/10">
                    <User className="w-20 h-20 text-[#00A99D]/40" />
                  </div>
                )}
                
                {/* Rating Badge */}
                <div className="absolute top-3 right-3 bg-white/95 backdrop-blur-md px-2.5 py-1 rounded-full flex items-center gap-1 shadow-md z-20">
                  <Star className="w-3.5 h-3.5 fill-yellow-500 text-yellow-500" />
                  <span className="text-xs font-bold text-slate-700">{doctor.rating}</span>
                </div>

                {/* Specialist Badge */}
                <div className="absolute bottom-3 left-3 bg-white/95 backdrop-blur-md text-[#013A63] px-3 py-1 rounded-full text-xs font-semibold flex items-center gap-1.5 shadow-md z-20">
                  {getSpecialistIcon(doctor.specialist)}
                  <span>{doctor.specialist}</span>
                </div>
              </div>

              {/* Doctor Details - Restored original styling */}
              <div className="p-4">
                <h3 className="text-lg font-bold text-[#013A63] mb-1 line-clamp-1">
                  {doctor.name}
                </h3>
                <p className="text-[#00A99D] font-medium text-xs mb-3">
                  {doctor.education.split(",")[0]}
                </p>

                <div className="space-y-2 mb-4">
                  <div className="flex items-center gap-2 text-xs text-slate-500">
                    <Briefcase className="w-3.5 h-3.5 text-[#00A99D]" />
                    <span>{doctor.experience} experience</span>
                  </div>
                  <div className="flex items-center gap-2 text-xs text-slate-500">
                    <MapPin className="w-3.5 h-3.5 text-[#00A99D]" />
                    <span>{doctor.location}</span>
                  </div>
                  <div className="flex items-center gap-2 text-xs text-slate-500">
                    <Activity className="w-3.5 h-3.5 text-[#00A99D]" />
                    <span>{doctor.patients} patients treated</span>
                  </div>
                  <div className="flex items-center gap-2 text-xs text-slate-500">
                    <Clock className="w-3.5 h-3.5 text-[#00A99D]" />
                    <span>{doctor.availability}</span>
                  </div>
                </div>

                {/* Two Buttons: Book Appointment & View Details */}
                <div className="flex gap-2">
                  <button 
                    onClick={() => handleBookAppointment(doctor)}
                    className="flex-1 h-10 rounded-xl bg-gradient-to-r from-[#00A99D] to-[#009488] text-white text-sm font-semibold hover:shadow-lg hover:shadow-[#00A99D]/30 transition-all duration-300 flex items-center justify-center gap-1.5"
                  >
                    <Calendar className="w-3.5 h-3.5" />
                    Book Now
                  </button>
                  <button 
                    onClick={() => handleViewDetails(doctor)}
                    className="flex-1 h-10 rounded-xl border-2 border-slate-200 text-slate-600 text-sm font-semibold hover:bg-[#00A99D]/10 hover:border-[#00A99D] hover:text-[#00A99D] transition-all duration-300 flex items-center justify-center gap-1.5"
                  >
                    <Eye className="w-3.5 h-3.5" />
                    Details
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

        {filteredDoctors.length === 0 && (
          <div className="text-center py-16">
            <div className="bg-white rounded-2xl p-10 max-w-md mx-auto border border-slate-200 shadow-lg">
              <Search className="w-14 h-14 text-slate-300 mx-auto mb-4" />
              <h3 className="text-xl font-semibold text-slate-700 mb-2">No doctors found</h3>
              <p className="text-slate-500 mb-4">No doctors match your current filters.</p>
              <button 
                onClick={() => {
                  setSearchTerm("");
                  setSelectedSpecialty("All Doctors");
                  setSelectedLocation("All Locations");
                }}
                className="text-[#00A99D] text-sm font-semibold hover:underline inline-flex items-center gap-1"
              >
                Clear all filters
              </button>
            </div>
          </div>
        )}
      </div>

      {/* View Details Modal - Restored Original Design */}
      {showModal && selectedDoctor && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 flex items-center justify-center p-4 animate-in fade-in duration-200" onClick={() => setShowModal(false)}>
          <div className="bg-white rounded-2xl max-w-md w-full max-h-[90vh] overflow-y-auto animate-in zoom-in-95 duration-300 shadow-2xl" onClick={(e) => e.stopPropagation()}>
            <div className={`relative h-44 bg-gradient-to-r ${getSpecialistColor(selectedDoctor.specialist)} rounded-t-2xl`}>
              <div className="absolute -bottom-12 left-6">
                <div className="w-24 h-24 rounded-full border-4 border-white bg-white overflow-hidden shadow-xl">
                  {!imageErrors[`modal-${selectedDoctor.id}`] ? (
                    <img 
                      src={selectedDoctor.image} 
                      alt={selectedDoctor.name} 
                      className="w-full h-full object-cover object-top"
                      onError={() => setImageErrors(prev => ({ ...prev, [`modal-${selectedDoctor.id}`]: true }))}
                    />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-[#013A63]/20 to-[#00A99D]/20">
                      <User className="w-10 h-10 text-[#00A99D]" />
                    </div>
                  )}
                </div>
              </div>
              <button 
                onClick={() => setShowModal(false)} 
                className="absolute top-4 right-4 bg-white/20 backdrop-blur-md rounded-full p-2 text-white hover:bg-white/30 transition-all"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
            <div className="pt-14 px-6 pb-6">
              <h3 className="text-2xl font-bold text-[#013A63]">{selectedDoctor.name}</h3>
              <div className="flex items-center gap-2 mt-1">
                <span className="text-[#00A99D] font-medium text-sm">{selectedDoctor.specialist}</span>
                <span className="text-slate-300">•</span>
                <div className="flex items-center gap-1">
                  <Star className="w-3.5 h-3.5 fill-yellow-500 text-yellow-500" />
                  <span className="text-sm font-semibold text-slate-700">{selectedDoctor.rating}</span>
                </div>
              </div>
              <p className="text-slate-500 text-sm mt-1">{selectedDoctor.education}</p>
              
              <div className="mt-5 space-y-2.5 bg-slate-50 rounded-xl p-4">
                <div className="flex items-center gap-3 text-sm text-slate-600"><Briefcase className="w-4 h-4 text-[#00A99D]" /> {selectedDoctor.experience} of experience</div>
                <div className="flex items-center gap-3 text-sm text-slate-600"><MapPin className="w-4 h-4 text-[#00A99D]" /> {selectedDoctor.location}</div>
                <div className="flex items-center gap-3 text-sm text-slate-600"><Activity className="w-4 h-4 text-[#00A99D]" /> {selectedDoctor.patients} happy patients</div>
                <div className="flex items-center gap-3 text-sm text-slate-600"><Clock className="w-4 h-4 text-[#00A99D]" /> Available: {selectedDoctor.availability}</div>
                <div className="flex items-center gap-3 text-sm text-slate-600"><Calendar className="w-4 h-4 text-[#00A99D]" /> Consultation: {selectedDoctor.fees}</div>
              </div>
              
              <div className="mt-4 bg-white border border-slate-100 p-4 rounded-xl">
                <p className="text-xs text-slate-400 font-semibold uppercase tracking-wide mb-2">About</p>
                <p className="text-sm text-slate-600 leading-relaxed">{selectedDoctor.bio}</p>
              </div>
              
              <div className="flex gap-3 mt-6">
                <button 
                  onClick={() => { 
                    handleBookAppointment(selectedDoctor); 
                    setShowModal(false); 
                  }} 
                  className="flex-1 h-12 rounded-xl bg-gradient-to-r from-[#00A99D] to-[#009488] text-white font-semibold flex items-center justify-center gap-2 hover:shadow-lg transition-all"
                >
                  <Calendar className="w-4 h-4" /> Book Appointment
                </button>
                <button 
                  onClick={() => setShowModal(false)} 
                  className="flex-1 h-12 rounded-xl border-2 border-slate-200 text-slate-600 font-semibold hover:bg-slate-50 transition-all"
                >
                  Close
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}