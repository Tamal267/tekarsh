'use client'

import { Button } from '@/components/ui/button'
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Eye, EyeOff, Loader2, Lock, Mail } from 'lucide-react'
import Image from 'next/image'
import Link from 'next/link'
import { useActionState, useState } from 'react'
import { Alert, AlertDescription } from '../../../components/ui/alert'
import { adminLogin } from '../../../lib/admin'

const initialState = {
  message: '',
  success: false,
}

export default function AdminLogin() {
  const [showPassword, setShowPassword] = useState(false)
  const [state, formAction, pending] = useActionState(adminLogin, initialState)

  return (
    <div className="bg-gradient-to-br from-green-50 to-white flex items-center justify-center p-12">
      <div className="w-full max-w-md">
        {/* Logo and Header */}
        <div className="text-center mb-8">
          <div className="w-32 rounded-xl mx-auto mb-4 flex items-center justify-center">
            <Image
              src="/images/tekarsh_logo.png"
              alt="Tekarsh Logo"
              width={100}
              height={100}
            />
          </div>
          <h1 className="text-2xl font-bold text-gray-900">Tekarsh Admin</h1>
          <p className="text-gray-600 mt-2">Sign in to your admin account</p>
        </div>

        <Card className="shadow-lg border-0">
          <CardHeader className="space-y-1">
            <CardTitle className="text-xl text-center">Welcome Back</CardTitle>
            <CardDescription className="text-center">
              Enter your credentials to access the admin panel
            </CardDescription>
          </CardHeader>
          <CardContent>
            <form
              action={formAction}
              className="space-y-4"
            >
              <div className="space-y-2">
                <Label htmlFor="email">Email Address</Label>
                <div className="relative">
                  <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                  <Input
                    id="email"
                    name="email"
                    type="email"
                    placeholder="admin@tekarsh.com"
                    className="pl-10"
                    required
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="password">Password</Label>
                <div className="relative">
                  <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                  <Input
                    id="password"
                    name="password"
                    type={showPassword ? 'text' : 'password'}
                    placeholder="Enter your password"
                    className="pl-10 pr-10"
                    required
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
                  >
                    {showPassword ? (
                      <EyeOff className="h-4 w-4" />
                    ) : (
                      <Eye className="h-4 w-4" />
                    )}
                  </button>
                </div>

                {state?.message && (
                  <Alert variant={state?.success ? 'default' : 'destructive'}>
                    <AlertDescription>{state?.message}</AlertDescription>
                  </Alert>
                )}
              </div>

              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-2">
                  <input
                    id="remember"
                    type="checkbox"
                    defaultChecked
                    name="remember"
                    className="w-4 h-4 text-green-600 border-gray-300 rounded focus:ring-green-500"
                  />
                  <Label
                    htmlFor="remember"
                    className="text-sm text-gray-600"
                  >
                    Remember me
                  </Label>
                </div>
                <Link
                  href="/admin/forgot-password"
                  className="text-sm text-green-600 hover:text-green-700 hover:underline"
                >
                  Forgot password?
                </Link>
              </div>

              <Button
                type="submit"
                className="w-full bg-green-600 hover:bg-green-700"
                disabled={pending}
              >
                {pending ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Signing in...
                  </>
                ) : (
                  'Sign In'
                )}
              </Button>
            </form>

            <div className="mt-6 text-center">
              <p className="text-sm text-gray-600">
                Don't have an admin account?{' '}
                <Link
                  href="/admin/signup"
                  className="text-green-600 hover:text-green-700 font-medium hover:underline"
                >
                  Sign up here
                </Link>
              </p>
            </div>

            <div className="mt-4 text-center">
              <Link
                href="/"
                className="text-sm text-gray-500 hover:text-gray-700 hover:underline"
              >
                ← Back to website
              </Link>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
