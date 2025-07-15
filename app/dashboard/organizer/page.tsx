"use client"

import { useState } from "react"
import RecentEvents from "./recent-event"
import StatsCard from "./stats-card"

// Mock user data - in real app this would come from auth context
const currentUser = {
  id: 1,
  name: "John Doe",
  email: "john@example.com",
  role: "organizer",
  organization: "TechCorp Events",
}

// Mock events data - in real app this would come from API
const initialEvents = [
  {
    id: 1,
    title: "Strategy Workshop",
    category: "team-building",
    date: "2024-12-15",
    time: "2:00 PM",
    duration: "2-4 hours",
    location: "San Francisco, CA",
    attendees: 24,
    maxAttendees: 30,
    status: "published",
    description: "Interactive strategy planning session for teams",
    image: "https://placehold.co/300x200",
    createdAt: "2024-11-01",
  },
  {
    id: 2,
    title: "Team Building Workshop",
    category: "team-building",
    date: "2024-12-20",
    time: "10:00 AM",
    duration: "3-4 hours",
    location: "San Francisco, CA",
    attendees: 15,
    maxAttendees: 25,
    status: "draft",
    description: "Fun team building activities and exercises",
    image: "https://placehold.co/300x200",
    createdAt: "2024-11-05",
  },
  {
    id: 3,
    title: "Leadership Summit",
    category: "executive",
    date: "2024-12-25",
    time: "9:00 AM",
    duration: "1 day",
    location: "New York, NY",
    attendees: 45,
    maxAttendees: 50,
    status: "published",
    description: "Executive leadership development summit",
    image: "https://placehold.co/300x200",
    createdAt: "2024-10-28",
  },
]

export default function DashboardContent() {
  const [events] = useState(initialEvents)

  return (
    <div className="min-h-screen bg-slate-900">
      <div className="bg-slate-800 py-8 px-4 lg:px-6 border-b border-slate-700">
        <div className="container mx-auto">
          <div>
            <h1 className="text-3xl lg:text-4xl font-bold text-white mb-2">Welcome back, {currentUser.name}</h1>
            <p className="text-slate-300">{currentUser.organization} • Organizer Dashboard</p>
          </div>
        </div>
      </div>

      <div className="py-8 px-4 lg:px-6">
        <div className="container mx-auto space-y-8">
          {/* Stats Cards */}
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
            <StatsCard events={events} />
          </div>

          {/* Recent Events */}
          <RecentEvents events={events} />
        </div>
      </div>
    </div>
  )
}