import { Hono } from 'hono'
import { addPosition } from '../controllers/adminController'

const route = new Hono()

route.post('/add_position', addPosition)

export default route
