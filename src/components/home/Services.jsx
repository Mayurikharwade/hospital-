import {
  Stethoscope,
  Calendar,
  FileText,
  Ambulance,
} from "lucide-react";

const services = [
  {
    title: "Expert Doctors",
    icon: Stethoscope,
  },

  {
    title: "Easy Appointments",
    icon: Calendar,
  },

  {
    title: "Medical Reports",
    icon: FileText,
  },

  {
    title: "Emergency Care",
    icon: Ambulance,
  },
];

export default function Services() {
  return (
    <section className="py-20 bg-white">

      <div className="max-w-7xl mx-auto px-6">

        <div className="text-center mb-14">

          <h2 className="text-4xl font-bold text-[#013A63] mb-4">
            Our Services
          </h2>

          <p className="text-slate-600">
            Everything you need for better healthcare.
          </p>

        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">

          {services.map((service, index) => {

            const Icon = service.icon;

            return (

              <div
                key={index}
                className="bg-[#f8fafc] rounded-3xl p-8 border border-slate-200 hover:shadow-xl transition"
              >

                <div className="w-16 h-16 rounded-2xl bg-[#00A99D]/10 flex items-center justify-center mb-6">

                  <Icon className="w-8 h-8 text-[#00A99D]" />

                </div>

                <h3 className="text-xl font-semibold text-[#013A63] mb-3">

                  {service.title}

                </h3>

                <p className="text-slate-600 text-sm leading-7">

                  Professional healthcare services with trusted medical experts.

                </p>

              </div>

            );

          })}

        </div>

      </div>

    </section>
  );
}