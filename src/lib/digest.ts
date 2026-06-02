import { prisma } from '@/lib/db'
import { Resend } from 'resend'
import type { Bursary, Learnership } from '@/generated/prisma/client'

const ADMIN_EMAIL = 'madlalakhaya@yahoo.com'
const FROM = process.env.FROM_EMAIL ?? 'onboarding@resend.dev'
const ADMIN_URL = process.env.AUTH_URL ?? 'https://vuka-career-hub.vercel.app'

interface RSSItem { title: string; link: string; company: string; snippet: string }

function parseRSS(xml: string): RSSItem[] {
  const items = xml.match(/<item>([\s\S]*?)<\/item>/g) ?? []
  return items.slice(0, 8).map((item) => {
    const tag = (name: string) => {
      const m = item.match(new RegExp(`<${name}[^>]*>(?:<!\\[CDATA\\[([\\s\\S]*?)\\]\\]>|([^<]*))<\\/${name}>`))
      return (m?.[1] ?? m?.[2] ?? '').trim()
    }
    return {
      title: tag('title'),
      link: tag('guid') || tag('link'),
      company: tag('source') || tag('author'),
      snippet: tag('description').replace(/<[^>]+>/g, '').slice(0, 120),
    }
  }).filter((i) => i.title)
}

async function fetchIndeedRSS(query: string): Promise<RSSItem[]> {
  try {
    const url = `https://za.indeed.com/rss?q=${encodeURIComponent(query)}&sort=date&fromage=7`
    const res = await fetch(url, { headers: { 'User-Agent': 'Mozilla/5.0 (compatible; VukaCareerHub/1.0)' } })
    if (!res.ok) return []
    return parseRSS(await res.text())
  } catch { return [] }
}

function fmtDate(d: Date | null) {
  if (!d) return 'No deadline'
  return d.toLocaleDateString('en-ZA', { day: 'numeric', month: 'short', year: 'numeric' })
}
function daysLeft(d: Date | null) {
  if (!d) return null
  return Math.ceil((d.getTime() - Date.now()) / 86400000)
}

function buildEmail(args: {
  date: string
  urgentBursaries: Bursary[]; pastBursaries: Bursary[]
  urgentLearnerships: Learnership[]; pastLearnerships: Learnership[]
  newLearnerships: RSSItem[]; newBursaries: RSSItem[]
}) {
  const { date, urgentBursaries, pastBursaries, urgentLearnerships, pastLearnerships, newLearnerships, newBursaries } = args
  const hasIssues = pastBursaries.length > 0 || pastLearnerships.length > 0
  const hasUrgent = urgentBursaries.length > 0 || urgentLearnerships.length > 0
  const hasNew = newLearnerships.length > 0 || newBursaries.length > 0

  const statRow = (label: string, value: string, color = '#1e293b') =>
    `<tr><td style="padding:6px 0;font-size:13px;color:#64748b;width:40%">${label}</td><td style="padding:6px 0;font-size:13px;font-weight:600;color:${color}">${value}</td></tr>`

  const rssCard = (item: RSSItem) =>
    `<div style="border:1px solid #e2e8f0;border-radius:10px;padding:12px 14px;margin-bottom:8px">
      <a href="${item.link}" style="font-size:13px;font-weight:700;color:#fb923c;text-decoration:none">${item.title}</a>
      ${item.company ? `<div style="font-size:11px;color:#94a3b8;margin-top:2px">${item.company}</div>` : ''}
      ${item.snippet ? `<div style="font-size:12px;color:#64748b;margin-top:4px">${item.snippet}…</div>` : ''}
    </div>`

  const urgentRow = (name: string, deadline: Date | null, href: string) => {
    const days = daysLeft(deadline)
    const color = days !== null && days <= 14 ? '#dc2626' : '#d97706'
    return `<tr>
      <td style="padding:5px 0;font-size:13px;color:#1e293b">${name}</td>
      <td style="padding:5px 0;font-size:12px;font-weight:700;color:${color}">${fmtDate(deadline)}${days !== null ? ` (${days}d)` : ''}</td>
      <td style="padding:5px 0"><a href="${href}" style="font-size:11px;color:#fb923c">Edit</a></td>
    </tr>`
  }

  const pastRow = (name: string, deadline: Date | null, href: string) =>
    `<tr>
      <td style="padding:5px 0;font-size:13px;color:#64748b;text-decoration:line-through">${name}</td>
      <td style="padding:5px 0;font-size:12px;color:#dc2626">Expired ${fmtDate(deadline)}</td>
      <td style="padding:5px 0"><a href="${href}" style="font-size:11px;color:#fb923c">Edit</a></td>
    </tr>`

  return `<!DOCTYPE html>
<html><body style="margin:0;padding:0;background:#f8fafc;font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',sans-serif">
<div style="max-width:600px;margin:0 auto;padding:24px 16px">
  <div style="background:linear-gradient(135deg,#fb923c,#c2410c);padding:28px 32px;border-radius:16px 16px 0 0;text-align:center">
    <div style="color:rgba(255,255,255,0.7);font-size:11px;font-weight:700;letter-spacing:2px;text-transform:uppercase;margin-bottom:6px">Weekly Content Digest</div>
    <h1 style="color:white;margin:0;font-size:20px;font-weight:800">Vuka Career Hub</h1>
    <div style="color:rgba(255,255,255,0.8);font-size:13px;margin-top:4px">${date}</div>
  </div>
  <div style="background:white;border:1px solid #e2e8f0;border-top:none;padding:16px 24px">
    <table width="100%"><tr>
      ${statRow('Closing ≤45 days', String(urgentBursaries.length + urgentLearnerships.length), urgentBursaries.length + urgentLearnerships.length > 0 ? '#d97706' : '#16a34a')}
      ${statRow('Expired (still active)', String(pastBursaries.length + pastLearnerships.length), pastBursaries.length + pastLearnerships.length > 0 ? '#dc2626' : '#16a34a')}
      ${statRow('New from job boards', String(newLearnerships.length + newBursaries.length), '#fb923c')}
    </tr></table>
  </div>
  <div style="background:white;border:1px solid #e2e8f0;border-top:none;border-radius:0 0 16px 16px;padding:24px">
    ${hasIssues ? `
    <h2 style="font-size:15px;font-weight:800;color:#dc2626;margin:0 0 12px">⚠️ Action required — expired deadlines</h2>
    <p style="font-size:12px;color:#64748b;margin:0 0 12px">These records are still marked active but their deadline has passed. Update or toggle inactive.</p>
    ${pastBursaries.length > 0 ? `<div style="font-size:11px;font-weight:700;color:#94a3b8;text-transform:uppercase;letter-spacing:1px;margin-bottom:6px">Bursaries</div>
    <table width="100%" cellpadding="0" cellspacing="0">${pastBursaries.map((b) => pastRow(b.name, b.deadline, `${ADMIN_URL}/admin/bursaries/${b.id}/edit`)).join('')}</table>` : ''}
    ${pastLearnerships.length > 0 ? `<div style="font-size:11px;font-weight:700;color:#94a3b8;text-transform:uppercase;letter-spacing:1px;margin:12px 0 6px">Learnerships</div>
    <table width="100%" cellpadding="0" cellspacing="0">${pastLearnerships.map((l) => pastRow(l.title, l.deadline, `${ADMIN_URL}/admin/learnerships/${l.id}/edit`)).join('')}</table>` : ''}
    <div style="height:24px"></div>` : ''}
    ${hasUrgent ? `
    <h2 style="font-size:15px;font-weight:800;color:#d97706;margin:0 0 12px">⏰ Closing soon</h2>
    ${urgentBursaries.length > 0 ? `<div style="font-size:11px;font-weight:700;color:#94a3b8;text-transform:uppercase;letter-spacing:1px;margin-bottom:6px">Bursaries</div>
    <table width="100%" cellpadding="0" cellspacing="0">${urgentBursaries.map((b) => urgentRow(b.name, b.deadline, `${ADMIN_URL}/admin/bursaries/${b.id}/edit`)).join('')}</table>` : ''}
    ${urgentLearnerships.length > 0 ? `<div style="font-size:11px;font-weight:700;color:#94a3b8;text-transform:uppercase;letter-spacing:1px;margin:12px 0 6px">Learnerships</div>
    <table width="100%" cellpadding="0" cellspacing="0">${urgentLearnerships.map((l) => urgentRow(l.title, l.deadline, `${ADMIN_URL}/admin/learnerships/${l.id}/edit`)).join('')}</table>` : ''}
    <div style="height:24px"></div>` : `
    <div style="background:#f0fdf4;border:1px solid #bbf7d0;border-radius:10px;padding:14px 16px;margin-bottom:24px">
      <span style="font-size:13px;color:#166534;font-weight:600">✓ No expired or urgent records — content looks healthy.</span>
    </div>`}
    ${hasNew ? `
    <h2 style="font-size:15px;font-weight:800;color:#1e293b;margin:0 0 4px">🔍 New this week from job boards</h2>
    <p style="font-size:12px;color:#64748b;margin:0 0 14px">Found on Indeed SA in the past 7 days. Review and add to Vuka if relevant.</p>
    ${newLearnerships.length > 0 ? `<div style="font-size:11px;font-weight:700;color:#94a3b8;text-transform:uppercase;letter-spacing:1px;margin-bottom:8px">Learnerships</div>${newLearnerships.map(rssCard).join('')}` : ''}
    ${newBursaries.length > 0 ? `<div style="font-size:11px;font-weight:700;color:#94a3b8;text-transform:uppercase;letter-spacing:1px;margin:16px 0 8px">Bursaries</div>${newBursaries.map(rssCard).join('')}` : ''}
    <div style="height:24px"></div>` : ''}
    <h2 style="font-size:15px;font-weight:800;color:#1e293b;margin:0 0 8px">📋 Sources to check weekly</h2>
    <div style="display:grid;gap:6px">
      ${[
        ['NSFAS', 'https://my.nsfas.org.za'],
        ['SETA Learnerships (Indeed SA)', 'https://za.indeed.com/jobs?q=learnership&sort=date&fromage=7'],
        ['New bursaries (PNet)', 'https://www.pnet.co.za/jobs/bursary/'],
        ['Sasol bursaries', 'https://www.sasolbursaries.com'],
        ['Eskom careers', 'https://www.eskom.co.za/careers/students/'],
        ['Anglo American SA', 'https://southafrica.angloamerican.com/careers/graduates-and-bursaries'],
        ['Funza Lushaka', 'https://www.funzalushaka.doe.gov.za'],
        ['Standard Bank / StudyTrust', 'https://studytrust.org.za/standardbank/'],
      ].map(([label, url]) => `<a href="${url}" style="display:block;font-size:12px;color:#fb923c;text-decoration:none;padding:6px 10px;background:#fff7ed;border-radius:6px">${label} ↗</a>`).join('')}
    </div>
    <div style="margin-top:24px;text-align:center">
      <a href="${ADMIN_URL}/admin" style="display:inline-block;background:#fb923c;color:white;padding:12px 24px;border-radius:12px;text-decoration:none;font-weight:700;font-size:14px">Open Admin Panel</a>
    </div>
    <p style="font-size:11px;color:#cbd5e1;text-align:center;margin-top:20px">Vuka Career Hub · Weekly Digest</p>
  </div>
</div>
</body></html>`
}

export async function runWeeklyDigest() {
  const apiKey = process.env.RESEND_API_KEY
  if (!apiKey) throw new Error('RESEND_API_KEY not set')

  const now = new Date()
  const in45Days = new Date(now.getTime() + 45 * 86400000)
  const in30Days = new Date(now.getTime() + 30 * 86400000)

  const [urgentBursaries, pastBursaries, urgentLearnerships, pastLearnerships, newLearnerships, newBursaries] =
    await Promise.all([
      prisma.bursary.findMany({ where: { isActive: true, deadline: { gte: now, lte: in45Days } }, orderBy: { deadline: 'asc' } }),
      prisma.bursary.findMany({ where: { isActive: true, deadline: { lt: now } }, orderBy: { deadline: 'desc' }, take: 10 }),
      prisma.learnership.findMany({ where: { status: 'OPEN', deadline: { gte: now, lte: in30Days } }, orderBy: { deadline: 'asc' } }),
      prisma.learnership.findMany({ where: { status: 'OPEN', deadline: { lt: now } }, orderBy: { deadline: 'desc' }, take: 10 }),
      fetchIndeedRSS('learnership south africa'),
      fetchIndeedRSS('bursary south africa 2027'),
    ])

  const resend = new Resend(apiKey)
  const dateStr = now.toLocaleDateString('en-ZA', { weekday: 'long', day: 'numeric', month: 'long', year: 'numeric' })

  await resend.emails.send({
    from: FROM,
    to: ADMIN_EMAIL,
    subject: `Vuka Weekly Digest — ${dateStr}`,
    html: buildEmail({ date: dateStr, urgentBursaries, pastBursaries, urgentLearnerships, pastLearnerships, newLearnerships, newBursaries }),
  })

  return {
    urgent: urgentBursaries.length + urgentLearnerships.length,
    expired: pastBursaries.length + pastLearnerships.length,
    newFound: newLearnerships.length + newBursaries.length,
  }
}
