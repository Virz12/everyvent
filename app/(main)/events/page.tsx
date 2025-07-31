'use client'

import { useEffect, useState } from "react"
import { Button } from "@/components/ui/button"
import { EventsFilter } from "@/components/events-filter"
import EventCard from "@/components/event-card"
import SearchBar from "./search-bar"
import Pagination from "./pagination"
import { getEvents } from "@/lib/actions/event"
import { EventListType } from "@/lib/types"
import { Loading } from "@/components/loading"

export default function EventsListPage() {
  const [isLoading, setIsLoading] = useState(true)

  const [activeCategory, setActiveCategory] = useState("")
  const [currentPage, setCurrentPage] = useState(1)

  const [searchQuery, setSearchQuery] = useState("")

  const [data, setData] = useState<EventListType>({} as EventListType);

  const fetchData = async ({
    q = searchQuery,
    c = activeCategory,
    p = currentPage,
  } = {}) => {
    const result = await getEvents({
      query: q,
      category: c,
      page: p,
    });
    setData(result);
    setIsLoading(false)
  };

  useEffect(() => {
    fetchData();
  }, [searchQuery, activeCategory, currentPage]);

  if (isLoading) {
    return <Loading />
  }

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
          <SearchBar onDebouncedChange={(val) => {
            setSearchQuery((prev) => {
              if (prev !== val) {
                setCurrentPage(1);
              }
              return val;
            });
          }} />

          <EventsFilter
            onCategoryChange={(category) => {
              setActiveCategory(category)
              setCurrentPage(1)
            }}
            activeCategory={activeCategory}
          />

          {/* Results Summary */}
          <div className="mt-8 mb-6">
            <p className="text-slate-300">
              Showing {data.events.length} of {data.total} events
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
            {data.events?.map((event) => (
              <EventCard key={event.id} event={event} />
            ))}
          </div>

          {/* Pagination */}
          {data.totalPages > 1 && (
            <Pagination currentPage={currentPage} totalPages={data.totalPages} setCurrentPage={setCurrentPage} />
          )}

          {/* No Results */}
          {data.events.length === 0 && (
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