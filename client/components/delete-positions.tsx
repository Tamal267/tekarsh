'use client'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog'
import { Trash } from 'lucide-react'
import { useActionState, useCallback } from 'react'
import { deletePosition } from '../lib/admin'
import { Alert, AlertDescription } from './ui/alert'
import { Button } from './ui/button'

const initialState = {
  message: '',
  success: false,
}

export default function DeletePosition({ position }) {
  const [state, formAction, pending] = useActionState(
    deletePosition,
    initialState,
  )

  const handleSubmit = useCallback(
    (formData: FormData) => {
      formData.append('id', position.id)
      formData.append('title', position.title)
      formAction(formData)
    },
    [position.id, position.title, formAction],
  )
  return (
    <Dialog>
      <DialogTrigger className="border border-gray-300 bg-red-50 text-red-500 hover:bg-red-100 hover:text-red-700 rounded-lg p-2 transition-colors">
        <Trash className="h-5 w-5" />
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Are you absolutely sure?</DialogTitle>
          <DialogDescription>
            Do you really want to delete the position{' '}
            <strong>{position.title}</strong>? This action cannot be undone.
          </DialogDescription>
        </DialogHeader>
        <form
          action={handleSubmit}
          className="space-y-4"
        >
          {state?.message && (
            <Alert variant={state?.success ? 'default' : 'destructive'}>
              <AlertDescription>{state?.message}</AlertDescription>
            </Alert>
          )}

          <Button
            className="bg-red-500 hover:bg-red-600 w-full"
            disabled={pending}
          >
            {pending ? (
              <>Processing...</>
            ) : (
              <>
                <Trash className="mr-2 h-4 w-4" /> Delete Position
              </>
            )}
          </Button>
        </form>
      </DialogContent>
    </Dialog>
  )
}
