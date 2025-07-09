"use client"
import { Button } from "@/components/ui/button"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Grid3X3, List, Users, Calendar, MapPin, Star, Heart } from "lucide-react"

interface EventsFilterProps {
  onCategoryChange: (category: string) => void
  onSortChange: (sort: string) => void
  onViewChange: (view: "grid" | "list") => void
  activeCategory: string
  sortBy: string
  viewMode: "grid" | "list"
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
  onViewChange,
  activeCategory,
  sortBy,
  viewMode,
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
                className={`relative flex items-center space-x-2 px-4 py-3 rounded-full transition-all duration-200 ${
                  isActive
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
              <SelectTrigger className="w-40 bg-slate-800 border-slate-700 text-white">
                <SelectValue />
              </SelectTrigger>
              <SelectContent className="bg-slate-800 border-slate-700">
                <SelectItem value="popularity" className="text-white hover:bg-slate-700">
                  Most popular
                </SelectItem>
                <SelectItem value="date" className="text-white hover:bg-slate-700">
                  Closest date
                </SelectItem>
                <SelectItem value="price-low" className="text-white hover:bg-slate-700">
                  Price: Low to High
                </SelectItem>
                <SelectItem value="price-high" className="text-white hover:bg-slate-700">
                  Price: High to Low
                </SelectItem>
                <SelectItem value="rating" className="text-white hover:bg-slate-700">
                  Highest rated
                </SelectItem>
              </SelectContent>
            </Select>
          </div>

          {/* View Toggle */}
          <div className="flex items-center bg-slate-800 rounded-lg p-1">
            <Button
              variant="ghost"
              size="sm"
              onClick={() => onViewChange("grid")}
              className={`p-2 ${
                viewMode === "grid"
                  ? "bg-orange-500 text-white hover:bg-orange-600"
                  : "text-slate-400 hover:text-white hover:bg-slate-700"
              }`}
            >
              <Grid3X3 className="h-4 w-4" />
            </Button>
            <Button
              variant="ghost"
              size="sm"
              onClick={() => onViewChange("list")}
              className={`p-2 ${
                viewMode === "list"
                  ? "bg-orange-500 text-white hover:bg-orange-600"
                  : "text-slate-400 hover:text-white hover:bg-slate-700"
              }`}
            >
              <List className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </div>
    </div>
  )
}
