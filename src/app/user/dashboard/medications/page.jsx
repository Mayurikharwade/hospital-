"use client";

import { useState } from "react";
import Link from "next/link";
import {
  Pill,
  FileText,
  ChevronLeft,
  Calendar,
  Clock,
  Download,
  Eye,
  Plus,
  Search,
  Filter,
  X,
  AlertCircle,
  CheckCircle,
  Clock as ClockIcon,
  User,
  Stethoscope,
  Heart,
  Brain,
  Bone,
  Baby,
} from "lucide-react";

// Active Prescriptions
const activePrescriptions = [
  {
    id: 1,
    doctorName: "Dr. Shruthika Reddy",
    specialty: "Cardiologist",
    date: "20 May 2026",
    expiryDate: "20 Aug 2026",
    status: "Active",
    medicines: [
      { name: "Aspirin 75mg", dosage: "Once daily", duration: "30 days", timing: "Morning" },
      { name: "Atorvastatin 10mg", dosage: "Once daily", duration: "30 days", timing: "Evening" },
    ],
    instructions: "Take after meals. Avoid alcohol.",
    image: "https://images.unsplash.com/photo-1559839734-2b71ea197ec2?w=100&h=100&fit=crop",
  },
  {
    id: 2,
    doctorName: "Dr. Rajesh Kumar",
    specialty: "Neurologist",
    date: "15 May 2026",
    expiryDate: "15 Aug 2026",
    status: "Active",
    medicines: [
      { name: "Gabapentin 300mg", dosage: "Twice daily", duration: "60 days", timing: "Morning & Night" },
      { name: "Vitamin B12", dosage: "Once daily", duration: "60 days", timing: "Morning" },
    ],
    instructions: "Take with food. Stay hydrated.",
    image: "https://images.unsplash.com/photo-1612349317150-e413f6a5b16d?w=100&h=100&fit=crop",
  },
];

// Past Prescriptions
const pastPrescriptions = [
  {
    id: 3,
    doctorName: "Dr. Priya Sharma",
    specialty: "Dermatologist",
    date: "10 Apr 2026",
    expiryDate: "10 Jul 2026",
    status: "Expired",
    medicines: [
      { name: "Doxycycline 100mg", dosage: "Twice daily", duration: "14 days", timing: "Morning & Night" },
      { name: "Clindamycin Gel", dosage: "Apply on affected area", duration: "14 days", timing: "Night" },
    ],
    instructions: "Apply sunscreen during treatment.",
    image: "https://randomuser.me/api/portraits/women/2.jpg",
  },
  {
    id: 4,
    doctorName: "Dr. Suresh Babu",
    specialty: "Orthopedic",
    date: "25 Mar 2026",
    expiryDate: "25 Jun 2026",
    status: "Expired",
    medicines: [
      { name: "Paracetamol 500mg", dosage: "When needed", duration: "5 days", timing: "As required" },
      { name: "Diclofenac Gel", dosage: "Apply twice daily", duration: "7 days", timing: "Morning & Night" },
    ],
    instructions: "Rest and avoid heavy activity.",
    image: "https://images.unsplash.com/photo-1622253692010-333f2da6031d?w=100&h=100&fit=crop",
  },
];

// Medicine Orders
const medicineOrders = [
  {
    id: 1,
    medicineName: "Aspirin 75mg",
    quantity: 30,
    price: "₹150",
    orderDate: "20 May 2026",
    status: "Delivered",
    trackingId: "MP-123456",
  },
  {
    id: 2,
    medicineName: "Atorvastatin 10mg",
    quantity: 30,
    price: "₹280",
    orderDate: "20 May 2026",
    status: "Delivered",
    trackingId: "MP-123457",
  },
];

export default function MedicationsPage() {
  const [activeTab, setActiveTab] = useState("prescriptions");
  const [selectedPrescription, setSelectedPrescription] = useState(null);
  const [showModal, setShowModal] = useState(false);

  const tabs = [
    { id: "prescriptions", label: "Prescriptions", icon: FileText },
    { id: "active", label: "Active", icon: CheckCircle },
    { id: "past", label: "Past", icon: ClockIcon },
    { id: "orders", label: "Medicine Orders", icon: Pill },
  ];

  const getCurrentData = () => {
    if (activeTab === "prescriptions") return activePrescriptions;
    if (activeTab === "active") return activePrescriptions;
    if (activeTab === "past") return pastPrescriptions;
    if (activeTab === "orders") return medicineOrders;
    return [];
  };

  const handleViewDetails = (prescription) => {
    setSelectedPrescription(prescription);
    setShowModal(true);
  };

  const handleDownload = () => {
    alert("Downloading prescription PDF...");
  };

  const handleReorder = (order) => {
    alert(`Reordering ${order.medicineName}`);
  };

  const getSpecialistIcon = (specialty) => {
    switch(specialty) {
      case "Cardiologist": return <Heart className="w-4 h-4" />;
      case "Neurologist": return <Brain className="w-4 h-4" />;
      case "Orthopedic": return <Bone className="w-4 h-4" />;
      case "Pediatrician": return <Baby className="w-4 h-4" />;
      default: return <Stethoscope className="w-4 h-4" />;
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-teal-50/30">
      <div className="relative z-10 px-6 py-4">
        
        {/* Header */}
        <div className="mb-6">
          <div className="flex items-center gap-2 mb-1">
            <Pill className="w-5 h-5 text-[#00A99D]" />
            <h1 className="text-xl font-bold bg-gradient-to-r from-[#013A63] to-[#00A99D] bg-clip-text text-transparent">
              Medications
            </h1>
          </div>
          <p className="text-slate-500 text-sm ml-7">Manage your prescriptions and medicines</p>
        </div>

        {/* Tabs */}
        <div className="flex flex-wrap gap-2 mb-6 border-b border-slate-200">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`flex items-center gap-2 px-4 py-2 text-sm font-medium transition-all ${
                activeTab === tab.id
                  ? "text-[#00A99D] border-b-2 border-[#00A99D]"
                  : "text-slate-500 hover:text-[#00A99D]"
              }`}
            >
              <tab.icon className="w-4 h-4" />
              {tab.label}
            </button>
          ))}
        </div>

        {/* Prescriptions Grid */}
        {(activeTab === "prescriptions" || activeTab === "active" || activeTab === "past") && (
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">
            {getCurrentData().map((pres) => (
              <div key={pres.id} className="bg-white rounded-xl shadow-sm hover:shadow-md transition border border-slate-100 overflow-hidden">
                {/* Header */}
                <div className="p-4 border-b border-slate-100 bg-gradient-to-r from-slate-50 to-white">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <img src={pres.image} alt={pres.doctorName} className="w-12 h-12 rounded-full object-cover" />
                      <div>
                        <div className="flex items-center gap-2">
                          <h3 className="font-semibold text-slate-800 text-sm">{pres.doctorName}</h3>
                          <div className="flex items-center gap-1">
                            {getSpecialistIcon(pres.specialty)}
                            <span className="text-xs text-slate-500">{pres.specialty}</span>
                          </div>
                        </div>
                        <p className="text-xs text-slate-400">Prescribed on {pres.date}</p>
                      </div>
                    </div>
                    <span className={`text-xs px-2 py-1 rounded-full ${
                      pres.status === "Active" ? "bg-green-100 text-green-700" : "bg-gray-100 text-gray-600"
                    }`}>
                      {pres.status}
                    </span>
                  </div>
                </div>

                {/* Medicines List */}
                <div className="p-4 space-y-3">
                  {pres.medicines.map((med, idx) => (
                    <div key={idx} className="flex items-center justify-between pb-2 border-b border-slate-100 last:border-0">
                      <div>
                        <p className="font-medium text-slate-800 text-sm">{med.name}</p>
                        <p className="text-xs text-slate-400">{med.dosage} • {med.timing}</p>
                      </div>
                      <span className="text-xs text-slate-500">{med.duration}</span>
                    </div>
                  ))}

                  {/* Instructions */}
                  {pres.instructions && (
                    <div className="bg-amber-50 rounded-lg p-2 mt-2">
                      <p className="text-xs text-amber-700 flex items-center gap-1">
                        <AlertCircle className="w-3 h-3" />
                        {pres.instructions}
                      </p>
                    </div>
                  )}

                  {/* Action Buttons */}
                  <div className="flex gap-2 pt-2">
                    <button
                      onClick={() => handleViewDetails(pres)}
                      className="flex-1 py-2 rounded-lg border border-slate-200 text-slate-600 text-sm font-medium hover:bg-slate-50 transition flex items-center justify-center gap-1.5"
                    >
                      <Eye className="w-4 h-4" />
                      View Details
                    </button>
                    <button
                      onClick={handleDownload}
                      className="flex-1 py-2 rounded-lg bg-[#00A99D] text-white text-sm font-medium hover:bg-[#009488] transition flex items-center justify-center gap-1.5"
                    >
                      <Download className="w-4 h-4" />
                      Download
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Medicine Orders Table */}
        {activeTab === "orders" && (
          <div className="bg-white rounded-xl shadow-sm border border-slate-100 overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-slate-50 border-b border-slate-200">
                  <tr>
                    <th className="text-left px-4 py-3 text-xs font-semibold text-slate-600">Medicine</th>
                    <th className="text-left px-4 py-3 text-xs font-semibold text-slate-600">Quantity</th>
                    <th className="text-left px-4 py-3 text-xs font-semibold text-slate-600">Price</th>
                    <th className="text-left px-4 py-3 text-xs font-semibold text-slate-600">Order Date</th>
                    <th className="text-left px-4 py-3 text-xs font-semibold text-slate-600">Status</th>
                    <th className="text-left px-4 py-3 text-xs font-semibold text-slate-600">Action</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                  {medicineOrders.map((order) => (
                    <tr key={order.id} className="hover:bg-slate-50 transition">
                      <td className="px-4 py-3 text-sm font-medium text-slate-800">{order.medicineName}</td>
                      <td className="px-4 py-3 text-sm text-slate-600">{order.quantity}</td>
                      <td className="px-4 py-3 text-sm font-semibold text-[#00A99D]">{order.price}</td>
                      <td className="px-4 py-3 text-sm text-slate-600">{order.orderDate}</td>
                      <td className="px-4 py-3">
                        <span className="text-xs px-2 py-1 rounded-full bg-green-100 text-green-700">{order.status}</span>
                      </td>
                      <td className="px-4 py-3">
                        <button
                          onClick={() => handleReorder(order)}
                          className="text-sm text-[#00A99D] hover:underline"
                        >
                          Reorder
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* No Data */}
        {getCurrentData().length === 0 && (
          <div className="text-center py-12">
            <div className="bg-white rounded-xl p-8 max-w-md mx-auto">
              <Pill className="w-14 h-14 text-slate-300 mx-auto mb-3" />
              <h3 className="text-lg font-semibold text-slate-700">No {activeTab} records found</h3>
              <p className="text-slate-500 text-sm">Your prescriptions will appear here</p>
            </div>
          </div>
        )}

        {/* Back to Dashboard */}
        <div className="mt-6 text-center">
          <Link href="/user/dashboard" className="inline-flex items-center gap-1 text-sm text-[#00A99D] font-medium hover:gap-2 transition">
            <ChevronLeft className="w-4 h-4" /> Back to Dashboard
          </Link>
        </div>
      </div>

      {/* Prescription Details Modal */}
      {showModal && selectedPrescription && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4" onClick={() => setShowModal(false)}>
          <div className="bg-white rounded-xl max-w-md w-full max-h-[90vh] overflow-y-auto" onClick={(e) => e.stopPropagation()}>
            <div className="sticky top-0 bg-white border-b border-slate-100 px-5 py-4 flex items-center justify-between">
              <h3 className="font-bold text-[#013A63] text-lg">Prescription Details</h3>
              <button onClick={() => setShowModal(false)} className="text-slate-400 hover:text-slate-600">
                <X className="w-5 h-5" />
              </button>
            </div>
            
            <div className="p-5 space-y-4">
              <div className="flex items-center gap-3">
                <img src={selectedPrescription.image} alt={selectedPrescription.doctorName} className="w-14 h-14 rounded-full object-cover" />
                <div>
                  <h4 className="font-bold text-slate-800">{selectedPrescription.doctorName}</h4>
                  <p className="text-sm text-slate-500">{selectedPrescription.specialty}</p>
                  <p className="text-xs text-slate-400">Prescribed on {selectedPrescription.date}</p>
                </div>
              </div>

              <div className="border-t border-slate-100 pt-3">
                <p className="font-semibold text-slate-700 text-sm mb-2">Medicines</p>
                <div className="space-y-3">
                  {selectedPrescription.medicines.map((med, idx) => (
                    <div key={idx} className="bg-slate-50 rounded-lg p-3">
                      <p className="font-medium text-slate-800">{med.name}</p>
                      <p className="text-xs text-slate-500">Dosage: {med.dosage}</p>
                      <p className="text-xs text-slate-500">Duration: {med.duration}</p>
                      <p className="text-xs text-slate-500">Timing: {med.timing}</p>
                    </div>
                  ))}
                </div>
              </div>

              {selectedPrescription.instructions && (
                <div className="bg-amber-50 rounded-lg p-3">
                  <p className="text-xs font-semibold text-amber-700 mb-1">Instructions</p>
                  <p className="text-sm text-amber-700">{selectedPrescription.instructions}</p>
                </div>
              )}

              <div className="flex gap-3 pt-2">
                <button
                  onClick={handleDownload}
                  className="flex-1 py-2.5 rounded-lg bg-[#00A99D] text-white text-sm font-semibold flex items-center justify-center gap-2"
                >
                  <Download className="w-4 h-4" />
                  Download PDF
                </button>
                <button
                  onClick={() => setShowModal(false)}
                  className="flex-1 py-2.5 rounded-lg border border-slate-200 text-slate-600 text-sm font-semibold"
                >
                  Close
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}