"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Search, Filter, Download, Mail, Phone, Calendar, MapPin, Users } from "lucide-react"

// Mock attendees data
const mockAttendees = [
  {
    id: 1,
    name: "Alice Johnson",
    email: "alice.johnson@email.com",
    phone: "+1 (555) 123-4567",
    avatar: "https://placehold.co/40x40",
    eventTitle: "Strategy Workshop",
    eventDate: "2024-12-15",
    registrationDate: "2024-11-20",
    status: "confirmed",
  },
  {
    id: 2,
    name: "Bob Smith",
    email: "bob.smith@email.com",
    phone: "+1 (555) 234-5678",
    avatar: "https://placehold.co/40x40",
    eventTitle: "Strategy Workshop",
    eventDate: "2024-12-15",
    registrationDate: "2024-11-18",
    status: "confirmed",
  },
  {
    id: 3,
    name: "Carol Davis",
    email: "carol.davis@email.com",
    phone: "+1 (555) 345-6789",
    avatar: "https://placehold.co/40x40",
    eventTitle: "Leadership Summit",
    eventDate: "2024-12-25",
    registrationDate: "2024-11-15",
    status: "confirmed",
  },
  {
    id: 4,
    name: "David Wilson",
    email: "david.wilson@email.com",
    phone: "+1 (555) 456-7890",
    avatar: "https://placehold.co/40x40",
    eventTitle: "Team Building Workshop",
    eventDate: "2024-12-20",
    registrationDate: "2024-11-22",
    status: "pending",
  },
  {
    id: 5,
    name: "Emma Brown",
    email: "emma.brown@email.com",
    phone: "+1 (555) 567-8901",
    avatar: "https://placehold.co/40x40",
    eventTitle: "Leadership Summit",
    eventDate: "2024-12-25",
    registrationDate: "2024-11-10",
    status: "confirmed",
  },
  {
    id: 6,
    name: "Frank Miller",
    email: "frank.miller@email.com",
    phone: "+1 (555) 678-9012",
    avatar: "https://placehold.co/40x40",
    eventTitle: "Strategy Workshop",
    eventDate: "2024-12-15",
    registrationDate: "2024-11-25",
    status: "cancelled",
  },
]

// Mock events for filter
const mockEvents = [
  { id: 1, title: "Strategy Workshop", attendees: 24 },
  { id: 2, title: "Team Building Workshop", attendees: 15 },
  { id: 3, title: "Leadership Summit", attendees: 45 },
]

export function AttendeesPage() {
  const [attendees] = useState(mockAttendees)
  const [searchQuery, setSearchQuery] = useState("")
  const [selectedEvent, setSelectedEvent] = useState("all")
  const [selectedStatus, setSelectedStatus] = useState("all")

  const getStatusColor = (status: string) => {
    switch (status) {
      case "confirmed":
        return "bg-green-500"
      case "pending":
        return "bg-yellow-500"
      case "cancelled":
        return "bg-red-500"
      default:
        return "bg-gray-500"
    }
  }

  const formatDate = (dateString: string) => {
    const date = new Date(dateString)
    return date.toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
      year: "numeric",
    })
  }

  const filteredAttendees = attendees.filter((attendee) => {
    const matchesSearch =
      attendee.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      attendee.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
      attendee.eventTitle.toLowerCase().includes(searchQuery.toLowerCase())

    const matchesEvent = selectedEvent === "all" || attendee.eventTitle === selectedEvent
    const matchesStatus = selectedStatus === "all" || attendee.status === selectedStatus

    return matchesSearch && matchesEvent && matchesStatus
  })

  const totalAttendees = attendees.length
  const confirmedAttendees = attendees.filter((a) => a.status === "confirmed").length
  const pendingAttendees = attendees.filter((a) => a.status === "pending").length
  const cancelledAttendees = attendees.filter((a) => a.status === "cancelled").length

  return (
    <div className="min-h-screen bg-slate-900">
      <div className="bg-slate-800 py-8 px-4 lg:px-6 border-b border-slate-700">
        <div className="container mx-auto">
          <div className="flex flex-col md:flex-row justify-between md:items-center lg:items-center gap-4">
            <div>
              <h1 className="text-3xl lg:text-4xl font-bold text-white mb-2">Attendees</h1>
              <p className="text-slate-300">Manage event attendees and registrations</p>
            </div>
            <Button className="w-full md:w-auto bg-orange-500 hover:bg-orange-600 text-white cursor-pointer">
              <Download className="h-4 w-4 mr-2" />
              Export Data
            </Button>
          </div>
        </div>
      </div>

      <div className="py-8 px-4 lg:px-6">
        <div className="container mx-auto space-y-8">
          {/* Stats Cards */}
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
            <Card className="bg-slate-800 border-slate-700 pb-0">
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-slate-400 text-sm">Total Attendees</p>
                    <p className="text-2xl font-bold text-white">{totalAttendees}</p>
                  </div>
                  <Users className="h-8 w-8 text-orange-500" />
                </div>
              </CardContent>
            </Card>

            <Card className="bg-slate-800 border-slate-700 pb-0">
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-slate-400 text-sm">Confirmed</p>
                    <p className="text-2xl font-bold text-white">{confirmedAttendees}</p>
                  </div>
                  <div className="h-8 w-8 bg-green-500 rounded-full flex items-center justify-center">
                    <span className="text-white text-sm font-bold">✓</span>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="bg-slate-800 border-slate-700 pb-0">
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-slate-400 text-sm">Pending</p>
                    <p className="text-2xl font-bold text-white">{pendingAttendees}</p>
                  </div>
                  <div className="h-8 w-8 bg-yellow-500 rounded-full flex items-center justify-center">
                    <span className="text-white text-sm font-bold">⏳</span>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="bg-slate-800 border-slate-700 pb-0">
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-slate-400 text-sm">Cancelled</p>
                    <p className="text-2xl font-bold text-white">{cancelledAttendees}</p>
                  </div>
                  <div className="h-8 w-8 bg-red-500 rounded-full flex items-center justify-center">
                    <span className="text-white text-sm font-bold">✕</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Filters */}
          <Card className="bg-slate-800 border-slate-700 pb-0">
            <CardContent className="p-6">
              <div className="flex flex-col md:flex-row gap-4">
                <div className="flex-1">
                  <div className="relative">
                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-400 h-4 w-4" />
                    <Input
                      placeholder="Search attendees by name, email, or event..."
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      className="pl-10 bg-slate-700 border-slate-600 text-white placeholder:text-slate-400"
                    />
                  </div>
                </div>
                <div className="flex gap-4">
                  <Select value={selectedEvent} onValueChange={setSelectedEvent}>
                    <SelectTrigger className="w-48 bg-slate-700 border-slate-600 text-white">
                      <Filter className="h-4 w-4 mr-2" />
                      <SelectValue placeholder="Filter by event" />
                    </SelectTrigger>
                    <SelectContent className="bg-slate-700 border-slate-600">
                      <SelectItem value="all" className="text-white hover:bg-slate-600">
                        All Events
                      </SelectItem>
                      {mockEvents.map((event) => (
                        <SelectItem key={event.id} value={event.title} className="text-white hover:bg-slate-600">
                          {event.title}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>

                  <Select value={selectedStatus} onValueChange={setSelectedStatus}>
                    <SelectTrigger className="w-40 bg-slate-700 border-slate-600 text-white">
                      <SelectValue placeholder="Status" />
                    </SelectTrigger>
                    <SelectContent className="bg-slate-700 border-slate-600">
                      <SelectItem value="all" className="text-white hover:bg-slate-600">
                        All Status
                      </SelectItem>
                      <SelectItem value="confirmed" className="text-white hover:bg-slate-600">
                        Confirmed
                      </SelectItem>
                      <SelectItem value="pending" className="text-white hover:bg-slate-600">
                        Pending
                      </SelectItem>
                      <SelectItem value="cancelled" className="text-white hover:bg-slate-600">
                        Cancelled
                      </SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Attendees List */}
          <Card className="bg-slate-800 border-slate-700">
            <CardHeader>
              <CardTitle className="text-white space-y-1.5 pt-6">
                <span className="text-2xl tracking-tight">Attendees ({filteredAttendees.length})</span>
                {searchQuery && <span className="text-slate-400 font-normal text-base ml-2">for "{searchQuery}"</span>}
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {filteredAttendees.map((attendee) => (
                  <div key={attendee.id} className="flex items-start sm:items-center justify-between p-4 bg-slate-700 rounded-lg">
                    <div className="flex items-center space-x-4">
                      <Avatar className="h-12 w-12">
                        <AvatarImage src={attendee.avatar || "/placehold.co/40x40"} alt={attendee.name} />
                        <AvatarFallback className="bg-orange-500 text-white">
                          {attendee.name
                            .split(" ")
                            .map((n) => n[0])
                            .join("")}
                        </AvatarFallback>
                      </Avatar>
                      <div>
                        <h3 className="text-white font-medium mb-1">{attendee.name}</h3>
                        <div className="grid grid-cols-1 sm:grid-cols-2 space-x-4 text-sm text-slate-400 wrap-break-word">
                          <div className="flex items-center space-x-1">
                            <Mail className="h-3 w-3" />
                            <span>{attendee.email}</span>
                          </div>
                          <div className="flex items-center space-x-1">
                            <Phone className="h-3 w-3" />
                            <span>{attendee.phone}</span>
                          </div>
                        </div>
                        <div className="grid grid-cols-1 sm:grid-cols-2 space-x-4 text-sm text-slate-400 wrap-break-word">
                          <div className="flex items-center space-x-1">
                            <Calendar className="h-3 w-3" />
                            <span>{attendee.eventTitle}</span>
                          </div>
                          <div className="flex items-center space-x-1">
                            <MapPin className="h-3 w-3" />
                            <span>Registered {formatDate(attendee.registrationDate)}</span>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="flex items-center space-x-3 mt-0.5">
                      <Badge className={`${getStatusColor(attendee.status)} text-white`}>{attendee.status}</Badge>
                    </div>
                  </div>
                ))}
              </div>

              {filteredAttendees.length === 0 && (
                <div className="text-center py-12">
                  <Users className="h-16 w-16 text-slate-600 mx-auto mb-4" />
                  <h3 className="text-xl font-semibold text-white mb-2">No attendees found</h3>
                  <p className="text-slate-400">
                    {searchQuery || selectedEvent !== "all" || selectedStatus !== "all"
                      ? "Try adjusting your search criteria or filters"
                      : "No attendees have registered for your events yet"}
                  </p>
                </div>
              )}
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
