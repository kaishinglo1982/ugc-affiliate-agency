import { getSessionCookie } from 'better-auth/cookies'
import { NextRequest, NextResponse } from 'next/server'

const protectedPrefixes = ['/admin', '/ugc-agency']

export function middleware(request: NextRequest) {
  const isProtected = protectedPrefixes.some((prefix) => request.nextUrl.pathname.startsWith(prefix))
  if (!isProtected) return NextResponse.next()

  const sessionCookie = getSessionCookie(request)
  if (sessionCookie) return NextResponse.next()

  const signInUrl = new URL('/sign-in', request.url)
  signInUrl.searchParams.set('callbackUrl', `${request.nextUrl.pathname}${request.nextUrl.search}`)
  return NextResponse.redirect(signInUrl)
}

export const config = {
  matcher: ['/admin/:path*', '/ugc-agency/:path*'],
}
