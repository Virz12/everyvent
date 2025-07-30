"use server";

import { prisma } from "@/lib/prisma";
import { revalidatePath } from "next/cache";
import { auth } from "@/auth";

// Read preview events
export async function getPreviewEvents() {
  return await prisma.event.findMany({
    where: {
      status: "PUBLISHED",
    },
    orderBy: { createdAt: "desc" },
    take: 3,
    include: {
      _count: {
        select: {
          attendeesList: true,
        },
      },
    },
  });
}

// Read all events
export async function getEvents() {
  return await prisma.event.findMany({
    where: {
      status: "PUBLISHED",
    },
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
