"use client";

import { useState, useEffect, useRef } from "react";
import { MessageCircle, X, Send, Bot, Sparkles } from "lucide-react";

export default function ChatBot() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([
    { text: "Hi there! 👋 I'm eAsha AI. How can I assist you with your healthcare needs today?", isBot: true }
  ]);
  const [input, setInput] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  
  // Auto-scroll logic
  const messagesEndRef = useRef(null);
  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, isTyping]);

  const getBotResponse = (userMessage) => {
    const lowerMsg = userMessage.toLowerCase();
    if (lowerMsg.includes("appointment") || lowerMsg.includes("book")) return "You can book an appointment by clicking on 'Book Appointment' on any doctor's card.";
    if (lowerMsg.includes("doctor")) return "We have 180+ experienced doctors across various specialties. Which specialty are you looking for?";
    if (lowerMsg.includes("emergency")) return "🚨 For emergencies, please call our 24/7 helpline: +91 98765 43210.";
    return "Thank you for reaching out! Please visit our 'Services' page or call +91 98765 43210 for immediate assistance.";
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
    }, 1200);
  };

  return (
    <>
      {/* Floating Chat Button - Premium Pulse Effect */}
      <div className="fixed bottom-6 right-6 z-[9999] flex items-center justify-center">
        {!isOpen && (
          <div className="absolute w-16 h-16 bg-[#00A99D] rounded-full animate-ping opacity-30"></div>
        )}
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="relative w-16 h-16 bg-gradient-to-tr from-[#013A63] to-[#00A99D] rounded-full flex items-center justify-center shadow-2xl hover:shadow-cyan-500/30 transition-all hover:scale-105 active:scale-95"
        >
          {isOpen ? (
            <X className="w-7 h-7 text-white" />
          ) : (
            <MessageCircle className="w-8 h-8 text-white" />
          )}
        </button>
      </div>

      {/* Modern Chat Window - Premium Look */}
      {isOpen && (
        <div className="fixed bottom-24 right-6 z-[9999] w-[360px] h-[550px] bg-white rounded-2xl shadow-2xl border border-slate-100 overflow-hidden flex flex-col animate-in slide-in-from-bottom-5 duration-300 sm:right-6 right-4 sm:w-[360px] w-[calc(100vw-32px)]">
          
          {/* Header */}
          <div className="bg-gradient-to-r from-[#013A63] to-[#00A99D] px-6 py-5 text-white flex justify-between items-center shadow-md">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-white/20 backdrop-blur-md rounded-full flex items-center justify-center border border-white/30 shadow-sm">
                <Bot className="w-6 h-6 text-white" />
              </div>
              <div>
                <h3 className="font-bold text-base leading-tight">eAsha AI</h3>
                <div className="flex items-center gap-1.5 mt-0.5">
                  <span className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></span>
                  <p className="text-xs text-white/80 font-medium">Online • AI Assistant</p>
                </div>
              </div>
            </div>
            <button onClick={() => setIsOpen(false)} className="p-2 hover:bg-white/20 rounded-full transition-colors">
              <X className="w-5 h-5 text-white/90" />
            </button>
          </div>

          {/* Messages Area */}
          <div className="flex-1 overflow-y-auto p-5 space-y-4 bg-slate-50/80 custom-scrollbar">
            {messages.map((msg, idx) => (
              <div key={idx} className={`flex ${msg.isBot ? "justify-start" : "justify-end"}`}>
                {msg.isBot && (
                  <div className="w-8 h-8 rounded-full bg-gradient-to-br from-[#013A63] to-[#00A99D] flex-shrink-0 flex items-center justify-center shadow-sm mr-2 mt-auto mb-1">
                    <Bot className="w-4 h-4 text-white" />
                  </div>
                )}
                <div 
                  className={`max-w-[85%] p-4 shadow-sm text-sm leading-relaxed ${
                    msg.isBot 
                      ? "bg-white border border-slate-100 text-slate-700 rounded-2xl rounded-bl-sm" 
                      : "bg-[#00A99D] text-white rounded-2xl rounded-br-sm"
                  }`}
                >
                  <p>{msg.text}</p>
                </div>
              </div>
            ))}
            {isTyping && (
              <div className="flex justify-start">
                <div className="w-8 h-8 rounded-full bg-gradient-to-br from-[#013A63] to-[#00A99D] flex-shrink-0 flex items-center justify-center shadow-sm mr-2 mt-auto mb-1">
                  <Bot className="w-4 h-4 text-white" />
                </div>
                <div className="bg-white border border-slate-100 p-4 rounded-2xl rounded-bl-sm shadow-sm flex items-center h-[42px]">
                  <div className="flex gap-1.5">
                    <span className="w-1.5 h-1.5 bg-[#00A99D]/60 rounded-full animate-bounce" style={{ animationDelay: "0ms" }}></span>
                    <span className="w-1.5 h-1.5 bg-[#00A99D]/60 rounded-full animate-bounce" style={{ animationDelay: "150ms" }}></span>
                    <span className="w-1.5 h-1.5 bg-[#00A99D]/60 rounded-full animate-bounce" style={{ animationDelay: "300ms" }}></span>
                  </div>
                </div>
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>

          {/* Input Area */}
          <div className="p-4 border-t border-slate-100 bg-white relative z-10">
            <div className="relative flex items-center">
              <input
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyPress={(e) => e.key === "Enter" && sendMessage()}
                placeholder="Ask me anything..."
                className="w-full bg-slate-100 border border-slate-200 text-slate-700 placeholder-slate-400 rounded-full pl-5 pr-14 py-4 focus:outline-none focus:border-[#00A99D] focus:ring-2 focus:ring-[#00A99D]/20 transition-all text-sm"
              />
              <button
                onClick={sendMessage}
                disabled={!input.trim()}
                className="absolute right-1.5 w-11 h-11 bg-[#00A99D] disabled:bg-slate-300 rounded-full flex items-center justify-center hover:bg-[#008f85] transition-colors shadow-sm"
              >
                <Send className="w-4 h-4 text-white ml-0.5" />
              </button>
            </div>
            <p className="text-[10px] text-slate-400 mt-2.5 text-center flex justify-center items-center gap-1">
              <Sparkles className="w-3 h-3 text-[#00A99D]" /> Powered by eAshaop AI
            </p>
          </div>
        </div>
      )}

      {/* Hide scrollbar */}
      <style jsx>{`
        .custom-scrollbar::-webkit-scrollbar { width: 4px; }
        .custom-scrollbar::-webkit-scrollbar-thumb { background: #cbd5e1; border-radius: 4px; }
      `}</style>
    </>
  );
}