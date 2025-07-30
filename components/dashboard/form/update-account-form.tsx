'use client'

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { getAccount, updateAccount } from "@/lib/actions/account";
import { useSession } from "next-auth/react";
import { useEffect, useState } from "react";

export default function UpdateAccountForm() {
  const [isLoading, setIsLoading] = useState(false)
  const [description, setDescription] = useState('')

  const { data: session, update } = useSession()
  const currentUser = session?.user

  useEffect(() => {
    getAccountDesc()
  }, [])

  const getAccountDesc = async () => {
    const { data } = await getAccount()

    if (data) {
      setDescription(data.description as string)
    }
  }

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()

    setIsLoading(true)

    const formData = new FormData(e.currentTarget)
    const res = await updateAccount(formData)

    if (res.success) {
      const user = res.data

      await update({
        name: user?.name,
      });

      alert("Profile updated!");
      window.location.reload();
    }
  }

  return (
    <form onSubmit={handleSubmit}>
      <div className="flex flex-col gap-4">
        {/* Account Name */}
        <div className="flex flex-col md:flex-row justify-between shrink space-y-4 md:space-y-0 space-x-4">
          <Label htmlFor="name" className="items-start text-slate-300">Account Name</Label>
          <div className="w-auto md:w-1/2">
            <Input
              id="name"
              name="name"
              defaultValue={currentUser?.name ?? ''}
              placeholder="Account Name"
              autoComplete="off" />
          </div>
        </div>
        {/* Description */}
        {currentUser?.role === 'ORGANIZER' && (
          <div className="flex flex-col md:flex-row justify-between shrink space-y-4 md:space-y-0 space-x-4">
            <Label htmlFor="description" className="items-start text-slate-300">Account Description</Label>
            <div className="w-auto md:w-1/2">
              <Textarea
                name="description"
                id="description"
                defaultValue={description}
                placeholder="Account Description"
                className="resize-none"
              >
              </Textarea>
            </div>
          </div>
        )}
        {/* Email */}
        <div className="flex flex-col md:flex-row justify-between shrink space-y-4 md:space-y-0 space-x-4">
          <Label htmlFor="email" className="items-start text-slate-300">Email</Label>
          <div className="w-auto md:w-1/2">
            <Input
              type="email"
              id="email"
              defaultValue={currentUser?.email ?? ''}
              placeholder="your email"
              readOnly
              disabled />
          </div>
        </div>
        {/* Button */}
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