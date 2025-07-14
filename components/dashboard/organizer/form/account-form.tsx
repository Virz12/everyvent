import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";

export default function AccountForm() {
  return (
    <form action="">
      <div className="flex flex-col gap-4">
        <div className="flex flex-col md:flex-row justify-between shrink space-y-4 md:space-y-0 space-x-4">
          <Label htmlFor="name" className="items-start text-slate-300">Account Name</Label>
          <div className="w-auto md:w-1/2">
            <Input
              id="name"
              className=""
              placeholder="Account Name" />
          </div>
        </div>
        <div className="flex flex-col md:flex-row justify-between shrink space-y-4 md:space-y-0 space-x-4">
          <Label htmlFor="description" className="items-start text-slate-300">Account Description</Label>
          <div className="w-auto md:w-1/2">
            <Textarea
              id="description"
              className=""
              rows={4}
              placeholder="please describe your account" />
          </div>
        </div>
        <div className="flex flex-col md:flex-row justify-between shrink space-y-4 md:space-y-0 space-x-4">
          <Label htmlFor="email" className="items-start text-slate-300">Email</Label>
          <div className="w-auto md:w-1/2">
            <Input
              type="email"
              id="email"
              className=""
              placeholder="everyvent@gmail.com" />
          </div>
        </div>
        <div className="flex flex-col md:flex-row justify-between shrink space-y-4 md:space-y-0 space-x-4">
          <Label htmlFor="phone" className="items-start text-slate-300">Phone Number</Label>
          <div className="w-auto md:w-1/2">
            <Input
              type="text"
              id="phone"
              className=""
              placeholder="+1 (123) 456-7890" />
          </div>
        </div>
        <div className="flex flex-col md:flex-row justify-between shrink space-y-4 md:space-y-0 space-x-4">
          <Label htmlFor="avatar" className="items-start text-slate-300">Profile Picture</Label>
          <div className="w-auto md:w-1/2">
            <Input
              type="file"
              id="avatar"
              className="text-xs" />
          </div>
        </div>
        <div>
          <Button type="submit" className="w-full md:w-auto bg-orange-500 hover:bg-orange-600 text-white cursor-pointer">
            Save Changes
          </Button>
        </div>
      </div>
    </form>
  )
}