"use client";

import { useState } from "react";
import Link from "next/link";
import {
  Receipt,
  Calendar,
  Clock,
  ChevronLeft,
  Download,
  CreditCard,
  CheckCircle,
  FileText,
  Printer,
  Share2,
  Eye,
  X,
} from "lucide-react";

const receiptsList = [
  {
    id: 1,
    receiptNo: "RCP-2026-001",
    type: "Consultation Fee (Clinic Visit)",
    amount: "₹313.00",
    date: "02/04/2026",
    time: "07:30 PM",
    paymentMethod: "Pay at Clinic",
    status: "Successful",
    appointmentType: "Clinic Visit",
    doctorName: "Dr. Shruthika Reddy",
    doctorSpecialty: "Cardiologist",
    opNumber: "EOP2026048",
    generatedAt: "02/04/2026 at 06:39 PM",
    description: "Consultation fee for clinic visit with Dr. Shruthika Reddy",
  },
  {
    id: 2,
    receiptNo: "RCP-2026-002",
    type: "Consultation Fee (Virtual)",
    amount: "₹500.00",
    date: "15/04/2026",
    time: "10:00 AM",
    paymentMethod: "Online (Card)",
    status: "Successful",
    appointmentType: "Virtual Consultation",
    doctorName: "Dr. Rajesh Kumar",
    doctorSpecialty: "Neurologist",
    opNumber: "EOP2026048",
    generatedAt: "15/04/2026 at 10:15 AM",
    description: "Virtual consultation fee for online appointment",
  },
  {
    id: 3,
    receiptNo: "RCP-2026-003",
    type: "Lab Tests - Complete Blood Count",
    amount: "₹1,200.00",
    date: "10/04/2026",
    time: "09:30 AM",
    paymentMethod: "Card",
    status: "Successful",
    appointmentType: "Lab Visit",
    doctorName: "Dr. Priya Sharma",
    doctorSpecialty: "Pathologist",
    opNumber: "EOP2026048",
    generatedAt: "10/04/2026 at 09:45 AM",
    description: "Complete Blood Count test including all parameters",
  },
  {
    id: 4,
    receiptNo: "RCP-2026-004",
    type: "Medicine Purchase",
    amount: "₹450.00",
    date: "05/04/2026",
    time: "03:00 PM",
    paymentMethod: "UPI",
    status: "Successful",
    appointmentType: "Pharmacy",
    doctorName: "Pharmacy",
    doctorSpecialty: "Medicines",
    opNumber: "EOP2026048",
    generatedAt: "05/04/2026 at 03:15 PM",
    description: "Medicines prescribed by Dr. Shruthika Reddy",
  },
  {
    id: 5,
    receiptNo: "RCP-2026-005",
    type: "Health Checkup Package",
    amount: "₹2,500.00",
    date: "28/03/2026",
    time: "08:00 AM",
    paymentMethod: "Insurance",
    status: "Successful",
    appointmentType: "Health Checkup",
    doctorName: "Dr. Anjali Mehta",
    doctorSpecialty: "General Physician",
    opNumber: "EOP2026048",
    generatedAt: "28/03/2026 at 10:00 AM",
    description: "Complete health checkup package including 50+ tests",
  },
];

export default function ReceiptsPage() {
  const [filterType, setFilterType] = useState("all");
  const [selectedReceipt, setSelectedReceipt] = useState(null);
  const [showModal, setShowModal] = useState(false);

  const filterTypes = [
    { id: "all", label: "All", icon: Receipt },
    { id: "consultation", label: "Consultation", icon: FileText },
    { id: "lab", label: "Lab Tests", icon: Eye },
    { id: "medicine", label: "Medicine", icon: Download },
  ];

  const filteredReceipts = receiptsList.filter((receipt) => {
    if (filterType === "all") return true;
    if (filterType === "consultation") return receipt.type.includes("Consultation");
    if (filterType === "lab") return receipt.type.includes("Lab");
    if (filterType === "medicine") return receipt.type.includes("Medicine");
    return true;
  });

  const getStatusColor = (status) => {
    if (status === "Successful") return "bg-green-100 text-green-700";
    return "bg-red-100 text-red-700";
  };

  const handleDownload = (receipt) => {
    alert(`Downloading receipt ${receipt.receiptNo}`);
  };

  const handlePrint = (receipt) => {
    window.print();
  };

  const handleViewDetails = (receipt) => {
    setSelectedReceipt(receipt);
    setShowModal(true);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-teal-50/30">
      <div className="relative z-10 px-6 py-5">
        
        {/* Header */}
        <div className="mb-6">
          <div className="flex items-center gap-2 mb-1">
            <Receipt className="w-5 h-5 text-[#00A99D]" />
            <h1 className="text-xl font-bold bg-gradient-to-r from-[#013A63] to-[#00A99D] bg-clip-text text-transparent">
              Receipts
            </h1>
          </div>
          <p className="text-slate-500 text-sm ml-7">Your payment history and invoices</p>
        </div>

        {/* OP Number Card */}
        <div className="bg-gradient-to-r from-[#013A63] to-[#00A99D] rounded-xl p-4 mb-6 text-white">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm opacity-80">OP Unique Number</p>
              <p className="text-2xl font-bold">EOP2026048</p>
              <p className="text-sm opacity-70 mt-1">Total Spent: ₹4,963.00</p>
            </div>
            <div className="text-right">
              <p className="text-sm opacity-80">Member since</p>
              <p className="text-lg font-semibold">Jan 2024</p>
            </div>
          </div>
        </div>

        {/* Filter Chips - Larger Text */}
        <div className="flex flex-wrap gap-3 mb-8">
          {filterTypes.map((filter) => (
            <button
              key={filter.id}
              onClick={() => setFilterType(filter.id)}
              className={`px-5 py-2 rounded-full text-sm font-medium transition-all flex items-center gap-2 ${
                filterType === filter.id
                  ? "bg-[#00A99D] text-white shadow-md"
                  : "bg-white text-slate-600 hover:bg-[#00A99D]/10 border border-slate-200"
              }`}
            >
              <filter.icon className="w-4 h-4" />
              {filter.label}
            </button>
          ))}
        </div>

        {/* Receipts Grid - Larger Text */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {filteredReceipts.map((receipt) => (
            <div
              key={receipt.id}
              className="bg-white rounded-xl shadow-sm hover:shadow-lg transition-all duration-300 border border-slate-100 overflow-hidden"
            >
              {/* Receipt Header */}
              <div className="p-4 border-b border-slate-100 bg-gradient-to-r from-slate-50 to-white">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-lg bg-[#00A99D]/10 flex items-center justify-center">
                      <Receipt className="w-5 h-5 text-[#00A99D]" />
                    </div>
                    <div>
                      <p className="text-xs text-slate-400">Receipt No.</p>
                      <p className="font-semibold text-slate-800 text-base">{receipt.receiptNo}</p>
                    </div>
                  </div>
                  <span className={`text-xs px-2.5 py-1 rounded-full ${getStatusColor(receipt.status)}`}>
                    <CheckCircle className="w-3 h-3 inline mr-1" />
                    {receipt.status}
                  </span>
                </div>
              </div>

              {/* Receipt Body - Larger Text */}
              <div className="p-4 space-y-4">
                {/* Type and Amount */}
                <div className="flex items-center justify-between">
                  <div className="flex-1">
                    <h3 className="font-semibold text-slate-800 text-base">{receipt.type}</h3>
                    <p className="text-sm text-slate-500 mt-0.5">
                      {receipt.doctorName} • {receipt.doctorSpecialty}
                    </p>
                  </div>
                  <div className="text-right">
                    <p className="text-2xl font-bold text-[#013A63]">{receipt.amount}</p>
                    <p className="text-xs text-slate-400">Total Amount</p>
                  </div>
                </div>

                {/* Details Grid - Larger Text */}
                <div className="grid grid-cols-2 gap-4 pt-2">
                  <div className="flex items-center gap-2">
                    <Calendar className="w-4 h-4 text-[#00A99D]" />
                    <div>
                      <p className="text-xs text-slate-400">Date</p>
                      <p className="text-sm font-medium text-slate-700">{receipt.date}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <Clock className="w-4 h-4 text-[#00A99D]" />
                    <div>
                      <p className="text-xs text-slate-400">Time</p>
                      <p className="text-sm font-medium text-slate-700">{receipt.time}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <CreditCard className="w-4 h-4 text-[#00A99D]" />
                    <div>
                      <p className="text-xs text-slate-400">Payment Method</p>
                      <p className="text-sm font-medium text-slate-700">{receipt.paymentMethod}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <FileText className="w-4 h-4 text-[#00A99D]" />
                    <div>
                      <p className="text-xs text-slate-400">Appointment Type</p>
                      <p className="text-sm font-medium text-slate-700">{receipt.appointmentType}</p>
                    </div>
                  </div>
                </div>

                {/* Generated Info */}
                <div className="text-xs text-slate-400 pt-2 border-t border-slate-100">
                  Receipt Generated: {receipt.generatedAt}
                </div>

                {/* Action Buttons - Larger */}
                <div className="flex gap-3 pt-2">
                  <button
                    onClick={() => handleViewDetails(receipt)}
                    className="flex-1 py-2.5 rounded-lg bg-[#00A99D] text-white text-sm font-semibold hover:bg-[#009488] transition flex items-center justify-center gap-2"
                  >
                    <Eye className="w-4 h-4" />
                    View Details
                  </button>
                  <button
                    onClick={() => handleDownload(receipt)}
                    className="flex-1 py-2.5 rounded-lg border border-slate-200 text-slate-600 text-sm font-semibold hover:bg-slate-50 transition flex items-center justify-center gap-2"
                  >
                    <Download className="w-4 h-4" />
                    Download
                  </button>
                  <button
                    onClick={() => handlePrint(receipt)}
                    className="py-2.5 px-4 rounded-lg border border-slate-200 text-slate-600 hover:bg-slate-50 transition"
                  >
                    <Printer className="w-4 h-4" />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* No Results */}
        {filteredReceipts.length === 0 && (
          <div className="text-center py-12">
            <div className="bg-white rounded-xl p-8 max-w-md mx-auto">
              <Receipt className="w-14 h-14 text-slate-300 mx-auto mb-3" />
              <h3 className="text-lg font-semibold text-slate-700">No receipts found</h3>
              <p className="text-slate-500 text-sm">Try changing the filter</p>
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

      {/* Receipt Details Modal */}
      {showModal && selectedReceipt && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4" onClick={() => setShowModal(false)}>
          <div className="bg-white rounded-xl max-w-md w-full max-h-[90vh] overflow-y-auto" onClick={(e) => e.stopPropagation()}>
            <div className="sticky top-0 bg-white border-b border-slate-100 px-5 py-4 flex items-center justify-between">
              <h3 className="font-bold text-[#013A63] text-lg">Receipt Details</h3>
              <button onClick={() => setShowModal(false)} className="text-slate-400 hover:text-slate-600">
                <X className="w-5 h-5" />
              </button>
            </div>
            
            <div className="p-5 space-y-4">
              {/* Receipt Header */}
              <div className="text-center border-b border-slate-100 pb-4">
                <div className="w-16 h-16 rounded-full bg-[#00A99D]/10 flex items-center justify-center mx-auto mb-3">
                  <Receipt className="w-8 h-8 text-[#00A99D]" />
                </div>
                <h2 className="text-xl font-bold text-[#013A63]">eAshaop Healthcare</h2>
                <p className="text-xs text-slate-400">Official Payment Receipt</p>
              </div>

              {/* Receipt Info */}
              <div className="space-y-3">
                <div className="flex justify-between">
                  <span className="text-sm text-slate-500">Receipt No:</span>
                  <span className="text-sm font-semibold text-slate-800">{selectedReceipt.receiptNo}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-sm text-slate-500">Date:</span>
                  <span className="text-sm font-semibold text-slate-800">{selectedReceipt.date}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-sm text-slate-500">Time:</span>
                  <span className="text-sm font-semibold text-slate-800">{selectedReceipt.time}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-sm text-slate-500">Status:</span>
                  <span className="text-sm font-semibold text-green-600">{selectedReceipt.status}</span>
                </div>
              </div>

              <div className="border-t border-slate-100 pt-3">
                <p className="text-sm font-semibold text-slate-700 mb-2">Payment Details</p>
                <div className="space-y-2">
                  <div className="flex justify-between">
                    <span className="text-sm text-slate-500">Description:</span>
                    <span className="text-sm text-slate-700 text-right max-w-[200px]">{selectedReceipt.type}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-sm text-slate-500">Payment Method:</span>
                    <span className="text-sm font-medium text-slate-700">{selectedReceipt.paymentMethod}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-sm text-slate-500">Appointment Type:</span>
                    <span className="text-sm font-medium text-slate-700">{selectedReceipt.appointmentType}</span>
                  </div>
                  <div className="flex justify-between pt-2 border-t border-slate-100">
                    <span className="text-base font-semibold text-slate-700">Total Amount:</span>
                    <span className="text-xl font-bold text-[#013A63]">{selectedReceipt.amount}</span>
                  </div>
                </div>
              </div>

              <div className="border-t border-slate-100 pt-3">
                <p className="text-sm font-semibold text-slate-700 mb-2">Doctor Details</p>
                <div className="space-y-1">
                  <p className="text-sm text-slate-700">{selectedReceipt.doctorName}</p>
                  <p className="text-xs text-slate-500">{selectedReceipt.doctorSpecialty}</p>
                </div>
              </div>

              <div className="text-center text-[10px] text-slate-400 pt-2">
                Generated on {selectedReceipt.generatedAt}
              </div>
            </div>

            <div className="p-4 border-t border-slate-100 flex gap-3">
              <button
                onClick={() => handleDownload(selectedReceipt)}
                className="flex-1 py-2.5 rounded-lg bg-[#00A99D] text-white text-sm font-semibold flex items-center justify-center gap-2"
              >
                <Download className="w-4 h-4" />
                Download PDF
              </button>
              <button
                onClick={() => handlePrint(selectedReceipt)}
                className="flex-1 py-2.5 rounded-lg border border-slate-200 text-slate-600 text-sm font-semibold flex items-center justify-center gap-2"
              >
                <Printer className="w-4 h-4" />
                Print
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}