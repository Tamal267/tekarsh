import { Hono } from 'hono'
import { cors } from 'hono/cors'
import { jwt, type JwtVariables } from 'hono/jwt'
import { prettyJSON } from 'hono/pretty-json'
import {
  addPosition,
  changeStatus,
  createBlogPost,
  deletePosition,
  editPosition,
  sendInvitation,
} from './controllers/adminController'
import { cvAnalyzer } from './controllers/apiController'
import { adminLogin, adminSignUp } from './controllers/authController'
import { getAllBlogs, getBlogById } from './controllers/blogController'
import {
  filterJobApplications,
  getAllJobs,
  getJobApplications,
  getJobById,
  jobApplicationForm,
} from './controllers/jobController'

const app = new Hono<{ Variables: JwtVariables }>()

app.use(prettyJSON())
app.use('/*', cors())

app.use(
  '/admin/*',
  jwt({
    secret: process.env.SECRET || '',
  }),
)

app.use('/admin/add_position', addPosition)
app.use('/admin/delete_position', deletePosition)
app.use('/admin/edit_position', editPosition)
app.post('/admin/change_status', changeStatus)
app.post('/admin/send_invitation', sendInvitation)
app.post('/admin/add_blog', createBlogPost)
app.post('/auth/admin_signup', adminSignUp)
app.post('/auth/admin_login', adminLogin)
app.get('/job/getall', getAllJobs)
app.post('job/getbyid', getJobById)
app.post('/job/application', jobApplicationForm)
app.post('/cv/anylyze', cvAnalyzer)
app.get('/job/getapplications', getJobApplications)
app.post('/job/filterjobs', filterJobApplications)
app.post('/blog/getall', getAllBlogs)
app.post('/blog/getbyid', getBlogById)

// Example route to demonstrate the API
app.get('/', (c) => {
  return c.json({ message: 'Welcome to the API' })
})

export default {
  port: process.env.PORT || 5000,
  fetch: app.fetch,
}
