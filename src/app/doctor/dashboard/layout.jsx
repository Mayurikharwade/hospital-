"use client";

import { useState } from "react";
import DoctorSidebar from "@/components/doctor/Sidebar";
import DoctorHeader from "@/components/doctor/Header";

export default function DoctorDashboardLayout({ children }) {
  const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(false);

  return (
    <div className="flex min-h-screen bg-slate-50">
      <DoctorSidebar
        collapsed={isSidebarCollapsed}
        setCollapsed={setIsSidebarCollapsed}
      />
      <div className="flex-1 flex flex-col min-w-0">
        <DoctorHeader
          isSidebarCollapsed={isSidebarCollapsed}
          setIsSidebarCollapsed={setIsSidebarCollapsed}
        />
        <main className="flex-1 pt-[58px] p-4 md:p-6 overflow-auto">
          {children}
        </main>
      </div>
    </div>
  );
}