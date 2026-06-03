const BROWSER_UA = 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/125.0.0.0 Safari/537.36'

// Fetch with a polite delay. Uses a browser UA so sites with basic bot detection
// don't return 403. Note: Cloudflare-protected sites still block cloud/DC IPs —
// run `npm run scrape` locally (not from Vercel) for those sources.
export async function politeGet(url: string, delayMs = 1500): Promise<string> {
  await new Promise((r) => setTimeout(r, delayMs))
  const res = await fetch(url, {
    headers: {
      'User-Agent': BROWSER_UA,
      'Accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,*/*;q=0.8',
      'Accept-Language': 'en-ZA,en;q=0.9',
    },
    signal: AbortSignal.timeout(15_000),
  })
  if (!res.ok) throw new Error(`HTTP ${res.status} fetching ${url}`)
  return res.text()
}

// Extract a 4-digit year + month from free text, return ISO YYYY-MM-DD
export function parseDeadline(text: string): string | undefined {
  // e.g. "30 September 2026", "2026-09-30", "Sept 2026"
  const months: Record<string, string> = {
    january: '01', february: '02', march: '03', april: '04',
    may: '05', june: '06', july: '07', august: '08',
    september: '09', october: '10', november: '11', december: '12',
    jan: '01', feb: '02', mar: '03', apr: '04',
    jun: '06', jul: '07', aug: '08', sep: '09', oct: '10', nov: '11', dec: '12',
  }

  // ISO format already
  const isoMatch = text.match(/(\d{4})-(\d{2})-(\d{2})/)
  if (isoMatch) return `${isoMatch[1]}-${isoMatch[2]}-${isoMatch[3]}`

  // "30 September 2026" or "September 30, 2026"
  const longMatch = text.match(/(\d{1,2})\s+(\w+)\s+(\d{4})/i)
  if (longMatch) {
    const m = months[longMatch[2].toLowerCase()]
    if (m) return `${longMatch[3]}-${m}-${longMatch[1].padStart(2, '0')}`
  }

  // "September 2026" — use end of month
  const monthYear = text.match(/(\w+)\s+(202\d)/i)
  if (monthYear) {
    const m = months[monthYear[1].toLowerCase()]
    if (m) return `${monthYear[2]}-${m}-28`
  }

  return undefined
}

// Parse "R3,000 – R6,000" or "R3000-R6000 per month"
export function parseStipend(text: string): { min?: number; max?: number } {
  const nums = [...text.matchAll(/R\s*(\d[\d,]+)/gi)].map((m) =>
    parseInt(m[1].replace(/,/g, ''))
  )
  if (nums.length >= 2) return { min: nums[0], max: nums[1] }
  if (nums.length === 1) return { min: nums[0] }
  return {}
}

// Detect NQF level from text like "NQF 4" or "Level 3"
export function parseNqfLevel(text: string): number | undefined {
  const m = text.match(/NQF\s*(\d)/i) ?? text.match(/level\s+(\d)/i)
  return m ? parseInt(m[1]) : undefined
}

// Detect SA provinces
const PROVINCES = [
  'Gauteng', 'Western Cape', 'KwaZulu-Natal', 'Eastern Cape',
  'Limpopo', 'Mpumalanga', 'Free State', 'North West', 'Northern Cape',
]
export function parseProvinces(text: string): string[] {
  return PROVINCES.filter((p) => text.toLowerCase().includes(p.toLowerCase()))
}

// Map known SETA names from text
const SETA_NAMES = [
  'MERSETA', 'MICT SETA', 'HWSETA', 'FASSET', 'EWSETA',
  'CETA', 'AgriSETA', 'Services SETA', 'W&RSETA', 'TETA',
  'CHIETA', 'FIETA', 'MQA', 'PSETA', 'SASSETA', 'CATHSSETA',
]
export function parseSeta(text: string): string | undefined {
  return SETA_NAMES.find((s) => text.toUpperCase().includes(s.toUpperCase()))
}
