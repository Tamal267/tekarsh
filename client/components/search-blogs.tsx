'use client'

import { Search } from 'lucide-react'
import { useActionState, useCallback, useState } from 'react'
import { filterBlogs } from '../lib/blog'
import { Input } from './ui/input'

const initialState = {
  message: '',
  success: false,
}

export default function SearchBlogs({
  title,
  category,
}: {
  title?: string
  category?: string
}) {
  const [searchTitle, setSearchTitle] = useState(title || '')
  const [state, formAction, pending] = useActionState(filterBlogs, initialState)

  const handleSubmit = useCallback(
    (formData: FormData) => {
      formData.append('category', category || '')
      formAction(formData)
    },
    [category, formAction],
  )

  return (
    <form action={handleSubmit}>
      <div className="max-w-md mx-auto relative">
        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
        <Input
          type="text"
          id="title"
          name="title"
          value={searchTitle}
          onChange={(e) => setSearchTitle(e.target.value)}
          placeholder="Search articles..."
          className="pl-10 pr-4 py-3 w-full border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
        />
      </div>
    </form>
  )
}
