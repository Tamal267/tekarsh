import type React from "react"
import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "Admin Login - Tekarsh",
  description: "Sign in to your Tekarsh admin account",
}

export default function LoginLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return children
}
