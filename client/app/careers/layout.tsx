import type { Metadata } from 'next'
import type React from 'react'

export const metadata: Metadata = {
  title: 'Careers at Tekarsh | Join Our Team',
  description:
    'Build your future with Tekarsh. Explore open positions and join our team of thinkers, creators, and problem solvers.',
}

export default function CareersLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return <>{children}</>
}
