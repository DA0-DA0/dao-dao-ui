import { Toast } from 'react-hot-toast'

import { ToastCard } from './ToastCard'

export interface SuccessToastProps {
  toast: Toast
}

export const SuccessToast = (props: SuccessToastProps) => (
  <ToastCard containerClassName="text-light bg-dark" {...props} />
)
