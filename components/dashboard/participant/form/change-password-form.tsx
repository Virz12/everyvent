'use client'

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { changePassword } from "@/lib/actions/account";
import { Eye, EyeOff } from "lucide-react";
import { useState } from "react";

export default function ChangePasswordForm() {
  const [showCurrentPassword, setShowCurrentPassword] = useState(false)
  const [showNewPassword, setShowNewPassword] = useState(false)
  const [showConfirmPassword, setShowConfirmPassword] = useState(false)
  const [isLoading, setIsLoading] = useState(false)

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()

    setIsLoading(true)

    const formData = new FormData(e.currentTarget)

    if (formData.get("new-password") !== formData.get("confirm-password")) {
      alert("Passwords do not match")
      setIsLoading(false)
      return
    }

    const res = await changePassword(formData)

    if (res.success) {
      alert("Password updated!");
    }
  }

  return (
    <form onSubmit={handleSubmit}>
      <div className="flex flex-col gap-4">
        <div className="flex flex-col md:flex-row justify-between shrink space-y-4 md:space-y-0 space-x-4">
          <Label htmlFor="current-password" className="items-start text-slate-300">Current Password</Label>
          <div className="w-auto md:w-1/2 relative">
            <Input
              id="current-password"
              type={showCurrentPassword ? 'text' : 'password'}
              name="current-password"
              placeholder="Old Password"
            />
            <button
              type="button"
              onClick={() => setShowCurrentPassword(!showCurrentPassword)}
              className="absolute right-3 top-1/2 transform -translate-y-1/2 text-slate-400 hover:text-slate-300"
            >
              {showCurrentPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
            </button>
          </div>
        </div>
        <div className="flex flex-col md:flex-row justify-between shrink space-y-4 md:space-y-0 space-x-4">
          <Label htmlFor="new-password" className="items-start text-slate-300">New Password</Label>
          <div className="w-auto md:w-1/2 relative">
            <Input
              type={showNewPassword ? 'text' : 'password'}
              id="new-password"
              name="new-password"
              placeholder="New Password"
            />
            <button
              type="button"
              onClick={() => setShowNewPassword(!showNewPassword)}
              className="absolute right-3 top-1/2 transform -translate-y-1/2 text-slate-400 hover:text-slate-300"
            >
              {showNewPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
            </button>
          </div>
        </div>
        <div className="flex flex-col md:flex-row justify-between shrink space-y-4 md:space-y-0 space-x-4">
          <Label htmlFor="confirm-password" className="items-start text-slate-300">Confirm Password</Label>
          <div className="w-auto md:w-1/2 relative">
            <Input
              type={showConfirmPassword ? 'text' : 'password'}
              id="confirm-password"
              name="confirm-password"
              placeholder="Confirm Password"
            />
            <button
              type="button"
              onClick={() => setShowConfirmPassword(!showConfirmPassword)}
              className="absolute right-3 top-1/2 transform -translate-y-1/2 text-slate-400 hover:text-slate-300"
            >
              {showConfirmPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
            </button>
          </div>
        </div>
        <div>
          <Button
            type="submit"
            className="w-full md:w-auto bg-orange-500 hover:bg-orange-600 text-white cursor-pointer"
            disabled={isLoading}>
            {isLoading ? 'Updating...' : 'Save Changes'}
          </Button>
        </div>
      </div>
    </form>
  )
}