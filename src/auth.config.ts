import type { NextAuthConfig } from 'next-auth'

// Edge-compatible auth config — no DB imports, no Node.js-only modules.
// Used by middleware for session checks only.
export const authConfig = {
  trustHost: true,
  session: { strategy: 'jwt' },
  pages: {
    signIn: '/login',
  },
  callbacks: {
    authorized({ auth, request: { nextUrl } }) {
      const isLoggedIn = !!auth?.user
      const isAdmin = !!(auth?.user as { isAdmin?: boolean } | undefined)?.isAdmin

      if (nextUrl.pathname.startsWith('/admin')) {
        return isAdmin
      }

      const protectedPaths = ['/dashboard', '/saved']
      const isProtected = protectedPaths.some((p) =>
        nextUrl.pathname.startsWith(p)
      )
      if (isProtected && !isLoggedIn) return false
      return true
    },
    session({ session, token }) {
      if (session.user) {
        ;(session.user as { isAdmin?: boolean }).isAdmin = token.isAdmin as boolean
      }
      return session
    },
  },
  providers: [],
} satisfies NextAuthConfig
