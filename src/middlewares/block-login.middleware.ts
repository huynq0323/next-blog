import { AUTH } from '@/constants/auth.constant'
import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

export function blockLoginMiddleware(request: NextRequest) {
  const token = request.cookies.get(AUTH.ACCESS_TOKEN)?.value

  // Nếu đã login → không cho vào lại trang login
  if (token && request.nextUrl.pathname === '/login') {
    return NextResponse.redirect(new URL('/', request.url))
  }
}
