'use client'

import { useState } from "react"
import Link from "next/link"
import { Card, CardContent, CardHeader } from "@/components/ui/card"
import { Separator } from "@/components/ui/separator"
import Image from "next/image"
import { GoogleSignButton } from "@/components/auth/google-sign-button"
import RegisterForm from "@/components/auth/register-form"
import { login } from "@/lib/actions/auth"

export function RegisterCard() {
  const [isLoading, setIsLoading] = useState(false)

  const handleGoogleSignUp = async () => {
    setIsLoading(true)

    login()

    console.log("Google sign up")
    setIsLoading(false)
  }
  return (
    <Card className="bg-slate-800 border-slate-700 pb-6">
      <CardHeader className="space-y-4 pb-6 mt-6">
        <div className="text-center space-y-2">
          <div className="flex justify-center">
            <div className="h-12 w-12 rounded-xl flex items-center justify-center">
              <Image src={"/icon.avif"} width={32} height={32} alt="Everyvent Icon" />
            </div>
          </div>
          <h1 className="text-2xl font-bold text-white">Create your account</h1>
          <p className="text-slate-300">Join Everyvent and discover amazing events</p>
        </div>
      </CardHeader>

      <CardContent className="space-y-6">
        {/* Google Registration */}
        <GoogleSignButton
          onClick={handleGoogleSignUp}
          disabled={isLoading}
        />
        <div className="relative">
          <Separator className="bg-slate-600" />
          <div className="absolute inset-0 flex items-center justify-center">
            <span className="bg-slate-800 px-4 text-slate-400 text-sm">or</span>
          </div>
        </div>

        {/* Manual Registration Form */}
        <RegisterForm isLoading={isLoading} setIsLoading={setIsLoading} />
        <div className="text-center">
          <span className="text-slate-300">Already have an account? </span>
          <Link href="/signin" className="text-orange-500 hover:text-orange-400 transition-colors font-medium">
            Sign in
          </Link>
        </div>
      </CardContent>
    </Card>
  )
}