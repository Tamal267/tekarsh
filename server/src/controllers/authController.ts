import { sign as JwtSign } from 'hono/jwt'
import sql from '../db'

export const adminSignUp = async (c: any) => {
  const { name, email, phone, password } = await c.req.json()
  console.log(
    'name',
    name,
    'email',
    email,
    'phone',
    phone,
    'password',
    password,
  )
  if (!name || !email || !phone || !password) {
    return c.json({ error: 'All fields are required' }, 400)
  }
  try {
    const hash = await Bun.password.hash(password)
    const result =
      await sql`insert into admin (name, email, phone, password) values (${name}, ${email}, ${phone}, ${hash}) returning *`
    return c.json({
      success: true,
      message: 'User created successfully',
      user: result[0],
    })
  } catch (error: any) {
    console.error('Error during sign up:', error)
    return c.json({ error: 'Something went wrong' }, 500)
  }
}

export const adminLogin = async (c: any) => {
  const { email, password } = await c.req.json()
  try {
    const result = await sql`select * from admin where email = ${email}`
    if (result.length === 0) {
      return c.json({ error: 'Invalid email or password' }, 400)
    }
    const isMatch = await Bun.password.verify(password, result[0].password)
    if (!isMatch) {
      return c.json({ error: 'Invalid email or password' }, 400)
    }
    const secret = process.env.SECRET
    if (!secret) {
      console.log('JWT secret is not defined')
      return c.json({ error: 'Internal server error' }, 500)
    }
    const token = await JwtSign({ email, id: result[0].id }, secret)
    return c.json({ result, token })
  } catch (error) {
    console.log(error)
    return c.json({ error: 'Something went wrong' }, 400)
  }
}
