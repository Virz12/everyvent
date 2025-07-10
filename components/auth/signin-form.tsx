import { Eye, EyeOff, Lock, Mail } from "lucide-react";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { useState } from "react";

interface SignInFormProps {
  isLoading: boolean
  setIsLoading: React.Dispatch<React.SetStateAction<boolean>>
}

export default function SignInForm({
  isLoading,
  setIsLoading
}: SignInFormProps) {
  const [showPassword, setShowPassword] = useState(false)
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  })

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)

    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 1500))

    // Mock user data - in real app this would come from API response
    const mockUser = {
      email: formData.email,
      role: formData.email.includes("organizer") ? "organizer" : "participant", // Mock logic
    }

    console.log("Sign in attempt:", formData)

    // Redirect based on role
    if (mockUser.role === "organizer") {
      window.location.href = "/dashboard"
    } else {
      window.location.href = "/events"
    }

    setIsLoading(false)
  }

  return <>
    <form onSubmit={handleSubmit} className="space-y-4">
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
            onChange={handleInputChange}
            placeholder="Enter your email"
            className="pl-10 bg-slate-700 border-slate-600 text-white placeholder:text-slate-400 h-12"
          />
        </div>
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
            onChange={handleInputChange}
            placeholder="Enter your password"
            className="pl-10 pr-10 bg-slate-700 border-slate-600 text-white placeholder:text-slate-400 h-12"
          />
          <button
            type="button"
            onClick={() => setShowPassword(!showPassword)}
            className="absolute right-3 top-1/2 transform -translate-y-1/2 text-slate-400 hover:text-slate-300"
          >
            {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
          </button>
        </div>
      </div>

      <Button
        type="submit"
        disabled={isLoading}
        className="w-full bg-orange-500 hover:bg-orange-600 text-white h-12 cursor-pointer"
      >
        {isLoading ? "Signing in..." : "Sign in"}
      </Button>
    </form>
  </>
}