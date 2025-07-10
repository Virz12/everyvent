"use client"

import type React from "react"

import { useState } from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Calendar, Heart, User, LogOut, Menu, X, Search } from "lucide-react"

const navigation = [
  { name: "Dashboard", href: "/participant", icon: Calendar },
  { name: "Browse Events", href: "/events", icon: Search },
  { name: "My Events", href: "/participant/events", icon: Heart },
  { name: "Profile", href: "/participant/profile", icon: User },
]

interface ParticipantLayoutProps {
  children: React.ReactNode
}

export function ParticipantLayout({ children }: ParticipantLayoutProps) {
  const [sidebarOpen, setSidebarOpen] = useState(false)
  const pathname = usePathname()

  return (
    <div className="min-h-screen bg-slate-900 flex">
      {/* Mobile sidebar overlay */}
      {sidebarOpen && (
        <div className="fixed inset-0 z-40 lg:hidden bg-black bg-opacity-50" onClick={() => setSidebarOpen(false)} />
      )}

      {/* Sidebar */}
      <div
        className={`
        fixed inset-y-0 left-0 z-50 w-64 bg-slate-800 border-r border-slate-700 transform transition-transform duration-300 ease-in-out lg:translate-x-0 lg:static lg:inset-0
        ${sidebarOpen ? "translate-x-0" : "-translate-x-full"}
      `}
      >
        <div className="flex flex-col h-full">
          {/* Logo */}
          <div className="flex items-center justify-between h-16 px-6 border-b border-slate-700 shrink-0">
            <Link href="/" className="flex items-center space-x-2">
              <div className="h-8 w-8 bg-orange-500 rounded-lg flex items-center justify-center">
                <span className="text-white font-bold text-sm">E</span>
              </div>
              <span className="text-white font-semibold text-xl">EventHub</span>
            </Link>
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setSidebarOpen(false)}
              className="lg:hidden text-slate-400 hover:text-white"
            >
              <X className="h-5 w-5" />
            </Button>
          </div>

          {/* User Info */}
          <div className="px-6 py-4 border-b border-slate-700 shrink-0">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-orange-500 rounded-full flex items-center justify-center">
                <span className="text-white font-semibold text-sm">JS</span>
              </div>
              <div>
                <p className="text-white font-medium">Jane Smith</p>
                <p className="text-slate-400 text-sm">Participant</p>
              </div>
            </div>
          </div>

          {/* Navigation */}
          <nav className="flex-1 px-4 py-6 space-y-2 overflow-y-auto">
            {navigation.map((item) => {
              const isActive = pathname === item.href
              return (
                <Link
                  key={item.name}
                  href={item.href}
                  className={`
                    flex items-center space-x-3 px-3 py-2 rounded-lg text-sm font-medium transition-colors
                    ${isActive ? "bg-orange-500 text-white" : "text-slate-300 hover:text-white hover:bg-slate-700"}
                  `}
                >
                  <item.icon className="h-5 w-5" />
                  <span>{item.name}</span>
                </Link>
              )
            })}
          </nav>

          {/* Sign Out - Fixed at bottom */}
          <div className="px-4 py-4 border-t border-slate-700 shrink-0">
            <Button variant="ghost" className="w-full text-slate-300 hover:text-white hover:bg-slate-700">
              <LogOut className="h-4 w-4 mr-2" />
              Sign Out
            </Button>
          </div>
        </div>
      </div>

      {/* Main content */}
      <div className="flex-1 flex flex-col lg:ml-0">
        {/* Mobile header */}
        <div className="lg:hidden bg-slate-800 border-b border-slate-700 px-4 py-3">
          <div className="flex items-center justify-between">
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setSidebarOpen(true)}
              className="text-slate-300 hover:text-white"
            >
              <Menu className="h-5 w-5" />
            </Button>
            <h1 className="text-white font-semibold">Dashboard</h1>
            <div className="w-10" /> {/* Spacer */}
          </div>
        </div>

        {/* Page content */}
        <main className="flex-1">{children}</main>
      </div>
    </div>
  )
}
