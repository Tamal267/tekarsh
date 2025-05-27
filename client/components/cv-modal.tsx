import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog'
import { FileText } from 'lucide-react'

interface CVModalProps {
  application: any
}

export function CVModal({ application }: CVModalProps) {
  if (!application) return null

  return (
    <Dialog>
      <DialogTrigger className="border border-gray-300 hover:bg-gray-50 text-gray-700 rounded-lg p-2 transition-colors">
        <FileText className="h-3 w-3" />
      </DialogTrigger>
      <DialogContent className="max-w-4xl max-h-[80vh] overflow-y-scroll">
        <DialogHeader>
          <DialogTitle>CV - {application.name}</DialogTitle>
          <DialogDescription>
            Review the applicant{"'"}s curriculum vitae
          </DialogDescription>
        </DialogHeader>
        <div className="mt-4">
          <div className="">
            <iframe
              src={application.cv}
              className="w-full h-screen"
            />
          </div>
          <div className="mt-6 p-4 bg-blue-50 rounded-lg">
            <h4 className="font-medium text-blue-900 mb-2">Cover Letter</h4>
            <p className="text-blue-800 text-sm">{application.cover}</p>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  )
}
