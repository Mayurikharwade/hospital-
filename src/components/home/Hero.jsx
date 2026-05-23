import { HeartPulse } from "lucide-react";

export default function Hero() {
  return (
    <section className="bg-[#f8fafc] py-20">

      <div className="max-w-7xl mx-auto px-6 grid lg:grid-cols-2 gap-12 items-center">

        <div>

          <div className="inline-flex items-center gap-2 bg-[#00A99D]/10 text-[#00A99D] px-4 py-2 rounded-full text-sm font-medium mb-6">
            <HeartPulse className="w-4 h-4" />
            Trusted Healthcare Platform
          </div>

          <h1 className="text-5xl lg:text-6xl font-bold leading-tight text-[#013A63] mb-6">
            Your Health,
            <br />
            Our Priority
          </h1>

          <p className="text-slate-600 text-lg leading-8 mb-8 max-w-xl">
            Connect with experienced doctors,
            book appointments, access reports,
            and manage your healthcare easily.
          </p>

          <div className="flex flex-wrap gap-4">

            <button className="h-14 px-8 rounded-2xl bg-[#00A99D] text-white font-semibold hover:bg-[#009488] transition">
              Book Appointment
            </button>

            <button className="h-14 px-8 rounded-2xl border border-slate-300 text-slate-700 font-semibold hover:bg-slate-100 transition">
              Explore Doctors
            </button>

          </div>

        </div>

        <div className="relative">

          <div className="bg-gradient-to-br from-[#013A63] to-[#00A99D] rounded-[40px] h-[500px] flex items-center justify-center text-white text-3xl font-bold shadow-2xl">
            Healthcare Image
          </div>

        </div>

      </div>

    </section>
  );
}