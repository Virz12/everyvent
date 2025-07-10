"use client"

import type React from "react"

import { useState } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardHeader } from "@/components/ui/card"
import { Separator } from "@/components/ui/separator"
import { Eye, EyeOff, Mail, Lock, User, ArrowLeft, Check } from "lucide-react"
import { GoogleIcon } from "../icons/google-icon"
import { Label } from "@/components/ui/label"

export function RegisterForm() {
  const [showPassword, setShowPassword] = useState(false)
  const [showConfirmPassword, setShowConfirmPassword] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
    role: "", // Add role field
    agreeToTerms: false,
  })
  const [errors, setErrors] = useState<Record<string, string>>({})

  const validateForm = () => {
    const newErrors: Record<string, string> = {}

    if (!formData.name.trim()) {
      newErrors.name = "Name is required"
    }

    if (!formData.email.trim()) {
      newErrors.email = "Email is required"
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = "Email is invalid"
    }

    if (!formData.password) {
      newErrors.password = "Password is required"
    } else if (formData.password.length < 8) {
      newErrors.password = "Password must be at least 8 characters"
    }

    if (formData.password !== formData.confirmPassword) {
      newErrors.confirmPassword = "Passwords do not match"
    }

    if (!formData.role) {
      newErrors.role = "Please select your account type"
    }

    if (!formData.agreeToTerms) {
      newErrors.terms = "You must agree to the terms and conditions"
    }

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    if (!validateForm()) return

    setIsLoading(true)

    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 1500))

    console.log("Registration attempt:", formData)

    // Redirect based on role
    if (formData.role === "organizer") {
      window.location.href = "/dashboard"
    } else {
      window.location.href = "/participant"
    }

    setIsLoading(false)
  }

  const handleGoogleSignUp = async () => {
    setIsLoading(true)

    // Simulate Google OAuth
    await new Promise((resolve) => setTimeout(resolve, 1000))

    console.log("Google sign up")
    setIsLoading(false)
  }

  const handleInputChange = (name: string, value: string) => {
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }))

    // Clear error when user starts typing
    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: "" }))
    }
  }

  const getPasswordStrength = (password: string) => {
    let strength = 0
    if (password.length >= 8) strength++
    if (/[A-Z]/.test(password)) strength++
    if (/[a-z]/.test(password)) strength++
    if (/[0-9]/.test(password)) strength++
    if (/[^A-Za-z0-9]/.test(password)) strength++
    return strength
  }

  const passwordStrength = getPasswordStrength(formData.password)

  return (
    <div className="w-full max-w-md">
      {/* Back to Home */}
      <Link
        href="/"
        className="inline-flex items-center space-x-2 text-slate-300 hover:text-white transition-colors mb-8"
      >
        <ArrowLeft className="h-4 w-4" />
        <span>Back to EventHub</span>
      </Link>

      <Card className="bg-slate-800 border-slate-700">
        <CardHeader className="space-y-4 pb-6">
          <div className="text-center space-y-2">
            <div className="flex justify-center">
              <div className="h-12 w-12 bg-orange-500 rounded-xl flex items-center justify-center">
                <span className="text-white font-bold text-xl">E</span>
              </div>
            </div>
            <h1 className="text-2xl font-bold text-white">Create your account</h1>
            <p className="text-slate-300">Join EventHub and discover amazing events</p>
          </div>
        </CardHeader>

        <CardContent className="space-y-6">
          {/* Google Sign Up */}
          <Button
            onClick={handleGoogleSignUp}
            disabled={isLoading}
            variant="outline"
            className="w-full bg-white hover:bg-gray-50 text-gray-900 border-gray-300 h-12"
          >
            <GoogleIcon className="h-5 w-5 mr-3" />
            Continue with Google
          </Button>

          <div className="relative">
            <Separator className="bg-slate-600" />
            <div className="absolute inset-0 flex items-center justify-center">
              <span className="bg-slate-800 px-4 text-slate-400 text-sm">or</span>
            </div>
          </div>

          {/* Manual Registration Form */}
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-2">
              <label htmlFor="name" className="text-sm font-medium text-slate-300">
                Full name
              </label>
              <div className="relative">
                <User className="absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-400 h-4 w-4" />
                <Input
                  id="name"
                  name="name"
                  type="text"
                  required
                  value={formData.name}
                  onChange={(e) => handleInputChange("name", e.target.value)}
                  placeholder="Enter your full name"
                  className={`pl-10 bg-slate-700 border-slate-600 text-white placeholder:text-slate-400 h-12 ${errors.name ? "border-red-500" : ""
                    }`}
                />
              </div>
              {errors.name && <p className="text-red-400 text-sm">{errors.name}</p>}
            </div>

            <div className="space-y-2">
              <label htmlFor="email" className="text-sm font-medium text-slate-300">
                Email address
              </label>
              <div className="relative">
                <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-400 h-4 w-4" />
                <Input
                  id="email"
                  name="email"
                  type="email"
                  required
                  value={formData.email}
                  onChange={(e) => handleInputChange("email", e.target.value)}
                  placeholder="Enter your email"
                  className={`pl-10 bg-slate-700 border-slate-600 text-white placeholder:text-slate-400 h-12 ${errors.email ? "border-red-500" : ""
                    }`}
                />
              </div>
              {errors.email && <p className="text-red-400 text-sm">{errors.email}</p>}
            </div>

            <div className="space-y-2">
              <label htmlFor="password" className="text-sm font-medium text-slate-300">
                Password
              </label>
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-400 h-4 w-4" />
                <Input
                  id="password"
                  name="password"
                  type={showPassword ? "text" : "password"}
                  required
                  value={formData.password}
                  onChange={(e) => handleInputChange("password", e.target.value)}
                  placeholder="Create a password"
                  className={`pl-10 pr-10 bg-slate-700 border-slate-600 text-white placeholder:text-slate-400 h-12 ${errors.password ? "border-red-500" : ""
                    }`}
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 transform -translate-y-1/2 text-slate-400 hover:text-slate-300"
                >
                  {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                </button>
              </div>

              {/* Password Strength Indicator */}
              {formData.password && (
                <div className="space-y-2">
                  <div className="flex space-x-1">
                    {[...Array(5)].map((_, i) => (
                      <div
                        key={i}
                        className={`h-1 flex-1 rounded ${i < passwordStrength
                          ? passwordStrength <= 2
                            ? "bg-red-500"
                            : passwordStrength <= 3
                              ? "bg-yellow-500"
                              : "bg-green-500"
                          : "bg-slate-600"
                          }`}
                      />
                    ))}
                  </div>
                  <p className="text-xs text-slate-400">
                    Password strength: {passwordStrength <= 2 ? "Weak" : passwordStrength <= 3 ? "Medium" : "Strong"}
                  </p>
                </div>
              )}

              {errors.password && <p className="text-red-400 text-sm">{errors.password}</p>}
            </div>

            <div className="space-y-2">
              <label htmlFor="confirmPassword" className="text-sm font-medium text-slate-300">
                Confirm password
              </label>
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-400 h-4 w-4" />
                <Input
                  id="confirmPassword"
                  name="confirmPassword"
                  type={showConfirmPassword ? "text" : "password"}
                  required
                  value={formData.confirmPassword}
                  onChange={(e) => handleInputChange("confirmPassword", e.target.value)}
                  placeholder="Confirm your password"
                  className={`pl-10 pr-10 bg-slate-700 border-slate-600 text-white placeholder:text-slate-400 h-12 ${errors.confirmPassword ? "border-red-500" : ""
                    }`}
                />
                <button
                  type="button"
                  onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                  className="absolute right-3 top-1/2 transform -translate-y-1/2 text-slate-400 hover:text-slate-300"
                >
                  {showConfirmPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                </button>
              </div>
              {errors.confirmPassword && <p className="text-red-400 text-sm">{errors.confirmPassword}</p>}
            </div>

            <div className="space-y-4">
              <Label className="text-slate-300 text-base font-medium">What brings you to EventHub?</Label>
              <div className="grid grid-cols-1 gap-3">
                <label className="flex items-start space-x-3 p-4 border border-slate-600 rounded-lg cursor-pointer hover:border-orange-500 transition-colors">
                  <input
                    type="radio"
                    name="role"
                    value="participant"
                    checked={formData.role === "participant"}
                    onChange={(e) => handleInputChange("role", e.target.value)}
                    className="mt-1"
                  />
                  <div>
                    <div className="text-white font-medium">Join Events</div>
                    <div className="text-slate-400 text-sm">Discover and attend amazing events in your community</div>
                  </div>
                </label>

                <label className="flex items-start space-x-3 p-4 border border-slate-600 rounded-lg cursor-pointer hover:border-orange-500 transition-colors">
                  <input
                    type="radio"
                    name="role"
                    value="organizer"
                    checked={formData.role === "organizer"}
                    onChange={(e) => handleInputChange("role", e.target.value)}
                    className="mt-1"
                  />
                  <div>
                    <div className="text-white font-medium">Organize Events</div>
                    <div className="text-slate-400 text-sm">Create and manage events, build your community</div>
                  </div>
                </label>
              </div>
              {errors.role && <p className="text-red-400 text-sm">{errors.role}</p>}
            </div>

            <div className="space-y-2">
              <label className="flex items-start space-x-3">
                <div className="relative">
                  <input
                    type="checkbox"
                    name="agreeToTerms"
                    checked={formData.agreeToTerms}
                    onChange={(e) => handleInputChange("agreeToTerms", e.target.checked.toString())}
                    className="sr-only"
                  />
                  <div
                    className={`w-5 h-5 rounded border-2 flex items-center justify-center ${formData.agreeToTerms ? "bg-orange-500 border-orange-500" : "border-slate-600 bg-slate-700"
                      }`}
                  >
                    {formData.agreeToTerms && <Check className="h-3 w-3 text-white" />}
                  </div>
                </div>
                <span className="text-sm text-slate-300 leading-5">
                  I agree to the{" "}
                  <Link href="/terms" className="text-orange-500 hover:text-orange-400">
                    Terms of Service
                  </Link>{" "}
                  and{" "}
                  <Link href="/privacy" className="text-orange-500 hover:text-orange-400">
                    Privacy Policy
                  </Link>
                </span>
              </label>
              {errors.terms && <p className="text-red-400 text-sm">{errors.terms}</p>}
            </div>

            <Button
              type="submit"
              disabled={isLoading}
              className="w-full bg-orange-500 hover:bg-orange-600 text-white h-12"
            >
              {isLoading ? "Creating account..." : "Create account"}
            </Button>
          </form>

          <div className="text-center">
            <span className="text-slate-300">Already have an account? </span>
            <Link href="/auth/signin" className="text-orange-500 hover:text-orange-400 transition-colors font-medium">
              Sign in
            </Link>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
