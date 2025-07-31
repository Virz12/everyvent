'use client'

import { getDashboardData } from "@/lib/actions/organizer";
import RecentEvents from "./recent-event"
import StatsCard from "./stats-card"
import { useSession } from "next-auth/react"
import { useEffect, useState } from "react";
import { DashboardDataProps } from "@/lib/types";
import { Loading } from "@/components/loading";

export default function DashboardContent() {
  const [isLoading, setIsLoading] = useState(true);
  const [data, setData] = useState<DashboardDataProps | null>(null);
  const { data: session } = useSession();

  useEffect(() => {
    async function fetchEvent() {
      const response = await getDashboardData();
      setData(response);
      setIsLoading(false);
    }

    fetchEvent();
  }, [])

  if (isLoading) {
    return <Loading />
  }

  return (
    <div className="min-h-screen bg-slate-900">
      <div className="bg-slate-800 py-8 px-4 lg:px-6 border-b border-slate-700">
        <div className="container mx-auto">
          <div>
            <h1 className="text-3xl lg:text-4xl font-bold text-white mb-2">Welcome back, {session?.user?.name}</h1>
            <p className="text-slate-300 capitalize">{session?.user?.role?.toLowerCase()} • Dashboard</p>
          </div>
        </div>
      </div>

      <div className="py-8 px-4 lg:px-6">
        <div className="container mx-auto space-y-8">
          {/* Stats Cards */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {data && <StatsCard events={data} />}
          </div>

          {/* Recent Events */}
          {data && <RecentEvents events={data} />}
        </div>
      </div>
    </div>
  )
}