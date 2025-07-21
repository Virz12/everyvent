import { auth } from "@/auth";
import { NextResponse } from "next/server";

export default auth(async function middleware(req) {
  const { nextUrl } = req;
  const token = req.auth;

  console.log(token);

  const pathname = nextUrl.pathname;

  // Redirect unauthenticated users
  if (!token && pathname.startsWith("/dashboard")) {
    return NextResponse.redirect(new URL("/signin", req.url));
  }

  // Force complete registration if no role
  if (token && !token?.user?.role) {
    if (!pathname.startsWith("/complete-registration")) {
      return NextResponse.redirect(new URL("/complete-registration", req.url));
    }
  }

  // Force dashboard if has role
  if (token && token?.user?.role) {
    if (pathname.startsWith("/complete-registration")) {
      return NextResponse.redirect(
        new URL(`/dashboard/${token.user.role.toLowerCase()}`, req.url)
      );
    }
  }

  // Redirect logged-in users away from login/register
  if (["/signin", "/register"].includes(pathname) && token?.user?.role) {
    return NextResponse.redirect(
      new URL(`/dashboard/${token.user.role.toLowerCase()}`, req.url)
    );
  }

  // Role-based protection
  if (
    pathname.startsWith("/dashboard/organizer") &&
    token?.user?.role !== "ORGANIZER"
  ) {
    return NextResponse.redirect(new URL("/dashboard/participant", req.url));
  } else if (
    pathname.startsWith("/dashboard/participant") &&
    token?.user?.role !== "PARTICIPANT"
  ) {
    return NextResponse.redirect(new URL("/dashboard/organizer", req.url));
  }

  return NextResponse.next();
});

export const config = {
  matcher: ["/((?!api|_next|static|.*\\..*).*)"],
};
