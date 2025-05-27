import BlogManagement from '../../../components/admin-blog-manage'
import { getAllBlogs } from '../../../lib/blog'

export default async function BlogManagementPage() {
  const allBlogs = await getAllBlogs('', '')
  return <BlogManagement allBlogs={allBlogs} />
}
