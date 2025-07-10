"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Calendar, MapPin, Users, Search, Clock, Heart, Star } from "lucide-react"

// Mock user data
const currentUser = {
  id: 1,
  name: "Jane Smith",
  email: "jane@example.com",
  role: "participant",
}

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

// Mock recommended events
const recommendedEvents = [
  {
    id: 4,
    title: "Leadership Summit",
    category: "executive",
    date: "2024-12-25",
    time: "9:00 AM",
    duration: "1 day",
    location: "New York, NY",
    organizer: "Leadership Institute",
    attendees: 45,
    maxAttendees: 50,
    image: "https://placehold.co/300x200",
    description: "Strategic planning for senior executives",
  },
  {
    id: 5,
    title: "Women in Tech Networking",
    category: "networking",
    date: "2025-01-12",
    time: "6:00 PM",
    duration: "2-3 hours",
    location: "San Francisco, CA",
    organizer: "Women in Tech SF",
    attendees: 123,
    maxAttendees: 150,
    image: "https://placehold.co/300x200",
    description: "Empowering women in technology through networking",
  },
]

export function ParticipantDashboard() {
  const [searchQuery, setSearchQuery] = useState("")

  const getStatusColor = (status: string) => {
    switch (status) {
      case "confirmed":
        return "bg-green-500"
      case "pending":
        return "bg-yellow-500"
      case "cancelled":
        return "bg-red-500"
      default:
        return "bg-gray-500"
    }
  }

  const formatDate = (dateString: string) => {
    const date = new Date(dateString)
    return date.toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
      year: "numeric",
    })
  }

  const getDaysUntilEvent = (dateString: string) => {
    const eventDate = new Date(dateString)
    const today = new Date()
    const diffTime = eventDate.getTime() - today.getTime()
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24))

    if (diffDays === 0) return "Today"
    if (diffDays === 1) return "Tomorrow"
    if (diffDays > 0) return `${diffDays} days`
    return "Past event"
  }

  return (
    <div className="min-h-screen bg-slate-900">
      {/* Header */}
      <div className="bg-slate-800 py-8 px-4 lg:px-6 border-b border-slate-700">
        <div className="container mx-auto">
          <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-4">
            <div>
              <h1 className="text-3xl lg:text-4xl font-bold text-white mb-2">Welcome back, {currentUser.name}</h1>
              <p className="text-slate-300">Discover and join amazing events</p>
            </div>
            <Button className="bg-orange-500 hover:bg-orange-600 text-white">
              <Search className="h-4 w-4 mr-2" />
              Browse All Events
            </Button>
          </div>
        </div>
      </div>

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
          <Card className="bg-slate-800 border-slate-700">
            <CardHeader>
              <div className="flex justify-between items-center">
                <CardTitle className="text-white">My Registered Events</CardTitle>
                <Button variant="outline" className="border-slate-600 text-slate-300 hover:bg-slate-700 bg-transparent">
                  View All
                </Button>
              </div>
            </CardHeader>
            <CardContent>
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                {registeredEvents.map((event) => (
                  <Card key={event.id} className="bg-slate-700 border-slate-600">
                    <div className="relative">
                      <img
                        src={event.image || "/placeholder.svg"}
                        alt={event.title}
                        className="w-full h-32 object-cover rounded-t-lg"
                      />
                      <Badge className={`absolute top-2 right-2 ${getStatusColor(event.status)} text-white text-xs`}>
                        {event.status}
                      </Badge>
                      <div className="absolute top-2 left-2 bg-black/50 text-white text-xs px-2 py-1 rounded">
                        {getDaysUntilEvent(event.date)}
                      </div>
                    </div>
                    <CardContent className="p-4">
                      <div className="space-y-3">
                        <div>
                          <h3 className="text-white font-semibold text-sm mb-1">{event.title}</h3>
                          <p className="text-slate-400 text-xs">by {event.organizer}</p>
                        </div>
                        <div className="space-y-1 text-xs text-slate-400">
                          <div className="flex items-center space-x-1">
                            <Calendar className="h-3 w-3" />
                            <span>
                              {formatDate(event.date)} at {event.time}
                            </span>
                          </div>
                          <div className="flex items-center space-x-1">
                            <MapPin className="h-3 w-3" />
                            <span>{event.location}</span>
                          </div>
                        </div>
                        <Button
                          size="sm"
                          variant="outline"
                          className="w-full border-slate-600 text-slate-300 hover:bg-slate-600 bg-transparent"
                        >
                          View Details
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Recommended Events */}
          <Card className="bg-slate-800 border-slate-700">
            <CardHeader>
              <div className="flex justify-between items-center">
                <CardTitle className="text-white">Recommended for You</CardTitle>
                <Button variant="outline" className="border-slate-600 text-slate-300 hover:bg-slate-700 bg-transparent">
                  <Heart className="h-4 w-4 mr-2" />
                  View More
                </Button>
              </div>
            </CardHeader>
            <CardContent>
              <div className="grid md:grid-cols-2 gap-6">
                {recommendedEvents.map((event) => (
                  <Card key={event.id} className="bg-slate-700 border-slate-600">
                    <div className="flex">
                      <img
                        src={event.image || "/placeholder.svg"}
                        alt={event.title}
                        className="w-24 h-24 object-cover rounded-l-lg"
                      />
                      <CardContent className="p-4 flex-1">
                        <div className="space-y-2">
                          <div>
                            <h3 className="text-white font-semibold text-sm mb-1">{event.title}</h3>
                            <p className="text-slate-400 text-xs">by {event.organizer}</p>
                          </div>
                          <div className="space-y-1 text-xs text-slate-400">
                            <div className="flex items-center space-x-1">
                              <Calendar className="h-3 w-3" />
                              <span>{formatDate(event.date)}</span>
                            </div>
                            <div className="flex items-center space-x-1">
                              <Users className="h-3 w-3" />
                              <span>
                                {event.attendees}/{event.maxAttendees} attending
                              </span>
                            </div>
                          </div>
                          <Button size="sm" className="w-full bg-orange-500 hover:bg-orange-600 text-white">
                            Join Event
                          </Button>
                        </div>
                      </CardContent>
                    </div>
                  </Card>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
