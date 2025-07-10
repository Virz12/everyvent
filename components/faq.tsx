import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"

export function FAQ() {
  const faqs = [
    {
      question: "How do I create an event on EventHub?",
      answer:
        "Creating an event is simple! Sign up for an organizer account, click 'Create Event' in your dashboard, and fill out the event details including title, description, date, location, and attendee capacity. Once submitted, your event will be published and visible to our community.",
    },
    {
      question: "Is EventHub free to use?",
      answer:
        "Yes! EventHub is completely free for both event organizers and attendees. You can create unlimited events, manage attendees, and join events without any cost. We believe in making community building accessible to everyone.",
    },
    {
      question: "What types of events can I host?",
      answer:
        "EventHub supports all types of events including team building workshops, networking mixers, executive retreats, milestone celebrations, holiday parties, and offsite retreats. Whether it's a small workshop or a large conference, our platform can handle it.",
    },
    {
      question: "How do I manage event attendees?",
      answer:
        "As an organizer, you have access to a comprehensive attendees dashboard where you can view all registrations, track attendance status, export attendee data, and communicate with participants. You can see confirmed, pending, and cancelled registrations in real-time.",
    },
    {
      question: "Can I edit or cancel my event after publishing?",
      answer:
        "Absolutely! You can edit event details, update descriptions, change dates, or even cancel events from your organizer dashboard. We recommend notifying attendees of any major changes. Cancelled events will automatically notify all registered participants.",
    },
    {
      question: "How do attendees find and join events?",
      answer:
        "Attendees can browse events by category (team building, networking, executive, etc.), search by keywords, filter by location and date, and view detailed event information. Joining an event is as simple as clicking 'Join Event' and providing basic registration details.",
    },
  ]

  return (
    <section className="bg-slate-800 py-24 px-4 lg:px-6">
      <div className="container mx-auto">
        <div className="grid lg:grid-cols-2 gap-12 items-start">
          <div className="space-y-6">
            <div className="space-y-4">
              <h2 className="text-3xl lg:text-4xl font-bold text-white">Frequently Asked Questions</h2>
              <p className="text-slate-300 text-lg">
                Find answers to common questions about using EventHub, creating events, and managing your bookings.
              </p>
            </div>

            <Accordion type="single" collapsible className="space-y-4">
              {faqs.map((faq, index) => (
                <AccordionItem
                  key={index}
                  value={`item-${index}`}
                  className="bg-slate-900 border-slate-700 rounded-lg px-6"
                >
                  <AccordionTrigger className="text-white hover:text-orange-500 text-left">
                    {faq.question}
                  </AccordionTrigger>
                  <AccordionContent className="text-slate-300">{faq.answer}</AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </div>

          <div className="relative">
            <div className="bg-linear-to-br from-orange-500 to-red-600 rounded-2xl p-8 text-center">
              <div className="grid grid-cols-3 gap-4 mb-6">
                {[...Array(9)].map((_, i) => (
                  <div key={i} className="bg-white/20 rounded-lg h-16 flex items-center justify-center">
                    <span className="text-white font-bold text-lg">FAQ</span>
                  </div>
                ))}
              </div>
              <h3 className="text-white font-bold text-xl mb-2">Still have questions?</h3>
              <p className="text-white/80 mb-4">Our support team is here to help</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
