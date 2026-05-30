"use client";

import { useState } from "react";
import Link from "next/link";
import {
  Search,
  UserPlus,
  MapPin,
  Calendar,
  ChevronLeft,
  ChevronRight,
  Filter,
  X,
  Edit,
  Trash2,
  Activity,
  Heart,
  Phone,
  Mail,
} from "lucide-react";

// Simple Users Icon
function UsersIcon({ className }) {
  return (
    <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" />
    </svg>
  );
}

const initialPatientsList = [
  {
    id: 1,
    name: "Ramesh Sharma",
    age: 45,
    gender: "Male",
    phone: "+91 98765 43210",
    email: "ramesh@example.com",
    location: "Hyderabad",
    lastVisit: "20 May 2026",
    nextAppointment: "25 May 2026",
    status: "Active",
    bloodGroup: "A+",
    image: "https://randomuser.me/api/portraits/men/1.jpg",
  },
  {
    id: 2,
    name: "Priya Patel",
    age: 32,
    gender: "Female",
    phone: "+91 98765 43211",
    email: "priya@example.com",
    location: "Hyderabad",
    lastVisit: "18 May 2026",
    nextAppointment: "28 May 2026",
    status: "Active",
    bloodGroup: "O+",
    image: "https://randomuser.me/api/portraits/women/2.jpg",
  },
  {
    id: 3,
    name: "Suresh Kumar",
    age: 58,
    gender: "Male",
    phone: "+91 98765 43212",
    email: "suresh@example.com",
    location: "Mumbai",
    lastVisit: "15 May 2026",
    nextAppointment: "30 May 2026",
    status: "Active",
    bloodGroup: "B+",
    image: "https://randomuser.me/api/portraits/men/3.jpg",
  },
  {
    id: 4,
    name: "Anjali Mehta",
    age: 28,
    gender: "Female",
    phone: "+91 98765 43213",
    email: "anjali@example.com",
    location: "Bangalore",
    lastVisit: "12 May 2026",
    nextAppointment: "01 Jun 2026",
    status: "Inactive",
    bloodGroup: "AB+",
    image: "https://randomuser.me/api/portraits/women/4.jpg",
  },
  {
    id: 5,
    name: "Vikram Singh",
    age: 52,
    gender: "Male",
    phone: "+91 98765 43214",
    email: "vikram@example.com",
    location: "Delhi",
    lastVisit: "10 May 2026",
    nextAppointment: "02 Jun 2026",
    status: "Active",
    bloodGroup: "O-",
    image: "https://randomuser.me/api/portraits/men/5.jpg",
  },
  {
    id: 6,
    name: "Kavita Nair",
    age: 35,
    gender: "Female",
    phone: "+91 98765 43215",
    email: "kavita@example.com",
    location: "Chennai",
    lastVisit: "08 May 2026",
    nextAppointment: "05 Jun 2026",
    status: "Active",
    bloodGroup: "A-",
    image: "https://randomuser.me/api/portraits/women/6.jpg",
  },
];

const statusColors = {
  Active: "bg-green-100 text-green-700",
  Inactive: "bg-gray-100 text-gray-600",
};

export default function PatientsPage() {
  const [patients, setPatients] = useState(initialPatientsList);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedStatus, setSelectedStatus] = useState("All");
  const [showFilters, setShowFilters] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [showModal, setShowModal] = useState(false);
  const [editingPatient, setEditingPatient] = useState(null);
  const [formData, setFormData] = useState({
    name: "",
    age: "",
    gender: "Male",
    phone: "",
    email: "",
    location: "",
    bloodGroup: "A+",
    status: "Active",
  });
  const itemsPerPage = 5;

  const filteredPatients = patients.filter((patient) => {
    const matchesSearch = patient.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          patient.phone.includes(searchTerm) ||
                          patient.email.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = selectedStatus === "All" || patient.status === selectedStatus;
    return matchesSearch && matchesStatus;
  });

  const totalPages = Math.ceil(filteredPatients.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const currentPatients = filteredPatients.slice(startIndex, startIndex + itemsPerPage);

  const stats = [
    { title: "Total Patients", value: patients.length, change: "+12 this month", icon: UsersIcon, color: "text-[#00A99D]", bg: "bg-[#00A99D]/10" },
    { title: "Active Patients", value: patients.filter(p => p.status === "Active").length, change: "+8 this week", icon: Activity, color: "text-green-500", bg: "bg-green-500/10" },
    { title: "New Patients", value: "24", change: "This month", icon: UserPlus, color: "text-blue-500", bg: "bg-blue-500/10" },
    { title: "Appointments", value: "156", change: "This week", icon: Calendar, color: "text-purple-500", bg: "bg-purple-500/10" },
  ];

  const handleAddPatient = () => {
    setEditingPatient(null);
    setFormData({
      name: "",
      age: "",
      gender: "Male",
      phone: "",
      email: "",
      location: "",
      bloodGroup: "A+",
      status: "Active",
    });
    setShowModal(true);
  };

  const handleEditPatient = (patient) => {
    setEditingPatient(patient);
    setFormData({
      name: patient.name,
      age: patient.age.toString(),
      gender: patient.gender,
      phone: patient.phone,
      email: patient.email,
      location: patient.location,
      bloodGroup: patient.bloodGroup,
      status: patient.status,
    });
    setShowModal(true);
  };

  const handleDeletePatient = (id) => {
    if (window.confirm("Are you sure you want to delete this patient?")) {
      setPatients(patients.filter(p => p.id !== id));
    }
  };

  const handleSavePatient = () => {
    if (!formData.name || !formData.phone) {
      alert("Please fill required fields");
      return;
    }

    if (editingPatient) {
      setPatients(patients.map(p => 
        p.id === editingPatient.id 
          ? { 
              ...p, 
              name: formData.name,
              age: parseInt(formData.age),
              gender: formData.gender,
              phone: formData.phone,
              email: formData.email,
              location: formData.location,
              bloodGroup: formData.bloodGroup,
              status: formData.status,
            }
          : p
      ));
    } else {
      const newId = Math.max(...patients.map(p => p.id), 0) + 1;
      const newPatient = {
        id: newId,
        name: formData.name,
        age: parseInt(formData.age),
        gender: formData.gender,
        phone: formData.phone,
        email: formData.email,
        location: formData.location,
        lastVisit: new Date().toLocaleDateString('en-GB', { day: '2-digit', month: 'short', year: 'numeric' }),
        nextAppointment: "Not scheduled",
        status: formData.status,
        bloodGroup: formData.bloodGroup,
        image: `https://randomuser.me/api/portraits/${formData.gender === "Male" ? "men" : "women"}/${Math.floor(Math.random() * 50) + 1}.jpg`,
      };
      setPatients([...patients, newPatient]);
    }
    setShowModal(false);
    setEditingPatient(null);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-teal-50/30">
      <div className="relative z-10 px-6 py-3">
        
        {/* Header */}
        <div className="mb-4">
          <div className="flex items-center gap-2 mb-0.5">
            <UsersIcon className="w-5 h-5 text-[#00A99D]" />
            <h1 className="text-xl font-bold bg-gradient-to-r from-[#013A63] to-[#00A99D] bg-clip-text text-transparent">
              Patients Management
            </h1>
          </div>
          <p className="text-slate-500 text-sm ml-7">Manage and view all patient records</p>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
          {stats.map((stat, index) => (
            <div key={index} className="bg-white rounded-xl p-4 shadow-sm border border-slate-100">
              <div className="flex items-center justify-between mb-2">
                <div className={`w-10 h-10 rounded-xl ${stat.bg} flex items-center justify-center`}>
                  <stat.icon className={`w-5 h-5 ${stat.color}`} />
                </div>
                <span className="text-2xl font-bold text-[#013A63]">{stat.value}</span>
              </div>
              <p className="text-slate-600 text-sm font-medium">{stat.title}</p>
              <p className="text-xs text-green-600 mt-1">{stat.change}</p>
            </div>
          ))}
        </div>

        {/* Search and Filter - Rounded Full */}
        <div className="flex flex-col sm:flex-row gap-3 mb-4">
          <div className="flex-1 relative">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
            <input
              type="text"
              placeholder="Search by name, phone or email..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-11 pr-4 py-2 rounded-full border border-slate-200 focus:outline-none focus:border-[#00A99D] focus:ring-2 focus:ring-[#00A99D]/20 text-sm bg-white"
            />
          </div>
          
          <button
            onClick={() => setShowFilters(!showFilters)}
            className="flex items-center gap-2 px-5 py-2 rounded-full border border-slate-200 bg-white hover:bg-slate-50 transition text-sm font-medium text-slate-600"
          >
            <Filter className="w-4 h-4" />
            Filters
          </button>

          <button
            onClick={handleAddPatient}
            className="flex items-center gap-2 px-5 py-2 rounded-full bg-gradient-to-r from-[#00A99D] to-[#009488] text-white text-sm font-medium hover:shadow-md transition"
          >
            <UserPlus className="w-4 h-4" />
            Add Patient
          </button>
        </div>

        {/* Filter Panel */}
        {showFilters && (
          <div className="bg-white rounded-xl p-4 mb-4 border border-slate-200 shadow-sm">
            <div className="flex items-center justify-between mb-3">
              <h3 className="font-semibold text-slate-700 text-sm">Filter by Status</h3>
              <button onClick={() => setShowFilters(false)} className="text-slate-400 hover:text-slate-600">
                <X className="w-4 h-4" />
              </button>
            </div>
            <div className="flex flex-wrap gap-2">
              {["All", "Active", "Inactive"].map((status) => (
                <button
                  key={status}
                  onClick={() => setSelectedStatus(status)}
                  className={`px-3 py-1.5 rounded-full text-xs font-medium transition-all ${
                    selectedStatus === status
                      ? "bg-[#00A99D] text-white"
                      : "bg-slate-100 text-slate-600 hover:bg-slate-200"
                  }`}
                >
                  {status}
                </button>
              ))}
            </div>
          </div>
        )}

        {/* Patients Table */}
        <div className="bg-white rounded-xl shadow-sm border border-slate-100 overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-slate-50 border-b border-slate-200">
                <tr>
                  <th className="text-left px-4 py-3 text-xs font-semibold text-slate-600">Patient</th>
                  <th className="text-left px-4 py-3 text-xs font-semibold text-slate-600">Contact</th>
                  <th className="text-left px-4 py-3 text-xs font-semibold text-slate-600">Location</th>
                  <th className="text-left px-4 py-3 text-xs font-semibold text-slate-600">Last Visit</th>
                  <th className="text-left px-4 py-3 text-xs font-semibold text-slate-600">Next Appt</th>
                  <th className="text-left px-4 py-3 text-xs font-semibold text-slate-600">Status</th>
                  <th className="text-center px-4 py-3 text-xs font-semibold text-slate-600">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {currentPatients.map((patient) => (
                  <tr key={patient.id} className="hover:bg-slate-50 transition">
                    <td className="px-4 py-3">
                      <div className="flex items-center gap-3">
                        <img src={patient.image} alt={patient.name} className="w-10 h-10 rounded-full object-cover" />
                        <div>
                          <p className="font-semibold text-slate-800 text-sm">{patient.name}</p>
                          <p className="text-xs text-slate-400">{patient.age} yrs • {patient.gender} • {patient.bloodGroup}</p>
                        </div>
                      </div>
                    </td>
                    <td className="px-4 py-3">
                      <p className="text-sm text-slate-600">{patient.phone}</p>
                      <p className="text-xs text-slate-400">{patient.email}</p>
                    </td>
                    <td className="px-4 py-3">
                      <div className="flex items-center gap-1">
                        <MapPin className="w-3 h-3 text-slate-400" />
                        <span className="text-sm text-slate-600">{patient.location}</span>
                      </div>
                    </td>
                    <td className="px-4 py-3 text-sm text-slate-600">{patient.lastVisit}</td>
                    <td className="px-4 py-3 text-sm text-slate-600">{patient.nextAppointment}</td>
                    <td className="px-4 py-3">
                      <span className={`text-xs px-2 py-1 rounded-full ${statusColors[patient.status]}`}>
                        {patient.status}
                      </span>
                    </td>
                    <td className="px-4 py-3">
                      <div className="flex items-center justify-center gap-2">
                        <button
                          onClick={() => handleEditPatient(patient)}
                          className="p-1.5 rounded-lg hover:bg-slate-100 transition text-amber-500"
                        >
                          <Edit className="w-4 h-4" />
                        </button>
                        <button
                          onClick={() => handleDeletePatient(patient.id)}
                          className="p-1.5 rounded-lg hover:bg-slate-100 transition text-red-500"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Pagination */}
          {totalPages > 1 && (
            <div className="px-4 py-3 border-t border-slate-100 flex items-center justify-between">
              <p className="text-sm text-slate-500">
                Showing {startIndex + 1} to {Math.min(startIndex + itemsPerPage, filteredPatients.length)} of {filteredPatients.length} patients
              </p>
              <div className="flex gap-2">
                <button
                  onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
                  disabled={currentPage === 1}
                  className="p-2 rounded-lg border border-slate-200 disabled:opacity-50 hover:bg-slate-50 transition"
                >
                  <ChevronLeft className="w-4 h-4" />
                </button>
                <span className="px-3 py-2 text-sm text-slate-600">{currentPage} / {totalPages}</span>
                <button
                  onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
                  disabled={currentPage === totalPages}
                  className="p-2 rounded-lg border border-slate-200 disabled:opacity-50 hover:bg-slate-50 transition"
                >
                  <ChevronRight className="w-4 h-4" />
                </button>
              </div>
            </div>
          )}
        </div>

        {/* Back to Dashboard */}
        <div className="mt-4 text-center">
          <Link 
            href="/user/dashboard" 
            className="inline-flex items-center gap-1 text-sm text-[#00A99D] font-medium hover:gap-2 transition-all"
          >
            <ChevronLeft className="w-4 h-4" />
            Back to Dashboard
          </Link>
        </div>
      </div>

      {/* Add/Edit Patient Modal */}
      {showModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4" onClick={() => setShowModal(false)}>
          <div className="bg-white rounded-xl max-w-md w-full max-h-[90vh] overflow-y-auto" onClick={(e) => e.stopPropagation()}>
            <div className="px-5 py-4 border-b border-slate-100 flex items-center justify-between">
              <h3 className="font-semibold text-[#013A63] text-lg">
                {editingPatient ? "Edit Patient" : "Add New Patient"}
              </h3>
              <button onClick={() => setShowModal(false)} className="text-slate-400 hover:text-slate-600">
                <X className="w-5 h-5" />
              </button>
            </div>
            <div className="p-5 space-y-4">
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1">Full Name *</label>
                <input
                  type="text"
                  value={formData.name}
                  onChange={(e) => setFormData({...formData, name: e.target.value})}
                  className="w-full px-3 py-2 rounded-lg border border-slate-200 focus:outline-none focus:border-[#00A99D] text-sm"
                  placeholder="Enter full name"
                />
              </div>
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-1">Age</label>
                  <input
                    type="number"
                    value={formData.age}
                    onChange={(e) => setFormData({...formData, age: e.target.value})}
                    className="w-full px-3 py-2 rounded-lg border border-slate-200 focus:outline-none focus:border-[#00A99D] text-sm"
                    placeholder="Age"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-1">Gender</label>
                  <select
                    value={formData.gender}
                    onChange={(e) => setFormData({...formData, gender: e.target.value})}
                    className="w-full px-3 py-2 rounded-lg border border-slate-200 focus:outline-none focus:border-[#00A99D] text-sm"
                  >
                    <option>Male</option>
                    <option>Female</option>
                    <option>Other</option>
                  </select>
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1">Phone Number *</label>
                <input
                  type="tel"
                  value={formData.phone}
                  onChange={(e) => setFormData({...formData, phone: e.target.value})}
                  className="w-full px-3 py-2 rounded-lg border border-slate-200 focus:outline-none focus:border-[#00A99D] text-sm"
                  placeholder="+91 XXXXX XXXXX"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1">Email</label>
                <input
                  type="email"
                  value={formData.email}
                  onChange={(e) => setFormData({...formData, email: e.target.value})}
                  className="w-full px-3 py-2 rounded-lg border border-slate-200 focus:outline-none focus:border-[#00A99D] text-sm"
                  placeholder="email@example.com"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1">Location</label>
                <input
                  type="text"
                  value={formData.location}
                  onChange={(e) => setFormData({...formData, location: e.target.value})}
                  className="w-full px-3 py-2 rounded-lg border border-slate-200 focus:outline-none focus:border-[#00A99D] text-sm"
                  placeholder="City"
                />
              </div>
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-1">Blood Group</label>
                  <select
                    value={formData.bloodGroup}
                    onChange={(e) => setFormData({...formData, bloodGroup: e.target.value})}
                    className="w-full px-3 py-2 rounded-lg border border-slate-200 focus:outline-none focus:border-[#00A99D] text-sm"
                  >
                    <option>A+</option>
                    <option>A-</option>
                    <option>B+</option>
                    <option>B-</option>
                    <option>O+</option>
                    <option>O-</option>
                    <option>AB+</option>
                    <option>AB-</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-1">Status</label>
                  <select
                    value={formData.status}
                    onChange={(e) => setFormData({...formData, status: e.target.value})}
                    className="w-full px-3 py-2 rounded-lg border border-slate-200 focus:outline-none focus:border-[#00A99D] text-sm"
                  >
                    <option>Active</option>
                    <option>Inactive</option>
                  </select>
                </div>
              </div>
            </div>
            <div className="px-5 py-4 border-t border-slate-100 flex gap-3">
              <button
                onClick={handleSavePatient}
                className="flex-1 py-2 rounded-lg bg-[#00A99D] text-white font-medium hover:bg-[#009488] transition"
              >
                {editingPatient ? "Update Patient" : "Add Patient"}
              </button>
              <button
                onClick={() => setShowModal(false)}
                className="flex-1 py-2 rounded-lg border border-slate-200 text-slate-600 font-medium hover:bg-slate-50 transition"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}