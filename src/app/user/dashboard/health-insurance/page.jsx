"use client";

import { useState } from "react";
import Link from "next/link";
import { Shield, CheckCircle, ChevronLeft, Calendar, Phone, Mail, FileText, Users } from "lucide-react";

const insurancePlans = [
  { id: 1, name: "Basic Health Plan", coverage: "₹5 Lakhs", premium: "₹500/month", features: ["OPD Coverage", "Pharmacy", "Lab Tests"] },
  { id: 2, name: "Family Health Plan", coverage: "₹10 Lakhs", premium: "₹900/month", features: ["Family of 4", "Maternity", "OPD Coverage"] },
  { id: 3, name: "Premium Health Plan", coverage: "₹25 Lakhs", premium: "₹1,500/month", features: ["Cashless Treatment", "Critical Illness", "Annual Checkup"] },
];

export default function HealthInsurancePage() {
  const [selectedPlan, setSelectedPlan] = useState(null);

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-teal-50/30">
      <div className="relative z-10 px-6 py-4">
        
        {/* Header */}
        <div className="mb-6">
          <div className="flex items-center gap-2 mb-1">
            <Shield className="w-5 h-5 text-[#00A99D]" />
            <h1 className="text-xl font-bold bg-gradient-to-r from-[#013A63] to-[#00A99D] bg-clip-text text-transparent">
              Health Insurance
            </h1>
          </div>
          <p className="text-slate-500 text-sm ml-7">Protect your health with our insurance plans</p>
        </div>

        {/* Plans */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-5 mb-8">
          {insurancePlans.map((plan) => (
            <div key={plan.id} className={`bg-white rounded-xl p-5 shadow-sm border transition-all cursor-pointer ${selectedPlan?.id === plan.id ? "border-[#00A99D] shadow-md" : "border-slate-100 hover:shadow-md"}`} onClick={() => setSelectedPlan(plan)}>
              <Shield className="w-10 h-10 text-[#00A99D] mb-3" />
              <h3 className="font-bold text-slate-800 text-lg">{plan.name}</h3>
              <p className="text-2xl font-bold text-[#00A99D]">{plan.premium}</p>
              <p className="text-xs text-slate-400">Coverage up to {plan.coverage}</p>
              <div className="mt-3 space-y-1">
                {plan.features.map((feature, idx) => (
                  <div key={idx} className="flex items-center gap-1 text-xs text-slate-600"><CheckCircle className="w-3 h-3 text-green-500" /> {feature}</div>
                ))}
              </div>
            </div>
          ))}
        </div>

        {/* Selected Plan Details */}
        {selectedPlan && (
          <div className="bg-gradient-to-r from-[#013A63] to-[#00A99D] rounded-xl p-5 text-white">
            <h3 className="font-bold text-lg">Selected: {selectedPlan.name}</h3>
            <p className="text-white/80 text-sm mt-1">Premium: {selectedPlan.premium} • Coverage: {selectedPlan.coverage}</p>
            <button className="mt-4 px-6 py-2 bg-white text-[#013A63] rounded-lg font-medium hover:bg-opacity-90 transition" onClick={() => alert(`Enquiry sent for ${selectedPlan.name} plan. Our team will contact you.`)}>
              Get Quote
            </button>
          </div>
        )}

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