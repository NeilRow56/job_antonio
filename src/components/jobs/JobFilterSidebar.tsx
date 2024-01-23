import { redirect } from 'next/navigation'
import React from 'react'

import { jobFilterSchema } from '@/lib/filterValidations'

import { jobTypes } from '@/lib/job-types'

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { Label } from '../ui/label'
import { Input } from '../ui/input'
import SelectNew from '../shared/SelectNew'
import { db } from '@/lib/db'
import { Button } from '../ui/button'

async function filterJobs(formData: FormData) {
  'use server'

  const values = Object.fromEntries(formData.entries())

  const { q, type, location, remote } = jobFilterSchema.parse(values)

  const searchParams = new URLSearchParams({
    ...(q && { q: q.trim() }),
    ...(type && { type }),
    ...(location && { location }),
    ...(remote && { remote: 'true' }),
  })

  redirect(`/?${searchParams.toString()}`)
}

async function JobFilterSidebar() {
  const distinctLocations = (await db.job
    .findMany({
      where: { approved: true },
      select: { location: true },
      distinct: ['location'],
    })
    .then((locations) =>
      locations.map(({ location }) => location).filter(Boolean)
    )) as string[]

  return (
    <aside className="rounded:lg sticky top-0 h-fit border bg-background md:w-[260px]">
      <form action={filterJobs}>
        <div className="space-y-4">
          <div className="flex flex-col gap-2">
            <Label htmlFor="q">Search</Label>
            <Input id="q" name="q" placeholder="Title, company, etc." />
          </div>
          <div className="flex flex-col gap-2">
            <Label htmlFor="type">Type</Label>
            <Select name="type" defaultValue="">
              <SelectTrigger className="w-[258px]">
                <SelectValue placeholder="All Types" />
              </SelectTrigger>
              <SelectContent>
                {jobTypes.map((type) => (
                  <SelectItem key={type} value={type}>
                    {type}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          <div className="">
            <Label htmlFor="location">Location</Label>
            <Select name="location" defaultValue="">
              <SelectTrigger className="w-[258px]">
                <SelectValue placeholder="All Locations" />
              </SelectTrigger>
              <SelectContent>
                {distinctLocations.map((location) => (
                  <SelectItem key={location} value={location}>
                    {location}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>

            {/* <SelectNew id="location" name="location" defaultValue="">
              <option className="" value="">
                All locations
              </option>
              {distinctLocations.map((location) => (
                <option key={location} value={location}>
                  {location}
                </option>
              ))}
            </SelectNew> */}
          </div>
          <Button type="submit" className="w-full">
            Filter jobs
          </Button>
        </div>
      </form>
    </aside>
  )
}

export default JobFilterSidebar
