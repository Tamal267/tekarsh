import { Badge } from '@/components/ui/badge'
import { Card, CardContent, CardHeader } from '@/components/ui/card'
import { Calendar, Clock, Tag, User } from 'lucide-react'
import Image from 'next/image'
import Link from 'next/link'
import SearchBlogs from '../../components/search-blogs'
import { getAllBlogs } from '../../lib/blog'
import { calculateReadTime } from '../../lib/data'

// Mock blog data
const blogPosts = [
  {
    id: 1,
    slug: 'getting-started-with-react-typescript',
    title: 'Getting Started with React and TypeScript',
    excerpt:
      'Learn how to set up a modern React application with TypeScript for better development experience and type safety.',
    content: 'Full blog content here...',
    thumbnail: '/placeholder.svg?height=200&width=400',
    tags: ['React', 'TypeScript', 'JavaScript', 'Frontend'],
    category: 'Development',
    author: 'John Doe',
    publishedDate: '2024-01-15',
    readTime: '5 min read',
  },
  {
    id: 2,
    slug: 'future-of-web-development',
    title: 'The Future of Web Development',
    excerpt:
      'Exploring upcoming trends and technologies that will shape the future of web development in the next decade.',
    content: 'Full blog content here...',
    thumbnail: '/placeholder.svg?height=200&width=400',
    tags: ['Web Development', 'Future', 'Technology', 'Trends'],
    category: 'Technology',
    author: 'Jane Smith',
    publishedDate: '2024-01-12',
    readTime: '8 min read',
  },
  {
    id: 3,
    slug: 'building-scalable-apis-nodejs',
    title: 'Building Scalable APIs with Node.js',
    excerpt:
      'Best practices for creating robust and scalable APIs using Node.js, Express, and modern development patterns.',
    content: 'Full blog content here...',
    thumbnail: '/placeholder.svg?height=200&width=400',
    tags: ['Node.js', 'API', 'Backend', 'Express'],
    category: 'Development',
    author: 'Mike Johnson',
    publishedDate: '2024-01-10',
    readTime: '12 min read',
  },
  {
    id: 4,
    slug: 'ui-ux-design-principles-developers',
    title: 'UI/UX Design Principles for Developers',
    excerpt:
      'Essential design principles that every developer should know to create better user interfaces and experiences.',
    content: 'Full blog content here...',
    thumbnail: '/placeholder.svg?height=200&width=400',
    tags: ['UI/UX', 'Design', 'Frontend', 'User Experience'],
    category: 'Design',
    author: 'Sarah Wilson',
    publishedDate: '2024-01-08',
    readTime: '6 min read',
  },
  {
    id: 5,
    slug: 'cloud-computing-business-growth',
    title: 'Cloud Computing for Business Growth',
    excerpt:
      'How cloud computing solutions can accelerate business growth and improve operational efficiency.',
    content: 'Full blog content here...',
    thumbnail: '/placeholder.svg?height=200&width=400',
    tags: ['Cloud Computing', 'Business', 'AWS', 'Digital Transformation'],
    category: 'Business',
    author: 'David Brown',
    publishedDate: '2024-01-05',
    readTime: '10 min read',
  },
  {
    id: 6,
    slug: 'cybersecurity-best-practices-2024',
    title: 'Cybersecurity Best Practices for 2024',
    excerpt:
      'Stay protected with the latest cybersecurity best practices and security measures for modern applications.',
    content: 'Full blog content here...',
    thumbnail: '/placeholder.svg?height=200&width=400',
    tags: ['Cybersecurity', 'Security', 'Best Practices', 'Protection'],
    category: 'Security',
    author: 'Emily Davis',
    publishedDate: '2024-01-03',
    readTime: '7 min read',
  },
]

const categories = ['Technology', 'Design', 'Business', 'News', 'Tutorials']

export default async function BlogsPage({ searchParams }) {
  const _sp = await searchParams
  const __title = _sp.title || ''
  const __category = _sp.category || ''
  const allBlogPosts = await getAllBlogs(__title, __category)
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-green-50 to-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
              Our Blog
            </h1>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto mb-8">
              Discover insights, tutorials, and industry updates from our team
              of experts. Stay informed about the latest trends in technology
              and business solutions.
            </p>

            {/* Search Bar */}
            <SearchBlogs
              title={__title}
              category={__category}
            />
          </div>
        </div>
      </section>

      {/* Categories Filter */}
      <section className="py-8 bg-white border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-wrap justify-center gap-3">
            <Link
              href={`/blogs?title=${__title}&category=`}
              className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                !__category
                  ? 'bg-green-600 text-white'
                  : 'bg-gray-100 text-gray-700 hover:bg-green-50'
              }`}
            >
              All
            </Link>
            {categories.map((category) => (
              <Link
                key={category}
                href={`/blogs?title=${__title}&category=${category}`}
                className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                  __category === category
                    ? 'bg-green-600 text-white'
                    : 'bg-gray-100 text-gray-700 hover:bg-green-50'
                }`}
              >
                {category}
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Blog Posts Grid */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {allBlogPosts.map((post) => (
              <Card
                key={post.id}
                className="group hover:shadow-lg transition-shadow duration-300 overflow-hidden"
              >
                <div className="relative">
                  <Image
                    src={post.cover || '/placeholder.svg'}
                    alt={post.title}
                    width={400}
                    height={200}
                    className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                  <div className="absolute top-4 left-4">
                    <Badge className="bg-green-600 text-white">
                      {post.category.charAt(0).toUpperCase() +
                        post.category.slice(1)}
                    </Badge>
                  </div>
                </div>

                <CardHeader className="pb-3">
                  <div className="flex items-center text-sm text-gray-500 mb-2">
                    <User className="h-4 w-4 mr-1" />
                    <span className="mr-4">Site Updates</span>
                    <Calendar className="h-4 w-4 mr-1" />
                    <span className="mr-4">
                      {new Date(post.created_at).toLocaleDateString()}
                    </span>
                    <Clock className="h-4 w-4 mr-1" />
                    <span>{calculateReadTime(post.content)}</span>
                  </div>

                  <Link href={`/blogs/${post.id}`}>
                    <h3 className="text-xl font-semibold text-gray-900 group-hover:text-green-600 transition-colors line-clamp-2">
                      {post.title}
                    </h3>
                  </Link>
                </CardHeader>

                <CardContent className="pt-0">
                  <p className="text-gray-600 mb-4 line-clamp-3">
                    {post.excerpt}
                  </p>

                  <div className="flex flex-wrap gap-2 mb-4">
                    {post.tags.slice(0, 3).map((tag, index) => (
                      <Badge
                        key={index}
                        variant="outline"
                        className="text-xs"
                      >
                        <Tag className="h-3 w-3 mr-1" />
                        {tag}
                      </Badge>
                    ))}
                    {post.tags.length > 3 && (
                      <Badge
                        variant="outline"
                        className="text-xs"
                      >
                        +{post.tags.length - 3} more
                      </Badge>
                    )}
                  </div>

                  <Link
                    href={`/blogs/${post.id}`}
                    className="inline-flex items-center text-green-600 hover:text-green-700 font-medium transition-colors"
                  >
                    Read More
                    <svg
                      className="ml-2 h-4 w-4"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M9 5l7 7-7 7"
                      />
                    </svg>
                  </Link>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Load More Section */}
      <section className="py-8 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <button className="bg-green-600 hover:bg-green-700 text-white px-8 py-3 rounded-lg font-medium transition-colors">
            Load More Articles
          </button>
        </div>
      </section>
    </div>
  )
}
