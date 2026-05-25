"use client";

import { HeartPulse, Stethoscope, Calendar, UserCircle, ArrowRight, Hospital } from "lucide-react";

export default function Hero() {
  return (
    <section className="min-h-screen bg-gradient-to-br from-[#f0fdfa] via-white to-[#e6f7f5] py-10">
      <div className="max-w-7xl mx-auto px-6 w-full">

        {/* BIG BANNER - Sabse pehle dikhega */}
        <div className="relative bg-gradient-to-r from-[#013A63] to-[#00A99D] rounded-3xl overflow-hidden shadow-2xl mb-10">
          
          {/* Background Pattern */}
          <div className="absolute inset-0 opacity-10">
            <div className="absolute top-0 left-0 w-72 h-72 bg-white rounded-full -translate-x-1/2 -translate-y-1/2"></div>
            <div className="absolute bottom-0 right-0 w-96 h-96 bg-white rounded-full translate-x-1/2 translate-y-1/2"></div>
          </div>

          <div className="relative p-8 md:p-12">
            
            {/* Banner Tag */}
            <div className="inline-flex items-center gap-2 bg-white/20 backdrop-blur-sm text-white px-4 py-2 rounded-full text-sm font-medium mb-6">
              <HeartPulse className="w-4 h-4" />
              Trusted Healthcare Platform
            </div>

            {/* Banner Main Content */}
            <div className="flex flex-col lg:flex-row justify-between items-center gap-8">
              
              {/* Left Side - Text */}
              <div className="flex-1 text-center lg:text-left">
                <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-4">
                  Your Health,
                  <br />
                  <span className="text-[#00A99D]">Our Priority</span>
                </h1>
                <p className="text-white/80 text-base md:text-lg max-w-xl mx-auto lg:mx-0 mb-6">
                  Connect with experienced doctors, book appointments, and manage your healthcare easily.
                </p>
                <div className="flex flex-wrap gap-4 justify-center lg:justify-start">
                  <button className="h-12 px-6 rounded-xl bg-white text-[#00A99D] font-semibold hover:bg-gray-100 transition-all flex items-center gap-2">
                    <Calendar className="w-4 h-4" />
                    Book Appointment
                  </button>
                  <button className="h-12 px-6 rounded-xl bg-white/20 backdrop-blur text-white font-semibold hover:bg-white/30 transition-all flex items-center gap-2">
                    <UserCircle className="w-4 h-4" />
                    Find Doctors
                  </button>
                </div>
              </div>

              {/* Right Side - Stats */}
              <div className="flex gap-8">
                <div className="text-center bg-white/10 backdrop-blur rounded-2xl px-6 py-4">
                  <p className="text-3xl font-bold text-white">100+</p>
                  <p className="text-white/70 text-sm">Expert Doctors</p>
                </div>
                <div className="text-center bg-white/10 backdrop-blur rounded-2xl px-6 py-4">
                  <p className="text-3xl font-bold text-white">5000+</p>
                  <p className="text-white/70 text-sm">Happy Patients</p>
                </div>
                <div className="text-center bg-white/10 backdrop-blur rounded-2xl px-6 py-4">
                  <p className="text-3xl font-bold text-white">24/7</p>
                  <p className="text-white/70 text-sm">Support</p>
                </div>
              </div>

            </div>

            {/* Doctors Row Inside Banner */}
            <div className="mt-10 pt-6 border-t border-white/20">
              <div className="flex justify-between items-center mb-4 flex-wrap gap-3">
                <h3 className="text-white font-semibold text-lg">👨‍⚕️ Meet Our Expert Doctors</h3>
                <button className="text-white/80 hover:text-white text-sm flex items-center gap-1">
                  View All Doctors <ArrowRight className="w-4 h-4" />
                </button>
              </div>
              
              <div className="flex flex-wrap justify-center gap-4">
                {/* Doctor 1 */}
                <div className="bg-white rounded-xl p-3 w-32 text-center hover:scale-105 transition cursor-pointer shadow-md">
                  <div className="w-12 h-12 mx-auto bg-gradient-to-br from-[#00A99D] to-[#013A63] rounded-full flex items-center justify-center mb-2">
                    <Stethoscope className="w-5 h-5 text-white" />
                  </div>
                  <h4 className="font-semibold text-[#013A63] text-xs">Dr. Shruthika</h4>
                  <p className="text-[#00A99D] text-[10px]">Cardiologist</p>
                  <div className="text-yellow-500 text-[10px]">★★★★★ 4.9</div>
                </div>

                {/* Doctor 2 */}
                <div className="bg-white rounded-xl p-3 w-32 text-center hover:scale-105 transition cursor-pointer shadow-md">
                  <div className="w-12 h-12 mx-auto bg-gradient-to-br from-[#00A99D] to-[#013A63] rounded-full flex items-center justify-center mb-2">
                    <Stethoscope className="w-5 h-5 text-white" />
                  </div>
                  <h4 className="font-semibold text-[#013A63] text-xs">Dr. Rajesh</h4>
                  <p className="text-[#00A99D] text-[10px]">Neurologist</p>
                  <div className="text-yellow-500 text-[10px]">★★★★★ 4.8</div>
                </div>

                {/* Doctor 3 */}
                <div className="bg-white rounded-xl p-3 w-32 text-center hover:scale-105 transition cursor-pointer shadow-md">
                  <div className="w-12 h-12 mx-auto bg-gradient-to-br from-[#00A99D] to-[#013A63] rounded-full flex items-center justify-center mb-2">
                    <Stethoscope className="w-5 h-5 text-white" />
                  </div>
                  <h4 className="font-semibold text-[#013A63] text-xs">Dr. Priya</h4>
                  <p className="text-[#00A99D] text-[10px]">Dermatologist</p>
                  <div className="text-yellow-500 text-[10px]">★★★★★ 4.7</div>
                </div>

                {/* Doctor 4 */}
                <div className="bg-white rounded-xl p-3 w-32 text-center hover:scale-105 transition cursor-pointer shadow-md">
                  <div className="w-12 h-12 mx-auto bg-gradient-to-br from-[#00A99D] to-[#013A63] rounded-full flex items-center justify-center mb-2">
                    <Stethoscope className="w-5 h-5 text-white" />
                  </div>
                  <h4 className="font-semibold text-[#013A63] text-xs">Dr. Suresh</h4>
                  <p className="text-[#00A99D] text-[10px]">Orthopedic</p>
                  <div className="text-yellow-500 text-[10px]">★★★★★ 4.9</div>
                </div>

                {/* Doctor 5 */}
                <div className="bg-white rounded-xl p-3 w-32 text-center hover:scale-105 transition cursor-pointer shadow-md">
                  <div className="w-12 h-12 mx-auto bg-gradient-to-br from-[#00A99D] to-[#013A63] rounded-full flex items-center justify-center mb-2">
                    <Stethoscope className="w-5 h-5 text-white" />
                  </div>
                  <h4 className="font-semibold text-[#013A63] text-xs">Dr. Anjali</h4>
                  <p className="text-[#00A99D] text-[10px]">Pediatrician</p>
                  <div className="text-yellow-500 text-[10px]">★★★★★ 4.8</div>
                </div>
              </div>
            </div>

          </div>
        </div>

        {/* Optional: Additional content after banner if needed */}
        <div className="text-center">
          <p className="text-slate-500 text-sm">🌟 Trusted by thousands of patients across India</p>
        </div>

      </div>
    </section>
  );
}