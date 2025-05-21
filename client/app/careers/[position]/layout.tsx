import type React from "react"
import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "Job Details | Tekarsh Careers",
  description: "View detailed information about this position and apply to join our team.",
}

export default function JobDetailsLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return <>{children}</>
}
