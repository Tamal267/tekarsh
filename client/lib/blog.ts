'use server'

import { redirect } from 'next/navigation'
import { post } from './action'

export async function getAllBlogs(title, category) {
  const response = await post('blog/getall', {
    title: '%' + title + '%',
    category: '%' + category + '%',
  })
  if (response.error) {
    return response.error
  }
  return response.result
}

export async function getBlogById(id: string) {
  console.log('id', id)
  const response = await post('blog/getbyid', { id })
  if (response.error) {
    return response.error
  }
  return response.result
}

export async function filterBlogs(prevState: unknown, formData: unknown) {
  const raw = Object.fromEntries(formData as FormData)

  console.log('raw', raw)

  redirect(`/blogs?title=${raw.title}&category=${raw.category}`)
}
