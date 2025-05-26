import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog"

interface AIAnalysisModalProps {
  isOpen: boolean
  onClose: () => void
  application: any
}

export function AIAnalysisModal({ isOpen, onClose, application }: AIAnalysisModalProps) {
  if (!application?.aiAnalysis) return null

  const { aiAnalysis } = application

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-2xl">
        <DialogHeader>
          <DialogTitle>AI Analysis - {application.applicantName}</DialogTitle>
          <DialogDescription>AI-powered analysis of the applicant's qualifications</DialogDescription>
        </DialogHeader>
        <div className="mt-4 space-y-6">
          {/* Overall Score */}
          <div className="text-center">
            <div className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-green-100 mb-2">
              <span className="text-2xl font-bold text-green-800">{aiAnalysis.score}</span>
            </div>
            <p className="text-sm text-gray-600">Overall Match Score</p>
          </div>

          {/* Strengths */}
          <div>
            <h4 className="font-medium text-green-900 mb-3">Strengths</h4>
            <ul className="space-y-2">
              {aiAnalysis.strengths.map((strength: string, index: number) => (
                <li key={index} className="flex items-start">
                  <div className="w-2 h-2 rounded-full bg-green-500 mt-2 mr-3 flex-shrink-0"></div>
                  <span className="text-sm text-gray-700">{strength}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Weaknesses */}
          <div>
            <h4 className="font-medium text-orange-900 mb-3">Areas for Improvement</h4>
            <ul className="space-y-2">
              {aiAnalysis.weaknesses.map((weakness: string, index: number) => (
                <li key={index} className="flex items-start">
                  <div className="w-2 h-2 rounded-full bg-orange-500 mt-2 mr-3 flex-shrink-0"></div>
                  <span className="text-sm text-gray-700">{weakness}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Recommendation */}
          <div className="bg-blue-50 p-4 rounded-lg">
            <h4 className="font-medium text-blue-900 mb-2">AI Recommendation</h4>
            <p className="text-blue-800 text-sm">{aiAnalysis.recommendation}</p>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  )
}
