import type { Metadata } from 'next'
import type React from 'react'
import { Suspense } from 'react'
import Loading from '../../loading'

export const metadata: Metadata = {
  title: 'Job Applications | Tekarsh Admin',
  description:
    'Manage and review job applications submitted through the Tekarsh careers page',
}

export default function ApplicationsLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <Suspense fallback={<Loading />}>{children}</Suspense>
    </div>
  )
}
