import { Close } from '@mui/icons-material'
import clsx from 'clsx'
import { ReactNode, cloneElement } from 'react'
import { Toast, ToastBar, toast as hotToast } from 'react-hot-toast'

import { IconButton } from '../icon_buttons'

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
          'caption-text flex flex-row items-start gap-4 rounded-lg bg-component-toast p-4 text-sm text-text-body shadow-dp2',
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

        <IconButton
          Icon={Close}
          className="!text-icon-secondary"
          iconClassName="!w-5 !h-5"
          onClick={() => hotToast.dismiss(toast.id)}
          size="xs"
          variant="ghost"
        />
      </div>
    )}
  </ToastBar>
)
