'use client'

import { useState } from 'react'
import Link from 'next/link'
import { ChevronRight, RotateCcw, CheckCircle, TrendingUp } from 'lucide-react'

const questions = [
  {
    id: 1,
    question: 'Which of these activities sounds most exciting to you?',
    options: [
      { text: 'Building something with your hands', traits: ['trades', 'engineering'] },
      { text: 'Writing code or solving puzzles on a computer', traits: ['it'] },
      { text: 'Helping sick or injured people recover', traits: ['healthcare'] },
      { text: 'Running your own business and making money', traits: ['business', 'entrepreneurship'] },
    ],
  },
  {
    id: 2,
    question: 'How do you prefer to work?',
    options: [
      { text: 'With my hands in a physical environment', traits: ['trades', 'engineering'] },
      { text: 'At a desk with technology and data', traits: ['it', 'finance'] },
      { text: 'With other people, helping or serving them', traits: ['healthcare', 'education'] },
      { text: 'Independently on creative projects', traits: ['creative', 'marketing'] },
    ],
  },
  {
    id: 3,
    question: 'Which subject did you enjoy most at school?',
    options: [
      { text: 'Mathematics and Science', traits: ['engineering', 'it', 'finance'] },
      { text: 'Accounting and Business', traits: ['finance', 'business'] },
      { text: 'Life Sciences / Biology', traits: ['healthcare', 'agriculture'] },
      { text: 'Technology and Design', traits: ['it', 'trades', 'creative'] },
    ],
  },
  {
    id: 4,
    question: 'When something breaks at home, you:',
    options: [
      { text: 'Try to fix it yourself', traits: ['trades', 'engineering'] },
      { text: 'Google how to fix it and follow instructions', traits: ['it', 'engineering'] },
      { text: 'Call someone and manage the situation', traits: ['business', 'management'] },
      { text: 'Leave it, that\'s not your thing', traits: ['creative', 'social'] },
    ],
  },
  {
    id: 5,
    question: 'What type of impact do you want to make?',
    options: [
      { text: 'Save lives and improve people\'s health', traits: ['healthcare'] },
      { text: 'Build technology that changes the world', traits: ['it', 'engineering'] },
      { text: 'Create jobs and grow a business', traits: ['business', 'entrepreneurship'] },
      { text: 'Teach or mentor the next generation', traits: ['education'] },
    ],
  },
  {
    id: 6,
    question: 'How do you feel about working outdoors or on-site?',
    options: [
      { text: 'Love it, I want to be active and hands-on', traits: ['trades', 'agriculture', 'engineering'] },
      { text: 'Sometimes okay, but prefer indoors', traits: ['healthcare', 'engineering'] },
      { text: 'Prefer a stable office environment', traits: ['finance', 'it'] },
      { text: 'I\'d rather work from anywhere, including home', traits: ['it', 'marketing', 'creative'] },
    ],
  },
  {
    id: 7,
    question: 'When it comes to technology, you are:',
    options: [
      { text: 'Always the first to learn new tech and tools', traits: ['it'] },
      { text: 'Comfortable using it, but not obsessed', traits: ['business', 'marketing'] },
      { text: 'Learning what I need for work', traits: ['healthcare', 'trades'] },
      { text: 'More interested in physical, practical skills', traits: ['trades', 'agriculture'] },
    ],
  },
  {
    id: 8,
    question: 'What earning potential matters most to you?',
    options: [
      { text: 'Highest salary possible, I want to earn top money', traits: ['it', 'finance', 'engineering'] },
      { text: 'Stable good income with job security', traits: ['healthcare', 'trades', 'education'] },
      { text: 'Build wealth through my own business', traits: ['entrepreneurship', 'business'] },
      { text: 'Enough to live well while doing work I love', traits: ['creative', 'social'] },
    ],
  },
  {
    id: 9,
    question: 'South Africa has a big problem with electricity. You think:',
    options: [
      { text: 'Someone should fix the grid and I want to be that person', traits: ['engineering', 'trades'] },
      { text: 'Solar energy is the future and I want to install it', traits: ['trades', 'renewable'] },
      { text: 'There\'s a business opportunity in energy solutions', traits: ['business', 'entrepreneurship'] },
      { text: 'I\'d rather focus on other sectors', traits: ['it', 'healthcare', 'finance'] },
    ],
  },
  {
    id: 10,
    question: 'You are most comfortable when:',
    options: [
      { text: 'Solving a complex technical problem', traits: ['it', 'engineering'] },
      { text: 'Helping someone feel better or solving their problem', traits: ['healthcare', 'social', 'education'] },
      { text: 'Closing a deal or growing something', traits: ['business', 'entrepreneurship', 'marketing'] },
      { text: 'Creating something new from scratch', traits: ['creative', 'it'] },
    ],
  },
]

const careerProfiles = [
  {
    id: 'it',
    title: 'Information Technology',
    careers: ['Software Developer', 'Cybersecurity Analyst', 'Data Scientist', 'Cloud Engineer'],
    description: 'You\'re drawn to tech and problem-solving. IT is one of the best-paying sectors in SA right now, and many of these jobs let you work from home.',
    salaryRange: 'R25K–R110K/month',
    demand: 'CRITICAL',
    icon: '💻',
    nextStep: 'Start with free coding resources like freeCodeCamp, then consider MICT SETA learnership or a Diploma IT.',
    href: '/careers?sector=it',
  },
  {
    id: 'trades',
    title: 'Artisan Trades',
    careers: ['Electrician', 'Plumber', 'Boilermaker', 'Solar PV Technician'],
    description: 'You like working with your hands and seeing the results of what you build or fix. SA doesn\'t have enough artisans. Good ones are in high demand and earn well.',
    salaryRange: 'R9K–R52K/month',
    demand: 'CRITICAL',
    icon: '⚡',
    nextStep: 'Apply to a TVET college for N1–N3 in your trade of choice, or look for a MERSETA learnership.',
    href: '/careers?sector=trades',
  },
  {
    id: 'healthcare',
    title: 'Healthcare',
    careers: ['Registered Nurse', 'Paramedic', 'Pharmacy Assistant', 'Community Health Worker'],
    description: 'You want to help people and make a difference you can actually see. Healthcare has strong job security, real career growth, and work that matters.',
    salaryRange: 'R14K–R60K/month',
    demand: 'HIGH',
    icon: '🏥',
    nextStep: 'Start with an auxiliary nursing learnership through HWSETA, or apply to nursing school with your matric.',
    href: '/careers?sector=healthcare',
  },
  {
    id: 'business',
    title: 'Business & Finance',
    careers: ['Accountant', 'Financial Analyst', 'HR Manager', 'Business Administrator'],
    description: 'You\'re good with numbers, planning, and making things run smoothly. Every company needs finance and business people, across every industry.',
    salaryRange: 'R18K–R80K/month',
    demand: 'HIGH',
    icon: '📊',
    nextStep: 'Consider a BCom or Diploma in Accounting/Business. FASSET and Services SETA offer learnerships with stipends.',
    href: '/careers?sector=finance',
  },
  {
    id: 'renewable',
    title: 'Renewable Energy',
    careers: ['Solar PV Installer', 'Energy Efficiency Consultant', 'Renewable Energy Technician'],
    description: 'Load shedding changed everything. Solar installers and energy technicians are in high demand right now, and this sector is only going to keep growing.',
    salaryRange: 'R8K–R35K/month',
    demand: 'CRITICAL',
    icon: '☀️',
    nextStep: 'Look for EWSETA solar PV learnerships or short courses through PQRS Training and MSC Academy.',
    href: '/careers',
  },
  {
    id: 'entrepreneurship',
    title: 'Entrepreneurship',
    careers: ['Own Business', 'Franchise Owner', 'Tech Startup', 'Service Business'],
    description: 'You\'d rather build something of your own than work for someone else. NYDA has R2.5 billion in funding set aside just for young South Africans looking to start a business.',
    salaryRange: 'Unlimited potential',
    demand: 'HIGH',
    icon: '🚀',
    nextStep: 'Visit nyda.gov.za to explore grants (R1K–R200K) and the new R2.5B youth fund. Start with a simple business plan.',
    href: '/nyda',
  },
]

type Answers = Record<number, string[]>

export function CareerQuizClient() {
  const [currentQ, setCurrentQ] = useState(0)
  const [answers, setAnswers] = useState<Answers>({})
  const [showResults, setShowResults] = useState(false)

  const handleAnswer = (traits: string[]) => {
    const newAnswers = {
      ...answers,
      [questions[currentQ].id]: traits,
    }
    setAnswers(newAnswers)

    if (currentQ < questions.length - 1) {
      setCurrentQ(currentQ + 1)
    } else {
      setShowResults(true)
    }
  }

  const calculateResults = () => {
    const scores: Record<string, number> = {}

    Object.values(answers).forEach((traits) => {
      traits.forEach((trait) => {
        scores[trait] = (scores[trait] ?? 0) + 1
      })
    })

    return careerProfiles
      .map((profile) => ({
        ...profile,
        score: scores[profile.id] ?? 0,
      }))
      .sort((a, b) => b.score - a.score)
      .slice(0, 3)
  }

  const handleReset = () => {
    setCurrentQ(0)
    setAnswers({})
    setShowResults(false)
  }

  const progress = ((currentQ + 1) / questions.length) * 100

  if (showResults) {
    const topProfiles = calculateResults()

    return (
      <section className="py-12 bg-slate-50">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-10">
            <div className="text-4xl mb-3">🎯</div>
            <h2 className="text-3xl font-extrabold text-slate-900">Your Career Matches</h2>
            <p className="text-slate-500 mt-2">
              Based on what you told us, these are the careers that suit you best.
            </p>
          </div>

          <div className="space-y-5">
            {topProfiles.map((profile, idx) => (
              <div
                key={profile.id}
                className={`bg-white rounded-2xl border p-6 ${idx === 0 ? 'border-orange-300 ring-2 ring-orange-200' : 'border-slate-200'}`}
              >
                {idx === 0 && (
                  <div className="flex items-center gap-1.5 text-orange-500 text-sm font-bold mb-3">
                    <TrendingUp className="h-4 w-4" />
                    Best match
                  </div>
                )}

                <div className="flex items-start gap-4">
                  <span className="text-4xl">{profile.icon}</span>
                  <div className="flex-1">
                    <div className="flex items-start justify-between gap-3">
                      <h3 className="text-xl font-bold text-slate-900">{profile.title}</h3>
                      <span
                        className={`text-xs font-semibold px-2.5 py-1 rounded-full border ${
                          profile.demand === 'CRITICAL'
                            ? 'bg-red-100 text-red-700 border-red-200'
                            : 'bg-orange-100 text-orange-700 border-orange-200'
                        }`}
                      >
                        {profile.demand === 'CRITICAL' ? 'Critical shortage' : 'High demand'}
                      </span>
                    </div>

                    <p className="text-sm text-slate-600 mt-2 mb-4">{profile.description}</p>

                    <div className="flex flex-wrap gap-2 mb-4">
                      {profile.careers.map((c) => (
                        <span key={c} className="text-xs bg-slate-100 text-slate-700 px-2.5 py-1 rounded-full">
                          {c}
                        </span>
                      ))}
                    </div>

                    <div className="bg-green-50 rounded-lg px-4 py-2.5 mb-4">
                      <span className="text-xs text-green-700 font-semibold">
                        💰 Salary range: {profile.salaryRange}
                      </span>
                    </div>

                    <div className="flex items-start gap-2 text-xs text-slate-500 bg-blue-50 rounded-lg px-3 py-2.5 mb-4">
                      <CheckCircle className="h-3.5 w-3.5 text-blue-500 shrink-0 mt-0.5" />
                      <span><strong>Next step:</strong> {profile.nextStep}</span>
                    </div>

                    <Link
                      href={profile.href}
                      className="inline-flex items-center gap-1.5 text-sm font-semibold text-orange-600 hover:text-orange-700"
                    >
                      Explore {profile.title} careers <ChevronRight className="h-4 w-4" />
                    </Link>
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div className="mt-8 flex flex-col sm:flex-row gap-3 justify-center">
            <button
              onClick={handleReset}
              className="inline-flex items-center justify-center gap-2 px-5 py-3 border border-slate-300 hover:bg-slate-50 text-slate-700 font-semibold rounded-xl transition-colors text-sm"
            >
              <RotateCcw className="h-4 w-4" />
              Retake Quiz
            </button>
            <Link
              href="/learnerships"
              className="inline-flex items-center justify-center gap-2 px-5 py-3 bg-orange-500 hover:bg-orange-600 text-white font-semibold rounded-xl transition-colors text-sm"
            >
              Find Learnerships <ChevronRight className="h-4 w-4" />
            </Link>
          </div>
        </div>
      </section>
    )
  }

  const question = questions[currentQ]

  return (
    <section className="py-12 bg-slate-50">
      <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Progress */}
        <div className="mb-8">
          <div className="flex justify-between text-sm text-slate-500 mb-2">
            <span>Question {currentQ + 1} of {questions.length}</span>
            <span>{Math.round(progress)}% complete</span>
          </div>
          <div className="w-full bg-slate-200 rounded-full h-2">
            <div
              className="bg-orange-500 h-2 rounded-full transition-all duration-300"
              style={{ width: `${progress}%` }}
            />
          </div>
        </div>

        {/* Question card */}
        <div className="bg-white rounded-2xl border border-slate-200 shadow-sm p-5 sm:p-8">
          <h2 className="text-xl font-bold text-slate-900 mb-6">{question.question}</h2>
          <div className="space-y-3">
            {question.options.map((option, idx) => (
              <button
                key={idx}
                onClick={() => handleAnswer(option.traits)}
                className="w-full text-left p-4 rounded-xl border-2 border-slate-200 hover:border-orange-400 hover:bg-orange-50 transition-all text-slate-700 font-medium text-sm min-h-[52px] active:bg-orange-50"
              >
                {option.text}
              </button>
            ))}
          </div>
        </div>

        <div className="mt-4 text-center">
          <button
            onClick={handleReset}
            className="text-xs text-slate-400 hover:text-slate-600 flex items-center gap-1 mx-auto"
          >
            <RotateCcw className="h-3 w-3" />
            Start over
          </button>
        </div>
      </div>
    </section>
  )
}
