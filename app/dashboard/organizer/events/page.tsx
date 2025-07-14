"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Plus, Calendar } from "lucide-react"
import { CreateEventModal } from "@/components/dashboard/organizer/modal/create-event-modal"
import { EditEventModal } from "@/components/dashboard/organizer/modal/edit-event-modal"
import { DeleteEventDialog } from "@/components/dashboard/organizer/modal/delete-event-dialog"
import EventCard from "@/components/dashboard/organizer/event-card"
import { EventTypeForm } from "@/components/dashboard/organizer/form/create-event-form"

interface EventType {
  id: number
  title: string
  category: string
  date: string
  time: string
  duration: string
  location: string
  attendees: number
  maxAttendees: number
  status: string
  description: string
  image: string
  createdAt: string
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
    image: "https://placehold.co/300x200",
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
    image: "https://placehold.co/300x200",
    createdAt: "2024-11-12",
  },
]

export default function MyEventsPage() {
  const [events, setEvents] = useState(initialEvents)
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false)
  const [editingEvent, setEditingEvent] = useState<EventType | null>(null)
  const [deletingEvent, setDeletingEvent] = useState<EventType | null>(null)

  const handleCreateEvent = (eventData: EventTypeForm) => {
    const newEvent: EventType = {
      ...eventData,
      id: Date.now(),
      attendees: 0,
      createdAt: new Date().toISOString().split("T")[0],
      image: "https://placehold.co/300x200",
    }
    setEvents([newEvent, ...events])
    setIsCreateModalOpen(false)
  }

  const handleEditEvent = (eventData: EventTypeForm) => {
    setEvents(events.map((event: EventType) => (event.id === editingEvent?.id ? { ...event, ...eventData } : event)))
    setEditingEvent(null)
  }

  const handleDeleteEvent = (eventId: number) => {
    setEvents(events.filter((event) => event.id !== eventId))
    setDeletingEvent(null)
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
            <Button onClick={() => setIsCreateModalOpen(true)} className="bg-orange-500 hover:bg-orange-600 text-white cursor-pointer">
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

          {/* Events list */}
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {events.map((event) => (
              <EventCard
                key={event.id}
                event={event}
                onEditClick={() => setEditingEvent(event)}
                onDeleteClick={() => setDeletingEvent(event)}
              />
            ))}
          </div>

          {events.length === 0 && (
            <div className="text-center py-12">
              <Calendar className="h-16 w-16 text-slate-600 mx-auto mb-4" />
              <h3 className="text-xl font-semibold text-white mb-2">No events yet</h3>
              <p className="text-slate-400 mb-6">Create your first event to get started</p>
              <Button
                onClick={() => setIsCreateModalOpen(true)}
                className="bg-orange-500 hover:bg-orange-600 text-white cursor-pointer"
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