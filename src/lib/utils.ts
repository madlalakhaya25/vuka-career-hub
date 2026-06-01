import { type ClassValue, clsx } from 'clsx'
import { twMerge } from 'tailwind-merge'

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function formatCurrency(amount: number): string {
  return new Intl.NumberFormat('en-ZA', {
    style: 'currency',
    currency: 'ZAR',
    maximumFractionDigits: 0,
  }).format(amount)
}

export function formatDate(date: Date | string): string {
  return new Intl.DateTimeFormat('en-ZA', {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
  }).format(new Date(date))
}

export function daysUntil(date: Date | string): number {
  const target = new Date(date)
  const today = new Date()
  const diff = target.getTime() - today.getTime()
  return Math.ceil(diff / (1000 * 60 * 60 * 24))
}

export function slugify(text: string): string {
  return text
    .toLowerCase()
    .replace(/[^\w\s-]/g, '')
    .replace(/[\s_-]+/g, '-')
    .replace(/^-+|-+$/g, '')
}

export const SA_PROVINCES = [
  'Gauteng',
  'Western Cape',
  'KwaZulu-Natal',
  'Eastern Cape',
  'Limpopo',
  'Mpumalanga',
  'North West',
  'Free State',
  'Northern Cape',
] as const

export type Province = (typeof SA_PROVINCES)[number]

export const INSTITUTION_TYPE_LABELS: Record<string, string> = {
  UNIVERSITY: 'University',
  TVET: 'TVET College',
  PRIVATE_COLLEGE: 'Private College',
  DISTANCE_LEARNING: 'Distance Learning',
  TRAINING_PROVIDER: 'Training Provider',
}

export const DEMAND_LEVEL_LABELS: Record<string, string> = {
  CRITICAL: 'Critical Shortage',
  HIGH: 'High Demand',
  MODERATE: 'Moderate Demand',
  LOW: 'Stable Demand',
}

export const DEMAND_LEVEL_COLORS: Record<string, string> = {
  CRITICAL: 'bg-red-100 text-red-700',
  HIGH: 'bg-orange-100 text-orange-700',
  MODERATE: 'bg-yellow-100 text-yellow-700',
  LOW: 'bg-green-100 text-green-700',
}
