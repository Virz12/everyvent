"use client"

import type React from "react"

import { useState } from "react"
import Link from "next/link"
import { Card, CardContent, CardHeader } from "@/components/ui/card"
import { Separator } from "@/components/ui/separator"
import { ArrowLeft } from "lucide-react"
import Image from "next/image"
import { GoogleSignButton } from "@/components/auth/google-sign-button"
import SignInForm from "@/components/auth/signin-form"

export default function SignInPage() {
  const [isLoading, setIsLoading] = useState(false)

  const handleGoogleSignIn = async () => {
    setIsLoading(true)

    // Simulate Google OAuth
    await new Promise((resolve) => setTimeout(resolve, 1000))

    console.log("Google sign in")
    setIsLoading(false)
  }

  return (
    <div className="w-full max-w-md">
      {/* Back to Home */}
      <Link
        href="/"
        className="inline-flex items-center space-x-2 text-slate-300 hover:text-white transition-colors mb-8"
      >
        <ArrowLeft className="h-4 w-4" />
        <span>Back to Everyvent</span>
      </Link>

      <Card className="bg-slate-800 border-slate-700">
        <CardHeader className="space-y-4 pb-6 mt-6">
          <div className="text-center space-y-2">
            <div className="flex justify-center">
              <div className="h-12 w-12 rounded-xl flex items-center justify-center">
                <Image src={"/icon.avif"} width={32} height={32} alt="Everyvent Icon" />
              </div>
            </div>
            <h1 className="text-2xl font-bold text-white">Welcome back</h1>
            <p className="text-slate-300">Sign in to your Everyvent account</p>
          </div>
        </CardHeader>

        <CardContent className="space-y-6">
          {/* Google Sign In */}
          <GoogleSignButton
            onClick={handleGoogleSignIn}
            disabled={isLoading}
          />
          <div className="relative">
            <Separator className="bg-slate-600" />
            <div className="absolute inset-0 flex items-center justify-center">
              <span className="bg-slate-800 px-4 text-slate-400 text-sm">or</span>
            </div>
          </div>

          {/* Manual Sign In Form */}
          <SignInForm isLoading={isLoading} setIsLoading={setIsLoading} />
          <div className="text-center">
            <span className="text-slate-300">Don't have an account? </span>
            <Link href="/register" className="text-orange-500 hover:text-orange-400 transition-colors font-medium">
              Sign up
            </Link>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
