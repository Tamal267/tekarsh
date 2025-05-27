import { Badge } from '@/components/ui/badge'
import { Card, CardContent } from '@/components/ui/card'
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table'
import { Calendar, Mail, MapPin, Phone } from 'lucide-react'
import { Suspense } from 'react'
import { AIAnalysisModal } from '../../../components/ai-analysis-modal'
import ApplicationFilter from '../../../components/applications-filter'
import ChangeStatus from '../../../components/change-status'
import { CVModal } from '../../../components/cv-modal'
import Invitation from '../../../components/send-invitation'
import { getJobApplications } from '../../../lib/job'

const getStatusColor = (status: string) => {
  switch (status) {
    case 'new':
      return 'bg-blue-100 text-blue-800'
    case 'reviewed':
      return 'bg-yellow-100 text-yellow-800'
    case 'shortlisted':
      return 'bg-green-100 text-green-800'
    case 'rejected':
      return 'bg-red-100 text-red-800'
    case 'invited':
      return 'bg-purple-100 text-purple-800'
    default:
      return 'bg-gray-100 text-gray-800'
  }
}

export default async function ApplicationsPage({ searchParams }) {
  const _sp = await searchParams
  const __title = _sp.title || ''
  const __department = _sp.department || ''
  const __location = _sp.location || ''
  const __status = _sp.status || ''
  const applications = await getJobApplications(
    __title,
    __department,
    __location,
    __status,
  )

  return (
    <div className="bg-gray-50 md:p-6">
      <div className="max-w-7xl w-full mx-auto">
        {/* Header */}
        <div className="mb-6">
          <h1 className="text-2xl font-bold text-gray-800">Job Applications</h1>
          <p className="text-gray-600">Manage and review applications</p>
        </div>

        {/* Filters */}
        <ApplicationFilter
          __title={__title}
          __department={__department}
          __location={__location}
          __status={__status}
        />

        {/* Applications Table */}
        <Suspense
          fallback={
            <div className="text-gray-500">Loading applications...</div>
          }
        >
          <Card>
            <CardContent className="p-4">
              <div className="overflow-x-auto">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Applicant</TableHead>
                      <TableHead>Position</TableHead>
                      <TableHead>Contact</TableHead>
                      <TableHead>Applied</TableHead>
                      <TableHead>Status</TableHead>
                      <TableHead>Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {applications.map((application) => (
                      <TableRow key={application.id}>
                        <TableCell>
                          <div>
                            <div className="font-medium">
                              {application.name}
                            </div>
                            <div className="text-sm text-gray-500 flex items-center">
                              <MapPin className="h-3 w-3 mr-1" />
                              {application.location}
                            </div>
                          </div>
                        </TableCell>
                        <TableCell>
                          <div>
                            <div className="font-medium">
                              {application.title}
                            </div>
                            <div className="text-sm text-gray-500">
                              {application.department}
                            </div>
                          </div>
                        </TableCell>
                        <TableCell>
                          <div className="space-y-1">
                            <div className="flex items-center text-sm">
                              <Mail className="h-3 w-3 mr-1 text-gray-400" />
                              {application.email}
                            </div>
                            <div className="flex items-center text-sm">
                              <Phone className="h-3 w-3 mr-1 text-gray-400" />
                              {application.phone}
                            </div>
                          </div>
                        </TableCell>
                        <TableCell>
                          <div className="flex items-center text-sm">
                            <Calendar className="h-3 w-3 mr-1 text-gray-400" />
                            {new Date(
                              application.created_at,
                            ).toLocaleDateString()}
                          </div>
                        </TableCell>
                        <TableCell>
                          <div className="flex items-center gap-2">
                            <Badge
                              className={getStatusColor(application.status)}
                            >
                              {application.status.charAt(0).toUpperCase() +
                                application.status.slice(1)}
                            </Badge>
                            <ChangeStatus application={application} />
                          </div>
                        </TableCell>
                        <TableCell>
                          <div className="flex gap-1">
                            <CVModal application={application} />
                            <AIAnalysisModal application={application} />
                            <Invitation application={application} />
                          </div>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>

              {applications.length === 0 && (
                <div className="text-center py-8">
                  <p className="text-gray-500">No applications found.</p>
                </div>
              )}
            </CardContent>
          </Card>
        </Suspense>
      </div>
    </div>
  )
}
