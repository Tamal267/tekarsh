export const departments = [
  'Engineering',
  'Design',
  'Marketing',
  'Product',
  'Sales',
]
export const locations = [
  'Remote',
  'San Francisco',
  'New York',
  'London',
  'Austin',
]
export const statuses = [
  'new',
  'reviewed',
  'shortlisted',
  'rejected',
  'invited',
]

export function calculateReadTime(text: string): string {
  const wordsPerMinute = 200
  const words = text.trim().split(/\s+/).length
  const minutes = Math.ceil(words / wordsPerMinute)
  return `${minutes} min read`
}