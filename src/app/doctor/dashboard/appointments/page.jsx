"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import {
  ChevronLeft,
  Search,
  Download,
  Eye,
  Calendar,
  Clock,
  User,
  Activity,
  CheckCircle,
  XCircle,
  Video,
  MapPin,
  X,
  ChevronRight,
  ChevronLeft as ChevronLeftIcon,
  Heart,
} from "lucide-react";

// Default Appointments Data
const defaultAppointments = [
  {
    id: 1,
    patientName: "Ramesh Sharma",
    patientId: "EOP2026045",
    phone: "+91 98765 43210",
    email: "ramesh@example.com",
    gender: "Male",
    age: 45,
    date: "2026-05-28",
    time: "10:30 AM",
    type: "Video Consultation",
    amount: 500,
    status: "ongoing",
    paymentStatus: "paid",
    doctor: "Dr. J Shruthika Reddy",
    speciality: "General Physician",
    hospital: "Study Lab Hyderabad",
    notes: "Follow-up for blood pressure",
  },
  {
    id: 2,
    patientName: "Priya Patel",
    patientId: "EOP2026044",
    phone: "+91 98765 43211",
    email: "priya@example.com",
    gender: "Female",
    age: 32,
    date: "2026-05-28",
    time: "02:00 PM",
    type: "Clinic Visit",
    amount: 800,
    status: "ongoing",
    paymentStatus: "pending",
    doctor: "Dr. Neha Sharma",
    speciality: "Cardiologist",
    hospital: "Apollo Hospital",
    notes: "Chest pain consultation",
  },
  {
    id: 3,
    patientName: "Suresh Kumar",
    patientId: "EOP2026043",
    phone: "+91 98765 43212",
    email: "suresh@example.com",
    gender: "Male",
    age: 58,
    date: "2026-05-29",
    time: "11:00 AM",
    type: "Video Consultation",
    amount: 500,
    status: "upcoming",
    paymentStatus: "paid",
    doctor: "Dr. J Shruthika Reddy",
    speciality: "General Physician",
    hospital: "Study Lab Hyderabad",
    notes: "Regular checkup",
  },
  {
    id: 4,
    patientName: "Amit Kumar",
    patientId: "EOP2026042",
    phone: "+91 98765 43213",
    email: "amit@example.com",
    gender: "Male",
    age: 52,
    date: "2026-05-29",
    time: "03:30 PM",
    type: "Clinic Visit",
    amount: 800,
    status: "upcoming",
    paymentStatus: "pending",
    doctor: "Dr. Neha Sharma",
    speciality: "Cardiologist",
    hospital: "Apollo Hospital",
    notes: "ECG report review",
  },
  {
    id: 5,
    patientName: "Sneha Reddy",
    patientId: "EOP2026041",
    phone: "+91 98765 43214",
    email: "sneha@example.com",
    gender: "Female",
    age: 24,
    date: "2026-05-27",
    time: "09:00 AM",
    type: "Video Consultation",
    amount: 500,
    status: "completed",
    paymentStatus: "paid",
    doctor: "Dr. J Shruthika Reddy",
    speciality: "General Physician",
    hospital: "Study Lab Hyderabad",
    notes: "Fever and cold",
  },
  {
    id: 6,
    patientName: "Vikram Singh",
    patientId: "EOP2026040",
    phone: "+91 98765 43215",
    email: "vikram@example.com",
    gender: "Male",
    age: 38,
    date: "2026-05-26",
    time: "04:00 PM",
    type: "Clinic Visit",
    amount: 800,
    status: "cancelled",
    paymentStatus: "refunded",
    doctor: "Dr. Neha Sharma",
    speciality: "Cardiologist",
    hospital: "Apollo Hospital",
    notes: "Cancelled by patient",
  },
];

export default function DoctorAppointmentsPage() {
  const [appointments, setAppointments] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedStatus, setSelectedStatus] = useState("all");
  const [selectedDate, setSelectedDate] = useState("");
  const [selectedType, setSelectedType] = useState("all");
  const [currentPage, setCurrentPage] = useState(1);
  const [showDetailsModal, setShowDetailsModal] = useState(false);
  const [selectedAppointment, setSelectedAppointment] = useState(null);
  const [showToast, setShowToast] = useState(false);
  const [toastMessage, setToastMessage] = useState("");
  const itemsPerPage = 5;

  useEffect(() => {
    const savedAppointments = localStorage.getItem("doctor_appointments");
    if (savedAppointments) {
      setAppointments(JSON.parse(savedAppointments));
    } else {
      setAppointments(defaultAppointments);
      localStorage.setItem("doctor_appointments", JSON.stringify(defaultAppointments));
    }
  }, []);

  useEffect(() => {
    if (appointments.length > 0) {
      localStorage.setItem("doctor_appointments", JSON.stringify(appointments));
    }
  }, [appointments]);

  const showNotification = (message) => {
    setToastMessage(message);
    setShowToast(true);
    setTimeout(() => setShowToast(false), 3000);
  };

  const handleStatusUpdate = (id, newStatus) => {
    const updatedAppointments = appointments.map(apt =>
      apt.id === id ? { ...apt, status: newStatus } : apt
    );
    setAppointments(updatedAppointments);
    showNotification(`Appointment status updated to ${newStatus}`);
  };

  const handleViewDetails = (appointment) => {
    setSelectedAppointment(appointment);
    setShowDetailsModal(true);
  };

  const handleDownloadReport = (appointment) => {
    showNotification(`📄 Downloading report for ${appointment.patientName}`);
  };

  const filteredAppointments = appointments.filter(apt => {
    const matchesSearch = apt.patientName.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          apt.patientId.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          apt.phone.includes(searchTerm);
    const matchesStatus = selectedStatus === "all" || apt.status === selectedStatus;
    const matchesDate = !selectedDate || apt.date === selectedDate;
    const matchesType = selectedType === "all" || apt.type === selectedType;
    return matchesSearch && matchesStatus && matchesDate && matchesType;
  });

  const totalPages = Math.ceil(filteredAppointments.length / itemsPerPage);
  const paginatedAppointments = filteredAppointments.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  const getStatusColor = (status) => {
    const colors = {
      ongoing: "bg-yellow-100 text-yellow-700",
      upcoming: "bg-blue-100 text-blue-700",
      completed: "bg-green-100 text-green-700",
      cancelled: "bg-red-100 text-red-700",
    };
    return colors[status] || "bg-gray-100 text-gray-700";
  };

  const getStatusIcon = (status) => {
    const icons = {
      ongoing: <Clock className="w-3 h-3" />,
      upcoming: <Calendar className="w-3 h-3" />,
      completed: <CheckCircle className="w-3 h-3" />,
      cancelled: <XCircle className="w-3 h-3" />,
    };
    return icons[status] || <Activity className="w-3 h-3" />;
  };

  const stats = {
    total: appointments.length,
    ongoing: appointments.filter(a => a.status === "ongoing").length,
    upcoming: appointments.filter(a => a.status === "upcoming").length,
    completed: appointments.filter(a => a.status === "completed").length,
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
        {/* Header - Appointments Heading */}
        <div className="mb-6">
          <div className="flex items-center gap-2 mb-1">
            <Calendar className="w-5 h-5 text-[#00A99D]" />
            <h1 className="text-xl font-bold bg-gradient-to-r from-[#013A63] to-[#00A99D] bg-clip-text text-transparent">
              Appointments
            </h1>
          </div>
          <p className="text-slate-500 text-sm ml-7">Manage and track all patient appointments</p>
        </div>

        {/* Stats Cards - 4 Cards in One Row properly styled like the 2nd image */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4 mb-8">
          {/* Total Appointments Card */}
          <div className="group bg-white rounded-xl p-5 shadow-sm hover:shadow-md transition-all duration-300 hover:-translate-y-1 border-[1.5px] border-blue-100 cursor-pointer">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-xl bg-blue-50 flex items-center justify-center group-hover:scale-105 transition-transform">
                  <Calendar className="w-6 h-6 text-blue-500" />
                </div>
                <div>
                  <p className="text-xs font-medium text-slate-500 mb-0.5">Total Appointments</p>
                  <p className="text-2xl font-bold text-blue-600">{stats.total}</p>
                </div>
              </div>
              <Activity className="w-5 h-5 text-blue-400 group-hover:animate-pulse" />
            </div>
          </div>

          {/* Ongoing Card */}
          <div className="group bg-white rounded-xl p-5 shadow-sm hover:shadow-md transition-all duration-300 hover:-translate-y-1 border-[1.5px] border-yellow-100 cursor-pointer">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-xl bg-yellow-50 flex items-center justify-center group-hover:scale-105 transition-transform">
                  <Clock className="w-6 h-6 text-yellow-500" />
                </div>
                <div>
                  <p className="text-xs font-medium text-slate-500 mb-0.5">Ongoing</p>
                  <p className="text-2xl font-bold text-yellow-500">{stats.ongoing}</p>
                </div>
              </div>
              <Activity className="w-5 h-5 text-yellow-400 group-hover:animate-pulse" />
            </div>
          </div>

          {/* Upcoming Card */}
          <div className="group bg-white rounded-xl p-5 shadow-sm hover:shadow-md transition-all duration-300 hover:-translate-y-1 border-[1.5px] border-indigo-100 cursor-pointer">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-xl bg-indigo-50 flex items-center justify-center group-hover:scale-105 transition-transform">
                  <Calendar className="w-6 h-6 text-indigo-500" />
                </div>
                <div>
                  <p className="text-xs font-medium text-slate-500 mb-0.5">Upcoming</p>
                  <p className="text-2xl font-bold text-indigo-500">{stats.upcoming}</p>
                </div>
              </div>
              <Activity className="w-5 h-5 text-indigo-400 group-hover:animate-pulse" />
            </div>
          </div>

          {/* Completed Card */}
          <div className="group bg-white rounded-xl p-5 shadow-sm hover:shadow-md transition-all duration-300 hover:-translate-y-1 border-[1.5px] border-green-100 cursor-pointer">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-xl bg-green-50 flex items-center justify-center group-hover:scale-105 transition-transform">
                  <CheckCircle className="w-6 h-6 text-green-500" />
                </div>
                <div>
                  <p className="text-xs font-medium text-slate-500 mb-0.5">Completed</p>
                  <p className="text-2xl font-bold text-green-500">{stats.completed}</p>
                </div>
              </div>
              <Heart className="w-5 h-5 text-green-400 group-hover:animate-pulse" />
            </div>
          </div>
        </div>

        {/* Search and Filters - Styled to match theme */}
        <div className="flex flex-wrap items-center gap-4 mb-6">
          <div className="relative w-80">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
            <input
              type="text"
              placeholder="Search by patient, ID or phone..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-9 pr-3 py-2.5 rounded-lg border border-slate-200 focus:outline-none focus:border-[#00A99D] focus:ring-2 focus:ring-[#00A99D]/20 hover:border-[#00A99D]/50 text-sm bg-white text-slate-700 shadow-sm transition-all"
            />
          </div>
          <select
            value={selectedStatus}
            onChange={(e) => setSelectedStatus(e.target.value)}
            className="px-4 py-2.5 rounded-lg border border-slate-200 focus:outline-none focus:border-[#00A99D] focus:ring-2 focus:ring-[#00A99D]/20 hover:border-[#00A99D]/50 text-sm bg-white text-slate-600 cursor-pointer shadow-sm transition-all"
          >
            <option value="all">All Status</option>
            <option value="ongoing">Ongoing</option>
            <option value="upcoming">Upcoming</option>
            <option value="completed">Completed</option>
            <option value="cancelled">Cancelled</option>
          </select>
          <select
            value={selectedType}
            onChange={(e) => setSelectedType(e.target.value)}
            className="px-4 py-2.5 rounded-lg border border-slate-200 focus:outline-none focus:border-[#00A99D] focus:ring-2 focus:ring-[#00A99D]/20 hover:border-[#00A99D]/50 text-sm bg-white text-slate-600 cursor-pointer shadow-sm transition-all"
          >
            <option value="all">All Types</option>
            <option value="Video Consultation">Video Consultation</option>
            <option value="Clinic Visit">Clinic Visit</option>
          </select>
          <div className="relative">
            <Calendar className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
            <input
              type="date"
              value={selectedDate}
              onChange={(e) => setSelectedDate(e.target.value)}
              className="pl-9 pr-3 py-2.5 rounded-lg border border-slate-200 focus:outline-none focus:border-[#00A99D] focus:ring-2 focus:ring-[#00A99D]/20 hover:border-[#00A99D]/50 text-sm bg-white text-slate-600 shadow-sm transition-all cursor-pointer"
            />
          </div>
          {(selectedStatus !== "all" || selectedDate || selectedType !== "all" || searchTerm) && (
            <button
              onClick={() => { setSelectedStatus("all"); setSelectedDate(""); setSelectedType("all"); setSearchTerm(""); }}
              className="px-4 py-2.5 rounded-lg bg-red-50 text-red-600 text-sm hover:bg-red-100 font-medium transition"
            >
              Clear Filters
            </button>
          )}
        </div>

        {/* Appointments Table */}
        <div className="bg-white rounded-xl shadow-sm border border-slate-100 overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-slate-50 border-b border-slate-200">
                <tr>
                  <th className="text-left px-4 py-3 text-xs font-semibold text-slate-600">Patient Name</th>
                  <th className="text-left px-4 py-3 text-xs font-semibold text-slate-600">Patient ID</th>
                  <th className="text-left px-4 py-3 text-xs font-semibold text-slate-600">Date & Time</th>
                  <th className="text-left px-4 py-3 text-xs font-semibold text-slate-600">Type</th>
                  <th className="text-left px-4 py-3 text-xs font-semibold text-slate-600">Amount</th>
                  <th className="text-left px-4 py-3 text-xs font-semibold text-slate-600">Status</th>
                  <th className="text-center px-4 py-3 text-xs font-semibold text-slate-600">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {paginatedAppointments.length === 0 ? (
                  <tr>
                    <td colSpan="7" className="text-center py-8 text-slate-400">No appointments found</td>
                  </tr>
                ) : (
                  paginatedAppointments.map((apt) => (
                    <tr key={apt.id} className="hover:bg-slate-50 transition group">
                      <td className="px-4 py-3">
                        <div className="flex items-center gap-3">
                          <div className="w-10 h-10 rounded-full bg-gradient-to-br from-[#00A99D] to-[#013A63] flex items-center justify-center text-white font-medium">
                            {apt.patientName.charAt(0)}
                          </div>
                          <div>
                            <p className="font-medium text-slate-800 text-sm">{apt.patientName}</p>
                            <p className="text-xs text-slate-400">{apt.gender}, {apt.age} yrs</p>
                          </div>
                        </div>
                       </td>
                      <td className="px-4 py-3">
                        <p className="text-sm text-slate-600">{apt.patientId}</p>
                        <p className="text-xs text-slate-400">{apt.phone}</p>
                       </td>
                      <td className="px-4 py-3">
                        <p className="text-sm font-medium text-slate-800">{apt.date}</p>
                        <p className="text-xs text-slate-400">{apt.time}</p>
                       </td>
                      <td className="px-4 py-3">
                        <span className={`inline-flex items-center gap-1 text-xs px-2 py-1 rounded-full ${apt.type === "Video Consultation" ? "bg-purple-100 text-purple-600" : "bg-orange-100 text-orange-600"}`}>
                          {apt.type === "Video Consultation" ? <Video className="w-3 h-3" /> : <MapPin className="w-3 h-3" />}
                          {apt.type === "Video Consultation" ? "Video" : "Clinic"}
                        </span>
                       </td>
                      <td className="px-4 py-3">
                        <span className="font-medium text-slate-800">₹{apt.amount}</span>
                        <p className={`text-xs ${apt.paymentStatus === "paid" ? "text-green-600" : "text-yellow-600"}`}>
                          {apt.paymentStatus}
                        </p>
                       </td>
                      <td className="px-4 py-3">
                        <span className={`inline-flex items-center gap-1 text-xs px-2 py-1 rounded-full ${getStatusColor(apt.status)}`}>
                          {getStatusIcon(apt.status)} {apt.status}
                        </span>
                       </td>
                      <td className="px-4 py-3">
                        <div className="flex items-center justify-center gap-1.5">
                          <button
                            onClick={() => handleViewDetails(apt)}
                            className="p-1.5 rounded-lg hover:bg-slate-100 transition text-blue-500"
                            title="View Details"
                          >
                            <Eye className="w-4 h-4" />
                          </button>
                          {apt.status === "ongoing" && (
                            <button
                              onClick={() => handleStatusUpdate(apt.id, "completed")}
                              className="p-1.5 rounded-lg hover:bg-slate-100 transition text-green-500"
                              title="Mark Completed"
                            >
                              <CheckCircle className="w-4 h-4" />
                            </button>
                          )}
                          {apt.status === "upcoming" && (
                            <button
                              onClick={() => handleStatusUpdate(apt.id, "cancelled")}
                              className="p-1.5 rounded-lg hover:bg-slate-100 transition text-red-500"
                              title="Cancel"
                            >
                              <XCircle className="w-4 h-4" />
                            </button>
                          )}
                          <button
                            onClick={() => handleDownloadReport(apt)}
                            className="p-1.5 rounded-lg hover:bg-slate-100 transition text-[#00A99D]"
                            title="Download Report"
                          >
                            <Download className="w-4 h-4" />
                          </button>
                        </div>
                       </td>
                     </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>

          {/* Pagination */}
          {filteredAppointments.length > 0 && (
            <div className="px-6 py-4 border-t border-slate-100 flex items-center justify-between">
              <p className="text-sm text-slate-500">
                Showing {((currentPage - 1) * itemsPerPage) + 1} to {Math.min(currentPage * itemsPerPage, filteredAppointments.length)} of {filteredAppointments.length} results
              </p>
              <div className="flex items-center gap-2">
                <button
                  onClick={() => setCurrentPage(p => Math.max(1, p - 1))}
                  disabled={currentPage === 1}
                  className="p-2 rounded-lg border border-slate-200 disabled:opacity-50 disabled:cursor-not-allowed hover:bg-slate-50 transition"
                >
                  <ChevronLeftIcon className="w-4 h-4" />
                </button>
                <span className="text-sm text-slate-600">
                  Page {currentPage} of {totalPages}
                </span>
                <button
                  onClick={() => setCurrentPage(p => Math.min(totalPages, p + 1))}
                  disabled={currentPage === totalPages}
                  className="p-2 rounded-lg border border-slate-200 disabled:opacity-50 disabled:cursor-not-allowed hover:bg-slate-50 transition"
                >
                  <ChevronRight className="w-4 h-4" />
                </button>
              </div>
            </div>
          )}
        </div>

        {/* Back to Dashboard */}
        <div className="mt-6 text-center">
          <Link href="/doctor/dashboard" className="inline-flex items-center gap-1 text-sm text-[#00A99D] font-medium hover:gap-2 transition">
            <ChevronLeft className="w-4 h-4" /> Back to Dashboard
          </Link>
        </div>
      </div>

      {/* View Details Modal */}
      {showDetailsModal && selectedAppointment && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4" onClick={() => setShowDetailsModal(false)}>
          <div className="bg-white rounded-xl max-w-md w-full max-h-[90vh] overflow-y-auto" onClick={(e) => e.stopPropagation()}>
            <div className="sticky top-0 bg-white border-b border-slate-100 px-5 py-4 flex items-center justify-between">
              <h3 className="font-bold text-[#013A63] text-lg">Appointment Details</h3>
              <button onClick={() => setShowDetailsModal(false)} className="text-slate-400 hover:text-slate-600">
                <X className="w-5 h-5" />
              </button>
            </div>
            <div className="p-5 space-y-4">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 rounded-full bg-gradient-to-br from-[#00A99D] to-[#013A63] flex items-center justify-center">
                  <User className="w-5 h-5 text-white" />
                </div>
                <div>
                  <h4 className="font-bold text-slate-800">{selectedAppointment.patientName}</h4>
                  <p className="text-xs text-slate-500">ID: {selectedAppointment.patientId}</p>
                </div>
              </div>
              <div className="bg-slate-50 rounded-lg p-3 space-y-2">
                <div className="flex justify-between"><span className="text-sm text-slate-500">Gender:</span><span className="text-sm font-medium">{selectedAppointment.gender}</span></div>
                <div className="flex justify-between"><span className="text-sm text-slate-500">Age:</span><span className="text-sm font-medium">{selectedAppointment.age} yrs</span></div>
                <div className="flex justify-between"><span className="text-sm text-slate-500">Phone:</span><span className="text-sm font-medium">{selectedAppointment.phone}</span></div>
                <div className="flex justify-between"><span className="text-sm text-slate-500">Email:</span><span className="text-sm font-medium">{selectedAppointment.email}</span></div>
                <div className="flex justify-between"><span className="text-sm text-slate-500">Date & Time:</span><span className="text-sm font-medium">{selectedAppointment.date} at {selectedAppointment.time}</span></div>
                <div className="flex justify-between"><span className="text-sm text-slate-500">Type:</span><span className="text-sm font-medium">{selectedAppointment.type}</span></div>
                <div className="flex justify-between"><span className="text-sm text-slate-500">Doctor:</span><span className="text-sm font-medium">{selectedAppointment.doctor}</span></div>
                <div className="flex justify-between"><span className="text-sm text-slate-500">Speciality:</span><span className="text-sm font-medium">{selectedAppointment.speciality}</span></div>
                <div className="flex justify-between"><span className="text-sm text-slate-500">Hospital:</span><span className="text-sm font-medium">{selectedAppointment.hospital}</span></div>
                <div className="flex justify-between"><span className="text-sm text-slate-500">Amount:</span><span className="text-sm font-medium">₹{selectedAppointment.amount}</span></div>
                <div><p className="text-sm text-slate-500">Notes</p><p className="text-sm font-medium">{selectedAppointment.notes}</p></div>
              </div>
              <div className="flex gap-3 pt-2">
                {selectedAppointment.status === "ongoing" && (
                  <button
                    onClick={() => { handleStatusUpdate(selectedAppointment.id, "completed"); setShowDetailsModal(false); }}
                    className="flex-1 py-2 rounded-lg bg-[#00A99D] text-white text-sm font-medium flex items-center justify-center gap-2"
                  >
                    <CheckCircle className="w-4 h-4" /> Start Consultation
                  </button>
                )}
                <button onClick={() => setShowDetailsModal(false)} className="flex-1 py-2 rounded-lg border border-slate-200 text-slate-600 text-sm font-medium">
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