'use client'

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Calendar, Search, Clock, Star } from "lucide-react"
import Link from "next/link"
import EventCard from "@/components/dashboard/participant/event-card"
import { useSession } from "next-auth/react"
import { useEffect, useState } from "react"
import { EventType } from "@/lib/types"
import { getRegisteredEvents } from "@/lib/actions/participant"
import { Loading } from "@/components/loading"

export default function ParticipantDashboard() {
  const [isLoading, setIsLoading] = useState(true)
  const [events, setEvents] = useState<EventType[]>([])
  const { data: session } = useSession()
  const currentUser = session?.user

  useEffect(() => {
    loadEvents();
  }, []);

  async function loadEvents() {
    const data = await getRegisteredEvents();
    setEvents(data);
    setIsLoading(false);
  }

  if (isLoading) {
    return <Loading />
  }

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
                    <p className="text-2xl font-bold text-white">{events.length}</p>
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
                      {events.filter((e) => new Date(e.dateTime) > new Date()).length}
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
                    <p className="text-2xl font-bold text-white">
                      {events.filter((e) => new Date(e.dateTime) < new Date()).length}
                    </p>
                  </div>
                  <Star className="h-8 w-8 text-yellow-500" />
                </div>
              </CardContent>
            </Card>
          </div>

          {/* My Registered Events */}
          <Card className="border-none pb-6">
            <CardHeader className="px-0">
              <div className="flex justify-between items-center pt-6">
                <CardTitle className="space-y-1.5">
                  <h3 className="text-2xl tracking-tight text-white">My Registered Events</h3>
                </CardTitle>
              </div>
            </CardHeader>
            <CardContent className="px-0">
              <div className="grid md:grid-cols-2 xl:grid-cols-3 gap-6">
                {events.map((event) => (
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