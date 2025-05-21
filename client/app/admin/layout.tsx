import type { Metadata } from 'next'
import type React from 'react'

export const metadata: Metadata = {
  title: 'Admin Dashboard | Tekarsh',
  description: 'Administrative dashboard for Tekarsh website management',
}

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return <>{children}</>
}
