import NextAuth from 'next-auth'
import { authConfig } from './auth.config'

// Use only the edge-compatible config — no DB, no pg, no Node.js-only modules.
export default NextAuth(authConfig).auth

export const config = {
  matcher: ['/((?!api|_next/static|_next/image|favicon.ico|.*\\.png$).*)'],
}
