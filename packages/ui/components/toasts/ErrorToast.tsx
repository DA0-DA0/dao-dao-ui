import { Toast } from 'react-hot-toast'

import { ToastCard } from './ToastCard'

export interface ErrorToastProps {
  toast: Toast
}

export const ErrorToast = (props: ErrorToastProps) => (
  <ToastCard containerClassName="text-text-light bg-color-error" {...props} />
)
