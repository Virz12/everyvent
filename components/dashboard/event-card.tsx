import { Calendar, Edit, Trash2, Users } from "lucide-react"
import { Badge } from "../ui/badge"
import { Card, CardContent } from "../ui/card"
import { Button } from "../ui/button"

interface EventCardType {
  event: {
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
  },
  onEditClick: () => void
  onDeleteClick: () => void
}

export default function EventCard({ event, onEditClick, onDeleteClick }: EventCardType) {
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
              onClick={onEditClick}
              className="flex-1 border-slate-600 text-slate-300 hover:bg-slate-700 cursor-pointer"
            >
              <Edit className="h-4 w-4 mr-1" />
              Edit
            </Button>
            <Button
              size="sm"
              variant="outline"
              onClick={onDeleteClick}
              className="text-red-400 hover:text-red-300 cursor-pointer"
            >
              <Trash2 className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}