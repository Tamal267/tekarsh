import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import {
  ArrowUpRight,
  Briefcase,
  Calendar,
  Eye,
  FileText,
  Plus,
  TrendingUp,
  Users,
} from 'lucide-react'
import { cookies } from 'next/headers'
import Link from 'next/link'
import { redirect } from 'next/navigation'
import { getAllBlogs } from '../../lib/blog'
import { getAllJobs } from '../../lib/job'

// Mock data for dashboard
const dashboardStats = {
  totalApplications: 156,
  newApplications: 23,
  totalBlogPosts: 42,
  publishedPosts: 38,
  totalViews: 15420,
  totalComments: 234,
  activePositions: 8,
  pendingReviews: 12,
}

const recentApplications = [
  {
    id: 1,
    name: 'John Doe',
    position: 'Senior React Developer',
    appliedDate: '2024-01-15',
    status: 'new',
  },
  {
    id: 2,
    name: 'Jane Smith',
    position: 'UX Designer',
    appliedDate: '2024-01-14',
    status: 'reviewed',
  },
  {
    id: 3,
    name: 'Mike Johnson',
    position: 'DevOps Engineer',
    appliedDate: '2024-01-13',
    status: 'shortlisted',
  },
  {
    id: 4,
    name: 'Sarah Wilson',
    position: 'Product Designer',
    appliedDate: '2024-01-12',
    status: 'new',
  },
]

const recentBlogPosts = [
  {
    id: 1,
    title: 'Getting Started with React and TypeScript',
    author: 'Admin',
    publishedDate: '2024-01-15',
    status: 'published',
    views: 1250,
    comments: 23,
  },
  {
    id: 2,
    title: 'The Future of Web Development',
    author: 'Admin',
    publishedDate: '2024-01-12',
    status: 'published',
    views: 890,
    comments: 15,
  },
  {
    id: 3,
    title: 'Building Scalable APIs with Node.js',
    author: 'Admin',
    publishedDate: null,
    status: 'draft',
    views: 0,
    comments: 0,
  },
]

const quickActions = [
  {
    title: 'Write New Blog Post',
    description: 'Create and publish a new blog post',
    href: '/admin/blog/new',
    icon: FileText,
    color: 'bg-blue-500',
  },
  {
    title: 'Add Job Position',
    description: 'Post a new job opening',
    href: '/admin/add-position',
    icon: Briefcase,
    color: 'bg-green-500',
  },
  {
    title: 'Review Applications',
    description: 'Check new job applications',
    href: '/admin/applications',
    icon: Users,
    color: 'bg-purple-500',
  },
  {
    title: 'View Analytics',
    description: 'Check website performance',
    href: '/admin/analytics',
    icon: TrendingUp,
    color: 'bg-orange-500',
  },
]

const getStatusColor = (status: string) => {
  switch (status) {
    case 'new':
      return 'bg-blue-100 text-blue-800'
    case 'reviewed':
      return 'bg-yellow-100 text-yellow-800'
    case 'shortlisted':
      return 'bg-green-100 text-green-800'
    case 'published':
      return 'bg-green-100 text-green-800'
    case 'draft':
      return 'bg-gray-100 text-gray-800'
    default:
      return 'bg-gray-100 text-gray-800'
  }
}

export default async function AdminDashboard() {
  const cookieStore = await cookies()
  const isLogin = cookieStore.get('token')?.value === undefined ? false : true
  const allJobs = await getAllJobs()
  let shortListed = 0,
    rejected = 0,
    invited = 0,
    new_job = 0,
    reviewed = 0
  for (let i = 0; i < allJobs.length; i++) {
    if (allJobs[i].status === 'shortlisted') {
      shortListed++
    } else if (allJobs[i].status === 'rejected') {
      rejected++
    } else if (allJobs[i].status === 'invited') {
      invited++
    } else if (allJobs[i].status === 'new') {
      new_job++
    } else if (allJobs[i].status === 'reviewed') {
      reviewed++
    }
  }

  const allBlogs = await getAllBlogs('', '')

  if (!isLogin) {
    redirect('/admin/login')
  }
  return (
    <div className="p-12 space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Dashboard</h1>
          <p className="text-gray-600 mt-1">
            Welcome back! Here's what's happening with your website.
          </p>
        </div>
        <div className="flex space-x-3">
          <Button
            asChild
            variant="outline"
          >
            <Link href="/">
              <ArrowUpRight className="mr-2 h-4 w-4" />
              View Website
            </Link>
          </Button>
          <Button
            asChild
            className="bg-green-600 hover:bg-green-700"
          >
            <Link href="/admin/blog/new">
              <Plus className="mr-2 h-4 w-4" />
              New Post
            </Link>
          </Button>
        </div>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center">
              <div className="p-2 bg-green-100 rounded-lg">
                <Users className="h-6 w-6 text-cyan-600" />
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600">
                  Total Open Positions
                </p>
                <div className="flex items-center">
                  <p className="text-2xl font-bold text-gray-900">
                    {allJobs.length}
                  </p>
                  <Link href="/careers">
                    <Badge className="ml-2 bg-green-100 text-cyan-800">
                      See all <ArrowUpRight className="inline h-3 w-3" />
                    </Badge>
                  </Link>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center">
              <div className="p-2 bg-green-100 rounded-lg">
                <Eye className="h-6 w-6 text-cyan-600" />
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600">
                  New Applications
                </p>
                <div className="flex items-center">
                  <p className="text-2xl font-bold text-gray-900">
                    {new_job.toLocaleString()}
                  </p>
                  <Badge className="ml-2 bg-green-100 text-cyan-800">
                    {shortListed} shortlisted
                  </Badge>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center">
              <div className="p-2 bg-green-100 rounded-lg">
                <Briefcase className="h-6 w-6 text-cyan-700" />
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600">Invited</p>
                <div className="flex items-center">
                  <p className="text-2xl font-bold text-gray-900">
                    {invited.toLocaleString()}
                  </p>
                  <Badge className="ml-2 bg-green-100 text-cyan-800">
                    {rejected} rejected
                  </Badge>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center">
              <div className="p-2 bg-green-100 rounded-lg">
                <FileText className="h-6 w-6 text-cyan-600" />
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600">Blog Posts</p>
                <div className="flex items-center">
                  <p className="text-2xl font-bold text-gray-900">
                    {allBlogs.length}
                  </p>
                  <Badge className="ml-2 bg-green-100 text-cyan-800">
                    {dashboardStats.publishedPosts} published
                  </Badge>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Quick Actions */}
      <Card>
        <CardHeader>
          <CardTitle>Quick Actions</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {quickActions.map((action, index) => {
              const Icon = action.icon
              return (
                <Link
                  key={index}
                  href={action.href}
                  className="block p-4 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors"
                >
                  <div className="flex items-center">
                    <div className={`p-2 ${action.color} rounded-lg`}>
                      <Icon className="h-5 w-5 text-white" />
                    </div>
                    <div className="ml-3">
                      <p className="font-medium text-gray-900">
                        {action.title}
                      </p>
                      <p className="text-sm text-gray-600">
                        {action.description}
                      </p>
                    </div>
                  </div>
                </Link>
              )
            })}
          </div>
        </CardContent>
      </Card>

      {/* Recent Activity */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Recent Applications */}
        <Card>
          <CardHeader className="flex flex-row items-center justify-between">
            <CardTitle>Recent Applications</CardTitle>
            <Button
              asChild
              variant="outline"
              size="sm"
            >
              <Link href="/admin/applications">View All</Link>
            </Button>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {allJobs.slice(0, 5).map((application) => (
                <div
                  key={application.id}
                  className="flex items-center justify-between p-3 bg-gray-50 rounded-lg"
                >
                  <div className="flex items-center">
                    <div className="w-10 h-10 bg-gradient-to-r from-green-500 to-cyan-600 rounded-full flex items-center justify-center text-white font-semibold text-sm">
                      {application.title
                        .split(' ')
                        .map((n) => n[0])
                        .join('')}
                    </div>
                    <div className="ml-3">
                      <p className="font-medium text-gray-900">
                        {application.title}
                      </p>
                      <p className="text-sm text-gray-600">
                        {application.department}
                      </p>
                    </div>
                  </div>
                  <div className="text-right">
                    <Badge className={getStatusColor(application.status)}>
                      {application.salary}
                    </Badge>
                    <p className="text-xs text-gray-500 mt-1 flex items-center p-2">
                      <Calendar className="h-3 w-3 mr-1" />
                      {new Date(application.created_at).toLocaleDateString()}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Recent Blog Posts */}
        <Card>
          <CardHeader className="flex flex-row items-center justify-between">
            <CardTitle>Recent Blog Posts</CardTitle>
            <Button
              asChild
              variant="outline"
              size="sm"
            >
              <Link href="/admin/blog">View All</Link>
            </Button>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {allBlogs.slice(0, 5).map((post) => (
                <div
                  key={post.id}
                  className="flex items-center justify-between p-3 bg-gray-50 rounded-lg"
                >
                  <div className="flex items-center">
                    <div className="p-2 bg-green-100 rounded-lg">
                      <FileText className="h-5 w-5 text-green-600" />
                    </div>
                    <div className="ml-3">
                      <p className="font-medium text-gray-900">{post.title}</p>
                      <p className="text-sm text-gray-600">by Site Updates</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <Badge className={getStatusColor(post.status)}>
                      {post.status.charAt(0).toUpperCase() +
                        post.status.slice(1)}
                    </Badge>
                    <div className="text-xs text-gray-500 mt-1 space-y-1">
                      {post.created_at && (
                        <p className="flex items-center">
                          <Calendar className="h-3 w-3 mr-1" />
                          {new Date(post.created_at).toLocaleDateString()}
                        </p>
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
