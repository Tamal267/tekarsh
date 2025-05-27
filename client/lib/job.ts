'use server'

import { revalidatePath } from 'next/cache'
import { redirect } from 'next/navigation'
import { get, post, post_with_token, uploadImage } from './action'

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

export async function getJobApplications(
  title?: string,
  department?: string,
  location?: string,
  status?: string,
) {
  const response = await post('job/filterjobs', {
    title: '%' + title + '%',
    department: '%' + department + '%',
    location: '%' + location + '%',
    status: '%' + status + '%',
  })
  console.log('response', response)
  if (response.error) {
    return response.error
  }
  return response.result
}

export async function getAiAnalysis({ pdfUrl, details }) {
  const response = await post('cv/anylyze', {
    pdfUrl,
    details,
  })
  console.log('response', response)
  if (!response || response.success === false) {
    return {
      error: response.message || 'Something went wrong',
    }
  }
  return response.analysis
}

export async function changeStatus(prevState: unknown, formData: unknown) {
  const raw = Object.fromEntries(formData as FormData)

  console.log('raw', raw)

  const response = await post_with_token('admin/change_status', raw)
  if (response.error) {
    return {
      success: false,
      message: response.error,
    }
  } else {
    revalidatePath('/admin/applications')
    return {
      success: true,
      message: `User status changed successfully`,
    }
  }
}

export async function sendInvitation(prevState: unknown, formData: unknown) {
  const raw = Object.fromEntries(formData as FormData)

  console.log('raw', raw)

  const response = await post_with_token('admin/send_invitation', raw)
  if (response.error) {
    return {
      success: false,
      message: response.error,
    }
  } else {
    revalidatePath('/admin/applications')
    return {
      success: true,
      message: `User are invited successfully`,
    }
  }
}

export async function filterApplications(
  prevState: unknown,
  formData: unknown,
) {
  const raw = Object.fromEntries(formData as FormData)

  console.log('raw', raw)

  redirect(
    `/admin/applications?title=${raw.title}&department=${raw.department}&location=${raw.location}&status=${raw.status}`,
  )
}
