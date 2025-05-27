'use client'

import { LogOut } from 'lucide-react'
import { useActionState } from 'react'
import { logout } from '../lib/admin'

export default function Logout() {
  const [state, formAction, pending] = useActionState(logout, null)
  return (
    <form
      action={formAction}
      className=""
    >
      <button
        type="submit"
        className="font-medium hover:text-green-600 transition-colors text-gray-800 flex items-center text-sm justify-center"
      >
        {pending ? (
          <>Processing...</>
        ) : (
          <>
            <LogOut className="mr-2 h-4 w-4" /> Logout
          </>
        )}
      </button>
    </form>
  )
}
