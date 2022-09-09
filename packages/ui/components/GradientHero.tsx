import { ReactNode, useMemo } from 'react'

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
  const baseRgb = useMemo(
    () =>
      (accentColor &&
        // Convert to rgba with alpha of 0.4 if in rgb format.
        (accentColor.startsWith('rgb')
          ? `rgba(${accentColor.split('(')[1].split(')')[0]}, 0.4)`
          : // Add alpha of #66 in hex (102, 40% of 255, in decimal) if hex format.
          accentColor.startsWith('#')
          ? `${accentColor.slice(0, 7)}66`
          : undefined)) ||
      'rgba(var(--v2-brand), 0.4)',
    [accentColor]
  )

  return (
    <div
      className={wrapperClassName}
      style={{
        background: `linear-gradient(180deg, ${baseRgb} 0%, rgba(var(--color-background-base), 0) 100%)`,
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
