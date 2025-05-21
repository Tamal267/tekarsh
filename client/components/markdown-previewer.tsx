'use client'

import { marked } from 'marked'
import { useEffect, useState } from 'react'

interface MarkdownPreviewerProps {
  content: string
  className?: string
}

export function MarkdownPreviewer({
  content,
  className = '',
}: MarkdownPreviewerProps) {
  const [htmlContent, setHtmlContent] = useState('')
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    if (!content) {
      setHtmlContent('')
      setError(null)
      return
    }

    try {
      // Configure marked options if needed
      marked.setOptions({
        breaks: true, // Add line breaks on single line breaks
        gfm: true, // GitHub Flavored Markdown
      })

      const getMarkdownContent = async () => {
        const html = await marked(content)
        setHtmlContent(html)
      }

      getMarkdownContent()
      setError(null)
    } catch (err) {
      console.error('Error parsing markdown:', err)
      setError('Failed to parse markdown content')
      setHtmlContent('')
    }
  }, [content])

  if (error) {
    return (
      <div className="p-4 border border-red-200 bg-red-50 rounded-md text-red-800">
        <p className="font-medium">Error rendering markdown</p>
        <p className="text-sm">{error}</p>
      </div>
    )
  }

  if (!content) {
    return <div className="text-gray-500 italic p-4">No content to preview</div>
  }

  return (
    <div className={`markdown-preview prose max-w-none ${className}`}>
      <div dangerouslySetInnerHTML={{ __html: htmlContent }} />
    </div>
  )
}
