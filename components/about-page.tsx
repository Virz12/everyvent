import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Users, Calendar, MapPin, Star, Heart, Zap } from "lucide-react"
import Link from "next/link"

export function AboutPage() {
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
        "Advanced features for organizers including analytics, attendee management, and communication tools.",
    },
  ]

  const team = [
    {
      name: "Sarah Johnson",
      role: "CEO & Founder",
      image: "https://placehold.co/200x200",
      description: "Former event organizer with 10+ years of experience in community building.",
    },
    {
      name: "Michael Chen",
      role: "CTO",
      image: "https://placehold.co/200x200",
      description: "Tech leader passionate about creating seamless user experiences.",
    },
    {
      name: "Emily Rodriguez",
      role: "Head of Community",
      image: "https://placehold.co/200x200",
      description: "Community expert dedicated to fostering meaningful connections.",
    },
  ]

  const stats = [
    { number: "50,000+", label: "Active Users" },
    { number: "10,000+", label: "Events Created" },
    { number: "100+", label: "Cities" },
    { number: "500,000+", label: "Connections Made" },
  ]

  return (
    <div className="min-h-screen bg-slate-900">
      <Header />

      {/* Hero Section */}
      <section className="bg-slate-900 py-20 px-4 lg:px-6">
        <div className="container mx-auto text-center">
          <h1 className="text-4xl lg:text-6xl font-bold text-white mb-6">
            Connecting Communities Through
            <br />
            <span className="text-orange-500">Amazing Events</span>
          </h1>
          <p className="text-xl text-slate-300 mb-8 max-w-3xl mx-auto leading-relaxed">
            EventHub is more than just an event platform. We're a community of passionate organizers and attendees
            working together to create meaningful experiences that bring people together.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/events">
              <Button size="lg" className="bg-orange-500 hover:bg-orange-600 text-white">
                Explore Events
              </Button>
            </Link>
            <Link href="/signin">
              <Button
                size="lg"
                variant="outline"
                className="border-slate-600 text-slate-300 hover:bg-slate-800 bg-transparent"
              >
                Join Our Community
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="bg-slate-800 py-16 px-4 lg:px-6">
        <div className="container mx-auto">
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {stats.map((stat, index) => (
              <div key={index} className="text-center">
                <div className="text-3xl lg:text-4xl font-bold text-orange-500 mb-2">{stat.number}</div>
                <div className="text-slate-300 text-lg">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Mission Section */}
      <section className="bg-slate-900 py-20 px-4 lg:px-6">
        <div className="container mx-auto">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl lg:text-4xl font-bold text-white mb-6">Our Mission</h2>
              <p className="text-slate-300 text-lg mb-6 leading-relaxed">
                We believe that great things happen when people come together. Our mission is to make it easier for
                communities to connect, learn, and grow through shared experiences.
              </p>
              <p className="text-slate-300 text-lg mb-8 leading-relaxed">
                Whether you're organizing a small workshop or a large conference, EventHub provides the tools and
                support you need to create memorable events that make a real impact.
              </p>
              <div className="space-y-4">
                <div className="flex items-center space-x-3">
                  <div className="w-2 h-2 bg-orange-500 rounded-full"></div>
                  <span className="text-slate-300">Empowering event organizers with powerful tools</span>
                </div>
                <div className="flex items-center space-x-3">
                  <div className="w-2 h-2 bg-orange-500 rounded-full"></div>
                  <span className="text-slate-300">Building stronger communities through events</span>
                </div>
                <div className="flex items-center space-x-3">
                  <div className="w-2 h-2 bg-orange-500 rounded-full"></div>
                  <span className="text-slate-300">Creating meaningful connections that last</span>
                </div>
              </div>
            </div>
            <div className="relative">
              <img
                src="https://placehold.co/500x400"
                alt="Team collaboration"
                className="w-full h-auto rounded-2xl"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="bg-slate-800 py-20 px-4 lg:px-6">
        <div className="container mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl lg:text-4xl font-bold text-white mb-4">Why Choose EventHub?</h2>
            <p className="text-slate-300 text-lg max-w-2xl mx-auto">
              We've built EventHub with both organizers and attendees in mind, creating a platform that makes events
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

      {/* Team Section */}
      <section className="bg-slate-900 py-20 px-4 lg:px-6">
        <div className="container mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl lg:text-4xl font-bold text-white mb-4">Meet Our Team</h2>
            <p className="text-slate-300 text-lg max-w-2xl mx-auto">
              We're a passionate team of event enthusiasts, technologists, and community builders working to make events
              better for everyone.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {team.map((member, index) => (
              <Card key={index} className="bg-slate-800 border-slate-700 text-center">
                <CardContent className="p-6">
                  <img
                    src={member.image || "/placeholder.svg"}
                    alt={member.name}
                    className="w-24 h-24 rounded-full mx-auto mb-4 object-cover"
                  />
                  <h3 className="text-white font-semibold text-lg mb-1">{member.name}</h3>
                  <p className="text-orange-500 font-medium mb-3">{member.role}</p>
                  <p className="text-slate-300 text-sm leading-relaxed">{member.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="bg-slate-800 py-20 px-4 lg:px-6">
        <div className="container mx-auto text-center">
          <h2 className="text-3xl lg:text-4xl font-bold text-white mb-4">Ready to Get Started?</h2>
          <p className="text-slate-300 text-lg mb-8 max-w-2xl mx-auto">
            Join thousands of organizers and attendees who are already using EventHub to create amazing events and build
            stronger communities.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/events">
              <Button size="lg" className="bg-orange-500 hover:bg-orange-600 text-white">
                Browse Events
              </Button>
            </Link>
            <Link href="/register">
              <Button
                size="lg"
                variant="outline"
                className="border-slate-600 text-slate-300 hover:bg-slate-700 bg-transparent"
              >
                Create Account
              </Button>
            </Link>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  )
}
