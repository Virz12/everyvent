export default function Stats() {
  const stats = [
    { number: "1K+", label: "Events Hosted" },
    { number: "24K+", label: "Happy Attendees" },
    { number: "120+", label: "Event Organizers" },
    { number: "20+", label: "Cities Worldwide" },
  ]

  return (
    <section className="bg-slate-800 py-16 px-4 lg:px-6">
      <div className="container mx-auto">
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {stats.map((stat, index) => (
            <div key={index} className="text-center">
              <div className="text-3xl lg:text-4xl font-bold text-orange-500 mb-2">{stat.number}</div>
              <div className="text-slate-300 text-lg">{stat.label}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}