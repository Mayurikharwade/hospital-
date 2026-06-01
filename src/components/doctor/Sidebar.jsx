"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { Menu, X } from "lucide-react";

import {
  LayoutDashboard,
  Calendar,
  ChevronLeft,
  ChevronRight,
  ChevronDown,
  Heart,
  FileText,
  Clock,
  Star,
  Settings,
  UserCircle,
  LogOut,
  Briefcase,
} from "lucide-react";

function SidebarGroup({ group, collapsed, isOpen, onToggle }) {
  const pathname = usePathname();

  const hasActiveChild = group.items.some((item) =>
    pathname.startsWith(item.path)
  );

  return (
    <div className="mb-1.5">
      {!collapsed ? (
        <button
          onClick={onToggle}
          className={`w-full flex items-center gap-2 px-2 py-2 rounded-md text-xs font-semibold uppercase tracking-wider transition-all duration-300 ${
            hasActiveChild
              ? "text-white bg-[#00A99D]"
              : "text-white/70 hover:text-white hover:bg-white/10"
          }`}
        >
          <group.icon className="w-4 h-4 shrink-0" />
          <span className="flex-1 text-left">{group.label}</span>
          <ChevronDown
            className={`w-3 h-3 transition-transform duration-300 ${
              isOpen ? "rotate-180" : ""
            }`}
          />
        </button>
      ) : (
        <div className="flex justify-center py-1">
          <div
            className={`w-0.5 h-6 rounded-full ${
              hasActiveChild ? "bg-[#00A99D]" : "bg-white/30"
            }`}
          />
        </div>
      )}

      {(isOpen || collapsed) && (
        <div className="overflow-hidden">
          <div
            className={`space-y-1 ${
              !collapsed
                ? "mt-1 ml-3 pl-2 border-l border-white/20"
                : "mt-1"
            }`}
          >
            {group.items.map((item) => {
              const isActive = pathname === item.path;
              return (
                <Link
                  key={item.path}
                  href={item.path}
                  className={`group relative flex items-center gap-2 px-2 py-2 rounded-md text-sm font-medium transition-all duration-300 ${
                    collapsed ? "justify-center" : ""
                  } ${
                    isActive
                      ? "bg-[#00A99D] text-white shadow-md"
                      : "text-white/70 hover:bg-[#00A99D] hover:text-white"
                  }`}
                >
                  <item.icon className="w-4 h-4 shrink-0" />
                  {!collapsed && <span>{item.label}</span>}
                  {collapsed && (
                    <div className="absolute left-full ml-2 px-2 py-1 bg-[#1e293b] text-white text-xs rounded shadow-lg opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap z-50 border border-white/10">
                      {item.label}
                    </div>
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

export default function DoctorSidebar({ collapsed, setCollapsed }) {
  const pathname = usePathname();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  // Close mobile menu when clicking outside or on resize
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 768) {
        setIsMobileMenuOpen(false);
      }
    };
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const navGroups = [
    {
      label: "MAIN",
      icon: LayoutDashboard,
      items: [
        {
          label: "Dashboard",
          icon: LayoutDashboard,
          path: "/doctor/dashboard",
        },
      ],
    },
    {
      label: "PRACTICE",
      icon: Briefcase,
      items: [
        {
          label: "Set Availability",
          icon: Clock,
          path: "/doctor/dashboard/availability",
        },
        {
          label: "Booking History",
          icon: Calendar,
          path: "/doctor/dashboard/booking-history",
        },
        {
          label: "Prescription",
          icon: FileText,
          path: "/doctor/dashboard/prescription",
        },
        {
          label: "Appointments",
          icon: Calendar,
          path: "/doctor/dashboard/appointments",
        },
        {
          label: "Reviews & Ratings",
          icon: Star,
          path: "/doctor/dashboard/reviews",
        },
      ],
    },
    {
      label: "ACCOUNT",
      icon: UserCircle,
      items: [
        {
          label: "Profile",
          icon: UserCircle,
          path: "/doctor/dashboard/profile",
        },
        {
          label: "Settings",
          icon: Settings,
          path: "/doctor/dashboard/settings",
        },
      ],
    },
  ];

  const [openGroups, setOpenGroups] = useState(() => {
    const initial = {};
    navGroups.forEach((group) => {
      initial[group.label] = group.items.some((item) =>
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

  const handleLogout = () => {
    window.location.href = "/login";
  };

  // Mobile menu toggle
  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  // Close menu when link is clicked
  const handleLinkClick = () => {
    setIsMobileMenuOpen(false);
  };

  return (
    <>
      {/* Mobile Menu Button - Floating */}
      <button
        onClick={toggleMobileMenu}
        className="md:hidden fixed bottom-6 right-6 z-50 w-12 h-12 rounded-full bg-[#00A99D] text-white shadow-lg flex items-center justify-center hover:bg-[#008b7a] transition-all duration-300"
      >
        {isMobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
      </button>

      {/* Overlay for mobile */}
      {isMobileMenuOpen && (
        <div
          className="md:hidden fixed inset-0 bg-black/50 z-40"
          onClick={() => setIsMobileMenuOpen(false)}
        />
      )}

      {/* Sidebar - Desktop & Mobile */}
      <aside
        className={`fixed md:sticky top-0 h-screen flex flex-col bg-[#1e293b] border-r border-white/10 transition-all duration-300 z-40
          ${collapsed ? "w-[45px]" : "w-[200px]"}
          md:translate-x-0
          ${isMobileMenuOpen ? "translate-x-0" : "-translate-x-full md:translate-x-0"}
        `}
      >
        {/* Logo Section */}
        <div className="h-14 flex items-center px-3 border-b border-white/10">
          <Link href="/doctor/dashboard" className="flex items-center gap-2" onClick={handleLinkClick}>
            <div className="w-8 h-8 rounded-lg bg-white flex items-center justify-center shrink-0 shadow-md overflow-hidden">
              <Image
                src="/eAshalogo.png"
                alt="eAshaop"
                width={24}
                height={24}
                className="object-contain"
                priority
              />
            </div>
            {!collapsed && (
              <div className="flex flex-col">
                <span className="font-bold text-sm text-white">
                  eAshaop
                </span>
                <span className="text-[8px] text-[#00A99D] -mt-0.5">Doctor Portal</span>
              </div>
            )}
          </Link>
        </div>

        {/* Navigation */}
        <nav className="flex-1 py-3 px-2 overflow-y-auto overflow-x-hidden sidebar-scroll">
          {navGroups.map((group) => (
            <SidebarGroup
              key={group.label}
              group={group}
              collapsed={collapsed}
              isOpen={openGroups[group.label]}
              onToggle={() => toggleGroup(group.label)}
            />
          ))}
        </nav>

        {/* Logout Button */}
        <div className="py-2 border-t border-white/10">
          <button
            onClick={handleLogout}
            className={`w-full flex items-center gap-2 px-2 py-2 rounded-md text-sm font-medium transition-all duration-300 text-red-400 hover:bg-red-500/20 hover:text-red-300 ${
              collapsed ? "justify-center" : ""
            }`}
          >
            <LogOut className="w-4 h-4 shrink-0" />
            {!collapsed && <span>Logout</span>}
          </button>
        </div>

        {/* Expand/Collapse Button - Hidden on mobile */}
        <div className="py-2 border-t border-white/10 hidden md:flex justify-center">
          <button
            onClick={() => setCollapsed(!collapsed)}
            className="w-6 h-6 flex items-center justify-center rounded-md text-white/50 hover:bg-white/10 hover:text-white transition-all duration-300"
          >
            {collapsed ? (
              <ChevronRight className="w-3.5 h-3.5" />
            ) : (
              <ChevronLeft className="w-3.5 h-3.5" />
            )}
          </button>
        </div>

        <style jsx>{`
          .sidebar-scroll::-webkit-scrollbar {
            display: none;
          }
          .sidebar-scroll {
            -ms-overflow-style: none;
            scrollbar-width: none;
          }
        `}</style>
      </aside>
    </>
  );
}