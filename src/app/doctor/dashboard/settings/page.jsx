"use client";

import { useState } from "react";
import Link from "next/link";
import {
  Settings,
  Bell,
  Lock,
  Shield,
  Globe,
  ChevronLeft,
  CheckCircle,
  Eye,
  EyeOff,
  LogOut,
  AlertTriangle,
} from "lucide-react";
import { useRouter } from "next/navigation";

export default function SettingsPage() {
  const router = useRouter();
  const [showSuccess, setShowSuccess] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [successMessage, setSuccessMessage] = useState("");
  
  const [notifications, setNotifications] = useState({
    appointmentReminders: true,
    healthTips: true,
    promotional: false,
    emailNotifications: true,
    smsNotifications: true,
  });

  const [passwordData, setPasswordData] = useState({
    currentPassword: "",
    newPassword: "",
    confirmPassword: "",
  });

  const [language, setLanguage] = useState("english");

  const showToast = (message) => {
    setSuccessMessage(message);
    setShowSuccess(true);
    setTimeout(() => setShowSuccess(false), 3000);
  };

  const handleNotificationChange = (key) => {
    setNotifications({ ...notifications, [key]: !notifications[key] });
    showToast(`${key.replace(/([A-Z])/g, ' $1')} ${!notifications[key] ? 'enabled' : 'disabled'}`);
  };

  const handlePasswordChange = (e) => {
    setPasswordData({ ...passwordData, [e.target.name]: e.target.value });
  };

  const handleSavePassword = () => {
    if (!passwordData.currentPassword) {
      alert("Please enter current password");
      return;
    }
    if (!passwordData.newPassword) {
      alert("Please enter new password");
      return;
    }
    if (passwordData.newPassword !== passwordData.confirmPassword) {
      alert("New password and confirm password do not match");
      return;
    }
    if (passwordData.newPassword.length < 6) {
      alert("Password must be at least 6 characters");
      return;
    }
    showToast("Password updated successfully!");
    setPasswordData({ currentPassword: "", newPassword: "", confirmPassword: "" });
  };

  const handleLanguageChange = (lang) => {
    setLanguage(lang);
    showToast(`Language changed to ${lang.charAt(0).toUpperCase() + lang.slice(1)}`);
  };

  const handleLogout = () => {
    if (confirm("Are you sure you want to logout?")) {
      router.push("/login");
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-teal-50/30">
      <div className="relative z-10 px-6 py-4">
        
        {/* Success Toast */}
        {showSuccess && (
          <div className="fixed top-20 right-6 z-50 bg-green-500 text-white px-4 py-2 rounded-lg shadow-lg flex items-center gap-2 animate-in slide-in-from-top-2">
            <CheckCircle className="w-4 h-4" />
            {successMessage}
          </div>
        )}

        {/* Header */}
        <div className="mb-6">
          <div className="flex items-center gap-2 mb-1">
            <Settings className="w-5 h-5 text-[#00A99D]" />
            <h1 className="text-xl font-bold bg-gradient-to-r from-[#013A63] to-[#00A99D] bg-clip-text text-transparent">
              Settings
            </h1>
          </div>
          <p className="text-slate-500 text-sm ml-7">Manage your account preferences</p>
        </div>

        <div className="space-y-5">
          
          {/* Notification Settings */}
          <div className="bg-white rounded-xl shadow-sm border border-slate-100 overflow-hidden">
            <div className="px-5 py-3 border-b border-slate-100 bg-gradient-to-r from-slate-50 to-white">
              <h3 className="font-semibold text-[#013A63] text-sm flex items-center gap-2">
                <Bell className="w-4 h-4 text-[#00A99D]" />
                Notification Preferences
              </h3>
            </div>
            <div className="divide-y divide-slate-100">
              <div className="p-4 flex items-center justify-between">
                <div>
                  <p className="font-medium text-slate-800 text-sm">Appointment Reminders</p>
                  <p className="text-xs text-slate-400">Get reminders about your upcoming appointments</p>
                </div>
                <button
                  onClick={() => handleNotificationChange("appointmentReminders")}
                  className={`w-11 h-6 rounded-full transition-all ${
                    notifications.appointmentReminders ? "bg-[#00A99D]" : "bg-slate-300"
                  }`}
                >
                  <div className={`w-5 h-5 rounded-full bg-white shadow-md transition-transform ${
                    notifications.appointmentReminders ? "translate-x-5" : "translate-x-0.5"
                  } mt-0.5`}></div>
                </button>
              </div>
              <div className="p-4 flex items-center justify-between">
                <div>
                  <p className="font-medium text-slate-800 text-sm">Health Tips & Updates</p>
                  <p className="text-xs text-slate-400">Receive daily health tips and wellness updates</p>
                </div>
                <button
                  onClick={() => handleNotificationChange("healthTips")}
                  className={`w-11 h-6 rounded-full transition-all ${
                    notifications.healthTips ? "bg-[#00A99D]" : "bg-slate-300"
                  }`}
                >
                  <div className={`w-5 h-5 rounded-full bg-white shadow-md transition-transform ${
                    notifications.healthTips ? "translate-x-5" : "translate-x-0.5"
                  } mt-0.5`}></div>
                </button>
              </div>
              <div className="p-4 flex items-center justify-between">
                <div>
                  <p className="font-medium text-slate-800 text-sm">Promotional Offers</p>
                  <p className="text-xs text-slate-400">Get updates about offers and discounts</p>
                </div>
                <button
                  onClick={() => handleNotificationChange("promotional")}
                  className={`w-11 h-6 rounded-full transition-all ${
                    notifications.promotional ? "bg-[#00A99D]" : "bg-slate-300"
                  }`}
                >
                  <div className={`w-5 h-5 rounded-full bg-white shadow-md transition-transform ${
                    notifications.promotional ? "translate-x-5" : "translate-x-0.5"
                  } mt-0.5`}></div>
                </button>
              </div>
              <div className="p-4 flex items-center justify-between">
                <div>
                  <p className="font-medium text-slate-800 text-sm">Email Notifications</p>
                  <p className="text-xs text-slate-400">Receive notifications via email</p>
                </div>
                <button
                  onClick={() => handleNotificationChange("emailNotifications")}
                  className={`w-11 h-6 rounded-full transition-all ${
                    notifications.emailNotifications ? "bg-[#00A99D]" : "bg-slate-300"
                  }`}
                >
                  <div className={`w-5 h-5 rounded-full bg-white shadow-md transition-transform ${
                    notifications.emailNotifications ? "translate-x-5" : "translate-x-0.5"
                  } mt-0.5`}></div>
                </button>
              </div>
              <div className="p-4 flex items-center justify-between">
                <div>
                  <p className="font-medium text-slate-800 text-sm">SMS Notifications</p>
                  <p className="text-xs text-slate-400">Receive notifications via SMS</p>
                </div>
                <button
                  onClick={() => handleNotificationChange("smsNotifications")}
                  className={`w-11 h-6 rounded-full transition-all ${
                    notifications.smsNotifications ? "bg-[#00A99D]" : "bg-slate-300"
                  }`}
                >
                  <div className={`w-5 h-5 rounded-full bg-white shadow-md transition-transform ${
                    notifications.smsNotifications ? "translate-x-5" : "translate-x-0.5"
                  } mt-0.5`}></div>
                </button>
              </div>
            </div>
          </div>

          {/* Change Password */}
          <div className="bg-white rounded-xl shadow-sm border border-slate-100 overflow-hidden">
            <div className="px-5 py-3 border-b border-slate-100 bg-gradient-to-r from-slate-50 to-white">
              <h3 className="font-semibold text-[#013A63] text-sm flex items-center gap-2">
                <Lock className="w-4 h-4 text-[#00A99D]" />
                Change Password
              </h3>
            </div>
            <div className="p-5 space-y-4">
              <div>
                <label className="block text-xs text-slate-500 mb-1">Current Password</label>
                <div className="relative">
                  <input
                    type={showPassword ? "text" : "password"}
                    name="currentPassword"
                    value={passwordData.currentPassword}
                    onChange={handlePasswordChange}
                    placeholder="Enter current password"
                    className="w-full px-3 py-2 pr-10 rounded-lg border border-slate-200 focus:outline-none focus:border-[#00A99D] text-sm"
                  />
                  <button
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-1/2 -translate-y-1/2"
                  >
                    {showPassword ? <EyeOff className="w-4 h-4 text-slate-400" /> : <Eye className="w-4 h-4 text-slate-400" />}
                  </button>
                </div>
              </div>
              <div>
                <label className="block text-xs text-slate-500 mb-1">New Password</label>
                <input
                  type="password"
                  name="newPassword"
                  value={passwordData.newPassword}
                  onChange={handlePasswordChange}
                  placeholder="Enter new password (min 6 characters)"
                  className="w-full px-3 py-2 rounded-lg border border-slate-200 focus:outline-none focus:border-[#00A99D] text-sm"
                />
              </div>
              <div>
                <label className="block text-xs text-slate-500 mb-1">Confirm New Password</label>
                <div className="relative">
                  <input
                    type={showConfirmPassword ? "text" : "password"}
                    name="confirmPassword"
                    value={passwordData.confirmPassword}
                    onChange={handlePasswordChange}
                    placeholder="Confirm new password"
                    className="w-full px-3 py-2 pr-10 rounded-lg border border-slate-200 focus:outline-none focus:border-[#00A99D] text-sm"
                  />
                  <button
                    onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                    className="absolute right-3 top-1/2 -translate-y-1/2"
                  >
                    {showConfirmPassword ? <EyeOff className="w-4 h-4 text-slate-400" /> : <Eye className="w-4 h-4 text-slate-400" />}
                  </button>
                </div>
              </div>
              <button
                onClick={handleSavePassword}
                className="w-full py-2 rounded-lg bg-[#00A99D] text-white text-sm font-medium hover:bg-[#009488] transition"
              >
                Update Password
              </button>
            </div>
          </div>

          {/* Language Preference */}
          <div className="bg-white rounded-xl shadow-sm border border-slate-100 overflow-hidden">
            <div className="px-5 py-3 border-b border-slate-100 bg-gradient-to-r from-slate-50 to-white">
              <h3 className="font-semibold text-[#013A63] text-sm flex items-center gap-2">
                <Globe className="w-4 h-4 text-[#00A99D]" />
                Language Preference
              </h3>
            </div>
            <div className="p-4">
              <div className="grid grid-cols-3 gap-3">
                {[
                  { id: "english", label: "English" },
                  { id: "hindi", label: "हिन्दी" },
                  { id: "telugu", label: "తెలుగు" },
                ].map((lang) => (
                  <button
                    key={lang.id}
                    onClick={() => handleLanguageChange(lang.id)}
                    className={`flex flex-col items-center gap-2 p-3 rounded-lg transition ${
                      language === lang.id
                        ? "bg-[#00A99D]/10 border border-[#00A99D]"
                        : "bg-slate-50 hover:bg-slate-100 border border-transparent"
                    }`}
                  >
                    <span className="text-sm font-medium text-slate-700">{lang.label}</span>
                    {language === lang.id && <CheckCircle className="w-3.5 h-3.5 text-[#00A99D]" />}
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Account Security */}
          <div className="bg-white rounded-xl shadow-sm border border-slate-100 overflow-hidden">
            <div className="px-5 py-3 border-b border-slate-100 bg-gradient-to-r from-slate-50 to-white">
              <h3 className="font-semibold text-[#013A63] text-sm flex items-center gap-2">
                <Shield className="w-4 h-4 text-[#00A99D]" />
                Account Security
              </h3>
            </div>
            <div className="divide-y divide-slate-100">
              <div className="p-4 flex items-center justify-between">
                <div>
                  <p className="font-medium text-slate-800 text-sm">Two-Factor Authentication</p>
                  <p className="text-xs text-slate-400">Add an extra layer of security to your account</p>
                </div>
                <button
                  onClick={() => showToast("2FA setup will be available soon")}
                  className="px-4 py-1.5 rounded-lg bg-slate-100 text-slate-600 text-xs font-medium hover:bg-slate-200 transition"
                >
                  Enable
                </button>
              </div>
              <div className="p-4 flex items-center justify-between">
                <div>
                  <p className="font-medium text-slate-800 text-sm">Login Activity</p>
                  <p className="text-xs text-slate-400">View all devices where you're logged in</p>
                </div>
                <button
                  onClick={() => showToast("Login activity feature coming soon")}
                  className="px-4 py-1.5 rounded-lg bg-slate-100 text-slate-600 text-xs font-medium hover:bg-slate-200 transition"
                >
                  View
                </button>
              </div>
            </div>
          </div>

          {/* Logout Button */}
          <button
            onClick={handleLogout}
            className="w-full flex items-center justify-center gap-2 py-3 rounded-xl bg-red-50 text-red-600 font-semibold text-sm hover:bg-red-100 transition border border-red-200"
          >
            <LogOut className="w-4 h-4" />
            Logout from Account
          </button>
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