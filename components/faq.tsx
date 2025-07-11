import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"

export function FAQ() {
  const faqs = [
    {
      question: "How do I create an event on Everyvent?",
      answer:
        "Creating an event is simple! Sign up for an organizer account, click 'Create Event' in your dashboard, and fill out the event details including title, description, date, location, and attendee capacity. Once submitted, your event will be published and visible to our community.",
    },
    {
      question: "Is Everyvent free to use?",
      answer:
        "Yes! Everyvent is completely free for both event organizers and attendees. You can create unlimited events, manage attendees, and join events without any cost. We believe in making community building accessible to everyone.",
    },
    {
      question: "What types of events can I host?",
      answer:
        "Everyvent supports all types of events including team building workshops, networking mixers, executive retreats, milestone celebrations, holiday parties, and offsite retreats. Whether it's a small workshop or a large conference, our platform can handle it.",
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
      <div className="container mx-auto max-w-4xl">
        <div className="space-y-8">
          <div className="text-center space-y-4">
            <h2 className="text-3xl lg:text-4xl font-bold text-white">Frequently Asked Questions</h2>
            <p className="text-slate-300 text-lg">
              Find answers to common questions about using Everyvent, creating events, and managing your bookings.
            </p>
          </div>

          <Accordion type="single" collapsible className="space-y-4">
            {faqs.map((faq, index) => (
              <AccordionItem
                key={index}
                value={`item-${index}`}
                className="bg-slate-900 border-slate-700 rounded-lg px-6"
              >
                <AccordionTrigger className="text-white hover:text-orange-500 text-left cursor-pointer">
                  {faq.question}
                </AccordionTrigger>
                <AccordionContent className="text-slate-300">{faq.answer}</AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>
      </div>
    </section>
  )
}
