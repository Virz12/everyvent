import Link from "next/link"
import { ArrowLeft } from "lucide-react"
import { RegisterCard } from "@/components/auth/register-card"

export default function RegisterPage() {
  return (
    <div className="w-full max-w-md my-12">
      {/* Back to Home */}
      <Link
        href="/"
        className="inline-flex items-center space-x-2 text-slate-300 hover:text-white transition-colors mb-8"
      >
        <ArrowLeft className="h-4 w-4" />
        <span>Back to Everyvent</span>
      </Link>
      <RegisterCard />
    </div>
  )
}