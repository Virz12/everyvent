"use client"

import type React from "react"

import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import CreateEventForm from "@/components/dashboard/organizer/form/create-event-form";

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

interface CreateEventModalProps {
  isOpen: boolean
  onClose: () => void
  onSubmit: (eventData: EventTypeForm) => void
}

export function CreateEventModal({ isOpen, onClose, onSubmit }: CreateEventModalProps) {
  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="bg-slate-800 border-slate-700 text-white max-w-2xl max-h-[90vh] overflow-y-auto" aria-describedby="modal-event-create-form">
        <DialogHeader>
          <DialogTitle className="text-2xl font-bold">Create New Event</DialogTitle>
        </DialogHeader>
        <CreateEventForm onSubmit={onSubmit} onClose={onClose} />
      </DialogContent>
    </Dialog>
  )
}

