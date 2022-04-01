import { ReactNode } from 'react'

import { useThemeContext } from 'ui'

import { LogoNoBorder } from './Logo'

export function GradientWrapper({ children }: { children: ReactNode }) {
  const theme = useThemeContext()
  const bg =
    theme.theme === 'dark'
      ? 'url(/gradients/BG-Gradient-Dark@2x.png)'
      : 'url(/gradients/BG-Gradient-Light@2x.png)'

  return (
    <div className="overflow-x-hidden flex flex-col items-center">
      {CSS.supports('backdrop-filter', 'blur(5px)') && (
        <div
          className="fixed top-0 left-1/2 mt-[60px] -ml-[250px] animate-spin-slow -z-20 text-[#06090B]"
          style={{ transform: 'rotate(270)' }}
        >
          <LogoNoBorder width={500} height={500} />
        </div>
      )}
      <div
        className="fixed -z-30 w-screen h-full bg-contain bg-no-repeat"
        style={{
          backgroundImage: `${bg}`,
        }}
      ></div>
      <div className="fixed bg-clip-padding backdrop-filter backdrop-blur-gl3xl w-screen h-screen -z-10"></div>
      {children}
    </div>
  )
}
