"use client";

import { useState } from "react";

import Sidebar from "@/components/user/Sidebar";
import Header from "@/components/user/Header";

export default function DashboardLayout({
  children,
}) {

  const [sidebarOpen, setSidebarOpen] =
    useState(true);

  return (

    <div className="flex min-h-screen">

      <div
        style={{
          width: sidebarOpen
            ? "280px"
            : "84px",
          transition: "width 0.3s ease",
        }}
      >

        <Sidebar
          collapsed={!sidebarOpen}
          setCollapsed={() =>
            setSidebarOpen(!sidebarOpen)
          }
        />

      </div>

      <div className="flex-1 flex flex-col">

        <Header
          onToggleSidebar={() =>
            setSidebarOpen((prev) => !prev)
          }
        />

        <main className="flex-1">

          {children}

        </main>

      </div>

    </div>

  );

}