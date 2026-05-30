"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { 
  Video, 
  Calendar, 
  User, 
  ChevronLeft, 
  Phone, 
  Mic, 
  MicOff, 
  VideoOff, 
  Star, 
  X,
  ChevronRight,
  CheckCircle,
  Clock,
  MapPin,
  DollarSign,
  Languages,
  Trash2,
  AlertCircle
} from "lucide-react";

const allDoctors = [
  {
    id: 1,
    name: "Dr. Shruthika Reddy",
    specialty: "Cardiologist",
    experience: "12+ years",
    fee: "₹800",
    rating: 4.9,
    available: "Available Now",
    image: "https://images.unsplash.com/photo-1559839734-2b71ea197ec2?w=100&h=100&fit=crop",
    hospital: "IndoUs Hospital, Hitech City",
    languages: ["English", "Hindi", "Telugu"],
    education: "MBBS, MD (Cardiology)",
    about: "Senior Cardiologist with 12+ years of experience."
  },
  {
    id: 2,
    name: "Dr. Rajesh Kumar",
    specialty: "Neurologist",
    experience: "15+ years",
    fee: "₹900",
    rating: 4.8,
    available: "In 10 min",
    image: "https://images.unsplash.com/photo-1612349317150-e413f6a5b16d?w=100&h=100&fit=crop",
    hospital: "City Neuro Care, Banjara Hills",
    languages: ["English", "Hindi"],
    education: "MBBS, MD (Neurology)",
    about: "Expert in stroke management."
  },
  {
    id: 3,
    name: "Dr. Priya Sharma",
    specialty: "Dermatologist",
    experience: "8+ years",
    fee: "₹700",
    rating: 4.7,
    available: "Available Now",
    image: "https://randomuser.me/api/portraits/women/2.jpg",
    hospital: "Skin Clinic, Jubilee Hills",
    languages: ["English", "Telugu"],
    education: "MBBS, MD (Dermatology)",
    about: "Specialized in cosmetic dermatology."
  },
  {
    id: 4,
    name: "Dr. Amit Patel",
    specialty: "Orthopedic",
    experience: "10+ years",
    fee: "₹850",
    rating: 4.8,
    available: "Available Now",
    image: "https://randomuser.me/api/portraits/men/4.jpg",
    hospital: "Ortho Care, Secunderabad",
    languages: ["English", "Hindi", "Telugu"],
    education: "MBBS, MS (Orthopedics)",
    about: "Joint replacement specialist."
  },
  {
    id: 5,
    name: "Dr. Neha Gupta",
    specialty: "Pediatrician",
    experience: "9+ years",
    fee: "₹750",
    rating: 4.9,
    available: "In 20 min",
    image: "https://randomuser.me/api/portraits/women/5.jpg",
    hospital: "Child Care Clinic, Gachibowli",
    languages: ["English", "Hindi"],
    education: "MBBS, MD (Pediatrics)",
    about: "Child specialist."
  },
  {
    id: 6,
    name: "Dr. Sanjay Mehra",
    specialty: "Gastroenterologist",
    experience: "14+ years",
    fee: "₹950",
    rating: 4.7,
    available: "Available Now",
    image: "https://randomuser.me/api/portraits/men/6.jpg",
    hospital: "Gastro Care, Madhapur",
    languages: ["English", "Hindi", "Telugu"],
    education: "MBBS, MD (Gastroenterology)",
    about: "Digestive health specialist."
  },
];

const timeSlots = [
  "09:00 AM", "09:30 AM", "10:00 AM", "10:30 AM", "11:00 AM", "11:30 AM",
  "12:00 PM", "12:30 PM", "02:00 PM", "02:30 PM", "03:00 PM", "03:30 PM",
  "04:00 PM", "04:30 PM", "05:00 PM"
];

const getNextDays = () => {
  const days = [];
  const today = new Date();
  for (let i = 0; i < 7; i++) {
    const date = new Date(today);
    date.setDate(today.getDate() + i);
    days.push({
      date: date,
      fullDate: date.toLocaleDateString('en-US', { weekday: 'short', month: 'short', day: 'numeric' })
    });
  }
  return days;
};

export default function VideoConsultPage() {
  const [selectedDoctor, setSelectedDoctor] = useState(null);
  const [isCallActive, setIsCallActive] = useState(false);
  const [isMuted, setIsMuted] = useState(false);
  const [isVideoOff, setIsVideoOff] = useState(false);
  const [viewAll, setViewAll] = useState(false);
  const [showBookingModal, setShowBookingModal] = useState(false);
  const [showDoctorModal, setShowDoctorModal] = useState(false);
  const [showCancelModal, setShowCancelModal] = useState(false);
  const [bookingDoctor, setBookingDoctor] = useState(null);
  const [selectedDate, setSelectedDate] = useState("");
  const [selectedTime, setSelectedTime] = useState("");
  const [bookingStep, setBookingStep] = useState(1);
  const [showToast, setShowToast] = useState(false);
  const [toastMessage, setToastMessage] = useState("");
  const [consultations, setConsultations] = useState([]);
  const [cancelAppointment, setCancelAppointment] = useState(null);

  const nextDays = getNextDays();

  useEffect(() => {
    const saved = localStorage.getItem("consultations");
    if (saved) {
      setConsultations(JSON.parse(saved));
    } else {
      const defaultConsultations = [
        {
          id: 1,
          doctorId: 1,
          doctorName: "Dr. Shruthika Reddy",
          doctorSpecialty: "Cardiologist",
          doctorImage: "https://images.unsplash.com/photo-1559839734-2b71ea197ec2?w=100&h=100&fit=crop",
          date: "Sun, May 31",
          time: "11:30 AM",
          fee: "₹800",
          status: "Upcoming",
          bookedOn: "2026-05-28"
        },
        {
          id: 2,
          doctorId: 5,
          doctorName: "Dr. Neha Gupta",
          doctorSpecialty: "Pediatrician",
          doctorImage: "https://randomuser.me/api/portraits/women/5.jpg",
          date: "Sun, May 31",
          time: "03:00 PM",
          fee: "₹750",
          status: "Upcoming",
          bookedOn: "2026-05-28"
        },
        {
          id: 3,
          doctorId: 1,
          doctorName: "Dr. Shruthika Reddy",
          doctorSpecialty: "Cardiologist",
          doctorImage: "https://images.unsplash.com/photo-1559839734-2b71ea197ec2?w=100&h=100&fit=crop",
          date: "Sun, May 31",
          time: "03:00 PM",
          fee: "₹800",
          status: "Upcoming",
          bookedOn: "2026-05-28"
        }
      ];
      setConsultations(defaultConsultations);
      localStorage.setItem("consultations", JSON.stringify(defaultConsultations));
    }
  }, []);

  const showNotification = (msg) => {
    setToastMessage(msg);
    setShowToast(true);
    setTimeout(() => setShowToast(false), 3000);
  };

  const handleStartCall = (doctor) => {
    setSelectedDoctor(doctor);
    setIsCallActive(true);
  };

const handleEndCall = () => {
  setIsCallActive(false);
  setSelectedDoctor(null);
  setIsMuted(false);
  setIsVideoOff(false);
  // No reload, just reset states
};
  const handleViewDoctor = (doctor) => {
    setSelectedDoctor(doctor);
    setShowDoctorModal(true);
  };

  const handleBookClick = (doctor) => {
    setBookingDoctor(doctor);
    setBookingStep(1);
    setSelectedDate("");
    setSelectedTime("");
    setShowBookingModal(true);
    setShowDoctorModal(false);
  };

  const handleConfirmBooking = () => {
    if (!selectedDate) {
      showNotification("Please select a date");
      return;
    }
    if (!selectedTime) {
      showNotification("Please select a time slot");
      return;
    }
    
    const newConsultation = {
      id: Date.now(),
      doctorId: bookingDoctor.id,
      doctorName: bookingDoctor.name,
      doctorSpecialty: bookingDoctor.specialty,
      doctorImage: bookingDoctor.image,
      date: selectedDate,
      time: selectedTime,
      fee: bookingDoctor.fee,
      status: "Upcoming",
      bookedOn: new Date().toISOString()
    };
    
    const updated = [newConsultation, ...consultations];
    setConsultations(updated);
    localStorage.setItem("consultations", JSON.stringify(updated));
    
    setShowBookingModal(false);
    setBookingDoctor(null);
    showNotification(`✅ Consultation booked with ${bookingDoctor.name} on ${selectedDate} at ${selectedTime}`);
  };

  const handleCancelClick = (consultation) => {
    setCancelAppointment(consultation);
    setShowCancelModal(true);
  };

const confirmCancel = () => {
  if (cancelAppointment) {
    // Pehle modal band karo
    setShowCancelModal(false);
    // Phir data update karo
    const updated = consultations.filter(c => c.id !== cancelAppointment.id);
    setConsultations(updated);
    localStorage.setItem("consultations", JSON.stringify(updated));
    showNotification(`❌ Appointment cancelled`);
    setCancelAppointment(null);
  }
};
  const displayedDoctors = viewAll ? allDoctors : allDoctors.slice(0, 3);
  const upcomingConsultations = consultations.filter(c => c.status === "Upcoming");

  // Video Call Interface - Exactly like reference code
  if (isCallActive && selectedDoctor) {
  return (
    <div className="fixed inset-0 bg-slate-900 z-50 flex items-center justify-center">
      <div className="relative w-full max-w-4xl bg-slate-800 rounded-2xl overflow-hidden shadow-2xl">
        {/* Video Container */}
        <div className="relative h-96 bg-gradient-to-br from-[#013A63] to-[#00A99D] flex items-center justify-center">
          {!isVideoOff && (
            <div className="absolute top-4 right-4 w-32 h-24 bg-slate-700 rounded-lg border-2 border-white overflow-hidden">
              <div className="w-full h-full bg-slate-600 flex items-center justify-center text-white text-xs">Self View</div>
            </div>
          )}
          <div className="text-center text-white">
            <img src={selectedDoctor.image} alt={selectedDoctor.name} className="w-24 h-24 rounded-full mx-auto mb-4 border-4 border-white" />
            <h2 className="text-2xl font-bold">{selectedDoctor.name}</h2>
            <p className="text-white/80">{selectedDoctor.specialty}</p>
            <p className="text-green-400 text-sm mt-2">Connected</p>
          </div>
        </div>

        {/* Call Controls */}
        <div className="p-4 bg-slate-800 flex items-center justify-center gap-4">
          <button onClick={() => setIsMuted(!isMuted)} className="w-12 h-12 rounded-full bg-slate-700 text-white hover:bg-slate-600 transition flex items-center justify-center">
            {isMuted ? <MicOff className="w-5 h-5" /> : <Mic className="w-5 h-5" />}
          </button>
          <button onClick={() => setIsVideoOff(!isVideoOff)} className="w-12 h-12 rounded-full bg-slate-700 text-white hover:bg-slate-600 transition flex items-center justify-center">
            {isVideoOff ? <VideoOff className="w-5 h-5" /> : <Video className="w-5 h-5" />}
          </button>
          <button onClick={handleEndCall} className="w-12 h-12 rounded-full bg-red-500 text-white hover:bg-red-600 transition flex items-center justify-center">
            <Phone className="w-5 h-5 rotate-135" />
          </button>
        </div>
        <div className="p-3 text-center text-slate-400 text-xs">Consultation in progress... Quality: HD</div>
      </div>
    </div>
  );
}  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-teal-50/30">
      
      {/* Toast Notification */}
      {showToast && (
        <div className="fixed top-20 right-6 z-50 px-5 py-3 rounded-xl shadow-lg text-sm font-medium flex items-center gap-2 animate-in slide-in-from-top-2 bg-emerald-500 text-white">
          {toastMessage.includes("✅") ? <CheckCircle className="w-4 h-4" /> : <AlertCircle className="w-4 h-4" />}
          {toastMessage}
        </div>
      )}

      {/* Cancel Confirmation Modal */}
     {showCancelModal && cancelAppointment && (
  <div className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 flex items-center justify-center p-4" onClick={() => setShowCancelModal(false)}>
    <div className="bg-white rounded-2xl max-w-md w-full shadow-2xl transform transition-all" onClick={(e) => e.stopPropagation()}>
      <div className="bg-gradient-to-r from-red-600 to-red-500 p-5 text-white text-center rounded-t-2xl">
        <AlertCircle className="w-12 h-12 mx-auto mb-2" />
        <h2 className="text-xl font-bold">Cancel Appointment</h2>
        <p className="text-white/80 text-sm">Are you sure you want to cancel?</p>
      </div>
      <div className="p-5">
        <div className="flex items-center gap-3 p-3 bg-slate-50 rounded-lg mb-4">
          <img src={cancelAppointment.doctorImage} alt={cancelAppointment.doctorName} className="w-12 h-12 rounded-full object-cover" />
          <div>
            <p className="font-semibold text-slate-800">{cancelAppointment.doctorName}</p>
            <p className="text-xs text-slate-500">{cancelAppointment.doctorSpecialty}</p>
            <p className="text-xs text-slate-400 mt-1">{cancelAppointment.date} at {cancelAppointment.time}</p>
          </div>
        </div>
        <p className="text-sm text-slate-600 mb-4">This action cannot be undone.</p>
        <div className="flex gap-3">
          <button onClick={() => setShowCancelModal(false)} className="flex-1 py-2 rounded-xl border border-slate-200 text-slate-600 font-medium hover:bg-slate-50 transition">
            Keep Appointment
          </button>
          <button onClick={confirmCancel} className="flex-1 py-2 rounded-xl bg-red-500 text-white font-medium hover:bg-red-600 transition">
            Yes, Cancel
          </button>
        </div>
      </div>
    </div>
  </div>
)}
      {/* Doctor Details Modal */}
      {showDoctorModal && selectedDoctor && (
        <div className="fixed inset-0 bg-black/60 z-50 flex items-center justify-center p-4" onClick={() => setShowDoctorModal(false)}>
          <div className="bg-white rounded-2xl max-w-md w-full max-h-[90vh] overflow-y-auto" onClick={(e) => e.stopPropagation()}>
            <div className="bg-gradient-to-r from-[#013A63] to-[#00A99D] p-5 text-white text-center relative">
              <button onClick={() => setShowDoctorModal(false)} className="absolute top-4 right-4 text-white/80 hover:text-white">
                <X className="w-5 h-5" />
              </button>
              <img src={selectedDoctor.image} alt={selectedDoctor.name} className="w-24 h-24 rounded-full mx-auto border-4 border-white mb-3" />
              <h2 className="text-xl font-bold">{selectedDoctor.name}</h2>
              <p className="text-white/80 text-sm">{selectedDoctor.specialty}</p>
              <div className="flex items-center justify-center gap-1 mt-2">
                <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                <span className="text-white">{selectedDoctor.rating}</span>
                <span className="text-white/70 text-xs">• {selectedDoctor.experience} exp</span>
              </div>
            </div>
            <div className="p-5 space-y-4">
              <div className="flex items-start gap-3">
                <MapPin className="w-4 h-4 text-slate-400 mt-0.5" />
                <div>
                  <p className="text-xs text-slate-500">Hospital</p>
                  <p className="text-sm text-slate-700">{selectedDoctor.hospital}</p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <DollarSign className="w-4 h-4 text-slate-400 mt-0.5" />
                <div>
                  <p className="text-xs text-slate-500">Consultation Fee</p>
                  <p className="text-sm font-semibold text-[#00A99D]">{selectedDoctor.fee}</p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <User className="w-4 h-4 text-slate-400 mt-0.5" />
                <div>
                  <p className="text-xs text-slate-500">Education</p>
                  <p className="text-sm text-slate-700">{selectedDoctor.education}</p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <Languages className="w-4 h-4 text-slate-400 mt-0.5" />
                <div>
                  <p className="text-xs text-slate-500">Languages</p>
                  <div className="flex flex-wrap gap-1 mt-1">
                    {selectedDoctor.languages.map((lang, idx) => (
                      <span key={idx} className="text-xs bg-slate-100 px-2 py-0.5 rounded-full">{lang}</span>
                    ))}
                  </div>
                </div>
              </div>
              <button 
                onClick={() => handleBookClick(selectedDoctor)}
                className="w-full mt-2 py-3 rounded-xl bg-[#00A99D] text-white font-medium hover:bg-[#009488] transition flex items-center justify-center gap-2"
              >
                <Calendar className="w-4 h-4" /> Book Video Consultation
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Booking Modal */}
      {showBookingModal && bookingDoctor && (
        <div className="fixed inset-0 bg-black/60 z-50 flex items-center justify-center p-4" onClick={() => setShowBookingModal(false)}>
          <div className="bg-white rounded-2xl max-w-md w-full max-h-[90vh] overflow-hidden" onClick={(e) => e.stopPropagation()}>
            <div className="bg-gradient-to-r from-[#013A63] to-[#00A99D] p-4 text-white">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="font-bold text-lg">Book Consultation</h3>
                  <p className="text-xs text-white/80">with {bookingDoctor.name}</p>
                </div>
                <button onClick={() => setShowBookingModal(false)} className="text-white/80 hover:text-white">
                  <X className="w-5 h-5" />
                </button>
              </div>
            </div>

            <div className="flex border-b">
              <div className={`flex-1 text-center py-3 text-sm font-medium ${bookingStep === 1 ? 'text-[#00A99D] border-b-2 border-[#00A99D]' : 'text-slate-400'}`}>
                Select Date
              </div>
              <div className={`flex-1 text-center py-3 text-sm font-medium ${bookingStep === 2 ? 'text-[#00A99D] border-b-2 border-[#00A99D]' : 'text-slate-400'}`}>
                Select Time
              </div>
            </div>

            {bookingStep === 1 && (
              <div className="p-4">
                <p className="text-sm font-medium text-slate-700 mb-3">Choose a date</p>
                <div className="grid grid-cols-4 gap-2">
                  {nextDays.map((day, idx) => (
                    <button
                      key={idx}
                      onClick={() => {
                        setSelectedDate(day.fullDate);
                        setBookingStep(2);
                      }}
                      className="p-3 rounded-xl border border-slate-200 text-center hover:border-[#00A99D] hover:bg-[#00A99D]/5 transition"
                    >
                      <p className="text-xs font-medium text-slate-500">{day.fullDate.split(',')[0]}</p>
                      <p className="text-lg font-bold text-slate-700">{day.fullDate.split(' ')[2]}</p>
                    </button>
                  ))}
                </div>
                <div className="mt-4 p-3 bg-slate-50 rounded-lg">
                  <p className="text-xs text-slate-500">Consultation Fee: {bookingDoctor.fee} (30 mins)</p>
                </div>
              </div>
            )}

            {bookingStep === 2 && (
              <div className="p-4">
                <div className="flex items-center justify-between mb-3">
                  <p className="text-sm font-medium text-slate-700">Select time slot</p>
                  <button onClick={() => setBookingStep(1)} className="text-xs text-[#00A99D] hover:underline">
                    ← Back
                  </button>
                </div>
                <div className="grid grid-cols-3 gap-2 max-h-80 overflow-y-auto">
                  {timeSlots.map((slot, idx) => (
                    <button
                      key={idx}
                      onClick={() => setSelectedTime(slot)}
                      className={`p-2 rounded-lg text-sm font-medium transition ${
                        selectedTime === slot
                          ? 'bg-[#00A99D] text-white'
                          : 'bg-slate-100 text-slate-600 hover:bg-[#00A99D]/10'
                      }`}
                    >
                      {slot}
                    </button>
                  ))}
                </div>
                <button 
                  onClick={handleConfirmBooking}
                  className="w-full mt-4 py-3 rounded-xl bg-[#00A99D] text-white font-medium hover:bg-[#009488] transition flex items-center justify-center gap-2"
                >
                  <CheckCircle className="w-4 h-4" /> Confirm Booking
                </button>
              </div>
            )}
          </div>
        </div>
      )}

      <div className="relative z-10 px-6 py-4">
        
        {/* Header */}
        <div className="mb-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Video className="w-5 h-5 text-[#00A99D]" />
              <h1 className="text-xl font-bold bg-gradient-to-r from-[#013A63] to-[#00A99D] bg-clip-text text-transparent">
                Video Consult
              </h1>
            </div>
            <div className="flex items-center gap-3">
              <span className="text-sm text-slate-600 hidden md:inline">Dr. Shruthika Reddy</span>
              <div className="w-8 h-8 rounded-full bg-gradient-to-r from-[#013A63] to-[#00A99D] flex items-center justify-center text-white text-sm font-bold">
                DR
              </div>
            </div>
          </div>
          <p className="text-slate-500 text-sm ml-7 mt-1">Consult with doctors via video call</p>
        </div>

        {/* Available Doctors */}
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <h2 className="font-semibold text-[#013A63] text-base">Available Doctors</h2>
            {!viewAll && allDoctors.length > 3 && (
              <button onClick={() => setViewAll(true)} className="text-xs text-[#00A99D] flex items-center gap-1 hover:gap-2 transition">
                View all <ChevronRight className="w-3 h-3" />
              </button>
            )}
            {viewAll && (
              <button onClick={() => setViewAll(false)} className="text-xs text-[#00A99D] flex items-center gap-1 hover:gap-2 transition">
                Show less
              </button>
            )}
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {displayedDoctors.map((doctor) => (
              <div key={doctor.id} className="bg-white rounded-xl p-4 shadow-sm border border-slate-100 hover:shadow-md transition">
                <div className="flex items-center gap-3">
                  <button onClick={() => handleViewDoctor(doctor)} className="flex-shrink-0">
                    <img src={doctor.image} alt={doctor.name} className="w-14 h-14 rounded-full object-cover cursor-pointer hover:opacity-80 transition" />
                  </button>
                  <div className="flex-1">
                    <button onClick={() => handleViewDoctor(doctor)} className="text-left">
                      <div className="flex items-center gap-1">
                        <h3 className="font-semibold text-slate-800 text-sm hover:text-[#00A99D] transition">{doctor.name}</h3>
                        <div className="flex items-center gap-0.5 ml-1">
                          <Star className="w-3 h-3 fill-yellow-400 text-yellow-400" />
                          <span className="text-xs">{doctor.rating}</span>
                        </div>
                      </div>
                      <p className="text-xs text-slate-500">{doctor.specialty}</p>
                      <p className="text-xs text-green-600 mt-1">{doctor.available}</p>
                      <p className="text-xs font-semibold text-[#00A99D] mt-1">{doctor.fee}</p>
                    </button>
                  </div>
                </div>
                <div className="mt-3 flex gap-2">
                  <button 
                    onClick={() => handleStartCall(doctor)} 
                    className="flex-1 py-2 rounded-lg bg-[#00A99D] text-white text-sm font-medium hover:bg-[#009488] transition flex items-center justify-center gap-1"
                  >
                    <Video className="w-4 h-4" /> Start Call
                  </button>
                  <button 
                    onClick={() => handleBookClick(doctor)}
                    className="px-3 py-2 rounded-lg border border-slate-200 text-slate-600 text-sm font-medium hover:bg-slate-50 transition"
                    title="Schedule Appointment"
                  >
                    <Calendar className="w-4 h-4" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Your Recent Consultations */}
        <div className="mt-8">
          <h2 className="font-semibold text-[#013A63] text-base mb-3">Your Recent Consultations</h2>
         <div className="bg-white rounded-xl shadow-sm border border-slate-100 overflow-hidden">
  {upcomingConsultations.length === 0 ? (
    <div className="text-center py-12">
      <div className="w-16 h-16 bg-slate-100 rounded-full flex items-center justify-center mx-auto mb-3">
        <Calendar className="w-8 h-8 text-slate-400" />
      </div>
      <p className="text-sm text-slate-500">No upcoming consultations</p>
      <p className="text-xs text-slate-400 mt-1">Book your first consultation</p>
    </div>
  ) : (
              <div className="divide-y divide-slate-100">
                {upcomingConsultations.map((consult) => (
                  <div key={consult.id} className="p-4 flex items-center justify-between hover:bg-slate-50 transition">
                    <div className="flex items-center gap-3">
                      <img src={consult.doctorImage} alt={consult.doctorName} className="w-12 h-12 rounded-full object-cover" />
                      <div>
                        <p className="font-semibold text-slate-800">{consult.doctorName}</p>
                        <p className="text-xs text-slate-500">{consult.doctorSpecialty}</p>
                        <div className="flex items-center gap-2 mt-1">
                          <span className="text-xs text-slate-400 flex items-center gap-1">
                            <Calendar className="w-3 h-3" /> {consult.date}
                          </span>
                          <span className="text-xs text-slate-400 flex items-center gap-1">
                            <Clock className="w-3 h-3" /> {consult.time}
                          </span>
                        </div>
                      </div>
                    </div>
                    <div className="flex gap-2">
                      <button 
                        onClick={() => handleStartCall(allDoctors.find(d => d.id === consult.doctorId) || allDoctors[0])}
                        className="px-3 py-1.5 rounded-lg bg-[#00A99D] text-white text-xs font-medium hover:bg-[#009488] transition flex items-center gap-1"
                      >
                        <Video className="w-3 h-3" /> Start Call
                      </button>
                      <button 
                        onClick={() => handleCancelClick(consult)}
                        className="px-3 py-1.5 rounded-lg border border-red-200 text-red-500 text-xs font-medium hover:bg-red-50 transition flex items-center gap-1"
                      >
                        <Trash2 className="w-3 h-3" /> Cancel
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            )}
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