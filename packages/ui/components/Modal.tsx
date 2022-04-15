import { ReactNode, FC } from 'react'

export interface ModalProps {
  children: ReactNode
}

export const Modal: FC<ModalProps> = ({ children }) => (
  <div className="flex fixed top-0 left-0 z-10 justify-center items-center w-screen h-full backdrop-brightness-50 backdrop-filter">
    {children}
  </div>
)
