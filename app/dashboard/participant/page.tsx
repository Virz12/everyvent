'use client'

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Calendar, Search, Clock, Star } from "lucide-react"
import Link from "next/link"
import EventCard from "@/components/dashboard/participant/event-card"
import { useSession } from "next-auth/react"

// Mock registered events
const registeredEvents = [
  {
    id: 1,
    title: "Strategy Workshop",
    category: "team-building",
    date: "2024-12-15",
    time: "2:00 PM",
    duration: "2-4 hours",
    location: "San Francisco, CA",
    organizer: "TechCorp Events",
    status: "confirmed",
    image: "https://placehold.co/300x200",
    description: "Interactive strategy planning session for teams",
  },
  {
    id: 2,
    title: "Professional Networking Mixer",
    category: "networking",
    date: "2024-12-22",
    time: "7:00 PM",
    duration: "2-3 hours",
    location: "Seattle, WA",
    organizer: "Seattle Business Network",
    status: "confirmed",
    image: "https://placehold.co/300x200",
    description: "Connect with industry professionals in a relaxed setting",
  },
  {
    id: 3,
    title: "Innovation Workshop Series",
    category: "team-building",
    date: "2025-01-10",
    time: "1:00 PM",
    duration: "3-4 hours",
    location: "Boston, MA",
    organizer: "Innovation Labs",
    status: "pending",
    image: "https://placehold.co/300x200",
    description: "Foster innovation and creativity in your team",
  },
]

export default function ParticipantDashboard() {
  const { data: session } = useSession()
  const currentUser = session?.user

  return (
    <div className="min-h-screen bg-slate-900">
      {/* Header */}
      <header className="bg-slate-800 py-8 px-4 lg:px-6 border-b border-slate-700">
        <div className="container mx-auto">
          <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-4">
            <div>
              <h1 className="text-3xl lg:text-4xl font-bold text-white mb-2">Welcome back, {currentUser?.name}</h1>
              <p className="text-slate-300 capitalize">{session?.user?.role?.toLowerCase()} • Dashboard</p>
            </div>
            <Link href="/events">
              <Button className="bg-orange-500 hover:bg-orange-600 text-white cursor-pointer">
                <Search className="h-4 w-4 mr-2" />
                Browse All Events
              </Button>
            </Link>
          </div>
        </div>
      </header>

      <div className="py-8 px-4 lg:px-6">
        <div className="container mx-auto space-y-8">
          {/* Stats Cards */}
          <div className="grid md:grid-cols-3 gap-6">
            <Card className="bg-slate-800 border-slate-700">
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-slate-400 text-sm">Registered Events</p>
                    <p className="text-2xl font-bold text-white">{registeredEvents.length}</p>
                  </div>
                  <Calendar className="h-8 w-8 text-orange-500" />
                </div>
              </CardContent>
            </Card>

            <Card className="bg-slate-800 border-slate-700">
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-slate-400 text-sm">Upcoming Events</p>
                    <p className="text-2xl font-bold text-white">
                      {registeredEvents.filter((e) => new Date(e.date) > new Date()).length}
                    </p>
                  </div>
                  <Clock className="h-8 w-8 text-blue-500" />
                </div>
              </CardContent>
            </Card>

            <Card className="bg-slate-800 border-slate-700">
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-slate-400 text-sm">Events Attended</p>
                    <p className="text-2xl font-bold text-white">12</p>
                  </div>
                  <Star className="h-8 w-8 text-yellow-500" />
                </div>
              </CardContent>
            </Card>
          </div>

          {/* My Registered Events */}
          <Card className="bg-slate-800 border-slate-700 pb-6">
            <CardHeader>
              <div className="flex justify-between items-center pt-6">
                <CardTitle className="space-y-1.5">
                  <h3 className="text-2xl tracking-tight text-white">My Registered Events</h3>
                </CardTitle>
                <Link href='/events'>
                  <Button variant="outline" className="border-slate-600 text-slate-300 hover:bg-slate-700 bg-transparent cursor-pointer">
                    View All
                  </Button>
                </Link>
              </div>
            </CardHeader>
            <CardContent>
              <div className="grid md:grid-cols-2 xl:grid-cols-3 gap-6">
                {registeredEvents.map((event) => (
                  <EventCard key={event.id} event={event} />
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}