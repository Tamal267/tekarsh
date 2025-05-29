import {
  Drawer,
  DrawerContent,
  DrawerDescription,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from '@/components/ui/drawer'
import { Menu } from 'lucide-react'
import { cookies } from 'next/headers'
import Image from 'next/image'
import Link from 'next/link'
import { Button } from './ui/button'

const NavLinks = [
  { name: 'Home', href: '/' },
  { name: 'Why Choose Us', href: '/#why-choose-us' },
  { name: 'Services', href: '/#services' },
  { name: 'Careers', href: '/careers' },
  { name: 'Blogs', href: '/blogs' },
]

export async function Navbar() {
  const cookieStore = await cookies()
  const isLogin = cookieStore.get('token')?.value === undefined ? false : true
  return (
    <div className="flex flex-row md:justify-around items-center justify-between p-2 background-white shadow-md">
      <div className="">
        <Image
          src="/images/tekarsh_logo.png"
          alt="Logo"
          width={100}
          height={100}
          className="rounded-full"
          priority
        />
      </div>
      <div className="max-md:hidden">
        <div className="flex items-center space-x-6">
          {NavLinks.map((link) => (
            <Link
              key={link.name}
              href={link.href}
              className="text-gray-700 hover:text-green-600 transition-colors font-medium"
            >
              {link.name}
            </Link>
          ))}
          {isLogin && (
            <Link
              href="/admin"
              className="text-gray-700 hover:text-green-600 transition-colors font-medium"
            >
              Admin Dashboard
            </Link>
          )}
        </div>
      </div>
      {/* Mobile Navigation */}
      <div className="md:hidden">
        <Drawer>
          <DrawerTrigger asChild>
            <Button
              variant="outline"
              size="icon"
            >
              <Menu className="h-5 w-5" />
              <span className="sr-only">Toggle menu</span>
            </Button>
          </DrawerTrigger>
          <DrawerContent>
            <DrawerHeader>
              <DrawerTitle>Navigation</DrawerTitle>
              <DrawerDescription>Browse our website</DrawerDescription>
            </DrawerHeader>
            <div className="px-4 py-2 overflow-y-auto max-h-[60vh]">
              <nav className="flex flex-col space-y-4">
                {NavLinks.map((link) => (
                  <Link
                    key={link.name}
                    href={link.href}
                    className="text-gray-800 hover:text-green-600 transition-colors py-2 border-b border-gray-100"
                  >
                    {link.name}
                  </Link>
                ))}
                {isLogin && (
                  <Link
                    href="/admin"
                    className="text-gray-800 hover:text-green-600 transition-colors py-2 border-b border-gray-100"
                  >
                    Admin Dashboard
                  </Link>
                )}
              </nav>
            </div>
          </DrawerContent>
        </Drawer>
      </div>
    </div>
  )
}
