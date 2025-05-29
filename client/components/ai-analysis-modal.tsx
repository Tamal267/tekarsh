import { Badge } from '@/components/ui/badge'
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog'
import { Progress } from '@/components/ui/progress'
import {
  AlertTriangle,
  Brain,
  Briefcase,
  CheckCircle,
  GraduationCap,
  Mail,
  Phone,
  Target,
  TrendingUp,
  User,
} from 'lucide-react'
import { getAiAnalysis } from '../lib/job'

interface AIAnalysisModalProps {
  application: any
}

export async function AIAnalysisModal({ application }: AIAnalysisModalProps) {
  const analysis = await getAiAnalysis({
    pdfUrl: application.cv,
    details: application.details,
  })

  const getScoreColor = (score: number) => {
    if (score >= 80) return 'text-green-600 bg-green-100'
    if (score >= 60) return 'text-yellow-600 bg-yellow-100'
    return 'text-red-600 bg-red-100'
  }

  const getScoreLabel = (score: number) => {
    if (score >= 80) return 'Excellent Match'
    if (score >= 60) return 'Good Match'
    return 'Needs Review'
  }

  const getSuitabilityColor = (suitability: string) => {
    switch (suitability.toLowerCase()) {
      case 'highly suitable':
        return 'bg-green-100 text-green-800 border-green-200'
      case 'suitable':
        return 'bg-blue-100 text-blue-800 border-blue-200'
      case 'not suitable':
        return 'bg-red-100 text-red-800 border-red-200'
      default:
        return 'bg-gray-100 text-gray-800 border-gray-200'
    }
  }

  return (
    <Dialog>
      <DialogTrigger className="border border-gray-300 hover:bg-gray-50 text-gray-700 rounded-lg p-2 transition-colors">
        <Brain className="h-3 w-3" />
      </DialogTrigger>
      <DialogContent className="max-w-6xl w-full max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-3">
            <div className="p-2 bg-cyan-50 rounded-lg">
              <Brain className="h-6 w-6 text-green-600" />
            </div>
            <div>
              <div className="text-xl font-bold">
                AI Analysis -{' '}
                {analysis['Full Name'] ? analysis['Full Name'] : 'N/A'}
              </div>
              <div className="text-sm text-gray-500 font-normal">
                Comprehensive candidate assessment
              </div>
            </div>
          </DialogTitle>
        </DialogHeader>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6 mt-6">
          {/* Left Column - Candidate Info & Score */}
          <div className="space-y-6">
            {/* Candidate Basic Info */}
            <div className="bg-gray-50 p-4 rounded-lg border">
              <h3 className="font-semibold text-gray-900 mb-3 flex items-center gap-2">
                <User className="h-4 w-4" />
                Candidate Info
              </h3>
              <div className="space-y-2 text-sm">
                <div className="flex items-center gap-2">
                  <Mail className="h-3 w-3 text-gray-400" />
                  <span className="text-gray-600">
                    {analysis['Email'] || 'N/A'}
                  </span>
                </div>
                <div className="flex items-center gap-2">
                  <Phone className="h-3 w-3 text-gray-400" />
                  <span className="text-gray-600">
                    {analysis['Phone Number'] || 'N/A'}
                  </span>
                </div>
              </div>
            </div>

            {/* Education */}
            <div className="bg-blue-50 p-4 rounded-lg border border-blue-200">
              <h3 className="font-semibold text-green-900 mb-3 flex items-center gap-2">
                <GraduationCap className="h-4 w-4" />
                Education
              </h3>
              <div className="text-sm">
                <div className="font-medium text-green-800">
                  {analysis['Highest Education']?.['Degree'] || 'N/A'}
                </div>
                <div className="text-green-700">
                  {analysis['Highest Education']?.['Institution'] || 'N/A'}
                </div>
              </div>
            </div>

            {/* Overall Score */}
            <div className="text-center bg-gradient-to-br from-purple-50 to-blue-50 p-6 rounded-lg border border-purple-200">
              <div
                className={`inline-flex items-center justify-center w-20 h-20 rounded-full ${
                  analysis['AI Confidence Score'] != null
                    ? getScoreColor(analysis['AI Confidence Score'])
                    : 'bg-gray-100 text-gray-600'
                } mb-3`}
              >
                <span className="text-2xl font-bold">
                  {analysis['AI Confidence Score'] != null
                    ? analysis['AI Confidence Score']
                    : 'N/A'}
                </span>
              </div>
              <p className="font-semibold text-gray-900 text-sm">
                {analysis['AI Confidence Score'] != null
                  ? getScoreLabel(analysis['AI Confidence Score'])
                  : 'N/A'}
              </p>
              <p className="text-xs text-gray-600 mt-1">AI Confidence Score</p>
              <Progress
                value={
                  analysis['AI Confidence Score'] != null
                    ? analysis['AI Confidence Score']
                    : 0
                }
                className="mt-3"
              />
            </div>

            {/* Overall Suitability */}
            <div className="text-center">
              <Badge
                className={`${
                  analysis['Overall Suitability']
                    ? getSuitabilityColor(analysis['Overall Suitability'])
                    : 'bg-gray-100 text-gray-800 border-gray-200'
                } border px-3 py-1`}
              >
                {analysis['Overall Suitability'] || 'N/A'}
              </Badge>
            </div>
          </div>

          {/* Middle Column - Experience & Skills */}
          <div className="lg:col-span-2 space-y-6">
            {/* Professional Experience */}
            <div className="border border-gray-200 rounded-lg">
              <div className="bg-gray-50 p-4 border-b border-gray-200">
                <h3 className="font-semibold text-gray-900 flex items-center gap-2">
                  <Briefcase className="h-5 w-5" />
                  Professional Experience
                </h3>
              </div>
              <div className="p-4">
                <p className="text-sm text-gray-700 leading-relaxed">
                  {analysis['Professional Experience'] || 'N/A'}
                </p>
              </div>
            </div>

            {/* Key Skills */}
            <div className="border border-gray-200 rounded-lg">
              <div className="bg-gray-50 p-4 border-b border-gray-200">
                <h3 className="font-semibold text-gray-900">
                  Key Skills (
                  {analysis['Key Skills']?.length != null
                    ? analysis['Key Skills'].length
                    : 'N/A'}
                  )
                </h3>
              </div>
              <div className="p-4">
                <div className="flex flex-wrap gap-2">
                  {analysis['Key Skills'] &&
                  analysis['Key Skills'].length > 0 ? (
                    analysis['Key Skills'].map(
                      (skill: string, index: number) => (
                        <Badge
                          key={index}
                          variant="secondary"
                          className="bg-green-100 text-green-800 text-xs"
                        >
                          {skill}
                        </Badge>
                      ),
                    )
                  ) : (
                    <span>N/A</span>
                  )}
                </div>
              </div>
            </div>

            {/* Strengths */}
            <div className="border border-gray-200 rounded-lg">
              <div className="bg-green-50 p-4 border-b border-green-200">
                <h3 className="font-semibold text-green-900 flex items-center gap-2">
                  <CheckCircle className="h-5 w-5" />
                  Key Strengths
                </h3>
              </div>
              <div className="p-4">
                <div className="space-y-2">
                  {analysis['Strengths'] && analysis['Strengths'].length > 0 ? (
                    analysis['Strengths'].map(
                      (strength: string, index: number) => (
                        <div
                          key={index}
                          className="flex items-start gap-3 p-2 bg-green-50 rounded border border-green-200"
                        >
                          <div className="w-1.5 h-1.5 rounded-full bg-green-500 mt-2 flex-shrink-0"></div>
                          <span className="text-sm text-green-800">
                            {strength}
                          </span>
                        </div>
                      ),
                    )
                  ) : (
                    <span>N/A</span>
                  )}
                </div>
              </div>
            </div>

            {/* Weaknesses */}
            <div className="border border-gray-200 rounded-lg">
              <div className="bg-orange-50 p-4 border-b border-orange-200">
                <h3 className="font-semibold text-orange-900 flex items-center gap-2">
                  <AlertTriangle className="h-5 w-5" />
                  Areas of Concern
                </h3>
              </div>
              <div className="p-4">
                <div className="space-y-2">
                  {analysis['Weaknesses'] &&
                  analysis['Weaknesses'].length > 0 ? (
                    analysis['Weaknesses'].map(
                      (weakness: string, index: number) => (
                        <div
                          key={index}
                          className="flex items-start gap-3 p-2 bg-orange-50 rounded border border-orange-200"
                        >
                          <div className="w-1.5 h-1.5 rounded-full bg-orange-500 mt-2 flex-shrink-0"></div>
                          <span className="text-sm text-orange-800">
                            {weakness}
                          </span>
                        </div>
                      ),
                    )
                  ) : (
                    <span>N/A</span>
                  )}
                </div>
              </div>
            </div>
          </div>

          {/* Right Column - Recommendations */}
          <div className="space-y-6">
            {/* AI Recommendation */}
            <div className="bg-blue-50 p-4 rounded-lg border border-blue-200">
              <div className="flex items-start gap-3">
                <Target className="h-5 w-5 text-green-600 mt-0.5 flex-shrink-0" />
                <div>
                  <h3 className="font-semibold text-green-900 mb-2">
                    AI Recommendation
                  </h3>
                  <p className="text-gray-800 text-sm leading-relaxed">
                    {analysis['AI Recommendation'] || 'N/A'}
                  </p>
                </div>
              </div>
            </div>

            {/* Areas for Improvement */}
            <div className="border border-gray-200 rounded-lg">
              <div className="bg-yellow-50 p-4 border-b border-yellow-200">
                <h3 className="font-semibold text-yellow-900 flex items-center gap-2">
                  <TrendingUp className="h-5 w-5" />
                  Improvement Areas
                </h3>
              </div>
              <div className="p-4">
                <div className="space-y-2">
                  {analysis['Areas for Improvement'] &&
                  analysis['Areas for Improvement'].length > 0 ? (
                    analysis['Areas for Improvement'].map(
                      (area: string, index: number) => (
                        <div
                          key={index}
                          className="flex items-start gap-3 p-2 bg-yellow-50 rounded border border-yellow-200"
                        >
                          <div className="w-1.5 h-1.5 rounded-full bg-yellow-500 mt-2 flex-shrink-0"></div>
                          <span className="text-sm text-yellow-800">
                            {area}
                          </span>
                        </div>
                      ),
                    )
                  ) : (
                    <span>N/A</span>
                  )}
                </div>
              </div>
            </div>

            {/* Quick Assessment */}
            <div className="bg-gray-50 p-4 rounded-lg border">
              <h3 className="font-semibold text-gray-900 mb-3">
                Quick Assessment
              </h3>
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-600">
                    Technical Skills
                  </span>
                  <Badge
                    variant="secondary"
                    className={
                      analysis['Key Skills'] &&
                      analysis['Key Skills'].length > 10
                        ? 'bg-green-100 text-green-800'
                        : 'bg-yellow-100 text-yellow-800'
                    }
                  >
                    {analysis['Key Skills'] &&
                    analysis['Key Skills'].length > 10
                      ? 'Strong'
                      : 'Moderate'}
                  </Badge>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-600">Overall Fit</span>
                  <Badge
                    variant="secondary"
                    className={
                      analysis['Overall Suitability']
                        ? getSuitabilityColor(analysis['Overall Suitability'])
                        : 'bg-gray-100 text-gray-800'
                    }
                  >
                    {analysis['Overall Suitability'] || 'N/A'}
                  </Badge>
                </div>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="space-y-2">
              <button className="w-full bg-green-600 hover:bg-green-700 text-white py-2 px-4 rounded-lg text-sm font-medium">
                Schedule Interview
              </button>

              <button className="w-full border border-gray-300 hover:bg-gray-50 text-gray-700 py-2 px-4 rounded-lg text-sm font-medium">
                Add to Watchlist
              </button>
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  )
}
