'use server'

import { get, post, uploadImage } from './action'

export async function getAllJobs() {
  const response = await get('job/getall')
  if (response.error) {
    return response.error
  }
  return response.result
}

export async function getJobById(id: string) {
  console.log('id', id)
  const response = await post('job/getbyid', { id })
  if (response.error) {
    return response.error
  }
  return response.result
}

export async function jobApplicationForm(
  prevState: unknown,
  formData: unknown,
) {
  let raw = Object.fromEntries(formData as FormData)

  const { url, error } = await uploadImage(
    'profile_pictures',
    raw.email,
    raw.resume,
    'pictures',
  )

  if (error) {
    console.log('error image: ', error)
    return {
      success: false,
      message: 'Error uploading image',
    }
  }

  raw.cv = url

  console.log('raw', raw)

  const response = await post('job/application', raw)
  if (response.error) {
    return {
      success: false,
      message: response.error,
    }
  } else {
    return {
      success: true,
      message: `User ${raw.email} application sent successfully`,
    }
  }
}
