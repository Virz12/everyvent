import { Button } from "@/components/ui/button"
import { GoogleIcon } from "@/components/icons/google-icon"

export function GoogleSignButton({
  onClick,
  disabled,
}: {
  onClick: () => void
  disabled: boolean
}) {
  return (
    <Button
      onClick={onClick}
      disabled={disabled}
      variant="outline"
      className="w-full bg-white hover:bg-gray-50 text-slate-300 border-gray-300 h-12 cursor-pointer"
    >
      <GoogleIcon className="h-5 w-5 mr-3" />
      Continue with Google
    </Button>
  )
}