import type { Metadata } from 'next'
import type React from 'react'

export const metadata: Metadata = {
  title: 'Software Development Services | Tekarsh',
  description:
    'Custom software development solutions tailored to your business needs. We build scalable and efficient applications with cutting-edge technologies.',
}

export default function SoftwareDevelopmentLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return <>{children}</>
}
