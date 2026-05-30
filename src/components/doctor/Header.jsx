"use client";

import { useState, useRef, useEffect } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { Menu, ChevronDown, User, Settings, LogOut, Bell, Heart, PhoneCall, X, AlertTriangle, CheckCircle } from "lucide-react";

export default function DoctorHeader({ isSidebarCollapsed, setIsSidebarCollapsed }) {
  const router = useRouter();
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const [showNotification, setShowNotification] = useState(false);
  const [showSOSModal, setShowSOSModal] = useState(false);
  const [toastMessage, setToastMessage] = useState("");
  const [showToast, setShowToast] = useState(false);
  const dropdownRef = useRef(null);
  const notificationRef = useRef(null);

  const doctorData = {
    name: "Dr. Shruthika Reddy",
    speciality: "Cardiologist",
    opNumber: "DOC2024001",
    avatar: "https://images.unsplash.com/photo-1559839734-2b71ea197ec2?w=100&h=100&fit=crop",
  };

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsProfileOpen(false);
      }
      if (notificationRef.current && !notificationRef.current.contains(event.target)) {
        setShowNotification(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("doctor_profile");
    localStorage.removeItem("doctor_reviews_data");
    localStorage.removeItem("prescriptions");
    router.push("/");
  };

  const showNotificationMsg = (message, isError = false) => {
    setToastMessage(message);
    setShowToast(true);
    setTimeout(() => setShowToast(false), 4000);
  };

  const handleNotificationBell = () => {
    setShowNotification(!showNotification);
  };

  const handleMarkAsRead = () => {
    showNotificationMsg("All notifications marked as read");
    setShowNotification(false);
  };

  // SOS Handler
  const handleSOS = () => {
    setShowSOSModal(true);
  };

  const confirmSOS = () => {
    setShowSOSModal(false);
    showNotificationMsg("🚨 Emergency SOS Activated! Ambulance has been dispatched to your location. Our team will contact you shortly.");
    
    // Optional: Play alert sound
    // const audio = new Audio("/sos-alert.mp3");
    // audio.play();
    
    // Optional: Call API for emergency
    console.log("SOS Activated at:", new Date().toISOString());
  };

  const cancelSOS = () => {
    setShowSOSModal(false);
    showNotificationMsg("SOS cancelled. Stay safe!");
  };

  return (
    <>
      {/* Toast Notification */}
      {showToast && (
        <div className="fixed top-20 right-6 z-50 bg-emerald-500 text-white px-5 py-3 rounded-xl shadow-lg text-sm font-medium flex items-center gap-2 animate-in slide-in-from-top-2">
          {toastMessage.includes("🚨") ? <AlertTriangle className="w-4 h-4" /> : <CheckCircle className="w-4 h-4" />}
          {toastMessage}
        </div>
      )}

      {/* SOS Confirmation Modal */}
      {showSOSModal && (
        <div className="fixed inset-0 bg-black/60 z-50 flex items-center justify-center p-4 backdrop-blur-sm" onClick={() => setShowSOSModal(false)}>
          <div className="bg-white rounded-2xl shadow-2xl w-full max-w-md overflow-hidden" onClick={e => e.stopPropagation()}>
            {/* Modal Header */}
            <div className="bg-gradient-to-r from-red-600 to-red-500 px-5 py-4">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-white/20 flex items-center justify-center">
                  <PhoneCall className="w-5 h-5 text-white" />
                </div>
                <div>
                  <h3 className="font-bold text-white text-lg">Emergency SOS</h3>
                  <p className="text-xs text-white/80">This will alert emergency services</p>
                </div>
              </div>
            </div>
            
            {/* Modal Body */}
            <div className="p-5">
              <div className="bg-red-50 rounded-xl p-4 mb-4 border border-red-100">
                <div className="flex items-start gap-3">
                  <AlertTriangle className="w-5 h-5 text-red-600 flex-shrink-0 mt-0.5" />
                  <div>
                    <p className="text-sm font-semibold text-red-800">Are you sure?</p>
                    <p className="text-xs text-red-600 mt-1">
                      Activating SOS will immediately notify emergency services and share your current location.
                    </p>
                  </div>
                </div>
              </div>
              
              <div className="bg-slate-50 rounded-xl p-3">
                <p className="text-xs font-medium text-slate-600">Emergency Contacts:</p>
                <p className="text-sm font-semibold text-slate-800 mt-1">🚑 Ambulance: 108</p>
                <p className="text-sm font-semibold text-slate-800">🚓 Police: 100</p>
                <p className="text-sm font-semibold text-slate-800">🏥 Hospital: +91 98765 43210</p>
              </div>
            </div>
            
            {/* Modal Footer */}
            <div className="px-5 py-4 bg-slate-50 border-t border-slate-100 flex gap-3">
              <button 
                onClick={cancelSOS}
                className="flex-1 py-2.5 bg-white border border-slate-200 text-slate-600 rounded-xl text-sm font-medium hover:bg-slate-100 transition"
              >
                Cancel
              </button>
              <button 
                onClick={confirmSOS}
                className="flex-1 py-2.5 bg-red-600 text-white rounded-xl text-sm font-medium hover:bg-red-700 transition flex items-center justify-center gap-2"
              >
                <PhoneCall className="w-4 h-4" /> Activate SOS
              </button>
            </div>
          </div>
        </div>
      )}

      <header className="sticky top-0 w-full h-[60px] bg-white border-b border-slate-200 z-30 shadow-sm">
        <div className="flex items-center justify-between h-full px-4 md:px-5">
          
          {/* --- LEFT SECTION --- */}
          <div className="flex items-center gap-3">
            <button
              onClick={() => setIsSidebarCollapsed(!isSidebarCollapsed)}
              className="w-9 h-9 rounded-lg flex items-center justify-center hover:bg-slate-100 transition-colors text-slate-600"
            >
              <Menu className="w-5 h-5" />
            </button>

            <div className="hidden md:flex items-center gap-2">
              <Heart className="w-4 h-4 text-[#00A99D]" />
              <h1 className="text-sm font-bold bg-gradient-to-r from-[#013A63] to-[#00A99D] bg-clip-text text-transparent">
                Welcome back, Dr. Shruthika Reddy!
              </h1>
            </div>
            <div className="md:hidden">
              <h1 className="text-sm font-bold bg-gradient-to-r from-[#013A63] to-[#00A99D] bg-clip-text text-transparent">
                Dr. Shruthika
              </h1>
            </div>
          </div>

          {/* --- RIGHT SECTION --- */}
          <div className="flex items-center gap-2 md:gap-4">
            
            {/* SOS Emergency Button - Working */}
            <button 
              onClick={handleSOS}
              className="flex items-center gap-1.5 bg-red-50 text-red-600 px-3 py-1.5 rounded-full text-xs font-semibold hover:bg-red-100 transition-colors border border-red-100 shadow-sm animate-pulse"
            >
              <PhoneCall className="w-3.5 h-3.5" />
              <span className="hidden sm:inline">SOS / Emergency</span>
            </button>

            {/* Notification Bell */}
            <div className="relative" ref={notificationRef}>
              <button 
                onClick={handleNotificationBell}
                className="relative flex items-center justify-center w-9 h-9 rounded-full hover:bg-slate-100 transition-colors"
              >
                <Bell className="w-4.5 h-4.5 text-slate-500" />
                <div className="absolute top-1.5 right-1.5 w-2 h-2 rounded-full bg-red-500 border-2 border-white animate-pulse"></div>
              </button>

              {/* Notification Dropdown */}
              {showNotification && (
                <div className="absolute right-0 mt-2 w-80 bg-white rounded-xl shadow-lg border border-slate-100 overflow-hidden z-50">
                  <div className="px-4 py-3 border-b border-slate-100 bg-gradient-to-r from-slate-50 to-white flex items-center justify-between">
                    <h3 className="font-semibold text-[#013A63] text-sm">Notifications</h3>
                    <button onClick={handleMarkAsRead} className="text-[10px] text-[#00A99D] hover:underline">Mark all read</button>
                  </div>
                  <div className="max-h-80 overflow-y-auto">
                    <div className="p-3 border-b border-slate-100 hover:bg-slate-50 transition cursor-pointer">
                      <p className="text-sm text-slate-800 font-medium">New Appointment Request</p>
                      <p className="text-xs text-slate-500">Patient Ramesh Sharma requested an appointment for tomorrow at 11:00 AM</p>
                      <p className="text-[10px] text-slate-400 mt-1">5 minutes ago</p>
                    </div>
                    <div className="p-3 border-b border-slate-100 hover:bg-slate-50 transition cursor-pointer">
                      <p className="text-sm text-slate-800 font-medium">Prescription Renewal</p>
                      <p className="text-xs text-slate-500">Patient Priya Patel needs a prescription renewal for heart medication</p>
                      <p className="text-[10px] text-slate-400 mt-1">1 hour ago</p>
                    </div>
                    <div className="p-3 border-b border-slate-100 hover:bg-slate-50 transition cursor-pointer">
                      <p className="text-sm text-slate-800 font-medium">Review Received ⭐⭐⭐⭐⭐</p>
                      <p className="text-xs text-slate-500">New 5-star review from Vikram Singh. "Excellent doctor!"</p>
                      <p className="text-[10px] text-slate-400 mt-1">3 hours ago</p>
                    </div>
                    <div className="p-3 hover:bg-slate-50 transition cursor-pointer">
                      <p className="text-sm text-slate-800 font-medium">Upcoming Schedule</p>
                      <p className="text-xs text-slate-500">You have 4 appointments scheduled for tomorrow</p>
                      <p className="text-[10px] text-slate-400 mt-1">Yesterday</p>
                    </div>
                  </div>
                  <div className="p-2 border-t border-slate-100 text-center">
                    <button className="text-xs text-[#00A99D] font-medium hover:underline">View all notifications</button>
                  </div>
                </div>
              )}
            </div>

            <div className="w-px h-7 bg-slate-200 hidden md:block"></div>

            {/* Profile Dropdown */}
            <div className="relative" ref={dropdownRef}>
              <button
                onClick={() => setIsProfileOpen(!isProfileOpen)}
                className="flex items-center gap-2 p-1 rounded-lg hover:bg-slate-50 transition-colors"
              >
                <img 
                  src={doctorData.avatar} 
                  alt="profile" 
                  className="w-8 h-8 rounded-full border-2 border-[#00A99D] object-cover shadow-sm" 
                />
                <div className="hidden md:block text-left">
                  <p className="font-bold text-[13px] text-[#013A63] leading-none">{doctorData.name}</p>
                  <p className="text-[11px] text-slate-400 mt-0.5 font-medium">{doctorData.speciality}</p>
                </div>
                <ChevronDown className={`w-3.5 h-3.5 text-slate-400 transition-transform ${isProfileOpen ? "rotate-180" : ""}`} />
              </button>

              {/* Dropdown Menu */}
              {isProfileOpen && (
                <div className="absolute right-0 mt-2 w-64 bg-white rounded-xl shadow-lg border border-slate-100 overflow-hidden z-50">
                  <div className="p-3 bg-gradient-to-r from-slate-50 to-white border-b border-slate-100">
                    <div className="flex items-center gap-3">
                      <img 
                        src={doctorData.avatar} 
                        alt="profile" 
                        className="w-10 h-10 rounded-full border-2 border-[#00A99D] object-cover" 
                      />
                      <div>
                        <p className="font-semibold text-[#013A63] text-sm">{doctorData.name}</p>
                        <p className="text-xs text-slate-500">{doctorData.speciality}</p>
                        <p className="text-[10px] text-slate-400 mt-0.5">ID: {doctorData.opNumber}</p>
                      </div>
                    </div>
                  </div>
                  <div className="py-2">
                    <Link 
                      href="/doctor/dashboard/profile" 
                      className="flex items-center gap-3 px-4 py-2.5 text-sm text-slate-600 hover:bg-[#00A99D]/5 hover:text-[#00A99D] transition w-full text-left"
                      onClick={() => setIsProfileOpen(false)}
                    >
                      <User className="w-4 h-4" /> My Profile
                    </Link>
                    <Link 
                      href="/doctor/dashboard/settings" 
                      className="flex items-center gap-3 px-4 py-2.5 text-sm text-slate-600 hover:bg-[#00A99D]/5 hover:text-[#00A99D] transition w-full text-left"
                      onClick={() => setIsProfileOpen(false)}
                    >
                      <Settings className="w-4 h-4" /> Settings
                    </Link>
                    <div className="h-px bg-slate-100 my-1"></div>
                    <button 
                      onClick={handleLogout}
                      className="flex items-center gap-3 px-4 py-2.5 text-sm text-red-600 hover:bg-red-50 transition w-full text-left"
                    >
                      <LogOut className="w-4 h-4" /> Logout
                    </button>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </header>
    </>
  );
}