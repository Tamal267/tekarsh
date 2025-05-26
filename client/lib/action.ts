'use server'

import { cookies } from 'next/headers'
import { cache } from 'react'
import { createClient } from '../utils/supabase/server'

const server_url = process.env.SERVER_URL + '/'

export const post = cache(
  async (url: string, data: Record<string, unknown>) => {
    url = server_url + url

    const response = await fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
      cache: 'force-cache',
      next: { revalidate: 30000 },
    })
    try {
      const json = await response.json()
      return json
    } catch (error) {
      console.error('JSON Error:', error)
      return {
        error: 'An error occurred',
      }
    }
  },
)

export const get = cache(async (url: string) => {
  url = server_url + url

  const response = await fetch(url, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    },
    cache: 'force-cache',
    next: { revalidate: 30000 },
  })
  try {
    const json = await response.json()
    return json
  } catch (error) {
    console.error('Error:', error)
  }
})

export const get_with_token = cache(async (url: string) => {
  const co = await cookies()
  const token = co.get('token')
  if (token === undefined)
    return {
      error: 'Unauthorized',
    }

  const response = await fetch(server_url + url, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token.value}`,
    },
    cache: 'force-cache',
    next: { revalidate: 30000 },
  })
  try {
    const json = await response.json()
    return json
  } catch (error) {
    return {
      error: 'An error occurred ' + error,
    }
  }
})

export const post_with_token = cache(
  async (url: string, data: Record<string, unknown>) => {
    const co = await cookies()
    const token = co.get('token')
    if (token === undefined)
      return {
        error: 'Unauthorized',
      }

    const response = await fetch(server_url + url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token.value}`,
      },
      body: JSON.stringify(data),
      cache: 'force-cache',
      next: { revalidate: 30000 },
    })
    try {
      const json = await response.json()
      return json
    } catch (error) {
      console.error('Error:', error)
      return {
        error: 'An error occurred',
      }
    }
  },
)

export async function uploadImage(
  folder: string,
  uId: string,
  file: File,
  bucket: string,
): Promise<{ data?: unknown; url?: string; error?: unknown }> {
  const supabase = await createClient()
  const fileName = Date.now() + '_' + file.name
  const { data, error } = await supabase.storage
    .from(bucket)
    .upload(folder + '/' + uId + '/' + fileName, file)
  if (error) return { error }
  const url =
    process.env.NEXT_PUBLIC_SUPABASE_URL +
    `/storage/v1/object/public/` +
    data.fullPath

  return { data, url }
}
