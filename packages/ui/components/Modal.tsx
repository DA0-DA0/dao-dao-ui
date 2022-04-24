import { ReactNode, FC } from 'react'

import clsx from 'clsx'

export interface ModalProps {
  children: ReactNode
  onClose?: () => void
}

export const Modal: FC<ModalProps> = ({ children, onClose }) => (
  <div
    className={clsx(
      'flex fixed top-0 left-0 z-10 justify-center items-center w-screen h-full backdrop-brightness-50 transition backdrop-filter',
      { 'cursor-pointer': !!onClose }
    )}
    onClick={
      onClose
        ? // Only close if click on backdrop.
          ({ target, currentTarget }) => target === currentTarget && onClose()
        : undefined
    }
  >
    {children}
  </div>
)
