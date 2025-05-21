import type React from "react"
import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "Quality Assurance Services | Tekarsh",
  description:
    "Comprehensive quality assurance services to ensure your software meets the highest standards of functionality, performance, and security.",
}

export default function QualityAssuranceLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return <>{children}</>
}
