import sql from '../db'
import { sendEmail } from '../sendEmail'

export const addPosition = async (c: any) => {
  const {
    title,
    location,
    worktype,
    department,
    salary,
    description,
    details,
  } = await c.req.json()

  console.log(
    'title',
    title,
    'location',
    location,
    'worktype',
    worktype,
    'department',
    department,
    'salary',
    salary,
    'description',
    description,
    'details',
    details,
  )

  try {
    const result =
      await sql`insert into open_positions (title, location, worktype, department, salary, description, details) values (${title}, ${location}, ${worktype}, ${department}, ${salary}, ${description}, ${details}) returning *`
    return c.json({ result })
  } catch (error: any) {
    console.log(error)
    return c.json({ error: 'Something wrong' }, 400)
  }
}

export const deletePosition = async (c: any) => {
  const { id } = await c.req.json()
  console.log('id', id)
  if (!id) {
    return c.json({ error: 'ID is required' }, 400)
  }
  try {
    const result =
      await sql`delete from open_positions where id = ${id} returning *`
    if (result.length === 0) {
      return c.json({ error: 'Position not found' }, 404)
    }
    return c.json({
      success: true,
      message: 'Position deleted successfully',
      result: result[0],
    })
  } catch (error: any) {
    console.error('Error deleting position:', error)
    return c.json({ error: 'Something went wrong' }, 500)
  }
}

export const editPosition = async (c: any) => {
  const {
    id,
    title,
    location,
    worktype,
    department,
    salary,
    description,
    details,
  } = await c.req.json()

  console.log(
    'id',
    id,
    'title',
    title,
    'location',
    location,
    'worktype',
    worktype,
    'department',
    department,
    'salary',
    salary,
    'description',
    description,
    'details',
    details,
  )

  if (!id) {
    return c.json({ error: 'ID is required' }, 400)
  }

  try {
    const result =
      await sql`update open_positions set title = ${title}, location = ${location}, worktype = ${worktype}, department = ${department}, salary = ${salary}, description = ${description}, details = ${details} where id = ${id} returning *`

    if (result.length === 0) {
      return c.json({ error: 'Position not found' }, 404)
    }

    return c.json({
      success: true,
      message: 'Position updated successfully',
      result: result[0],
    })
  } catch (error: any) {
    console.error('Error updating position:', error)
    return c.json({ error: 'Something went wrong' }, 500)
  }
}

export const changeStatus = async (c: any) => {
  const { id, status } = await c.req.json()
  console.log('id', id, 'status', status)

  if (!id || !status) {
    return c.json({ error: 'ID and status are required' }, 400)
  }

  try {
    const result =
      await sql`update job_applications set status = ${status} where id = ${id} returning *`
    if (result.length === 0) {
      return c.json({ error: 'Application not found' }, 404)
    }
    return c.json({
      success: true,
      message: 'Status updated successfully',
      result: result[0],
    })
  } catch (error: any) {
    console.error('Error updating application status:', error)
    return c.json({ error: 'Something went wrong' }, 500)
  }
}

export const sendInvitation = async (c: any) => {
  const { id, email, text } = await c.req.json()
  console.log('id', id, 'email', email)

  if (!id || !email) {
    return c.json({ error: 'ID and email are required' }, 400)
  }

  try {
    const isSent = await sendEmail(
      email,
      `Invitation for Job ID: ${id}`,
      `You have been invited to apply for the job with ID: ${id}. ${
        text ? text : ''
      }`,
    )

    if (isSent) {
      const result =
        await sql`update job_applications set status = 'invited' where id = ${id} returning *`
      if (result.length === 0) {
        return c.json({ error: 'Application not found' }, 404)
      }
      return c.json({
        success: true,
        message: 'Invitation sent successfully',
        result: result[0],
      })
    }
    return c.json({ error: 'Failed to send invitation email' }, 500)
  } catch (error: any) {
    console.error('Error sending invitation:', error)
    return c.json({ error: 'Something went wrong' }, 500)
  }
}

export const createBlogPost = async (c: any) => {
  const { title, excerpt, category, content, tags, cover } = await c.req.json()

  let parsedTags
  try {
    parsedTags = typeof tags === 'string' ? JSON.parse(tags) : tags
  } catch (error) {
    return c.json({ error: 'Invalid tags format' }, 400)
  }

  try {
    const result =
      await sql`insert into blogs (title, excerpt, category, content, tags, cover) values (${title}, ${excerpt}, ${category}, ${content}, ${parsedTags}, ${cover}) returning *`
    return c.json({
      success: true,
      message: 'Blog post created successfully',
      result: result[0],
    })
  } catch (error: any) {
    console.error('Error creating blog post:', error)
    return c.json({ error: 'Something went wrong' }, 500)
  }
}
