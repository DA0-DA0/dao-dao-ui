import { XIcon } from '@heroicons/react/outline'
import { FC } from 'react'
import { Toast, ToastBar, toast as hotToast } from 'react-hot-toast'

export interface SuccessToastProps {
  toast: Toast
}

export const SuccessToast: FC<SuccessToastProps> = ({ toast }) => (
  <ToastBar toast={toast}>
    {({ message }) => {
      return (
        <div className="flex flex-wrap gap-2 items-center p-3 font-mono text-sm text-light bg-dark rounded">
          <button
            className="p-[1px] rounded-full transition-outline"
            onClick={() => hotToast.dismiss(toast.id)}
          >
            <XIcon className="w-4" />
          </button>
          {message}
        </div>
      )
    }}
  </ToastBar>
)
