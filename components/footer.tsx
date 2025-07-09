import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Facebook, Twitter, Instagram, Linkedin, Mail, Phone, MapPin } from "lucide-react"

export function Footer() {
  return (
    <footer className="bg-slate-900 border-t border-slate-800 py-16 px-4 lg:px-6">
      <div className="container mx-auto">
        <div className="grid lg:grid-cols-4 gap-8 mb-12">
          {/* Company Info */}
          <div className="space-y-6">
            <div className="flex items-center space-x-2">
              <div className="h-8 w-8 bg-orange-500 rounded-lg flex items-center justify-center">
                <span className="text-white font-bold text-sm">E</span>
              </div>
              <span className="text-white font-semibold text-xl">EventHub</span>
            </div>
            <p className="text-slate-300 leading-relaxed">
              Connecting communities through amazing events. Discover, create, and join events that matter to you.
            </p>
            <div className="flex space-x-4">
              <Button variant="ghost" size="icon" className="text-slate-400 hover:text-white">
                <Facebook className="h-5 w-5" />
              </Button>
              <Button variant="ghost" size="icon" className="text-slate-400 hover:text-white">
                <Twitter className="h-5 w-5" />
              </Button>
              <Button variant="ghost" size="icon" className="text-slate-400 hover:text-white">
                <Instagram className="h-5 w-5" />
              </Button>
              <Button variant="ghost" size="icon" className="text-slate-400 hover:text-white">
                <Linkedin className="h-5 w-5" />
              </Button>
            </div>
          </div>

          {/* Quick Links */}
          <div className="space-y-6">
            <h3 className="text-white font-semibold text-lg">Quick Links</h3>
            <nav className="flex flex-col space-y-3">
              <Link href="/events" className="text-slate-300 hover:text-white transition-colors">
                Browse Events
              </Link>
              <Link href="/create" className="text-slate-300 hover:text-white transition-colors">
                Create Event
              </Link>
              <Link href="/about" className="text-slate-300 hover:text-white transition-colors">
                About Us
              </Link>
              <Link href="/pricing" className="text-slate-300 hover:text-white transition-colors">
                Pricing
              </Link>
              <Link href="/blog" className="text-slate-300 hover:text-white transition-colors">
                Blog
              </Link>
            </nav>
          </div>

          {/* Categories */}
          <div className="space-y-6">
            <h3 className="text-white font-semibold text-lg">Categories</h3>
            <nav className="flex flex-col space-y-3">
              <Link href="/workshops" className="text-slate-300 hover:text-white transition-colors">
                Workshops
              </Link>
              <Link href="/meetups" className="text-slate-300 hover:text-white transition-colors">
                Meetups
              </Link>
              <Link href="/conferences" className="text-slate-300 hover:text-white transition-colors">
                Conferences
              </Link>
              <Link href="/networking" className="text-slate-300 hover:text-white transition-colors">
                Networking
              </Link>
              <Link href="/webinars" className="text-slate-300 hover:text-white transition-colors">
                Webinars
              </Link>
            </nav>
          </div>

          {/* Contact & App */}
          <div className="space-y-6">
            <h3 className="text-white font-semibold text-lg">Get in Touch</h3>
            <div className="space-y-3">
              <div className="flex items-center space-x-3">
                <Mail className="h-4 w-4 text-orange-500" />
                <span className="text-slate-300">hello@eventhub.com</span>
              </div>
              <div className="flex items-center space-x-3">
                <Phone className="h-4 w-4 text-orange-500" />
                <span className="text-slate-300">+1 (555) 123-4567</span>
              </div>
              <div className="flex items-center space-x-3">
                <MapPin className="h-4 w-4 text-orange-500" />
                <span className="text-slate-300">San Francisco, CA</span>
              </div>
            </div>

            <div className="space-y-3">
              <h4 className="text-white font-medium">Download Event App</h4>
              <div className="flex space-x-3">
                <Button variant="outline" size="sm" className="border-slate-600 text-slate-300 bg-transparent">
                  App Store
                </Button>
                <Button variant="outline" size="sm" className="border-slate-600 text-slate-300 bg-transparent">
                  Google Play
                </Button>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-slate-800 pt-8">
          <div className="flex flex-col lg:flex-row justify-between items-center space-y-4 lg:space-y-0">
            <div className="text-slate-400 text-sm">© 2024 EventHub. All rights reserved.</div>
            <nav className="flex space-x-6 text-sm">
              <Link href="/privacy" className="text-slate-400 hover:text-white transition-colors">
                Privacy Policy
              </Link>
              <Link href="/terms" className="text-slate-400 hover:text-white transition-colors">
                Terms of Service
              </Link>
              <Link href="/cookies" className="text-slate-400 hover:text-white transition-colors">
                Cookie Policy
              </Link>
            </nav>
          </div>
        </div>
      </div>
    </footer>
  )
}
