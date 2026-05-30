"use client";

import { useState } from "react";
import Link from "next/link";
import { MessageCircle, Send, User, Star, Phone, Video, ChevronLeft, Clock, CheckCircle, Award, Users, Calendar, Activity, Heart, Stethoscope, Brain, Bone, Baby } from "lucide-react";

const doctorsList = [
  {
    id: 1,
    name: "Dr. Shruthika Reddy",
    specialty: "Cardiologist",
    experience: "12+ years",
    rating: 4.9,
    patients: "2,500+",
    status: "Online",
    lastSeen: "Active now",
    image: "https://images.unsplash.com/photo-1559839734-2b71ea197ec2?w=150&h=150&fit=crop",
    achievements: "Best Cardiologist 2024",
    nextAvailable: "Available Now",
    fee: "₹800",
  },
  {
    id: 2,
    name: "Dr. Rajesh Kumar",
    specialty: "Neurologist",
    experience: "15+ years",
    rating: 4.8,
    patients: "3,200+",
    status: "Away",
    lastSeen: "Last seen 5 min ago",
    image: "https://images.unsplash.com/photo-1612349317150-e413f6a5b16d?w=150&h=150&fit=crop",
    achievements: "Neurology Expert",
    nextAvailable: "In 10 min",
    fee: "₹900",
  },
  {
    id: 3,
    name: "Dr. Priya Sharma",
    specialty: "Dermatologist",
    experience: "8+ years",
    rating: 4.7,
    patients: "1,800+",
    status: "Online",
    lastSeen: "Active now",
    image: "https://randomuser.me/api/portraits/women/2.jpg",
    achievements: "Skin Specialist",
    nextAvailable: "Available Now",
    fee: "₹700",
  },
  {
    id: 4,
    name: "Dr. Suresh Babu",
    specialty: "Orthopedic",
    experience: "18+ years",
    rating: 4.9,
    patients: "4,100+",
    status: "Busy",
    lastSeen: "In consultation",
    image: "https://images.unsplash.com/photo-1622253692010-333f2da6031d?w=150&h=150&fit=crop",
    achievements: "Joint Replacement Expert",
    nextAvailable: "In 20 min",
    fee: "₹850",
  },
  {
    id: 5,
    name: "Dr. Anjali Mehta",
    specialty: "Pediatrician",
    experience: "10+ years",
    rating: 4.8,
    patients: "3,500+",
    status: "Online",
    lastSeen: "Active now",
    image: "https://images.unsplash.com/photo-1527613426441-4da17471b66d?w=150&h=150&fit=crop",
    achievements: "Child Care Expert",
    nextAvailable: "Available Now",
    fee: "₹650",
  },
  {
    id: 6,
    name: "Dr. Kavita Nair",
    specialty: "Gynecologist",
    experience: "11+ years",
    rating: 4.9,
    patients: "3,800+",
    status: "Away",
    lastSeen: "Last seen 2 min ago",
    image: "https://images.unsplash.com/photo-1559839734-2b71ea197ec2?w=150&h=150&fit=crop",
    achievements: "Women's Health Expert",
    nextAvailable: "In 5 min",
    fee: "₹750",
  },
];

export default function ChatDoctorPage() {
  const [selectedDoctor, setSelectedDoctor] = useState(null);
  const [messages, setMessages] = useState([]);
  const [inputMessage, setInputMessage] = useState("");

  const handleStartChat = (doctor) => {
    setSelectedDoctor(doctor);
    setMessages([
      { text: `Hello! 👋 I'm ${doctor.name}. How can I help you today?`, isUser: false, time: new Date().toLocaleTimeString() }
    ]);
  };

  const handleSendMessage = () => {
    if (!inputMessage.trim()) return;
    setMessages([...messages, { text: inputMessage, isUser: true, time: new Date().toLocaleTimeString() }]);
    setInputMessage("");
    setTimeout(() => {
      setMessages(prev => [...prev, { text: "Thank you for your message. I'll review and get back to you shortly. Please describe your symptoms in detail.", isUser: false, time: new Date().toLocaleTimeString() }]);
    }, 1000);
  };

  const getStatusColor = (status) => {
    switch(status) {
      case "Online": return "bg-green-500";
      case "Away": return "bg-amber-500";
      case "Busy": return "bg-red-500";
      default: return "bg-gray-500";
    }
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

  // Chat Screen
  if (selectedDoctor) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-teal-50/30">
        <div className="flex flex-col h-screen">
          {/* Chat Header */}
          <div className="bg-white border-b border-slate-200 px-4 py-3 flex items-center gap-3 shadow-sm sticky top-0 z-10">
            <button onClick={() => setSelectedDoctor(null)} className="text-slate-500 hover:text-slate-700 p-1 rounded-lg hover:bg-slate-100">
              <ChevronLeft className="w-5 h-5" />
            </button>
            <div className="relative">
              <img src={selectedDoctor.image} alt={selectedDoctor.name} className="w-10 h-10 rounded-full object-cover" />
              <div className={`absolute bottom-0 right-0 w-3 h-3 rounded-full ${getStatusColor(selectedDoctor.status)} ring-2 ring-white`}></div>
            </div>
            <div className="flex-1">
              <h3 className="font-semibold text-slate-800 text-sm">{selectedDoctor.name}</h3>
              <p className="text-xs text-slate-500">{selectedDoctor.specialty}</p>
            </div>
            <button className="p-2 rounded-lg hover:bg-slate-100 transition"><Phone className="w-4 h-4 text-slate-500" /></button>
            <button className="p-2 rounded-lg hover:bg-slate-100 transition"><Video className="w-4 h-4 text-slate-500" /></button>
          </div>

          {/* Chat Messages */}
          <div className="flex-1 overflow-y-auto p-4 space-y-3">
            {messages.map((msg, idx) => (
              <div key={idx} className={`flex ${msg.isUser ? "justify-end" : "justify-start"}`}>
                <div className={`max-w-[75%] p-3 rounded-2xl ${msg.isUser ? "bg-[#00A99D] text-white" : "bg-white border border-slate-200 text-slate-700"}`}>
                  <p className="text-sm">{msg.text}</p>
                  <p className="text-[10px] mt-1 opacity-70">{msg.time}</p>
                </div>
              </div>
            ))}
          </div>

          {/* Chat Input */}
          <div className="bg-white border-t border-slate-200 p-3">
            <div className="flex gap-2">
              <input 
                type="text" 
                value={inputMessage} 
                onChange={(e) => setInputMessage(e.target.value)} 
                onKeyPress={(e) => e.key === "Enter" && handleSendMessage()} 
                placeholder="Type your message..." 
                className="flex-1 px-4 py-2 rounded-full border border-slate-200 focus:outline-none focus:border-[#00A99D] text-sm" 
              />
              <button onClick={handleSendMessage} className="w-10 h-10 rounded-full bg-[#00A99D] text-white flex items-center justify-center hover:bg-[#009488] transition">
                <Send className="w-4 h-4" />
              </button>
            </div>
            <p className="text-center text-[10px] text-slate-400 mt-2">Secure & Encrypted Chat</p>
          </div>
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
            <MessageCircle className="w-5 h-5 text-[#00A99D]" />
            <h1 className="text-xl font-bold bg-gradient-to-r from-[#013A63] to-[#00A99D] bg-clip-text text-transparent">
              Chat with Doctor
            </h1>
          </div>
          <p className="text-slate-500 text-sm ml-7">Get instant medical advice from top doctors</p>
        </div>

        {/* Doctors Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {doctorsList.map((doctor) => (
            <div
              key={doctor.id}
              className="bg-white rounded-xl shadow-sm hover:shadow-md transition-all duration-300 hover:-translate-y-1 border border-slate-100 overflow-hidden cursor-pointer"
              onClick={() => handleStartChat(doctor)}
            >
              {/* Doctor Header */}
              <div className="p-4 border-b border-slate-100 bg-gradient-to-r from-slate-50 to-white">
                <div className="flex items-center gap-3">
                  <div className="relative">
                    <img src={doctor.image} alt={doctor.name} className="w-14 h-14 rounded-full object-cover" />
                    <div className={`absolute bottom-0 right-0 w-3 h-3 rounded-full ${getStatusColor(doctor.status)} ring-2 ring-white`}></div>
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center gap-2">
                      <h3 className="font-semibold text-slate-800 text-sm">{doctor.name}</h3>
                      <div className="flex items-center gap-0.5">
                        <Star className="w-3 h-3 fill-yellow-400 text-yellow-400" />
                        <span className="text-xs font-medium">{doctor.rating}</span>
                      </div>
                    </div>
                    <div className="flex items-center gap-1 text-xs text-slate-500 mt-0.5">
                      {getSpecialistIcon(doctor.specialty)}
                      <span>{doctor.specialty}</span>
                      <span className="mx-0.5">•</span>
                      <span>{doctor.experience}</span>
                    </div>
                  </div>
                  <div className={`text-xs px-2 py-1 rounded-full ${doctor.status === "Online" ? "bg-green-100 text-green-700" : doctor.status === "Away" ? "bg-amber-100 text-amber-700" : "bg-red-100 text-red-700"}`}>
                    {doctor.status}
                  </div>
                </div>
              </div>

              {/* Doctor Details */}
              <div className="p-4 space-y-2">
                <div className="flex items-center justify-between text-sm">
                  <div className="flex items-center gap-1">
                    <Users className="w-3.5 h-3.5 text-[#00A99D]" />
                    <span className="text-xs text-slate-600">{doctor.patients} patients</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <Award className="w-3.5 h-3.5 text-[#00A99D]" />
                    <span className="text-xs text-slate-600">{doctor.achievements}</span>
                  </div>
                </div>
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-1">
                    <Clock className="w-3.5 h-3.5 text-[#00A99D]" />
                    <span className="text-xs text-slate-500">{doctor.lastSeen}</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <span className="text-xs font-semibold text-[#00A99D]">{doctor.fee}</span>
                    <span className="text-xs text-slate-400">/consult</span>
                  </div>
                </div>
                <div className="mt-2 pt-2 border-t border-slate-100">
                  <div className="flex items-center gap-2">
                    <div className="w-1.5 h-1.5 rounded-full bg-green-500"></div>
                    <span className="text-xs text-green-600">{doctor.nextAvailable}</span>
                  </div>
                </div>
              </div>

              {/* Chat Button */}
              <div className="p-3 bg-slate-50">
                <button className="w-full py-2 rounded-lg bg-gradient-to-r from-[#00A99D] to-[#009488] text-white text-sm font-semibold hover:shadow-md transition flex items-center justify-center gap-2">
                  <MessageCircle className="w-4 h-4" />
                  Start Chat
                </button>
              </div>
            </div>
          ))}
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