'use client'

import { HeroSection } from "@/components/hero-section"
import { EventsGrid } from "@/components/events-grid"
import { FeaturedIn } from "@/components/featured-in"
import { HowItWorks } from "@/components/how-it-works"
import { FAQ } from "@/components/faq"
import { useEffect } from "react"

export default function HomePage() {
  // Change to dark mode
  useEffect(() => {
    window.localStorage.setItem("theme", "dark");
  }, [])

  return (
    <div className="min-h-screen bg-slate-900">
      <main>
        <HeroSection />
        <EventsGrid />
        <FeaturedIn />
        <HowItWorks />
        <FAQ />
      </main>
    </div>
  )
}
