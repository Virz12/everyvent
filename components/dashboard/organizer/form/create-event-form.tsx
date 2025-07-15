import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Textarea } from "@/components/ui/textarea"
import { Calendar, Clock, MapPin, Users } from "lucide-react"

export interface EventTypeForm {
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

interface CreateEventFormProps {
  onClose: () => void
  onSubmit: (eventData: EventTypeForm) => void
}

export default function CreateEventForm({ onSubmit, onClose }: CreateEventFormProps) {
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    category: "",
    date: "",
    time: "",
    duration: "",
    location: "",
    maxAttendees: "",
    status: "draft",
    image: "https://placehold.co/300x200",
  })

  const [errors, setErrors] = useState<Record<string, string>>({})

  const categories = [
    { value: "team-building", label: "Team Building" },
    { value: "networking", label: "Networking" },
    { value: "executive", label: "Executive" },
    { value: "milestone", label: "Milestone" },
    { value: "holiday", label: "Holiday" },
    { value: "offsite", label: "Offsite" },
  ]

  const validateForm = () => {
    const newErrors: Record<string, string> = {}

    if (!formData.title.trim()) newErrors.title = "Title is required"
    if (!formData.description.trim()) newErrors.description = "Description is required"
    if (!formData.category) newErrors.category = "Category is required"
    if (!formData.date) newErrors.date = "Date is required"
    if (!formData.time) newErrors.time = "Time is required"
    if (!formData.duration.trim()) newErrors.duration = "Duration is required"
    if (!formData.location.trim()) newErrors.location = "Location is required"
    if (!formData.maxAttendees || Number.parseInt(formData.maxAttendees) < 1) {
      newErrors.maxAttendees = "Max attendees must be at least 1"
    }

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (validateForm()) {
      onSubmit({
        ...formData,
        maxAttendees: Number.parseInt(formData.maxAttendees),
      })
      setFormData({
        title: "",
        description: "",
        category: "",
        date: "",
        time: "",
        duration: "",
        location: "",
        maxAttendees: "",
        status: "draft",
        image: "https://placehold.co/300x200",
      })
      setErrors({})
    }
  }

  const handleInputChange = (field: string, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }))
    if (errors[field]) {
      setErrors((prev) => ({ ...prev, [field]: "" }))
    }
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="grid grid-cols-6 gap-6">
        <div className="space-y-2 col-span-3">
          <Label htmlFor="title" className="text-slate-300">
            Event Title *
          </Label>
          <Input
            id="title"
            value={formData.title}
            onChange={(e) => handleInputChange("title", e.target.value)}
            placeholder="Enter event title"
            className={`bg-slate-700 border-slate-600 text-white ${errors.title ? "border-red-500" : ""}`}
          />
          {errors.title && <p className="text-red-400 text-sm">{errors.title}</p>}
        </div>

        <div className="space-y-2 col-span-3">
          <Label htmlFor="category" className="text-slate-300">
            Category *
          </Label>
          <Select value={formData.category} onValueChange={(value) => handleInputChange("category", value)}>
            <SelectTrigger
              className={`bg-slate-700 border-slate-600 text-white ${errors.category ? "border-red-500" : ""}`}
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
          {errors.category && <p className="text-red-400 text-sm">{errors.category}</p>}
        </div>

        <div className="space-y-2 col-span-6">
          <Label htmlFor="description" className="text-slate-300">
            Description *
          </Label>
          <Textarea
            id="description"
            value={formData.description}
            onChange={(e) => handleInputChange("description", e.target.value)}
            placeholder="Describe your event..."
            rows={4}
            className={`bg-slate-700 border-slate-600 text-white ${errors.description ? "border-red-500" : ""}`}
          />
          {errors.description && <p className="text-red-400 text-sm">{errors.description}</p>}
        </div>

        <div className="space-y-2 col-span-3 md:col-span-2">
          <Label htmlFor="date" className="text-slate-300 flex items-center">
            <Calendar className="h-4 w-4 mr-1" />
            Date *
          </Label>
          <Input
            id="date"
            type="date"
            value={formData.date}
            onChange={(e) => handleInputChange("date", e.target.value)}
            className={`bg-slate-700 border-slate-600 text-white block ${errors.date ? "border-red-500" : ""}`}
          />
          {errors.date && <p className="text-red-400 text-sm">{errors.date}</p>}
        </div>

        <div className="space-y-2 col-span-3 md:col-span-2">
          <Label htmlFor="time" className="text-slate-300 flex items-center">
            <Clock className="h-4 w-4 mr-1" />
            Time *
          </Label>
          <Input
            id="time"
            type="time"
            value={formData.time}
            onChange={(e) => handleInputChange("time", e.target.value)}
            className={`bg-slate-700 border-slate-600 text-white block ${errors.time ? "border-red-500" : ""}`}
          />
          {errors.time && <p className="text-red-400 text-sm">{errors.time}</p>}
        </div>

        <div className="space-y-2 col-span-3 md:col-span-2">
          <Label htmlFor="duration" className="text-slate-300">
            Duration *
          </Label>
          <Input
            id="duration"
            value={formData.duration}
            onChange={(e) => handleInputChange("duration", e.target.value)}
            placeholder="e.g., 2-3 hours"
            className={`bg-slate-700 border-slate-600 text-white ${errors.duration ? "border-red-500" : ""}`}
          />
          {errors.duration && <p className="text-red-400 text-sm">{errors.duration}</p>}
        </div>

        <div className="space-y-2 col-span-3">
          <Label htmlFor="location" className="text-slate-300 flex items-center">
            <MapPin className="h-4 w-4 mr-1" />
            Location *
          </Label>
          <Input
            id="location"
            value={formData.location}
            onChange={(e) => handleInputChange("location", e.target.value)}
            placeholder="e.g., San Francisco, CA"
            className={`bg-slate-700 border-slate-600 text-white ${errors.location ? "border-red-500" : ""}`}
          />
          {errors.location && <p className="text-red-400 text-sm">{errors.location}</p>}
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
            value={formData.maxAttendees}
            onChange={(e) => handleInputChange("maxAttendees", e.target.value)}
            placeholder="e.g., 50"
            className={`bg-slate-700 border-slate-600 text-white ${errors.maxAttendees ? "border-red-500" : ""}`}
          />
          {errors.maxAttendees && <p className="text-red-400 text-sm">{errors.maxAttendees}</p>}
        </div>

        <div className="space-y-2 col-span-3">
          <Label htmlFor="status" className="text-slate-300">
            Status
          </Label>
          <Select value={formData.status} onValueChange={(value) => handleInputChange("status", value)}>
            <SelectTrigger className="bg-slate-700 border-slate-600 text-white mb-0">
              <SelectValue />
            </SelectTrigger>
            <SelectContent className="bg-slate-700 border-slate-600">
              <SelectItem value="draft" className="text-white hover:bg-slate-600">
                Draft
              </SelectItem>
              <SelectItem value="published" className="text-white hover:bg-slate-600">
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
              Create Event
            </Button>
          </div>
        </div>
      </div>
    </form>
  )
}