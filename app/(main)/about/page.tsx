import { Button } from "@/components/ui/button"
import Link from "next/link"
import { Features } from "./features"
import { Team } from "./team"
import Stats from "./stats"

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-slate-900">
      {/* Hero Section */}
      <section className="bg-slate-900 py-20 px-4 lg:px-6">
        <div className="container mx-auto text-center">
          <h1 className="text-4xl lg:text-6xl font-bold text-white mb-6">
            Connecting Communities Through
            <br />
            <span className="text-orange-500">Amazing Events</span>
          </h1>
          <p className="text-xl text-slate-300 mb-8 max-w-3xl mx-auto leading-relaxed">
            Everyvent is more than just an event platform. We're a community of passionate organizers and attendees
            working together to create meaningful experiences that bring people together.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/events">
              <Button size="lg" className="bg-orange-500 hover:bg-orange-600 text-white cursor-pointer">
                Explore Events
              </Button>
            </Link>
            <Link href="/signin">
              <Button
                size="lg"
                variant="outline"
                className="border-slate-600 text-slate-300 hover:bg-slate-800 bg-transparent cursor-pointer"
              >
                Join Our Community
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <Stats />

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
                Whether you're organizing a small workshop or a large conference, Everyvent provides the tools and
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
      <Features />

      {/* Team Section */}
      <Team />

      {/* CTA Section */}
      <section className="bg-slate-800 py-20 px-4 lg:px-6">
        <div className="container mx-auto text-center">
          <h2 className="text-3xl lg:text-4xl font-bold text-white mb-4">Ready to Get Started?</h2>
          <p className="text-slate-300 text-lg mb-8 max-w-2xl mx-auto">
            Join thousands of organizers and attendees who are already using Everyvent to create amazing events and build
            stronger communities.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/events">
              <Button size="lg" className="bg-orange-500 hover:bg-orange-600 text-white cursor-pointer">
                Browse Events
              </Button>
            </Link>
            <Link href="/register">
              <Button
                size="lg"
                variant="outline"
                className="border-slate-600 text-slate-300 hover:bg-slate-700 bg-transparent cursor-pointer"
              >
                Create Account
              </Button>
            </Link>
          </div>
        </div>
      </section>
    </div>
  )
}