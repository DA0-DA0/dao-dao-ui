import clsx from 'clsx'
import { ReactNode, FC } from 'react'

export interface ModalProps {
  children: ReactNode
  onClose: () => void
}

// TODO: Move common Modal window styles here so we can ensure
// the `cursor-auto` class is set on all of them. The backdrop is
// clickable to close, but we don't want the cursor to change on
// the modal window itself.
export const Modal: FC<ModalProps> = ({ children, onClose }) => (
  <div
    className={clsx(
      'flex fixed top-0 left-0 z-10 justify-center items-center px-4 w-screen h-full backdrop-brightness-50 transition cursor-pointer backdrop-filter'
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
