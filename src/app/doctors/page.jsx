"use client";

import { useState } from "react";
// Import Navbar along with your other components
import Navbar from "@/components/home/Navbar"; // Make sure this path matches your project structure
import DoctorsHero from "@/components/doctors/DoctorsHero";
//import DoctorsStats from "@/components/doctors/DoctorsStats";
import DoctorsFilters from "@/components/doctors/DoctorsFilters";
import DoctorsGrid from "@/components/doctors/DoctorsGrid";
import DoctorsFeatures from "@/components/doctors/DoctorsFeatures";
import DoctorsCTA from "@/components/doctors/DoctorsCTA";
import DoctorModal from "@/components/doctors/DoctorModal";
import Footer from "@/components/home/Footer";

const doctorsList = [
  { id: 1, name: "Dr. Shruthika Reddy", specialist: "Cardiologist", experience: "12+ years", location: "Hyderabad", rating: 4.9, patients: "2,500+", image: "https://images.unsplash.com/photo-1559839734-2b71ea197ec2?w=400&h=400&fit=crop", education: "MBBS, MD (Cardiology)", bio: "Expert cardiologist with 12+ years of experience in treating complex heart conditions.", availability: "Mon, Wed, Fri", fees: "₹800", online: true, nextAvailable: "Tomorrow 10:00 AM", achievements: ["Best Cardiologist 2024"], phone: "+91 98765 43210", email: "dr.shruthika@eashaop.com" },
  { id: 2, name: "Dr. Rajesh Kumar", specialist: "Neurologist", experience: "15+ years", location: "Hyderabad", rating: 4.8, patients: "3,200+", image: "https://images.unsplash.com/photo-1612349317150-e413f6a5b16d?w=400&h=400&fit=crop", education: "MBBS, DM (Neurology)", bio: "Stroke specialist and epilepsy expert with advanced neuro-intervention training.", availability: "Tue, Thu, Sat", fees: "₹900", online: true, nextAvailable: "Tomorrow 2:00 PM", achievements: ["Neurology Expert"], phone: "+91 98765 43211", email: "dr.rajesh@eashaop.com" },
  { id: 3, name: "Dr. Priya Sharma", specialist: "Dermatologist", experience: "8+ years", location: "Mumbai", rating: 4.7, patients: "1,800+", image: "https://randomuser.me/api/portraits/women/2.jpg", education: "MBBS, DDVL", bio: "Cosmetic dermatology expert specializing in laser treatments and skin care.", availability: "Mon, Tue, Thu", fees: "₹700", online: false, nextAvailable: "Wed 11:00 AM", achievements: ["Skin Care Specialist"], phone: "+91 98765 43212", email: "dr.priya@eashaop.com" },
  { id: 4, name: "Dr. Suresh Babu", specialist: "Orthopedic", experience: "18+ years", location: "Chennai", rating: 4.9, patients: "4,100+", image: "https://images.unsplash.com/photo-1622253692010-333f2da6031d?w=400&h=400&fit=crop", education: "MBBS, MS (Ortho)", bio: "Joint replacement and sports medicine expert with robotic surgery expertise.", availability: "Mon, Wed, Fri", fees: "₹850", online: true, nextAvailable: "Tomorrow 9:00 AM", achievements: ["Joint Replacement Expert"], phone: "+91 98765 43213", email: "dr.suresh@eashaop.com" },
  { id: 5, name: "Dr. Anjali Mehta", specialist: "Pediatrician", experience: "10+ years", location: "Bangalore", rating: 4.8, patients: "3,500+", image: "https://images.unsplash.com/photo-1527613426441-4da17471b66d?w=400&h=400&fit=crop", education: "MBBS, MD (Pediatrics)", bio: "Child wellness and developmental pediatrics expert with compassionate care.", availability: "Tue, Thu, Sat", fees: "₹650", online: true, nextAvailable: "Tomorrow 3:00 PM", achievements: ["Best Pediatrician"], phone: "+91 98765 43214", email: "dr.anjali@eashaop.com" },
  { id: 6, name: "Dr. Kavita Nair", specialist: "Gynecologist", experience: "11+ years", location: "Hyderabad", rating: 4.9, patients: "3,800+", image: "https://images.unsplash.com/photo-1559839734-2b71ea197ec2?w=400&h=400&fit=crop", education: "MBBS, MD (OBG)", bio: "Women's health, obstetrics, and minimally invasive surgery specialist.", availability: "Mon, Tue, Thu, Fri", fees: "₹750", online: false, nextAvailable: "Fri 10:00 AM", achievements: ["Women's Health Expert"], phone: "+91 98765 43215", email: "dr.kavita@eashaop.com" },
];

const specialties = ["All Specialties", "Cardiologist", "Neurologist", "Dermatologist", "Orthopedic", "Pediatrician", "Gynecologist"];
const locations = ["All Locations", "Hyderabad", "Mumbai", "Chennai", "Bangalore", "Delhi"];

export default function DoctorsPage() {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedLocation, setSelectedLocation] = useState("All Locations");
  const [selectedSpecialty, setSelectedSpecialty] = useState("All Specialties");
  const [selectedDoctor, setSelectedDoctor] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [toastMessage, setToastMessage] = useState("");
  const [showToast, setShowToast] = useState(false);

  const filteredDoctors = doctorsList.filter(doctor => {
    const matchesSearch = doctor.name.toLowerCase().includes(searchTerm.toLowerCase()) || doctor.specialist.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesLocation = selectedLocation === "All Locations" || doctor.location === selectedLocation;
    const matchesSpecialty = selectedSpecialty === "All Specialties" || doctor.specialist === selectedSpecialty;
    return matchesSearch && matchesLocation && matchesSpecialty;
  });

  const handleBook = (doctor) => {
    setToastMessage(`✓ Appointment booked with ${doctor.name}`);
    setShowToast(true);
    setTimeout(() => setShowToast(false), 3000);
  };

  const handleVideoConsult = (doctor) => {
    setToastMessage(`📹 Video consultation scheduled with ${doctor.name}`);
    setShowToast(true);
    setTimeout(() => setShowToast(false), 3000);
  };

  const handleViewDetails = (doctor) => {
    setSelectedDoctor(doctor);
    setShowModal(true);
  };

  return (
    <div className="min-h-screen bg-slate-50">
      {/* Toast Notification */}
      {showToast && (
        <div className="fixed top-24 left-1/2 -translate-x-1/2 z-50 bg-green-500 text-white px-6 py-3 rounded-full shadow-lg text-sm font-medium animate-in fade-in slide-in-from-top-2 transition-all">
          {toastMessage}
        </div>
      )}

      {/* Main Navbar Added Here */}
      <Navbar />

      <DoctorsHero />
      {/* <DoctorsStats /> */}
      
      <DoctorsFilters 
        searchTerm={searchTerm} setSearchTerm={setSearchTerm}
        selectedLocation={selectedLocation} setSelectedLocation={setSelectedLocation}
        selectedSpecialty={selectedSpecialty} setSelectedSpecialty={setSelectedSpecialty}
        locations={locations} specialties={specialties}
      />
      
      <div className="max-w-7xl mx-auto px-6 py-12">
        <DoctorsGrid 
          doctors={filteredDoctors}
          onViewDetails={handleViewDetails}
          onBookAppointment={handleBook}
          onVideoConsult={handleVideoConsult}
        />
      </div>
      
      <DoctorsFeatures />
      <DoctorsCTA />
      <Footer />
      
      {/* DoctorModal updated with isOpen prop 
        Make sure your DoctorModal component uses `isOpen` to hide/show the modal 
        and `doctorData` (or `doctor`) to display the data.
      */}
      <DoctorModal 
        isOpen={showModal} 
        doctorData={selectedDoctor} 
        doctor={selectedDoctor} // Passing both just in case your Modal uses 'doctor' instead of 'doctorData'
        onClose={() => setShowModal(false)} 
        onBook={handleBook} 
      />
    </div>
  );
}