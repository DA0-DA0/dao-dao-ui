import { XIcon } from '@heroicons/react/outline'
import clsx from 'clsx'
import { ReactNode, cloneElement } from 'react'
import { Toast, ToastBar, toast as hotToast } from 'react-hot-toast'

export interface ToastCardProps {
  toast: Toast
  containerClassName?: string
  preMessage?: ReactNode
}

export const ToastCard = ({
  toast,
  containerClassName,
  preMessage,
}: ToastCardProps) => (
  <ToastBar toast={toast}>
    {({ message }) => (
      <div
        className={clsx(
          'flex flex-row gap-3 items-start p-4 font-mono text-sm rounded',
          containerClassName
        )}
      >
        {preMessage}

        <p className="grow break-words">
          {!message || typeof message === 'string'
            ? message
            : // eslint-disable-next-line i18next/no-literal-string
              cloneElement(message, { className: '!m-0' })}
        </p>

        <button
          className="rounded-full opacity-50 hover:opacity-20 transition"
          onClick={() => hotToast.dismiss(toast.id)}
        >
          {/* Height equal to line height of message above (text-sm). */}
          <XIcon className="w-4 h-5" />
        </button>
      </div>
    )}
  </ToastBar>
)
