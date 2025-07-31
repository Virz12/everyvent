"use client"

import { useState, useEffect } from "react"
import EventCard from "./event-card"
import { Button } from "./ui/button"
import Link from "next/link"
import { getPreviewEvents } from "@/lib/actions/event"
import { EventType } from "@/lib/types"
import { Loading } from "./loading"

export function EventsGrid() {
  const [isLoading, setIsLoading] = useState(true)
  const [data, setData] = useState<EventType[] | null>(null);

  useEffect(() => {
    async function fetchEvent() {
      const response = await getPreviewEvents();
      setData(response);
      setIsLoading(false);
    }

    fetchEvent();
  }, [])

  if (isLoading) {
    return <Loading />
  }

  return (
    <section className="bg-slate-900 py-20 px-4 lg:px-6">
      <div className="container mx-auto">
        <div className="mt-12 grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {data && data.map((event) => (
            <EventCard
              key={event.id}
              event={event}
            />
          ))}
        </div>

        {/* Redirect to events page */}
        {data && data.length !== 0 && <div className="flex justify-center mt-8">
          <Link href="/events">
            <Button size={'lg'} className="bg-orange-500 hover:bg-orange-600 text-white cursor-pointer">
              Explore more
            </Button>
          </Link>
        </div>}

        {data && data.length === 0 && (
          <div className="text-center py-12">
            <div className="text-slate-400 text-lg">No events found</div>
            <p className="text-slate-500 mt-2">Please check back later</p>
          </div>
        )}
      </div>
    </section >
  )
}
