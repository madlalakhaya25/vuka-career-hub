'use client'

import { useState } from 'react'
import { CheckCircle, Info, ArrowRight, RotateCcw, GraduationCap } from 'lucide-react'
import Link from 'next/link'

const subjects = [
  { id: 'home_language', label: 'Home Language', required: true },
  { id: 'first_additional', label: 'First Additional Language', required: true },
  { id: 'mathematics', label: 'Mathematics', required: false },
  { id: 'mathematical_literacy', label: 'Mathematical Literacy', required: false, note: 'Note: Most engineering/science programmes require Mathematics, not Math Lit.' },
  { id: 'life_orientation', label: 'Life Orientation', required: true, note: 'Most universities exclude LO from APS calculation.' },
  { id: 'subject1', label: 'Subject 4 (e.g. Physical Science)', required: true },
  { id: 'subject2', label: 'Subject 5 (e.g. Accounting)', required: true },
  { id: 'subject3', label: 'Subject 6 (e.g. Life Sciences)', required: true },
]

const programmes = [
  { name: 'Medicine (MBChB)', institution: 'UCT / Wits / UP / UKZN', minAps: 42, fields: ['healthcare'] },
  { name: 'BSc Computer Science', institution: 'UCT / Wits / UP', minAps: 36, fields: ['it'] },
  { name: 'BCom Accounting', institution: 'Most universities', minAps: 32, fields: ['finance'] },
  { name: 'BEng Electrical Engineering', institution: 'Wits / UP / UCT / TUT', minAps: 34, fields: ['engineering'] },
  { name: 'BSc Nursing', institution: 'UKZN / UWC / UNISA', minAps: 28, fields: ['healthcare'] },
  { name: 'BEd (Teaching)', institution: 'All universities', minAps: 26, fields: ['education'] },
  { name: 'BCom General', institution: 'Most universities', minAps: 28, fields: ['business'] },
  { name: 'BA Social Work', institution: 'Multiple universities', minAps: 24, fields: ['social'] },
  { name: 'Diploma IT (NQF 6)', institution: 'TUT / DUT / CPUT', minAps: 20, fields: ['it'] },
  { name: 'Diploma Business Management', institution: 'TUT / DUT / VUT', minAps: 18, fields: ['business'] },
  { name: 'BEng Civil Engineering', institution: 'Wits / UP / UCT', minAps: 34, fields: ['engineering'] },
  { name: 'BCom Law', institution: 'UNISA / UP / Wits', minAps: 32, fields: ['law'] },
  { name: 'BA Psychology', institution: 'Multiple universities', minAps: 26, fields: ['social'] },
  { name: 'BSc Agriculture', institution: 'UP / Stellenbosch / UFS', minAps: 22, fields: ['agriculture'] },
  { name: 'Diploma Electrical Engineering (N4–N6)', institution: 'Any TVET college', minAps: 0, fields: ['engineering'], isTvet: true },
  { name: 'Diploma Business (N4–N6)', institution: 'Any TVET college', minAps: 0, fields: ['business'], isTvet: true },
  { name: 'NCV Information Technology', institution: 'Any TVET college', minAps: 0, fields: ['it'], isTvet: true },
]

function markToAps(mark: number): number {
  if (mark >= 90) return 8
  if (mark >= 80) return 7
  if (mark >= 70) return 6
  if (mark >= 60) return 5
  if (mark >= 50) return 4
  if (mark >= 40) return 3
  if (mark >= 30) return 2
  return 1
}

function markToGrade(mark: number): string {
  if (mark >= 90) return 'Distinction'
  if (mark >= 80) return 'Merit'
  if (mark >= 70) return 'Credit'
  if (mark >= 60) return 'Pass'
  if (mark >= 50) return 'Pass'
  if (mark >= 40) return 'Pass'
  if (mark >= 30) return 'Fail'
  return 'Fail'
}

type Marks = Record<string, string>

export function APSCalculatorClient() {
  const [marks, setMarks] = useState<Marks>({})
  const [showResults, setShowResults] = useState(false)

  const hasMathLit = !!marks['mathematical_literacy']

  const calculateAPS = (): number => {
    const calcSubjects = subjects
      .filter((s) => s.id !== 'life_orientation')
      .filter((s) => {
        if (s.id === 'mathematical_literacy') return hasMathLit && !marks['mathematics']
        if (s.id === 'mathematics') return !!marks['mathematics']
        return true
      })

    let total = 0
    let counted = 0

    for (const subject of calcSubjects) {
      const mark = Number(marks[subject.id])
      if (!isNaN(mark) && mark > 0) {
        total += markToAps(mark)
        counted++
      }
    }

    return counted >= 6 ? total : 0
  }

  const aps = calculateAPS()
  const filledCount = Object.values(marks).filter((m) => {
    const n = Number(m)
    return !isNaN(n) && n > 0
  }).length
  const canCalculate = filledCount >= 6

  const qualifyingProgrammes = showResults
    ? programmes.filter((p) => (p.isTvet ? true : aps >= p.minAps))
    : []

  const handleReset = () => {
    setMarks({})
    setShowResults(false)
  }

  return (
    <section className="py-12 bg-slate-50">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-5 gap-8">
          {/* Input form */}
          <div className="lg:col-span-3">
            <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-sm">
              <h2 className="text-xl font-bold text-slate-900 mb-1">Enter your matric marks</h2>
              <p className="text-sm text-slate-500 mb-6">
                Enter your final percentage for each subject.
              </p>

              <div className="space-y-4">
                {subjects.map((subject) => {
                  const mark = Number(marks[subject.id])
                  const hasValue = !isNaN(mark) && mark > 0 && marks[subject.id] !== ''
                  const apsPoints = hasValue ? markToAps(mark) : null

                  if (subject.id === 'mathematics' && hasMathLit && !marks['mathematics']) return null
                  if (subject.id === 'mathematical_literacy' && marks['mathematics']) return null

                  return (
                    <div key={subject.id}>
                      <div className="flex items-center justify-between mb-1">
                        <label className="text-sm font-medium text-slate-700">
                          {subject.label}
                          {subject.required && (
                            <span className="text-slate-400 font-normal"> *</span>
                          )}
                        </label>
                        {apsPoints !== null && (
                          <span className="text-xs bg-orange-100 text-orange-700 font-semibold px-2 py-0.5 rounded-full">
                            {apsPoints} pts
                          </span>
                        )}
                      </div>
                      <div className="flex items-center gap-3">
                        <input
                          type="number"
                          min={0}
                          max={100}
                          placeholder="0–100"
                          value={marks[subject.id] ?? ''}
                          onChange={(e) =>
                            setMarks((prev) => ({
                              ...prev,
                              [subject.id]: e.target.value,
                            }))
                          }
                          className="w-28 px-3 py-2 border border-slate-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                        />
                        {hasValue && (
                          <span className={`text-xs font-medium ${mark >= 50 ? 'text-green-600' : 'text-red-600'}`}>
                            {mark}% — {markToGrade(mark)}
                          </span>
                        )}
                      </div>
                      {subject.note && (
                        <p className="text-xs text-slate-400 mt-1 flex items-start gap-1">
                          <Info className="h-3 w-3 shrink-0 mt-0.5" />
                          {subject.note}
                        </p>
                      )}
                    </div>
                  )
                })}
              </div>

              {/* APS display */}
              {canCalculate && aps > 0 && (
                <div className="mt-6 bg-orange-50 border border-orange-200 rounded-xl p-4 text-center">
                  <div className="text-sm text-orange-700 font-medium mb-1">Your APS Score</div>
                  <div className="text-5xl font-extrabold text-orange-500">{aps}</div>
                  <div className="text-sm text-orange-600 mt-1">
                    {aps >= 40 ? 'Excellent — qualifies for most programmes' :
                     aps >= 32 ? 'Good — qualifies for many programmes' :
                     aps >= 24 ? 'Fair — qualifies for several programmes' :
                     'Consider TVET or bridging programmes'}
                  </div>
                </div>
              )}

              <div className="mt-6 flex gap-3">
                <button
                  onClick={() => setShowResults(true)}
                  disabled={!canCalculate}
                  className="flex-1 py-3 bg-orange-500 hover:bg-orange-600 disabled:bg-slate-200 disabled:text-slate-400 disabled:cursor-not-allowed text-white font-semibold rounded-xl transition-colors text-sm flex items-center justify-center gap-2"
                >
                  Show qualifying programmes <ArrowRight className="h-4 w-4" />
                </button>
                {Object.keys(marks).length > 0 && (
                  <button
                    onClick={handleReset}
                    className="p-3 border border-slate-300 hover:bg-slate-50 rounded-xl transition-colors text-slate-600"
                    title="Reset"
                  >
                    <RotateCcw className="h-4 w-4" />
                  </button>
                )}
              </div>

              {!canCalculate && (
                <p className="text-xs text-slate-400 text-center mt-2">
                  Enter at least 6 subject marks to calculate
                </p>
              )}
            </div>
          </div>

          {/* APS guide */}
          <div className="lg:col-span-2">
            <div className="bg-white rounded-2xl border border-slate-200 p-5 shadow-sm sticky top-20">
              <h3 className="font-bold text-slate-900 mb-4">APS Points Guide</h3>
              <div className="space-y-2">
                {[
                  { range: '90–100%', points: '8 points', color: 'text-green-600' },
                  { range: '80–89%', points: '7 points', color: 'text-green-600' },
                  { range: '70–79%', points: '6 points', color: 'text-green-500' },
                  { range: '60–69%', points: '5 points', color: 'text-yellow-600' },
                  { range: '50–59%', points: '4 points', color: 'text-yellow-500' },
                  { range: '40–49%', points: '3 points', color: 'text-orange-500' },
                  { range: '30–39%', points: '2 points', color: 'text-red-500' },
                  { range: '0–29%', points: '1 point', color: 'text-red-600' },
                ].map((item) => (
                  <div key={item.range} className="flex justify-between text-sm">
                    <span className="text-slate-600">{item.range}</span>
                    <span className={`font-semibold ${item.color}`}>{item.points}</span>
                  </div>
                ))}
              </div>
              <div className="mt-4 text-xs text-slate-400 bg-slate-50 rounded-lg p-3">
                APS is calculated from your 6 best subjects (excluding Life Orientation
                at most universities). Different institutions may have slightly different
                calculation methods.
              </div>
            </div>
          </div>
        </div>

        {/* Results */}
        {showResults && aps > 0 && (
          <div className="mt-10">
            <h2 className="text-2xl font-bold text-slate-900 mb-6">
              Programmes you qualify for (APS {aps})
            </h2>

            <div className="space-y-3">
              {qualifyingProgrammes.map((programme) => (
                <div
                  key={programme.name}
                  className="bg-white rounded-xl border border-slate-200 p-4 flex items-start justify-between gap-4"
                >
                  <div className="flex items-start gap-3">
                    <CheckCircle className="h-5 w-5 text-green-500 shrink-0 mt-0.5" />
                    <div>
                      <h3 className="font-semibold text-slate-900">{programme.name}</h3>
                      <p className="text-sm text-slate-500 mt-0.5">{programme.institution}</p>
                    </div>
                  </div>
                  <div className="text-right shrink-0">
                    {programme.isTvet ? (
                      <span className="text-xs bg-blue-100 text-blue-700 px-2.5 py-1 rounded-full font-semibold">
                        TVET — no min APS
                      </span>
                    ) : (
                      <span className="text-xs bg-green-100 text-green-700 px-2.5 py-1 rounded-full font-semibold">
                        Min APS: {programme.minAps}
                      </span>
                    )}
                  </div>
                </div>
              ))}
            </div>

            <div className="mt-6 bg-orange-50 border border-orange-200 rounded-xl p-5">
              <div className="flex items-start gap-3">
                <Info className="h-5 w-5 text-orange-500 shrink-0 mt-0.5" />
                <div>
                  <h3 className="font-semibold text-slate-900 mb-1">Important note</h3>
                  <p className="text-sm text-slate-600">
                    APS is one factor. Universities also consider specific subject
                    requirements (e.g. Math for engineering), additional tests, and
                    available space. Always apply directly to your chosen institutions.
                    This calculator uses standard APS — some universities have their own
                    calculation methods.
                  </p>
                </div>
              </div>
            </div>

            <div className="mt-6 text-center">
              <Link
                href="/institutions"
                className="inline-flex items-center gap-2 px-5 py-3 bg-slate-900 hover:bg-slate-800 text-white font-semibold rounded-xl transition-colors"
              >
                <GraduationCap className="h-5 w-5" />
                Find institutions that offer these programmes
              </Link>
            </div>
          </div>
        )}
      </div>
    </section>
  )
}
