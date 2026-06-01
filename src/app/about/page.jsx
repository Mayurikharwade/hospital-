"use client";

import Link from "next/link";
import { ChevronLeft } from "lucide-react";
import Navbar from "@/components/home/Navbar";
import Footer from "@/components/home/Footer";
import AboutHero from "@/components/about/AboutHero";
import AboutStats from "@/components/about/AboutStats";
import AboutMission from "@/components/about/AboutMission";
import AboutStory from "@/components/about/AboutStory";
import AboutTeam from "@/components/about/AboutTeam";
import AboutCTA from "@/components/about/AboutCTA";

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-teal-50/30">
      <Navbar />
      
      {/* Components - Bilkul gap nahi */}
      <AboutHero />
      <AboutStats />
      <AboutMission />
      <AboutStory />
      <AboutTeam />
      <AboutCTA />
      
      {/* Back button - minimal padding */}
      <div className="text-center">
        <Link href="/" className="inline-flex items-center gap-1 text-sm text-teal-600 hover:gap-2 transition py-2">
          <ChevronLeft className="w-4 h-4" /> Back to Home
        </Link>
      </div>
      
      <Footer />
    </div>
  );
}