import { NextResponse } from "next/server"
import type { NextRequest } from "next/server"
import { getToken } from "next-auth/jwt"

// Rate limiting map
const rateLimit = new Map<string, { count: number; timestamp: number }>()
const RATE_LIMIT_WINDOW = 60 * 1000 // 1 minute
const MAX_REQUESTS = 60 // 60 requests per minute

export async function middleware(request: NextRequest) {
  // Rate limiting
  const ip = request.headers.get('x-forwarded-for') || request.headers.get('x-real-ip') || 'anonymous'
  const now = Date.now()
  const windowStart = now - RATE_LIMIT_WINDOW

  const requestLog = rateLimit.get(ip) ?? { count: 0, timestamp: now }
  if (requestLog.timestamp < windowStart) {
    requestLog.count = 1
    requestLog.timestamp = now
  } else {
    requestLog.count++
  }
  rateLimit.set(ip, requestLog)

  if (requestLog.count > MAX_REQUESTS) {
    return new NextResponse('Too Many Requests', { status: 429 })
  }

  const token = await getToken({
    req: request,
    secret: process.env.NEXTAUTH_SECRET,
  })

  const isAuthPage = request.nextUrl.pathname.startsWith('/login') || 
                    request.nextUrl.pathname.startsWith('/register')

  if (isAuthPage) {
    if (token) {
      return NextResponse.redirect(new URL('/dashboard', request.url))
    }
    return NextResponse.next()
  }

  if (!token && request.nextUrl.pathname.startsWith('/dashboard')) {
    return NextResponse.redirect(new URL('/login', request.url))
  }

  // Add security headers to all responses
  const response = NextResponse.next()

  // Set security headers
  const headers = response.headers

  // Content Security Policy with stricter rules
  headers.set(
    "Content-Security-Policy",
    "default-src 'self'; script-src 'self' 'unsafe-inline' 'unsafe-eval'; style-src 'self' 'unsafe-inline'; img-src 'self' data: https:; font-src 'self' data:; connect-src 'self'; frame-ancestors 'none'; form-action 'self'; base-uri 'self'; object-src 'none';"
  )

  // XSS Protection
  headers.set("X-XSS-Protection", "1; mode=block")

  // Prevent MIME type sniffing
  headers.set("X-Content-Type-Options", "nosniff")

  // Referrer Policy
  headers.set("Referrer-Policy", "strict-origin-when-cross-origin")

  // Frame Options
  headers.set("X-Frame-Options", "DENY")

  // Permissions Policy
  headers.set(
    "Permissions-Policy",
    "accelerometer=(), camera=(), geolocation=(), gyroscope=(), magnetometer=(), microphone=(), payment=(), usb=(), interest-cohort=()"
  )

  // HSTS (HTTP Strict Transport Security)
  headers.set(
    "Strict-Transport-Security",
    "max-age=31536000; includeSubDomains; preload"
  )

  // Cache Control
  headers.set(
    "Cache-Control",
    "no-store, max-age=0, must-revalidate"
  )

  return response
}

export const config = {
  matcher: ["/((?!api|_next/static|_next/image|favicon.ico).*)"],
}
