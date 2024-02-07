import clsx from 'clsx'

export type LineLoaderProps = {
  /**
   * The type of line loader.
   */
  type: 'proposal' | 'token' | 'post' | 'retroactive' | 'vesting' | 'command'
  /**
   * Optional class name for the line.
   */
  className?: string
}

/**
 * A line loader to show when various data is loading. Useful generally for many
 * types of pages.
 */
export const LineLoader = ({ type, className }: LineLoaderProps) => (
  <div
    className={clsx(
      'animate-pulse rounded-md bg-background-primary',
      {
        'h-28 md:h-12': type === 'proposal',
        'h-12 md:h-14':
          type === 'token' || type === 'post' || type === 'vesting',
        'h-20 sm:h-12': type === 'retroactive',
        'h-9': type === 'command',
      },
      className
    )}
  ></div>
)

export type LineLoadersProps = {
  /**
   * How many lines to show.
   */
  lines: number
  /**
   * Optional class name for the container.
   */
  className?: string
  /**
   * Optional class name for the lines.
   */
  lineClassName?: string
} & Pick<LineLoaderProps, 'type'>

/**
 * Render many line loaders.
 */
export const LineLoaders = ({
  lines,
  className,
  lineClassName,
  ...props
}: LineLoadersProps) => (
  <div className={clsx('space-y-1', className)}>
    {[...Array(lines)].map((_, i) => (
      <LineLoader {...props} key={i} className={lineClassName} />
    ))}
  </div>
)
