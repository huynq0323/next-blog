import { AUTH } from "@/constants/auth.constant";
import { redirect } from "next/navigation";
import { NextResponse } from "next/server";

export async function POST(request: Request) {
  const { refreshToken } = await request.json();

  if (!refreshToken) {
    return NextResponse.json({ success: false }, { status: 401 });
  }

  const res = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/auth/refresh-token`,
    {
      method: "POST",
      credentials: "include",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ refreshToken }),
    }
  );

  if (!res.ok) {
    const response = NextResponse.json({ success: false }, { status: 401 });
    response.cookies.delete(AUTH.ACCESS_TOKEN);
    response.cookies.delete(AUTH.REFRESH_TOKEN);
    return response;
  }

  const data = await res.json();

  const response = NextResponse.json({
    success: true,
    accessToken: data.accessToken,
  });

  response.cookies.set(AUTH.ACCESS_TOKEN, data.accessToken, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    path: "/",
  });

  return response;
}
