"use client";

import { useState } from "react";

import Link from "next/link";

import { usePathname } from "next/navigation";

import {
  LayoutDashboard,
  Users,
  Shield,
  Boxes,
  FileBarChart2,
  Calendar,
  ChevronLeft,
  ChevronRight,
  ChevronDown,
  Zap,
  Layers,
  Briefcase,
  Cog,
  UserCircle,
  HeartPulse,
  Stethoscope,
  ClipboardPlus,
} from "lucide-react";

function SidebarGroup({
  group,
  collapsed,
  isOpen,
  onToggle,
}) {

  const pathname = usePathname();

  const hasActiveChild = group.items.some(
    (item) =>
      pathname.startsWith(item.path)
  );

  return (

    <div className="mb-2">

      {!collapsed ? (

        <button
          onClick={onToggle}
          className={`w-full flex items-center gap-3 px-3 py-2 rounded-xl text-xs font-semibold uppercase tracking-wider transition-all duration-300 ${
            hasActiveChild
              ? "text-white bg-[#00A99D]"
              : "text-slate-300 hover:text-white hover:bg-[#313947]"
          }`}
        >

          <group.icon className="w-4 h-4 shrink-0" />

          <span className="flex-1 text-left">
            {group.label}
          </span>

          <ChevronDown
            className={`w-4 h-4 transition-transform duration-300 ${
              isOpen ? "rotate-180" : ""
            }`}
          />

        </button>

      ) : (

        <div className="flex justify-center py-2">

          <div
            className={`w-6 h-1 rounded-full ${
              hasActiveChild
                ? "bg-[#00A99D]"
                : "bg-slate-600"
            }`}
          />

        </div>

      )}

      {(isOpen || collapsed) && (

        <div className="overflow-hidden">

          <div
            className={`space-y-1 ${
              !collapsed
                ? "mt-2 ml-3 pl-3 border-l border-slate-700"
                : "mt-2"
            }`}
          >

            {group.items.map((item) => {

              const isActive =
                pathname === item.path;

              return (

                <Link
                  key={item.path}
                  href={item.path}
                  className={`group relative flex items-center gap-3 px-3 py-2 rounded-xl text-sm font-medium transition-all duration-300 ${
                    collapsed
                      ? "justify-center"
                      : ""
                  } ${
                    isActive
                      ? "bg-[#00A99D] text-white shadow-lg"
                      : "text-slate-200 hover:bg-[#313947] hover:text-white"
                  }`}
                >

                  <item.icon className="w-[18px] h-[18px] shrink-0" />

                  {!collapsed && (
                    <span>{item.label}</span>
                  )}

                </Link>

              );

            })}

          </div>

        </div>

      )}

    </div>

  );

}

export default function Sidebar({
  collapsed,
  setCollapsed,
}) {

  const pathname = usePathname();

  const navGroups = [

    {
      label: "Overview",
      icon: Layers,

      items: [
        {
          label: "Dashboard",
          icon: LayoutDashboard,
          path: "/dashboard",
        },
      ],
    },

    {
      label: "Hospital",
      icon: Briefcase,

      items: [

        {
          label: "Doctors",
          icon: Stethoscope,
          path: "/dashboard/doctors",
        },

        {
          label: "Patients",
          icon: Users,
          path: "/dashboard/patients",
        },

        {
          label: "Appointments",
          icon: Calendar,
          path: "/dashboard/appointments",
        },

      ],
    },

    {
      label: "Medical",
      icon: HeartPulse,

      items: [

        {
          label: "Reports",
          icon: FileBarChart2,
          path: "/dashboard/reports",
        },

        {
          label: "Medications",
          icon: ClipboardPlus,
          path: "/dashboard/medications",
        },

        {
          label: "Emergency",
          icon: Zap,
          path: "/dashboard/emergency",
        },

      ],
    },

    {
      label: "Account",
      icon: UserCircle,

      items: [

        {
          label: "Profile",
          icon: UserCircle,
          path: "/dashboard/profile",
        },

        {
          label: "Settings",
          icon: Cog,
          path: "/dashboard/settings",
        },

      ],
    },

  ];

  const [openGroups, setOpenGroups] =
    useState(() => {

      const initial = {};

      navGroups.forEach((group) => {

        initial[group.label] =
          group.items.some((item) =>
            pathname.startsWith(item.path)
          );

      });

      return initial;

    });

  const toggleGroup = (label) => {

    setOpenGroups((prev) => ({
      ...prev,
      [label]: !prev[label],
    }));

  };

  return (

    <aside
      className={`sticky top-0 h-screen flex flex-col bg-[#252b36] border-r border-[#343c46] transition-all duration-300 ${
        collapsed
          ? "w-[72px]"
          : "w-[280px]"
      }`}
    >

      <div className="h-16 flex items-center px-5 border-b border-[#343c46] gap-3">

        <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-[#00A99D] to-[#013A63] flex items-center justify-center shrink-0 shadow-lg">

          <HeartPulse className="w-5 h-5 text-white" />

        </div>

        {!collapsed && (

          <span className="font-bold text-[20px] text-white tracking-tight">

            eAshaop

          </span>

        )}

      </div>

      <nav className="flex-1 py-4 px-3 overflow-y-auto overflow-x-hidden">

        {navGroups.map((group) => (

          <SidebarGroup
            key={group.label}
            group={group}
            collapsed={collapsed}
            isOpen={openGroups[group.label]}
            onToggle={() =>
              toggleGroup(group.label)
            }
          />

        ))}

      </nav>

      <div className="py-2 border-t border-[#343c46] flex justify-center">

        <button
          onClick={() =>
            setCollapsed(!collapsed)
          }
          className="w-8 h-8 flex items-center justify-center rounded-lg text-slate-400 hover:bg-[#313947] hover:text-white transition-all duration-300"
        >

          {collapsed ? (
            <ChevronRight className="w-4 h-4" />
          ) : (
            <ChevronLeft className="w-4 h-4" />
          )}

        </button>

      </div>

    </aside>

  );

}