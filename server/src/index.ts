import { Hono } from 'hono'
import { cors } from 'hono/cors'
import type { JwtVariables } from 'hono/jwt'
import { prettyJSON } from 'hono/pretty-json'
import { addPosition } from './controllers/adminController'
import { cvAnalyzer } from './controllers/apiController'
import {
  getAllJobs,
  getJobById,
  jobApplicationForm,
} from './controllers/jobController'

const app = new Hono<{ Variables: JwtVariables }>()

app.use(prettyJSON())
app.use('/*', cors())

app.use('/admin/add_position', addPosition)
app.get('/job/getall', getAllJobs)
app.post('job/getbyid', getJobById)
app.post('/job/application', jobApplicationForm)
app.post('/cv/anylyze', cvAnalyzer)

// Example route to demonstrate the API
app.get('/', (c) => {
  return c.json({ message: 'Welcome to the API' })
})

export default {
  port: process.env.PORT || 5000,
  fetch: app.fetch,
}
