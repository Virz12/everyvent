"use client"

import { useState, use, useEffect } from "react";
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { Separator } from "@/components/ui/separator"
import { Calendar, MapPin, Users, Clock, ArrowLeft, Mail } from "lucide-react"
import Link from "next/link"
import clsx from "clsx";
import { getEvent } from "@/lib/actions/event";
import { format } from "date-fns";
import { EventDetailType } from "@/lib/types";
import { registerEvent } from "@/lib/actions/participant";
import { Loading } from "@/components/loading";

interface EventDetailPageProps {
  params: Promise<{
    id: string
  }>
}

export default function EventDetailPage(props: EventDetailPageProps) {
  const [event, setEvent] = useState<EventDetailType | null>({} as EventDetailType | null);
  const [isLoading, setIsLoading] = useState(true)
  const params = use(props.params);
  const { id } = params
  let date, time;

  useEffect(() => {
    fetchEvent();
  }, [])

  async function fetchEvent() {
    const response = await getEvent(id);
    setEvent(response);
    setIsLoading(false)
  }

  if (isLoading) {
    return <Loading />
  }

  if (!event) {
    return (
      <div className="min-h-[50vh] bg-slate-900">
        <div className="container mx-auto px-4 py-20 text-center">
          <h1 className="text-2xl font-bold text-white mb-4">Event Not Found</h1>
          <p className="text-slate-400 mb-8">The event you're looking for doesn't exist.</p>
          <Link href="/events">
            <Button className="bg-orange-500 hover:bg-orange-600 text-white">
              <ArrowLeft className="h-4 w-4 mr-2" />
              Back to Events
            </Button>
          </Link>
        </div>
      </div>
    )
  }

  const handleRegister = async () => {
    await registerEvent(event.id)
    fetchEvent()
  }

  if (event.dateTime) {
    date = format(event.dateTime, 'MMMM dd, yyyy')
    time = format(event.dateTime, 'HH:mm')
  }

  return (
    <div className="min-h-screen bg-slate-900">

      {/* Back Navigation */}
      <div className="container mx-auto px-4 py-4">
        <span onClick={() => window.history.back()} className="inline-flex items-center text-slate-300 hover:text-white transition-colors cursor-pointer">
          <ArrowLeft className="h-4 w-4 mr-2" />
          Go back
        </span>
      </div>

      <div className="container mx-auto px-4 py-8">
        <div className="grid lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-8">
            {/* Hero Image and Basic Info */}
            <Card className="bg-slate-800 border-slate-700 overflow-hidden">
              <div className="relative">
                <img
                  src={"https://placehold.co/800x400"}
                  alt={event.title}
                  className="w-full h-64 md:h-80 object-cover"
                />
                <div className="absolute top-4 left-4">
                  <Badge className="bg-orange-500 text-white">{date}</Badge>
                </div>
              </div>

              <CardContent className="p-6">
                <div className="space-y-4">
                  <div className="flex items-start justify-between">
                    <div className="space-y-2">
                      <div className="flex items-center space-x-2">
                        <Badge variant="secondary" className="bg-slate-700 text-slate-300 capitalize">
                          {event?.category.replace('_', ' ').toLowerCase()}
                        </Badge>
                        <Badge variant="secondary" className="bg-slate-700 text-slate-300">
                          {event.duration}
                        </Badge>
                      </div>
                      <h1 className="text-2xl md:text-3xl font-bold text-white">{event.title}</h1>
                    </div>
                  </div>

                  {/* Key Details */}
                  <div className="grid md:grid-cols-2 gap-4 text-slate-300">
                    <div className="flex items-center space-x-3">
                      <Calendar className="h-5 w-5 text-orange-500" />
                      <div>
                        <div className="font-medium">{date}</div>
                        <div className="text-sm text-slate-400">at {time}</div>
                      </div>
                    </div>
                    <div className="flex items-center space-x-3">
                      <MapPin className="h-5 w-5 text-orange-500" />
                      <div>
                        <div className="font-medium">{event.location}</div>
                        <div className="text-sm text-slate-400">Location</div>
                      </div>
                    </div>
                    <div className="flex items-center space-x-3">
                      <Users className="h-5 w-5 text-orange-500" />
                      <div>
                        <div className="font-medium">{event.attendees} attending</div>
                        <div className="text-sm text-slate-400">{event.max_attendees - event.attendees} spots left</div>
                      </div>
                    </div>
                    <div className="flex items-center space-x-3">
                      <Clock className="h-5 w-5 text-orange-500" />
                      <div>
                        <div className="font-medium">{event.duration}</div>
                        <div className="text-sm text-slate-400">Duration</div>
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Description */}
            <Card className="bg-slate-800 border-slate-700">
              <CardContent className="p-6">
                <h2 className="text-xl font-semibold text-white mb-4">About This Event</h2>
                <div className="text-slate-300 space-y-4">
                  <p>{event.description}</p>
                </div>
              </CardContent>
            </Card>

            {/* Organizer Info */}
            <Card className="bg-slate-800 border-slate-700">
              <CardContent className="p-6">
                <h2 className="text-xl font-semibold text-white mb-4">Event Organizer</h2>
                <div className="flex items-start space-x-4">
                  <Avatar className="h-16 w-16">
                    <AvatarFallback className="bg-orange-500 text-white">
                      {event?.organizerName?.split(" ")
                        .map((n) => n[0])
                        .join("")}
                    </AvatarFallback>
                  </Avatar>
                  <div className="flex-1">
                    <h3 className="text-lg font-medium text-white">{event.organizerName}</h3>
                    <p className="text-slate-300">{event.organizer?.description}</p>
                    <div className="mt-1 text-sm">
                      <div className="flex items-center text-sm space-x-2 text-slate-400">
                        <Mail className="h-4 w-4" />
                        <span>{event.organizer?.email}</span>
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Sidebar */}
          <div>
            {/* Registration Card */}
            <Card className="bg-slate-800 border-slate-700 sticky top-24">
              <CardContent className="p-6">
                <div className="text-center space-y-4">
                  <div>
                    <div className="text-3xl font-bold text-white">Free</div>
                    <div className="text-slate-400 text-sm">Registration Required</div>
                  </div>

                  <Button
                    onClick={handleRegister}
                    disabled={event.hasJoined}
                    className={clsx('w-full cursor-pointer text-white',
                      event.hasJoined && 'bg-green-600 hover:bg-green-700',
                      !event.hasJoined && 'bg-orange-500 hover:bg-orange-600'
                    )}
                  >
                    {event.hasJoined ? 'Already Joined' : 'Join Event'}
                  </Button>

                  <div className="text-xs text-slate-400">{event.max_attendees - event.attendees} spots remaining</div>
                </div>

                <Separator className="my-6 bg-slate-700" />

                <div className="space-y-3 text-sm">
                  <div className="flex justify-between">
                    <span className="text-slate-400">Date</span>
                    <span className="text-white">{date}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-slate-400">Time</span>
                    <span className="text-white">{time}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-slate-400">Duration</span>
                    <span className="text-white">{event.duration}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-slate-400">Location</span>
                    <span className="text-white text-right">{event.location}</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div >
  )
}
