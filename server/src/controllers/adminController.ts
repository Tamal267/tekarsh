import sql from '../db'

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
