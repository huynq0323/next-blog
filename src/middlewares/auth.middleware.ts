import { AUTH } from "@/constants/auth.constant";
import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function authMiddleware(request: NextRequest) {
  const token = request.cookies.get(AUTH.ACCESS_TOKEN)?.value;

  // Nếu chưa login mà vào /admin → chuyển về /login
  if (!token && request.nextUrl.pathname.startsWith("/admin")) {
    return NextResponse.redirect(new URL("/login", request.url));
  }
}
