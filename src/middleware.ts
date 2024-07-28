import type { NextRequest } from "next/server";

export function middleware(request: NextRequest) {
    const userRole = request.cookies.get("user_role")?.value;
    if (!userRole && !["/", "/login", "/register"].includes(request.nextUrl.pathname)) {
        return Response.redirect(new URL('/login', request.url));
    }
}
export const config = {
    matcher: [
      '/((?!_next|api/auth).*)(.+)'
    ],
  }

