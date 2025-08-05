import { DECODED_JWT, Role } from "@/constants/auth.constant";
import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function roleMiddleware(request: NextRequest) {
  const role = request.cookies.get(DECODED_JWT.ROLE)?.value;

  // Nếu login rồi nhưng role = user → chặn vào /admin
  if (role === Role.USER && request.nextUrl.pathname.startsWith("/admin")) {
    return NextResponse.redirect(new URL("/", request.url));
  }
}
