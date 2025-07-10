import { Button } from "@/components/ui/button"
import { Calendar, Heart, MapPin, Users } from "lucide-react"

export function HowItWorks() {
  const steps = [
    {
      icon: Calendar,
      title: "Step 1",
      subtitle: "Browse Events",
      description:
        "Discover events that match your interests from our curated selection of workshops, meetups, and conferences.",
    },
    {
      icon: MapPin,
      title: "Step 2",
      subtitle: "Check & Make sure",
      description:
        "Review event details, select your preferred date and time, and make sure there is enough space for you.",
    },
    {
      icon: Users,
      title: "Step 3",
      subtitle: "Attend & Connect",
      description: "Join amazing events, meet like-minded people, and build lasting connections in your community.",
    },
  ]

  return (
    <section className="bg-slate-900 py-24 px-4 lg:px-6">
      <div className="container mx-auto">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <div className="space-y-8">
            <div className="space-y-4">
              <h2 className="text-3xl lg:text-4xl font-bold text-white">How it works</h2>
              <p className="text-slate-300 text-lg">
                Getting started with Everyvent is simple. Follow these three easy steps to discover and join amazing
                events in your area.
              </p>
            </div>

            <div className="space-y-6">
              {steps.map((step, index) => (
                <div key={index} className="flex items-start space-x-4">
                  <div className="shrink-0 w-12 h-12 bg-orange-500 rounded-full flex items-center justify-center">
                    <step.icon className="h-6 w-6 text-white" />
                  </div>
                  <div className="space-y-2">
                    <div className="text-orange-500 font-semibold text-sm">{step.title}</div>
                    <h3 className="text-white font-semibold text-lg">{step.subtitle}</h3>
                    <p className="text-slate-300">{step.description}</p>
                  </div>
                </div>
              ))}
            </div>

            <Button className="bg-orange-500 hover:bg-orange-600 text-white cursor-pointer">Get Started</Button>
          </div>

          <div className="relative">
            <img src="https://placehold.co/500x400" alt="How it works" className="w-full h-auto rounded-2xl" />
          </div>
        </div>
      </div>
    </section>
  )
}
