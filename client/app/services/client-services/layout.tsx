import type { Metadata } from 'next'
import type React from 'react'

export const metadata: Metadata = {
  title: 'Client Services | Tekarsh',
  description:
    'Experience exceptional client service with Tekarsh. We deliver high-quality solutions with fewer iterations, saving you time and resources.',
}

export default function ClientServicesLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return <>{children}</>
}
