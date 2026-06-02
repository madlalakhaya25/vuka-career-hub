'use server'

import { signIn } from '@/lib/auth'
import { prisma } from '@/lib/db'
import { Resend } from 'resend'
import { z } from 'zod'
import bcrypt from 'bcryptjs'
import { redirect } from 'next/navigation'
import { AuthError } from 'next-auth'

const FROM = process.env.FROM_EMAIL ?? 'onboarding@resend.dev'

const signInSchema = z.object({
  email: z.string().email('Invalid email address'),
  password: z.string().min(1, 'Password is required'),
})

const registerSchema = z.object({
  name: z.string().min(2, 'Name must be at least 2 characters'),
  email: z.string().email('Invalid email address'),
  password: z.string().min(8, 'Password must be at least 8 characters'),
  province: z.string().optional(),
})

type ActionState = { error: string }

export async function signInAction(
  _prevState: ActionState,
  formData: FormData
): Promise<ActionState> {
  const parsed = signInSchema.safeParse({
    email: formData.get('email'),
    password: formData.get('password'),
  })

  if (!parsed.success) {
    return { error: parsed.error.issues[0].message }
  }

  try {
    await signIn('credentials', {
      email: parsed.data.email,
      password: parsed.data.password,
      redirectTo: '/dashboard',
    })
  } catch (error) {
    if (error instanceof AuthError) {
      return { error: 'Invalid email or password. Please try again.' }
    }
    throw error
  }

  return { error: '' }
}

export async function registerAction(
  _prevState: ActionState,
  formData: FormData
): Promise<ActionState> {
  const parsed = registerSchema.safeParse({
    name: formData.get('name'),
    email: formData.get('email'),
    password: formData.get('password'),
    province: formData.get('province') || undefined,
  })

  if (!parsed.success) {
    return { error: parsed.error.issues[0].message }
  }

  const existing = await prisma.user.findUnique({
    where: { email: parsed.data.email },
  })

  if (existing) {
    return { error: 'An account with this email already exists.' }
  }

  const hashedPassword = await bcrypt.hash(parsed.data.password, 12)

  await prisma.user.create({
    data: {
      name: parsed.data.name,
      email: parsed.data.email,
      password: hashedPassword,
      province: parsed.data.province,
    },
  })

  redirect('/login?registered=1')
}

export async function forgotPasswordAction(
  _prevState: ActionState,
  formData: FormData
): Promise<ActionState> {
  const email = (formData.get('email') as string)?.toLowerCase().trim()
  if (!email) return { error: 'Please enter your email address.' }

  const user = await prisma.user.findUnique({ where: { email } })

  // Always return success to not reveal whether email exists
  if (!user || !user.password) {
    return { error: '' }
  }

  await prisma.passwordResetToken.deleteMany({ where: { email } })

  const record = await prisma.passwordResetToken.create({
    data: {
      email,
      expiresAt: new Date(Date.now() + 60 * 60 * 1000),
    },
  })

  const resetUrl = `${process.env.AUTH_URL ?? 'http://localhost:3000'}/reset-password?token=${record.token}`

  const apiKey = process.env.RESEND_API_KEY
  if (!apiKey) {
    console.error('RESEND_API_KEY not configured')
    return { error: 'Email service not configured. Please contact support.' }
  }

  const resend = new Resend(apiKey)

  try {
    await resend.emails.send({
      from: FROM,
      to: email,
      subject: 'Reset your Vuka Career Hub password',
      html: `
        <div style="font-family:sans-serif;max-width:560px;margin:0 auto;color:#1e293b">
          <div style="background:linear-gradient(135deg,#fb923c,#c2410c);padding:32px;border-radius:16px 16px 0 0;text-align:center">
            <h1 style="color:white;margin:0;font-size:22px">Reset your password</h1>
          </div>
          <div style="background:#fff;padding:32px;border:1px solid #e2e8f0;border-top:none;border-radius:0 0 16px 16px">
            <p style="font-size:15px;line-height:1.6">Hi ${user.name ?? 'there'},</p>
            <p style="font-size:15px;line-height:1.6">
              We received a request to reset your Vuka Career Hub password. Click the button below to set a new one. This link expires in <strong>1 hour</strong>.
            </p>
            <div style="text-align:center;margin:28px 0">
              <a href="${resetUrl}" style="display:inline-block;background:#fb923c;color:white;padding:14px 28px;border-radius:12px;text-decoration:none;font-weight:700;font-size:15px">
                Reset Password
              </a>
            </div>
            <p style="font-size:13px;color:#94a3b8">
              If you didn't request this, you can safely ignore this email. Your password won't change.<br/><br/>
              © ${new Date().getFullYear()} Vuka Career Hub
            </p>
          </div>
        </div>
      `,
    })
  } catch (err) {
    console.error('Resend error:', err)
    return { error: 'Failed to send reset email. Please try again.' }
  }

  return { error: '' }
}

export async function resetPasswordAction(
  _prevState: ActionState,
  formData: FormData
): Promise<ActionState> {
  const token = formData.get('token') as string
  const password = formData.get('password') as string
  const confirm = formData.get('confirm') as string

  if (!token) return { error: 'Invalid reset link.' }
  if (!password || password.length < 8) return { error: 'Password must be at least 8 characters.' }
  if (password !== confirm) return { error: 'Passwords do not match.' }

  const record = await prisma.passwordResetToken.findUnique({ where: { token } })

  if (!record || record.expiresAt < new Date()) {
    return { error: 'This link has expired or is invalid. Please request a new one.' }
  }

  const hashedPassword = await bcrypt.hash(password, 12)

  await prisma.user.update({
    where: { email: record.email },
    data: { password: hashedPassword },
  })

  await prisma.passwordResetToken.delete({ where: { token } })

  redirect('/login?reset=1')
}
