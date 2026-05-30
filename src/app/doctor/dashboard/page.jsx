"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import {
  Calendar,
  Clock,
  DollarSign,
  TrendingUp,
  Users,
  Star,
  ChevronRight,
  Activity,
  Wallet,
  Video,
  FileText,
  Heart,
  Sparkles,
  ArrowRight,
  CheckCircle,
  Phone,
  MessageCircle,
  Shield,
  Pill,
} from "lucide-react";

export default function DoctorDashboardPage() {
  const router = useRouter();
  const [selectedPeriod, setSelectedPeriod] = useState("week");
  const [activeTab, setActiveTab] = useState("overview");
  const [hoveredBar, setHoveredBar] = useState(null);

  const doctorData = {
    name: "Dr. Shruthika Reddy",
    speciality: "Cardiologist",
    status: "Active",
    experience: "12+ years",
    rating: 4.9,
    totalPatients: "2,500+",
  };

  // Period-wise data
  const periodData = {
    day: {
      earnings: "₹8,500",
      appointments: "12",
      patients: "45",
      rating: 4.9,
      change: "+5% today",
      weeklyData: [8500, 7200, 9100, 6800, 7700, 8900, 9500],
    },
    week: {
      earnings: "₹22,000",
      appointments: "156",
      patients: "2,500+",
      rating: 4.9,
      change: "+15% this week",
      weeklyData: [22000, 16500, 11000, 5500, 18000, 25000, 20000],
    },
    month: {
      earnings: "₹85,000",
      appointments: "432",
      patients: "2,500+",
      rating: 4.9,
      change: "+12% this month",
      weeklyData: [85000, 72000, 78000, 65000, 82000, 91000, 88000],
    },
    year: {
      earnings: "₹1,25,000",
      appointments: "1,250",
      patients: "2,500+",
      rating: 4.9,
      change: "+8% this year",
      weeklyData: [125000, 118000, 132000, 145000, 138000, 152000, 148000],
    },
  };

  const currentData = periodData[selectedPeriod];
  const days = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];
  const months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
  const labels = selectedPeriod === "month" || selectedPeriod === "year" ? months.slice(0, 7) : days;
  
  const maxEarning = Math.max(...currentData.weeklyData);
  const chartHeight = 100;

  const stats = [
    { title: "Total Earnings", value: currentData.earnings, change: currentData.change, icon: DollarSign, color: "text-green-500", bg: "bg-green-50" },
    { title: "Total Appointments", value: currentData.appointments, change: "+23 this month", icon: Calendar, color: "text-blue-500", bg: "bg-blue-50" },
    { title: "Total Patients", value: currentData.patients, change: "+120 this month", icon: Users, color: "text-purple-500", bg: "bg-purple-50" },
    { title: "Rating", value: currentData.rating, change: "⭐ 4.9 stars", icon: Star, color: "text-amber-500", bg: "bg-amber-50" },
  ];

  const periods = [
    { key: "day", label: "Today" },
    { key: "week", label: "This Week" },
    { key: "month", label: "This Month" },
    { key: "year", label: "This Year" },
  ];

  const handlePeriodChange = (period) => {
    setSelectedPeriod(period);
  };

  // Join Call - Navigate to Video Consult
  const handleJoinCall = () => {
    router.push("/doctor/dashboard/video-consult");
  };

  // Start Call from appointments - Navigate to Video Consult
  const handleStartCall = () => {
    router.push("/doctor/dashboard/video-consult");
  };

  const handleViewAll = (section) => {
    if (section === "appointments") {
      router.push("/doctor/dashboard/appointments");
    }
  };

  const handleQuickAction = (action) => {
    if (action === "Video Consult") {
      router.push("/doctor/dashboard/video-consult");
    } else if (action === "Chat with Patient") {
      router.push("/doctor/dashboard/chat");
    } else if (action === "Prescription") {
      router.push("/doctor/dashboard/prescription");
    } else if (action === "Set Availability") {
      router.push("/doctor/dashboard/availability");
    }
  };

  const handleManageSchedule = () => {
    router.push("/doctor/dashboard/availability");
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-teal-50/30">
      <div className="relative z-10 pt-2 px-6 lg:px-8">
        
        {/* Header - Fixed Heading Color */}
        <div className="mb-6">
          <div className="flex items-center justify-between flex-wrap gap-4">
            <div>
              <h1 className="text-xl font-bold bg-gradient-to-r from-[#013A63] to-[#00A99D] bg-clip-text text-transparent">
                Doctor Dashboard
              </h1>
              <p className="text-slate-500 text-sm mt-1">Here's your practice overview</p>
            </div>
            <div className="flex items-center gap-3">
              <div className="flex items-center gap-1.5 px-3 py-1.5 bg-green-100 rounded-full">
                <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
                <span className="text-xs font-medium text-green-700">Status: Active</span>
              </div>
              <button
                onClick={handleJoinCall}
                className="flex items-center gap-2 px-4 py-1.5 bg-gradient-to-r from-[#00A99D] to-[#009488] text-white rounded-full text-sm font-medium hover:shadow-md transition"
              >
                <Video className="w-4 h-4" />
                Join Call
              </button>
            </div>
          </div>
        </div>

        {/* Period Filters */}
        <div className="flex flex-wrap gap-2 mb-6">
          {periods.map((period) => (
            <button
              key={period.key}
              onClick={() => handlePeriodChange(period.key)}
              className={`px-4 py-1.5 rounded-full text-sm font-medium transition-all ${
                selectedPeriod === period.key
                  ? "bg-[#00A99D] text-white shadow-md"
                  : "bg-white text-slate-600 hover:bg-[#00A99D]/10 border border-slate-200"
              }`}
            >
              {period.label}
            </button>
          ))}
        </div>

        {/* Stats Cards Row */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 mb-8">
          {stats.map((stat, idx) => (
            <div key={idx} className="group bg-white rounded-2xl p-5 shadow-sm hover:shadow-xl transition-all duration-300 hover:-translate-y-1 border border-slate-100">
              <div className="flex items-center justify-between">
                <div className={`w-12 h-12 rounded-xl ${stat.bg} flex items-center justify-center group-hover:scale-110 transition`}>
                  <stat.icon className={`w-6 h-6 ${stat.color}`} />
                </div>
                <span className="text-2xl font-bold text-[#013A63]">{stat.value}</span>
              </div>
              <p className="text-slate-600 mt-3 font-medium">{stat.title}</p>
              <p className="text-xs text-green-600 mt-1">{stat.change}</p>
            </div>
          ))}
        </div>

        {/* Earnings Summary & Chart */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
          
          {/* Earnings Summary Card */}
          <div className="bg-white rounded-2xl shadow-md hover:shadow-xl transition-all duration-300 overflow-hidden border border-slate-100">
            <div className="bg-gradient-to-r from-amber-500/10 to-transparent p-5 border-b border-slate-100">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <div className="w-10 h-10 rounded-xl bg-amber-500 flex items-center justify-center shadow-md">
                    <Wallet className="w-5 h-5 text-white" />
                  </div>
                  <div>
                    <h3 className="font-bold text-[#013A63] text-lg">Earnings Summary</h3>
                    <p className="text-xs text-slate-400">From completed appointments</p>
                  </div>
                </div>
                <button onClick={() => handleViewAll("earnings")} className="text-amber-500 text-sm font-medium flex items-center gap-1 hover:gap-2 transition-all">
                  View all <ChevronRight className="w-4 h-4" />
                </button>
              </div>
            </div>
            <div className="p-5 space-y-4">
              <div className="flex justify-between items-center pb-3 border-b border-slate-100">
                <span className="text-sm text-slate-600">This Week</span>
                <span className="text-lg font-bold text-[#013A63]">{periodData.week.earnings}</span>
              </div>
              <div className="flex justify-between items-center pb-3 border-b border-slate-100">
                <span className="text-sm text-slate-600">This Month</span>
                <span className="text-lg font-bold text-[#013A63]">{periodData.month.earnings}</span>
              </div>
              <div className="flex justify-between items-center pb-3 border-b border-slate-100">
                <span className="text-sm text-slate-600">This Year</span>
                <span className="text-lg font-bold text-[#013A63]">{periodData.year.earnings}</span>
              </div>
              <div className="flex justify-between items-center pt-2">
                <span className="text-base font-semibold text-slate-700">Total</span>
                <span className="text-2xl font-bold text-[#00A99D]">{periodData.year.earnings}</span>
              </div>
            </div>
          </div>

          {/* Chart Card */}
          <div className="lg:col-span-2 bg-white rounded-2xl shadow-md hover:shadow-xl transition-all duration-300 overflow-hidden border border-slate-100">
            <div className="bg-gradient-to-r from-blue-500/10 to-transparent p-5 border-b border-slate-100">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <div className="w-10 h-10 rounded-xl bg-blue-500 flex items-center justify-center shadow-md">
                    <TrendingUp className="w-5 h-5 text-white" />
                  </div>
                  <div>
                    <h3 className="font-bold text-[#013A63] text-lg">Earnings Overview</h3>
                    <p className="text-xs text-slate-400">
                      {selectedPeriod === "day" ? "Today's earnings breakdown" : 
                       selectedPeriod === "week" ? "Weekly earnings breakdown" :
                       selectedPeriod === "month" ? "Monthly earnings breakdown" : "Yearly earnings breakdown"}
                    </p>
                  </div>
                </div>
              </div>
            </div>
            <div className="p-5">
              <div className="flex items-end justify-between h-32 gap-2">
                {currentData.weeklyData.map((earning, idx) => {
                  const barHeight = (earning / maxEarning) * chartHeight;
                  return (
                    <div 
                      key={idx} 
                      className="flex-1 flex flex-col items-center gap-1.5 relative group"
                      onMouseEnter={() => setHoveredBar(idx)}
                      onMouseLeave={() => setHoveredBar(null)}
                    >
                      {hoveredBar === idx && (
                        <div className="absolute -top-8 left-1/2 transform -translate-x-1/2 bg-slate-800 text-white text-xs px-2 py-1 rounded whitespace-nowrap z-10">
                          ₹{earning.toLocaleString()}
                        </div>
                      )}
                      <div 
                        className="w-full bg-gradient-to-t from-[#00A99D]/20 to-[#00A99D]/5 rounded-lg transition-all cursor-pointer"
                        style={{ height: `${barHeight}px` }}
                      >
                        <div 
                          className="w-full bg-gradient-to-t from-[#00A99D] to-[#009488] rounded-lg transition-all group-hover:from-[#009488] group-hover:to-[#008070]"
                          style={{ height: `${barHeight}px` }}
                        ></div>
                      </div>
                      <span className="text-xs font-medium text-slate-600">
                        ₹{(earning/1000).toFixed(0)}k
                      </span>
                      <span className="text-[10px] text-slate-400">
                        {selectedPeriod === "month" || selectedPeriod === "year" ? months[idx] : days[idx]}
                      </span>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        </div>

        {/* Today's Appointments */}
        <div className="bg-white rounded-2xl shadow-md hover:shadow-xl transition-all duration-300 overflow-hidden border border-slate-100 mb-8">
          <div className="bg-gradient-to-r from-[#00A99D]/10 to-transparent p-5 border-b border-slate-100">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <div className="w-10 h-10 rounded-xl bg-[#00A99D] flex items-center justify-center shadow-md">
                  <Calendar className="w-5 h-5 text-white" />
                </div>
                <div>
                  <h3 className="font-bold text-[#013A63] text-lg">Today's Appointments</h3>
                  <p className="text-xs text-slate-400">Your schedule for today</p>
                </div>
              </div>
              <button onClick={() => router.push("/doctor/dashboard/appointments")} className="text-[#00A99D] text-sm font-medium flex items-center gap-1 hover:gap-2 transition-all">
                View all <ChevronRight className="w-4 h-4" />
              </button>
            </div>
          </div>
          <div className="divide-y divide-slate-100">
            {[
              { id: 1, patientName: "Ramesh Sharma", time: "10:30 AM", type: "Follow-up", status: "Confirmed", image: "https://randomuser.me/api/portraits/men/1.jpg" },
              { id: 2, patientName: "Priya Patel", time: "11:00 AM", type: "Consultation", status: "Pending", image: "https://randomuser.me/api/portraits/women/2.jpg" },
              { id: 3, patientName: "Suresh Kumar", time: "02:00 PM", type: "Checkup", status: "Confirmed", image: "https://randomuser.me/api/portraits/men/3.jpg" },
            ].map((apt) => (
              <div key={apt.id} className="p-4 hover:bg-slate-50 transition-all duration-300">
                <div className="flex items-center gap-4">
                  <img src={apt.image} alt={apt.patientName} className="w-12 h-12 rounded-full object-cover" />
                  <div className="flex-1">
                    <div className="flex items-center justify-between flex-wrap">
                      <h4 className="font-semibold text-slate-800">{apt.patientName}</h4>
                      <div className="flex items-center gap-1">
                        <span className="text-xs text-slate-500">{apt.time}</span>
                        <span className={`text-xs px-2 py-1 rounded-full ${apt.status === 'Confirmed' ? 'bg-green-100 text-green-700' : 'bg-amber-100 text-amber-700'}`}>
                          {apt.status}
                        </span>
                      </div>
                    </div>
                    <p className="text-sm text-slate-500">{apt.type}</p>
                    <div className="flex gap-2 mt-2">
                      <button 
                        onClick={handleStartCall}
                        className="px-3 py-1 rounded-lg bg-[#00A99D]/10 text-[#00A99D] text-xs font-medium hover:bg-[#00A99D] hover:text-white transition"
                      >
                        Start Call
                      </button>
                      <button className="px-3 py-1 rounded-lg border border-slate-200 text-slate-600 text-xs font-medium hover:bg-slate-50 transition">
                        Reschedule
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
          <div className="p-3 bg-slate-50 text-center">
            <button 
              onClick={handleManageSchedule}
              className="text-sm text-[#00A99D] font-medium flex items-center justify-center gap-1 w-full"
            >
              Manage Schedule <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Quick Actions */}
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
                <button 
                  onClick={() => router.push("/doctor/dashboard/health-tips")} 
                  className="mt-4 px-4 py-2 bg-white/20 rounded-xl text-sm font-medium hover:bg-white/30 transition"
                >
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
              <button onClick={() => router.push("/doctor/dashboard/video-consult")} className="flex flex-col items-center gap-2 p-3 rounded-xl bg-slate-50 hover:bg-[#00A99D]/10 transition group">
                <Video className="w-5 h-5 text-[#00A99D]" />
                <span className="text-xs text-slate-600">Video Consult</span>
              </button>
              <button onClick={() => router.push("/doctor/dashboard/chat")} className="flex flex-col items-center gap-2 p-3 rounded-xl bg-slate-50 hover:bg-[#00A99D]/10 transition group">
                <MessageCircle className="w-5 h-5 text-[#00A99D]" />
                <span className="text-xs text-slate-600">Chat with Patient</span>
              </button>
              <button onClick={() => router.push("/doctor/dashboard/prescription")} className="flex flex-col items-center gap-2 p-3 rounded-xl bg-slate-50 hover:bg-[#00A99D]/10 transition group">
                <FileText className="w-5 h-5 text-[#00A99D]" />
                <span className="text-xs text-slate-600">Prescription</span>
              </button>
              <button onClick={() => router.push("/doctor/dashboard/availability")} className="flex flex-col items-center gap-2 p-3 rounded-xl bg-slate-50 hover:bg-[#00A99D]/10 transition group">
                <Clock className="w-5 h-5 text-[#00A99D]" />
                <span className="text-xs text-slate-600">Set Availability</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}