import { CredentialsSignin } from "@auth/core/errors";

// Custom Error class for Credentials Signin
class InvalidLoginError extends CredentialsSignin {
  code = "custom";
  constructor(message: string) {
    super(message);
    this.code = message;
  }
}

import type { NextAuthConfig } from "next-auth";
import Google from "next-auth/providers/google";
import CredentialsProvider from "next-auth/providers/credentials";
import { compare } from "bcryptjs";
import { prisma } from "@/lib/prisma";

export default {
  providers: [
    Google,
    CredentialsProvider({
      name: "credentials",
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        if (!credentials?.email || !credentials?.password) {
          throw new InvalidLoginError(
            "Invalid email or password. Please try again."
          );
        }

        const user = await prisma.user.findUnique({
          where: { email: credentials.email as string },
        });

        if (!user || !user.password) {
          throw new InvalidLoginError(
            "Invalid email or password. Please try again."
          );
        }

        const isValid = await compare(
          credentials.password as string,
          user.password as string
        );

        if (!isValid) {
          throw new InvalidLoginError(
            "Invalid email or password. Please try again."
          );
        }

        return user;
      },
    }),
  ],
} satisfies NextAuthConfig;
