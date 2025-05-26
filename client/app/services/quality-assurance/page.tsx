import { BarChart, Code, Lock, Settings, Shield, Users } from 'lucide-react'
import Image from 'next/image'
import { getBlur } from '../../../lib/utils'

export default function QualityAssurancePage() {
  return (
    <div className="min-h-screen flex flex-col">
      <main className="flex-1">
        {/* Hero Section */}
        <section className="relative w-full h-[40vh] md:h-[50vh] bg-black">
          <Image
            src="/images/s2h0.svg"
            alt="Circuit board close-up"
            fill
            className="object-cover opacity-50"
            priority
          />
          <div className="absolute inset-0 flex items-center">
            <div className="container mx-auto px-4 md:px-6">
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white">
                Quality Assurance
              </h1>
            </div>
          </div>
        </section>

        {/* Requirement Gathering */}
        <section className="w-full py-16 md:py-24 bg-white">
          <div className="container mx-auto px-4 md:px-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
              <div className="relative h-[300px] md:h-[400px] rounded-lg overflow-hidden">
                <Image
                  src="/images/s1img5.svg"
                  alt="Team collaborating on requirements gathering"
                  fill
                  className="object-cover"
                  placeholder="blur"
                  blurDataURL={getBlur()}
                />
              </div>
              <div>
                <div className="h-1 w-16 bg-green-600 mb-6"></div>
                <h2 className="text-3xl font-bold text-gray-800 mb-6">
                  Requirement Gathering
                </h2>
                <p className="text-gray-600 mb-4">
                  Our QA-engineer will determine your project goals and develop
                  an attack plan. By working with you from day one, they{"'"}ll
                  acutely understand the rationale behind your design.
                </p>
                <p className="text-gray-600">
                  Bringing in our QA-engineer day one allows us to start writing
                  test plans and test cases immediately, which allots time on
                  the backend of the project for unforeseeable changes...
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Strategy Development and Planning */}
        <section className="w-full py-16 md:py-24 bg-gray-50">
          <div className="container mx-auto px-4 md:px-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
              <div className="order-2 lg:order-1">
                <div className="h-1 w-16 bg-green-600 mb-6"></div>
                <h2 className="text-3xl font-bold text-gray-800 mb-6">
                  Strategy Development and Planning
                </h2>
                <p className="text-gray-600 mb-4">
                  Delivery of a cost-effective solution is crucial for any
                  project. After our dedicated QA-engineer determines your
                  project{"'"}s detailed requirements, goals are set, and a test
                  plan is created along with mitigating risk factors.
                </p>
                <p className="text-gray-600">
                  Our predilection for planning and prep allows us to gain trust
                  among stakeholders and clients. We{"'"}ll earn your trust.
                </p>
              </div>
              <div className="relative h-[300px] md:h-[400px] rounded-lg overflow-hidden order-1 lg:order-2">
                <Image
                  src="/images/s2h2.svg"
                  alt="Sticky notes on a planning board"
                  fill
                  className="object-cover"
                  placeholder="blur"
                  blurDataURL={getBlur()}
                />
              </div>
            </div>
          </div>
        </section>

        {/* Automated and Manual Functional Testing */}
        <section className="w-full py-16 md:py-24 bg-white">
          <div className="container mx-auto px-4 md:px-6">
            <div className="text-center mb-16">
              <div className="h-1 w-16 bg-green-600 mx-auto mb-6"></div>
              <h2 className="text-3xl font-bold text-gray-800">
                Automated and Manual Functional Testing
              </h2>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {/* Automated Testing */}
              <div className="bg-white p-6 rounded-lg shadow-sm text-center">
                <div className="flex items-center justify-center w-16 h-16 mx-auto rounded-full bg-green-100 mb-6">
                  <Settings className="h-8 w-8 text-green-600" />
                </div>
                <h3 className="text-xl font-semibold text-gray-800 mb-4">
                  Automated Testing
                </h3>
                <p className="text-gray-600">
                  Continuous regression tests ensure consistent ROI and maintain
                  product stability across releases.
                </p>
              </div>

              {/* Manual Testing */}
              <div className="bg-white p-6 rounded-lg shadow-sm text-center">
                <div className="flex items-center justify-center w-16 h-16 mx-auto rounded-full bg-green-100 mb-6">
                  <Users className="h-8 w-8 text-green-600" />
                </div>
                <h3 className="text-xl font-semibold text-gray-800 mb-4">
                  Manual Testing
                </h3>
                <p className="text-gray-600">
                  Expert QA engineers perform thorough testing to ensure optimal
                  user experience and functionality.
                </p>
              </div>

              {/* Results Analysis */}
              <div className="bg-white p-6 rounded-lg shadow-sm text-center">
                <div className="flex items-center justify-center w-16 h-16 mx-auto rounded-full bg-green-100 mb-6">
                  <BarChart className="h-8 w-8 text-green-600" />
                </div>
                <h3 className="text-xl font-semibold text-gray-800 mb-4">
                  Results Analysis
                </h3>
                <p className="text-gray-600">
                  Comprehensive reporting and analytics to track progress and
                  identify improvement areas.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Security Testing */}
        <section className="w-full py-16 md:py-24 bg-gray-900 text-white">
          <div className="container mx-auto px-4 md:px-6">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              <div className="lg:col-span-1">
                <div className="grid grid-cols-2 gap-4">
                  <div className="bg-gray-800 p-6 rounded-lg flex items-center justify-center">
                    <Shield className="h-12 w-12 text-green-500" />
                  </div>
                  <div className="bg-gray-800 p-6 rounded-lg flex items-center justify-center">
                    <Lock className="h-12 w-12 text-green-500" />
                  </div>
                  <div className="bg-gray-800 p-6 rounded-lg flex items-center justify-center">
                    <Code className="h-12 w-12 text-green-500" />
                  </div>
                  <div className="bg-gray-800 p-6 rounded-lg flex items-center justify-center">
                    <Shield className="h-12 w-12 text-green-500" />
                  </div>
                </div>
              </div>
              <div className="lg:col-span-2">
                <div className="h-1 w-16 bg-green-600 mb-6"></div>
                <h2 className="text-3xl font-bold mb-6">Security Testing</h2>
                <p className="text-gray-300 mb-4">
                  Security is our top priority. From the earliest design stages
                  to final deployment, Tekarsh embeds security at every layer of
                  QA.
                </p>
                <p className="text-gray-300">
                  We safeguard your product from vulnerabilities and ensure
                  compliance from the ground up.
                </p>
              </div>
            </div>
          </div>
        </section>
      </main>
    </div>
  )
}
