import { SessionProvider } from "next-auth/react";

export default function CompleteRegistrationLayout({
  children
}: {
  children: React.ReactNode
}) {
  return (
    <SessionProvider>
      {children}
    </SessionProvider>
  )
}