import type { Metadata } from 'next'
import type React from 'react'

export const metadata: Metadata = {
  title: 'Blog Management | Tekarsh Admin',
  description: 'Manage blog posts and content for the Tekarsh website',
}

export default function BlogLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return <>{children}</>
}
