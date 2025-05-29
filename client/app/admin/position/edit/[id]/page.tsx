import EditPosition from '../../../../../components/edit-position'
import { getJobById } from '../../../../../lib/job'

export default async function EditPositionPage({
  params,
}: {
  params: { id: string }
}) {
  const job = await getJobById((await params).id)
  return <EditPosition position={job} />
}
