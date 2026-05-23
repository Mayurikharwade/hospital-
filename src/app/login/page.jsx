"use client";

import { useState } from "react";

import { useRouter } from "next/navigation";

import {
  Eye,
  EyeOff,
  User,
  Stethoscope,
} from "lucide-react";

export default function LoginPage() {

  const router = useRouter();

  const [role, setRole] =
    useState("user");

  const [phone, setPhone] =
    useState("");

  const [password, setPassword] =
    useState("");

  const [showPassword, setShowPassword] =
    useState(false);

  const [phoneError, setPhoneError] =
    useState("");

  const [passwordError, setPasswordError] =
    useState("");

  const handleLogin = (e) => {

    e.preventDefault();

    const phoneRegex =
      /^[0-9]{10}$/;

    let valid = true;

    if (!phoneRegex.test(phone)) {

      setPhoneError(
        "Please enter valid phone number"
      );

      valid = false;

    } else {

      setPhoneError("");

    }

    if (password.length < 4) {

      setPasswordError(
        "Password is incorrect"
      );

      valid = false;

    } else {

      setPasswordError("");

    }

    if (valid) {

      if (role === "user") {

        router.push(
          "/user/dashboard"
        );

      } else {

        router.push(
          "/doctor/dashboard"
        );

      }

    }

  };

  return (

    <div className="min-h-screen bg-[#f8fafc] flex items-center justify-center px-4 py-10">

      <div className="w-full max-w-6xl bg-white rounded-[32px] shadow-xl overflow-hidden grid grid-cols-1 lg:grid-cols-2">

        <div className="hidden lg:flex items-center justify-center bg-gradient-to-br from-[#013A63] to-[#00A99D] p-10 relative overflow-hidden">

          <div className="absolute w-[300px] h-[300px] bg-white/10 rounded-full top-[-80px] left-[-80px]" />

          <div className="absolute w-[250px] h-[250px] bg-white/10 rounded-full bottom-[-80px] right-[-80px]" />

          <div className="relative z-10 text-center text-white">

            <div className="w-28 h-28 rounded-3xl bg-white/20 backdrop-blur-lg flex items-center justify-center mx-auto mb-8 shadow-2xl">

              <Stethoscope className="w-14 h-14" />

            </div>

            <h1 className="text-5xl font-bold mb-4">

              eAshaop

            </h1>

            <p className="text-lg text-white/90 leading-8 max-w-md">

              Your trusted healthcare
              platform for patients
              and doctors.

            </p>

          </div>

        </div>

        <div className="flex items-center justify-center p-6 sm:p-10 lg:p-14">

          <div className="w-full max-w-md">

            <h2 className="text-4xl font-bold text-[#013A63] mb-2">

              Login

            </h2>

            <p className="text-slate-500 mb-8">

              Login to your account

            </p>

            <div className="flex items-center gap-4 mb-8">

              <button
                onClick={() =>
                  setRole("user")
                }
                className={`flex-1 h-12 rounded-2xl border text-sm font-semibold transition ${
                  role === "user"
                    ? "bg-[#00A99D] text-white border-[#00A99D]"
                    : "border-slate-200 text-slate-600 hover:border-[#00A99D]"
                }`}
              >

                <div className="flex items-center justify-center gap-2">

                  <User className="w-4 h-4" />

                  User

                </div>

              </button>

              <button
                onClick={() =>
                  setRole("doctor")
                }
                className={`flex-1 h-12 rounded-2xl border text-sm font-semibold transition ${
                  role === "doctor"
                    ? "bg-[#013A63] text-white border-[#013A63]"
                    : "border-slate-200 text-slate-600 hover:border-[#013A63]"
                }`}
              >

                <div className="flex items-center justify-center gap-2">

                  <Stethoscope className="w-4 h-4" />

                  Doctor

                </div>

              </button>

            </div>

            <form
              onSubmit={handleLogin}
              className="space-y-5"
            >

              <div>

                <label className="block text-sm font-medium text-slate-700 mb-2">

                  Phone Number

                </label>

                <div className="flex items-center h-14 rounded-2xl border border-slate-200 overflow-hidden focus-within:border-[#00A99D] transition">

                  <div className="px-4 text-slate-500 border-r border-slate-200">

                    +91

                  </div>

                  <input
                    type="text"
                    placeholder="Enter phone number"
                    value={phone}
                    onChange={(e) =>
                      setPhone(
                        e.target.value
                      )
                    }
                    className="flex-1 h-full px-4 outline-none text-sm"
                  />

                </div>

                {phoneError && (

                  <p className="text-red-500 text-sm mt-1">

                    {phoneError}

                  </p>

                )}

              </div>

              <div>

                <label className="block text-sm font-medium text-slate-700 mb-2">

                  Password

                </label>

                <div className="flex items-center h-14 rounded-2xl border border-slate-200 overflow-hidden focus-within:border-[#00A99D] transition">

                  <input
                    type={
                      showPassword
                        ? "text"
                        : "password"
                    }
                    placeholder="Enter password"
                    value={password}
                    onChange={(e) =>
                      setPassword(
                        e.target.value
                      )
                    }
                    className="flex-1 h-full px-4 outline-none text-sm"
                  />

                  <button
                    type="button"
                    onClick={() =>
                      setShowPassword(
                        !showPassword
                      )
                    }
                    className="px-4 text-slate-500"
                  >

                    {showPassword ? (
                      <EyeOff className="w-5 h-5" />
                    ) : (
                      <Eye className="w-5 h-5" />
                    )}

                  </button>

                </div>

                {passwordError && (

                  <p className="text-red-500 text-sm mt-1">

                    {passwordError}

                  </p>

                )}

              </div>

              <div className="flex items-center justify-between text-sm">

                <label className="flex items-center gap-2 text-slate-600">

                  <input type="checkbox" />

                  Remember me

                </label>

                <button
                  type="button"
                  className="text-[#00A99D] hover:underline"
                >

                  Forgot Password?

                </button>

              </div>

              <button
                type="submit"
                className={`w-full h-14 rounded-2xl text-white font-semibold text-sm transition shadow-lg ${
                  role === "user"
                    ? "bg-[#00A99D] hover:bg-[#009488]"
                    : "bg-[#013A63] hover:bg-[#012b49]"
                }`}
              >

                Login as{" "}

                {role === "user"
                  ? "User"
                  : "Doctor"}

              </button>

            </form>

            <p className="text-sm text-slate-500 text-center mt-8">

              Don’t have an account?{" "}

              <span className="text-[#00A99D] font-medium cursor-pointer">

                Sign Up

              </span>

            </p>

          </div>

        </div>

      </div>

    </div>

  );

}