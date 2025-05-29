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

export const getJobApplications = async (c: any) => {
  try {
    const result =
      await sql`select ja.*, op.title, op.location, op.details, op.salary, op.description, op.worktype, op.department from job_applications ja
join open_positions op on ja.job_id = op.id
order by ja.created_at desc`
    return c.json({ result })
  } catch (error: any) {
    console.error('Error fetching job applications:', error)
    return c.json({ error: 'Something went wrong' }, 500)
  }
}

export const filterJobApplications = async (c: any) => {
  const { title, department, location, status } = await c.req.json()
  console.log(
    'title',
    title,
    'department',
    department,
    'location',
    location,
    'status',
    status,
  )
  try {
    const result =
      await sql`select ja.*, op.title, op.location, op.details, op.salary, op.description, op.worktype, op.department from job_applications ja
  join open_positions op on ja.job_id = op.id
  where (lower(op.title) like lower(${title}) or lower(ja.name) like lower(${title}))
  and lower(op.department) like lower(${department})
  and lower(op.location) like lower(${location})
  and lower(ja.status) like lower(${status})
  order by ja.created_at desc`
    return c.json({ result })
  } catch (error: any) {
    console.error('Error fetching job applications:', error)
    return c.json({ error: 'Something went wrong' }, 500)
  }
}
