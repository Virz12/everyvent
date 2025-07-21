"use server";

import { signIn, signOut } from "@/auth";

// Auth with Google provider
export const login = async () => {
  await signIn("google", { redirectTo: "/dashboard/organizer" });
};

export const logout = async () => {
  await signOut({ redirectTo: "/" });
};
