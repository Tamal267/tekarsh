import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion'
import {
  Drawer,
  DrawerContent,
  DrawerDescription,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from '@/components/ui/drawer'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import { ChevronDown, Menu } from 'lucide-react'
import Image from 'next/image'
import Link from 'next/link'
import { Button } from './ui/button'

const NavLinks = [
  { name: 'Home', href: '/' },
  { name: 'Why Choose Us', href: '/#why-choose-us' },
  { name: 'Services', href: '/#services' },
  { name: 'Careers', href: '/careers' },
]

const GivingBackLinks = [
  { name: 'Education', href: '/' },
  { name: 'Water', href: '/' },
  { name: 'Health', href: '/' },
]

export function Navbar() {
  return (
    <div className="flex flex-row md:justify-around justify-between p-2 background-white shadow-md rounded-lg">
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
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button
                variant="ghost"
                className="flex items-center gap-1 font-medium"
              >
                Giving Back <ChevronDown className="h-4 w-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent
              align="end"
              className="w-[200px]"
            >
              {GivingBackLinks.map((link) => (
                <DropdownMenuItem
                  key={link.name}
                  asChild
                >
                  <Link
                    href={link.href}
                    className="w-full cursor-pointer"
                  >
                    {link.name}
                  </Link>
                </DropdownMenuItem>
              ))}
            </DropdownMenuContent>
          </DropdownMenu>
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
                <Accordion
                  type="single"
                  collapsible
                >
                  <AccordionItem value="item-1">
                    <AccordionTrigger className="text-gray-800">
                      Giving Back
                    </AccordionTrigger>
                    <AccordionContent className="border-b border-gray-100">
                      {GivingBackLinks.map((link) => (
                        <Link
                          key={link.name}
                          href={link.href}
                          className="text-gray-800 hover:text-green-600 transition-colors py-2 block"
                        >
                          {link.name}
                        </Link>
                      ))}
                    </AccordionContent>
                  </AccordionItem>
                </Accordion>
              </nav>
            </div>
          </DrawerContent>
        </Drawer>
      </div>
    </div>
  )
}
