"use client";

import { useState, useRef, useEffect } from "react";
import Link from "next/link";
import { 
  ChevronLeft, 
  Search, 
  Calendar as CalendarIcon, 
  Filter, 
  X, 
  Download, 
  Eye, 
  ChevronRight,
  ChevronLeft as ChevronLeftIcon,
  FileText,
  Printer,
  CheckCircle,
  Clock,
  XCircle,
  User,
  Phone,
  Mail,
  Calendar,
  Activity,
  TrendingUp
} from "lucide-react";

const bookingsData = [
  { id: 1, patientName: "Maram Kalpana", phone: "+91 83742 57687", email: "maram@eashaop.com", date: "2026-02-07", time: "10:30 PM", type: "Video", amount: "₹500", status: "Completed", doctor: "Dr. Shruthika Reddy", prescription: "Available" },
  { id: 2, patientName: "Maram Kalpana", phone: "+91 83742 57687", email: "maram@eashaop.com", date: "2026-02-06", time: "10:30 AM", type: "Video", amount: "₹500", status: "Completed", doctor: "Dr. Shruthika Reddy", prescription: "Available" },
  { id: 3, patientName: "Ramesh Sharma", phone: "+91 98765 43210", email: "ramesh@example.com", date: "2026-02-05", time: "06:00 PM", type: "Clinic", amount: "₹800", status: "Completed", doctor: "Dr. Shruthika Reddy", prescription: "Available" },
  { id: 4, patientName: "Priya Patel", phone: "+91 98765 43211", email: "priya@example.com", date: "2026-02-04", time: "05:30 PM", type: "Video", amount: "₹500", status: "Completed", doctor: "Dr. Shruthika Reddy", prescription: "Available" },
  { id: 5, patientName: "Suresh Kumar", phone: "+91 98765 43212", email: "suresh@example.com", date: "2026-02-04", time: "11:00 AM", type: "Video", amount: "₹500", status: "Cancelled", doctor: "Dr. Shruthika Reddy", prescription: "N/A" },
  { id: 6, patientName: "Anjali Mehta", phone: "+91 98765 43213", email: "anjali@example.com", date: "2026-02-02", time: "04:30 PM", type: "Video", amount: "₹500", status: "Completed", doctor: "Dr. Shruthika Reddy", prescription: "Available" },
  { id: 7, patientName: "Vikram Singh", phone: "+91 98765 43214", email: "vikram@example.com", date: "2026-02-01", time: "02:00 PM", type: "Clinic", amount: "₹850", status: "Pending", doctor: "Dr. Shruthika Reddy", prescription: "Pending" },
  { id: 8, patientName: "Kavita Nair", phone: "+91 98765 43215", email: "kavita@example.com", date: "2026-01-30", time: "11:30 AM", type: "Video", amount: "₹500", status: "Completed", doctor: "Dr. Shruthika Reddy", prescription: "Available" },
  { id: 9, patientName: "Neha Gupta", phone: "+91 98765 43216", email: "neha@example.com", date: "2026-01-28", time: "03:00 PM", type: "Clinic", amount: "₹750", status: "Cancelled", doctor: "Dr. Shruthika Reddy", prescription: "N/A" },
  { id: 10, patientName: "Amit Sharma", phone: "+91 98765 43217", email: "amit@example.com", date: "2026-01-25", time: "10:00 AM", type: "Video", amount: "₹500", status: "Completed", doctor: "Dr. Shruthika Reddy", prescription: "Available" },
];

const statusColors = {
  Completed: "bg-green-100 text-green-700",
  Pending: "bg-amber-100 text-amber-700",
  Cancelled: "bg-red-100 text-red-700",
};

const statusIcons = {
  Completed: <CheckCircle className="w-3 h-3" />,
  Pending: <Clock className="w-3 h-3" />,
  Cancelled: <XCircle className="w-3 h-3" />,
};

export default function BookingHistoryPage() {
  const [searchTerm, setSearchTerm] = useState("");
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [selectedStatus, setSelectedStatus] = useState("all");
  const [isStatusOpen, setIsStatusOpen] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedBooking, setSelectedBooking] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [toastMessage, setToastMessage] = useState("");
  const [showToast, setShowToast] = useState(false);
  const itemsPerPage = 8;
  const statusDropdownRef = useRef(null);

  const statusOptions = [
    { value: "all", label: "All Status" },
    { value: "Completed", label: "Completed" },
    { value: "Pending", label: "Pending" },
    { value: "Cancelled", label: "Cancelled" },
  ];

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (statusDropdownRef.current && !statusDropdownRef.current.contains(event.target)) {
        setIsStatusOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const showNotification = (message) => {
    setToastMessage(message);
    setShowToast(true);
    setTimeout(() => setShowToast(false), 3000);
  };

  const getStatusCount = (status) => {
    if (status === "all") return bookingsData.length;
    return bookingsData.filter(b => b.status === status).length;
  };

  const filteredBookings = bookingsData.filter(booking => {
    const matchesSearch = booking.patientName.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          booking.phone.includes(searchTerm) ||
                          booking.email.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = selectedStatus === "all" || booking.status === selectedStatus;
    let matchesDate = true;
    if (startDate && endDate) {
      const bookingDate = new Date(booking.date);
      const start = new Date(startDate);
      const end = new Date(endDate);
      matchesDate = bookingDate >= start && bookingDate <= end;
    }
    return matchesSearch && matchesStatus && matchesDate;
  });

  const totalPages = Math.ceil(filteredBookings.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const currentBookings = filteredBookings.slice(startIndex, startIndex + itemsPerPage);

  const handleResetFilters = () => {
    setSearchTerm("");
    setStartDate("");
    setEndDate("");
    setSelectedStatus("all");
    setCurrentPage(1);
    showNotification("All filters cleared");
  };

  const handleViewDetails = (booking) => {
    setSelectedBooking(booking);
    setShowModal(true);
  };

  const handleDownloadInvoice = (booking) => {
    showNotification(`📄 Downloading invoice for ${booking.patientName}`);
  };

  const handleDownloadReport = () => {
    showNotification("📊 Booking report downloaded successfully!");
  };

  const handlePrint = (booking) => {
    showNotification(`🖨️ Printing booking details for ${booking.patientName}`);
  };

  const handleSendReminder = (booking) => {
    showNotification(`📧 Reminder sent to ${booking.patientName}`);
  };

  const getSelectedLabel = () => {
    const option = statusOptions.find(opt => opt.value === selectedStatus);
    return option ? option.label : "All Status";
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-teal-50/30">
      
      {showToast && (
        <div className="fixed top-20 right-6 z-50 bg-green-500 text-white px-4 py-2 rounded-lg shadow-lg text-sm animate-in slide-in-from-top-2">
          {toastMessage}
        </div>
      )}

      <div className="relative z-10 p-6">
        
        {/* Header */}
        <div className="mb-6">
          <div className="flex items-center gap-2 mb-1">
            <FileText className="w-5 h-5 text-[#00A99D]" />
            <h1 className="text-xl font-bold bg-gradient-to-r from-[#013A63] to-[#00A99D] bg-clip-text text-transparent">
              Booking History
            </h1>
          </div>
          <p className="text-slate-500 text-sm ml-7">View and manage all patient bookings</p>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-4 gap-3 mb-6">
          <div className="bg-white rounded-xl p-3 shadow-sm border border-green-100">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 rounded-lg bg-green-100 flex items-center justify-center"><CheckCircle className="w-4 h-4 text-green-600" /></div>
                <div><p className="text-[10px] text-slate-500">Completed</p><p className="text-xl font-bold text-green-600">{getStatusCount("Completed")}</p></div>
              </div>
              <TrendingUp className="w-3.5 h-3.5 text-green-400" />
            </div>
          </div>
          <div className="bg-white rounded-xl p-3 shadow-sm border border-amber-100">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 rounded-lg bg-amber-100 flex items-center justify-center"><Clock className="w-4 h-4 text-amber-600" /></div>
                <div><p className="text-[10px] text-slate-500">Pending</p><p className="text-xl font-bold text-amber-600">{getStatusCount("Pending")}</p></div>
              </div>
              <Activity className="w-3.5 h-3.5 text-amber-400" />
            </div>
          </div>
          <div className="bg-white rounded-xl p-3 shadow-sm border border-red-100">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 rounded-lg bg-red-100 flex items-center justify-center"><XCircle className="w-4 h-4 text-red-600" /></div>
                <div><p className="text-[10px] text-slate-500">Cancelled</p><p className="text-xl font-bold text-red-600">{getStatusCount("Cancelled")}</p></div>
              </div>
              <XCircle className="w-3.5 h-3.5 text-red-400" />
            </div>
          </div>
          <div className="bg-white rounded-xl p-3 shadow-sm border border-[#00A99D]/10">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 rounded-lg bg-[#00A99D]/10 flex items-center justify-center"><FileText className="w-4 h-4 text-[#00A99D]" /></div>
                <div><p className="text-[10px] text-slate-500">Total</p><p className="text-xl font-bold text-[#013A63]">{bookingsData.length}</p></div>
              </div>
              <Calendar className="w-3.5 h-3.5 text-[#00A99D]" />
            </div>
          </div>
        </div>

        {/* Filters Section */}
        <div className="bg-white rounded-xl shadow-sm border border-slate-100 overflow-hidden mb-6">
          <div className="px-4 py-2.5 border-b border-slate-100 bg-gradient-to-r from-slate-50 to-white">
            <div className="flex items-center gap-2">
              <Filter className="w-4 h-4 text-[#00A99D]" />
              <h2 className="font-semibold text-[#013A63] text-sm">Filters</h2>
            </div>
          </div>
          <div className="p-4">
            <div className="grid grid-cols-1 md:grid-cols-4 gap-3">
              {/* Search Input */}
              <div className="relative">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                <input
                  type="text"
                  placeholder="Search Patients..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full pl-9 pr-3 py-2 rounded-lg border border-slate-200 focus:outline-none focus:border-[#00A99D] text-sm bg-white"
                />
              </div>
              
              {/* Start Date */}
              <div className="relative">
                <CalendarIcon className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                <input
                  type="date"
                  value={startDate}
                  onChange={(e) => setStartDate(e.target.value)}
                  className="w-full pl-9 pr-3 py-2 rounded-lg border border-slate-200 focus:outline-none focus:border-[#00A99D] text-sm bg-white"
                />
              </div>
              
              {/* End Date */}
              <div className="relative">
                <CalendarIcon className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                <input
                  type="date"
                  value={endDate}
                  onChange={(e) => setEndDate(e.target.value)}
                  className="w-full pl-9 pr-3 py-2 rounded-lg border border-slate-200 focus:outline-none focus:border-[#00A99D] text-sm bg-white"
                />
              </div>
              
              {/* Status Dropdown - No Blue Highlight */}
              <div className="relative" ref={statusDropdownRef}>
                <button
                  onClick={() => setIsStatusOpen(!isStatusOpen)}
                  className="w-full flex items-center justify-between px-3 py-2 rounded-lg border border-slate-200 bg-white text-sm hover:border-[#00A99D] transition-colors"
                >
                  <span className={selectedStatus === "all" ? "text-slate-400" : "text-slate-700"}>
                    {getSelectedLabel()}
                  </span>
                  <svg className={`w-4 h-4 text-slate-400 transition-transform ${isStatusOpen ? "rotate-180" : ""}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                  </svg>
                </button>
                
                {isStatusOpen && (
                  <div className="absolute z-50 w-full mt-1 bg-white border border-slate-200 rounded-lg shadow-lg py-1">
                    {statusOptions.map((option) => (
                      <button
                        key={option.value}
                        onClick={() => {
                          setSelectedStatus(option.value);
                          setIsStatusOpen(false);
                        }}
                        className="w-full text-left px-3 py-2 text-sm hover:bg-slate-100 transition-colors text-slate-600"
                      >
                        {option.label}
                      </button>
                    ))}
                  </div>
                )}
              </div>
            </div>
            
            {(searchTerm || startDate || endDate || selectedStatus !== "all") && (
              <div className="mt-3 flex justify-end">
                <button 
                  onClick={handleResetFilters} 
                  className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-red-50 text-red-600 text-xs font-medium hover:bg-red-100 transition-colors"
                >
                  <X className="w-3.5 h-3.5" /> Clear all filters
                </button>
              </div>
            )}
          </div>
        </div>

        {/* Bookings Table */}
        <div className="bg-white rounded-xl shadow-sm border border-slate-100 overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-slate-50 border-b border-slate-200">
                <tr>
                  <th className="text-left px-3 py-2.5 text-xs font-semibold text-slate-600">Patient Name</th>
                  <th className="text-left px-3 py-2.5 text-xs font-semibold text-slate-600">Phone</th>
                  <th className="text-left px-3 py-2.5 text-xs font-semibold text-slate-600">Date</th>
                  <th className="text-left px-3 py-2.5 text-xs font-semibold text-slate-600">Time</th>
                  <th className="text-left px-3 py-2.5 text-xs font-semibold text-slate-600">Type</th>
                  <th className="text-left px-3 py-2.5 text-xs font-semibold text-slate-600">Amount</th>
                  <th className="text-left px-3 py-2.5 text-xs font-semibold text-slate-600">Status</th>
                  <th className="text-center px-3 py-2.5 text-xs font-semibold text-slate-600">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {currentBookings.map((booking) => (
                  <tr key={booking.id} className="hover:bg-slate-50 transition">
                    <td className="px-3 py-2.5">
                      <p className="font-medium text-slate-800 text-sm">{booking.patientName}</p>
                      <p className="text-xs text-slate-400">{booking.email}</p>
                    </td>
                    <td className="px-3 py-2.5 text-sm text-slate-600">{booking.phone}</td>
                    <td className="px-3 py-2.5 text-sm text-slate-600">{new Date(booking.date).toLocaleDateString('en-GB', { day: '2-digit', month: 'short', year: 'numeric' })}</td>
                    <td className="px-3 py-2.5 text-sm text-slate-600">{booking.time}</td>
                    <td className="px-3 py-2.5"><span className={`text-xs px-2 py-0.5 rounded-full ${booking.type === "Video" ? "bg-blue-100 text-blue-700" : "bg-purple-100 text-purple-700"}`}>{booking.type}</span></td>
                    <td className="px-3 py-2.5 text-sm font-semibold text-[#00A99D]">{booking.amount}</td>
                    <td className="px-3 py-2.5"><span className={`inline-flex items-center gap-0.5 text-xs px-2 py-0.5 rounded-full ${statusColors[booking.status]}`}>{statusIcons[booking.status]} {booking.status}</span></td>
                    <td className="px-3 py-2.5">
                      <div className="flex items-center justify-center gap-1.5">
                        <button onClick={() => handleViewDetails(booking)} className="p-1.5 rounded-lg hover:bg-slate-100 transition text-blue-500"><Eye className="w-3.5 h-3.5" /></button>
                        <button onClick={() => handleDownloadInvoice(booking)} className="p-1.5 rounded-lg hover:bg-slate-100 transition text-[#00A99D]"><Download className="w-3.5 h-3.5" /></button>
                        <button onClick={() => handlePrint(booking)} className="p-1.5 rounded-lg hover:bg-slate-100 transition text-slate-500"><Printer className="w-3.5 h-3.5" /></button>
                        <button onClick={() => handleSendReminder(booking)} className="p-1.5 rounded-lg hover:bg-slate-100 transition text-amber-500"><Mail className="w-3.5 h-3.5" /></button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {totalPages > 1 && (
            <div className="px-4 py-2.5 border-t border-slate-100 flex items-center justify-between">
              <p className="text-xs text-slate-500">Showing {startIndex + 1} to {Math.min(startIndex + itemsPerPage, filteredBookings.length)} of {filteredBookings.length} bookings</p>
              <div className="flex gap-2">
                <button onClick={() => setCurrentPage(p => Math.max(p - 1, 1))} disabled={currentPage === 1} className="p-1.5 rounded-lg border border-slate-200 disabled:opacity-50 hover:bg-slate-50 transition"><ChevronLeftIcon className="w-4 h-4" /></button>
                <span className="px-3 py-1.5 text-sm text-slate-600">{currentPage} / {totalPages}</span>
                <button onClick={() => setCurrentPage(p => Math.min(p + 1, totalPages))} disabled={currentPage === totalPages} className="p-1.5 rounded-lg border border-slate-200 disabled:opacity-50 hover:bg-slate-50 transition"><ChevronRight className="w-4 h-4" /></button>
              </div>
            </div>
          )}
        </div>

        {/* Download Report Button */}
        <div className="mt-4 flex justify-end">
          <button onClick={handleDownloadReport} className="flex items-center gap-1.5 px-4 py-2 rounded-lg bg-[#00A99D] text-white text-sm font-medium hover:bg-[#009488] transition">
            <Download className="w-4 h-4" /> Download Report
          </button>
        </div>

        {/* Back to Dashboard */}
        <div className="mt-6 text-center">
          <Link href="/doctor/dashboard" className="inline-flex items-center gap-1 text-sm text-[#00A99D] font-medium hover:gap-2 transition">
            <ChevronLeft className="w-4 h-4" /> Back to Dashboard
          </Link>
        </div>
      </div>

      {/* Booking Details Modal */}
      {showModal && selectedBooking && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50 p-4" onClick={() => setShowModal(false)}>
          <div className="bg-white rounded-xl max-w-md w-full max-h-[90vh] overflow-y-auto shadow-2xl" onClick={(e) => e.stopPropagation()}>
            <div className="sticky top-0 bg-gradient-to-r from-slate-50 to-white border-b border-slate-100 px-5 py-4 flex items-center justify-between">
              <h3 className="font-bold text-[#013A63] text-lg">Booking Details</h3>
              <button onClick={() => setShowModal(false)} className="text-slate-400 hover:text-slate-600 transition"><X className="w-5 h-5" /></button>
            </div>
            <div className="p-5 space-y-4">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 rounded-full bg-gradient-to-br from-[#00A99D] to-[#013A63] flex items-center justify-center"><User className="w-5 h-5 text-white" /></div>
                <div>
                  <h4 className="font-bold text-slate-800 text-base">{selectedBooking.patientName}</h4>
                  <div className="flex items-center gap-2 mt-0.5"><Mail className="w-3 h-3 text-slate-400" /><p className="text-xs text-slate-500">{selectedBooking.email}</p></div>
                  <div className="flex items-center gap-2"><Phone className="w-3 h-3 text-slate-400" /><p className="text-xs text-slate-500">{selectedBooking.phone}</p></div>
                </div>
              </div>
              <div className="bg-slate-50 rounded-lg p-3 space-y-2">
                <div className="flex justify-between"><span className="text-sm text-slate-500">Doctor:</span><span className="text-sm font-medium text-slate-700">{selectedBooking.doctor}</span></div>
                <div className="flex justify-between"><span className="text-sm text-slate-500">Date:</span><span className="text-sm font-medium text-slate-700">{new Date(selectedBooking.date).toLocaleDateString()}</span></div>
                <div className="flex justify-between"><span className="text-sm text-slate-500">Time:</span><span className="text-sm font-medium text-slate-700">{selectedBooking.time}</span></div>
                <div className="flex justify-between"><span className="text-sm text-slate-500">Type:</span><span className="text-sm font-medium text-slate-700">{selectedBooking.type}</span></div>
                <div className="flex justify-between"><span className="text-sm text-slate-500">Amount:</span><span className="text-lg font-bold text-[#00A99D]">{selectedBooking.amount}</span></div>
                <div className="flex justify-between"><span className="text-sm text-slate-500">Status:</span><span className={`inline-flex items-center gap-1 text-xs px-2 py-0.5 rounded-full ${statusColors[selectedBooking.status]}`}>{statusIcons[selectedBooking.status]} {selectedBooking.status}</span></div>
              </div>
              <div className="flex gap-3 pt-2">
                <button onClick={() => { handleDownloadInvoice(selectedBooking); setShowModal(false); }} className="flex-1 py-2 rounded-lg bg-gradient-to-r from-[#00A99D] to-[#009488] text-white text-sm font-medium flex items-center justify-center gap-2 hover:shadow-md transition"><Download className="w-4 h-4" /> Download Invoice</button>
                <button onClick={() => setShowModal(false)} className="flex-1 py-2 rounded-lg border border-slate-200 text-slate-600 text-sm font-medium hover:bg-slate-50 transition">Close</button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}