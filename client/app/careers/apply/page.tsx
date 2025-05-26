'use client'

import type React from 'react'

import { Alert, AlertDescription } from '@/components/ui/alert'
import { Button } from '@/components/ui/button'
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'
import { ArrowLeft, File, Upload } from 'lucide-react'
import { useRouter, useSearchParams } from 'next/navigation'
import { useActionState, useCallback, useRef, useState } from 'react'
import { jobApplicationForm } from '../../../lib/job'

const initialState = {
  message: '',
  success: false,
}

export default function ApplyPage() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const jobTitle = searchParams.get('name') || 'this position'
  const jobId = searchParams.get('job')

  const [resume, setResume] = useState<File | null>(null)
  const [resumeError, setResumeError] = useState('')
  const fileInputRef = useRef<HTMLInputElement>(null)

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0] || null

    console.log('file', file)

    if (!file) {
      setResume(null)
      return
    }

    // Validate file type
    if (file.type !== 'application/pdf') {
      setResumeError('Please upload a PDF file')
      setResume(null)
      return
    }

    // Validate file size (max 5MB)
    if (file.size > 5 * 1024 * 1024) {
      setResumeError('File size should be less than 5MB')
      setResume(null)
      return
    }

    setResumeError('')
    setResume(file)
  }

  const [state, formAction, pending] = useActionState(
    jobApplicationForm,
    initialState,
  )

  const handleSubmit = useCallback(
    (formData: FormData) => {
      formData.append('job_id', jobId ?? '')
      formAction(formData)
    },
    [jobId, formAction],
  )

  return (
    <div className="min-h-screen flex flex-col">
      <main className="flex-1 bg-gray-50 py-12">
        <div className="container mx-auto px-4 max-w-3xl">
          <Button
            variant="ghost"
            className="mb-6"
            onClick={() => router.back()}
          >
            <ArrowLeft className="mr-2 h-4 w-4" /> Back to Careers
          </Button>

          <h1 className="text-3xl font-bold text-gray-800 mb-2">
            Apply for {jobTitle}
          </h1>
          <p className="text-gray-600 mb-8">
            Please fill out the form below to apply. All fields are required
            unless marked optional.
          </p>

          <form
            action={handleSubmit}
            className="space-y-6"
          >
            <Card>
              <CardHeader>
                <CardTitle>Application Form</CardTitle>
                <CardDescription>
                  Tell us about yourself and why you{"'"}re interested in
                  joining our team.
                </CardDescription>
              </CardHeader>
              <CardContent>
                {/* Personal Information */}
                <div className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="name">Full Name</Label>
                    <Input
                      id="name"
                      name="name"
                      placeholder="John Doe"
                      required
                    />
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="email">Email Address</Label>
                      <Input
                        id="email"
                        name="email"
                        type="email"
                        placeholder="you@example.com"
                        required
                      />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="phone">Phone Number</Label>
                      <Input
                        id="phone"
                        name="phone"
                        type="tel"
                        placeholder="+1 (555) 123-4567"
                        required
                      />
                    </div>
                  </div>

                  {/* Cover Letter */}
                  <div className="space-y-2">
                    <Label htmlFor="cover">Cover Letter</Label>
                    <Textarea
                      id="cover"
                      name="cover"
                      placeholder="Tell us why you're interested in this position and what makes you a great fit..."
                      rows={6}
                      required
                    />
                  </div>

                  {/* Resume Upload */}
                  <div className="space-y-2">
                    <Label htmlFor="resume">Resume/CV (PDF only)</Label>
                    <div
                      className="border-2 border-dashed border-gray-300 rounded-md p-6 text-center hover:bg-gray-50 transition-colors cursor-pointer"
                      onClick={() => fileInputRef.current?.click()}
                    >
                      <input
                        ref={fileInputRef}
                        id="resume"
                        name="resume"
                        type="file"
                        accept=".pdf"
                        onChange={handleFileChange}
                        className="hidden"
                        required
                      />

                      {resume ? (
                        <div className="flex items-center justify-center space-x-2">
                          <File className="h-8 w-8 text-green-600" />
                          <div className="text-left">
                            <p className="text-sm font-medium text-gray-900">
                              {resume.name}
                            </p>
                            <p className="text-xs text-gray-500">
                              {(resume.size / 1024 / 1024).toFixed(2)} MB
                            </p>
                          </div>
                        </div>
                      ) : (
                        <div className="space-y-2">
                          <Upload className="h-10 w-10 text-gray-400 mx-auto" />
                          <div className="text-sm text-gray-600">
                            <span className="font-medium text-green-600">
                              Click to upload
                            </span>{' '}
                            or drag and drop
                          </div>
                          <p className="text-xs text-gray-500">PDF up to 5MB</p>
                        </div>
                      )}
                    </div>

                    {resumeError && (
                      <p className="text-sm text-red-600 mt-1">{resumeError}</p>
                    )}
                  </div>

                  {state?.message && (
                    <Alert variant={state?.success ? 'default' : 'destructive'}>
                      <AlertDescription>{state?.message}</AlertDescription>
                    </Alert>
                  )}
                </div>
              </CardContent>
              <CardFooter className="flex justify-between">
                <Button
                  variant="outline"
                  type="button"
                  onClick={() => router.back()}
                >
                  Cancel
                </Button>
                <Button
                  className="bg-green-600 hover:bg-green-700"
                  disabled={pending || !resume}
                >
                  {pending ? (
                    <div className="flex items-center">
                      <svg
                        className="animate-spin -ml-1 mr-2 h-4 w-4 text-white"
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                      >
                        <circle
                          className="opacity-25"
                          cx="12"
                          cy="12"
                          r="10"
                          stroke="currentColor"
                          strokeWidth="4"
                        ></circle>
                        <path
                          className="opacity-75"
                          fill="currentColor"
                          d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                        ></path>
                      </svg>
                      Submitting...
                    </div>
                  ) : (
                    'Submit Application'
                  )}
                </Button>
              </CardFooter>
            </Card>
          </form>
        </div>
      </main>
    </div>
  )
}
