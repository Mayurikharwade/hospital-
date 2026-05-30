"use client";

import { useState } from "react";
import Link from "next/link";
import { ChevronLeft, Clock, ChevronLeft as PrevIcon, ChevronRight as NextIcon, Save, Calendar as CalendarIcon, Repeat, Coffee, Settings, Users, Calendar, CheckCircle, Bell, History, FileText } from "lucide-react";

export default function SetAvailabilityPage() {
  const [currentDate, setCurrentDate] = useState(new Date());
  const [selectedDate, setSelectedDate] = useState(null);
  const [slotDuration, setSlotDuration] = useState("30");
  const [selectedSlots, setSelectedSlots] = useState([]);
  const [recurring, setRecurring] = useState("none");
  const [breakTime, setBreakTime] = useState({ enabled: false, start: "", end: "" });
  const [bufferTime, setBufferTime] = useState(0);
  const [showBookingHistory, setShowBookingHistory] = useState(false);

  // Get current month and year
  const currentMonth = currentDate.getMonth();
  const currentYear = currentDate.getFullYear();

  // Get days in month
  const daysInMonth = new Date(currentYear, currentMonth + 1, 0).getDate();
  const firstDayOfMonth = new Date(currentYear, currentMonth, 1).getDay();

  // Generate calendar days
  const calendarDays = [];
  for (let i = 0; i < firstDayOfMonth; i++) {
    calendarDays.push(null);
  }
  for (let i = 1; i <= daysInMonth; i++) {
    calendarDays.push(i);
  }

  const monthNames = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
  const weekDays = ["S", "M", "T", "W", "T", "F", "S"];

  const timeSlots = [
    "09:00", "09:30", "10:00", "10:30", "11:00", "11:30", "12:00", "12:30",
    "13:00", "13:30", "14:00", "14:30", "15:00", "15:30", "16:00", "16:30",
    "17:00", "17:30", "18:00", "18:30", "19:00", "19:30", "20:00"
  ];

  // Booking History Data
  const bookingHistory = [
    { id: 1, date: "20 May 2026", patientName: "Ramesh Sharma", time: "10:30 AM", status: "Completed", amount: "₹800" },
    { id: 2, date: "20 May 2026", patientName: "Priya Patel", time: "11:00 AM", status: "Completed", amount: "₹700" },
    { id: 3, date: "22 May 2026", patientName: "Suresh Kumar", time: "02:00 PM", status: "Confirmed", amount: "₹850" },
    { id: 4, date: "25 May 2026", patientName: "Anjali Mehta", time: "10:00 AM", status: "Pending", amount: "₹750" },
    { id: 5, date: "25 May 2026", patientName: "Vikram Singh", time: "11:30 AM", status: "Confirmed", amount: "₹900" },
  ];

  // Mock booking data for different dates
  const bookingsData = {
    "2026-5-20": { count: 2, patients: ["Ramesh Sharma", "Priya Patel"], slots: ["10:30", "11:00"] },
    "2026-5-22": { count: 1, patients: ["Suresh Kumar"], slots: ["14:00"] },
    "2026-5-25": { count: 2, patients: ["Anjali Mehta", "Vikram Singh"], slots: ["10:00", "11:30"] },
  };

  const getBookingsForDate = (date) => {
    if (!date) return null;
    const key = `${date.getFullYear()}-${date.getMonth() + 1}-${date.getDate()}`;
    return bookingsData[key] || null;
  };

  const goToPreviousMonth = () => {
    setCurrentDate(new Date(currentYear, currentMonth - 1, 1));
    setSelectedDate(null);
    setSelectedSlots([]);
  };

  const goToNextMonth = () => {
    setCurrentDate(new Date(currentYear, currentMonth + 1, 1));
    setSelectedDate(null);
    setSelectedSlots([]);
  };

  const selectDate = (day) => {
    if (day) {
      setSelectedDate(new Date(currentYear, currentMonth, day));
      setSelectedSlots([]);
    }
  };

  const toggleTimeSlot = (time) => {
    if (selectedSlots.includes(time)) {
      setSelectedSlots(selectedSlots.filter(slot => slot !== time));
    } else {
      setSelectedSlots([...selectedSlots, time]);
    }
  };

  const handleSave = () => {
    if (!selectedDate) {
      alert("Please select a date first");
      return;
    }
    const dateStr = selectedDate.toLocaleDateString();
    let message = `✓ Availability saved for ${dateStr}\n✓ Duration: ${slotDuration} mins\n✓ Slots: ${selectedSlots.length} slots selected`;
    if (recurring !== "none") message += `\n✓ Recurring: ${recurring}`;
    if (breakTime.enabled) message += `\n✓ Break: ${breakTime.start} - ${breakTime.end}`;
    if (bufferTime > 0) message += `\n✓ Buffer Time: ${bufferTime} mins`;
    alert(message);
  };

  const handleQuickSelect = (type) => {
    if (type === "morning") {
      setSelectedSlots(["09:00", "09:30", "10:00", "10:30", "11:00", "11:30", "12:00"]);
    } else if (type === "afternoon") {
      setSelectedSlots(["13:00", "13:30", "14:00", "14:30", "15:00", "15:30", "16:00"]);
    } else if (type === "evening") {
      setSelectedSlots(["16:30", "17:00", "17:30", "18:00", "18:30", "19:00", "19:30", "20:00"]);
    } else if (type === "full") {
      setSelectedSlots([...timeSlots]);
    } else if (type === "clear") {
      setSelectedSlots([]);
    }
  };

  const isDateSelected = (day) => {
    return selectedDate && selectedDate.getDate() === day && selectedDate.getMonth() === currentMonth;
  };

  const hasBookings = (day) => {
    const date = new Date(currentYear, currentMonth, day);
    return getBookingsForDate(date) !== null;
  };

  const selectedDateBookings = selectedDate ? getBookingsForDate(selectedDate) : null;

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-teal-50/30">
      <div className="relative z-10 p-6">
        
        {/* Header */}
        <div className="mb-5">
          <div className="flex items-center gap-2 mb-1">
            <Clock className="w-5 h-5 text-[#00A99D]" />
            <h1 className="text-xl font-bold bg-gradient-to-r from-[#013A63] to-[#00A99D] bg-clip-text text-transparent">
              Set Availability
            </h1>
          </div>
          <p className="text-slate-500 text-sm ml-7">Manage your available time slots</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          
          {/* LEFT SIDE - Compact Calendar with Current Time */}
          <div className="bg-white rounded-xl shadow-sm border border-slate-100 overflow-hidden">
            <div className="bg-gradient-to-r from-[#00A99D]/10 to-transparent p-3 border-b border-slate-100">
              <div className="flex items-center gap-2">
                <CalendarIcon className="w-4 h-4 text-[#00A99D]" />
                <h2 className="font-semibold text-[#013A63] text-sm">Select a Date</h2>
              </div>
            </div>
            
            <div className="p-4">
              {/* Current Time Display */}
              <div className="flex items-center justify-between mb-4 pb-2 border-b border-slate-100">
                <div className="flex items-center gap-2">
                  <div className="w-7 h-7 rounded-full bg-[#00A99D]/10 flex items-center justify-center">
                    <Bell className="w-3.5 h-3.5 text-[#00A99D]" />
                  </div>
                  <div>
                    <p className="text-[10px] text-slate-400">Current Time</p>
                    <p className="text-base font-bold text-[#013A63]">{new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</p>
                  </div>
                </div>
                <div className="text-right">
                  <p className="text-[10px] text-slate-400">{new Date().toLocaleDateString('en-US', { weekday: 'long', month: 'long', day: 'numeric' })}</p>
                </div>
              </div>

              {/* Month Navigation */}
              <div className="flex items-center justify-between mb-4">
                <button onClick={goToPreviousMonth} className="w-7 h-7 rounded-lg hover:bg-slate-100 transition flex items-center justify-center">
                  <PrevIcon className="w-3.5 h-3.5 text-slate-500" />
                </button>
                <h3 className="text-base font-semibold text-[#013A63]">
                  {monthNames[currentMonth]} {currentYear}
                </h3>
                <button onClick={goToNextMonth} className="w-7 h-7 rounded-lg hover:bg-slate-100 transition flex items-center justify-center">
                  <NextIcon className="w-3.5 h-3.5 text-slate-500" />
                </button>
              </div>

              {/* Week Days Header */}
              <div className="grid grid-cols-7 gap-0.5 mb-1">
                {weekDays.map((day, idx) => (
                  <div key={idx} className="text-center text-[10px] font-medium text-slate-400 py-1">
                    {day}
                  </div>
                ))}
              </div>

              {/* Calendar Days */}
              <div className="grid grid-cols-7 gap-0.5">
                {calendarDays.map((day, idx) => (
                  <div key={idx} className="text-center">
                    {day ? (
                      <button
                        onClick={() => selectDate(day)}
                        className={`w-full py-1.5 rounded-md text-xs font-medium transition-all relative ${
                          isDateSelected(day)
                            ? "bg-[#00A99D] text-white shadow-sm"
                            : hasBookings(day)
                            ? "bg-amber-100 text-amber-700 hover:bg-amber-200"
                            : "text-slate-600 hover:bg-slate-100"
                        }`}
                      >
                        {day}
                        {hasBookings(day) && !isDateSelected(day) && (
                          <span className="absolute -top-0.5 -right-0.5 w-1.5 h-1.5 bg-amber-500 rounded-full"></span>
                        )}
                      </button>
                    ) : (
                      <div className="py-1.5"></div>
                    )}
                  </div>
                ))}
              </div>

              {/* Booking Info for Selected Date */}
              {selectedDate && selectedDateBookings && (
                <div className="mt-4 pt-3 border-t border-slate-100">
                  <div className="flex items-center gap-2 mb-2">
                    <Users className="w-3.5 h-3.5 text-[#00A99D]" />
                    <p className="text-xs font-medium text-slate-700">Bookings on this date</p>
                  </div>
                  <div className="bg-amber-50 rounded-lg p-2">
                    <div className="flex items-center justify-between mb-1">
                      <span className="text-xs font-semibold text-amber-700">{selectedDateBookings.count} Appointments</span>
                      <span className="text-[10px] text-amber-600">Already booked</span>
                    </div>
                    <div className="flex flex-wrap gap-1">
                      {selectedDateBookings.slots.map((slot, idx) => (
                        <span key={idx} className="text-[10px] bg-white px-1.5 py-0.5 rounded text-slate-600">
                          {slot}
                        </span>
                      ))}
                    </div>
                    <p className="text-[10px] text-amber-600 mt-1.5">⚠️ These slots are already booked</p>
                  </div>
                </div>
              )}

              {/* No Bookings Message */}
              {selectedDate && !selectedDateBookings && (
                <div className="mt-4 pt-3 border-t border-slate-100">
                  <div className="flex items-center gap-2">
                    <CheckCircle className="w-3.5 h-3.5 text-green-500" />
                    <p className="text-xs text-slate-500">No bookings yet on this date</p>
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* RIGHT SIDE - Time Slots & Settings */}
          <div className="space-y-4">
            {/* Main Time Slots Card */}
            <div className="bg-white rounded-xl shadow-sm border border-slate-100 overflow-hidden">
              <div className="bg-gradient-to-r from-[#00A99D]/10 to-transparent p-3 border-b border-slate-100">
                <div className="flex items-center justify-between">
                  <h2 className="font-semibold text-[#013A63] text-sm">
                    {selectedDate ? (
                      <>Time slots for {selectedDate.toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}</>
                    ) : (
                      "Select a date to manage slots"
                    )}
                  </h2>
                  <button 
                    onClick={() => setShowBookingHistory(!showBookingHistory)}
                    className="flex items-center gap-1 text-[10px] text-[#00A99D] hover:underline"
                  >
                    <History className="w-3 h-3" /> Booking History
                  </button>
                </div>
              </div>
              
              <div className="p-4">
                {selectedDate ? (
                  <>
                    {/* Quick Select Buttons */}
                    <div className="mb-4">
                      <label className="block text-xs font-medium text-slate-700 mb-2">Quick Select</label>
                      <div className="flex flex-wrap gap-2">
                        <button onClick={() => handleQuickSelect("morning")} className="px-2 py-1 rounded-md bg-amber-50 text-amber-600 text-[11px] font-medium hover:bg-amber-100 transition">Morning</button>
                        <button onClick={() => handleQuickSelect("afternoon")} className="px-2 py-1 rounded-md bg-blue-50 text-blue-600 text-[11px] font-medium hover:bg-blue-100 transition">Afternoon</button>
                        <button onClick={() => handleQuickSelect("evening")} className="px-2 py-1 rounded-md bg-purple-50 text-purple-600 text-[11px] font-medium hover:bg-purple-100 transition">Evening</button>
                        <button onClick={() => handleQuickSelect("full")} className="px-2 py-1 rounded-md bg-green-50 text-green-600 text-[11px] font-medium hover:bg-green-100 transition">Full Day</button>
                        <button onClick={() => handleQuickSelect("clear")} className="px-2 py-1 rounded-md bg-red-50 text-red-600 text-[11px] font-medium hover:bg-red-100 transition">Clear All</button>
                      </div>
                    </div>

                    {/* Slot Duration */}
                    <div className="mb-4">
                      <label className="block text-xs font-medium text-slate-700 mb-2">Slot Duration</label>
                      <div className="flex gap-2">
                        <button onClick={() => setSlotDuration("30")} className={`px-3 py-1 rounded-full text-xs font-medium transition-all ${slotDuration === "30" ? "bg-[#00A99D] text-white shadow-sm" : "bg-slate-100 text-slate-600 hover:bg-slate-200"}`}>30 mins</button>
                        <button onClick={() => setSlotDuration("60")} className={`px-3 py-1 rounded-full text-xs font-medium transition-all ${slotDuration === "60" ? "bg-[#00A99D] text-white shadow-sm" : "bg-slate-100 text-slate-600 hover:bg-slate-200"}`}>60 mins</button>
                      </div>
                    </div>

                    {/* Time Slots Grid */}
                    <div className="mb-4">
                      <label className="block text-xs font-medium text-slate-700 mb-2">Select Time Slots</label>
                      <div className="grid grid-cols-4 gap-1.5">
                        {timeSlots.map((time) => (
                          <button key={time} onClick={() => toggleTimeSlot(time)} className={`px-2 py-1 rounded-md text-[11px] font-medium transition-all ${selectedSlots.includes(time) ? "bg-[#00A99D] text-white shadow-sm" : "bg-slate-100 text-slate-600 hover:bg-slate-200"}`}>
                            {time}
                          </button>
                        ))}
                      </div>
                    </div>

                    {/* Selected Slots Summary */}
                    {selectedSlots.length > 0 && (
                      <div className="bg-[#00A99D]/10 rounded-lg p-2 mb-4">
                        <p className="text-xs font-medium text-[#013A63] mb-1">Selected: {selectedSlots.length} slots</p>
                        <div className="flex flex-wrap gap-1">
                          {selectedSlots.slice(0, 8).map((slot, idx) => (
                            <span key={idx} className="text-[10px] bg-white px-1.5 py-0.5 rounded text-slate-600">{slot}</span>
                          ))}
                          {selectedSlots.length > 8 && <span className="text-[10px] text-[#00A99D]">+{selectedSlots.length - 8} more</span>}
                        </div>
                      </div>
                    )}

                    {/* Save Button */}
                    <button onClick={handleSave} className="w-full py-2 rounded-lg bg-[#00A99D] text-white text-sm font-medium hover:bg-[#009488] transition flex items-center justify-center gap-2">
                      <Save className="w-4 h-4" /> Save Availability
                    </button>
                  </>
                ) : (
                  <div className="text-center py-8">
                    <Clock className="w-10 h-10 text-slate-300 mx-auto mb-2" />
                    <p className="text-sm text-slate-500">Select a date from the calendar</p>
                  </div>
                )}
              </div>
            </div>

            {/* Booking History Section */}
            {showBookingHistory && (
              <div className="bg-white rounded-xl shadow-sm border border-slate-100 overflow-hidden">
                <div className="bg-gradient-to-r from-blue-500/10 to-transparent p-3 border-b border-slate-100">
                  <div className="flex items-center gap-2">
                    <History className="w-4 h-4 text-blue-500" />
                    <h2 className="font-semibold text-[#013A63] text-sm">Booking History</h2>
                  </div>
                </div>
                <div className="max-h-64 overflow-y-auto">
                  <div className="divide-y divide-slate-100">
                    {bookingHistory.map((booking) => (
                      <div key={booking.id} className="p-3 hover:bg-slate-50 transition">
                        <div className="flex items-center justify-between">
                          <div>
                            <p className="font-medium text-slate-800 text-sm">{booking.patientName}</p>
                            <p className="text-xs text-slate-500">{booking.date} • {booking.time}</p>
                          </div>
                          <div className="text-right">
                            <p className="text-sm font-semibold text-[#00A99D]">{booking.amount}</p>
                            <span className={`text-[10px] px-1.5 py-0.5 rounded-full ${
                              booking.status === "Completed" ? "bg-green-100 text-green-700" :
                              booking.status === "Confirmed" ? "bg-blue-100 text-blue-700" :
                              "bg-amber-100 text-amber-700"
                            }`}>
                              {booking.status}
                            </span>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
                <div className="p-2 bg-slate-50 text-center">
                  <button className="text-xs text-[#00A99D] font-medium">View All History</button>
                </div>
              </div>
            )}

            {/* Additional Settings Card */}
            <div className="bg-white rounded-xl shadow-sm border border-slate-100 overflow-hidden">
              <div className="bg-gradient-to-r from-slate-50 to-white p-3 border-b border-slate-100">
                <div className="flex items-center gap-2">
                  <Settings className="w-4 h-4 text-[#00A99D]" />
                  <h2 className="font-semibold text-[#013A63] text-sm">Additional Settings</h2>
                </div>
              </div>
              <div className="p-4 space-y-3">
                {/* Recurring Availability */}
                <div>
                  <label className="block text-xs font-medium text-slate-700 mb-1.5 flex items-center gap-1">
                    <Repeat className="w-3.5 h-3.5" /> Recurring Availability
                  </label>
                  <div className="flex gap-2">
                    {["none", "daily", "weekly", "monthly"].map((opt) => (
                      <button key={opt} onClick={() => setRecurring(opt)} className={`px-3 py-1 rounded-full text-xs font-medium transition-all ${recurring === opt ? "bg-[#00A99D] text-white shadow-sm" : "bg-slate-100 text-slate-600 hover:bg-slate-200"}`}>
                        {opt.charAt(0).toUpperCase() + opt.slice(1)}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Break Time */}
                <div>
                  <div className="flex items-center justify-between mb-1.5">
                    <label className="text-xs font-medium text-slate-700 flex items-center gap-1">
                      <Coffee className="w-3.5 h-3.5" /> Break Time
                    </label>
                    <button onClick={() => setBreakTime({ ...breakTime, enabled: !breakTime.enabled })} className={`text-[10px] px-2 py-0.5 rounded-full ${breakTime.enabled ? "bg-red-100 text-red-600" : "bg-green-100 text-green-600"}`}>
                      {breakTime.enabled ? "Disable" : "Enable"}
                    </button>
                  </div>
                  {breakTime.enabled && (
                    <div className="flex gap-2">
                      <select value={breakTime.start} onChange={(e) => setBreakTime({ ...breakTime, start: e.target.value })} className="flex-1 px-2 py-1 rounded-lg border border-slate-200 text-xs">
                        <option value="">Start</option>
                        <option>12:00 PM</option><option>12:30 PM</option><option>01:00 PM</option><option>01:30 PM</option>
                      </select>
                      <select value={breakTime.end} onChange={(e) => setBreakTime({ ...breakTime, end: e.target.value })} className="flex-1 px-2 py-1 rounded-lg border border-slate-200 text-xs">
                        <option value="">End</option>
                        <option>01:00 PM</option><option>01:30 PM</option><option>02:00 PM</option><option>02:30 PM</option>
                      </select>
                    </div>
                  )}
                </div>

                {/* Buffer Time */}
                <div>
                  <label className="block text-xs font-medium text-slate-700 mb-1.5">Buffer Time between appointments</label>
                  <div className="flex gap-2">
                    {[0, 5, 10, 15, 30].map((mins) => (
                      <button key={mins} onClick={() => setBufferTime(mins)} className={`px-3 py-1 rounded-full text-xs font-medium transition-all ${bufferTime === mins ? "bg-[#00A99D] text-white shadow-sm" : "bg-slate-100 text-slate-600 hover:bg-slate-200"}`}>
                        {mins} min{mins !== 1 ? 's' : ''}
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Back to Dashboard */}
        <div className="mt-6 text-center">
          <Link href="/doctor/dashboard" className="inline-flex items-center gap-1 text-sm text-[#00A99D] font-medium hover:gap-2 transition">
            <ChevronLeft className="w-4 h-4" /> Back to Dashboard
          </Link>
        </div>
      </div>
    </div>
  );
}