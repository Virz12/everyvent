"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Menu } from "lucide-react"
import Sidebar from "@/components/dashboard/sidebar"
import { SessionProvider } from "next-auth/react"

interface DashboardLayoutProps {
  children: React.ReactNode
}

export default function DashboardLayout({ children }: DashboardLayoutProps) {
  const [sidebarOpen, setSidebarOpen] = useState(false)

  return (
    <div className="min-h-screen bg-slate-900 flex">
      <Sidebar isSidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />

      {/* Main content */}
      <div className="flex-1 flex flex-col lg:ml-0">
        {/* Mobile header */}
        <div className="lg:hidden bg-slate-800 border-b border-slate-700 px-4 py-3">
          <div className="flex items-center justify-between">
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setSidebarOpen(true)}
              className="text-slate-300 hover:text-white hover:bg-slate-700! cursor-pointer"
            >
              <Menu className="h-5 w-5" />
            </Button>
            <h1 className="text-white font-semibold">Dashboard</h1>
            <div className="w-10" /> {/* Spacer */}
          </div>
        </div>

        {/* Page content */}
        <main className="flex-1 lg:ml-[255px]">
          <SessionProvider>
            {children}
          </SessionProvider>
        </main>
      </div>
    </div>
  )
}