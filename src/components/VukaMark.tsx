// Brand icon mark — V on orange gradient square.
// Self-contained with a unique gradient ID per instance via React.useId.
'use client'
import { useId } from 'react'

type Props = { size?: number; className?: string }

export function VukaMark({ size = 32, className = '' }: Props) {
  const id = useId().replace(/:/g, '')
  return (
    <svg
      viewBox="0 0 32 32"
      width={size}
      height={size}
      xmlns="http://www.w3.org/2000/svg"
      className={className}
    >
      <defs>
        <linearGradient id={id} x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor="#fb923c" />
          <stop offset="100%" stopColor="#c2410c" />
        </linearGradient>
      </defs>
      <rect width="32" height="32" rx="7" fill={`url(#${id})`} />
      <path
        d="M7 9.5L16 22.5L25 9.5"
        fill="none"
        stroke="white"
        strokeWidth="4.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <ellipse cx="16" cy="27" rx="2.5" ry="3" fill="white" opacity="0.65" />
    </svg>
  )
}
