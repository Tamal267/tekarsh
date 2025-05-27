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
import { getAiAnalysis } from '../lib/job'

// Enhanced mock data for job applications with detailed AI analysis
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
    priority: 'high',
    experience: '5+ years',
    salary: '$120,000',
    rating: 4.5,
    notes: 'Strong technical background, good communication skills',
    tags: ['React', 'TypeScript', 'Leadership'],
    lastActivity: '2024-01-16',
    source: 'LinkedIn',
    coverLetter:
      'I am excited to apply for the Senior React Developer position at Tekarsh. With over 5 years of experience in frontend development and a strong background in React.js, I believe I would be a valuable addition to your team. I have successfully led multiple projects from conception to deployment, working closely with cross-functional teams to deliver high-quality web applications.',
    cvUrl: '/placeholder-cv.pdf',
    analysis: {
      'Full Name': 'John Smith',
      Email: 'john.smith@email.com',
      'Phone Number': '+1 (555) 123-4567',
      'Key Skills': [
        'React',
        'TypeScript',
        'JavaScript',
        'Redux',
        'Next.js',
        'Node.js',
        'GraphQL',
        'Jest',
        'CSS',
        'HTML',
        'Git',
        'AWS',
      ],
      'Professional Experience':
        'Senior Frontend Developer at TechCorp (3 years); Frontend Developer at StartupXYZ (2 years); Led multiple React projects with team of 5+ developers; Implemented state management solutions using Redux and Context API',
      'Highest Education': {
        Degree: 'BSc in Computer Science',
        Institution: 'Stanford University',
      },
      'Overall Suitability': 'Highly suitable',
      Strengths: [
        '5+ years of professional React development experience',
        'Strong leadership and team management skills',
        'Extensive experience with state management libraries (Redux, Context API)',
        'Proven track record of delivering complex frontend applications',
        'Experience with testing frameworks (Jest, React Testing Library)',
        'Knowledge of modern development practices and CI/CD',
      ],
      Weaknesses: [
        'Limited experience with server-side rendering frameworks',
        'Could benefit from more experience with GraphQL',
        'No mention of mobile development experience',
      ],
      'Areas for Improvement': [
        'Gain experience with Next.js for server-side rendering',
        'Expand knowledge of GraphQL and Apollo Client',
        'Consider learning React Native for mobile development',
        'Stay updated with latest React features and best practices',
      ],
      'AI Confidence Score': 92,
      'AI Recommendation':
        'Highly recommended for this role. Candidate demonstrates excellent technical skills, leadership experience, and meets all core requirements for a Senior React Developer position. Strong fit for the team and role responsibilities.',
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
    priority: 'medium',
    experience: '4 years',
    salary: '$95,000',
    rating: 4.2,
    notes: 'Great portfolio, needs more enterprise experience',
    tags: ['Figma', 'User Research', 'Prototyping'],
    lastActivity: '2024-01-15',
    source: 'Company Website',
    coverLetter:
      'As a passionate UX Designer with 4 years of experience creating user-centered designs, I am thrilled to apply for the UX Designer position at Tekarsh. My background includes working with enterprise software, conducting user research, and creating intuitive interfaces that solve complex problems.',
    cvUrl: '/placeholder-cv.pdf',
    analysis: {
      'Full Name': 'Sarah Johnson',
      Email: 'sarah.johnson@email.com',
      'Phone Number': '+1 (555) 234-5678',
      'Key Skills': [
        'Figma',
        'Sketch',
        'Adobe XD',
        'User Research',
        'Prototyping',
        'Wireframing',
        'Usability Testing',
        'Design Systems',
        'HTML',
        'CSS',
      ],
      'Professional Experience':
        'UX Designer at DesignStudio (2 years); Junior UX Designer at CreativeAgency (2 years); Led user research initiatives for 3 major enterprise products; Created design systems used across multiple product teams',
      'Highest Education': {
        Degree: 'Master of Fine Arts in Interaction Design',
        Institution: 'Art Center College of Design',
      },
      'Overall Suitability': 'Suitable',
      Strengths: [
        '4 years of professional UX design experience',
        'Strong portfolio demonstrating user-centered design process',
        'Experience with enterprise software design',
        'Proficiency with industry-standard design tools',
        'User research and usability testing experience',
        'Design system creation and maintenance',
      ],
      Weaknesses: [
        'Limited experience with accessibility standards implementation',
        'Could benefit from more experience with A/B testing',
        'No mention of experience with design for mobile platforms',
      ],
      'Areas for Improvement': [
        'Deepen knowledge of accessibility standards (WCAG)',
        'Gain experience with A/B testing and data-driven design',
        'Expand mobile design expertise',
        'Learn basic front-end development skills',
      ],
      'AI Confidence Score': 78,
      'AI Recommendation':
        'Good candidate with solid UX fundamentals and relevant experience. Portfolio review recommended to assess design quality and process. Would benefit from additional training in accessibility and mobile design.',
    },
  },
  {
    id: '3',
    applicantName: 'Syed Mafijul Islam',
    email: 'syedtamal@gmail.com',
    phone: '+880 1660039763',
    jobTitle: 'Senior React Developer',
    department: 'Engineering',
    location: 'Remote',
    appliedDate: '2024-01-13',
    status: 'shortlisted',
    priority: 'medium',
    experience: '2 years',
    salary: '$75,000',
    rating: 3.2,
    notes:
      'Strong competitive programming background, lacks professional experience',
    tags: ['React', 'JavaScript', 'Competitive Programming'],
    lastActivity: '2024-01-14',
    source: 'University Career Fair',
    coverLetter:
      'I am writing to express my interest in the Senior React Developer position at Tekarsh. As a recent graduate with a strong foundation in computer science and hands-on experience with React through personal projects, I am eager to contribute to your development team.',
    cvUrl: '/placeholder-cv.pdf',
    analysis: {
      'Full Name': 'Syed Mafijul Islam',
      Email: 'syedtamal@gmail.com',
      'Phone Number': '+880 1660039763',
      'Key Skills': [
        'C',
        'C++',
        'JavaScript',
        'TypeScript',
        'SQL',
        'Bash',
        'Python',
        'Lua',
        'Assembly',
        'Arduino',
        'LaTex',
        'React',
        'NextJS',
        'Tailwind CSS',
        'NodeJs',
        'OracleDB',
        'Socket.io',
        'Leaflet',
        'Multer',
        'Java',
        'JavaFx',
        'HTML',
        'CSS',
      ],
      'Professional Experience':
        'Competitive Programming Committee Member and Instructor at MIST Computer Club; Event Management at MIST Cyber Security Club; Specialist at CodeForces; 3 Star at CodeChef; various projects using React, NodeJS, Java, Arduino, etc.',
      'Highest Education': {
        Degree: 'BSc in Computer Science and Engineering',
        Institution: 'Military Institute of Science and Technology',
      },
      'Overall Suitability': 'Not suitable',
      Strengths: [
        'Experience with React in personal projects',
        'Familiarity with other relevant technologies (NodeJS, TypeScript)',
        'Problem-solving skills (demonstrated through competitive programming)',
        'Strong foundation in computer science fundamentals',
        'Diverse technical skill set across multiple programming languages',
      ],
      Weaknesses: [
        'Lack of professional experience as a React developer (only personal projects)',
        'Insufficient years of experience (less than 3 years of professional React experience)',
        'Limited experience with state management libraries and other requirements',
        'No demonstrable experience with backend technologies or server-side rendering',
        'No experience working in professional development teams',
      ],
      'Areas for Improvement': [
        'Gain professional experience in React development',
        'Work on projects that showcase proficiency in state management libraries (Redux, MobX)',
        'Build a strong portfolio of professional React projects demonstrating skills mentioned in the job description',
        'Acquire experience with backend technologies',
        'Develop experience working in agile development environments',
      ],
      'AI Confidence Score': 85,
      'AI Recommendation':
        'Not suitable for this senior role. While the candidate shows promise with personal projects utilizing React and related technologies, their lack of substantial professional experience and insufficient experience with many required skills makes them unsuitable for a Senior React Developer position. Consider for junior/entry-level positions with mentorship.',
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
    priority: 'low',
    experience: '3 years',
    salary: '$85,000',
    rating: 3.8,
    notes: 'Junior level, good potential for growth',
    tags: ['Product Design', 'Figma', 'User Testing'],
    lastActivity: '2024-01-12',
    source: 'Indeed',
    coverLetter:
      'I am excited to apply for the Product Designer role at Tekarsh. With 3 years of experience in product design and a background in both B2B and B2C products, I bring a unique perspective to user experience design.',
    cvUrl: '/placeholder-cv.pdf',
    analysis: {
      'Full Name': 'Emily Davis',
      Email: 'emily.davis@email.com',
      'Phone Number': '+1 (555) 456-7890',
      'Key Skills': [
        'Product Design',
        'User Interface (UI) Design',
        'User Experience (UX) Design',
        'Wireframing',
        'Prototyping',
        'User Research',
        'Usability Testing',
        'Interaction Design',
        'Information Architecture',
        'Visual Design',
        'Design Thinking',
        'Figma',
        'Sketch',
        'Adobe XD',
        'InVision',
        'HTML',
        'CSS',
        'JavaScript',
      ],
      'Professional Experience':
        'Product Designer at StartupCo (2 years); Junior Designer at AgencyX (1 year); Led design for 2 major product releases; Conducted user research and usability testing; Created wireframes, prototypes, and visual designs',
      'Highest Education': {
        Degree: 'Bachelor of Design (BDes)',
        Institution: 'Rhode Island School of Design',
      },
      'Overall Suitability': 'Suitable with potential',
      Strengths: [
        '3 years of product design experience',
        'Experience in both B2B and B2C product design',
        'Proficiency in user research and usability testing',
        'Strong skills in wireframing, prototyping, and visual design',
        'Familiarity with design tools such as Figma, Sketch, and Adobe XD',
        'Understanding of design thinking principles',
      ],
      Weaknesses: [
        'Limited experience in leading design projects',
        'Could benefit from more experience in design strategy',
        'No mention of experience in design systems',
        'No experience in designing for mobile platforms',
        'No experience in designing for accessibility',
      ],
      'Areas for Improvement': [
        'Gain experience in leading design projects',
        'Develop skills in design strategy',
        'Learn about design systems and how to contribute to them',
        'Gain experience in designing for mobile platforms',
        'Learn about accessibility standards and how to design for accessibility',
      ],
      'AI Confidence Score': 75,
      'AI Recommendation':
        'Suitable candidate with potential for growth. Good foundation in product design and user research. Needs to develop skills in design strategy, design systems, mobile design, and accessibility. Consider for junior-to-mid-level positions with mentorship.',
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
    priority: 'low',
    experience: '2 years',
    salary: '$75,000',
    rating: 2.5,
    notes: 'Insufficient experience for senior role',
    tags: ['Node.js', 'Python', 'MongoDB'],
    lastActivity: '2024-01-11',
    source: 'Company Website',
    coverLetter:
      'I would like to apply for the Backend Engineer position at Tekarsh. I have 2 years of experience working with Node.js and Python, building REST APIs and working with databases.',
    cvUrl: '/placeholder-cv.pdf',
    analysis: {
      'Full Name': 'David Wilson',
      Email: 'david.wilson@email.com',
      'Phone Number': '+1 (555) 567-8901',
      'Key Skills': [
        'Node.js',
        'Python',
        'JavaScript',
        'REST APIs',
        'Databases',
        'MongoDB',
        'SQL',
        'Express.js',
        'Django',
        'Flask',
        'Git',
        'Docker',
        'AWS',
        'Linux',
      ],
      'Professional Experience':
        'Backend Engineer at SmallTech (1 year); Junior Developer at WebDevCo (1 year); Built REST APIs using Node.js and Express.js; Worked with MongoDB and SQL databases; Deployed applications to AWS',
      'Highest Education': {
        Degree: 'Bachelor of Science in Computer Science',
        Institution: 'University of California, Berkeley',
      },
      'Overall Suitability': 'Not suitable',
      Strengths: [
        '2 years of backend engineering experience',
        'Experience with Node.js and Python',
        'Experience building REST APIs',
        'Experience working with MongoDB and SQL databases',
        'Familiarity with Git, Docker, and AWS',
        'Understanding of Linux',
      ],
      Weaknesses: [
        'Insufficient experience for senior role',
        'No experience with microservices',
        'No experience with distributed systems',
        'No experience with cloud-native technologies',
        'No experience with DevOps practices',
      ],
      'Areas for Improvement': [
        'Gain experience with microservices',
        'Learn about distributed systems',
        'Learn about cloud-native technologies',
        'Develop DevOps skills',
        'Contribute to open-source projects',
        'Obtain certifications in cloud technologies',
      ],
      'AI Confidence Score': 65,
      'AI Recommendation':
        'Not suitable for senior role. Insufficient experience and skills for a senior backend engineer position. May be suitable for junior-level positions with mentorship and training.',
    },
  },
  {
    id: '6',
    applicantName: 'Lisa Rodriguez',
    email: 'lisa.rodriguez@email.com',
    phone: '+1 (555) 678-9012',
    jobTitle: 'Frontend Developer',
    department: 'Engineering',
    location: 'Austin',
    appliedDate: '2024-01-10',
    status: 'invited',
    priority: 'high',
    experience: '4 years',
    salary: '$105,000',
    rating: 4.3,
    notes: 'Strong React skills, good team player',
    tags: ['React', 'Vue.js', 'CSS', 'JavaScript'],
    lastActivity: '2024-01-11',
    source: 'GitHub',
    coverLetter:
      'I am interested in the Frontend Developer position at Tekarsh. With 4 years of experience in modern frontend technologies, I have built responsive and performant web applications.',
    cvUrl: '/placeholder-cv.pdf',
    analysis: {
      'Full Name': 'Lisa Rodriguez',
      Email: 'lisa.rodriguez@email.com',
      'Phone Number': '+1 (555) 678-9012',
      'Key Skills': [
        'React',
        'Vue.js',
        'JavaScript',
        'HTML',
        'CSS',
        'Responsive Design',
        'UI/UX Design',
        'Git',
        'Webpack',
        'Babel',
        'Jest',
        'Enzyme',
        'Redux',
        'Vuex',
        'Node.js',
        'Express.js',
      ],
      'Professional Experience':
        'Frontend Developer at WebSolutions (2 years); UI Developer at TechStart (2 years); Developed responsive web applications using React and Vue.js; Implemented UI/UX designs; Wrote unit tests using Jest and Enzyme',
      'Highest Education': {
        Degree: 'Bachelor of Science in Computer Science',
        Institution: 'University of Texas at Austin',
      },
      'Overall Suitability': 'Highly suitable',
      Strengths: [
        '4 years of frontend development experience',
        'Proficiency in React and Vue.js',
        'Strong skills in HTML, CSS, and JavaScript',
        'Experience with responsive design',
        'Understanding of UI/UX design principles',
        'Experience with Git, Webpack, and Babel',
        'Experience with Jest and Enzyme',
        'Familiarity with Redux and Vuex',
        'Knowledge of Node.js and Express.js',
      ],
      Weaknesses: [
        'No experience with mobile development',
        'No experience with server-side rendering',
        'No experience with GraphQL',
      ],
      'Areas for Improvement': [
        'Learn about mobile development',
        'Learn about server-side rendering',
        'Learn about GraphQL',
        'Contribute to open-source projects',
        'Obtain certifications in frontend technologies',
      ],
      'AI Confidence Score': 88,
      'AI Recommendation':
        'Highly suitable candidate for frontend developer position. Strong skills in React, Vue.js, HTML, CSS, and JavaScript. Experience with responsive design, UI/UX design, Git, Webpack, Babel, Jest, Enzyme, Redux, Vuex, Node.js, and Express.js. Needs to develop skills in mobile development, server-side rendering, and GraphQL.',
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

export default function ApplicationsPage({ all_applications }) {
  const [searchTerm, setSearchTerm] = useState('')
  const [selectedDepartment, setSelectedDepartment] =
    useState('All Departments')
  const [selectedLocation, setSelectedLocation] = useState('All Locations')
  const [selectedStatus, setSelectedStatus] = useState('All Status')
  const [applications, setApplications] = useState(all_applications)
  const [selectedApplication, setSelectedApplication] = useState<any>(null)
  const [showCvModal, setShowCvModal] = useState(false)
  const [showAiAnalysisModal, setShowAiAnalysisModal] = useState(false)

  // Filter applications based on search and filters
  const filteredApplications = useMemo(() => {
    return applications.filter((application) => {
      const matchesSearch =
        application.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
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
    const fetchAnalysis = async () => {
      try {
        const response = await getAiAnalysis({
          pdfUrl: application.cv,
          details: application.analysis,
        })

        console.debug('AI analysis response:', response)
        if (response.error) {
          console.error('Error fetching AI analysis:', response.error)
          alert('Failed to fetch AI analysis. Please try again later.')
          return
        }

        setSelectedApplication({
          ...application,
          analysis: response.analysis,
        })
      } catch (error) {
        console.error('Exception during AI analysis fetch:', error)
        alert('An unexpected error occurred while fetching the analysis.')
      }
    }
    fetchAnalysis()

    setSelectedApplication(application)
    setShowAiAnalysisModal(true)
  }

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-7xl w-full mx-auto">
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
                          <div className="font-medium">{application.name}</div>
                          <div className="text-sm text-gray-500 flex items-center">
                            <MapPin className="h-3 w-3 mr-1" />
                            {application.location}
                          </div>
                        </div>
                      </TableCell>
                      <TableCell>
                        <div>
                          <div className="font-medium">{application.title}</div>
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
