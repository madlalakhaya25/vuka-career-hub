# 🔥 Vuka Career Hub

> South Africa's free post-matric guidance platform — TVET colleges, learnerships, bursaries, NYDA funding, APS calculator & in-demand career guides for youth aged 16–35.

**Live site:** _coming soon_  
**Stack:** Next.js 16 · TypeScript · Tailwind CSS v4 · Prisma 7 · PostgreSQL · NextAuth v5

---

## What it does

Vuka Career Hub helps South African youth navigate life after matric with free, up-to-date resources:

| Section | What's inside |
|---|---|
| **Institutions** | All 50 TVET colleges, 26 universities, top private colleges — filterable by province & NSFAS eligibility |
| **Learnerships** | Live board of SETA-funded learnerships with stipend ranges, deadlines, and apply links |
| **Bursaries** | NSFAS, Sasol, Anglo American, Eskom, SETA bursaries — with countdown timers |
| **Careers** | 12 in-demand careers with real salary tables (entry/mid/senior), demand level, and pathways |
| **NYDA** | Full guide to the R2.5B youth fund, grants (R1K–R200K), loans at 6%, and skills programmes |
| **APS Calculator** | Enter matric marks → instant APS score → list of qualifying university programmes |
| **Career Quiz** | 10-question interest quiz → top 3 career matches with pathways and salary data |

---

## Tech Stack

```
Frontend        Next.js 16 (App Router, Turbopack)
Styling         Tailwind CSS v4 — custom design system with glassmorphism, mesh gradients, animations
Database        PostgreSQL via Neon (serverless)
ORM             Prisma 7 (driver adapter pattern with @prisma/adapter-pg)
Auth            NextAuth v5 (credentials + JWT sessions)
Email           Resend
Hosting         Vercel
```

---

## Getting Started

### 1. Clone and install

```bash
git clone https://github.com/madlalakhaya25/vuka-career-hub.git
cd vuka-career-hub
npm install
```

### 2. Set up environment variables

```bash
cp .env.example .env
```

Edit `.env` with your values:

```env
# Get a free PostgreSQL DB at https://neon.tech
DATABASE_URL="postgresql://user:password@host/vuka_career_hub?sslmode=require"

# Generate with: npx auth secret
AUTH_SECRET="your-random-secret-32-chars-minimum"
NEXTAUTH_URL="http://localhost:3000"
```

### 3. Generate Prisma client & push schema

```bash
npx prisma generate
npx prisma db push
```

### 4. Run the dev server

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000)

---

## Project Structure

```
src/
├── app/
│   ├── page.tsx                    # Home — hero, pathways, careers, NYDA, bursaries
│   ├── institutions/               # TVET, universities, private colleges
│   ├── learnerships/               # Live learnership board
│   ├── bursaries/                  # NSFAS, corporate & SETA bursaries
│   ├── careers/                    # In-demand careers + salary guide
│   ├── nyda/                       # NYDA funding guide
│   ├── tools/
│   │   ├── aps-calculator/         # Interactive APS score calculator
│   │   └── career-quiz/            # 10-question career interest quiz
│   ├── (auth)/
│   │   ├── login/                  # Sign in
│   │   └── register/               # Create account
│   ├── dashboard/                  # User dashboard (protected)
│   └── api/auth/[...nextauth]/     # NextAuth route handler
├── components/
│   └── layout/
│       ├── Navbar.tsx              # Glassmorphism sticky navbar
│       └── Footer.tsx              # Dark footer with newsletter
├── lib/
│   ├── auth.ts                     # NextAuth config
│   ├── db.ts                       # Prisma client singleton
│   └── utils.ts                    # Helpers, formatters, constants
└── app/actions/
    └── auth.ts                     # Server actions for login/register
```

---

## Database Schema

Key models: `User`, `Institution`, `Qualification`, `Learnership`, `Bursary`, `CareerPath`, `SavedBursary`, `SavedLearnership`

```bash
npx prisma studio     # Visual DB browser
npx prisma db push    # Push schema changes
npx prisma generate   # Regenerate client after schema changes
```

---

## Deployment (Vercel)

```bash
npx vercel
```

Set the same environment variables in your Vercel project dashboard. The `DATABASE_URL` from Neon works directly on Vercel's edge runtime.

---

## Monetisation (Planned)

- **Phase 1** — Google AdSense + Coursera/Udemy affiliate links
- **Phase 2** — Institution lead-gen (R300–R800 per student enquiry)
- **Phase 3** — SETA/government partnerships + premium membership
- **Phase 4** — CV builder, bursary tracker (paid features)

---

## Roadmap

- [ ] Database seed script (all 50 TVET colleges, learnerships, bursaries)
- [ ] Institution detail pages `/institutions/[slug]`
- [ ] Career detail pages `/careers/[slug]`
- [ ] Bursary deadline alert emails (Resend)
- [ ] Province-based filtering with saved preferences
- [ ] Google AdSense integration
- [ ] Learnership application tracking
- [ ] Admin dashboard for content management

---

## Contributing

Pull requests are welcome. For major changes please open an issue first.

---

## License

MIT
