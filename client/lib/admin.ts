'use server'

import { revalidatePath } from 'next/cache'
import { cookies } from 'next/headers'
import { redirect } from 'next/navigation'
import { post, post_with_token, uploadImage } from './action'

export async function addPosition(prevState: unknown, formData: unknown) {
  console.log('hello')
  const raw = Object.fromEntries(formData as FormData)
  console.log('raw', raw)

  const response = await post_with_token('admin/add_position', raw)
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

export async function deletePosition(prevState: unknown, formData: unknown) {
  console.log('hello')
  const raw = Object.fromEntries(formData as FormData)
  console.log('raw', raw)

  const response = await post_with_token('admin/delete_position', raw)
  if (response.error) {
    return {
      success: false,
      message: response.error,
    }
  }

  revalidatePath('/careers')

  return {
    success: true,
    message: `Position ${raw.title} deleted successfully`,
  }
}

export async function editPosition(prevState: unknown, formData: unknown) {
  console.log('hello')
  const raw = Object.fromEntries(formData as FormData)
  console.log('raw', raw)

  const response = await post_with_token('admin/edit_position', raw)
  if (response.error) {
    return {
      success: false,
      message: response.error,
    }
  }

  return {
    success: true,
    message: `Position ${raw.title} edited successfully`,
  }
}

export async function adminSignUp(prevState: unknown, formData: unknown) {
  const raw = Object.fromEntries(formData as FormData)
  console.log('raw', raw)

  if (raw.password !== raw.confirmPassword) {
    return {
      success: false,
      message: 'Passwords do not match',
    }
  }

  if (raw.password.length < 8) {
    return {
      success: false,
      message: 'Password must be at least 8 characters long',
    }
  }

  const response = await post('auth/admin_signup', raw)
  if (response.error) {
    return {
      success: false,
      message: response.error,
    }
  }

  return {
    success: true,
    message: `Admin ${raw.name} created successfully`,
  }
}

export async function adminLogin(prevState: unknown, formData: unknown) {
  const raw = Object.fromEntries(formData as FormData)
  console.log('raw', raw)

  const response = await post('auth/admin_login', raw)
  if (response.error) {
    return {
      success: false,
      message: response.error,
    }
  }
  const cookieStore = await cookies()
  cookieStore.set('token', response.token)
  redirect('/admin')
  return {
    success: true,
    message: `Login successful`,
  }
}

export async function logout(prevState: unknown, formData: unknown) {
  ;(await cookies()).delete('token')
  redirect('/')
}

export async function addBlog(prevState: unknown, formData: unknown) {
  console.log('hello')
  let raw = Object.fromEntries(formData as FormData)

  const { url, error } = await uploadImage(
    'profile_pictures',
    raw.title,
    raw.thumbnail,
    'pictures',
  )

  if (error) {
    console.log('error image: ', error)
    return {
      success: false,
      message: 'Error uploading image',
    }
  }

  raw.cover = url
  console.log('raw', raw)

  const response = await post_with_token('admin/add_blog', raw)
  if (response.error) {
    return {
      success: false,
      message: response.error,
    }
  }

  return {
    success: true,
    message: `Blog ${raw.title} created successfully`,
  }
}
