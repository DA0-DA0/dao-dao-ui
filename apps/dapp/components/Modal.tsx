import { ReactNode } from 'react'

export function Modal({ children }: { children: ReactNode }) {
  {
    return (
      <div className="fixed z-10 top-0 left-0 w-screen h-full backdrop-filter backdrop-brightness-50 flex items-center justify-center">
        {children}
      </div>
    )
  }
}
