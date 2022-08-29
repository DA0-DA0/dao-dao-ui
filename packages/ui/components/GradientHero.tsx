import { ReactNode } from 'react'

import { useThemeContext } from '../theme'

export interface GradientHeroProps {
  children: ReactNode
  wrapperClassName?: string
  childContainerClassName?: string
}

export const GradientHero = ({
  children,
  wrapperClassName,
  childContainerClassName,
}: GradientHeroProps) => {
  const { accentColor } = useThemeContext()
  const baseRgb = accentColor
    ? accentColor.split('(')[1].split(')')[0]
    : 'var(--v2-brand)'

  return (
    <div
      className={wrapperClassName}
      style={{
        background: `linear-gradient(180deg, rgba(${baseRgb}, 0.4) 0%, rgba(var(--color-background-base), 0) 100%)`,
      }}
    >
      <div
        className={childContainerClassName}
        style={{
          backgroundImage: `linear-gradient(270deg, rgb(var(--color-background-base)) 0%, rgba(var(--color-background-base), 0) 50%, rgb(var(--color-background-base)) 100%)`,
        }}
      >
        {children}
      </div>
    </div>
  )
}
