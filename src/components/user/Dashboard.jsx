"use client";

import { useState } from "react";

import { motion } from "framer-motion";

import {
  FolderKanban,
  Shield,
  Users,
  Briefcase,
  Truck,
  Archive,
  ChevronDown,
} from "lucide-react";

import { useRouter } from "next/navigation";

const statsConfig = [
  {
    title: "Doctors",
    key: "projectsData",
    icon: FolderKanban,
    gradient: "bg-blue-50",
    iconColor: "text-blue-600",
    delay: 0,
    path: "/user/dashboard/doctors",
  },

  {
    title: "Patients",
    key: "accountsData",
    icon: Shield,
    gradient: "bg-violet-50",
    iconColor: "text-violet-600",
    delay: 0.1,
    path: "/user/dashboard/patients",
  },

  {
    title: "Staff",
    key: "usersData",
    icon: Users,
    gradient: "bg-green-50",
    iconColor: "text-green-600",
    delay: 0.2,
    path: "/user/dashboard/staff",
  },

  {
    title: "Appointments",
    key: "labourData",
    icon: Briefcase,
    gradient: "bg-amber-50",
    iconColor: "text-amber-600",
    delay: 0.3,
    path: "/user/dashboard/appointments",
  },

  {
    title: "Emergency",
    key: "vendorsData",
    icon: Truck,
    gradient: "bg-red-50",
    iconColor: "text-red-600",
    delay: 0.4,
    path: "/user/dashboard/emergency",
  },

  {
    title: "Reports",
    key: "stockData",
    icon: Archive,
    gradient: "bg-cyan-50",
    iconColor: "text-cyan-600",
    delay: 0.5,
    path: "/user/dashboard/reports",
  },
];

const getStoredArray = (key) => {

  if (typeof window === "undefined")
    return [];

  try {

    const saved =
      localStorage.getItem(key);

    return saved
      ? JSON.parse(saved)
      : [];

  } catch {

    return [];

  }

};

export default function Dashboard() {

  const router = useRouter();

  const [projects] = useState(() =>
    getStoredArray("projectsData")
  );

  const [selectedProject, setSelectedProject] =
    useState(() => {

      const projectsList =
        getStoredArray(
          "projectsData"
        );

      return projectsList.length > 0
        ? projectsList[0].name
        : "General Hospital";

    });

  const [counts] = useState({
    projectsData: 120,
    accountsData: 860,
    usersData: 45,
    labourData: 210,
    vendorsData: 12,
    stockData: 36,
  });

  return (

    <div className="space-y-6 p-6 bg-[#f8fafc] min-h-screen">

      <div className="flex flex-col lg:flex-row lg:items-start lg:justify-between gap-4">

        <div>

          <h1 className="text-3xl font-bold text-[#013A63]">

            Hospital Dashboard

          </h1>

          <p className="text-sm md:text-[15px] leading-6 text-slate-500 mt-1">

            Track your hospital
            activities and analytics.

          </p>

        </div>

        <div className="relative min-w-[240px]">

          <select
            value={selectedProject}
            onChange={(e) =>
              setSelectedProject(
                e.target.value
              )
            }
            className="w-full h-11 px-4 pr-10 rounded-xl bg-white border border-slate-200 text-sm focus:outline-none focus:ring-2 focus:ring-[#00A99D]/30 transition appearance-none"
          >

            {projects.length > 0 ? (

              projects.map((project) => (

                <option
                  key={project.id}
                  value={project.name}
                >

                  {project.name}

                </option>

              ))

            ) : (

              <option value="">
                General Hospital
              </option>

            )}

          </select>

          <ChevronDown className="pointer-events-none absolute right-4 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />

        </div>

      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 gap-4">

        {statsConfig.map((stat) => {

          const Icon = stat.icon;

          return (

            <motion.div
              key={stat.title}
              initial={{
                opacity: 0,
                y: 20,
              }}
              animate={{
                opacity: 1,
                y: 0,
              }}
              transition={{
                delay: stat.delay,
              }}
              whileHover={{
                y: -4,
                scale: 1.01,
              }}
              whileTap={{
                scale: 0.98,
              }}
              onClick={() =>
                router.push(stat.path)
              }
              className={`rounded-2xl border border-slate-200 p-5 ${stat.gradient} cursor-pointer transition shadow-sm hover:shadow-lg`}
            >

              <div className="flex items-center justify-between mb-5">

                <div className="w-11 h-11 rounded-xl bg-white flex items-center justify-center shadow-sm">

                  <Icon
                    className={`w-5 h-5 ${stat.iconColor}`}
                  />

                </div>

              </div>

              <div className="space-y-1">

                <p className="text-3xl font-bold text-slate-800">

                  {counts[stat.key]}

                </p>

                <p className="text-sm text-slate-500">

                  {stat.title}

                </p>

              </div>

            </motion.div>

          );

        })}

      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">

        <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-sm">

          <h3 className="font-semibold text-slate-800 mb-1">

            Daily Overview

          </h3>

          <div className="border-t border-slate-200 pt-5 space-y-3">

            <p>Total Admissions: 34</p>

            <p>Emergency Cases: 7</p>

            <p>Appointments Today: 56</p>

          </div>

        </div>

        <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-sm">

          <h3 className="font-semibold text-slate-800 mb-4">

            Monthly Progress

          </h3>

          <div className="border-t border-slate-200 pt-5">

            <div className="text-6xl font-light text-slate-800 mb-2">

              82%

            </div>

            <p>overall hospital efficiency</p>

            <div className="w-full h-2 rounded-full bg-slate-200 overflow-hidden mt-4">

              <div className="h-full w-[82%] bg-[#00A99D] rounded-full" />

            </div>

          </div>

        </div>

      </div>

    </div>

  );

}