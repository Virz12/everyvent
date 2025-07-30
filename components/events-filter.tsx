"use client"

import { Presentation, Lightbulb, BriefcaseBusiness, Handshake, CloudCog, Calendar } from "lucide-react"

interface EventsFilterProps {
  onCategoryChange: (category: string) => void
  activeCategory: string
}

const categories = [
  { id: "", label: "All Events", icon: Calendar },
  { id: "CONFERENCE", label: "Conference", icon: Presentation },
  { id: "WORKSHOP", label: "Workshop", icon: CloudCog },
  { id: "CAREER_FAIR", label: "Career Fair", icon: BriefcaseBusiness },
  { id: "MEETUP", label: "Meetup", icon: Handshake },
  { id: "HACKATHON", label: "Hackathon", icon: Lightbulb },
]

export function EventsFilter({
  onCategoryChange,
  activeCategory,
}: EventsFilterProps) {
  return (
    <div className="space-y-8">
      {/* Category Tabs */}
      <div className="relative">
        <div className="flex overflow-x-auto scrollbar py-4 gap-2 lg:gap-4">
          {categories.map((category) => {
            const Icon = category.icon
            const isActive = activeCategory === category.id

            return (
              <button
                key={category.id}
                onClick={() => onCategoryChange(category.id)}
                className={`relative flex items-center gap-x-2 px-4 py-3 rounded-full transition-all duration-200 cursor-pointer ${isActive
                  ? "bg-slate-800 text-white"
                  : "bg-slate-800/50 text-slate-300 hover:bg-slate-800 hover:text-white"
                  }`}
              >
                <Icon className="h-4 w-4" />
                <span className="text-sm font-medium whitespace-nowrap">{category.label}</span>

                {/* Active indicator */}
                {isActive && (
                  <div className="absolute -bottom-1 left-1/2 transform -translate-x-1/2 w-12 h-0.5 bg-orange-500 rounded-full" />
                )}
              </button>
            )
          })}
        </div>
      </div>

      {/* Sort and View Controls */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div className="flex items-center space-x-4">
          <h2 className="text-2xl lg:text-3xl font-bold text-white capitalize">
            {categories.find((c) => c.id === activeCategory)?.label || "All Events"}
          </h2>
        </div>
      </div>
    </div>
  )
}
