'use client'

import { Eye, EyeOff, Lock, Mail, User } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useState } from "react";
import { Label } from "@/components/ui/label";
import { redirect } from "next/navigation";
import { signIn } from "next-auth/react";

interface RegisterFormprops {
  isLoading: boolean,
  setIsLoading: (React.Dispatch<React.SetStateAction<boolean>>)
}

export default function RegisterForm({
  isLoading,
  setIsLoading
}: RegisterFormprops) {
  const [showPassword, setShowPassword] = useState(false)
  const [showConfirmPassword, setShowConfirmPassword] = useState(false)
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
    role: "",
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

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    if (!validateForm()) return

    setIsLoading(true)

    const res = await fetch('/api/register', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(formData)
    })

    if (res.ok) {
      await signIn("credentials", {
        email: formData.email,
        password: formData.password,
      });

      redirect(`/dashboard/${formData.role.toLowerCase()}`)
    }

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

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className="space-y-2">
        <label htmlFor="name" className="text-sm font-medium text-slate-300">
          Full name
        </label>
        {/* Full name input */}
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
        {/* Email input */}
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
        {/* Password input */}
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

        {errors.password && <p className="text-red-400 text-sm">{errors.password}</p>}
      </div>

      <div className="space-y-2">
        <label htmlFor="confirmPassword" className="text-sm font-medium text-slate-300">
          Confirm password
        </label>
        {/* Confirm password input */}
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
        <Label className="text-slate-300 text-base font-medium">What brings you to Everyvent?</Label>
        {/* Role selection input */}
        <div className="grid grid-cols-1 gap-3">
          {/* Participant role */}
          <label className="flex items-start space-x-3 p-4 border border-slate-600 rounded-lg cursor-pointer hover:border-orange-500 transition-colors">
            <input
              type="radio"
              name="role"
              value="PARTICIPANT"
              checked={formData.role === "PARTICIPANT"}
              onChange={(e) => handleInputChange("role", e.target.value)}
              className="mt-1"
            />
            <div>
              <div className="text-white font-medium">Join Events</div>
              <div className="text-slate-400 text-sm">Discover and attend amazing events in your community</div>
            </div>
          </label>

          {/* Organizer role */}
          <label className="flex items-start space-x-3 p-4 border border-slate-600 rounded-lg cursor-pointer hover:border-orange-500 transition-colors">
            <input
              type="radio"
              name="role"
              value="ORGANIZER"
              checked={formData.role === "ORGANIZER"}
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

      <Button
        type="submit"
        disabled={isLoading}
        className="w-full bg-orange-500 hover:bg-orange-600 text-white h-12 cursor-pointer"
      >
        {isLoading ? "Creating account..." : "Create account"}
      </Button>
    </form>
  )
}