import { ReactNode } from 'react'

import { LogoNoBorder } from '../Logo'

export interface SplashGradientWrapperProps {
  children: ReactNode
}

export const SplashGradientWrapper = ({
  children,
}: SplashGradientWrapperProps) => (
  <div className="relative flex flex-col items-center overflow-x-hidden">
    {typeof CSS.supports !== 'undefined' &&
      // eslint-disable-next-line i18next/no-literal-string
      CSS.supports('backdrop-filter', 'blur(5px)') && (
        <div
          className="absolute top-0 left-1/2 -z-20 mt-[60px] -ml-[250px] text-[#06090B]"
          style={{ transform: 'rotate(270)' }}
        >
          <LogoNoBorder size={500} />
        </div>
      )}
    <div
      className="absolute -z-30 h-full w-screen bg-contain bg-no-repeat"
      style={{
        backgroundImage: 'url(/gradients/BG-Gradient-Dark@2x.png)',
      }}
    ></div>
    <div className="fixed -z-10 h-screen w-screen bg-clip-padding backdrop-blur-3xl backdrop-filter"></div>
    {children}
  </div>
)
