import { XIcon } from '@heroicons/react/outline'
import { FC } from 'react'
import { Toast, ToastBar, toast as hotToast } from 'react-hot-toast'

export interface ErrorToastProps {
  toast: Toast
}

export const ErrorToast: FC<ErrorToastProps> = ({ toast }) => (
  <ToastBar toast={toast}>
    {({ message }) => (
      <div className="flex gap-2 items-center p-3 font-mono text-sm text-[#ffffff] bg-error rounded">
        {message}
        <button
          className="p-[1px] rounded-full transition-outline"
          onClick={() => hotToast.dismiss(toast.id)}
        >
          <XIcon className="w-4" />
        </button>
      </div>
    )}
  </ToastBar>
)
