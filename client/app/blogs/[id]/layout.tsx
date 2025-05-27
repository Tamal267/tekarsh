import type React from "react"
import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "Blog Post - Tekarsh",
  description: "Read our latest insights and tutorials on technology and business solutions.",
}

export default function BlogPostLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return children
}
