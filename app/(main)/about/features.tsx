import { Card, CardContent } from "@/components/ui/card"
import { Calendar, Heart, MapPin, Star, Users, Zap } from "lucide-react"

export function Features() {
  const features = [
    {
      icon: Calendar,
      title: "Easy Event Creation",
      description:
        "Create and manage events with our intuitive interface. Set up everything from workshops to conferences in minutes.",
    },
    {
      icon: Users,
      title: "Community Building",
      description:
        "Connect like-minded people and build lasting relationships through shared interests and experiences.",
    },
    {
      icon: MapPin,
      title: "Location Flexibility",
      description: "Host events anywhere - from local meetups to virtual conferences. We support all types of venues.",
    },
    {
      icon: Star,
      title: "Quality Events",
      description: "Our curated selection ensures high-quality events that provide real value to attendees.",
    },
    {
      icon: Heart,
      title: "Passion-Driven",
      description: "We're passionate about bringing people together and creating meaningful connections.",
    },
    {
      icon: Zap,
      title: "Powerful Tools",
      description:
        "Advanced features for organizers including attendee management, drafting events, and export reports.",
    },
  ]

  return (
    <section className="bg-slate-800 py-20 px-4 lg:px-6">
      <div className="container mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-3xl lg:text-4xl font-bold text-white mb-4">Why Choose Everyvent?</h2>
          <p className="text-slate-300 text-lg max-w-2xl mx-auto">
            We've built Everyvent with both organizers and attendees in mind, creating a platform that makes events
            better for everyone.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <Card key={index} className="bg-slate-700 border-slate-600">
              <CardContent className="p-6">
                <div className="flex items-center space-x-4 mb-4">
                  <div className="w-12 h-12 bg-orange-500 rounded-lg flex items-center justify-center">
                    <feature.icon className="h-6 w-6 text-white" />
                  </div>
                  <h3 className="text-white font-semibold text-lg">{feature.title}</h3>
                </div>
                <p className="text-slate-300 leading-relaxed">{feature.description}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  )
}