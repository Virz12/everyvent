"use client"

import { useState, useMemo } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Calendar, MapPin, Users } from "lucide-react"
import { EventsFilter } from "./events-filter"

const events = [
  {
    id: 1,
    title: "Strategy Workshop",
    category: "team-building",
    date: "2024-12-15",
    time: "2:00 PM",
    duration: "2-4 hours",
    location: "San Francisco, CA",
    price: 250,
    rating: 4.8,
    attendees: 24,
    maxAttendees: 30,
    image: "/placeholder.svg?height=200&width=300",
    featured: true,
    description: "Interactive strategy planning session for teams",
  },
  {
    id: 2,
    title: "Synergy Session: Team Building",
    category: "team-building",
    date: "2024-12-18",
    time: "6:00 PM",
    duration: "3-4 hours",
    location: "San Francisco, CA",
    price: 250,
    rating: 4.9,
    attendees: 156,
    maxAttendees: 200,
    image: "/placeholder.svg?height=200&width=300",
    description: "Build stronger team connections through collaborative activities",
  },
  {
    id: 3,
    title: "Team Building New Meeting",
    category: "team-building",
    date: "2024-12-20",
    time: "9:00 AM",
    duration: "4-6 hours",
    location: "San Francisco, CA",
    price: 250,
    rating: 4.7,
    attendees: 89,
    maxAttendees: 100,
    image: "/placeholder.svg?height=200&width=300",
    description: "Innovative team building activities for modern workplaces",
  },
  {
    id: 4,
    title: "Professional Networking Mixer",
    category: "networking",
    date: "2024-12-22",
    time: "7:00 PM",
    duration: "2-3 hours",
    location: "Seattle, WA",
    price: 25,
    rating: 4.6,
    attendees: 167,
    maxAttendees: 200,
    image: "/placeholder.svg?height=200&width=300",
    description: "Connect with industry professionals in a relaxed setting",
  },
  {
    id: 5,
    title: "Executive Leadership Retreat",
    category: "executive",
    date: "2024-12-25",
    time: "10:00 AM",
    duration: "2 days",
    location: "Napa Valley, CA",
    price: 800,
    rating: 4.9,
    attendees: 32,
    maxAttendees: 40,
    image: "/placeholder.svg?height=200&width=300",
    description: "Intensive leadership development for executives",
  },
  {
    id: 6,
    title: "Company Milestone Celebration",
    category: "milestone",
    date: "2024-12-28",
    time: "6:00 PM",
    duration: "3-4 hours",
    location: "San Francisco, CA",
    price: 150,
    rating: 4.8,
    attendees: 145,
    maxAttendees: 200,
    image: "/placeholder.svg?height=200&width=300",
    description: "Celebrate company achievements with your team",
  },
  {
    id: 7,
    title: "Holiday Party Extravaganza",
    category: "holiday",
    date: "2024-12-30",
    time: "7:00 PM",
    duration: "4-5 hours",
    location: "Los Angeles, CA",
    price: 75,
    rating: 4.7,
    attendees: 234,
    maxAttendees: 300,
    image: "/placeholder.svg?height=200&width=300",
    description: "End the year with a festive celebration",
  },
  {
    id: 8,
    title: "Mountain Offsite Retreat",
    category: "offsite",
    date: "2025-01-05",
    time: "9:00 AM",
    duration: "3 days",
    location: "Lake Tahoe, CA",
    price: 450,
    rating: 4.9,
    attendees: 56,
    maxAttendees: 80,
    image: "/placeholder.svg?height=200&width=300",
    description: "Strategic planning retreat in a beautiful mountain setting",
  },
]

type ViewMode = "grid" | "list"
type SortOption = "popularity" | "date" | "price-low" | "price-high" | "rating"

export function EventsGrid() {
  const [activeCategory, setActiveCategory] = useState("team-building")
  const [sortBy, setSortBy] = useState<SortOption>("popularity")
  const [viewMode, setViewMode] = useState<ViewMode>("grid")

  const filteredAndSortedEvents = useMemo(() => {
    const filtered = events.filter((event) => event.category === activeCategory)

    // Sort events
    filtered.sort((a, b) => {
      switch (sortBy) {
        case "popularity":
          return b.attendees - a.attendees
        case "date":
          return new Date(a.date).getTime() - new Date(b.date).getTime()
        case "price-low":
          return a.price - b.price
        case "price-high":
          return b.price - a.price
        case "rating":
          return b.rating - a.rating
        default:
          return 0
      }
    })

    return filtered
  }, [activeCategory, sortBy])

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
    <section className="bg-slate-900 py-20 px-4 lg:px-6">
      <div className="container mx-auto">
        <EventsFilter
          onCategoryChange={setActiveCategory}
          onSortChange={setSortBy}
          onViewChange={setViewMode}
          activeCategory={activeCategory}
          sortBy={sortBy}
          viewMode={viewMode}
        />

        <div className={`mt-12 ${viewMode === "grid" ? "grid md:grid-cols-2 lg:grid-cols-3 gap-6" : "space-y-4"}`}>
          {filteredAndSortedEvents.map((event) => (
            <Card
              key={event.id}
              className={`bg-slate-800 border-slate-700 overflow-hidden hover:bg-slate-750 transition-colors ${
                viewMode === "list" ? "flex" : ""
              }`}
            >
              <div className={`relative ${viewMode === "list" ? "w-64 shrink-0" : ""}`}>
                <img
                  src={event.image || "/placeholder.svg"}
                  alt={event.title}
                  className={`object-cover ${viewMode === "list" ? "w-full h-full" : "w-full h-48"}`}
                />
              </div>

              <CardContent className={`p-6 ${viewMode === "list" ? "flex-1" : ""}`}>
                <div className="space-y-4">
                  <div className="flex items-start justify-between">
                    <div className="space-y-2">
                      <div className="flex items-center space-x-2">
                        <Badge variant="secondary" className="bg-slate-700 text-slate-300 text-xs">
                          {event.duration}
                        </Badge>
                        <span className="text-slate-400 text-xs">{getDaysUntilEvent(event.date)}</span>
                      </div>
                      <h3 className="text-white font-semibold text-lg leading-tight">{event.title}</h3>
                      {viewMode === "list" && <p className="text-slate-300 text-sm">{event.description}</p>}
                    </div>
                  </div>

                  <div className="space-y-2 text-sm text-slate-300">
                    <div className="flex items-center space-x-2">
                      <Calendar className="h-4 w-4 text-orange-500" />
                      <span>
                        {formatDate(event.date)} at {event.time}
                      </span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <MapPin className="h-4 w-4 text-orange-500" />
                      <span>{event.location}</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Users className="h-4 w-4 text-orange-500" />
                      <span>
                        {event.attendees}/{event.maxAttendees} attending
                      </span>
                    </div>
                  </div>

                  <div className="flex items-center justify-between pt-4">
                    <span className="text-white font-semibold text-lg">Free</span>
                    <Button size="sm" className="bg-orange-500 hover:bg-orange-600 text-white">
                      Join Event
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {filteredAndSortedEvents.length === 0 && (
          <div className="text-center py-12">
            <div className="text-slate-400 text-lg">No events found in this category</div>
            <p className="text-slate-500 mt-2">Try selecting a different category or check back later</p>
          </div>
        )}
      </div>
    </section>
  )
}
