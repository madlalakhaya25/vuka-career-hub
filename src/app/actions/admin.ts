'use server'

import { prisma } from '@/lib/db'
import { auth } from '@/lib/auth'
import { redirect } from 'next/navigation'
import { revalidatePath } from 'next/cache'

function slugify(str: string) {
  return str.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '')
}

async function requireAdmin() {
  const session = await auth()
  if (!(session?.user as { isAdmin?: boolean } | undefined)?.isAdmin) {
    redirect('/')
  }
}

// ─── Bursaries ─────────────────────────────────────────────────────────────────

export async function createBursary(formData: FormData) {
  await requireAdmin()

  const name = formData.get('name') as string
  await prisma.bursary.create({
    data: {
      slug: slugify(name),
      name,
      fullName: (formData.get('fullName') as string) || null,
      provider: formData.get('provider') as string,
      category: (formData.get('category') as string) || null,
      icon: (formData.get('icon') as string) || null,
      featured: formData.get('featured') === 'on',
      amountDescription: (formData.get('amountDescription') as string) || null,
      deadline: formData.get('deadline') ? new Date(formData.get('deadline') as string) : null,
      applicationUrl: (formData.get('applicationUrl') as string) || null,
      description: (formData.get('description') as string) || null,
      eligibilityNotes: (formData.get('eligibilityNotes') as string) || null,
      fieldsOfStudy: ((formData.get('fieldsOfStudy') as string) || '').split(',').map((s) => s.trim()).filter(Boolean),
      isNsfas: formData.get('isNsfas') === 'on',
      isActive: formData.get('isActive') !== 'off',
    },
  })

  revalidatePath('/bursaries')
  revalidatePath('/admin/bursaries')
  redirect('/admin/bursaries')
}

export async function updateBursary(id: string, formData: FormData) {
  await requireAdmin()

  const name = formData.get('name') as string
  await prisma.bursary.update({
    where: { id },
    data: {
      name,
      fullName: (formData.get('fullName') as string) || null,
      provider: formData.get('provider') as string,
      category: (formData.get('category') as string) || null,
      icon: (formData.get('icon') as string) || null,
      featured: formData.get('featured') === 'on',
      amountDescription: (formData.get('amountDescription') as string) || null,
      deadline: formData.get('deadline') ? new Date(formData.get('deadline') as string) : null,
      applicationUrl: (formData.get('applicationUrl') as string) || null,
      description: (formData.get('description') as string) || null,
      eligibilityNotes: (formData.get('eligibilityNotes') as string) || null,
      fieldsOfStudy: ((formData.get('fieldsOfStudy') as string) || '').split(',').map((s) => s.trim()).filter(Boolean),
      isNsfas: formData.get('isNsfas') === 'on',
      isActive: formData.get('isActive') !== 'off',
    },
  })

  revalidatePath('/bursaries')
  revalidatePath('/admin/bursaries')
  redirect('/admin/bursaries')
}

export async function deleteBursary(id: string) {
  await requireAdmin()
  await prisma.bursary.delete({ where: { id } })
  revalidatePath('/bursaries')
  revalidatePath('/admin/bursaries')
}

export async function toggleBursaryActive(id: string, isActive: boolean) {
  await requireAdmin()
  await prisma.bursary.update({ where: { id }, data: { isActive } })
  revalidatePath('/bursaries')
  revalidatePath('/admin/bursaries')
}

// ─── Learnerships ──────────────────────────────────────────────────────────────

export async function createLearnership(formData: FormData) {
  await requireAdmin()

  const title = formData.get('title') as string
  await prisma.learnership.create({
    data: {
      slug: slugify(title),
      title,
      provider: formData.get('provider') as string,
      seta: (formData.get('seta') as string) || null,
      sector: (formData.get('sector') as string) || null,
      fieldOfStudy: (formData.get('fieldOfStudy') as string) || null,
      nqfLevel: parseInt(formData.get('nqfLevel') as string) || 3,
      stipendMin: parseInt(formData.get('stipendMin') as string) || null,
      stipendMax: parseInt(formData.get('stipendMax') as string) || null,
      durationMonths: parseInt(formData.get('durationMonths') as string) || 12,
      deadline: formData.get('deadline') ? new Date(formData.get('deadline') as string) : null,
      applicationUrl: (formData.get('applicationUrl') as string) || null,
      description: (formData.get('description') as string) || null,
      requirements: (formData.get('requirements') as string) || null,
      provinces: ((formData.get('provinces') as string) || '').split(',').map((s) => s.trim()).filter(Boolean),
      isNational: formData.get('isNational') === 'on',
      icon: (formData.get('icon') as string) || null,
      status: (formData.get('status') as 'OPEN' | 'CLOSED' | 'UPCOMING') || 'OPEN',
    },
  })

  revalidatePath('/learnerships')
  revalidatePath('/admin/learnerships')
  redirect('/admin/learnerships')
}

export async function updateLearnership(id: string, formData: FormData) {
  await requireAdmin()

  const title = formData.get('title') as string
  await prisma.learnership.update({
    where: { id },
    data: {
      title,
      provider: formData.get('provider') as string,
      seta: (formData.get('seta') as string) || null,
      sector: (formData.get('sector') as string) || null,
      fieldOfStudy: (formData.get('fieldOfStudy') as string) || null,
      nqfLevel: parseInt(formData.get('nqfLevel') as string) || 3,
      stipendMin: parseInt(formData.get('stipendMin') as string) || null,
      stipendMax: parseInt(formData.get('stipendMax') as string) || null,
      durationMonths: parseInt(formData.get('durationMonths') as string) || 12,
      deadline: formData.get('deadline') ? new Date(formData.get('deadline') as string) : null,
      applicationUrl: (formData.get('applicationUrl') as string) || null,
      description: (formData.get('description') as string) || null,
      requirements: (formData.get('requirements') as string) || null,
      provinces: ((formData.get('provinces') as string) || '').split(',').map((s) => s.trim()).filter(Boolean),
      isNational: formData.get('isNational') === 'on',
      icon: (formData.get('icon') as string) || null,
      status: (formData.get('status') as 'OPEN' | 'CLOSED' | 'UPCOMING') || 'OPEN',
    },
  })

  revalidatePath('/learnerships')
  revalidatePath('/admin/learnerships')
  redirect('/admin/learnerships')
}

export async function deleteLearnership(id: string) {
  await requireAdmin()
  await prisma.learnership.delete({ where: { id } })
  revalidatePath('/learnerships')
  revalidatePath('/admin/learnerships')
}

// ─── Careers ───────────────────────────────────────────────────────────────────

export async function createCareer(formData: FormData) {
  await requireAdmin()

  const title = formData.get('title') as string
  await prisma.careerPath.create({
    data: {
      slug: slugify(title),
      title,
      sector: formData.get('sector') as string,
      fieldOfStudy: formData.get('fieldOfStudy') as string,
      icon: (formData.get('icon') as string) || null,
      demandLevel: (formData.get('demandLevel') as 'CRITICAL' | 'HIGH' | 'MODERATE' | 'LOW') || 'HIGH',
      salaryEntry: parseInt(formData.get('salaryEntry') as string) || null,
      salaryMid: parseInt(formData.get('salaryMid') as string) || null,
      salarySenior: parseInt(formData.get('salarySenior') as string) || null,
      description: (formData.get('description') as string) || null,
      outlook: (formData.get('outlook') as string) || null,
      skills: ((formData.get('skills') as string) || '').split(',').map((s) => s.trim()).filter(Boolean),
      pathways: ((formData.get('pathways') as string) || '').split('\n').map((s) => s.trim()).filter(Boolean),
    },
  })

  revalidatePath('/careers')
  revalidatePath('/admin/careers')
  redirect('/admin/careers')
}

export async function updateCareer(id: string, formData: FormData) {
  await requireAdmin()

  await prisma.careerPath.update({
    where: { id },
    data: {
      title: formData.get('title') as string,
      sector: formData.get('sector') as string,
      fieldOfStudy: formData.get('fieldOfStudy') as string,
      icon: (formData.get('icon') as string) || null,
      demandLevel: (formData.get('demandLevel') as 'CRITICAL' | 'HIGH' | 'MODERATE' | 'LOW') || 'HIGH',
      salaryEntry: parseInt(formData.get('salaryEntry') as string) || null,
      salaryMid: parseInt(formData.get('salaryMid') as string) || null,
      salarySenior: parseInt(formData.get('salarySenior') as string) || null,
      description: (formData.get('description') as string) || null,
      outlook: (formData.get('outlook') as string) || null,
      skills: ((formData.get('skills') as string) || '').split(',').map((s) => s.trim()).filter(Boolean),
      pathways: ((formData.get('pathways') as string) || '').split('\n').map((s) => s.trim()).filter(Boolean),
    },
  })

  revalidatePath('/careers')
  revalidatePath('/admin/careers')
  redirect('/admin/careers')
}

export async function deleteCareer(id: string) {
  await requireAdmin()
  await prisma.careerPath.delete({ where: { id } })
  revalidatePath('/careers')
  revalidatePath('/admin/careers')
}

// ─── Scraper Inbox ─────────────────────────────────────────────────────────────

type ScrapedData = {
  provider?: string
  seta?: string
  sector?: string
  nqfLevel?: number
  stipendMin?: number
  stipendMax?: number
  durationMonths?: number
  deadline?: string
  applicationUrl?: string
  provinces?: string[]
  isNational?: boolean
  requirements?: string
  description?: string
  icon?: string
  // bursary-specific
  category?: string
  amountDescription?: string
  fieldsOfStudy?: string[]
  eligibilityNotes?: string
}

export async function approveScrapedListing(id: string) {
  await requireAdmin()

  const scraped = await prisma.scrapedListing.findUnique({ where: { id } })
  if (!scraped) throw new Error('Scraped listing not found')

  const d = scraped.data as ScrapedData

  if (scraped.type === 'LEARNERSHIP') {
    const title = scraped.title
    let slug = slugify(title)
    // Ensure unique slug
    const existing = await prisma.learnership.findUnique({ where: { slug } })
    if (existing) slug = `${slug}-${id.slice(-4)}`

    await prisma.learnership.create({
      data: {
        slug,
        title,
        provider: d.provider ?? scraped.provider ?? 'Unknown',
        seta: d.seta ?? null,
        sector: d.sector ?? null,
        fieldOfStudy: d.sector ?? null,
        nqfLevel: d.nqfLevel ?? 3,
        stipendMin: d.stipendMin ?? null,
        stipendMax: d.stipendMax ?? null,
        durationMonths: d.durationMonths ?? 12,
        deadline: d.deadline ? new Date(d.deadline) : null,
        applicationUrl: d.applicationUrl ?? scraped.sourceUrl,
        description: d.description ?? null,
        requirements: d.requirements ?? null,
        provinces: d.provinces ?? [],
        isNational: d.isNational ?? true,
        icon: d.icon ?? null,
        status: 'OPEN',
      },
    })

    revalidatePath('/learnerships')
    revalidatePath('/admin/learnerships')
  } else if (scraped.type === 'BURSARY') {
    const name = scraped.title
    let slug = slugify(name)
    const existing = await prisma.bursary.findUnique({ where: { slug } })
    if (existing) slug = `${slug}-${id.slice(-4)}`

    await prisma.bursary.create({
      data: {
        slug,
        name,
        provider: d.provider ?? scraped.provider ?? 'Unknown',
        category: d.category ?? null,
        amountDescription: d.amountDescription ?? null,
        deadline: d.deadline ? new Date(d.deadline) : null,
        applicationUrl: d.applicationUrl ?? scraped.sourceUrl,
        description: d.description ?? null,
        eligibilityNotes: d.eligibilityNotes ?? null,
        fieldsOfStudy: d.fieldsOfStudy ?? [],
        isNsfas: scraped.source.includes('nsfas'),
        isActive: true,
      },
    })

    revalidatePath('/bursaries')
    revalidatePath('/admin/bursaries')
  }

  await prisma.scrapedListing.update({
    where: { id },
    data: { status: 'APPROVED', reviewedAt: new Date() },
  })

  revalidatePath('/admin/inbox')
}

export async function rejectScrapedListing(id: string) {
  await requireAdmin()
  await prisma.scrapedListing.update({
    where: { id },
    data: { status: 'REJECTED', reviewedAt: new Date() },
  })
  revalidatePath('/admin/inbox')
}

export async function rejectAllScrapedListings(source?: string) {
  await requireAdmin()
  await prisma.scrapedListing.updateMany({
    where: { status: 'PENDING', ...(source ? { source } : {}) },
    data: { status: 'REJECTED', reviewedAt: new Date() },
  })
  revalidatePath('/admin/inbox')
}
