import { Calendar, LayoutDashboard, LogOut, Users, X } from "lucide-react"
import { Button } from "../ui/button"
import Link from "next/link"
import { usePathname } from "next/navigation"
import Image from "next/image"

interface sidebarProps {
  isSidebarOpen: boolean
  setSidebarOpen: React.Dispatch<React.SetStateAction<boolean>>
}

// navigation List
const navigation = [
  { name: "Overview", href: "/dashboard", icon: LayoutDashboard },
  { name: "My Events", href: "/dashboard/events", icon: Calendar },
  { name: "Attendees", href: "/dashboard/attendees", icon: Users },
]

export default function Sidebar({ isSidebarOpen, setSidebarOpen }: sidebarProps) {
  const pathname = usePathname()

  return <>
    {/* Mobile sidebar overlay */}
    {isSidebarOpen && (
      <div className="fixed inset-0 z-40 lg:hidden bg-black/50" onClick={() => setSidebarOpen(false)} />
    )}

    {/* Sidebar */}
    <div
      className={`
        fixed inset-y-0 left-0 z-50 w-64 bg-slate-800 border-r border-slate-700 transform transition-transform duration-300 ease-in-out lg:translate-x-0 lg:inset-0
        ${isSidebarOpen ? "translate-x-0" : "-translate-x-full"}
      `}
    >
      <div className="flex flex-col h-full">
        {/* Logo */}
        <div className="flex items-center justify-between h-15 px-6 border-b border-slate-700 shrink-0">
          <Link href="/" className="flex items-center space-x-2">
            <Image src={"/logo.avif"} width={128} height={64} alt="Everyvent logo" />
          </Link>
          <Button
            variant="ghost"
            size="icon"
            onClick={() => setSidebarOpen(false)}
            className="lg:hidden text-slate-400 hover:text-white hover:bg-slate-700! cursor-pointer"
          >
            <X className="h-5 w-5" />
          </Button>
        </div>

        {/* User Info */}
        <div className="px-6 py-4 border-b border-slate-700 shrink-0">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 bg-orange-500 rounded-full flex items-center justify-center">
              <span className="text-white font-semibold text-sm">JD</span>
            </div>
            <div>
              <p className="text-white font-medium">John Doe</p>
              <p className="text-slate-400 text-sm">Organizer</p>
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

        {/* Sign Out */}
        <div className="px-4 py-4 border-t border-slate-700 shrink-0">
          <Button variant="ghost" className="w-full text-slate-300 hover:text-white hover:bg-slate-700! cursor-pointer">
            <LogOut className="h-4 w-4 mr-2" />
            Sign Out
          </Button>
        </div>
      </div>
    </div>
  </>
}