'use client'

import { MarkdownPreviewer } from '@/components/markdown-previewer'
import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'
import {
  ArrowLeft,
  Building,
  Calendar,
  Clock,
  DollarSign,
  MapPin,
  Share2,
} from 'lucide-react'
import Link from 'next/link'

export default function JobDetailsClient({ job }) {
  console.log('Job Details:', job)
  const error = !job ? 'Job not found' : null
  // Format date to readable format
  const formatDate = (dateString: string) => {
    const options: Intl.DateTimeFormatOptions = {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    }
    return new Date(dateString).toLocaleDateString('en-US', options)
  }

  if (error || !job) {
    return (
      <div className="text-center">
        <h1 className="text-2xl font-bold text-gray-800 mb-4">
          Position Not Found
        </h1>
        <p className="text-gray-600 mb-6">
          {error || "The job position you're looking for doesn't exist."}
        </p>
        <Link href="/careers">
          <Button>
            <ArrowLeft className="mr-2 h-4 w-4" /> Back to Careers
          </Button>
        </Link>
      </div>
    )
  }

  return (
    <>
      <Link href="/careers">
        <Button
          variant="ghost"
          className="mb-6"
        >
          <ArrowLeft className="mr-2 h-4 w-4" /> Back to Careers
        </Button>
      </Link>

      {/* Job Header */}
      <div className="bg-white rounded-lg shadow-sm p-6 mb-8">
        <h1 className="text-3xl font-bold text-gray-800 mb-4">{job.title}</h1>

        <div className="flex flex-wrap gap-4 mb-6">
          <div className="flex items-center text-gray-600">
            <MapPin className="h-4 w-4 mr-1" />
            <span>{job.location}</span>
          </div>
          <div className="flex items-center text-gray-600">
            <Clock className="h-4 w-4 mr-1" />
            <span>{job.worktype}</span>
          </div>
          <div className="flex items-center text-gray-600">
            <Building className="h-4 w-4 mr-1" />
            <span>{job.department}</span>
          </div>
          <div className="flex items-center text-gray-600">
            <DollarSign className="h-4 w-4 mr-1" />
            <span>{job.salary}</span>
          </div>
          <div className="flex items-center text-gray-600">
            <Calendar className="h-4 w-4 mr-1" />
            <span>Posted {formatDate(job.created_at)}</span>
          </div>
        </div>

        <div className="flex flex-wrap gap-4">
          <Button
            className="bg-green-600 hover:bg-green-700"
            asChild
          >
            <Link
              href={`/careers/apply?job=${encodeURIComponent(job.id)}&name=${
                job.title
              }`}
            >
              Apply Now
            </Link>
          </Button>
          <Button
            variant="outline"
            className="flex items-center"
          >
            <Share2 className="mr-2 h-4 w-4" /> Share
          </Button>
        </div>
      </div>

      {/* Job Description */}
      <Card className="mb-8">
        <div className="p-6">
          <MarkdownPreviewer content={job.details} />
        </div>
      </Card>

      {/* Apply CTA */}
      <div className="bg-green-50 border border-green-100 rounded-lg p-6 mb-8 text-center">
        <h2 className="text-xl font-bold text-gray-800 mb-2">
          Interested in this position?
        </h2>
        <p className="text-gray-600 mb-4">
          We{"'"}d love to hear from you! Submit your application and join our
          team.
        </p>
        <Button
          className="bg-green-600 hover:bg-green-700"
          asChild
        >
          <Link
            href={`/careers/apply?job=${encodeURIComponent(job.id)}&name=${
              job.title
            }`}
          >
            Apply Now
          </Link>
        </Button>
      </div>
    </>
  )
}
