import { XIcon } from '@heroicons/react/outline'
import clsx from 'clsx'
import { FC, cloneElement } from 'react'
import { Toast, ToastBar, toast as hotToast } from 'react-hot-toast'

export interface ToastCardProps {
  toast: Toast
  containerClassName?: string
}

export const ToastCard: FC<ToastCardProps> = ({
  toast,
  containerClassName,
}) => (
  <ToastBar toast={toast}>
    {({ message }) => (
      <div
        className={clsx(
          'flex flex-row items-start gap-3 rounded p-4 font-mono text-sm',
          containerClassName
        )}
      >
        <p className="grow break-words">
          {!message || typeof message === 'string'
            ? message
            : // eslint-disable-next-line i18next/no-literal-string
              cloneElement(message, { className: '!m-0' })}
        </p>

        <button
          className="rounded-full opacity-50 transition hover:opacity-20"
          onClick={() => hotToast.dismiss(toast.id)}
        >
          {/* Height equal to line height of message above (text-sm). */}
          <XIcon className="h-5 w-4" />
        </button>
      </div>
    )}
  </ToastBar>
)
