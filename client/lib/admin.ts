'use server'

import { post } from './action'

export async function addPosition(prevState: unknown, formData: unknown) {
  console.log('hello')
  const raw = Object.fromEntries(formData as FormData)
  console.log('raw', raw)

  const response = await post('admin/add_position', raw)
  if (response.error) {
    return {
      success: false,
      message: response.error,
    }
  }

  return {
    success: true,
    message: `Position ${raw.title} added successfully`,
  }
}
