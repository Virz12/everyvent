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

  // Register the participant
  await prisma.joinedEvent.create({
    data: {
      userId,
      eventId,
    },
  });

  revalidatePath(`/events/${eventId}`);
}
