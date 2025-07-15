"use client"

import { useState, useMemo } from "react"
import { EventsFilter } from "./events-filter"
import EventCard from "./event-card"
import { Button } from "./ui/button"
import Link from "next/link"

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
    organizer: "Excel Point",
    image: "https://placehold.co/300x200",
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
    organizer: "Excel Point",
    image: "https://placehold.co/300x200",
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
    organizer: "Excel Point",
    image: "https://placehold.co/300x200",
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
    organizer: "Excel Point",
    image: "https://placehold.co/300x200",
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
    organizer: "Excel Point",
    image: "https://placehold.co/300x200",
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
    organizer: "Excel Point",
    image: "https://placehold.co/300x200",
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
    organizer: "Excel Point",
    image: "https://placehold.co/300x200",
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
    organizer: "Excel Point",
    image: "https://placehold.co/300x200",
    description: "Strategic planning retreat in a beautiful mountain setting",
  },
]

type SortOption = "popularity" | "date"

export function EventsGrid() {
  const [activeCategory, setActiveCategory] = useState("team-building")
  const [sortBy, setSortBy] = useState<SortOption>("popularity")

  const filteredAndSortedEvents = useMemo(() => {
    const filtered = events.filter((event) => event.category === activeCategory)

    // Sort events
    filtered.sort((a, b) => {
      switch (sortBy) {
        case "popularity":
          return b.attendees - a.attendees
        case "date":
          return new Date(a.date).getTime() - new Date(b.date).getTime()
        default:
          return 0
      }
    })

    return filtered
  }, [activeCategory, sortBy])

  return (
    <section className="bg-slate-900 py-20 px-4 lg:px-6">
      <div className="container mx-auto">
        <EventsFilter
          onCategoryChange={setActiveCategory}
          onSortChange={setSortBy}
          activeCategory={activeCategory}
          sortBy={sortBy}
        />

        <div className="mt-12 grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredAndSortedEvents.map((event) => (
            <EventCard
              key={event.id}
              event={event}
            />
          ))}
        </div>

        {/* Redirect to events page */}
        <div className="flex justify-center mt-8">
          <Link href="/events">
            <Button size={'lg'} className="bg-orange-500 hover:bg-orange-600 text-white cursor-pointer">
              Explore more
            </Button>
          </Link>
        </div>

        {filteredAndSortedEvents.length === 0 && (
          <div className="text-center py-12">
            <div className="text-slate-400 text-lg">No events found in this category</div>
            <p className="text-slate-500 mt-2">Try selecting a different category or check back later</p>
          </div>
        )}
      </div>
    </section >
  )
}
