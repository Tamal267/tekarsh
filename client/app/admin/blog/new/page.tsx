'use client'

import type React from 'react'

import MarkdownEditor from '@/components/markdown-editor'
import { MarkdownPreviewer } from '@/components/markdown-previewer'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import {
  Card,
  CardContent,
  CardDescription,
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
import { ArrowLeft, Upload, X } from 'lucide-react'
import Image from 'next/image'
import { useRouter } from 'next/navigation'
import { useActionState, useCallback, useState } from 'react'
import { Alert, AlertDescription } from '../../../../components/ui/alert'
import { addBlog } from '../../../../lib/admin'

const initialState = {
  message: '',
  success: false,
}

export default function NewBlogPage() {
  const router = useRouter()
  const [excerpt, setExcerpt] = useState('')
  const [markdownContent, setMarkdownContent] = useState('')
  const [thumbnail, setThumbnail] = useState<File | null>(null)
  const [thumbnailPreview, setThumbnailPreview] = useState<string>('')
  const [tags, setTags] = useState<string[]>([])
  const [currentTag, setCurrentTag] = useState('')

  const [state, formAction, pending] = useActionState(addBlog, initialState)

  const handleSubmit = useCallback(
    (formData: FormData) => {
      formData.append('content', markdownContent)
      formData.append('tags', JSON.stringify(tags))
      formData.append('thumbnail', thumbnail || '')
      formAction(formData)
    },
    [markdownContent, tags, thumbnail, formAction],
  )

  const handleThumbnailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0] || null

    if (!file) {
      setThumbnail(null)
      setThumbnailPreview('')
      return
    }

    // Validate file type
    if (!file.type.startsWith('image/')) {
      alert('Please upload an image file')
      return
    }

    // Validate file size (max 5MB)
    if (file.size > 5 * 1024 * 1024) {
      alert('File size should be less than 5MB')
      return
    }

    setThumbnail(file)

    // Create preview URL
    const reader = new FileReader()
    reader.onload = (e) => {
      setThumbnailPreview(e.target?.result as string)
    }
    reader.readAsDataURL(file)
  }

  const removeThumbnail = () => {
    setThumbnail(null)
    setThumbnailPreview('')
  }

  const addTag = () => {
    if (currentTag.trim() && !tags.includes(currentTag.trim())) {
      setTags([...tags, currentTag.trim()])
      setCurrentTag('')
    }
  }

  const removeTag = (tagToRemove: string) => {
    setTags(tags.filter((tag) => tag !== tagToRemove))
  }

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      e.preventDefault()
      addTag()
    }
  }

  return (
    <div className="min-h-screen bg-gray-50 p-4 md:p-8">
      <div className="max-w-6xl mx-auto">
        <div className="mb-6">
          <Button
            variant="ghost"
            className="mb-4"
            onClick={() => router.back()}
          >
            <ArrowLeft className="mr-2 h-4 w-4" /> Back to Blog Management
          </Button>
          <h1 className="text-3xl font-bold text-gray-800">
            Write New Blog Post
          </h1>
          <p className="text-gray-600 mt-2">
            Create and publish a new blog post for the website.
          </p>
        </div>
        <form action={handleSubmit}>
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Main Content - Left Column */}
            <div className="lg:col-span-2">
              <Card>
                <CardHeader>
                  <CardTitle>Blog Content</CardTitle>
                  <CardDescription>
                    Enter the main content and details for your blog post.
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  {/* Blog Title */}
                  <div className="space-y-2">
                    <Label htmlFor="title">Blog Title</Label>
                    <Input
                      id="title"
                      name="title"
                      placeholder="Enter an engaging blog title..."
                      required
                    />
                  </div>

                  {/* Excerpt */}
                  <div className="space-y-2">
                    <Label htmlFor="excerpt">Excerpt</Label>
                    <textarea
                      id="excerpt"
                      name="excerpt"
                      placeholder="Write a brief excerpt that will appear in blog previews..."
                      rows={3}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent"
                      value={excerpt}
                      onChange={(e) => setExcerpt(e.target.value)}
                      required
                    />
                    <p className="text-sm text-gray-500">
                      {excerpt.length}/200 characters
                    </p>
                  </div>

                  {/* Blog Content with Markdown Editor */}
                  <div className="space-y-2">
                    <Label htmlFor="content">Blog Content</Label>
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
                            placeholder="Write your blog content in markdown format. You can use headings, lists, bold, italic, links, images, and more..."
                          />
                        </TabsContent>
                        <TabsContent
                          value="preview"
                          className="p-4 min-h-[400px] bg-white"
                        >
                          <MarkdownPreviewer content={markdownContent} />
                        </TabsContent>
                      </Tabs>
                    </div>
                    <p className="text-sm text-gray-500">
                      Use markdown to format your blog content. You can use
                      headings (#), lists (- or 1.), bold (**text**), italic
                      (*text*), links, images, and more.
                    </p>
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Sidebar - Right Column */}
            <div className="space-y-6">
              {/* Thumbnail Upload */}
              <Card>
                <CardHeader>
                  <CardTitle>Featured Image</CardTitle>
                  <CardDescription>
                    Upload a thumbnail image for your blog post
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  {!thumbnailPreview ? (
                    <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center hover:bg-gray-50 transition-colors">
                      <input
                        type="file"
                        accept="image/*"
                        onChange={handleThumbnailChange}
                        className="hidden"
                        id="thumbnail-upload"
                      />
                      <label
                        htmlFor="thumbnail-upload"
                        className="cursor-pointer"
                      >
                        <Upload className="h-10 w-10 text-gray-400 mx-auto mb-2" />
                        <p className="text-sm text-gray-600 mb-1">
                          <span className="font-medium text-green-600">
                            Click to upload
                          </span>{' '}
                          or drag and drop
                        </p>
                        <p className="text-xs text-gray-500">
                          PNG, JPG, GIF up to 5MB
                        </p>
                      </label>
                    </div>
                  ) : (
                    <div className="relative">
                      <Image
                        src={thumbnailPreview || '/placeholder.svg'}
                        alt="Preview"
                        width={640}
                        height={128}
                        className="w-full h-32 object-cover rounded mb-3"
                      />
                      <button
                        type="button"
                        onClick={removeThumbnail}
                        className="absolute top-2 right-2 bg-red-500 text-white rounded-full p-1 hover:bg-red-600"
                      >
                        <X className="h-4 w-4" />
                      </button>
                      <div className="mt-2 text-sm text-gray-600">
                        <p className="font-medium">{thumbnail?.name}</p>
                        <p>
                          {thumbnail &&
                            (thumbnail.size / 1024 / 1024).toFixed(2)}{' '}
                          MB
                        </p>
                      </div>
                    </div>
                  )}
                </CardContent>
              </Card>

              {/* Publish Settings */}
              <Card>
                <CardHeader>
                  <CardTitle>Publish Settings</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  {/* Category */}
                  <div className="space-y-2">
                    <Label htmlFor="category">Category</Label>
                    <Select name="category">
                      <SelectTrigger>
                        <SelectValue placeholder="Select category" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="technology">Technology</SelectItem>
                        <SelectItem value="business">Business</SelectItem>
                        <SelectItem value="development">Development</SelectItem>
                        <SelectItem value="design">Design</SelectItem>
                        <SelectItem value="news">News</SelectItem>
                        <SelectItem value="tutorials">Tutorials</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  {/* Tags */}
                  <div className="space-y-2">
                    <Label htmlFor="tags">Tags</Label>
                    <div className="flex gap-2">
                      <Input
                        placeholder="Add a tag..."
                        value={currentTag}
                        onChange={(e) => setCurrentTag(e.target.value)}
                        onKeyPress={handleKeyPress}
                      />
                      <Button
                        type="button"
                        variant="outline"
                        onClick={addTag}
                      >
                        Add
                      </Button>
                    </div>
                    {tags.length > 0 && (
                      <div className="flex flex-wrap gap-2 mt-2">
                        {tags.map((tag, index) => (
                          <Badge
                            key={index}
                            variant="secondary"
                            className="flex items-center gap-1"
                          >
                            {tag}
                            <button
                              type="button"
                              onClick={() => removeTag(tag)}
                              className="ml-1 hover:text-red-600"
                            >
                              <X className="h-3 w-3" />
                            </button>
                          </Badge>
                        ))}
                      </div>
                    )}
                  </div>

                  {/* Action Buttons */}
                  <div className="space-y-2 pt-4">
                    {state?.message && (
                      <Alert
                        variant={state?.success ? 'default' : 'destructive'}
                      >
                        <AlertDescription>{state?.message}</AlertDescription>
                      </Alert>
                    )}
                    <Button
                      className="w-full bg-green-600 hover:bg-green-700"
                      disabled={pending}
                    >
                      {pending ? 'Publishing...' : 'Publish Now'}
                    </Button>
                    {/* <Button
                    variant="outline"
                    className="w-full"
                    onClick={() => handleSubmit('draft')}
                    disabled={isSubmitting}
                  >
                    <Save className="mr-2 h-4 w-4" />
                    {isSubmitting ? 'Saving...' : 'Save as Draft'}
                  </Button> */}
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </form>
      </div>
    </div>
  )
}
