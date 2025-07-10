"use client"

import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Users, Calendar, MapPin, Star, Heart } from "lucide-react"

type SortOption = "popularity" | "date"

interface EventsFilterProps {
  onCategoryChange: (category: string) => void
  onSortChange: (sort: SortOption) => void
  activeCategory: string
  sortBy: string
}

const categories = [
  { id: "team-building", label: "Team Building", icon: Users },
  { id: "networking", label: "Networking Mixer", icon: Users },
  { id: "executive", label: "Executive Retreat", icon: Star },
  { id: "milestone", label: "Milestone Celebration", icon: Calendar },
  { id: "holiday", label: "Holiday Party", icon: Heart },
  { id: "offsite", label: "Offsite Retreat", icon: MapPin },
]

export function EventsFilter({
  onCategoryChange,
  onSortChange,
  activeCategory,
  sortBy,
}: EventsFilterProps) {
  return (
    <div className="space-y-8">
      {/* Category Tabs */}
      <div className="relative">
        <div className="flex flex-wrap gap-2 lg:gap-4">
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

        <div className="flex items-center space-x-4">
          {/* Sort Dropdown */}
          <div className="flex items-center space-x-2">
            <span className="text-slate-300 text-sm">Sort by</span>
            <Select value={sortBy} onValueChange={onSortChange}>
              <SelectTrigger className="w-40 bg-slate-800 border-slate-700 text-white cursor-pointer">
                <SelectValue />
              </SelectTrigger>
              <SelectContent className="bg-slate-800 border-slate-700">
                <SelectItem value="popularity" className="text-white hover:bg-slate-700!">
                  Most popular
                </SelectItem>
                <SelectItem value="date" className="text-white hover:bg-slate-700!">
                  Closest date
                </SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>
      </div>
    </div>
  )
}
