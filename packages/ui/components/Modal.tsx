import { ReactNode } from 'react'

export function Modal({ children }: { children: ReactNode }) {
  {
    return (
      <div className="flex fixed top-0 left-0 z-10 justify-center items-center w-screen h-full backdrop-brightness-50 backdrop-filter">
        {children}
      </div>
    )
  }
}
