const doctors = [
  {
    name: "Dr. Shruthika",
    specialist: "Cardiologist",
  },

  {
    name: "Dr. Rajesh",
    specialist: "Dermatologist",
  },

  {
    name: "Dr. Priya",
    specialist: "Neurologist",
  },
];

export default function Doctors() {
  return (
    <section className="py-20 bg-[#f8fafc]">

      <div className="max-w-7xl mx-auto px-6">

        <div className="flex items-center justify-between mb-14">

          <div>

            <h2 className="text-4xl font-bold text-[#013A63] mb-3">
              Top Doctors
            </h2>

            <p className="text-slate-600">
              Consult with experienced specialists.
            </p>

          </div>

        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">

          {doctors.map((doctor, index) => (

            <div
              key={index}
              className="bg-white rounded-3xl p-6 border border-slate-200 shadow-sm hover:shadow-xl transition"
            >

              <div className="h-64 rounded-2xl bg-slate-200 mb-6" />

              <h3 className="text-2xl font-semibold text-[#013A63] mb-2">

                {doctor.name}

              </h3>

              <p className="text-[#00A99D] font-medium mb-5">

                {doctor.specialist}

              </p>

              <button className="w-full h-12 rounded-2xl bg-[#013A63] text-white font-semibold hover:bg-[#012b49] transition">

                Book Now

              </button>

            </div>

          ))}

        </div>

      </div>

    </section>
  );
}