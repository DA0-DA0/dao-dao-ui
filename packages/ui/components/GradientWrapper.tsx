import { ComponentType, ReactNode } from 'react'

import { LogoNoBorder, LogoProps } from './Logo'

export interface GradientWrapperProps {
  Logo?: ComponentType<LogoProps>
  children: ReactNode
}

export const GradientWrapper = ({
  Logo = LogoNoBorder,
  children,
}: GradientWrapperProps) => (
  <div className="flex overflow-x-hidden relative flex-col items-center">
    <div
      className="absolute -z-30 w-screen h-full bg-no-repeat bg-contain"
      style={{
        backgroundImage: 'url(/gradients/BG-Gradient-Dark@2x.png)',
      }}
    ></div>
    <div className="fixed -z-10 w-screen h-screen bg-clip-padding backdrop-blur backdrop-filter"></div>
    {children}
  </div>
)
