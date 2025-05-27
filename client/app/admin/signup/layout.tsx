import type React from "react"
import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "Admin Signup - Tekarsh",
  description: "Create your Tekarsh admin account",
}

export default function SignupLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return children
}
