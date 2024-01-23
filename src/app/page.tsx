import JobFilterSidebar from '@/components/jobs/JobFilterSidebar'
import JobResults from '@/components/jobs/JobResults'
import H1 from '@/components/shared/H1'
import { JobFilterValues } from '@/lib/filterValidations'
import { Metadata } from 'next'

interface PageProps {
  searchParams: {
    q?: string
    type?: string
    location?: string
    remote?: string
  }
}

function getTitle({ q, type, location, remote }: JobFilterValues) {
  const titlePrefix = q
    ? `${q} jobs`
    : type
      ? `${type} developer jobs`
      : remote
        ? 'Remote developer jobs'
        : 'All developer jobs'

  const titleSuffix = location ? ` in ${location}` : ''

  return `${titlePrefix}${titleSuffix}`
}

export function generateMetadata({
  searchParams: { q, type, location, remote },
}: PageProps): Metadata {
  return {
    title: `${getTitle({
      q,
      type,
      location,
      remote: remote === 'true',
    })} | Flow Jobs`,
  }
}

export default async function Home({
  searchParams: { q, type, location, remote },
}: PageProps) {
  // remote search param is a string so we need to convert to a boolean
  const filterValues: JobFilterValues = {
    q,
    type,
    location,
    remote: remote === 'true',
  }

  return (
    <main className="m-auto my-10 max-w-5xl space-y-10 px-3">
      <div className="space-y-5 text-center">
        <H1>{getTitle(filterValues)}</H1>
        <p className="text-muted-foreground">Find your dream job.</p>
      </div>
      <section className="flex flex-col gap-4 md:flex-row">
        <JobFilterSidebar defaultValues={filterValues} />
        <JobResults filterValues={filterValues} />
      </section>
    </main>
  )
}
