"use server";

import * as z from "zod";
import { prisma } from "@/lib/prisma";
import { auth } from "@/auth";
import { compare, hash } from "bcryptjs";
import {
  changePasswordSchema,
  updateAccountSchema,
} from "@/lib/validations/zodSchema";

export const getAccount = async () => {
  const session = await auth();

  if (!session)
    return {
      success: false,
      error: "Unauthorized",
      status: 401,
    };

  try {
    const userDesc = await prisma.user.findUnique({
      where: { id: session.user.id },
      select: { description: true },
    });

    return {
      success: true,
      data: userDesc,
    };
  } catch (error) {
    console.log(error);

    return {
      success: false,
      error: "Internal server error",
      status: 500,
    };
  }
};

export const updateAccount = async (formData: FormData) => {
  const session = await auth();
  const name = formData.get("name") as string;
  const description = formData.get("description") as string;

  if (!session)
    return {
      success: false,
      error: "Unauthorized",
      status: 401,
    };

  const validation = updateAccountSchema.safeParse({
    name,
    description,
  });

  if (!validation.success) {
    return {
      success: false,
      errors: z.treeifyError(validation.error),
    };
  }

  try {
    const updatedUser = await prisma.user.update({
      where: { id: session.user.id },
      data: { name, description: description || null },
    });

    return {
      success: true,
      data: {
        name: updatedUser.name,
      },
    };
  } catch (error) {
    console.log(error);

    return {
      success: false,
      error: "Internal server error",
      status: 500,
    };
  }
};

export const changePassword = async (formData: FormData) => {
  const session = await auth();
  const currentPassword = formData.get("current-password") as string;
  const newPassword = formData.get("new-password") as string;

  if (!session)
    return {
      success: false,
      error: "Unauthorized",
      status: 401,
    };

  const validation = changePasswordSchema.safeParse({
    currentPassword,
    newPassword,
  });

  if (!validation.success) {
    return {
      success: false,
      errors: z.treeifyError(validation.error),
    };
  }

  try {
    const user = await prisma.user.findUnique({
      where: { id: session.user.id },
      select: { password: true },
    });

    const isValid = await compare(currentPassword, user?.password as string);

    if (!isValid) return { success: false, errors: "Invalid password" };

    const hashedPassword = await hash(newPassword, 10);

    await prisma.user.update({
      where: { id: session.user.id },
      data: { password: hashedPassword },
    });

    return {
      success: true,
    };
  } catch (error) {
    return {
      success: false,
      errors: "Internal server error: " + error,
      status: 500,
    };
  }
};

export const deleteAccount = async (id: string) => {
  try {
    await prisma.user.delete({
      where: { id },
    });

    return {
      success: true,
    };
  } catch (error) {
    console.log(error);

    return {
      success: false,
      error: "Internal server error",
      status: 500,
    };
  }
};
