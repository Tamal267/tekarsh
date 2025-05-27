'use client'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog'
import { Save, SquarePen } from 'lucide-react'
import { useActionState, useCallback } from 'react'
import { changeStatus } from '../lib/job'
import { Alert, AlertDescription } from './ui/alert'
import { Button } from './ui/button'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from './ui/select'

const initialState = {
  message: '',
  success: false,
}

export default function ChangeStatus({ application }) {
  const [state, formAction, pending] = useActionState(
    changeStatus,
    initialState,
  )

  const handleSubmit = useCallback(
    (formData: FormData) => {
      formData.append('id', application.id)
      formAction(formData)
    },
    [application.id, formAction],
  )
  return (
    <Dialog>
      <DialogTrigger className="border border-gray-300 hover:bg-gray-50 text-gray-700 rounded-lg p-2 transition-colors">
        <SquarePen className="h-3 w-3" />
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Are you absolutely sure?</DialogTitle>
          <DialogDescription>
            This action will change the status of the application for{' '}
            <strong>{application.name}</strong>. Please select the new status
            and confirm your action.
          </DialogDescription>
        </DialogHeader>
        <form
          action={handleSubmit}
          className="space-y-4"
        >
          <Select
            name="status"
            defaultValue={application.status}
          >
            <SelectTrigger className="w-full h-8">
              <SelectValue />
            </SelectTrigger>
            <SelectContent className="w-full">
              <SelectItem value="new">New</SelectItem>
              <SelectItem value="reviewed">Reviewed</SelectItem>
              <SelectItem value="shortlisted">Shortlisted</SelectItem>
              <SelectItem value="rejected">Rejected</SelectItem>
              <SelectItem value="invited">Invited</SelectItem>
            </SelectContent>
          </Select>

          {state?.message && (
            <Alert variant={state?.success ? 'default' : 'destructive'}>
              <AlertDescription>{state?.message}</AlertDescription>
            </Alert>
          )}

          <Button
            className="bg-green-600 hover:bg-green-700"
            disabled={pending}
          >
            {pending ? (
              <>Processing...</>
            ) : (
              <>
                <Save className="mr-2 h-4 w-4" /> Change Status
              </>
            )}
          </Button>
        </form>
      </DialogContent>
    </Dialog>
  )
}
