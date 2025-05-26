import type React from "react"
import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "Job Applications | Tekarsh Admin",
  description: "Manage and review job applications submitted through the Tekarsh careers page",
}

export default function ApplicationsLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return <>{children}</>
}
