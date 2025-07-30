import { createEventSchema } from "./validations/zodSchema";
import z from "zod";

export type CreateEventType = z.infer<typeof createEventSchema>;

export type EventType = {
  id: string;
  title: string;
  organizerName: string;
  description: string;
  dateTime: Date;
  duration: string;
  location: string;
  category: "CONFERENCE" | "WORKSHOP" | "CAREER_FAIR" | "MEETUP" | "HACKATHON";
  max_attendees: number;
  _count: {
    attendeesList: number;
  };
  status: "DRAFT" | "PUBLISHED";
};

export type DashboardDataProps = {
  totalEvents: number;
  publishedEvents: number;
  draftEvents: number;
  recentEvents: {
    id: string;
    title: string;
    date: string;
    time: string;
    status: string;
    attendeeCount: number;
    maxAttendees: number;
  }[];
};
