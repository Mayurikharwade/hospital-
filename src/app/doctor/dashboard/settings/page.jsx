"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { 
  ChevronLeft, 
  User, 
  Bell, 
  Lock, 
  Globe, 
  Moon, 
  Sun,
  Mail,
  Phone,
  MapPin,
  Languages,
  Shield,
  Eye,
  EyeOff,
  Save,
  CheckCircle,
  AlertCircle,
  Sparkles,
  Clock,
  Calendar,
  DollarSign,
  CreditCard,
  Smartphone,
  Laptop,
  LogOut
} from "lucide-react";

export default function SettingsPage() {
  const [showToast, setShowToast] = useState(false);
  const [toastMessage, setToastMessage] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [isEditing, setIsEditing] = useState(false);

  // Settings State
  const [settings, setSettings] = useState({
    // Profile Settings
    fullName: "Dr. Shruthika Reddy",
    email: "shruthika@eashaop.com",
    phone: "+91 98765 43210",
    location: "Hyderabad, Telangana",
    
    // Notification Settings
    emailNotifications: true,
    smsNotifications: true,
    appointmentReminders: true,
    promotionalEmails: false,
    
    // Privacy Settings
    twoFactorAuth: false,
    profileVisibility: "private",
    dataSharing: false,
    
    // Appearance
    theme: "light",
    fontSize: "medium",
    
    // Language
    language: "english",
    
    // Consultation Settings
    consultationFee: "1200",
    consultationMode: "both",
    bufferTime: "15",
    
    // Password Change
    currentPassword: "",
    newPassword: "",
    confirmPassword: ""
  });

  const showNotification = (msg) => {
    setToastMessage(msg);
    setShowToast(true);
    setTimeout(() => setShowToast(false), 3000);
  };

  const handleSave = () => {
    localStorage.setItem("doctor_settings", JSON.stringify(settings));
    setIsEditing(false);
    showNotification("Settings saved successfully! ✅");
  };

  const handleCancel = () => {
    setIsEditing(false);
    showNotification("Changes cancelled");
  };

  const handleChangePassword = () => {
    if (!settings.currentPassword) {
      showNotification("Please enter current password");
      return;
    }
    if (settings.newPassword !== settings.confirmPassword) {
      showNotification("New passwords do not match");
      return;
    }
    if (settings.newPassword.length < 6) {
      showNotification("Password must be at least 6 characters");
      return;
    }
    showNotification("Password changed successfully! 🔒");
    setSettings({
      ...settings,
      currentPassword: "",
      newPassword: "",
      confirmPassword: ""
    });
  };

  useEffect(() => {
    const saved = localStorage.getItem("doctor_settings");
    if (saved) {
      setSettings(JSON.parse(saved));
    }
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-teal-50/30">
      
      {/* Toast Notification */}
      {showToast && (
        <div className="fixed top-24 right-6 z-50 bg-emerald-500 text-white px-5 py-2.5 rounded-xl shadow-lg text-sm font-medium flex items-center gap-2 animate-in slide-in-from-top-2">
          <Sparkles className="w-4 h-4" /> {toastMessage}
        </div>
      )}

      <div className="max-w-4xl mx-auto px-4 py-6 md:py-8">
        
        {/* Header */}
        <div className="mb-6">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-2xl font-bold text-[#013A63]">Settings</h1>
              <p className="text-slate-500 text-sm">Manage your account preferences and configurations</p>
            </div>
            <div className="flex gap-3">
              {isEditing ? (
                <>
                  <button 
                    onClick={handleCancel}
                    className="px-4 py-2 rounded-lg border border-slate-200 text-slate-600 text-sm font-medium hover:bg-slate-50 transition"
                  >
                    Cancel
                  </button>
                  <button 
                    onClick={handleSave}
                    className="px-4 py-2 rounded-lg bg-[#00A99D] text-white text-sm font-medium hover:bg-[#009488] transition flex items-center gap-2"
                  >
                    <Save className="w-4 h-4" /> Save Changes
                  </button>
                </>
              ) : (
                <button 
                  onClick={() => setIsEditing(true)}
                  className="px-4 py-2 rounded-lg bg-[#00A99D] text-white text-sm font-medium hover:bg-[#009488] transition"
                >
                  Edit Settings
                </button>
              )}
            </div>
          </div>
        </div>

        <div className="space-y-5">
          
          {/* Profile Settings */}
          <div className="bg-white rounded-xl shadow-sm border border-slate-100 overflow-hidden">
            <div className="px-5 py-3 border-b border-slate-100 bg-gradient-to-r from-slate-50 to-white">
              <h2 className="font-semibold text-[#013A63] text-sm flex items-center gap-2">
                <User className="w-4 h-4 text-[#00A99D]" /> Profile Information
              </h2>
            </div>
            <div className="p-5">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                <div>
                  <label className="block text-xs font-medium text-slate-500 mb-1">Full Name</label>
                  {isEditing ? (
                    <input 
                      type="text" 
                      value={settings.fullName} 
                      onChange={(e) => setSettings({...settings, fullName: e.target.value})}
                      className="w-full px-3 py-2 rounded-lg border border-slate-200 text-sm focus:border-[#00A99D] focus:outline-none"
                    />
                  ) : (
                    <p className="text-sm text-slate-800 font-medium">{settings.fullName}</p>
                  )}
                </div>
                <div>
                  <label className="block text-xs font-medium text-slate-500 mb-1">Email Address</label>
                  {isEditing ? (
                    <input 
                      type="email" 
                      value={settings.email} 
                      onChange={(e) => setSettings({...settings, email: e.target.value})}
                      className="w-full px-3 py-2 rounded-lg border border-slate-200 text-sm focus:border-[#00A99D] focus:outline-none"
                    />
                  ) : (
                    <p className="text-sm text-slate-800">{settings.email}</p>
                  )}
                </div>
                <div>
                  <label className="block text-xs font-medium text-slate-500 mb-1">Phone Number</label>
                  {isEditing ? (
                    <input 
                      type="tel" 
                      value={settings.phone} 
                      onChange={(e) => setSettings({...settings, phone: e.target.value})}
                      className="w-full px-3 py-2 rounded-lg border border-slate-200 text-sm focus:border-[#00A99D] focus:outline-none"
                    />
                  ) : (
                    <p className="text-sm text-slate-800">{settings.phone}</p>
                  )}
                </div>
                <div>
                  <label className="block text-xs font-medium text-slate-500 mb-1">Location</label>
                  {isEditing ? (
                    <input 
                      type="text" 
                      value={settings.location} 
                      onChange={(e) => setSettings({...settings, location: e.target.value})}
                      className="w-full px-3 py-2 rounded-lg border border-slate-200 text-sm focus:border-[#00A99D] focus:outline-none"
                    />
                  ) : (
                    <p className="text-sm text-slate-800">{settings.location}</p>
                  )}
                </div>
              </div>
            </div>
          </div>

          {/* Notification Settings */}
          <div className="bg-white rounded-xl shadow-sm border border-slate-100 overflow-hidden">
            <div className="px-5 py-3 border-b border-slate-100 bg-gradient-to-r from-slate-50 to-white">
              <h2 className="font-semibold text-[#013A63] text-sm flex items-center gap-2">
                <Bell className="w-4 h-4 text-[#00A99D]" /> Notification Preferences
              </h2>
            </div>
            <div className="p-5 space-y-3">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-slate-700">Email Notifications</p>
                  <p className="text-xs text-slate-400">Receive updates via email</p>
                </div>
                <label className="relative inline-flex items-center cursor-pointer">
                  <input 
                    type="checkbox" 
                    checked={settings.emailNotifications} 
                    onChange={(e) => setSettings({...settings, emailNotifications: e.target.checked})}
                    disabled={!isEditing}
                    className="sr-only peer"
                  />
                  <div className="w-10 h-5 bg-slate-200 rounded-full peer peer-checked:bg-[#00A99D] peer-disabled:opacity-50 after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-4 after:w-4 after:transition-all peer-checked:after:translate-x-5"></div>
                </label>
              </div>
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-slate-700">SMS Notifications</p>
                  <p className="text-xs text-slate-400">Receive updates via SMS</p>
                </div>
                <label className="relative inline-flex items-center cursor-pointer">
                  <input 
                    type="checkbox" 
                    checked={settings.smsNotifications} 
                    onChange={(e) => setSettings({...settings, smsNotifications: e.target.checked})}
                    disabled={!isEditing}
                    className="sr-only peer"
                  />
                  <div className="w-10 h-5 bg-slate-200 rounded-full peer peer-checked:bg-[#00A99D] peer-disabled:opacity-50 after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-4 after:w-4 after:transition-all peer-checked:after:translate-x-5"></div>
                </label>
              </div>
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-slate-700">Appointment Reminders</p>
                  <p className="text-xs text-slate-400">Get reminders for upcoming appointments</p>
                </div>
                <label className="relative inline-flex items-center cursor-pointer">
                  <input 
                    type="checkbox" 
                    checked={settings.appointmentReminders} 
                    onChange={(e) => setSettings({...settings, appointmentReminders: e.target.checked})}
                    disabled={!isEditing}
                    className="sr-only peer"
                  />
                  <div className="w-10 h-5 bg-slate-200 rounded-full peer peer-checked:bg-[#00A99D] peer-disabled:opacity-50 after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-4 after:w-4 after:transition-all peer-checked:after:translate-x-5"></div>
                </label>
              </div>
            </div>
          </div>

          {/* Appearance Settings */}
          <div className="bg-white rounded-xl shadow-sm border border-slate-100 overflow-hidden">
            <div className="px-5 py-3 border-b border-slate-100 bg-gradient-to-r from-slate-50 to-white">
              <h2 className="font-semibold text-[#013A63] text-sm flex items-center gap-2">
                <Globe className="w-4 h-4 text-[#00A99D]" /> Appearance & Language
              </h2>
            </div>
            <div className="p-5">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                <div>
                  <label className="block text-xs font-medium text-slate-500 mb-2">Theme</label>
                  <div className="flex gap-3">
                    <button 
                      onClick={() => isEditing && setSettings({...settings, theme: "light"})}
                      className={`flex items-center gap-2 px-3 py-2 rounded-lg border text-sm transition ${settings.theme === "light" ? "border-[#00A99D] bg-[#00A99D]/5 text-[#00A99D]" : "border-slate-200 text-slate-600"}`}
                      disabled={!isEditing}
                    >
                      <Sun className="w-4 h-4" /> Light
                    </button>
                    <button 
                      onClick={() => isEditing && setSettings({...settings, theme: "dark"})}
                      className={`flex items-center gap-2 px-3 py-2 rounded-lg border text-sm transition ${settings.theme === "dark" ? "border-[#00A99D] bg-[#00A99D]/5 text-[#00A99D]" : "border-slate-200 text-slate-600"}`}
                      disabled={!isEditing}
                    >
                      <Moon className="w-4 h-4" /> Dark
                    </button>
                  </div>
                </div>
                <div>
                  <label className="block text-xs font-medium text-slate-500 mb-2">Language</label>
                  <select 
                    value={settings.language} 
                    onChange={(e) => setSettings({...settings, language: e.target.value})}
                    disabled={!isEditing}
                    className="w-full px-3 py-2 rounded-lg border border-slate-200 text-sm focus:border-[#00A99D] focus:outline-none disabled:bg-slate-50"
                  >
                    <option value="english">English</option>
                    <option value="hindi">Hindi</option>
                    <option value="telugu">Telugu</option>
                  </select>
                </div>
              </div>
            </div>
          </div>

          {/* Change Password */}
          <div className="bg-white rounded-xl shadow-sm border border-slate-100 overflow-hidden">
            <div className="px-5 py-3 border-b border-slate-100 bg-gradient-to-r from-slate-50 to-white">
              <h2 className="font-semibold text-[#013A63] text-sm flex items-center gap-2">
                <Lock className="w-4 h-4 text-[#00A99D]" /> Change Password
              </h2>
            </div>
            <div className="p-5">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-medium text-slate-500 mb-1">Current Password</label>
                  <div className="relative">
                    <input 
                      type={showPassword ? "text" : "password"} 
                      value={settings.currentPassword} 
                      onChange={(e) => setSettings({...settings, currentPassword: e.target.value})}
                      placeholder="Enter current password"
                      className="w-full px-3 py-2 rounded-lg border border-slate-200 text-sm focus:border-[#00A99D] focus:outline-none pr-10"
                    />
                    <button 
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400"
                    >
                      {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                    </button>
                  </div>
                </div>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
                <div>
                  <label className="block text-xs font-medium text-slate-500 mb-1">New Password</label>
                  <input 
                    type="password" 
                    value={settings.newPassword} 
                    onChange={(e) => setSettings({...settings, newPassword: e.target.value})}
                    placeholder="Enter new password"
                    className="w-full px-3 py-2 rounded-lg border border-slate-200 text-sm focus:border-[#00A99D] focus:outline-none"
                  />
                </div>
                <div>
                  <label className="block text-xs font-medium text-slate-500 mb-1">Confirm New Password</label>
                  <input 
                    type="password" 
                    value={settings.confirmPassword} 
                    onChange={(e) => setSettings({...settings, confirmPassword: e.target.value})}
                    placeholder="Confirm new password"
                    className="w-full px-3 py-2 rounded-lg border border-slate-200 text-sm focus:border-[#00A99D] focus:outline-none"
                  />
                </div>
              </div>
              <button 
                onClick={handleChangePassword}
                className="mt-4 px-4 py-2 rounded-lg bg-[#00A99D]/10 text-[#00A99D] text-sm font-medium hover:bg-[#00A99D] hover:text-white transition"
              >
                Update Password
              </button>
            </div>
          </div>

          {/* Privacy Settings */}
          <div className="bg-white rounded-xl shadow-sm border border-slate-100 overflow-hidden">
            <div className="px-5 py-3 border-b border-slate-100 bg-gradient-to-r from-slate-50 to-white">
              <h2 className="font-semibold text-[#013A63] text-sm flex items-center gap-2">
                <Shield className="w-4 h-4 text-[#00A99D]" /> Privacy & Security
              </h2>
            </div>
            <div className="p-5 space-y-3">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-slate-700">Two-Factor Authentication</p>
                  <p className="text-xs text-slate-400">Add an extra layer of security</p>
                </div>
                <label className="relative inline-flex items-center cursor-pointer">
                  <input 
                    type="checkbox" 
                    checked={settings.twoFactorAuth} 
                    onChange={(e) => setSettings({...settings, twoFactorAuth: e.target.checked})}
                    disabled={!isEditing}
                    className="sr-only peer"
                  />
                  <div className="w-10 h-5 bg-slate-200 rounded-full peer peer-checked:bg-[#00A99D] peer-disabled:opacity-50 after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-4 after:w-4 after:transition-all peer-checked:after:translate-x-5"></div>
                </label>
              </div>
            </div>
          </div>
        </div>

        {/* Back to Dashboard */}
        <div className="mt-8 text-center">
          <Link href="/doctor/dashboard" className="inline-flex items-center gap-1 text-sm text-[#00A99D] font-medium hover:gap-2 transition">
            <ChevronLeft className="w-4 h-4" /> Back to Dashboard
          </Link>
        </div>
      </div>
    </div>
  );
}