// src/app/middleware.ts
import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function middleware(request: NextRequest) {
  const token = request.cookies.get("token");
  console.log("Token:", token); // Ajoutez un log pour déboguer

  const publicPaths = ["/login", "/register", "/api/auth/local"];

  if (publicPaths.includes(request.nextUrl.pathname) || token) {
    return NextResponse.next();
  }

  console.log("Redirecting to /login"); // Ajoutez un log pour déboguer
  return NextResponse.redirect(new URL("/login", request.url));
}

export const config = {
  matcher: ["/((?!api|_next/static|_next/image|favicon.ico).*)"],
};
