"use server";

import * as z from "zod";
import { prisma } from "@/lib/prisma";
import { auth } from "@/auth";
import { compare } from "bcryptjs";

interface UpdatedData {
  name: string;
  email: string;
  password: string;
}

const updateAccountSchema = z.object({
  name: z.string().nonempty("Name is required"),
});

const changePasswordSchema = z.object({
  currentPassword: z.string().min(8),
  newPassword: z.string().min(8),
});

export const updateAccount = async (formData: FormData) => {
  const session = await auth();

  if (!session)
    return {
      success: false,
      error: "Unauthorized",
      status: 401,
    };

  const { name } = updateAccountSchema.parse({
    name: formData.get("name") as string,
  });

  try {
    const dataToUpdate: Partial<UpdatedData> = {};

    if (name) dataToUpdate.name = name;
    // if (password) dataToUpdate.password = await hash(password, 10);

    const updatedUser = await prisma.user.update({
      where: { id: session.user.id },
      data: { name },
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

  if (!session)
    return {
      success: false,
      error: "Unauthorized",
      status: 401,
    };

  const { currentPassword, newPassword } = changePasswordSchema.parse({
    currentPassword: formData.get("current-password") as string,
    newPassword: formData.get("new-password") as string,
  });

  try {
    const user = await prisma.user.findUnique({
      where: { id: session.user.id },
      select: { password: true },
    });

    const isValid = await compare(currentPassword, user?.password as string);

    if (!isValid) return { success: false, error: "Invalid password" };

    await prisma.user.update({
      where: { id: session.user.id },
      data: { password: newPassword },
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
