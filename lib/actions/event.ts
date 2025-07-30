"use server";

import { prisma } from "@/lib/prisma";
import { revalidatePath } from "next/cache";
import { auth } from "@/auth";
import { GetEventsParams } from "@/lib/types";

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
export async function getEvents({
  query = "",
  category = "",
  page = 1,
}: GetEventsParams) {
  const pageSize = 9;
  const where: any = {
    AND: [
      { status: "PUBLISHED" },
      query && { title: { contains: query, mode: "insensitive" } },
      category && { category },
    ].filter(Boolean),
  };

  const [events, total] = await Promise.all([
    prisma.event.findMany({
      where,
      skip: (page - 1) * pageSize,
      take: pageSize,
      orderBy: { createdAt: "desc" },
      include: {
        _count: {
          select: {
            attendeesList: true,
          },
        },
      },
    }),
    prisma.event.count({ where }),
  ]);

  return {
    events,
    total,
    page,
    totalPages: Math.ceil(total / pageSize),
  };
}

// Read event by ID
export async function getEvent(id: string) {
  const data = await prisma.event.findUnique({
    where: { id },
    include: {
      _count: {
        select: {
          attendeesList: true,
        },
      },
      organizer: {
        select: {
          description: true,
          email: true,
        },
      },
    },
  });

  const session = await auth();
  const userId = session?.user.id;
  let hasJoined;

  if (userId) {
    hasJoined = await prisma.event.findFirst({
      where: {
        id,
        attendeesList: {
          some: {
            userId,
          },
        },
      },
    });
  } else {
    hasJoined = false;
  }

  if (!data || !data.organizer) {
    return null;
  }

  return {
    organizer: {
      description: data.organizer.description,
      email: data.organizer.email,
    },
    hasJoined: Boolean(hasJoined),
    attendees: data?._count.attendeesList,
    id: data?.id,
    title: data?.title,
    organizerName: data?.organizerName,
    description: data?.description,
    dateTime: data?.dateTime,
    duration: data?.duration,
    location: data?.location,
    category: data?.category,
    max_attendees: data?.max_attendees,
  };
}
