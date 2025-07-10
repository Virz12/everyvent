import { Button } from "@/components/ui/button"
import { Calendar, MapPin, Users } from "lucide-react"

export function HeroSection() {
  return (
    <section className="bg-slate-900 py-20 px-4 lg:px-6">
      <div className="container mx-auto">
        <div className="grid lg:grid-cols-2 gap-8 lg:gap-12 items-center">
          <div className="space-y-6 lg:space-y-8">
            <div className="space-y-4">
              <h1 className="text-4xl lg:text-6xl font-bold text-white leading-tight">
                Plan your next
                <br />
                <span className="text-orange-500">event in a minute</span>
              </h1>
              <p className="text-xl text-slate-300 leading-relaxed">
                Discover amazing events, connect with like-minded people, and create unforgettable experiences. From
                workshops to meetups, find your perfect event.
              </p>
            </div>

            <div className="flex flex-col sm:flex-row gap-3 sm:gap-4">
              <Button size="lg" className="bg-orange-500 hover:bg-orange-600 text-white px-6 sm:px-8">
                Explore Events
              </Button>
              <Button
                size="lg"
                variant="outline"
                className="border-slate-600 text-slate-300 hover:bg-slate-800 bg-transparent"
              >
                Create Event
              </Button>
            </div>

            <div className="flex flex-col sm:flex-row items-start sm:items-center space-y-4 sm:space-y-0 sm:space-x-8 pt-6 lg:pt-8">
              <div className="flex items-center space-x-2">
                <Calendar className="h-5 w-5 text-orange-500" />
                <span className="text-slate-300">1000+ Events</span>
              </div>
              <div className="flex items-center space-x-2">
                <Users className="h-5 w-5 text-orange-500" />
                <span className="text-slate-300">50k+ Members</span>
              </div>
              <div className="flex items-center space-x-2">
                <MapPin className="h-5 w-5 text-orange-500" />
                <span className="text-slate-300">100+ Cities</span>
              </div>
            </div>
          </div>

          <div className="relative">
            <div className="relative rounded-2xl overflow-hidden shadow-2xl">
              <img
                src="https://placehold.co/700x500"
                alt="Team collaboration and networking at events"
                className="w-full h-64 sm:h-80 lg:h-96 object-cover"
              />
              <div className="absolute inset-0 bg-linear-to-t from-slate-900/60 via-slate-900/20 to-transparent" />

              {/* Floating elements for visual interest */}
              <div className="absolute top-4 right-4 bg-white/10 backdrop-blur-sm rounded-lg px-3 py-2">
                <div className="flex items-center space-x-2">
                  <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
                  <span className="text-white text-sm font-medium">Live Events</span>
                </div>
              </div>

              <div className="absolute bottom-4 left-4 bg-white/10 backdrop-blur-sm rounded-lg px-3 py-2">
                <div className="flex items-center space-x-2">
                  <Users className="h-4 w-4 text-white" />
                  <span className="text-white text-sm font-medium">2.5k+ Active</span>
                </div>
              </div>
            </div>

            {/* Background decoration */}
            <div className="absolute -top-4 -right-4 w-24 h-24 bg-orange-500/20 rounded-full blur-xl"></div>
            <div className="absolute -bottom-4 -left-4 w-32 h-32 bg-blue-500/10 rounded-full blur-xl"></div>
          </div>
        </div>
      </div>
    </section>
  )
}
