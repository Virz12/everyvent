"use client"

import { useState, use } from "react";
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Separator } from "@/components/ui/separator"
import { Calendar, MapPin, Users, Clock, ArrowLeft, Mail, Phone } from "lucide-react"
import Link from "next/link"
import clsx from "clsx";

// Extended events data - in a real app this would come from an API
const allEvents = [
  {
    id: 1,
    title: "Strategy Workshop",
    category: "team-building",
    date: "2024-12-15",
    time: "2:00 PM",
    duration: "2-4 hours",
    location: "San Francisco, CA",
    venue: "TechHub Conference Center",
    address: "123 Innovation Drive, San Francisco, CA 94105",
    price: 0,
    rating: 4.8,
    attendees: 24,
    maxAttendees: 30,
    image: "https://placehold.co/800x400",
    featured: true,
    description:
      "Join us for an intensive strategy workshop designed to help teams align on goals, identify opportunities, and create actionable plans for success. This interactive session will cover strategic planning methodologies, competitive analysis, and implementation frameworks.",
    organizer: {
      name: "TechCorp Events",
      avatar: "/placeholder.svg?height=100&width=100",
      bio: "Leading provider of corporate training and team building events in the Bay Area.",
      email: "events@techcorp.com",
      phone: "+1 (555) 123-4567",
      website: "www.techcorp-events.com",
    },
    tags: ["Strategy", "Planning", "Leadership", "Team Building"],
    agenda: [
      { time: "2:00 PM", activity: "Welcome & Introductions" },
      { time: "2:15 PM", activity: "Strategic Planning Framework Overview" },
      { time: "3:00 PM", activity: "Hands-on Workshop: Goal Setting" },
      { time: "3:45 PM", activity: "Break" },
      { time: "4:00 PM", activity: "Implementation Planning" },
      { time: "4:45 PM", activity: "Q&A and Wrap-up" },
    ],
  },
  {
    id: 2,
    title: "Synergy Session: Team Building",
    category: "team-building",
    date: "2024-12-18",
    time: "6:00 PM",
    duration: "3-4 hours",
    location: "San Francisco, CA",
    venue: "Synergy Center",
    address: "456 Collaboration Ave, San Francisco, CA 94107",
    price: 0,
    rating: 4.9,
    attendees: 156,
    maxAttendees: 200,
    image: "https://placehold.co/800x400",
    description: "Build stronger team connections through collaborative activities and trust-building exercises.",
    fullDescription:
      "Our Synergy Session is designed to strengthen team bonds and improve collaboration through engaging activities and exercises. This event focuses on communication, trust-building, and creating a positive team dynamic that translates to better workplace performance.\n\nActivities include:\n• Trust-building exercises\n• Communication workshops\n• Problem-solving challenges\n• Team bonding activities\n• Reflection and goal-setting sessions\n\nPerfect for teams looking to improve their working relationships and overall effectiveness.",
    organizer: {
      name: "Team Dynamics Inc",
      avatar: "/placeholder.svg?height=100&width=100",
      bio: "Specialists in team building and organizational development with over 10 years of experience.",
      email: "info@teamdynamics.com",
      phone: "+1 (555) 987-6543",
      website: "www.teamdynamics.com",
    },
    tags: ["Team Building", "Communication", "Trust", "Collaboration"],
    agenda: [
      { time: "6:00 PM", activity: "Welcome Reception" },
      { time: "6:30 PM", activity: "Icebreaker Activities" },
      { time: "7:15 PM", activity: "Trust Building Exercises" },
      { time: "8:00 PM", activity: "Dinner Break" },
      { time: "8:45 PM", activity: "Collaborative Challenges" },
      { time: "9:30 PM", activity: "Reflection & Closing" },
    ],
  },
]

interface EventDetailPageProps {
  params: Promise<{
    id: string
  }>
}

export default function EventDetailPage(props: EventDetailPageProps) {
  const params = use(props.params);
  const [isRegistered, setIsRegistered] = useState(false)
  const [isFavorited, setIsFavorited] = useState(false)

  // Find the event by ID
  const { id } = params
  const event = allEvents.find((e) => e.id === Number.parseInt(id))

  if (!event) {
    return (
      <div className="min-h-screen bg-slate-900">
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

  const formatDate = (dateString: string) => {
    const date = new Date(dateString)
    return date.toLocaleDateString("en-US", {
      weekday: "long",
      year: "numeric",
      month: "long",
      day: "numeric",
    })
  }

  const getDaysUntilEvent = (dateString: string) => {
    const eventDate = new Date(dateString)
    const today = new Date()
    const diffTime = eventDate.getTime() - today.getTime()
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24))

    if (diffDays === 0) return "Today"
    if (diffDays === 1) return "Tomorrow"
    if (diffDays > 0) return `${diffDays} days away`
    return "Past event"
  }

  const handleRegister = () => {
    setIsRegistered(!isRegistered)
  }

  const handleFavorite = () => {
    setIsFavorited(!isFavorited)
  }

  // const handleShare = () => {
  //   if (navigator.share) {
  //     navigator.share({
  //       title: event.title,
  //       text: event.description,
  //       url: window.location.href,
  //     })
  //   } else {
  //     // Fallback: copy to clipboard
  //     navigator.clipboard.writeText(window.location.href)
  //   }
  // }

  return (
    <div className="min-h-screen bg-slate-900">

      {/* Back Navigation */}
      <div className="container mx-auto px-4 py-4">
        <Link href="/events" className="inline-flex items-center text-slate-300 hover:text-white transition-colors">
          <ArrowLeft className="h-4 w-4 mr-2" />
          Back to Events
        </Link>
      </div>

      <div className="container mx-auto px-4 py-8">
        <div className="grid lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-8">
            {/* Hero Image and Basic Info */}
            <Card className="bg-slate-800 border-slate-700 overflow-hidden">
              <div className="relative">
                <img
                  src={event.image || "https://placehold.co/800x400"}
                  alt={event.title}
                  className="w-full h-64 md:h-80 object-cover"
                />
                <div className="absolute top-4 left-4">
                  <Badge className="bg-orange-500 text-white">{getDaysUntilEvent(event.date)}</Badge>
                </div>
              </div>

              <CardContent className="p-6">
                <div className="space-y-4">
                  <div className="flex items-start justify-between">
                    <div className="space-y-2">
                      <div className="flex items-center space-x-2">
                        <Badge variant="secondary" className="bg-slate-700 text-slate-300">
                          {event.category.replace("-", " ").toUpperCase()}
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
                        <div className="font-medium">{formatDate(event.date)}</div>
                        <div className="text-sm text-slate-400">at {event.time}</div>
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
                        <div className="text-sm text-slate-400">{event.maxAttendees - event.attendees} spots left</div>
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
                    <AvatarImage src={event.organizer?.avatar} alt={event.organizer.name} />
                    <AvatarFallback className="bg-slate-700 text-white">
                      {event.organizer.name
                        .split(" ")
                        .map((n) => n[0])
                        .join("")}
                    </AvatarFallback>
                  </Avatar>
                  <div className="flex-1">
                    <h3 className="text-lg font-medium text-white">{event.organizer.name}</h3>
                    <p className="text-slate-300 mb-4">{event.organizer.bio}</p>
                    <div className="space-y-2 text-sm">
                      <div className="flex items-center space-x-2 text-slate-400">
                        <Mail className="h-4 w-4" />
                        <span>{event.organizer.email}</span>
                      </div>
                      <div className="flex items-center space-x-2 text-slate-400">
                        <Phone className="h-4 w-4" />
                        <span>{event.organizer.phone}</span>
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
                    className={clsx('w-full cursor-pointer text-white', {
                      "bg-green-600 hover:bg-green-700": isRegistered,
                      "bg-orange-500 hover:bg-orange-600": !isRegistered,
                    })}
                  >
                    {isRegistered ? "Registered ✓" : "Register Now"}
                  </Button>

                  <div className="text-xs text-slate-400">{event.maxAttendees - event.attendees} spots remaining</div>
                </div>

                <Separator className="my-6 bg-slate-700" />

                <div className="space-y-3 text-sm">
                  <div className="flex justify-between">
                    <span className="text-slate-400">Date</span>
                    <span className="text-white">{formatDate(event.date)}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-slate-400">Time</span>
                    <span className="text-white">{event.time}</span>
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
