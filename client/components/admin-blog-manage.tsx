'use client'

import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import { Input } from '@/components/ui/input'
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table'
import {
  Calendar,
  Edit,
  Eye,
  Filter,
  MessageSquare,
  MoreHorizontal,
  Plus,
  Search,
  Trash2,
  TrendingUp,
  User,
} from 'lucide-react'
import Link from 'next/link'
import { useState } from 'react'

// Mock data for blog posts
const mockBlogPosts = [
  {
    id: 1,
    title: 'Getting Started with React and TypeScript',
    excerpt:
      'Learn how to set up a modern React application with TypeScript for better development experience.',
    author: 'John Doe',
    category: 'Development',
    status: 'published',
    publishedDate: '2024-01-15',
    views: 1250,
    comments: 23,
    tags: ['React', 'TypeScript', 'JavaScript'],
  },
  {
    id: 2,
    title: 'The Future of Web Development',
    excerpt:
      'Exploring upcoming trends and technologies that will shape the future of web development.',
    author: 'Jane Smith',
    category: 'Technology',
    status: 'published',
    publishedDate: '2024-01-12',
    views: 890,
    comments: 15,
    tags: ['Web Development', 'Future', 'Technology'],
  },
  {
    id: 3,
    title: 'Building Scalable APIs with Node.js',
    excerpt:
      'Best practices for creating robust and scalable APIs using Node.js and Express.',
    author: 'Mike Johnson',
    category: 'Development',
    status: 'draft',
    publishedDate: null,
    views: 0,
    comments: 0,
    tags: ['Node.js', 'API', 'Backend'],
  },
  {
    id: 4,
    title: 'UI/UX Design Principles for Developers',
    excerpt:
      'Essential design principles that every developer should know to create better user interfaces.',
    author: 'Sarah Wilson',
    category: 'Design',
    status: 'published',
    publishedDate: '2024-01-10',
    views: 675,
    comments: 8,
    tags: ['UI/UX', 'Design', 'Frontend'],
  },
]

const getStatusColor = (status: string) => {
  switch (status) {
    case 'published':
      return 'bg-green-100 text-green-800'
    case 'draft':
      return 'bg-yellow-100 text-yellow-800'
    case 'archived':
      return 'bg-gray-100 text-gray-800'
    default:
      return 'bg-gray-100 text-gray-800'
  }
}

function truncateText(text: string): string {
  const sz = 50
  if (text.length > sz) {
    return text.slice(0, sz) + '...'
  }
  return text
}

export default function BlogManagement({ allBlogs }) {
  const [searchTerm, setSearchTerm] = useState('')
  const [selectedCategory, setSelectedCategory] = useState('')
  const [selectedStatus, setSelectedStatus] = useState('')

  const filteredPosts = allBlogs.filter((post) => {
    const matchesSearch =
      post.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      post.excerpt.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesCategory =
      !selectedCategory || post.category === selectedCategory
    const matchesStatus = !selectedStatus || post.status === selectedStatus

    return matchesSearch && matchesCategory && matchesStatus
  })

  const totalViews = allBlogs.reduce((sum, post) => sum + post.views, 0)
  const totalComments = allBlogs.reduce((sum, post) => sum + post.comments, 0)
  const publishedPosts = allBlogs.filter(
    (post) => post.status === 'published',
  ).length
  const draftPosts = allBlogs.filter((post) => post.status === 'draft').length

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="flex justify-between items-center mb-6">
          <div>
            <h1 className="text-2xl font-bold text-gray-800">
              Blog Management
            </h1>
            <p className="text-gray-600">Manage your blog posts and content</p>
          </div>
          <Button
            asChild
            className="bg-green-600 hover:bg-green-700"
          >
            <Link href="/admin/blog/new">
              <Plus className="mr-2 h-4 w-4" />
              New Blog Post
            </Link>
          </Button>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-6">
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center">
                <div className="p-2 bg-blue-100 rounded-lg">
                  <MessageSquare className="h-6 w-6 text-blue-600" />
                </div>
                <div className="ml-4">
                  <p className="text-sm font-medium text-gray-600">
                    Total Posts
                  </p>
                  <p className="text-2xl font-bold text-gray-900">
                    {allBlogs.length}
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center">
                <div className="p-2 bg-green-100 rounded-lg">
                  <Eye className="h-6 w-6 text-green-600" />
                </div>
                <div className="ml-4">
                  <p className="text-sm font-medium text-gray-600">
                    Total Views
                  </p>
                  <p className="text-2xl font-bold text-gray-900">
                    {totalViews.toLocaleString()}
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center">
                <div className="p-2 bg-purple-100 rounded-lg">
                  <MessageSquare className="h-6 w-6 text-purple-600" />
                </div>
                <div className="ml-4">
                  <p className="text-sm font-medium text-gray-600">Comments</p>
                  <p className="text-2xl font-bold text-gray-900">
                    {totalComments || 'NaN'}
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center">
                <div className="p-2 bg-yellow-100 rounded-lg">
                  <TrendingUp className="h-6 w-6 text-yellow-600" />
                </div>
                <div className="ml-4">
                  <p className="text-sm font-medium text-gray-600">Published</p>
                  <p className="text-2xl font-bold text-gray-900">
                    {publishedPosts}
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Filters */}
        <Card className="mb-6">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Filter className="h-5 w-5" />
              Filters
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                <Input
                  placeholder="Search posts..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10"
                />
              </div>

              <select
                value={selectedCategory}
                onChange={(e) => setSelectedCategory(e.target.value)}
                className="w-full h-10 px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
              >
                <option value="">All Categories</option>
                <option value="Development">Development</option>
                <option value="Technology">Technology</option>
                <option value="Design">Design</option>
                <option value="Business">Business</option>
              </select>

              <select
                value={selectedStatus}
                onChange={(e) => setSelectedStatus(e.target.value)}
                className="w-full h-10 px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
              >
                <option value="">All Status</option>
                <option value="published">Published</option>
                <option value="draft">Draft</option>
                <option value="archived">Archived</option>
              </select>

              <div className="flex items-center justify-center text-sm text-gray-600">
                {filteredPosts.length} results
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Blog Posts Table */}
        <Card>
          <CardContent className="p-4">
            <div className="overflow-x-auto">
              <Table>
                <TableHeader>
                  <TableRow className="bg-gray-50">
                    <TableHead className="font-semibold">Title</TableHead>
                    <TableHead className="font-semibold">Author</TableHead>
                    <TableHead className="font-semibold">Category</TableHead>
                    <TableHead className="font-semibold">Status</TableHead>
                    <TableHead className="font-semibold">Published</TableHead>
                    <TableHead className="font-semibold">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredPosts.map((post) => (
                    <TableRow
                      key={post.id}
                      className="hover:bg-gray-50"
                    >
                      <TableCell className="">
                        <div>
                          <div className="font-semibold text-gray-900">
                            {post.title}
                          </div>
                          <div className="text-sm text-gray-500 mt-1">
                            {truncateText(post.excerpt)}
                          </div>
                          <div className="flex flex-wrap gap-1 mt-2">
                            {post.tags.slice(0, 3).map((tag, index) => (
                              <Badge
                                key={index}
                                variant="outline"
                                className="text-xs"
                              >
                                {tag}
                              </Badge>
                            ))}
                          </div>
                        </div>
                      </TableCell>
                      <TableCell>
                        <div className="flex items-center">
                          <User className="h-4 w-4 mr-2 text-gray-400" />
                          <span className="text-sm">Site Updates</span>
                        </div>
                      </TableCell>
                      <TableCell>
                        <Badge variant="secondary">{post.category}</Badge>
                      </TableCell>
                      <TableCell>
                        <Badge className={getStatusColor(post.status)}>
                          {post.status.charAt(0).toUpperCase() +
                            post.status.slice(1)}
                        </Badge>
                      </TableCell>
                      <TableCell>
                        <div className="flex items-center text-sm">
                          <Calendar className="h-3 w-3 mr-1 text-gray-400" />
                          {post.created_at
                            ? new Date(post.created_at).toLocaleDateString()
                            : 'Not published'}
                        </div>
                      </TableCell>
                      <TableCell>
                        <DropdownMenu>
                          <DropdownMenuTrigger asChild>
                            <Button
                              variant="outline"
                              size="sm"
                            >
                              <MoreHorizontal className="h-4 w-4" />
                            </Button>
                          </DropdownMenuTrigger>
                          <DropdownMenuContent align="end">
                            <DropdownMenuItem>
                              <Eye className="h-4 w-4 mr-2" />
                              View Post
                            </DropdownMenuItem>
                            <DropdownMenuItem>
                              <Edit className="h-4 w-4 mr-2" />
                              Edit Post
                            </DropdownMenuItem>
                            <DropdownMenuItem className="text-red-600">
                              <Trash2 className="h-4 w-4 mr-2" />
                              Delete Post
                            </DropdownMenuItem>
                          </DropdownMenuContent>
                        </DropdownMenu>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>

            {filteredPosts.length === 0 && (
              <div className="text-center py-12">
                <MessageSquare className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                <p className="text-gray-500 text-lg">No blog posts found</p>
                <p className="text-gray-400">
                  Try adjusting your filters or create a new blog post
                </p>
                <Button
                  asChild
                  className="mt-4 bg-green-600 hover:bg-green-700"
                >
                  <Link href="/admin/blog/new">
                    <Plus className="mr-2 h-4 w-4" />
                    Create New Post
                  </Link>
                </Button>
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
