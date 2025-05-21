"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { ArrowLeft, MapPin, Clock, Building, DollarSign, Calendar, Share2 } from "lucide-react"
import { MarkdownPreviewer } from "@/components/markdown-previewer"
import { jobPositions } from "@/app/careers/[position]/page"

interface JobDetailsClientProps {
  position: string
}

export default function JobDetailsClient({ position }: JobDetailsClientProps) {
  const router = useRouter()
  const [job, setJob] = useState<any>(null)
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState("")

  useEffect(() => {
    // In a real app, this would be an API call
    const fetchJob = () => {
      setIsLoading(true)
      try {
        const jobData = jobPositions[position]

        if (!jobData) {
          setError("Job position not found")
          setIsLoading(false)
          return
        }

        setJob(jobData)
      } catch (err) {
        setError("Failed to load job details")
        console.error(err)
      } finally {
        setIsLoading(false)
      }
    }

    fetchJob()
  }, [position])

  // Format date to readable format
  const formatDate = (dateString: string) => {
    const options: Intl.DateTimeFormatOptions = { year: "numeric", month: "long", day: "numeric" }
    return new Date(dateString).toLocaleDateString("en-US", options)
  }

  if (isLoading) {
    return null // We're using Suspense in the parent component
  }

  if (error || !job) {
    return (
      <div className="text-center">
        <h1 className="text-2xl font-bold text-gray-800 mb-4">Position Not Found</h1>
        <p className="text-gray-600 mb-6">{error || "The job position you're looking for doesn't exist."}</p>
        <Button onClick={() => router.push("/careers")}>
          <ArrowLeft className="mr-2 h-4 w-4" /> Back to Careers
        </Button>
      </div>
    )
  }

  return (
    <>
      <Button variant="ghost" className="mb-6" onClick={() => router.push("/careers")}>
        <ArrowLeft className="mr-2 h-4 w-4" /> Back to Careers
      </Button>

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
            <span>{job.workType}</span>
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
            <span>Posted {formatDate(job.postedDate)}</span>
          </div>
        </div>

        <div className="flex flex-wrap gap-4">
          <Button className="bg-green-600 hover:bg-green-700" asChild>
            <Link href={`/careers/apply?job=${encodeURIComponent(job.title)}`}>Apply Now</Link>
          </Button>
          <Button variant="outline" className="flex items-center">
            <Share2 className="mr-2 h-4 w-4" /> Share
          </Button>
        </div>
      </div>

      {/* Job Description */}
      <Card className="mb-8">
        <div className="p-6">
          <MarkdownPreviewer content={job.description} />
        </div>
      </Card>

      {/* Apply CTA */}
      <div className="bg-green-50 border border-green-100 rounded-lg p-6 mb-8 text-center">
        <h2 className="text-xl font-bold text-gray-800 mb-2">Interested in this position?</h2>
        <p className="text-gray-600 mb-4">We'd love to hear from you! Submit your application and join our team.</p>
        <Button className="bg-green-600 hover:bg-green-700" asChild>
          <Link href={`/careers/apply?job=${encodeURIComponent(job.title)}`}>Apply Now</Link>
        </Button>
      </div>

      {/* Related Positions */}
      {job.relatedPositions && job.relatedPositions.length > 0 && (
        <div className="mb-8">
          <h2 className="text-2xl font-bold text-gray-800 mb-4">Related Positions</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {job.relatedPositions.map((positionId: string) => {
              const relatedJob = jobPositions[positionId]
              if (!relatedJob) return null

              return (
                <Link
                  href={`/careers/${positionId}`}
                  key={positionId}
                  className="block bg-white border border-gray-200 rounded-lg p-4 hover:shadow-md transition-shadow"
                >
                  <h3 className="text-lg font-semibold text-gray-800 mb-1">{relatedJob.title}</h3>
                  <div className="flex items-center text-gray-600 text-sm mb-2">
                    <MapPin className="h-3 w-3 mr-1" />
                    <span>{relatedJob.location}</span>
                    <span className="mx-2">•</span>
                    <Clock className="h-3 w-3 mr-1" />
                    <span>{relatedJob.workType}</span>
                  </div>
                  <p className="text-gray-600 text-sm">View details →</p>
                </Link>
              )
            })}
          </div>
        </div>
      )}
    </>
  )
}
