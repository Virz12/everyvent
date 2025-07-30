import { Calendar, MapPin, Users } from "lucide-react"
import { Badge } from "./ui/badge"
import { Card, CardContent } from "./ui/card"
import { Button } from "./ui/button"
import Link from "next/link"
import { EventType } from "@/lib/types"
import { format } from "date-fns"

interface EventCardProps {
  event: EventType
}

export default function EventCard({ event }: EventCardProps) {
  const date = format(event.dateTime, 'MMMM dd, yyyy')
  const time = format(event.dateTime, 'HH:mm')

  return (
    <Card
      key={event.id}
      className="bg-slate-800 border-slate-700 overflow-hidden hover:scale-[1.02] transition-all"
    >
      <div className="relative">
        <img
          src={"https://placehold.co/300x200"}
          alt={event.title}
          className="object-cover w-full h-48"
        />
      </div>

      <CardContent className="p-6">
        <div className="space-y-4">
          <div className="flex items-start justify-between">
            <div className="space-y-2">
              <div className="flex items-center space-x-2">
                <Badge variant="secondary" className="bg-slate-700 text-slate-300 capitalize">
                  {event?.category.replace('_', ' ').toLowerCase()}
                </Badge>
                <Badge variant="secondary" className="bg-slate-700 text-slate-300 text-xs">
                  {event.duration}
                </Badge>
              </div>
              <div>
                <h3 className="text-white font-semibold text-lg leading-tight">{event.title}</h3>
                <span className="text-slate-400 text-sm">by {event.organizerName}</span>
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
                {event._count.attendeesList}/{event.max_attendees} attending
              </span>
            </div>
          </div>

          <div className="flex items-center justify-between pt-4">
            <span className="text-white font-semibold text-lg">Free</span>
            <Link href={`/events/${event.id}`}>
              <Button size="sm" className="bg-orange-500 hover:bg-orange-600 text-white cursor-pointer">
                View Details
              </Button>
            </Link>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}