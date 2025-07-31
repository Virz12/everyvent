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

export type EventDetailType = {
  organizer: {
    description: string | null;
    email: string;
  };
  hasJoined: boolean;
  attendees: number;
  id: string;
  title: string;
  organizerName: string;
  description: string;
  dateTime: Date;
  duration: string;
  location: string;
  category: "CONFERENCE" | "WORKSHOP" | "CAREER_FAIR" | "MEETUP" | "HACKATHON";
  max_attendees: number;
};

export type EventListType = {
  events: EventType[];
  total: number;
  page: number;
  totalPages: number;
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

export type GetEventsParams = {
  query?: string;
  category?: string;
  page?: number;
  pageSize?: number;
};
