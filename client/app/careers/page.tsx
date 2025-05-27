import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import {
  Clock,
  DollarSign,
  GraduationCap,
  Laptop,
  MapPin,
  Plane,
  Trophy,
  Users,
} from 'lucide-react'
import Image from 'next/image'
import Link from 'next/link'
import { getAllJobs } from '../../lib/job'

export default async function CareersPage() {
  const openPositions = await getAllJobs()
  return (
    <div className="min-h-screen flex flex-col">
      <main className="flex-1">
        {/* Hero Section */}
        <section className="relative w-full h-[50vh] md:h-[60vh] bg-black">
          <Image
            src="/images/c1img1.svg"
            alt="Team members high-fiving"
            fill
            className="object-cover opacity-70"
            priority
          />
          <div className="absolute inset-0 flex items-center">
            <div className="container mx-auto px-4 md:px-6">
              <div className="max-w-2xl">
                <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-4">
                  Build Your Future with Tekarsh
                </h1>
                <p className="text-xl text-white">
                  We{"'"}re not just building software — we{"'"}re building a
                  team of thinkers, creators, and problem solvers.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Open Positions */}
        <section className="w-full py-16 md:py-24 bg-white">
          <div className="container mx-auto px-4 md:px-6">
            <h2 className="text-3xl font-bold text-gray-800 text-center mb-12">
              Open Positions
            </h2>

            <div className="flex flex-col md:flex-row gap-4 mb-8">
              <div className="flex-1 relative">
                <Input
                  type="text"
                  placeholder="Search positions..."
                  className="pl-10 w-full"
                />
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-5 w-5 absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                  />
                </svg>
              </div>
              <div className="flex gap-4">
                <Select>
                  <SelectTrigger className="w-[180px]">
                    <SelectValue placeholder="All Departments" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Departments</SelectItem>
                    <SelectItem value="engineering">Engineering</SelectItem>
                    <SelectItem value="design">Design</SelectItem>
                    <SelectItem value="marketing">Marketing</SelectItem>
                    <SelectItem value="product">Product</SelectItem>
                  </SelectContent>
                </Select>
                <Select>
                  <SelectTrigger className="w-[180px]">
                    <SelectValue placeholder="All Locations" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Locations</SelectItem>
                    <SelectItem value="remote">Remote</SelectItem>
                    <SelectItem value="newyork">New York</SelectItem>
                    <SelectItem value="sanfrancisco">San Francisco</SelectItem>
                    <SelectItem value="london">London</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {(() => {
                return openPositions.map((job) => (
                  <div
                    key={job.id}
                    className="border border-gray-200 rounded-lg p-6"
                  >
                    <h3 className="text-xl font-bold text-gray-800 mb-2">
                      {job.title}
                    </h3>
                    <div className="flex items-center text-gray-500 mb-1">
                      <MapPin className="h-4 w-4 mr-1" />
                      <span className="text-sm">{job.location}</span>
                      <span className="mx-2">•</span>
                      <Clock className="h-4 w-4 mr-1" />
                      <span className="text-sm">{job.worktype}</span>
                    </div>
                    <p className="text-gray-600 my-4">{job.description}</p>
                    <div className="flex gap-3 mt-6">
                      <Link href={`/careers/${job.id}`}>
                        <Button variant="outline">View Details</Button>
                      </Link>
                      <Link
                        href={`/careers/apply?job=${encodeURIComponent(
                          job.id,
                        )}&name=${job.title}`}
                      >
                        <Button className="bg-green-600 hover:bg-green-700">
                          Apply Now
                        </Button>
                      </Link>
                    </div>
                  </div>
                ))
              })()}
            </div>
          </div>
        </section>

        {/* Your Journey to Tekarsh */}
        <section className="w-full py-16 md:py-24 bg-gray-50">
          <div className="container mx-auto px-4 md:px-6">
            <h2 className="text-3xl font-bold text-gray-800 text-center mb-16">
              Your Journey to Tekarsh
            </h2>

            <div className="flex flex-col md:flex-row justify-between items-start md:items-center">
              <div className="flex flex-col items-center text-center mb-8 md:mb-0">
                <div className="w-12 h-12 rounded-full bg-green-600 text-white flex items-center justify-center font-bold text-lg mb-4">
                  1
                </div>
                <h3 className="text-lg font-semibold text-gray-800 mb-2">
                  Apply Online
                </h3>
                <p className="text-gray-600 text-sm max-w-[150px]">
                  Submit your resume and portfolio
                </p>
              </div>

              <div className="hidden md:block w-16 h-0.5 bg-gray-300"></div>

              <div className="flex flex-col items-center text-center mb-8 md:mb-0">
                <div className="w-12 h-12 rounded-full bg-green-600 text-white flex items-center justify-center font-bold text-lg mb-4">
                  2
                </div>
                <h3 className="text-lg font-semibold text-gray-800 mb-2">
                  Initial Screening
                </h3>
                <p className="text-gray-600 text-sm max-w-[150px]">
                  Our team reviews your application
                </p>
              </div>

              <div className="hidden md:block w-16 h-0.5 bg-gray-300"></div>

              <div className="flex flex-col items-center text-center mb-8 md:mb-0">
                <div className="w-12 h-12 rounded-full bg-green-600 text-white flex items-center justify-center font-bold text-lg mb-4">
                  3
                </div>
                <h3 className="text-lg font-semibold text-gray-800 mb-2">
                  Technical Round
                </h3>
                <p className="text-gray-600 text-sm max-w-[150px]">
                  Skill or coding interview
                </p>
              </div>

              <div className="hidden md:block w-16 h-0.5 bg-gray-300"></div>

              <div className="flex flex-col items-center text-center mb-8 md:mb-0">
                <div className="w-12 h-12 rounded-full bg-green-600 text-white flex items-center justify-center font-bold text-lg mb-4">
                  4
                </div>
                <h3 className="text-lg font-semibold text-gray-800 mb-2">
                  Culture Fit
                </h3>
                <p className="text-gray-600 text-sm max-w-[150px]">
                  Meet our team
                </p>
              </div>

              <div className="hidden md:block w-16 h-0.5 bg-gray-300"></div>

              <div className="flex flex-col items-center text-center">
                <div className="w-12 h-12 rounded-full bg-green-600 text-white flex items-center justify-center font-bold text-lg mb-4">
                  5
                </div>
                <h3 className="text-lg font-semibold text-gray-800 mb-2">
                  Final Offer
                </h3>
                <p className="text-gray-600 text-sm max-w-[150px]">
                  Welcome aboard!
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Why Tekarsh? */}
        <section className="w-full py-16 md:py-24 bg-white">
          <div className="container mx-auto px-4 md:px-6">
            <h2 className="text-3xl font-bold text-gray-800 text-center mb-16">
              Why Tekarsh?
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div className="flex gap-6">
                <div className="w-32 h-24 relative rounded-lg overflow-hidden flex-shrink-0">
                  <Image
                    src="/images/c1img2.svg"
                    alt="Flexible work environment"
                    fill
                    className="object-cover"
                  />
                </div>
                <div>
                  <h3 className="text-xl font-semibold text-gray-800 mb-2">
                    Flexible & Remote-Friendly Work
                  </h3>
                  <p className="text-gray-600">
                    Work from anywhere in the world with our distributed-first
                    approach.
                  </p>
                </div>
              </div>

              <div className="flex gap-6">
                <div className="w-32 h-24 relative rounded-lg overflow-hidden flex-shrink-0">
                  <Image
                    src="/images/c1img3.svg"
                    alt="Diverse team members"
                    fill
                    className="object-cover"
                  />
                </div>
                <div>
                  <h3 className="text-xl font-semibold text-gray-800 mb-2">
                    Supportive & Diverse Team
                  </h3>
                  <p className="text-gray-600">
                    Join a global team that celebrates diversity and inclusion.
                  </p>
                </div>
              </div>

              <div className="flex gap-6">
                <div className="w-32 h-24 relative rounded-lg overflow-hidden flex-shrink-0">
                  <Image
                    src="/images/c1img4.svg"
                    alt="Learning and development"
                    fill
                    className="object-cover"
                  />
                </div>
                <div>
                  <h3 className="text-xl font-semibold text-gray-800 mb-2">
                    Continuous Learning
                  </h3>
                  <p className="text-gray-600">
                    Access learning resources and grow your skills with our
                    mentorship program.
                  </p>
                </div>
              </div>

              <div className="flex gap-6">
                <div className="w-32 h-24 relative rounded-lg overflow-hidden flex-shrink-0">
                  <Image
                    src="/images/c1img5.svg"
                    alt="Impactful projects"
                    fill
                    className="object-cover"
                  />
                </div>
                <div>
                  <h3 className="text-xl font-semibold text-gray-800 mb-2">
                    Impact-Driven Projects
                  </h3>
                  <p className="text-gray-600">
                    Work on meaningful projects that make a difference in people
                    {"'"}s lives.
                  </p>
                </div>
              </div>
            </div>

            {/* Testimonials */}
            <div className="mt-16 grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="text-center">
                <div className="w-20 h-20 mx-auto rounded-full overflow-hidden relative mb-4">
                  <Image
                    src="/images/c1img6.svg"
                    alt="Sarah Chen"
                    fill
                    className="object-cover"
                  />
                </div>
                <p className="text-gray-600 italic mb-4">
                  {'"'}Tekarsh has given me the opportunity to grow both
                  professionally and personally.{'"'}
                </p>
                <p className="font-semibold text-gray-800">Sarah Chen</p>
                <p className="text-sm text-gray-500">Senior Developer</p>
              </div>

              <div className="text-center">
                <div className="w-20 h-20 mx-auto rounded-full overflow-hidden relative mb-4">
                  <Image
                    src="/images/c1img7.svg"
                    alt="David Kim"
                    fill
                    className="object-cover"
                  />
                </div>
                <p className="text-gray-600 italic mb-4">
                  {'"'}The culture here is amazing. Everyone is supportive and
                  passionate about their work.{'"'}
                </p>
                <p className="font-semibold text-gray-800 ">David Kim</p>
                <p className="text-sm text-gray-500">Product Designer</p>
              </div>

              <div className="text-center">
                <div className="w-20 h-20 mx-auto rounded-full overflow-hidden relative mb-4">
                  <Image
                    src="/images/c1img8.svg"
                    alt="Emma Watson"
                    fill
                    className="object-cover"
                  />
                </div>
                <p className="text-gray-600 italic mb-4">
                  {'"'}I love the flexibility and trust that Tekarsh places in
                  its employees.{'"'}
                </p>
                <p className="font-semibold text-gray-800">Emma Watson</p>
                <p className="text-sm text-gray-500">Project Manager</p>
              </div>
            </div>
          </div>
        </section>

        {/* Perks & Benefits */}
        <section className="w-full py-16 md:py-24 bg-gray-50">
          <div className="container mx-auto px-4 md:px-6">
            <h2 className="text-3xl font-bold text-gray-800 text-center mb-16">
              Perks & Benefits
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="text-center">
                <div className="w-16 h-16 mx-auto rounded-full bg-green-100 flex items-center justify-center mb-4">
                  <DollarSign className="h-8 w-8 text-green-600" />
                </div>
                <h3 className="text-xl font-semibold text-gray-800 mb-2">
                  Competitive Salary
                </h3>
                <p className="text-gray-600">
                  Industry-leading compensation packages
                </p>
              </div>

              <div className="text-center">
                <div className="w-16 h-16 mx-auto rounded-full bg-green-100 flex items-center justify-center mb-4">
                  <GraduationCap className="h-8 w-8 text-green-600" />
                </div>
                <h3 className="text-xl font-semibold text-gray-800 mb-2">
                  Learning Stipends
                </h3>
                <p className="text-gray-600">
                  Annual budget for courses and conferences
                </p>
              </div>

              <div className="text-center">
                <div className="w-16 h-16 mx-auto rounded-full bg-green-100 flex items-center justify-center mb-4">
                  <Plane className="h-8 w-8 text-green-600" />
                </div>
                <h3 className="text-xl font-semibold text-gray-800 mb-2">
                  Paid Time Off
                </h3>
                <p className="text-gray-600">Flexible vacation policy</p>
              </div>

              <div className="text-center">
                <div className="w-16 h-16 mx-auto rounded-full bg-green-100 flex items-center justify-center mb-4">
                  <Laptop className="h-8 w-8 text-green-600" />
                </div>
                <h3 className="text-xl font-semibold text-gray-800 mb-2">
                  Remote Work Support
                </h3>
                <p className="text-gray-600">Home office setup allowance</p>
              </div>

              <div className="text-center">
                <div className="w-16 h-16 mx-auto rounded-full bg-green-100 flex items-center justify-center mb-4">
                  <Trophy className="h-8 w-8 text-green-600" />
                </div>
                <h3 className="text-xl font-semibold text-gray-800 mb-2">
                  Performance Bonuses
                </h3>
                <p className="text-gray-600">Quarterly and annual rewards</p>
              </div>

              <div className="text-center">
                <div className="w-16 h-16 mx-auto rounded-full bg-green-100 flex items-center justify-center mb-4">
                  <Users className="h-8 w-8 text-green-600" />
                </div>
                <h3 className="text-xl font-semibold text-gray-800 mb-2">
                  Mentorship Program
                </h3>
                <p className="text-gray-600">1-on-1 guidance from seniors</p>
              </div>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="w-full py-16 md:py-24 bg-green-600 text-white">
          <div className="container mx-auto px-4 md:px-6 text-center">
            <h2 className="text-3xl font-bold mb-6">Ready to Join Our Team?</h2>
            <p className="text-xl mb-8 max-w-2xl mx-auto">
              Explore our open positions and take the first step towards
              building your future with Tekarsh.
            </p>
            <Button className="bg-white text-green-600 hover:bg-gray-100">
              View All Positions
            </Button>
          </div>
        </section>
      </main>
    </div>
  )
}
