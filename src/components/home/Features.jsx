export default function Features() {
  return (
    <section className="py-20 bg-white">

      <div className="max-w-7xl mx-auto px-6">

        <div className="grid lg:grid-cols-2 gap-12 items-center">

          <div className="bg-gradient-to-br from-[#013A63] to-[#00A99D] rounded-[40px] h-[450px]" />

          <div>

            <h2 className="text-4xl font-bold text-[#013A63] mb-6">
              Why Choose Us?
            </h2>

            <div className="space-y-6">

              <div className="bg-[#f8fafc] border border-slate-200 rounded-2xl p-6">

                <h3 className="font-semibold text-xl mb-2">
                  Trusted Doctors
                </h3>

                <p className="text-slate-600">
                  Experienced and certified specialists.
                </p>

              </div>

              <div className="bg-[#f8fafc] border border-slate-200 rounded-2xl p-6">

                <h3 className="font-semibold text-xl mb-2">
                  Easy Appointments
                </h3>

                <p className="text-slate-600">
                  Quick and hassle-free appointment booking.
                </p>

              </div>

              <div className="bg-[#f8fafc] border border-slate-200 rounded-2xl p-6">

                <h3 className="font-semibold text-xl mb-2">
                  24/7 Support
                </h3>

                <p className="text-slate-600">
                  Round-the-clock medical assistance.
                </p>

              </div>

            </div>

          </div>

        </div>

      </div>

    </section>
  );
}