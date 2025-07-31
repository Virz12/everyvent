"use server";

import { prisma } from "@/lib/prisma";
import { createEventSchema } from "@/lib/validations/zodSchema";
import * as z from "zod";
import { revalidatePath } from "next/cache";
import { auth } from "@/auth";
import { CreateEventType } from "@/lib/types";
import { format } from "date-fns";

// Dashboard data
export async function getDashboardData() {
  const session = await auth();
  const organizerId = session?.user?.id;

  const [totalEvents, publishedEvents, draftEvents, recentEvents] =
    await Promise.all([
      prisma.event.count({
        where: {
          organizerId,
        },
      }),
      prisma.event.count({ where: { status: "PUBLISHED", organizerId } }),
      prisma.event.count({ where: { status: "DRAFT", organizerId } }),
      prisma.event.findMany({
        orderBy: { dateTime: "desc" },
        take: 5,
        include: {
          _count: {
            select: {
              attendeesList: true,
            },
          },
        },
      }),
    ]);

  const formattedRecentEvents = recentEvents.map((event) => ({
    id: event.id,
    title: event.title,
    date: format(event.dateTime, "MMMM dd, yyyy"),
    time: format(event.dateTime, "HH:mm"),
    status: event.status.toLowerCase(),
    attendeeCount: event._count.attendeesList,
    maxAttendees: event.max_attendees,
  }));

  return {
    totalEvents,
    publishedEvents,
    draftEvents,
    recentEvents: formattedRecentEvents,
  };
}

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
  const organizerName = session.user.name;

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
      organizerName: organizerName as string,
    },
  });

  revalidatePath("/dashboard/organizer/events");
  return event;
}

// Read all events for the organizer
export async function getEvents() {
  const session = await auth();
  const organizerId = session?.user?.id;

  return await prisma.event.findMany({
    where: { organizerId },
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

  revalidatePath("/dashboard/organizer/events");
  return event;
}

// Delete event
export async function deleteEvent(id: string) {
  await prisma.event.delete({ where: { id } });
  revalidatePath("/dashboard/organizer/events");
}
