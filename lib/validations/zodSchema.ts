import * as z from "zod";

export const updateAccountSchema = z.object({
  name: z.string().nonempty("Name is required"),
  description: z.string().nullable(),
});

export const changePasswordSchema = z.object({
  currentPassword: z.string().min(8, "Password must be at least 8 characters"),
  newPassword: z.string().min(8, "Password must be at least 8 characters"),
});

// AUTH Schema
export const completeRegistrationSchema = z.object({
  email: z.email("Email is invalid"),
  role: z.enum(["PARTICIPANT", "ORGANIZER"]),
});

export const registerSchema = z.object({
  name: z.string(),
  email: z.email("Email is invalid"),
  password: z.string().min(8, "Password must be at least 8 characters"),
  role: z.enum(["PARTICIPANT", "ORGANIZER"], "Please select your account type"),
});

// CRUD Event Schema
export const createEventSchema = z.object({
  title: z.string().min(1),
  description: z.string().min(1),
  dateTime: z.coerce.date(),
  duration: z.string(),
  category: z
    .enum(["CONFERENCE", "WORKSHOP", "CAREER_FAIR", "MEETUP", "HACKATHON"])
    .default("CONFERENCE"),
  location: z.string(),
  max_attendees: z.int("").positive(),
  status: z.enum(["DRAFT", "PUBLISHED"]).default("DRAFT"),
});
