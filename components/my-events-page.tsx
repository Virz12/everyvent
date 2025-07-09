"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Plus, Calendar, Users, Edit, Trash2 } from "lucide-react"
import { CreateEventModal } from "./create-event-modal"
import { EditEventModal } from "./edit-event-modal"
import { DeleteEventDialog } from "./delete-event-dialog"

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
    image: "/placeholder.svg?height=200&width=300",
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
    image: "/placeholder.svg?height=200&width=300",
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
    image: "/placeholder.svg?height=200&width=300",
    createdAt: "2024-10-28",
  },
  {
    id: 4,
    title: "Innovation Workshop",
    category: "team-building",
    date: "2025-01-10",
    time: "1:00 PM",
    duration: "3-4 hours",
    location: "Boston, MA",
    attendees: 8,
    maxAttendees: 20,
    status: "draft",
    description: "Foster innovation and creativity in your team",
    image: "/placeholder.svg?height=200&width=300",
    createdAt: "2024-11-10",
  },
  {
    id: 5,
    title: "Quarterly Review Meeting",
    category: "milestone",
    date: "2025-01-15",
    time: "3:00 PM",
    duration: "2-3 hours",
    location: "San Francisco, CA",
    attendees: 32,
    maxAttendees: 40,
    status: "published",
    description: "Review quarterly achievements and plan ahead",
    image: "/placeholder.svg?height=200&width=300",
    createdAt: "2024-11-12",
  },
]

export function MyEventsPage() {
  const [events, setEvents] = useState(initialEvents)
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false)
  const [editingEvent, setEditingEvent] = useState<any>(null)
  const [deletingEvent, setDeletingEvent] = useState<any>(null)

  const handleCreateEvent = (eventData: any) => {
    const newEvent = {
      ...eventData,
      id: Date.now(),
      attendees: 0,
      createdAt: new Date().toISOString().split("T")[0],
    }
    setEvents([newEvent, ...events])
    setIsCreateModalOpen(false)
  }

  const handleEditEvent = (eventData: any) => {
    setEvents(events.map((event) => (event.id === editingEvent.id ? { ...event, ...eventData } : event)))
    setEditingEvent(null)
  }

  const handleDeleteEvent = (eventId: number) => {
    setEvents(events.filter((event) => event.id !== eventId))
    setDeletingEvent(null)
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case "published":
        return "bg-green-500"
      case "draft":
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

  return (
    <div className="min-h-screen bg-slate-900">
      <div className="bg-slate-800 py-8 px-4 lg:px-6 border-b border-slate-700">
        <div className="container mx-auto">
          <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-4">
            <div>
              <h1 className="text-3xl lg:text-4xl font-bold text-white mb-2">My Events</h1>
              <p className="text-slate-300">Manage and organize your events</p>
            </div>
            <Button onClick={() => setIsCreateModalOpen(true)} className="bg-orange-500 hover:bg-orange-600 text-white">
              <Plus className="h-4 w-4 mr-2" />
              Create Event
            </Button>
          </div>
        </div>
      </div>

      <div className="py-8 px-4 lg:px-6">
        <div className="container mx-auto">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-2xl font-bold text-white">All Events ({events.length})</h2>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {events.map((event) => (
              <Card key={event.id} className="bg-slate-800 border-slate-700">
                <div className="relative">
                  <img
                    src={event.image || "/placeholder.svg"}
                    alt={event.title}
                    className="w-full h-48 object-cover rounded-t-lg"
                  />
                  <Badge className={`absolute top-3 right-3 ${getStatusColor(event.status)} text-white`}>
                    {event.status}
                  </Badge>
                </div>

                <CardContent className="p-6">
                  <div className="space-y-4">
                    <div>
                      <h3 className="text-white font-semibold text-lg mb-2">{event.title}</h3>
                      <p className="text-slate-300 text-sm line-clamp-2">{event.description}</p>
                    </div>

                    <div className="space-y-2 text-sm text-slate-400">
                      <div className="flex items-center space-x-2">
                        <Calendar className="h-4 w-4" />
                        <span>
                          {formatDate(event.date)} at {event.time}
                        </span>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Users className="h-4 w-4" />
                        <span>
                          {event.attendees}/{event.maxAttendees} attendees
                        </span>
                      </div>
                    </div>

                    <div className="flex space-x-2 pt-4">
                      <Button
                        size="sm"
                        variant="outline"
                        onClick={() => setEditingEvent(event)}
                        className="flex-1 border-slate-600 text-slate-300 hover:bg-slate-700"
                      >
                        <Edit className="h-4 w-4 mr-1" />
                        Edit
                      </Button>
                      <Button
                        size="sm"
                        variant="outline"
                        onClick={() => setDeletingEvent(event)}
                        className="border-red-600 text-red-400 hover:bg-red-600 hover:text-white"
                      >
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          {events.length === 0 && (
            <div className="text-center py-12">
              <Calendar className="h-16 w-16 text-slate-600 mx-auto mb-4" />
              <h3 className="text-xl font-semibold text-white mb-2">No events yet</h3>
              <p className="text-slate-400 mb-6">Create your first event to get started</p>
              <Button
                onClick={() => setIsCreateModalOpen(true)}
                className="bg-orange-500 hover:bg-orange-600 text-white"
              >
                <Plus className="h-4 w-4 mr-2" />
                Create Your First Event
              </Button>
            </div>
          )}
        </div>
      </div>

      {/* Modals */}
      <CreateEventModal
        isOpen={isCreateModalOpen}
        onClose={() => setIsCreateModalOpen(false)}
        onSubmit={handleCreateEvent}
      />

      {editingEvent && (
        <EditEventModal
          isOpen={!!editingEvent}
          onClose={() => setEditingEvent(null)}
          onSubmit={handleEditEvent}
          event={editingEvent}
        />
      )}

      {deletingEvent && (
        <DeleteEventDialog
          isOpen={!!deletingEvent}
          onClose={() => setDeletingEvent(null)}
          onConfirm={() => handleDeleteEvent(deletingEvent.id)}
          eventTitle={deletingEvent.title}
        />
      )}
    </div>
  )
}
