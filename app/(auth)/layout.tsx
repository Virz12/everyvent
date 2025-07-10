export default function AuthLayout({
  children
}: {
  children: React.ReactNode
}) {
  return <div className="min-h-screen bg-slate-900 flex items-center justify-center px-4">
    {children}
  </div>
}