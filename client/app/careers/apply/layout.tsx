import type React from "react"
import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "Apply for a Position | Tekarsh Careers",
  description:
    "Submit your application to join the Tekarsh team. We're looking for talented individuals to help us build innovative solutions.",
}

export default function ApplyLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return <>{children}</>
}
