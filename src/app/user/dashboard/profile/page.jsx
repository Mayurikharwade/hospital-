"use client";

import { useState } from "react";
import Link from "next/link";
import {
  User,
  Mail,
  Phone,
  MapPin,
  Calendar,
  Heart,
  Activity,
  Edit,
  Save,
  X,
  ChevronLeft,
  Camera,
  CheckCircle,
} from "lucide-react";

export default function ProfilePage() {
  const [isEditing, setIsEditing] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);
  
  const [profileData, setProfileData] = useState({
    name: "Maram Kalpana",
    email: "maram@eashaop.com",
    phone: "+91 98765 43210",
    location: "Hyderabad, Telangana",
    bloodGroup: "O+",
    age: "28",
    dob: "15 May 1998",
    gender: "Female",
    emergencyContact: "+91 98765 43211",
    emergencyName: "Ramesh (Father)",
    avatar: "https://randomuser.me/api/portraits/women/68.jpg",
  });

  const handleSave = () => {
    setIsEditing(false);
    setShowSuccess(true);
    setTimeout(() => setShowSuccess(false), 3000);
  };

  const handleChange = (e) => {
    setProfileData({ ...profileData, [e.target.name]: e.target.value });
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-teal-50/30">
      <div className="relative z-10 px-6 py-4">
        
        {/* Success Toast */}
        {showSuccess && (
          <div className="fixed top-20 right-6 z-50 bg-green-500 text-white px-4 py-2 rounded-lg shadow-lg flex items-center gap-2 animate-in slide-in-from-top-2">
            <CheckCircle className="w-4 h-4" />
            Profile updated successfully!
          </div>
        )}

        {/* Header */}
        <div className="mb-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2 mb-1">
              <User className="w-5 h-5 text-[#00A99D]" />
              <h1 className="text-xl font-bold bg-gradient-to-r from-[#013A63] to-[#00A99D] bg-clip-text text-transparent">
                Profile
              </h1>
            </div>
            {!isEditing ? (
              <button
                onClick={() => setIsEditing(true)}
                className="flex items-center gap-2 px-4 py-2 rounded-lg bg-[#00A99D] text-white text-sm font-medium hover:bg-[#009488] transition"
              >
                <Edit className="w-4 h-4" />
                Edit Profile
              </button>
            ) : (
              <button
                onClick={handleSave}
                className="flex items-center gap-2 px-4 py-2 rounded-lg bg-green-500 text-white text-sm font-medium hover:bg-green-600 transition"
              >
                <Save className="w-4 h-4" />
                Save Changes
              </button>
            )}
          </div>
          <p className="text-slate-500 text-sm ml-7">Manage your personal information</p>
        </div>

        {/* Profile Card */}
        <div className="bg-white rounded-xl shadow-sm border border-slate-100 overflow-hidden mb-6">
          {/* Cover Image */}
          <div className="h-24 bg-gradient-to-r from-[#013A63] to-[#00A99D]"></div>
          
          {/* Avatar Section */}
          <div className="relative px-6 pb-6">
            <div className="flex justify-between items-end -mt-12">
              <div className="relative">
                <img
                  src={profileData.avatar}
                  alt={profileData.name}
                  className="w-24 h-24 rounded-full border-4 border-white shadow-md object-cover"
                />
                {isEditing && (
                  <button className="absolute bottom-0 right-0 bg-[#00A99D] p-1.5 rounded-full text-white hover:bg-[#009488] transition">
                    <Camera className="w-3.5 h-3.5" />
                  </button>
                )}
              </div>
              <div className="text-right">
                <p className="text-xs text-slate-400">Member since</p>
                <p className="text-sm font-semibold text-[#013A63]">Jan 2024</p>
              </div>
            </div>

            {/* Name */}
            {!isEditing ? (
              <h2 className="text-xl font-bold text-[#013A63] mt-3">{profileData.name}</h2>
            ) : (
              <input
                type="text"
                name="name"
                value={profileData.name}
                onChange={handleChange}
                className="mt-3 w-full px-3 py-2 rounded-lg border border-slate-200 focus:outline-none focus:border-[#00A99D] text-base font-semibold"
              />
            )}
          </div>
        </div>

        {/* Personal Information */}
        <div className="bg-white rounded-xl shadow-sm border border-slate-100 overflow-hidden mb-6">
          <div className="px-5 py-3 border-b border-slate-100 bg-gradient-to-r from-slate-50 to-white">
            <h3 className="font-semibold text-[#013A63] text-sm flex items-center gap-2">
              <User className="w-4 h-4 text-[#00A99D]" />
              Personal Information
            </h3>
          </div>
          <div className="p-5 space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs text-slate-500 mb-1">Full Name</label>
                {!isEditing ? (
                  <p className="text-sm text-slate-800 font-medium">{profileData.name}</p>
                ) : (
                  <input
                    type="text"
                    name="name"
                    value={profileData.name}
                    onChange={handleChange}
                    className="w-full px-3 py-2 rounded-lg border border-slate-200 focus:outline-none focus:border-[#00A99D] text-sm"
                  />
                )}
              </div>
              <div>
                <label className="block text-xs text-slate-500 mb-1">Email Address</label>
                {!isEditing ? (
                  <div className="flex items-center gap-2">
                    <Mail className="w-3.5 h-3.5 text-slate-400" />
                    <p className="text-sm text-slate-800">{profileData.email}</p>
                  </div>
                ) : (
                  <input
                    type="email"
                    name="email"
                    value={profileData.email}
                    onChange={handleChange}
                    className="w-full px-3 py-2 rounded-lg border border-slate-200 focus:outline-none focus:border-[#00A99D] text-sm"
                  />
                )}
              </div>
              <div>
                <label className="block text-xs text-slate-500 mb-1">Phone Number</label>
                {!isEditing ? (
                  <div className="flex items-center gap-2">
                    <Phone className="w-3.5 h-3.5 text-slate-400" />
                    <p className="text-sm text-slate-800">{profileData.phone}</p>
                  </div>
                ) : (
                  <input
                    type="tel"
                    name="phone"
                    value={profileData.phone}
                    onChange={handleChange}
                    className="w-full px-3 py-2 rounded-lg border border-slate-200 focus:outline-none focus:border-[#00A99D] text-sm"
                  />
                )}
              </div>
              <div>
                <label className="block text-xs text-slate-500 mb-1">Location</label>
                {!isEditing ? (
                  <div className="flex items-center gap-2">
                    <MapPin className="w-3.5 h-3.5 text-slate-400" />
                    <p className="text-sm text-slate-800">{profileData.location}</p>
                  </div>
                ) : (
                  <input
                    type="text"
                    name="location"
                    value={profileData.location}
                    onChange={handleChange}
                    className="w-full px-3 py-2 rounded-lg border border-slate-200 focus:outline-none focus:border-[#00A99D] text-sm"
                  />
                )}
              </div>
              <div>
                <label className="block text-xs text-slate-500 mb-1">Date of Birth</label>
                {!isEditing ? (
                  <div className="flex items-center gap-2">
                    <Calendar className="w-3.5 h-3.5 text-slate-400" />
                    <p className="text-sm text-slate-800">{profileData.dob}</p>
                  </div>
                ) : (
                  <input
                    type="date"
                    name="dob"
                    value={profileData.dob}
                    onChange={handleChange}
                    className="w-full px-3 py-2 rounded-lg border border-slate-200 focus:outline-none focus:border-[#00A99D] text-sm"
                  />
                )}
              </div>
              <div>
                <label className="block text-xs text-slate-500 mb-1">Gender</label>
                {!isEditing ? (
                  <p className="text-sm text-slate-800">{profileData.gender}</p>
                ) : (
                  <select
                    name="gender"
                    value={profileData.gender}
                    onChange={handleChange}
                    className="w-full px-3 py-2 rounded-lg border border-slate-200 focus:outline-none focus:border-[#00A99D] text-sm"
                  >
                    <option>Female</option>
                    <option>Male</option>
                    <option>Other</option>
                  </select>
                )}
              </div>
              <div>
                <label className="block text-xs text-slate-500 mb-1">Age</label>
                {!isEditing ? (
                  <p className="text-sm text-slate-800">{profileData.age} years</p>
                ) : (
                  <input
                    type="number"
                    name="age"
                    value={profileData.age}
                    onChange={handleChange}
                    className="w-full px-3 py-2 rounded-lg border border-slate-200 focus:outline-none focus:border-[#00A99D] text-sm"
                  />
                )}
              </div>
              <div>
                <label className="block text-xs text-slate-500 mb-1">Blood Group</label>
                {!isEditing ? (
                  <div className="flex items-center gap-2">
                    <Heart className="w-3.5 h-3.5 text-red-500" />
                    <p className="text-sm font-semibold text-red-600">{profileData.bloodGroup}</p>
                  </div>
                ) : (
                  <select
                    name="bloodGroup"
                    value={profileData.bloodGroup}
                    onChange={handleChange}
                    className="w-full px-3 py-2 rounded-lg border border-slate-200 focus:outline-none focus:border-[#00A99D] text-sm"
                  >
                    <option>A+</option>
                    <option>A-</option>
                    <option>B+</option>
                    <option>B-</option>
                    <option>O+</option>
                    <option>O-</option>
                    <option>AB+</option>
                    <option>AB-</option>
                  </select>
                )}
              </div>
            </div>
          </div>
        </div>

        {/* Emergency Contact */}
        <div className="bg-white rounded-xl shadow-sm border border-slate-100 overflow-hidden mb-6">
          <div className="px-5 py-3 border-b border-slate-100 bg-gradient-to-r from-slate-50 to-white">
            <h3 className="font-semibold text-[#013A63] text-sm flex items-center gap-2">
              <Activity className="w-4 h-4 text-red-500" />
              Emergency Contact
            </h3>
          </div>
          <div className="p-5 space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs text-slate-500 mb-1">Contact Name</label>
                {!isEditing ? (
                  <p className="text-sm text-slate-800">{profileData.emergencyName}</p>
                ) : (
                  <input
                    type="text"
                    name="emergencyName"
                    value={profileData.emergencyName}
                    onChange={handleChange}
                    className="w-full px-3 py-2 rounded-lg border border-slate-200 focus:outline-none focus:border-[#00A99D] text-sm"
                  />
                )}
              </div>
              <div>
                <label className="block text-xs text-slate-500 mb-1">Emergency Phone</label>
                {!isEditing ? (
                  <div className="flex items-center gap-2">
                    <Phone className="w-3.5 h-3.5 text-slate-400" />
                    <p className="text-sm text-slate-800">{profileData.emergencyContact}</p>
                  </div>
                ) : (
                  <input
                    type="tel"
                    name="emergencyContact"
                    value={profileData.emergencyContact}
                    onChange={handleChange}
                    className="w-full px-3 py-2 rounded-lg border border-slate-200 focus:outline-none focus:border-[#00A99D] text-sm"
                  />
                )}
              </div>
            </div>
          </div>
        </div>

        {/* Back to Dashboard */}
        <div className="text-center">
          <Link href="/user/dashboard" className="inline-flex items-center gap-1 text-sm text-[#00A99D] font-medium hover:gap-2 transition">
            <ChevronLeft className="w-4 h-4" /> Back to Dashboard
          </Link>
        </div>
      </div>
    </div>
  );
}