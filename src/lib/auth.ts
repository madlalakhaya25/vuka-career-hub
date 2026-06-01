import NextAuth from 'next-auth'
import Credentials from 'next-auth/providers/credentials'
import { PrismaAdapter } from '@auth/prisma-adapter'
import { prisma } from '@/lib/db'
import bcrypt from 'bcryptjs'
import { z } from 'zod'
import { authConfig } from '../auth.config'

const ADMIN_EMAILS = new Set([
  'madlalakhaya@yahoo.com',
  'madlalakhaya@gmail.com',
  'khaya@botlhale.ai',
])

const loginSchema = z.object({
  email: z.string().email(),
  password: z.string().min(8),
})

export const { auth, handlers, signIn, signOut } = NextAuth({
  ...authConfig,
  trustHost: true,
  adapter: PrismaAdapter(prisma),
  providers: [
    Credentials({
      credentials: {
        email: { label: 'Email', type: 'email' },
        password: { label: 'Password', type: 'password' },
      },
      async authorize(credentials) {
        const parsed = loginSchema.safeParse(credentials)
        if (!parsed.success) return null

        const user = await prisma.user.findUnique({
          where: { email: parsed.data.email },
        })
        if (!user || !user.password) return null

        const isValid = await bcrypt.compare(parsed.data.password, user.password)
        if (!isValid) return null

        const isAdmin = user.isAdmin || ADMIN_EMAILS.has(user.email ?? '')
        return { id: user.id, email: user.email, name: user.name, image: user.image, isAdmin }
      },
    }),
  ],
  session: { strategy: 'jwt' },
  callbacks: {
    jwt({ token, user }) {
      if (user) {
        token.id = user.id
        token.isAdmin = (user as { isAdmin?: boolean }).isAdmin ?? ADMIN_EMAILS.has(token.email as string ?? '')
      }
      // Re-check on every token refresh in case email is in ADMIN_EMAILS
      if (!token.isAdmin && ADMIN_EMAILS.has(token.email as string ?? '')) {
        token.isAdmin = true
      }
      return token
    },
    session({ session, token }) {
      if (token.id && session.user) {
        session.user.id = token.id as string
        ;(session.user as { isAdmin?: boolean }).isAdmin = token.isAdmin as boolean
      }
      return session
    },
  },
})
