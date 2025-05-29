import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import { Separator } from '@/components/ui/separator'
import {
  ArrowLeft,
  Bookmark,
  Calendar,
  Clock,
  Heart,
  Share2,
  Tag,
  User,
} from 'lucide-react'
import Image from 'next/image'
import Link from 'next/link'
import { notFound } from 'next/navigation'
import { MarkdownPreviewer } from '../../../components/markdown-previewer'
import { getAllBlogs, getBlogById } from '../../../lib/blog'
import { calculateReadTime } from '../../../lib/data'

// Mock blog data (in a real app, this would come from a database or CMS)
const blogPosts = [
  {
    id: 1,
    slug: 'getting-started-with-react-typescript',
    title: 'Getting Started with React and TypeScript',
    excerpt:
      'Learn how to set up a modern React application with TypeScript for better development experience and type safety.',
    content: `
      <h2>Introduction</h2>
      <p>React and TypeScript make a powerful combination for building modern web applications. TypeScript adds static type checking to JavaScript, which helps catch errors early and provides better developer experience with improved IDE support.</p>
      
      <h2>Setting Up Your Project</h2>
      <p>To get started with React and TypeScript, you can use Create React App with the TypeScript template:</p>
      
      <pre><code>npx create-react-app my-app --template typescript</code></pre>
      
      <p>This command creates a new React project with TypeScript configuration already set up for you.</p>
      
      <h2>Basic TypeScript Concepts</h2>
      <p>Before diving into React with TypeScript, let's cover some basic TypeScript concepts:</p>
      
      <ul>
        <li><strong>Type Annotations:</strong> Explicitly specify types for variables, function parameters, and return values</li>
        <li><strong>Interfaces:</strong> Define the shape of objects and function signatures</li>
        <li><strong>Generics:</strong> Create reusable components that work with multiple types</li>
      </ul>
      
      <h2>Creating Your First Component</h2>
      <p>Here's an example of a simple React component written in TypeScript:</p>
      
      <pre><code>interface Props {
  name: string;
  age: number;
}

const UserProfile: React.FC<Props> = ({ name, age }) => {
  return (
    <div>
      <h1>Hello, {name}!</h1>
      <p>You are {age} years old.</p>
    </div>
  );
};</code></pre>
      
      <h2>Best Practices</h2>
      <p>When working with React and TypeScript, consider these best practices:</p>
      
      <ol>
        <li>Always define interfaces for your component props</li>
        <li>Use strict TypeScript configuration</li>
        <li>Leverage TypeScript's built-in React types</li>
        <li>Use proper naming conventions for types and interfaces</li>
      </ol>
      
      <h2>Conclusion</h2>
      <p>React and TypeScript together provide a robust foundation for building scalable web applications. The type safety and developer experience improvements make it worth the initial learning curve.</p>
    `,
    thumbnail: '/placeholder.svg?height=400&width=800',
    tags: ['React', 'TypeScript', 'JavaScript', 'Frontend'],
    category: 'Development',
    author: 'John Doe',
    publishedDate: '2024-01-15',
    readTime: '5 min read',
  },
  // Add more blog posts here...
]

// Related posts
const relatedPostsMock = [
  {
    slug: 'future-of-web-development',
    title: 'The Future of Web Development',
    excerpt:
      'Exploring upcoming trends and technologies that will shape the future of web development.',
    thumbnail: '/placeholder.svg?height=200&width=300',
    category: 'Technology',
  },
  {
    slug: 'building-scalable-apis-nodejs',
    title: 'Building Scalable APIs with Node.js',
    excerpt:
      'Best practices for creating robust and scalable APIs using Node.js and Express.',
    thumbnail: '/placeholder.svg?height=200&width=300',
    category: 'Development',
  },
  {
    slug: 'ui-ux-design-principles-developers',
    title: 'UI/UX Design Principles for Developers',
    excerpt:
      'Essential design principles that every developer should know to create better user interfaces.',
    thumbnail: '/placeholder.svg?height=200&width=300',
    category: 'Design',
  },
]

export default async function BlogPostPage({
  params,
}: {
  params: { id: string }
}) {
  const post = await getBlogById((await params).id)
  const allPosts = await getAllBlogs('', '')
  let relatedPosts = []

  for (let i = 0; i < allPosts.length; i++) {
    if (allPosts[i].id !== post.id) {
      relatedPosts.push(allPosts[i])
    }
    if (relatedPosts.length >= 3) {
      break
    }
  }

  if (!post) {
    notFound()
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Back Navigation */}
      <div className="bg-white border-b">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <Link
            href="/blogs"
            className="inline-flex items-center text-green-600 hover:text-green-700 transition-colors"
          >
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back to Blogs
          </Link>
        </div>
      </div>

      {/* Article Header */}
      <article className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <header className="mb-8">
          <div className="mb-4">
            <Badge className="bg-green-600 text-white mb-4">
              {post.category.charAt(0).toUpperCase() + post.category.slice(1)}
            </Badge>
          </div>

          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6 leading-tight">
            {post.title}
          </h1>

          <p className="text-xl text-gray-600 mb-6 leading-relaxed">
            {post.excerpt}
          </p>

          {/* Author and Meta Info */}
          <div className="flex flex-wrap items-center gap-6 text-sm text-gray-500 mb-6">
            <div className="flex items-center">
              <User className="h-4 w-4 mr-2" />
              <span className="font-medium">Site Updates</span>
            </div>
            <div className="flex items-center">
              <Calendar className="h-4 w-4 mr-2" />
              <span>
                {new Date(post.created_at).toLocaleDateString('en-US', {
                  year: 'numeric',
                  month: 'long',
                  day: 'numeric',
                })}
              </span>
            </div>
            <div className="flex items-center">
              <Clock className="h-4 w-4 mr-2" />
              <span>{calculateReadTime(post.content)}</span>
            </div>
          </div>

          {/* Tags */}
          <div className="flex flex-wrap gap-2 mb-6">
            {post.tags.map((tag, index) => (
              <Badge
                key={index}
                variant="outline"
                className="text-sm"
              >
                <Tag className="h-3 w-3 mr-1" />
                {tag}
              </Badge>
            ))}
          </div>

          {/* Social Actions */}
          <div className="flex items-center gap-4 mb-8">
            <Button
              variant="outline"
              size="sm"
            >
              <Heart className="h-4 w-4 mr-2" />
              Like
            </Button>
            <Button
              variant="outline"
              size="sm"
            >
              <Share2 className="h-4 w-4 mr-2" />
              Share
            </Button>
            <Button
              variant="outline"
              size="sm"
            >
              <Bookmark className="h-4 w-4 mr-2" />
              Save
            </Button>
          </div>
        </header>

        {/* Featured Image */}
        <div className="mb-8">
          <Image
            src={post.cover || '/placeholder.svg'}
            alt={post.title}
            width={800}
            height={400}
            className="w-full h-64 md:h-96 object-cover rounded-lg shadow-lg"
          />
        </div>

        {/* Article Content */}
        <MarkdownPreviewer content={post.content} />

        <Separator className="my-12" />

        {/* Author Bio
        <div className="bg-white rounded-lg p-6 mb-12 shadow-sm">
          <div className="flex items-start space-x-4">
            <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center">
              <User className="h-8 w-8 text-green-600" />
            </div>
            <div className="flex-1">
              <h3 className="text-lg font-semibold text-gray-900 mb-2">
                About {post.author}
              </h3>
              <p className="text-gray-600 mb-3">
                {post.author} is a senior developer at Tekarsh with over 5 years
                of experience in React, TypeScript, and modern web development.
                He enjoys sharing knowledge and helping developers build better
                applications.
              </p>
              <div className="flex space-x-3">
                <Button
                  variant="outline"
                  size="sm"
                >
                  Follow
                </Button>
                <Button
                  variant="outline"
                  size="sm"
                >
                  <MessageCircle className="h-4 w-4 mr-2" />
                  Message
                </Button>
              </div>
            </div>
          </div>
        </div> */}

        {/* Related Posts */}
        <section>
          <h2 className="text-2xl font-bold text-gray-900 mb-6">
            Related Articles
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {relatedPosts.map((relatedPost, index) => (
              <Card
                key={index}
                className="group hover:shadow-lg transition-shadow"
              >
                <div className="relative">
                  <Image
                    src={relatedPost.cover || '/placeholder.svg'}
                    alt={relatedPost.title}
                    width={300}
                    height={200}
                    className="w-full h-40 object-cover rounded-t-lg group-hover:contrast-150 transition-transform duration-300"
                  />
                  <Badge className="absolute top-3 left-3 bg-green-600 text-white text-xs">
                    {relatedPost.category}
                  </Badge>
                </div>
                <CardContent className="p-4">
                  <Link href={`/blogs/${relatedPost.slug}`}>
                    <h3 className="font-semibold text-gray-900 group-hover:text-green-600 transition-colors mb-2 line-clamp-2">
                      {relatedPost.title}
                    </h3>
                  </Link>
                  <p className="text-sm text-gray-600 line-clamp-2">
                    {relatedPost.excerpt}
                  </p>
                </CardContent>
              </Card>
            ))}
          </div>
        </section>
      </article>
    </div>
  )
}
