'use client'

import { useState, useMemo } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Search } from "lucide-react"
import { EventsFilter } from "@/components/events-filter"
import EventCard from "@/components/event-card"

// Extended events data with more variety
const allEvents = [
  {
    id: 1,
    title: "Strategy Workshop",
    category: "team-building",
    date: "2024-12-15",
    time: "2:00 PM",
    duration: "2-4 hours",
    location: "San Francisco, CA",
    price: 250,
    rating: 4.8,
    attendees: 24,
    maxAttendees: 30,
    image: "https://placehold.co/300x200",
    featured: true,
    description: "Interactive strategy planning session for teams",
    organizer: "TechCorp Events",
  },
  {
    id: 21,
    title: "Strategy Workshop",
    category: "team-building",
    date: "2024-12-15",
    time: "2:00 PM",
    duration: "2-4 hours",
    location: "San Francisco, CA",
    price: 250,
    rating: 4.8,
    attendees: 24,
    maxAttendees: 30,
    image: "https://placehold.co/300x200",
    featured: true,
    description: "Interactive strategy planning session for teams",
    organizer: "TechCorp Events",
  },
  {
    id: 31,
    title: "Strategy Workshop",
    category: "team-building",
    date: "2024-12-15",
    time: "2:00 PM",
    duration: "2-4 hours",
    location: "San Francisco, CA",
    price: 250,
    rating: 4.8,
    attendees: 24,
    maxAttendees: 30,
    image: "https://placehold.co/300x200",
    featured: true,
    description: "Interactive strategy planning session for teams",
    organizer: "TechCorp Events",
  },
  {
    id: 41,
    title: "Strategy Workshop",
    category: "team-building",
    date: "2024-12-15",
    time: "2:00 PM",
    duration: "2-4 hours",
    location: "San Francisco, CA",
    price: 250,
    rating: 4.8,
    attendees: 24,
    maxAttendees: 30,
    image: "https://placehold.co/300x200",
    featured: true,
    description: "Interactive strategy planning session for teams",
    organizer: "TechCorp Events",
  },
  {
    id: 51,
    title: "Strategy Workshop",
    category: "team-building",
    date: "2024-12-15",
    time: "2:00 PM",
    duration: "2-4 hours",
    location: "San Francisco, CA",
    price: 250,
    rating: 4.8,
    attendees: 24,
    maxAttendees: 30,
    image: "https://placehold.co/300x200",
    featured: true,
    description: "Interactive strategy planning session for teams",
    organizer: "TechCorp Events",
  },
  {
    id: 61,
    title: "Strategy Workshop",
    category: "team-building",
    date: "2024-12-15",
    time: "2:00 PM",
    duration: "2-4 hours",
    location: "San Francisco, CA",
    price: 250,
    rating: 4.8,
    attendees: 24,
    maxAttendees: 30,
    image: "https://placehold.co/300x200",
    featured: true,
    description: "Interactive strategy planning session for teams",
    organizer: "TechCorp Events",
  },
  {
    id: 71,
    title: "Strategy Workshop",
    category: "team-building",
    date: "2024-12-15",
    time: "2:00 PM",
    duration: "2-4 hours",
    location: "San Francisco, CA",
    price: 250,
    rating: 4.8,
    attendees: 24,
    maxAttendees: 30,
    image: "https://placehold.co/300x200",
    featured: true,
    description: "Interactive strategy planning session for teams",
    organizer: "TechCorp Events",
  },
  {
    id: 82,
    title: "Synergy Session: Team Building",
    category: "team-building",
    date: "2024-12-18",
    time: "6:00 PM",
    duration: "3-4 hours",
    location: "San Francisco, CA",
    price: 250,
    rating: 4.9,
    attendees: 156,
    maxAttendees: 200,
    image: "https://placehold.co/300x200",
    description: "Build stronger team connections through collaborative activities",
    organizer: "Team Dynamics Inc",
  },
  {
    id: 93,
    title: "Team Building New Meeting",
    category: "team-building",
    date: "2024-12-20",
    time: "9:00 AM",
    duration: "4-6 hours",
    location: "San Francisco, CA",
    price: 250,
    rating: 4.7,
    attendees: 89,
    maxAttendees: 100,
    image: "https://placehold.co/300x200",
    description: "Innovative team building activities for modern workplaces",
    organizer: "Modern Workplace Solutions",
  },
  {
    id: 4,
    title: "Professional Networking Mixer",
    category: "networking",
    date: "2024-12-22",
    time: "7:00 PM",
    duration: "2-3 hours",
    location: "Seattle, WA",
    price: 25,
    rating: 4.6,
    attendees: 167,
    maxAttendees: 200,
    image: "https://placehold.co/300x200",
    description: "Connect with industry professionals in a relaxed setting",
    organizer: "Seattle Business Network",
  },
  {
    id: 5,
    title: "Tech Networking Happy Hour",
    category: "networking",
    date: "2024-12-23",
    time: "6:30 PM",
    duration: "2-3 hours",
    location: "Austin, TX",
    price: 15,
    rating: 4.5,
    attendees: 89,
    maxAttendees: 120,
    image: "https://placehold.co/300x200",
    description: "Casual networking for tech professionals",
    organizer: "Austin Tech Community",
  },
  {
    id: 6,
    title: "Executive Leadership Retreat",
    category: "executive",
    date: "2024-12-25",
    time: "10:00 AM",
    duration: "2 days",
    location: "Napa Valley, CA",
    price: 800,
    rating: 4.9,
    attendees: 32,
    maxAttendees: 40,
    image: "https://placehold.co/300x200",
    description: "Intensive leadership development for executives",
    organizer: "Executive Excellence Institute",
  },
  {
    id: 7,
    title: "C-Suite Strategy Summit",
    category: "executive",
    date: "2024-12-27",
    time: "9:00 AM",
    duration: "1 day",
    location: "New York, NY",
    price: 1200,
    rating: 4.8,
    attendees: 45,
    maxAttendees: 60,
    image: "https://placehold.co/300x200",
    description: "Strategic planning for senior executives",
    organizer: "Leadership Institute",
  },
  {
    id: 8,
    title: "Company Milestone Celebration",
    category: "milestone",
    date: "2024-12-28",
    time: "6:00 PM",
    duration: "3-4 hours",
    location: "San Francisco, CA",
    price: 150,
    rating: 4.8,
    attendees: 145,
    maxAttendees: 200,
    image: "https://placehold.co/300x200",
    description: "Celebrate company achievements with your team",
    organizer: "Corporate Events Co",
  },
  {
    id: 9,
    title: "10-Year Anniversary Gala",
    category: "milestone",
    date: "2024-12-29",
    time: "7:30 PM",
    duration: "4-5 hours",
    location: "Los Angeles, CA",
    price: 200,
    rating: 4.9,
    attendees: 234,
    maxAttendees: 300,
    image: "https://placehold.co/300x200",
    description: "Elegant celebration of company milestones",
    organizer: "Milestone Events",
  },
  {
    id: 10,
    title: "Holiday Party Extravaganza",
    category: "holiday",
    date: "2024-12-30",
    time: "7:00 PM",
    duration: "4-5 hours",
    location: "Los Angeles, CA",
    price: 75,
    rating: 4.7,
    attendees: 234,
    maxAttendees: 300,
    image: "https://placehold.co/300x200",
    description: "End the year with a festive celebration",
    organizer: "Holiday Celebrations Inc",
  },
  {
    id: 11,
    title: "New Year's Corporate Party",
    category: "holiday",
    date: "2024-12-31",
    time: "8:00 PM",
    duration: "5-6 hours",
    location: "Miami, FL",
    price: 125,
    rating: 4.8,
    attendees: 189,
    maxAttendees: 250,
    image: "https://placehold.co/300x200",
    description: "Ring in the new year with your colleagues",
    organizer: "New Year Events",
  },
  {
    id: 12,
    title: "Mountain Offsite Retreat",
    category: "offsite",
    date: "2025-01-05",
    time: "9:00 AM",
    duration: "3 days",
    location: "Lake Tahoe, CA",
    price: 450,
    rating: 4.9,
    attendees: 56,
    maxAttendees: 80,
    image: "https://placehold.co/300x200",
    description: "Strategic planning retreat in a beautiful mountain setting",
    organizer: "Mountain Retreats Co",
  },
  {
    id: 13,
    title: "Beach Team Retreat",
    category: "offsite",
    date: "2025-01-08",
    time: "10:00 AM",
    duration: "2 days",
    location: "Santa Barbara, CA",
    price: 350,
    rating: 4.6,
    attendees: 67,
    maxAttendees: 100,
    image: "https://placehold.co/300x200",
    description: "Team building by the ocean with strategic sessions",
    organizer: "Coastal Events",
  },
  {
    id: 14,
    title: "Innovation Workshop Series",
    category: "team-building",
    date: "2025-01-10",
    time: "1:00 PM",
    duration: "3-4 hours",
    location: "Boston, MA",
    price: 180,
    rating: 4.7,
    attendees: 78,
    maxAttendees: 100,
    image: "https://placehold.co/300x200",
    description: "Foster innovation and creativity in your team",
    organizer: "Innovation Labs",
  },
  {
    id: 15,
    title: "Women in Tech Networking",
    category: "networking",
    date: "2025-01-12",
    time: "6:00 PM",
    duration: "2-3 hours",
    location: "San Francisco, CA",
    price: 0,
    rating: 4.8,
    attendees: 123,
    maxAttendees: 150,
    image: "https://placehold.co/300x200",
    description: "Empowering women in technology through networking",
    organizer: "Women in Tech SF",
  },
]

interface SearchBarProps {
  searchQuery: string
  setSearchQuery: React.Dispatch<React.SetStateAction<string>>
}

interface PaginationProps {
  currentPage: number
  totalPages: number
  setCurrentPage: React.Dispatch<React.SetStateAction<number>>
}

type SortOption = "popularity" | "date"

export default function EventsListPage() {
  const [activeCategory, setActiveCategory] = useState("team-building")
  const [sortBy, setSortBy] = useState<SortOption>("popularity")
  const [searchQuery, setSearchQuery] = useState("")
  const [currentPage, setCurrentPage] = useState(1)
  const eventsPerPage = 9

  const filteredAndSortedEvents = useMemo(() => {
    let filtered = allEvents

    // Filter by category
    if (activeCategory !== "all") {
      filtered = filtered.filter((event) => event.category === activeCategory)
    }

    // Filter by search query
    if (searchQuery) {
      filtered = filtered.filter(
        (event) =>
          event.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
          event.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
          event.organizer.toLowerCase().includes(searchQuery.toLowerCase()),
      )
    }

    // Sort events
    filtered.sort((a, b) => {
      switch (sortBy) {
        case "popularity":
          return b.attendees - a.attendees
        case "date":
          return new Date(a.date).getTime() - new Date(b.date).getTime()
        default:
          return 0
      }
    })

    return filtered
  }, [activeCategory, sortBy, searchQuery])

  // Pagination
  const totalPages = Math.ceil(filteredAndSortedEvents.length / eventsPerPage)
  const paginatedEvents = filteredAndSortedEvents.slice((currentPage - 1) * eventsPerPage, currentPage * eventsPerPage)

  return (
    <div className="min-h-screen bg-slate-900">
      {/* Hero Section */}
      <section className="bg-slate-900 pt-20 px-4 lg:px-6">
        <div className="container mx-auto text-left">
          <h1 className="text-4xl lg:text-6xl font-bold text-white mb-6">
            Find many
            <br />
            <span className="text-orange-500">Cool Events</span>
          </h1>
          <p className="text-xl text-slate-300 mb-8 max-w-3xl">
            Discover and join amazing events in your area
          </p>
        </div>
      </section>

      <section className="py-12 px-4 lg:px-6">
        <div className="container mx-auto">
          {/* Search Bar */}
          <SearchBar searchQuery={searchQuery} setSearchQuery={setSearchQuery} />

          <EventsFilter
            onCategoryChange={(category) => {
              setActiveCategory(category)
              setCurrentPage(1)
            }}
            onSortChange={setSortBy}
            activeCategory={activeCategory}
            sortBy={sortBy}
          />

          {/* Results Summary */}
          <div className="mt-8 mb-6">
            <p className="text-slate-300">
              Showing {paginatedEvents.length} of {filteredAndSortedEvents.length} events
              {searchQuery && (
                <span>
                  {" "}
                  for "<span className="text-orange-500">{searchQuery}</span>"
                </span>
              )}
            </p>
          </div>

          {/* Event Cards */}
          <div className="mb-12 grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {paginatedEvents.map((event) => (
              <EventCard key={event.id} event={event} />
            ))}
          </div>

          {/* Pagination */}
          {totalPages > 1 && (
            <Pagination currentPage={currentPage} totalPages={totalPages} setCurrentPage={setCurrentPage} />
          )}

          {/* No Results */}
          {filteredAndSortedEvents.length === 0 && (
            <div className="text-center py-12">
              <div className="text-slate-400 text-lg mb-2">No events found</div>
              <p className="text-slate-500">Try adjusting your search criteria or filters</p>
              <Button
                onClick={() => {
                  setSearchQuery("")
                  setActiveCategory("team-building")
                }}
                className="mt-4 bg-orange-500 hover:bg-orange-600 text-white cursor-pointer"
              >
                Clear All Filters
              </Button>
            </div>
          )}
        </div>
      </section>
    </div>
  )
}

export function SearchBar({ searchQuery, setSearchQuery }: SearchBarProps) {
  return (
    <div className="mb-8">
      <div className="relative max-w-2xl">
        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-400 h-4 w-4" />
        <Input
          placeholder="Search events, organizers, or categories..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="pl-10 bg-slate-800 border-slate-700 text-white placeholder:text-slate-400 h-12"
        />
      </div>
    </div>
  )
}

export function Pagination({ currentPage, totalPages, setCurrentPage }: PaginationProps) {
  return (
    <div className="flex justify-center items-center space-x-2">
      <Button
        variant="outline"
        onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
        disabled={currentPage === 1}
        className="border-slate-600 text-slate-300 hover:bg-slate-800 bg-transparent cursor-pointer"
      >
        Previous
      </Button>

      <div className="flex space-x-1">
        {[...Array(totalPages)].map((_, i) => {
          const page = i + 1
          if (page === currentPage || page === 1 || page === totalPages || Math.abs(page - currentPage) <= 1) {
            return (
              <Button
                key={page}
                variant={page === currentPage ? "default" : "outline"}
                onClick={() => setCurrentPage(page)}
                className={
                  page === currentPage
                    ? "bg-orange-500 hover:bg-orange-600 text-white"
                    : "border-slate-600 text-slate-300 hover:bg-slate-800 bg-transparent cursor-pointer"
                }
              >
                {page}
              </Button>
            )
          } else if (page === currentPage - 2 || page === currentPage + 2) {
            return (
              <span key={page} className="text-slate-400 px-2">
                ...
              </span>
            )
          }
          return null
        })}
      </div>

      <Button
        variant="outline"
        onClick={() => setCurrentPage((prev) => Math.min(prev + 1, totalPages))}
        disabled={currentPage === totalPages}
        className="border-slate-600 text-slate-300 hover:bg-slate-800 bg-transparent cursor-pointer"
      >
        Next
      </Button>
    </div>
  )
}