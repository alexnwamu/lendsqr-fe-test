// components/DashboardLayout.tsx
"use client"; // Ensure this is a client component

import React from "react";
import { SearchProvider } from "@/components/SearchContext";
import Navbar from "@/components/Navbar";
import Sidebar from "@/components/Sidebar";
export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <SearchProvider>
      {" "}
      {/* Wrap with SearchProvider */}
      <div className="font-work-sans">
        <div className="z-50 w-full fixed">
          <Navbar />
        </div>
        <div className="flex relative">
          <div className="fixed z-40 bg-white h-[150vh] overflow-y-auto left-0 top-[100px]">
            <Sidebar />
          </div>
          <div className="mt-[100px] md:pl-[283px] z-0 relative w-full">
            {children}
          </div>
        </div>
      </div>
    </SearchProvider>
  );
}