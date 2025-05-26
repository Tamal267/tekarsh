import sql from '../db'

export const getAllJobs = async (c: any) => {
  try {
    const result =
      await sql`select * from open_positions order by created_at desc`
    return c.json({ result })
  } catch (error: any) {
    console.error('Error fetching job details:', error)
    return c.json({ error: 'Something went wrong' }, 500)
  }
}

export const getJobById = async (c: any) => {
  const { id } = await c.req.json()
  console.log('id', id)
  if (!id) {
    return c.json({ error: 'Job ID is required' }, 400)
  }

  try {
    const result = await sql`select * from open_positions where id = ${id}`
    if (result.length === 0) {
      return c.json({ error: 'Job not found' }, 404)
    }
    return c.json({ result: result[0] })
  } catch (error: any) {
    console.error('Error fetching job details:', error)
    return c.json({ error: 'Something went wrong' }, 500)
  }
}

export const jobApplicationForm = async (c: any) => {
  const { name, email, phone, cover, cv, job_id } = await c.req.json()

  console.log(
    'name',
    name,
    'email',
    email,
    'phone',
    phone,
    'cover',
    cover,
    'cv',
    cv,
    'job_id',
    job_id,
  )

  try {
    const result =
      await sql`insert into job_applications (name, email, phone, cover, cv, job_id) values (${name}, ${email}, ${phone}, ${cover}, ${cv}, ${job_id}) returning *`

    return c.json({
      success: true,
      message: 'Application submitted successfully',
      result,
    })
  } catch (error: any) {
    console.error('Error submitting job application:', error)
    return c.json({ error: 'Something went wrong' }, 500)
  }
}
