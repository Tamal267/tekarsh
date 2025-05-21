import {
  Facebook,
  Instagram,
  Linkedin,
  Mail,
  MapPin,
  Phone,
  Twitter,
} from 'lucide-react'
import Image from 'next/image'
import Link from 'next/link'

export function Footer() {
  return (
    <footer className="w-full bg-gradient-to-b from-white to-green-50 border-t border-gray-200">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Company Information */}
          <div className="space-y-4">
            <div className="flex items-center">
              <Image
                src="/images/tekarsh_logo.png"
                alt="Logo"
                width={100}
                height={100}
                className="rounded-full"
                priority
              />
            </div>
            <p className="text-gray-600 max-w-xs">
              Innovative solutions for a sustainable future. We{"'"}re committed
              to excellence in every project we undertake.
            </p>
            <div className="flex space-x-4">
              <Link
                href="#"
                className="text-gray-600 hover:text-green-600"
              >
                <Facebook className="h-5 w-5" />
                <span className="sr-only">Facebook</span>
              </Link>
              <Link
                href="#"
                className="text-gray-600 hover:text-green-600"
              >
                <Twitter className="h-5 w-5" />
                <span className="sr-only">Twitter</span>
              </Link>
              <Link
                href="#"
                className="text-gray-600 hover:text-green-600"
              >
                <Instagram className="h-5 w-5" />
                <span className="sr-only">Instagram</span>
              </Link>
              <Link
                href="#"
                className="text-gray-600 hover:text-green-600"
              >
                <Linkedin className="h-5 w-5" />
                <span className="sr-only">LinkedIn</span>
              </Link>
            </div>
          </div>

          {/* Quick Links */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold text-gray-800 border-b border-green-600 pb-2 inline-block">
              Quick Links
            </h3>
            <ul className="space-y-2">
              <li>
                <Link
                  href="#"
                  className="text-gray-600 hover:text-green-600 transition-colors"
                >
                  Home
                </Link>
              </li>
              <li>
                <Link
                  href="#"
                  className="text-gray-600 hover:text-green-600 transition-colors"
                >
                  About Us
                </Link>
              </li>
              <li>
                <Link
                  href="#"
                  className="text-gray-600 hover:text-green-600 transition-colors"
                >
                  Services
                </Link>
              </li>
              <li>
                <Link
                  href="#"
                  className="text-gray-600 hover:text-green-600 transition-colors"
                >
                  Projects
                </Link>
              </li>
              <li>
                <Link
                  href="#"
                  className="text-gray-600 hover:text-green-600 transition-colors"
                >
                  Blog
                </Link>
              </li>
              <li>
                <Link
                  href="#"
                  className="text-gray-600 hover:text-green-600 transition-colors"
                >
                  Careers
                </Link>
              </li>
            </ul>
          </div>

          {/* Services */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold text-gray-800 border-b border-green-600 pb-2 inline-block">
              Our Services
            </h3>
            <ul className="space-y-2">
              {[
                {
                  label: 'Software Developemnt',
                  href: '/services/software-development',
                },
                {
                  label: 'Quality Assurance',
                  href: '/services/quality-assurance',
                },
                { label: 'Client Services', href: '/services/client-services' },
                { label: 'Data Processing', href: '/services/data-processing' },
              ].map((service) => (
                <li key={service.label}>
                  <Link
                    href={service.href}
                    className="text-gray-600 hover:text-green-600 transition-colors"
                  >
                    {service.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact Information */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold text-gray-800 border-b border-green-600 pb-2 inline-block">
              Contact Us
            </h3>
            <ul className="space-y-3">
              <li className="flex items-start">
                <MapPin className="h-5 w-5 text-green-600 mr-2 mt-0.5" />
                <span className="text-gray-600">
                  House# 148, Road# 22, Mohakhali DOHS, Dhaka-1212, Bangladesh
                </span>
              </li>
              <li className="flex items-center">
                <Phone className="h-5 w-5 text-green-600 mr-2" />
                <span className="text-gray-600">+1 (555) 123-4567</span>
              </li>
              <li className="flex items-center">
                <Mail className="h-5 w-5 text-green-600 mr-2" />
                <span className="text-gray-600">info@tekarsh.com</span>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Section */}
        <div className="mt-12 pt-6 border-t border-gray-200">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <p className="text-gray-600 text-sm">
              &copy; {new Date().getFullYear()} Tekarsh. All rights reserved.
            </p>
            <div className="flex space-x-6 mt-4 md:mt-0">
              <Link
                href="#"
                className="text-gray-600 hover:text-green-600 text-sm"
              >
                Privacy Policy
              </Link>
              <Link
                href="#"
                className="text-gray-600 hover:text-green-600 text-sm"
              >
                Terms of Service
              </Link>
              <Link
                href="#"
                className="text-gray-600 hover:text-green-600 text-sm"
              >
                Cookie Policy
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}
