import { createEventSchema } from "./validations/zodSchema";
import z from "zod";

export type CreateEventType = z.infer<typeof createEventSchema>;

export type EventType = {
  id: string;
  title: string;
  description: string;
  dateTime: Date;
  duration: string;
  location: string;
  category: string;
  max_attendees: number;
  _count: {
    attendeesList: number;
  };
  status: "DRAFT" | "PUBLISHED";
};
