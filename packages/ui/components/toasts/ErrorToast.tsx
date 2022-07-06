import { FC } from 'react'
import { Toast } from 'react-hot-toast'

import { ToastCard } from './ToastCard'

export interface ErrorToastProps {
  toast: Toast
}

export const ErrorToast: FC<ErrorToastProps> = (props) => (
  <ToastCard containerClassName="text-[#ffffff] bg-error" {...props} />
)
