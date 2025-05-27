import sql from '../db'

export const getAllBlogs = async (c: any) => {
  const { title, category } = await c.req.json()
  try {
    const result = await sql`select * from blogs 
    where lower(title) like lower(${title}) and
    lower(category) like lower(${category})
    order by created_at desc`
    return c.json({ result })
  } catch (error: any) {
    console.error('Error fetching blog details:', error)
    return c.json({ error: 'Something went wrong' }, 500)
  }
}

export const getBlogById = async (c: any) => {
  const { id } = await c.req.json()
  console.log('id', id)
  if (!id) {
    return c.json({ error: 'Blog ID is required' }, 400)
  }

  try {
    const result = await sql`select * from blogs where id = ${id}`
    if (result.length === 0) {
      return c.json({ error: 'Blog not found' }, 404)
    }
    return c.json({ result: result[0] })
  } catch (error: any) {
    console.error('Error fetching blog details:', error)
    return c.json({ error: 'Something went wrong' }, 500)
  }
}
