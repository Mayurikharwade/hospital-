"use client";

import Link from 'next/link';
import { ChevronLeft } from 'lucide-react';
import ServicesHero from '@/components/services/ServicesHero';
import ServicesGrid from '@/components/services/ServicesGrid';
// 1. IS LINE KO DELETE YA COMMENT KAR DEIN:
// import ServicesFeatures from '@/components/services/ServicesFeatures'; 
//import HealthCheckup from '@/components/services/HealthCheckup';
import CentresOfExcellence from '@/components/services/CentresOfExcellence';
import InternationalCare from '@/components/services/InternationalCare';
//import FAQS from '@/components/services/FAQS';
import Navbar from '@/components/home/Navbar';
import Footer from '@/components/home/Footer';

export default function ServicesPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-teal-50/30">
      <Navbar />
      <ServicesHero />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <ServicesGrid />
        
        {/* 2. IS LINE KO BHI DELETE YA COMMENT KAR DEIN: */}
        {/* <ServicesFeatures /> */}
        
        <CentresOfExcellence />
        {/* <HealthCheckup /> */}
        <InternationalCare />
        {/* <FAQS /> */}
        <div className="text-center py-8">
          <Link href="/" className="inline-flex items-center gap-1 text-sm text-[#00A99D] hover:gap-2 transition">
            <ChevronLeft className="w-4 h-4" /> Back to Home
          </Link>
        </div>
      </div>
      <Footer />
    </div>
  );
}