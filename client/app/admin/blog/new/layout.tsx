import type React from "react"
import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "Write New Blog Post | Tekarsh Admin",
  description: "Create and publish new blog posts for the Tekarsh website",
}

export default function NewBlogLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return <>{children}</>
}
