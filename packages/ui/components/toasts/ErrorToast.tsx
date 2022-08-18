import { Toast } from 'react-hot-toast'

import { ToastCard } from './ToastCard'

export interface ErrorToastProps {
  toast: Toast
}

export const ErrorToast = (props: ErrorToastProps) => (
  <ToastCard containerClassName="text-[#ffffff] bg-error" {...props} />
)
