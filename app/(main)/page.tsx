import { HeroSection } from "@/components/hero-section"
import { EventsGrid } from "@/components/events-grid"
import { FeaturedIn } from "@/components/featured-in"
import { HowItWorks } from "@/components/how-it-works"
import { FAQ } from "@/components/faq"

export default function HomePage() {

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
