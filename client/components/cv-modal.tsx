import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { FileText, Download } from "lucide-react"

interface CVModalProps {
  isOpen: boolean
  onClose: () => void
  application: any
}

export function CVModal({ isOpen, onClose, application }: CVModalProps) {
  if (!application) return null

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-4xl max-h-[80vh]">
        <DialogHeader>
          <DialogTitle>CV - {application.applicantName}</DialogTitle>
          <DialogDescription>Review the applicant's curriculum vitae</DialogDescription>
        </DialogHeader>
        <div className="mt-4">
          <div className="bg-gray-100 p-8 rounded-lg text-center">
            <FileText className="h-16 w-16 mx-auto text-gray-400 mb-4" />
            <p className="text-gray-600 mb-4">CV Preview</p>
            <p className="text-sm text-gray-500 mb-6">
              In a real application, this would display the actual PDF or document viewer.
            </p>
            <div className="flex justify-center gap-4">
              <Button variant="outline">
                <Download className="h-4 w-4 mr-2" />
                Download CV
              </Button>
              <Button variant="outline">View Full Screen</Button>
            </div>
          </div>
          <div className="mt-6 p-4 bg-blue-50 rounded-lg">
            <h4 className="font-medium text-blue-900 mb-2">Cover Letter</h4>
            <p className="text-blue-800 text-sm">{application.coverLetter}</p>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  )
}
