import { ComponentPropsWithRef } from 'react'

export interface LinkWrapperProps extends ComponentPropsWithRef<'a'> {
  // Pulse loading if navigating locally.
  loading?: boolean
}
