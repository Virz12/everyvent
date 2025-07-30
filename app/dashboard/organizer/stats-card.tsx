import { Card, CardContent } from "@/components/ui/card"
import { DashboardDataProps } from "@/lib/types"
import { Calendar, Edit, Eye } from "lucide-react"

interface StatsCardProps {
  events: DashboardDataProps;
}

export default function StatsCard({ events }: StatsCardProps) {
  return <>
    <Card className="bg-slate-800 border-slate-700">
      <CardContent className="p-6">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-slate-400 text-sm">Total Events</p>
            <p className="text-2xl font-bold text-white">{events.totalEvents}</p>
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
            <p className="text-2xl font-bold text-white">{events.publishedEvents}</p>
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
            <p className="text-2xl font-bold text-white">{events.draftEvents}</p>
          </div>
          <Edit className="h-8 w-8 text-yellow-500" />
        </div>
      </CardContent>
    </Card>
  </>
}