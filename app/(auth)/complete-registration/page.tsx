"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader } from "@/components/ui/card"
import { Users, Calendar, Check } from "lucide-react"
import Image from "next/image"
import { useSession } from "next-auth/react"
import { useRouter } from "next/navigation"

export default function RoleSelectionForm() {
  const router = useRouter()
  const [selectedRole, setSelectedRole] = useState("")
  const [isLoading, setIsLoading] = useState(false)

  const { data: session, update } = useSession()
  const email = session?.user?.email

  const handleRoleSelection = async () => {
    if (!selectedRole) return

    console.log(email);

    setIsLoading(true)

    const res = await fetch("/api/complete-registration", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email, role: selectedRole }),
    })

    if (res.ok) {
      await update({
        role: selectedRole
      })
      router.push(`/dashboard/${selectedRole.toLowerCase()}`)
    }

    setIsLoading(false)
  }

  return (
    <div className="w-full max-w-lg">
      <Card className="bg-slate-800 border-slate-700 pb-6">
        <CardHeader className="space-y-4 mt-6">
          <div className="text-center space-y-2">
            <div className="flex justify-center">
              <div className="h-12 w-12 flex items-center justify-center">
                <Image src={"/icon.avif"} width={32} height={32} alt="Everyvent Icon" />
              </div>
            </div>
            <h1 className="text-2xl font-bold text-white">Welcome to Everyvent!</h1>
            <p className="text-slate-300">Choose how you'd like to use our platform</p>
          </div>
        </CardHeader>

        <CardContent className="space-y-6">
          <div className="space-y-4">
            <h3 className="text-lg font-medium text-white text-center">What brings you here?</h3>

            <div className="grid grid-cols-1 gap-4">
              {/* Participant Option */}
              <label
                className={`relative flex items-start space-x-4 p-6 border-2 rounded-xl cursor-pointer transition-all hover:border-orange-500 ${selectedRole === "PARTICIPANT"
                  ? "border-orange-500 bg-orange-500/10"
                  : "border-slate-600 bg-slate-700/50"
                  }`}
              >
                <input
                  type="radio"
                  name="role"
                  value="PARTICIPANT"
                  checked={selectedRole === "PARTICIPANT"}
                  onChange={(e) => setSelectedRole(e.target.value)}
                  className="sr-only"
                />

                <div className="flex-shrink-0">
                  <div
                    className={`w-12 h-12 rounded-lg flex items-center justify-center ${selectedRole === "PARTICIPANT" ? "bg-orange-500" : "bg-slate-600"
                      }`}
                  >
                    <Users className="h-6 w-6 text-white" />
                  </div>
                </div>

                <div className="flex-1">
                  <div className="flex items-center justify-between">
                    <h4 className="text-lg font-semibold text-white">Join Events</h4>
                    {selectedRole === "PARTICIPANT" && (
                      <div className="w-6 h-6 bg-orange-500 rounded-full flex items-center justify-center">
                        <Check className="h-4 w-4 text-white" />
                      </div>
                    )}
                  </div>
                  <p className="text-slate-300 mt-1">
                    Discover and attend amazing events in your community. Connect with like-minded people and explore
                    new experiences.
                  </p>
                  <div className="mt-3 flex flex-wrap gap-2">
                    <span className="px-2 py-1 bg-slate-600 text-slate-200 text-xs rounded">Browse Events</span>
                    <span className="px-2 py-1 bg-slate-600 text-slate-200 text-xs rounded">Join Communities</span>
                    <span className="px-2 py-1 bg-slate-600 text-slate-200 text-xs rounded">Network</span>
                  </div>
                </div>
              </label>

              {/* Organizer Option */}
              <label
                className={`relative flex items-start space-x-4 p-6 border-2 rounded-xl cursor-pointer transition-all hover:border-orange-500 ${selectedRole === "ORGANIZER"
                  ? "border-orange-500 bg-orange-500/10"
                  : "border-slate-600 bg-slate-700/50"
                  }`}
              >
                <input
                  type="radio"
                  name="role"
                  value="ORGANIZER"
                  checked={selectedRole === "ORGANIZER"}
                  onChange={(e) => setSelectedRole(e.target.value)}
                  className="sr-only"
                />

                <div className="flex-shrink-0">
                  <div
                    className={`w-12 h-12 rounded-lg flex items-center justify-center ${selectedRole === "ORGANIZER" ? "bg-orange-500" : "bg-slate-600"
                      }`}
                  >
                    <Calendar className="h-6 w-6 text-white" />
                  </div>
                </div>

                <div className="flex-1">
                  <div className="flex items-center justify-between">
                    <h4 className="text-lg font-semibold text-white">Organize Events</h4>
                    {selectedRole === "ORGANIZER" && (
                      <div className="w-6 h-6 bg-orange-500 rounded-full flex items-center justify-center">
                        <Check className="h-4 w-4 text-white" />
                      </div>
                    )}
                  </div>
                  <p className="text-slate-300 mt-1">
                    Create and manage events, build your community, and bring people together. Perfect for event
                    planners and community builders.
                  </p>
                  <div className="mt-3 flex flex-wrap gap-2">
                    <span className="px-2 py-1 bg-slate-600 text-slate-200 text-xs rounded">Create Events</span>
                    <span className="px-2 py-1 bg-slate-600 text-slate-200 text-xs rounded">Manage Attendees</span>
                    <span className="px-2 py-1 bg-slate-600 text-slate-200 text-xs rounded">Analytics</span>
                  </div>
                </div>
              </label>
            </div>
          </div>

          <Button
            onClick={handleRoleSelection}
            disabled={!selectedRole || isLoading}
            className="w-full bg-orange-500 hover:bg-orange-600 text-white h-12 text-lg font-medium cursor-pointer"
          >
            {isLoading ? "Setting up your account..." : "Continue"}
          </Button>
        </CardContent>
      </Card>
    </div>
  )
}
