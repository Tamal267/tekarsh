import { Button } from '@/components/ui/button'
import {
  BarChart,
  Building2,
  CreditCard,
  Database,
  Laptop,
  ShoppingCart,
  Users,
  Utensils,
} from 'lucide-react'
import Image from 'next/image'

export default function DataProcessingPage() {
  return (
    <div className="min-h-screen flex flex-col">
      <main className="flex-1">
        {/* Hero Section */}
        <section className="relative w-full h-[50vh] md:h-[60vh] bg-black">
          <Image
            src="/images/s4img4.svg"
            alt="Data analytics dashboard"
            fill
            className="object-cover opacity-70"
            priority
          />
          <div className="absolute inset-0 flex items-center">
            <div className="container mx-auto px-4 md:px-6">
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white">
                Data Processing
              </h1>
            </div>
          </div>
        </section>

        {/* Let's Win Together */}
        <section className="w-full py-16 md:py-24 bg-white">
          <div className="container mx-auto px-4 md:px-6">
            <div className="text-center mb-16">
              <h2 className="text-3xl font-bold text-gray-800 mb-6">
                Let{"'"}s Win Together
              </h2>
              <p className="text-lg text-gray-600 max-w-3xl mx-auto">
                Our data analyst team is highly trained to ensure our clients{"'"}
                data is processed efficiently. Below are a handful of the
                services we excel at providing:
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {/* B2B Invoice Processing */}
              <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-100 h-full">
                <div className="w-12 h-12 rounded-full bg-green-100 flex items-center justify-center mb-6">
                  <BarChart className="h-6 w-6 text-green-600" />
                </div>
                <h3 className="text-xl font-semibold text-gray-800 mb-3">
                  B2B Invoice Processing
                </h3>
                <p className="text-gray-600">
                  Efficient, error-free invoicing for our U.S.-based business
                  clients.
                </p>
              </div>

              {/* Food Industry Backend Support */}
              <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-100 h-full">
                <div className="w-12 h-12 rounded-full bg-green-100 flex items-center justify-center mb-6">
                  <Utensils className="h-6 w-6 text-green-600" />
                </div>
                <h3 className="text-xl font-semibold text-gray-800 mb-3">
                  Food Industry Backend Support
                </h3>
                <p className="text-gray-600">
                  Menu building, account onboarding, and management for seamless
                  service.
                </p>
              </div>

              {/* Data Annotation & Labelling */}
              <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-100 h-full">
                <div className="w-12 h-12 rounded-full bg-green-100 flex items-center justify-center mb-6">
                  <Database className="h-6 w-6 text-green-600" />
                </div>
                <h3 className="text-xl font-semibold text-gray-800 mb-3">
                  Data Annotation & Labelling
                </h3>
                <p className="text-gray-600">
                  Enabling AI/ML with accurate tagging and transcription.
                </p>
              </div>

              {/* B2B Lead Generation */}
              <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-100 h-full">
                <div className="w-12 h-12 rounded-full bg-green-100 flex items-center justify-center mb-6">
                  <Users className="h-6 w-6 text-green-600" />
                </div>
                <h3 className="text-xl font-semibold text-gray-800 mb-3">
                  B2B Lead Generation
                </h3>
                <p className="text-gray-600">
                  Strategic prospecting to fuel your sales pipeline.
                </p>
              </div>

              {/* E-commerce & Retail */}
              <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-100 h-full">
                <div className="w-12 h-12 rounded-full bg-green-100 flex items-center justify-center mb-6">
                  <ShoppingCart className="h-6 w-6 text-green-600" />
                </div>
                <h3 className="text-xl font-semibold text-gray-800 mb-3">
                  E-commerce & Retail
                </h3>
                <p className="text-gray-600">
                  Supporting retail ops with inventory, pricing, and data
                  handling.
                </p>
              </div>

              {/* Hospitality, Healthcare & Travel */}
              <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-100 h-full">
                <div className="w-12 h-12 rounded-full bg-green-100 flex items-center justify-center mb-6">
                  <Building2 className="h-6 w-6 text-green-600" />
                </div>
                <h3 className="text-xl font-semibold text-gray-800 mb-3">
                  Hospitality, Healthcare & Travel
                </h3>
                <p className="text-gray-600">
                  Back-office support to ensure seamless customer experience.
                </p>
              </div>

              {/* Fintech Support */}
              <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-100 h-full">
                <div className="w-12 h-12 rounded-full bg-green-100 flex items-center justify-center mb-6">
                  <CreditCard className="h-6 w-6 text-green-600" />
                </div>
                <h3 className="text-xl font-semibold text-gray-800 mb-3">
                  Fintech Support
                </h3>
                <p className="text-gray-600">
                  Secure and scalable support tailored for modern financial
                  services.
                </p>
              </div>

              {/* Tech, Digital & Social */}
              <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-100 h-full">
                <div className="w-12 h-12 rounded-full bg-green-100 flex items-center justify-center mb-6">
                  <Laptop className="h-6 w-6 text-green-600" />
                </div>
                <h3 className="text-xl font-semibold text-gray-800 mb-3">
                  Tech, Digital & Social
                </h3>
                <p className="text-gray-600">
                  Managing data for platforms, campaigns, and product growth.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Better Customer Experience */}
        <section className="w-full py-16 md:py-24 bg-gray-50">
          <div className="container mx-auto px-4 md:px-6">
            <div className="text-center">
              <h2 className="text-3xl font-bold text-gray-800 mb-6">
                We are offering you a better customer experience —
                <br />
                at a lower cost!
              </h2>
              <Button className="mt-8 bg-green-600 hover:bg-green-700">
                Get Started Today
              </Button>
            </div>
          </div>
        </section>

        {/* Why Choose Our Data Processing Services */}
        <section className="w-full py-16 md:py-24 bg-white">
          <div className="container mx-auto px-4 md:px-6">
            <div className="text-center mb-16">
              <h2 className="text-3xl font-bold text-gray-800 mb-6">
                Why Choose Our Data Processing Services
              </h2>
              <p className="text-lg text-gray-600 max-w-3xl mx-auto">
                We combine technical expertise with industry knowledge to
                deliver exceptional data processing solutions.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-100">
                <h3 className="text-xl font-semibold text-gray-800 mb-4">
                  Accuracy & Precision
                </h3>
                <p className="text-gray-600">
                  Our rigorous quality control processes ensure data is
                  processed with the highest level of accuracy, minimizing
                  errors and inconsistencies.
                </p>
              </div>

              <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-100">
                <h3 className="text-xl font-semibold text-gray-800 mb-4">
                  Scalable Solutions
                </h3>
                <p className="text-gray-600">
                  Whether you need to process thousands or millions of data
                  points, our infrastructure scales to meet your requirements
                  without compromising on quality.
                </p>
              </div>

              <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-100">
                <h3 className="text-xl font-semibold text-gray-800 mb-4">
                  Fast Turnaround
                </h3>
                <p className="text-gray-600">
                  We understand the importance of timely data processing. Our
                  efficient workflows ensure quick turnaround times to meet your
                  business needs.
                </p>
              </div>

              <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-100">
                <h3 className="text-xl font-semibold text-gray-800 mb-4">
                  Data Security
                </h3>
                <p className="text-gray-600">
                  We implement robust security measures to protect your
                  sensitive data, ensuring compliance with industry standards
                  and regulations.
                </p>
              </div>

              <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-100">
                <h3 className="text-xl font-semibold text-gray-800 mb-4">
                  Advanced Technology
                </h3>
                <p className="text-gray-600">
                  We leverage cutting-edge tools and technologies to automate
                  and optimize data processing tasks, improving efficiency and
                  reducing costs.
                </p>
              </div>

              <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-100">
                <h3 className="text-xl font-semibold text-gray-800 mb-4">
                  Dedicated Support
                </h3>
                <p className="text-gray-600">
                  Our team of data specialists provides ongoing support and
                  guidance, ensuring your data processing needs are met with
                  excellence.
                </p>
              </div>
            </div>
          </div>
        </section>
      </main>
    </div>
  )
}
