"use client";

import { useState } from "react";
import Sidebar from "@/components/user/Sidebar";
import Header from "@/components/user/Header";

export default function DashboardLayout({ children }) {
  // Sidebar ki state ko control karne ke liye
  const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(false);

  return (
    <div className="flex min-h-screen bg-slate-50">
      
      {/* 1. Extra div wrapper hata diya. Sidebar ab khud apni 200px/45px width handle karega */}
      <Sidebar
        collapsed={isSidebarCollapsed}
        setCollapsed={setIsSidebarCollapsed}
      />

      <div className="flex-1 flex flex-col min-w-0">
        
        {/* 2. Header ko wahi props bheje hain jo usme define kiye gaye hain */}
        <Header
          isSidebarCollapsed={isSidebarCollapsed}
          setIsSidebarCollapsed={setIsSidebarCollapsed}
        />

        {/* 3. pt-[58px] add kiya hai taaki content fixed Header ke theek neeche se shuru ho */}
        <main className="flex-1 pt-[58px] p-4 md:p-6 overflow-auto">
          {children}
        </main>

      </div>
    </div>
  );
}