'use client'

import MarkdownEditor from '@/components/markdown-editor'
import { MarkdownPreviewer } from '@/components/markdown-previewer'
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
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { Textarea } from '@/components/ui/textarea'
import { ArrowLeft, Save } from 'lucide-react'
import { useRouter } from 'next/navigation'
import { useActionState, useCallback, useState } from 'react'
import { Alert, AlertDescription } from '../../../components/ui/alert'
import { addPosition } from '../../../lib/admin'

const initialState = {
  message: '',
  success: false,
}

export default function AddPositionPage() {
  const router = useRouter()

  const [description, setDescription] = useState('')
  const [markdownContent, setMarkdownContent] = useState('')
  const [state, formAction, pending] = useActionState(addPosition, initialState)

  const handleSubmit = useCallback(
    (formData: FormData) => {
      formData.append('description', description)
      formData.append('details', markdownContent)
      formAction(formData)
    },
    [description, markdownContent, formAction],
  )

  return (
    <div className="min-h-screen bg-gray-50 p-4 md:p-8">
      <div className="max-w-4xl mx-auto">
        <div className="mb-6">
          <Button
            variant="ghost"
            className="mb-4"
            onClick={() => router.back()}
          >
            <ArrowLeft className="mr-2 h-4 w-4" /> Back
          </Button>
          <h1 className="text-3xl font-bold text-gray-800">
            Add Open Position
          </h1>
          <p className="text-gray-600 mt-2">
            Create a new job posting for the careers page. Fill in all the
            details below.
          </p>
        </div>

        <form
          action={handleSubmit}
          className="space-y-6"
        >
          <Card>
            <CardHeader>
              <CardTitle>Position Details</CardTitle>
              <CardDescription>
                Enter the information for the new open position. All fields are
                required.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {/* Position Title */}
                <div className="space-y-2">
                  <Label htmlFor="title">Position Title</Label>
                  <Input
                    id="title"
                    name="title"
                    placeholder="e.g. Senior React Developer"
                    required
                  />
                </div>

                {/* Location and Work Type - Side by side on larger screens */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {/* Location */}
                  <div className="space-y-2">
                    <Label htmlFor="location">Location</Label>
                    <Input
                      id="location"
                      name="location"
                      placeholder="e.g. Remote, New York, San Francisco"
                      required
                    />
                  </div>

                  {/* Work Type */}
                  <div className="space-y-2">
                    <Label htmlFor="workType">Work Type</Label>
                    <Select
                      name="worktype"
                      required
                    >
                      <SelectTrigger id="workType">
                        <SelectValue placeholder="Select work type" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="full-time">Full-time</SelectItem>
                        <SelectItem value="part-time">Part-time</SelectItem>
                        <SelectItem value="contract">Contract</SelectItem>
                        <SelectItem value="internship">Internship</SelectItem>
                        <SelectItem value="remote">Remote</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  {/* Department */}
                  <div className="space-y-2">
                    <Label htmlFor="department">Department</Label>
                    <Input
                      id="department"
                      name="department"
                      placeholder="e.g. Engineering"
                      required
                    />
                  </div>

                  {/* Salary */}
                  <div className="space-y-2">
                    <Label htmlFor="salary">Salary</Label>
                    <Input
                      id="salary"
                      name="salary"
                      placeholder="e.g. $10000 - $20000"
                      required
                    />
                  </div>
                </div>

                {/* Brief Description */}
                <div className="space-y-2">
                  <Label htmlFor="description">Brief Description</Label>
                  <Textarea
                    placeholder="A short description that will appear in the job listing card (100-150 characters)"
                    rows={3}
                    required
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                  />
                  <p className="text-sm text-gray-500">
                    {description.length}/150 characters
                  </p>
                </div>

                {/* Full Job Details with Markdown Editor */}
                <div className="space-y-2">
                  <Label htmlFor="fullDetails">Full Job Details</Label>
                  <div className="border rounded-md">
                    <Tabs
                      defaultValue="write"
                      className="w-full"
                    >
                      <TabsList className="grid w-full grid-cols-2">
                        <TabsTrigger value="write">Write</TabsTrigger>
                        <TabsTrigger value="preview">Preview</TabsTrigger>
                      </TabsList>
                      <TabsContent
                        value="write"
                        className="p-0"
                      >
                        <MarkdownEditor
                          value={markdownContent}
                          onChange={setMarkdownContent}
                          placeholder="Write job details in markdown format. You can use headings, lists, bold, italic, etc."
                        />
                      </TabsContent>
                      <TabsContent
                        value="preview"
                        className="p-4 min-h-[300px] bg-white"
                      >
                        <MarkdownPreviewer content={markdownContent} />
                      </TabsContent>
                    </Tabs>
                  </div>
                  <p className="text-sm text-gray-500">
                    Use markdown to format the job details. You can use headings
                    (#), lists (- or 1.), bold (**text**), italic (*text*), and
                    more.
                  </p>
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
                disabled={pending}
              >
                {pending ? (
                  <>Processing...</>
                ) : (
                  <>
                    <Save className="mr-2 h-4 w-4" /> Add Position
                  </>
                )}
              </Button>
            </CardFooter>
          </Card>
        </form>
      </div>
    </div>
  )
}
