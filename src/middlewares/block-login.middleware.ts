import { AUTH } from "@/constants/auth.constant";
import { isTokenExpired } from "@/utils/tokens";
import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export async function blockLoginMiddleware(request: NextRequest) {
  const token = request.cookies.get(AUTH.ACCESS_TOKEN)?.value;
  if (request.nextUrl.pathname === "/login" && token) {
    if (!isTokenExpired(token)) {
      return NextResponse.redirect(new URL("/", request.url));
    } else {
      const response = NextResponse.next();
      response.cookies.delete(AUTH.ACCESS_TOKEN);
      response.cookies.delete(AUTH.REFRESH_TOKEN);
      // response.cookies.delete(AUTH.ROLE);
      // response.cookies.delete(AUTH.USER_ID);
      return response;
    }
  }

  return NextResponse.next();
}
