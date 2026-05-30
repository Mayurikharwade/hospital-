"use client";

import { useState } from "react";
import Link from "next/link";
import { ChevronLeft, Heart, Droplet, Moon, Apple, Activity, TrendingUp, Sparkles, Clock, Calendar } from "lucide-react";

export default function HealthTipsPage() {
  const [selectedCategory, setSelectedCategory] = useState("all");

  const categories = ["All", "Heart Health", "Hydration", "Sleep", "Nutrition", "Exercise"];

  const tips = [
    { id: 1, title: "Stay Hydrated! 💧", description: "Drinking enough water helps maintain your body's fluid balance, which helps transport nutrients, regulate temperature, and digest food.", category: "Hydration", icon: Droplet, color: "blue", readTime: "2 min read" },
    { id: 2, title: "Heart Healthy Diet", description: "Eat more fruits, vegetables, whole grains, and lean proteins. Limit saturated fats, sodium, and added sugars to keep your heart healthy.", category: "Heart Health", icon: Heart, color: "red", readTime: "3 min read" },
    { id: 3, title: "Quality Sleep Matters", description: "Adults need 7-9 hours of quality sleep. Good sleep improves brain function, emotional well-being, and physical health.", category: "Sleep", icon: Moon, color: "purple", readTime: "2 min read" },
    { id: 4, title: "Daily Exercise Routine", description: "30 minutes of moderate exercise daily can reduce risk of heart disease, diabetes, and improve mental health.", category: "Exercise", icon: Activity, color: "green", readTime: "3 min read" },
    { id: 5, title: "Balanced Nutrition Guide", description: "Include all food groups in your diet. Protein, carbs, fats, vitamins, and minerals are essential for body functions.", category: "Nutrition", icon: Apple, color: "orange", readTime: "4 min read" },
    { id: 6, title: "Stress Management", description: "Practice deep breathing, meditation, or yoga. Take breaks and connect with loved ones to reduce stress.", category: "Heart Health", icon: Sparkles, color: "teal", readTime: "2 min read" },
  ];

  const filteredTips = selectedCategory === "All" ? tips : tips.filter(tip => tip.category === selectedCategory);

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-teal-50/30">
      <div className="max-w-5xl mx-auto px-4 py-6">
        
        {/* Header */}
        <div className="mb-6">
          <div className="flex items-center gap-2 mb-1">
            <Heart className="w-5 h-5 text-[#00A99D]" />
            <h1 className="text-xl font-bold bg-gradient-to-r from-[#013A63] to-[#00A99D] bg-clip-text text-transparent">
              Health & Wellness Tips
            </h1>
          </div>
          <p className="text-slate-500 text-sm ml-7">Expert advice for a healthier life</p>
        </div>

        {/* Categories Filter */}
        <div className="flex flex-wrap gap-2 mb-6">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`px-4 py-1.5 rounded-full text-sm font-medium transition-all ${
                selectedCategory === cat
                  ? "bg-[#00A99D] text-white shadow-md"
                  : "bg-white text-slate-600 hover:bg-[#00A99D]/10 border border-slate-200"
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Tips Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5 mb-8">
          {filteredTips.map((tip) => (
            <div key={tip.id} className="bg-white rounded-xl shadow-sm border border-slate-100 p-5 hover:shadow-md transition">
              <div className="flex items-start gap-3">
                <div className={`w-10 h-10 rounded-xl bg-${tip.color}-100 flex items-center justify-center flex-shrink-0`}>
                  <tip.icon className={`w-5 h-5 text-${tip.color}-500`} />
                </div>
                <div className="flex-1">
                  <h3 className="font-semibold text-slate-800 text-base">{tip.title}</h3>
                  <p className="text-sm text-slate-500 mt-1 leading-relaxed">{tip.description}</p>
                  <div className="flex items-center gap-3 mt-3">
                    <span className="text-xs text-slate-400 flex items-center gap-1">
                      <Clock className="w-3 h-3" /> {tip.readTime}
                    </span>
                    <span className="text-xs px-2 py-0.5 rounded-full bg-slate-100 text-slate-500">{tip.category}</span>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Quote Section */}
        <div className="bg-gradient-to-r from-[#013A63] to-[#00A99D] rounded-xl p-6 text-white text-center">
          <Sparkles className="w-8 h-8 text-yellow-300 mx-auto mb-3" />
          <p className="text-lg font-medium italic">"Your health is an investment, not an expense."</p>
          <p className="text-sm text-white/70 mt-2">— Dr. Shruthika Reddy</p>
        </div>

        {/* Back to Dashboard */}
        <div className="mt-6 text-center">
          <Link href="/doctor/dashboard" className="inline-flex items-center gap-1 text-sm text-[#00A99D] font-medium hover:gap-2 transition">
            <ChevronLeft className="w-4 h-4" /> Back to Dashboard
          </Link>
        </div>
      </div>
    </div>
  );
}