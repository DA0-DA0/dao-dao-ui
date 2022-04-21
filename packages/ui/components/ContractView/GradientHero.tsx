import { FC, ReactNode } from 'react'

import { useThemeContext } from '../../theme'

export interface GradientHeroProps {
  children: ReactNode
}

export const GradientHero: FC<GradientHeroProps> = ({ children }) => {
  const theme = useThemeContext()
  const endStop = theme.theme === 'dark' ? '#111213' : '#FFFFFF'
  const baseRgb = theme.accentColor
    ? theme.accentColor.split('(')[1].split(')')[0]
    : '73, 55, 192'
  return (
    <div
      style={{
        background: `linear-gradient(180deg, rgba(${baseRgb}, 0.4) 0%, rgba(17, 18, 19, 0) 100%)`,
      }}
    >
      <div
        className="flex flex-col justify-between p-6"
        style={{
          background: `linear-gradient(270deg, ${endStop} 0%, rgba(17, 18, 19, 0) 50%, ${endStop} 100%)`,
        }}
      >
        {children}
      </div>
    </div>
  )
}
