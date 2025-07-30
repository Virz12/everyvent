import { Calendar, Edit, MapPin, Trash2, Users } from "lucide-react"
import { Badge } from "../../ui/badge"
import { Card, CardContent } from "../../ui/card"
import { Button } from "../../ui/button"
import { EventType } from "@/lib/types"
import { format } from "date-fns"

interface EventCardType {
  event: EventType
  onEditClick: () => void
  onDeleteClick: () => void
}

export default function EventCard({ event, onEditClick, onDeleteClick }: EventCardType) {
  const date = format(event.dateTime, 'MMMM dd, yyyy')
  const time = format(event.dateTime, 'HH:mm')

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

  return (
    <Card key={event.id} className="bg-slate-800 border-slate-700">
      <div className="relative">
        <img
          src={"https://placehold.co/300x200"}
          alt={event.title}
          className="w-full h-48 object-cover rounded-t-lg"
        />
        <Badge className={`absolute top-3 right-3 ${getStatusColor(event.status.toLowerCase())} text-white capitalize`}>
          {event.status.toLowerCase()}
        </Badge>
      </div>

      <CardContent className="p-6">
        <div className="space-y-4">
          <div className="flex items-start justify-between">
            <div className="space-y-2">
              <div className="flex items-center space-x-2">
                <Badge variant="secondary" className="bg-slate-700 text-slate-300 text-xs">
                  {event.duration}
                </Badge>
              </div>

              <div>
                <h3 className="text-white font-semibold text-lg mb-2">{event.title}</h3>
                <p className="text-slate-400 text-sm line-clamp-2">{event.description}</p>
              </div>
            </div>
          </div>

          <div className="space-y-2 text-sm text-slate-300">
            <div className="flex items-center space-x-2">
              <Calendar className="h-4 w-4 text-orange-500" />
              <span>
                {date} at {time}
              </span>
            </div>
            <div className="flex items-center space-x-2">
              <MapPin className="h-4 w-4 text-orange-500" />
              <span>{event.location}</span>
            </div>
            <div className="flex items-center space-x-2">
              <Users className="h-4 w-4 text-orange-500" />
              <span>
                {event._count.attendeesList}/{event.max_attendees} attendees
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