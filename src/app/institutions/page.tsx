import type { Metadata } from 'next'
import { GraduationCap, CheckCircle } from 'lucide-react'
import { prisma } from '@/lib/db'
import { InstitutionsGrid } from './InstitutionsGrid'

export const dynamic = 'force-dynamic'

export const metadata: Metadata = {
  title: 'Institutions: TVET Colleges, Universities & Private Colleges SA',
  description: 'Browse all 50 TVET colleges, 26 public universities, and top private colleges in South Africa.',
}

const typeFilterMap: Record<string, string> = {
  UNIVERSITY: 'University',
  TVET: 'TVET',
  PRIVATE_COLLEGE: 'Private College',
  DISTANCE_LEARNING: 'Private College',
  TRAINING_PROVIDER: 'Private College',
}

export default async function InstitutionsPage({
  searchParams,
}: {
  searchParams: Promise<{ type?: string }>
}) {
  const { type } = await searchParams
  const initialFilter = (type && typeFilterMap[type]) ? typeFilterMap[type] : 'All'

  const institutions = await prisma.institution.findMany({
    orderBy: [{ featured: 'desc' }, { name: 'asc' }],
    select: {
      id: true,
      name: true,
      type: true,
      provinces: true,
      city: true,
      website: true,
      description: true,
      rank: true,
      appCloseDisplay: true,
      applicationCloseDate: true,
      nsfasAccredited: true,
      featured: true,
    },
  })

  return (
    <>
      {/* Header */}
      <section className="relative mesh-bg dot-pattern pt-24 sm:pt-32 pb-16 overflow-hidden">
        <div className="absolute top-1/4 left-0 w-72 h-72 bg-blue-500/8 rounded-full blur-3xl" />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-2xl">
            <div className="inline-flex items-center gap-2 glass rounded-full px-4 py-1.5 text-xs font-semibold text-white/70 mb-6">
              <GraduationCap className="h-3.5 w-3.5 text-brand" />
              All institution types across all 9 provinces
            </div>
            <h1 className="text-5xl sm:text-6xl font-extrabold text-white tracking-tight mb-4">
              Find Your
              <br />
              <span className="gradient-text">Institution</span>
            </h1>
            <p className="text-lg text-white/60 mb-8">
              50 TVET colleges, 26 universities, and top private colleges. Filter by province,
              institution type, and NSFAS eligibility.
            </p>
            <div className="glass border border-amber-500/25 rounded-2xl p-4 flex items-start gap-3">
              <CheckCircle className="h-5 w-5 text-green-400 shrink-0 mt-0.5" />
              <div className="text-sm text-white/70">
                <strong className="text-white">NSFAS note:</strong> Only covers study at public universities
                and public TVET colleges, not private colleges. Look for the green NSFAS badge.
              </div>
            </div>
          </div>
        </div>
        <div className="absolute bottom-0 left-0 right-0 h-16 bg-gradient-to-t from-white to-transparent" />
      </section>

      <InstitutionsGrid institutions={institutions} initialFilter={initialFilter} />
    </>
  )
}
