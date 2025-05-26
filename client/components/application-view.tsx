'use client'

import { AIAnalysisModal } from '@/components/ai-analysis-modal'
import { CVModal } from '@/components/cv-modal'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table'
import {
  Brain,
  Calendar,
  FileText,
  Mail,
  MapPin,
  Phone,
  Search,
} from 'lucide-react'
import { useMemo, useState } from 'react'

// Mock data for job applications
const mockApplications = [
  {
    id: '1',
    applicantName: 'John Smith',
    email: 'john.smith@email.com',
    phone: '+1 (555) 123-4567',
    jobTitle: 'Senior React Developer',
    department: 'Engineering',
    location: 'Remote',
    appliedDate: '2024-01-15',
    status: 'new',
    coverLetter:
      'I am excited to apply for the Senior React Developer position at Tekarsh. With over 5 years of experience in frontend development and a strong background in React.js, I believe I would be a valuable addition to your team.',
    cvUrl: '/placeholder-cv.pdf',
    aiAnalysis: {
      score: 85,
      strengths: [
        '5+ years of React.js experience',
        'Strong TypeScript skills',
        'Leadership experience',
        'Full-stack capabilities',
      ],
      weaknesses: [
        'Limited experience with testing frameworks',
        'No mention of cloud platforms',
      ],
      recommendation:
        'Strong candidate with excellent technical skills and leadership experience. Recommend for technical interview.',
    },
  },
  {
    id: '2',
    applicantName: 'Sarah Johnson',
    email: 'sarah.johnson@email.com',
    phone: '+1 (555) 234-5678',
    jobTitle: 'UX Designer',
    department: 'Design',
    location: 'San Francisco',
    appliedDate: '2024-01-14',
    status: 'reviewed',
    coverLetter:
      'As a passionate UX Designer with 4 years of experience creating user-centered designs, I am thrilled to apply for the UX Designer position at Tekarsh.',
    cvUrl: '/placeholder-cv.pdf',
    aiAnalysis: {
      score: 78,
      strengths: [
        '4 years of UX design experience',
        'Enterprise software background',
        'Strong portfolio',
        'User research skills',
      ],
      weaknesses: [
        'Limited experience with design systems',
        'No mention of A/B testing',
      ],
      recommendation:
        'Good candidate with solid UX fundamentals. Portfolio review recommended.',
    },
  },
  {
    id: '3',
    applicantName: 'Michael Chen',
    email: 'michael.chen@email.com',
    phone: '+1 (555) 345-6789',
    jobTitle: 'DevOps Engineer',
    department: 'Engineering',
    location: 'Remote',
    appliedDate: '2024-01-13',
    status: 'shortlisted',
    coverLetter:
      'I am writing to express my interest in the DevOps Engineer position at Tekarsh. With 6 years of experience in cloud infrastructure, automation, and CI/CD pipelines.',
    cvUrl: '/placeholder-cv.pdf',
    aiAnalysis: {
      score: 92,
      strengths: [
        '6+ years of DevOps experience',
        'Strong cloud platform knowledge',
        'Infrastructure as Code expertise',
        'Security-focused approach',
      ],
      weaknesses: ['Limited experience with multi-cloud environments'],
      recommendation:
        'Excellent candidate with comprehensive DevOps skills. Highly recommend for interview.',
    },
  },
  {
    id: '4',
    applicantName: 'Emily Davis',
    email: 'emily.davis@email.com',
    phone: '+1 (555) 456-7890',
    jobTitle: 'Product Designer',
    department: 'Design',
    location: 'New York',
    appliedDate: '2024-01-12',
    status: 'new',
    coverLetter:
      'I am excited to apply for the Product Designer role at Tekarsh. With 3 years of experience in product design and a background in both B2B and B2C products.',
    cvUrl: '/placeholder-cv.pdf',
    aiAnalysis: {
      score: 72,
      strengths: [
        '3 years of product design experience',
        'B2B and B2C experience',
        'User research skills',
        'Technical understanding',
      ],
      weaknesses: [
        'Limited senior-level experience',
        'No mention of design systems',
        'Portfolio needs more depth',
      ],
      recommendation:
        'Promising junior-to-mid level candidate. Good for growing teams.',
    },
  },
  {
    id: '5',
    applicantName: 'David Wilson',
    email: 'david.wilson@email.com',
    phone: '+1 (555) 567-8901',
    jobTitle: 'Backend Engineer',
    department: 'Engineering',
    location: 'Remote',
    appliedDate: '2024-01-11',
    status: 'rejected',
    coverLetter:
      'I would like to apply for the Backend Engineer position at Tekarsh. I have 2 years of experience working with Node.js and Python, building REST APIs.',
    cvUrl: '/placeholder-cv.pdf',
    aiAnalysis: {
      score: 58,
      strengths: [
        '2 years of backend experience',
        'Multiple programming languages',
        'Database experience',
        'Eager to learn',
      ],
      weaknesses: [
        'Limited experience for senior role',
        'No mention of testing practices',
        'Lacks system design knowledge',
        'No experience with microservices',
      ],
      recommendation:
        'Junior level candidate. May be suitable for entry-level positions with mentorship.',
    },
  },
]

const departments = [
  'All Departments',
  'Engineering',
  'Design',
  'Marketing',
  'Product',
  'Sales',
]
const locations = [
  'All Locations',
  'Remote',
  'San Francisco',
  'New York',
  'London',
  'Austin',
]
const statuses = [
  'All Status',
  'new',
  'reviewed',
  'shortlisted',
  'rejected',
  'invited',
]

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

export default function ApplicationsPage() {
  const [searchTerm, setSearchTerm] = useState('')
  const [selectedDepartment, setSelectedDepartment] =
    useState('All Departments')
  const [selectedLocation, setSelectedLocation] = useState('All Locations')
  const [selectedStatus, setSelectedStatus] = useState('All Status')
  const [applications, setApplications] = useState(mockApplications)
  const [selectedApplication, setSelectedApplication] = useState<any>(null)
  const [showCvModal, setShowCvModal] = useState(false)
  const [showAiAnalysisModal, setShowAiAnalysisModal] = useState(false)

  // Filter applications based on search and filters
  const filteredApplications = useMemo(() => {
    return applications.filter((application) => {
      const matchesSearch =
        application.jobTitle.toLowerCase().includes(searchTerm.toLowerCase()) ||
        application.applicantName
          .toLowerCase()
          .includes(searchTerm.toLowerCase())
      const matchesDepartment =
        selectedDepartment === 'All Departments' ||
        application.department === selectedDepartment
      const matchesLocation =
        selectedLocation === 'All Locations' ||
        application.location === selectedLocation
      const matchesStatus =
        selectedStatus === 'All Status' || application.status === selectedStatus

      return (
        matchesSearch && matchesDepartment && matchesLocation && matchesStatus
      )
    })
  }, [
    searchTerm,
    selectedDepartment,
    selectedLocation,
    selectedStatus,
    applications,
  ])

  const handleStatusChange = (applicationId: string, newStatus: string) => {
    setApplications((prev) =>
      prev.map((app) =>
        app.id === applicationId ? { ...app, status: newStatus } : app,
      ),
    )
  }

  const handleInvite = (applicationId: string) => {
    handleStatusChange(applicationId, 'invited')
    alert('Invitation sent successfully!')
  }

  const handleViewCv = (application: any) => {
    setSelectedApplication(application)
    setShowCvModal(true)
  }

  const handleViewAiAnalysis = (application: any) => {
    setSelectedApplication(application)
    setShowAiAnalysisModal(true)
  }

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-6">
          <h1 className="text-2xl font-bold text-gray-800">Job Applications</h1>
          <p className="text-gray-600">Manage and review applications</p>
        </div>

        {/* Filters */}
        <Card className="mb-6">
          <CardHeader>
            <CardTitle>Filters</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
              {/* Search */}
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                <Input
                  placeholder="Search..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10"
                />
              </div>

              {/* Department Filter */}
              <Select
                value={selectedDepartment}
                onValueChange={setSelectedDepartment}
              >
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {departments.map((dept) => (
                    <SelectItem
                      key={dept}
                      value={dept}
                    >
                      {dept}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>

              {/* Location Filter */}
              <Select
                value={selectedLocation}
                onValueChange={setSelectedLocation}
              >
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {locations.map((location) => (
                    <SelectItem
                      key={location}
                      value={location}
                    >
                      {location}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>

              {/* Status Filter */}
              <Select
                value={selectedStatus}
                onValueChange={setSelectedStatus}
              >
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {statuses.map((status) => (
                    <SelectItem
                      key={status}
                      value={status}
                    >
                      {status === 'All Status'
                        ? status
                        : status.charAt(0).toUpperCase() + status.slice(1)}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>

              {/* Results Count */}
              <div className="flex items-center text-sm text-gray-600">
                {filteredApplications.length} results
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Applications Table */}
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
                  {filteredApplications.map((application) => (
                    <TableRow key={application.id}>
                      <TableCell>
                        <div>
                          <div className="font-medium">
                            {application.applicantName}
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
                            {application.jobTitle}
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
                            application.appliedDate,
                          ).toLocaleDateString()}
                        </div>
                      </TableCell>
                      <TableCell>
                        <div className="flex items-center gap-2">
                          <Badge className={getStatusColor(application.status)}>
                            {application.status.charAt(0).toUpperCase() +
                              application.status.slice(1)}
                          </Badge>
                          <Select
                            value={application.status}
                            onValueChange={(value) =>
                              handleStatusChange(application.id, value)
                            }
                          >
                            <SelectTrigger className="w-24 h-8">
                              <SelectValue />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="new">New</SelectItem>
                              <SelectItem value="reviewed">Reviewed</SelectItem>
                              <SelectItem value="shortlisted">
                                Shortlisted
                              </SelectItem>
                              <SelectItem value="rejected">Rejected</SelectItem>
                              <SelectItem value="invited">Invited</SelectItem>
                            </SelectContent>
                          </Select>
                        </div>
                      </TableCell>
                      <TableCell>
                        <div className="flex gap-1">
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={() => handleViewCv(application)}
                          >
                            <FileText className="h-3 w-3" />
                          </Button>
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={() => handleViewAiAnalysis(application)}
                          >
                            <Brain className="h-3 w-3" />
                          </Button>
                          <Button
                            size="sm"
                            className="bg-green-600 hover:bg-green-700"
                            onClick={() => handleInvite(application.id)}
                            disabled={
                              application.status === 'rejected' ||
                              application.status === 'invited'
                            }
                          >
                            Invite
                          </Button>
                        </div>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>

            {filteredApplications.length === 0 && (
              <div className="text-center py-8">
                <p className="text-gray-500">No applications found.</p>
              </div>
            )}
          </CardContent>
        </Card>

        {/* Modals */}
        <CVModal
          isOpen={showCvModal}
          onClose={() => setShowCvModal(false)}
          application={selectedApplication}
        />

        <AIAnalysisModal
          isOpen={showAiAnalysisModal}
          onClose={() => setShowAiAnalysisModal(false)}
          application={selectedApplication}
        />
      </div>
    </div>
  )
}
