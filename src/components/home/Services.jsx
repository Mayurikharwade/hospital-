"use client";

import {
  Stethoscope,
  Calendar,
  FileText,
  Ambulance,
  Shield,
  Microscope,
  Clock,
  UserCircle,
} from "lucide-react";

const services = [
  { title: "Expert Doctors", description: "Certified specialists with years of experience", icon: Stethoscope },
  { title: "Easy Appointments", description: "Quick and hassle-free booking system", icon: Calendar },
  { title: "Medical Reports", description: "Digital access to all health records", icon: FileText },
  { title: "Emergency Care", description: "24/7 urgent medical assistance", icon: Ambulance },
  { title: "Health Insurance", description: "Cashless treatment facility", icon: Shield },
  { title: "Lab Tests", description: "Home sample collection available", icon: Microscope },
  { title: "Follow-up Care", description: "Regular health check-ups", icon: Clock },
  { title: "Telemedicine", description: "Consult doctors from home", icon: UserCircle },
];

export default function Services() {
  return (
    <section className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center mb-14">
          <span className="text-[#00A99D] font-semibold text-sm uppercase tracking-wide">Our Services</span>
          <h2 className="text-4xl font-bold text-[#013A63] mt-2 mb-4">
            Comprehensive Healthcare
          </h2>
          <p className="text-slate-600 max-w-2xl mx-auto">
            We provide complete medical care with modern facilities and experienced professionals.
          </p>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {services.map((service, index) => {
            const Icon = service.icon;
            return (
              <div
                key={index}
                className="group bg-[#f8fafc] rounded-2xl p-6 border border-slate-200 hover:shadow-xl transition-all hover:-translate-y-1 cursor-pointer"
              >
                <div className="w-14 h-14 rounded-xl bg-[#00A99D]/10 flex items-center justify-center mb-5 group-hover:bg-[#00A99D] transition-colors">
                  <Icon className="w-7 h-7 text-[#00A99D] group-hover:text-white transition-colors" />
                </div>
                <h3 className="text-xl font-semibold text-[#013A63] mb-2">
                  {service.title}
                </h3>
                <p className="text-slate-500 text-sm leading-relaxed">
                  {service.description}
                </p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}