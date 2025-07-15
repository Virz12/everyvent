import { Card, CardContent } from "@/components/ui/card";

export function Team() {
  return (
    <section className="bg-slate-900 py-20 px-4 lg:px-6">
      <div className="container mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-3xl lg:text-4xl font-bold text-white mb-4">Meet The Founder</h2>
          <p className="text-slate-300 text-lg max-w-2xl mx-auto">
            I'am a passionate team of event enthusiasts, technologists, and community builders working to make events
            better for everyone.
          </p>
        </div>

        <div className="flex justify-center gap-8">
          <Card className="bg-slate-800 border-slate-700 text-center">
            <CardContent className="p-6">
              <img
                src="https://placehold.co/200x200"
                alt="Virgi Riyadi"
                className="w-24 h-24 rounded-full mx-auto mb-4 object-cover"
              />
              <h3 className="text-white font-semibold text-lg mb-1">Virgi Riyadi</h3>
              <p className="text-orange-500 font-medium mb-3">Founder</p>
              <p className="text-slate-300 text-sm leading-relaxed">Former Everyvent with 1 year experience in web developing</p>
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  )
}