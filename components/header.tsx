"use client"

import { Menu, User } from "lucide-react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"
import Image from "next/image"

export function Header() {
  return (
    <header className="bg-slate-900 fixed w-full z-50 border-b border-slate-800 px-4 lg:px-6">
      <div className="container mx-auto flex h-16 items-center justify-between">
        {/* Logo */}
        <Link href="/" className="flex items-center space-x-2">
          <Image src={"/logo.avif"} width={128} height={64} alt="Everyvent logo" />
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden lg:flex items-center space-x-8">
          <Link href="/events" className="text-slate-300 hover:text-white transition-colors">
            Events
          </Link>
          <Link href="/about" className="text-slate-300 hover:text-white transition-colors">
            About
          </Link>
        </nav>

        {/* User Actions */}
        <div className="flex items-center space-x-4">
          <Button variant="ghost" size="icon" className="text-slate-300 hover:text-slate-300 cursor-pointer">
            <User className="h-5 w-5" />
          </Button>
          <Link href="/signin">
            <Button className="bg-orange-500 hover:bg-orange-600 text-white cursor-pointer">Sign In</Button>
          </Link>

          {/* Mobile Menu */}
          <Sheet>
            <SheetTrigger asChild>
              <Button variant="ghost" size="icon" className="lg:hidden text-slate-300">
                <Menu className="h-5 w-5" />
              </Button>
            </SheetTrigger>
            <SheetContent side="right" className="bg-slate-900 border-slate-800">
              <nav className="flex flex-col space-y-4 mt-8 px-6 pt-8">
                <Link href="/events" className="text-slate-300 hover:text-white transition-colors">
                  Events
                </Link>
                <Link href="/about" className="text-slate-300 hover:text-white transition-colors">
                  About
                </Link>
              </nav>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </header>
  )
}
