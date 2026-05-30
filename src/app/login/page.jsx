"use client";

import React, { useState } from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { Eye, EyeOff } from "lucide-react";

function LoginPage() {
  const router = useRouter();
  const [activeTab, setActiveTab] = useState("user");
  const [showOtpField, setShowOtpField] = useState(false);
  const [identifier, setIdentifier] = useState("");
  const [password, setPassword] = useState("");
  const [otp, setOtp] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [identifierError, setIdentifierError] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [otpError, setOtpError] = useState("");

  // ✅ CREDENTIALS - Make sure these are EXACT
  const userCredentials = {
    identifier: "user@eashaop.com",
    password: "user123",
  };

  const doctorCredentials = {
    identifier: "doctor@eashaop.com",
    password: "doctor123",
  };

  const handleSendOtp = () => {
    if (!identifier) {
      setIdentifierError("Please enter phone number or email");
      return;
    }
    setIdentifierError("");
    alert("OTP sent to your registered phone/email");
  };

  const handleLogin = (e) => {
    e.preventDefault();
    
    console.log("=== LOGIN ATTEMPT ===");
    console.log("Active Tab:", activeTab);
    console.log("Entered Identifier:", identifier);
    console.log("Entered Password:", password);
    
    if (showOtpField) {
      if (!otp || otp.length < 4) {
        setOtpError("Please enter valid OTP");
        return;
      }
      setOtpError("");
      alert("OTP verified successfully!");
      if (activeTab === "user") {
        router.push("/user/dashboard");
      } else {
        router.push("/doctor/dashboard");
      }
    } else {
      if (!identifier) {
        setIdentifierError("Please enter phone number or email");
        return;
      }
      if (!password) {
        setPasswordError("Please enter password");
        return;
      }
      
      // ✅ USER LOGIN
      if (activeTab === "user") {
        console.log("User Credentials Expected:", userCredentials);
        const isMatch = identifier === userCredentials.identifier && password === userCredentials.password;
        console.log("User Match?", isMatch);
        
        if (isMatch) {
          console.log("User login SUCCESS!");
          setIdentifierError("");
          setPasswordError("");
          router.push("/user/dashboard");
        } else {
          console.log("User login FAILED");
          setPasswordError("Invalid email or password for User account");
        }
      } 
      // ✅ DOCTOR LOGIN
      else {
        console.log("Doctor Credentials Expected:", doctorCredentials);
        // Trim any extra spaces
        const enteredIdentifier = identifier.trim();
        const enteredPassword = password.trim();
        const isMatch = enteredIdentifier === doctorCredentials.identifier && enteredPassword === doctorCredentials.password;
        console.log("Doctor Match?", isMatch);
        
        if (isMatch) {
          console.log("Doctor login SUCCESS!");
          setIdentifierError("");
          setPasswordError("");
          router.push("/doctor/dashboard");
        } else {
          console.log("Doctor login FAILED");
          console.log(`Expected: ${doctorCredentials.identifier} / ${doctorCredentials.password}`);
          console.log(`Received: ${enteredIdentifier} / ${enteredPassword}`);
          setPasswordError("Invalid email or password for Doctor account");
        }
      }
    }
  };

  return (
    <div className="min-h-screen bg-[#f4f7f6] flex items-center justify-center p-4">
      <div className="w-full max-w-[900px] mx-auto">
        <div className="flex flex-col md:flex-row bg-white rounded-[32px] shadow-2xl overflow-hidden min-h-[500px]">
          
          {/* LEFT SIDE - DOCTOR IMAGE */}
          <div className="hidden md:block w-1/2 relative bg-[#044a47]">
            <img
              src="https://images.unsplash.com/photo-1622253692010-333f2da6031d?w=600&h=650&fit=crop"
              alt="Doctor"
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent"></div>
            <div className="absolute bottom-8 left-8 right-8 text-white">
              <h2 className="text-xl font-bold mb-2">Your Health,</h2>
              <h2 className="text-xl font-bold mb-2">Your Records, Your Control</h2>
              <p className="text-white/80 text-xs">Access your medical records, book appointments, and consult with top doctors.</p>
            </div>
          </div>

          {/* RIGHT SIDE - FORM */}
          <div className="w-full md:w-1/2 p-6 md:p-8 flex flex-col justify-center bg-white">
            
            {/* Logo */}
            <div className="flex justify-center mb-4">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-[#00A99D] to-[#013A63] flex items-center justify-center shadow-md overflow-hidden">
                <Image src="/eAshalogo.png" alt="eAshaop" width={28} height={28} className="object-contain brightness-0 invert" />
              </div>
            </div>

            <h1 className="text-xl font-bold text-center mb-5 bg-gradient-to-r from-[#013A63] to-[#00A99D] bg-clip-text text-transparent">
              Login to your account
            </h1>

            {/* User/Doctor Tabs */}
            <div className="flex gap-2 mb-5">
              <button
                type="button"
                onClick={() => {
                  setActiveTab("user");
                  setIdentifier("");
                  setPassword("");
                  setPasswordError("");
                }}
                className={`flex-1 py-1.5 text-center font-semibold rounded-full transition text-sm ${
                  activeTab === "user"
                    ? "bg-[#054d4a] text-white shadow-md"
                    : "bg-gray-100 text-gray-500 hover:bg-gray-200"
                }`}
              >
                User
              </button>
              <button
                type="button"
                onClick={() => {
                  setActiveTab("doctor");
                  setIdentifier("");
                  setPassword("");
                  setPasswordError("");
                }}
                className={`flex-1 py-1.5 text-center font-semibold rounded-full transition text-sm ${
                  activeTab === "doctor"
                    ? "bg-[#054d4a] text-white shadow-md"
                    : "bg-gray-100 text-gray-500 hover:bg-gray-200"
                }`}
              >
                Doctor
              </button>
            </div>

            {/* Demo Credentials Box */}
            <div className="mb-4 p-2 bg-blue-50 rounded-lg border border-blue-100 text-center">
              <p className="text-xs font-medium text-blue-700">
                {activeTab === "user" 
                  ? "User Credentials: user@eashaop.com / user123" 
                  : "Doctor Credentials: doctor@eashaop.com / doctor123"}
              </p>
            </div>

            <form onSubmit={handleLogin}>
              {/* Phone/Email Field */}
              <div className="mb-3">
                <label className="block text-xs font-medium text-gray-700 mb-1">Phone Number or Email</label>
                <input
                  type="text"
                  placeholder="Enter phone number or email"
                  value={identifier}
                  onChange={(e) => setIdentifier(e.target.value)}
                  className="w-full px-4 py-2 border border-gray-200 rounded-full bg-[#eef3f6] focus:outline-none focus:border-[#00A99D] text-sm"
                />
                {identifierError && <p className="text-red-500 text-[10px] mt-1 ml-3">{identifierError}</p>}
              </div>

              {/* Password Field */}
              {!showOtpField && (
                <div className="mb-3">
                  <label className="block text-xs font-medium text-gray-700 mb-1">Password</label>
                  <div className="relative">
                    <input
                      type={showPassword ? "text" : "password"}
                      placeholder="Enter password"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      className="w-full px-4 py-2 pr-12 border border-gray-200 rounded-full focus:outline-none focus:border-[#00A99D] text-sm"
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400"
                    >
                      {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
                    </button>
                  </div>
                  {passwordError && <p className="text-red-500 text-[10px] mt-1 ml-3">{passwordError}</p>}
                </div>
              )}

              {/* OTP Field */}
              {showOtpField && (
                <div className="mb-3">
                  <label className="block text-xs font-medium text-gray-700 mb-1">Enter OTP</label>
                  <div className="flex gap-2">
                    <input
                      type="text"
                      placeholder="Enter OTP"
                      value={otp}
                      onChange={(e) => setOtp(e.target.value)}
                      className="flex-1 px-4 py-2 border border-gray-200 rounded-full text-sm"
                      maxLength={6}
                    />
                    <button type="button" onClick={handleSendOtp} className="px-4 py-2 bg-[#00A99D] text-white rounded-full text-sm">Send OTP</button>
                  </div>
                  {otpError && <p className="text-red-500 text-[10px] mt-1 ml-3">{otpError}</p>}
                </div>
              )}

              {/* Login with OTP & Forgot Password */}
              <div className="flex justify-between items-center mb-4">
                <button type="button" onClick={() => setShowOtpField(!showOtpField)} className="text-[#00A99D] hover:underline text-xs">
                  {showOtpField ? "Back to Password Login" : "Login with OTP"}
                </button>
                {!showOtpField && (
                  <button type="button" className="text-[#00A99D] hover:underline text-xs" onClick={() => alert("Reset password link sent!")}>
                    Forgot password?
                  </button>
                )}
              </div>

              {/* Login Button */}
              <button type="submit" className="w-full bg-[#00A99D] text-white py-2 rounded-full font-semibold hover:bg-[#008b7a] transition text-sm">
                Log in
              </button>
            </form>

            {/* Bottom Links */}
            <div className="mt-4 text-center">
              <p className="text-center text-gray-500 text-[11px]">
                Don't have an account? <Link href="/signup" className="text-[#00A99D] font-semibold">Sign up!</Link>
              </p>
              <Link href="/contact" className="text-gray-400 text-[11px] hover:text-[#00A99D]">Contact us</Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default LoginPage;