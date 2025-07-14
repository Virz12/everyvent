"use client"

import type React from "react"

import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import EditEventForm from "@/components/dashboard/organizer/form/edit-event-form"

interface EventTypeForm {
  title: string
  category: string
  date: string
  time: string
  duration: string
  location: string
  maxAttendees: number
  status: string
  description: string
}

interface EditEventModalProps {
  isOpen: boolean
  onClose: () => void
  onSubmit: (eventData: EventTypeForm) => void
  event: EventTypeForm
}

export function EditEventModal({ isOpen, onClose, onSubmit, event }: EditEventModalProps) {
  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="bg-slate-800 border-slate-700 text-white max-w-2xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="text-2xl font-bold">Edit Event</DialogTitle>
        </DialogHeader>
        <EditEventForm onSubmit={onSubmit} onClose={onClose} event={event} />
      </DialogContent>
    </Dialog>
  )
}
