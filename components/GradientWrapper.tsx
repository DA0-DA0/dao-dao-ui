import { ReactNode } from 'react'
import { LogoNoBorder } from './Logo'

export function GradientWrapper({ children }: { children: ReactNode }) {
  return (
    <div className="overflow-x-hidden flex flex-col items-center">
      {CSS.supports('backdrop-filter', 'blur(5px)') && (
        <div
          className="fixed top-1/4 left-1/2 -mt-[100px] -ml-[250px] animate-spin-slow -z-30"
          style={{ transform: 'rotate(270)' }}
        >
          <LogoNoBorder width={500} height={500} />
        </div>
      )}
      <div className="fixed bg-gradient-radial-t-wide from-slate-500/80 via-transparent w-full h-full -z-20"></div>
      <div className="fixed bg-clip-padding backdrop-filter backdrop-blur-3xl bg-opacity-60 w-screen h-screen -z-10"></div>
      {children}
    </div>
  )
}
