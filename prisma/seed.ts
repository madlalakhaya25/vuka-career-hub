import { PrismaClient } from '../src/generated/prisma/client'
import { PrismaPg } from '@prisma/adapter-pg'

const connectionString = process.env.DATABASE_URL!
const adapter = new PrismaPg({ connectionString })
const prisma = new PrismaClient({ adapter })

function slugify(str: string) {
  return str
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/(^-|-$)/g, '')
}

async function main() {
  console.log('🌱 Seeding database...')

  // ─── Careers ─────────────────────────────────────────────────────────────────

  const careers = [
    {
      title: 'Software Developer',
      sector: 'Information Technology',
      fieldOfStudy: 'Information Technology',
      icon: '💻',
      demandLevel: 'CRITICAL' as const,
      salaryEntry: 25000, salaryMid: 55000, salarySenior: 88000,
      description: 'Design, build, and maintain software. One of the highest-paying careers in SA with remote work opportunities for international companies.',
      skills: ['JavaScript', 'Python', 'React', 'Node.js', 'SQL'],
      pathways: ['BSc Computer Science', 'MICT SETA Learnership', 'WeThinkCode_ / HyperionDev Bootcamp'],
      outlook: 'ICT skills shortage up 57% YoY — 22% of companies struggled to fill roles in 2025',
    },
    {
      title: 'Electrician (Artisan)',
      sector: 'Trades',
      fieldOfStudy: 'Engineering & Trades',
      icon: '⚡',
      demandLevel: 'CRITICAL' as const,
      salaryEntry: 17000, salaryMid: 25000, salarySenior: 52000,
      description: 'Install and repair electrical systems. Red Seal trade with lifelong earning potential — own your business and earn even more.',
      skills: ['Wiring & installations', 'Fault diagnosis', "Wireman's license", 'Safety compliance'],
      pathways: ['TVET N1–N3 + Apprenticeship', 'MERSETA Learnership', 'Trade test → Red Seal'],
      outlook: 'Artisan shortage doubled — 22% of companies could not fill artisan roles in 2025',
    },
    {
      title: 'Solar PV Technician',
      sector: 'Renewable Energy',
      fieldOfStudy: 'Engineering & Trades',
      icon: '☀️',
      demandLevel: 'CRITICAL' as const,
      salaryEntry: 8000, salaryMid: 18000, salarySenior: 35000,
      description: 'Install and maintain solar power systems for homes, businesses, and industrial sites. Energy crisis created explosive demand.',
      skills: ['Solar PV installation', 'Inverter systems', 'Electrical basics', 'Safety practices'],
      pathways: ['Solar PV NQF 3 (QCTO)', 'EWSETA Learnership', 'PQRS Training / MSC Academy'],
      outlook: "One of SA's fastest-growing sectors",
    },
    {
      title: 'Data Scientist',
      sector: 'Information Technology',
      fieldOfStudy: 'Information Technology',
      icon: '📊',
      demandLevel: 'CRITICAL' as const,
      salaryEntry: 21000, salaryMid: 40000, salarySenior: 68000,
      description: 'Analyse data to find insights that drive business decisions. Growing rapidly in SA — AI/ML engineers are emerging as top earners.',
      skills: ['Python', 'R', 'SQL', 'Machine Learning', 'Statistics'],
      pathways: ['BSc Statistics/Maths', 'BCom Analytics', 'Coursera Data Science cert'],
      outlook: 'AI/ML engineers emerging as top earners',
    },
    {
      title: 'Cybersecurity Analyst',
      sector: 'Information Technology',
      fieldOfStudy: 'Information Technology',
      icon: '🔒',
      demandLevel: 'CRITICAL' as const,
      salaryEntry: 25000, salaryMid: 55000, salarySenior: 100000,
      description: 'Protect organisations from cyber attacks. As businesses go digital, demand has skyrocketed. Excellent remote work options.',
      skills: ['Network security', 'Ethical hacking', 'CompTIA Security+', 'SIEM tools'],
      pathways: ['Diploma Cybersecurity', 'CompTIA A+ → Security+', 'Certified Ethical Hacker (CEH)'],
      outlook: "Critical shortage — one of SA's fastest-growing sectors",
    },
    {
      title: 'Registered Nurse',
      sector: 'Healthcare',
      fieldOfStudy: 'Healthcare',
      icon: '🏥',
      demandLevel: 'HIGH' as const,
      salaryEntry: 15000, salaryMid: 28000, salarySenior: 60000,
      description: 'Provide patient care in hospitals, clinics, and communities. Strong job security and many specialisation paths.',
      skills: ['Patient care', 'Clinical assessment', 'Emergency response', 'Medication'],
      pathways: ['4-year B.Cur Degree', '3-year Diploma Nursing', 'HWSETA Learnership (Auxiliary)'],
      outlook: 'Registered nurses hardest healthcare role to recruit',
    },
    {
      title: 'Cloud Engineer / DevOps',
      sector: 'Information Technology',
      fieldOfStudy: 'Information Technology',
      icon: '☁️',
      demandLevel: 'CRITICAL' as const,
      salaryEntry: 30000, salaryMid: 65000, salarySenior: 110000,
      description: 'Build and manage cloud infrastructure on AWS, Azure, or GCP. As SA companies migrate to the cloud, demand is surging.',
      skills: ['AWS / Azure / GCP', 'Docker', 'Kubernetes', 'CI/CD', 'Linux'],
      pathways: ['BSc Computer Science', 'AWS/Azure certifications (self-study)', 'MICT SETA → specialise'],
      outlook: 'Among the fastest-growing IT roles globally',
    },
    {
      title: 'Boilermaker',
      sector: 'Trades',
      fieldOfStudy: 'Engineering & Trades',
      icon: '⚙️',
      demandLevel: 'CRITICAL' as const,
      salaryEntry: 17500, salaryMid: 27000, salarySenior: 50000,
      description: 'Fabricate and repair boilers, pressure vessels, and structural steel. Work across mining, manufacturing, and energy sectors.',
      skills: ['Welding', 'Metal fabrication', 'Blueprint reading', 'Pressure vessels'],
      pathways: ['TVET N1–N3 + Apprenticeship', 'MERSETA Learnership', 'Trade test → Red Seal'],
      outlook: 'Critical across mining and energy sectors',
    },
    {
      title: 'Accountant / Bookkeeper',
      sector: 'Finance',
      fieldOfStudy: 'Finance & Accounting',
      icon: '📈',
      demandLevel: 'HIGH' as const,
      salaryEntry: 18000, salaryMid: 40000, salarySenior: 80000,
      description: 'Manage financial records and tax compliance. Every business needs accounting — stable, high demand across all industries.',
      skills: ['SAGE / Pastel', 'Xero', 'Tax legislation', 'Financial reporting'],
      pathways: ['BCom Accounting', 'Diploma Accounting (TVET)', 'FASSET Learnership', 'CIMA articles'],
      outlook: 'Stable demand — finance sector resilient',
    },
    {
      title: 'Digital Marketer',
      sector: 'Marketing',
      fieldOfStudy: 'Marketing & Media',
      icon: '📱',
      demandLevel: 'HIGH' as const,
      salaryEntry: 12000, salaryMid: 28000, salarySenior: 55000,
      description: 'Manage online campaigns across social media, search, and email. Every business needs digital marketing expertise.',
      skills: ['Google Ads', 'Meta Ads', 'SEO', 'Content creation', 'Analytics'],
      pathways: ['Diploma Marketing', 'MICT SETA Learnership', 'Google/Meta Certifications (free)'],
      outlook: 'Every business needs digital marketing',
    },
    {
      title: 'Plumber',
      sector: 'Trades',
      fieldOfStudy: 'Engineering & Trades',
      icon: '🔧',
      demandLevel: 'HIGH' as const,
      salaryEntry: 12750, salaryMid: 21750, salarySenior: 38000,
      description: 'Install and repair plumbing and drainage systems. Critical shortage in construction — self-employed plumbers with a good client base can earn R200K+/year.',
      skills: ['Pipe fitting', 'Drainage systems', 'Gas installation', 'Building regulations'],
      pathways: ['TVET N1 Plumbing', 'Apprenticeship (3–4 years)', 'Trade test → Red Seal'],
      outlook: 'Construction boom driving demand',
    },
    {
      title: 'Paramedic / EMT',
      sector: 'Healthcare',
      fieldOfStudy: 'Healthcare',
      icon: '🚑',
      demandLevel: 'HIGH' as const,
      salaryEntry: 14000, salaryMid: 24000, salarySenior: 41000,
      description: 'Respond to medical emergencies and provide pre-hospital care. Career ladder from BAA to Advanced Life Support.',
      skills: ['Advanced life support', 'Triage', 'Emergency driving', 'Trauma care'],
      pathways: ['BAA Course (4 weeks)', 'ILS Certificate (1 year)', 'BHSc Emergency Medical Care'],
      outlook: 'Growing demand for emergency services',
    },
  ]

  for (const career of careers) {
    await prisma.careerPath.upsert({
      where: { slug: slugify(career.title) },
      update: career,
      create: { ...career, slug: slugify(career.title) },
    })
  }
  console.log(`  ✓ ${careers.length} careers seeded`)

  // ─── Learnerships ─────────────────────────────────────────────────────────────

  const learnerships = [
    {
      title: 'Software Development Learnership',
      provider: 'MICT SETA', seta: 'MICT SETA', sector: 'Information Technology',
      nqfLevel: 5, stipendMin: 3500, stipendMax: 5500, durationMonths: 12,
      deadline: new Date('2025-09-30'), provinces: ['National'], isNational: true, status: 'OPEN' as const,
      requirements: 'Grade 12 with Mathematics',
      description: 'Learn software development, databases, and systems analysis. Placed with IT companies.',
      icon: '💻', fieldOfStudy: 'Information Technology',
    },
    {
      title: 'Electrical Trade Learnership',
      provider: 'MERSETA', seta: 'MERSETA', sector: 'Engineering',
      nqfLevel: 3, stipendMin: 3000, stipendMax: 7000, durationMonths: 18,
      deadline: new Date('2025-08-31'), provinces: ['Gauteng', 'KwaZulu-Natal', 'Western Cape'], isNational: false, status: 'OPEN' as const,
      requirements: 'Grade 12 with Mathematics and Physical Science',
      description: 'Become a qualified electrician. Classroom theory + hands-on training towards Red Seal.',
      icon: '⚡', fieldOfStudy: 'Engineering & Trades',
    },
    {
      title: 'Business Administration Learnership',
      provider: 'Services SETA', seta: 'Services SETA', sector: 'Business & Commerce',
      nqfLevel: 4, stipendMin: 3000, stipendMax: 4500, durationMonths: 12,
      deadline: new Date('2025-10-15'), provinces: ['National'], isNational: true, status: 'OPEN' as const,
      requirements: 'Grade 12',
      description: 'Business administration, customer service, and office management skills.',
      icon: '📋', fieldOfStudy: 'Business & Commerce',
    },
    {
      title: 'Solar PV Installation Learnership',
      provider: 'EWSETA', seta: 'EWSETA', sector: 'Renewable Energy',
      nqfLevel: 3, stipendMin: 3000, stipendMax: 5000, durationMonths: 12,
      deadline: new Date('2025-11-30'), provinces: ['Limpopo', 'Gauteng', 'Free State'], isNational: false, status: 'OPEN' as const,
      requirements: 'Grade 12 with Mathematics or Technical subjects',
      description: "Install and maintain solar PV systems. One of SA's fastest-growing sectors.",
      icon: '☀️', fieldOfStudy: 'Engineering & Trades',
    },
    {
      title: 'Auxiliary Nursing Learnership',
      provider: 'HWSETA', seta: 'HWSETA', sector: 'Healthcare',
      nqfLevel: 3, stipendMin: 2800, stipendMax: 4000, durationMonths: 12,
      deadline: new Date('2025-09-15'), provinces: ['National'], isNational: true, status: 'OPEN' as const,
      requirements: 'Grade 12 — Life Sciences preferred',
      description: 'Assist professional nurses in hospitals and clinics. Strong employment prospects.',
      icon: '🏥', fieldOfStudy: 'Healthcare',
    },
    {
      title: 'Digital Marketing Learnership',
      provider: 'MICT SETA', seta: 'MICT SETA', sector: 'Marketing & Media',
      nqfLevel: 4, stipendMin: 3000, stipendMax: 4500, durationMonths: 12,
      deadline: new Date('2025-10-31'), provinces: ['National'], isNational: true, status: 'OPEN' as const,
      requirements: 'Grade 12',
      description: 'Social media, SEO, content creation, and digital advertising. Real client campaigns.',
      icon: '📱', fieldOfStudy: 'Marketing & Media',
    },
    {
      title: 'Boilermaking Learnership',
      provider: 'MERSETA', seta: 'MERSETA', sector: 'Engineering',
      nqfLevel: 3, stipendMin: 3000, stipendMax: 5000, durationMonths: 18,
      deadline: new Date('2025-07-31'), provinces: ['Gauteng', 'Mpumalanga', 'KwaZulu-Natal'], isNational: false, status: 'OPEN' as const,
      requirements: 'Grade 10 minimum, Grade 12 preferred',
      description: 'Fabricate and repair boilers and structural steel. Critical skills shortage.',
      icon: '⚙️', fieldOfStudy: 'Engineering & Trades',
    },
    {
      title: 'Accounting & Finance Learnership',
      provider: 'FASSET', seta: 'FASSET', sector: 'Finance',
      nqfLevel: 4, stipendMin: 3500, stipendMax: 5000, durationMonths: 12,
      deadline: new Date('2025-08-31'), provinces: ['National'], isNational: true, status: 'OPEN' as const,
      requirements: 'Grade 12 with Accounting or Mathematics',
      description: 'Bookkeeping, payroll, and financial administration. Entry into the finance profession.',
      icon: '💰', fieldOfStudy: 'Finance & Accounting',
    },
  ]

  for (const l of learnerships) {
    await prisma.learnership.upsert({
      where: { slug: slugify(l.title) },
      update: l,
      create: { ...l, slug: slugify(l.title) },
    })
  }
  console.log(`  ✓ ${learnerships.length} learnerships seeded`)

  // ─── Bursaries ────────────────────────────────────────────────────────────────

  const bursaries = [
    {
      name: 'NSFAS',
      fullName: 'National Student Financial Aid Scheme',
      provider: 'Government', category: 'government',
      icon: '🎓', featured: true,
      amountDescription: 'Full tuition + accommodation + R5,200/month living allowance',
      deadline: new Date('2025-11-15'), applicationUrl: 'https://www.nsfas.org.za',
      eligibilityNotes: 'SA citizen, household income ≤ R350K/yr. SASSA auto-qualifies. Public universities & TVET only.',
      description: "SA's largest student funding scheme. Covers tuition, accommodation or travel, learning materials, and personal care allowance.",
      fieldsOfStudy: ['All fields'],
      isNsfas: true, isActive: true,
    },
    {
      name: 'Funza Lushaka',
      fullName: 'Teaching Bursary',
      provider: 'Department of Basic Education', category: 'government',
      icon: '📚', featured: false,
      amountDescription: 'Full bursary — tuition, accommodation & living expenses',
      deadline: new Date('2026-01-24'), applicationUrl: 'https://www.funzalushaka.doe.gov.za',
      eligibilityNotes: 'B.Ed at an approved university (PGCE not funded in 2026). Work-back obligation: teach at a public school. Priority: Maths, Physical Sciences, Computer Applications Technology, Agricultural Sciences, African Languages.',
      description: 'Full government bursary for aspiring teachers in exchange for teaching in a public school after graduation.',
      fieldsOfStudy: ['Education', 'Mathematics', 'Science', 'African Languages'],
      isNsfas: false, isActive: true,
    },
    {
      name: 'Sasol Bursary',
      fullName: 'Sasol Bursary Programme',
      provider: 'Sasol', category: 'corporate',
      icon: '⚗️', featured: true,
      amountDescription: 'Tuition + living allowance + psychosocial support',
      deadline: new Date('2027-05-31'), applicationUrl: 'https://www.sasol.com/careers/bursaries',
      eligibilityNotes: 'SA citizen. Matric or first-year student. Mathematics & Physical Science required.',
      description: "One of SA's most prestigious corporate bursaries. Includes vacation work and a strong chance of employment after graduation. Note: no 2026 undergraduate bursary was offered — this is for the 2027 academic year.",
      fieldsOfStudy: ['Engineering', 'Science', 'Mathematics', 'Statistics', 'Data Science'],
      isNsfas: false, isActive: true,
    },
    {
      name: 'Anglo American',
      fullName: 'Anglo American Bursary',
      provider: 'Anglo American', category: 'corporate',
      icon: '⛏️', featured: false,
      amountDescription: 'Full tuition + living allowance',
      deadline: new Date('2025-10-31'), applicationUrl: 'https://www.angloamerican.com/careers',
      eligibilityNotes: 'SA citizen. Good academic record. Studying at a recognised SA university.',
      description: 'Anglo American funds students in mining, engineering, and geosciences. Includes vacation work at their operations.',
      fieldsOfStudy: ['Mining Engineering', 'Metallurgy', 'Mechanical Engineering', 'Geology', 'Finance'],
      isNsfas: false, isActive: true,
    },
    {
      name: 'Eskom Bursary',
      fullName: 'Eskom Bursary Programme',
      provider: 'Eskom', category: 'corporate',
      icon: '⚡', featured: false,
      amountDescription: 'Full tuition + monthly allowance',
      deadline: new Date('2025-10-31'), applicationUrl: 'https://www.eskom.co.za/careers',
      eligibilityNotes: 'SA citizen. Min 60% in Maths & Physical Science. Strong chance of employment.',
      description: 'Eskom funds engineering and technical students. Vacation work included. Critical need for qualified engineers.',
      fieldsOfStudy: ['Electrical Engineering', 'Mechanical Engineering', 'Civil Engineering', 'IT', 'Finance'],
      isNsfas: false, isActive: true,
    },
    {
      name: 'Standard Bank',
      fullName: 'Standard Bank Bursary',
      provider: 'Standard Bank', category: 'corporate',
      icon: '🏦', featured: false,
      amountDescription: 'Full tuition + accommodation + monthly allowance',
      deadline: new Date('2025-08-31'), applicationUrl: 'https://jobs.standardbank.com',
      eligibilityNotes: 'SA citizen. Min 65% average in matric. Studying at a South African university.',
      description: 'Full bursary for commerce, accounting, and IT students with mentorship and graduate employment opportunity.',
      fieldsOfStudy: ['Commerce', 'Accounting', 'IT', 'Data Science', 'Finance'],
      isNsfas: false, isActive: true,
    },
    {
      name: 'MICT SETA',
      fullName: 'MICT SETA Bursary',
      provider: 'MICT SETA', category: 'seta',
      icon: '💻', featured: false,
      amountDescription: 'Tuition and/or living allowance',
      deadline: new Date('2025-09-30'), applicationUrl: 'https://www.mict.org.za',
      eligibilityNotes: 'SA citizen. Enrolled in ICT qualification. Universities, private colleges, and TVET colleges.',
      description: 'MICT SETA funds IT students at all institution types. Ideal for students not qualifying for NSFAS.',
      fieldsOfStudy: ['Information Technology', 'Software Development', 'Cybersecurity', 'Data Science'],
      isNsfas: false, isActive: true,
    },
    {
      name: 'MERSETA',
      fullName: 'MERSETA Engineering Bursary',
      provider: 'MERSETA', category: 'seta',
      icon: '⚙️', featured: false,
      amountDescription: 'Varies — full to partial bursaries',
      deadline: new Date('2026-02-20'), applicationUrl: 'https://www.merseta.org.za',
      eligibilityNotes: 'SA citizen. Manufacturing, engineering sector. TVET and university students.',
      description: 'MERSETA funds engineering and manufacturing students. One of the most accessible bursaries for TVET students.',
      fieldsOfStudy: ['Mechanical Engineering', 'Electrical Engineering', 'Manufacturing', 'Metallurgy'],
      isNsfas: false, isActive: true,
    },
  ]

  for (const b of bursaries) {
    await prisma.bursary.upsert({
      where: { slug: slugify(b.name) },
      update: b,
      create: { ...b, slug: slugify(b.name) },
    })
  }
  console.log(`  ✓ ${bursaries.length} bursaries seeded`)

  // ─── Institutions ─────────────────────────────────────────────────────────────

  const institutions = [
    { name: 'University of Cape Town (UCT)', type: 'UNIVERSITY' as const, provinces: ['Western Cape'], city: 'Cape Town', website: 'https://www.uct.ac.za', nsfasAccredited: true, description: "Africa's top-ranked university. Strong in law, medicine, commerce, and engineering.", appCloseDisplay: 'Oct 2025', applicationCloseDate: new Date('2025-10-31'), featured: true, rank: '1st in Africa' },
    { name: 'University of the Witwatersrand (Wits)', type: 'UNIVERSITY' as const, provinces: ['Gauteng'], city: 'Johannesburg', website: 'https://www.wits.ac.za', nsfasAccredited: true, description: 'Premier research university in Johannesburg. Renowned for medicine, engineering, and law.', appCloseDisplay: 'Sep 2025', applicationCloseDate: new Date('2025-09-30'), featured: true, rank: 'Top 5 SA' },
    { name: 'University of Pretoria (UP)', type: 'UNIVERSITY' as const, provinces: ['Gauteng'], city: 'Pretoria', website: 'https://www.up.ac.za', nsfasAccredited: true, description: "One of SA's largest universities. Strong in veterinary science, law, and engineering.", appCloseDisplay: 'Oct 2025', applicationCloseDate: new Date('2025-10-31'), featured: false },
    { name: 'Stellenbosch University', type: 'UNIVERSITY' as const, provinces: ['Western Cape'], city: 'Stellenbosch', website: 'https://www.sun.ac.za', nsfasAccredited: true, description: 'Top research university. Strong in agriculture, data science, and engineering.', appCloseDisplay: 'Sep 2025', applicationCloseDate: new Date('2025-09-30'), featured: false },
    { name: 'UKZN', type: 'UNIVERSITY' as const, provinces: ['KwaZulu-Natal'], city: 'Durban / PMB', website: 'https://www.ukzn.ac.za', nsfasAccredited: true, description: 'Two campuses in Durban and Pietermaritzburg. Well known for healthcare, engineering, and agriculture.', appCloseDisplay: 'Sep 2025', applicationCloseDate: new Date('2025-09-30'), featured: false },
    { name: 'UNISA', type: 'DISTANCE_LEARNING' as const, provinces: ['National'], city: 'Distance learning', website: 'https://www.unisa.ac.za', nsfasAccredited: true, description: "Africa's largest university. Fully online — study from anywhere in SA or the world.", appCloseDisplay: 'Oct 2025', applicationCloseDate: new Date('2025-10-31'), featured: true, rank: 'Largest in Africa' },
    { name: 'Tshwane University of Technology (TUT)', type: 'UNIVERSITY' as const, provinces: ['Gauteng'], city: 'Pretoria', website: 'https://www.tut.ac.za', nsfasAccredited: true, description: "One of SA's largest universities by student numbers. Practical, hands-on degrees in IT, engineering, and business.", appCloseDisplay: 'Oct 2025', applicationCloseDate: new Date('2025-10-31'), featured: false },
    { name: 'Durban University of Technology (DUT)', type: 'UNIVERSITY' as const, provinces: ['KwaZulu-Natal'], city: 'Durban', website: 'https://www.dut.ac.za', nsfasAccredited: true, description: 'Strong engineering, IT, management, and health sciences in KZN.', appCloseDisplay: 'Oct 2025', applicationCloseDate: new Date('2025-10-31'), featured: false },
    { name: 'Tshwane North TVET College', type: 'TVET' as const, provinces: ['Gauteng'], city: 'Pretoria', website: 'https://www.tnc.edu.za', nsfasAccredited: true, description: "One of Gauteng's largest TVET colleges. NCV and NATED in engineering, IT, and business.", appCloseDisplay: 'Jan 2026', applicationCloseDate: new Date('2026-01-31'), featured: true },
    { name: 'Northlink TVET College', type: 'TVET' as const, provinces: ['Western Cape'], city: 'Bellville', website: 'https://www.northlink.edu.za', nsfasAccredited: true, description: 'Leading TVET college in the Western Cape. Trades, IT, business, and hospitality.', appCloseDisplay: 'Jan 2026', applicationCloseDate: new Date('2026-01-31'), featured: false },
    { name: 'Majuba TVET College', type: 'TVET' as const, provinces: ['KwaZulu-Natal'], city: 'Newcastle', website: 'https://www.majuba.edu.za', nsfasAccredited: true, description: 'Well-regarded TVET college in the Newcastle area. Strong in engineering trades, IT, and business.', appCloseDisplay: 'Jan 2026', applicationCloseDate: new Date('2026-01-31'), featured: false },
    { name: 'West Coast TVET College', type: 'TVET' as const, provinces: ['Western Cape'], city: 'Vredenburg', website: 'https://www.westcoastcollege.co.za', nsfasAccredited: true, description: 'Main TVET option along the West Coast. Offers NCV and NATED in trades, business, and engineering.', appCloseDisplay: 'Jan 2026', applicationCloseDate: new Date('2026-01-31'), featured: false },
    { name: 'Rosebank College (IIE)', type: 'PRIVATE_COLLEGE' as const, provinces: ['Gauteng', 'Western Cape', 'KwaZulu-Natal'], city: 'Multiple campuses', website: 'https://www.rosebankcollege.co.za', nsfasAccredited: false, description: 'Affordable IIE private college with flexible payment plans. Business, IT, and media.', appCloseDisplay: 'Rolling', featured: true },
    { name: 'Boston City Campus', type: 'PRIVATE_COLLEGE' as const, provinces: ['Gauteng', 'Western Cape', 'Eastern Cape'], city: 'Multiple campuses', website: 'https://www.boston.co.za', nsfasAccredited: false, description: "Been around since 1974 — one of SA's longest-running private colleges. Practical diplomas and certificates you can finish quickly.", appCloseDisplay: 'Rolling', featured: false },
    { name: 'Regenesys Business School', type: 'PRIVATE_COLLEGE' as const, provinces: ['Gauteng'], city: 'Sandton', website: 'https://www.regenesys.net', nsfasAccredited: false, description: 'Business and management school. MBAs, BCom, and professional development.', appCloseDisplay: 'Rolling', featured: false },
  ]

  for (const inst of institutions) {
    await prisma.institution.upsert({
      where: { slug: slugify(inst.name) },
      update: inst,
      create: { ...inst, slug: slugify(inst.name) },
    })
  }
  console.log(`  ✓ ${institutions.length} institutions seeded`)

  console.log('\n✅ Seed complete!')
  console.log('\n💡 To create an admin user, run:')
  console.log('   npx prisma studio  (then set isAdmin=true on your user)')
  console.log('   OR update directly: UPDATE "User" SET "isAdmin"=true WHERE email=\'your@email.com\';')
}

main()
  .catch((e) => { console.error(e); process.exit(1) })
  .finally(() => prisma.$disconnect())
