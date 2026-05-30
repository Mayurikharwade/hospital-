"use client";

import { useState } from "react";
import Link from "next/link";
import { Video, Calendar, Clock, User, ChevronLeft, Phone, Mic, MicOff, VideoOff, X, Star, ChevronRight } from "lucide-react";

const availableDoctors = [
  {
    id: 1,
    name: "Dr. Shruthika Reddy",
    specialty: "Cardiologist",
    experience: "12+ years",
    fee: "₹800",
    rating: 4.9,
    available: "Available Now",
    image: "https://images.unsplash.com/photo-1559839734-2b71ea197ec2?w=100&h=100&fit=crop",
  },
  {
    id: 2,
    name: "Dr. Rajesh Kumar",
    specialty: "Neurologist",
    experience: "15+ years",
    fee: "₹900",
    rating: 4.8,
    available: "In 10 min",
    image: "https://images.unsplash.com/photo-1612349317150-e413f6a5b16d?w=100&h=100&fit=crop",
  },
  {
    id: 3,
    name: "Dr. Priya Sharma",
    specialty: "Dermatologist",
    experience: "8+ years",
    fee: "₹700",
    rating: 4.7,
    available: "Available Now",
    image: "https://randomuser.me/api/portraits/women/2.jpg",
  },
];

export default function VideoConsultPage() {
  const [selectedDoctor, setSelectedDoctor] = useState(null);
  const [isCallActive, setIsCallActive] = useState(false);
  const [isMuted, setIsMuted] = useState(false);
  const [isVideoOff, setIsVideoOff] = useState(false);

  const handleStartCall = (doctor) => {
    setSelectedDoctor(doctor);
    setIsCallActive(true);
  };

  const handleEndCall = () => {
    setIsCallActive(false);
    setSelectedDoctor(null);
  };

  if (isCallActive && selectedDoctor) {
    return (
      <div className="min-h-screen bg-slate-900 flex items-center justify-center">
        <div className="relative w-full max-w-4xl bg-slate-800 rounded-2xl overflow-hidden">
          {/* Video Container */}
          <div className="relative h-96 bg-gradient-to-br from-[#013A63] to-[#00A99D] flex items-center justify-center">
            {!isVideoOff && (
              <div className="absolute top-4 right-4 w-32 h-24 bg-slate-700 rounded-lg border-2 border-white overflow-hidden">
                <div className="w-full h-full bg-slate-600 flex items-center justify-center text-white text-xs">Self View</div>
              </div>
            )}
            <div className="text-center text-white">
              <img src={selectedDoctor.image} alt={selectedDoctor.name} className="w-24 h-24 rounded-full mx-auto mb-4 border-4 border-white" />
              <h2 className="text-2xl font-bold">{selectedDoctor.name}</h2>
              <p className="text-white/80">{selectedDoctor.specialty}</p>
              <p className="text-green-400 text-sm mt-2">Connected</p>
            </div>
          </div>

          {/* Call Controls */}
          <div className="p-4 bg-slate-800 flex items-center justify-center gap-4">
            <button onClick={() => setIsMuted(!isMuted)} className="w-12 h-12 rounded-full bg-slate-700 text-white hover:bg-slate-600 transition flex items-center justify-center">
              {isMuted ? <MicOff className="w-5 h-5" /> : <Mic className="w-5 h-5" />}
            </button>
            <button onClick={() => setIsVideoOff(!isVideoOff)} className="w-12 h-12 rounded-full bg-slate-700 text-white hover:bg-slate-600 transition flex items-center justify-center">
              {isVideoOff ? <VideoOff className="w-5 h-5" /> : <Video className="w-5 h-5" />}
            </button>
            <button onClick={handleEndCall} className="w-12 h-12 rounded-full bg-red-500 text-white hover:bg-red-600 transition flex items-center justify-center">
              <Phone className="w-5 h-5 rotate-135" />
            </button>
          </div>
          <div className="p-3 text-center text-slate-400 text-xs">Consultation in progress... Quality: HD</div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-teal-50/30">
      <div className="relative z-10 px-6 py-4">
        
        {/* Header */}
        <div className="mb-6">
          <div className="flex items-center gap-2 mb-1">
            <Video className="w-5 h-5 text-[#00A99D]" />
            <h1 className="text-xl font-bold bg-gradient-to-r from-[#013A63] to-[#00A99D] bg-clip-text text-transparent">
              Video Consult
            </h1>
          </div>
          <p className="text-slate-500 text-sm ml-7">Consult with doctors via video call</p>
        </div>

        {/* Available Doctors */}
        <div className="space-y-4">
          <h2 className="font-semibold text-[#013A63] text-base">Available Doctors</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {availableDoctors.map((doctor) => (
              <div key={doctor.id} className="bg-white rounded-xl p-4 shadow-sm border border-slate-100">
                <div className="flex items-center gap-3">
                  <img src={doctor.image} alt={doctor.name} className="w-14 h-14 rounded-full object-cover" />
                  <div className="flex-1">
                    <div className="flex items-center gap-1">
                      <h3 className="font-semibold text-slate-800 text-sm">{doctor.name}</h3>
                      <div className="flex items-center gap-0.5">
                        <Star className="w-3 h-3 fill-yellow-400 text-yellow-400" />
                        <span className="text-xs">{doctor.rating}</span>
                      </div>
                    </div>
                    <p className="text-xs text-slate-500">{doctor.specialty}</p>
                    <p className="text-xs text-green-600 mt-1">{doctor.available}</p>
                  </div>
                </div>
                <div className="mt-3 flex gap-2">
                  <button onClick={() => handleStartCall(doctor)} className="flex-1 py-2 rounded-lg bg-[#00A99D] text-white text-sm font-medium hover:bg-[#009488] transition flex items-center justify-center gap-1">
                    <Video className="w-4 h-4" /> Start Call
                  </button>
                  <button className="px-3 py-2 rounded-lg border border-slate-200 text-slate-600 text-sm font-medium hover:bg-slate-50 transition">
                    <Calendar className="w-4 h-4" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Back to Dashboard */}
        <div className="mt-6 text-center">
          <Link href="/user/dashboard" className="inline-flex items-center gap-1 text-sm text-[#00A99D] font-medium hover:gap-2 transition">
            <ChevronLeft className="w-4 h-4" /> Back to Dashboard
          </Link>
        </div>
      </div>
    </div>
  );
}