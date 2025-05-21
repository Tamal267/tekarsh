import type React from "react"
import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "Data Processing Services | Tekarsh",
  description:
    "Efficient and accurate data processing services for various industries. From B2B invoice processing to AI/ML data annotation, we handle your data needs with precision.",
}

export default function DataProcessingLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return <>{children}</>
}
