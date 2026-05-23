export default function Footer() {
  return (
    <footer className="bg-[#013A63] text-white py-14">

      <div className="max-w-7xl mx-auto px-6 grid md:grid-cols-3 gap-10">

        <div>

          <h2 className="text-3xl font-bold mb-4">
            eAshaop
          </h2>

          <p className="text-white/80 leading-7">
            Smart healthcare platform for
            patients and doctors.
          </p>

        </div>

        <div>

          <h3 className="text-xl font-semibold mb-4">
            Quick Links
          </h3>

          <div className="space-y-3 text-white/80">

            <p>Home</p>
            <p>Doctors</p>
            <p>Services</p>
            <p>Contact</p>

          </div>

        </div>

        <div>

          <h3 className="text-xl font-semibold mb-4">
            Contact
          </h3>

          <div className="space-y-3 text-white/80">

            <p>Hyderabad, India</p>
            <p>support@eashaop.com</p>
            <p>+91 9876543210</p>

          </div>

        </div>

      </div>

      <div className="border-t border-white/10 mt-12 pt-6 text-center text-sm text-white/70">

        © 2026 eAshaop. All rights reserved.

      </div>

    </footer>
  );
}