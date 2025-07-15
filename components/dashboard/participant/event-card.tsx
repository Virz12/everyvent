import { Calendar, MapPin } from "lucide-react"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import Link from "next/link"

interface EventCardProps {
  event: {
    id: number
    title: string
    category: string
    date: string
    time: string
    duration: string
    location: string
    organizer: string
    image: string
    description: string
  }
}

export default function EventCard({ event }: EventCardProps) {
  const formatDate = (dateString: string) => {
    const date = new Date(dateString)
    return date.toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
      year: "numeric",
    })
  }

  const getDaysUntilEvent = (dateString: string) => {
    const eventDate = new Date(dateString)
    const today = new Date()
    const diffTime = eventDate.getTime() - today.getTime()
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24))

    if (diffDays === 0) return "Today"
    if (diffDays === 1) return "Tomorrow"
    if (diffDays > 0) return `${diffDays} days`
    return "Past event"
  }

  return (
    <Card
      className="bg-slate-800 border-slate-700 overflow-hidden transition-all"
    >
      <div className="relative">
        <img
          src={event.image || "https://placehold.co/300x200"}
          alt={event.title}
          className="object-cover w-full h-48"
        />
      </div>

      <CardContent className="p-6">
        <div className="space-y-4">
          <div className="flex items-start justify-between">
            <div className="space-y-2">
              <div className="flex items-center space-x-2">
                <Badge variant="secondary" className="bg-slate-700 text-slate-300 text-xs">
                  {event.duration}
                </Badge>
                <span className="text-slate-400 text-xs">{getDaysUntilEvent(event.date)}</span>
              </div>
              <div>
                <h3 className="text-white font-semibold text-lg leading-tight">{event.title}</h3>
                <span className="text-slate-400 text-sm">By {event.organizer}</span>
              </div>
            </div>
          </div>

          <div className="space-y-2 text-sm text-slate-300">
            <div className="flex items-center space-x-2">
              <Calendar className="h-4 w-4 text-orange-500" />
              <span>
                {formatDate(event.date)} at {event.time}
              </span>
            </div>
            <div className="flex items-center space-x-2">
              <MapPin className="h-4 w-4 text-orange-500" />
              <span>{event.location}</span>
            </div>
          </div>

          <div className="pt-4">
            <Link href={`/events/${event.id}`}>
              <Button size="sm" className="bg-orange-500 hover:bg-orange-600 text-white w-full cursor-pointer">
                View Details
              </Button>
            </Link>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}