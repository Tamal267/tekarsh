import JobDetailsClient from '@/components/job-details-client'
import { Suspense } from 'react'

// Mock data for job positions - in a real app, this would come from an API or CMS
export const jobPositions = {
  'senior-react-developer': {
    id: 'senior-react-developer',
    title: 'Senior React Developer',
    location: 'Remote',
    workType: 'Full-time',
    department: 'Engineering',
    salary: '$120,000 - $150,000',
    postedDate: '2023-05-01',
    description: `
# Senior React Developer

## About the Role

We're looking for a talented Senior React Developer to join our growing team. In this role, you'll be responsible for building and maintaining high-quality web applications using React and modern frontend technologies.

## Responsibilities

- Design and implement new features and functionality for our web applications
- Write clean, maintainable, and efficient code
- Collaborate with cross-functional teams to define, design, and ship new features
- Identify and address performance bottlenecks and bugs
- Participate in code reviews and mentor junior developers
- Stay up-to-date with emerging trends and technologies in frontend development

## Requirements

- 5+ years of experience in frontend development
- 3+ years of experience with React.js and its ecosystem
- Strong proficiency in JavaScript, HTML, and CSS
- Experience with state management libraries (Redux, MobX, etc.)
- Familiarity with modern frontend build pipelines and tools
- Experience with responsive design and cross-browser compatibility
- Strong problem-solving skills and attention to detail
- Excellent communication and collaboration skills

## Nice to Have

- Experience with TypeScript
- Knowledge of server-side rendering with Next.js
- Experience with testing frameworks (Jest, React Testing Library)
- Understanding of CI/CD pipelines
- Experience with GraphQL
- Contributions to open-source projects

## Benefits

- Competitive salary and equity package
- Flexible remote work policy
- Health, dental, and vision insurance
- 401(k) matching
- Professional development budget
- Home office stipend
- Unlimited PTO
- Regular team retreats

We are an equal opportunity employer and value diversity at our company. We do not discriminate on the basis of race, religion, color, national origin, gender, sexual orientation, age, marital status, veteran status, or disability status.
    `,
    relatedPositions: ['ux-designer', 'devops-engineer'],
  },
  'ux-designer': {
    id: 'ux-designer',
    title: 'UX Designer',
    location: 'San Francisco',
    workType: 'Full-time',
    department: 'Design',
    salary: '$100,000 - $130,000',
    postedDate: '2023-05-10',
    description: `
# UX Designer

## About the Role

We're seeking a talented UX Designer to create beautiful and intuitive user experiences for our enterprise software solutions. You'll work closely with product managers, developers, and other designers to craft exceptional user experiences.

## Responsibilities

- Create wireframes, prototypes, and high-fidelity mockups
- Conduct user research and usability testing
- Develop user flows, journey maps, and information architecture
- Collaborate with developers to ensure design implementation meets specifications
- Maintain and evolve our design system
- Stay current with UX trends and best practices

## Requirements

- 3+ years of experience in UX/UI design
- Strong portfolio demonstrating your design process and solutions
- Proficiency with design tools (Figma, Sketch, Adobe XD)
- Experience with prototyping tools
- Understanding of accessibility standards
- Excellent communication and presentation skills
- Ability to translate business requirements into user-centered designs

## Nice to Have

- Experience with design systems
- Knowledge of HTML, CSS, and JavaScript
- Background in enterprise software or B2B products
- Experience with animation and motion design
- Understanding of agile development methodologies

## Benefits

- Competitive salary and equity package
- Flexible remote work policy
- Health, dental, and vision insurance
- 401(k) matching
- Professional development budget
- Home office stipend
- Unlimited PTO
- Regular team retreats

We are an equal opportunity employer and value diversity at our company. We do not discriminate on the basis of race, religion, color, national origin, gender, sexual orientation, age, marital status, veteran status, or disability status.
    `,
    relatedPositions: ['senior-react-developer', 'product-designer'],
  },
  'devops-engineer': {
    id: 'devops-engineer',
    title: 'DevOps Engineer',
    location: 'Remote',
    workType: 'Full-time',
    department: 'Engineering',
    salary: '$110,000 - $140,000',
    postedDate: '2023-05-15',
    description: `
# DevOps Engineer

## About the Role

We're looking for a skilled DevOps Engineer to help us build and maintain robust infrastructure and deployment pipelines. You'll play a crucial role in ensuring our systems are reliable, scalable, and secure.

## Responsibilities

- Design, implement, and maintain CI/CD pipelines
- Automate infrastructure provisioning and configuration
- Monitor system performance and troubleshoot issues
- Implement security best practices and ensure compliance
- Collaborate with development teams to improve deployment processes
- Document infrastructure and operational procedures
- Participate in on-call rotation

## Requirements

- 3+ years of experience in DevOps or SRE roles
- Strong knowledge of cloud platforms (AWS, GCP, or Azure)
- Experience with infrastructure as code (Terraform, CloudFormation)
- Proficiency with containerization technologies (Docker, Kubernetes)
- Experience with CI/CD tools (Jenkins, GitHub Actions, CircleCI)
- Strong scripting skills (Bash, Python)
- Understanding of networking and security concepts
- Problem-solving mindset and attention to detail

## Nice to Have

- Experience with monitoring tools (Prometheus, Grafana)
- Knowledge of database administration
- Experience with log management solutions (ELK stack)
- Understanding of microservices architecture
- Security certifications
- Experience with multi-cloud environments

## Benefits

- Competitive salary and equity package
- Flexible remote work policy
- Health, dental, and vision insurance
- 401(k) matching
- Professional development budget
- Home office stipend
- Unlimited PTO
- Regular team retreats

We are an equal opportunity employer and value diversity at our company. We do not discriminate on the basis of race, religion, color, national origin, gender, sexual orientation, age, marital status, veteran status, or disability status.
    `,
    relatedPositions: ['senior-react-developer', 'backend-engineer'],
  },
  'product-designer': {
    id: 'product-designer',
    title: 'Product Designer',
    location: 'New York',
    workType: 'Full-time',
    department: 'Design',
    salary: '$95,000 - $125,000',
    postedDate: '2023-05-20',
    description: `
# Product Designer

## About the Role

We're looking for a creative Product Designer to join our team and help shape the future of our products. You'll work on designing intuitive and engaging user experiences that solve real user problems.

## Responsibilities

- Create user-centered designs by understanding business requirements and user feedback
- Design flows, prototypes, and high-fidelity visuals for mobile and web applications
- Collaborate with product managers and engineers to define features
- Conduct user research and usability testing
- Iterate on designs based on feedback
- Contribute to our design system

## Requirements

- 3+ years of experience in product design
- Strong portfolio showcasing your design process and solutions
- Proficiency with design tools (Figma, Sketch)
- Experience with user research and usability testing
- Excellent visual design skills
- Strong communication and collaboration abilities
- Ability to work in a fast-paced environment

## Nice to Have

- Experience with animation and interaction design
- Knowledge of HTML/CSS
- Experience with design systems
- Background in B2B or enterprise products
- Understanding of accessibility standards

## Benefits

- Competitive salary and equity package
- Flexible remote work policy
- Health, dental, and vision insurance
- 401(k) matching
- Professional development budget
- Home office stipend
- Unlimited PTO
- Regular team retreats

We are an equal opportunity employer and value diversity at our company. We do not discriminate on the basis of race, religion, color, national origin, gender, sexual orientation, age, marital status, veteran status, or disability status.
    `,
    relatedPositions: ['ux-designer', 'senior-react-developer'],
  },
  'backend-engineer': {
    id: 'backend-engineer',
    title: 'Backend Engineer',
    location: 'Remote',
    workType: 'Full-time',
    department: 'Engineering',
    salary: '$115,000 - $145,000',
    postedDate: '2023-05-25',
    description: `
# Backend Engineer

## About the Role

We're seeking a talented Backend Engineer to help us build scalable and reliable services. You'll work on designing and implementing APIs, services, and database systems that power our applications.

## Responsibilities

- Design, build, and maintain efficient, reusable, and reliable backend code
- Implement security and data protection measures
- Integrate with frontend applications and third-party services
- Optimize application performance and scalability
- Write unit and integration tests
- Collaborate with cross-functional teams
- Participate in code reviews and technical discussions

## Requirements

- 3+ years of experience in backend development
- Strong proficiency in at least one backend language (Node.js, Python, Java, Go)
- Experience with database design and ORM technologies
- Knowledge of API design and development
- Understanding of server-side templating languages
- Familiarity with version control systems (Git)
- Problem-solving aptitude and attention to detail
- Good communication skills

## Nice to Have

- Experience with microservices architecture
- Knowledge of message brokers (RabbitMQ, Kafka)
- Familiarity with containerization and orchestration (Docker, Kubernetes)
- Understanding of CI/CD pipelines
- Experience with cloud platforms (AWS, GCP, Azure)
- Knowledge of security best practices

## Benefits

- Competitive salary and equity package
- Flexible remote work policy
- Health, dental, and vision insurance
- 401(k) matching
- Professional development budget
- Home office stipend
- Unlimited PTO
- Regular team retreats

We are an equal opportunity employer and value diversity at our company. We do not discriminate on the basis of race, religion, color, national origin, gender, sexual orientation, age, marital status, veteran status, or disability status.
    `,
    relatedPositions: ['devops-engineer', 'senior-react-developer'],
  },
}

// Server component that gets the position parameter and passes it to the client component
export default function JobDetailsPage({
  params,
}: {
  params: { position: string }
}) {
  const position = params.position

  return (
    <div className="min-h-screen flex flex-col">
      <main className="flex-1 bg-gray-50 py-12">
        <div className="container mx-auto px-4 max-w-4xl">
          <Suspense fallback={<JobDetailsLoading />}>
            <JobDetailsClient position={position} />
          </Suspense>
        </div>
      </main>
    </div>
  )
}

// Loading component
function JobDetailsLoading() {
  return (
    <div className="animate-pulse">
      <div className="h-8 bg-gray-200 rounded w-1/3 mb-6"></div>
      <div className="h-4 bg-gray-200 rounded w-1/4 mb-4"></div>
      <div className="h-4 bg-gray-200 rounded w-1/5 mb-8"></div>
      <div className="h-64 bg-gray-200 rounded mb-6"></div>
      <div className="h-4 bg-gray-200 rounded mb-2"></div>
      <div className="h-4 bg-gray-200 rounded mb-2"></div>
      <div className="h-4 bg-gray-200 rounded mb-2"></div>
      <div className="h-4 bg-gray-200 rounded w-3/4 mb-6"></div>
    </div>
  )
}
