import Link from "next/link"
import { ArrowLeft } from "lucide-react"
import SignInCard from "@/components/auth/signin-card"

export default function SignInPage() {
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
      <SignInCard />
    </div>
  )
}
