"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { 
  ChevronLeft, 
  Search, 
  Download, 
  Eye, 
  FileText, 
  Printer,
  CheckCircle,
  Clock,
  User,
  Calendar,
  Plus,
  Trash2,
  Edit,
  X,
  Save,
  Activity,
  Calendar as CalendarIcon,
  Heart,
  Stethoscope
} from "lucide-react";

// Default Prescriptions Data
const defaultPrescriptions = [
  { 
    id: 1, 
    patientName: "Ramesh Sharma", 
    patientId: "EOP2026045", 
    phone: "+91 98765 43210",
    email: "ramesh@example.com",
    gender: "Male", 
    age: 45,
    medicines: [
      { name: "Aspirin 75mg", dosage: "Once daily", duration: "30 days", quantity: "30", refills: "2", timing: "Morning" },
      { name: "Atorvastatin 10mg", dosage: "Once daily", duration: "30 days", quantity: "30", refills: "1", timing: "Evening" }
    ], 
    date: "20 May 2026", 
    status: "Active",
    additionalNotes: "Take after meals. Avoid alcohol.",
    diagnosis: "Hypertension",
    followUpDate: "20 Jun 2026"
  },
  { 
    id: 2, 
    patientName: "Priya Patel", 
    patientId: "EOP2026044", 
    phone: "+91 98765 43211",
    email: "priya@example.com",
    gender: "Female", 
    age: 32,
    medicines: [
      { name: "Paracetamol 500mg", dosage: "Twice daily", duration: "5 days", quantity: "10", refills: "0", timing: "Morning & Night" }
    ], 
    date: "18 May 2026", 
    status: "Active",
    additionalNotes: "Take with food if stomach upset occurs.",
    diagnosis: "Fever",
    followUpDate: "25 May 2026"
  },
  { 
    id: 3, 
    patientName: "Suresh Kumar", 
    patientId: "EOP2026043", 
    phone: "+91 98765 43212",
    email: "suresh@example.com",
    gender: "Male", 
    age: 58,
    medicines: [
      { name: "Vitamin B12", dosage: "Once daily", duration: "60 days", quantity: "60", refills: "1", timing: "Morning" },
      { name: "Calcium Tablets", dosage: "Once daily", duration: "60 days", quantity: "60", refills: "1", timing: "Night" }
    ], 
    date: "15 May 2026", 
    status: "Expired",
    additionalNotes: "Take with breakfast.",
    diagnosis: "Vitamin Deficiency",
    followUpDate: "15 Jul 2026"
  },
];

export default function PrescriptionPage() {
  const [prescriptions, setPrescriptions] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedStatus, setSelectedStatus] = useState("all");
  const [showForm, setShowForm] = useState(false);
  const [editingPrescription, setEditingPrescription] = useState(null);
  const [showDetailsModal, setShowDetailsModal] = useState(false);
  const [selectedPrescription, setSelectedPrescription] = useState(null);
  const [toastMessage, setToastMessage] = useState("");
  const [showToast, setShowToast] = useState(false);
  
  const [formData, setFormData] = useState({
    patientName: "",
    patientId: "",
    phone: "",
    email: "",
    gender: "Male",
    age: "",
    diagnosis: "",
    medicineName: "",
    dosage: "",
    duration: "",
    quantity: "",
    refills: "",
    timing: "Morning",
    additionalNotes: "",
    followUpDate: "",
  });
  
  const [medicinesList, setMedicinesList] = useState([]);

  // Load data from localStorage on mount
  useEffect(() => {
    const savedPrescriptions = localStorage.getItem("prescriptions");
    if (savedPrescriptions) {
      setPrescriptions(JSON.parse(savedPrescriptions));
    } else {
      setPrescriptions(defaultPrescriptions);
      localStorage.setItem("prescriptions", JSON.stringify(defaultPrescriptions));
    }
  }, []);

  // Save to localStorage whenever prescriptions change
  useEffect(() => {
    if (prescriptions.length > 0) {
      localStorage.setItem("prescriptions", JSON.stringify(prescriptions));
    }
  }, [prescriptions]);

  const showNotification = (message) => {
    setToastMessage(message);
    setShowToast(true);
    setTimeout(() => setShowToast(false), 3000);
  };

  const handleAddMedicine = () => {
    if (!formData.medicineName.trim()) {
      showNotification("Please enter medicine name");
      return;
    }
    if (!formData.dosage.trim()) {
      showNotification("Please enter dosage instructions");
      return;
    }
    
    const newMedicine = {
      name: formData.medicineName,
      dosage: formData.dosage,
      duration: formData.duration || "Not specified",
      quantity: formData.quantity || "Not specified",
      refills: formData.refills || "0",
      timing: formData.timing,
    };
    
    setMedicinesList([...medicinesList, newMedicine]);
    setFormData({
      ...formData,
      medicineName: "",
      dosage: "",
      duration: "",
      quantity: "",
      refills: "",
      timing: "Morning",
    });
    showNotification("Medicine added successfully");
  };

  const handleRemoveMedicine = (index) => {
    setMedicinesList(medicinesList.filter((_, i) => i !== index));
    showNotification("Medicine removed");
  };

  const handleSavePrescription = () => {
    if (!formData.patientName.trim()) {
      showNotification("Please fill patient name");
      return;
    }
    if (medicinesList.length === 0) {
      showNotification("Please add at least one medicine");
      return;
    }

    const newPrescriptionData = {
      patientName: formData.patientName,
      patientId: formData.patientId || `EOP${Math.floor(Math.random() * 10000)}`,
      phone: formData.phone,
      email: formData.email,
      gender: formData.gender,
      age: formData.age || "N/A",
      diagnosis: formData.diagnosis || "Not specified",
      medicines: medicinesList,
      additionalNotes: formData.additionalNotes,
      followUpDate: formData.followUpDate,
      date: new Date().toLocaleDateString(),
      status: "Active",
    };

    if (editingPrescription) {
      const updatedPrescriptions = prescriptions.map(p => 
        p.id === editingPrescription.id 
          ? { ...p, ...newPrescriptionData }
          : p
      );
      setPrescriptions(updatedPrescriptions);
      showNotification("Prescription updated successfully");
    } else {
      const newPrescription = {
        id: Date.now(),
        ...newPrescriptionData,
      };
      setPrescriptions([newPrescription, ...prescriptions]);
      showNotification("Prescription saved successfully");
    }
    
    handleClearForm();
    setShowForm(false);
    setEditingPrescription(null);
  };

  const handleClearForm = () => {
    setFormData({
      patientName: "",
      patientId: "",
      phone: "",
      email: "",
      gender: "Male",
      age: "",
      diagnosis: "",
      medicineName: "",
      dosage: "",
      duration: "",
      quantity: "",
      refills: "",
      timing: "Morning",
      additionalNotes: "",
      followUpDate: "",
    });
    setMedicinesList([]);
    setEditingPrescription(null);
  };

  const handleEditPrescription = (prescription) => {
    setEditingPrescription(prescription);
    setFormData({
      patientName: prescription.patientName,
      patientId: prescription.patientId,
      phone: prescription.phone || "",
      email: prescription.email || "",
      gender: prescription.gender,
      age: prescription.age || "",
      diagnosis: prescription.diagnosis || "",
      medicineName: "",
      dosage: "",
      duration: "",
      quantity: "",
      refills: "",
      timing: "Morning",
      additionalNotes: prescription.additionalNotes || "",
      followUpDate: prescription.followUpDate || "",
    });
    setMedicinesList(prescription.medicines);
    setShowForm(true);
  };

  const handleDeletePrescription = (id) => {
    if (window.confirm("Are you sure you want to delete this prescription?")) {
      const updatedPrescriptions = prescriptions.filter(p => p.id !== id);
      setPrescriptions(updatedPrescriptions);
      showNotification("Prescription deleted successfully");
    }
  };

  const handleViewDetails = (prescription) => {
    setSelectedPrescription(prescription);
    setShowDetailsModal(true);
  };

  const handleDownload = (prescription) => {
    showNotification(`📄 Downloading prescription for ${prescription.patientName}`);
  };

  const handlePrint = (prescription) => {
    showNotification(`🖨️ Printing prescription for ${prescription.patientName}`);
  };

  const filteredPrescriptions = prescriptions.filter(p => {
    const matchesSearch = p.patientName.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          p.patientId.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          p.medicines.some(m => m.name.toLowerCase().includes(searchTerm.toLowerCase()));
    const matchesStatus = selectedStatus === "all" || p.status === selectedStatus;
    return matchesSearch && matchesStatus;
  });

  const getStatusColor = (status) => {
    return status === "Active" ? "bg-green-100 text-green-700" : "bg-red-100 text-red-700";
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-teal-50/30">
      {/* Toast Notification */}
      {showToast && (
        <div className="fixed top-20 right-6 z-50 bg-green-500 text-white px-4 py-2 rounded-lg shadow-lg text-sm animate-in slide-in-from-top-2">
          {toastMessage}
        </div>
      )}

      <div className="relative z-10 p-6">
        
        {/* Header */}
        <div className="mb-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2 mb-1">
              <FileText className="w-5 h-5 text-[#00A99D]" />
              <h1 className="text-xl font-bold bg-gradient-to-r from-[#013A63] to-[#00A99D] bg-clip-text text-transparent">
                Prescriptions
              </h1>
            </div>
            <button
              onClick={() => { setShowForm(true); setEditingPrescription(null); handleClearForm(); }}
              className="flex items-center gap-2 px-4 py-2 rounded-lg bg-gradient-to-r from-[#00A99D] to-[#009488] text-white text-sm font-medium hover:shadow-lg hover:-translate-y-0.5 transition-all duration-300"
            >
              <Plus className="w-4 h-4" /> Create Prescription
            </button>
          </div>
          <p className="text-slate-500 text-sm ml-7">Manage patient prescriptions and medications</p>
        </div>

        {/* Stats Cards - With Blink/Hover Effects */}
        <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
          <div className="group bg-white rounded-xl p-4 shadow-sm hover:shadow-xl transition-all duration-300 hover:-translate-y-1 border border-green-100 cursor-pointer">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-green-100 flex items-center justify-center group-hover:scale-110 transition">
                  <CheckCircle className="w-5 h-5 text-green-600" />
                </div>
                <div>
                  <p className="text-xs text-slate-500">Active</p>
                  <p className="text-2xl font-bold text-green-600">{prescriptions.filter(p => p.status === "Active").length}</p>
                </div>
              </div>
              <Activity className="w-4 h-4 text-green-400 group-hover:animate-pulse" />
            </div>
          </div>
          <div className="group bg-white rounded-xl p-4 shadow-sm hover:shadow-xl transition-all duration-300 hover:-translate-y-1 border border-amber-100 cursor-pointer">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-amber-100 flex items-center justify-center group-hover:scale-110 transition">
                  <Clock className="w-5 h-5 text-amber-600" />
                </div>
                <div>
                  <p className="text-xs text-slate-500">Expired</p>
                  <p className="text-2xl font-bold text-amber-600">{prescriptions.filter(p => p.status === "Expired").length}</p>
                </div>
              </div>
              <CalendarIcon className="w-4 h-4 text-amber-400 group-hover:animate-pulse" />
            </div>
          </div>
          <div className="group bg-white rounded-xl p-4 shadow-sm hover:shadow-xl transition-all duration-300 hover:-translate-y-1 border border-blue-100 cursor-pointer">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-blue-100 flex items-center justify-center group-hover:scale-110 transition">
                  <User className="w-5 h-5 text-blue-600" />
                </div>
                <div>
                  <p className="text-xs text-slate-500">Total Patients</p>
                  <p className="text-2xl font-bold text-blue-600">{prescriptions.length}</p>
                </div>
              </div>
              <Calendar className="w-4 h-4 text-blue-400 group-hover:animate-pulse" />
            </div>
          </div>
          <div className="group bg-white rounded-xl p-4 shadow-sm hover:shadow-xl transition-all duration-300 hover:-translate-y-1 border border-[#00A99D]/10 cursor-pointer">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-[#00A99D]/10 flex items-center justify-center group-hover:scale-110 transition">
                  <FileText className="w-5 h-5 text-[#00A99D]" />
                </div>
                <div>
                  <p className="text-xs text-slate-500">This Month</p>
                  <p className="text-2xl font-bold text-[#013A63]">{prescriptions.filter(p => p.date.includes("May")).length}</p>
                </div>
              </div>
              <Heart className="w-4 h-4 text-[#00A99D] group-hover:animate-pulse" />
            </div>
          </div>
        </div>

        {/* Search and Filter */}
        <div className="flex flex-wrap items-center gap-3 mb-6">
          <div className="relative w-80">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
            <input
              type="text"
              placeholder="Search by patient, ID or medicine..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-9 pr-3 py-2 rounded-full border border-slate-200 focus:outline-none focus:border-[#00A99D] focus:ring-2 focus:ring-[#00A99D]/20 text-sm bg-white"
            />
          </div>
          <select
            value={selectedStatus}
            onChange={(e) => setSelectedStatus(e.target.value)}
            className="px-4 py-2 rounded-full border border-slate-200 focus:outline-none focus:border-[#00A99D] text-sm bg-white w-32 cursor-pointer"
          >
            <option value="all">All Status</option>
            <option value="Active">Active</option>
            <option value="Expired">Expired</option>
          </select>
        </div>

        {/* Prescriptions Table */}
        <div className="bg-white rounded-xl shadow-sm border border-slate-100 overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-slate-50 border-b border-slate-200">
                <tr>
                  <th className="text-left px-4 py-3 text-xs font-semibold text-slate-600">Patient Name</th>
                  <th className="text-left px-4 py-3 text-xs font-semibold text-slate-600">Patient ID</th>
                  <th className="text-left px-4 py-3 text-xs font-semibold text-slate-600">Medicines</th>
                  <th className="text-left px-4 py-3 text-xs font-semibold text-slate-600">Date</th>
                  <th className="text-left px-4 py-3 text-xs font-semibold text-slate-600">Follow Up</th>
                  <th className="text-left px-4 py-3 text-xs font-semibold text-slate-600">Status</th>
                  <th className="text-center px-4 py-3 text-xs font-semibold text-slate-600">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {filteredPrescriptions.length === 0 ? (
                  <tr>
                    <td colSpan="7" className="text-center py-8 text-slate-400">No prescriptions found</td>
                  </tr>
                ) : (
                  filteredPrescriptions.map((pres) => (
                    <tr key={pres.id} className="hover:bg-slate-50 transition group">
                      <td className="px-4 py-3">
                        <p className="font-medium text-slate-800 text-sm">{pres.patientName}</p>
                        <p className="text-xs text-slate-400">{pres.gender}, {pres.age} yrs</p>
                       </td>
                      <td className="px-4 py-3">
                        <p className="text-sm text-slate-600">{pres.patientId}</p>
                        <p className="text-xs text-slate-400">{pres.phone}</p>
                       </td>
                      <td className="px-4 py-3">
                        <div className="flex flex-wrap gap-1">
                          {pres.medicines.slice(0, 2).map((med, idx) => (
                            <span key={idx} className="text-xs bg-slate-100 px-2 py-0.5 rounded-full text-slate-600">{med.name}</span>
                          ))}
                          {pres.medicines.length > 2 && (
                            <span className="text-xs text-[#00A99D]">+{pres.medicines.length - 2}</span>
                          )}
                        </div>
                       </td>
                      <td className="px-4 py-3 text-sm text-slate-600">{pres.date}</td>
                      <td className="px-4 py-3 text-sm text-slate-600">{pres.followUpDate || "—"}</td>
                      <td className="px-4 py-3">
                        <span className={`inline-flex items-center gap-1 text-xs px-2 py-0.5 rounded-full ${getStatusColor(pres.status)}`}>
                          {pres.status === "Active" ? <CheckCircle className="w-3 h-3" /> : <Clock className="w-3 h-3" />}
                          {pres.status}
                        </span>
                       </td>
                      <td className="px-4 py-3">
                        <div className="flex items-center justify-center gap-1.5">
                          <button onClick={() => handleViewDetails(pres)} className="p-1.5 rounded-lg hover:bg-slate-100 transition text-blue-500" title="View Details">
                            <Eye className="w-4 h-4" />
                          </button>
                          <button onClick={() => handleEditPrescription(pres)} className="p-1.5 rounded-lg hover:bg-slate-100 transition text-amber-500" title="Edit">
                            <Edit className="w-4 h-4" />
                          </button>
                          <button onClick={() => handleDeletePrescription(pres.id)} className="p-1.5 rounded-lg hover:bg-slate-100 transition text-red-500" title="Delete">
                            <Trash2 className="w-4 h-4" />
                          </button>
                          <button onClick={() => handleDownload(pres)} className="p-1.5 rounded-lg hover:bg-slate-100 transition text-[#00A99D]" title="Download">
                            <Download className="w-4 h-4" />
                          </button>
                          <button onClick={() => handlePrint(pres)} className="p-1.5 rounded-lg hover:bg-slate-100 transition text-slate-500" title="Print">
                            <Printer className="w-4 h-4" />
                          </button>
                        </div>
                       </td>
                     </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </div>

        {/* Back to Dashboard */}
        <div className="mt-6 text-center">
          <Link href="/doctor/dashboard" className="inline-flex items-center gap-1 text-sm text-[#00A99D] font-medium hover:gap-2 transition">
            <ChevronLeft className="w-4 h-4" /> Back to Dashboard
          </Link>
        </div>
      </div>

      {/* Prescription Form Modal */}
      {showForm && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4" onClick={() => {}}>
          <div className="bg-white rounded-xl max-w-2xl w-full max-h-[90vh] overflow-y-auto" onClick={(e) => e.stopPropagation()}>
            <div className="sticky top-0 bg-white border-b border-slate-100 px-5 py-4 flex items-center justify-between">
              <h3 className="font-bold text-[#013A63] text-lg">
                {editingPrescription ? "Edit Prescription" : "Create New Prescription"}
              </h3>
              <button onClick={() => { setShowForm(false); handleClearForm(); setEditingPrescription(null); }} className="text-slate-400 hover:text-slate-600">
                <X className="w-5 h-5" />
              </button>
            </div>
            
            <div className="p-5 space-y-5">
              {/* Patient Information */}
              <div>
                <h4 className="font-semibold text-[#013A63] text-sm mb-3">Patient Information</h4>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <input type="text" placeholder="Patient Name *" value={formData.patientName} onChange={(e) => setFormData({...formData, patientName: e.target.value})} className="px-3 py-2 rounded-lg border border-slate-200 focus:outline-none focus:border-[#00A99D] text-sm" />
                  <input type="text" placeholder="Patient ID" value={formData.patientId} onChange={(e) => setFormData({...formData, patientId: e.target.value})} className="px-3 py-2 rounded-lg border border-slate-200 text-sm" />
                  <input type="tel" placeholder="Phone Number" value={formData.phone} onChange={(e) => setFormData({...formData, phone: e.target.value})} className="px-3 py-2 rounded-lg border border-slate-200 text-sm" />
                  <input type="email" placeholder="Email" value={formData.email} onChange={(e) => setFormData({...formData, email: e.target.value})} className="px-3 py-2 rounded-lg border border-slate-200 text-sm" />
                  <select value={formData.gender} onChange={(e) => setFormData({...formData, gender: e.target.value})} className="px-3 py-2 rounded-lg border border-slate-200 text-sm">
                    <option>Male</option><option>Female</option><option>Other</option>
                  </select>
                  <input type="number" placeholder="Age" value={formData.age} onChange={(e) => setFormData({...formData, age: e.target.value})} className="px-3 py-2 rounded-lg border border-slate-200 text-sm" />
                </div>
              </div>

              {/* Diagnosis */}
              <div>
                <h4 className="font-semibold text-[#013A63] text-sm mb-2">Diagnosis</h4>
                <input type="text" placeholder="Diagnosis / Condition" value={formData.diagnosis} onChange={(e) => setFormData({...formData, diagnosis: e.target.value})} className="w-full px-3 py-2 rounded-lg border border-slate-200 text-sm" />
              </div>

              {/* Medication Details */}
              <div>
                <h4 className="font-semibold text-[#013A63] text-sm mb-3">Medication Details</h4>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3 mb-3">
                  <input type="text" placeholder="Medicine Name *" value={formData.medicineName} onChange={(e) => setFormData({...formData, medicineName: e.target.value})} className="px-3 py-2 rounded-lg border border-slate-200 text-sm" />
                  <input type="text" placeholder="Dosage Instructions *" value={formData.dosage} onChange={(e) => setFormData({...formData, dosage: e.target.value})} className="px-3 py-2 rounded-lg border border-slate-200 text-sm" />
                  <input type="text" placeholder="Duration" value={formData.duration} onChange={(e) => setFormData({...formData, duration: e.target.value})} className="px-3 py-2 rounded-lg border border-slate-200 text-sm" />
                  <input type="text" placeholder="Quantity" value={formData.quantity} onChange={(e) => setFormData({...formData, quantity: e.target.value})} className="px-3 py-2 rounded-lg border border-slate-200 text-sm" />
                  <input type="text" placeholder="Refills" value={formData.refills} onChange={(e) => setFormData({...formData, refills: e.target.value})} className="px-3 py-2 rounded-lg border border-slate-200 text-sm" />
                  <select value={formData.timing} onChange={(e) => setFormData({...formData, timing: e.target.value})} className="px-3 py-2 rounded-lg border border-slate-200 text-sm">
                    <option>Morning</option><option>Afternoon</option><option>Evening</option><option>Night</option>
                  </select>
                </div>
                <button onClick={handleAddMedicine} className="px-4 py-2 rounded-lg bg-[#00A99D]/10 text-[#00A99D] text-sm font-medium hover:bg-[#00A99D] hover:text-white transition">+ Add Medicine</button>

                {medicinesList.length > 0 && (
                  <div className="mt-3 bg-slate-50 rounded-lg p-3">
                    <p className="text-xs font-medium text-slate-700 mb-2">Added Medicines:</p>
                    <div className="space-y-2">
                      {medicinesList.map((med, idx) => (
                        <div key={idx} className="flex items-center justify-between bg-white rounded-lg p-2">
                          <div>
                            <p className="text-sm font-medium text-slate-800">{med.name}</p>
                            <p className="text-xs text-slate-500">{med.dosage} • {med.timing}</p>
                          </div>
                          <button onClick={() => handleRemoveMedicine(idx)} className="text-red-500 hover:text-red-700">
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>

              {/* Additional Notes */}
              <div>
                <h4 className="font-semibold text-[#013A63] text-sm mb-2">Additional Notes</h4>
                <textarea placeholder="Special Instructions / Allergies..." value={formData.additionalNotes} onChange={(e) => setFormData({...formData, additionalNotes: e.target.value})} className="w-full px-3 py-2 rounded-lg border border-slate-200 text-sm" rows="3" />
              </div>

              {/* Follow Up Date */}
              <div>
                <h4 className="font-semibold text-[#013A63] text-sm mb-2">Follow Up Date</h4>
                <input type="date" value={formData.followUpDate} onChange={(e) => setFormData({...formData, followUpDate: e.target.value})} className="px-3 py-2 rounded-lg border border-slate-200 text-sm w-full" />
              </div>

              {/* Buttons */}
              <div className="flex gap-3 pt-3">
                <button onClick={handleSavePrescription} className="flex-1 py-2.5 rounded-lg bg-gradient-to-r from-[#00A99D] to-[#009488] text-white text-sm font-medium hover:shadow-md transition flex items-center justify-center gap-2">
                  <Save className="w-4 h-4" /> Save Prescription
                </button>
                <button onClick={handleClearForm} className="flex-1 py-2.5 rounded-lg border border-slate-200 text-slate-600 text-sm font-medium">
                  Clear Form
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* View Details Modal */}
      {showDetailsModal && selectedPrescription && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4" onClick={() => setShowDetailsModal(false)}>
          <div className="bg-white rounded-xl max-w-md w-full max-h-[90vh] overflow-y-auto" onClick={(e) => e.stopPropagation()}>
            <div className="sticky top-0 bg-white border-b border-slate-100 px-5 py-4 flex items-center justify-between">
              <h3 className="font-bold text-[#013A63] text-lg">Prescription Details</h3>
              <button onClick={() => setShowDetailsModal(false)} className="text-slate-400 hover:text-slate-600"><X className="w-5 h-5" /></button>
            </div>
            <div className="p-5 space-y-4">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 rounded-full bg-gradient-to-br from-[#00A99D] to-[#013A63] flex items-center justify-center"><User className="w-5 h-5 text-white" /></div>
                <div><h4 className="font-bold text-slate-800">{selectedPrescription.patientName}</h4><p className="text-xs text-slate-500">ID: {selectedPrescription.patientId}</p></div>
              </div>
              <div className="bg-slate-50 rounded-lg p-3 space-y-2">
                <div className="flex justify-between"><span className="text-sm text-slate-500">Gender:</span><span className="text-sm font-medium">{selectedPrescription.gender}</span></div>
                <div className="flex justify-between"><span className="text-sm text-slate-500">Age:</span><span className="text-sm font-medium">{selectedPrescription.age} yrs</span></div>
                <div className="flex justify-between"><span className="text-sm text-slate-500">Phone:</span><span className="text-sm font-medium">{selectedPrescription.phone}</span></div>
                <div className="flex justify-between"><span className="text-sm text-slate-500">Diagnosis:</span><span className="text-sm font-medium">{selectedPrescription.diagnosis}</span></div>
                <div className="flex justify-between"><span className="text-sm text-slate-500">Date:</span><span className="text-sm font-medium">{selectedPrescription.date}</span></div>
                <div className="flex justify-between"><span className="text-sm text-slate-500">Follow Up:</span><span className="text-sm font-medium">{selectedPrescription.followUpDate || "—"}</span></div>
              </div>
              <div><p className="font-semibold text-slate-700 text-sm mb-2">Medicines</p><div className="space-y-2">{selectedPrescription.medicines.map((med, idx) => (<div key={idx} className="bg-slate-50 rounded-lg p-2"><p className="font-medium text-slate-800">{med.name}</p><p className="text-xs text-slate-500">{med.dosage} • {med.timing} • {med.duration}</p></div>))}</div></div>
              {selectedPrescription.additionalNotes && (<div><p className="font-semibold text-slate-700 text-sm mb-1">Additional Notes</p><p className="text-sm text-slate-600 bg-amber-50 p-2 rounded-lg">{selectedPrescription.additionalNotes}</p></div>)}
              <div className="flex gap-3 pt-2">
                <button onClick={() => handleDownload(selectedPrescription)} className="flex-1 py-2 rounded-lg bg-[#00A99D] text-white text-sm font-medium flex items-center justify-center gap-2"><Download className="w-4 h-4" /> Download</button>
                <button onClick={() => setShowDetailsModal(false)} className="flex-1 py-2 rounded-lg border border-slate-200 text-slate-600 text-sm font-medium">Close</button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}