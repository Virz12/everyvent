"use server";

import { prisma } from "@/lib/prisma";
import { revalidatePath } from "next/cache";
import { auth } from "@/auth";

export async function registerEvent(eventId: string) {
  const session = await auth();

  if (!session?.user?.id || session.user.role !== "PARTICIPANT") {
    throw new Error("Unauthorized");
  }

  const userId = session.user.id;

  // Check if already joined
  const alreadyJoined = await prisma.joinedEvent.findUnique({
    where: {
      userId_eventId: {
        userId,
        eventId,
      },
    },
  });

  if (alreadyJoined) {
    throw new Error("You already joined this event");
  }

  // Check max attendees
  const currentCount = await prisma.joinedEvent.count({
    where: {
      eventId,
    },
  });

  const event = await prisma.event.findUnique({
    where: { id: eventId },
    select: { max_attendees: true },
  });

  if (!event) {
    throw new Error("Event not found");
  }

  if (currentCount >= event.max_attendees) {
    throw new Error("This event is already full");
  }

  // Register the participant
  await prisma.joinedEvent.create({
    data: {
      userId,
      eventId,
    },
  });

  revalidatePath(`/events/${eventId}`);
}
