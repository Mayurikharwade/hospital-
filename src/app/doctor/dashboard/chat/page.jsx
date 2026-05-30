"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { 
  MessageCircle, 
  Send, 
  User, 
  ChevronLeft, 
  Clock, 
  CheckCircle, 
  Search,
  Phone,
  Mic,
  MicOff,
  VideoOff,
  X,
  PhoneOff
} from "lucide-react";

const patientsList = [
  {
    id: 1,
    name: "Ramesh Sharma",
    age: 45,
    condition: "Hypertension",
    lastVisit: "20 May 2026",
    lastMessage: "Thank you doctor! Feeling better now",
    time: "10:30 AM",
    unread: 2,
    status: "Online",
    image: "https://randomuser.me/api/portraits/men/1.jpg",
    phone: "+91 98765 43210",
    email: "ramesh@example.com",
    medicalHistory: "BP medication since 2020"
  },
  {
    id: 2,
    name: "Priya Patel",
    age: 32,
    condition: "Fever",
    lastVisit: "18 May 2026",
    lastMessage: "When is my next appointment?",
    time: "Yesterday",
    unread: 0,
    status: "Offline",
    image: "https://randomuser.me/api/portraits/women/2.jpg",
    phone: "+91 98765 43211",
    email: "priya@example.com",
    medicalHistory: "No major issues"
  },
  {
    id: 3,
    name: "Suresh Kumar",
    age: 58,
    condition: "Diabetes",
    lastVisit: "15 May 2026",
    lastMessage: "Prescription received",
    time: "Yesterday",
    unread: 0,
    status: "Online",
    image: "https://randomuser.me/api/portraits/men/3.jpg",
    phone: "+91 98765 43212",
    email: "suresh@example.com",
    medicalHistory: "Type 2 diabetes since 2018"
  },
  {
    id: 4,
    name: "Anjali Mehta",
    age: 28,
    condition: "Pregnancy",
    lastVisit: "10 May 2026",
    lastMessage: "Feeling better now",
    time: "2 days ago",
    unread: 0,
    status: "Offline",
    image: "https://randomuser.me/api/portraits/women/4.jpg",
    phone: "+91 98765 43213",
    email: "anjali@example.com",
    medicalHistory: "Regular checkups"
  },
  {
    id: 5,
    name: "Vikram Singh",
    age: 62,
    condition: "Heart Disease",
    lastVisit: "5 May 2026",
    lastMessage: "When should I come for follow-up?",
    time: "3 days ago",
    unread: 1,
    status: "Online",
    image: "https://randomuser.me/api/portraits/men/5.jpg",
    phone: "+91 98765 43214",
    email: "vikram@example.com",
    medicalHistory: "Stent placed in 2023"
  },
  {
    id: 6,
    name: "Kavita Nair",
    age: 35,
    condition: "Gynecology",
    lastVisit: "8 May 2026",
    lastMessage: "Need prescription refill",
    time: "2 days ago",
    unread: 0,
    status: "Offline",
    image: "https://randomuser.me/api/portraits/women/6.jpg",
    phone: "+91 98765 43215",
    email: "kavita@example.com",
    medicalHistory: "Regular checkups"
  },
];

export default function DoctorChatPage() {
  const [selectedPatient, setSelectedPatient] = useState(null);
  const [messages, setMessages] = useState({});
  const [inputMessage, setInputMessage] = useState("");
  const [searchTerm, setSearchTerm] = useState("");
  const [showPatientInfo, setShowPatientInfo] = useState(false);
  const [showToast, setShowToast] = useState(false);
  const [toastMessage, setToastMessage] = useState("");
  const [isCallActive, setIsCallActive] = useState(false);
  const [isMuted, setIsMuted] = useState(false);
  const [isVideoOff, setIsVideoOff] = useState(false);

  const initialMessages = {
    1: [
      { text: "Hello doctor, I'm feeling better today.", isDoctor: false, time: "10:00 AM", status: "read" },
      { text: "That's great to hear! Any symptoms?", isDoctor: true, time: "10:05 AM", status: "read" },
      { text: "Just mild headache sometimes.", isDoctor: false, time: "10:08 AM", status: "read" },
      { text: "Take the prescribed medication regularly. It will help.", isDoctor: true, time: "10:12 AM", status: "read" },
      { text: "Thank you doctor!", isDoctor: false, time: "10:15 AM", status: "delivered" },
    ],
    2: [
      { text: "Doctor, when should I come for follow-up?", isDoctor: false, time: "Yesterday 9:00 AM", status: "read" },
      { text: "Please come next week. I'll check your reports.", isDoctor: true, time: "Yesterday 9:30 AM", status: "read" },
    ],
    3: [
      { text: "Doctor, I received the prescription. Thank you!", isDoctor: false, time: "Yesterday 1:00 PM", status: "read" },
      { text: "You're welcome! Follow the dosage instructions.", isDoctor: true, time: "Yesterday 1:30 PM", status: "read" },
    ],
    4: [
      { text: "I'm feeling much better now doctor.", isDoctor: false, time: "2 days ago", status: "read" },
      { text: "Great! Continue the medication for 3 more days.", isDoctor: true, time: "2 days ago", status: "read" },
    ],
    5: [
      { text: "Doctor, when should I come for follow-up?", isDoctor: false, time: "3 days ago", status: "read" },
      { text: "Please book an appointment for next week.", isDoctor: true, time: "3 days ago", status: "read" },
    ],
    6: [
      { text: "Need prescription refill doctor.", isDoctor: false, time: "2 days ago", status: "read" },
      { text: "Sure, I'll send it to your registered email.", isDoctor: true, time: "2 days ago", status: "read" },
    ],
  };

  useEffect(() => {
    const savedMessages = localStorage.getItem("doctor_chat_messages");
    if (savedMessages) {
      setMessages(JSON.parse(savedMessages));
    } else {
      setMessages(initialMessages);
    }
  }, []);

  useEffect(() => {
    if (Object.keys(messages).length > 0) {
      localStorage.setItem("doctor_chat_messages", JSON.stringify(messages));
    }
  }, [messages]);

  const showNotification = (msg) => {
    setToastMessage(msg);
    setShowToast(true);
    setTimeout(() => setShowToast(false), 3000);
  };

  const handleStartChat = (patient) => {
    setSelectedPatient(patient);
    setShowPatientInfo(false);
  };

  const handleSendMessage = () => {
    if (!inputMessage.trim() || !selectedPatient) return;

    const newMessage = {
      text: inputMessage,
      isDoctor: true,
      time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      status: "sent"
    };

    setMessages(prev => ({
      ...prev,
      [selectedPatient.id]: [...(prev[selectedPatient.id] || []), newMessage]
    }));
    setInputMessage("");

    setTimeout(() => {
      setMessages(prev => {
        const updated = [...prev[selectedPatient.id]];
        updated[updated.length - 1].status = "delivered";
        return { ...prev, [selectedPatient.id]: updated };
      });
    }, 500);

    setTimeout(() => {
      setMessages(prev => {
        const updated = [...prev[selectedPatient.id]];
        updated[updated.length - 1].status = "read";
        return { ...prev, [selectedPatient.id]: updated };
      });
    }, 1500);
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  const handleStartCall = () => {
    setIsCallActive(true);
    showNotification(`📞 Calling ${selectedPatient?.name}...`);
  };

  const handleEndCall = () => {
    setIsCallActive(false);
    setIsMuted(false);
    setIsVideoOff(false);
    showNotification(`Call ended with ${selectedPatient?.name}`);
  };

  const filteredPatients = patientsList.filter(patient =>
    patient.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    patient.condition.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const currentMessages = selectedPatient ? (messages[selectedPatient.id] || []) : [];
  const selectedPatientData = patientsList.find(p => p.id === selectedPatient?.id);

  // Audio Call Interface (using Phone icon, not Video)
  if (isCallActive && selectedPatientData) {
    return (
      <div className="fixed inset-0 bg-slate-900 z-50 flex items-center justify-center">
        <div className="relative w-full max-w-4xl bg-slate-800 rounded-2xl overflow-hidden shadow-2xl">
          <div className="relative h-96 bg-gradient-to-br from-[#013A63] to-[#00A99D] flex items-center justify-center">
            <div className="text-center text-white">
              <img src={selectedPatientData.image} alt={selectedPatientData.name} className="w-24 h-24 rounded-full mx-auto mb-4 border-4 border-white" />
              <h2 className="text-2xl font-bold">{selectedPatientData.name}</h2>
              <p className="text-white/80">{selectedPatientData.condition}</p>
              <p className="text-green-400 text-sm mt-2">Connected</p>
            </div>
          </div>

          <div className="p-4 bg-slate-800 flex items-center justify-center gap-4">
            <button onClick={() => setIsMuted(!isMuted)} className="w-12 h-12 rounded-full bg-slate-700 text-white hover:bg-slate-600 transition flex items-center justify-center">
              {isMuted ? <MicOff className="w-5 h-5" /> : <Mic className="w-5 h-5" />}
            </button>
            <button onClick={handleEndCall} className="w-12 h-12 rounded-full bg-red-500 text-white hover:bg-red-600 transition flex items-center justify-center">
              <PhoneOff className="w-5 h-5" />
            </button>
          </div>
          <div className="p-3 text-center text-slate-400 text-xs">Audio call in progress... Quality: HD</div>
        </div>
      </div>
    );
  }

  // Chat Screen
  if (selectedPatient) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-teal-50/30">
        
        {showToast && (
          <div className="fixed top-20 right-6 z-50 bg-emerald-500 text-white px-4 py-2 rounded-xl shadow-lg text-sm flex items-center gap-2">
            <CheckCircle className="w-4 h-4" /> {toastMessage}
          </div>
        )}

        <div className="flex flex-col h-screen">
          <div className="bg-white border-b border-slate-200 px-4 py-3 flex items-center gap-3 shadow-sm sticky top-0 z-10">
            <button onClick={() => setSelectedPatient(null)} className="text-slate-500 hover:text-slate-700 p-2 rounded-lg hover:bg-slate-100">
              <ChevronLeft className="w-5 h-5" />
            </button>
            <div className="relative cursor-pointer" onClick={() => setShowPatientInfo(!showPatientInfo)}>
              <img src={selectedPatientData.image} alt={selectedPatientData.name} className="w-10 h-10 rounded-full object-cover" />
              <div className={`absolute bottom-0 right-0 w-2.5 h-2.5 rounded-full ${selectedPatientData.status === "Online" ? "bg-green-500" : "bg-gray-400"} ring-2 ring-white`}></div>
            </div>
            <div className="flex-1 cursor-pointer" onClick={() => setShowPatientInfo(!showPatientInfo)}>
              <h3 className="font-semibold text-slate-800 text-sm">{selectedPatientData.name}</h3>
              <p className="text-xs text-slate-500">{selectedPatientData.age} yrs • {selectedPatientData.condition}</p>
            </div>
            <button onClick={handleStartCall} className="p-2 rounded-lg bg-[#00A99D] text-white hover:bg-[#009488] transition flex items-center gap-1">
              <Phone className="w-4 h-4" />
              <span className="text-xs hidden sm:inline">Call</span>
            </button>
            <button onClick={() => setShowPatientInfo(!showPatientInfo)} className="p-2 rounded-lg hover:bg-slate-100 transition">
              <User className="w-4 h-4 text-slate-500" />
            </button>
          </div>

          {showPatientInfo && (
            <div className="fixed inset-y-0 right-0 w-80 bg-white shadow-xl z-20 border-l border-slate-200">
              <div className="p-4 border-b border-slate-100 flex items-center justify-between bg-gradient-to-r from-slate-50 to-white">
                <h3 className="font-semibold text-[#013A63]">Patient Details</h3>
                <button onClick={() => setShowPatientInfo(false)} className="p-1 rounded-lg hover:bg-slate-100">
                  <X className="w-4 h-4 text-slate-500" />
                </button>
              </div>
              <div className="p-5 text-center border-b border-slate-100">
                <img src={selectedPatientData.image} alt={selectedPatientData.name} className="w-20 h-20 rounded-full mx-auto mb-3 object-cover" />
                <h4 className="font-bold text-slate-800">{selectedPatientData.name}</h4>
                <p className="text-sm text-[#00A99D]">{selectedPatientData.condition}</p>
              </div>
              <div className="p-4 space-y-3">
                <div className="flex items-center gap-3">
                  <User className="w-4 h-4 text-slate-400" />
                  <div>
                    <p className="text-xs text-slate-400">Age</p>
                    <p className="text-sm text-slate-700">{selectedPatientData.age} years</p>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <Phone className="w-4 h-4 text-slate-400" />
                  <div>
                    <p className="text-xs text-slate-400">Phone</p>
                    <p className="text-sm text-slate-700">{selectedPatientData.phone}</p>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <Clock className="w-4 h-4 text-slate-400" />
                  <div>
                    <p className="text-xs text-slate-400">Last Visit</p>
                    <p className="text-sm text-slate-700">{selectedPatientData.lastVisit}</p>
                  </div>
                </div>
              </div>
            </div>
          )}

          <div className="flex-1 overflow-y-auto p-4 space-y-3 bg-slate-50/50">
            {currentMessages.map((msg, idx) => (
              <div key={idx} className={`flex ${msg.isDoctor ? "justify-end" : "justify-start"}`}>
                <div className={`max-w-[75%] p-3 rounded-2xl ${msg.isDoctor ? "bg-[#00A99D] text-white rounded-br-sm" : "bg-white border border-slate-200 text-slate-700 rounded-bl-sm"}`}>
                  <p className="text-sm">{msg.text}</p>
                  <div className={`flex items-center gap-1 mt-1 text-[10px] ${msg.isDoctor ? "text-white/70" : "text-slate-400"}`}>
                    <span>{msg.time}</span>
                    {msg.isDoctor && msg.status === "read" && <CheckCircle className="w-3 h-3" />}
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div className="bg-white border-t border-slate-200 p-3">
            <div className="flex gap-2">
              <input 
                type="text" 
                value={inputMessage} 
                onChange={(e) => setInputMessage(e.target.value)} 
                onKeyPress={handleKeyPress} 
                placeholder="Type your medical advice..." 
                className="flex-1 px-4 py-2 rounded-full border border-slate-200 focus:outline-none focus:border-[#00A99D] text-sm" 
              />
              <button onClick={handleSendMessage} className="w-10 h-10 rounded-full bg-[#00A99D] text-white flex items-center justify-center hover:bg-[#009488] transition">
                <Send className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-teal-50/30">
      <div className="relative z-10 px-6 py-4">
        
        {/* Header - No profile icon */}
        <div className="mb-6">
          <div className="flex items-center gap-2">
            <MessageCircle className="w-5 h-5 text-[#00A99D]" />
            <h1 className="text-xl font-bold bg-gradient-to-r from-[#013A63] to-[#00A99D] bg-clip-text text-transparent">
              Patient Chats
            </h1>
          </div>
          <p className="text-slate-500 text-sm ml-7">Connect with your patients</p>
        </div>

        {/* Search Bar */}
        <div className="mb-5">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
            <input 
              type="text" 
              placeholder="Search patients by name or condition..." 
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-9 pr-3 py-2 rounded-lg border border-slate-200 text-sm focus:border-[#00A99D] focus:outline-none bg-white" 
            />
          </div>
        </div>

        {/* Patients Grid - 3 cards per row */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {filteredPatients.length === 0 ? (
            <div className="col-span-3 text-center py-10">
              <User className="w-12 h-12 text-slate-300 mx-auto mb-2" />
              <p className="text-slate-500">No patients found</p>
            </div>
          ) : (
            filteredPatients.map((patient) => (
              <div
                key={patient.id}
                className="bg-white rounded-xl shadow-sm hover:shadow-md transition-all border border-slate-100 overflow-hidden cursor-pointer"
                onClick={() => handleStartChat(patient)}
              >
                <div className="p-4">
                  <div className="flex items-center gap-3">
                    <div className="relative">
                      <img src={patient.image} alt={patient.name} className="w-12 h-12 rounded-full object-cover" />
                      <div className={`absolute bottom-0 right-0 w-2.5 h-2.5 rounded-full ${patient.status === "Online" ? "bg-green-500" : "bg-gray-400"} ring-2 ring-white`}></div>
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center justify-between">
                        <h3 className="font-semibold text-slate-800 text-sm">{patient.name}</h3>
                        <span className="text-[10px] text-slate-400">{patient.time}</span>
                      </div>
                      <p className="text-xs text-slate-500">{patient.age} yrs • {patient.condition}</p>
                    </div>
                    {patient.unread > 0 && (
                      <div className="w-5 h-5 rounded-full bg-[#00A99D] text-white text-[10px] flex items-center justify-center">
                        {patient.unread}
                      </div>
                    )}
                  </div>
                  <p className="text-xs text-slate-400 truncate mt-2">{patient.lastMessage}</p>
                </div>
                <div className="px-4 pb-4">
                  <button className="w-full py-2 rounded-lg bg-[#00A99D]/10 text-[#00A99D] text-sm font-medium hover:bg-[#00A99D] hover:text-white transition flex items-center justify-center gap-2">
                    <MessageCircle className="w-4 h-4" /> Start Chat
                  </button>
                </div>
              </div>
            ))
          )}
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