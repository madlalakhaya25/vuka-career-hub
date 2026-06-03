import { auth } from '@/lib/auth'
import { redirect } from 'next/navigation'
import Link from 'next/link'
import { GraduationCap, Briefcase, Bell, User, ArrowRight } from 'lucide-react'

export default async function DashboardPage() {
  const session = await auth()

  if (!session?.user) {
    redirect('/login')
  }

  const firstName = session.user.name?.split(' ')[0] ?? 'there'

  return (
    <div className="bg-slate-50 min-h-screen py-12">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Welcome */}
        <div className="mb-8">
          <h1 className="text-3xl font-extrabold text-slate-900">
            Welcome back, {firstName} 👋
          </h1>
          <p className="text-slate-500 mt-1">
            Here&apos;s your saved learnerships, bursaries, and career picks.
          </p>
        </div>

        {/* Quick actions */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 mb-10">
          {[
            {
              icon: Briefcase,
              title: 'Browse Learnerships',
              desc: 'Find open learnerships in your area',
              href: '/learnerships',
              color: 'text-orange-500',
              bg: 'bg-orange-50',
            },
            {
              icon: GraduationCap,
              title: 'Find Bursaries',
              desc: 'See bursaries with upcoming deadlines',
              href: '/bursaries',
              color: 'text-green-500',
              bg: 'bg-green-50',
            },
            {
              icon: Bell,
              title: 'Set Reminders',
              desc: 'Never miss a bursary deadline',
              href: '/bursaries',
              color: 'text-blue-500',
              bg: 'bg-blue-50',
            },
          ].map((item) => (
            <Link
              key={item.title}
              href={item.href}
              className="bg-white rounded-xl border border-slate-200 p-5 hover:border-orange-300 hover:shadow-md transition-all group"
            >
              <div className={`w-10 h-10 ${item.bg} rounded-xl flex items-center justify-center mb-3`}>
                <item.icon className={`h-5 w-5 ${item.color}`} />
              </div>
              <h3 className="font-bold text-slate-900 group-hover:text-orange-600 transition-colors">
                {item.title}
              </h3>
              <p className="text-sm text-slate-500 mt-1">{item.desc}</p>
              <div className="mt-3 flex items-center gap-1 text-xs font-semibold text-orange-500">
                Go <ArrowRight className="h-3.5 w-3.5" />
              </div>
            </Link>
          ))}
        </div>

        {/* Profile completion */}
        <div className="bg-white rounded-2xl border border-slate-200 p-6">
          <div className="flex items-start gap-4">
            <div className="w-12 h-12 bg-orange-100 rounded-xl flex items-center justify-center shrink-0">
              <User className="h-6 w-6 text-orange-500" />
            </div>
            <div className="flex-1">
              <h2 className="font-bold text-slate-900">Complete your profile</h2>
              <p className="text-sm text-slate-500 mt-1">
                Add your APS score and interests to get personalised career and bursary
                recommendations.
              </p>
              <div className="mt-4 w-full bg-slate-100 rounded-full h-2">
                <div className="bg-orange-500 h-2 rounded-full w-1/3" />
              </div>
              <p className="text-xs text-slate-400 mt-1">33% complete</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
