import { Card, CardContent } from "@/components/ui/card"
import { Calendar, Edit, Eye, Users } from "lucide-react"

interface StatsCardProps {
  events: Array<{
    id: number;
    status: string;
    attendees: number
  }>
}

export default function StatsCard({ events }: StatsCardProps) {
  const totalAttendees = events.reduce((sum, event) => sum + event.attendees, 0)
  const publishedEvents = events.filter((event) => event.status === "published").length
  const draftEvents = events.filter((event) => event.status === "draft").length

  return <>
    <Card className="bg-slate-800 border-slate-700">
      <CardContent className="p-6">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-slate-400 text-sm">Total Events</p>
            <p className="text-2xl font-bold text-white">{events.length}</p>
          </div>
          <Calendar className="h-8 w-8 text-orange-500" />
        </div>
      </CardContent>
    </Card>

    <Card className="bg-slate-800 border-slate-700">
      <CardContent className="p-6">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-slate-400 text-sm">Published</p>
            <p className="text-2xl font-bold text-white">{publishedEvents}</p>
          </div>
          <Eye className="h-8 w-8 text-green-500" />
        </div>
      </CardContent>
    </Card>

    <Card className="bg-slate-800 border-slate-700">
      <CardContent className="p-6">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-slate-400 text-sm">Drafts</p>
            <p className="text-2xl font-bold text-white">{draftEvents}</p>
          </div>
          <Edit className="h-8 w-8 text-yellow-500" />
        </div>
      </CardContent>
    </Card>

    <Card className="bg-slate-800 border-slate-700">
      <CardContent className="p-6">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-slate-400 text-sm">Total Attendees</p>
            <p className="text-2xl font-bold text-white">{totalAttendees}</p>
          </div>
          <Users className="h-8 w-8 text-blue-500" />
        </div>
      </CardContent>
    </Card>
  </>
}