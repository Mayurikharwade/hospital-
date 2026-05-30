"use client";

import { useState } from "react";
import { ChevronDown, HelpCircle } from "lucide-react";

const faqs = [
  { q: "Which is the best hospital in Hyderabad?", a: "eAshaop Hospitals is recognized as one of the best multispecialty hospitals in Hyderabad." },
  { q: "Is eAshaop Hospitals the best multispecialty hospital?", a: "Yes, we are a leading multispecialty hospital with 20+ departments." },
  { q: "What services does eAshaop Hospitals provide?", a: "We provide cardiology, neurology, orthopedics, oncology, emergency care, and more." },
  { q: "How to book an appointment?", a: "You can book online through our website or call our helpline." },
  { q: "Do you accept insurance?", a: "Yes, we accept all major insurance providers. Contact our support for more details." },
  { q: "Is online consultation available?", a: "Yes, we offer video consultations with our expert doctors from the comfort of your home." },
];

export default function FAQS() {
  const [open, setOpen] = useState(null);

  return (
    <div className="py-8">
      <div className="text-center mb-6">
        <div className="inline-flex items-center gap-2 bg-[#00A99D]/10 px-3 py-1 rounded-full mb-2">
          <HelpCircle className="w-3 h-3 text-[#00A99D]" />
          <span className="text-[#00A99D] text-[10px] font-semibold">FAQ</span>
        </div>
        <h3 className="text-xl font-bold text-[#013A63]">Frequently Asked Questions</h3>
        <p className="text-slate-500 text-sm max-w-2xl mx-auto">Find answers to common questions about our services</p>
      </div>
      
      <div className="space-y-3">
        {faqs.map((faq, idx) => (
          <div key={idx} className="bg-white rounded-lg border border-slate-100 overflow-hidden">
            <button
              className="w-full flex items-center justify-between p-4 text-left hover:bg-slate-50 transition"
              onClick={() => setOpen(open === idx ? null : idx)}
            >
              <span className="font-medium text-slate-700 text-sm">{faq.q}</span>
              <ChevronDown className={`w-4 h-4 text-slate-400 transition-transform ${open === idx ? 'rotate-180' : ''}`} />
            </button>
            {open === idx && (
              <div className="p-4 pt-0 text-sm text-slate-500 border-t border-slate-100">
                {faq.a}
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}