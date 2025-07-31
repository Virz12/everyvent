"use server";

import { prisma } from "@/lib/prisma";
import { completeRegistrationSchema } from "@/lib/validations/zodSchema";
import { NextResponse } from "next/server";

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

    return NextResponse.json({ success: true, role }, { status: 200 });
  } catch (error) {
    console.log(error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 400 }
    );
  }
}
