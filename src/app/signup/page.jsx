"use client";

import React, { useState } from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { Eye, EyeOff } from "lucide-react";

export default function SignupPage() {
  const router = useRouter();
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [agreed, setAgreed] = useState(false);
  
  const [formData, setFormData] = useState({
    fullName: "",
    phoneNumber: "",
    email: "",
    dateOfBirth: "",
    gender: "Male",
    password: "",
    confirmPassword: "",
  });
  
  const [errors, setErrors] = useState({});

  const genders = ["Male", "Female", "Other"];
  const countryCodes = ["+91", "+1", "+44", "+61", "+81", "+86", "+49"];

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    if (errors[e.target.name]) {
      setErrors({ ...errors, [e.target.name]: "" });
    }
  };

  const validateForm = () => {
    const newErrors = {};
    if (!formData.fullName.trim()) newErrors.fullName = "Full name is required";
    if (!formData.phoneNumber.trim()) newErrors.phoneNumber = "Phone number is required";
    else if (!/^\d{10}$/.test(formData.phoneNumber.replace(/\D/g, ''))) newErrors.phoneNumber = "Phone number must be 10 digits";
    if (!formData.email.trim()) newErrors.email = "Email is required";
    else if (!/\S+@\S+\.\S+/.test(formData.email)) newErrors.email = "Email is invalid";
    if (!formData.dateOfBirth) newErrors.dateOfBirth = "Date of birth is required";
    if (!formData.password) newErrors.password = "Password is required";
    else if (formData.password.length < 6) newErrors.password = "Password must be at least 6 characters";
    if (formData.password !== formData.confirmPassword) newErrors.confirmPassword = "Passwords do not match";
    if (!agreed) newErrors.agreed = "You must agree to the terms";
    
    return newErrors;
  };

  const handleSignup = (e) => {
    e.preventDefault();
    const newErrors = validateForm();
    
    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }
    
    setIsLoading(true);
    
    setTimeout(() => {
      setIsLoading(false);
      setShowSuccess(true);
      
      const userData = {
        name: formData.fullName,
        email: formData.email,
        phone: formData.phoneNumber,
        dob: formData.dateOfBirth,
        gender: formData.gender,
        registeredAt: new Date().toISOString(),
      };
      localStorage.setItem("user_data", JSON.stringify(userData));
      
      setTimeout(() => {
        setShowSuccess(false);
        router.push("/login");
      }, 2000);
    }, 1500);
  };

  return (
    <div className="min-h-screen bg-[#f4f7f6] flex items-center justify-center p-4">
      <div className="w-full max-w-[1000px] mx-auto">
        <div className="flex flex-col md:flex-row bg-white rounded-2xl shadow-2xl overflow-hidden">
          
          {/* LEFT SIDE - IMAGE & CONTENT (Equal 50%) */}
          <div className="hidden md:flex md:w-1/2 flex-col justify-center bg-gradient-to-br from-[#013A63] to-[#00A99D] p-8">
            <div className="mb-6">
              <div className="w-16 h-16 rounded-2xl bg-white/20 backdrop-blur flex items-center justify-center mb-6">
                <Image src="/eAshalogo.png" alt="eAshaop" width={40} height={40} className="brightness-0 invert" />
              </div>
              <h2 className="text-3xl font-bold text-white mb-3">Join eAshaop Today!</h2>
              <h3 className="text-xl font-semibold text-white/90 mb-4">Start Your Health Journey</h3>
              <p className="text-white/70 text-sm leading-relaxed">
                Get access to top doctors, easy appointments, and quality healthcare.
              </p>
            </div>
            
            {/* Decorative elements */}
            <div className="mt-8 space-y-3">
              <div className="flex items-center gap-3 text-white/60 text-sm">
                <div className="w-1.5 h-1.5 rounded-full bg-white/40"></div>
                <span>24/7 Emergency Support</span>
              </div>
              <div className="flex items-center gap-3 text-white/60 text-sm">
                <div className="w-1.5 h-1.5 rounded-full bg-white/40"></div>
                <span>100% Verified Doctors</span>
              </div>
              <div className="flex items-center gap-3 text-white/60 text-sm">
                <div className="w-1.5 h-1.5 rounded-full bg-white/40"></div>
                <span>Secure Medical Records</span>
              </div>
            </div>
          </div>

          {/* RIGHT SIDE - SIGNUP FORM (Equal 50%) */}
          <div className="w-full md:w-1/2 p-6 md:p-8 bg-white overflow-y-auto max-h-screen">
            
            <div className="text-center mb-6">
              <div className="flex justify-center mb-3">
                <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-[#00A99D] to-[#013A63] flex items-center justify-center shadow-md overflow-hidden md:hidden">
                  <Image src="/eAshalogo.png" alt="eAshaop" width={24} height={24} className="object-contain brightness-0 invert" />
                </div>
              </div>
              <h1 className="text-2xl font-bold text-[#013A63]">Sign up</h1>
              <p className="text-xs text-gray-500 mt-1">Create your account to get started</p>
            </div>

            {/* Success Message */}
            {showSuccess && (
              <div className="mb-4 p-3 bg-green-50 rounded-xl border border-green-100 text-center">
                <p className="text-xs font-medium text-green-700">✓ Account created successfully! Redirecting to login...</p>
              </div>
            )}

            <form onSubmit={handleSignup} className="space-y-4">
              {/* Full Name */}
              <div>
                <label className="block text-xs font-semibold text-gray-700 mb-1">Full Name</label>
                <input
                  type="text"
                  name="fullName"
                  placeholder="Enter full name"
                  value={formData.fullName}
                  onChange={handleChange}
                  className={`w-full px-4 py-2.5 rounded-xl border ${errors.fullName ? 'border-red-500' : 'border-gray-200'} bg-gray-50 focus:outline-none focus:border-[#00A99D] focus:ring-2 focus:ring-[#00A99D]/20 text-sm transition-all`}
                />
                {errors.fullName && <p className="text-red-500 text-[10px] mt-1">{errors.fullName}</p>}
              </div>

              {/* Phone Number */}
              <div>
                <label className="block text-xs font-semibold text-gray-700 mb-1">Phone number</label>
                <div className="flex gap-2">
                  <select className="w-24 px-3 py-2.5 rounded-xl border border-gray-200 bg-gray-50 text-sm focus:outline-none focus:border-[#00A99D]">
                    {countryCodes.map((code) => (
                      <option key={code} value={code}>{code}</option>
                    ))}
                  </select>
                  <input
                    type="tel"
                    name="phoneNumber"
                    placeholder="Enter phone number"
                    value={formData.phoneNumber}
                    onChange={handleChange}
                    className={`flex-1 px-4 py-2.5 rounded-xl border ${errors.phoneNumber ? 'border-red-500' : 'border-gray-200'} bg-gray-50 focus:outline-none focus:border-[#00A99D] text-sm`}
                  />
                </div>
                {errors.phoneNumber && <p className="text-red-500 text-[10px] mt-1">{errors.phoneNumber}</p>}
              </div>

              {/* Email */}
              <div>
                <label className="block text-xs font-semibold text-gray-700 mb-1">Email</label>
                <input
                  type="email"
                  name="email"
                  placeholder="Enter email address"
                  value={formData.email}
                  onChange={handleChange}
                  className={`w-full px-4 py-2.5 rounded-xl border ${errors.email ? 'border-red-500' : 'border-gray-200'} bg-gray-50 focus:outline-none focus:border-[#00A99D] text-sm`}
                />
                {errors.email && <p className="text-red-500 text-[10px] mt-1">{errors.email}</p>}
              </div>

              {/* Date of Birth & Gender - Two columns */}
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-semibold text-gray-700 mb-1">Date of birth</label>
                  <input
                    type="date"
                    name="dateOfBirth"
                    value={formData.dateOfBirth}
                    onChange={handleChange}
                    className={`w-full px-4 py-2.5 rounded-xl border ${errors.dateOfBirth ? 'border-red-500' : 'border-gray-200'} bg-gray-50 focus:outline-none focus:border-[#00A99D] text-sm`}
                  />
                  {errors.dateOfBirth && <p className="text-red-500 text-[10px] mt-1">{errors.dateOfBirth}</p>}
                </div>

                <div>
                  <label className="block text-xs font-semibold text-gray-700 mb-1">Gender</label>
                  <div className="flex gap-3">
                    {genders.map((gender) => (
                      <label key={gender} className="flex items-center gap-1.5 cursor-pointer">
                        <input
                          type="radio"
                          name="gender"
                          value={gender}
                          checked={formData.gender === gender}
                          onChange={handleChange}
                          className="w-4 h-4 text-[#00A99D] focus:ring-[#00A99D]"
                        />
                        <span className="text-sm text-gray-700">{gender}</span>
                      </label>
                    ))}
                  </div>
                </div>
              </div>

              {/* Password */}
              <div>
                <label className="block text-xs font-semibold text-gray-700 mb-1">Password</label>
                <div className="relative">
                  <input
                    type={showPassword ? "text" : "password"}
                    name="password"
                    placeholder="Create password"
                    value={formData.password}
                    onChange={handleChange}
                    className={`w-full px-4 py-2.5 pr-12 rounded-xl border ${errors.password ? 'border-red-500' : 'border-gray-200'} bg-gray-50 focus:outline-none focus:border-[#00A99D] text-sm`}
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
                  >
                    {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
                  </button>
                </div>
                {errors.password && <p className="text-red-500 text-[10px] mt-1">{errors.password}</p>}
              </div>

              {/* Confirm Password */}
              <div>
                <label className="block text-xs font-semibold text-gray-700 mb-1">Re-enter Password</label>
                <div className="relative">
                  <input
                    type={showConfirmPassword ? "text" : "password"}
                    name="confirmPassword"
                    placeholder="Confirm password"
                    value={formData.confirmPassword}
                    onChange={handleChange}
                    className={`w-full px-4 py-2.5 pr-12 rounded-xl border ${errors.confirmPassword ? 'border-red-500' : 'border-gray-200'} bg-gray-50 focus:outline-none focus:border-[#00A99D] text-sm`}
                  />
                  <button
                    type="button"
                    onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                    className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
                  >
                    {showConfirmPassword ? <EyeOff size={16} /> : <Eye size={16} />}
                  </button>
                </div>
                {errors.confirmPassword && <p className="text-red-500 text-[10px] mt-1">{errors.confirmPassword}</p>}
              </div>

              {/* Terms and Conditions */}
              <div className="flex items-start gap-2 pt-2">
                <input
                  type="checkbox"
                  id="terms"
                  checked={agreed}
                  onChange={(e) => setAgreed(e.target.checked)}
                  className="w-4 h-4 mt-0.5 text-[#00A99D] focus:ring-[#00A99D] rounded border-gray-300"
                />
                <label htmlFor="terms" className="text-[10px] text-gray-500 leading-relaxed">
                  I understand that by providing this consent, I am allowing this application to access and process my personal information for healthcare services.
                </label>
              </div>
              {errors.agreed && <p className="text-red-500 text-[10px]">{errors.agreed}</p>}

              {/* Signup Button */}
              <button
                type="submit"
                disabled={isLoading}
                className={`w-full bg-[#00A99D] text-white py-3 rounded-xl font-semibold text-sm transition-all duration-300 ${
                  isLoading ? 'opacity-70 cursor-not-allowed' : 'hover:bg-[#008b7a] hover:shadow-md'
                }`}
              >
                {isLoading ? "Creating account..." : "Sign Up"}
              </button>
            </form>

            {/* Login Link */}
            <div className="mt-5 text-center">
              <p className="text-gray-500 text-xs">
                Already have an account?{" "}
                <Link href="/login" className="text-[#00A99D] font-semibold hover:underline">
                  Log in
                </Link>
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}