import clsx from 'clsx'
import { ComponentPropsWithoutRef } from 'react'

import { useThemeContext } from '../theme'

export type TopGradientProps = Omit<ComponentPropsWithoutRef<'div'>, 'children'>

export const TopGradient = ({
  className,
  style,
  ...props
}: TopGradientProps) => {
  const { accentColor } = useThemeContext()
  const baseColor =
    (accentColor &&
      // Convert to rgba with alpha of 0.4 if in rgb format.
      (accentColor.startsWith('rgb')
        ? `rgba(${accentColor.split('(')[1].split(')')[0]}, 0.4)`
        : // Add alpha of #66 in hex (102, 40% of 255, in decimal) if hex format.
        accentColor.startsWith('#')
        ? `${accentColor.slice(0, 7)}66`
        : undefined)) ||
    'rgba(var(--v2-brand), 0.4)'

  return (
    <div
      {...props}
      className={clsx(
        'pointer-events-none absolute top-0 right-0 left-0 z-0 opacity-60',
        className
      )}
      style={{
        ...style,
        background: `linear-gradient(180deg, ${baseColor} 0%, rgba(var(--color-background-base), 0) 100%)`,
      }}
    >
      <div
        style={{
          backgroundImage: `linear-gradient(270deg, rgb(var(--color-background-base)) 0%, rgba(var(--color-background-base), 0) 50%, rgb(var(--color-background-base)) 100%)`,
        }}
      >
        <div className="h-[50vh]"></div>
      </div>
    </div>
  )
}
