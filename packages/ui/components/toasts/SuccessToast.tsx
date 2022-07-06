import { FC } from 'react'
import { Toast } from 'react-hot-toast'

import { ToastCard } from './ToastCard'

export interface SuccessToastProps {
  toast: Toast
}

export const SuccessToast: FC<SuccessToastProps> = (props) => (
  <ToastCard containerClassName="text-light bg-dark" {...props} />
)
