"use client"

import { useEffect, useState } from "react"
import { Button } from "@/components/ui/button"
import { Plus, Calendar } from "lucide-react"
import { CreateEventModal } from "@/components/dashboard/organizer/modal/create-event-modal"
import { EditEventModal } from "@/components/dashboard/organizer/modal/edit-event-modal"
import { DeleteEventDialog } from "@/components/dashboard/organizer/modal/delete-event-dialog"
import EventCard from "@/components/dashboard/organizer/event-card"
import { EventType } from "@/lib/types"
import { getEvents } from "@/lib/actions/event"

export default function MyEventsPage() {
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false)
  // const [editingEvent, setEditingEvent] = useState<EventType | null>(null)
  // const [deletingEvent, setDeletingEvent] = useState<EventType | null>(null)
  const [events, setEvents] = useState<EventType[]>([]);

  useEffect(() => {
    async function loadEvents() {
      const data = await getEvents();
      console.log(data);

      setEvents(data);
    }

    loadEvents();
  }, []);

  // const handleEditEvent = (eventData: EventTypeForm) => {
  //   setEvents(events.map((event: EventType) => (event.id === editingEvent?.id ? { ...event, ...eventData } : event)))
  //   setEditingEvent(null)
  // }

  // const handleDeleteEvent = (eventId: number) => {
  //   setEvents(events.filter((event) => event.id !== eventId))
  //   setDeletingEvent(null)
  // }

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
            {/* <h2 className="text-2xl font-bold text-white">All Events ({events.length})</h2> */}
          </div>

          {/* Events list */}
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {events.map((event) => (
              <EventCard
                key={event.id}
                event={event}
              // onEditClick={() => setEditingEvent(event)}
              // onDeleteClick={() => setDeletingEvent(event)}
              />
            ))}
          </div>

          {/* {events.length === 0 && (
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
          )} */}
        </div>
      </div>

      {/* Modals */}
      <CreateEventModal
        isOpen={isCreateModalOpen}
        onClose={() => setIsCreateModalOpen(false)}
      />

      {/* {editingEvent && (
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
      )} */}
    </div>
  )
}