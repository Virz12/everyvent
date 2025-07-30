import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { CreateEventType } from "@/lib/types";
import { format, parse } from "date-fns";
import { Calendar, Clock, MapPin, Users } from "lucide-react";
import { useEffect, useState } from "react";

interface EditEventFormProps {
  onClose: () => void
  onSubmit: (eventData: CreateEventType) => void
  event: CreateEventType
}

export default function EditEventForm({ onSubmit, onClose, event }: EditEventFormProps) {
  const categories = [
    { value: "CONFERENCE", label: "Conference" },
    { value: "WORKSHOP", label: "Workshop" },
    { value: "CAREER_FAIR", label: "Career Fair" },
    { value: "MEETUP", label: "Meetup" },
    { value: "HACKATHON", label: "Hackathon" },
  ]

  const handleSubmit = (formData: FormData) => {
    const date = format(new Date(formData.get("date") as string), 'yyyy/MM/dd')
    const time = formData.get("time") as string

    const dateTime = parse(`${date} ${time}`, 'yyyy/MM/dd HH:mm', new Date())

    const data = {
      title: formData.get("title") as string,
      description: formData.get("description") as string,
      dateTime,
      category: formData.get("category") as "CONFERENCE" | "WORKSHOP" | "CAREER_FAIR" | "MEETUP" | "HACKATHON",
      duration: formData.get("duration") as string,
      location: formData.get("location") as string,
      max_attendees: Number(formData.get("max_attendees")),
      status: formData.get("status") as "DRAFT" | "PUBLISHED",
    };

    onSubmit({
      ...data,
      max_attendees: Number(formData.get("maxAttendees")),
    })
  }

  return (
    <form action={handleSubmit} className="space-y-6">
      <div className="grid grid-cols-6 gap-6">
        <div className="space-y-2 col-span-3">
          <Label htmlFor="title" className="text-slate-300">
            Event Title *
          </Label>
          <Input
            id="title"
            name="title"
            defaultValue={event.title}
            placeholder="Enter event title"
            className={`bg-slate-700 border-slate-600 text-white`}
            required
          />
          {/* {errors.title && <p className="text-red-400 text-sm">{errors.title}</p>} */}
        </div>

        <div className="space-y-2 col-span-3">
          <Label htmlFor="category" className="text-slate-300">
            Category *
          </Label>
          <Select defaultValue={event.category} name="category">
            <SelectTrigger
              className={`bg-slate-700 border-slate-600 text-white`}
            >
              <SelectValue placeholder="Select category" />
            </SelectTrigger>
            <SelectContent className="bg-slate-700 border-slate-600">
              {categories.map((category) => (
                <SelectItem key={category.value} value={category.value} className="text-white hover:bg-slate-600">
                  {category.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
          {/* {errors.category && <p className="text-red-400 text-sm">{errors.category}</p>} */}
        </div>

        <div className="space-y-2 col-span-6">
          <Label htmlFor="description" className="text-slate-300">
            Description *
          </Label>
          <Textarea
            id="description"
            defaultValue={event.description}
            name="description"
            placeholder="Describe your event..."
            rows={4}
            className={`bg-slate-700 border-slate-600 text-white`}
          />
          {/* {errors.description && <p className="text-red-400 text-sm">{errors.description}</p>} */}
        </div>

        <div className="space-y-2 col-span-3 md:col-span-2">
          <Label htmlFor="date" className="text-slate-300 flex items-center">
            <Calendar className="h-4 w-4 mr-1" />
            Date *
          </Label>
          <Input
            id="date"
            type="date"
            name="date"
            defaultValue={event.dateTime.toISOString().split("T")[0]}
            className={`bg-slate-700 border-slate-600 text-white block`}
            required
          />
          {/* {errors.date && <p className="text-red-400 text-sm">{errors.date}</p>} */}
        </div>

        <div className="space-y-2 col-span-3 md:col-span-2">
          <Label htmlFor="time" className="text-slate-300 flex items-center">
            <Clock className="h-4 w-4 mr-1" />
            Time *
          </Label>
          <Input
            id="time"
            type="time"
            name="time"
            defaultValue={event.dateTime.toISOString().split("T")[1]}
            className={`bg-slate-700 border-slate-600 text-white block`}
            required
          />
          {/* {errors.time && <p className="text-red-400 text-sm">{errors.time}</p>} */}
        </div>

        <div className="space-y-2 col-span-3 md:col-span-2">
          <Label htmlFor="duration" className="text-slate-300">
            Duration *
          </Label>
          <Input
            id="duration"
            name="duration"
            defaultValue={event.duration}
            placeholder="e.g., 2-3 hours"
            className={`bg-slate-700 border-slate-600 text-white`}
          />
          {/* {errors.duration && <p className="text-red-400 text-sm">{errors.duration}</p>} */}
        </div>

        <div className="space-y-2 col-span-3">
          <Label htmlFor="location" className="text-slate-300 flex items-center">
            <MapPin className="h-4 w-4 mr-1" />
            Location *
          </Label>
          <Input
            id="location"
            name="location"
            defaultValue={event.location}
            placeholder="e.g., San Francisco, CA"
            className={`bg-slate-700 border-slate-600 text-white`}
          />
          {/* {errors.location && <p className="text-red-400 text-sm">{errors.location}</p>} */}
        </div>

        <div className="space-y-2 col-span-3">
          <Label htmlFor="maxAttendees" className="text-slate-300 flex items-center">
            <Users className="h-4 w-4 mr-1" />
            Max Attendees *
          </Label>
          <Input
            id="maxAttendees"
            type="number"
            min="1"
            name="maxAttendees"
            defaultValue={event.max_attendees}
            placeholder="e.g., 50"
            className={`bg-slate-700 border-slate-600 text-white`}
          />
          {/* {errors.maxAttendees && <p className="text-red-400 text-sm">{errors.maxAttendees}</p>} */}
        </div>

        <div className="space-y-2 col-span-3">
          <Label htmlFor="status" className="text-slate-300">
            Status
          </Label>
          <Select defaultValue={event.status} name="status">
            <SelectTrigger className="bg-slate-700 border-slate-600 text-white">
              <SelectValue />
            </SelectTrigger>
            <SelectContent className="bg-slate-700 border-slate-600">
              <SelectItem value="DRAFT" className="text-white hover:bg-slate-600">
                Draft
              </SelectItem>
              <SelectItem value="PUBLISHED" className="text-white hover:bg-slate-600">
                Published
              </SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div className="space-y-2 col-span-6">
          <div className="flex justify-end space-x-4 pt-6">
            <Button
              type="button"
              variant="outline"
              onClick={onClose}
              className="border-slate-600 text-slate-300 hover:bg-slate-700 bg-transparent"
            >
              Cancel
            </Button>
            <Button type="submit" className="bg-orange-500 hover:bg-orange-600 text-white">
              Update Event
            </Button>
          </div>
        </div>
      </div>
    </form>
  )
}