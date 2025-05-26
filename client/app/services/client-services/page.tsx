import { Button } from '@/components/ui/button'
import {
  BarChart,
  CheckCircle,
  Clock,
  MessageSquare,
  Users,
} from 'lucide-react'
import Image from 'next/image'
import { getBlur } from '../../../lib/utils'

export default function ClientServicesPage() {
  return (
    <div className="min-h-screen flex flex-col">
      <main className="flex-1">
        {/* Hero Section */}
        <section className="relative w-full h-[50vh] md:h-[60vh] bg-black">
          <Image
            src="/images/s3img1.svg"
            alt="Business professionals high-fiving"
            fill
            className="object-cover opacity-70"
            priority
          />
          <div className="absolute inset-0 flex items-center">
            <div className="container mx-auto px-4 md:px-6">
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white">
                Client Services
              </h1>
            </div>
          </div>
        </section>

        {/* Your Win is Our Win */}
        <section className="w-full py-16 md:py-24 bg-white">
          <div className="container mx-auto px-4 md:px-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
              <div className="relative h-[300px] md:h-[400px] rounded-lg overflow-hidden">
                <Image
                  src="/images/s3img2.svg"
                  alt="Team hands stacked together"
                  fill
                  className="object-cover"
                  placeholder="blur"
                  blurDataURL={getBlur()}
                />
              </div>
              <div>
                <div className="h-1 w-16 bg-green-600 mb-6"></div>
                <h2 className="text-3xl font-bold text-gray-800 mb-6">
                  Your Win is Our Win
                </h2>
                <p className="text-gray-600 mb-4">
                  Our ultimate goal is to exceed client expectations.
                </p>
                <p className="text-gray-600">
                  At Tekarsh, we firmly believe that when you win, we win too.
                  That{"'"}s why our client service is deeply personal, highly
                  responsive, and always aligned with your business goals.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* High-Quality Delivery, Fewer Iterations */}
        <section className="w-full py-16 md:py-24 bg-gray-50">
          <div className="container mx-auto px-4 md:px-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
              <div className="order-2 lg:order-1">
                <div className="h-1 w-16 bg-green-600 mb-6"></div>
                <h2 className="text-3xl font-bold text-gray-800 mb-6">
                  High-Quality Delivery, Fewer Iterations
                </h2>
                <p className="text-gray-600 mb-4">
                  We don{"'"}t just deliver quickly — we deliver right.
                </p>
                <p className="text-gray-600">
                  Our process ensures a high-quality product that minimizes
                  back-and-forth, saving your time and resources while
                  maintaining confidence from the first release.
                </p>
              </div>
              <div className="relative h-[300px] md:h-[400px] rounded-lg overflow-hidden order-1 lg:order-2">
                <Image
                  src="/images/s1img6.svg"
                  alt="Business team collaborating around a laptop"
                  fill
                  className="object-cover"
                  placeholder="blur"
                  blurDataURL={getBlur()}
                />
              </div>
            </div>
          </div>
        </section>

        {/* Our Client Service Approach */}
        <section className="w-full py-16 md:py-24 bg-white">
          <div className="container mx-auto px-4 md:px-6">
            <div className="text-center mb-16">
              <div className="h-1 w-16 bg-green-600 mx-auto mb-6"></div>
              <h2 className="text-3xl font-bold text-gray-800">
                Our Client Service Approach
              </h2>
              <p className="mt-4 text-lg text-gray-600 max-w-3xl mx-auto">
                We{"'"}ve built our client service model around five core
                principles that ensure your success.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {/* Responsive Communication */}
              <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-100">
                <div className="w-12 h-12 rounded-full bg-green-100 flex items-center justify-center mb-6">
                  <MessageSquare className="h-6 w-6 text-green-600" />
                </div>
                <h3 className="text-xl font-semibold text-gray-800 mb-4">
                  Responsive Communication
                </h3>
                <p className="text-gray-600">
                  We prioritize clear, timely communication. Our team is always
                  accessible and responsive to your needs and questions.
                </p>
              </div>

              {/* Dedicated Team */}
              <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-100">
                <div className="w-12 h-12 rounded-full bg-green-100 flex items-center justify-center mb-6">
                  <Users className="h-6 w-6 text-green-600" />
                </div>
                <h3 className="text-xl font-semibold text-gray-800 mb-4">
                  Dedicated Team
                </h3>
                <p className="text-gray-600">
                  You{"'"}ll work with a consistent team who understands your
                  business, goals, and preferences, ensuring continuity and
                  efficiency.
                </p>
              </div>

              {/* Timely Delivery */}
              <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-100">
                <div className="w-12 h-12 rounded-full bg-green-100 flex items-center justify-center mb-6">
                  <Clock className="h-6 w-6 text-green-600" />
                </div>
                <h3 className="text-xl font-semibold text-gray-800 mb-4">
                  Timely Delivery
                </h3>
                <p className="text-gray-600">
                  We respect your timelines and deliver on schedule, every time.
                  Our project management ensures no unexpected delays.
                </p>
              </div>

              {/* Quality Assurance */}
              <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-100">
                <div className="w-12 h-12 rounded-full bg-green-100 flex items-center justify-center mb-6">
                  <CheckCircle className="h-6 w-6 text-green-600" />
                </div>
                <h3 className="text-xl font-semibold text-gray-800 mb-4">
                  Quality Assurance
                </h3>
                <p className="text-gray-600">
                  Every deliverable undergoes rigorous quality checks to ensure
                  it meets our high standards and your expectations.
                </p>
              </div>

              {/* Transparent Reporting */}
              <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-100">
                <div className="w-12 h-12 rounded-full bg-green-100 flex items-center justify-center mb-6">
                  <BarChart className="h-6 w-6 text-green-600" />
                </div>
                <h3 className="text-xl font-semibold text-gray-800 mb-4">
                  Transparent Reporting
                </h3>
                <p className="text-gray-600">
                  We provide clear, detailed reports on progress, challenges,
                  and outcomes, keeping you informed every step of the way.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Client Testimonials */}
        <section className="w-full py-16 md:py-24 bg-gray-50">
          <div className="container mx-auto px-4 md:px-6">
            <div className="text-center mb-16">
              <div className="h-1 w-16 bg-green-600 mx-auto mb-6"></div>
              <h2 className="text-3xl font-bold text-gray-800">
                What Our Clients Say
              </h2>
              <p className="mt-4 text-lg text-gray-600 max-w-3xl mx-auto">
                Don{"'"}t just take our word for it. Here{"'"}s what our clients
                have to say about working with Tekarsh.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div className="bg-white p-8 rounded-lg shadow-sm border border-gray-100">
                <p className="text-gray-600 italic mb-6">
                  {'"'}Tekarsh{"'"}s client service is exceptional. They{"'"}re
                  responsive, proactive, and truly care about our success. They
                  {"'"}ve become an extension of our team.{'"'}
                </p>
                <div className="flex items-center">
                  <div className="w-12 h-12 rounded-full bg-gray-200 mr-4"></div>
                  <div>
                    <p className="font-semibold text-gray-800">Sarah Johnson</p>
                    <p className="text-sm text-gray-500">CTO, TechInnovate</p>
                  </div>
                </div>
              </div>

              <div className="bg-white p-8 rounded-lg shadow-sm border border-gray-100">
                <p className="text-gray-600 italic mb-6">
                  {'"'}What sets Tekarsh apart is their ability to deliver
                  high-quality work with minimal iterations. They get it right
                  the first time, saving us valuable time and resources.{'"'}
                </p>
                <div className="flex items-center">
                  <div className="w-12 h-12 rounded-full bg-gray-200 mr-4"></div>
                  <div>
                    <p className="font-semibold text-gray-800">Michael Chen</p>
                    <p className="text-sm text-gray-500">
                      Product Manager, DataFlow
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="w-full py-16 md:py-24 bg-green-600 text-white">
          <div className="container mx-auto px-4 md:px-6 text-center">
            <h2 className="text-3xl font-bold mb-6">
              Ready to Experience Our Client Service?
            </h2>
            <p className="text-xl mb-8 max-w-2xl mx-auto">
              Let{"'"}s discuss how our client-focused approach can help your
              business succeed.
            </p>
            <Button className="bg-white text-green-600 hover:bg-gray-100">
              Contact Us Today
            </Button>
          </div>
        </section>
      </main>
    </div>
  )
}
