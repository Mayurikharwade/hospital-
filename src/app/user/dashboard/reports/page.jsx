"use client";

import { useState } from "react";
import Link from "next/link";
import {
  FileText,
  ChevronLeft,
  Calendar,
  Download,
  Eye,
  Search,
  Clock,
  User,
  File,
  Microscope,
  Image as ImageIcon,
} from "lucide-react";

// Lab Reports Data
const labReports = [
  {
    id: 1,
    name: "Complete Blood Count (CBC)",
    type: "Lab Report",
    date: "20 May 2026",
    time: "09:30 AM",
    status: "Ready",
    doctorName: "Dr. Priya Sharma",
    specialty: "Pathologist",
    fileSize: "2.4 MB",
    fileType: "PDF",
    description: "Complete blood count including RBC, WBC, platelets, hemoglobin",
    results: {
      hemoglobin: "14.2 g/dL (Normal: 13.5-17.5)",
      wbc: "7,500 /µL (Normal: 4,500-11,000)",
      platelets: "2.8 Lakhs/µL (Normal: 1.5-4.5)",
      rbc: "4.8 million/µL (Normal: 4.5-5.9)",
    },
  },
  {
    id: 2,
    name: "Lipid Profile",
    type: "Lab Report",
    date: "18 May 2026",
    time: "10:15 AM",
    status: "Ready",
    doctorName: "Dr. Priya Sharma",
    specialty: "Pathologist",
    fileSize: "1.8 MB",
    fileType: "PDF",
    description: "Cholesterol, triglycerides, HDL, LDL levels",
    results: {
      totalCholesterol: "180 mg/dL (Normal: <200)",
      triglycerides: "120 mg/dL (Normal: <150)",
      hdl: "45 mg/dL (Normal: >40)",
      ldl: "110 mg/dL (Normal: <100)",
    },
  },
  {
    id: 3,
    name: "Thyroid Profile",
    type: "Lab Report",
    date: "15 May 2026",
    time: "08:45 AM",
    status: "Pending",
    doctorName: "Dr. Priya Sharma",
    specialty: "Pathologist",
    fileSize: null,
    fileType: null,
    description: "TSH, T3, T4 levels",
    results: null,
  },
];

// Scan Reports Data
const scanReports = [
  {
    id: 4,
    name: "Chest X-Ray",
    type: "Scan Report",
    date: "10 May 2026",
    time: "02:00 PM",
    status: "Ready",
    doctorName: "Dr. Suresh Babu",
    specialty: "Radiologist",
    fileSize: "5.2 MB",
    fileType: "Image",
    description: "Chest X-ray for respiratory evaluation",
    findings: "Normal chest X-ray. No abnormalities detected.",
  },
  {
    id: 5,
    name: "MRI Brain",
    type: "Scan Report",
    date: "05 May 2026",
    time: "11:30 AM",
    status: "Ready",
    doctorName: "Dr. Rajesh Kumar",
    specialty: "Radiologist",
    fileSize: "12.5 MB",
    fileType: "Image",
    description: "MRI scan of brain for neurological evaluation",
    findings: "Normal study. No evidence of any intracranial pathology.",
  },
  {
    id: 6,
    name: "ECG",
    type: "Scan Report",
    date: "28 Apr 2026",
    time: "09:00 AM",
    status: "Ready",
    doctorName: "Dr. Shruthika Reddy",
    specialty: "Cardiologist",
    fileSize: "1.2 MB",
    fileType: "PDF",
    description: "Electrocardiogram for heart rhythm evaluation",
    findings: "Normal sinus rhythm. No abnormalities.",
  },
];

export default function ReportsPage() {
  const [activeTab, setActiveTab] = useState("all");
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedReport, setSelectedReport] = useState(null);
  const [showModal, setShowModal] = useState(false);

  const tabs = [
    { id: "all", label: "All Reports", icon: FileText },
    { id: "lab", label: "Lab Reports", icon: Microscope },
    { id: "scan", label: "Scan Reports", icon: ImageIcon },
  ];

  const getAllReports = () => {
    let reports = [];
    if (activeTab === "all") {
      reports = [...labReports, ...scanReports];
    } else if (activeTab === "lab") {
      reports = labReports;
    } else {
      reports = scanReports;
    }
    
    if (searchTerm) {
      reports = reports.filter(r => 
        r.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        r.doctorName.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }
    return reports;
  };

  const handleViewReport = (report) => {
    if (report.status === "Ready") {
      setSelectedReport(report);
      setShowModal(true);
    }
  };

  const handleDownload = (report) => {
    alert(`Downloading ${report.name}...`);
  };

  const getStatusColor = (status) => {
    return status === "Ready" ? "bg-green-100 text-green-700" : "bg-amber-100 text-amber-700";
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-teal-50/30">
      <div className="relative z-10 px-6 py-3">
        
        {/* Header - Reduced Gap */}
        <div className="mb-4">
          <div className="flex items-center gap-2 mb-0.5">
            <FileText className="w-5 h-5 text-[#00A99D]" />
            <h1 className="text-xl font-bold bg-gradient-to-r from-[#013A63] to-[#00A99D] bg-clip-text text-transparent">
              Reports & Scans
            </h1>
          </div>
          <p className="text-slate-500 text-sm ml-7">View and download your medical reports</p>
        </div>

        {/* Tabs - Reduced Gap */}
        <div className="flex gap-2 mb-4 border-b border-slate-200">
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

        {/* Search Bar - Rounded Full */}
        <div className="relative max-w-md mb-5">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
          <input
            type="text"
            placeholder="Search reports by name or doctor..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-11 pr-4 py-2.5 rounded-full border border-slate-200 focus:outline-none focus:border-[#00A99D] focus:ring-2 focus:ring-[#00A99D]/20 text-sm bg-white"
          />
        </div>

        {/* Reports Grid */}
        {getAllReports().length === 0 ? (
          <div className="bg-white rounded-xl p-6 text-center border border-slate-100">
            <FileText className="w-12 h-12 text-slate-300 mx-auto mb-2" />
            <h3 className="text-base font-semibold text-slate-700">No reports found</h3>
            <p className="text-slate-500 text-sm">Try changing your search or filter</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {getAllReports().map((report) => (
              <div
                key={report.id}
                className={`bg-white rounded-xl shadow-sm hover:shadow-md transition border border-slate-100 overflow-hidden ${
                  report.status === "Pending" ? "opacity-80" : ""
                }`}
              >
                {/* Header */}
                <div className="p-4 border-b border-slate-100 bg-gradient-to-r from-slate-50 to-white">
                  <div className="flex items-start justify-between">
                    <div className="flex items-center gap-3">
                      <div className={`w-10 h-10 rounded-lg flex items-center justify-center ${
                        report.type === "Lab Report" ? "bg-blue-100" : "bg-purple-100"
                      }`}>
                        {report.type === "Lab Report" ? (
                          <Microscope className="w-5 h-5 text-blue-600" />
                        ) : (
                          <ImageIcon className="w-5 h-5 text-purple-600" />
                        )}
                      </div>
                      <div>
                        <h3 className="font-semibold text-slate-800 text-sm line-clamp-1">{report.name}</h3>
                        <div className="flex items-center gap-2 mt-0.5">
                          <span className={`text-[10px] px-2 py-0.5 rounded-full ${getStatusColor(report.status)}`}>
                            {report.status}
                          </span>
                          <span className="text-[10px] text-slate-400">{report.type}</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Body - Increased Height with more content */}
                <div className="p-4 space-y-2.5">
                  <div className="flex items-center gap-2 text-xs text-slate-500">
                    <Calendar className="w-3.5 h-3.5" />
                    <span>{report.date}</span>
                    <span className="text-slate-300">|</span>
                    <Clock className="w-3.5 h-3.5" />
                    <span>{report.time}</span>
                  </div>

                  <div className="flex items-center gap-2 text-xs text-slate-500">
                    <User className="w-3.5 h-3.5" />
                    <span className="truncate">{report.doctorName}</span>
                    <span className="text-slate-300">•</span>
                    <span className="text-xs text-slate-400">{report.specialty}</span>
                  </div>

                  {report.fileSize && (
                    <div className="flex items-center gap-2 text-xs text-slate-400">
                      <File className="w-3.5 h-3.5" />
                      <span>{report.fileSize} • {report.fileType}</span>
                    </div>
                  )}

                  <p className="text-xs text-slate-500 leading-relaxed mt-2">
                    {report.description}
                  </p>

                  {/* Buttons - Always visible */}
                  <div className="flex gap-2 pt-2 mt-1">
                    {report.status === "Ready" ? (
                      <>
                        <button
                          onClick={() => handleViewReport(report)}
                          className="flex-1 py-2 rounded-lg border border-slate-200 text-slate-600 text-sm font-medium hover:bg-slate-50 transition flex items-center justify-center gap-1.5"
                        >
                          <Eye className="w-4 h-4" />
                          View
                        </button>
                        <button
                          onClick={() => handleDownload(report)}
                          className="flex-1 py-2 rounded-lg bg-[#00A99D] text-white text-sm font-medium hover:bg-[#009488] transition flex items-center justify-center gap-1.5"
                        >
                          <Download className="w-4 h-4" />
                          Download
                        </button>
                      </>
                    ) : (
                      <div className="w-full py-2 rounded-lg bg-amber-50 text-amber-600 text-sm font-medium text-center flex items-center justify-center gap-1.5">
                        <Clock className="w-4 h-4" />
                        Processing
                      </div>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Back to Dashboard */}
        <div className="mt-5 text-center">
          <Link href="/user/dashboard" className="inline-flex items-center gap-1 text-sm text-[#00A99D] font-medium hover:gap-2 transition">
            <ChevronLeft className="w-4 h-4" /> Back to Dashboard
          </Link>
        </div>
      </div>

      {/* Report Details Modal */}
      {showModal && selectedReport && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4" onClick={() => setShowModal(false)}>
          <div className="bg-white rounded-xl max-w-md w-full max-h-[90vh] overflow-y-auto" onClick={(e) => e.stopPropagation()}>
            <div className="sticky top-0 bg-white border-b border-slate-100 px-5 py-4 flex items-center justify-between">
              <h3 className="font-bold text-[#013A63] text-lg">Report Details</h3>
              <button onClick={() => setShowModal(false)} className="text-slate-400 hover:text-slate-600">
                <X className="w-5 h-5" />
              </button>
            </div>
            
            <div className="p-5 space-y-4">
              <div className="flex items-center gap-3">
                <div className={`w-12 h-12 rounded-lg flex items-center justify-center ${
                  selectedReport.type === "Lab Report" ? "bg-blue-100" : "bg-purple-100"
                }`}>
                  {selectedReport.type === "Lab Report" ? (
                    <Microscope className="w-6 h-6 text-blue-600" />
                  ) : (
                    <ImageIcon className="w-6 h-6 text-purple-600" />
                  )}
                </div>
                <div>
                  <h4 className="font-bold text-slate-800">{selectedReport.name}</h4>
                  <p className="text-sm text-slate-500">{selectedReport.type}</p>
                </div>
              </div>

              <div className="border-t border-slate-100 pt-3 space-y-2">
                <div className="flex justify-between">
                  <span className="text-sm text-slate-500">Date:</span>
                  <span className="text-sm font-medium text-slate-700">{selectedReport.date}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-sm text-slate-500">Doctor:</span>
                  <span className="text-sm font-medium text-slate-700">{selectedReport.doctorName}</span>
                </div>
              </div>

              {selectedReport.results && (
                <div className="border-t border-slate-100 pt-3">
                  <p className="font-semibold text-slate-700 text-sm mb-2">Test Results</p>
                  <div className="space-y-2">
                    {Object.entries(selectedReport.results).map(([key, value]) => (
                      <div key={key} className="bg-slate-50 rounded-lg p-2">
                        <p className="text-xs font-medium text-slate-700 capitalize">{key.replace(/([A-Z])/g, ' $1')}</p>
                        <p className="text-sm text-slate-600">{value}</p>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {selectedReport.findings && (
                <div className="border-t border-slate-100 pt-3">
                  <p className="font-semibold text-slate-700 text-sm mb-1">Findings</p>
                  <p className="text-sm text-slate-600 bg-slate-50 rounded-lg p-3">{selectedReport.findings}</p>
                </div>
              )}

              <div className="flex gap-3 pt-2">
                <button
                  onClick={() => handleDownload(selectedReport)}
                  className="flex-1 py-2.5 rounded-lg bg-[#00A99D] text-white text-sm font-semibold flex items-center justify-center gap-2"
                >
                  <Download className="w-4 h-4" />
                  Download Report
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

// Missing X Icon
function X({ className }) {
  return (
    <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
    </svg>
  );
}