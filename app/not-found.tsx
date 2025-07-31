"use client"

import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Home, ArrowLeft, Search } from "lucide-react"

export default function NotFound() {
  return (
    <div className="min-h-screen bg-slate-900 flex items-center justify-center px-4">
      <div className="max-w-md w-full text-center">
        {/* 404 Number */}
        <div className="mb-8">
          <h1 className="text-9xl font-bold text-orange-500 mb-4">404</h1>
          <div className="w-24 h-1 bg-orange-500 mx-auto rounded-full"></div>
        </div>

        {/* Error Message */}
        <div className="mb-8">
          <h2 className="text-3xl font-bold text-white-900 mb-4">Page Not Found</h2>
          <p className="text-white-600 text-lg leading-relaxed">
            Oops! The page you're looking for doesn't exist. It might have been moved, deleted, or you entered the wrong
            URL.
          </p>
        </div>

        {/* Action Buttons */}
        <div className="space-y-4">
          <Link href="/">
            <Button className="w-full bg-orange-500 hover:bg-orange-600 text-white py-3 mb-4 text-lg cursor-pointer">
              <Home className="w-5 h-5 mr-2" />
              Go Back Home
            </Button>
          </Link>

          <div className="flex gap-3">
            <Button
              variant="outline"
              className="flex-1 border-white-300 text-white-700 hover:bg-gray-50 bg-transparent cursor-pointer"
              onClick={() => window.history.back()}
            >
              <ArrowLeft className="w-4 h-4 mr-2" />
              Go Back
            </Button>

            <Link href="/events" className="flex-1">
              <Button
                variant="outline"
                className="w-full border-gray-300 text-gray-700 hover:bg-gray-50 bg-transparent cursor-pointer"
              >
                <Search className="w-4 h-4 mr-2" />
                Browse Events
              </Button>
            </Link>
          </div>
        </div>

        {/* Helpful Links */}
        <div className="mt-12 pt-8 border-t border-gray-200">
          <p className="text-sm text-gray-500 mb-4">Looking for something specific?</p>
          <div className="flex flex-wrap justify-center gap-4 text-sm">
            <Link href="/events" className="text-orange-500 hover:text-orange-600 hover:underline">
              Browse Events
            </Link>
            <Link href="/about" className="text-orange-500 hover:text-orange-600 hover:underline">
              About Us
            </Link>
            <Link href="/signin" className="text-orange-500 hover:text-orange-600 hover:underline">
              Sign In
            </Link>
            <Link href="/register" className="text-orange-500 hover:text-orange-600 hover:underline">
              Register
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}
