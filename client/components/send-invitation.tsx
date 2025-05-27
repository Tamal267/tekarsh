'use client'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog'
import { MailOpen } from 'lucide-react'
import { useActionState, useCallback } from 'react'
import { sendInvitation } from '../lib/job'
import { Alert, AlertDescription } from './ui/alert'
import { Button } from './ui/button'
import { Textarea } from './ui/textarea'

const initialState = {
  message: '',
  success: false,
}

export default function Invitation({ application }) {
  const [state, formAction, pending] = useActionState(
    sendInvitation,
    initialState,
  )

  const handleSubmit = useCallback(
    (formData: FormData) => {
      formData.append('id', application.id)
      formData.append('email', application.email)
      formAction(formData)
    },
    [application.id, application.email, formAction],
  )
  return (
    <Dialog>
      <DialogTrigger className="bg-green-600 hover:bg-green-700 text-white rounded-sm shadow-md font-semibold p-2 transition-colors">
        Invite
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Are you absolutely sure?</DialogTitle>
          <DialogDescription>
            This action will send an invitation to{' '}
            <strong>{application.name}</strong> at{' '}
            <strong>{application.email}</strong>.
          </DialogDescription>
        </DialogHeader>
        <form
          action={handleSubmit}
          className="space-y-4"
        >
          <Textarea
            name="text"
            placeholder="Type your invitation message here..."
            className="h-32"
            defaultValue={`Dear ${application.name},\n\nWe are pleased to invite you for an interview regarding your application for the position of ${application.position}. Please let us know your availability.\n\nBest regards,\nThe Hiring Team`}
          />

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
                <MailOpen className="mr-2 h-4 w-4" /> Send Invitation
              </>
            )}
          </Button>
        </form>
      </DialogContent>
    </Dialog>
  )
}
