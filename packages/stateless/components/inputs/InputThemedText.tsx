import clsx from 'clsx'
import { ComponentProps } from 'react'

export type InputThemedTextProps = ComponentProps<'p'> & {
  // A unit to display to the right of the content.
  unit?: string
  // Applies to the unit only.
  unitClassName?: string
}

export const InputThemedText = ({
  className,
  children,
  unit,
  unitClassName,
  ...props
}: InputThemedTextProps) => (
  <div
    className={clsx(
      'secondary-text flex flex-row items-center justify-between gap-2 rounded-md py-3 px-4 text-text-body ring-1 ring-border-primary',
      className
    )}
    {...props}
  >
    {children}

    {unit && (
      <p
        className={clsx(
          'secondary-text max-w-[10rem] shrink-0 truncate text-right text-text-tertiary',
          unitClassName
        )}
      >
        {unit}
      </p>
    )}
  </div>
)
