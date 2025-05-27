'use client'

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { Search, SearchIcon } from 'lucide-react'
import { useActionState, useState } from 'react'
import { departments, locations, statuses } from '../lib/data'
import { filterApplications } from '../lib/job'
import { Alert, AlertDescription } from './ui/alert'
import { Button } from './ui/button'
import { Input } from './ui/input'

const initialState = {
  message: '',
  success: false,
}

export default function ApplicationFilter({
  __title,
  __department,
  __location,
  __status,
}: {
  __title?: string
  __department?: string
  __location?: string
  __status?: string
}) {
  const [state, formAction, pending] = useActionState(
    filterApplications,
    initialState,
  )

  const [searchText, setSearchText] = useState(__title || '')

  return (
    <form action={formAction}>
      <Card className="mb-6">
        <CardHeader>
          <CardTitle>Filters</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex flex-col md:flex-row gap-4 items-center justify-between">
            {/* Search */}
            <div className="relative flex-grow max-md:w-full">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
              <Input
                placeholder="Search applicants name or job title..."
                name="title"
                className="pl-10"
                value={searchText}
                onChange={(e) => setSearchText(e.target.value)}
              />
            </div>

            {/* Department Filter */}
            <Select name="department">
              <SelectTrigger className="max-md:w-full">
                <SelectValue
                  placeholder="All Departments"
                  defaultValue={__department}
                />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="%">All Departments</SelectItem>
                {departments.map((dept) => (
                  <SelectItem
                    key={dept}
                    value={dept}
                  >
                    {dept}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>

            {/* Location Filter */}
            <Select
              name="location"
              defaultValue={__location}
            >
              <SelectTrigger className="max-md:w-full">
                <SelectValue placeholder="All Locations" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="%">All Locations</SelectItem>
                {locations.map((location) => (
                  <SelectItem
                    key={location}
                    value={location}
                  >
                    {location}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>

            {/* Status Filter */}
            <Select
              name="status"
              defaultValue={__status}
            >
              <SelectTrigger className="max-md:w-full">
                <SelectValue placeholder="All Status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="%">All Status</SelectItem>
                {statuses.map((status) => (
                  <SelectItem
                    key={status}
                    value={status}
                  >
                    {status === 'All Status'
                      ? status
                      : status.charAt(0).toUpperCase() + status.slice(1)}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>

            {state?.message && (
              <Alert variant={state?.success ? 'default' : 'destructive'}>
                <AlertDescription>{state?.message}</AlertDescription>
              </Alert>
            )}

            <Button
              className="bg-green-600 hover:bg-green-700 max-md:w-full"
              disabled={pending}
            >
              {pending ? (
                <>Processing...</>
              ) : (
                <>
                  <SearchIcon className="mr-2 h-4 w-4" /> Filter
                </>
              )}
            </Button>
          </div>
        </CardContent>
      </Card>
    </form>
  )
}
