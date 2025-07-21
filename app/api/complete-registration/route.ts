"use server";

import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";
import z from "zod";

// Zod Schema
const completeRegistrationSchema = z.object({
  email: z.email(),
  role: z.enum(["PARTICIPANT", "ORGANIZER"]),
});

export async function POST(req: Request) {
  try {
    const { email, role } = await req.json();

    completeRegistrationSchema.parse({
      email,
      role,
    });

    await prisma.user.update({
      where: { email },
      data: { role },
    });

    return NextResponse.json({ success: true }, { status: 200 });
  } catch (error) {
    console.log(error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 400 }
    );
  }
}
