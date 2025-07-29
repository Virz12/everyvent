"use server";

import { prisma } from "@/lib/prisma";
import { createEventSchema } from "@/lib/validations/zodSchema";
import * as z from "zod";
import { revalidatePath } from "next/cache";
import { auth } from "@/auth";
import { CreateEventType } from "@/lib/types";

// Create event
export async function createEvent(data: CreateEventType) {
  const session = await auth();

  if (
    !session?.user?.id ||
    (session?.user?.role as unknown as string) != "ORGANIZER"
  ) {
    throw new Error("Unauthorized");
  }

  const organizerId = session.user.id;

  const validation = createEventSchema.safeParse(data);

  if (!validation.success) {
    return {
      success: false,
      errors: z.treeifyError(validation.error),
    };
  }

  const event = await prisma.event.create({
    data: {
      ...validation.data,
      organizerId,
    },
  });

  revalidatePath("/dashboard/organizer/events");
  return event;
}

// Read all events
export async function getEvents() {
  return await prisma.event.findMany({
    orderBy: { createdAt: "desc" },
    include: {
      _count: {
        select: {
          attendeesList: true,
        },
      },
    },
  });
}

// Read event by ID
export async function getEvent(id: string) {
  return await prisma.event.findUnique({
    where: { id },
  });
}

// Update event
export async function updateEvent(id: string, data: Partial<CreateEventType>) {
  const parsed = createEventSchema.partial().safeParse(data);
  if (!parsed.success) {
    throw new Error("Invalid event data");
  }

  const event = await prisma.event.update({
    where: { id },
    data: parsed.data,
  });

  revalidatePath("/events");
  return event;
}

// Delete event
export async function deleteEvent(id: string) {
  await prisma.event.delete({ where: { id } });
  revalidatePath("/events");
}
