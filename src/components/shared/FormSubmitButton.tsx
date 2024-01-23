'use client'

import { useFormStatus } from '@/rext-dom-shim'
import LoadingButton from './LoadingButton'

export default function FormSubmitButton(
  props: React.ButtonHTMLAttributes<HTMLButtonElement>
) {
  const { pending } = useFormStatus()

  return <LoadingButton {...props} type="submit" loading={pending} />
}
