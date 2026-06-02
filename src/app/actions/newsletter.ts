'use server'

import { Resend } from 'resend'
import { z } from 'zod'

const resend = new Resend(process.env.RESEND_API_KEY)
const FROM = process.env.FROM_EMAIL ?? 'noreply@vukacareerhub.co.za'

const schema = z.object({
  email: z.string().email('Please enter a valid email address'),
})

type State = { error: string; success: boolean }

export async function subscribeNewsletter(
  _prev: State,
  formData: FormData
): Promise<State> {
  const parsed = schema.safeParse({ email: formData.get('email') })
  if (!parsed.success) {
    return { error: parsed.error.issues[0].message, success: false }
  }

  const { email } = parsed.data

  try {
    await resend.emails.send({
      from: FROM,
      to: email,
      bcc: 'madlalakhaya@yahoo.com',
      subject: 'Welcome to Vuka Career Hub updates 🎓',
      html: `
        <div style="font-family:sans-serif;max-width:560px;margin:0 auto;color:#1e293b">
          <div style="background:linear-gradient(135deg,#fb923c,#c2410c);padding:32px;border-radius:16px 16px 0 0;text-align:center">
            <h1 style="color:white;margin:0;font-size:24px">You're in! 🎉</h1>
          </div>
          <div style="background:#fff;padding:32px;border:1px solid #e2e8f0;border-top:none;border-radius:0 0 16px 16px">
            <p style="font-size:16px;line-height:1.6">Hi there,</p>
            <p style="font-size:16px;line-height:1.6">
              Thanks for subscribing to <strong>Vuka Career Hub</strong>. We'll send you updates on new learnerships, bursaries, and opportunities — straight to your inbox, every week.
            </p>
            <p style="font-size:16px;line-height:1.6">In the meantime, explore what's available:</p>
            <div style="margin:24px 0;display:flex;gap:12px;flex-wrap:wrap">
              <a href="https://vukacareerhub.co.za/learnerships" style="display:inline-block;background:#fb923c;color:white;padding:12px 20px;border-radius:10px;text-decoration:none;font-weight:600;font-size:14px">Browse Learnerships</a>
              <a href="https://vukacareerhub.co.za/bursaries" style="display:inline-block;background:#fff;color:#fb923c;padding:12px 20px;border-radius:10px;text-decoration:none;font-weight:600;font-size:14px;border:2px solid #fb923c">Find Bursaries</a>
            </div>
            <p style="font-size:13px;color:#94a3b8;margin-top:32px">
              You can unsubscribe at any time by replying to this email.<br/>
              © ${new Date().getFullYear()} Vuka Career Hub · South Africa
            </p>
          </div>
        </div>
      `,
    })
  } catch {
    return { error: 'Something went wrong. Please try again.', success: false }
  }

  return { error: '', success: true }
}
