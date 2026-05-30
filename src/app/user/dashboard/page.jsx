"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation"; 
import {
  Calendar,
  FileText,
  Stethoscope,
  User,
  Clock,
  MapPin,
  ChevronRight,
  Activity,
  Heart,
  Pill,
  Syringe,
  Eye,
  Download,
  Phone,
  Mail,
  Star,
  TrendingUp,
  Award,
  Shield,
  Video,
  MessageCircle,
  Sparkles,
  ArrowRight,
} from "lucide-react";

export default function DashboardPage() {
  const [activeTab, setActiveTab] = useState("overview");
  const router = useRouter();

  // User Data
  const userData = {
    name: "Maram Kalpana",
    opNumber: "EOP2026047",
    email: "kalpana@eashaop.com",
    phone: "+91 98765 43210",
    bloodGroup: "O+",
    age: 28,
    avatar: "https://randomuser.me/api/portraits/women/68.jpg",
  };

  // Upcoming Appointments
  const upcomingAppointments = [
    {
      id: 1,
      doctorName: "Dr. Shruthika Reddy",
      specialty: "Cardiologist",
      date: "25 May 2026",
      time: "10:30 AM",
      location: "Hyderabad Main",
      status: "Confirmed",
      image: "https://images.unsplash.com/photo-1559839734-2b71ea197ec2?w=100&h=100&fit=crop",
      rating: 4.9,
    },
    {
      id: 2,
      doctorName: "Dr. Rajesh Kumar",
      specialty: "Neurologist",
      date: "28 May 2026",
      time: "02:00 PM",
      location: "Hyderabad Main",
      status: "Pending",
      image: "https://images.unsplash.com/photo-1612349317150-e413f6a5b16d?w=100&h=100&fit=crop",
      rating: 4.8,
    },
  ];

  // Lab Tests
  const labTests = [
    { id: 1, name: "Complete Blood Count", date: "20 May 2026", status: "Ready", icon: "🩸" },
    { id: 2, name: "Lipid Profile", date: "18 May 2026", status: "Ready", icon: "❤️" },
    { id: 3, name: "Thyroid Test", date: "15 May 2026", status: "Pending", icon: "🏥" },
  ];

  // My Doctors
  const myDoctors = [
    {
      id: 1,
      name: "Dr. Shruthika Reddy",
      specialty: "Cardiologist",
      experience: "12+ years",
      fee: "₹800",
      rating: 4.9,
      patients: "2,500+",
      image: "https://images.unsplash.com/photo-1559839734-2b71ea197ec2?w=150&h=150&fit=crop",
      available: "Today",
    },
    {
      id: 2,
      name: "Dr. Rajesh Kumar",
      specialty: "Neurologist",
      experience: "15+ years",
      fee: "₹900",
      rating: 4.8,
      patients: "3,200+",
      image: "https://images.unsplash.com/photo-1612349317150-e413f6a5b16d?w=150&h=150&fit=crop",
      available: "Tomorrow",
    },
  ];

  // Recent Receipts
  const receipts = [
    { id: 1, amount: "₹1,200", date: "20 May 2026", type: "Consultation", invoice: "INV-001" },
    { id: 2, amount: "₹2,500", date: "15 May 2026", type: "Lab Tests", invoice: "INV-002" },
    { id: 3, amount: "₹800", date: "10 May 2026", type: "Medicine", invoice: "INV-003" },
  ];

  const handleViewAllDoctors = () => {
    router.push("/user/dashboard/doctors");
  };

  const handleDownload = (receipt) => {
    alert(`Downloading receipt ${receipt.invoice} for ${receipt.amount}`);
  };

  const handleBookAppointment = () => {
    router.push("/user/dashboard/appointments");
  };

  const handleScheduleTest = () => {
    router.push("/user/dashboard/medications");
  };

  const handleViewPaymentHistory = () => {
    router.push("/user/dashboard/receipts");
  };

  const handleReadMore = () => {
    alert("💧 Drinking 8 glasses of water daily helps maintain optimal health. Stay hydrated!");
  };

  const handleQuickAction = (action) => {
    alert(`🔔 ${action} feature coming soon! Our team will notify you once available.`);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-teal-50/30">
      {/* Animated Background Decor */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-[#00A99D]/10 rounded-full blur-3xl"></div>
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-[#013A63]/10 rounded-full blur-3xl"></div>
      </div>

      <div className="relative z-10 pt-2 px-6 lg:px-8">
        
        {/* Stats Cards Row */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 mb-8">
          <div className="group bg-white rounded-2xl p-5 shadow-sm hover:shadow-xl transition-all duration-300 hover:-translate-y-1 border border-slate-100">
            <div className="flex items-center justify-between">
              <div className="w-12 h-12 rounded-xl bg-[#00A99D]/10 flex items-center justify-center group-hover:scale-110 transition">
                <Calendar className="w-6 h-6 text-[#00A99D]" />
              </div>
              <span className="text-2xl font-bold text-[#013A63]">12</span>
            </div>
            <p className="text-slate-600 mt-3 font-medium">Total Appointments</p>
            <p className="text-xs text-green-600 mt-1">+3 this month</p>
          </div>

          <div className="group bg-white rounded-2xl p-5 shadow-sm hover:shadow-xl transition-all duration-300 hover:-translate-y-1 border border-slate-100">
            <div className="flex items-center justify-between">
              <div className="w-12 h-12 rounded-xl bg-blue-500/10 flex items-center justify-center group-hover:scale-110 transition">
                <FileText className="w-6 h-6 text-blue-500" />
              </div>
              <span className="text-2xl font-bold text-[#013A63]">8</span>
            </div>
            <p className="text-slate-600 mt-3 font-medium">Lab Tests</p>
            <p className="text-xs text-green-600 mt-1">3 ready to download</p>
          </div>

          <div className="group bg-white rounded-2xl p-5 shadow-sm hover:shadow-xl transition-all duration-300 hover:-translate-y-1 border border-slate-100">
            <div className="flex items-center justify-between">
              <div className="w-12 h-12 rounded-xl bg-purple-500/10 flex items-center justify-center group-hover:scale-110 transition">
                <Stethoscope className="w-6 h-6 text-purple-500" />
              </div>
              <span className="text-2xl font-bold text-[#013A63]">2</span>
            </div>
            <p className="text-slate-600 mt-3 font-medium">My Doctors</p>
            <p className="text-xs text-slate-400 mt-1">Available 24/7</p>
          </div>

          <div className="group bg-white rounded-2xl p-5 shadow-sm hover:shadow-xl transition-all duration-300 hover:-translate-y-1 border border-slate-100">
            <div className="flex items-center justify-between">
              <div className="w-12 h-12 rounded-xl bg-amber-500/10 flex items-center justify-center group-hover:scale-110 transition">
                <Receipt className="w-6 h-6 text-amber-500" />
              </div>
              <span className="text-2xl font-bold text-[#013A63]">₹4,500</span>
            </div>
            <p className="text-slate-600 mt-3 font-medium">Total Spent</p>
            <p className="text-xs text-slate-400 mt-1">This month</p>
          </div>
        </div>

        {/* Main 4 Cards Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
          
          {/* Card 1: Upcoming Appointments */}
          <div className="bg-white rounded-2xl shadow-md hover:shadow-xl transition-all duration-300 overflow-hidden border border-slate-100 group">
            <div className="bg-gradient-to-r from-[#00A99D]/10 to-transparent p-5 border-b border-slate-100">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <div className="w-10 h-10 rounded-xl bg-[#00A99D] flex items-center justify-center shadow-md">
                    <Calendar className="w-5 h-5 text-white" />
                  </div>
                  <div>
                    <h3 className="font-bold text-[#013A63] text-lg">Upcoming Appointments</h3>
                    <p className="text-xs text-slate-400">Your next healthcare visits</p>
                  </div>
                </div>
                <button onClick={() => router.push("/user/dashboard/appointments")} className="text-[#00A99D] text-sm font-medium flex items-center gap-1 hover:gap-2 transition-all">
                  View all <ChevronRight className="w-4 h-4" />
                </button>
              </div>
            </div>
            <div className="divide-y divide-slate-100">
              {upcomingAppointments.map((apt) => (
                <div key={apt.id} className="p-4 hover:bg-slate-50 transition-all duration-300">
                  <div className="flex items-center gap-4">
                    <div className="relative">
                      <img src={apt.image} alt={apt.doctorName} className="w-14 h-14 rounded-xl object-cover" />
                      <div className={`absolute -bottom-1 -right-1 w-3 h-3 rounded-full ${apt.status === 'Confirmed' ? 'bg-green-500' : 'bg-amber-500'} ring-2 ring-white`}></div>
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center justify-between flex-wrap">
                        <h4 className="font-semibold text-slate-800">{apt.doctorName}</h4>
                        <div className="flex items-center gap-1">
                          <Star className="w-3 h-3 fill-yellow-400 text-yellow-400" />
                          <span className="text-xs font-medium">{apt.rating}</span>
                        </div>
                      </div>
                      <p className="text-xs text-slate-500">{apt.specialty}</p>
                      <div className="flex items-center gap-3 mt-2 text-xs text-slate-500">
                        <span className="flex items-center gap-1"><Calendar className="w-3 h-3" /> {apt.date}</span>
                        <span className="flex items-center gap-1"><Clock className="w-3 h-3" /> {apt.time}</span>
                      </div>
                    </div>
                    <span className={`text-xs px-2 py-1 rounded-full ${apt.status === 'Confirmed' ? 'bg-green-100 text-green-700' : 'bg-amber-100 text-amber-700'}`}>
                      {apt.status}
                    </span>
                  </div>
                </div>
              ))}
            </div>
            <div className="p-3 bg-slate-50 text-center">
              <button onClick={handleBookAppointment} className="text-sm text-[#00A99D] font-medium flex items-center justify-center gap-1 w-full">
                Book New Appointment <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>

          {/* Card 2: Lab Tests */}
          <div className="bg-white rounded-2xl shadow-md hover:shadow-xl transition-all duration-300 overflow-hidden border border-slate-100">
            <div className="bg-gradient-to-r from-blue-500/10 to-transparent p-5 border-b border-slate-100">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <div className="w-10 h-10 rounded-xl bg-blue-500 flex items-center justify-center shadow-md">
                    <Microscope className="w-5 h-5 text-white" />
                  </div>
                  <div>
                    <h3 className="font-bold text-[#013A63] text-lg">Lab Tests & Reports</h3>
                    <p className="text-xs text-slate-400">Your diagnostic results</p>
                  </div>
                </div>
                <button onClick={() => router.push("/user/dashboard/medications")} className="text-blue-500 text-sm font-medium flex items-center gap-1 hover:gap-2 transition-all">
                  View all <ChevronRight className="w-4 h-4" />
                </button>
              </div>
            </div>
            <div className="divide-y divide-slate-100">
              {labTests.map((test) => (
                <div key={test.id} className="p-4 hover:bg-slate-50 transition-all duration-300">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <div className="text-2xl">{test.icon}</div>
                      <div>
                        <h4 className="font-medium text-slate-800">{test.name}</h4>
                        <p className="text-xs text-slate-400">{test.date}</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      <span className={`text-xs px-2 py-1 rounded-full ${test.status === 'Ready' ? 'bg-green-100 text-green-700' : 'bg-amber-100 text-amber-700'}`}>
                        {test.status}
                      </span>
                      {test.status === 'Ready' && (
                        <button className="p-2 rounded-lg hover:bg-slate-100 transition" onClick={() => alert(`Downloading ${test.name} report...`)}>
                          <Download className="w-4 h-4 text-[#00A99D]" />
                        </button>
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>
            <div className="p-3 bg-slate-50 text-center">
              <button onClick={handleScheduleTest} className="text-sm text-blue-500 font-medium flex items-center justify-center gap-1 w-full">
                Schedule New Test <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>

          {/* Card 3: My Doctors */}
          <div className="bg-white rounded-2xl shadow-md hover:shadow-xl transition-all duration-300 overflow-hidden border border-slate-100">
            <div className="bg-gradient-to-r from-purple-500/10 to-transparent p-5 border-b border-slate-100">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <div className="w-10 h-10 rounded-xl bg-purple-500 flex items-center justify-center shadow-md">
                    <Stethoscope className="w-5 h-5 text-white" />
                  </div>
                  <div>
                    <h3 className="font-bold text-[#013A63] text-lg">My Doctors</h3>
                    <p className="text-xs text-slate-400">Your healthcare team</p>
                  </div>
                </div>
                <button onClick={handleViewAllDoctors} className="text-purple-500 text-sm font-medium flex items-center gap-1 hover:gap-2 transition-all">
                  View all <ChevronRight className="w-4 h-4" />
                </button>
              </div>
            </div>
            <div className="divide-y divide-slate-100">
              {myDoctors.map((doctor) => (
                <div key={doctor.id} className="p-4 hover:bg-slate-50 transition-all duration-300">
                  <div className="flex items-center gap-4">
                    <img src={doctor.image} alt={doctor.name} className="w-14 h-14 rounded-xl object-cover" />
                    <div className="flex-1">
                      <div className="flex items-center justify-between">
                        <h4 className="font-semibold text-slate-800">{doctor.name}</h4>
                        <div className="flex items-center gap-1">
                          <Star className="w-3 h-3 fill-yellow-400 text-yellow-400" />
                          <span className="text-xs font-medium">{doctor.rating}</span>
                        </div>
                      </div>
                      <p className="text-xs text-slate-500">{doctor.specialty}</p>
                      <div className="flex items-center gap-2 mt-1">
                        <span className="text-xs text-slate-400">{doctor.experience}</span>
                        <span className="text-xs font-semibold text-[#00A99D]">{doctor.fee}</span>
                      </div>
                    </div>
                    <button className="px-3 py-1.5 rounded-lg bg-[#00A99D]/10 text-[#00A99D] text-xs font-medium hover:bg-[#00A99D] hover:text-white transition" onClick={() => alert(`Booking appointment with ${doctor.name}`)}>
                      Book
                    </button>
                  </div>
                </div>
              ))}
            </div>
            <div className="p-3 bg-slate-50 text-center">
              <button onClick={handleViewAllDoctors} className="text-sm text-purple-500 font-medium flex items-center justify-center gap-1 w-full">
                Find More Doctors <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>

          {/* Card 4: Recent Receipts */}
          <div className="bg-white rounded-2xl shadow-md hover:shadow-xl transition-all duration-300 overflow-hidden border border-slate-100">
            <div className="bg-gradient-to-r from-amber-500/10 to-transparent p-5 border-b border-slate-100">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <div className="w-10 h-10 rounded-xl bg-amber-500 flex items-center justify-center shadow-md">
                    <Receipt className="w-5 h-5 text-white" />
                  </div>
                  <div>
                    <h3 className="font-bold text-[#013A63] text-lg">Recent Receipts</h3>
                    <p className="text-xs text-slate-400">Payment history</p>
                  </div>
                </div>
                <button onClick={() => router.push("/user/dashboard/receipts")} className="text-amber-500 text-sm font-medium flex items-center gap-1 hover:gap-2 transition-all">
                  View all <ChevronRight className="w-4 h-4" />
                </button>
              </div>
            </div>
            <div className="divide-y divide-slate-100">
              {receipts.map((receipt) => (
                <div key={receipt.id} className="p-4 hover:bg-slate-50 transition-all duration-300">
                  <div className="flex items-center justify-between">
                    <div>
                      <h4 className="font-medium text-slate-800">{receipt.type}</h4>
                      <p className="text-xs text-slate-400">{receipt.date}</p>
                      <p className="text-xs text-slate-400 mt-0.5">Invoice: {receipt.invoice}</p>
                    </div>
                    <div className="text-right">
                      <p className="text-lg font-bold text-[#013A63]">{receipt.amount}</p>
                      <button onClick={() => handleDownload(receipt)} className="text-xs text-[#00A99D] hover:underline mt-1">Download</button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
            <div className="p-3 bg-slate-50 text-center">
              <button onClick={handleViewPaymentHistory} className="text-sm text-amber-500 font-medium flex items-center justify-center gap-1 w-full">
                View Payment History <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>

       {/* Bottom Section - Health Tips & Quick Actions */}
<div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
  <div className="lg:col-span-2 bg-gradient-to-r from-[#013A63] to-[#00A99D] rounded-2xl p-6 text-white">
    <div className="flex items-start justify-between">
      <div>
        <div className="flex items-center gap-2 mb-3">
          <Sparkles className="w-5 h-5 text-yellow-300" />
          <span className="text-sm font-semibold text-yellow-300">Health Tip</span>
        </div>
        <h3 className="text-xl font-bold mb-2">Stay Hydrated! 💧</h3>
        <p className="text-white/80 text-sm max-w-md">
          Drinking enough water helps maintain your body's fluid balance, 
          which helps transport nutrients, regulate temperature, and digest food.
        </p>
        <button onClick={handleReadMore} className="mt-4 px-4 py-2 bg-white/20 rounded-xl text-sm font-medium hover:bg-white/30 transition">
          Read More
        </button>
      </div>
      <div className="hidden md:block text-7xl opacity-20">💙</div>
    </div>
  </div>

  <div className="bg-white rounded-2xl p-5 shadow-md border border-slate-100">
    <h3 className="font-semibold text-[#013A63] mb-4 flex items-center gap-2">
      <Heart className="w-5 h-5 text-[#00A99D]" />
      Quick Actions
    </h3>
    <div className="grid grid-cols-2 gap-3">
      <Link href="/user/dashboard/video-consult" className="flex flex-col items-center gap-2 p-3 rounded-xl bg-slate-50 hover:bg-[#00A99D]/10 transition group">
        <Video className="w-5 h-5 text-[#00A99D]" />
        <span className="text-xs text-slate-600">Video Consult</span>
      </Link>
      <Link href="/user/dashboard/chat-doctor" className="flex flex-col items-center gap-2 p-3 rounded-xl bg-slate-50 hover:bg-[#00A99D]/10 transition group">
        <MessageCircle className="w-5 h-5 text-[#00A99D]" />
        <span className="text-xs text-slate-600">Chat with Doctor</span>
      </Link>
      <Link href="/user/dashboard/order-medicine" className="flex flex-col items-center gap-2 p-3 rounded-xl bg-slate-50 hover:bg-[#00A99D]/10 transition group">
        <Pill className="w-5 h-5 text-[#00A99D]" />
        <span className="text-xs text-slate-600">Order Medicine</span>
      </Link>
      <Link href="/user/dashboard/health-insurance" className="flex flex-col items-center gap-2 p-3 rounded-xl bg-slate-50 hover:bg-[#00A99D]/10 transition group">
        <Shield className="w-5 h-5 text-[#00A99D]" />
        <span className="text-xs text-slate-600">Health Insurance</span>
      </Link>
    </div>
  </div>
</div>
      </div>
    </div>
  );
}

// Missing Icons
function Receipt({ className }) {
  return (
    <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
    </svg>
  );
}

function Microscope({ className }) {
  return (
    <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
    </svg>
  );
}