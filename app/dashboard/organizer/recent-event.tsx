import { Badge } from "@/components/ui/badge"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { DashboardDataProps } from "@/lib/types"

interface RecentEventsProps {
  events: DashboardDataProps
}

export default function RecentEvents({ events }: RecentEventsProps) {
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
    <Card className="bg-slate-800 border-slate-700 pb-6">
      <CardHeader>
        <CardTitle className="space-y-1.5 pt-6">
          <h3 className="text-2xl tracking-tight text-white">Recent Events</h3>
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {events.recentEvents.map((event) => (
            <div key={event.id} className="flex items-center justify-between p-4 bg-slate-700 rounded-lg">
              <div className="flex items-center space-x-4">
                <img
                  src={"https://placehold.co/300x200"}
                  alt={event.title}
                  className="w-12 h-12 rounded-lg object-cover"
                />
                <div>
                  <h3 className="text-white font-medium">{event.title}</h3>
                  <p className="text-slate-400 text-sm">
                    {event.date} - {event.time} • {event.attendeeCount}/{event.maxAttendees} attendees
                  </p>
                </div>
              </div>
              <Badge className={`${getStatusColor(event.status)} text-white`}>{event.status}</Badge>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  )
}