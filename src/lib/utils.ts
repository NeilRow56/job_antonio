import { type ClassValue, clsx } from 'clsx'
import { twMerge } from 'tailwind-merge'
import { User } from '@clerk/nextjs/server'
import { UserResource } from '@clerk/types'

import { formatDistanceToNowStrict } from 'date-fns'

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function formatMoney(amount: number) {
  return new Intl.NumberFormat('en-GB', {
    style: 'currency',
    currency: 'GBP',
  }).format(amount)
}

export function relativeDate(from: Date) {
  return formatDistanceToNowStrict(from, { addSuffix: true })
}

export function isAdmin(user: UserResource | User) {
  return user.publicMetadata?.role === 'admin'
}
