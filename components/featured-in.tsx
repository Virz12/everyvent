export function FeaturedIn() {
  const stats = [
    { number: "50K+", label: "Events Hosted" },
    { number: "2M+", label: "Happy Attendees" },
    { number: "10K+", label: "Event Organizers" },
    { number: "150+", label: "Cities Worldwide" },
  ]

  return (
    <section className="bg-slate-800 py-16 px-4 lg:px-6">
      <div className="container mx-auto">
        <div className="text-center mb-12">
          <h3 className="text-slate-400 text-sm uppercase tracking-wider mb-4">Trusted by thousands</h3>
          <h2 className="text-3xl font-bold text-white mb-8">Join our growing community</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {stats.map((stat, index) => (
              <div key={index} className="text-center">
                <div className="text-4xl font-bold text-blue-400 mb-2">{stat.number}</div>
                <div className="text-slate-300 text-sm">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
