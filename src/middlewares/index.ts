import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

import { authMiddleware } from './auth.middleware'
import { roleMiddleware } from './role.middleware'
import { blockLoginMiddleware } from './block-login.middleware'

export function middleware(request: NextRequest) {
  return (
    blockLoginMiddleware(request) ||
    authMiddleware(request) ||
    roleMiddleware(request) ||
    NextResponse.next()
  )
}

export const config = {
  matcher: ['/', '/login', '/admin/:path*'],
}
