import { ReactNode, FC } from 'react'

export interface ModalProps {
  children: ReactNode
  onClose?: () => void
}

export const Modal: FC<ModalProps> = ({ children, onClose }) => (
  <div
    className="flex fixed top-0 left-0 z-10 justify-center items-center w-screen h-full backdrop-brightness-50 transition cursor-pointer backdrop-filter"
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
