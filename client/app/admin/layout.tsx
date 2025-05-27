import {
  LayoutDashboard,
  List,
  LucideAlignVerticalJustifyCenter,
  PlusCircle,
} from 'lucide-react'
import type { Metadata } from 'next'
import { cookies } from 'next/headers'
import Link from 'next/link'
import type React from 'react'
import Logout from '../../components/logout'

export const metadata: Metadata = {
  title: 'Admin Dashboard | Tekarsh',
  description: 'Administrative dashboard for Tekarsh website management',
}

const navLinks = [
  {
    href: '/admin',
    label: 'Dashboard',
    icon: LayoutDashboard,
  },
  {
    href: '/admin/applications',
    label: 'Job Applications',
    icon: List,
  },
  {
    href: '/admin/add-position',
    label: 'Add Position',
    icon: PlusCircle,
  },
  {
    href: '/admin/blog',
    label: 'Blogs',
    icon: LucideAlignVerticalJustifyCenter,
  },
]

const authLinks = [
  {
    href: '/admin/login',
    label: 'Login',
  },
  {
    href: '/admin/signup',
    label: 'Sign Up',
  },
]

export default async function AdminLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const cookieStore = await cookies()
  const isLogin = cookieStore.get('token')?.value === undefined ? false : true
  return (
    <div>
      <header className="bg-gray-50 flex flex-col md:flex-row max-md:items-start items-center justify-between gap-2 text-sm shadow-sm p-4 md:px-12">
        <div className="flex flex-col md:flex-row items-center max-md:items-start gap-2">
          {isLogin &&
            navLinks.map((link, index) => (
              <div
                key={index}
                className="flex  items-center gap-2"
              >
                <Link
                  key={link.href}
                  href={link.href}
                  className="font-medium hover:text-green-600 transition-colors text-gray-800 flex items-center"
                >
                  <link.icon className="inline-block mr-1 w-4 h-4" />
                  {link.label}
                </Link>
                {index < navLinks.length - 1 && (
                  <div className="max-md:hidden text-gray-400">|</div>
                )}
              </div>
            ))}
        </div>

        <div className="md:hidden border border-gray-100"></div>

        <div className="flex items-center gap-2">
          {!isLogin &&
            authLinks.map((link, index) => (
              <div
                key={index}
                className="flex items-center gap-2"
              >
                <Link
                  key={link.href}
                  href={link.href}
                  className="font-medium hover:text-green-600 transition-colors text-gray-800"
                >
                  {link.label}
                </Link>
                {index < authLinks.length - 1 && (
                  <div className="text-gray-400">|</div>
                )}
              </div>
            ))}
        </div>

        {isLogin && <Logout />}
      </header>
      <div className="min-h-screen bg-gray-50 p-6">{children}</div>
    </div>
  )
}
