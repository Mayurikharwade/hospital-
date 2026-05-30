"use client";

import { useState } from "react";
import Link from "next/link";
import {
  Calendar,
  Clock,
  MapPin,
  Video,
  ChevronLeft,
  CheckCircle,
  XCircle,
  Clock as ClockIcon,
  Star,
  Phone,
  MessageCircle,
  FileText,
  Download,
  Users,
  Stethoscope,
  Heart,
  Brain,
  Bone,
  Baby,
} from "lucide-react";

// Doctors Data - Virtual Consultation Available
const virtualDoctors = [
  {
    id: 1,
    doctorName: "Dr. Ramesh Shetty",
    specialty: "Cardiologist",
    date: "28 May 2026",
    time: "10:30 AM",
    type: "Virtual Consultation",
    status: "Available",
    duration: "30 min",
    fee: "₹800",
    image: "https://randomuser.me/api/portraits/men/1.jpg",
    rating: 4.9,
    experience: "15+ years",
    availableSlots: ["10:30 AM", "02:00 PM", "04:30 PM"],
  },
  {
    id: 2,
    doctorName: "Dr. Priya Sharma",
    specialty: "Dermatologist",
    date: "29 May 2026",
    time: "11:00 AM",
    type: "Virtual Consultation",
    status: "Available",
    duration: "30 min",
    fee: "₹700",
    image: "https://randomuser.me/api/portraits/women/2.jpg",
    rating: 4.7,
    experience: "8+ years",
    availableSlots: ["11:00 AM", "03:00 PM", "05:00 PM"],
  },
  {
    id: 3,
    doctorName: "Dr. Anjali Mehta",
    specialty: "Pediatrician",
    date: "30 May 2026",
    time: "09:30 AM",
    type: "Virtual Consultation",
    status: "Available",
    duration: "30 min",
    fee: "₹650",
    image: "https://randomuser.me/api/portraits/women/5.jpg",
    rating: 4.8,
    experience: "10+ years",
    availableSlots: ["09:30 AM", "01:00 PM", "04:00 PM"],
  },
  {
    id: 4,
    doctorName: "Dr. Vikram Singh",
    specialty: "Gastroenterologist",
    date: "31 May 2026",
    time: "02:00 PM",
    type: "Virtual Consultation",
    status: "Available",
    duration: "30 min",
    fee: "₹950",
    image: "https://randomuser.me/api/portraits/men/6.jpg",
    rating: 4.7,
    experience: "14+ years",
    availableSlots: ["02:00 PM", "05:30 PM"],
  },
];

// Doctors Data - Clinic Visit Available
const clinicDoctors = [
  {
    id: 5,
    doctorName: "Dr. Shruthika Reddy",
    specialty: "Cardiologist",
    date: "28 May 2026",
    time: "10:30 AM",
    type: "Clinic Visit",
    status: "Available",
    duration: "45 min",
    fee: "₹1,200",
    image: "https://images.unsplash.com/photo-1559839734-2b71ea197ec2?w=100&h=100&fit=crop",
    rating: 4.9,
    experience: "12+ years",
    location: "Hyderabad Main, Room 204",
    availableSlots: ["10:30 AM", "01:00 PM", "03:30 PM"],
  },
  {
    id: 6,
    doctorName: "Dr. Rajesh Kumar",
    specialty: "Neurologist",
    date: "29 May 2026",
    time: "11:00 AM",
    type: "Clinic Visit",
    status: "Available",
    duration: "45 min",
    fee: "₹900",
    image: "https://images.unsplash.com/photo-1612349317150-e413f6a5b16d?w=100&h=100&fit=crop",
    rating: 4.8,
    experience: "15+ years",
    location: "Hyderabad Main, Room 105",
    availableSlots: ["11:00 AM", "02:30 PM", "04:00 PM"],
  },
  {
    id: 7,
    doctorName: "Dr. Suresh Babu",
    specialty: "Orthopedic",
    date: "30 May 2026",
    time: "09:00 AM",
    type: "Clinic Visit",
    status: "Available",
    duration: "45 min",
    fee: "₹850",
    image: "https://images.unsplash.com/photo-1622253692010-333f2da6031d?w=100&h=100&fit=crop",
    rating: 4.9,
    experience: "18+ years",
    location: "Secunderabad Branch, Room 12",
    availableSlots: ["09:00 AM", "11:30 AM", "02:00 PM"],
  },
  {
    id: 8,
    doctorName: "Dr. Kavita Nair",
    specialty: "Gynecologist",
    date: "31 May 2026",
    time: "01:00 PM",
    type: "Clinic Visit",
    status: "Available",
    duration: "45 min",
    fee: "₹750",
    image: "https://images.unsplash.com/photo-1559839734-2b71ea197ec2?w=100&h=100&fit=crop",
    rating: 4.9,
    experience: "11+ years",
    location: "Hyderabad Main, Room 308",
    availableSlots: ["01:00 PM", "03:30 PM", "05:00 PM"],
  },
];

// Ongoing Appointments
const ongoingAppointments = [
  {
    id: 9,
    doctorName: "Dr. Ramesh Shetty",
    specialty: "Cardiologist",
    type: "Virtual Consultation",
    status: "In Progress",
    image: "https://randomuser.me/api/portraits/men/1.jpg",
    meetingLink: "https://meet.eashaop.com/ramesh-shetty",
  },
];

// Previous Appointments
const previousAppointments = [
  {
    id: 10,
    doctorName: "Dr. Shruthika Reddy",
    specialty: "Cardiologist",
    date: "20 May 2026",
    time: "10:00 AM",
    type: "Clinic Visit",
    status: "Completed",
    fee: "₹1,200",
    image: "https://images.unsplash.com/photo-1559839734-2b71ea197ec2?w=100&h=100&fit=crop",
    prescription: true,
    report: true,
  },
  {
    id: 11,
    doctorName: "Dr. Priya Sharma",
    specialty: "Dermatologist",
    date: "15 May 2026",
    time: "02:30 PM",
    type: "Virtual Consultation",
    status: "Completed",
    fee: "₹700",
    image: "https://randomuser.me/api/portraits/women/2.jpg",
    prescription: true,
    report: false,
  },
];

export default function AppointmentsPage() {
  const [activeTab, setActiveTab] = useState("upcoming");
  const [consultType, setConsultType] = useState("all");

  const tabs = [
    { id: "upcoming", label: "Upcoming Appointments", icon: Calendar },
    { id: "ongoing", label: "Ongoing", icon: ClockIcon },
    { id: "previous", label: "History", icon: CheckCircle },
  ];

  const getCurrentAppointments = () => {
    if (activeTab === "ongoing") return ongoingAppointments;
    if (activeTab === "previous") return previousAppointments;
    
    // Upcoming tab - filter by consultation type
    if (consultType === "virtual") return virtualDoctors;
    if (consultType === "clinic") return clinicDoctors;
    return [...virtualDoctors, ...clinicDoctors];
  };

  const getSpecialistIcon = (specialty) => {
    switch(specialty) {
      case "Cardiologist": return <Heart className="w-4 h-4" />;
      case "Neurologist": return <Brain className="w-4 h-4" />;
      case "Orthopedic": return <Bone className="w-4 h-4" />;
      case "Pediatrician": return <Baby className="w-4 h-4" />;
      default: return <Stethoscope className="w-4 h-4" />;
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-teal-50/30">
      <div className="relative z-10 px-6 py-4">
        
        {/* Header */}
        <div className="mb-6">
          <div className="flex items-center gap-2 mb-1">
            <Calendar className="w-5 h-5 text-[#00A99D]" />
            <h1 className="text-xl font-bold bg-gradient-to-r from-[#013A63] to-[#00A99D] bg-clip-text text-transparent">
              Appointments
            </h1>
          </div>
          <p className="text-slate-500 text-sm ml-7">Manage your healthcare appointments</p>
        </div>

        {/* Main Tabs */}
        <div className="flex gap-2 mb-6 border-b border-slate-200">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`flex items-center gap-2 px-5 py-2.5 text-sm font-medium transition-all rounded-t-lg ${
                activeTab === tab.id
                  ? "text-[#00A99D] border-b-2 border-[#00A99D] bg-[#00A99D]/5"
                  : "text-slate-500 hover:text-[#00A99D] hover:bg-slate-50"
              }`}
            >
              <tab.icon className="w-4 h-4" />
              {tab.label}
            </button>
          ))}
        </div>

        {/* Consultation Type Filters - Only for Upcoming Tab */}
        {activeTab === "upcoming" && (
          <div className="flex gap-3 mb-6">
            <button
              onClick={() => setConsultType("all")}
              className={`px-5 py-2 rounded-full text-sm font-medium transition-all ${
                consultType === "all"
                  ? "bg-[#00A99D] text-white shadow-md"
                  : "bg-white text-slate-600 hover:bg-[#00A99D]/10 border border-slate-200"
              }`}
            >
              All Consultations
            </button>
            <button
              onClick={() => setConsultType("virtual")}
              className={`px-5 py-2 rounded-full text-sm font-medium transition-all ${
                consultType === "virtual"
                  ? "bg-[#00A99D] text-white shadow-md"
                  : "bg-white text-slate-600 hover:bg-[#00A99D]/10 border border-slate-200"
              }`}
            >
              <Video className="w-4 h-4 inline mr-1.5" />
              Virtual Consultation
            </button>
            <button
              onClick={() => setConsultType("clinic")}
              className={`px-5 py-2 rounded-full text-sm font-medium transition-all ${
                consultType === "clinic"
                  ? "bg-[#00A99D] text-white shadow-md"
                  : "bg-white text-slate-600 hover:bg-[#00A99D]/10 border border-slate-200"
              }`}
            >
              <MapPin className="w-4 h-4 inline mr-1.5" />
              Clinic Visit
            </button>
          </div>
        )}

        {/* Appointments Grid */}
        {getCurrentAppointments().length === 0 ? (
          <div className="bg-white rounded-xl p-8 text-center border border-slate-100">
            <Calendar className="w-14 h-14 text-slate-300 mx-auto mb-3" />
            <h3 className="text-lg font-semibold text-slate-700">No {activeTab} appointments</h3>
            <p className="text-slate-500 text-sm">Your appointments will appear here</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
            {getCurrentAppointments().map((apt) => (
              <div
                key={apt.id}
                className="group bg-white rounded-2xl shadow-sm hover:shadow-xl transition-all duration-300 hover:-translate-y-1 border border-slate-100 overflow-hidden"
              >
                {/* Card Header with Gradient */}
                <div className={`relative p-4 ${
                  apt.type === "Virtual Consultation" 
                    ? "bg-gradient-to-r from-blue-500/10 to-transparent" 
                    : "bg-gradient-to-r from-emerald-500/10 to-transparent"
                }`}>
                  <div className="flex items-center gap-3">
                    <div className="relative">
                      <img src={apt.image} alt={apt.doctorName} className="w-14 h-14 rounded-full object-cover border-2 border-white shadow-md" />
                      <div className={`absolute -bottom-0.5 -right-0.5 w-3 h-3 rounded-full ${
                        apt.status === "Available" ? "bg-green-500" : "bg-blue-500"
                      } ring-2 ring-white`}></div>
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center gap-1.5">
                        <h3 className="font-bold text-slate-800 text-sm">{apt.doctorName}</h3>
                        <div className="flex items-center gap-0.5">
                          <Star className="w-2.5 h-2.5 fill-yellow-400 text-yellow-400" />
                          <span className="text-[10px] font-medium">{apt.rating}</span>
                        </div>
                      </div>
                      <div className="flex items-center gap-1 text-[10px] text-slate-500 mt-0.5">
                        {getSpecialistIcon(apt.specialty)}
                        <span>{apt.specialty}</span>
                        <span className="mx-0.5">•</span>
                        <span>{apt.experience}</span>
                      </div>
                    </div>
                    <div className={`text-[10px] px-2 py-0.5 rounded-full flex items-center gap-1 ${
                      apt.type === "Virtual Consultation" 
                        ? "bg-blue-100 text-blue-700" 
                        : "bg-emerald-100 text-emerald-700"
                    }`}>
                      {apt.type === "Virtual Consultation" ? <Video className="w-2.5 h-2.5" /> : <MapPin className="w-2.5 h-2.5" />}
                      {apt.type === "Virtual Consultation" ? "Virtual" : "Clinic"}
                    </div>
                  </div>
                </div>

                {/* Card Body */}
                <div className="p-4">
                  {/* Date & Time */}
                  {apt.date && (
                    <div className="flex items-center justify-between mb-3">
                      <div className="flex items-center gap-2">
                        <div className="w-8 h-8 rounded-lg bg-[#00A99D]/10 flex items-center justify-center">
                          <Calendar className="w-3.5 h-3.5 text-[#00A99D]" />
                        </div>
                        <div>
                          <p className="text-xs font-medium text-slate-700">{apt.date}</p>
                          <p className="text-[10px] text-slate-400">{apt.time} • {apt.duration}</p>
                        </div>
                      </div>
                      <div className="text-right">
                        <p className="text-sm font-bold text-[#00A99D]">{apt.fee}</p>
                        <p className="text-[8px] text-slate-400">Consultation</p>
                      </div>
                    </div>
                  )}

                  {/* Location for Clinic Visit */}
                  {apt.type === "Clinic Visit" && apt.location && (
                    <div className="flex items-center gap-1.5 mb-3 text-[10px] text-slate-500">
                      <MapPin className="w-3 h-3 text-[#00A99D]" />
                      <span>{apt.location}</span>
                    </div>
                  )}

                  {/* Available Slots */}
                  {apt.availableSlots && activeTab === "upcoming" && (
                    <div className="mb-3">
                      <p className="text-[9px] text-slate-400 mb-1.5">Available Slots:</p>
                      <div className="flex flex-wrap gap-1.5">
                        {apt.availableSlots.map((slot, idx) => (
                          <span key={idx} className="text-[9px] px-2 py-0.5 rounded-full bg-slate-100 text-slate-600">
                            {slot}
                          </span>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* Ongoing - Join Button */}
                  {activeTab === "ongoing" && (
                    <div className="flex gap-2">
                      <button className="flex-1 py-2 rounded-xl bg-gradient-to-r from-[#00A99D] to-[#009488] text-white text-xs font-semibold hover:shadow-md transition flex items-center justify-center gap-1.5">
                        <Video className="w-3.5 h-3.5" />
                        Join Now
                      </button>
                      <button className="flex-1 py-2 rounded-xl border border-slate-200 text-slate-600 text-xs font-semibold hover:bg-slate-50 transition flex items-center justify-center gap-1.5">
                        <MessageCircle className="w-3.5 h-3.5" />
                        Message
                      </button>
                    </div>
                  )}

                  {/* Previous - Actions */}
                  {activeTab === "previous" && (
                    <div className="flex gap-2">
                      {apt.prescription && (
                        <button className="flex-1 py-2 rounded-xl border border-slate-200 text-slate-600 text-xs font-semibold hover:bg-slate-50 transition flex items-center justify-center gap-1.5">
                          <FileText className="w-3.5 h-3.5" />
                          Prescription
                        </button>
                      )}
                      {apt.report && (
                        <button className="flex-1 py-2 rounded-xl border border-slate-200 text-slate-600 text-xs font-semibold hover:bg-slate-50 transition flex items-center justify-center gap-1.5">
                          <Download className="w-3.5 h-3.5" />
                          Report
                        </button>
                      )}
                      <button className="flex-1 py-2 rounded-xl bg-[#00A99D] text-white text-xs font-semibold hover:bg-[#009488] transition flex items-center justify-center gap-1.5">
                        Book Again
                      </button>
                    </div>
                  )}

                  {/* Upcoming - Book Button */}
                  {activeTab === "upcoming" && (
                    <button className="w-full py-2.5 rounded-xl bg-gradient-to-r from-[#00A99D] to-[#009488] text-white text-sm font-semibold hover:shadow-md transition flex items-center justify-center gap-1.5">
                      <Calendar className="w-4 h-4" />
                      Book Appointment
                    </button>
                  )}
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Back to Dashboard */}
        <div className="mt-8 text-center">
          <Link href="/user/dashboard" className="inline-flex items-center gap-1 text-sm text-[#00A99D] font-medium hover:gap-2 transition">
            <ChevronLeft className="w-4 h-4" /> Back to Dashboard
          </Link>
        </div>
      </div>
    </div>
  );
}