"use client";

import { useState } from "react";
import { MessageCircle, X, Send } from "lucide-react";

export default function ChatBot() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([
    { text: "Hello! 👋 I'm eAshaop Health Assistant. How can I help you today?", isBot: true }
  ]);
  const [input, setInput] = useState("");
  const [isTyping, setIsTyping] = useState(false);

  const botResponses = {
    "appointment": "You can book an appointment by clicking on 'Book Appointment' button on any doctor's card. Would you like me to help you find a doctor?",
    "doctor": "We have 7+ experienced doctors across various specialties like Cardiology, Neurology, Dermatology, and more. Which specialty are you looking for?",
    "emergency": "For emergency, please call our 24/7 helpline: +91 98765 43210 or visit our nearest emergency care center.",
    "timing": "Our OPD timings are 9:00 AM to 8:00 PM, Monday to Saturday. Sunday emergency services only.",
    "location": "Our main hospital is located in Hyderabad. We also have associate clinics in Mumbai, Delhi, Chennai, and Bangalore.",
    "cost": "Consultation fee starts from ₹500. We also accept most health insurance cards.",
    "default": "Thank you for reaching out! Please visit our website or call +91 98765 43210 for immediate assistance. 🙏"
  };

  const getBotResponse = (userMessage) => {
    const lowerMsg = userMessage.toLowerCase();
    if (lowerMsg.includes("appointment") || lowerMsg.includes("book")) return botResponses.appointment;
    if (lowerMsg.includes("doctor") || lowerMsg.includes("specialist")) return botResponses.doctor;
    if (lowerMsg.includes("emergency") || lowerMsg.includes("urgent") || lowerMsg.includes("ambulance")) return botResponses.emergency;
    if (lowerMsg.includes("timing") || lowerMsg.includes("time") || lowerMsg.includes("hours")) return botResponses.timing;
    if (lowerMsg.includes("location") || lowerMsg.includes("address") || lowerMsg.includes("where")) return botResponses.location;
    if (lowerMsg.includes("cost") || lowerMsg.includes("fee") || lowerMsg.includes("price") || lowerMsg.includes("insurance")) return botResponses.cost;
    return botResponses.default;
  };

  const sendMessage = async () => {
    if (!input.trim()) return;

    const userMessage = input.trim();
    setMessages(prev => [...prev, { text: userMessage, isBot: false }]);
    setInput("");
    setIsTyping(true);

    setTimeout(() => {
      const botReply = getBotResponse(userMessage);
      setMessages(prev => [...prev, { text: botReply, isBot: true }]);
      setIsTyping(false);
    }, 800);
  };

  return (
    <>
      {/* Chat Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="fixed bottom-6 right-6 z-50 w-14 h-14 bg-[#25D366] rounded-full flex items-center justify-center shadow-lg hover:shadow-xl transition-all hover:scale-105"
      >
        {isOpen ? (
          <X className="w-6 h-6 text-white" />
        ) : (
          <MessageCircle className="w-7 h-7 text-white" />
        )}
      </button>

      {/* Chat Window */}
      {isOpen && (
        <div className="fixed bottom-24 right-6 z-50 w-96 bg-white rounded-2xl shadow-2xl border border-slate-200 overflow-hidden animate-in slide-in-from-bottom-5 duration-300">
          {/* Header */}
          <div className="bg-gradient-to-r from-[#00A99D] to-[#013A63] p-4 text-white">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-white/20 rounded-full flex items-center justify-center">
                <MessageCircle className="w-5 h-5" />
              </div>
              <div>
                <h3 className="font-semibold">eAshaop Health Assistant</h3>
                <p className="text-xs text-white/70">Online • Typically replies instantly</p>
              </div>
            </div>
          </div>

          {/* Messages */}
          <div className="h-96 overflow-y-auto p-4 space-y-3 bg-[#f8fafc]">
            {messages.map((msg, idx) => (
              <div key={idx} className={`flex ${msg.isBot ? "justify-start" : "justify-end"}`}>
                <div className={`max-w-[80%] p-3 rounded-2xl ${msg.isBot ? "bg-white border border-slate-200 text-slate-700" : "bg-[#00A99D] text-white"}`}>
                  <p className="text-sm">{msg.text}</p>
                </div>
              </div>
            ))}
            {isTyping && (
              <div className="flex justify-start">
                <div className="bg-white border border-slate-200 p-3 rounded-2xl">
                  <div className="flex gap-1">
                    <span className="w-2 h-2 bg-slate-400 rounded-full animate-bounce" style={{ animationDelay: "0ms" }}></span>
                    <span className="w-2 h-2 bg-slate-400 rounded-full animate-bounce" style={{ animationDelay: "150ms" }}></span>
                    <span className="w-2 h-2 bg-slate-400 rounded-full animate-bounce" style={{ animationDelay: "300ms" }}></span>
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* Input */}
          <div className="p-3 border-t border-slate-200 bg-white">
            <div className="flex gap-2">
              <input
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyPress={(e) => e.key === "Enter" && sendMessage()}
                placeholder="Type your message..."
                className="flex-1 px-4 py-2 rounded-xl border border-slate-200 focus:outline-none focus:border-[#00A99D] text-sm"
              />
              <button
                onClick={sendMessage}
                className="w-10 h-10 bg-[#00A99D] rounded-xl flex items-center justify-center hover:bg-[#009488] transition"
              >
                <Send className="w-4 h-4 text-white" />
              </button>
            </div>
            <p className="text-xs text-slate-400 mt-2 text-center">
              Ask about doctors, appointments, emergencies & more
            </p>
          </div>
        </div>
      )}
    </>
  );
}