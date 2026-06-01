"use client";

import { useState, useRef, useEffect } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { Menu, ChevronDown, User, Settings, LogOut, Bell, PhoneCall, Heart } from "lucide-react";

export default function Header({ isSidebarCollapsed, setIsSidebarCollapsed }) {
  const router = useRouter();
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const [showNotification, setShowNotification] = useState(false);
  const dropdownRef = useRef(null);
  const notificationRef = useRef(null);

  const userData = {
    name: "Maram Kalpana",
    opNumber: "EOP2026047",
    bloodGroup: "O+",
    avatar: "https://randomuser.me/api/portraits/women/68.jpg",
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
    router.push("/");
  };

  const handleSOS = () => {
    alert("🚨 Emergency SOS Activated! Our team will contact you immediately.\n\nEmergency Helpline: +91 98765 43210");
  };

  const handleNotification = () => {
    setShowNotification(!showNotification);
  };

  return (
    <header className="sticky top-0 w-full h-[60px] bg-white border-b border-slate-200 z-30 shadow-sm">
      <div className="flex items-center justify-between h-full px-4 md:px-5">
        
        {/* --- LEFT SECTION --- */}
        <div className="flex items-center gap-3">
          {/* Desktop Sidebar Toggle Button - Only on desktop */}
          <button
            onClick={() => setIsSidebarCollapsed(!isSidebarCollapsed)}
            className="hidden md:flex w-9 h-9 rounded-lg items-center justify-center hover:bg-slate-100 transition-colors text-slate-600"
          >
            <Menu className="w-5 h-5" />
          </button>

          {/* Welcome Message - Full on all devices (no mobile menu icon) */}
          <div className="flex items-center gap-2">
            <Heart className="w-4 h-4 text-[#00A99D]" />
            <h1 className="text-sm md:text-lg font-bold bg-gradient-to-r from-[#013A63] to-[#00A99D] bg-clip-text text-transparent">
              Welcome back, Maram!
            </h1>
          </div>
        </div>

        {/* --- RIGHT SECTION --- */}
        <div className="flex items-center gap-3 lg:gap-4">
          
          {/* SOS Emergency Button */}
          <button 
            onClick={handleSOS}
            className="flex items-center gap-1.5 bg-red-50 text-red-600 px-2 py-1.5 md:px-3 rounded-full text-xs font-semibold hover:bg-red-100 transition-colors border border-red-100 shadow-sm"
          >
            <PhoneCall className="w-3.5 h-3.5" />
            <span className="hidden sm:inline">SOS</span>
            <span className="hidden md:inline"> / Emergency</span>
          </button>

          {/* Notification Bell */}
          <div className="relative" ref={notificationRef}>
            <button 
              onClick={handleNotification}
              className="relative flex items-center justify-center w-8 h-8 md:w-9 md:h-9 rounded-full hover:bg-slate-100 transition-colors"
            >
              <Bell className="w-4 h-4 md:w-4.5 md:h-4.5 text-slate-500" />
              <div className="absolute top-1 right-1 w-1.5 h-1.5 md:w-2 md:h-2 rounded-full bg-red-500 border border-white animate-pulse"></div>
            </button>

            {showNotification && (
              <div className="absolute right-0 mt-2 w-72 md:w-80 bg-white rounded-xl shadow-lg border border-slate-100 overflow-hidden z-50">
                <div className="px-3 py-2 md:px-4 md:py-3 border-b border-slate-100 bg-gradient-to-r from-slate-50 to-white">
                  <h3 className="font-semibold text-[#013A63] text-xs md:text-sm">Notifications</h3>
                </div>
                <div className="max-h-80 overflow-y-auto">
                  <div className="p-2 md:p-3 border-b border-slate-100 hover:bg-slate-50 transition">
                    <p className="text-xs md:text-sm text-slate-800 font-medium">Appointment Reminder</p>
                    <p className="text-[10px] md:text-xs text-slate-500">Appointment with Dr. Shruthika Reddy tomorrow at 10:30 AM</p>
                    <p className="text-[9px] md:text-[10px] text-slate-400 mt-1">2 hours ago</p>
                  </div>
                  <div className="p-2 md:p-3 border-b border-slate-100 hover:bg-slate-50 transition">
                    <p className="text-xs md:text-sm text-slate-800 font-medium">Lab Report Ready</p>
                    <p className="text-[10px] md:text-xs text-slate-500">Your Complete Blood Count report is ready</p>
                    <p className="text-[9px] md:text-[10px] text-slate-400 mt-1">Yesterday</p>
                  </div>
                  <div className="p-2 md:p-3 hover:bg-slate-50 transition">
                    <p className="text-xs md:text-sm text-slate-800 font-medium">Health Tip</p>
                    <p className="text-[10px] md:text-xs text-slate-500">Stay hydrated! Drink 8 glasses of water daily</p>
                    <p className="text-[9px] md:text-[10px] text-slate-400 mt-1">2 days ago</p>
                  </div>
                </div>
                <div className="p-2 border-t border-slate-100 text-center">
                  <button className="text-[10px] md:text-xs text-[#00A99D] font-medium hover:underline">View all</button>
                </div>
              </div>
            )}
          </div>

          {/* Profile Dropdown */}
          <div className="relative" ref={dropdownRef}>
            <button
              onClick={() => setIsProfileOpen(!isProfileOpen)}
              className="flex items-center gap-1 md:gap-2 p-1 rounded-lg hover:bg-slate-50 transition-colors"
            >
              <div className="relative w-7 h-7 md:w-8 md:h-8 rounded-full border-2 border-[#00A99D] overflow-hidden shadow-sm">
                <Image 
                  src={userData.avatar} 
                  alt={userData.name}
                  width={32}
                  height={32}
                  className="w-full h-full object-cover"
                  unoptimized
                />
              </div>
              <div className="hidden sm:block text-left">
                <p className="font-bold text-xs md:text-[13px] text-[#013A63] leading-none">{userData.name.split(" ")[0]}</p>
                <p className="text-[9px] md:text-[11px] text-slate-400 mt-0.5 font-semibold">Patient</p>
              </div>
              <ChevronDown className={`w-3 h-3 md:w-3.5 md:h-3.5 text-slate-400 transition-transform ${isProfileOpen ? "rotate-180" : ""}`} />
            </button>

            {isProfileOpen && (
              <div className="absolute right-0 mt-2 w-56 bg-white rounded-xl shadow-lg border border-slate-100 overflow-hidden z-50">
                <div className="p-3 bg-slate-50/50 border-b border-slate-100">
                  <div className="flex items-center gap-3">
                    <div className="relative w-10 h-10 rounded-full overflow-hidden">
                      <Image 
                        src={userData.avatar} 
                        alt={userData.name}
                        width={40}
                        height={40}
                        className="w-full h-full object-cover"
                        unoptimized
                      />
                    </div>
                    <div>
                      <p className="font-semibold text-[#013A63] text-sm">{userData.name}</p>
                      <p className="text-xs text-slate-500">maram@eashaop.com</p>
                    </div>
                  </div>
                </div>
                <div className="py-1">
                  <Link 
                    href="/user/dashboard/profile" 
                    className="flex items-center gap-3 px-4 py-2 text-sm text-slate-600 hover:bg-[#00A99D]/5 hover:text-[#00A99D] transition w-full text-left"
                    onClick={() => setIsProfileOpen(false)}
                  >
                    <User className="w-4 h-4" /> My Profile
                  </Link>
                  <Link 
                    href="/user/dashboard/settings" 
                    className="flex items-center gap-3 px-4 py-2 text-sm text-slate-600 hover:bg-[#00A99D]/5 hover:text-[#00A99D] transition w-full text-left"
                    onClick={() => setIsProfileOpen(false)}
                  >
                    <Settings className="w-4 h-4" /> Settings
                  </Link>
                  <div className="h-px bg-slate-100 my-1"></div>
                  <button 
                    onClick={handleLogout}
                    className="flex items-center gap-3 px-4 py-2 text-sm text-red-600 hover:bg-red-50 transition w-full text-left"
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
  );
}