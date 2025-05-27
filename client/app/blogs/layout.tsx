import type React from "react"
import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "Blogs - Tekarsh",
  description:
    "Read our latest insights, tutorials, and industry updates on technology, development, and business solutions.",
}

export default function BlogsLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return children
}
